import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import type { OnboardingStep } from '@/types';

interface OnboardingStepContentProps {
  step: OnboardingStep;
}

export default function OnboardingStepContent({ step }: OnboardingStepContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.subtitle}>{step.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 26,
    color: Colors.text,
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
