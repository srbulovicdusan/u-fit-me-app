import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { APP_NAME, TRAINER_NAME } from '@/constants/strings';

export default function SplashScreen() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 800 }), -1);
    const timer = setTimeout(() => router.replace('/'), 2000);
    return () => clearTimeout(timer);
  }, []);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <LinearGradient
      colors={[Colors.primaryLight, Colors.bg, Colors.accentLight]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.logo}>{APP_NAME}</Text>
      <Text style={styles.subtitle}>by {TRAINER_NAME}</Text>
      <Animated.View style={[styles.spinner, spinStyle]} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    ...Typography.logo,
    color: Colors.primary,
    letterSpacing: -2,
  },
  subtitle: {
    ...Typography.description,
    color: Colors.textSecondary,
    marginTop: 8,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  spinner: {
    marginTop: 48,
    width: 32,
    height: 32,
    borderWidth: 2.5,
    borderColor: Colors.border,
    borderTopColor: Colors.primary,
    borderRadius: 16,
  },
});
