import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import type { ChatMessage } from '@/types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.from === 'user';

  return (
    <View style={[styles.wrapper, isUser ? styles.wrapperUser : styles.wrapperTrainer]}>
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleTrainer]}>
        <Text style={[styles.text, isUser && styles.textUser]}>{message.text}</Text>
        <Text style={[styles.time, isUser && styles.timeUser]}>{message.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  wrapperUser: {
    alignItems: 'flex-end',
  },
  wrapperTrainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleTrainer: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    color: Colors.text,
  },
  textUser: {
    color: Colors.white,
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.6,
    textAlign: 'right',
    color: Colors.muted,
  },
  timeUser: {
    color: Colors.white,
  },
});
