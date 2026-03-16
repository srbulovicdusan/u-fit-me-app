import { View, Text, StyleSheet } from 'react-native';
import Avatar from '@/components/ui/Avatar';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';

interface ProfileHeaderProps {
  name: string;
  packageName: string;
  initials: string;
}

export default function ProfileHeader({ name, packageName, initials }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Avatar initials={initials} size="md" />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.package}>{packageName} paket • Aktivno</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: Spacing.screenPadding,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  package: {
    ...Typography.description,
    color: Colors.muted,
  },
});
