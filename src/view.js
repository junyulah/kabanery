'use strict';

let {
    set,
    isObject,
    isFunction
} = require('./util');

let {
    clearBelow
} = require('./event');

/**
 * render function: (data) => node
 */

// class level
module.exports = (render, construct, {
    afterRender
} = {}) => {
    // TODO class level API
    // instance level
    return (obj, initor) => {
        let node = null,
            data = null;

        let update = (path, value) => {
            set(data, path, value);
            return renderView();
        };

        let renderView = () => {
            clearBelow(node);
            //
            let newNode = render(data, ctx);
            edit(node, newNode);
            node = newNode;
            afterRender && afterRender(ctx);
            return node;
        };

        let getNode = () => node;

        let ctx = {
            update,
            getNode
        };

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

        // only run initor when construct view
        initor && initor(data, ctx);
        construct && construct(data, ctx);

        // render node
        return renderView();
    };
};

// TODO diff node, opt algo
let edit = (node, newNode) => {
    if (!node) {
        return;
    }

    node.parentNode && node.parentNode.replaceChild(newNode, node);
    // convertNode(node, newNode);
};

// TODO events problem
let convertNode = (node, newNode) => {
    if (node.tagName !== newNode.tagName) {
        node.parentNode && node.parentNode.replaceChild(newNode, node);
    } else {
        // attributes
        let orinAttrs = node.attributes || [];
        for (let i = 0; i < orinAttrs.length; i++) {
            node.removeAttribute(orinAttrs[i].name);
        }

        let newAttrs = newNode.attributes || [];
        for (let i = 0; i < newAttrs.length; i++) {
            let {
                name, value
            } = newAttrs[i];
            node.setAttribute(name, value);
        }

        //
        let oriChildNodes = node.childNodes;
        let newChildNodes = newNode.childNodes;

        // remove redundant
        let rest = [];
        for (let i = newChildNodes.length; i < oriChildNodes.length; i++) {
            rest.push(oriChildNodes[i]);
        }

        for (let i = 0; i < rest.length; i++) {
            rest[i].parentNode.removeChild(rest[i]);
        }

        // diff childs
        for (let i = 0; i < newChildNodes.length; i++) {
            let orinChild = oriChildNodes[i];
            let newChild = newChildNodes[i];
            if (!orinChild) {
                node.appendChild(newChild);
            } else {
                convertNode(orinChild, newChild);
            }
        }
    }
};
