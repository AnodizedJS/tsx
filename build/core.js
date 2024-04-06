"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = void 0;
var dom_1 = require("./dom");
/**
 * Creates a virtual DOM node.
 * @param {string | Function} tagName - The tag name or component function for the node.
 * @param {Object} props - The properties object for the node.
 * @param {...any} children - Child nodes or components.
 * @returns {VirtualNode} - The created virtual DOM node.
 */
var createElement = function (tagName, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var node;
    if (typeof tagName === 'string') {
        // If tagName is a string, create a VirtualNode
        node = new dom_1.VirtualNode(tagName, props);
    }
    else {
        // If tagName is a function, create a ComponentNode
        node = new dom_1.ComponentNode(tagName, props);
    }
    if (Array.isArray(children)) {
        // If children is an array, iterate through each child
        children.forEach(function (child) {
            node.addChild(child);
        });
    }
    else if (children) {
        // If children is not an array but a single child, add it directly
        node.addChild(children);
    }
    return node;
};
exports.createElement = createElement;
