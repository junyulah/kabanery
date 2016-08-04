'use strict';

let EventMatrix = require('./eventMatrix');

let {
    addEvent, getNodes, removeNode, getHandlerMap
} = EventMatrix();

let bindEvents = (node, eventMap) => {
    for (let type in eventMap) {
        addEvent(node, type, eventMap[type]);
    }
};

let clearBelow = (ancestor) => {
    if (!ancestor) return;
    let nodes = getNodes();

    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (below(node, ancestor)) {
            // clear node
            removeNode(node);
        }
    }
};

let below = (node, ancestor) => {
    while (node) {
        if (node === ancestor) {
            return true;
        }
        node = node.parentNode;
    }
};

let moveNodeEvent = (target, source) => {
    let handlerMap = getHandlerMap(source);
    removeNode(source);
    removeNode(target);

    for (let type in handlerMap) {
        let handlers = handlerMap[type];
        for (let i = 0; i < handlers.length; i++) {
            let handler = handlers[i];
            addEvent(target, type, handler);
        }
    }
};

module.exports = {
    bindEvents,
    clearBelow,
    moveNodeEvent
};
