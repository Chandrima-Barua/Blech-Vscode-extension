"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
        const baseRender = super.render(edge, context);
        const route = this.edgeRouterRegistry.route(edge);
        const midPoint = calculateMidpoint(route);
        const textElement = (0, jsx_1.svg)("text", { "class-sprotty-edge": true, "text-anchor": "middle", "dominant-baseline": "central", x: midPoint.x, y: midPoint.y }, edge.text);
        if (baseRender) {
            return (0, jsx_1.svg)("g", null,
                baseRender,
                textElement);
        }
        else {
            return textElement;
        }
    }
};
__decorate([
    (0, inversify_1.inject)(sprotty_1.EdgeRouterRegistry),
    __metadata("design:type", sprotty_1.EdgeRouterRegistry)
], GEdgeView.prototype, "edgeRouterRegistry", void 0);
GEdgeView = __decorate([
    (0, inversify_1.injectable)()
], GEdgeView);
exports.GEdgeView = GEdgeView;
// Function to calculate the midpoint of a route
function calculateMidpoint(route) {
    if (route.length === 0) {
        return { x: 0, y: 0 };
    }
    const totalLength = route.reduce((acc, point, index) => {
        if (index === 0)
            return acc;
        const dx = point.x - route[index - 1].x;
        const dy = point.y - route[index - 1].y;
        return acc + Math.sqrt(dx * dy + dy * dy);
    }, 0);
    let halfLength = totalLength / 2;
    for (let i = 1; i < route.length; i++) {
        const dx = route[i].x - route[i - 1].x;
        const dy = route[i].y - route[i - 1].y;
        const segmentLength = Math.sqrt(dx * dx + dy * dy);
        if (halfLength <= segmentLength) {
            const ratio = halfLength / segmentLength;
            return {
                x: route[i - 1].x + ratio * dx,
                y: route[i - 1].y + ratio * dy
            };
        }
        halfLength -= segmentLength;
    }
    return route[route.length - 1];
}
