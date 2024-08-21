// React _________________________________________
import { useState, useEffect, useRef, useContext } from 'react';
// Components _________________________________________
import NavBar from './components/NavBar';
import TextBox from './components/TextBox';
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
import { initBlocklyWithFlydown, showBlocklyFlydown } from './blockly/flydown/blockFlydown';
import { getBlocklrml, getRelevantBlocks } from './lrml/AutocompleteLrml';
import DarkTheme from '@blockly/theme-dark';
import "./blockly/blockGenerator";
import "./blockly/extensions/validators";
import "./blockly/blocks";
import { updateDynamicCategory } from './blockly/dynamicCategory';
// MUI _________________________________________
import { Box } from "@mui/material";
// CSS _________________________________________
import './App.css';

const BASE_URL = "http://127.0.0.1:5000";

function App() {
  const [ws, setWs] = useState(null);
  const [blockCode, setBlockCode] = useState("");
  const [clause, setClause] = useState('');
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
    if (ws === null) {
      setWs(workspace);
    }
    // Block -> code 
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

  // Workspace render
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
      initBlocklyWithFlydown(ws);

      ws.registerToolboxCategoryCallback(
        'DYNAMIC_CATEGORY', updateDynamicCategory);
    }
  }, [ws]);

  // Update & set onBlockClickListener dependent on ws and clause state
  useEffect(() => {
    if (ws) {
      ws.addChangeListener(onBlockClickListener);
      return () => ws.removeChangeListener(onBlockClickListener);
    }
  }, [ws, clause]);

  async function onBlockClickListener(event) {
    if (event.type == Blockly.Events.CLICK) {
      if (event.targetType == "block") {
        const block = ws.getBlockById(event.blockId);
        if (block.isInFlyout || !block.isMovable())
          return;

        const now = Date.now();

        if (now - (block["_lastClickTime"] ?? 0) < 300) {
          // call api 
          const currentBlockLrml = getBlocklrml(block);
          const res = await fetchModel(currentBlockLrml, clause);
          let modelBlockList;
          if (res) {
            modelBlockList = getRelevantBlocks(res);
          }
          // open flydown to show suggested blocks
          showBlocklyFlydown(block, modelBlockList);
        }
        block["_lastClickTime"] = now;
      }
    }
  };

  async function fetchModel(currentBlocks, currentClause) {
    const BODY = new URLSearchParams({
      text: currentClause,
      lrml: currentBlocks,
    });

    // Development
    console.log(currentBlocks);
    console.log(currentClause);

    try {
      const response = await fetch(BASE_URL + '/predict', {
        method: "POST",
        body: BODY,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
  }

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
        </Box>
      </div>
    </>
  );
};

export default App;
