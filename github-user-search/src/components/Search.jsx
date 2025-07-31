import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUser(null);

    try {
      const data = await fetchUserData(username);

      // Filter manually by location and minRepos
      const matchesLocation = location ? data.location?.toLowerCase().includes(location.toLowerCase()) : true;
      const matchesRepos = minRepos ? data.public_repos >= Number(minRepos) : true;

      if (!matchesLocation || !matchesRepos) {
        setError("Looks like we cant find the user");
      } else {
        setUser(data);
      }

    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block font-semibold text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Filter by location"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700">Minimum Repositories</label>
          <input
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="e.g. 10"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {user && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow text-center">
          <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h2 className="text-xl font-bold">{user.login}</h2>
          <p>{user.name || 'No name provided'}</p>
          <p>Public Repos: {user.public_repos}</p>
          <p>Location: {user.location || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default Search;