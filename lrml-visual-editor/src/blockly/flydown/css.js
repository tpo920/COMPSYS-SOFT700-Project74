import * as Blockly from 'blockly/core';

const EXTRA_CSS = `

  .blocklyFlydown {
    fill: rgb(82, 82, 82);
    fill-opacity: 0.9;
  }
`;

/**
 * Register our extra CSS with Blockly.
 */
export function registerCss() {
    Blockly.Css.register(EXTRA_CSS);
  }