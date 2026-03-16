import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

interface FeatureItemProps {
  text: string;
}

export default function FeatureItem({ text }: FeatureItemProps) {
  return (
    <View style={styles.row}>
      <Ionicons name="checkmark" size={16} color={Colors.success} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  text: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
