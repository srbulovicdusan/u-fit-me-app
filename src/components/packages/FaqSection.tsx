import { View, Text, StyleSheet } from 'react-native';
import Card from '@/components/ui/Card';
import Divider from '@/components/ui/Divider';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

const FAQ = [
  { q: 'Da li mogu da treniram kod kuće?', a: 'Da! Svi treninzi su prilagođeni za trening kod kuće sa minimalnom opremom.' },
  { q: 'Šta ako mi je trening pretežak?', a: 'Svaka vežba ima lakšu alternativu. Plus, u chatu možeš da pitaš za prilagođavanje.' },
  { q: 'Da li ima rok trajanja?', a: 'Ne! Kupljeni paket je tvoj zauvek, bez vremenskog ograničenja.' },
];

export default function FaqSection() {
  return (
    <Card>
      <Text style={styles.title}>Česta pitanja</Text>
      {FAQ.map((item, i) => (
        <View key={i}>
          {i > 0 && <Divider />}
          <View style={styles.item}>
            <Text style={styles.question}>{item.q}</Text>
            <Text style={styles.answer}>{item.a}</Text>
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
    marginBottom: 10,
  },
  item: {
    paddingVertical: 10,
  },
  question: {
    ...Typography.description,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  answer: {
    ...Typography.small,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
});
