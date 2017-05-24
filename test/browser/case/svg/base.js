'use strict';

let {
    svgn, mount, n
} = require('../../../..');

let assert = require('assert');

mount(svgn('svg', [
    svgn('rect id="test"', {
        width: '120',
        height: '100',
        x: '10',
        y: '10'
    })
]), document.body);

mount(n('svg', [
    n('rect id="test2"', {
        width: '120',
        height: '100',
        x: '10',
        y: '10'
    })
]), document.body);

assert.equal(document.getElementById('test').constructor.prototype.toString(), '[object SVGRectElement]');

assert.equal(document.getElementById('test2').constructor.prototype.toString(), '[object HTMLUnknownElement]');
