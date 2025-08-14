import React, { useState, useEffect } from "react";
import recipesData from "../data.json";

const HomePage = ({ onRecipeSelect }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Simulate fetching from local JSON file
    setRecipes(recipesData);
  }, []); 

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recipe Sharing Platform</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.summary}</p>
              
              {/* Recipe Meta Information */}
              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <span>⏱️ {recipe.prepTime}</span>
                <span>🔥 {recipe.cookTime}</span>
                <span>👥 {recipe.servings} servings</span>
              </div>
              
              {/* Difficulty and Tags */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {recipe.difficulty}
                </span>
                <div className="flex gap-1">
                  {recipe.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => onRecipeSelect(recipe)}
                className="block w-full text-center bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors font-medium"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;