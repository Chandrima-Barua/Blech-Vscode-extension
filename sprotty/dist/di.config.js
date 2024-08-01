"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContainer = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const views_1 = require("./views");
const createContainer = (containerId) => {
    const myModule = new inversify_1.ContainerModule(async (bind, unbind, isBound, rebind) => {
        bind(sprotty_1.TYPES.ModelSource).to(sprotty_1.LocalModelSource).inSingletonScope();
        const context = { bind, unbind, isBound, rebind };
        (0, sprotty_1.configureModelElement)(context, 'graph', sprotty_1.SGraphImpl, sprotty_1.SGraphView);
        (0, sprotty_1.configureModelElement)(context, 'node', sprotty_1.SNodeImpl, views_1.GNodeView);
        (0, sprotty_1.configureModelElement)(context, 'edge', sprotty_1.SEdgeImpl, views_1.GEdgeView);
        // configureModelElement(context, 'label', SLabelImpl, SLabelView);
        (0, sprotty_1.configureViewerOptions)(context, {
            needsClientLayout: false,
            baseDiv: containerId
        });
    });
    const container = new inversify_1.Container();
    (0, sprotty_1.loadDefaultModules)(container);
    container.load(myModule);
    return container;
};
exports.createContainer = createContainer;
