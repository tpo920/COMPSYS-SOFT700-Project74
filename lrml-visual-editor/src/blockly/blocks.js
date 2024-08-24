import * as Blockly from 'blockly/core';

// Custom blocks for Visual LegalRule Editor
Blockly.defineBlocksWithJsonArray([
  {
    "type": "if_block",
    "message0": "If %1 %2",
    "args0": [
      {
        "type": "input_end_row",
      },
      {
        "type": "input_statement",
        "name": "MEMBER_IF"
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8AB2FF",  
    "tooltip": "ruleml:if",
  },
  {
    "type": "then_block",
    "message0": "Then %1 %2",
    "args0": [
      {
        "type": "input_end_row",
      },
      {
        "type": "input_statement",
        "name": "MEMBER_THEN"
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8AB2FF",  
    "tooltip": "ruleml:then",
  },
  {
    "type": "and_block",
    "message0": "And %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_AND"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF8A8A", 
    "tooltip": "ruleml:And",
  },
  {
    "type": "or_block",
    "message0": "Or %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_OR"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF8A8A", 
    "tooltip": "ruleml:Or",
  },
  {
    "type": "not_block",
    "message0": "Not %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_NOT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF8A8A", 
    "tooltip": "ruleml:Not",
  },
  {
    "type": "operator_block",
    "message0": "Operator %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MEMBER_OPERATOR",
        "options":[
          [
            "addition",
            "addition"
          ],
          [
            "subtraction",
            "subtraction"
          ],
          [
            "multiplication",
            "multiplication"
          ],
          [
            "division",
            "division"
          ],
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#eb4b4b", 
    "tooltip": "ruleml:Operator",
  },
  {
    "type": "expr_block",
    "message0": "Expr %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_EXPRESSION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#3e4772", 
    "tooltip": "ruleml:Expr",
  },
  {
    "type": "atom_block",
    "message0": "Atom %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_ATOM"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#D7ABE2", 
    "tooltip": "lrml:Atom",
  },
  {
    "type": "fun_block",
    "message0": "Fun %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_FUNCTION",
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#D7ABE2", 
    "tooltip": "ruleml:Fun",
  },
  {
    "type": "rel_block",
    "message0": "Rel %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_RELATION",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7f468c",
    "tooltip": "ruleml:Rel",
    "extensions": [
      "atom_block_validation",
    ],
  },
  {
    "type": "var_block",
    "message0": "Var %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_VARIABLE",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7f468c", 
    "tooltip": "ruleml:Var",
    "extensions": [
      "atom_block_validation",
    ],
  },
  {
    "type": "data_block",
    "message0": "Data %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_DATA",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#66BB6A", 
    "tooltip": "ruleml:Data",
  },
  {
    "type": "obligation_block",
    "message0": "Obligation %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_OBLIGATION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#EB9B34", 
    "tooltip": "lrml:Obligation",
  },
  {
    "type": "permission_block",
    "message0": "Permission %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_PERMISSION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#EB9B34", 
    "tooltip": "lrml:Permission",
  },
  {
    "type": "prohibition_block",
    "message0": "Prohibition %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_PROHIBITION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#EB9B34", 
    "tooltip": "lrml:Prohibition",
  },
  {
    "type": "appliedstatement_block",
    "message0": "AppliedStatement %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_APPLIEDSTATEMENT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:appliedstatement",
  },
  {
    "type": "rulestatement_block",
    "message0": "RuleStatement %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBER_RULESTATEMENT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:rulestatement",
  }
]);
