import * as go from "gojs";

interface FlowchartNode {
  key: string;
  color: string;
}

interface FlowchartEdge {
  from: string;
  to: string;
}

const flowchartNodes: FlowchartNode[] = [];
const flowchartEdges: FlowchartEdge[] = [];

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
    initialAutoScale: go.Diagram.UniformToFill,
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
function initializeFlowchart(
  myDiagram: go.Diagram,
  flowchartNodes: FlowchartNode[],
  flowchartEdges: FlowchartEdge[]
): void {
  myDiagram.model = new go.GraphLinksModel(flowchartNodes, flowchartEdges);
}
