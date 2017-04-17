'use strict';

let jsdom = require('jsdom');

let assert = require('assert');

let {
    n, view, mount, N
} = require('../../index');

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

    it('N', (done) => {
        jsdom.env('', (err, window) => {
            global.document = window.document;

            let ui = view(() => {
                return n('div');
            });

            let ui2 = N('p', ui);

            mount(ui2({}), document.body);

            assert.equal(document.body.innerHTML, '<p><div></div></p>');

            done();
        });
    });

    it('N2', (done) => {
        jsdom.env('', (err, window) => {
            global.document = window.document;

            let ui = view(() => {
                return n('div');
            });

            let ui2 = N('p', [ui, n('span'), [n('h1'), n('h2')]]);

            mount(ui2({}), document.body);

            assert.equal(document.body.innerHTML, '<p><div></div><span></span><h1></h1><h2></h2></p>');

            done();
        });
    });
});