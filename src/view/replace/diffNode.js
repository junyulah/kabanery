'use strict';

const {
  isNode,
  removeNode
} = require('../../util');
const isViewNode = require('../isViewNode');
const {
  getTagName,
  getTextAreaTextContent,
  getAttributeValue
} = require('./util');
const {
  toDomNode
} = require('../../resolver');
const {
  eventMapHook
} = require('../../const');
const editAttributes = require('./editAttributes');
const {
  isKabaneryNode
} = require('../../n');

/**
 * replace old node with new node
 */
const replaceDirectly = (node, newKNode) => {
  const parent = node.parentNode;
  const newNode = toDomNode(newKNode);
  if (!parent) {
    return newNode;
  }

  if (isNode(newNode)) {
    // replace
    parent.replaceChild(newNode, node);
    return newNode;
  } else {
    const text = newNode.toString();
    const textNode = document.createTextNode(text);
    parent.replaceChild(textNode, node);
    return textNode;
  }
};

// node and newKNode have the same tagName
const editNode = (node, newKNode, oldKNode) => {
  // attributes
  editAttributes(node, newKNode, oldKNode);

  // hacks for dom
  if (getTagName(node) === 'TEXTAREA') {
    node.value = getTextAreaTextContent(newKNode);
  }
  if (getTagName(node) === 'INPUT') {
    node.value = getAttributeValue(newKNode, 'value');
  }

  // transfer event map
  node[eventMapHook] = newKNode.eventMap || {};

  // TODO using key
  diffList(newKNode.childNodes, oldKNode.childNodes, node);
};

const diffList = (newKChilds, oldKChilds, parent) => {
  const childNodes = parent.childNodes,
    oldLen = oldKChilds.length,
    newLen = newKChilds.length;

  // remove
  for (let i = newLen; i < oldLen; i++) {
    removeNode(childNodes[i]);
  }

  // diff
  for (let i = 0, n = Math.min(newLen, oldLen); i < n; i++) {
    diffNode(childNodes[i], newKChilds[i], oldKChilds[i]);
  }

  // append
  for (let i = oldLen; i < newLen; i++) {
    parent.appendChild(toDomNode(newKChilds[i]));
  }
};

const diffNode = (node, newKNode, oldKNode) => {
  if (!isNode(node)) return node;

  if (isViewNode(newKNode) && isViewNode(oldKNode)) {
    return diffNode(node, newKNode.ctx.getKabaneryNode(), oldKNode.ctx.getKNode());
  } else if (isKabaneryNode(newKNode) && isKabaneryNode(oldKNode)) {
    if (getTagName(oldKNode) !== getTagName(newKNode)) {
      return replaceDirectly(node, newKNode);
    } else {
      editNode(node, newKNode, oldKNode);
      return node;
    }
  } else {
    return replaceDirectly(node, newKNode);
  }
};

module.exports = diffNode;
