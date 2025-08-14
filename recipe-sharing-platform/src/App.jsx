import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;