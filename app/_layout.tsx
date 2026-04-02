import { Text, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@/providers/auth-provider';
import { QueryProvider } from '@/providers/query-provider';
import { SubscriptionProvider } from '@/providers/subscription-provider';

// Set Inter as default font for all Text and TextInput components
const defaultTextStyle = { fontFamily: 'Inter_400Regular' };
// @ts-expect-error -- RN defaultProps override
Text.defaultProps = { ...Text.defaultProps, style: defaultTextStyle };
// @ts-expect-error -- RN defaultProps override
TextInput.defaultProps = { ...TextInput.defaultProps, style: defaultTextStyle };

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
      <QueryProvider>
      <SubscriptionProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(free)" />
          <Stack.Screen name="(paid)" />
          <Stack.Screen name="workout" />
        </Stack>
      </SubscriptionProvider>
      </QueryProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}
