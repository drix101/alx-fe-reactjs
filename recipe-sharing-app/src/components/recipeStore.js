import { create } from 'zustand';

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  
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
    favorites: state.favorites.filter(favId => favId !== id), // Remove from favorites if deleted
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
  
  addFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.includes(recipeId) 
      ? state.favorites 
      : [...state.favorites, recipeId]
  })),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  
  generateRecommendations: () => set((state) => {
    // Generate recommendations based on favorites and recipe similarity
    const { recipes, favorites } = state;
    
    if (favorites.length === 0) {
      // If no favorites, recommend random recipes
      const shuffled = [...recipes].sort(() => 0.5 - Math.random());
      return { recommendations: shuffled.slice(0, 3) };
    }
    
    // Get favorite recipes
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
    
    // Find recipes similar to favorites (same ingredients or cooking time)
    const recommendations = recipes
      .filter(recipe => !favorites.includes(recipe.id)) // Exclude already favorited
      .map(recipe => {
        let score = 0;
        
        // Score based on ingredient similarity
        favoriteRecipes.forEach(fav => {
          if (fav.ingredients && recipe.ingredients) {
            const favIngredients = fav.ingredients.toLowerCase().split(/[,\n]/);
            const recipeIngredients = recipe.ingredients.toLowerCase().split(/[,\n]/);
            const commonIngredients = favIngredients.filter(ing => 
              recipeIngredients.some(recIng => recIng.includes(ing.trim()) || ing.trim().includes(recIng))
            );
            score += commonIngredients.length;
          }
        });
        
        // Score based on cooking time similarity
        favoriteRecipes.forEach(fav => {
          if (fav.cookingTime && recipe.cookingTime) {
            if (fav.cookingTime.toLowerCase() === recipe.cookingTime.toLowerCase()) {
              score += 2;
            }
          }
        });
        
        return { ...recipe, score };
      })
      .filter(recipe => recipe.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(recipe => ({ id: recipe.id, title: recipe.title, description: recipe.description, ingredients: recipe.ingredients, cookingTime: recipe.cookingTime }));
    
    return { recommendations };
  }),
}));