'use strict';

let jsdom = require('jsdom');

let assert = require('assert');

let {
  n,
  view,
  mount
} = require('../../index');

describe('index', () => {
  it('base', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;
      let ret = n('div');
      assert.equal(ret.tagName.toUpperCase(), 'DIV');
      done();
    });
  });

  it('childExp', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;
      let ret = n('div', [n('p'), n('prev')]);
      assert.equal(ret.childNodes.length, 2);
      done();
    });
  });

  it('mount', (done) => {
    jsdom.env('<p id="test"></p>', (err, window) => {
      global.document = window.document;

      mount(n('div', [
        n('button', '123')
      ]), document.getElementById('test'));

      assert.equal(document.body.innerHTML, '<p id="test"><div><button>123</button></div></p>');

      done();
    });
  });

  it('kabanery render node', (done) => {
    jsdom.env('<p id="test"></p>', (err, window) => {
      global.document = window.document;
      mount(n((text) => n('div', text), '123'), document.getElementById('test'));
      assert.equal(document.body.innerHTML, '<p id="test"><div>123</div></p>');
      done();
    });
  });

  it('html node as child', (done) => {
    jsdom.env('<p id="test"></p>', (err, window) => {
      global.document = window.document;

      let div = document.createElement('div');
      div.textContent = '123';

      mount(n('div', [
        div
      ]), document.getElementById('test'));

      assert.equal(document.body.innerHTML, '<p id="test"><div><div>123</div></div></p>');

      done();
    });
  });

  it('view', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;

      let widget = view((data) => {
        return n('div', [
          n('button', data.btnText)
        ]);
      });

      let node = widget({
        btnText: 'a button'
      });

      mount(node, document.body);

      assert.equal(document.body.innerHTML, '<p></p><div><button>a button</button></div>');
      done();
    });
  });
});
