'use strict';

let jsdom = require('jsdom');

let assert = require('assert');

let {
    n, view, mount
} = require('../index');

describe('index', () => {
    it('base', (done) => {
        jsdom.env('<p></p>', (err, window) => {
            global.document = window.document;
            let ret = n('div');
            assert.equal(ret.tagName, 'DIV');
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

            assert.equal(node.childNodes[0].textContent, 'a button');
            done();
        });
    });

    it('update', (done) => {
        jsdom.env('<p></p>', (err, window) => {
            global.document = window.document;
            let widget = view((data, {
                update, getNode
            }) => {
                setTimeout(() => {
                    update('btnText', 'changed button');
                    let node = getNode();
                    assert.equal(node.childNodes[0].textContent, 'changed button');

                    done();
                }, 50);
                return n('div', [
                    n('button', data.btnText)
                ]);
            });

            let node = widget({
                btnText: 'a button'
            });

            mount(node, document.body);
        });
    });

    it('view: list', (done) => {
        jsdom.env('<p></p>', (err, window) => {
            global.document = window.document;
            let widget = view((data, {
                update, getNode
            }) => {
                setTimeout(() => {
                    update([
                        ['title', 123456],
                        ['foot', true]
                    ]);
                    let node = getNode();
                    assert.equal(node[0].textContent, '123456');
                    assert.equal(node.length, 3);

                    setTimeout(() => {
                        update('foot', false);
                        let node = getNode();
                        assert.equal(node.length, 2);
                        done();
                    }, 0);
                }, 0);
                return () => {
                    return [
                        n('h3', data.title),
                        n('p'),
                        data.foot ? n('span') : null
                    ];
                };
            });

            let node = widget({
                title: '1234'
            });

            mount(node, document.body);
        });
    });
});
