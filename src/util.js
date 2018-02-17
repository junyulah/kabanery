'use strict';

const toArray = (v) => Array.prototype.slice.call(v);

const isNode = (o) => {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
};

const bind = (fn, ctx) => {
    return (...args) => {
        return fn.apply(ctx, args);
    };
};

module.exports = {
    toArray,
    isNode,
    bind
};
