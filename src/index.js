'use strict';

let {
    n, svgn, bindPlugs
} = require('./n');

let plugs = require('./plugin');

let view = require('./view');

module.exports = {
    n,
    svgn,
    view,
    plugs,
    bindPlugs
};
