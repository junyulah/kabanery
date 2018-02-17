'use strict';

let {
    set
} = require('jsenhance');

let {
    isObject,
    isFunction,
    likeArray
} = require('basetype');

let {
    forEach
} = require('bolzano');

let replace = require('./replace');

let mount = require('./mount');

/**
 * render function: (data) => node
 */

// TODO observable for update, append

// class level
const View = (view, construct, options = {}) => {
    // TODO class level API
    // instance level
    const viewer = (obj, initor) => {
        // create context
        let ctx = createCtx(view, options);
        return createView(ctx, obj, initor, construct);
    };

    viewerOps(viewer, view, construct, options);

    return viewer;
};

/**
 * provide some basic view operations
 */
const viewerOps = (viewer, view, construct, options) => {
    viewer.create = (handler) => {
        let ctx = createCtx(view, options);

        handler && handler(ctx);

        let inst = (obj, initor) => {
            return createView(ctx, obj, initor, construct);
        };

        inst.ctx = ctx;

        return inst;
    };

    // extend some context
    viewer.expand = (ctxMap = {}) => {
        let newViewer = (...args) => {
            let obj = args[0];
            args[0] = View.ext(obj, ctxMap);

            return viewer(...args);
        };

        viewerOps(newViewer, view, construct, options);
        return newViewer;
    };
};

View.ext = (data, ctxMap = {}) => (ctx) => {
    for (let name in ctxMap) {
        ctx[name] = ctxMap[name];
    }
    if (isFunction(data)) { // support data as function
        return data(ctx);
    }
    return data;
};

const createView = (ctx, obj, initor, construct) => {
    let data = ctx.initData(obj, ctx);
    // only run initor when construct view
    initor && initor(data, ctx);
    construct && construct(data, ctx);

    // render node
    return ctx.replaceView();
};

const updateData = (data, scripts) => {
    if (scripts.length === 1 && likeArray(scripts[0])) {
        let arg = scripts[0];
        forEach(arg, (item) => {
            set(data, item[0], item[1]);
        });
    } else {
        let [path, value] = scripts;

        // function is a special data
        if (isFunction(value)) {
            value = value(data);
        }

        set(data, path, value);
    }
};

const createCtx = (view, {
    afterRender
}) => {
    let node = null,
        data = null,
        render = null;

    const update = (...args) => {
        updateData(data, args);
        return replaceView();
    };

    const appendView = (itemView) => {
        if (node) {
            mount(itemView, node);
        }
    };

    const replaceView = () => {
        node = replace(node, getNewRenderNode());

        afterRender && afterRender(ctx);

        if (node) node.ctx = ctx;
        return node;
    };

    const getNewRenderNode = () => {
        if (!render) render = view;
        let ret = render(data, ctx);

        if (isFunction(ret)) {
            render = ret;
            return render(data, ctx);
        } else {
            return ret;
        }
    };

    const initData = (obj = {}) => {
        data = generateData(obj, ctx);
        return data;
    };

    const getNode = () => node;

    const getData = () => data;

    const getCtx = () => ctx;

    // TODO refator
    const transferCtx = (newNode) => {
        node = newNode;
        newNode.ctx = ctx;
    };

    const ctx = {
        update,
        updateData,
        getNode,
        getData,
        transferCtx,
        initData,
        replaceView,
        appendView,
        getCtx
    };

    return ctx;
};

const generateData = (obj, ctx) => {
    let data = null;
    // data generator
    if (isFunction(obj)) {
        data = obj(ctx);
    } else {
        data = obj;
    }

    // TODO need mount event
    if (!isObject(data)) {
        throw new TypeError(`Expect object, but got ${data}. Type is ${typeof data}`);
    }
    return data;
};

module.exports = View;
