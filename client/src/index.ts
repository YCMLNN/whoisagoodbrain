import * as go from "gojs";

const freezeButton = document.getElementById("freezeBtn") as HTMLButtonElement;

freezeButton.onclick = function () {
    console.log(myDiagram)
}

interface FlowchartNode {
  key: string;
  color: string;
}

interface FlowchartEdge {
  from: string;
  to: string;
}

// let flowchartNodes: FlowchartNode[] = [];
// let flowchartEdges: FlowchartEdge[] = [];

const flowchartNodes: FlowchartNode[] = [
    { key: "START", color: "orange" },
    { key: "XPLORA_FIND_ARUCO_SHELF", color: "lightgreen" },
    { key: "XPLOIT_MOVE_TOWARDS_SHELF", color: "lightblue" },
    { key: "XPLORA_DETERMINE_SHELF_OCCUPANCY", color: "lightgreen" },
    { key: "EVALUE_IS_OBJECTIVE_BOX_PRESENT", color: "pink" },
    { key: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_BOX", color: "lightblue" },
    { key: "XPLORA_OBJECTIVE_BOX_POSE_ESTIMATION", color: "lightgreen" },
    { key: "XPLOIT_GRASP_OBJECTIVE_BOX", color: "lightblue" },
    { key: "EVALUE_IS_SELF_STORAGE_AVAILABLE", color: "pink" },
    { key: "XPLOIT_PLACE_GRASPED_BOX_IN_SELFSTORAGE", color: "lightblue" },
    { key: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_AGV", color: "lightblue" },
    { key: "XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV", color: "lightblue" },
    { key: "EVALUE_IS_SELF_STORAGE_EMPTY", color: "pink" },
    { key: "XPLOIT_GRASP_BOX_FROM_SELFSTORAGE", color: "lightblue" },
    { key: "END", color: "orange" },
  ];

const flowchartEdges: FlowchartEdge[] = [
  { from: "START", to: "XPLORA_FIND_ARUCO_SHELF" },
  { from: "XPLORA_FIND_ARUCO_SHELF", to: "XPLOIT_MOVE_TOWARDS_SHELF" },
  { from: "XPLOIT_MOVE_TOWARDS_SHELF", to: "XPLORA_DETERMINE_SHELF_OCCUPANCY" },
  { from: "XPLORA_DETERMINE_SHELF_OCCUPANCY", to: "EVALUE_IS_OBJECTIVE_BOX_PRESENT" },
  { from: "EVALUE_IS_OBJECTIVE_BOX_PRESENT", to: "END" },
  { from: "EVALUE_IS_OBJECTIVE_BOX_PRESENT", to: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_BOX" },
  { from: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_BOX", to: "XPLORA_OBJECTIVE_BOX_POSE_ESTIMATION" },
  { from: "XPLORA_OBJECTIVE_BOX_POSE_ESTIMATION", to: "XPLOIT_GRASP_OBJECTIVE_BOX" },
  { from: "XPLOIT_GRASP_OBJECTIVE_BOX", to: "EVALUE_IS_SELF_STORAGE_AVAILABLE" },
  { from: "EVALUE_IS_SELF_STORAGE_AVAILABLE", to: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_AGV" },
  { from: "EVALUE_IS_SELF_STORAGE_AVAILABLE", to: "XPLOIT_PLACE_GRASPED_BOX_IN_SELFSTORAGE" },
  { from: "XPLOIT_PLACE_GRASPED_BOX_IN_SELFSTORAGE", to: "XPLORA_DETERMINE_SHELF_OCCUPANCY" },
  { from: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_AGV", to: "XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV" },
  { from: "XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV", to: "EVALUE_IS_SELF_STORAGE_EMPTY" },
  { from: "EVALUE_IS_SELF_STORAGE_EMPTY", to: "XPLOIT_GRASP_BOX_FROM_SELFSTORAGE" },
  { from: "EVALUE_IS_SELF_STORAGE_EMPTY", to: "END" },
  { from: "XPLOIT_GRASP_BOX_FROM_SELFSTORAGE", to: "XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV" },
  { from: "END", to: "START" },
];

/**
 * Start supposing we already have:
 * @const flowchartNodes: FlowchartNode[] = [];
 * @const flowchartEdges: FlowchartEdge[] = [];
 * @const FLWC_settings: ;
 **/

/**
 * Configures a GoJS flowchart diagram with node and link templates.
 * @returns The configured GoJS diagram object.
 **/
function setupFlowchart(): go.Diagram {
  const $ = go.GraphObject.make;

  // Create a new diagram with ID "flowchart"
  const myDiagram: go.Diagram = $(go.Diagram, "flowchart", {
    "undoManager.isEnabled": true, // Enable the undo manager and disable panning
    panningTool: { isEnabled: false },
    "animationManager.isEnabled": false, // Disable animations and set initial scale and layout
    //initialAutoScale: go.Diagram.UniformToFill,
    scale: 0.5,
    layout: $(go.LayeredDigraphLayout, {
      direction: 90,
      layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
      layerSpacing: 40,
      alignOption: go.LayeredDigraphLayout.AlignUpperLeft,
    }),
  });

  // Define the node template
  myDiagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "RoundedRectangle",
      {
        strokeWidth: 3,
        fill: "white",
      },
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      {
        margin: 15,
        stroke: "#000000",
        font: "bold 11pt sans-serif",
      },
      new go.Binding("text", "key")
    )
  );

  // Define the link template
  myDiagram.linkTemplate = $(
    go.Link,
    {
      routing: go.Link.AvoidsNodes,
      fromEndSegmentLength: 25,
      toEndSegmentLength: 25,
      corner: 15,
      curve: go.Link.JumpOver,
    },
    $(go.Shape, {
      strokeWidth: 3,
    }),
    $(go.Shape, {
      fromArrow: "DoubleLine",
      scale: 2,
    }),
    $(go.Shape, {
      toArrow: "Triangle",
      scale: 1.5,
    })
  );

  // Return the diagram object
  return myDiagram;
}

/**
 * Initializes a GoJS flowchart diagram with node and link data.
 *
 * @param myDiagram - The GoJS diagram to initialize.
 * @param flowchartNodes - An array of node data to use in the diagram.
 * @param flowchartEdges - An array of link data to use in the diagram.
 **/
function initializeFlowchart(myDiagram: go.Diagram, flowchartNodes: FlowchartNode[], flowchartEdges: FlowchartEdge[]): void {
  myDiagram.model = new go.GraphLinksModel(flowchartNodes, flowchartEdges);
}

// SCRIPT

let myDiagram = setupFlowchart();
initializeFlowchart(myDiagram, flowchartNodes, flowchartEdges);

// THEN INITIALIZES THE MQTT CONNECTION WITH MQTT.JS