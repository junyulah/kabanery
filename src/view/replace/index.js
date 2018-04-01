'use strict';

const diffNode = require('./diffNode');
const {
  toDomNode
} = require('../../resolver');
const {
  removeNode
} = require('../../util');

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
