'use strict';

let {
  n, view, mount
} = require('../../../..');

let assert = require('assert');

let detect = false;

let TestView = view(() => {
  return n('div', {
    onclick: () => {
      detect = !detect;
    }
  }, [
    n('div id="child"')
  ]);
});

mount(TestView(), document.body);

// perform click
document.getElementById('child').click();

assert.equal(detect, true);
