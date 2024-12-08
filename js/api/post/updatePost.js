import { API_BASE_URL, API_POSTS } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Updates an existing post.
 * @param {Object} post - The post object with updated data.
 * @returns {Promise<Object>} The updated post data.
 */
export async function updatePost(post) {
  try {
    if (!post.id) {
      throw new Error("Post ID is required to update a post");
    }

    // Construct the payload dynamically to exclude fields not provided
    const payload = {
      title: post.title,
      body: post.body,
    };

    // Add media only if it's valid and provided
    if (post.media && post.media.url) {
      payload.media = { url: post.media.url };
    }

    const response = await authFetch(`${API_BASE_URL}${API_POSTS}/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from API:", errorData);
      throw new Error(
        `Failed to update post: ${errorData.errors?.[0]?.message}`
      );
    }

    const updatedPost = await response.json();
    console.log("Post updated successfully:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
