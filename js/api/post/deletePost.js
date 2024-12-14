import { API_BASE_URL, API_POSTS } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Deletes a post by sending a DELETE request to the API.
 * @param {string} postId - The ID of the post to delete.
 */
export async function deletePost(postId) {
  try {
    const response = await authFetch(`${API_BASE_URL + API_POSTS}/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}
