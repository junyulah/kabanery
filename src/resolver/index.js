const toDomNode = require('./toDomNode');
const {
  isNode
} = require('../util');
const {
  isKabaneryNode,
  isKabaneryRenderNode
} = require('../n');
const resolveKRenderNode = require('./resolveKRenderNode');

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
  } else if (isKabaneryRenderNode(node)) {
    return toHTML(resolveKRenderNode(node));
  } else {
    return node + '';
  }
};

const mount = require('./mount');

module.exports = {
  toDomNode,
  toHTML,
  mount,
  resolveKRenderNode
};
