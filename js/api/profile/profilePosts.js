import { API_BASE_URL, API_PROFILES } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Fetches posts for the logged-in user.
 * @param {string} username - The username to fetch posts for.
 * @returns {Promise<Object[]>} The list of posts with author details.
 */
export async function fetchProfilePosts(username) {
  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_PROFILES}/${username}/posts?_author=true`
    );
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch profile posts:", error);
    return [];
  }
}

/**
 * Renders profile posts on the page.
 * @param {Object[]} posts - The list of posts with author details.
 */
export function renderProfilePosts(posts) {
  const postsContainer = document.querySelector("#profile-posts");
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    postsContainer.innerHTML = "<p>No posts yet!</p>";
    return;
  }

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "card-one", "m-3", "mx-auto");

    postCard.innerHTML = `
      <div class="card-header d-flex align-items-center">
        <img src="${
          post.author?.avatar?.url || "../../../img/ziko-profile_300x300.jpeg"
        }" class="rounded-circle me-2" alt="${post.author?.name || "Author"}">
        <p class="mb-0 fw-bold">${post.author?.name || "Anonymous"}</p>
      </div>
      <div class="card-body">
        <h5>${post.title || "Untitled Post"}</h5>
        <p class="card-text">${post.body || "No content available"}</p>
        ${
          post.media?.url
            ? `<img src="${post.media.url}" alt="${
                post.media.alt || ""
              }" class="img-fluid my-3" />`
            : ""
        }
      </div>
    `;

    postsContainer.appendChild(postCard);
  });
}
