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

  // replace
  parent.replaceChild(newNode, node);
  return newNode;
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
    childNodes[i] && removeNode(childNodes[i]);
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

  const newKabNode = isViewNode(newKNode) ? newKNode.ctx.getKabaneryNode() : newKNode;
  const oldKabNode = isViewNode(oldKNode) ? oldKNode.ctx.getKNode() : oldKNode;

  if (isKabaneryNode(newKabNode) && isKabaneryNode(oldKabNode)) {
    if (getTagName(oldKabNode) !== getTagName(newKabNode)) {
      return replaceDirectly(node, newKabNode);
    } else {
      editNode(node, newKabNode, oldKabNode);
      return node;
    }
  } else {
    return replaceDirectly(node, newKNode);
  }
};

module.exports = diffNode;
