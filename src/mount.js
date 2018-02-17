'use strict';

const {
    attachDocument
} = require('./event');

const {
    isNode
} = require('./util');

const {
    flat, forEach
} = require('bolzano');

const reduceNode = require('./reduceNode');

/**
 * @param parentNode
 *      the dom node used hook node we rendered
 */
module.exports = (kabaneryRoots, parentNode) => {
    kabaneryRoots = flat(kabaneryRoots);

    forEach(kabaneryRoots, (item) => {
        item = reduceNode(item);
        if (isNode(item)) {
            parentNode.appendChild(item);
        }
    });

    // attach to document
    attachDocument(getDoc(parentNode));
};

const getDoc = (node) => {
    while (node.parentNode) {
        node = node.parentNode;
    }
    return node;
};
