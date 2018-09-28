/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../index.js":
/*!***********************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = __webpack_require__(/*! ./src */ \"../../src/index.js\");\n\n/**\n * @readme-doc\n *\n * ## features\n *\n * - simple DOM DSL, construct dom tree quickly\n *\n * - data-driven view, include updating view by data\n *\n * - Just functions, easy to compose\n *\n * [readme-lang:zh]## 特征\n *\n * - 简单的DOM DSL，快速构建DOM结构\n *\n * - 数据驱动视图，包括通过数据更新视图\n *\n * - 以函数为核心，易于复合\n *\n */\n\n/**\n * @readme-quick-run\n *\n * Using method n to construct dom node quickly.\n *\n * [readme-lang:zh]用方法n快速构造dom节点\n *\n * ## test tar=js r_c=kabanery env=browser\n * let {n, mount} = kabanery;\n *\n * mount(n('div', {\n *   id: 'qu',\n *   style: {\n *      backgroundColor: 'red'\n *   }\n * }, [\n *      n('span class=go style=\"font-size:16px\"', 'hello!')\n * ]), document.body);\n *\n * console.log(document.getElementById('qu').outerHTML); // print result\n */\n\n/**\n * @readme-quick-run\n *\n * Basic way to construct a view.\n *\n * [readme-lang:zh]构造一个组件的简单方法\n *\n * ## test tar=js r_c=kabanery env=browser\n * let {view, n, mount} = kabanery;\n *\n * let MyView = view((data) => {\n *      let {type} = data;\n *\n *      return n('div', {\n *         id: 'test1',\n *         style: {\n *            fontSize: 10\n *         }\n *      },[\n *          type === 2 && n('span', 'second'),\n *          type === 3 && n('div', 'third')\n *      ]);\n * });\n *\n * mount(MyView({type: 3}), document.body);\n *\n * console.log(document.getElementById('test1').outerHTML); // print result\n */\n\n/**\n * @readme-quick-run\n *\n * Using update api to update a view.\n *\n * [readme-lang:zh]运用update api去更新一个view\n *\n * ## test tar=js r_c=kabanery env=browser\n * let {view, n, mount} = kabanery;\n *\n * let MyView = view((data, {update}) => {\n *      return n('div', {\n *         id: 'a',\n *         style: {\n *            fontSize: 10\n *         },\n *         onclick: () => {\n *            update('show', !data.show);\n *         }\n *      }, [\n *          data.show && n('div', 'show text')\n *      ]);\n * });\n *\n * mount(MyView({show: false}), document.body);\n *\n * document.getElementById('a').click(); // simulate user action\n * console.log(document.getElementById('a').outerHTML); // print result\n */\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/index.js?");

/***/ }),

