const URI = "http://www.w3.org/2000/svg";

class SvgDom {

  constructor (name, attrs, children) {
    this.name = name;
    this.attrs = {};
    for (const key in attrs) {
      const value = attrs[key];
      if (typeof value === 'string') {
        this.attrs[key] = value;
      } else if (typeof value === 'number') {
        this.attrs[key] = value.toString();
      } else if (typeof value === 'object' && value != null) {
        for (const subkey in value) {
          const subvalue = value[subkey];
          if (subkey === 'self') {
            this.attrs[key] = subvalue;
          } else {
            const totalkey = `${key}-${subkey}`;
            this.attrs[totalkey] = subvalue;
          }
        }
      } else {
        throw new Error('undefined attribute value');
      }
    }
    this.children = children;
  }
  
}

export const S = (name, attrs, children) => new SvgDom(name, attrs, children);

export const renderSdom = ({ name, attrs, children }) => {
  const sdom = document.createElementNS(URI, name);
  for (const name in attrs) {
    const value = attrs[name];
    sdom.setAttribute(name, value);
  }
  for (const child of children) {
    sdom.append(renderSdom(child));
  }
  return sdom;
}
