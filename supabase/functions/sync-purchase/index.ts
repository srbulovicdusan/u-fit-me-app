import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const REVENUECAT_API_KEY = Deno.env.get('REVENUECAT_API_KEY')!;
// TODO: Obrisati pre produkcije — samo za testiranje bez Store integracije
const TEST_MODE = Deno.env.get('SYNC_PURCHASE_TEST_MODE') === 'true';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Izvuci userId iz Supabase JWT-a
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAuth = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { productIdentifier } = await req.json();
    if (!productIdentifier) {
      return new Response(JSON.stringify({ error: 'Missing productIdentifier' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Validacija sa RevenueCat — potvrdi da user zaista ima aktivan entitlement
    if (!TEST_MODE) {
      const rcResponse = await fetch(
        `https://api.revenuecat.com/v1/subscribers/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${REVENUECAT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!rcResponse.ok) {
        return new Response(JSON.stringify({ error: 'RevenueCat validation failed' }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const rcData = await rcResponse.json();
      const proEntitlement = rcData.subscriber?.entitlements?.pro;

      if (!proEntitlement || new Date(proEntitlement.expires_date) < new Date()) {
        if (!proEntitlement) {
          return new Response(JSON.stringify({ error: 'No active pro entitlement' }), {
            status: 403,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // 3. Upiši u bazu sa service role key (zaobilazi RLS)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Proveri da li već postoji subscription za ovog usera
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .limit(1)
      .maybeSingle();

    if (existing) {
      const { error: updateErr } = await supabase
        .from('subscriptions')
        .update({ revenue_cat_id: productIdentifier })
        .eq('id', existing.id);
      if (updateErr) {
        return new Response(JSON.stringify({ error: 'subscription update failed', details: updateErr }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } else {
      const { error: insertErr } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          package_type: 'starter',
          status: 'active',
          revenue_cat_id: productIdentifier,
        });
      if (insertErr) {
        return new Response(JSON.stringify({ error: 'subscription insert failed', details: insertErr }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Dodeli workout plan — uzmi prvi dostupan plan
    const { data: plan, error: planErr } = await supabase
      .from('workout_plans')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (planErr) {
      return new Response(JSON.stringify({ error: 'workout_plans query failed', details: planErr }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!plan) {
      return new Response(JSON.stringify({ error: 'no workout plan found in database' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { error: upsertErr } = await supabase
      .from('user_workout_plans')
      .upsert(
        { user_id: user.id, workout_plan_id: plan.id },
        { onConflict: 'user_id,workout_plan_id' },
      );

    if (upsertErr) {
      return new Response(JSON.stringify({ error: 'user_workout_plans upsert failed', details: upsertErr }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, userId: user.id, planId: plan.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
