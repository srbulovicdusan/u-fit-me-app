import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import ScreenContainer from '@/components/ui/screen-container';
import PrimaryButton from '@/components/ui/primary-button';
import ProfileHeader from '@/components/profile/profile-header';
import ProfileMenuItem from '@/components/profile/profile-menu-item';
import { useAuth } from '@/hooks/use-auth';
import { Spacing } from '@/constants/typography';

const MENU_ITEMS = [
  { label: 'Moj profil', description: 'Lični podaci i ciljevi' },
  { label: 'Podešavanja', description: 'Notifikacije, podsetnici' },
  { label: 'Nutrition vodič', description: 'Uskoro dostupno', soon: true },
  { label: 'Podrška', description: 'Pomoć i kontakt' },
  { label: 'Politika privatnosti' },
];

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace('/');
  }

  return (
    <ScreenContainer>
      <ProfileHeader
        name={profile?.fullName ?? 'Korisnik'}
        packageName="Transform"
        initials={profile?.fullName?.split(' ').map(n => n[0]).join('') ?? 'TK'}
      />
      <View style={styles.menu}>
        {MENU_ITEMS.map((item, i) => (
          <ProfileMenuItem
            key={i}
            label={item.label}
            description={item.description}
            soon={item.soon}
          />
        ))}
      </View>
      <View style={styles.signOut}>
        <PrimaryButton title="Odjavi se" onPress={handleSignOut} variant="ghost" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
    paddingHorizontal: Spacing.screenPadding,
  },
  signOut: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
});
