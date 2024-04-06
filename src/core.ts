import { ComponentNode, VirtualNode } from './dom'

/**
 * Creates a virtual DOM node.
 * @param {string | Function} tagName - The tag name or component function for the node.
 * @param {Object} props - The properties object for the node.
 * @param {...any} children - Child nodes or components.
 * @returns {VirtualNode} - The created virtual DOM node.
 */
export const createElement = (tagName: string | Function, props: any, ...children: any[]): VirtualNode => {
    
    let node: VirtualNode;
    if (typeof tagName === 'string') {
        // If tagName is a string, create a VirtualNode
        node = new VirtualNode(tagName, props);
    } else {
        // If tagName is a function, create a ComponentNode
        node = new ComponentNode(tagName, props);
    }

    if (Array.isArray(children)) {
        // If children is an array, iterate through each child
        children.forEach((child) => {
            node.addChild(child);
        });
    } else if (children) {
        // If children is not an array but a single child, add it directly
        node.addChild(children);
    }

    return node;
}
