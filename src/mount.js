'use strict';

let {
    attachDocument
} = require('./event');

module.exports = (rootNode, parentNode) => {
    parentNode.appendChild(rootNode);
    attachDocument(getDoc(parentNode));
};

let getDoc = (node) => {
    while(node.parentNode) {
        node = node.parentNode;
    }
    return node;
};
