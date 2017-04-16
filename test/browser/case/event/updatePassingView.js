'use strict';

let {
    n, view, mount
} = require('../../../..');

let assert = require('assert');

let detect = false;

let PartView = view(() => {
    return n('div id="part"', {
        onclick: () => {
            detect = !detect;
        }
    });
});

let TestView = view(({
    targetView
}, {
    update
}) => {
    let upd = false;

    return () => n('div id="test"', {
        onclick: () => {
            update('upd', !upd);
        }
    }, [!upd && targetView,
        upd && n('span', '123')
    ]);
});

mount(TestView({
    targetView: PartView()
}), document.body);

// perform click
document.getElementById('test').click();
document.getElementById('test').click(); // update to rerender target view

document.getElementById('part').click();

assert.equal(detect, true);
