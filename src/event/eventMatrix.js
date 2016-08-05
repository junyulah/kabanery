'use strict';

let {
    findIndex, contain
} = require('../util');

module.exports = () => {
    let matrix = {};
    let docs = [document];

    let addHandler = (type, node, handler) => {
        let handlerObjs = matrix[type];
        if (!handlerObjs) {
            updateDocs(type);
            // add new type
            handlerObjs = matrix[type] = [{
                node,
                handlers: []
            }];
        }

        let handlers = getHandlers(type, node);
        if (!handlers) {
            handlers = [];
            matrix[type].push({
                node,
                handlers
            });
        }
        if (!contain(handlers, handler)) {
            handlers.push(handler);
        }
    };

    let attachDocument = (doc = document) => {
        if (!contain(docs, doc)) {
            for (let type in matrix) {
                doc.addEventListener(type, listener(type));
            }
            docs.push(doc);
        }
    };

    let updateDocs = (type) => {
        for (let i = 0; i < docs.length; i++) {
            let doc = docs[i];
            doc.addEventListener(type, listener(type));
        }
    };

    let getNodeHandleMap = (item) => {
        let map = {};
        for (let type in matrix) {
            let handlers = getHandlers(type, item);
            if (handlers) map[type] = handlers;
        }
        return map;
    };

    let removeHandler = (type, node, handler) => {
        let handlers = getHandlers(type, node);
        if (handlers && handler.length) {
            let index = findIndex(handlers, handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    };

    let removeTree = (item) => {
        for (let type in matrix) {
            let handlerObjs = matrix[type];
            for (let i = 0; i < handlerObjs.length; i++) {
                let {
                    node
                } = handlerObjs[i];
                if (below(node, item)) {
                    // remove i
                    handlerObjs.splice(i, 1);
                    i = i - 1;
                }
            }
        }
    };

    let removeNode = (item) => {
        for (let type in matrix) {
            let handlerObjs = matrix[type];
            for (let i = 0; i < handlerObjs.length; i++) {
                let {
                    node
                } = handlerObjs[i];
                if (node === item) {
                    // remove node
                    handlerObjs.splice(i, 1);
                    break;
                }
            }
        }
    };

    let listener = (type) => function (e) {
        let target = e.target;
        let nodePath = getNodePath(target);
        for (let i = 0; i < nodePath.length; i++) {
            let curNode = nodePath[i];
            let handlers = getHandlers(type, curNode);
            if (handlers && handlers.length) {
                for (let j = 0; j < handlers.length; j++) {
                    let handler = handlers[j];
                    handler.apply(this, [e]);
                }
            }
        }
    };

    let getHandlers = (type, target) => {
        let handlerObjs = matrix[type];
        for (let i = 0; i < handlerObjs.length; i++) {
            let {
                node, handlers
            } = handlerObjs[i];
            if (node === target) {
                return handlers;
            }
        }

        return null;
    };

    return {
        addHandler,
        removeHandler,
        removeTree,
        removeNode,
        getNodeHandleMap,
        attachDocument
    };
};

let getNodePath = (target) => {
    let paths = [];
    while (target) {
        paths.push(target);
        target = target.parentNode;
    }
    return paths;
};

let below = (node, ancestor) => {
    while (node) {
        if (node === ancestor) {
            return true;
        }
        node = node.parentNode;
    }
};
