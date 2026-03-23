---
name: install
description: First-time setup for ClawDaddy Figma plugin connection. Use when user asks to install, setup, configure, or connect ClawDaddy for the first time.
---

# Install ClawDaddy

Sets up ClawDaddy bridge between Claude and Figma Desktop.

## What It Does

Installs dependencies, starts daemon, guides plugin installation, confirms connection.

## When to Use

- First-time ClawDaddy setup
- User says "install ClawDaddy"
- User says "setup Figma connection"
- User asks "how do I connect to Figma"

## Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Import Plugin in Figma

Tell user:
```
📦 Import ClawDaddy Plugin:

1. Open Figma Desktop
2. Go to: Plugins → Development → Import plugin from manifest
3. Select: plugin/manifest.json (in clawdaddy directory)
4. Quit Figma completely and reopen it
5. Start plugin: Plugins → Development → ClawDaddy

Keep plugin window open.
```

### 3. Connect
```bash
npx clawdaddy connect
```

Starts daemon, generates token, waits for plugin.

### 4. Test
```bash
npx clawdaddy eval "figma.currentPage.name"
```

Should return page name if working.

## Requirements

- Node.js 18+
- Figma Desktop (not browser)
- Design file open in Figma

## Troubleshooting

**Plugin not connected:**
- Start ClawDaddy plugin in Figma
- Use Figma Desktop, not browser

**No session token:**
- Run `npx clawdaddy connect`

**Command not found:**
- Use `npx clawdaddy` instead of `clawdaddy`
