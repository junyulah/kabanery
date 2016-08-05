'use strict';

let {
    n, svgn, bindPlugs
} = require('./n');

let plugs = require('./plugin');

let view = require('./view');

let mount = require('./mount');

module.exports = {
    n,
    svgn,
    view,
    plugs,
    bindPlugs,
    mount
};
