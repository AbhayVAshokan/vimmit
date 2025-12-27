import { isVisible } from "./utils";

export const FOCUSSED_CLASSNAME = "vimmit-card__focussed";

export const focusElement = (element) => {
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

export const getPostsAndComments = () => {
  return Array.from(
    document.querySelectorAll("shreddit-feed article, shreddit-comment"),
  );
};

export const getActiveElement = () => {
  return document.querySelector(`.${FOCUSSED_CLASSNAME}`);
};

export const focusFirstVisibleElement = (posts) => {
  for (const post of posts) {
    if (post && post.offsetParent && post.offsetParent !== null && post.offsetParent.offsetParent !== null && isVisible(post)) {
      focusElement(post);
      return post;
    }
  }

  focusElement(posts[0]);
  return posts[0];
};