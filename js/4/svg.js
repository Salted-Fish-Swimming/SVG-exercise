const URI = 'http://www.w3.org/2000/svg';

class VisualDom {
  constructor ({ name, attrs, children }) {
    this.name = name; this.attrs = attrs, this.children = children;
  }
}

const dec = (name, attrs, children) => {
  return new VisualDom({ name, attrs, children, });
}

const styleful = (rules) => {
  return Object.entries(rules).map(([ k, v ]) => `${k}: ${v}`).join('; ');
}

export const render = ({ name, attrs, children }) => {
  const dom = document.createElementNS(URI, name);
  for (const attrName in attrs) {
    const attrValue = attrs[attrName];
    if (typeof(attrValue) === 'string') {
      dom.setAttribute(attrName, attrValue);
    } else if (typeof(attrValue) === 'number') {
      dom.setAttribute(attrName, attrValue);
    } else if (attrName == 'style') {
      dom.setAttribute(attrName, styleful(attrValue));
    } else {
      throw Error('undefined attr name');
    }
  }
  for (const child of children) {
    if (child instanceof VisualDom) {
      dom.append(render(child));
    } else {
      throw Error('undefined child');
    }
  }
  return dom;
}

export const S = new Proxy(dec, {
  get (fn, prop, receiver) {
    if (prop == 'render') {
      return render
    } else {
      return (attrs = {}, children = []) => fn(prop, attrs, children);
    }
  }
});

export const svg = S.svg;