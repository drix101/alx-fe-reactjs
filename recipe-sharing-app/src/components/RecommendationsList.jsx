import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const { recipes, favorites, recommendations, generateRecommendations } = useRecipeStore();

  // Generate recommendations when component mounts or when favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, recipes, generateRecommendations]);

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available. Add some favorites to get personalized suggestions!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recommendations.map((recipe) => (
            <li key={recipe.id} style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#e8f5e8',
              borderColor: '#c3e6c3'
            }}>
              <Link 
                to={`/recipes/${recipe.id}`}
                style={{ 
                  textDecoration: 'none', 
                  color: '#333',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                💡 {recipe.title}
              </Link>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                {recipe.description.length > 100 
                  ? `${recipe.description.substring(0, 100)}...` 
                  : recipe.description
                }
              </p>
              {recipe.cookingTime && (
                <p style={{ margin: '5px 0 0 0', color: '#888', fontSize: '14px' }}>
                  ⏱️ {recipe.cookingTime}
                </p>
              )}
              {recipe.ingredients && (
                <p style={{ margin: '5px 0 0 0', color: '#888', fontSize: '14px' }}>
                  🥘 {recipe.ingredients.split('\n')[0].substring(0, 50)}...
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      {favorites.length === 0 && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '5px',
          fontSize: '14px',
          color: '#666'
        }}>
          💡 <strong>Tip:</strong> Add recipes to your favorites to get personalized recommendations based on your preferences!
        </div>
      )}
    </div>
  );
};

export default RecommendationsList; 