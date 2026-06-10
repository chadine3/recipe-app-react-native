import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator,
  StyleSheet, SafeAreaView, TouchableOpacity, Keyboard,
} from 'react-native';
import MealCard from '../components/MealCard';
import { api } from '../services/api';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    setLoading(true);
    setSearched(true);
    try {
      const data = await api.searchMeals(query.trim());
      setResults(data || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Rechercher</Text>
        <Text style={styles.subtitle}>Trouvez n'importe quelle recette</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Ex : Pasta, Chicken, Sushi…"
          placeholderTextColor="#4b5563"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text style={styles.btnText}>Go</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#F9C74F" />
          <Text style={styles.loadingText}>Recherche en cours…</Text>
        </View>
      )}

      {!loading && searched && results.length === 0 && (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>🍽</Text>
          <Text style={styles.emptyTitle}>Aucun résultat</Text>
          <Text style={styles.emptyText}>Essaie un autre nom de plat.</Text>
        </View>
      )}

      {!loading && !searched && (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>🥘</Text>
          <Text style={styles.hintText}>Tape le nom d'un plat pour commencer</Text>
        </View>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetails', { mealId: item.idMeal, mealName: item.strMeal })}
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
  title: { fontSize: 22, fontWeight: '800', color: '#F9C74F' },
  subtitle: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  searchRow: {
    flexDirection: 'row',
    margin: 16,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#e8eaf0',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2e2e4e',
  },
  btn: {
    backgroundColor: '#F9C74F',
    borderRadius: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  btnText: { fontWeight: '800', fontSize: 15, color: '#0f0f1a' },
  center: { alignItems: 'center', marginTop: 60 },
  loadingText: { color: '#6b7280', marginTop: 12 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#e8eaf0', marginBottom: 6 },
  emptyText: { color: '#6b7280', fontSize: 14 },
  hintText: { color: '#6b7280', fontSize: 15, marginTop: 8, textAlign: 'center' },
});
