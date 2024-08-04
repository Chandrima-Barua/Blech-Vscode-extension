"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSModelData = void 0;
const axios_1 = __importDefault(require("axios"));
const calculatePosition = (index) => {
    return {
        x: (index % 10) * 120,
        y: Math.floor(index / 10) * 150 // Example calculation for y
    };
};
async function fetchSModelData() {
    const response = await axios_1.default.get('/api/smodel');
    const apiData = response.data;
    // console.log(apiData)
    // console.log(apiData.sModel.children)
    // const nodes: (SNode & GraphNode)[] = apiData.sModel.children.map((node: any, index: number) => ({
    //     type: 'node',
    //     id: node.id,
    //     shape: node.shape,
    //     style: node.style,
    //     fillcolor: node.fillcolor,
    //     fontcolor: node.fontcolor,
    //     label: node.label,
    //     position: calculatePosition(index),  
    //     size: { width: 100, height: 100 }
    // }));
    // console.log(nodes)
    // const edges: (SEdge & GraphEdge)[] = apiData.sModel.children.map((edge: any) => ({
    //     type: 'edge',
    //     sourceId: edge.sourceId,
    //     targetId: edge.targetId,
    //     label: edge.label,
    // }));
    const nodes = [];
    const edges = [];
    apiData.sModel.children.forEach((element, index) => {
        if (element.type === 'node') {
            nodes.push({
                type: 'node',
                id: element.id,
                shape: element.shape,
                style: element.style,
                fillcolor: element.fillcolor,
                fontcolor: element.fontcolor,
                label: element.label,
                position: calculatePosition(index),
                size: { width: 100, height: 100 },
                children: []
            });
        }
        else if (element.type === 'edge') {
            edges.push({
                type: 'edge',
                id: element.id,
                sourceId: element.sourceId,
                targetId: element.targetId,
                text: element.label
                // routerKind: 'manhattan',
                // routingPoints: [{ x: 670.5, y: 721.7 }, { x: 670.5, y: 539.75 }],
            });
        }
    });
    // console.log(nodes);
    // console.log(edges);
    return { type: 'graph', id: 'graph', children: [...nodes, ...edges] };
}
exports.fetchSModelData = fetchSModelData;
