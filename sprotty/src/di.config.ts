import { Container, ContainerModule } from 'inversify';
import { configureModelElement, configureViewerOptions, loadDefaultModules, LocalModelSource, PolylineEdgeView, SEdgeImpl, SGraphImpl, SGraphView, SLabelImpl, SLabelView, SNodeImpl, TYPES } from 'sprotty';
import { GNodeView, GEdgeView } from './views';

export const createContainer = (containerId: string) => {
    const myModule = new ContainerModule(async (bind, unbind, isBound, rebind) => {
        bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();

        const context = { bind, unbind, isBound, rebind };
        configureModelElement(context, 'graph', SGraphImpl, SGraphView);
        configureModelElement(context, 'node', SNodeImpl, GNodeView);
        configureModelElement(context, 'edge', SEdgeImpl, GEdgeView);
        // configureModelElement(context, 'label', SLabelImpl, SLabelView);

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