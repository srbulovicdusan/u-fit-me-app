import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Redirect } from 'expo-router';
import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { APP_NAME, TRAINER_NAME } from '@/constants/strings';

const ONBOARDING_DONE_KEY = 'fitsa_onboarding_done';

export default function Index() {
  const { session, isLoading: authLoading } = useAuth();
  const { isSubscribed, isLoading: subLoading } = useSubscription();
  const [localOnboarded, setLocalOnboarded] = useState<boolean | null>(null);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 800 }), -1);
    AsyncStorage.getItem(ONBOARDING_DONE_KEY).then(val => {
      setLocalOnboarded(val === 'true');
    });
  }, []);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Prikaži splash inline dok se učitava
  if (authLoading || subLoading || localOnboarded === null) {
    return (
      <LinearGradient
        colors={[Colors.primaryLight, Colors.bg, Colors.accentLight]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ ...Typography.logo, color: Colors.primary, letterSpacing: -2 }}>{APP_NAME}</Text>
        <Text style={{ ...Typography.description, color: Colors.textSecondary, marginTop: 8, letterSpacing: 3, textTransform: 'uppercase' }}>
          by {TRAINER_NAME}
        </Text>
        <Animated.View
          style={[
            { marginTop: 48, width: 32, height: 32, borderWidth: 2.5, borderColor: Colors.border, borderTopColor: Colors.primary, borderRadius: 16 },
            spinStyle,
          ]}
        />
      </LinearGradient>
    );
  }

  if (!localOnboarded) {
    return <Redirect href="/onboarding" />;
  }

  if (session && isSubscribed) {
    return <Redirect href="/(paid)" />;
  }

  return <Redirect href="/(free)" />;
}
