"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentStyle = exports.CssMap = exports.AnodizedCssPlugin = void 0;
var AnodizedCssPlugin = /** @class */ (function () {
    function AnodizedCssPlugin() {
    }
    AnodizedCssPlugin.prototype.onBeforeResponse = function (event) {
        event.outputBuffer += CssMap.getFullCss();
        return event;
    };
    return AnodizedCssPlugin;
}());
exports.AnodizedCssPlugin = AnodizedCssPlugin;
var CssMap = /** @class */ (function () {
    function CssMap() {
    }
    CssMap.getFullCss = function () {
        var html = ''; // initialise with empty.
        // other css loading mechanisms here.
        if (Object.keys(CssMap.componentCss).length != 0) {
            // add component css last as we want this to be the "governing" ruleset.
            html += "<style>".concat(Object.values(CssMap.componentCss).join('\n\n'), "</style>");
        }
        return html.replace('<style></style>', '').replace('<script></script>', '');
    };
    CssMap.componentCss = {};
    return CssMap;
}());
exports.CssMap = CssMap;
function ComponentStyle(key, source) {
    CssMap.componentCss[key] = source;
}
exports.ComponentStyle = ComponentStyle;
