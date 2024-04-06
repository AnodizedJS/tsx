export type Scalar = null | undefined | string | number | boolean | object;
export declare class VirtualNode {
    protected parent?: VirtualNode;
    protected tagName: string;
    protected props: Record<string, any>;
    protected children: (VirtualNode | Scalar)[];
    constructor(tagName: string, props?: Record<string, any>);
    addChild(node: VirtualNode | Scalar): void;
    hasParent(): boolean;
    getChildren(): (Scalar | VirtualNode)[];
    getProps(): Record<string, any>;
    getTagName(): string;
    toString(): string;
}
export declare class ComponentNode extends VirtualNode {
    private component;
    constructor(component: Function, props?: Record<string, any>);
    toString(): string;
}
