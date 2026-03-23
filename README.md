# 🦞 ClawDaddy

**Claude Code to Figma bridge** - Safe, secure, plugin-based connection.

Write natural language, get Figma results. ClawDaddy connects Claude Code to Figma Desktop via a secure WebSocket plugin.

## Features

### Core Features
✅ **Safe Plugin Mode** - No binary patching, no unsafe operations
✅ **Token Authentication** - Session-based security
✅ **Auto-start Daemon** - Starts automatically when needed
✅ **Fast Execution** - ~1-3 seconds per command
✅ **Auto-detection** - Claude Code automatically detects Figma requests

### Extensions
✅ **FigJam** - Full support for FigJam boards
  - Create sticky notes and shapes
  - Manage connectors
  - Organize by color
  - Voting sessions and brainstorming tools

## Quick Start

### 1. Install Plugin

1. Open Figma Desktop
2. Go to: Plugins → Development → Import plugin from manifest
3. Select: `<clawdaddy-dir>/plugin/manifest.json`

### 2. Connect ClawDaddy

```bash
npm install
clawdaddy connect
```

This will:
- Start the daemon (background server)
- Generate a session token
- Wait for plugin connection

### 3. Start Plugin in Figma

- Plugins → Development → ClawDaddy
- Keep it running while using ClawDaddy

### 4. Execute Commands

```bash
# Get current page name
clawdaddy eval "figma.currentPage.name"

# Create a rectangle
clawdaddy eval "const rect = figma.createRectangle(); figma.currentPage.appendChild(rect);"

# Run a script file
clawdaddy run examples/core/hello-world.js
```

## Commands

### Core Commands
```bash
clawdaddy connect              # Initial setup (daemon + plugin)
clawdaddy status               # Check connection status
clawdaddy eval "<code>"        # Execute JavaScript
clawdaddy run <file>           # Execute script file
clawdaddy daemon start         # Manually start daemon
clawdaddy daemon stop          # Stop daemon
clawdaddy daemon restart       # Restart daemon
```

### FigJam Extension
```bash
clawdaddy figjam check         # Check if current file is FigJam
clawdaddy figjam sticky "text" # Create a sticky note
clawdaddy figjam stickies      # Get all sticky notes
clawdaddy figjam organize      # Organize stickies by color
```

## Architecture

```
Claude Code
    ↓
ClawDaddy CLI
    ↓ HTTP + Token Auth
Daemon (localhost:3456)
    ↓ WebSocket
Plugin (Figma)
    ↓
Figma Plugin API
```

**Security features:**
- Session tokens (256-bit random)
- Localhost-only binding (127.0.0.1)
- Host header validation
- No CORS headers
- Idle timeout (10 min auto-shutdown)

## Usage Examples

```bash
# Get page name
clawdaddy eval "figma.currentPage.name"

# Create a rectangle
clawdaddy eval "const rect = figma.createRectangle(); rect.fills = [{type: 'SOLID', color: {r: 1, g: 0, b: 0}}]; figma.currentPage.appendChild(rect);"

# List all nodes
clawdaddy eval "figma.currentPage.children.map(n => ({name: n.name, type: n.type}))"

# FigJam: Create sticky note
clawdaddy figjam sticky "Meeting notes"
```

## Usage with Claude Code

Just ask naturally:

> "Create a button component in Figma with rounded corners"

Claude Code will automatically:
1. Start the daemon (if not running)
2. Generate the Figma API code
3. Execute via ClawDaddy
4. Return the result

No manual commands needed!

## Troubleshooting

### "Plugin not connected"
→ Start the ClawDaddy plugin in Figma (Plugins → Development → ClawDaddy)

### "No session token found"
→ Run `clawdaddy connect` to setup the connection

### "Daemon not running"
→ Daemon auto-starts with commands, or manually: `clawdaddy daemon start`

### Plugin disconnects frequently
→ Keep Figma in focus or re-run the plugin when needed

## Development

```bash
# Install dependencies
npm install

# Start daemon manually
npm start

# Run CLI
node src/core/index.js --help
```

## Architecture Details

**Daemon** (`src/core/daemon.js`):
- HTTP server on port 3456 (localhost only)
- WebSocket endpoint for plugin connection
- Token-based authentication
- Idle timeout (10 minutes)
- Auto-shutdown when idle

**Client** (`src/core/client.js`):
- Token management
- HTTP client for daemon API
- Retry logic
- Error handling

**Plugin** (`plugin/`):
- WebSocket bridge to daemon
- Executes JavaScript in Figma context
- Returns results to daemon
- Auto-reconnect support

## What ClawDaddy Does NOT Do

❌ **No binary patching** - No unsafe modifications
❌ **No CDP** - No Chrome DevTools Protocol hacks
❌ **No hot-reload** - Simple, predictable execution
❌ **No JSX** - Use vanilla Figma API

ClawDaddy is intentionally minimal and safe.

## Requirements

- Node.js 18+
- Figma Desktop
- macOS / Linux / Windows

## License

MIT

---

**Built for Claude Code** - Natural language to Figma automation.
