import { Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

export default function TrainerBio() {
  return (
    <Card>
      <Text style={styles.title}>Moja priča</Text>
      <Text style={styles.text}>
        Počela sam da treniram sa 25 godina kada sam i sama imala problema sa viškom kilograma. Danas, nakon 8 godina rada sa preko 200 klijentkinja, moja misija je da svaka žena otkrije koliko je zapravo jaka. Specijalizovana sam za rad sa ženama srednjih godina.
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 8,
  },
  text: {
    ...Typography.description,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
