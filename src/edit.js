'use strict';

let {
    moveNodeEvent, clearBelow
} = require('./event');

let applyAttibutes = (node, newNode) => {
    // attributes
    let orinAttrs = node.attributes || [];
    for (let i = 0; i < orinAttrs.length; i++) {
        node.removeAttribute(orinAttrs[i].name);
    }

    //
    let newAttrs = newNode.attributes || [];
    for (let i = 0; i < newAttrs.length; i++) {
        let {
            name, value
        } = newAttrs[i];
        node.setAttribute(name, value);
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

let diffNode = (node, newNode) => {
    // attributes
    applyAttibutes(node, newNode);
    // events
    moveNodeEvent(node, newNode);
    // transfer context
    if(newNode.ctx) {
        newNode.ctx.transferCtx(node);
    }
    //
    let oriChildNodes = node.childNodes;
    let newChildNodes = newNode.childNodes;

    // remove redundant
    let rest = [];
    for (let i = newChildNodes.length; i < oriChildNodes.length; i++) {
        rest.push(oriChildNodes[i]);
    }

    for (let i = 0; i < rest.length; i++) {
        removeOldNode(rest[i]);
    }

    // diff childs
    for (let i = 0; i < newChildNodes.length; i++) {
        let orinChild = oriChildNodes[i];
        let newChild = newChildNodes[i];
        if (!orinChild) {
            node.appendChild(newChild);
        } else {
            convertNode(orinChild, newChild);
        }
    }

    return node;
};

// TODO events problem
let convertNode = (node, newNode) => {
    if (!node) {
        return newNode;
    } else if (node.tagName !== newNode.tagName) {
        return replaceDirectly(node, newNode);
    } else {
        return diffNode(node, newNode);
    }
};

module.exports = convertNode;
