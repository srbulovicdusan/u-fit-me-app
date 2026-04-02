import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Dumbbell, Clock, BarChart2 } from 'lucide-react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 360;
const BONE = Colors.bgSecondary;
const BONE_DARK = Colors.border;

function usePulse() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.35, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [opacity]);

  return opacity;
}

function Bone({ w, h, radius = 6, style }: { w: number | string; h: number; radius?: number; style?: object }) {
  return <View style={[{ width: w as number, height: h, borderRadius: radius, backgroundColor: BONE }, style]} />;
}

function ExerciseCardSkeleton() {
  return (
    <View style={sk.exerciseCard}>
      {/* thumbnail */}
      <View style={sk.exerciseThumb} />
      {/* text */}
      <View style={sk.exerciseInfo}>
        <Bone w="60%" h={13} style={{ marginBottom: 6 }} />
        <Bone w="35%" h={11} />
      </View>
      {/* checkbox */}
      <View style={sk.checkboxArea}>
        <View style={sk.checkbox} />
      </View>
    </View>
  );
}

export default function WorkoutDetailSkeleton() {
  const opacity = usePulse();

  return (
    <View style={sk.container}>
      <Animated.ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={sk.scrollContent}
        style={{ opacity }}
      >
        {/* ── Hero ─────────────────────────────────── */}
        <View style={[sk.hero, { backgroundColor: BONE_DARK }]}>
          <SafeAreaView style={sk.backButtonContainer}>
            <TouchableOpacity onPress={() => router.back()} style={sk.backButton}>
              <Ionicons name="chevron-back" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* ── Sadržaj ──────────────────────────────── */}
        <View style={sk.content}>
          {/* Title */}
          <Bone w="55%" h={26} radius={8} style={{ marginBottom: 12 }} />

          {/* Badges */}
          <View style={sk.badgeRow}>
            <View style={sk.badgePill}>
              <Clock size={13} color={Colors.muted} strokeWidth={2} />
              <Bone w={52} h={11} radius={4} />
            </View>
            <View style={sk.badgePill}>
              <Dumbbell size={13} color={Colors.muted} strokeWidth={2} />
              <Bone w={40} h={11} radius={4} />
            </View>
          </View>

          {/* Description lines */}
          <View style={sk.descBlock}>
            <Bone w="100%" h={13} radius={4} style={{ marginBottom: 7 }} />
            <Bone w="90%" h={13} radius={4} style={{ marginBottom: 7 }} />
            <Bone w="70%" h={13} radius={4} />
          </View>

          {/* Section header */}
          <View style={sk.sectionHeader}>
            <Dumbbell size={16} color={Colors.muted} strokeWidth={2} />
            <Bone w="48%" h={14} radius={4} />
          </View>

          {/* Progress row */}
          <View style={sk.progressBlock}>
            <View style={sk.progressTrack}>
              <View style={[sk.progressFill, { width: '0%' }]} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <BarChart2 size={13} color={Colors.muted} strokeWidth={2} />
              <Bone w={110} h={11} radius={4} />
            </View>
          </View>

          {/* Exercise cards */}
          <ExerciseCardSkeleton />
          <ExerciseCardSkeleton />
          <ExerciseCardSkeleton />
          <ExerciseCardSkeleton />
        </View>
      </Animated.ScrollView>

      {/* Bottom button placeholder */}
      <Animated.View style={[sk.bottomButton, { opacity }]}>
        <Bone w="100%" h={52} radius={14} style={{ backgroundColor: Colors.primaryLight }} />
      </Animated.View>
    </View>
  );
}

const sk = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  hero: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.md,
    marginTop: 8,
  },
  content: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 20,
    borderRadius: 16,
    backgroundColor: Colors.bg,
    marginTop: -20,
    borderTopWidth: 1,
    borderTopColor: Colors.bgSecondary,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.bgSecondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  descBlock: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 12,
  },
  progressBlock: {
    marginBottom: 16,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.bgSecondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primaryLight,
    borderRadius: 3,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 10,
    height: 78,
    overflow: 'hidden',
  },
  exerciseThumb: {
    width: 84,
    height: '100%',
    backgroundColor: BONE_DARK,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  exerciseInfo: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  checkboxArea: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: BONE_DARK,
    marginRight: 8,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 34,
    paddingTop: 12,
    backgroundColor: 'transparent',
  },
});
