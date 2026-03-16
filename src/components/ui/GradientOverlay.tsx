import { ImageBackground, StyleSheet, type ViewStyle, type ImageStyle, type ImageSourcePropType, type ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';

interface GradientOverlayProps {
  children: ReactNode;
  source?: ImageSourcePropType;
  colors?: [ColorValue, ColorValue, ...ColorValue[]];
  locations?: [number, number, ...number[]];
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}

const DEFAULT_COLORS: [string, string, string] = ['rgba(44,42,38,0.85)', 'rgba(44,42,38,0.55)', 'rgba(44,42,38,0.25)'];
const DEFAULT_LOCATIONS: [number, number, number] = [0, 0.6, 1];

export default function GradientOverlay({
  children,
  source,
  colors = DEFAULT_COLORS,
  locations = DEFAULT_LOCATIONS,
  style,
  imageStyle,
}: GradientOverlayProps) {
  if (source) {
    return (
      <ImageBackground source={source} style={style} imageStyle={imageStyle}>
        <LinearGradient colors={colors} locations={locations} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill}>
          {children}
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <LinearGradient colors={colors} locations={locations} style={style}>
      {children}
    </LinearGradient>
  );
}
