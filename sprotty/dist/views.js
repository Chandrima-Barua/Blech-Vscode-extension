"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEdgeView = exports.GNodeView = void 0;
/** @jsx svg */
const jsx_1 = require("sprotty/lib/lib/jsx");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
let GNodeView = class GNodeView {
    render(node, context) {
        const position = 50;
        return (0, jsx_1.svg)("g", null,
            (0, jsx_1.svg)("rect", { "class-sprotty-node": true, "class-task": true, 
                // class-running={node.label}
                // class-finished={node.id}
                width: node.size.width, height: node.size.height }),
            (0, jsx_1.svg)("text", { x: position, y: position + 5, fontcolor: node.fontcolor }, node.label));
    }
};
GNodeView = __decorate([
    (0, inversify_1.injectable)()
], GNodeView);
exports.GNodeView = GNodeView;
let GEdgeView = class GEdgeView extends sprotty_1.PolylineEdgeView {
    render(edge, context) {
        const points = edge.routingPoints;
        return ((0, jsx_1.svg)("g", null,
            (0, jsx_1.svg)("text", { "class-sprotty-edge": true, "text-anchor": "middle", "dominant-baseline": "central" }, edge.text)));
    }
};
GEdgeView = __decorate([
    (0, inversify_1.injectable)()
], GEdgeView);
exports.GEdgeView = GEdgeView;
// export class GEdgeView extends PolylineEdgeView {
//     render(edge: Readonly<SEdgeImpl & GraphEdge>, context: RenderingContext): VNode {
//         const points = edge.routingPoints;
//         const base = super.render(edge, context) as VNode;
//         // Render the label if the edge has a text property
//         const labelNode = edge.text ? this.renderLabel(edge, context) : null;
//         return (
//             <g>
//                 <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} class-sprotty-edge="true" />
//                 {labelNode}
//                 {base}
//             </g>
//         );
//     }
//     protected renderLabel(edge: Readonly<SEdgeImpl & GraphEdge>, context: RenderingContext): VNode {
//         const midIndex = Math.floor(edge.routingPoints.length / 2);
//         const midPoint = edge.routingPoints[midIndex];
//         return (
//             <text
//                 class-sprotty-edge="true"
//                 x={midPoint.x}
//                 y={midPoint.y}
//                 text-anchor="middle"
//                 dominant-baseline="central"
//             >
//                 {edge.text}
//             </text>
//         );
//     }
// }
