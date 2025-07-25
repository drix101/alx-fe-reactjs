import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import SearchBar from './SearchBar';

export const RecipeList = () => {
  const { recipes, searchTerm, filteredRecipes } = useRecipeStore();
  
  // Use filtered recipes if there's a search term, otherwise use all recipes
  const displayRecipes = searchTerm ? filteredRecipes : recipes;

  return (
    <div>
      <h2>All Recipes</h2>
      <SearchBar />
      
      {displayRecipes.length === 0 ? (
        <div>
          {searchTerm ? (
            <p>No recipes found matching "{searchTerm}". <Link to="/add">Add a new recipe!</Link></p>
          ) : (
            <p>No recipes available. </p>
          )}
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {displayRecipes.map((recipe) => (
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
