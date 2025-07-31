// src/components/Search.jsx
import { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [formData, setFormData] = useState({ username: '', location: '', minRepos: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const users = await searchUsers(formData);
      setResults(users);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="GitHub username"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location (optional)"
          className="w-full p-2 border rounded"
        />
        <input
          name="minRepos"
          value={formData.minRepos}
          onChange={handleChange}
          placeholder="Min repos (optional)"
          className="w-full p-2 border rounded"
          type="number"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-6 space-y-4">
        {results.length === 0 && !loading && <p className="text-center text-gray-500">No users found</p>}
        {results.map((user) => (
          <div key={user.id} className="flex items-center gap-4 border p-3 rounded">
            <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">{user.login}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;