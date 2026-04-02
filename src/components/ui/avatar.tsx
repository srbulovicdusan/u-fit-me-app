import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

interface AvatarProps {
  initials: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE_MAP = {
  sm: Spacing.avatarSm,
  md: Spacing.avatarMd,
  lg: Spacing.avatarLg,
};

export default function Avatar({ initials, imageUrl, size = 'md' }: AvatarProps) {
  const dimension = SIZE_MAP[size];
  const fontSize = dimension * 0.38;

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}
      />
    );
  }

  return (
    <View style={[styles.fallback, { width: dimension, height: dimension, borderRadius: dimension / 2 }]}>
      <Text style={[styles.text, { fontSize }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.borderLight,
  },
  fallback: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: '700',
    fontFamily: 'Georgia',
  },
});
