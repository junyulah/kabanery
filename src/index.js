'use strict';

let {
    n,
    svgn,
    bindPlugs,
    toHTML,
    parseArgs,
    isKabaneryNode,
    cn,
    parseStyle
} = require('./n');

let plugs = require('./plugin');

let view = require('./view');

let mount = require('./mount');

let N = require('./compose/N');

let reduceNode = require('./reduceNode');

let {
    dispatchEvent,
    clearEvents
} = require('./event');

module.exports = {
    n,
    isKabaneryNode,
    cn,
    N,
    svgn,
    view,
    plugs,
    bindPlugs,
    mount,
    toHTML,
    reduceNode,

    parseArgs,
    parseStyle,
    dispatchEvent,
    clearEvents
};
