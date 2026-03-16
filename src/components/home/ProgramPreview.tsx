import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Divider from '@/components/ui/Divider';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

const PROGRAMS = [
  { name: 'Noge + gluteus', duration: '30-40 min' },
  { name: 'Gornji deo tela', duration: '30-40 min' },
  { name: 'Full body', duration: '30-40 min' },
];

export default function ProgramPreview() {
  return (
    <Card>
      <Text style={styles.title}>Tvoj program</Text>
      {PROGRAMS.map((item, i) => (
        <View key={i}>
          {i > 0 && <Divider />}
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
            <Ionicons name="lock-closed-outline" size={18} color={Colors.muted} style={{ opacity: 0.5 }} />
          </View>
        </View>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  name: {
    ...Typography.body,
    fontWeight: '500',
    color: Colors.text,
  },
  duration: {
    ...Typography.small,
    color: Colors.muted,
  },
});
