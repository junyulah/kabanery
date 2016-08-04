'use strict';

let EventMatrix = require('./eventMatrix');

let {
    addHandler,
    removeTree,
    removeNode,
    getNodeHandleMap
} = EventMatrix();

let bindEvents = (node, eventMap) => {
    for (let type in eventMap) {
        addHandler(type, node, eventMap[type]);
    }
};

let clearBelow = removeTree;

let moveNodeEvent = (target, source) => {
    let handleMap = getNodeHandleMap(source);
    removeNode(target);

    for (let type in handleMap) {
        let handlers = handleMap[type];
        for (let i = 0; i < handlers.length; i++) {
            let handler = handlers[i];
            addHandler(type, target, handler);
        }
    }

    //
    removeNode(source);
};

module.exports = {
    bindEvents,
    clearBelow,
    moveNodeEvent
};
