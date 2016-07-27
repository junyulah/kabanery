'use strict';

let {
    set,
    isObject
} = require('./util');

/**
 * render function: (data) => node
 */

// class level
module.exports = (render, construct) => {
    // TODO class level API
    // instance level
    return (obj, initor) => {
        let node = null,
            data = null;

        let update = (path, value) => {
            set(data, path, value);
            // TODO diff node, opt algo
            let newNode = render(data, ctx);
            node.parentNode && node.parentNode.replaceChild(newNode, node);
            node = newNode;
        };

        update.id = new Date().getTime() + '-' + Math.random();

        let ctx = {
            update
        };

        data = obj;
        if (!isObject(data)) {
            throw new TypeError(`Expect object, but got ${data}. Type is ${typeof data}`);
        }
        node = render(data, ctx);

        // only run initor when construct view
        initor && initor(data, ctx);
        construct && construct(data, ctx);
        return node;
    };
};
