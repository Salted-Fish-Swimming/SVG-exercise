const URI = 'http://www.w3.org/2000/svg';

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

const styleful = (rules) => {
  return Object.entries(rules).map(([ k, v ]) => `${k}: ${v}`).join('; ');
}

const ObjectMap = (target, fn) => Object.fromEntries(Object.entries(target).map(fn))

class VisualDom {
  constructor ({ name, attrs, children }) {
    this.name = name; this.attrs = attrs, this.children = children;
  }
}

const dec = (name, attrs, children) => {
  return new VisualDom({
    name,
    attrs: ObjectMap(attrs, ([ key, value ]) => {
      if (isAtomValue(value)) {
        return [ key, value ];
      } else if (key == 'style') {
        return [ key, styleful(value) ];
      } else {
        throw Error('undefined attr name');
      }
    }),
    children: children.map(child => {
      if (child instanceof VisualDom) {
        return child;
      } else {
        throw Error('undefined child');
      }
    }),
  });
}

export const render = ({ name, attrs, children }) => {
  const dom = document.createElementNS(URI, name);
  for (const attrName in attrs) {
    const attrValue = attrs[attrName];
    dom.setAttribute(attrName, attrValue);
  }
  for (const child of children) {
    dom.append(render(child));
  }
  return dom;
}

export const S = new Proxy(dec, {
  get (fn, prop, receiver) {
    if (prop == 'render') {
      return render
    } else {
      return (attrs, children = []) => fn(prop, attrs, children);
    }
  }
});

export const svg = S.svg;