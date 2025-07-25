// src/components/AddRecipeForm.jsx
import { useState } from 'react'
import { useRecipeStore } from '../store/recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      alert('Both fields are required')
      return
    }

    addRecipe({ id: Date.now(), title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Recipe</h2>
      <input
        type="text"
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Recipe description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <br />
      <button type="submit">Add Recipe</button>
    </form>
  )
}

export default AddRecipeForm
