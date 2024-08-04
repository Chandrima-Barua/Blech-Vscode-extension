import { GraphEdge, GraphNode } from "./models";
import { SNode, SEdge, SGraph, SLabel } from 'sprotty-protocol';
import axios from 'axios';

const calculatePosition = (index: number) => {
    return {
        x: (index % 10) * 120,  // Example calculation for x
        y: Math.floor(index / 10) * 150  // Example calculation for y
    };
};

export async function fetchSModelData(): Promise<SGraph> {
    const response = await axios.get('/api/smodel');
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
    const nodes: (SNode & GraphNode)[] = [];
    const edges: (SEdge & GraphEdge)[] = [];

    apiData.sModel.children.forEach((element: any, index: number) => {
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
        } else if (element.type === 'edge') {
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

