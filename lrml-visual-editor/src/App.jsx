import { useState, useEffect, useRef } from 'react';
import * as Blockly from "blockly/core";
import { useBlocklyWorkspace } from 'react-blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { toolbox } from './blockly/blockToolbox';
import "./blockly/blockGenerator";
import "./blockly/extensions/validators";
import "./blockly/blocks";
import './App.css';
import NavBar from './components/NavBar';
import TextBox from './components/TextBox';
import Autocomplete from './lrml/AutocompleteLrml';
import ClauseInput from './components/ClauseInput';
import { Box } from "@mui/material";
import { ZoomToFitControl } from "@blockly/zoom-to-fit";
import { WorkspaceSearch } from "@blockly/plugin-workspace-search";
import DarkTheme from '@blockly/theme-dark';
import { FixedEdgesMetricsManager } from '@blockly/fixed-edges';
import { ContentHighlight } from '@blockly/workspace-content-highlight';

function App() {
  const [ws, setWs] = useState(null);
  const [blockCode, setBlockCode] = useState("");
  const [clause, setClause] = useState("");
  const blocklyRef = useRef(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  FixedEdgesMetricsManager.setFixedEdges({
    top: true,
    left: true,
  });

  useBlocklyWorkspace({
    ref: blocklyRef,
    toolboxConfiguration: toolbox,
    toolbox: toolbox,
    plugins: {
      metricsManager: FixedEdgesMetricsManager,
    },
    workspaceConfiguration: {
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      trashcan: true,
      theme: isDarkTheme ? DarkTheme : undefined,
    },
    onWorkspaceChange: workspaceDidChange,
  });

  function workspaceDidChange(workspace) {
    setWs(workspace);
    const code = javascriptGenerator.workspaceToCode(workspace);
    javascriptGenerator.scrub_ = function (block, code, thisOnly) {
      const nextBlock =
        block.nextConnection && block.nextConnection.targetBlock();
      if (nextBlock && !thisOnly) {
        return code + '\n' + javascriptGenerator.blockToCode(nextBlock);
      }
      return code;
    };
    setBlockCode(code);
  }

  useEffect(() => {
    if (ws) {
      ws.addChangeListener((e) => {
        if (e.type === Blockly.Events.BLOCK_CREATE) {
          const block = ws.getBlockById(e.blockId);
          if (block.type === 'atom_block') {
            addSubBlocks(block);
          }
        }
      });
      // Initialise the zoom-to-fit plugin
      const zoomToFit = new ZoomToFitControl(ws);
      zoomToFit.init();

      // Initialise the workspace search plugin
      const workspaceSearch = new WorkspaceSearch(ws);
      workspaceSearch.init();

      // Initialise the content highlight plugin
      const contentHighlight = new ContentHighlight(ws);
      contentHighlight.init();
    }
  }, [ws]);

  useEffect(() => {
    if (ws) {
      ws.setTheme(isDarkTheme ? DarkTheme : Blockly.Themes.Classic);
    }
    document.body.className = isDarkTheme ? 'dark-theme' : '';
  }, [isDarkTheme, ws]);

  function addSubBlocks(atomBlock) {
    // Create new blocks
    const relBlock = ws.newBlock('rel_block');
    const varBlock = ws.newBlock('var_block');
    const indBlock = ws.newBlock('ind_block');

    // Initialize and render blocks
    relBlock.initSvg();
    varBlock.initSvg();
    indBlock.initSvg();
    relBlock.render();
    varBlock.render();
    indBlock.render();

    // Connect blocks inside atomBlock
    const membersInput = atomBlock.getInput('MEMBERS_ATOM');
    if (membersInput) {
      const membersConnection = membersInput.connection;
      if (membersConnection) {
        membersConnection.connect(relBlock.previousConnection);
        relBlock.nextConnection.connect(varBlock.previousConnection);
        varBlock.nextConnection.connect(indBlock.previousConnection);
      } else {
        console.error('Connection on MEMBERS_ATOM input is not available.');
      }
    } else {
      console.error('MEMBERS_ATOM input is not found on atomBlock.');
    }
  }

  return (
    <>
      <NavBar isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />
      <div id="pageContainer">
        <div className="blockly-workspace" ref={blocklyRef} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextBox value={blockCode} />
          <ClauseInput clause={clause} setClause={setClause} />
          <Autocomplete currentClause={clause} />
        </Box>
      </div>
    </>
  );
};

export default App;
