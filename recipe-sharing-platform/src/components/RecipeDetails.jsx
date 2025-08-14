import React from "react";

const RecipeDetails = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{recipe.summary}</p>
            
            {/* Recipe Meta Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="text-lg font-semibold text-gray-800">{recipe.prepTime}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="text-lg font-semibold text-gray-800">{recipe.cookTime}</p>
              </div>
            </div>

            {/* Additional Meta Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Servings</p>
                <p className="text-lg font-semibold text-gray-800">{recipe.servings}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Difficulty</p>
                <p className={`text-lg font-semibold ${
                  recipe.difficulty === 'Easy' ? 'text-green-600' :
                  recipe.difficulty === 'Medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {recipe.difficulty}
                </p>
              </div>
            </div>

            {/* Tags */}
            {recipe.tags && (
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            )) : (
              <li className="text-gray-500 italic">Ingredients not available</li>
            )}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions ? recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </span>
                <span className="text-gray-700">{instruction}</span>
              </li>
            )) : (
              <li className="text-gray-500 italic">Instructions not available</li>
            )}
          </ol>
        </div>
      </div>

      {/* Additional Information */}
      {recipe.nutrition && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nutrition Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(recipe.nutrition).map(([key, value]) => (
              <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 capitalize">{key}</p>
                <p className="text-lg font-semibold text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
