import { View, Text, StyleSheet } from 'react-native';
import Avatar from '@/components/ui/Avatar';
import { Colors } from '@/constants/colors';
import { Typography, Spacing } from '@/constants/typography';
import { TRAINER_NAME, TRAINER_INITIALS } from '@/constants/strings';

export default function ChatHeader() {
  return (
    <View style={styles.container}>
      <Avatar initials={TRAINER_INITIALS} size="sm" />
      <View>
        <Text style={styles.name}>{TRAINER_NAME}</Text>
        <Text style={styles.status}>Online</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  name: {
    ...Typography.h3,
    color: Colors.text,
  },
  status: {
    ...Typography.tiny,
    color: Colors.success,
  },
});
