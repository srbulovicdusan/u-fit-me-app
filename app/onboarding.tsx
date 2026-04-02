import { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/colors';
import { ONBOARDING_STEPS } from '@/data/workouts';
import OnboardingStepIndicator from '@/components/onboarding/onboarding-step-indicator';
import OnboardingStepContent from '@/components/onboarding/onboarding-step-content';
import OnboardingOption from '@/components/onboarding/onboarding-option';
import OnboardingNavButtons from '@/components/onboarding/onboarding-nav-buttons';
import PrimaryButton from '@/components/ui/primary-button';
import type { OnboardingSelections } from '@/types';

const ONBOARDING_DONE_KEY = 'fitsa_onboarding_done';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const bgImage = require('../assets/onboarding-bg.png');

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<OnboardingSelections>({});

  const current = ONBOARDING_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === ONBOARDING_STEPS.length - 1;
  const canProceed = !current.options || selections[step] !== undefined;

  async function handleNext() {
    if (isLast) {
      await AsyncStorage.setItem(ONBOARDING_DONE_KEY, 'true');
      router.replace('/');
    } else {
      setStep(s => s + 1);
    }
  }

  // Welcome screen (step 0) — sa pozadinskom slikom
  if (isFirst) {
    return (
      <ImageBackground source={bgImage} style={styles.bgImage} resizeMode="cover" imageStyle={styles.bgImageOffset}>
        <LinearGradient
          colors={['rgba(143, 175, 154, 0)', '#7C9E89']}
          locations={[0, 0.95
            
          ]}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.welcomeContainer}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeTitle}>Dobrodošla!</Text>
            <Text style={styles.welcomeName}>Ja sam Marko, tvoj trener</Text>
            <Text style={styles.welcomeSubtitle}>
              Zajedno ćemo napraviti plan treninga za tvoje ciljeve i tvoj život, bez stresa i pretjerivanja.
            </Text>
          </View>
          <View style={styles.welcomeButton}>
            <PrimaryButton title="Kreiraj moj plan" onPress={handleNext} variant="secondary" />
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  // Step screens (1-4)
  const totalQuestionSteps = ONBOARDING_STEPS.length - 1; // bez welcome
  const questionStep = step; // 1-based za "Korak X od Y"

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingStepIndicator
        totalSteps={totalQuestionSteps}
        currentStep={questionStep}
      />
      <View style={styles.content}>
        <OnboardingStepContent step={current} />
        <View style={styles.optionsList}>
          {current.options?.map((opt, i) => (
            <OnboardingOption
              key={i}
              label={opt.label}
              description={opt.description}
              icon={opt.icon}
              selected={selections[step] === opt.label}
              onPress={() => setSelections({ ...selections, [step]: opt.label })}
            />
          ))}
        </View>
      </View>
      <OnboardingNavButtons
        isFirst={false}
        isLast={isLast}
        canProceed={canProceed}
        onBack={() => setStep(s => s - 1)}
        onNext={handleNext}
        buttonLabel={isLast ? 'Započni' : 'NASTAVI'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  bgImageOffset: {
    top: -100,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  welcomeContent: {
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  welcomeTitle: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 4,
  },
  welcomeName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 28,
    color: Colors.white,
    lineHeight: 34,
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: Colors.white,
    lineHeight: 22,
  },
  welcomeButton: {
    paddingHorizontal: 28,
    paddingBottom: 32,
    paddingTop: 16,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  optionsList: {
    marginTop: 8,
  },
});
