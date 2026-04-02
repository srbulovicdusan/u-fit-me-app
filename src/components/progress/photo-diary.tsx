import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/typography';

const PHOTOS = [
  { date: '1. mart', hasPhoto: false },
  { date: '8. mart', hasPhoto: false },
  { date: '15. mart', isAdd: true },
];

export default function PhotoDiary() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto dnevnik</Text>
      <View style={styles.grid}>
        {PHOTOS.map((p, i) => (
          <View key={i} style={[styles.cell, p.isAdd && styles.addCell]}>
            {p.isAdd ? (
              <TouchableOpacity style={styles.addContent} activeOpacity={0.7}>
                <Ionicons name="image-outline" size={22} color={Colors.primary} />
                <Text style={styles.addText}>Dodaj</Text>
              </TouchableOpacity>
            ) : (
              <>
                <Text style={styles.dateText}>{p.date}</Text>
                <View style={styles.photoPlaceholder} />
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    gap: 8,
  },
  cell: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    backgroundColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCell: {
    backgroundColor: Colors.primaryLight,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  addContent: {
    alignItems: 'center',
  },
  addText: {
    fontSize: 10,
    color: Colors.primary,
    marginTop: 4,
  },
  dateText: {
    fontSize: 10,
    color: Colors.muted,
  },
  photoPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.border,
    marginTop: 6,
  },
});
