'use strict';

let {
    moveNodeEvent, clearBelow
} = require('../event');

let {
    toArray
} = require('jsenhance');

let {
    isNode, likeArray
} = require('basetype');

let {
    forEach, flat, filter
} = require('bolzano');

let applyAttibutes = require('./applyAttributes');

let replaceDirectly = (node, newNode) => {
    let parent = getParent(node);
    if (parent) {
        // clear node's events
        clearBelow(node);
        // replace
        parent.replaceChild(newNode, node);
        return newNode;
    } else {
        return node;
    }
};

let getParent = (node) => {
    if (isNode(node)) return node.parentNode;
    if (likeArray(node)) {
        return filter(node, getParent, 1)[0];
    }
};

let removeOldNode = (oldNode) => {
    let parent = getParent(oldNode);
    if (parent) {
        clearNode(oldNode, parent);
    }
};

let clearNode = (node, parent) => {
    if (isNode(node)) {
        clearBelow(node);
        return parent.removeChild(node);
    }

    if (likeArray(node)) {
        return forEach(node, (item) => {
            clearNode(item, parent);
        });
    }
};

// TODO using key
let diffNode = (node, newNode) => {
    if (isEmpty(newNode)) {
        return null;
    }

    if (isEmpty(node)) {
        // append new node
        return newNode;
    }
    if (isNode(node) && isNode(newNode)) {
        if (node.nodeType === 3 && newNode.nodeType === 3) {
            node.textContent = newNode.textContent;
        } else if (node.tagName !== newNode.tagName ||
            node.tagName === 'INPUT'
        ) {
            // TODO problems performance
            // TODO nodetype problem
            return replaceDirectly(node, newNode);
        } else {
            editNode(node, newNode);
        }
    } else {
        let nodeList = node,
            newNodeList = newNode;

        if (isNode(nodeList)) nodeList = [nodeList];
        if (isNode(newNodeList)) newNodeList = [newNodeList];

        //
        node = convertLists(nodeList, newNodeList);
    }

    return node;
};

let editNode = (node, newNode) => {
    // attributes
    applyAttibutes(node, newNode);
    // events
    moveNodeEvent(node, newNode);
    // transfer context
    if (newNode.ctx) {
        newNode.ctx.transferCtx(node);
    }
    let orinChildNodes = toArray(node.childNodes);
    let newChildNodes = toArray(newNode.childNodes);

    // TODO using key
    convertLists(orinChildNodes, newChildNodes);
};

let convertLists = (orinChildNodes, newChildNodes) => {
    let len = Math.max(orinChildNodes.length, newChildNodes.length);

    let ret = [];

    for (let i = 0; i < len; i++) {
        let orinChild = orinChildNodes[i];
        let newChild = newChildNodes[i];
        if (isEmpty(newChild)) {
            removeOldNode(orinChild);
        } else {
            let child = diffNode(orinChild, newChild);

            if (child) ret.push(child);
        }
    }
    return ret;
};

let isEmpty = (node) => !node || (likeArray(node) && !node.length);

let emptyNull = (node) => isEmpty(node) ? null : node;

module.exports = (node, newNode) => {
    let ret = null;
    if (likeArray(newNode)) {
        newNode = flat(newNode);
    }

    ret = diffNode(node, newNode);

    return emptyNull(ret);
};
