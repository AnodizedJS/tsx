export type Scalar = null | undefined | string | number | boolean | object;
/**
 * Represents a virtual DOM node.
 */
export declare class VirtualNode {
    /** The parent node of this virtual node. */
    protected parent?: VirtualNode;
    /** The tag name of the virtual node. */
    protected tagName: HtmlTagName;
    /** The properties of the virtual node. */
    protected props: Record<string, any>;
    /** The children of the virtual node. */
    protected children: (VirtualNode | Scalar)[];
    /**
     * Creates an instance of VirtualNode.
     * @param {string} tagName - The tag name of the virtual node.
     * @param {Record<string, any>} [props] - The properties of the virtual node.
     */
    constructor(tagName: HtmlTagName, props?: Record<string, any>);
    /**
     * Adds a child node to the virtual node.
     * @param {VirtualNode | Scalar} node - The child node to add.
     */
    addChild(node: VirtualNode | Scalar): void;
    /**
     * Checks if the virtual node has a parent.
     * @returns {boolean} - Indicates whether the virtual node has a parent.
     */
    hasParent(): boolean;
    /**
     * Gets the children of the virtual node.
     * @returns {(VirtualNode | Scalar)[]} - The children of the virtual node.
     */
    getChildren(): (VirtualNode | Scalar)[];
    /**
     * Gets the properties of the virtual node.
     * @returns {Record<string, any>} - The properties of the virtual node.
     */
    getProps(): Record<string, any>;
    /**
     * Gets the tag name of the virtual node.
     * @returns {string} - The tag name of the virtual node.
     */
    getTagName(): HtmlTagName;
    /**
     * Converts the virtual node to a string representation.
     * @returns {string} - The string representation of the virtual node.
     */
    toString(): string;
}
/**
 * Represents a component node extending VirtualNode.
 */
export declare class ComponentNode extends VirtualNode {
    private component;
    /**
     * Creates an instance of ComponentNode.
     * @param {Function} component - The component function.
     * @param {Record<string, any>} [props] - The properties of the component node.
     */
    constructor(component: Function, props?: Record<string, any>);
    /**
     * Converts the component node to a string representation.
     * @returns {string} - The string representation of the component node.
     */
    toString(): string;
}
export type HtmlTagName = '#component' | 'div' | 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'bdi' | 'bdo' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'slot' | 'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr';
