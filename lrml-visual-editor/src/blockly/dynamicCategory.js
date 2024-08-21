import * as Blockly from 'blockly/core';

export function updateDynamicCategory(workspace) {
  const dynamicBlocks = [];
  const modelOutput = "if(and(expression(function(has),atom(variable(floorWaste)),data(diameter)),expression(function(greaterThan),atom(variable(diameter)),data(baseunit(prefix(milli),kind(metre)),value(40.0))))";

  // Define custom mappings for specific block types
  const blockTypeMappings = {
    'expression': 'expr',
    'function': 'fun',
    'variable': 'var',
    'relation': 'rel'
  };

  // Regular expression to match the blocks and their fields
  const regex = /(\w+)(?:\(([^()]+)\))?/g;
  let match;

  while ((match = regex.exec(modelOutput)) !== null) {
    const blockName = match[1];
    const memberValue = match[2];
    const blockType = blockTypeMappings[blockName] ? blockTypeMappings[blockName] + '_block' : blockName + '_block';

    // Create a block JSON definition based on the modelOutput
    const blockJson = {
      "kind": "block",
      "type": blockType,
      "fields": {}
    };

    // If there's a member value, dynamically set the field name and value
    if (memberValue) {
      blockJson.fields["MEMBER_" + blockName.toUpperCase()] = memberValue;
    }

    dynamicBlocks.push(blockJson);
  }

  console.log(dynamicBlocks);
  return dynamicBlocks;
}
