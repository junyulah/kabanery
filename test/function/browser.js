'use strict';

let browserJsEnv = require('browser-js-env');
let promisify = require('es6-promisify');
let fs = require('fs');
let path = require('path');
let readFile = promisify(fs.readFile);

let runFileInBrowser = (file) => {
    return readFile(file).then((str) => {
        return browserJsEnv(str, {
            testDir: path.join(path.dirname(file), `../../__test/${path.basename(file)}`),
            //clean: true
        });
    });
};

let testFiles = {
    'event:base': path.join(__dirname, '../browser/case/event/base.js'),
    'event:bubble': path.join(__dirname, '../browser/case/event/bubble.js'),
    'event:transfer': path.join(__dirname, '../browser/case/event/transferEvent.js'),
    'event:updatePassingView': path.join(__dirname, '../browser/case/event/updatePassingView.js'),
    'event:stopPropagation': path.join(__dirname, '../browser/case/event/stopPropagation.js'),
    'update:base': path.join(__dirname, '../browser/case/update/base.js')
};

describe('browser', () => {
    for (let name in testFiles) {
        it(name, () => {
            return runFileInBrowser(testFiles[name]);
        });
    }
});
