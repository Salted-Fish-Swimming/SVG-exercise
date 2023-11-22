const URI = "http://www.w3.org/2000/svg";

class SvgDom {
  constructor ({ name, attrs, children }) {
    this.name = name;
    this.attrs = {};
    for (const attrName in attrs) {
      const attrValue = attrs[attrName];
      if (typeof(attrValue) === 'string') {
        this.attrs[attrName] = attrValue;
      } else if (typeof(attrValue) === 'number') {
        this.attrs[attrName] = attrValue.toString();
      } else {
        throw Error('undefined attribute name');
      }
    }
    this.children = children.map(sdom => new SvgDom(sdom))
  }
}

const dec = (name, attrs, children) => new SvgDom({ name, attrs, children });


export const renderDom = ({ name, attrs, children }) => {
  const dom = document.createElementNS(URI, name);
  for (const name in attrs) {
    const value = attrs[name];
    dom.setAttribute(name, value);
  }
  for (const child of children) {
    dom.append(renderDom(child));
  }
  return dom;
};

export const S = new Proxy(dec, {
  get (fn, name, receiver) {
    if (name === 'renderDom') {
      return renderDom;
    } else {
      return (attrs = {}, children = []) => fn(name, attrs, children);
    }
  }
});

export const svg = S.svg;