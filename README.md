# 🦞 ClawDaddy

> **Natural language to Figma automation** - AI-powered bridge for Claude Code and LLM assistants.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Figma](https://img.shields.io/badge/Figma-Desktop-purple.svg)](https://www.figma.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Write natural language, get Figma results instantly. ClawDaddy connects AI assistants like Claude Code to Figma Desktop via a secure WebSocket plugin.

**Perfect for:**
- 🤖 **AI-powered design automation** - "Create a red button with rounded corners"
- 🎨 **Rapid prototyping** - Generate Figma components from descriptions
- 📊 **Design data extraction** - Export assets, analyze components
- 🔄 **Workflow automation** - Batch operations, design system updates
- 🧪 **FigJam brainstorming** - Auto-organize sticky notes, voting sessions

**No manual commands needed** - Just describe what you want in natural language.

### How It Works (Simple Version)

```
You say:                    ClawDaddy does:               You get:
"Create a red              →  Converts to Figma code  →   Red rectangle
rectangle in Figma"        →  Sends to Figma           →   appears instantly!
```

**That's it!** No coding, no complex commands. Just talk to your AI assistant.

---

## Table of Contents

- [What Can You Do?](#what-can-you-do-with-clawdaddy) - Real-world examples
- [Features](#features) - What makes ClawDaddy special
- [Requirements](#requirements) - What you need to install first
- [Quick Start](#quick-start) - Setup guide (5-10 minutes)
  - [Step 0: Download](#step-0-download-clawdaddy)
  - [Step 1: Install Plugin](#step-1-install-the-plugin-in-figma)
  - [Step 2: Connect](#step-2-connect-clawdaddy)
  - [Step 3: Start Plugin](#step-3-start-the-plugin-in-figma)
  - [Step 4: Start Using!](#step-4-start-using-clawdaddy-)
- [Troubleshooting](#troubleshooting) - Common issues & solutions
- [Command Reference](#command-reference) - For developers
- [Architecture](#architecture) - How it works

---

## What Can You Do With ClawDaddy?

### Real-World Examples

**🎨 Design Automation**
- "Create 10 color swatches from my brand palette"
- "Make a button component with 5 different states"
- "Generate a grid of 50 profile avatars"

**📊 Batch Operations**
- "Rename all frames with 'v2' prefix"
- "Update all text layers using Arial to SF Pro"
- "Export all icons on this page as SVG"

**🔍 Analysis & Export**
- "Show me all the colors used in this design"
- "List every font and text size"
- "Export all components as PNG at 2x resolution"

**🧪 FigJam Collaboration**
- "Create sticky notes from this list of ideas"
- "Organize all stickies by color"
- "Count votes on all sticky notes"

**🤖 AI-Powered Generation**
- "Create a dashboard layout with sidebar and cards"
- "Make a pricing table with 3 tiers"
- "Generate a login form with email and password fields"

## Features

### Core Features
✅ **Safe & Secure** - No binary patching, token-based authentication
✅ **Auto-start** - Background server starts automatically when needed
✅ **Fast** - Execute commands in 1-3 seconds
✅ **Auto-detection** - AI assistants detect Figma requests automatically
✅ **FigJam Support** - Works with both Figma and FigJam files

## Quick Start

> **⏱️ Setup time: 5-10 minutes** | **Difficulty: Easy** (No coding required!)

**The 4-Step Setup:**
```
Step 0: Download    →  Step 1: Import    →  Step 2: Connect   →  Step 3: Start    →  ✅ Done!
        ClawDaddy          to Figma             ClawDaddy            Plugin
```

### Step 0: Download ClawDaddy

**First, you need to download ClawDaddy to your computer:**

If you received ClawDaddy as a ZIP file:
1. Find the downloaded ZIP file (usually in your Downloads folder)
2. **Double-click to extract it** - this creates a `clawdaddy` folder
3. **Move this folder** somewhere you'll remember (like Desktop or Documents)

If you're cloning from a git repository, use the git URL you were provided.

### Step 1: Install the Plugin in Figma

Now let's add ClawDaddy to Figma:

1. **Open Figma Desktop** (⚠️ Must use the desktop app, not the browser!)
2. In the top menu, click **Plugins**
3. Click **Development** → **Import plugin from manifest...**
4. A file picker will open - navigate to your `clawdaddy` folder
5. Open the **`plugin`** folder inside
6. Click on the file named **`manifest.json`**
7. Click **Open**

✅ Success! You should see "ClawDaddy" in your Development plugins list.

### Step 2: Connect ClawDaddy

Choose the method that works best for you:

<table>
<tr>
<th>🤖 With AI Assistant<br/>(Recommended - Easiest!)</th>
<th>⌨️ Manual Setup<br/>(For advanced users)</th>
</tr>
<tr>
<td valign="top">

**If you have Claude Code, Windsurf, or similar AI assistant:**

1. Open your AI assistant's terminal
2. Navigate to the `clawdaddy` folder
3. Type: **"install clawdaddy"** or **"setup figma connection"**
4. The AI will do everything automatically!

The AI will:
- ✅ Install needed software
- ✅ Set up the connection
- ✅ Test that it works

**That's it!** The AI handles all the technical stuff.

</td>
<td valign="top">

**If you're comfortable with Terminal/Command Prompt:**

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to the `clawdaddy` folder:
   ```bash
   cd path/to/clawdaddy
   ```
3. Run these commands:
   ```bash
   npm install
   npx clawdaddy connect
   ```

This will:
- Install dependencies
- Start a background server
- Create a secure connection
- Wait for the Figma plugin

</td>
</tr>
</table>

### Step 3: Start the Plugin in Figma

**Important:** Quit and restart Figma first!

1. **Completely quit Figma** (Cmd+Q on Mac, or File → Exit)
2. **Reopen Figma Desktop**
3. Open any Figma file (or create a new one)
4. In the top menu, click **Plugins** → **Development** → **ClawDaddy**
5. A small plugin window will appear - **keep it open!**

💡 **Tip:** The plugin window must stay open while you use ClawDaddy. You can minimize it, but don't close it!

### Step 4: Start Using ClawDaddy! 🎉

You're ready! Choose how you want to use it:

<table>
<tr>
<th>🗣️ Talk to AI<br/>(No coding needed!)</th>
<th>⌨️ Use Commands<br/>(For developers)</th>
</tr>
<tr>
<td valign="top">

**Best for designers!** Just describe what you want:

**What to say:**
- *"Create a red rectangle in Figma"*
- *"Make a button with rounded corners"*
- *"Export this as PNG to my desktop"*
- *"Add a text layer that says 'Hello World'"*
- *"Get the name of the current page"*
- *"List all the frames on this page"*

**What happens:**
1. The AI understands your request
2. Writes the code automatically
3. Runs it in Figma via ClawDaddy
4. Shows you the result

**No commands to memorize!** Just talk naturally.

**Works with:**
- Claude Code
- Windsurf
- Any AI assistant that supports ClawDaddy

</td>
<td valign="top">

**For developers and scripters:**

You can run ClawDaddy commands directly in Terminal:

```bash
# Get current page name
npx clawdaddy eval "figma.currentPage.name"

# Create a red rectangle
npx clawdaddy eval "const rect = figma.createRectangle(); rect.fills = [{type: 'SOLID', color: {r: 1, g: 0, b: 0}}]; figma.currentPage.appendChild(rect);"

# Export selection as PNG
npx clawdaddy export png -o design.png

# Run a script file
npx clawdaddy run script.js

# Check connection
npx clawdaddy status
```

See [Command Reference](#command-reference) for full list.

</td>
</tr>
</table>

## Command Reference

### Core Commands
```bash
npx clawdaddy connect          # Initial setup (daemon + plugin)
npx clawdaddy status           # Check connection status
npx clawdaddy eval "<code>"    # Execute JavaScript in Figma
npx clawdaddy run <file>       # Execute script file
npx clawdaddy daemon start     # Manually start daemon
npx clawdaddy daemon stop      # Stop daemon
npx clawdaddy daemon restart   # Restart daemon
```

### Export Commands
```bash
npx clawdaddy export png -o design.png           # Export selection as PNG
npx clawdaddy export png -s 2 -o design@2x.png   # Export at 2x scale
npx clawdaddy export png -n "123:456" -o btn.png # Export specific node by ID
npx clawdaddy export svg -o icon.svg             # Export as SVG
```

### FigJam Extension
```bash
npx clawdaddy figjam check         # Check if current file is FigJam
npx clawdaddy figjam sticky "text" # Create a sticky note
npx clawdaddy figjam stickies      # Get all sticky notes
npx clawdaddy figjam organize      # Organize stickies by color
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

## CLI Examples

**Basic operations:**
```bash
# Get page name
npx clawdaddy eval "figma.currentPage.name"

# Create a red rectangle
npx clawdaddy eval "const rect = figma.createRectangle(); rect.fills = [{type: 'SOLID', color: {r: 1, g: 0, b: 0}}]; figma.currentPage.appendChild(rect);"

# List all nodes on current page
npx clawdaddy eval "figma.currentPage.children.map(n => ({name: n.name, type: n.type}))"
```

**Export operations:**
```bash
# Export current selection as PNG
npx clawdaddy export png -o design.png

# Export at 2x resolution
npx clawdaddy export png -s 2 -o design@2x.png

# Export as SVG
npx clawdaddy export svg -o icon.svg
```

**FigJam operations:**
```bash
# Create sticky note
npx clawdaddy figjam sticky "Meeting notes"

# Organize stickies by color
npx clawdaddy figjam organize
```

## Troubleshooting

Having issues? Here are the most common problems and solutions:

| Problem | With AI Assistant | Manual Fix |
|---------|-------------------|------------|
| **"Plugin not connected"** | Say: *"start the ClawDaddy plugin in Figma"* | 1. Open Figma Desktop<br/>2. Go to Plugins → Development → ClawDaddy<br/>3. Make sure plugin window stays open |
| **"No session token found"** | Say: *"connect clawdaddy"* or *"setup figma connection"* | Run in Terminal:<br/>`npx clawdaddy connect` |
| **"Daemon not running"** | The AI will start it automatically | Run in Terminal:<br/>`npx clawdaddy daemon start`<br/>(or just run any command - it auto-starts) |
| **Plugin keeps disconnecting** | Say: *"restart the ClawDaddy plugin"* | Keep Figma in focus, or re-run the plugin when needed. Plugin must stay open! |
| **"command not found" error** | Make sure you're in the `clawdaddy` folder | Use `npx clawdaddy` instead of `clawdaddy` |
| **Nothing happens when I give commands** | Check that:<br/>• Figma Desktop is open (not browser)<br/>• Plugin window is open<br/>• You have a file open in Figma | Same checks, plus verify connection:<br/>`npx clawdaddy status` |

### Still Having Issues?

1. **Restart everything:**
   - Quit Figma completely (Cmd+Q / File → Exit)
   - Stop the daemon: `npx clawdaddy daemon stop`
   - Reopen Figma and restart the plugin
   - Reconnect: `npx clawdaddy connect`

2. **Check the plugin console:**
   - In Figma, right-click the plugin window
   - Select "Inspect" to see error messages

3. **Ask your AI assistant:** If you're using Claude Code or similar, just say *"ClawDaddy isn't working, help me debug it"*

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

### What You Need Before Starting

| Requirement | Why You Need It | Where to Get It |
|-------------|-----------------|-----------------|
| **Figma Desktop** | The plugin only works in the desktop app, not the browser | [Download Figma Desktop](https://www.figma.com/downloads/) |
| **Node.js 18+** | Runs the ClawDaddy background server | [Download Node.js](https://nodejs.org/) (choose LTS version) |
| **AI Assistant** (optional) | Makes it super easy to use - no coding needed! | [Claude Code](https://claude.com/claude-code), [Windsurf](https://codeium.com/windsurf), etc. |

**Supported Operating Systems:** macOS, Windows, Linux

### How to Check if Node.js is Installed

Open Terminal (Mac) or Command Prompt (Windows) and type:
```bash
node --version
```

If you see a version number (like `v18.0.0` or higher), you're good to go! If not, [download Node.js here](https://nodejs.org/).

## License

MIT

---

<div align="center">

**🦞 ClawDaddy - Bridge the gap between AI and Figma 🦞**

Built for Claude Code and AI assistants - Enabling natural language to Figma automation.

</div>
