'use strict';

const {
  n,
  svgn,
  parseArgs,
  isKabaneryNode,
  parseStyle
} = require('./n');

const {
  view
} = require('./view');

const {
  dispatchEvent,
  clearEvents
} = require('./event');

const {
  toHTML,
  mount
} = require('./resolver');

module.exports = {
  n,
  isKabaneryNode,
  svgn,
  view,
  mount,
  toHTML,

  parseArgs,
  parseStyle,
  dispatchEvent,
  clearEvents
};
