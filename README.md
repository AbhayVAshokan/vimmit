# Vimmit

Vim-like keyboard navigation for Reddit. Browse posts and comments with 'j' and 'k', upvote/downvote with 'u'/'d', and more.

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

## Installation/Development

1.  Clone the repository:
    ```sh
    git clone https://gitlab.com/abhayvashokan/vimmit.git
    ```
2.  Install dependencies:
    ```sh
    bun install
    ```
3.  Build the extension:
    ```sh
    bun run watch
    ```
4.  **Load in Chrome:**
    - Open Chrome and navigate to `chrome://extensions`.
    - Enable "Developer mode" (top right corner).
    - Click "Load unpacked" and select the `dist` directory.
5.  **Load in Firefox:**
    - Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
    - Click "Load Temporary Add-on" and select any file inside the `dist` directory (e.g., `dist/manifest.json`).

## License

This project is open source, feel free to use and modify it.
