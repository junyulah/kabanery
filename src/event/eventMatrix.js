'use strict';

let {
    contain, findIndex, isFunction
} = require('../util');

module.exports = () => {
    /**
     * [{
     *      node,
     *      eventMap: {
     *          type: [{
     *              origin,
     *              fun
     *          }]
     *      }
     * }]
     */
    let matrix = [];

    let getNodes = () => {
        let nodes = [];
        for (let i = 0; i < matrix.length; i++) {
            let item = matrix[i];
            nodes.push(item.node);
        }
        return nodes;
    };

    let addEvent = (node, type, handler) => {
        if (!handler) return;
        if (!isFunction(handler)) {
            throw new TypeError(`Expect function but ggot ${handler}. Type is ${typeof handler}`);
        }
        let item = findItem(node);
        if (!item) {
            item = addNew(node);
        }
        let handlerObjs = getHandlerObjs(item, type);
        // add handler, no repeat
        if (!contain(handlerObjs, handler, sameOrigin)) {
            let fun = wrapHandler(handler, node);
            // add to matrix
            handlerObjs.push({
                origin: handler,
                fun
            });
            // binding
            document.addEventListener(type, fun);
        }
    };

    let getHandlerMap = (node) => {
        let ret = {};
        let item = findItem(node);
        if (!item) return ret;
        let eventMap = item.eventMap;
        for (let type in eventMap) {
            let handlers = [];
            let handlerObjs = getHandlerObjs(item, type);
            for (let i = 0; i < handlerObjs.length; i++) {
                let {
                    origin
                } = handlerObjs[i];
                handlers.push(origin);
            }

            ret[type] = handlers;
        }
        return ret;
    };

    let removeNode = (node) => {
        let index = findIndex(matrix, node, sameNode);
        if (index !== -1) {
            detachEvents(node);
            // remove node
            matrix.splice(index, 1);
        }
    };

    let detachEvents = (node) => {
        let item = findItem(node);
        if (!item) return;
        let eventMap = item.eventMap;
        for (let type in eventMap) {
            let handlerObjs = getHandlerObjs(item, type);
            for (let i = 0; i < handlerObjs.length; i++) {
                let {
                    fun
                } = handlerObjs[i];
                document.removeEventListener(type, fun);
            }
        }
    };

    let getHandlerObjs = (item, type) => {
        return item.eventMap[type] = item.eventMap[type] || [];
    };

    let wrapHandler = (handler, node) => {
        let fun = function (e) {
            if (e.target === node) {
                return handler.apply(this, [e]);
            }
        };

        return fun;
    };

    let addNew = (node) => {
        let item = {
            node,
            eventMap: {}
        };
        matrix.push(item);
        return item;
    };

    let sameOrigin = (handler, obj) => {
        return obj.origin === handler;
    };

    let sameNode = (node, item) => item.node === node;

    let findItem = (node) => {
        for (let i = 0; i < matrix.length; i++) {
            let item = matrix[i];
            if (item.node === node) {
                return item;
            }
        }
    };

    return {
        addEvent,
        getNodes,
        removeNode,
        getHandlerMap
    };
};
