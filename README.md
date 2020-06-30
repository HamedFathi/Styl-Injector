[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/styl-injector.svg)](https://badge.fury.io/js/styl-injector)
[![Downloads](https://img.shields.io/npm/dm/styl-injector.svg)](https://www.npmjs.com/package/styl-injector)

# Styl-Injector 
Simple functionality to inject a text or object-based style sheet into your HTML document.

### toCss(obj)

A very simple object-to-css converter.

`obj`: your object-based style.

`returns`: a css text.

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

---

### injectStylesheet(textOrObj, id, hostElement, overridable)

A functionality to inject your text or object-based style to the html document easily!


`textOrObj`: your text css style or object-based style (like the above sample).

`id`: you can set an id for your `<style>`, it helps you to update an specific style tag - optional.

`hostElement`: you can set your host element to inject your style into it. Useful for shadow DOM - optional - default is `document.head`.

`overridable`: If you set this to `false`, you can inject your style just **once**. - optional - default is `true`.


```javascript
injectStylesheet(cssObj,'my-style-tag');

injectStylesheet(`
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