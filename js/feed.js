import { getPosts } from "./api/post/get.js";
import { renderPosts } from "./api/post/render.js";

// Fetch and render posts
async function fetchAndRenderPosts() {
  try {
    const posts = await getPosts();

    if (posts) {
      renderPosts(posts); // Pass the fetched posts to the render function
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// Call fetchAndRenderPosts when the page is loaded
document.addEventListener("DOMContentLoaded", fetchAndRenderPosts);
