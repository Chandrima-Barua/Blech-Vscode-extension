import { Container, ContainerModule } from 'inversify';
import { configureModelElement, configureViewerOptions, loadDefaultModules, LocalModelSource, PolylineEdgeView, PolylineEdgeViewWithGapsOnIntersections, SBezierCreateHandleView, SEdgeImpl, SGraphImpl, SGraphView, SLabelImpl, SLabelView, SNodeImpl, SPortImpl, TYPES } from 'sprotty';
import { GNodeView, GEdgeView } from './views';

export const createContainer = (containerId: string) => {
    const myModule = new ContainerModule(async (bind, unbind, isBound, rebind) => {
        // for internal model source
        bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
        // for external model source
        // bind(TYPES.ModelSource).to(WebSocketDiagramServerProxy).inSingletonScope();
        const context = { bind, unbind, isBound, rebind };
        configureModelElement(context, 'graph', SGraphImpl, SGraphView);
        configureModelElement(context, 'node', SNodeImpl, GNodeView);
        configureModelElement(context, 'edge', SEdgeImpl, GEdgeView);

        configureViewerOptions(context, {
            needsClientLayout: false,
            baseDiv: containerId
        });
    });

    const container = new Container();
    loadDefaultModules(container);
    container.load(myModule);
    return container;
};
