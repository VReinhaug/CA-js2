import { createPost } from "./api/post/createPost.js";
import { deletePost } from "./api/post/deletePost.js";
import { handleFilterChange } from "./api/post/filterPost.js";
import { getPosts } from "./api/post/get.js";
import { renderPosts } from "./api/post/render.js";
import { searchPosts } from "./api/post/searchPosts.js";
import { getProfiles } from "./api/profile/getprofile.js";

/**
 * Fetches posts and profiles from the API and renders them on the page.
 *
 * This function retrieves posts and profiles, then renders them
 * in the feed using the `renderPosts` function.
 *
 * @async
 * @function fetchAndRenderPosts
 * @returns {Promise<void>} Resolves when the posts are successfully fetched and rendered.
 *
 * @example
 * // Call this function when the page loads to display the feed
 * document.addEventListener("DOMContentLoaded", fetchAndRenderPosts);
 */
export async function fetchAndRenderPosts() {
  try {
    // Fetch posts and profiles from the API
    const posts = await getPosts();
    const profiles = await getProfiles();

    // Render posts only if both posts and profiles are successfully retrieved
    if (posts && profiles) {
      renderPosts(posts, profiles);
    }
  } catch (error) {
    // Log errors to the console for debugging
    console.error("Error fetching posts and profiles:", error);
  }
}

// Handle form submission for creating posts
document
  .querySelector("#create-post-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const message = document.querySelector("#message").value.trim();
    const imageUrl = document.querySelector("#image-url").value.trim();

    if (!title) {
      alert("Title is required!");
      return;
    }

    const newPost = {
      title,
      body: message,
      media: imageUrl ? { url: imageUrl } : undefined,
    };

    await createPost(newPost); // Send post to the API
    await fetchAndRenderPosts(); // Refresh the feed after creating the post
  });

// Handle delete action
document.addEventListener("click", async (event) => {
  if (event.target.matches(".fa-trash-can")) {
    const postId = event.target.dataset.postId; // Use data attribute for post ID
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      await deletePost(postId); // Send delete request to the API
      await fetchAndRenderPosts(); // Refresh the feed after deletion
    }
  }
});

// Handle search form submission
document.querySelectorAll("form[role='search']").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = form.querySelector("input[type='search']");
    const query = searchInput.value.trim();

    if (query) {
      await searchPosts(query); // Call the search function with the query
    } else {
      await fetchAndRenderPosts(); // Re-fetch and render all posts if query is empty
    }
  });
});

// Add event listeners for checkboxes to handle filtering
document
  .querySelector("#filter-posts")
  .addEventListener("change", handleFilterChange);
document
  .querySelector("#filter-photos")
  .addEventListener("change", handleFilterChange);

// Call fetchAndRenderPosts when the page is loaded
document.addEventListener("DOMContentLoaded", fetchAndRenderPosts);
