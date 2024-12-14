import { API_AUTH, API_BASE_URL, API_REGISTER } from "../constants.js";
import { authFetch } from "../fetch.js";

// Register function for new users
export async function registerUser(name, email, password) {
  const response = await authFetch(API_BASE_URL + API_AUTH + API_REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Account could not be registered.");
}
