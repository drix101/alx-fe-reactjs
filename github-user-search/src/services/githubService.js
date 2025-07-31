import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';

/**
 * Fetch GitHub user data by username.
 * @param {string} username
 * @returns {Promise<Object>}
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
