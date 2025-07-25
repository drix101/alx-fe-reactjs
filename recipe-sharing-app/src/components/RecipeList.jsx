import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

export const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.length === 0 ? (
        <div>
</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recipes.map((recipe) => (
            <li key={recipe.id} style={{ 
              border: '1px solid #ddd', 
              margin: '10px 0', 
              padding: '15px',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
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
                {recipe.title}
              </Link>
              <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                {recipe.description.length > 100 
                  ? `${recipe.description.substring(0, 100)}...` 
                  : recipe.description
                }
              </p>
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '20px' }}>
        <Link to="/add" style={{ 
          textDecoration: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px'
        }}>
          Add New Recipe
        </Link>
      </div>
    </div> 
  );
};