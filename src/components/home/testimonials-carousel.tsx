import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Star } from 'lucide-react-native';
import Carousel from '@/components/ui/carousel';
import Card from '@/components/ui/card';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - Spacing.screenPadding * 2 - 32; // puni width minus peek

const TESTIMONIALS = [
  {
    id: '1',
    quote: 'Konačno program koji prati moj tempo! Maja objašnjava sve jasno i treninzi su baš prilagođeni ženama. Za mesec dana videla sam prve rezultate.',
    name: 'Jelena M.',
    initials: 'JM',
  },
  {
    id: '2',
    quote: 'Nikada nisam bila sportski tip, ali ovo mi je promenilo perspektivu. Treninzi su kratki, efikasni i nikad mi nije dosadno. Preporučujem svim ženama!',
    name: 'Ana K.',
    initials: 'AK',
  },
  {
    id: '3',
    quote: 'Posle drugog porođaja nisam znala odakle da počnem. Maja je baš razumela šta mi treba. Osećam se jače i samopouzdanije nego ikad.',
    name: 'Milica P.',
    initials: 'MP',
  },
];

type Testimonial = typeof TESTIMONIALS[number];

function StarRow() {
  return (
    <View style={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} color={Colors.accent} fill={Colors.accent} strokeWidth={0} />
      ))}
    </View>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <Card style={styles.card}>
      <StarRow />
      <Text style={styles.quote}>"{item.quote}"</Text>
      <View style={styles.author}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.initials}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </Card>
  );
}

export default function TestimonialsCarousel() {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Iskustva korisnica</Text>
      </View>
      <Carousel
        data={TESTIMONIALS}
        itemWidth={CARD_WIDTH}
        peekWidth={32}
        gap={0}
        firstItemOffset={0}
        renderItem={(item) => <TestimonialCard item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xxl,
  },
  header: {
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.h2,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.text,
  },
  card: {
    marginHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.cardMargin,
    gap: 10,
  },
  stars: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 2,
  },
  quote: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.text,
    fontStyle: 'italic',
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 11,
    color: Colors.primary,
  },
  name: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    color: Colors.text,
  },
});
