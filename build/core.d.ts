import { HtmlTagName, VirtualNode } from './dom';
/**
 * Creates a virtual DOM node.
 * @param {string | Function} tagName - The tag name or component function for the node.
 * @param {Object} props - The properties object for the node.
 * @param {...any} children - Child nodes or components.
 * @returns {VirtualNode} - The created virtual DOM node.
 */
export declare const createElement: (tagName: HtmlTagName | Function, props: any, ...children: any[]) => VirtualNode;
