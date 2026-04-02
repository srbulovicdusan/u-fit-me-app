import { FlatList, StyleSheet } from 'react-native';
import ChatBubble from './chat-bubble';
import { Spacing } from '@/constants/typography';
import type { ChatMessage } from '@/types';

interface MessageListProps {
  messages: ChatMessage[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatBubble message={item} />}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.lg,
    flexGrow: 1,
  },
});
