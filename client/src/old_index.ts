import go from "gojs";

const $ = go.GraphObject.make;

const myDiagram =
    $(go.Diagram, "flowchart",
        {
            "undoManager.isEnabled": true,
            // "panningTool.isEnabled": false,
            isReadOnly: true,
            panningTool: {
                isEnabled: false
            },
            "animationManager.isEnabled": false,
            initialAutoScale: go.Diagram.UniformToFill,
            layout: $(go.LayeredDigraphLayout,
                {
                    direction: 90,
                    layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
                    layerSpacing: 40,
                    alignOption: go.LayeredDigraphLayout.AlignUpperLeft
                }
            )
        }
    )

myDiagram.nodeTemplate =
    $(go.Node, "Auto",  // the Shape will automatically surround the TextBlock
        // add a Shape and a TextBlock to this "Auto" Panel
        $(go.Shape, "RoundedRectangle",
            { strokeWidth: 3, fill: "white" },  // no border; default fill is white
            new go.Binding("fill", "color")),  // Shape.fill is bound to Node.data.color
        $(go.TextBlock,
            { margin: 15, stroke: "#000000", font: "bold 11pt sans-serif" },  // some room around the text
            new go.Binding("text", "key")),
    );  // TextBlock.text is bound to Node.data.key

myDiagram.linkTemplate =
    $(go.Link,
        {
            routing: go.Link.AvoidsNodes,
            fromEndSegmentLength: 25,
            toEndSegmentLength: 25,
            corner: 15,
            curve: go.Link.JumpOver
        },
        $(go.Shape,
            { strokeWidth: 3 }),
        $(go.Shape,
            { fromArrow: "DoubleLine", scale: 2 }),
        $(go.Shape,
            { toArrow: "Triangle", scale: 1.5 })
    );

// myDiagram.nodeTemplate =
// $(go.Node, "Auto",  // the Shape will automatically surround the TextBlock
//     // add a Shape and a TextBlock to this "Auto" Panel
//     $(go.Shape, "RoundedRectangle",
//         { strokeWidth: 0, fill: "white" }),  // no border; default fill is white
//         new go.Binding("fill", "color"),  // Shape.fill is bound to Node.data.color
//     $(go.TextBlock,
//         { margin: 8, stroke: "#333" }),  // some room around the text
//         new go.Binding("text", "key"),
// );  // TextBlock.text is bound to Node.data.key

// myDiagram.linkTemplate =
//     new go.Link()
//         .add(new go.Shape,
//             { stroke: "red" });
// but use the default Link template, by not setting Diagram.linkTemplate

// create the model data that will be represented by Nodes and Links

// document.getElementById("change-me")!.innerHTML = "NEWLY CHANGED!";

interface FlowchartNode {
    key: string;
    color: string;
};

interface FlowchartEdge {
    from: string;
    to: string;
};

const flowchartNodes: FlowchartNode[] = [{
    'key': 'START',
    'color': 'orange'
}, {
    'key': 'XPLORA_FIND_ARUCO_SHELF',
    'color': 'lightgreen'
}, {
    'key': 'XPLOIT_MOVE_TOWARDS_SHELF',
    'color': 'lightblue'
}, {
    'key': 'XPLORA_DETERMINE_SHELF_OCCUPANCY',
    'color': 'lightgreen'
}, {
    'key': 'EVALUE_IS_OBJECTIVE_BOX_PRESENT',
    'color': 'pink'
}, {
    'key': 'XPLOIT_MOVE_TOWARDS_OBJECTIVE_BOX',
    'color': 'lightblue'
}, {
    'key': 'XPLORA_OBJECTIVE_BOX_POSE_ESTIMATION',
    'color': 'lightgreen'
}, {
    'key': 'XPLOIT_GRASP_OBJECTIVE_BOX',
    'color': 'lightblue'
}, {
    'key': 'EVALUE_IS_SELF_STORAGE_AVAILABLE',
    'color': 'pink'
}, {
    'key': 'XPLOIT_PLACE_GRASPED_BOX_IN_SELFSTORAGE',
    'color': 'lightblue'
}, {
    'key': 'XPLOIT_MOVE_TOWARDS_OBJECTIVE_AGV',
    'color': 'lightblue'
}, {
    'key': 'XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV',
    'color': 'lightblue'
}, {
    'key': 'EVALUE_IS_SELF_STORAGE_EMPTY',
    'color': 'pink'
}, {
    'key': 'XPLOIT_GRASP_BOX_FROM_SELFSTORAGE',
    'color': 'lightblue'
}, {
    'key': 'END',
    'color': 'orange'
}];

