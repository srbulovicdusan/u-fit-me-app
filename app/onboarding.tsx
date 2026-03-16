import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/hooks/useAuth';
import { ONBOARDING_STEPS } from '@/data/workouts';
import OnboardingStepIndicator from '@/components/onboarding/OnboardingStepIndicator';
import OnboardingStepContent from '@/components/onboarding/OnboardingStepContent';
import OnboardingOption from '@/components/onboarding/OnboardingOption';
import OnboardingNavButtons from '@/components/onboarding/OnboardingNavButtons';
import type { OnboardingSelections } from '@/types';

export default function OnboardingScreen() {
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<OnboardingSelections>({});

  const current = ONBOARDING_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === ONBOARDING_STEPS.length - 1;
  const canProceed = !current.options || selections[step] !== undefined;

  async function handleNext() {
    if (isLast) {
      await updateProfile({ isOnboarded: true });
      router.replace('/');
    } else {
      setStep(s => s + 1);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingStepIndicator totalSteps={ONBOARDING_STEPS.length} currentStep={step} />
      <View style={styles.content}>
        <OnboardingStepContent step={current} />
        {current.options?.map(opt => (
          <OnboardingOption
            key={opt}
            label={opt}
            selected={selections[step] === opt}
            onPress={() => setSelections({ ...selections, [step]: opt })}
          />
        ))}
      </View>
      <OnboardingNavButtons
        isFirst={isFirst}
        isLast={isLast}
        canProceed={canProceed}
        onBack={() => setStep(s => s - 1)}
        onNext={handleNext}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
});
