'use strict';

let {
  n, view, mount
} = require('../../../..');

let assert = require('assert');

let detect = false;

let TestView = view(({
  state
}) => {
  let eventMap = state === 0 ? {
    onclick: () => {
      detect = !detect;
    }
  } : {};
  return n('div', [
    n('div id="test"', eventMap)
  ]);
});

let testview = TestView({
  state: 0
});

mount(testview, document.body);

testview.ctx.update('state', 1);

// perform click
document.getElementById('test').click();

assert.equal(detect, false);
