import {
  fetchProfileInfo,
  renderProfileInfo,
} from "./api/profile/profileInfo.js";
import {
  fetchProfilePosts,
  renderProfilePosts,
} from "./api/profile/profilePosts.js";
import { load } from "./storage/load.js";

// Retrieve the profile object
const profileData = load("profile");

if (!profileData || !profileData.name) {
  console.error("No profile data found. Redirecting to login.");
  window.location.href = "/index.html"; // Redirect if profile data is missing
} else {
  const username = profileData.name; // Extract the username from profile

  // Fetch and render profile info
  fetchProfileInfo(username).then((profileInfo) => {
    if (profileInfo) renderProfileInfo(profileInfo);
  });

  // Fetch and render profile posts
  fetchProfilePosts(username).then((posts) => {
    if (posts) renderProfilePosts(posts);
  });
}
