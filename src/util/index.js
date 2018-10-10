'use strict';

const toArray = (v) => Array.prototype.slice.call(v);

const isNode = (o) => {
  return (
    typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
  );
};

const bind = (fn, ctx) => {
  return (...args) => {
    return fn.apply(ctx, args);
  };
};

const isObject = (v) => v && typeof v === 'object';

const isString = (v) => typeof v === 'string';

const isNumber = (v) => typeof v === 'number';

const likeArray = (v) => isObject(v) && isNumber(v.length) && v.length >= 0;

const isBool = (v) => typeof v === 'boolean';

const isFunction = (v) => typeof v === 'function';

const set = (sandbox, name = '', value) => {
  name = name.trim();
  let parts = !name ? [] : name.split('.');
  let parent = sandbox;
  if (!isObject(parent)) return;
  if (!parts.length) return;
  for (let i = 0; i < parts.length - 1; i++) {
    let part = parts[i];
    let next = parent[part];
    if (!isObject(next)) {
      next = {};
      parent[part] = next;
    }
    parent = next;
  }

  parent[parts[parts.length - 1]] = value;
  return sandbox;
};

const svgNS = 'http://www.w3.org/2000/svg';

const applyNode = (node, attributes, childs) => {
  for (let name in attributes) {
    const attr = attributes[name];
    node.setAttribute(name, attr);
  }

  for (let i = 0; i < childs.length; i++) {
    const child = childs[i];
    if (isNode(child)) {
      node.appendChild(child);
    } else {
      node.textContent = child + '';
    }
  }
};

const createElement = (tagName, attributes, childs) => {
  const node = document.createElement(tagName);
  applyNode(node, attributes, childs);
  return node;
};

const createSvgElement = (tagName, attributes, childs) => {
  const node = document.createElementNS(svgNS, tagName);
  applyNode(node, attributes, childs);
  return node;
};

const getAttributeMap = (attributes = []) => {
  const map = {};
  for (let i = 0; i < attributes.length; i++) {
    const {
      name,
      value
    } = attributes[i];
    map[name] = value;
  }
  return map;
};

const removeNode = (oldNode) => {
  let parent = oldNode.parentNode;
  if (parent) {
    parent.removeChild(oldNode);
  }
};

const hasOwnProperty = (obj, key) => {
  if (obj.hasOwnProperty) {
    return obj.hasOwnProperty(key);
  }
  for (const name in obj) {
    if (name === key) return true;
  }
  return false;
};

const emptyChildren = (node) => {
  const childNodes = node.childNodes;
  for (let i = 0, n = childNodes.length; i < n; i++) {
    node.removeChild(childNodes[i]);
  }
};

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
    return (node.childNodes.length && node.childNodes[0]) || '';
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
  toArray,
  isNode,
  isObject,
  likeArray,
  bind,
  isString,
  isNumber,
  isBool,
  isFunction,
  set,
  createElement,
  createSvgElement,
  getAttributeMap,
  removeNode,
  hasOwnProperty,
  emptyChildren,
  getTagName,
  getAttrMap,
  getTextAreaTextContent,
  getAttributeValue

};
