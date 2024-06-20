/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['if_block'] = function (block, generator) {
  const text = generator.valueToCode(block, 'NAME', Order.NONE) || "''";
  // Generate the function call for this block.
  return text;
};
forBlock['then_block'] = function (block, generator) {
  const text = generator.valueToCode(block, 'NAME', Order.NONE) || "''";
  // Generate the function call for this block.
  return text;
};
forBlock['and_block'] = function (block, generator) {
  const text = generator.valueToCode(block, 'NAME', Order.NONE) || "''";
  // Generate the function call for this block.
  return text;
};
