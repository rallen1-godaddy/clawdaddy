/**
 * 🦞 ClawDaddy - FigJam Extension
 *
 * Support for FigJam boards (whiteboarding/brainstorming)
 * - Create sticky notes
 * - Create shapes and connectors
 * - Manage widgets
 * - FigJam-specific features
 */

/**
 * FigJam helper functions
 * These execute in Figma's context (FigJam uses same plugin API)
 */

export const FigJamCommands = {
  /**
   * Check if current file is a FigJam board
   * @returns {Promise<boolean>}
   */
  isFigJam: `
    // FigJam files have editorType === 'figjam'
    return figma.editorType === 'figjam';
  `,

  /**
   * Create a sticky note
   * @param {string} text - Sticky note content
   * @param {Object} options - Position, size, color
   * @returns {Promise<Object>} Created sticky note
   */
  createSticky: (text, options = {}) => `
    const {
      x = 0,
      y = 0,
      width = 200,
      height = 200,
      color = { r: 1, g: 0.9, b: 0.4 } // Default yellow
    } = ${JSON.stringify(options)};

    const sticky = figma.createSticky();
    sticky.x = x;
    sticky.y = y;
    sticky.resize(width, height);
    sticky.fills = [{ type: 'SOLID', color: color }];

    // Load font for text
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    sticky.text.characters = \`${text}\`;

    figma.currentPage.appendChild(sticky);
    figma.currentPage.selection = [sticky];

    return {
      id: sticky.id,
      text: sticky.text.characters,
      x: sticky.x,
      y: sticky.y,
      width: sticky.width,
      height: sticky.height
    };
  `,

  /**
   * Create multiple sticky notes in a grid
   * @param {Array<string>} texts - Array of sticky note texts
   * @param {Object} options - Grid layout options
   * @returns {Promise<Array>} Created sticky notes
   */
  createStickyGrid: (texts, options = {}) => `
    const {
      startX = 0,
      startY = 0,
      spacing = 50,
      columns = 3,
      width = 200,
      height = 200,
      color = { r: 1, g: 0.9, b: 0.4 }
    } = ${JSON.stringify(options)};

    const texts = ${JSON.stringify(texts)};
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    const stickies = [];

    for (let i = 0; i < texts.length; i++) {
      const row = Math.floor(i / columns);
      const col = i % columns;

      const sticky = figma.createSticky();
      sticky.x = startX + (col * (width + spacing));
      sticky.y = startY + (row * (height + spacing));
      sticky.resize(width, height);
      sticky.fills = [{ type: 'SOLID', color: color }];
      sticky.text.characters = texts[i];

      figma.currentPage.appendChild(sticky);
      stickies.push({
        id: sticky.id,
        text: texts[i],
        x: sticky.x,
        y: sticky.y
      });
    }

    return stickies;
  `,

  /**
   * Create a connector between two nodes
   * @param {string} nodeAId - First node ID
   * @param {string} nodeBId - Second node ID
   * @param {Object} options - Connector options
   * @returns {Promise<Object>} Created connector
   */
  createConnector: (nodeAId, nodeBId, options = {}) => `
    const nodeA = figma.getNodeById('${nodeAId}');
    const nodeB = figma.getNodeById('${nodeBId}');

    if (!nodeA || !nodeB) {
      throw new Error('One or both nodes not found');
    }

    const connector = figma.createConnector();
    connector.connectorStart = {
      endpointNodeId: nodeA.id,
      magnet: 'AUTO'
    };
    connector.connectorEnd = {
      endpointNodeId: nodeB.id,
      magnet: 'AUTO'
    };

    const {
      strokeWeight = 2,
      strokeColor = { r: 0, g: 0, b: 0 }
    } = ${JSON.stringify(options)};

    connector.strokeWeight = strokeWeight;
    connector.strokes = [{ type: 'SOLID', color: strokeColor }];

    figma.currentPage.appendChild(connector);

    return {
      id: connector.id,
      from: nodeA.name,
      to: nodeB.name
    };
  `,

  /**
   * Create a shape (rectangle, ellipse, etc.) in FigJam
   * @param {string} shapeType - 'rectangle', 'ellipse', 'polygon', 'star'
   * @param {Object} options - Shape options
   * @returns {Promise<Object>} Created shape
   */
  createShape: (shapeType, options = {}) => `
    const {
      x = 0,
      y = 0,
      width = 100,
      height = 100,
      fillColor = { r: 0.8, g: 0.8, b: 0.8 },
      strokeColor = { r: 0, g: 0, b: 0 },
      strokeWeight = 2,
      cornerRadius = 0
    } = ${JSON.stringify(options)};

    let shape;

    switch ('${shapeType}') {
      case 'rectangle':
        shape = figma.createRectangle();
        if (cornerRadius > 0) {
          shape.cornerRadius = cornerRadius;
        }
        break;
      case 'ellipse':
        shape = figma.createEllipse();
        break;
      case 'polygon':
        shape = figma.createPolygon();
        shape.pointCount = ${options.pointCount || 5};
        break;
      case 'star':
        shape = figma.createStar();
        shape.pointCount = ${options.pointCount || 5};
        break;
      default:
        throw new Error('Invalid shape type: ${shapeType}');
    }

    shape.x = x;
    shape.y = y;
    shape.resize(width, height);
    shape.fills = [{ type: 'SOLID', color: fillColor }];
    shape.strokes = [{ type: 'SOLID', color: strokeColor }];
    shape.strokeWeight = strokeWeight;

    figma.currentPage.appendChild(shape);
    figma.currentPage.selection = [shape];

    return {
      id: shape.id,
      type: '${shapeType}',
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height
    };
  `,

  /**
   * Get all sticky notes on current page
   * @returns {Promise<Array>} All sticky notes
   */
  getAllStickies: `
    const stickies = figma.currentPage.findAll(node => node.type === 'STICKY');

    return stickies.map(sticky => ({
      id: sticky.id,
      text: sticky.text.characters,
      x: sticky.x,
      y: sticky.y,
      width: sticky.width,
      height: sticky.height,
      fills: sticky.fills
    }));
  `,

  /**
   * Get all connectors on current page
   * @returns {Promise<Array>} All connectors
   */
  getAllConnectors: `
    const connectors = figma.currentPage.findAll(node => node.type === 'CONNECTOR');

    return connectors.map(connector => ({
      id: connector.id,
      start: connector.connectorStart ? {
        nodeId: connector.connectorStart.endpointNodeId,
        nodeName: figma.getNodeById(connector.connectorStart.endpointNodeId)?.name
      } : null,
      end: connector.connectorEnd ? {
        nodeId: connector.connectorEnd.endpointNodeId,
        nodeName: figma.getNodeById(connector.connectorEnd.endpointNodeId)?.name
      } : null,
      strokeWeight: connector.strokeWeight
    }));
  `,

  /**
   * Group selected stickies with a section
   * @param {string} sectionName - Section title
   * @returns {Promise<Object>} Created section
   */
  groupStickiesInSection: (sectionName) => `
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      throw new Error('No nodes selected');
    }

    const stickies = selection.filter(node => node.type === 'STICKY');

    if (stickies.length === 0) {
      throw new Error('No sticky notes in selection');
    }

    // Calculate bounds
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    for (const sticky of stickies) {
      minX = Math.min(minX, sticky.x);
      minY = Math.min(minY, sticky.y);
      maxX = Math.max(maxX, sticky.x + sticky.width);
      maxY = Math.max(maxY, sticky.y + sticky.height);
    }

    // Create section with padding
    const padding = 50;
    const section = figma.createSection();
    section.name = '${sectionName}';
    section.x = minX - padding;
    section.y = minY - padding;
    section.resize(
      maxX - minX + (padding * 2),
      maxY - minY + (padding * 2)
    );

    figma.currentPage.appendChild(section);

    // Move stickies into section
    for (const sticky of stickies) {
      section.appendChild(sticky);
    }

    return {
      id: section.id,
      name: section.name,
      x: section.x,
      y: section.y,
      width: section.width,
      height: section.height,
      stickyCount: stickies.length
    };
  `,

  /**
   * Create a voting session setup (stickies with stamps)
   * @param {Array<string>} ideas - Ideas to vote on
   * @returns {Promise<Object>} Voting setup
   */
  createVotingSession: (ideas) => `
    const ideas = ${JSON.stringify(ideas)};
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

    const startX = 0;
    const startY = 0;
    const spacing = 50;
    const stickyWidth = 300;
    const stickyHeight = 150;

    const stickies = [];

    for (let i = 0; i < ideas.length; i++) {
      const sticky = figma.createSticky();
      sticky.x = startX;
      sticky.y = startY + (i * (stickyHeight + spacing));
      sticky.resize(stickyWidth, stickyHeight);
      sticky.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.9, b: 1 } }]; // Light blue
      sticky.text.characters = ideas[i];

      figma.currentPage.appendChild(sticky);

      stickies.push({
        id: sticky.id,
        idea: ideas[i],
        y: sticky.y
      });
    }

    return {
      totalIdeas: stickies.length,
      stickies: stickies,
      instructions: 'Use Figma stamps to vote on ideas!'
    };
  `,

  /**
   * Organize stickies by color into sections
   * @returns {Promise<Object>} Organization result
   */
  organizeByColor: `
    const stickies = figma.currentPage.findAll(node => node.type === 'STICKY');

    if (stickies.length === 0) {
      throw new Error('No sticky notes found');
    }

    // Group by color
    const colorGroups = {};

    for (const sticky of stickies) {
      const fill = sticky.fills[0];
      if (fill && fill.type === 'SOLID') {
        const colorKey = \`\${fill.color.r.toFixed(1)},\${fill.color.g.toFixed(1)},\${fill.color.b.toFixed(1)}\`;
        if (!colorGroups[colorKey]) {
          colorGroups[colorKey] = [];
        }
        colorGroups[colorKey].push(sticky);
      }
    }

    // Create sections for each color
    const sections = [];
    let sectionY = 0;
    const sectionSpacing = 100;

    for (const [colorKey, stickies] of Object.entries(colorGroups)) {
      const section = figma.createSection();
      section.name = \`Color Group: \${colorKey}\`;
      section.y = sectionY;
      section.x = 0;

      // Arrange stickies in grid
      let x = 100, y = 100;
      const spacing = 50;
      const columns = 4;

      for (let i = 0; i < stickies.length; i++) {
        const sticky = stickies[i];
        const col = i % columns;
        const row = Math.floor(i / columns);

        section.appendChild(sticky);
        sticky.x = x + (col * (sticky.width + spacing));
        sticky.y = y + (row * (sticky.height + spacing));
      }

      // Resize section to fit content
      section.resize(
        (Math.min(stickies.length, columns) * (stickies[0].width + spacing)) + 200,
        (Math.ceil(stickies.length / columns) * (stickies[0].height + spacing)) + 200
      );

      figma.currentPage.appendChild(section);

      sections.push({
        name: section.name,
        stickyCount: stickies.length
      });

      sectionY += section.height + sectionSpacing;
    }

    return {
      totalGroups: sections.length,
      sections: sections
    };
  `
};

