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
            initialAutoScale: go.Diagram.UniformToFill
        }
    )

// define a simple Node template
myDiagram.nodeTemplate =
    $(go.Node, "Auto",  // the Shape will automatically surround the TextBlock
        // add a Shape and a TextBlock to this "Auto" Panel
        $(go.Shape, "RoundedRectangle",
            { strokeWidth: 0, fill: "white" }),  // no border; default fill is white
            new go.Binding("fill", "color"),  // Shape.fill is bound to Node.data.color
        $(go.TextBlock,
            { margin: 8, stroke: "#333" }),  // some room around the text
            new go.Binding("text", "key"),
    );  // TextBlock.text is bound to Node.data.key

myDiagram.linkTemplate =
    new go.Link()
        .add(new go.Shape,
            { stroke: "red" });
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

const flowchartNodes: FlowchartNode[] = [
    { key: "START", color: "lightblue" },
    { key: "XPLORA_FIND_ARUCO_SHELF", color: "yellow" },
    { key: "XPLOIT_MOVE_TOWARDS_SHELF", color: "lightgreen" },
    { key: "XPLORA_DETERMINE_SHELF_OCCUPANCY", color: "lightgreen" },
    { key: "EVALUE_IS_OBJECTIVE_BOX_PRESENT", color: "lightblue" },
    { key: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_BOX", color: "yellow" },
    { key: "XPLORA_OBJECTIVE_BOX_POSE_ESTIMATION", color: "lightgreen" },
    { key: "XPLOIT_GRASP_OBJECTIVE_BOX", color: "lightblue" },
    { key: "EVALUE_IS_SELF_STORAGE_AVAILABLE", color: "yellow" },
    { key: "XPLOIT_PLACE_GRASPED_BOX_IN_SELFSTORAGE", color: "lightgreen" },
    { key: "XPLOIT_MOVE_TOWARDS_OBJECTIVE_AGV", color: "lightblue" },
    { key: "XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV", color: "yellow" },
    { key: "EVALUE_IS_SELF_STORAGE_EMPTY", color: "lightgreen" },
    { key: "XPLOIT_GRASP_BOX_FROM_SELFSTORAGE", color: "lightblue" },
    { key: "END", color: "yellow" }
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
    { from: "XPLOIT_GRASP_BOX_FROM_SELFSTORAGE", to: "XPLOIT_PLACE_GRASPED_BOX_ON_OBJECTIVE_AGV" }

];

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