'use strict';

let {
    n, view, mount, dispatchEvent
} = require('../../../../..');

let assert = require('assert');

let value = '';

let TestView = view(() => {
    return n('input id="test"', {
        oninput: (e) => {
            value = e.target.value;
        }
    });
});

mount(TestView(), document.body);

let inputNode = document.getElementById('test');
inputNode.value = '123';

// perform click
dispatchEvent('input', {
    target: inputNode
});

assert.equal(value, '123');
