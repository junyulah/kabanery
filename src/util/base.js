'use strict';

/**
 * a.b.c
 */
let get = (sandbox, name = '') => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    let parent = sandbox;
    if (!parent) return null;
    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        parent = parent[part];
        // avoid exception
        if (!parent) return null;
    }
    return parent;
};

let set = (sandbox, name = '', value) => {
    name = name.trim();
    let parts = !name ? [] : name.split('.');
    let parent = sandbox;
    if (!isObject(parent)) return;
    if (!parts.length) return;
    for (let i = 0; i < parts.length - 1; i++) {
        let part = parts[i];
        parent = parent[part];
        // avoid exception
        if (!isObject(parent)) return null;
    }

    parent[parts[parts.length - 1]] = value;
};

/**
 * data have no circle
 *
 * TODO array
 */
let getPaths = (data, item) => {
    let paths = [];
    if (data === item) {
        return [''];
    }
    if (!isObject(data)) {
        return paths;
    }
    for (let name in data) {
        let child = data[name];
        let childPaths = getPaths(child, data);
        for (let j = 0; j < childPaths.length; j++) {
            childPaths[j] = childPaths[j] ? `${name}.${childPaths[j]}` : name;
        }
        paths = paths.concat(childPaths);
    }
    return paths;
};

let isPromise = v => v && typeof v === 'object' && typeof v.then === 'function' && typeof v.catch === 'function';

let isArray = v => v && typeof v === 'object' && typeof v.length === 'number';

let isString = v => typeof v === 'string';

let isObject = v => v && typeof v === 'object';

let isFunction = v => typeof v === 'function';

let defineProperty = (obj, key, opts) => {
    if (Object.defineProperty) {
        Object.defineProperty(obj, key, opts);
    } else {
        obj[key] = opts.value;
    }
    return obj;
};

let hasOwnProperty = (obj, key) => {
    if (obj.hasOwnProperty) {
        return obj.hasOwnProperty(key);
    }
    for (var name in obj) {
        if (name === key) return true;
    }
    return false;
};

let merge = (map1, map2) => {
    for (let name in map2) {
        map1[name] = map2[name];
    }
    return map1;
};

module.exports = {
    merge,
    isPromise,
    isString,
    isArray,
    isFunction,
    isObject,
    get,
    set,
    defineProperty,
    hasOwnProperty
};
