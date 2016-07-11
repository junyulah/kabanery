'use strict';


let util = require('./util');

let {
    isObject,
    isFunction,
    get,
    authProp
} = util;

let {
    set
} = authProp({});

/**
 * pure data drive rendering
 *
 *
 * component
 *
 * <div bind-render='a.b: f'></div>
 *
 * TODO template iteration support
 * TODO async render support
 *
 *
 * render model (d, f, n)
 *
 * d: data
 *
 * f: render function
 *
 * n: node to be rendered
 */

const BIND_RENDER = 'bind-render'; // (d, f, n)
const BIND_DATA = 'bind-data';

// nodePath: valuePath; nodePath: valuePath
// textContext: a.b.c; style: e.f
const BIND_ATTACH = 'bind-attach';

let parseComponentStr = (str) => {
    let parts = str.split(':');
    return {
        dataPath: (parts[1] || '').trim(),
        viewerPath: parts[0].trim()
    };
};

let parseAttachStr = (str) => {
    let ret = [];
    let lines = str.split(';');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let kvs = line.split(':');
        ret.push({
            left: kvs[0].trim(),
            right: (kvs[1] || '').trim()
        });
    }
    return ret;
};

let wrapData = (data, viewer, node, tpl) => {
    let obj = {};
    set(obj, 'viewer', viewer);
    set(obj, 'node', node);
    set(obj, 'tpl', tpl);
    set(data, '__render', obj);
};

let getChildContext = (child, curContext) => {
    if (child.hasAttribute(BIND_DATA)) {
        let dataPath = child.getAttribute(BIND_DATA).trim();
        return get(curContext, dataPath);
    } else {
        return curContext;
    }
};

/**
 * expand a node by some restriants
 */
let expandNode = (node, data) => {
    let children = node.children;

    // bind event
    if (isActionNode(node)) {
        bindAction(node, data);
    }

    // bind attach
    if (isAttachNode(node)) {
        bindAttach(node, data);
    }

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        // context descend
        let childContext = getChildContext(child, data);
        //
        if (isRenderPlacer(child)) { // find component
            // render component
            expandRenderPlacer(child, childContext);
        } else {
            // looking up nexts
            expandNode(child, childContext);
        }
    }
    return node;
};

let bindAttach = (node, context) => {
    let str = node.getAttribute(BIND_ATTACH) || '';
    let attachs = parseAttachStr(str);
    for (let i = 0; i < attachs.length; i++) {
        let {
            left, right
        } = attachs[i];
        let value = get(context, right);
        if (left.indexOf('attr.') === 0) {
            left = left.substring(5);
            node.setAttribute(left, value);
        } else {
            util.set(node, left, value);
        }
    }
};

let expandRenderPlacer = (node, context) => {
    let str = node.getAttribute(BIND_RENDER) || '';
    let {
        dataPath, viewerPath
    } = parseComponentStr(str);

    let data = get(context, dataPath),
        viewer = get(context, viewerPath);

    apply(viewer, data, node);
};

let apply = (viewer, data, node) => {
    let newNode = genNode(viewer, data, node);
    // expand node
    newNode = expandNode(newNode, data);
    // replace
    // TODO with diff [opt]
    node.parentNode.replaceChild(newNode, node);
};

let genNode = (viewer, data, tpl) => {
    if (!isObject(data)) {
        throw new TypeError(`render data must be object or array, but got ${data} and type is ${typeof data}`);
    }

    if (!isFunction(viewer)) {
        throw new TypeError(`render function must be a function, but got ${viewer} and type if ${typeof viewer}`);
    }
    let node = viewer(data, tpl);
    // TODO check type of node
    wrapData(data, viewer, node, tpl.cloneNode(true));
    return node;
};

/**
 * TODO expand argument from special data to general data
 */
let update = (item) => {
    if (!isObject(item)) {
        throw new TypeError(`item should be object, but got ${item} and the type is ${typeof item}`);
    }
    let renderOpts = item.__render;
    apply(renderOpts.viewer, item, renderOpts.node);
};

// TODO optimze event binding
let bindAction = (node, context) => {
    let str = node.getAttribute('bind-action');
    let parts = str.split(':');
    let type = parts[0].trim(),
        actionPath = (parts[1] || '').trim();
    if (!actionPath) return;
    let fun = get(context, actionPath);
    if (!isFunction(fun)) {
        console && console.warn(`when bind event on node, missing function for path ${actionPath}, in context ${context}.`); // eslint-disable-line
        return;
    }
    //
    node.addEventListener(type, fun);
};

let isRenderPlacer = (node) => {
    return node.hasAttribute && node.hasAttribute(BIND_RENDER);
};

let isActionNode = (node) => {
    return node.hasAttribute && node.hasAttribute('bind-action');
};

let isAttachNode = (node) => {
    return node.hasAttribute && node.hasAttribute(BIND_ATTACH);
};

module.exports = {
    render: expandNode,
    update
};
