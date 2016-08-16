'use strict';

let {
    attachDocument
} = require('./event');

let {
    isNode
} = require('basetype');

let {
    flat, forEach
} = require('bolzano');

module.exports = (rootNode, parentNode) => {
    rootNode = flat(rootNode);
    forEach(rootNode, (item) => {
        if (isNode(item)) {
            parentNode.appendChild(item);
        }
    });
    attachDocument(getDoc(parentNode));
};

let getDoc = (node) => {
    while (node.parentNode) {
        node = node.parentNode;
    }
    return node;
};
