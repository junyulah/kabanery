'use strict';

let {
    moveNodeEvent, clearBelow
} = require('../event');

let {
    hasOwnProperty
} = require('../util');

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
        if (hasOwnProperty(orinAttrMap, name)) {
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
};

// TODO events problem
let convertNode = (node, newNode) => {
    if (!node) {
        return newNode;
    }
    // TODO problems performance
    if (node.tagName !== newNode.tagName) {
        return replaceDirectly(node, newNode);
    } else {
        return diffNode(node, newNode);
    }
};

module.exports = convertNode;
