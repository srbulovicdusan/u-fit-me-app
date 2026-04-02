import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { UserRound } from 'lucide-react-native';
import ScreenContainer from '@/components/ui/screen-container';
import PrimaryButton from '@/components/ui/primary-button';
import { useAuth } from '@/hooks/use-auth';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

export default function FreeProfileScreen() {
  const { session, profile, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace('/');
  }

  const name = profile?.fullName || session?.user?.user_metadata?.full_name || session?.user?.user_metadata?.name;
  const initials = name
    ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : '?';

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {session ? (
          <>
            <View style={styles.avatar}>
              <Text style={styles.initials}>{initials}</Text>
            </View>
            <Text style={styles.name}>{name || 'Korisnik'}</Text>
            <Text style={styles.email}>{session.user.email}</Text>
          </>
        ) : (
          <>
            <View style={styles.avatar}>
              <UserRound size={36} color={Colors.primary} strokeWidth={1.5} />
            </View>
            <Text style={styles.name}>Nisi ulogovana</Text>
            <PrimaryButton
              title="Uloguj se"
              onPress={() => router.push('/(auth)/sign-in')}
              style={styles.button}
            />
          </>
        )}

        {session && (
          <PrimaryButton
            title="Odjavi se"
            onPress={handleSignOut}
            variant="ghost"
            style={styles.button}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.screenPadding,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  initials: {
    ...Typography.h2,
    color: Colors.primary,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.description,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  button: {
    marginTop: Spacing.md,
    width: '100%',
  },
});
