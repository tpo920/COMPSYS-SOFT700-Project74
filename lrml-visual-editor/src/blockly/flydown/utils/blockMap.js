// Block types and possible suggested blocks
export const blockMap = {
    // If
    if_block: ['and_block', 'or_block', 'expr_block', 'atom_block'],
    then_block: ['and_block', 'or_block', 'expr_block', 'atom_block'],
    // Operators
    and_block: ['expr_block'],
    or_block: ['expr_block'],
    not_block: ['expr_block'],
    operator_block: [],
    // Expression
    expr_block: ['fun_block', 'atom_block', 'data_block'],
    // Atom
    atom_block: ['rel_block', 'var_block', 'ind_block'],
    // To add fun, rel & var autocompletion
    fun_block: [],
    rel_block: [],
    var_block: [],
    // Data
    data_block: ['baseunit_block', 'prefix_block', 'kind_block'],
    // Deontic
    obligation_block: ['and_block', 'or_block', 'expr_block'],
    permission_block: ['and_block', 'or_block', 'expr_block'],
    prohibition_block: ['and_block', 'or_block', 'expr_block'],
    // Statement
    rulestatement_block: ['if_block', 'then_block'],
    appliedstatement_block: ['if_block', 'then_block'],
};