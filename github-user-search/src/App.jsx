import { useState } from 'react';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';

function App() {
  const [results, setResults] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [page, setPage] = useState(1);

  const handleSearch = async (params) => {
    try {
      setSearchParams(params);
      setPage(1);
      const data = await fetchUserData(params);
      setResults(data.items || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    const query = { ...searchParams };
    let queryStr = query.username ? `${query.username} in:login` : '';
    if (query.location) queryStr += ` location:${query.location}`;
    if (query.minRepos) queryStr += ` repos:>=${query.minRepos}`;

    const url = `https://api.github.com/search/users?q=${encodeURIComponent(queryStr)}&per_page=10&page=${nextPage}`;
    const response = await fetch(url);
    const data = await response.json();
    setResults(prev => [...prev, ...(data.items || [])]);
    setPage(nextPage);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mt-4 mb-6">
        GitHub User Search Application
      </h1>

      {/* Search Form */}
      <Search onSearch={handleSearch} />

      {/* Results */}
      <div className="max-w-xl mx-auto mt-6 space-y-4">
        {results.map(user => (
          <div key={user.id} className="bg-white p-4 shadow rounded flex justify-between items-center">
            <div>
              <p className="font-bold">{user.login}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm">View Profile</a>
            </div>
            <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
          </div>
        ))}
        {results.length > 0 && (
          <button onClick={loadMore} className="block w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700">
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
