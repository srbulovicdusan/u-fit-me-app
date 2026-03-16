import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Badge from '@/components/ui/Badge';
import { Colors } from '@/constants/colors';
import { Typography } from '@/constants/typography';

interface ProfileMenuItemProps {
  label: string;
  description?: string;
  soon?: boolean;
  onPress?: () => void;
}

export default function ProfileMenuItem({ label, description, soon, onPress }: ProfileMenuItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7} disabled={soon}>
      <View>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.desc}>{description}</Text> : null}
      </View>
      {soon ? (
        <Badge text="USKORO" />
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  label: {
    ...Typography.bodyLarge,
    fontWeight: '500',
    color: Colors.text,
  },
  desc: {
    ...Typography.small,
    color: Colors.muted,
    marginTop: 2,
  },
  chevron: {
    fontSize: 18,
    color: Colors.muted,
  },
});
