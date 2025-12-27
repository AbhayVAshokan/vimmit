const FOCUSSED_CLASSNAME = "vimmit-card__focussed";

const isVisible = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 || rect.bottom <= window.innerHeight;
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
      break;
    }
  }
};

const gotoNextPostOrComment = () => {
  const posts = getPostsAndComments();
  if (posts.length === 0) return;

  const activeElement = getActiveElement();
  if (activeElement) {
    const currentIndex = posts.indexOf(activeElement);
    if (currentIndex < posts.length - 1) {
      focusElement(posts[currentIndex + 1]);
    } else {
      console.log("reached end... what to do?");
    }
    return;
  }

  focusFirstVisibleElement(posts);
};

const gotoPrevPostOrComment = () => {
  const posts = getPostsAndComments();
  if (posts.length === 0) return;

  const activeElement = getActiveElement();
  if (activeElement) {
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

const gotoHome = () => {
  window.location.href = "/?feed=home";
};

const gotoPopularTab = () => {
  window.location.href = "/r/popular";
};

const gotoNewPost = () => {
  window.location.href = "/submit";
};

const selectPost = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  activeElement.querySelector("a").click();
};

const KEYBINDINGS = {
  j: gotoNextPostOrComment,
  k: gotoPrevPostOrComment,
  u: handleUpvote,
  d: handleDownvote,
  h: gotoHome,
  p: gotoPopularTab,
  n: gotoNewPost,
  Enter: selectPost,
};

const keybindingsListener = (event) => {
  const activeElement = document.activeElement;
  const isTyping =
    activeElement &&
    (activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.contentEditable === "true");

  if (isTyping) {
    return;
  }

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
