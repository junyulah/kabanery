'use strict';

let {
    set,
    isObject
} = require('./util');

/**
 * render function: (data) => node
 */
module.exports = (render) => {
    let node = null,
        data = null;

    let update = (path, value) => {
        set(data, path, value);
        // TODO diff node, opt algo
        let newNode = render(data, ctx);
        node.parentNode.replaceChild(newNode, node);
        node = newNode;
    };

    let ctx = {
        update
    };

    return (obj, initor) => {
        data = obj;
        if (!isObject(data)) {
            throw new TypeError(`Expect object, but got ${data}. Type is ${typeof data}`);
        }
        node = render(data, ctx);

        // only run initor when construct view
        initor && initor(data, ctx);
        return node;
    };
};
