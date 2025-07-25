// src/components/EditRecipeForm.jsx
import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients || '');
  const [cookingTime, setCookingTime] = useState(recipe.cookingTime || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Title and description are required');
      return;
    }

    updateRecipe({
      ...recipe,
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients.trim(),
      cookingTime: cookingTime.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(recipe.title);
    setDescription(recipe.description);
    setIngredients(recipe.ingredients || '');
    setCookingTime(recipe.cookingTime || '');
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button onClick={() => setIsEditing(true)}>
        Edit Recipe
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Recipe</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Recipe description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '80px' }}
        ></textarea>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Ingredients (one per line or comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', minHeight: '60px' }}
        ></textarea>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Cooking time (e.g., 30 minutes, 1 hour)"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;