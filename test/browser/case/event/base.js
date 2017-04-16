'use strict';

let {
    n, view, mount
} = require('../../../..');

let assert = require('assert');

let detect = false;

let TestView = view(() => {
    return n('div id="test"', {
        onclick: () => {
            detect = !detect;
        }
    });
});

mount(TestView(), document.body);

// perform click
document.getElementById('test').click();

assert.equal(detect, true);
