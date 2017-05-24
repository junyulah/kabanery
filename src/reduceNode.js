'use strict';

let {
    createElement, createSvgElement
} = require('./ncn');

let {
    bindEvents
} = require('./event');

let {
    map
} = require('bolzano');

let {
    isKabaneryNode
} = require('./n');

let reduceNode = (node) => {
    if (isKabaneryNode(node)) {
        let tarNode = null;
        if (node.elementType === 'html') {
            tarNode = createElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        } else {
            tarNode = createSvgElement(node.tagName, node.attrMap, map(node.childNodes, reduceNode));
        }

        bindEvents(tarNode, node.eventMap);
        return tarNode;
    } else {
        return node;
    }
};

module.exports = reduceNode;
