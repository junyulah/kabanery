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
    forEach, flat
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
        return find(node, getParent);
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
    if (isNode(node) && isNode(newNode)) {
        if (node.nodeType === 3 && newNode.nodeType === 3) {
            node.textContent = newNode.textContent;
            return node;
        }

        if (node.tagName !== newNode.tagName ||
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
    convertLists(orinChildNodes, newChildNodes, node);

};

let convertLists = (orinChildNodes, newChildNodes, parent) => {
    removeExtra(orinChildNodes, newChildNodes);

    // diff
    forEach(orinChildNodes, (orinChild, i) => {
        convertNode(orinChild, newChildNodes[i]);
    });

    appendMissing(orinChildNodes, newChildNodes, parent);
    return orinChildNodes;
};

let removeExtra = (orinChildNodes, newChildNodes) => {
    // remove
    for (let i = newChildNodes.length; i < orinChildNodes.length; i++) {
        removeOldNode(orinChildNodes[i]);
    }
};

let appendMissing = (orinChildNodes, newChildNodes, parent) => {
    // append
    for (let i = orinChildNodes.length; i < newChildNodes.length; i++) {
        let newChild = newChildNodes[i];
        parent.appendChild(newChild);
    }
};

let convertNode = (node, newNode) => {
    if (!newNode) {
        return removeOldNode(node);
    }

    if (node.nodeType === 3 && newNode.nodeType === 3) {
        node.textContent = newNode.textContent;
    }

    // TODO nodetype problem
    // TODO problems performance
    if (node.tagName !== newNode.tagName ||
        node.tagName === 'INPUT'
    ) {
        return replaceDirectly(node, newNode);
    } else {
        return diffNode(node, newNode);
    }
};

let isEmpty = (node) => {
    if (!node || (likeArray(node) && !node.length)) {
        return true;
    }
    return false;
};

let emptyNull = (node) => {
    if (isEmpty(node)) return null;
    return node;
};

module.exports = (node, newNode) => {
    let ret = null;
    if (likeArray(newNode)) {
        newNode = flat(newNode);
    }

    if (isEmpty(node)) {
        ret = newNode;
    } else if (isEmpty(newNode)) {
        removeOldNode(node);
    } else if (isNode(node) && isNode(newNode)) {
        ret = convertNode(node, newNode);
    } else if (likeArray(node) && isNode(newNode)) {
        //
        let parent = getParent(node);
    } else if (isNode(node) && likeArray(newNode)) {
        //
    } else if (likeArray(node) && likeArray(newNode)) {
        //
    }

    return emptyNull(ret);
};
