import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import type { OnboardingStep } from '@/types';

interface OnboardingStepContentProps {
  step: OnboardingStep;
}

export default function OnboardingStepContent({ step }: OnboardingStepContentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{step.emoji}</Text>
      <Text style={styles.title}>{step.title}</Text>
      <Text style={styles.subtitle}>{step.subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  emoji: {
    fontSize: 52,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    fontFamily: 'Georgia',
    lineHeight: 32,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
});
