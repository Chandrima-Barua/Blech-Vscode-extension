"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSModel = void 0;
// Function to parse node properties
function parseNodeProperties(props) {
    if (typeof props !== 'string') {
        throw new Error(`Invalid type for node properties: expected string but received ${typeof props}`);
    }
    const properties = {};
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
function parseEdgeProperties(props) {
    if (typeof props !== 'string') {
        throw new Error(`Invalid type for edge properties: expected string but received ${typeof props}`);
    }
    const edgeProps = {};
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
function logObject(obj) {
    if (obj && obj.Case === 'Array' && Array.isArray(obj.Fields)) {
        // console.log('logObject - Valid Case and Fields:', obj.Fields);
        return obj.Fields.map((field) => {
            return field.map((field) => {
                if (field && field.Case === 'String' && Array.isArray(field.Fields) && field.Fields.length > 0) {
                    // console.log(field.Fields[0].trim());
                    return field.Fields[0].trim();
                }
            });
        }).filter((item) => item !== null);
    }
    return [];
}
function convertToSModel(data) {
    const sModel = {
        type: 'graph',
        id: 'root',
        children: []
    };
    const nodeData = logObject(data.Node);
    const edgeData = logObject(data.Edge);
    // console.log('nodeData:', nodeData);
    // console.log('edgeData:', edgeData);
    // Process nodes
    nodeData.forEach((nodeGroup) => {
        const parsedNodes = nodeGroup.map((nodeItem) => {
            const parsedProps = parseNodeProperties(nodeItem);
            // console.log('Parsed Node:', parsedProps);
            const { id, ...otherProps } = parsedProps; // Destructure to get id and other properties
            return {
                type: 'node',
                id: id,
                children: [],
                ...otherProps
            };
        });
        sModel.children.push(...parsedNodes);
    });
    // Process edges
    edgeData.forEach((edgeGroup) => {
        const parsedEdges = edgeGroup.map((edgeItem) => {
            const edgeProps = parseEdgeProperties(edgeItem);
            // console.log('Parsed Edge:', edgeProps);
            const { sourceId, targetId, ...otherProps } = edgeProps; // Adjust based on actual edge properties
            return {
                type: 'edge',
                // id: `${sourceId}-${targetId}`,
                sourceId: sourceId,
                targetId: targetId,
                ...otherProps
            };
        });
        sModel.children.push(...parsedEdges);
    });
    // console.log('Final SModel:', sModel);
    return sModel;
}
exports.convertToSModel = convertToSModel;
