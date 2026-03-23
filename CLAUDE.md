# ClawDaddy - Claude to Figma Bridge

🦞 **Auto-detect Figma requests** - No manual commands needed.

## Architecture - Plugin Mode

**Safe & Secure Plugin Connection:**
- WebSocket bridge via ClawDaddy plugin
- Token-based authentication
- Localhost-only daemon
- Auto-start daemon when needed
- Fast execution (~1-3s)

## First-Time Setup

If user has never setup ClawDaddy:

1. **Install plugin in Figma:**
   - Open Figma Desktop
   - Go to: Plugins → Development → Import plugin from manifest
   - Select: `<clawdaddy-dir>/plugin/manifest.json`

2. **Connect ClawDaddy:**
   ```bash
   npx clawdaddy connect
   # Or if you want to install globally: sudo npm link
   ```

3. **Start plugin in Figma:**
   - Plugins → Development → ClawDaddy
   - Keep it running (or re-run when needed)

**That's it!** ClawDaddy is now ready.

## When User Mentions Figma

**Automatically execute Figma operations:**

1. **Detect Figma Context:**
   - User says "create/update/check in Figma"
   - User provides figma.com URL
   - User asks about Figma files/components
   - User wants to run Figma scripts
   - User asks to "export" designs/assets/images from Figma

2. **Just Execute:**
   ```bash
   # Run JavaScript in Figma (auto-starts daemon)
   npx clawdaddy eval "figma.currentPage.name"

   # Or run a file
   npx clawdaddy run script.js
   ```

## Example Flows

**User:** "Create a red rectangle in Figma"

**You do:**
Execute directly: `npx clawdaddy eval "const rect = figma.createRectangle(); rect.fills = [{type: 'SOLID', color: {r: 1, g: 0, b: 0}}]; figma.currentPage.appendChild(rect);"`

**User:** "Export this as PNG"

**You do:**
Execute directly: `npx clawdaddy export png -o design.png`

(ClawDaddy → daemon auto-starts → plugin executes → returns result → saves to file)

## Commands Available

### Core Commands
```bash
clawdaddy connect              # Initial setup (daemon + plugin)
npx clawdaddy status               # Check connection status
npx clawdaddy eval "<code>"        # Execute JavaScript (auto-starts daemon)
npx clawdaddy run <file>           # Execute file (auto-starts daemon)
npx clawdaddy daemon start/stop    # Manage daemon
```

### FigJam Extension
```bash
npx clawdaddy figjam check         # Check if FigJam board
npx clawdaddy figjam sticky "text" # Create sticky note
npx clawdaddy figjam stickies      # Get all stickies
npx clawdaddy figjam organize      # Organize by color
```

### Export Assets
```bash
# Export selected node as PNG
npx clawdaddy export png -o design.png

# Export with scale factor
npx clawdaddy export png -s 2 -o design@2x.png

# Export specific node by ID
npx clawdaddy export png -n "123:456" -o button.png

# Export as SVG
npx clawdaddy export svg -o icon.svg

# Export specific node as SVG
npx clawdaddy export svg -n "123:456" -o logo.svg
```

## Architecture

- **Plugin Mode** - Safe WebSocket bridge via plugin
- **Token authentication** - Session-based security
- **Auto-start daemon** - Starts automatically when needed
- **Localhost only** - Daemon binds to 127.0.0.1:3456

## Setup (First Time Only)

1. **Import plugin:**
   - Figma → Plugins → Development → Import plugin from manifest
   - Select `plugin/manifest.json`

2. **Connect:**
   ```bash
   clawdaddy connect
   ```

3. **Start plugin in Figma:**
   - Plugins → Development → ClawDaddy

4. **Done!** Daemon auto-starts for future commands.

## Common Patterns

### Basic Operations
**Get page info:**
```bash
npx clawdaddy eval "figma.currentPage.name"
```

**List all nodes:**
```bash
npx clawdaddy eval "figma.currentPage.children.map(n => ({name: n.name, type: n.type}))"
```

**Create shapes:**
```bash
npx clawdaddy eval "const rect = figma.createRectangle(); figma.currentPage.appendChild(rect);"
```

### Export Operations
**When user wants to export designs/assets:**
```bash
# Export current selection as PNG
npx clawdaddy export png -o design.png

# Export at 2x resolution
npx clawdaddy export png -s 2 -o design@2x.png

# Export specific node
npx clawdaddy export png -n "123:456" -o button.png

# Export as SVG
npx clawdaddy export svg -o icon.svg
```

### FigJam Operations
**When user mentions sticky notes, FigJam, brainstorming:**
```bash
# Create sticky notes
npx clawdaddy figjam sticky "Meeting notes"

# Organize stickies by color
npx clawdaddy figjam organize
```

## Troubleshooting

- **"Plugin not connected"** → Start ClawDaddy plugin in Figma (Plugins → Development → ClawDaddy)
- **"No session token"** → Run `clawdaddy connect`
- **"Daemon not running"** → Run `npx clawdaddy daemon start` or just run a command (auto-starts)

---

**Key Rule:** After initial setup, daemon auto-starts when you run commands. User only needs to start the plugin in Figma.
