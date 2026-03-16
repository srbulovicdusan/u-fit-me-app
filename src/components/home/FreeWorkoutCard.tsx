import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

interface FreeWorkoutCardProps {
  onStart: () => void;
}

export default function FreeWorkoutCard({ onStart }: FreeWorkoutCardProps) {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.accent]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.label}>BESPLATAN TRENING</Text>
      <Text style={styles.title}>7-minutni jutarnji trening</Text>
      <Text style={styles.subtitle}>Probaj kako izgleda trening sa mnom</Text>
      <TouchableOpacity style={styles.button} onPress={onStart} activeOpacity={0.7}>
        <Text style={styles.buttonText}>▶ Započni</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.md,
    padding: Spacing.screenPadding,
    borderRadius: Spacing.cardRadiusLg,
  },
  label: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    opacity: 0.8,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.85,
    color: '#FFFFFF',
    marginBottom: 14,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
