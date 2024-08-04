import { SNode, SEdge, SLabel, Dimension, ModelLayoutOptions, Point, SModelElement } from 'sprotty-protocol';

export interface GraphNode extends SNode {
    type: 'node';
    id: string;
    shape?: string;
    style?: string;
    fillcolor?: string;
    fontcolor?: string;
    label?: string;
    children: SNode[];
}

export interface GraphEdge extends SEdge {
    type: 'edge';
    sourceId: string;
    targetId: string;
    text?: string;
    // routingPoints: { x: number, y: number }[];
    
}

