// Block types and possible suggested blocks
export const blockMap = {
    // If
    if_block: ['and_block', 'or_block', 'expr_block', 'atom_block'],
    // Operators
    and_block: ['expr_block'],
    or_block: ['expr_block'],
    not_block: ['expr_block'],
    // Expression
    expr_block: ['fun_block', 'atom_block', 'data_block'],
    // Atom
    atom_block: ['rel_block', 'var_block', 'ind_block'],
    // To add fun, rel & var autocompletion
    fun_block: [],
    rel_block: [],
    var_block: [],
    ind_block: [],
    // Data
    data_block: [],
    // Deontic
    obligation_block: ['and_block', 'or_block', 'expr_block'],
    permission_block: ['and_block', 'or_block', 'expr_block'],
    prohibition_block: ['and_block', 'or_block', 'expr_block'],
    right_block: ['and_block', 'or_block', 'expr_block'],
    violation_block: ['and_block', 'or_block', 'expr_block'],
    compliance_block: ['and_block', 'or_block', 'expr_block'],
    // Statement
    constitutive_block: ['if_block'],
    prescriptive_block: ['if_block'],
    override_block: ['if_block'],
    penalty_block: ['if_block'],
    reparation_block: ['if_block'],
    factual_block: ['if_block'],
};