import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "Medium",
    ingredients: "",
    instructions: "",
    tags: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const difficultyOptions = ["Easy", "Medium", "Hard"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Recipe summary is required";
    }

    if (!formData.prepTime.trim()) {
      newErrors.prepTime = "Prep time is required";
    }

    if (!formData.cookTime.trim()) {
      newErrors.cookTime = "Cook time is required";
    }

    if (!formData.servings.trim()) {
      newErrors.servings = "Number of servings is required";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      // Check if ingredients have at least 2 items
      const ingredientLines = formData.ingredients.trim().split('\n').filter(line => line.trim());
      if (ingredientLines.length < 2) {
        newErrors.ingredients = "Please provide at least 2 ingredients";
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Preparation steps are required";
    } else {
      // Check if instructions have at least 2 steps
      const instructionLines = formData.instructions.trim().split('\n').filter(line => line.trim());
      if (instructionLines.length < 2) {
        newErrors.instructions = "Please provide at least 2 preparation steps";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process the form data
      const processedData = {
        ...formData,
        ingredients: formData.ingredients.split('\n').filter(line => line.trim()),
        instructions: formData.instructions.split('\n').filter(line => line.trim()),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      console.log('Recipe submitted:', processedData);
      
      setSubmitSuccess(true);
      setFormData({
        title: "",
        summary: "",
        prepTime: "",
        cookTime: "",
        servings: "",
        difficulty: "Medium",
        ingredients: "",
        instructions: "",
        tags: ""
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error submitting recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      summary: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      difficulty: "Medium",
      ingredients: "",
      instructions: "",
      tags: ""
    });
    setErrors({});
  };

  if (submitSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-green-800 mb-4">Recipe Submitted Successfully!</h1>
            <p className="text-green-700 mb-6">Your recipe has been added to the platform.</p>
            <div className="space-x-4">
              <Link
                to="/"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="inline-block bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Add Another Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-500 hover:text-indigo-700 font-medium mb-4"
          >
            ← Back to Recipes
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Add New Recipe</h1>
          <p className="text-gray-600 mt-2">Share your favorite recipe with the community</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recipe Title */}
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Spaghetti Carbonara"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Recipe Summary */}
            <div className="md:col-span-2">
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                Recipe Summary *
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                rows="3"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.summary ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description of your recipe..."
              />
              {errors.summary && (
                <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
              )}
            </div>

            {/* Prep Time */}
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time *
              </label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.prepTime ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 15 min"
              />
              {errors.prepTime && (
                <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>
              )}
            </div>

            {/* Cook Time */}
            <div>
              <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-2">
                Cook Time *
              </label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.cookTime ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 30 min"
              />
              {errors.cookTime && (
                <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>
              )}
            </div>

            {/* Servings */}
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                Servings *
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.servings ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 4"
              />
              {errors.servings && (
                <p className="text-red-500 text-sm mt-1">{errors.servings}</p>
              )}
            </div>

            {/* Difficulty */}
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {difficultyOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Italian, Pasta, Quick, Dinner (separate with commas)"
              />
              <p className="text-gray-500 text-sm mt-1">Separate multiple tags with commas</p>
            </div>

            {/* Ingredients */}
            <div className="md:col-span-2">
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
                Ingredients *
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                rows="6"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.ingredients ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter each ingredient on a new line:&#10;400g spaghetti&#10;200g pancetta&#10;4 large eggs&#10;..."
              />
              {errors.ingredients && (
                <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">Enter each ingredient on a separate line</p>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                Preparation Steps *
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                rows="8"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.instructions ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter each step on a new line:&#10;1. Bring a large pot of salted water to boil...&#10;2. While pasta cooks, heat a large skillet...&#10;..."
              />
              {errors.instructions && (
                <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">Enter each step on a separate line</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Recipe"
              )}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
