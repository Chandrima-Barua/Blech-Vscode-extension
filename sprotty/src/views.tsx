/** @jsx svg */
import { svg } from 'sprotty/lib/lib/jsx';
import { injectable } from 'inversify';
import { VNode } from 'snabbdom';
import { IView, RenderingContext, SNodeImpl } from 'sprotty';
import { GraphNode } from './models';

@injectable()
export class GNodeView implements IView {
    render(node: Readonly<SNodeImpl & GraphNode>, context: RenderingContext): VNode {
        const position = 50;
        return <g>
            <rect class-sprotty-node={true} class-task={true}
                class-running={node.label} 
                class-finished={node.id}
                width={node.size.width}
                height={node.size.height}
            >
                <h1>Hello</h1>
            </rect>
            <text x={position} y={position + 5}>{node.id}</text>
        </g>;
    }
}