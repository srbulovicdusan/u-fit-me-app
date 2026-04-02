import { Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/card';
import SectionLabel from '@/components/ui/section-label';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

export default function DailyTip() {
  return (
    <Card>
      <SectionLabel text="SAVET DANA" />
      <Text style={styles.text}>
        "Hidracija je ključ! Pij čašu vode odmah ujutru pre svega ostalog — tvoje telo će ti biti zahvalno." — Maja
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  text: {
    ...Typography.body,
    color: Colors.text,
  },
});
