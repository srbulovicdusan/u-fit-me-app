import { Stack } from 'expo-router';

export default function WorkoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="detail" />
      <Stack.Screen
        name="exercise-video"
        options={{ presentation: 'fullScreenModal', orientation: 'all' }}
      />
      <Stack.Screen
        name="completion"
        options={{ presentation: 'fullScreenModal' }}
      />
    </Stack>
  );
}
