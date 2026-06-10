import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import MealsScreen from '../screens/MealsScreen';
import SearchScreen from '../screens/SearchScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: '#0f0f1a' },
  headerTintColor: '#F9C74F',
  headerTitleStyle: { fontWeight: '700' },
};

function CategoriesStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Meals" component={MealsScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#0f0f1a',
            borderTopColor: '#1e1e3a',
            borderTopWidth: 1,
            paddingBottom: 6,
            height: 58,
          },
          tabBarActiveTintColor: '#F9C74F',
          tabBarInactiveTintColor: '#4b5563',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="CategoriesTab"
          component={CategoriesStack}
          options={{
            tabBarLabel: 'Catégories',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🍽</Text>,
          }}
        />
        <Tab.Screen
          name="SearchTab"
          component={SearchStack}
          options={{
            tabBarLabel: 'Rechercher',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🔍</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
