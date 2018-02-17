'use strict';

const {
    toArray,
    isNode
} = require('../util');

let {
    forEach
} = require('bolzano');

const {
    eventMapHook
} = require('../const');

const applyAttibutes = require('./applyAttributes');

const reduceNode = require('../reduceNode');

const replaceDirectly = (node, newNode) => {
    let parent = node.parentNode;
    if (parent) {
        // replace
        parent.replaceChild(newNode, node);
        return newNode;
    } else {
        return node;
    }
};

const removeOldNode = (oldNode) => {
    let parent = oldNode.parentNode;
    if (parent) {
        parent.removeChild(oldNode);
    }
};

// TODO using key
const diffNode = (node, newNode) => {
    if (!newNode) {
        return removeOldNode(node);
    }

    if (node.nodeType === 3 && newNode.nodeType === 3) {
        if (newNode.textContent !== node.textContent) {
            node.textContent = newNode.textContent;
        }
    }

    if (isNode(node) && isNode(newNode)) {
        if (node.nodeType === 3 && newNode.nodeType === 3) {
            if (newNode.textContent !== node.textContent) {
                node.textContent = newNode.textContent;
            }
            return node;
        }

        if (node.tagName !== newNode.tagName) {
            // TODO problems performance
            // TODO nodetype problem
            return replaceDirectly(node, newNode);
        } else {
            editNode(node, newNode);
        }
    }

    return node;
};

const editNode = (node, newNode) => {
    // attributes
    applyAttibutes(node, newNode);

    // hacks for dom
    if (node.tagName === 'TEXTAREA') {
        node.value = newNode.textContent;
    }
    if (node.tagName === 'INPUT') {
        node.value = newNode.getAttribute('value');
    }

    // transfer context
    if (newNode.ctx) {
        newNode.ctx.transferCtx(node);
    }

    // transfer event map
    if (newNode[eventMapHook]) {
        node[eventMapHook] = newNode[eventMapHook];
    }

    let orinChildNodes = toArray(node.childNodes);
    let newChildNodes = toArray(newNode.childNodes);

    // TODO using key
    convertLists(orinChildNodes, newChildNodes, node);
};

const convertLists = (orinChildNodes, newChildNodes, parent) => {
    removeExtra(orinChildNodes, newChildNodes);

    // diff
    forEach(orinChildNodes, (orinChild, i) => {
        diffNode(orinChild, newChildNodes[i]);
    });

    appendMissing(orinChildNodes, newChildNodes, parent);
    return orinChildNodes;
};

const removeExtra = (orinChildNodes, newChildNodes) => {
    // remove
    for (let i = newChildNodes.length; i < orinChildNodes.length; i++) {
        removeOldNode(orinChildNodes[i]);
    }
};

const appendMissing = (orinChildNodes, newChildNodes, parent) => {
    // append
    for (let i = orinChildNodes.length; i < newChildNodes.length; i++) {
        let newChild = newChildNodes[i];
        parent.appendChild(newChild);
    }
};

// TODO type check for newNode
module.exports = (node, newRenderNode) => {
    const newNode = reduceNode(newRenderNode);

    let ret = null;

    if (!node) { // add new node
        ret = newNode;
    } else if (!newNode) { // delete old node
        removeOldNode(node);
        ret = null;
    } else { // diff with old node
        ret = diffNode(node, newNode);
    }

    return ret;
};
