import { getActiveElement, focusFirstVisibleElement } from "./dom";

export const getVoteButton = (activeElement, voteType) => {
  if (activeElement.tagName === "ARTICLE") {
    return activeElement
      .querySelector("shreddit-post")
      .shadowRoot.querySelector(`button[${voteType}]`);
  } else if (activeElement.tagName === "SHREDDIT-COMMENT") {
    return activeElement
      .querySelector("shreddit-comment-action-row")
      .shadowRoot.querySelector(`button[${voteType}]`);
  }
  return null;
};

export const handleUpvote = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  const upvoteBtn = getVoteButton(activeElement, "upvote");
  upvoteBtn.click();
};

export const handleDownvote = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  const downvoteBtn = getVoteButton(activeElement, "downvote");
  if (downvoteBtn) {
    downvoteBtn.click();
  }
};

export const addComment = () => {
  let commentBtn;
  const activeElement = getActiveElement() || focusFirstVisibleElement();

  if (activeElement.tagName === "SHREDDIT-COMMENT") {
    commentBtn = activeElement.querySelector(
      "shreddit-comment-action-row faceplate-tracker button",
    );
  } else {
    commentBtn = activeElement
      .querySelector("shreddit-post")
      .shadowRoot.querySelector("a[data-post-click-location]");
  }

  commentBtn.click();
};
