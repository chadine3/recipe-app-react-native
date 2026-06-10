const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const api = {
  // 1. List all meal categories
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();
    return data.categories;
  },

  // 2. Filter meals by category
  getMealsByCategory: async (category) => {
    const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    const data = await res.json();
    return data.meals;
  },

  // 3. Search meal by name
  searchMeals: async (query) => {
    const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.meals;
  },

  // Get full meal details by ID
  getMealById: async (id) => {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  },
};
