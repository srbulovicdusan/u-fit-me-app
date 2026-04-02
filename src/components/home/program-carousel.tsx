import { useRef, useEffect } from 'react';
import { View, Text, Image, Animated, StyleSheet, Dimensions } from 'react-native';
import { Lock, Clock, Dumbbell } from 'lucide-react-native';
import Carousel from '@/components/ui/carousel';
import { useWorkoutWeek } from '@/hooks/use-workout-week';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';
import type { PreviewDay } from '@/hooks/use-workout-week';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.round(SCREEN_WIDTH * 0.52);
const IMAGE_HEIGHT = 130;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fallbackImage = require('../../../assets/trening-mock.png');

function SkeletonCard() {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.4, duration: 750, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 750, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  return (
    <Animated.View style={{ opacity: anim }}>
      <View style={sk.imageBlock} />
      <View style={sk.textBlock}>
        <View style={[sk.bone, { width: '70%', height: 14, marginBottom: 6 }]} />
        <View style={[sk.bone, { width: '50%', height: 11 }]} />
      </View>
    </Animated.View>
  );
}

function ProgramCard({ day }: { day: PreviewDay }) {
  return (
    <View>
      {/* Slika sa blur + lock u centru */}
      <View style={styles.imageContainer}>
        <Image source={day.coverUrl ? { uri: day.coverUrl } : fallbackImage} style={styles.image} resizeMode="cover" blurRadius={7} />
        <View style={styles.lockOverlay}>
          <Lock size={24} color={Colors.white} strokeWidth={2} />
        </View>
      </View>

      {/* Tekst ispod slike */}
      <View style={styles.cardText}>
        <Text style={styles.cardTitle} numberOfLines={1}>{day.name}</Text>
        <View style={styles.cardMeta}>
          <Dumbbell size={13} color={Colors.textSecondary} strokeWidth={2} />
          <Text style={styles.cardMetaText}>{day.exerciseCount} vežbi</Text>
          <Text style={styles.cardMetaDot}>•</Text>
          <Clock size={13} color={Colors.textSecondary} strokeWidth={2} />
          <Text style={styles.cardMetaText}>{day.durationMin} min</Text>
        </View>
      </View>
    </View>
  );
}

export default function ProgramCarousel() {
  const { days, isLoading } = useWorkoutWeek();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Šta dobijas u programu</Text>
      </View>

      {isLoading ? (
        <View style={sk.skeletonRow}>
          <View style={{ width: CARD_WIDTH }}><SkeletonCard /></View>
          <View style={{ width: 12 }} />
          <View style={{ width: CARD_WIDTH }}><SkeletonCard /></View>
        </View>
      ) : (
        <Carousel
          data={days}
          itemWidth={CARD_WIDTH}
          peekWidth={24}
          gap={12}
          renderItem={(day) => <ProgramCard day={day} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  header: {
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    color: Colors.text,
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  lockText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.white,
  },
  cardText: {
    paddingTop: 8,
    gap: 4,
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 18,
    lineHeight: 18,
    color: Colors.text,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardMetaText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 14,
    color: Colors.textSecondary,
  },
  cardMetaDot: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.muted,
  },
});

const sk = StyleSheet.create({
  skeletonRow: {
    flexDirection: 'row',
    paddingLeft: Spacing.screenPadding,
  },
  imageBlock: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 12,
    backgroundColor: Colors.border,
  },
  textBlock: {
    paddingTop: 8,
  },
  bone: {
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
});
