/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { inject, injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { EdgeRouterRegistry, isEdgeLayoutable, IView, IViewArgs, PointToPointLine, PolylineEdgeView, RenderingContext, SEdgeImpl, setAttr, ShapeView, SLabelImpl, SLabelView, SNodeImpl } from 'sprotty';
import { GraphEdge, GraphNode } from './models';
import { SLabel } from 'sprotty-protocol'
@injectable()
export class GNodeView implements IView {
    render(node: Readonly<SNodeImpl & GraphNode>, context: RenderingContext): VNode | undefined {
        const position = 50;
            return <g>
                <rect class-sprotty-node={true} class-task={true}
                    // class-running={node.label}
                    // class-finished={node.id}
                    width={node.size.width}
                    height={node.size.height}
                >
                </rect>
                {/* const vnode = <g class-sprotty-node={true}>
                   <rect class-running={node.label} class-finished={node.id}
                        x={0} y={0}
                        width={Math.max(0, node.bounds.width)} height={Math.max(0, node.bounds.height)} />
                   {context.renderChildren(node)}
                
                <ellipse cx="100" cy="50" rx="100" ry="50" fill="yellow" /> 
                <circle cx={node.position.x + 50} cy={node.position.y + 25} r={20} fill="blue" />  */}

                <text x={position} y={position + 5} fontcolor={node.fontcolor}>{node.label}</text>
                
            </g>;
            
        }
    }

@injectable()
export class GEdgeView extends PolylineEdgeView {
    @inject(EdgeRouterRegistry)
    edgeRouterRegistry!: EdgeRouterRegistry;

    render(edge: Readonly<SEdgeImpl & GraphEdge>, context: RenderingContext): VNode | undefined {
        const baseRender = super.render(edge, context);
        const route = this.edgeRouterRegistry.route(edge);
        const midPoint = calculateMidpoint(route);
        const textElement = <text class-sprotty-edge={true} text-anchor="middle" dominant-baseline="central" x={midPoint.x} y={midPoint.y}>
            {edge.text}
        </text>;
        if (baseRender) {
            return <g>
                {baseRender}
                {textElement}
            </g>;
        } else {
            return textElement;
        }
    }
    
}
// Function to calculate the midpoint of a route
    function calculateMidpoint(route: { x: number, y: number }[]): { x: number, y: number } {
    if (route.length === 0) {
        return { x: 0, y: 0 };
    }
    const totalLength = route.reduce((acc, point, index) => {
        if (index === 0) return acc;
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
