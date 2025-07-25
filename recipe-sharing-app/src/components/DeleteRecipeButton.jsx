// src/components/DeleteRecipeButton.jsx
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmed) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  return (
    <button 
      onClick={handleDelete}
      style={{ 
        backgroundColor: '#ff4444', 
        color: 'white', 
        border: 'none', 
        padding: '8px 16px',
        marginLeft: '10px',
        cursor: 'pointer'
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;