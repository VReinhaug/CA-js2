import { API_BASE_URL, API_PROFILES } from "../constants.js";
import { authFetch } from "../fetch.js";

// Get profiles
export async function getProfiles() {
  try {
    const response = await authFetch(API_BASE_URL + API_PROFILES);
    const data = await response.json();

    // Ensure return of the array of profiles found in the 'data' property
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    return []; // Return empty array in case of error
  }
}
