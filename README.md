# Wedding Invitation Website

A cinematic single-page wedding invitation website built with React and Vite.

## Project Structure

```
wedding/
├── .git/                          # Git repository
├── .github/                       # GitHub Actions workflows
├── .gitignore                     # Git ignore rules
├── .vscode/                       # VS Code settings and MCP config
├── dist/                          # Build output directory
├── index.html                     # Main HTML entry point
├── node_modules/                  # Dependencies
├── package-lock.json              # Lockfile for dependencies
├── package.json                   # Project configuration and scripts
├── public/                        # Static assets
│   ├── images/                    # Wedding photos and gallery images
│   └── music/                     # Wedding music files
├── README.md                      # This file
├── src/                           # Source code
│   ├── App.jsx                    # Main React application component
│   ├── content/                   # Content configuration
│   │   └── siteContent.json       # Wedding details and customization data
│   ├── main.jsx                   # React application entry point
│   └── styles.css                 # Global styles
└── vite.config.js                 # Vite build configuration
```

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

## Customize content

Edit `src/content/siteContent.json` to update:

- couple names and descriptions
- date and time
- venue and maps link
- gallery images
- contact details
- theme colors and font choices

Replace placeholder assets in `public/images/` with your own bride, groom, and gallery photos while keeping the same paths or updating the JSON references.

## GitHub Pages

The Vite `base` path is derived from `GITHUB_REPOSITORY` in production builds, with a fallback repository name of `wedding`.

Automatic deployment is configured in `.github/workflows/deploy-pages.yml`.

To publish from GitHub Pages:

1. Push this project to a GitHub repository.
2. Keep the default branch as `main`, or update the workflow if you use a different branch.
3. In GitHub, open `Settings -> Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to `main` or run the workflow manually from the `Actions` tab.

## GitHub MCP

The workspace includes a GitHub MCP server config in `.vscode/mcp.json` and expects the token to come from your shell environment.

Use PowerShell before starting Cursor or Codex:

```powershell
$env:GITHUB_PERSONAL_ACCESS_TOKEN = "your_new_pat_here"
```

The GitHub MCP server is configured in read-only mode by default. After setting the environment variable, restart your IDE or Codex session and start the `github` MCP server.
