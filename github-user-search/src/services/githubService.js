// src/services/githubService.js
import axios from 'axios';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

export const searchUsers = async ({ username, location, minRepos }) => {
  let query = `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url); // ✅ "get" is used
    return response.data;
  } catch (error) {
    throw new Error('Search failed');
  }
};
