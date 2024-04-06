import { createElement } from './core';

/**
 * AnodizedTSX is a utility for creating virtual DOM elements.
 */
export const AnodizedTSX = {
    /**
     * Creates a virtual DOM element using the provided tagName, props, and children.
     * @param {string | Function} tagName - The tag name or component function for the virtual DOM element.
     * @param {Object} props - The properties object for the virtual DOM element.
     * @param {...any} children - Child nodes or components.
     * @returns {VirtualNode} - The created virtual DOM element.
     */
    createElement
};

export * from './plugin/css';