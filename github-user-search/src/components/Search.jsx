import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (e, pageOverride = 1) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { items, total_count } = await fetchUserData({
        username,
        location,
        minRepos,
        page: pageOverride,
      });

      setResults(pageOverride === 1 ? items : [...results, ...items]);
      setPage(pageOverride);
      setHasMore(items.length > 0 && results.length + items.length < total_count);
    } catch (err) {
      setError('Error fetching data. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSearch} className="bg-white shadow-md p-6 rounded-lg grid gap-4">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="input input-bordered w-full"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          className="input input-bordered w-full"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">Search</button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      {!loading && !error && results.length === 0 && (
      <p className="text-center text-gray-500 mt-4">Looks like we cant find the user</p>
      )}

      <div className="mt-6 grid gap-4">
        {results.map(user => (
          <div key={user.id} className="p-4 bg-gray-100 rounded-md shadow flex items-center gap-4">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
            <div>
              <p className="font-bold text-lg">{user.login}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => handleSearch(null, page + 1)}
          className="btn btn-outline mt-6 block mx-auto"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;