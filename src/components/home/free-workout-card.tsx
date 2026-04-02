import { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Dumbbell } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import type { WorkoutDay } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_HEIGHT = 180;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fallbackImage = require('../../../assets/trening-mock.png');

interface FreeWorkoutCardProps {
  workout: WorkoutDay | null;
  isLoading: boolean;
  onStart: () => void;
}

export default function FreeWorkoutCard({ workout, isLoading, onStart }: FreeWorkoutCardProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isLoading) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 750, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 750, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [isLoading, pulseAnim]);

  if (isLoading) {
    return <Animated.View style={[styles.skeleton, { opacity: pulseAnim }]} />;
  }

  if (!workout) return null;

  return (
    <View style={styles.card}>
      {/* Pozadinska slika */}
      <Image source={workout.coverUrl ? { uri: workout.coverUrl } : fallbackImage} style={styles.image} resizeMode="cover" />

      {/* Gradient overlay — cela karta */}
      <LinearGradient
        colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.55)']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Sadržaj — flex column, justify between */}
      <View style={styles.content}>
        {/* Gornji deo */}
        <View style={styles.top}>
          <Text style={styles.label}>TVOJ BESPLATAN TRENING</Text>
          <Text style={styles.title}>{workout.name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{workout.exercises.length} vežbi</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{workout.duration}</Text>
          </View>
        </View>

        {/* Dugme na dnu */}
        <TouchableOpacity style={styles.button} onPress={onStart} activeOpacity={0.85}>
          <LinearGradient
            colors={['rgba(143,175,154,0.12)', 'rgba(143,175,154,0.12)']}
            style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)' }]}
          />
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>Započni trening</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.md,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH - Spacing.screenPadding * 2,
    height: CARD_HEIGHT,
  },
  skeleton: {
    marginHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.md,
    height: CARD_HEIGHT,
    borderRadius: 16,
    backgroundColor: Colors.border,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  top: {
    gap: 4,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    letterSpacing: 0.8,
    color: Colors.white,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
    color: Colors.white,
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.white,
  },
  metaDot: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.white,
  },
  button: {
    alignSelf: 'flex-start',
    width: 179,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8FAF9A',
    overflow: 'hidden',
  },
  buttonInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 24,
    paddingRight: 24,
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 15,
    color: Colors.white,
  },
});
