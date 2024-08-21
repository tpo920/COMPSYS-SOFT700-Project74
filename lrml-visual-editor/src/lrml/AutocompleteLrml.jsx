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

/**
 * Goes through array of responses and for now check for rel, var & data (without sub-blocks), should only recommnd these blocks
 * on expr, atom
 * 
 * @param responseBlockList 
 */
export function getRelevantBlocks(responseBlockList) {
    const blockList = [];
    const varRegex = /variable\(([^)]+)\)/g;
    const relRegex = /relation\(([^)]+)\)/g;
    const dataRegex = /data\(([^)]+)\)/g;

    // Check each element of the array 
    responseBlockList.forEach((expression, index) => {
        let match;
        // Use regex.exec() to find all matches
        while (((match = varRegex.exec(expression)) !== null) || ((match = relRegex.exec(expression)) !== null) || ((match = dataRegex.exec(expression)) !== null)) {
            // If autocompleted block does not exist in array then add
            if (!(blockList.includes(match[0]))) {
                blockList.push(match[0]);
            }
        }
    });
    console.log(blockList);
    return blockList;
}


