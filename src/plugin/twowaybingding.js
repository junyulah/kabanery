'use strict';

let {
    get, set
} = require('../util');

module.exports = (obj, path) => (tagName, attributes, childExp) => {
    let value = get(obj, path, '');
    if (tagName === 'input') {
        attributes.value = value;
    } else {
        childExp.unshift(value);
    }

    if (!attributes.onkeyup) {
        attributes.onkeyup = (e) => {
            set(obj, path, e.target.value);
        };
    }
};
