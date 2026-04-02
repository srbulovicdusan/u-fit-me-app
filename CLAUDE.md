# FitSa

Fitness app za žene (35-55), personalni trener Maja Petrović. Srpski jezik UI.

## Tech Stack

- **Expo SDK 55** + Expo Router (file-based routing)
- **React Native 0.83** / React 19 / TypeScript 5.9
- **Supabase** — auth + database
- **RevenueCat** (`react-native-purchases`) — jednokratna kupovina plana treninga
- **TanStack React Query** — data fetching, cache, mutations
- App scheme: `fitsa`, bundle ID: `com.markobijelovic.pt`

## Struktura

```
app/                          # Expo Router
├── index.tsx                 # Router guard (onboarding → auth → subscription → redirect)
├── splash.tsx                # Animated splash
├── onboarding.tsx            # 5-step onboarding (AsyncStorage flag)
├── (auth)/                   # sign-in, sign-up
├── (free)/                   # 4 taba: Početna, O treneru, Paketi, Profil
├── (paid)/                   # 5 tabova: Početna, Treninzi, Napredak, Chat, Profil
└── workout/                  # Active workout flow + exercise video

src/
├── components/               # Po feature: ui/, home/, workout/, chat/, packages/, etc.
├── constants/                # colors.ts, typography.ts, strings.ts
├── providers/                # auth-provider.tsx, query-provider.tsx, subscription-provider.tsx
├── hooks/                    # use-auth, use-subscription, use-workout, use-workout-plan, etc.
├── lib/                      # supabase.ts, revenue-cat.ts
├── data/                     # workouts.ts (mock/seed data)
├── types/                    # TypeScript tipovi sa barrel export (index.ts)
└── utils/                    # date.ts, format.ts
```

## Konvencije

- **Imenovanje fajlova: kebab-case** — svi fajlovi u `src/` koriste kebab-case (npr. `use-workout-plan.ts`, `next-video-card.tsx`, `auth-provider.tsx`). NIKAD ne koristiti camelCase ili PascalCase za nazive fajlova.
- Path alias: `@/*` → `./src/*`
- Dizajn sistem: koristi `Colors` iz `@/constants/colors`, `Typography`/`Spacing` iz `@/constants/typography`
- **Fontovi**: `Plus Jakarta Sans` za naslove (h1, h2, h3), `Inter` za ostali tekst (body, description, labels, buttons). Učitavaju se u `app/_layout.tsx` preko `expo-font`. Font familije: `PlusJakartaSans_400Regular`, `PlusJakartaSans_500Medium`, `PlusJakartaSans_600SemiBold`, `PlusJakartaSans_700Bold`, `Inter_400Regular`, `Inter_500Medium`, `Inter_600SemiBold`
- Komponente: default export, funkcionalne, `StyleSheet.create` na dnu fajla
- `PrimaryButton` varijante: `primary`, `outline`, `success`, `ghost`
- Provideri se wrappuju u `app/_layout.tsx`: AuthProvider → QueryProvider → SubscriptionProvider → Stack
- `app/index.tsx` je router guard: onboarding (AsyncStorage) → free/paid
- Route grupe: `(auth)` za login, `(free)` za neulogovane/besplatne, `(paid)` za pretplatnike
- Data fetching: koristiti React Query (`useQuery`, `useMutation`) za sve Supabase upite

## Baza podataka (Supabase)

```
profiles                    # Auto-kreiran trigger na auth.users
subscriptions               # RevenueCat sync
workout_plans               # Globalni planovi (bez user_id)
user_workout_plans           # Many-to-many: user ↔ plan
workout_days                # Dani unutar plana
exercises                   # Statička tabela vežbi (name, video_url)
workout_day_exercises        # Many-to-many: dan ↔ vežba (sets, order)
exercise_completions         # User odradio vežbu
workout_completions          # User završio ceo trening (rating, duration)
progress_entries            # Merenja (težina, obimi, foto)
chat_messages               # Realtime chat sa trenerom
```

Migracija: `migrations/001_initial_schema.sql`

## Environment (.env.local)

```
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_REVENUECAT_IOS=
EXPO_PUBLIC_REVENUECAT_ANDROID=
```

## Komande

```bash
npm start          # Expo dev server
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```
