import { login } from "../../api/auth/login.js";
import { registerUser } from "../../api/auth/register.js";
import { getPosts } from "../../api/post/get.js";

// Event when authorized
export async function onAuth(event) {
  event.preventDefault();

  const name = event.target.name?.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  // Validate email domain
  const allowedDomains = ["@noroff.no", "@stud.noroff.no"];
  if (!allowedDomains.some((domain) => email.endsWith(domain))) {
    alert("Only @noroff.no and @stud.noroff.no email addresses are allowed.");
    return;
  }

  try {
    if (event.submitter.dataset.auth === "login") {
      await login(email, password);
    } else {
      await registerUser(name, email, password);
      await login(email, password);
    }

    // Redirect to feed after successful login or registration
    window.location.href = "/feed.html";
  } catch (error) {
    alert(error.message); // Show an error message if the login or registration fails
  }

  await getPosts();
}
