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
import { Flydown } from './blockly/flydown/flydown';
// MUI _________________________________________
import { Box } from "@mui/material";
// CSS _________________________________________
import './App.css';

function App() {
  const [ws, setWs] = useState(null);
  const [blockCode, setBlockCode] = useState("");
  const [thisFlydown, setThisFlydown] = useState("");
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

      ws.addChangeListener(onBlockClickListener);
      initBlocklyWithFlydown(ws);
    }
  }, [ws]);

  function onBlockClickListener(event) {
    if (event.type == Blockly.Events.CLICK) {
      if (event.targetType == "block") {
        const block = ws.getBlockById(event.blockId);
        if (block.isInFlyout || !block.isMovable())
          return;

        const now = Date.now();

        if (now - (block["_lastClickTime"] ?? 0) < 300) {
          // Do something
          console.log("Double click");
          openFlydown(block);

        }

        block["_lastClickTime"] = now;
      }
    }
  };

  // Initialize Blockly and create a vertical flydown
  function initBlocklyWithFlydown(workspace) {
    const flydown = new Flydown(
      new Blockly.Options({
        scrollbars: false,
        rtl: workspace.RTL,
        renderer: workspace.options.renderer,
        rendererOverrides: workspace.options.rendererOverrides,
        parentWorkspace: workspace,
      })
    );
    // ***** [lyn, 10/05/2013] NEED TO WORRY ABOUT MULTIPLE BLOCKLIES! *****
    workspace.flydown_ = flydown;
    Blockly.utils.dom.insertAfter(flydown.createDom('g'),
      workspace.svgBubbleCanvas_);
    flydown.init(workspace);
    flydown.autoClose = true; // Flydown closes after selecting a block
  }

  function openFlydown(currentBlock) {
    const flydown = Blockly.common.getMainWorkspace().flydown_;

    const scale = flydown.targetWorkspace.scale;
    flydown.workspace_.setScale(scale);

    const blocksXML2 = ['<xml>' + '<block type="atom_block"></block>' + '<block type="fun_block"></block>' + '</xml>'];
    const blocksDom = Blockly.utils.xml.textToDom(blocksXML2);
    const blocksXMLList = blocksDom.children;

    // Calc position
    const pos = currentBlock.getRelativeToSurfaceXY();
    pos.x += pos.x * scale;
    pos.y += pos.y * scale;
    console.log(pos);

    flydown.showAt(blocksXMLList, pos.x, pos.y);
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
          <Autocomplete currentClause={clause} />
        </Box>
      </div>
    </>
  );
};

export default App;
