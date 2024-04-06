export type Scalar = null | undefined | string | number | boolean | object;

/**
 * Represents a virtual DOM node.
 */
export class VirtualNode {
    /** The parent node of this virtual node. */
    protected parent?: VirtualNode;
    /** The tag name of the virtual node. */
    protected tagName: string;
    /** The properties of the virtual node. */
    protected props: Record<string, any>;
    /** The children of the virtual node. */
    protected children: (VirtualNode | Scalar)[] = [];

    /**
     * Creates an instance of VirtualNode.
     * @param {string} tagName - The tag name of the virtual node.
     * @param {Record<string, any>} [props] - The properties of the virtual node.
     */
    public constructor(tagName: string, props?: Record<string, any>) {
        this.tagName = tagName;
        this.props = props ?? {};
    }

    /**
     * Adds a child node to the virtual node.
     * @param {VirtualNode | Scalar} node - The child node to add.
     */
    public addChild(node: VirtualNode | Scalar): void {
        if (node instanceof VirtualNode) {
            node.parent = this;
        }
        this.children.push(node);
    }

    /**
     * Checks if the virtual node has a parent.
     * @returns {boolean} - Indicates whether the virtual node has a parent.
     */
    public hasParent(): boolean {
        return !!this.parent;
    }

    /**
     * Gets the children of the virtual node.
     * @returns {(VirtualNode | Scalar)[]} - The children of the virtual node.
     */
    public getChildren(): (VirtualNode | Scalar)[] {
        return this.children;
    }

    /**
     * Gets the properties of the virtual node.
     * @returns {Record<string, any>} - The properties of the virtual node.
     */
    public getProps(): Record<string, any> {
        return this.props;
    }

    /**
     * Gets the tag name of the virtual node.
     * @returns {string} - The tag name of the virtual node.
     */
    public getTagName(): string {
        return this.tagName;
    }

    /**
     * Converts the virtual node to a string representation.
     * @returns {string} - The string representation of the virtual node.
     */
    public toString(): string {
        // Implementation omitted for brevity
        return "";
    }
}

/**
 * Represents a component node extending VirtualNode.
 */
export class ComponentNode extends VirtualNode {
    /**
     * Creates an instance of ComponentNode.
     * @param {Function} component - The component function.
     * @param {Record<string, any>} [props] - The properties of the component node.
     */
    public constructor(private component: Function, props?: Record<string, any>) {
        super('#component', props);
    }

    /**
     * Converts the component node to a string representation.
     * @returns {string} - The string representation of the component node.
     */
    public toString(): string {
        return this.component(this.props);
    }
}
