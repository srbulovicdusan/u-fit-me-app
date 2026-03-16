import { View, StyleSheet } from 'react-native';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { Spacing } from '@/constants/typography';

interface OnboardingNavButtonsProps {
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
}

export default function OnboardingNavButtons({ isFirst, isLast, canProceed, onBack, onNext }: OnboardingNavButtonsProps) {
  return (
    <View style={styles.container}>
      {!isFirst && (
        <PrimaryButton title="Nazad" onPress={onBack} variant="outline" style={styles.back} />
      )}
      <PrimaryButton
        title={isLast ? 'Započni' : 'Nastavi'}
        onPress={onNext}
        disabled={!canProceed}
        style={styles.next}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.xl,
  },
  back: {
    paddingHorizontal: 20,
  },
  next: {
    flex: 1,
  },
});
