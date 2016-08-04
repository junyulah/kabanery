'use strict';

let {
    set,
    isObject,
    isFunction
} = require('./util');

let edit = require('./edit');

/**
 * render function: (data) => node
 */

// class level
module.exports = (render, construct, {
    afterRender
} = {}) => {
    // TODO class level API
    // instance level
    return (obj, initor) => {
        let node = null,
            data = null;

        let update = (path, value) => {
            set(data, path, value);
            return renderView();
        };

        let renderView = () => {
            let newNode = render(data, ctx);

            node = edit(node, newNode);

            afterRender && afterRender(ctx);

            node.ctx = ctx;
            return node;
        };

        let getNode = () => node;

        // TODO refator
        let transferCtx = (newNode) => {
            node = newNode;
            newNode.ctx = ctx;
        };

        let ctx = {
            update,
            getNode,
            transferCtx
        };

        // data generator
        if (isFunction(obj)) {
            data = obj(ctx);
        } else {
            data = obj;
        }

        // TODO need mount event
        if (!isObject(data)) {
            throw new TypeError(`Expect object, but got ${data}. Type is ${typeof data}`);
        }

        // only run initor when construct view
        initor && initor(data, ctx);
        construct && construct(data, ctx);

        // render node
        return renderView();
    };
};
