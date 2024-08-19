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
        "name": "MEMBERS_IF"
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
        "name": "MEMBERS_THEN"
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
          ],
          [
            "exist",
            "exist"
          ],
          [
            "greaterThan",
            "greaterThan"
          ],
          [
            "lessThan",
            "lessThan"
          ],
          [
            "asPer",
            "asPer"
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
    "type": "data_block",
    "message0": "Data %1 %2",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_DATA",
        "text": ""
      },
      {
        "type": "input_statement",
        "name": "MEMBER_DATA2",
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#66BB6A", 
    "tooltip": "ruleml:Data",
  },
  {
    "type": "baseunit_block",
    "message0": "BaseUnit %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_BASEUNIT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#388E3C", 
    "tooltip": "lrml:Baseunit",
  },
  {
    "type": "prefix_block",
    "message0": "Prefix %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MEMBER_PREFIX",
        "options":[
          [
            "kilo",
            "kilo"
          ],
          [
            "milli",
            "milli"
          ],
          [
            "mega",
            "mega"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#1B5E20", 
    "tooltip": "ruleml:Prefix",
  },
  {
    "type": "kind_block",
    "message0": "Kind %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "MEMBER_KIND",
        "options":[
          [
            "metre",
            "metre"
          ],
          [
            "gram",
            "gram"
          ],
          [
            "litre",
            "litre"
          ],
          [
            "newton",
            "newton"
          ],
          [
            "pascal",
            "pascal"
          ],
          [
            "angleDegree",
            "angleDegree"
          ],
          [
            "celsius",
            "celsius"
          ],
          [
            "hectare",
            "hectare"
          ],
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#1B5E20", 
    "tooltip": "ruleml:Kind",
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
    "type": "appliedstatement_block",
    "message0": "AppliedStatement %1",
    "args0": [
      {
        "type": "input_statement",
        "name": "MEMBERS_APPLIEDSTATEMENT"
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
        "name": "MEMBERS_RULESTATEMENT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "#5ba59f", 
    "tooltip": "lrml:rulestatement",
  }
]);
