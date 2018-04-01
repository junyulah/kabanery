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
    n('div id="child"', {
      onclick: (e) => {
        e.stopPropagation();
      }
    })
  ]);
});

mount(TestView(), document.body);

// perform click
document.getElementById('child').click();

assert.equal(detect, false);
