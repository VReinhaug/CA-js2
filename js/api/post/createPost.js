import { API_BASE_URL, API_POSTS } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Creates a new post by sending it to the API.
 * @param {Object} postData - The data of the post to be created.
 */
export async function createPost(postData) {
  try {
    const response = await authFetch(API_BASE_URL + API_POSTS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    console.log("Post created successfully");
    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
