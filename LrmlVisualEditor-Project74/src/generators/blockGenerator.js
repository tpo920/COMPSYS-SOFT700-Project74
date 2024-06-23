/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export const forBlock = Object.create(null);

// If category
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

// Operator category
forBlock['and_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_AND');
  const code = 'and {\n' + statementMembers + '\n}';
  return code;
};

// Expression Category
forBlock['has_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_HAS');
  const code = 'has {\n' + statementMembers + '\n}';
  return code;
};
forBlock['is_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_IS');
  const code = 'is {\n' + statementMembers + '\n}';
  return code;
};
forBlock['define_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_DEFINE');
  const code = 'define {\n' + statementMembers + '\n}';
  return code;
};

// Atom category
forBlock['rel_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_REL');
  const code = `rel(${value})`;
  return code;
};
forBlock['var_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_VAR');
  const code = `var(${value})`;
  return code;
};
forBlock['ind_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_IND');
  const code = `ind(${value})`;
  return code;
};
