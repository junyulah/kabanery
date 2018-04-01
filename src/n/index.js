const {
  isObject,
  isNode,
  isFunction
} = require('../util');

const parseArgs = require('./parseArgs');

const parseStyle = require('./parseStyle');

const KABANERY_NODE = 'kabanery_node';

const KABANERY_RENDER_NODE = 'kabanery_high_node';

const isKabaneryNode = (v) => isObject(v) && v.type === KABANERY_NODE;

const isKabaneryRenderNode = (v) => isObject(v) && v.type === KABANERY_RENDER_NODE;

const knodeCreator = (elementType) => {
  return (...args) => {
    if (isFunction(args[0])) { // render function
      return createRenderNode(elementType, args);
    } else {
      return createKabaneryNode(elementType, args);
    }
  };
};

/**
 * render: (...args) => kabaneryNode
 */
const createRenderNode = (elementType, args) => {
  return {
    render: args[0],
    args: args.slice(1),
    elementType,
    type: KABANERY_RENDER_NODE,
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
let splitAttribues = (attributes) => {
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
  isKabaneryRenderNode,
  parseArgs,
  parseStyle
};
