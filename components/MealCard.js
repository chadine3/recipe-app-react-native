import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MealCard({ meal, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{meal.strMeal}</Text>
        {meal.strArea && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{meal.strArea}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '700',
    fontSize: 15,
    color: '#e8eaf0',
    marginBottom: 8,
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F9C74F22',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#F9C74F55',
  },
  badgeText: {
    fontSize: 11,
    color: '#F9C74F',
    fontWeight: '600',
  },
});
