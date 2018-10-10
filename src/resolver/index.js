const {
  isNode,
  createElement,
  createSvgElement
} = require('../util');
const {
  isKabaneryNode
} = require('../n');
const {
  bindEvents,
  attachDocument
} = require('../event');
const {
  flat,
  forEach,
  map
} = require('bolzano');

const toHTML = (node) => {
  if (isNode(node)) {
    return node.outerHTML;
  } else if (isKabaneryNode(node)) {
    const {
      tagName,
      attrMap,
      childNodes
    } = node;

    let attrs = [];
    for (const key in attrMap) {
      const value = attrMap[key];
      attrs.push(`${key}="${value}"`);
    }

    let attrStr = attrs.join(' ');
    attrStr = attrStr ? ' ' + attrStr : '';

    let childs = [];
    for (let i = 0, n = childNodes.length; i < n; i++) {
      childs.push(toHTML(childNodes[i]));
    }

    return `<${tagName}${attrStr}>${childs.join('')}</${tagName}>`;
  } else {
    return node + '';
  }
};

/**
 * @param parentNode
 *      the dom node used hook node we rendered
 */
const mount = (kabaneryRoots, parentNode) => {
  kabaneryRoots = flat(kabaneryRoots);

  forEach(kabaneryRoots, (item) => {
    item = toDomNode(item);
    if (isNode(item)) {
      parentNode.appendChild(item);
    }
  });

  // attach to document
  attachDocument(getDoc(parentNode));
};

const toDomNode = (kNode) => {
  if (isKabaneryNode(kNode)) {
    let nativeNode = null;
    if (kNode.elementType === 'html') {
      nativeNode = createElement(kNode.tagName, kNode.attrMap, map(kNode.childNodes, toDomNode));
    } else { // svg
      nativeNode = createSvgElement(kNode.tagName, kNode.attrMap, map(kNode.childNodes, toDomNode));
    }

    if (kNode.ctx) {
      kNode.ctx.bindNativeNode(nativeNode);
    }

    bindEvents(nativeNode, kNode.eventMap);
    return nativeNode;
  } else if (isNode(kNode)) {
    return kNode;
  } else {
    return document.createTextNode(kNode.toString());
  }
};

const getDoc = (node) => {
  while (node.parentNode) {
    node = node.parentNode;
  }
  return node;
};

module.exports = {
  toDomNode,
  toHTML,
  mount
};
