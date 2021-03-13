[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/styl-injector.svg)](https://badge.fury.io/js/styl-injector)
[![Downloads](https://img.shields.io/npm/dm/styl-injector.svg)](https://www.npmjs.com/package/styl-injector)

# Styl-Injector 
Simple functionality to inject a text or object-based style sheet into your HTML document.


## Installation

Use the following command:
```bash
npm i styl-injector
```

## toCss(obj)

A very simple object-to-css converter.

| Parameter(s) |      Description      |  Optional | Default |
|----------|:-------------|:------:|:------:|
| obj |  Object-based style | No | - |

**Returns**: a css text.

```javascript
const cssObj = {
  ".main-wrapper": { flexDirection: "row", display: "flex", flex: "1" },
  "#content": { flex: "1" },
  ul: { padding: "20px 0", flex: "1" },
  li: { fontFamily: "'Lato'", color: "whitesmoke", lineHeight: "44px" }
};

let cssText = toCss(cssObj);
```

The value of `cssText` will be equal to:
 
```css
.main-wrapper {
  flex-direction: row;
  display: flex;
  flex: 1;
}
#content {
  flex: 1;
}
ul {
  padding: 20px 0;
  flex: 1;
}
li {
  font-family:'Lato';
  color: whitesmoke;
  line-height: 44px;
}
```

You can use [css-to-js transformer](https://transform.tools/css-to-js) to convert a CSS text to a JS object and use the result for `toCss(result)` directly!

There is a conventional naming approach for defining your rules. Every uppercase character will change to a hyphen and a lowercase character (`XyZ => -xy-z`). For example, If you want to achieve `-webkit-animation` you should write `WebkitAnimation` or `flexDirection` will change to `flex-direction`.

---

## injectStyle(textOrObject, id, overridable, hostElement)

A functionality to inject your text or object-based style to the html document easily!


| Parameter(s) |      Description      |  Optional | Default |
|----------|:-------------|:------:|:------:|
| textOrObject |  Text style or object-based style | No | - |
| id |  To set an id for your `<style>`, it helps you to update an specific style tag | Yes | - |
| overridable |  If set this to `false`, your style is only injected **once** but to do this you must set an id parameter too. | Yes | true |
| hostElement |  To set your host element to inject your style into it. Useful for shadow DOM | Yes | document.head |


```javascript
injectStyle(cssObj,'my-style-tag');

injectStyle(`
.main-wrapper {
  flex-direction: row;
  display: flex;
  flex: 1;
}
#content {
  flex: 1;
}
ul {
  padding: 20px 0;
  flex: 1;
}
li {
  font-family:'Lato';
  color: whitesmoke;
  line-height: 44px;
}
`,'my-style-tag');

```
