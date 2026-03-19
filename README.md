# Wedding Invitation Website

A cinematic single-page wedding invitation website built with React and Vite.

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
