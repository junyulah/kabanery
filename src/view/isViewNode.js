const {
  isObject
} = require('../util');

module.exports = (v) => isObject(v) && v.__isViewNode;
