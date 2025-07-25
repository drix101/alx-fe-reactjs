import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const { recipes, favorites, removeFavorite } = useRecipeStore();
  
  // Get favorite recipes by mapping favorite IDs to actual recipe objects
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet. Start adding some!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favoriteRecipes.map((recipe) => (
            <li key={recipe.id} style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#fff3cd',
              borderColor: '#ffeaa7'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <Link 
                    to={`/recipes/${recipe.id}`}
                    style={{ 
                      textDecoration: 'none', 
                      color: '#333',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}
                  >
                    ⭐ {recipe.title}
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
                </div>
                <button 
                  onClick={() => removeFavorite(recipe.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    marginLeft: '10px'
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList; 