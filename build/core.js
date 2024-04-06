"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElement = void 0;
var dom_1 = require("./dom");
var createElement = function (tagName, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    var node;
    if (typeof tagName === 'string') {
        node = new dom_1.VirtualNode(tagName, props);
    }
    else {
        node = new dom_1.ComponentNode(tagName, props);
    }
    if (Array.isArray(children)) {
        children.forEach(function (child) {
            node.addChild(child);
        });
    }
    else if (children) {
        node.addChild(children);
    }
    return node;
};
exports.createElement = createElement;
