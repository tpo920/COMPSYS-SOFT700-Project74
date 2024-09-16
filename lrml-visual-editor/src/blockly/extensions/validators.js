import * as Blockly from 'blockly/core';

// Block validators
Blockly.Extensions.register('atom_block_validation', function () {
    let valid = false;
    this.setOnChange(function (changeEvent) {
      let surrond_parent_block = this.getSurroundParent();
      if (surrond_parent_block && (surrond_parent_block.type === "atom_block")) {
        this.setWarningText(null);
        valid = true;
      } else {
        this.setWarningText('Must have a parent Atom');
        valid = false;
      }
      // Disable invalid blocks (unless it's in a toolbox flyout,
      // since you can't drag disabled blocks to your workspace).
      if (!this.isInFlyout) {
        const initialGroup = Blockly.Events.getGroup();
        // Make it so the move and the disable event get undone together.
        Blockly.Events.setGroup(changeEvent.group);
        if (valid) {
          this.setDisabledReason(null);
        } else {
          this.setDisabledReason('Invalid parent block.');
        }
        Blockly.Events.setGroup(initialGroup);
      }
    });
  });