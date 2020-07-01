"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCss = exports.injectStyle = void 0;
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
function injectStyle(textOrObj, id, overridable, hostElement) {
    if (overridable === void 0) { overridable = true; }
    if (hostElement === void 0) { hostElement = document.head; }
    if (!textOrObj || Array.isArray(textOrObj))
        return;
    var css = "";
    css = typeof textOrObj === "object" ? toCss(textOrObj) : textOrObj;
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
            lines.push(id + " { " + text + " }");
        }
        else {
            lines.push(key + ": " + value + ";");
        }
    }
    return lines.join("\n");
}
exports.toCss = toCss;
var converted = {
    "[data-animation]": { position: "relative", overflow: "hidden" },
    ".ripple": {
        width: "2px",
        height: "2px",
        position: "absolute",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        WebkitAnimation: "rippleEffect 0.5s ease-in-out",
        animation: "rippleEffect 0.5s ease-in-out"
    },
    "@-webkit-keyframes rippleEffect": {
        "0%": { WebkitTransform: "scale(1)", transform: "scale(1)" },
        "100%": {
            opacity: "0",
            WebkitTransform: "scale(var(--scale))",
            transform: "scale(var(--scale))"
        }
    },
    "@keyframes rippleEffect": {
        "0%": { WebkitTransform: "scale(1)", transform: "scale(1)" },
        "100%": {
            opacity: "0",
            WebkitTransform: "scale(var(--scale))",
            transform: "scale(var(--scale))"
        }
    }
};
console.log(toCss(converted));
//# sourceMappingURL=index.js.map