import { View, StyleSheet } from 'react-native';
import PrimaryButton from '@/components/ui/primary-button';

interface OnboardingNavButtonsProps {
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
  onBack: () => void;
  onNext: () => void;
  buttonLabel?: string;
}

export default function OnboardingNavButtons({ canProceed, onNext, buttonLabel = 'NASTAVI' }: OnboardingNavButtonsProps) {
  return (
    <View style={styles.container}>
      <PrimaryButton
        title={buttonLabel}
        onPress={onNext}
        disabled={!canProceed}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
  },
  button: {
    width: '100%',
  },
});
