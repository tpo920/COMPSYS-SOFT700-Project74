// React _________________________________________
import { useState, useEffect, useRef, useContext } from 'react';
// Components _________________________________________
import NavBar from './components/NavBar';
import TextBox from './components/TextBox';
import Autocomplete from './lrml/AutocompleteLrml';
import ClauseInput from './components/ClauseInput';
// Context _________________________________________
import { ColourModeContext } from './context/ColourModeContext';
// Blockly _________________________________________
import * as Blockly from "blockly/core";
import { useBlocklyWorkspace } from 'react-blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { toolbox } from './blockly/blockToolbox';
import { ZoomToFitControl } from "@blockly/zoom-to-fit";
import { WorkspaceSearch } from "@blockly/plugin-workspace-search";
import { FixedEdgesMetricsManager } from '@blockly/fixed-edges';
import { ContentHighlight } from '@blockly/workspace-content-highlight';
import DarkTheme from '@blockly/theme-dark';
import "./blockly/blockGenerator";
import "./blockly/extensions/validators";
import "./blockly/blocks";
import { updateDynamicCategory } from './blockly/dynamicCategory';
// MUI _________________________________________
import { Box } from "@mui/material";
// CSS _________________________________________
import './App.css';

function App() {
  const [ws, setWs] = useState(null);
  const [blockCode, setBlockCode] = useState("");
  const [clause, setClause] = useState("");
  const blocklyRef = useRef(null);
  const { mode } = useContext(ColourModeContext);
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
      theme: mode === 'dark' ? DarkTheme : undefined,
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
      // Initialise the zoom-to-fit plugin
      const zoomToFit = new ZoomToFitControl(ws);
      zoomToFit.init();

      // Initialise the workspace search plugin
      const workspaceSearch = new WorkspaceSearch(ws);
      workspaceSearch.init();

      // Initialise the content highlight plugin
      const contentHighlight = new ContentHighlight(ws);
      contentHighlight.init();

      console.log("BEFORE APP TOOLBOX BELOW");
      console.log(toolbox);
      const modelOutput = "data(brick)";
      updateDynamicCategory(ws, modelOutput);
      console.log("APP TOOLBOX BELOW");
      console.log(toolbox);
    }
  }, [ws]);

  // Set theme
  useEffect(() => {
    if (ws) {
      ws.setTheme(mode === 'dark' ? DarkTheme : Blockly.Themes.Classic);
    }
    document.body.className = mode === 'dark' ? 'dark-theme' : '';
  }, [mode, ws]);

  return (
    <>
      <NavBar />
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
