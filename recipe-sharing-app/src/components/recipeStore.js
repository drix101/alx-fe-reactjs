import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, recipe],
  })),
  
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((r) =>
      r.id === updatedRecipe.id ? updatedRecipe : r
    ),
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((r) => r.id !== id),
  })),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  filterRecipes: () => set((state) => ({
    filteredRecipes: state.recipes.filter(recipe => {
      const searchLower = state.searchTerm.toLowerCase();
      return (
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        (recipe.ingredients && recipe.ingredients.toLowerCase().includes(searchLower)) ||
        (recipe.cookingTime && recipe.cookingTime.toLowerCase().includes(searchLower))
      );
    })
  })),
}));