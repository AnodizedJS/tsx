"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentNode = exports.VirtualNode = void 0;
// for function binding.
var generateRandomString = function (length) {
    if (length === void 0) { length = 6; }
    return Math.random().toString(20).substr(2, length);
};
/**
 * Represents a virtual DOM node.
 */
var VirtualNode = /** @class */ (function () {
    /**
     * Creates an instance of VirtualNode.
     * @param {string} tagName - The tag name of the virtual node.
     * @param {Record<string, any>} [props] - The properties of the virtual node.
     */
    function VirtualNode(tagName, props) {
        /** The children of the virtual node. */
        this.children = [];
        this.tagName = tagName;
        this.props = props !== null && props !== void 0 ? props : {};
    }
    /**
     * Adds a child node to the virtual node.
     * @param {VirtualNode | Scalar} node - The child node to add.
     */
    VirtualNode.prototype.addChild = function (node) {
        if (node instanceof VirtualNode) {
            node.parent = this;
        }
        this.children.push(node);
        this.props.children = this.children;
    };
    /**
     * Checks if the virtual node has a parent.
     * @returns {boolean} - Indicates whether the virtual node has a parent.
     */
    VirtualNode.prototype.hasParent = function () {
        return !!this.parent;
    };
    /**
     * Gets the children of the virtual node.
     * @returns {(VirtualNode | Scalar)[]} - The children of the virtual node.
     */
    VirtualNode.prototype.getChildren = function () {
        return this.children;
    };
    /**
     * Gets the properties of the virtual node.
     * @returns {Record<string, any>} - The properties of the virtual node.
     */
    VirtualNode.prototype.getProps = function () {
        return this.props;
    };
    /**
     * Gets the tag name of the virtual node.
     * @returns {string} - The tag name of the virtual node.
     */
    VirtualNode.prototype.getTagName = function () {
        return this.tagName;
    };
    /**
     * Converts the virtual node to a string representation.
     * @returns {string} - The string representation of the virtual node.
     */
    VirtualNode.prototype.toString = function () {
        var _a = this, tagName = _a.tagName, props = _a.props, children = _a.children;
        var html = "<".concat(tagName, " ");
        var funcMap = {};
        if (props) {
            Object.keys(props).forEach(function (key) {
                if (key === 'children') {
                    return;
                }
                if (key.toLowerCase() === key) {
                    html += "".concat(key, "=\"").concat(props[key], "\" ");
                }
                else {
                    switch (true) {
                        case key === 'className':
                            html += "class=\"".concat(props[key], "\" ");
                            break;
                        case key.substring(0, 2) === 'on':
                            var funcKey = 'func' + generateRandomString(10);
                            funcMap[funcKey] = props[key];
                            if (typeof props[key] === 'function') {
                                html += "".concat(key.toLowerCase(), "=\"").concat(funcKey, "(event)\" ");
                            }
                            else {
                                html += "".concat(key.toLowerCase(), "=\"console.error('This attribute only takes a function, ").concat(typeof props[key], " supplied')");
                            }
                            break;
                        default:
                            html += "".concat(key, "=\"").concat(props[key], "\" ");
                            break;
                    }
                }
            });
        }
        html += ">";
        if (children && Array.isArray(children)) {
            children.forEach(function (child) {
                if (child) {
                    if (Array.isArray(child)) {
                        html += child.join('');
                        return;
                    }
                    html += child.toString();
                }
            });
        }
        else if (children) {
            html += children.toString();
        }
        html += "</".concat(tagName, ">");
        if (Object.keys(funcMap).length != 0) {
            html += "<script>";
            Object.keys(funcMap).forEach(function (key) {
                html += "window.".concat(key, " = ").concat(funcMap[key], ";");
            });
            html += "</script>";
        }
        return html;
    };
    return VirtualNode;
}());
exports.VirtualNode = VirtualNode;
/**
 * Represents a component node extending VirtualNode.
 */
var ComponentNode = /** @class */ (function (_super) {
    __extends(ComponentNode, _super);
    /**
     * Creates an instance of ComponentNode.
     * @param {Function} component - The component function.
     * @param {Record<string, any>} [props] - The properties of the component node.
     */
    function ComponentNode(component, props) {
        var _this = _super.call(this, '#component', props) || this;
        _this.component = component;
        return _this;
    }
    /**
     * Converts the component node to a string representation.
     * @returns {string} - The string representation of the component node.
     */
    ComponentNode.prototype.toString = function () {
        return this.component(this.props);
    };
    return ComponentNode;
}(VirtualNode));
exports.ComponentNode = ComponentNode;
