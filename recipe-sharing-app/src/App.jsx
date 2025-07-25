import React from 'react'
import RecipeList from './Components/RecipeList';
import AddRecipeForm from './Components/AddRecipeForm';

const App = () => {
  return (
    <div>
      <h1>Recipe Sharing List</h1>
      <React />
      <RecipeList />
      <div>
        <AddRecipeForm />
      </div>
    </div>
  )
}

export default App
