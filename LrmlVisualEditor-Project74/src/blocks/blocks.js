import * as Blockly from 'blockly/core';

// Custom blocks for Visual LegalRule Editor
Blockly.defineBlocksWithJsonArray([
  {
    "type": "if_block",
    "message0": "If %1 %2 Then %3 %4",
    "args0": [
      {
        "type": "input_end_row",
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_IF"
      },
      {
        "type": "input_end_row",
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_THEN"
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#8AB2FF",  
    "tooltip": "ruleml:if",
  },
  {
    "type": "and_block",
    "message0": "And %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_AND"
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
        "name": "MEMBERS_OR"
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
        "name": "MEMBERS_NOT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#FF8A8A", 
    "tooltip": "ruleml:Not",
  },
  {
    "type": "expr_block",
    "message0": "Expr %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_EXPR"
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
        "name": "MEMBERS_ATOM"
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
        "type": "field_dropdown",
        "name": "MEMBER_FUN",
        "options":[
          [
            "has",
            "has"
          ],
          [
            "is",
            "is"
          ],
          [
            "by",
            "by"
          ]
        ]
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
        "name": "MEMBER_REL",
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
        "name": "MEMBER_VAR",
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
    "type": "ind_block",
    "message0": "Ind %1",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_IND",
        "text": ""
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#7f468c",
    "tooltip": "ruleml:Ind",
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
    "colour": "#A6D6B6", 
    "tooltip": "ruleml:Data",
  },
  {
    "type": "obligation_block",
    "message0": "Obligation %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_OBLIGATION"
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
        "name": "MEMBERS_PERMISSION"
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
        "name": "MEMBERS_PROHIBITION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#EB9B34", 
    "tooltip": "lrml:Prohibition",
  },
  {
    "type": "right_block",
    "message0": "Right %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_RIGHT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#EB9B34", 
    "tooltip": "lrml:Right",
  },
  {
    "type": "violation_block",
    "message0": "Violation %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_VIOLATION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#EB9B34", 
    "tooltip": "lrml:Violation",
  },
  {
    "type": "compliance_block",
    "message0": "Compliance %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_COMPLIANCE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#EB9B34", 
    "tooltip": "lrml:Compliance",
  },
  {
    "type": "constitutive_block",
    "message0": "Constitutive %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_CONSTITUTIVE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:constitutive",
  },
  {
    "type": "prescriptive_block",
    "message0": "Prescriptive %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_PRESCRIPTIVE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:prescriptive",
  },
  {
    "type": "override_block",
    "message0": "Override %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_OVERRIDE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:override",
  },
  {
    "type": "penalty_block",
    "message0": "Penalty %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_PENALTY"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:penalty",
  },
  {
    "type": "reparation_block",
    "message0": "Reparation %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_REPARATION"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:reparation",
  },
  {
    "type": "factual_block",
    "message0": "Factual %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_FACTUAL"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:factual",
  },
]);
