import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/card';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import type { Exercise } from '@/types';

interface ExerciseDetailsProps {
  exercise: Exercise;
}

export default function ExerciseDetails({ exercise }: ExerciseDetailsProps) {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.label}>Serije × ponavljanja</Text>
        <Text style={styles.setsValue}>{exercise.sets}</Text>
      </Card>

      <Card>
        <Text style={styles.label}>Tehnika</Text>
        <Text style={styles.text}>
          Drži leđa ravno, kolena u liniji sa prstima. Kontrolisan pokret nadole, eksplozivan nagore.
        </Text>
      </Card>

      <Card style={styles.tipCard}>
        <Text style={styles.tipLabel}>💡 Tips od Maje</Text>
        <Text style={styles.tipText}>
          Ako ti je teško, smanji opseg pokreta. Bitnije je da radiš pravilno nego duboko!
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  label: {
    ...Typography.description,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  setsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  text: {
    ...Typography.description,
    color: Colors.textSecondary,
  },
  tipCard: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primaryLight,
  },
  tipLabel: {
    ...Typography.description,
    fontWeight: '600',
    color: Colors.primaryPressed,
    marginBottom: 4,
  },
  tipText: {
    ...Typography.description,
    color: Colors.primaryPressed,
  },
});
