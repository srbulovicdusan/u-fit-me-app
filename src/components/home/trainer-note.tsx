import { Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/card';
import SectionLabel from '@/components/ui/section-label';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface TrainerNoteProps {
  message: string;
}

export default function TrainerNote({ message }: TrainerNoteProps) {
  return (
    <Card>
      <SectionLabel text="PORUKA OD MAJE" />
      <Text style={styles.text}>{message}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Typography.body,
    color: Colors.text,
  },
});
