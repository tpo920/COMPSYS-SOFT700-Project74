/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from 'blockly/javascript';

// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);

forBlock['if_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_IF');
  const code = 'if {\n' + statementMembers + '\n}';
  return code;
};
forBlock['then_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_THEN');
  const code = 'then {\n' + statementMembers + '\n}';
  return code;
};
forBlock['and_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_AND');
  const code = 'and {\n' + statementMembers + '\n}';
  return code;
};
