import { onAuth } from "../events/onAuth.js";

export function setAuthListener() {
  // Get references to relevant elements
  const form = document.forms.auth; // The auth form
  const title = document.getElementById("authTitle"); // Title of the form
  const nameField = document.getElementById("nameField"); // Name field (hidden by default)
  const toggleLink = document.getElementById("toggleAuthMode"); // Link to toggle modes
  const submitButton = form.querySelector("button[type='submit']"); // The form's submit button

  // Set initial mode to "login"
  let isLogin = true;

  // Toggle between login and register modes
  toggleLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default link behavior
    isLogin = !isLogin; // Flip the mode

    if (isLogin) {
      // Update UI for Login Mode
      title.textContent = "Login";
      nameField.style.display = "none"; // Hide the name field
      submitButton.textContent = "Log in";
      submitButton.dataset.auth = "login"; // Set button action to "login"
      toggleLink.textContent = "Don't have an account? Register here";
    } else {
      // Update UI for Register Mode
      title.textContent = "Register";
      nameField.style.display = "block"; // Show the name field
      submitButton.textContent = "Register";
      submitButton.dataset.auth = "register"; // Set button action to "register"
      toggleLink.textContent = "Already have an account? Log in here";
    }
  });

  // Attach the submit event listener to the form
  form.addEventListener("submit", onAuth);
}

// Initialize the event listener when this module is loaded
setAuthListener();
