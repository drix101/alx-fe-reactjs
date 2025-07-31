import React, { useState } from 'react';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>GitHub User Search</h1>
      <Search onSearch={handleSearch} />

      {/* Conditional rendering */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Looks like we can't find the user.</p>}
      {user && (
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <img src={user.avatar_url} alt="Avatar" width="100" style={{ borderRadius: '50%' }} />
          <h2>{user.name || user.login}</h2>
          <p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              Visit GitHub Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;