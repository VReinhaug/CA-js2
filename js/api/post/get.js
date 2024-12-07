import { API_BASE_URL, API_POSTS } from "../constants.js";
import { authFetch } from "../fetch.js";

// Get post function
export async function getPosts() {
  const response = await authFetch(API_BASE_URL + API_POSTS);
  return await response.json();
}
