import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const users = await fetchUserData({ username, location, minRepos });
      setResults(users);
    } catch (err) {
      setError('Looks like we can’t find the user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="grid gap-4 bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          className="input input-bordered"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="grid mt-6 gap-4">
        {results.map((user) => (
          <div key={user.id} className="bg-gray-100 p-4 rounded shadow">
            <div className="flex items-center gap-4">
              <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
              <div>
                <p className="font-semibold">{user.login}</p>
                <p className="text-sm text-gray-600">Score: {user.score}</p>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
