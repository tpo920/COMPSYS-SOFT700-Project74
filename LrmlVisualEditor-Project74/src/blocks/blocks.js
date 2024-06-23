/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  {
    "type": "if_block",
    "message0": "If %1 %2",
    "args0": [
      {
        "type": "input_end_row"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_IF"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "if_blocks",
    "tooltip": "ruleml:if",
  },
  {
    "type": "then_block",
    "message0": "Then %1 %2",
    "args0": [
      {
        "type": "input_end_row"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_THEN"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "if_blocks",
    "tooltip": "ruleml:then",
  },
  {
    "type": "and_block",
    "message0": "And %1 %2",
    "args0": [
      {
        "type": "input_end_row"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_AND"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "operator_blocks",
    "tooltip": "ruleml:And",
  },
  {
    "type": "has_block",
    "message0": "has %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "INPUT_HAS"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_HAS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "expression_blocks",
  },
  {
    "type": "is_block",
    "message0": "is %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "INPUT_IS"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_IS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "expression_blocks",
  },
  {
    "type": "define_block",
    "message0": "define %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "INPUT_DEFINE"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS_DEFINE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "expression_blocks",
  },
  {
    "type": "rel_block",
    "message0": "Rel %1 %2 %3",
    "args0": [
      {
        "type": "input_end_row"
      },
      {
        "type": "field_input",
        "name": "MEMBER_REL",
        "text": ""
      },
      {
        "type": "input_end_row"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "rel_block",
    "tooltip": "ruleml:Rel",
  },
  {
    "type": "var_block",
    "message0": "Var %1 %2 %3",
    "args0": [
      {
        "type": "input_end_row"
      },
      {
        "type": "field_input",
        "name": "MEMBER_VAR",
        "text": ""
      },
      {
        "type": "input_end_row"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "var_block",
    "tooltip": "ruleml:Var",
  },
  {
    "type": "ind_block",
    "message0": "Ind %1 %2 %3",
    "args0": [
      {
        "type": "input_end_row"
      },
      {
        "type": "field_input",
        "name": "MEMBER_IND",
        "text": ""
      },
      {
        "type": "input_end_row"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "style": "ind_block",
    "tooltip": "ruleml:Ind",
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
        "type": "input_end_row"
      }
    ],
    "output": null,
    "style": "data_block",
    "tooltip": "ruleml:Data",
  }
]);
