import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface OnboardingStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function OnboardingStepIndicator({ totalSteps, currentStep }: OnboardingStepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <View key={i} style={[styles.bar, i <= currentStep && styles.barActive]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.border,
  },
  barActive: {
    backgroundColor: Colors.primary,
  },
});
