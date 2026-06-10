import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, ActivityIndicator,
  StyleSheet, SafeAreaView, Linking, TouchableOpacity,
} from 'react-native';
import { api } from '../services/api';

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing.trim(), measure: measure?.trim() || '' });
    }
  }
  return ingredients;
}

export default function MealDetailsScreen({ route, navigation }) {
  const { mealId, mealName } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: mealName || 'Recette' });
    api.getMealById(mealId)
      .then(setMeal)
      .finally(() => setLoading(false));
  }, [mealId]);

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#F9C74F" />
    </View>
  );

  if (!meal) return (
    <View style={styles.center}>
      <Text style={styles.errorText}>Recette introuvable.</Text>
    </View>
  );

  const ingredients = getIngredients(meal);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: meal.strMealThumb }} style={styles.heroImage} />

        <View style={styles.content}>
          <Text style={styles.mealName}>{meal.strMeal}</Text>

          <View style={styles.tagsRow}>
            {meal.strCategory && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>📂 {meal.strCategory}</Text>
              </View>
            )}
            {meal.strArea && (
              <View style={styles.tag}>
                <Text style={styles.tagText}>🌍 {meal.strArea}</Text>
              </View>
            )}
          </View>

          <Text style={styles.sectionTitle}>Ingrédients</Text>
          <View style={styles.ingredientsGrid}>
            {ingredients.map(({ ingredient, measure }, idx) => (
              <View key={idx} style={styles.ingredientItem}>
                <Text style={styles.ingredientMeasure}>{measure}</Text>
                <Text style={styles.ingredientName}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>
            {meal.strInstructions?.trim()}
          </Text>

          {meal.strYoutube ? (
            <TouchableOpacity
              style={styles.youtubeBtn}
              onPress={() => Linking.openURL(meal.strYoutube)}
            >
              <Text style={styles.youtubeBtnText}>▶ Voir la vidéo YouTube</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  heroImage: { width: '100%', height: 260 },
  content: { padding: 16 },
  mealName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F9C74F',
    marginBottom: 12,
    lineHeight: 30,
  },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  tag: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#2e2e4e',
  },
  tagText: { color: '#aab4be', fontSize: 13 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e8eaf0',
    marginBottom: 12,
    marginTop: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#F9C74F',
    paddingLeft: 10,
  },
  ingredientsGrid: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  ingredientItem: {
    flexDirection: 'row',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#2e2e4e',
  },
  ingredientMeasure: {
    width: 100,
    color: '#F9C74F',
    fontWeight: '600',
    fontSize: 14,
  },
  ingredientName: { flex: 1, color: '#e8eaf0', fontSize: 14 },
  instructions: {
    color: '#aab4be',
    lineHeight: 24,
    fontSize: 14,
    marginBottom: 24,
  },
  youtubeBtn: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  youtubeBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f1a' },
  errorText: { color: '#ef4444', fontSize: 15 },
});
