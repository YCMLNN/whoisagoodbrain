// 00: Loads settings.json
// 01: Load db.json
// Then, create file that takes care of loading .jsons

// 02: Has setting const, db const

const states_db = "";
const FLWC_settings = "";

const flowchartNodes: Array<any> = [];
const flowchartEdges: Array<any> = [];


import fs from 'fs';

/**
 * Reads JSON files containing pydb and settings data, and converts the pydb data
 * to flowchart data (nodes and edges) using the settings data.
 * 
 * @param pydbFilePath - The path to the pydb JSON file.
 * @param settingsFilePath - The path to the settings JSON file.
 * @returns An array containing two arrays, one for nodes and one for edges.
 */
function convertPydbToJsdbFromFile(pydbFilePath: string, settingsFilePath: string): [Array<any>, Array<any>] {
    // Read and parse JSON files
    const pydb: Record<string, any> = JSON.parse(fs.readFileSync(pydbFilePath, 'utf8'));
    const settings: Record<string, any> = JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
  
    const flowchartNodes: Array<any> = [];
    const flowchartEdges: Array<any> = [];
  
    // Iterate through pydb to create flowchart nodes and edges
    for (const stateName in pydb) {
      const stateInfo = pydb[stateName];
      const stateColor = settings.FLOWCHART_COLOR_SCHEME.STANDARD_STATE[stateInfo.stateType];
  
      // Add a new node with the current state name and color
      flowchartNodes.push({ key: stateName, color: stateColor });
  
      // Iterate through next states to create edges between nodes
      for (const nextStateId in stateInfo.nextState) {
        const nextStateName = stateInfo.nextState[nextStateId];
        flowchartEdges.push({ from: stateName, to: nextStateName });
      }
    }
  
    return [flowchartNodes, flowchartEdges];
  }
  
  // Usage example
  const [flowchartNodes, flowchartEdges] = convertPydbToJsdbFromFile('M_db.json', 'M_settings.json');
  console.log(flowchartNodes);
  console.log(flowchartEdges);
  
  
  //////////////////////////////// flowchartNodes, flowchartEdges