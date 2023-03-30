import go from "gojs";

interface FlowchartNode {
    key: string;
    color: string;
};

interface FlowchartEdge {
    from: string;
    to: string;
};

/**
 * Start supposing we already have:
 * @const flowchartNodes: FlowchartNode[] = [{}];
 * @const flowchartEdges: FlowchartEdge[] = [{}]; 
 * @const FLWC_settings: ;
 **/

function setupFlowchart() {
    
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
}

function MYFUNCTIONTOBENAMED(flowchartNodes: "", flowchartEdges: "", FLWC_settings: "") {

    
    
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
} 


function setModel(betaColor: string) {
    console.log("BELLO");
    flowchartNodes.find(node => node.key === "START")!.color = betaColor;
    myDiagram.model = new go.GraphLinksModel(flowchartNodes, flowchartEdges);
}

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




