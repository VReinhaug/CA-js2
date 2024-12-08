import { createPost } from "./api/post/createPost.js";
import { deletePost } from "./api/post/deletePost.js";
import { getPosts } from "./api/post/get.js";
import { renderPosts } from "./api/post/render.js";
import { getProfiles } from "./api/profile/getprofile.js";

// Function to fetch and render posts
export async function fetchAndRenderPosts() {
  try {
    const posts = await getPosts();
    const profiles = await getProfiles();

    if (posts && profiles) {
      renderPosts(posts, profiles); // Pass the fetched data to the render function
    }
  } catch (error) {
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

// Call fetchAndRenderPosts when the page is loaded
document.addEventListener("DOMContentLoaded", fetchAndRenderPosts);
