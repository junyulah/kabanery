'use strict';

const {
  isString,
  isObject
} = require('../util');

module.exports = (attr = '', {
  keyWrapper,
  valueWrapper
} = {}) => {
  if (isString(attr)) {
    return attr;
  }

  if (!isObject(attr)) {
    throw new TypeError(`Expect object for style object, but got ${attr}`);
  }

  const styles = [];

  for (let key in attr) {
    let value = attr[key];
    key = convertStyleKey(key);
    value = convertStyleValue(value, key);
    if (keyWrapper) {
      key = keyWrapper(key, value);
    }

    if (valueWrapper) {
      value = valueWrapper(value, key);
    }

    styles.push(`${key}: ${value};`);
  }

  return styles.join('');
};

const convertStyleKey = (key) => {
  return key.replace(/[A-Z]/, (letter) => {
    return `-${letter.toLowerCase()}`;
  });
};

const convertStyleValue = (value, key) => {
  if (typeof value === 'number' && key !== 'z-index') {
    return value + 'px';
  }
  if (key === 'padding' || key === 'margin') {
    let parts = value.split(' ');
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (!isNaN(Number(part))) {
        parts[i] = part + 'px';
      }
    }

    value = parts.join(' ');
  }
  return value;
};