/***/ "../../node_modules/basetype/index.js":
/*!*********************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/basetype/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * basic types\n */\n\nlet truth = () => true;\n\nlet isUndefined = v => v === undefined;\n\nlet isNull = v => v === null;\n\nlet isFalsy = v => !v;\n\nlet likeArray = v => !!(v && typeof v === 'object' && typeof v.length === 'number' && v.length >= 0);\n\nlet isArray = v => Array.isArray(v);\n\nlet isString = v => typeof v === 'string';\n\nlet isObject = v => !!(v && typeof v === 'object');\n\nlet isFunction = v => typeof v === 'function';\n\nlet isNumber = v => typeof v === 'number' && !isNaN(v);\n\nlet isBool = v => typeof v === 'boolean';\n\nlet isNode = (o) => {\n    return (\n        typeof Node === 'object' ? o instanceof Node :\n        o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'\n    );\n};\n\nlet isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';\n\nlet isRegExp = v => v instanceof RegExp;\n\nlet isReadableStream = (v) => isObject(v) && isFunction(v.on) && isFunction(v.pipe);\n\nlet isWritableStream = v => isObject(v) && isFunction(v.on) && isFunction(v.write);\n\n/**\n * check type\n *\n * types = [typeFun]\n */\nlet funType = (fun, types = []) => {\n    if (!isFunction(fun)) {\n        throw new TypeError(typeErrorText(fun, 'function'));\n    }\n\n    if (!likeArray(types)) {\n        throw new TypeError(typeErrorText(types, 'array'));\n    }\n\n    for (let i = 0; i < types.length; i++) {\n        let typeFun = types[i];\n        if (typeFun) {\n            if (!isFunction(typeFun)) {\n                throw new TypeError(typeErrorText(typeFun, 'function'));\n            }\n        }\n    }\n\n    return function() {\n        // check type\n        for (let i = 0; i < types.length; i++) {\n            let typeFun = types[i];\n            let arg = arguments[i];\n            if (typeFun && !typeFun(arg)) {\n                throw new TypeError(`Argument type error. Arguments order ${i}. Argument is ${arg}. function is ${fun}, args are ${arguments}.`);\n            }\n        }\n        // result\n        return fun.apply(this, arguments);\n    };\n};\n\nlet and = (...args) => {\n    if (!any(args, isFunction)) {\n        throw new TypeError('The argument of and must be function.');\n    }\n    return (v) => {\n        for (let i = 0; i < args.length; i++) {\n            let typeFun = args[i];\n            if (!typeFun(v)) {\n                return false;\n            }\n        }\n        return true;\n    };\n};\n\nlet or = (...args) => {\n    if (!any(args, isFunction)) {\n        throw new TypeError('The argument of and must be function.');\n    }\n\n    return (v) => {\n        for (let i = 0; i < args.length; i++) {\n            let typeFun = args[i];\n            if (typeFun(v)) {\n                return true;\n            }\n        }\n        return false;\n    };\n};\n\nlet not = (type) => {\n    if (!isFunction(type)) {\n        throw new TypeError('The argument of and must be function.');\n    }\n    return (v) => !type(v);\n};\n\nlet any = (list, type) => {\n    if (!likeArray(list)) {\n        throw new TypeError(typeErrorText(list, 'list'));\n    }\n    if (!isFunction(type)) {\n        throw new TypeError(typeErrorText(type, 'function'));\n    }\n\n    for (let i = 0; i < list.length; i++) {\n        if (!type(list[i])) {\n            return false;\n        }\n    }\n    return true;\n};\n\nlet exist = (list, type) => {\n    if (!likeArray(list)) {\n        throw new TypeError(typeErrorText(list, 'array'));\n    }\n    if (!isFunction(type)) {\n        throw new TypeError(typeErrorText(type, 'function'));\n    }\n\n    for (let i = 0; i < list.length; i++) {\n        if (type(list[i])) {\n            return true;\n        }\n    }\n    return false;\n};\n\nlet mapType = (map) => {\n    if (!isObject(map)) {\n        throw new TypeError(typeErrorText(map, 'obj'));\n    }\n\n    for (let name in map) {\n        let type = map[name];\n        if (!isFunction(type)) {\n            throw new TypeError(typeErrorText(type, 'function'));\n        }\n    }\n\n    return (v) => {\n        if (!isObject(v)) {\n            return false;\n        }\n\n        for (let name in map) {\n            let type = map[name];\n            let attr = v[name];\n            if (!type(attr)) {\n                return false;\n            }\n        }\n\n        return true;\n    };\n};\n\nlet listType = (type) => {\n    if (!isFunction(type)) {\n        throw new TypeError(typeErrorText(type, 'function'));\n    }\n\n    return (list) => any(list, type);\n};\n\nlet typeErrorText = (v, expect) => {\n    return `Expect ${expect} type, but got type ${typeof v}, and value is ${v}`;\n};\n\nmodule.exports = {\n    isArray,\n    likeArray,\n    isString,\n    isObject,\n    isFunction,\n    isNumber,\n    isBool,\n    isNode,\n    isPromise,\n    isNull,\n    isUndefined,\n    isFalsy,\n    isRegExp,\n    isReadableStream,\n    isWritableStream,\n\n    funType,\n    any,\n    exist,\n\n    and,\n    or,\n    not,\n    mapType,\n    listType,\n    truth\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/basetype/index.js?");

/***/ }),

/***/ "../../node_modules/bolzano/index.js":
/*!********************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/bolzano/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nlet {\n    isObject, funType, or, isString, isFalsy, likeArray\n} = __webpack_require__(/*! basetype */ \"../../node_modules/basetype/index.js\");\n\nlet iterate = __webpack_require__(/*! ./lib/iterate */ \"../../node_modules/bolzano/lib/iterate.js\");\n\nlet {\n    map, reduce, find, findIndex, forEach, filter, any, exist, compact\n} = __webpack_require__(/*! ./lib/fp */ \"../../node_modules/bolzano/lib/fp.js\");\n\nlet contain = (list, item, fopts) => findIndex(list, item, fopts) !== -1;\n\nlet difference = (list1, list2, fopts) => {\n    return reduce(list1, (prev, item) => {\n        if (!contain(list2, item, fopts) &&\n            !contain(prev, item, fopts)) {\n            prev.push(item);\n        }\n        return prev;\n    }, []);\n};\n\nlet union = (list1, list2, fopts) => deRepeat(list2, fopts, deRepeat(list1, fopts));\n\nlet mergeMap = (map1 = {}, map2 = {}) => reduce(map2, setValueKey, reduce(map1, setValueKey, {}));\n\nlet setValueKey = (obj, value, key) => {\n    obj[key] = value;\n    return obj;\n};\n\nlet interset = (list1, list2, fopts) => {\n    return reduce(list1, (prev, cur) => {\n        if (contain(list2, cur, fopts)) {\n            prev.push(cur);\n        }\n        return prev;\n    }, []);\n};\n\nlet deRepeat = (list, fopts, init = []) => {\n    return reduce(list, (prev, cur) => {\n        if (!contain(prev, cur, fopts)) {\n            prev.push(cur);\n        }\n        return prev;\n    }, init);\n};\n\n/**\n * a.b.c\n */\nlet get = funType((sandbox, name = '') => {\n    name = name.trim();\n    let parts = !name ? [] : name.split('.');\n    return reduce(parts, getValue, sandbox, invertLogic);\n}, [\n    isObject,\n    or(isString, isFalsy)\n]);\n\nlet getValue = (obj, key) => obj[key];\n\nlet invertLogic = v => !v;\n\nlet delay = (time) => new Promise((resolve) => {\n    setTimeout(resolve, time);\n});\n\nlet flat = (list) => {\n    if (likeArray(list) && !isString(list)) {\n        return reduce(list, (prev, item) => {\n            prev = prev.concat(flat(item));\n            return prev;\n        }, []);\n    } else {\n        return [list];\n    }\n};\n\nmodule.exports = {\n    flat,\n    contain,\n    difference,\n    union,\n    interset,\n    map,\n    reduce,\n    iterate,\n    find,\n    findIndex,\n    deRepeat,\n    forEach,\n    filter,\n    any,\n    exist,\n    get,\n    delay,\n    mergeMap,\n    compact\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/bolzano/index.js?");

/***/ }),

/***/ "../../node_modules/bolzano/lib/fp.js":
/*!*********************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/bolzano/lib/fp.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nlet iterate = __webpack_require__(/*! ./iterate */ \"../../node_modules/bolzano/lib/iterate.js\");\n\nlet defauls = {\n    eq: (v1, v2) => v1 === v2\n};\n\nlet setDefault = (opts, defauls) => {\n    for (let name in defauls) {\n        opts[name] = opts[name] || defauls[name];\n    }\n};\n\nlet forEach = (list, handler) => iterate(list, {\n    limit: (rets) => {\n        if (rets === true) return true;\n        return false;\n    },\n    transfer: handler,\n    output: (prev, cur) => cur,\n    def: false\n});\n\nlet map = (list, handler, limit) => iterate(list, {\n    transfer: handler,\n    def: [],\n    limit\n});\n\nlet reduce = (list, handler, def, limit) => iterate(list, {\n    output: handler,\n    def,\n    limit\n});\n\nlet filter = (list, handler, limit) => reduce(list, (prev, cur, index, list) => {\n    handler && handler(cur, index, list) && prev.push(cur);\n    return prev;\n}, [], limit);\n\nlet find = (list, item, fopts) => {\n    let index = findIndex(list, item, fopts);\n    if (index === -1) return undefined;\n    return list[index];\n};\n\nlet any = (list, handler) => reduce(list, (prev, cur, index, list) => {\n    let curLogic = handler && handler(cur, index, list);\n    return prev && originLogic(curLogic);\n}, true, falsyIt);\n\nlet exist = (list, handler) => reduce(list, (prev, cur, index, list) => {\n    let curLogic = handler && handler(cur, index, list);\n    return prev || originLogic(curLogic);\n}, false, originLogic);\n\nlet findIndex = (list, item, fopts = {}) => {\n    setDefault(fopts, defauls);\n\n    let {\n        eq\n    } = fopts;\n    let predicate = (v) => eq(item, v);\n    let ret = iterate(list, {\n        transfer: indexTransfer,\n        limit: onlyOne,\n        predicate,\n        def: []\n    });\n    if (!ret.length) return -1;\n    return ret[0];\n};\n\nlet compact = (list) => reduce(list, (prev, cur) => {\n    if (cur) prev.push(cur);\n    return prev;\n}, []);\n\nlet indexTransfer = (item, index) => index;\n\nlet onlyOne = (rets, item, name, domain, count) => count >= 1;\n\nlet falsyIt = v => !v;\n\nlet originLogic = v => !!v;\n\nmodule.exports = {\n    map,\n    forEach,\n    reduce,\n    find,\n    findIndex,\n    filter,\n    any,\n    exist,\n    compact\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/bolzano/lib/fp.js?");

