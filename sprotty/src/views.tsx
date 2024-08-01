/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { IView, PolylineEdgeView, RenderingContext, SEdgeImpl, SLabelView, SNodeImpl } from 'sprotty';
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
    render(edge: Readonly<SEdgeImpl & GraphEdge>, context: RenderingContext): VNode {
        
        const points = edge.routingPoints;
        return (
            <g>
                {/* <polyline points={points.map(p => `${p.x},${p.y}`).join(' ')} class-sprotty-edge={true} /> */}
                <text class-sprotty-edge={true} text-anchor="middle" dominant-baseline="central">
                    {edge.text}
                </text>
            </g>
        );
    }
    
}

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