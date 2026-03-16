import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import { formatDate } from '@/utils/date';

interface HomeHeaderProps {
  greeting: string;
}

export default function HomeHeader({ greeting }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{formatDate()}</Text>
      <Text style={styles.greeting}>{greeting}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xs,
  },
  date: {
    ...Typography.description,
    color: Colors.textSecondary,
  },
  greeting: {
    ...Typography.h1Display,
    color: Colors.text,
  },
});