/**
 * Helper to execute FigJam commands via ClawDaddy client
 */
export class FigJam {
  constructor(client) {
    this.client = client;
  }

  async isFigJam() {
    return await this.client.eval(FigJamCommands.isFigJam);
  }

  async createSticky(text, options) {
    return await this.client.eval(FigJamCommands.createSticky(text, options));
  }

  async createStickyGrid(texts, options) {
    return await this.client.eval(FigJamCommands.createStickyGrid(texts, options));
  }

  async createConnector(nodeAId, nodeBId, options) {
    return await this.client.eval(FigJamCommands.createConnector(nodeAId, nodeBId, options));
  }

  async createShape(shapeType, options) {
    return await this.client.eval(FigJamCommands.createShape(shapeType, options));
  }

  async getAllStickies() {
    return await this.client.eval(FigJamCommands.getAllStickies);
  }

  async getAllConnectors() {
    return await this.client.eval(FigJamCommands.getAllConnectors);
  }

  async groupStickiesInSection(sectionName) {
    return await this.client.eval(FigJamCommands.groupStickiesInSection(sectionName));
  }

  async createVotingSession(ideas) {
    return await this.client.eval(FigJamCommands.createVotingSession(ideas));
  }

  async organizeByColor() {
    return await this.client.eval(FigJamCommands.organizeByColor);
  }
}

export default FigJam;
