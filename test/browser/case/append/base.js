'use strict';

let {
    n, view, mount
} = require('../../../..');

let assert = require('assert');

let TestView = view((_, {
    appendView
}) => {
    return n('div id="action"', {
        onclick: () => {
            appendView(n('li', '123'));
        }
    }, [
        n('div', 'good')
    ]);
});

mount(TestView({}), document.body);

assert.equal(document.getElementById('action').innerHTML, '<div>good</div>');

// perform click
document.getElementById('action').click();

assert.equal(document.getElementById('action').innerHTML, '<div>good</div><li>123</li>');

// perform click
document.getElementById('action').click();

assert.equal(document.getElementById('action').innerHTML, '<div>good</div><li>123</li><li>123</li>');
