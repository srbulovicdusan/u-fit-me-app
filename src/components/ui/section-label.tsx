import { Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface SectionLabelProps {
  text: string;
  color?: string;
}

export default function SectionLabel({ text, color = Colors.primary }: SectionLabelProps) {
  return <Text style={[styles.label, { color }]}>{text}</Text>;
}

const styles = StyleSheet.create({
  label: {
    ...Typography.labelUppercase,
    marginBottom: 4,
  },
});