/***/ }),

/***/ "../../node_modules/bolzano/lib/iterate.js":
/*!**************************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/bolzano/lib/iterate.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nlet {\n    likeArray, isObject, funType, isFunction, isUndefined, or, isNumber, isFalsy, mapType\n} = __webpack_require__(/*! basetype */ \"../../node_modules/basetype/index.js\");\n\n/**\n *\n * preidcate: chose items to iterate\n * limit: when to stop iteration\n * transfer: transfer item\n * output\n */\nlet iterate = funType((domain = [], opts = {}) => {\n    let {\n        predicate, transfer, output, limit, def\n    } = opts;\n\n    opts.predicate = predicate || truthy;\n    opts.transfer = transfer || id;\n    opts.output = output || toList;\n    if (limit === undefined) limit = domain && domain.length;\n    limit = opts.limit = stopCondition(limit);\n\n    let rets = def;\n    let count = 0;\n\n    if (likeArray(domain)) {\n        for (let i = 0; i < domain.length; i++) {\n            let itemRet = iterateItem(domain, i, count, rets, opts);\n            rets = itemRet.rets;\n            count = itemRet.count;\n            if (itemRet.stop) return rets;\n        }\n    } else if (isObject(domain)) {\n        for (let name in domain) {\n            let itemRet = iterateItem(domain, name, count, rets, opts);\n            rets = itemRet.rets;\n            count = itemRet.count;\n            if (itemRet.stop) return rets;\n        }\n    }\n\n    return rets;\n}, [\n    or(isObject, isFunction, isFalsy),\n    or(isUndefined, mapType({\n        predicate: or(isFunction, isFalsy),\n        transfer: or(isFunction, isFalsy),\n        output: or(isFunction, isFalsy),\n        limit: or(isUndefined, isNumber, isFunction)\n    }))\n]);\n\nlet iterateItem = (domain, name, count, rets, {\n    predicate, transfer, output, limit\n}) => {\n    let item = domain[name];\n    if (limit(rets, item, name, domain, count)) {\n        // stop\n        return {\n            stop: true,\n            count,\n            rets\n        };\n    }\n\n    if (predicate(item)) {\n        rets = output(rets, transfer(item, name, domain, rets), name, domain);\n        count++;\n    }\n    return {\n        stop: false,\n        count,\n        rets\n    };\n};\n\nlet stopCondition = (limit) => {\n    if (isUndefined(limit)) {\n        return falsy;\n    } else if (isNumber(limit)) {\n        return (rets, item, name, domain, count) => count >= limit;\n    } else {\n        return limit;\n    }\n};\n\nlet toList = (prev, v) => {\n    prev.push(v);\n    return prev;\n};\n\nlet truthy = () => true;\n\nlet falsy = () => false;\n\nlet id = v => v;\n\nmodule.exports = iterate;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/bolzano/lib/iterate.js?");

/***/ }),

/***/ "../../node_modules/uuid/lib/bytesToUuid.js":
/*!***************************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/uuid/lib/bytesToUuid.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Convert array of 16 byte values to UUID string format of the form:\n * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX\n */\nvar byteToHex = [];\nfor (var i = 0; i < 256; ++i) {\n  byteToHex[i] = (i + 0x100).toString(16).substr(1);\n}\n\nfunction bytesToUuid(buf, offset) {\n  var i = offset || 0;\n  var bth = byteToHex;\n  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4\n  return ([bth[buf[i++]], bth[buf[i++]], \n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]], '-',\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]],\n\tbth[buf[i++]], bth[buf[i++]]]).join('');\n}\n\nmodule.exports = bytesToUuid;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/uuid/lib/bytesToUuid.js?");

/***/ }),

/***/ "../../node_modules/uuid/lib/rng-browser.js":
/*!***************************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/uuid/lib/rng-browser.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Unique ID creation requires a high quality random # generator.  In the\n// browser this is a little complicated due to unknown quality of Math.random()\n// and inconsistent support for the `crypto` API.  We do the best we can via\n// feature-detection\n\n// getRandomValues needs to be invoked in a context where \"this\" is a Crypto\n// implementation. Also, find the complete implementation of crypto on IE11.\nvar getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||\n                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));\n\nif (getRandomValues) {\n  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto\n  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef\n\n  module.exports = function whatwgRNG() {\n    getRandomValues(rnds8);\n    return rnds8;\n  };\n} else {\n  // Math.random()-based (RNG)\n  //\n  // If all else fails, use Math.random().  It's fast, but is of unspecified\n  // quality.\n  var rnds = new Array(16);\n\n  module.exports = function mathRNG() {\n    for (var i = 0, r; i < 16; i++) {\n      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;\n      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;\n    }\n\n    return rnds;\n  };\n}\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/uuid/lib/rng-browser.js?");

/***/ }),

/***/ "../../node_modules/uuid/v4.js":
/*!**************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/uuid/v4.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var rng = __webpack_require__(/*! ./lib/rng */ \"../../node_modules/uuid/lib/rng-browser.js\");\nvar bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ \"../../node_modules/uuid/lib/bytesToUuid.js\");\n\nfunction v4(options, buf, offset) {\n  var i = buf && offset || 0;\n\n  if (typeof(options) == 'string') {\n    buf = options === 'binary' ? new Array(16) : null;\n    options = null;\n  }\n  options = options || {};\n\n  var rnds = options.random || (options.rng || rng)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = (rnds[6] & 0x0f) | 0x40;\n  rnds[8] = (rnds[8] & 0x3f) | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    for (var ii = 0; ii < 16; ++ii) {\n      buf[i + ii] = rnds[ii];\n    }\n  }\n\n  return buf || bytesToUuid(rnds);\n}\n\nmodule.exports = v4;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/node_modules/uuid/v4.js?");

/***/ }),

/***/ "../../src/const/index.js":
/*!*********************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/const/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst uuidv4 = __webpack_require__(/*! uuid/v4 */ \"../../node_modules/uuid/v4.js\");\n\nconst seed = uuidv4();\n\nmodule.exports = {\n  eventMapHook: `__eventMap_${seed}`,\n  globalEventTypePrefix: `__event_type_id_${seed}_`,\n  stopPropagationFlag: '__stopPropagation'\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/const/index.js?");

/***/ }),

