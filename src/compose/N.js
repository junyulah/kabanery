'use strict';

let {
    n
} = require('../n');

let {
    isArray, isFunction, isObject
} = require('basetype');

let {
    map
} = require('bolzano');

module.exports = (...args) => {
    let tagName = args[0],
        attrs = {},
        childs = [];
    if (isArray(args[1])) {
        childs = args[1];
    } else if (isFunction(args[1])) {
        childs = [args[1]];
    } else {
        if (isObject(args[1])) {
            attrs = args[1];
            if (isArray(args[2])) {
                childs = args[2];
            } else if (isFunction(args[2])) {
                childs = [args[2]];
            }
        }
    }

    return (...params) => {
        return n(tagName, attrs, map(childs, (viewer) => viewer(...params)));
    };
};
