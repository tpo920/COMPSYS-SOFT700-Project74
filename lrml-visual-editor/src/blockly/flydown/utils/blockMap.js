// Block types and possible suggested blocks
// True/False: indicates if this block is suitable for grabbing autocompletion from the model
// Sub-Array: List of suggested hardcoded blocks for autocompletion/ If empty, then the block is not suitable
export const blockMap = {
    // If
    if_block:               [false, [['and_block', ''], ['or_block', ''], ['expr_block', '']]],
    then_block:             [false, [['obligation_block', ''], ['permission_block', ''], ['prohibition_block', ''], ['expr_block', '']]],
    // Operators
    and_block:              [true, [['expr_block', '']]],
    or_block:               [true, [['expr_block', '']]],
    not_block:              [true, [['expr_block', '']]],
    operator_block:         [false, []],
    // Expression
    expr_block:             [true, [['fun_block', ''], ['atom_block', ''], ['data_block', '']]],
    // Atom
    atom_block:             [true, [['rel_block', ''], ['var_block', '']]],
    // To add fun, rel & var autocompletion
    fun_block:              [false, []],
    rel_block:              [false, []],
    var_block:              [false, []],
    // Data
    data_block:             [false, []],
    // Deontic
    obligation_block:       [false, [['and_block', ''], ['or_block', ''], ['expr_block', '']]],
    permission_block:       [false, [['and_block', ''], ['or_block', ''], ['expr_block', '']]],
    prohibition_block:      [false, [['and_block', ''], ['or_block', ''], ['expr_block', '']]],
    // Statement
    rulestatement_block:    [false, [['and_block', ''], ['or_block', ''], ['expr_block', '']]],
    appliedstatement_block: [false, [['and_block', ''], ['or_block', ''], ['expr_block', '']]],
};
