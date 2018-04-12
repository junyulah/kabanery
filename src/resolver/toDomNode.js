'use strict';

const {
  isNode,
  createElement,
  createSvgElement
} = require('../util');
const {
  bindEvents
} = require('../event');
const {
  map
} = require('bolzano');
const {
  isKabaneryNode,
  isKabaneryRenderNode
} = require('../n');
const resolveKRenderNode = require('./resolveKRenderNode');

const toDomNode = (node) => {
  if (isKabaneryNode(node)) {
    let tarNode = null;
    if (node.elementType === 'html') {
      tarNode = createElement(node.tagName, node.attrMap, map(node.childNodes, toDomNode));
    } else { // svg
      tarNode = createSvgElement(node.tagName, node.attrMap, map(node.childNodes, toDomNode));
    }

    bindEvents(tarNode, node.eventMap);
    return tarNode;
  } else if (isKabaneryRenderNode(node)) {
    return toDomNode(resolveKRenderNode(node));
  } else if (isNode(node)) {
    return node;
  } else {
    return document.createTextNode(node.toString());
  }
};

module.exports = toDomNode;
