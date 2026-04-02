import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from '@/components/ui/progress-bar';
import { Colors } from '@/constants/colors';

interface OnboardingStepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function OnboardingStepIndicator({ totalSteps, currentStep }: OnboardingStepIndicatorProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);
  const progress = currentStep / totalSteps;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>Korak {currentStep} od {totalSteps}</Text>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
      <ProgressBar progress={progress} color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  percent: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
