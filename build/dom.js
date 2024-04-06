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
var VirtualNode = /** @class */ (function () {
    function VirtualNode(tagName, props) {
        this.children = [];
        this.tagName = tagName;
        this.props = props !== null && props !== void 0 ? props : {};
    }
    VirtualNode.prototype.addChild = function (node) {
        if (node instanceof VirtualNode) {
            node.parent = this;
        }
        this.children.push(node);
    };
    VirtualNode.prototype.hasParent = function () {
        return (!!this.parent);
    };
    VirtualNode.prototype.getChildren = function () {
        return this.children;
    };
    VirtualNode.prototype.getProps = function () {
        return this.props;
    };
    VirtualNode.prototype.getTagName = function () {
        return this.tagName;
    };
    VirtualNode.prototype.toString = function () {
        var _a = this, tagName = _a.tagName, props = _a.props, children = _a.children;
        var html = "<".concat(tagName, " ");
        if (props) {
            Object.keys(props).forEach(function (key) {
                if (key.toLowerCase() === key) {
                    html += "".concat(key, "=\"").concat(props[key], "\" ");
                }
                else {
                    switch (true) {
                        case key === 'className':
                            html += "class=\"".concat(props[key], "\" ");
                            break;
                        case key.substring(0, 2) === 'on':
                            html += "".concat(key.toLowerCase(), "=\"alert('Not implemented yet')\" ");
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
                html += child.toString();
            });
        }
        else if (children) {
            html += children.toString();
        }
        html += "</".concat(tagName, ">");
        if (!this.hasParent()) {
            // this is the root element.
            // we need a per request instance that builds the CSS & JS,
            // rather than adding continously.     
        }
        return html;
    };
    return VirtualNode;
}());
exports.VirtualNode = VirtualNode;
var ComponentNode = /** @class */ (function (_super) {
    __extends(ComponentNode, _super);
    function ComponentNode(component, props) {
        var _this = _super.call(this, '#component', props) || this;
        _this.component = component;
        return _this;
    }
    ComponentNode.prototype.toString = function () {
        return this.component(this.props);
    };
    return ComponentNode;
}(VirtualNode));
exports.ComponentNode = ComponentNode;
