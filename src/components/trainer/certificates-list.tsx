import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/card';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const CERTS = [
  'ACE Certified Personal Trainer',
  'Nutrition Coach — Precision Nutrition',
  'Corrective Exercise Specialist',
];

export default function CertificatesList() {
  return (
    <Card>
      <Text style={styles.title}>Sertifikati</Text>
      {CERTS.map((cert, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.text}>{cert}</Text>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  text: {
    ...Typography.description,
    color: Colors.textSecondary,
  },
});
