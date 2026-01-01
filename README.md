# Vimmit

Vim-like keyboard navigation for Reddit. Browse posts and comments with 'j' and 'k', upvote/downvote with 'u'/'d', and more.

## Features

- Navigate between posts and comments using the keyboard.
- Upvote, downvote, and comment without leaving the keyboard.
- Seamlessly skips ads during navigation.

Experience Vimmit in action:

![Vimmit Demo](assets/recording.mov)

## Installation

### Firefox

Install the add-on from [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/vimmit).

### Chrome

1. Clone the repository:

   ```sh

   git clone https://gitlab.com/abhayvashokan/vimmit.git

   ```

1. Install dependencies:
   ```sh
   bun install
   ```
1. Build the extension:
   ```sh
   bun run build
   ```
1. Open Chrome and navigate to `chrome://extensions`.
1. Enable "Developer mode" (top right corner).
1. Click "Load unpacked" and select the `manifest.json` file.

## Keybindings

| Key     | Action                |
| ------- | --------------------- |
| `j`     | Next Post/Comment     |
| `k`     | Previous Post/Comment |
| `u`     | Upvote                |
| `d`     | Downvote              |
| `c`     | Add a comment         |
| `Enter` | Select/Open Post      |
| `n`     | New Post              |
| `h`     | Go to Home            |
| `p`     | Go to Popular         |
