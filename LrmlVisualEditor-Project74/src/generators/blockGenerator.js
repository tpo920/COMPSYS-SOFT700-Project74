/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Order = {
  ATOMIC: 0,
};

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
  const value = generator.valueToCode(
    block, 'INPUT_HAS', Order.ATOMIC);
  const code = `has ${value}{\n${statementMembers}\n}`;
  return code;
};
forBlock['is_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_IS');
  const value = generator.valueToCode(
    block, 'INPUT_IS', Order.ATOMIC);
  const code = `is ${value} {\n${statementMembers}\n}`;
  return code;
};
forBlock['define_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_DEFINE');
  const value = generator.valueToCode(
    block, 'INPUT_DEFINE', Order.ATOMIC);
  const code = `define ${value} {\n${statementMembers}\n}`;
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

// Data category
forBlock['data_block'] = function (block) {
  const textValue = block.getFieldValue('MEMBER_DATA');
  const code = `[data(${textValue})]`;
  return [code, Order.ATOMIC];
};
