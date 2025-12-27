import { getActiveElement, focusFirstVisibleElement } from "./dom";

export const getVoteButton = (activeElement, voteType) => {
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

export const handleUpvote = () => {
  const activeElement = getActiveElement();
  if (!activeElement) return;

  const upvoteBtn = getVoteButton(activeElement, "upvote");
  if (upvoteBtn) {
    upvoteBtn.click();
  }
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
  const activeElement = getActiveElement() || focusFirstVisibleElement();

  if (activeElement.tagName === "SHREDDIT-COMMENT") {
    const commentBtn = activeElement.querySelector(
      "shreddit-comment-action-row faceplate-tracker button",
    );
    commentBtn?.click();
  }
};
