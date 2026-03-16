import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import { APP_NAME } from '@/constants/strings';
import { useAuth } from '@/hooks/useAuth';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri prijavi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
        <Text style={styles.logo}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Prijavi se na svoj nalog</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Lozinka"
          placeholderTextColor={Colors.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <PrimaryButton title="Prijavi se" onPress={handleSignIn} loading={loading} />

        <Link href="/(auth)/sign-up" style={styles.link}>
          <Text style={styles.linkText}>Nemaš nalog? <Text style={styles.linkBold}>Registruj se</Text></Text>
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  logo: {
    ...Typography.logo,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.description,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Spacing.buttonRadius,
    padding: 14,
    fontSize: 14,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  error: {
    ...Typography.small,
    color: Colors.danger,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  link: {
    marginTop: Spacing.xl,
    alignSelf: 'center',
  },
  linkText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  linkBold: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
