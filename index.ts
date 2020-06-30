function caseConverter(str: string): string {
  if (str.length === 0) return str;
  return str
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
}

export function injectStyle(
  textOrObj: string | object,
  id?: string,
  hostElement: HTMLElement = document.head,
  overridable = true
) {
  if (!textOrObj || Array.isArray(textOrObj)) return;
  let css = "";
  css = typeof textOrObj === "object" ? toCss(textOrObj) : textOrObj;
  if (css.length === 0) return;
  if (id) {
    let oldStyle = document.getElementById(id);
    if (oldStyle) {
      let isStyleTag = oldStyle.tagName.toLowerCase() === "style";
      if (isStyleTag && overridable) {
        oldStyle.innerHTML = css;
        return;
      } else {
        throw new Error("The provided id does not indicate a style tag.");
      }
    }
  }
  let style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  if (id) style.id = id;
  hostElement.appendChild(style);
}

export function toCss(obj: any): string {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
    throw new TypeError(
      `expected an argument of type object, but got ${typeof obj}`
    );
  }
  let lines: string[] = [];
  for (let index = 0; index < Object.keys(obj).length; index++) {
    const id = Object.keys(obj)[index];
    const key = caseConverter(id);
    const value = obj[id];
    if (typeof value === "object") {
      const text = toCss(value);
      lines.push(`${key} { ${text} }`);
    } else {
      lines.push(`${key}: ${value};`);
    }
  }
  return lines.join("\n");
}