/***/ "../../src/event/eventMatrix.js":
/*!***************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/event/eventMatrix.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nlet {\n  contain\n} = __webpack_require__(/*! bolzano */ \"../../node_modules/bolzano/index.js\");\n\nlet {\n  eventMapHook,\n  globalEventTypePrefix,\n  stopPropagationFlag\n} = __webpack_require__(/*! ../const */ \"../../src/const/index.js\");\n\nmodule.exports = () => {\n  let docs = [];\n  let eventTypeMap = {};\n  let handlerMap = {};\n\n  let listenEventType = (type) => {\n    if (!eventTypeMap[type]) {\n      updateDocs(type);\n    }\n    eventTypeMap[type] = true;\n  };\n\n    /**\n     * attach document used to accept events\n     */\n  let attachDocument = (doc = document) => {\n    if (!contain(docs, doc)) {\n      for (let type in eventTypeMap) {\n        // prevent multiple version of kabanery to binding multiple times for the same type\n        let id = getGlobalEventTypeId(type);\n        if (!doc[id]) {\n          addEventListenerToDoc(doc, type);\n          doc[id] = true;\n        }\n      }\n      docs.push(doc);\n    }\n  };\n\n  let updateDocs = (type) => {\n    if (!docs.length) {\n      docs.push(document);\n    }\n    for (let i = 0; i < docs.length; i++) {\n      let doc = docs[i];\n      addEventListenerToDoc(doc, type);\n    }\n  };\n\n  let addEventListenerToDoc = (doc, type) => {\n    let handler = null;\n    if (handlerMap[type]) {\n      handler = handlerMap[type];\n    } else {\n      handler = listener(type);\n      handlerMap[type] = handler;\n    }\n    doc.addEventListener(type, handler);\n  };\n\n  let clearEvents = () => {\n    for (let type in eventTypeMap) {\n      removeListenerType(type);\n    }\n  };\n\n  let removeListenerType = (type) => {\n    let handler = handlerMap[type];\n    if (handler) {\n      for (let i = 0; i < docs.length; i++) {\n        let doc = docs[i];\n        doc.removeEventListener(type, handler);\n      }\n      delete handlerMap[type];\n      delete eventTypeMap[type];\n    }\n  };\n\n  let getDocs = () => docs.slice(0);\n\n  /**\n     * e = {\n     *  target,\n     *  stopPropagation [optional]\n     * }\n     */\n  let listener = (type) => function(e) {\n    let ctx = this;\n    let target = e.target;\n\n    // hack the stopPropagration function\n    let oldProp = e.stopPropagation;\n    e.stopPropagation = function(...args) {\n      e[stopPropagationFlag] = true;\n      return oldProp && oldProp.apply(this, args);\n    };\n\n    let nodePath = getNodePath(target);\n\n    for (let i = 0; i < nodePath.length; i++) {\n      let node = nodePath[i];\n      applyNodeHandlers(e, type, node, ctx);\n    }\n  };\n\n  let applyNodeHandlers = (e, type, node, ctx) => {\n    if (e.__stopPropagation) { // event already been stoped by child node\n      return true;\n    }\n\n    let handler = getHandler(type, node);\n    return handler && handler.apply(ctx, [e]);\n  };\n\n  let getHandler = (type, target) => {\n    let eventMap = target && target[eventMapHook];\n    return eventMap && eventMap[type];\n  };\n\n  let dispatchEvent = (type, e) => {\n    let handler = handlerMap[type];\n    handler && handler(e);\n  };\n\n  return {\n    listenEventType,\n    clearEvents,\n    removeListenerType,\n    getDocs,\n    attachDocument,\n    dispatchEvent\n  };\n};\n\n/**\n * get the path of node\n */\nlet getNodePath = (target) => {\n  let paths = [];\n  while (target) {\n    paths.push(target);\n    target = target.parentNode;\n  }\n  return paths;\n};\n\nlet getGlobalEventTypeId = (type) => `${globalEventTypePrefix}${type}`;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/event/eventMatrix.js?");

/***/ }),

/***/ "../../src/event/index.js":
/*!*********************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/event/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nlet EventMatrix = __webpack_require__(/*! ./eventMatrix */ \"../../src/event/eventMatrix.js\");\n\nlet {\n  eventMapHook\n} = __webpack_require__(/*! ../const */ \"../../src/const/index.js\");\n\nlet {\n  listenEventType,\n  clearEvents,\n  attachDocument,\n  dispatchEvent\n} = EventMatrix();\n\nlet bindEvents = (node, eventMap) => {\n  // hook event at node\n  node[eventMapHook] = eventMap;\n\n  for (let type in eventMap) {\n    listenEventType(type);\n  }\n};\n\nmodule.exports = {\n  bindEvents,\n  attachDocument,\n  dispatchEvent,\n  clearEvents\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/event/index.js?");

/***/ }),

/***/ "../../src/index.js":
/*!***************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  n,\n  svgn,\n  parseArgs,\n  isKabaneryNode,\n  parseStyle\n} = __webpack_require__(/*! ./n */ \"../../src/n/index.js\");\n\nconst {\n  view\n} = __webpack_require__(/*! ./view */ \"../../src/view/index.js\");\n\nconst {\n  dispatchEvent,\n  clearEvents\n} = __webpack_require__(/*! ./event */ \"../../src/event/index.js\");\n\nconst {\n  toHTML,\n  mount\n} = __webpack_require__(/*! ./resolver */ \"../../src/resolver/index.js\");\n\nmodule.exports = {\n  n,\n  isKabaneryNode,\n  svgn,\n  view,\n  mount,\n  toHTML,\n\n  parseArgs,\n  parseStyle,\n  dispatchEvent,\n  clearEvents\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/index.js?");

/***/ }),

