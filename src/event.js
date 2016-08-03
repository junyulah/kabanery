'use strict';

let eventMatrix = [];

module.exports = {
    bindEvents: (node, eventMap) => {
        let map = {};

        for (let name in eventMap) {
            let handler = eventMap[name];

            let fun = function (e) {
                if (e.target === node) {
                    return handler.apply(this, [e]);
                }
            };

            document.addEventListener(name, fun);
            map[name] = fun;
        }

        eventMatrix.push([node, map]);
    },

    clearBelow: (ancestor) => {
        if (!ancestor) return;
        let newMatrix = [];

        for (let i = 0; i < eventMatrix.length; i++) {
            let [node, eventMap] = eventMatrix[i];
            if (below(node, ancestor)) {
                for (let name in eventMap) {
                    document.removeEventListener(name, eventMap[name]);
                }
            } else {
                newMatrix.push([node, eventMap]);
            }
        }

        eventMatrix = newMatrix;
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
