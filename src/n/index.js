const {
  isObject,
  isNode
} = require('../util');

const parseArgs = require('./parseArgs');

const parseStyle = require('./parseStyle');

const KABANERY_NODE = 'kabanery_node';

const isKabaneryNode = (v) => isObject(v) && v.type === KABANERY_NODE;

/**
 * elementType: html, svg
 */
const knodeCreator = (elementType) => {
  return (...args) => {
    return createKabaneryNode(elementType, args);
  };
};

const createKabaneryNode = (elementType, args) => {
  let {
    tagName,
    attributes,
    childs
  } = parseArgs(args);

  if (isKabaneryNode(attributes) ||
    isNode(attributes)) {
    childs = [attributes];
    attributes = {};
  }

  const {
    attrMap,
    eventMap
  } = splitAttribues(attributes);

  return {
    tagName,
    attrMap,
    eventMap,
    elementType,
    type: KABANERY_NODE,
    childNodes: childs,
  };
};

/**
 * split event handlers
 */
const splitAttribues = (attributes) => {
  const attrMap = {},
    eventMap = {};
  for (const name in attributes) {
    const item = attributes[name];
    if (name.indexOf('on') === 0) {
      eventMap[name.substring(2)] = item;
    } else {
      attrMap[name] = item;
    }
  }
  return {
    attrMap,
    eventMap
  };
};

module.exports = {
  n: knodeCreator('html'),
  svgn: knodeCreator('svg'),
  knodeCreator,
  isKabaneryNode,
  parseArgs,
  parseStyle
};
