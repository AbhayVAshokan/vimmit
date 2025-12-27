document.addEventListener("DOMContentLoaded", function () {
  const keybindingsList = document.getElementById("keybindings-list");

  const keybindings = {
    j: "Next Post/Comment",
    k: "Previous Post/Comment",
    u: "Upvote",
    d: "Downvote",
    c: "Add a comment",
    Enter: "Select/Open Post",
    n: "New Post",
    h: "Go to Home",
    p: "Go to Popular",
  };

  for (const key in keybindings) {
    const listItem = document.createElement("li");

    const keySpan = document.createElement("span");
    keySpan.className = "key";
    keySpan.textContent = key;

    const actionSpan = document.createElement("span");
    actionSpan.className = "action";
    actionSpan.textContent = keybindings[key];

    listItem.appendChild(actionSpan);
    listItem.appendChild(keySpan);

    keybindingsList.appendChild(listItem);
  }
});
