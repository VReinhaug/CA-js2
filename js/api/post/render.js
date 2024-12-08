/**
 * Renders the posts with their associated author data to the page.
 * @param {Object[]} posts - The posts array.
 */
export function renderPosts(posts) {
  const postContainer = document.querySelector("#feed-container");
  postContainer.innerHTML = ""; // Clear the container before rendering

  posts.forEach((post) => {
    // Create post card
    const postCard = document.createElement("div");
    postCard.classList.add("card", "card-one", "m-3", "mx-auto");

    // Author info
    const postHeader = document.createElement("div");
    postHeader.classList.add("card-header", "d-flex", "align-items-center");

    const authorImage = document.createElement("img");
    authorImage.src =
      post.author?.avatar?.url || "../../../img/ziko-profile_300x300.jpeg";
    authorImage.alt = post.author?.name || "Author Avatar";
    authorImage.classList.add("rounded-circle", "me-2");

    const authorName = document.createElement("span");
    authorName.textContent = post.author?.name || "Anonymous";

    postHeader.appendChild(authorImage);
    postHeader.appendChild(authorName);
    postCard.appendChild(postHeader);

    // Post body
    const postBody = document.createElement("div");
    postBody.classList.add("card-body");

    // Post title
    const postTitle = document.createElement("h5");
    postTitle.textContent = post.title || "Untitled Post";
    postBody.appendChild(postTitle);

    // Render media if available
    if (post.media && post.media.url) {
      const postImage = document.createElement("img");
      postImage.src = post.media.url;
      postImage.alt = post.media.alt || "Post media";
      postBody.appendChild(postImage);
    }

    // Post text
    const postText = document.createElement("p");
    postText.textContent = post.body || "No content available";
    postBody.appendChild(postText);

    postCard.appendChild(postBody);
    postContainer.appendChild(postCard);
  });
}
