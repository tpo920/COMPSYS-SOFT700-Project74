import * as Blockly from 'blockly/core';

export function updateDynamicCategory(workspace, modelOutput) {
  const dynamicBlocks = [];

  // Parse the modelOutput and create blocks dynamically
  const match = modelOutput.match(/(\w+)\((.*?)\)/);
  if (match) {
    const testBlock = match[1];
    const blockType = match[1] + '_block';
    const blockValue = match[2];
    console.log(blockType);
    console.log(blockValue);

    // Create a block JSON definition based on the modelOutput
    const blockJson = {
      "kind": "block",
      "type": blockType,
      "fields": {}
    };
    console.log(blockJson)
    
    // Dynamically set the field name and value
    blockJson.fields["MEMBER_" + testBlock.toUpperCase()] = blockValue;

    dynamicBlocks.push(blockJson);
  }

  // Update the dynamic category
  const toolbox = workspace.getToolbox();
  console.log("TOOLBOX BELOW");
  console.log(toolbox);
  // I think this line does not work, thus it is not setting the values within the correct category
  // const dynamicCategory = toolbox.getToolboxItems().find(category => category.name_ === 'Dynamic Category');
  const dynamicCategory = toolbox.getToolboxItems()[7];
  console.log("DYNAMIC CATEGORY BELOW");
  console.log(dynamicCategory);

  // if (dynamicCategory) {
    dynamicCategory.updateFlyoutContents(dynamicBlocks);
    console.log("DYNAMIC CATEGORY UPDATE BELOW");
    console.log(dynamicCategory);
  // }
}
