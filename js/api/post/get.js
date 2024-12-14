import { API_BASE_URL, API_POSTS, API_POST_WITH_AUTHOR } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Fetches the posts from the API.
 * @returns {Promise<Object[]>} An array of posts.
 */
export async function getPosts() {
  try {
    const response = await authFetch(
      API_BASE_URL + API_POSTS + API_POST_WITH_AUTHOR
    );
    const data = await response.json();
    return data.data || []; // Make sure you're returning the `data` array
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return []; // Return empty array in case of error
  }
}
