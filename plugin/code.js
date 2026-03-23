/**
 * 🦞 ClawDaddy Bridge Plugin
 *
 * Connects Claude Code to Figma via WebSocket
 * No debug port needed, no patching required.
 */

// Show minimal UI (needed for WebSocket connection)
figma.showUI(__html__, {
  width: 160,
  height: 72,
  position: { x: -9999, y: 9999 }  // Bottom-left (push to far left)
});

// Helper function for base64 encoding (available to executed code)
function btoa(str) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  let i = 0;

  while (i < str.length) {
    const a = str.charCodeAt(i++);
    const b = i < str.length ? str.charCodeAt(i++) : 0;
    const c = i < str.length ? str.charCodeAt(i++) : 0;

    const bitmap = (a << 16) | (b << 8) | c;

    result += chars[(bitmap >> 18) & 63];
    result += chars[(bitmap >> 12) & 63];
    result += i - 2 < str.length ? chars[(bitmap >> 6) & 63] : '=';
    result += i - 1 < str.length ? chars[bitmap & 63] : '=';
  }

  return result;
}

// Execute code with auto-return and timeout protection
async function executeCode(code, timeoutMs = 25000) {
  let trimmed = code.trim();

  // Don't add return if code already starts with return
  if (!trimmed.startsWith('return ')) {
    const isSimpleExpr = !trimmed.includes(';');
    const isIIFE = trimmed.startsWith('(function') || trimmed.startsWith('(async function');
    const isArrowIIFE = trimmed.startsWith('(() =>') || trimmed.startsWith('(async () =>');

    if (isSimpleExpr || isIIFE || isArrowIIFE) {
      trimmed = `return ${trimmed}`;
    } else {
      const lastSemicolon = trimmed.lastIndexOf(';');
      if (lastSemicolon !== -1) {
        const beforeLast = trimmed.substring(0, lastSemicolon + 1);
        const lastStmt = trimmed.substring(lastSemicolon + 1).trim();
        if (lastStmt && !lastStmt.startsWith('return ')) {
          trimmed = beforeLast + ' return ' + lastStmt;
        }
      }
    }
  }

  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  const fn = new AsyncFunction('figma', 'btoa', `return (async () => { ${trimmed} })()`);

  // Execute with timeout protection
  const execPromise = fn(figma, btoa);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Execution timeout (${timeoutMs/1000}s)`)), timeoutMs)
  );

  return Promise.race([execPromise, timeoutPromise]);
}

// Handle messages from UI (WebSocket bridge)
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'eval') {
    try {
      const result = await executeCode(msg.code);
      figma.ui.postMessage({ type: 'result', id: msg.id, result: result });
    } catch (error) {
      figma.ui.postMessage({ type: 'result', id: msg.id, error: error.message });
    }
  }

  if (msg.type === 'connected') {
    figma.notify('🦞 ClawDaddy connected', { timeout: 2000 });
  }

  if (msg.type === 'disconnected') {
    figma.notify('ClawDaddy disconnected', { timeout: 2000 });
  }

  if (msg.type === 'error') {
    figma.notify('🦞 ClawDaddy: ' + msg.message, { error: true });
  }
};

// Keep plugin alive
figma.on('close', () => {
  // Plugin closed
});

console.log('🦞 ClawDaddy plugin started');
