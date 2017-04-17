# kabanery

[中文文档](./README_zh.md)   [document](./README.md)

front end render framework
- [install](#install)
- [usage](#usage)
  * [API quick run](#api-quick-run)
- [develop](#develop)
  * [file structure](#file-structure)
  * [run tests](#run-tests)
- [license](#license)

## install

`npm i kabanery --save` or `npm i kabanery --save-dev`

Install on global, using `npm i kabanery -g`



## usage








### API quick run

Basic way to construct a view.


```js
let kabanery = require('kabanery')
let {view, n, mount} = kabanery;

let MyView = view((data) => {
     let {type} = data;

     return n('div', {
        id: 'a',
        style: {
           fontSize: 10
        }
     },[
         type === 2 && n('span', 'second'),
         type === 3 && n('div', 'third')
     ]);
});

mount(MyView({type: 3}), document.body);

console.log(document.getElementById('a').outerHTML); // print result
```

```
output

    <div id="a" style=";font-size: 10px"><div>third</div></div>

```

Using update api to update a view.


```js
let kabanery = require('kabanery')
let {view, n, mount} = kabanery;

let MyView = view((data, {update}) => {
     return n('div', {
        id: 'a',
        style: {
           fontSize: 10
        },
        onclick: () => {
           update('show', !data.show);
        }
     }, [
         data.show && n('div', 'show text')
     ]);
});

mount(MyView({show: false}), document.body);

document.getElementById('a').click(); // simulate user action
console.log(document.getElementById('a').outerHTML); // print result
```

```
output

    <div id="a" style=";font-size: 10px"><div>third</div></div>

```

## develop

### file structure

```
.    
│──LICENSE    
│──README.md    
│──README_zh.md    
│──index.js    
│──package.json    
│──src    
│   │──compose    
│   │   └──N.js    
│   │──event    
│   │   │──eventMatrix.js    
│   │   └──index.js    
│   │──index.js    
│   │──mount.js    
│   │──n.js    
│   │──plugin    
│   │   │──eventError.js    
│   │   │──index.js    
│   │   └──twowaybingding.js    
│   └──view.js    
└──test    
    │──browser    
    │   │──__test    
    │   │   │──base.js    
    │   │   │   │──asset    
    │   │   │   │   └──app.js    
    │   │   │   │──index.html    
    │   │   │   │──index.js    
    │   │   │   │──test.js    
    │   │   │   └──webpack.config.js    
    │   │   └──bubble.js    
    │   │       │──index.html    
    │   │       │──index.js    
    │   │       │──test.js    
    │   │       └──webpack.config.js    
    │   └──case    
    │       └──event    
    │           │──base.js    
    │           │──bubble.js    
    │           │──stopPropagation.js    
    │           └──updatePassingView.js    
    └──function    
        │──browser.js    
        └──index.js     
```


### run tests

`npm test`

## license

The MIT License (MIT)

Copyright (c) 2016 chenjunyu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
