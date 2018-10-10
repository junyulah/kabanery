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

  it('view.update', (done) => {
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

      // update text
      node.ctx.update('btnText', 'a button2');

      assert.equal(document.body.innerHTML, '<p></p><div><button>a button2</button></div>');
      done();
    });
  });

  it('view.nest', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;

      let widget2 = view((data) => {
        return n('div', [
          n('span', data.text)
        ]);
      });


      let widget = view((data) => {
        return n('div', [
          widget2({
            text: data.name
          })
        ]);
      });

      let node = widget({
        name: 'ddchen'
      });

      mount(node, document.body);

      assert.equal(document.body.innerHTML, '<p></p><div><div><span>ddchen</span></div></div>');
      done();
    });
  });

  it('view.nest.update', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;

      let widget2 = view((data) => {
        return n('strong', [
          n('span', data.text)
        ]);
      });


      let tmp = null;
      let widget = view((data) => {
        tmp = widget2({
          text: data.name
        });
        return n('div', [tmp]);
      });

      let node = widget({
        name: 'ddchen'
      });

      mount(node, document.body);

      // update inner view
      tmp.ctx.update('text', 'ddchen2');
      assert.equal(document.body.innerHTML, '<p></p><div><strong><span>ddchen2</span></strong></div>');

      // update outter view
      node.ctx.update('name', 'ddchen3');
      assert.equal(document.body.innerHTML, '<p></p><div><strong><span>ddchen3</span></strong></div>');

      // update inner view again
      tmp.ctx.update('text', 'ddchen4');
      assert.equal(document.body.innerHTML, '<p></p><div><strong><span>ddchen4</span></strong></div>');

      done();
    });
  });
});
