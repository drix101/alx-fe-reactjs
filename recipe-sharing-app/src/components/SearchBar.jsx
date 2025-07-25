import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm, filterRecipes } = useRecipeStore();

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <input
          type="text"
          placeholder="🔍 Search recipes by title, description, ingredients, or cooking time..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#007bff';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#ddd';
          }}
        />
        {searchTerm && (
          <div style={{ 
            fontSize: '14px', 
            color: '#666',
            textAlign: 'center'
          }}>
            Search results will update as you type
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 