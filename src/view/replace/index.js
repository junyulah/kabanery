'use strict';

const {
  toDomNode
} = require('../../resolver');
const {
  removeNode,
  getTagName,
  getTextAreaTextContent,
  getAttributeValue,
  getAttrMap,
  hasOwnProperty
} = require('../../util');
const {
  eventMapHook
} = require('../../const');
const {
  isKabaneryNode
} = require('../../n');

const editAttributes = (node, newKNode, oldKNode) => {
  // attributes
  const orinAttrMap = getAttrMap(oldKNode);
  const newAttrMap = getAttrMap(newKNode);

  // update and remove
  for (const name in orinAttrMap) {
    const orinValue = orinAttrMap[name];
    if (hasOwnProperty(newAttrMap, name)) {
      let newValue = newAttrMap[name];
      if (newValue !== orinValue) {
        node.setAttribute(name, newValue);
      }
    } else {
      node.removeAttribute(name);
    }
  }

  for (const name in newAttrMap) {
    const newAttr = newAttrMap[name];
    if (!hasOwnProperty(orinAttrMap, name)) {
      node.setAttribute(name, newAttr);
    }
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

  diffList(newKNode.childNodes, oldKNode.childNodes, node);
};

// TODO using key
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
  if (isKabaneryNode(newKNode) && isKabaneryNode(oldKNode)) {
    if (getTagName(oldKNode) !== getTagName(newKNode)) {
      return replaceDirectly(node, newKNode);
    } else {
      editNode(node, newKNode, oldKNode);
      // binding native node
      if (newKNode.ctx) {
        newKNode.ctx.bindNativeNode(node);
      }
      return node;
    }
  } else {
    return replaceDirectly(node, newKNode);
  }
};

/**
 * replace old node with new node
 */
const replaceDirectly = (node, newKNode) => {
  const parent = node.parentNode;
  const newNode = toDomNode(newKNode);
  // replace
  parent.replaceChild(newNode, node);
  return newNode;
};

// TODO type check for newNode
module.exports = (realNode, newKNode, oldKNode) => {
  if (!realNode) { // add new node
    return toDomNode(newKNode);
  } else if (!newKNode) { // delete old node
    removeNode(realNode);
    return null;
  } else { // diff with old node
    return diffNode(realNode, newKNode, oldKNode);
  }
};
