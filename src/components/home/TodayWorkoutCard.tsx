import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Spacing } from '@/constants/typography';
import GradientOverlay from '@/components/ui/GradientOverlay';

interface TodayWorkoutCardProps {
  name: string;
  exerciseCount: number;
  duration: string;
  onStart: () => void;
}

export default function TodayWorkoutCard({ name, exerciseCount, duration, onStart }: TodayWorkoutCardProps) {
  return (
    <GradientOverlay
      source={require('../../../assets/hero.jpg')}
      style={styles.card}
      imageStyle={styles.image}
    >
      <Text style={styles.label}>DANAŠNJI TRENING</Text>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.meta}>{exerciseCount} vežbi • {duration}</Text>
      <TouchableOpacity style={styles.button} onPress={onStart} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Započni trening →</Text>
      </TouchableOpacity>
    </GradientOverlay>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.cardMargin,
    borderRadius: Spacing.cardRadiusLg,
    overflow: 'hidden',
    minHeight: 140,
  },
  image: {
    borderRadius: Spacing.cardRadiusLg,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
    paddingTop: Spacing.screenPadding,
    paddingHorizontal: Spacing.screenPadding,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 6,
    paddingHorizontal: Spacing.screenPadding,
  },
  meta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 14,
    paddingHorizontal: Spacing.screenPadding,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    paddingVertical: 11,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.screenPadding,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
