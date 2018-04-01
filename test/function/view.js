'use strict';

let jsdom = require('jsdom');

let assert = require('assert');

let {
  n,
  view,
  mount
} = require('../../index');

describe('view', () => {
  it('nest view', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;

      const View1 = view((name) => {
        return n('div', name);
      });

      const View2 = view(({
        name,
        gender
      }) => {
        return n('div', [
          View1(name),
          n('div', gender)
        ]);
      });

      const item = View2({
        name: 'arre',
        gender: 'male'
      });

      mount(item, document.body);

      assert.equal(document.body.innerHTML, '<p></p><div><div>arre</div><div>male</div></div>');

      done();
    });
  });

  it('update subview', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;

      const View1 = view(({
        name
      }) => {
        return n('div', name);
      });

      let subView = null;

      const View2 = view(({
        name,
        gender
      }) => {
        subView = View1({
          name
        });
        return n('div', [
          subView,
          n('div', gender)
        ]);
      });

      const item = View2({
        name: 'arre',
        gender: 'male'
      });

      mount(item, document.body);

      subView.ctx.update('name', 'ddchen');

      assert.equal(document.body.innerHTML, '<p></p><div><div>ddchen</div><div>male</div></div>');

      done();
    });
  });

  it('update parent view', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;

      const View1 = view(({
        name
      }) => {
        return n('div', name);
      });

      let subView = null;

      const View2 = view(({
        name,
        gender
      }) => {
        subView = View1({
          name
        });
        return n('div', [
          subView,
          n('div', gender)
        ]);
      });

      const item = View2({
        name: 'arre',
        gender: 'male'
      });

      mount(item, document.body);

      item.ctx.update('name', 'ddchen');

      assert.equal(document.body.innerHTML, '<p></p><div><div>ddchen</div><div>male</div></div>');

      done();
    });
  });

  it('update sub view then update parent view', (done) => {
    jsdom.env('<p></p>', (err, window) => {
      global.document = window.document;

      const View1 = view(({
        name
      }) => {
        return n('div', name);
      });

      let subView = null;

      const View2 = view(({
        name,
        gender
      }) => {
        subView = View1({
          name
        });
        return n('div', [
          subView,
          n('div', gender)
        ]);
      });

      const item = View2({
        name: 'arre',
        gender: 'male'
      });

      mount(item, document.body);

      subView.ctx.update('name', 'ddchen');
      assert.equal(document.body.innerHTML, '<p></p><div><div>ddchen</div><div>male</div></div>');

      item.ctx.update('gender', 'ok');
      assert.equal(document.body.innerHTML, '<p></p><div><div>arre</div><div>ok</div></div>');

      item.ctx.update('name', 'arre');
      assert.equal(document.body.innerHTML, '<p></p><div><div>arre</div><div>ok</div></div>');

      done();
    });
  });

});
