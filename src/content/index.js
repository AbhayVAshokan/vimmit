import { disableKeybindings } from "./utils";
import {
  gotoNextPostOrComment,
  gotoPrevPostOrComment,
  selectPost,
  gotoNewPost,
  gotoHome,
  gotoPopularTab,
} from "./navigation";
import { handleUpvote, handleDownvote, addComment } from "./actions";

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
  event.stopImmediatePropagation();
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