/***/ "../../src/n/index.js":
/*!*****************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  isObject,\n  isNode,\n  isFunction\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\n\nconst parseArgs = __webpack_require__(/*! ./parseArgs */ \"../../src/n/parseArgs.js\");\n\nconst parseStyle = __webpack_require__(/*! ./parseStyle */ \"../../src/n/parseStyle.js\");\n\nconst KABANERY_NODE = 'kabanery_node';\n\nconst KABANERY_RENDER_NODE = 'kabanery_high_node';\n\nconst isKabaneryNode = (v) => isObject(v) && v.type === KABANERY_NODE;\n\nconst isKabaneryRenderNode = (v) => isObject(v) && v.type === KABANERY_RENDER_NODE;\n\nconst knodeCreator = (elementType) => {\n  return (...args) => {\n    if (isFunction(args[0])) { // render function\n      return createRenderNode(elementType, args);\n    } else {\n      return createKabaneryNode(elementType, args);\n    }\n  };\n};\n\n/**\n * render: (...args) => kabaneryNode\n */\nconst createRenderNode = (elementType, args) => {\n  return {\n    render: args[0],\n    args: args.slice(1),\n    elementType,\n    type: KABANERY_RENDER_NODE,\n  };\n};\n\nconst createKabaneryNode = (elementType, args) => {\n  let {\n    tagName,\n    attributes,\n    childs\n  } = parseArgs(args);\n\n  if (isKabaneryNode(attributes) ||\n    isNode(attributes)) {\n    childs = [attributes];\n    attributes = {};\n  }\n\n  const {\n    attrMap,\n    eventMap\n  } = splitAttribues(attributes);\n\n  return {\n    tagName,\n    attrMap,\n    eventMap,\n    elementType,\n    type: KABANERY_NODE,\n    childNodes: childs,\n  };\n};\n\n/**\n * split event handlers\n */\nconst splitAttribues = (attributes) => {\n  const attrMap = {},\n    eventMap = {};\n  for (const name in attributes) {\n    const item = attributes[name];\n    if (name.indexOf('on') === 0) {\n      eventMap[name.substring(2)] = item;\n    } else {\n      attrMap[name] = item;\n    }\n  }\n  return {\n    attrMap,\n    eventMap\n  };\n};\n\nmodule.exports = {\n  n: knodeCreator('html'),\n  svgn: knodeCreator('svg'),\n  knodeCreator,\n  isKabaneryNode,\n  isKabaneryRenderNode,\n  parseArgs,\n  parseStyle\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/index.js?");

/***/ }),

/***/ "../../src/n/parseArgs.js":
/*!*********************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/parseArgs.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst parseAttribute = __webpack_require__(/*! ./parseAttribute */ \"../../src/n/parseAttribute.js\");\n\nconst {\n  isString,\n  isObject,\n  isNode,\n  likeArray,\n  isNumber,\n  isBool\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\n\nconst parseArgs = (args, {\n  doParseStyle = true\n} = {}) => {\n  let tagName,\n    attributes = {},\n    childExp = [];\n\n  let first = args.shift();\n\n  let parts = splitTagNameAttribute(first);\n\n  if (parts.length > 1) { // not only tagName\n    tagName = parts[0];\n    attributes = parts[1];\n  } else {\n    tagName = first;\n  }\n\n  let next = args.shift();\n\n  let nextAttr = {};\n\n  if (likeArray(next) ||\n        isString(next) ||\n        isNode(next) ||\n        isNumber(next) ||\n        isBool(next)) {\n    childExp = next;\n  } else if (isObject(next)) {\n    nextAttr = next;\n    childExp = args.shift() || [];\n  }\n\n  attributes = parseAttribute(attributes, nextAttr, {\n    doParseStyle\n  });\n\n  let childs = parseChildExp(childExp);\n\n  return {\n    tagName,\n    attributes,\n    childs\n  };\n};\n\nlet splitTagNameAttribute = (str = '') => {\n  if (typeof str !== 'string') return [str];\n\n  let tagName = str.split(' ')[0];\n  let attr = str.substring(tagName.length);\n  attr = attr && attr.trim();\n\n  tagName = tagName.toLowerCase().trim();\n  if (attr) {\n    return [tagName, attr];\n  } else {\n    return [tagName];\n  }\n};\n\nconst parseChildExp = (childExp) => {\n  let ret = [];\n  if (isNode(childExp)) {\n    ret.push(childExp);\n  } else if (likeArray(childExp)) {\n    for (let i = 0; i < childExp.length; i++) {\n      let child = childExp[i];\n      ret = ret.concat(parseChildExp(child));\n    }\n  } else if (childExp) {\n    ret.push(childExp);\n  }\n  return ret;\n};\n\nmodule.exports = parseArgs;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/parseArgs.js?");

/***/ }),

/***/ "../../src/n/parseAttribute.js":
/*!**************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/parseAttribute.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nlet {\n  isString\n} = __webpack_require__(/*! basetype */ \"../../node_modules/basetype/index.js\");\n\nlet parseStyle = __webpack_require__(/*! ./parseStyle */ \"../../src/n/parseStyle.js\");\n\nlet {\n  mergeMap\n} = __webpack_require__(/*! bolzano */ \"../../node_modules/bolzano/index.js\");\n\nconst ITEM_REG = /([\\w-]+)\\s*=\\s*(([\\w-]+)|('.*?')|(\".*?\"))/;\n\n// TODO better key=value grammer\n// TODO refactor with grammerL: class grammer, id grammer, refer some popular grammer\nlet parseAttribute = (attributes, nextAttr, {\n  doParseStyle\n}) => {\n  // key=value key=value\n  // value='abc' value=true value=123 value=\"def\"\n  if (isString(attributes)) {\n    let str = attributes.trim(),\n      kvs = [];\n\n    let stop = false;\n    while (!stop) {\n      let newstr = str.replace(ITEM_REG, (matchStr, $1, $2) => {\n        kvs.push([$1, $2]);\n        return '';\n      }).trim();\n      if (newstr === str) {\n        stop = true;\n      }\n      str = newstr;\n    }\n\n    attributes = {};\n    for (let i = 0; i < kvs.length; i++) {\n      let [key, value] = kvs[i];\n      if (value[0] === '\\'' && value[value.length - 1] === '\\'' ||\n                value[0] === '\"' && value[value.length - 1] === '\"') {\n        value = value.substring(1, value.length - 1);\n      }\n      attributes[key] = value;\n    }\n  }\n  // merge\n  attributes = mergeMap(attributes, nextAttr);\n\n  if (attributes.style && doParseStyle) {\n    attributes.style = parseStyle(attributes.style);\n  }\n\n  // TODO presudo\n  /*\n    if (attributes.presudo) {\n        for (let name in attributes.presudo) {\n            attributes.presudo[name] = parseStyle(attributes.presudo[name]);\n        }\n    }\n   */\n\n  return attributes;\n};\n\nmodule.exports = parseAttribute;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/parseAttribute.js?");

/***/ }),

