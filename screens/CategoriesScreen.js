import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, ActivityIndicator,
  StyleSheet, StatusBar, SafeAreaView,
} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import { api } from '../services/api';

export default function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getCategories()
      .then(setCategories)
      .catch(() => setError('Impossible de charger les catégories.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#F9C74F" />
      <Text style={styles.loadingText}>Chargement des catégories…</Text>
    </View>
  );

  if (error) return (
    <View style={styles.center}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍽 RecipeBook</Text>
        <Text style={styles.headerSub}>{categories.length} catégories disponibles</Text>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => navigation.navigate('Meals', {
              category: item.strCategory,
            })}
          />
        )}
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
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F9C74F',
    letterSpacing: 0.5,
  },
  headerSub: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  grid: { padding: 8 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f1a' },
  loadingText: { color: '#6b7280', marginTop: 12, fontSize: 14 },
  errorText: { color: '#ef4444', fontSize: 15 },
});
