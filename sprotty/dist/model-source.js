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
    console.log(apiData);
    console.log(apiData.sModel.children);
    const nodes = apiData.sModel.children.map((node, index) => ({
        type: 'node',
        id: node.id,
        shape: node.shape,
        style: node.style,
        fillcolor: node.fillcolor,
        fontcolor: node.fontcolor,
        label: node.label,
        position: calculatePosition(index),
        size: { width: 100, height: 100 }
    }));
    const edges = apiData.sModel.children.map((edge) => ({
        type: 'edge',
        sourceId: edge.sourceId,
        targetId: edge.targetId,
        label: edge.label,
    }));
    return { type: 'graph', id: 'graph', children: [...nodes, ...edges] };
}
exports.fetchSModelData = fetchSModelData;
