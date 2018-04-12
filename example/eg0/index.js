/*
const {
  n,
  view,
  mount
} = require('kabanery');
*/
const {
  n,
  view,
  mount
} = require('../..');

const PageView = view(({
  value
}, ctx) => {
  return n('div', [
    n('input', {
      value,
      oninput: (e) => {
        ctx.update('value', e.target.value);
      }
    }),
    n('div', [value])
  ]);
});

mount(PageView({
  value: 'begin'
}), document.body);
