// src/services/githubService.js
import axios from 'axios';

const GITHUB_API = 'https://api.github.com/users';

const headers = import.meta.env.VITE_GITHUB_API_KEY
  ? {
      Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
    }
  : {};

export const fetchGitHubUser = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API}/${username}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
