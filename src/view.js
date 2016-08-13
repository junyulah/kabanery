'use strict';

let {
    set
} = require('jsenhance');

let {
    isObject, isFunction
} = require('basetype');

let edit = require('./edit');

/**
 * render function: (data) => node
 */

// class level
module.exports = (view, construct, {
    afterRender
} = {}) => {
    // TODO class level API
    // instance level
    return (obj, initor) => {
        let node = null,
            data = null,
            render = null;

        let update = (...args) => {
            if (!args.length) return renderView();
            let [path, value] = args;
            set(data, path, value);
            return renderView();
        };

        let renderView = () => {
            let newNode = getNewNode();

            node = edit(node, newNode);

            afterRender && afterRender(ctx);

            if (node) node.ctx = ctx;
            return node;
        };

        let getNewNode = () => {
            if (!render) render = view;
            let ret = render(data, ctx);
            if (isFunction(ret)) {
                render = ret;
                return render(data, ctx);
            } else {
                return ret;
            }
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
