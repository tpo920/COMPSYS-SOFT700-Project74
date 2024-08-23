/**
 * Function takes in a blocklist constructed from model response and converts to a format to be converted to xml
 * @param blockList 
 */
export function parseBlockList(blockList) {
    const suggestedBlockList = [];
    for (const block of blockList) {
        // Convert block into blockly format to be parsed into xml
        if (block.includes('(') && block.includes(')')) {
            // store the block & its value into an array
            const blockType = convertFullToShortLrmlTerm(block.split('(')[0]) + '_block';
            suggestedBlockList.push([blockType, extractFirstParenthesesContent(block)]);
        } else {
            suggestedBlockList.push([(convertFullToShortLrmlTerm(block) + '_block'), '']);
        }
    }
    console.log(suggestedBlockList);
    return suggestedBlockList.reverse();
}

function convertFullToShortLrmlTerm(block) {
    let currentBlock = block;
    switch (currentBlock) {
        case 'expression':
            blocurrentBlockck = 'expr';
            break;
        case 'function':
            currentBlock = 'fun';
            break;
        case 'variable':
            currentBlock = 'var';
            break;
        case 'relation':
            currentBlock = 'rel';
            break;
        default:
            break;
    }
    return currentBlock;
}

// Based off current block clicked, find next block in response
export function getNextBlockFromResponse(currentBlockType, responseList) {
    let block = currentBlockType.replace('_block', '');
    switch (block) {
        case 'expr':
            block = 'expression';
            break;
        case 'fun':
            block = 'function';
            break;
        case 'var':
            block = 'variable';
            break;
        case 'rel':
            block = 'relation';
            break;
        default:
            break;
    }

    // Check each element of the array 
    let match = [];
    responseList.forEach((expression) => {
        if (expression.includes(block)) {
            const content = extractContent(expression, block);
            if (content !== '' && (!match.includes(content))) {
                match.push(content);
            }
        }
    });
    return (match);
}

// Grabs content inside parent block
export function extractFirstParenthesesContent(inputString) {
    let startIndex = inputString.indexOf('(');
    if (startIndex === -1) return null; // No opening parenthesis found

    let stack = [];
    let result = '';

    for (let i = startIndex + 1; i < inputString.length; i++) {
        if (inputString[i] === '(') {
            stack.push('('); // Push to stack when finding an opening parenthesis
        } else if (inputString[i] === ')') {
            if (stack.length === 0) {
                // Closing the first set of parentheses
                return result;
            } else {
                stack.pop(); // Pop from stack when finding a closing parenthesis
            }
        }
        result += inputString[i];
    }

    return result;
}

export function extractContent(inputString, keyword) {
    const keywordPattern = new RegExp(`${keyword}\\(`); // Pattern to find the keyword followed by '('
    const match = inputString.match(keywordPattern);

    if (!match) {
        return null; // Keyword not found
    }

    let startIndex = match.index + match[0].length - 1; // Start after the keyword and '('
    let openBrackets = 1;
    let endIndex = startIndex;

    // Iterate through the string starting from startIndex
    for (let i = startIndex + 1; i < inputString.length; i++) {
        if (inputString[i] === '(') {
            openBrackets++;
        } else if (inputString[i] === ')') {
            openBrackets--;
        }

        if (openBrackets === 0) {
            endIndex = i;
            break;
        }
    }
    // Extract the content inside the brackets
    return inputString.slice(startIndex + 1, endIndex);
}

export function splitByComma(inputString) {
    // Split the input string by commas
    const values = inputString.split(',');

    return values;
}
