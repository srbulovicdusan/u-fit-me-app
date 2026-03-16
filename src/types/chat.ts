export type MessageSender = 'user' | 'trainer';

export interface ChatMessage {
  id: string;
  from: MessageSender;
  text: string;
  time: string;
  createdAt?: string;
}
