import { Path } from "./path.js";

const isAtomValue = (value) => {
  const valueType = typeof(value);
  if (valueType === 'number') {
    return true;
  } else if (valueType === 'string') {
    return true;
  } else {
    return false;
  }
};

const styleful = (dom, rules) => {
  for (const name in rules) {
    dom.style[name] = rules[name];
  }
}

const decNS = (URI, name, attrs, children) => {
  const NSdom = document.createElementNS(URI, name);
  for (const attrName in attrs) {
    const attrValue = attrs[attrName];
    if (isAtomValue(attrValue)) {
      NSdom.setAttribute(attrName, attrValue);
    } else if (attrName == 'style') {
      styleful(NSdom, attrs[attrName]);
    } else {
    }
  }
  for (const child of children) {
    if (child instanceof SVGElement) {
      NSdom.append(child);
    } else if (child instanceof Path) {
      const path = child;
      NSdom.append(S('path', { d: path.toString() }, []))
    }
  }
  return NSdom;
}

const S = (name, attrs, children) =>
  decNS('http://www.w3.org/2000/svg', name, attrs, children);

export const svg = (attrs, children) => S('svg', attrs, children);
export const rect = (attrs, children = []) => S('rect', attrs, children);
export const circle = (attrs, children = []) => S('circle', attrs, children);
export const polygon = (attrs, children = []) => S('polygon', attrs, children);
export const polyline = (attrs, children = []) => S('polyline', attrs, children);
// export const path = (attrs, children = []) => S('path', attrs, children);