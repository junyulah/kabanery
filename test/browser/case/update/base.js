'use strict';

let {
  n, view, mount
} = require('../../../..');

let assert = require('assert');

let TestView = view(({
  state
}, {
  update
}) => {
  return n('div id="action"', {
    onclick: () => {
      update('state', 1);
    }
  }, [
    state === 1 && n('div id="state_1"')
  ]);
});

mount(TestView({
  state: 0
}), document.body);

assert.equal(document.getElementById('state_1'), null, 'at first, should be null');

// perform click
document.getElementById('action').click();

assert.notEqual(document.getElementById('state_1'), null, 'after update, should not be null');