/***/ "../../src/n/parseStyle.js":
/*!**********************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/parseStyle.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  isString,\n  isObject\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\n\nmodule.exports = (attr = '', {\n  keyWrapper,\n  valueWrapper\n} = {}) => {\n  if (isString(attr)) {\n    return attr;\n  }\n\n  if (!isObject(attr)) {\n    throw new TypeError(`Expect object for style object, but got ${attr}`);\n  }\n\n  const styles = [];\n\n  for (let key in attr) {\n    let value = attr[key];\n    key = convertStyleKey(key);\n    value = convertStyleValue(value, key);\n    if (keyWrapper) {\n      key = keyWrapper(key, value);\n    }\n\n    if (valueWrapper) {\n      value = valueWrapper(value, key);\n    }\n\n    styles.push(`${key}: ${value};`);\n  }\n\n  return styles.join('');\n};\n\nconst convertStyleKey = (key) => {\n  return key.replace(/[A-Z]/, (letter) => {\n    return `-${letter.toLowerCase()}`;\n  });\n};\n\nconst convertStyleValue = (value, key) => {\n  if (typeof value === 'number' && key !== 'z-index') {\n    return value + 'px';\n  }\n  if (key === 'padding' || key === 'margin') {\n    let parts = value.split(' ');\n    for (let i = 0; i < parts.length; i++) {\n      let part = parts[i];\n      if (!isNaN(Number(part))) {\n        parts[i] = part + 'px';\n      }\n    }\n\n    value = parts.join(' ');\n  }\n  return value;\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/n/parseStyle.js?");

/***/ }),

/***/ "../../src/resolver/index.js":
/*!************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const toDomNode = __webpack_require__(/*! ./toDomNode */ \"../../src/resolver/toDomNode.js\");\nconst {\n  isNode\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\nconst {\n  isKabaneryNode,\n  isKabaneryRenderNode\n} = __webpack_require__(/*! ../n */ \"../../src/n/index.js\");\nconst resolveKRenderNode = __webpack_require__(/*! ./resolveKRenderNode */ \"../../src/resolver/resolveKRenderNode.js\");\n\nconst toHTML = (node) => {\n  if (isNode(node)) {\n    return node.outerHTML;\n  } else if (isKabaneryNode(node)) {\n    const {\n      tagName,\n      attrMap,\n      childNodes\n    } = node;\n\n    let attrs = [];\n    for (const key in attrMap) {\n      const value = attrMap[key];\n      attrs.push(`${key}=\"${value}\"`);\n    }\n\n    let attrStr = attrs.join(' ');\n    attrStr = attrStr ? ' ' + attrStr : '';\n\n    let childs = [];\n    for (let i = 0, n = childNodes.length; i < n; i++) {\n      childs.push(toHTML(childNodes[i]));\n    }\n\n    return `<${tagName}${attrStr}>${childs.join('')}</${tagName}>`;\n  } else if (isKabaneryRenderNode(node)) {\n    return toHTML(resolveKRenderNode(node));\n  } else {\n    return node + '';\n  }\n};\n\nconst mount = __webpack_require__(/*! ./mount */ \"../../src/resolver/mount.js\");\n\nmodule.exports = {\n  toDomNode,\n  toHTML,\n  mount,\n  resolveKRenderNode\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/index.js?");

/***/ }),

/***/ "../../src/resolver/mount.js":
/*!************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/mount.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  attachDocument\n} = __webpack_require__(/*! ../event */ \"../../src/event/index.js\");\n\nconst {\n  isNode\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\n\nconst {\n  flat,\n  forEach\n} = __webpack_require__(/*! bolzano */ \"../../node_modules/bolzano/index.js\");\n\nconst toDomNode = __webpack_require__(/*! ./toDomNode */ \"../../src/resolver/toDomNode.js\");\n\n/**\n * @param parentNode\n *      the dom node used hook node we rendered\n */\nmodule.exports = (kabaneryRoots, parentNode) => {\n  kabaneryRoots = flat(kabaneryRoots);\n\n  forEach(kabaneryRoots, (item) => {\n    item = toDomNode(item);\n    if (isNode(item)) {\n      parentNode.appendChild(item);\n    }\n  });\n\n  // attach to document\n  attachDocument(getDoc(parentNode));\n};\n\nconst getDoc = (node) => {\n  while (node.parentNode) {\n    node = node.parentNode;\n  }\n  return node;\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/mount.js?");

/***/ }),

/***/ "../../src/resolver/resolveKRenderNode.js":
/*!*************************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/resolveKRenderNode.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = (node) => {\n  const {\n    render,\n    args\n  } = node;\n  return render(...args);\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/resolveKRenderNode.js?");

/***/ }),

/***/ "../../src/resolver/toDomNode.js":
/*!****************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/toDomNode.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  isNode,\n  createElement,\n  createSvgElement\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\nconst {\n  bindEvents\n} = __webpack_require__(/*! ../event */ \"../../src/event/index.js\");\nconst {\n  map\n} = __webpack_require__(/*! bolzano */ \"../../node_modules/bolzano/index.js\");\nconst {\n  isKabaneryNode,\n  isKabaneryRenderNode\n} = __webpack_require__(/*! ../n */ \"../../src/n/index.js\");\nconst resolveKRenderNode = __webpack_require__(/*! ./resolveKRenderNode */ \"../../src/resolver/resolveKRenderNode.js\");\n\nconst toDomNode = (node) => {\n  if (isKabaneryNode(node)) {\n    let tarNode = null;\n    if (node.elementType === 'html') {\n      tarNode = createElement(node.tagName, node.attrMap, map(node.childNodes, toDomNode));\n    } else { // svg\n      tarNode = createSvgElement(node.tagName, node.attrMap, map(node.childNodes, toDomNode));\n    }\n\n    bindEvents(tarNode, node.eventMap);\n    return tarNode;\n  } else if (isKabaneryRenderNode(node)) {\n    return toDomNode(resolveKRenderNode(node));\n  } else if (isNode(node)) {\n    return node;\n  } else {\n    return document.createTextNode(node.toString());\n  }\n};\n\nmodule.exports = toDomNode;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/resolver/toDomNode.js?");

/***/ }),

