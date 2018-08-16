'use strict';

let {
  n,
  view,
  mount
} = require('../../../..');

let assert = require('assert');

const TmpView = view(({
  state
}) => {
  return n('div id="state"', state);
});

let TestView = view(({
  state
}, {
  update
}) => {
  return n('div id="action"', {
    onclick: () => {
      update('state', 'updated');
    }
  }, [
    n(TmpView, {
      state
    })
  ]);
});

mount(TestView({
  state: 'start'
}), document.body);

assert.equal(document.getElementById('state').textContent, 'start', 'at first, should be null');

// perform click
document.getElementById('action').click();

assert.equal(document.getElementById('state').textContent, 'updated', 'after update, should not be null');
