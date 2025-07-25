import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { recipes, favorites, recommendations } = useRecipeStore();
  
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
  const recentRecipes = recipes.slice(-3).reverse(); // Show 3 most recent recipes

  return (
    <div style={{ marginBottom: '30px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Favorites Summary */}
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '15px',
          backgroundColor: 'lightblue'
        }}>
          <h3>⭐ My Favorites</h3>
          {favoriteRecipes.length === 0 ? (
            <p>No favorites yet. Start adding some!</p>
          ) : (
            <div>
              <p><strong>{favoriteRecipes.length}</strong> favorite recipe{favoriteRecipes.length !== 1 ? 's' : ''}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {favoriteRecipes.slice(0, 3).map(recipe => (
                  <li key={recipe.id} style={{ marginBottom: '5px' }}>
                    <Link to={`/recipes/${recipe.id}`} style={{ color: '#333', textDecoration: 'none' }}>
                      {recipe.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {favoriteRecipes.length > 3 && (
                <Link to="/favorites" style={{ color: '#007bff', textDecoration: 'none' }}>
                  View all favorites →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Recommendations Summary */}
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '15px',
          backgroundColor: 'lightgreen'
        }}>
          <h3>💡 Recommendations</h3>
          {recommendations.length === 0 ? (
            <p>Add favorites to get personalized recommendations!</p>
          ) : (
            <div>
              <p><strong>{recommendations.length}</strong> recommendation{recommendations.length !== 1 ? 's' : ''} for you</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {recommendations.slice(0, 3).map(recipe => (
                  <li key={recipe.id} style={{ marginBottom: '5px' }}>
                    <Link to={`/recipes/${recipe.id}`} style={{ color: '#333', textDecoration: 'none' }}>
                      {recipe.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/recommendations" style={{ color: '#007bff', textDecoration: 'none' }}>
                View all recommendations →
              </Link>
            </div>
          )}
        </div>

        {/* Recent Recipes */}
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '15px',
            backgroundColor: 'brown'
        }}>
          <h3>📝 Recent Recipes</h3>
          {recentRecipes.length === 0 ? (
            <p>No recipes yet. Add your first recipe!</p>
          ) : (
            <div>
              <p><strong>{recentRecipes.length}</strong> recent recipe{recentRecipes.length !== 1 ? 's' : ''}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {recentRecipes.map(recipe => (
                  <li key={recipe.id} style={{ marginBottom: '5px' }}>
                    <Link to={`/recipes/${recipe.id}`} style={{ color: '#333', textDecoration: 'none' }}>
                      {recipe.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 