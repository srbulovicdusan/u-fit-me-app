import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import { APP_NAME } from '@/constants/strings';
import { useAuth } from '@/hooks/use-auth';
import PrimaryButton from '@/components/ui/primary-button';

type OAuthProvider = 'google' | 'apple' | 'facebook';

const SOCIAL_PROVIDERS: { provider: OAuthProvider; label: string; icon: keyof typeof Ionicons.glyphMap; iconColor?: string }[] = [
  { provider: 'google', label: 'Nastavi sa Google', icon: 'logo-google' },
  { provider: 'apple', label: 'Nastavi sa Apple', icon: 'logo-apple' },
  { provider: 'facebook', label: 'Nastavi sa Facebook', icon: 'logo-facebook', iconColor: '#1877F2' },
];

export default function SignInScreen() {
  const { signIn, signInWithOAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  async function handleSignIn() {
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      const pending = await AsyncStorage.getItem('fitsa_pending_purchase');
      if (pending === 'true') {
        router.replace('/(free)/packages');
      } else {
        router.replace('/');
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri prijavi');
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuth(provider: OAuthProvider) {
    setError('');
    setOauthLoading(provider);
    try {
      await signInWithOAuth(provider);
      router.replace('/');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri prijavi');
    } finally {
      setOauthLoading(null);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
        <Text style={styles.logo}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>Prijavi se na svoj nalog</Text>

        {SOCIAL_PROVIDERS.map(({ provider, label, icon, iconColor }) => (
          <TouchableOpacity
            key={provider}
            style={styles.socialButton}
            onPress={() => handleOAuth(provider)}
            disabled={!!oauthLoading || loading}
            activeOpacity={0.7}
          >
            <Ionicons name={icon} size={20} color={iconColor ?? Colors.text} />
            <Text style={styles.socialText}>{oauthLoading === provider ? 'Učitavanje...' : label}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ili</Text>
          <View style={styles.dividerLine} />
        </View>

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

        <PrimaryButton title="Prijavi se" onPress={handleSignIn} loading={loading} disabled={!!oauthLoading} />

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
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Spacing.buttonRadiusLg,
    paddingVertical: 14,
    marginBottom: Spacing.sm,
    gap: 10,
  },
  socialText: {
    ...Typography.cta,
    color: Colors.text,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    ...Typography.description,
    color: Colors.muted,
    marginHorizontal: Spacing.md,
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
