const dec = (name, attrs, children) => {
  const dom = document.createElement(name);
  for (const name in attrs) {
    if (name == 'on') { } else {
      dom.setAttribute(name, attrs[name]);
    }
  }
  for (const node of children) {
    dom.append(node);
  }
  return dom;
}

const decNS = (URI, name, attrs, children) => {
  const NSdom = document.createElementNS(URI, name);
  for (const name in attrs) {
    if (name == 'on') {  } else {
      NSdom.setAttribute(name, attrs[name]);
    }
  }
  for (const node of children) {
    NSdom.append(node);
  }
  return NSdom;
}

export {
  dec, decNS
}
