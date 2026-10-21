# Agent Guidelines & Project Manual

## Project Overview
- **Name:** Yatra
- **Slug:** yatra
- **Stack:** node
- **Dev Command:** `npm run dev`
- **Build Command:** `npm run build`
- **Test Command:** `npm test`

## Rules for AI Coding Agents (Antigravity CLI / Gemini CLI / Claude)
1. **Repository Integrity:** Keep Git commits focused and descriptive. Do not perform force pushes (`git push --force`).
2. **Design System & Aesthetics:** If writing frontend interfaces, adhere to Deployo design tokens (`bg-surface-page`, `bg-surface-card`, `bg-primary`) and prefer primitives in `components/common`. Avoid arbitrary raw hexes.
3. **Environment Security:** Never commit sensitive production credentials, private keys, or raw tokens into version control. Always use `.env` files that are excluded via `.gitignore`.
4. **Verification:** Always run the test command (`npm test`) or build validation before marking tasks complete.
