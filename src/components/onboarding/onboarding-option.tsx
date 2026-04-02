import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Flame, Dumbbell, Zap, Heart, Sprout, TrendingUp, Trophy, Calendar, CalendarCheck, Move } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

const ICON_MAP: Record<string, React.ComponentType<{ size: number; color: string; strokeWidth: number }>> = {
  Flame,
  Dumbbell,
  StretchHorizontal: Move,
  Zap,
  Heart,
  Sprout,
  TrendingUp,
  Trophy,
  Calendar,
  CalendarCheck,
};

interface OnboardingOptionProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onPress: () => void;
}

export default function OnboardingOption({ label, description, icon, selected, onPress }: OnboardingOptionProps) {
  const IconComponent = icon ? ICON_MAP[icon] : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.option, selected && styles.selected]}
    >
      <View style={styles.row}>
        {IconComponent && (
          <View style={[styles.iconContainer, selected && styles.iconContainerSelected]}>
            <IconComponent size={24} color={Colors.accent} strokeWidth={1.8} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    marginBottom: 10,
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.bg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainerSelected: {},
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  selectedLabel: {
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  radioSelected: {
    borderColor: Colors.accent,
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.accent,
  },
});
