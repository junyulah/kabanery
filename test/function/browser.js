'use strict';

const browserJsEnv = require('browser-js-env');
const promisify = require('es6-promisify');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const readFile = promisify(fs.readFile);

const headlessOpen = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  return {
    kill: () => {
      browser.close();
    }
  };
};

const runFileInBrowser = (file) => {
  return readFile(file).then((str) => {
    return browserJsEnv(str, {
      cwd: path.dirname(file),
      clean: true,
      open: headlessOpen
    });
  });
};

let testFiles = {
  'event:base': path.join(__dirname, '../browser/case/event/base.js'),
  'event:bubble': path.join(__dirname, '../browser/case/event/bubble.js'),
  'event:transfer': path.join(__dirname, '../browser/case/event/transferEvent.js'),
  'event:dispatchEvent:base': path.join(__dirname, '../browser/case/event/dispatchEvent/base.js'),
  'event:dispatchEvent:input': path.join(__dirname, '../browser/case/event/dispatchEvent/input.js'),
  'event:dispatchEvent:stopPropagation': path.join(__dirname, '../browser/case/event/dispatchEvent/stopPropagation.js'),
  'event:updatePassingView': path.join(__dirname, '../browser/case/event/updatePassingView.js'),
  'event:stopPropagation': path.join(__dirname, '../browser/case/event/stopPropagation.js'),
  'update:base': path.join(__dirname, '../browser/case/update/base.js'),
  'update:insideview': path.join(__dirname, '../browser/case/update/insideView.js'),
  'append:base': path.join(__dirname, '../browser/case/append/base.js'),
  'svg:base': path.join(__dirname, '../browser/case/svg/base.js'),

  'pseudo:base': path.join(__dirname, '../browser/case/pseudo/base.js')
};

describe('browser', () => {
  for (let name in testFiles) {
    it(name, () => {
      return runFileInBrowser(testFiles[name]);
    });
  }
});
