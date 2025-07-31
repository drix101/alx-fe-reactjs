// src/services/githubService.js
import axios from 'axios';

export const searchUsers = async ({ username, location, minRepos }) => {
  let query = `${username} in:login`; // Match username in login
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    return response.data.items; // Return only the array of users
  } catch (error) {
    throw new Error('Search failed');
  }
};
