import * as Blockly from "blockly/core";
import { Flydown } from "./flydown";
import { registerCss } from "./utils/css";
import { blockMap } from "./utils/blockMap";
registerCss();

// Initialize Blockly and create a vertical flydown
export function initBlocklyWithFlydown(workspace) {
  const flydown = new Flydown(
    new Blockly.Options({
      scrollbars: false,
      rtl: workspace.RTL,
      renderer: workspace.options.renderer,
      rendererOverrides: workspace.options.rendererOverrides,
      parentWorkspace: workspace,
    })
  );
  // ***** [lyn, 10/05/2013] NEED TO WORRY ABOUT MULTIPLE BLOCKLIES! *****
  workspace.flydown_ = flydown;
  Blockly.utils.dom.insertAfter(flydown.createDom('blocklyFlydown'),
    workspace.svgBubbleCanvas_);
  flydown.init(workspace);
  flydown.autoClose = true; // Flydown closes after selecting a block
}

export function showBlocklyFlydown(currentBlock) {
  suggestBlocks(currentBlock);
  const workspace = Blockly.common.getMainWorkspace();
  workspace.hideChaff();
  const flydown = workspace.flydown_;

  workspace.getParentSvg().appendChild(flydown.svgGroup_);
  const scale = flydown.targetWorkspace.scale;
  flydown.workspace_.setScale(scale);

  // Set flydown css
  flydown.setCSSClass('blocklyFlydown');

  // Test blocks to show
  const blocksXml = getXml(currentBlock);

  // Calc position if xml list exists
  if (blocksXml !== '') {
    const blocksDom = Blockly.utils.xml.textToDom(blocksXml);
    const blocksXMLList = blocksDom.children;

    const svgBlock = currentBlock.getSvgRoot();
    const xy = workspace.getSvgXY(svgBlock);
    const borderBBox = currentBlock.getSvgRoot().getBBox();
    xy.x += borderBBox.width * scale;

    flydown.showAt(blocksXMLList, xy.x, xy.y);
  }
}

// Get xml block list
function getXml(currentBlock) {
  let blockXml = ''
  if (suggestBlocks(currentBlock) !== '') {
    blockXml =
      '<xml>' +
      suggestBlocks(currentBlock) +
      '</xml>'
  }
  return blockXml;
}

// Suggested blocks based on current block's type
function suggestBlocks(currentBlock) {
  let blockXml = '';
  if (currentBlock.type in blockMap) {
    const blockList = blockMap[currentBlock.type];
    for (const block of blockList) {
      blockXml += '<block type=' + `"${block}"` + '>' + '</block>\n';
    }
  }
  return blockXml;
}
