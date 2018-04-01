'use strict';

let {
  n, view, mount, dispatchEvent
} = require('../../../../..');

let assert = require('assert');

let detect = false;
let inner = false;

let TestView = view(() => {
  return n('div', {
    onclick: () => {
      detect = !detect;
    }
  }, [
    n('div id="child"', {
      onclick: (e) => {
        inner = !inner;
        e.stopPropagation();
      }
    })
  ]);
});

mount(TestView(), document.body);

// perform click
dispatchEvent('click', {
  target: document.getElementById('child')
});

assert.equal(detect, false);
assert.equal(inner, true);
