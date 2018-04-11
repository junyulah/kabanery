const {
  isFunction
} = require('../util');
const updateData = require('./updateData');
const replace = require('./replace');
const isViewNode = require('./isViewNode');
const {
  n
} = require('../n');
const {
  mount
} = require('../resolver');

const ViewContext = function(view, obj) {
  this.node = null;
  this.data = obj;
  this.render = view;
  this.kNode = null;
};

ViewContext.prototype = {
  construct: ViewContext,

  update: function(...args) {
    updateData(this.data, args);
    return this.renderView();
  },

  appendView: function(itemView) {
    if (this.node) {
      mount(itemView, this.node);
    }
  },

  renderView: function() {
    const newKNode = this.getKabaneryNode();
    this.node = replace(this.node, newKNode, this.kNode);
    this.kNode = newKNode;
    if (this.node) {
      this.node.ctx = this.getContext();
    }
    return this.node;
  },

  getKabaneryNode: function() {
    let ret = this.render(this.data, this.getContext());

    if (isFunction(ret)) {
      this.render = ret;
      return this.render(this.data, this.getContext());
    } else {
      return ret;
    }
  },

  getKNode: function() {
    return this.kNode;
  },

  getNode: function() {
    return this.node;
  },

  getData: function() {
    return this.data;
  },

  // TODO refator
  transferCtx: function(newNode) {
    newNode.ctx = this.getContext();
    this.node = newNode;
  },

  getContext: function() {
    return this._ctx;
  }
};

var getViewContext = (view, obj) => {
  const _ctx = {};

  const ctxInst = new ViewContext(view, obj);

  ctxInst._ctx = _ctx;

  for (const name in ViewContext.prototype) {
    if (name !== 'construct') {
      _ctx[name] = (...args) => ctxInst[name].apply(ctxInst, args);
    }
  }

  return _ctx;
};

module.exports = {
  view: (viewFun) => {
    return (obj) => {
      // create context
      const ctx = getViewContext(viewFun, obj);
      // render node
      const viewNode = n(() => ctx.renderView());
      // export context
      viewNode.ctx = ctx;
      viewNode.__isViewNode = true;

      return viewNode;
    };
  },

  // TODO exports interface to expand context prototype
  isViewNode
};
