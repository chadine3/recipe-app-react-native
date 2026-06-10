import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
  StyleSheet, SafeAreaView, TouchableOpacity,
} from 'react-native';
import MealCard from '../components/MealCard';
import { api } from '../services/api';

export default function MealsScreen({ route, navigation }) {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: category });
    api.getMealsByCategory(category)
      .then((data) => setMeals(data || []))
      .catch(() => setError('Impossible de charger les recettes.'))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#F9C74F" />
      <Text style={styles.loadingText}>Chargement des recettes…</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.count}>{meals.length} recettes</Text>
      </View>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetails', { mealId: item.idMeal, mealName: item.strMeal })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>Aucune recette trouvée.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e3a',
  },
  title: { fontSize: 22, fontWeight: '800', color: '#F9C74F' },
  count: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 },
  loadingText: { color: '#6b7280', marginTop: 12 },
  errorText: { color: '#ef4444', fontSize: 15 },
  emptyText: { color: '#6b7280', fontSize: 15 },
});
