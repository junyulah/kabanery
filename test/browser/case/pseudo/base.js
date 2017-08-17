'use strict';

let {
    n,
    mount
} = require('../../../..');

let assert = require('assert');

mount(n('a id="action" href="javascript:void(0)"', {
    pseudo: {
        active: {
            color: 'red'
        }
    }
}, [
    n('span', 'good')
]), document.body);
