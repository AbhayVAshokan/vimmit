const FOCUSSED_CLASSNAME = "vimmit-card__focussed";

const isVisible = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    (rect.top >= 0 && rect.bottom <= window.innerHeight) ||
    (rect.top >= 0 && rect.bottom <= window.innerHeight)
  );
};

const disableKeybindings = () => {
  const activeElement = document.activeElement;

  if (!activeElement) return false;

  // workaround: disable keybindings in settings
  if (window.location.href.includes("/settings")) {
    return true;
  }

  // workaround for messages tab
  if (activeElement.parentElement.tagName.toLowerCase() === "shreddit-app") {
    return true;
  }

  if (activeElement.contentEditable) return true;

  const tagName = activeElement.tagName.toLowerCase();
  return [
    "input",
    "textarea",
    "select",
    "shreddit-composer", // comments input
    "faceplate-text-input", // comments input
    "reddit-search-large", // search bar
    "shreddit-slotter", // add communities form
    "custom-feed-details-form", // create custom feed form
  ].includes(tagName);
};

const focusElement = (element) => {
  if (!element) return;

  document
    .querySelectorAll(`.${FOCUSSED_CLASSNAME}`)
    .forEach((element) => element.classList.remove(FOCUSSED_CLASSNAME));

  element.classList.add(FOCUSSED_CLASSNAME);

  const elementHeight = element.offsetHeight;
  const viewportHeight = window.innerHeight;

  if (elementHeight > viewportHeight) {
    // For large posts/comment, scroll to place the top of the element in the
    // middle of the viewport.
    const elementTopRelativeToDocument =
      element.getBoundingClientRect().top + window.scrollY;
    const desiredScrollPosition =
      elementTopRelativeToDocument - viewportHeight / 3;

    window.scrollTo({
      top: desiredScrollPosition,
      behavior: "smooth",
    });
  } else {
    // For smaller posts/comments, center the entire element in the viewport.
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

const getPostsAndComments = () => {
  return Array.from(
    document.querySelectorAll("shreddit-feed article, shreddit-comment"),
  );
};

const getActiveElement = () => {
  return document.querySelector(`.${FOCUSSED_CLASSNAME}`);
};

const focusFirstVisibleElement = (posts) => {
  for (const post of posts) {
    if (isVisible(post)) {
      focusElement(post);
      return post;
    }
  }

  focusElement(posts[0]);
  return posts[0];
};

const gotoNextPostOrComment = () => {
  const posts = getPostsAndComments();
  if (posts.length === 0) return;

  const activeElement = getActiveElement();
  if (activeElement && isVisible(activeElement)) {
    const currentIndex = posts.indexOf(activeElement);
    if (currentIndex < posts.length - 1) {
      focusElement(posts[currentIndex + 1]);
    }
    return;
  }

  focusFirstVisibleElement(posts);
};

const gotoPrevPostOrComment = () => {
  const posts = getPostsAndComments();
  if (posts.length === 0) return;

  const activeElement = getActiveElement();
  if (activeElement && isVisible(activeElement)) {
    const currentIndex = posts.indexOf(activeElement);
    if (currentIndex > 0) {
      focusElement(posts[currentIndex - 1]);
    }
    return;
  }

  focusFirstVisibleElement(posts);
};

const getVoteButton = (activeElement, voteType) => {
  if (activeElement.tagName === "SHREDDIT-POST") {
    return activeElement.children[0].shadowRoot.querySelector(
      `button[${voteType}]`,
    );
  } else if (activeElement.tagName === "SHREDDIT-COMMENT") {
    return activeElement
      .querySelector("shreddit-comment-action-row")
      .shadowRoot.querySelector(`button[${voteType}]`);
  }
  return null;
};

const handleUpvote = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  const upvoteBtn = getVoteButton(activeElement, "upvote");
  if (upvoteBtn) {
    upvoteBtn.click();
  }
};

const handleDownvote = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  const downvoteBtn = getVoteButton(activeElement, "downvote");
  if (downvoteBtn) {
    downvoteBtn.click();
  }
};

const selectPost = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  activeElement.querySelector("a").click();
};

const addComment = () => {
  const activeElement = getActiveElement() || focusFirstVisibleElement();

  if (activeElement.tagName === "SHREDDIT-COMMENT") {
    const commentBtn = activeElement.querySelector(
      "shreddit-comment-action-row faceplate-tracker button",
    );
    commentBtn?.click();
  }
};

const gotoHome = () => {
  window.location.href = "/?feed=home";
};

const gotoPopularTab = () => {
  window.location.href = "/r/popular";
};

const gotoNewPost = () => {
  window.location.href = "/submit";
};

const KEYBINDINGS = {
  j: gotoNextPostOrComment,
  k: gotoPrevPostOrComment,
  u: handleUpvote,
  d: handleDownvote,
  c: addComment,
  Enter: selectPost,
  n: gotoNewPost,
  h: gotoHome,
  p: gotoPopularTab,
};

const keybindingsListener = (event) => {
  if (disableKeybindings()) return;

  try {
    const handler = KEYBINDINGS[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  } catch (error) {
    console.error("Vimmit:", error);
  }
};

window.addEventListener("keydown", keybindingsListener, true);
