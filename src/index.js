'use strict';

let {
    n, svgn, bindPlugs, toHTML, parseArgs, isKabaneryNode, cn
} = require('./n');

let plugs = require('./plugin');

let view = require('./view');

let mount = require('./mount');

let N = require('./compose/N');

let reduceNode = require('./reduceNode');

let {dispatchEvent} = require('./event');

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
    dispatchEvent
};
