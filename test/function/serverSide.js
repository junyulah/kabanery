'use strict';

let {
    n, toHTML
} = require('../..');
let assert = require('assert');

describe('serverSide', () => {
    it('base', () => {
        assert.equal(toHTML(n('div')), '<div></div>');
    });

    it('child', () => {
        assert.equal(toHTML(n('div', [
            n('p', '123')
        ])), '<div><p>123</p></div>');
    });

    it('child2', () => {
        assert.equal(toHTML(n('div', [
            n('span', '123'),
            n('ul', [
                n('li', 1),
                n('li', 2)
            ])
        ])), '<div><span>123</span><ul><li>1</li><li>2</li></ul></div>');
    });

    it('attr', () => {
        assert.equal(toHTML(n('div', {
            id: '1'
        }, 123)), '<div id="1">123</div>');
    });

    it('attr2', () => {
        assert.equal(toHTML(n('div', {
            id: '1',
            from: 10
        }, 123)), '<div id="1" from="10">123</div>');
    });

    it('style', () => {
        assert.equal(toHTML(n('div', {
            id: 'ok',
            style: {
                font: 10
            }
        }, 123)), '<div id="ok" style="font: 10px">123</div>');
    });

    it('style2', () => {
        assert.equal(toHTML(n('div', {
            id: 'ok',
            style: {
                font: 10,
                color: 'red'
            }
        }, 123)), '<div id="ok" style="font: 10px;color: red">123</div>');
    });
});
