// src/components/Search.jsx
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '250px',
          marginRight: '0.5rem',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