/***/ "../../src/util/index.js":
/*!********************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/util/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst toArray = (v) => Array.prototype.slice.call(v);\n\nconst isNode = (o) => {\n  return (\n    typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'\n  );\n};\n\nconst bind = (fn, ctx) => {\n  return (...args) => {\n    return fn.apply(ctx, args);\n  };\n};\n\nconst isObject = (v) => v && typeof v === 'object';\n\nconst isString = (v) => typeof v === 'string';\n\nconst isNumber = (v) => typeof v === 'number';\n\nconst likeArray = (v) => isObject(v) && isNumber(v.length) && v.length >= 0;\n\nconst isBool = (v) => typeof v === 'boolean';\n\nconst isFunction = (v) => typeof v === 'function';\n\nconst set = (sandbox, name = '', value) => {\n  name = name.trim();\n  let parts = !name ? [] : name.split('.');\n  let parent = sandbox;\n  if (!isObject(parent)) return;\n  if (!parts.length) return;\n  for (let i = 0; i < parts.length - 1; i++) {\n    let part = parts[i];\n    let next = parent[part];\n    if (!isObject(next)) {\n      next = {};\n      parent[part] = next;\n    }\n    parent = next;\n  }\n\n  parent[parts[parts.length - 1]] = value;\n  return sandbox;\n};\n\nconst svgNS = 'http://www.w3.org/2000/svg';\n\nconst applyNode = (node, attributes, childs) => {\n  for (let name in attributes) {\n    const attr = attributes[name];\n    node.setAttribute(name, attr);\n  }\n\n  for (let i = 0; i < childs.length; i++) {\n    const child = childs[i];\n    if (isNode(child)) {\n      node.appendChild(child);\n    } else {\n      node.textContent = child + '';\n    }\n  }\n};\n\nconst createElement = (tagName, attributes, childs) => {\n  const node = document.createElement(tagName);\n  applyNode(node, attributes, childs);\n  return node;\n};\n\nconst createSvgElement = (tagName, attributes, childs) => {\n  const node = document.createElementNS(svgNS, tagName);\n  applyNode(node, attributes, childs);\n  return node;\n};\n\nconst getAttributeMap = (attributes = []) => {\n  const map = {};\n  for (let i = 0; i < attributes.length; i++) {\n    const {\n      name,\n      value\n    } = attributes[i];\n    map[name] = value;\n  }\n  return map;\n};\n\nconst removeNode = (oldNode) => {\n  let parent = oldNode.parentNode;\n  if (parent) {\n    parent.removeChild(oldNode);\n  }\n};\n\nconst hasOwnProperty = (obj, key) => {\n  if (obj.hasOwnProperty) {\n    return obj.hasOwnProperty(key);\n  }\n  for (const name in obj) {\n    if (name === key) return true;\n  }\n  return false;\n};\n\nconst emptyChildren = (node) => {\n  const childNodes = node.childNodes;\n  for (let i = 0, n = childNodes.length; i < n; i++) {\n    node.removeChild(childNodes[i]);\n  }\n};\n\nmodule.exports = {\n  toArray,\n  isNode,\n  isObject,\n  likeArray,\n  bind,\n  isString,\n  isNumber,\n  isBool,\n  isFunction,\n  set,\n  createElement,\n  createSvgElement,\n  getAttributeMap,\n  removeNode,\n  hasOwnProperty,\n  emptyChildren\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/util/index.js?");

/***/ }),

/***/ "../../src/view/index.js":
/*!********************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  isFunction\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\nconst updateData = __webpack_require__(/*! ./updateData */ \"../../src/view/updateData.js\");\nconst replace = __webpack_require__(/*! ./replace */ \"../../src/view/replace/index.js\");\nconst isViewNode = __webpack_require__(/*! ./isViewNode */ \"../../src/view/isViewNode.js\");\nconst {\n  n\n} = __webpack_require__(/*! ../n */ \"../../src/n/index.js\");\nconst {\n  mount\n} = __webpack_require__(/*! ../resolver */ \"../../src/resolver/index.js\");\n\nconst ViewContext = function(view, obj) {\n  this.node = null;\n  this.data = obj;\n  this.render = view;\n  this.kNode = null;\n};\n\nViewContext.prototype = {\n  construct: ViewContext,\n\n  update: function(...args) {\n    updateData(this.data, args);\n    return this.renderView();\n  },\n\n  appendView: function(itemView) {\n    if (this.node) {\n      mount(itemView, this.node);\n    }\n  },\n\n  renderView: function() {\n    const newKNode = this.getKabaneryNode();\n    this.node = replace(this.node, newKNode, this.kNode);\n    this.kNode = newKNode;\n    if (this.node) {\n      this.node.ctx = this.getContext();\n    }\n    return this.node;\n  },\n\n  /**\n   * run render function and get the tree based on n function\n   */\n  getKabaneryNode: function() {\n    const ret = this.render(this.data, this.getContext());\n\n    if (isFunction(ret)) { // closure\n      this.render = ret;\n      return this.render(this.data, this.getContext());\n    } else {\n      return ret;\n    }\n  },\n\n  getKNode: function() {\n    return this.kNode;\n  },\n\n  getNode: function() {\n    return this.node;\n  },\n\n  getData: function() {\n    return this.data;\n  },\n\n  // TODO refator\n  transferCtx: function(newNode) {\n    newNode.ctx = this.getContext();\n    this.node = newNode;\n  },\n\n  getContext: function() {\n    return this._ctx;\n  }\n};\n\nvar getViewContext = (view, obj) => {\n  const _ctx = {};\n\n  const ctxInst = new ViewContext(view, obj);\n\n  ctxInst._ctx = _ctx;\n\n  for (const name in ViewContext.prototype) {\n    if (name !== 'construct') {\n      _ctx[name] = (...args) => ctxInst[name].apply(ctxInst, args);\n    }\n  }\n\n  return _ctx;\n};\n\nmodule.exports = {\n  view: (viewFun) => {\n    return (obj) => {\n      // create context\n      const ctx = getViewContext(viewFun, obj);\n      // render node\n      const viewNode = n(() => ctx.renderView());\n      // export context\n      viewNode.ctx = ctx;\n      viewNode.__isViewNode = true;\n\n      return viewNode;\n    };\n  },\n\n  // TODO exports interface to expand context prototype\n  isViewNode\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/index.js?");

/***/ }),

/***/ "../../src/view/isViewNode.js":
/*!*************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/isViewNode.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  isObject\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\n\nmodule.exports = (v) => isObject(v) && v.__isViewNode;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/isViewNode.js?");

/***/ }),

