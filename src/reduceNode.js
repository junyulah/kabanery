'use strict';

const {
    createElement,
    createSvgElement
} = require('./ncn');

const {
    bindEvents
} = require('./event');

const {
    map
} = require('bolzano');

const {
    isKabaneryNode
} = require('./n');

const reduceNode = (node) => {
    if (isKabaneryNode(node)) {
        let tarNode = null;
        if (node.elementType === 'html') {
            tarNode = createElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        } else { // svg
            tarNode = createSvgElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        }

        bindEvents(tarNode, node.eventMap);
        return tarNode;
    } else {
        return node;
    }
};

module.exports = reduceNode;
