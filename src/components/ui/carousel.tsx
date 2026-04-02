import { FlatList, View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { Spacing } from '@/constants/typography';

interface CarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth: number;
  peekWidth?: number;
  gap?: number;
  firstItemOffset?: number;
}

export default function Carousel<T>({
  data,
  renderItem,
  itemWidth,
  peekWidth = 20,
  gap = 12,
  firstItemOffset = Spacing.screenPadding,
}: CarouselProps<T>) {
  const snapInterval = itemWidth + gap;

  return (
    <FlatList
      data={data}
      keyExtractor={(_, i) => i.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      contentContainerStyle={{ paddingLeft: firstItemOffset, paddingRight: peekWidth }}
      ItemSeparatorComponent={() => <View style={{ width: gap }} />}
      renderItem={({ item, index }) => (
        <View style={{ width: itemWidth }}>
          {renderItem(item, index)}
        </View>
      )}
    />
  );
}
