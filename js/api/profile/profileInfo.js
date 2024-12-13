import { API_BASE_URL, API_PROFILES } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Fetches profile information for the given username.
 * @param {string} username - The username to fetch the profile for.
 * @returns {Promise<Object>} The profile data.
 */
export async function fetchProfileInfo(username) {
  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_PROFILES}/${username}`
    );
    const data = await response.json();
    console.log("Profile info fetched:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch profile info:", error);
    return null;
  }
}

/**
 * Renders the profile information on the page.
 * @param {Object} profile - The profile data.
 */
export function renderProfileInfo(profile) {
  const profileContainer = document.querySelector("#profile-info");
  profileContainer.innerHTML = `
    <section class="container d-flex me-2">
      <img
        src="${profile.avatar?.url || "../../../img/ziko-profile_300x300.jpeg"}"
        alt="${profile.name || "Profile picture"}"
        class="rounded-circle col-4 col-sm-3 m-4"
      />
      <div class="col-6">
        <h1>${profile.name}</h1>
        <p>${profile.bio || "I'm a good dog."}</p>
      </div>
    </section>
    <section class="container d-flex justify-content-evenly mt-3">
      <p>Follows: ${profile._count?.following || 0}</p>
      <p>Followers: ${profile._count?.followers || 0}</p>
    </section>
  `;
}
