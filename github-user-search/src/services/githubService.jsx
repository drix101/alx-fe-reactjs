import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

/**
 * Fetch GitHub user data by username.
 * @param {string} username - The GitHub username to search.
 * @returns {Promise<Object>} - The user data object.
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.status === 404
        ? 'User not found'
        : 'Failed to fetch user data'
    );
  }
}; 

export default githubService;