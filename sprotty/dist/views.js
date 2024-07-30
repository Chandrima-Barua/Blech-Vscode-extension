"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GNodeView = void 0;
/** @jsx svg */
const jsx_1 = require("sprotty/lib/lib/jsx");
const inversify_1 = require("inversify");
let GNodeView = class GNodeView {
    render(node, context) {
        const position = 50;
        return (0, jsx_1.svg)("g", null,
            (0, jsx_1.svg)("rect", { "class-sprotty-node": true, "class-task": true, "class-running": node.label, "class-finished": node.id, width: node.size.width, height: node.size.height },
                (0, jsx_1.svg)("h1", null, "Hello")),
            (0, jsx_1.svg)("text", { x: position, y: position + 5 }, node.id));
    }
};
GNodeView = __decorate([
    (0, inversify_1.injectable)()
], GNodeView);
exports.GNodeView = GNodeView;
