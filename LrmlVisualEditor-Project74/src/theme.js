/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';
export const CustomTheme = Blockly.Theme.defineTheme('custom_theme', {
  'base': Blockly.Themes.Classic,
  'blockStyles': {
    'if_blocks': {
      'colourPrimary': '#8AB2FF'
    },
    'operator_blocks': {
      'colourPrimary': '#FF8A8A'
    },
    'expression_blocks': {
      'colourPrimary': '#3e4772'
    },
    'rel_block': {
      'colourPrimary': '#D7ABE2'
    },
    'var_block': {
      'colourPrimary': '#6c5671'
    },
    'ind_block': {
      'colourPrimary': '#E18AAA'
    },
    'data_block': {
      'colourPrimary': '#A6D6B6'
    },
  },
  'categoryStyles': {
    colour_category: {
      colour: '#8AB2FF',
    },
    math_category: {
      colour: '#FF8A8A',
    },
    logic_category: {
      colour: '#3e4772',
    },
    text_category: {
      colour: '#D7ABE2',
    },
    list_category: {
      colour: '#A6D6B6',
    },
    // Others
    loop_category: {
      colour: '#5ba55b',
    },
    procedure_category: {
      colour: '#995ba5',
    },
    variable_category: {
      colour: '#a55b99',
    },
    variable_dynamic_category: {
      colour: '#a55b99',
    },
  },

  componentStyles: {},
  fontStyle: {},
  startHats: null,
});