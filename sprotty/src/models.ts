import { SModelRoot, SNode, SEdge, SLabel } from 'sprotty-protocol';

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
    transition?: string;
}

// export interface GraphLabel extends SLabel {
//     label:string
// }

// export interface GraphModelRoot extends SModelRoot {
//     type: 'graph';
//     id: string;
//     children: SNode[];
// }