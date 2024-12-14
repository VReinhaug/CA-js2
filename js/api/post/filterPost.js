import { getProfiles } from "../profile/getprofile.js";
import { getPosts } from "./get.js";
import { renderPosts } from "./render.js";

/**
 * Applies filters to the posts.
 * @param {Object[]} posts - The list of posts.
 * @param {Object} filters - The filter options (posts and photos).
 * @returns {Object[]} - The filtered posts.
 */
export function applyFilter(posts, filters) {
  if (filters.posts && filters.photos) {
    return posts; // Show all posts if both filters are selected
  } else if (filters.posts) {
    return posts.filter((post) => !post.media?.url); // Only posts without media
  } else if (filters.photos) {
    return posts.filter((post) => post.media?.url); // Only posts with media
  }
  return posts; // No filters selected, show all
}

/**
 * Handles filter changes and updates the feed.
 */
export async function handleFilterChange() {
  const filters = {
    posts: document.querySelector("#filter-posts").checked,
    photos: document.querySelector("#filter-photos").checked,
  };

  const posts = await getPosts(); // Fetch all posts from the API
  const profiles = await getProfiles();

  const filteredPosts = applyFilter(posts, filters); // Apply the filters
  renderPosts(filteredPosts, profiles); // Render the filtered posts
}
