"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectStyle = exports.toCss = void 0;
function caseConverter(str) {
    if (str.length === 0)
        return str;
    var isUppercase = str[0] === str[0].toUpperCase();
    var result = str
        .split(/(?=[A-Z])/)
        .join("-")
        .toLowerCase();
    return isUppercase ? "-" + result : result;
}
function toCss(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
        throw new TypeError("expected an argument of type object, but got " + typeof obj);
    }
    var lines = [];
    for (var index = 0; index < Object.keys(obj).length; index++) {
        var id = Object.keys(obj)[index];
        var key = caseConverter(id);
        var value = obj[id];
        if (typeof value === "object") {
            var text = toCss(value);
            lines.push(id + "{" + text + "}");
        }
        else {
            lines.push(key + ":" + value + ";");
        }
    }
    return lines.join("");
}
exports.toCss = toCss;
function injectStyle(textOrObject, id, overridable, hostElement) {
    if (overridable === void 0) { overridable = true; }
    if (hostElement === void 0) { hostElement = document.head; }
    if (!textOrObject || Array.isArray(textOrObject))
        return;
    if (typeof textOrObject === 'string' && textOrObject.length === 0)
        return;
    if (id) {
        var oldStyle = document.getElementById(id);
        if (oldStyle) {
            var isStyleTag = oldStyle.tagName.toLowerCase() === "style";
            if (!isStyleTag) {
                throw new Error("The provided id does not indicate a style tag.");
            }
            else if (isStyleTag && overridable) {
                oldStyle.innerHTML = typeof textOrObject === "object" ? toCss(textOrObject) : textOrObject;
            }
            return;
        }
    }
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = typeof textOrObject === "object" ? toCss(textOrObject) : textOrObject;
    if (id)
        style.id = id;
    hostElement.appendChild(style);
}
exports.injectStyle = injectStyle;
