// src/components/RecipeDetails.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === parseInt(id))
  );

  if (!recipe) {
    return (
      <div>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Description</h3>
        <p>{recipe.description}</p>
      </div>
      
      {recipe.ingredients && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Ingredients</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{recipe.ingredients}</p>
        </div>
      )}
      
      {recipe.cookingTime && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Cooking Time</h3>
          <p>{recipe.cookingTime}</p>
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
      <button onClick={() => navigate('/')} style={{ marginTop: '10px' }}>
        Back to Recipe List
      </button>
    </div>
  );
};

export default RecipeDetails;
