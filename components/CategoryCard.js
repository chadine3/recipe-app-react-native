import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CategoryCard({ category, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: category.strCategoryThumb }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.name}>{category.strCategory}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {category.strCategoryDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    minHeight: 160,
  },
  image: {
    width: '100%',
    height: 110,
  },
  overlay: {
    padding: 10,
  },
  name: {
    fontFamily: 'System',
    fontWeight: '700',
    fontSize: 15,
    color: '#F9C74F',
    marginBottom: 4,
  },
  desc: {
    fontSize: 11,
    color: '#aab4be',
    lineHeight: 15,
  },
});
