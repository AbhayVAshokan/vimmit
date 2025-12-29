export const isVisible = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    (rect.top >= 0 && rect.bottom <= window.innerHeight) ||
    (rect.top >= 0 && rect.bottom <= window.innerHeight)
  );
};

export const disableKeybindings = () => {
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

  if (activeElement.contentEditable === "true") return true;

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
