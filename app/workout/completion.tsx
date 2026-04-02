import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CompletionStats from '@/components/workout/completion-stats';
import PrimaryButton from '@/components/ui/primary-button';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

const EMOJIS = ['😩', '😅', '💪', '😊', '🔥'];

export default function CompletionScreen() {
  const [rating, setRating] = useState<number | null>(null);

  function handleClose() {
    router.dismissAll();
  }

  return (
    <LinearGradient colors={[Colors.successLight, Colors.bg]} locations={[0, 0.6]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.emoji}>🎉</Text>
        <Text style={styles.title}>Svaka čast!</Text>
        <Text style={styles.subtitle}>Trening je završen. Ti si neuništiva!</Text>

        <CompletionStats streak={6} duration="32m" />

        <View style={styles.ratingRow}>
          {EMOJIS.map((e, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.ratingButton, rating === i && styles.ratingSelected]}
              onPress={() => setRating(i)}
              activeOpacity={0.7}
            >
              <Text style={styles.ratingEmoji}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingLabel}>Kako ti je bio trening?</Text>

        <View style={styles.buttons}>
          <PrimaryButton title="Podeli sa trenerom 💬" onPress={() => {}} />
          <PrimaryButton title="Zatvori" onPress={handleClose} variant="outline" />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    fontFamily: 'Georgia',
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
    width: '100%',
  },
  ratingButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    alignItems: 'center',
  },
  ratingSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  ratingEmoji: {
    fontSize: 20,
  },
  ratingLabel: {
    ...Typography.small,
    color: Colors.muted,
    marginTop: 6,
  },
  buttons: {
    width: '100%',
    gap: 8,
    marginTop: 24,
  },
});
