import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ username, location, minRepos });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl mx-auto mt-10">
      <div>
        <label className="block font-semibold text-gray-700">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full p-2 border rounded"
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
  );
};

export default Search;