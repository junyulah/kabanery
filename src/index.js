'use strict';

let {
    n, svgn, bindPlugs, toHTML, parseArgs, parseStyle
} = require('./n');

let plugs = require('./plugin');

let view = require('./view');

let mount = require('./mount');

let N = require('./compose/N');

let reduceNode = require('./reduceNode');

module.exports = {
    n,
    N,
    svgn,
    view,
    plugs,
    bindPlugs,
    mount,
    toHTML,
    reduceNode,

    parseArgs,
    parseStyle
};
