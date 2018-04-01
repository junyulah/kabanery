'use strict';

let {
  parseStyle
} = require('../..');
let assert = require('assert');

let testData = {
  'string': {
    input: ['a=b'],
    output: 'a=b'
  },
  'object': {
    input: [{
      a: 1,
      b: 2
    }],
    output: 'a: 1px;b: 2px;'
  },
  'valueString': {
    input: [{
      a: '1',
      b: '2'
    }],
    output: 'a: 1;b: 2;'
  },
  'hyphen': {
    input: [{
      abcDed: 'left'
    }],
    output: 'abc-ded: left;'
  }
};

describe('parseStyle', () => {
  for (let name in testData) {
    let {
      input,
      output
    } = testData[name];
    it(name, () => {
      assert.deepEqual(parseStyle(...input), output);
    });
  }
});
