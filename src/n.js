'use strict';

let {
    createElement, createSvgElement, parseArgs, nodeGener
} = require('ncn');

let cn = (create) => {
    let nodeGen = nodeGener(create);
    return (...args) => {
        let {
            tagName, attributes, childExp
        } = parseArgs(args);

        // plugin
        runPlugins(attributes['plugin'], tagName, attributes, childExp);

        let {
            attrMap, eventMap
        } = splitAttribues(attributes);

        let node = nodeGen(tagName, attrMap, childExp);
        // tmp solution
        bindEvents(node, eventMap);

        return node;
    };
};

let bindPlugs = (typen, plugs = []) => (...args) => {
    let {
        tagName, attributes, childExp
    } = parseArgs(args);

    let oriPlugs = attributes.plugin = attributes.plugin || [];
    attributes.plugin = oriPlugs.concat(plugs);

    let node = typen(tagName, attributes, childExp);

    return node;
};

let runPlugins = (plugs = [], tagName, attributes, childExp) => {
    for (let i = 0; i < plugs.length; i++) {
        let plug = plugs[i];
        plug && plug(tagName, attributes, childExp);
    }
};

let splitAttribues = (attributes) => {
    let attrMap = {},
        eventMap = {};
    for (let name in attributes) {
        let item = attributes[name];
        if (name.indexOf('on') === 0) {
            eventMap[name.substring(2)] = item;
        } else if (name !== 'plugin') {
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
    n: cn(createElement),
    svgn: cn(createSvgElement),
    bindPlugs
};
