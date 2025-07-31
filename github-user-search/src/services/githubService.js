import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/user?q=${encodeURIComponent(query)}';

export const advancedUserSearch = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: query.trim() },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
