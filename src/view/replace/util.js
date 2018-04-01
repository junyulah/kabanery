'use strict';

const {
  isNode,
  getAttributeMap
} = require('../../util');

const getTagName = (node) => {
  return node.tagName.toUpperCase();
};

const getAttrMap = (node) => {
  if (isNode(node)) {
    return getAttributeMap(node.attributes);
  } else { // kabanery node
    return node.attrMap;
  }
};

const getTextAreaTextContent = (node) => {
  if (isNode(node)) {
    return node.textContent;
  } else {
    return node.children[0];
  }
};

const getAttributeValue = (node, key) => {
  if (isNode(node)) {
    return node.getAttribute(key);
  } else {
    return node.attrMap[key];
  }
};

module.exports = {
  getTagName,
  getAttrMap,
  getTextAreaTextContent,
  getAttributeValue
};
