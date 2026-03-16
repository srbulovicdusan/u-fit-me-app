import { Stack } from 'expo-router';

export default function WorkoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="active" />
      <Stack.Screen name="exercise-video" />
      <Stack.Screen
        name="completion"
        options={{ presentation: 'fullScreenModal' }}
      />
    </Stack>
  );
}
