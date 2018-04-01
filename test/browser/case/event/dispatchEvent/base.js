'use strict';

let {
  n, view, mount, dispatchEvent
} = require('../../../../..');

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
dispatchEvent('click', {
  target: document.getElementById('test')
});

assert.equal(detect, true);