const flowchartEdges: FlowchartEdge[] = [{ 'from': 'START', 'to': 'XPLORA_FIND_ARUCO_SHELF' }, { 'from': 'XPLORA_FIND_ARUCO_SHELF', 'to': 'XPLOIT_MOVE_TOWARDS_SHELF' }, { 'from': 'XPLOIT_MOVE_TOWARDS_SHELF', 'to': 'XPLORA_DETERMINE_SHELF_OCCUPANCY' }, { 'from': 'XPLORA_DETERMINE_SHELF_OCCUPANCY', 'to': 'EVALUE_IS_OBJECTIVE_BOX_PRESENT' }, { 'from': 'EVALUE_IS_OBJECTIVE_BOX_PRESENT', 'to': 'END' }, { 'from': 'EVALUE_IS_OBJECTIVE_BOX_PRESENT', 'to': 'XPLOIT_MOVE_TOWARDS_OBJECTIVE_BOX' }, { 'from': 'XPLOIT_MOVE_TOWARDS_OBJECTIVE_BOX', 'to': 'XPLORA_OBJECTIVE_BOX_POSE_ESTIMATION' }, { 'from': 'XPLORA_OBJECTIVE_BOX_POSE_ESTIMATION', 'to': 'XPLOIT_GRASP_OBJECTIVE_BOX' }, { 'from': 'XPLOIT_GRASP_OBJECTIVE_BOX', 'to': 'EVALUE_IS_SELF_STORAGE_AVAILABLE' }, { 'from': 'EVALUE_IS_SELF_STORAGE_AVAILABLE', 'to': 'XPLOIT_MOVE_TOWARDS_OBJECTIVE_AGV' }, { 'from': 'EVALUE_IS_SELF_STORAGE_AVAILABLE', 'to': 'XPLOIT_PLACE_GRASPED_BOX_IN_SELFSTORAGE' }, { 'from': 'XPLOIT_PLACE_GRASPED_BOX_IN_SELFSTORAGE', 'to': 'XPLORA_DETERMINE_SHELF_OCCUPANCY' }, { 'from': 'XPLOIT_MOVE_TOWARDS_OBJECTIVE_AGV', 'to': 'XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV' }, { 'from': 'XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV', 'to': 'EVALUE_IS_SELF_STORAGE_EMPTY' }, { 'from': 'EVALUE_IS_SELF_STORAGE_EMPTY', 'to': 'XPLOIT_GRASP_BOX_FROM_SELFSTORAGE' }, { 'from': 'EVALUE_IS_SELF_STORAGE_EMPTY', 'to': 'END' }, { 'from': 'XPLOIT_GRASP_BOX_FROM_SELFSTORAGE', 'to': 'XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV' }, { 'from': 'END', 'to': 'START' }];

function setModel(betaColor: string) {
    console.log("BELLO");
    flowchartNodes.find(node => node.key === "START")!.color = betaColor;
    myDiagram.model = new go.GraphLinksModel(flowchartNodes, flowchartEdges);
}

setModel("orange");

const colorInput = document.getElementById("color-input") as HTMLInputElement;

const changeButton = document.getElementById("change-color") as HTMLButtonElement;
changeButton.onclick = function () {
    setModel(colorInput.value)
}