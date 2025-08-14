import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';

function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackToHome = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedRecipe ? (
        <div>
          <button 
            onClick={handleBackToHome}
            className="ml-4 mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            ← Back to Recipes
          </button>
          <RecipeDetails recipe={selectedRecipe} />
        </div>
      ) : (
        <HomePage onRecipeSelect={handleRecipeSelect} />
      )}
    </div>
  )
}

export default App;