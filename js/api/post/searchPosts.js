import { API_BASE_URL, API_POSTS, API_SEARCH_POSTS } from "../constants.js";
import { authFetch } from "../fetch.js";
import { renderPosts } from "./render.js";

/**
 * Handles the search input and fetches matching posts.
 * @param {string} query - The search query.
 */
export async function searchPosts(query) {
  try {
    const url = `${API_BASE_URL}${API_POSTS}${API_SEARCH_POSTS}${encodeURIComponent(
      query
    )}&_author=true`;
    const response = await authFetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch search results.");
    }

    const data = await response.json();
    console.log("API Response for search with author:", data);

    const posts = Array.isArray(data) ? data : data.data || [];
    renderPosts(posts); // Render the posts, author data should now be included
  } catch (error) {
    console.error("Error during search:", error);
  }
}
