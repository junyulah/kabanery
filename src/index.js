'use strict';

let {
    n, svgn, bindPlugs
} = require('./n');

let {
    parseArgs
} = require('ncn');

let plugs = require('./plugin');

let view = require('./view');

let mount = require('./mount');

let N = require('./compose/N');

module.exports = {
    n,
    N,
    svgn,
    view,
    plugs,
    bindPlugs,
    mount,

    parseArgs
};
