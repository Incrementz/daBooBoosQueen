# My GitHub Pages Site

A minimal static website you can host **for free** on GitHub Pages.

## Quick Deploy (no workflow needed)
1. Create a repository on GitHub (public is fine).
2. Upload these files (or push via git).
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source: Deploy from a branch**.
5. Choose **Branch: `main`** and **Folder: `/ (root)`** → **Save**.
6. Wait ~1 minute. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

> **Tip:** For a personal site at `https://<your-username>.github.io`, name the repo exactly `<your-username>.github.io` and keep your files in the repo root.

## Editing
- `index.html` is your homepage
- `styles.css` for styling
- `app.js` for small interactivity
- `favicon.svg` is the icon in the browser tab

## Custom Domain (optional)
1. In **Settings → Pages**, add your custom domain (e.g., `www.example.com`).
2. At your domain registrar, add a CNAME record pointing `www` → `<your-username>.github.io`.
3. Back in **Pages**, enable **Enforce HTTPS** once issued.

Have fun!
