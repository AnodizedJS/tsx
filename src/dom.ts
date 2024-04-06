import { EvaluateFunc } from "./lib";

export type Scalar = null | undefined | string | number | boolean | object;

// for function binding.
const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length)

/**
 * Represents a virtual DOM node.
 */
export class VirtualNode {
    /** The parent node of this virtual node. */
    protected parent?: VirtualNode;
    /** The tag name of the virtual node. */
    protected tagName: HtmlTagName;
    /** The properties of the virtual node. */
    protected props: Record<string, any>;
    /** The children of the virtual node. */
    protected children: (VirtualNode | Scalar)[] = [];

    /**
     * Creates an instance of VirtualNode.
     * @param {string} tagName - The tag name of the virtual node.
     * @param {Record<string, any>} [props] - The properties of the virtual node.
     */
    public constructor(tagName: HtmlTagName, props?: Record<string, any>) {
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

        this.props.children = this.children;
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
    public getTagName(): HtmlTagName {
        return this.tagName;
    }

    /**
     * Converts the virtual node to a string representation.
     * @returns {string} - The string representation of the virtual node.
     */
    public toString(): string {
        const { tagName, props, children } = this;

        let html = `<${tagName} `;

        const funcMap:Record<string,EvaluateFunc<any>> = {};

        if (props) {

            Object.keys(props).forEach((key: string) => {

                if (key === 'children') {
                    return;
                }
                if (key.toLowerCase() === key) {
                    html += `${key}="${props[key]}" `;
                } else {
                    switch (true) {
                        case key === 'className':
                            html += `class="${props[key]}" `;
                            break;
                        case key.substring(0, 2) === 'on':

                            const funcKey = 'func' + generateRandomString(10);

                            funcMap[funcKey] = props[key];

                            if (typeof props[key] === 'function') {
                                html += `${key.toLowerCase()}="${funcKey}(event)" `;
                            } else {
                                html += `${key.toLowerCase()}="console.error('This attribute only takes a function, ${typeof props[key]} supplied')`;
                            }
                            break;
                        default:
                            html += `${key}="${props[key]}" `;
                            break;
                    }
                }
            })
        }

        html += `>`;

        if (children && Array.isArray(children)) {
            children.forEach(child => {
                if (child) {
                    if (Array.isArray(child)) {
                        html += child.join('');
                        return;
                    }
                    html += child.toString();
                }
            });
        } else if (children) {
            html += children.toString();
        }

        html += `</${tagName}>`;

        if (Object.keys(funcMap).length != 0) {
            html += `<script>`;
            Object.keys(funcMap).forEach((key: string) => {
                html += `window.${key} = ${funcMap[key]};`;
            })
            html += `</script>`;
        }

        return html;
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

export type HtmlTagName = '#component' | 'div' | 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 
'b' | 'base' | 'bdi' | 'bdo' | 'blockquote' | 'body' | 'br' | 'button' | 
'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 
'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 
'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 
'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 
'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 
'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'meta' | 
'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 
'output' | 'p' | 'param' | 'picture' | 'pre' | 'progress' | 'q' | 'rp' | 
'rt' | 'ruby' | 's' | 'samp' | 'script' | 'section' | 'select' | 'slot' | 
'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 
'sup' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 
'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 
'video' | 'wbr';
