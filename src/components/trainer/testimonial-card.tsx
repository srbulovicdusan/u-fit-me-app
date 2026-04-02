import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

export default function TestimonialCard() {
  return (
    <View style={styles.card}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map(i => (
          <Text key={i} style={styles.star}>★</Text>
        ))}
      </View>
      <Text style={styles.quote}>
        "Maja je promenila moj život. Sa 47 godina sam u boljoj formi nego sa 30. Treninzi su prilagođeni baš meni i uvek je tu kad mi treba."
      </Text>
      <Text style={styles.author}>— Snežana K., 47</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.screenPadding,
    padding: 16,
    paddingHorizontal: 18,
    borderRadius: Spacing.cardRadius,
    backgroundColor: Colors.primaryLight,
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 8,
  },
  star: {
    color: '#D4A84B',
    fontSize: 16,
  },
  quote: {
    ...Typography.description,
    color: Colors.primaryPressed,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  author: {
    ...Typography.small,
    fontWeight: '600',
    color: Colors.primary,
  },
});
