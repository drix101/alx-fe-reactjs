import { useState } from 'react'
import './App.css'
import HomePage from './components/HomePage';

function App() {
  const [count, setRecipes] = useState(0);

  return (
    <div>
    <h1 className="text-3xl font-bold underline text-blue-500">
      Hello Tailwind + React!
    </h1>
    <HomePage />
    </div>
  )
}

export default App;