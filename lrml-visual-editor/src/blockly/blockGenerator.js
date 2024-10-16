import { javascriptGenerator } from 'blockly/javascript';

// If Then category
javascriptGenerator.forBlock['if_block'] = function(block, generator) {
  const ifStatementMembers =
    generator.statementToCode(block, 'MEMBERS_IF');
  const code = 'if (\n' + ifStatementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['then_block'] = function(block, generator) {
  const thenStatementMembers =
    generator.statementToCode(block, 'MEMBERS_THEN');
  const code = 'then (\n' + thenStatementMembers + '\n)';
  return code;
};

// Operator category
javascriptGenerator.forBlock['and_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_AND');
  const code = 'and (\n' + statementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['or_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_OR');
  const code = 'or (\n' + statementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['not_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_NOT');
  const code = 'not (\n' + statementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['operator_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_OPERATOR');
  const code = `operator(${value})`;
  return code;
};

// Expression Category
javascriptGenerator.forBlock['expr_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_EXPR');
  const code = 'expr (\n' + statementMembers + '\n)';
  return code;
};

// Atom category
javascriptGenerator.forBlock['atom_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_ATOM');
  const code = 'atom (\n' + statementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['fun_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_FUN');
  const code = `fun(${value})`;
  return code;
};
javascriptGenerator.forBlock['rel_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_REL');
  const code = `rel(${value})`;
  return code;
};
javascriptGenerator.forBlock['var_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_VAR');
  const code = `var(${value})`;
  return code;
};

// Data category
javascriptGenerator.forBlock['data_block'] = function (block) {
  const value = block.getFieldValue('MEMBER_DATA');
  const code = `data(${value})`;
  return code;
};

// Deontic category
javascriptGenerator.forBlock['obligation_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_OBLIGATION');
  const code = 'obligation (\n' + statementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['permission_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_PERMISSION');
  const code = 'permission (\n' + statementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['prohibition_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_PROHIBITION');
  const code = 'prohibition (\n' + statementMembers + '\n)';
  return code;
};

// Statement category
javascriptGenerator.forBlock['appliedstatement_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_APPLIEDSTATEMENT');
  const code = 'appliedstatement (\n' + statementMembers + '\n)';
  return code;
};
javascriptGenerator.forBlock['rulestatement_block'] = function (block, generator) {
  const statementMembers =
    generator.statementToCode(block, 'MEMBERS_RULESTATEMENT');
  const code = 'rulestatement (\n' + statementMembers + '\n)';
  return code;
};