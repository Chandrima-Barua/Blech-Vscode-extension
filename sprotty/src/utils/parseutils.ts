import { GraphNode, GraphEdge } from '../models'

interface SModel {
    type: string;
    id: string;
    children: (GraphNode | GraphEdge)[];
}
// Function to parse node properties
function parseNodeProperties(props: any): any {
    if (typeof props !== 'string') {
        throw new Error(`Invalid type for node properties: expected string but received ${typeof props}`);
    }

    const properties: any = {};
    const regex = /(\w+)\s*=\s*([^,\]]+)/g;
    let match;

    // Extract node ID 
    const idMatch = props.match(/^"(\d+)"\s*\[/);
    if (idMatch) {
        properties.id = idMatch[1];
    }

    // Extract other properties
    while ((match = regex.exec(props)) !== null) {
        properties[match[1]] = match[2].replace(/["]/g, '').trim();
    }

    return properties;
}
// Function to parse edge properties
function parseEdgeProperties(props: any): any {
    if (typeof props !== 'string') {
        throw new Error(`Invalid type for edge properties: expected string but received ${typeof props}`);
    }

    const edgeProps: any = {};
    const regex = /(\w+)\s*=\s*([^,\]]+)/g;
    let match;

    // Extract edge sourceId and targetId
    const edgeMatch = props.match(/^"(\d+)"\s*->\s*"(\d+)"/);
    if (edgeMatch) {
        edgeProps.sourceId = edgeMatch[1];
        edgeProps.targetId = edgeMatch[2];
    }

    // Extract other edge properties 
    while ((match = regex.exec(props)) !== null) {
        edgeProps[match[1]] = match[2].replace(/["]/g, '').trim();
    }

    return edgeProps;
}

function logObject(obj: any): any {
    if (obj && obj.Case === 'Array' && Array.isArray(obj.Fields)) {
        // console.log('logObject - Valid Case and Fields:', obj.Fields);
         return obj.Fields.map((field: any) => {
             return field.map((field: any) => {
            if (field && field.Case === 'String' && Array.isArray(field.Fields) && field.Fields.length > 0) {
                // console.log(field.Fields[0].trim());
                return field.Fields[0].trim();
            }
             })
         }).filter((item: any) => item !== null);
        
    }
    return [];
}

export function convertToSModel(data: any): SModel {
    const sModel: SModel = {
        type: 'graph',
        id: 'root',
        children: []
    };

    const nodeData = logObject(data.Node);
    const edgeData = logObject(data.Edge);
    // console.log('nodeData:', nodeData);
    // console.log('edgeData:', edgeData);

    // Process nodes
    nodeData.forEach((nodeGroup: string[]) => {
        const parsedNodes = nodeGroup.map((nodeItem: string) => {
            const parsedProps = parseNodeProperties(nodeItem);
            // console.log('Parsed Node:', parsedProps);
            const { id, ...otherProps } = parsedProps; // Destructure to get id and other properties
            return {
                type: 'node',
                id: id!,
                children: [],
                ...otherProps
            } as GraphNode;
        });
        sModel.children.push(...parsedNodes);
    });

    // Process edges
    edgeData.forEach((edgeGroup: string[]) => {
        const parsedEdges = edgeGroup.map((edgeItem: string) => {
            const edgeProps = parseEdgeProperties(edgeItem);
            // console.log('Parsed Edge:', edgeProps);
            const { sourceId, targetId, ...otherProps } = edgeProps; // Adjust based on actual edge properties
            return {
                type: 'edge',
                // id: `${sourceId}-${targetId}`,
                sourceId: sourceId!,
                targetId: targetId!,
                ...otherProps
            } as GraphEdge;
        });
        sModel.children.push(...parsedEdges);
    });

    // console.log('Final SModel:', sModel);
    return sModel;
}