import * as Blockly from 'blockly/core';

export function updateDynamicCategory(workspace) {
  // const modelOutput = "if(and(expression(function(has))))";
  const modelOutput = "if(and(expression(function(has))))";

  // Define custom mappings for specific block types
  const blockTypeMappings = {
    'expression': 'expr',
    'function': 'fun',
    'variable': 'var',
    'relation': 'rel'
  };

  // Define custom mappings for MEMBER fields
  const memberMappings = {
    'if': 'MEMBER_IF',
    'and': 'MEMBER_AND',
    'expr': 'MEMBER_EXPRESSION',
    'fun': 'MEMBER_FUNCTION'  // Fixed the MEMBER for function
  };

  // Regular expression to match the blocks and their fields
  const regex = /(\w+)(?:\(([^()]+)\))?/g;
  let match;

  // Helper function to create a block JSON definition
  function createBlockJson(type, memberValue = null) {
    const blockJson = {
      "kind": "block",
      "type": type + '_block',
      "fields": {}
    };
    const memberField = memberMappings[type];
    if (memberField && memberValue) {
      blockJson.fields[memberField] = memberValue;
    }
    return blockJson;
  }

  // Parse modelOutput and build a nested block structure
  const stack = [];
  let currentBlock = null;

  while ((match = regex.exec(modelOutput)) !== null) {
    const blockName = match[1];
    const memberValue = match[2];
    const blockType = blockTypeMappings[blockName] ? blockTypeMappings[blockName] : blockName;

    const newBlock = createBlockJson(blockType, memberValue);

    if (currentBlock) {
      if (!currentBlock.inputs) {
        currentBlock.inputs = {};
      }
      // Ensure the correct MEMBER field is applied to the current block for its child
      const inputName = memberMappings[currentBlock.type.replace('_block', '')] || `MEMBER_${currentBlock.type.toUpperCase()}`;
      currentBlock.inputs[inputName] = { block: newBlock };
    }

    stack.push(newBlock);
    currentBlock = newBlock;
  }

  // Return the top-level block, which is the root of the nested structure
  // const rootBlock = stack[0];
  // console.log(rootBlock);
  // return rootBlock;
  stack.splice(1);
  return stack;
}
