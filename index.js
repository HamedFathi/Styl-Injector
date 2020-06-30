"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCss = exports.injectStyle = void 0;
function injectStyle(text, id, hostElement, overridable) {
    if (hostElement === void 0) { hostElement = document.head; }
    if (overridable === void 0) { overridable = true; }
    if (!text || Array.isArray(text))
        return;
    var css = "";
    css = typeof text === "object" ? toCss(text) : text;
    if (css.length === 0)
        return;
    if (id) {
        var oldStyle = document.getElementById(id);
        if (oldStyle) {
            var isStyleTag = oldStyle.tagName.toLowerCase() === "style";
            if (isStyleTag && overridable) {
                oldStyle.innerHTML = css;
                return;
            }
            else {
                throw new Error("The provided id does not indicate a style tag.");
            }
        }
    }
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    if (id)
        style.id = id;
    hostElement.appendChild(style);
}
exports.injectStyle = injectStyle;
function toCss(styleObj) {
    if (!styleObj || typeof styleObj !== "object" || Array.isArray(styleObj)) {
        throw new TypeError("expected an argument of type object, but got " + typeof styleObj);
    }
    var lines = [];
    for (var index = 0; index < Object.keys(styleObj).length; index++) {
        var id = Object.keys(styleObj)[index];
        var key = caseConverter(id);
        var value = styleObj[id];
        if (typeof value === "object") {
            var text = toCss(value);
            lines.push(key + " { " + text + " }");
        }
        else {
            lines.push(key + ": " + value + ";");
        }
    }
    return lines.join("\n");
}
exports.toCss = toCss;
function caseConverter(str) {
    if (str.length === 0)
        return str;
    if (str[0] === "!")
        return str.substr(1);
    return str
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase();
}
var converted = {
    ".main-wrapper": { flexDirection: "row", display: "flex", flex: "1" },
    "#content": { flex: "1" },
    ul: { padding: "20px 0", flex: "1" },
    li: { fontFamily: "'Lato'", color: "whitesmoke", lineHeight: "44px" },
};
console.log(toCss(converted));
//# sourceMappingURL=index.js.map