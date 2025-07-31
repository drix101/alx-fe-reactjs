import axios from 'axios';

export const fetchUserData = async ({ username, location, minRepos, page = 1 }) => {
  let query = '';

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=10`;

  const response = await axios.get(url);
  return response.data; // Contains `items` and `total_count`
};
