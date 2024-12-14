import { save } from "../../storage/save.js";
import { API_AUTH, API_BASE_URL, API_LOGIN } from "../constants.js";
import { authFetch } from "../fetch.js";

// Login function for existing users
export async function login(email, password) {
  const response = await authFetch(API_BASE_URL + API_AUTH + API_LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    save("token", accessToken);
    save("profile", profile);
    return profile;
  }

  throw new Error("Was not able to log in the account.");
}