/***/ "../../src/view/replace/diffNode.js":
/*!*******************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/diffNode.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  isNode,\n  removeNode\n} = __webpack_require__(/*! ../../util */ \"../../src/util/index.js\");\nconst isViewNode = __webpack_require__(/*! ../isViewNode */ \"../../src/view/isViewNode.js\");\nconst {\n  getTagName,\n  getTextAreaTextContent,\n  getAttributeValue\n} = __webpack_require__(/*! ./util */ \"../../src/view/replace/util.js\");\nconst {\n  toDomNode\n} = __webpack_require__(/*! ../../resolver */ \"../../src/resolver/index.js\");\nconst {\n  eventMapHook\n} = __webpack_require__(/*! ../../const */ \"../../src/const/index.js\");\nconst editAttributes = __webpack_require__(/*! ./editAttributes */ \"../../src/view/replace/editAttributes.js\");\nconst {\n  isKabaneryNode\n} = __webpack_require__(/*! ../../n */ \"../../src/n/index.js\");\n\n/**\n * replace old node with new node\n */\nconst replaceDirectly = (node, newKNode) => {\n  const parent = node.parentNode;\n  const newNode = toDomNode(newKNode);\n  if (!parent) {\n    return newNode;\n  }\n\n  // replace\n  parent.replaceChild(newNode, node);\n  return newNode;\n};\n\n// node and newKNode have the same tagName\nconst editNode = (node, newKNode, oldKNode) => {\n  // attributes\n  editAttributes(node, newKNode, oldKNode);\n\n  // hacks for dom\n  if (getTagName(node) === 'TEXTAREA') {\n    node.value = getTextAreaTextContent(newKNode);\n  }\n  if (getTagName(node) === 'INPUT') {\n    node.value = getAttributeValue(newKNode, 'value');\n  }\n\n  // transfer event map\n  node[eventMapHook] = newKNode.eventMap || {};\n\n  // TODO using key\n  diffList(newKNode.childNodes, oldKNode.childNodes, node);\n};\n\nconst diffList = (newKChilds, oldKChilds, parent) => {\n  const childNodes = parent.childNodes,\n    oldLen = oldKChilds.length,\n    newLen = newKChilds.length;\n\n  // remove\n  for (let i = newLen; i < oldLen; i++) {\n    childNodes[i] && removeNode(childNodes[i]);\n  }\n\n  // diff\n  for (let i = 0, n = Math.min(newLen, oldLen); i < n; i++) {\n    diffNode(childNodes[i], newKChilds[i], oldKChilds[i]);\n  }\n\n  // append\n  for (let i = oldLen; i < newLen; i++) {\n    parent.appendChild(toDomNode(newKChilds[i]));\n  }\n};\n\nconst diffNode = (node, newKNode, oldKNode) => {\n  if (!isNode(node)) return node;\n\n  const newKabNode = isViewNode(newKNode) ? newKNode.ctx.getKabaneryNode() : newKNode;\n  const oldKabNode = isViewNode(oldKNode) ? oldKNode.ctx.getKNode() : oldKNode;\n\n  if (isKabaneryNode(newKabNode) && isKabaneryNode(oldKabNode)) {\n    if (getTagName(oldKabNode) !== getTagName(newKabNode)) {\n      return replaceDirectly(node, newKabNode);\n    } else {\n      editNode(node, newKabNode, oldKabNode);\n      return node;\n    }\n  } else {\n    return replaceDirectly(node, newKNode);\n  }\n};\n\nmodule.exports = diffNode;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/diffNode.js?");

/***/ }),

/***/ "../../src/view/replace/editAttributes.js":
/*!*************************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/editAttributes.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  hasOwnProperty\n} = __webpack_require__(/*! ../../util */ \"../../src/util/index.js\");\n\nconst {\n  getAttrMap\n} = __webpack_require__(/*! ./util */ \"../../src/view/replace/util.js\");\n\nmodule.exports = (node, newKNode, oldKNode) => {\n  // attributes\n  const orinAttrMap = getAttrMap(oldKNode);\n  const newAttrMap = getAttrMap(newKNode);\n\n  // update and remove\n  for (const name in orinAttrMap) {\n    const orinValue = orinAttrMap[name];\n    if (hasOwnProperty(newAttrMap, name)) {\n      let newValue = newAttrMap[name];\n      if (newValue !== orinValue) {\n        node.setAttribute(name, newValue);\n      }\n    } else {\n      node.removeAttribute(name);\n    }\n  }\n\n  for (const name in newAttrMap) {\n    const newAttr = newAttrMap[name];\n    if (!hasOwnProperty(orinAttrMap, name)) {\n      node.setAttribute(name, newAttr);\n    }\n  }\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/editAttributes.js?");

/***/ }),

/***/ "../../src/view/replace/index.js":
/*!****************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst diffNode = __webpack_require__(/*! ./diffNode */ \"../../src/view/replace/diffNode.js\");\nconst {\n  toDomNode\n} = __webpack_require__(/*! ../../resolver */ \"../../src/resolver/index.js\");\nconst {\n  removeNode\n} = __webpack_require__(/*! ../../util */ \"../../src/util/index.js\");\n\n// TODO type check for newNode\nmodule.exports = (realNode, newKNode, oldKNode) => {\n  if (!realNode) { // add new node\n    return toDomNode(newKNode);\n  } else if (!newKNode) { // delete old node\n    removeNode(realNode);\n    return null;\n  } else { // diff with old node\n    return diffNode(realNode, newKNode, oldKNode);\n  }\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/index.js?");

/***/ }),

/***/ "../../src/view/replace/util.js":
/*!***************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/util.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst {\n  isNode,\n  getAttributeMap\n} = __webpack_require__(/*! ../../util */ \"../../src/util/index.js\");\n\nconst getTagName = (node) => {\n  return node.tagName.toUpperCase();\n};\n\nconst getAttrMap = (node) => {\n  if (isNode(node)) {\n    return getAttributeMap(node.attributes);\n  } else { // kabanery node\n    return node.attrMap;\n  }\n};\n\nconst getTextAreaTextContent = (node) => {\n  if (isNode(node)) {\n    return node.textContent;\n  } else {\n    return (node.childNodes.length && node.childNodes[0]) || '';\n  }\n};\n\nconst getAttributeValue = (node, key) => {\n  if (isNode(node)) {\n    return node.getAttribute(key);\n  } else {\n    return node.attrMap[key];\n  }\n};\n\nmodule.exports = {\n  getTagName,\n  getAttrMap,\n  getTextAreaTextContent,\n  getAttributeValue\n};\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/replace/util.js?");

/***/ }),

/***/ "../../src/view/updateData.js":
/*!*************************************************************************************!*\
  !*** /Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/updateData.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const {\n  set,\n  isFunction,\n  likeArray\n} = __webpack_require__(/*! ../util */ \"../../src/util/index.js\");\n\nconst updateData = (data, scripts) => {\n  if (scripts.length === 1 && likeArray(scripts[0])) {\n    let arg = scripts[0];\n    for (let i = 0, n = arg.length; i < n; i++) {\n      const item = arg[i];\n      set(data, item[0], item[1]);\n    }\n  } else {\n    let [path, value] = scripts;\n\n    // function is a special data\n    if (isFunction(value)) {\n      value = value(data);\n    }\n\n    set(data, path, value);\n  }\n};\n\nmodule.exports = updateData;\n\n\n//# sourceURL=webpack:////Users/yuer/workspaceforme/ddki/tech/base/web/kabanery/src/view/updateData.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\nconst {\n  n,\n  view,\n  mount\n} = require('kabanery');\n*/\nconst {\n  n,\n  view,\n  mount\n} = __webpack_require__(/*! ../.. */ \"../../index.js\");\n\nconst PageView = view(({\n  value\n}, ctx) => {\n  return n('div', [\n    n('input', {\n      value,\n      oninput: (e) => {\n        ctx.update('value', e.target.value);\n      }\n    }),\n    n('div', [value])\n  ]);\n});\n\nmount(PageView({\n  value: 'begin'\n}), document.body);\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });