import { fetchAndRenderPosts } from "../../feed.js";
import { updatePost } from "./updatePost.js";

/**
 * Renders the posts with their associated author data to the page.
 * @param {Object[]} posts - The posts with linked author data.
 */
export function renderPosts(posts) {
  const postContainer = document.querySelector("#feed-container");
  postContainer.innerHTML = ""; // Clear previous content before rendering new posts

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("card", "card-one", "m-3", "mx-auto");

    // Author info
    const postHeader = document.createElement("div");
    postHeader.classList.add(
      "card-header",
      "d-flex",
      "align-items-center",
      "justify-content-between"
    );

    const authorInfo = document.createElement("div");
    const authorImage = document.createElement("img");
    authorImage.src =
      post.author?.avatar?.url || "../../../img/ziko-profile_300x300.jpeg";
    authorImage.alt = post.author?.name || "Author Avatar";
    authorImage.classList.add("rounded-circle", "me-2");

    const authorName = document.createElement("span");
    authorName.textContent = post.author?.name || "Anonymous";

    authorInfo.appendChild(authorImage);
    authorInfo.appendChild(authorName);

    // Edit and delete icons
    const actionIcons = document.createElement("div");

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen", "me-3");
    editIcon.dataset.postId = post.id; // Attach post ID for editing
    editIcon.addEventListener("click", () => {
      // Replace post content with edit form
      const editForm = createEditForm(post);
      postCard.innerHTML = ""; // Clear post card content
      postCard.appendChild(editForm);
    });

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can");
    deleteIcon.dataset.postId = post.id; // Attach post ID for deletion
    deleteIcon.addEventListener("click", () => {
      const confirmation = confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmation) {
        deletePost(post.id); // Call delete function
      }
    });

    actionIcons.appendChild(editIcon);
    actionIcons.appendChild(deleteIcon);

    postHeader.appendChild(authorInfo);
    postHeader.appendChild(actionIcons);
    postCard.appendChild(postHeader);

    // Post body
    const postBody = document.createElement("div");
    postBody.classList.add("card-body");

    const postTitle = document.createElement("h5");
    postTitle.textContent = post.title || "Untitled Post";
    postBody.appendChild(postTitle);

    const postText = document.createElement("p");
    postText.textContent = post.body || "No content available";
    postBody.appendChild(postText);

    // Render media if available
    if (post.media?.url) {
      const postImage = document.createElement("img");
      postImage.src = post.media.url;
      postImage.alt = post.media.alt || "Post media";
      postImage.classList.add("img-fluid", "my-3");
      postBody.appendChild(postImage);
    }

    postCard.appendChild(postBody);
    postContainer.appendChild(postCard);
  });
}

/**
 * Creates an edit form for the given post.
 * @param {Object} post - The post to edit.
 * @returns {HTMLFormElement} The edit form element.
 */
function createEditForm(post) {
  const form = document.createElement("form");

  const titleField = document.createElement("input");
  titleField.type = "text";
  titleField.value = post.title || "";
  titleField.classList.add("form-control", "mb-3");
  titleField.placeholder = "Title";

  const bodyField = document.createElement("textarea");
  bodyField.value = post.body || "";
  bodyField.classList.add("form-control", "mb-3");
  bodyField.placeholder = "What's on your mind?";

  const mediaField = document.createElement("input");
  mediaField.type = "text";
  mediaField.value = post.media?.url || "";
  mediaField.classList.add("form-control", "mb-3");
  mediaField.placeholder = "Media URL";

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("btn", "btn-outline-secondary", "me-2");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => {
    renderPosts([post]); // Re-render the post card (reverting back to view mode)
  });

  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.classList.add("btn", "btn-primary");
  submitButton.textContent = "Submit Changes";
  submitButton.addEventListener("click", async () => {
    const updatedPost = {
      id: post.id, // Use the post ID from the current post being edited
      title: titleField.value.trim(),
      body: bodyField.value.trim(),
    };

    const mediaUrl = mediaField.value.trim();
    if (mediaUrl) {
      updatedPost.media = { url: mediaUrl }; // Add media only if a URL is provided
    }

    try {
      await updatePost(updatedPost); // Call the update function
      await fetchAndRenderPosts(); // Refresh the posts on the page
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Could not update the post. Please try again.");
    }
  });

  form.appendChild(titleField);
  form.appendChild(bodyField);
  form.appendChild(mediaField);
  form.appendChild(cancelButton);
  form.appendChild(submitButton);

  return form;
}
