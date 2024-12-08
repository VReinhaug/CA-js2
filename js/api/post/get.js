import { API_BASE_URL, API_POSTS } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Fetches the posts from the API.
 * @returns {Promise<Object[]>} An array of posts.
 */
export async function getPosts() {
  try {
    const response = await authFetch(API_BASE_URL + API_POSTS);
    const data = await response.json();
    console.log("Posts fetched:", data);
    return data.data || []; // Make sure you're returning the `data` array
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return []; // Return empty array in case of error
  }
}
