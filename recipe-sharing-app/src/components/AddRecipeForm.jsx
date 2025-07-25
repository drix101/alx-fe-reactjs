// src/components/AddRecipeForm.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecipeStore } from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [cookingTime, setCookingTime] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      alert('Title and description are required')
      return 
    }

    addRecipe({ 
      id: Date.now(), 
      title: title.trim(), 
      description: description.trim(),
      ingredients: ingredients.trim(),
      cookingTime: cookingTime.trim()
    })
    setTitle('')
    setDescription('')
    setIngredients('')
    setCookingTime('')
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2>Add New Recipe</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              minHeight: '100px',
              resize: 'vertical'
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <textarea
            placeholder="Ingredients (one per line or comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px',
              minHeight: '80px',
              resize: 'vertical'
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Cooking time (e.g., 30 minutes, 1 hour)"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Add Recipe
          </button>
          <button 
            type="button"
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipeForm;