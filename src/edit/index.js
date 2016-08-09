'use strict';

let {
    moveNodeEvent, clearBelow
} = require('../event');

let {
    hasOwnProperty, toArray
} = require('jsenhance');

let getAttributeMap = (attributes = []) => {
    let map = {};
    for (let i = 0; i < attributes.length; i++) {
        let {
            name, value
        } = attributes[i];
        map[name] = value;
    }
    return map;
};

let applyAttibutes = (node, newNode) => {
    // attributes
    let orinAttrMap = getAttributeMap(node.attributes);
    let newAttrMap = getAttributeMap(newNode.attributes);

    // update and remove
    for (let name in orinAttrMap) {
        if (hasOwnProperty(newAttrMap, name)) {
            let orinValue = orinAttrMap[name];
            let newValue = newAttrMap[name];
            if (newValue !== orinValue) {
                node.setAttribute(name, newValue);
            }
        } else {
            node.removeAttribute(name);
        }
    }

    // append
    for (let name in newAttrMap) {
        if (!hasOwnProperty(orinAttrMap, name)) {
            node.setAttribute(name, newAttrMap[name]);
        }
    }
};

let replaceDirectly = (node, newNode) => {
    if (node.parentNode) {
        // clear node's events
        clearBelow(node);
        // replace
        node.parentNode.replaceChild(newNode, node);
        return newNode;
    } else {
        return node;
    }
};

let removeOldNode = (oldNode) => {
    clearBelow(oldNode);
    oldNode.parentNode.removeChild(oldNode);
};

// TODO using key
let diffNode = (node, newNode) => {
    // attributes
    applyAttibutes(node, newNode);
    // events
    moveNodeEvent(node, newNode);
    // transfer context
    if (newNode.ctx) {
        newNode.ctx.transferCtx(node);
    }
    diffChilds(node, newNode);

    return node;
};

let diffChilds = (node, newNode) => {
    // TODO using key
    convertLists(node, newNode);
    return node;
};

let convertLists = (node, newNode) => {
    removeExtra(node, newNode);

    let orinChildNodes = toArray(node.childNodes);
    let newChildNodes = toArray(newNode.childNodes);

    // diff
    for (let i = 0; i < orinChildNodes.length; i++) {
        let orinChild = orinChildNodes[i];
        let newChild = newChildNodes[i];
        convertNode(orinChild, newChild);
    }

    appendMissing(node, newNode);
};

let removeExtra = (node, newNode) => {
    let orinChildNodes = toArray(node.childNodes);
    let newChildNodes = toArray(newNode.childNodes);

    // remove
    for (let i = newChildNodes.length; i < orinChildNodes.length; i++) {
        removeOldNode(orinChildNodes[i]);
    }
};

let appendMissing = (node, newNode) => {
    let orinChildNodes = toArray(node.childNodes);
    let newChildNodes = toArray(newNode.childNodes);

    // append
    for (let i = orinChildNodes.length; i < newChildNodes.length; i++) {
        let newChild = newChildNodes[i];
        node.appendChild(newChild);
    }
};

let convertNode = (node, newNode) => {
    if (!node) {
        return newNode;
    }
    if (!newNode) {
        return removeOldNode(node);
    }
    if (node.nodeType === 3 && newNode.nodeType === 3) {
        node.textContent = newNode.textContent;
    }

    // TODO nodetype problem
    // TODO problems performance
    // TODO svg render bug
    if (node.tagName !== newNode.tagName ||
        node.tagName === 'INPUT' ||
        node.tagName === 'svg'
    ) {
        return replaceDirectly(node, newNode);
    } else {
        return diffNode(node, newNode);
    }
};

module.exports = convertNode;
