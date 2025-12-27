import { getActiveElement, getPostsAndComments, focusElement, focusFirstVisibleElement } from "./dom";

export const gotoNextPostOrComment = () => {
  const posts = getPostsAndComments();
  if (posts.length === 0) return;

  const activeElement = getActiveElement();
  if (activeElement) {
    const currentIndex = posts.indexOf(activeElement);
    if (currentIndex < posts.length - 1) {
      focusElement(posts[currentIndex + 1]);
    }
    return;
  }

  focusFirstVisibleElement(posts);
};

export const gotoPrevPostOrComment = () => {
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

export const selectPost = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  activeElement.querySelector("a").click();
};

export const gotoHome = () => {
  window.location.href = "/?feed=home";
};

export const gotoPopularTab = () => {
  window.location.href = "/r/popular";
};

export const gotoNewPost = () => {
  window.location.href = "/submit";
};
