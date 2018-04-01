'use strict';

const {
  hasOwnProperty
} = require('../../util');

const {
  getAttrMap
} = require('./util');

module.exports = (node, newKNode, oldKNode) => {
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
