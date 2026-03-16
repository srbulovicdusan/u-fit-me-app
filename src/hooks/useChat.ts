import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';
import { CHAT_MESSAGES } from '@/data/workouts';
import type { ChatMessage } from '@/types';

export function useChat() {
  const { session } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    // Subscribe to new messages via Supabase Realtime
    const channel = supabase
      .channel('chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `user_id=eq.${session.user.id}`,
        },
        (payload) => {
          const msg = payload.new as Record<string, string>;
          setMessages(prev => [...prev, {
            id: msg.id,
            from: msg.sender as ChatMessage['from'],
            text: msg.content,
            time: new Date(msg.created_at).toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' }),
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user]);

  const sendMessage = useCallback(async (text: string) => {
    if (!session?.user || !text.trim()) return;

    // Optimistic update
    const optimistic: ChatMessage = {
      id: Date.now().toString(),
      from: 'user',
      text: text.trim(),
      time: 'Sada',
    };
    setMessages(prev => [...prev, optimistic]);

    // Send to Supabase
    await supabase.from('chat_messages').insert({
      user_id: session.user.id,
      sender: 'user',
      content: text.trim(),
    });
  }, [session?.user]);

  return { messages, isLoading, sendMessage };
}
