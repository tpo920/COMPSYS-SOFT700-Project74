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
        "name": "NAME"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
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
        "name": "NAME"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "ruleml:then",
    "helpUrl": ""
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
        "name": "NAME"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 345,
    "tooltip": "ruleml:And",
    "helpUrl": ""
  }
]);
