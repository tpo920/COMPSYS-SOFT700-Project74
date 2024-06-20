/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.
*/

export const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'If',
      categorystyle: 'logic_category',
      contents: [
        {
          kind: 'block',
          type: 'if_block',
        },
        {
          kind: 'block',
          type: 'then_block',
        },
        {
          kind: 'block',
          type: 'and_block',
        },
      ],
    },
  ]
};
