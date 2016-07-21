'use strict';

let ncn = require('ncn');

let cn = (typen) => (tagName, attributes, childExp) => {
    let node = null;
    if (attributes && typeof attributes === 'object' && typeof attributes.length !== 'number') {
        let {
            attrMap, eventMap
        } = splitAttribues(attributes);

        node = typen(tagName, attrMap, childExp);
        // tmp solution
        bindEvents(node, eventMap);
    } else {
        node = typen(tagName, attributes, childExp);
    }

    // bind event
    return node;
};

let splitAttribues = (attributes) => {
    let attrMap = {},
        eventMap = {};
    for (let name in attributes) {
        let item = attributes[name];
        if (name.indexOf('on') === 0) {
            eventMap[name.substring(2)] = item;
        } else {
            attrMap[name] = item;
        }
    }
    return {
        attrMap,
        eventMap
    };
};

let bindEvents = (node, eventMap) => {
    for (let name in eventMap) {
        node.addEventListener(name, eventMap[name]);
    }
};

module.exports = {
    n: cn(ncn.n),
    svgn: cn(ncn.svgn)
};
