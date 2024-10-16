import * as Blockly from "blockly/core";
import { Flydown } from "./flydown";
import { registerCss } from "./utils/css";
import { blockMap } from "./utils/blockMap";
import { parseBlockList, extractFirstParenthesesContent, getNextBlockFromResponse, splitByComma } from "../../lrml/parser";
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
  workspace.flydown_ = flydown;
  Blockly.utils.dom.insertAfter(flydown.createDom('blocklyFlydown'),
    workspace.svgBubbleCanvas_);
  flydown.init(workspace);
  flydown.autoClose = true; // Flydown closes after selecting a block
}

export function showBlocklyFlydown(currentBlock, response) {
  const currentBlockType = currentBlock.type;
  const currentBlockProperties = blockMap[currentBlockType];
  const workspace = Blockly.common.getMainWorkspace();
  const flydown = workspace.flydown_;
  const scale = flydown.targetWorkspace.scale;

  workspace.hideChaff();
  workspace.getParentSvg().appendChild(flydown.svgGroup_);
  flydown.workspace_.setScale(scale);
  flydown.setCSSClass('blocklyFlydown');

  // currentBlockProperties[0] = True/False for suitability for model responses
  // currentBlockProperties[1] = An array containing hardcoded blocks for autocompletion
  if (currentBlockProperties[1].length > 0) {
    let blocksXml = getSuggestedBlockList(currentBlockProperties[1]);
    // Check if block is suitable for model response (True/False)
    if (currentBlockProperties[0]) {
      // Check if response is not empty (response from calling model api)
      if (response !== '') {
        // Check response and compare with currentBlock
        const blockRes = getModelBlocks(currentBlockProperties[1], currentBlockType, getParentBlock(currentBlock), response);
        if (blockRes.length > 0) {
          blocksXml = getSuggestedBlockList(blockRes);
        }
      }
    }

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
}
function getModelBlocks(currentBlockProperties, currentBlock, currentParentBlock, response) {
  const matchList = getNextBlockFromResponse(currentBlock, currentParentBlock, response);
  let autocompleteBlocks = [];
  let validatedBlockList = []
  let blockList = [];
  if (matchList.length > 0) {
    matchList.forEach((match) => {
      if (match.includes(',')) {
        const split = splitByComma(match);
        split.forEach((splitValue) => {
          if (!blockList.includes(splitValue)) {
            // If possible suggestions exist inside block list, then
            // Within each block suggestion, check if a single value exists or further sub blocks
            // If single value exists -> keep value as the same
            // If sub blocks exists -> convert current block suggestion to just default block without any values inside
            const subSplitValue = extractFirstParenthesesContent(splitValue);
            if (subSplitValue.includes('(') && subSplitValue.includes(')')) {
              if (!blockList.includes(splitValue.split('(')[0])) {
                blockList.push(splitValue.split('(')[0]);
              }
            } else {
              blockList.push(splitValue);
            }
          }
        });
      } else {
        if (!blockList.includes(match)) {
          blockList.push(match);
        }
      }
    });

    // Parse blocklist -> format to be constructed into xml
    blockList = parseBlockList(blockList);
    for (const block of blockList) {
      if (block[1] === '') {
        let isExist;
        for (const presetBlock of currentBlockProperties) {
          if (block[0] === presetBlock[0]) {
            isExist = true;
          }
        }
        if (!isExist) {
          validatedBlockList.push(block);
        }
        isExist = false;
      } else {
        validatedBlockList.push(block);
      }
    }

    // Combine two lists together
    autocompleteBlocks = currentBlockProperties.concat(validatedBlockList);
  }
  return (autocompleteBlocks.reverse());
}

// Get xml block list
// input example: [['and_block', ''], ['or_block', ''], ['expr_block', '']]
// where first element is the blocktype & second element is the possible field value
function getSuggestedBlockList(suggestedBlockList) {
  let blockXml = ''
  if (suggestedBlockList.length > 0) {
    blockXml =
      '<xml>' +
      suggestBlocks(suggestedBlockList) +
      '</xml>'
  }
  return blockXml;
}

// Suggested blocks based on current block's type
function suggestBlocks(suggestedBlockList) {
  let blockXml = '';
  for (const block of suggestedBlockList) {
    // If field value exists
    if (block[1] !== '') {
      // Construct a field name for corresponding block
      let prefix = (block[0].split('_')[0]).toUpperCase();
      blockXml += '<block type=' + `"${block[0]}"` + '>' + `<field name="MEMBER_${prefix}">` + `${block[1]}` + '</field>' + '</block>\n';
    } else {
      blockXml += '<block type=' + `"${block[0]}"` + '>' + '</block>\n';
    }
  }
  return blockXml;
}

function getParentBlock(currentBlock) {
  let parentBlock = currentBlock;
  let block = currentBlock;

  // Iterate to get parents
  while (block) {
      parentBlock = block;
      block = block.getSurroundParent();
  }
  return parentBlock;
}
