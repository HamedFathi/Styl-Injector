function caseConverter(str: string): string {
  if (str.length === 0) return str;
  const isUppercase = str[0] === str[0].toUpperCase();
  const result = str
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
  return isUppercase ? `-${result}` : result;
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
      lines.push(`${id}{${text}}`);
    } else {
      lines.push(`${key}:${value};`);
    }
  }
  return lines.join("");
}

export function injectStyle(
  textOrObject: string | object,
  id?: string,
  overridable = true,
  hostElement: HTMLElement = document.head
) {
  if (!textOrObject || Array.isArray(textOrObject)) return;
  let css = "";
  css = typeof textOrObject === "object" ? toCss(textOrObject) : textOrObject;
  if (css.length === 0) return;
  if (id) {
    let oldStyle = document.getElementById(id);
    if (oldStyle) {
      let isStyleTag = oldStyle.tagName.toLowerCase() === "style";
      if (!isStyleTag) {
        throw new Error("The provided id does not indicate a style tag.");
      } else if (overridable) {
        oldStyle.innerHTML = css;
      }
      return;
    }
  }
  let style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = css;
  if (id) style.id = id;
  hostElement.appendChild(style);
}
