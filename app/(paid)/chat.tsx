import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatHeader from '@/components/chat/chat-header';
import MessageList from '@/components/chat/message-list';
import ChatInput from '@/components/chat/chat-input';
import { useChat } from '@/hooks/use-chat';
import { Colors } from '@/constants/colors';

export default function ChatScreen() {
  const { messages, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');

  function handleSend() {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ChatHeader />
      <MessageList messages={messages} />
      <ChatInput value={inputText} onChangeText={setInputText} onSend={handleSend} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
