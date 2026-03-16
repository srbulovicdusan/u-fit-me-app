import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Avatar from '@/components/ui/Avatar';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';
import { TRAINER_NAME, TRAINER_INITIALS, TRAINER_TITLE } from '@/constants/strings';

export default function TrainerHero() {
  return (
    <LinearGradient colors={[Colors.primaryLight, Colors.highlight]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
      <Avatar initials={TRAINER_INITIALS} size="lg" />
      <Text style={styles.name}>{TRAINER_NAME}</Text>
      <Text style={styles.title}>{TRAINER_TITLE}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...Typography.h1Display,
    color: Colors.text,
    marginTop: 10,
  },
  title: {
    ...Typography.description,
    color: Colors.textSecondary,
  },
});
