import * as Blockly from "blockly/core";

export function getParentBlocks(currentBlock) {
    const blockList = [];
    let block = currentBlock;

    // Iterate to get parents
    while (block) {
        blockList.push(block.type);
        block = block.getSurroundParent();
    }
    parseBlockListToLrml(blockList);
    return blockList;
}

/**
 * E.g a block list = [expr_block, and_block, if_block]
 * this function would return: if(and(expr( , this format will be passed into the model
 */
export function parseBlockListToLrml(blockList) {
    let blockLrml = ''
    for (const block of blockList) {
        blockLrml += block.replace('_block', '(');
    }
    return blockLrml;
}

/***
 * Returns formatted string current block + attached parent blocks for selected current block
*/
export function getBlocklrml(currentBlock) {
    const blockList = getParentBlocks(currentBlock).reverse();
    return (parseBlockListToLrml(blockList));
}



