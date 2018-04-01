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

  this.exports = {
    update: (...args) => this.update(...args),
    appendView: (...args) => this.appendView(...args),
    getNode: () => this.node,
    getData: () => this.data,
    getKNode: () => this.kNode
  };
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
      this.node.ctx = this;
    }
    return this.node;
  },

  getKabaneryNode: function() {
    let ret = this.render(this.data, this.exports);

    if (isFunction(ret)) {
      this.render = ret;
      return this.render(this.data, this.exports);
    } else {
      return ret;
    }
  },

  // TODO refator
  transferCtx: function(newNode) {
    newNode.ctx = this;
    this.node = newNode;
  }
};

module.exports = {
  view: (view) => {
    return (obj) => {
      // create context
      const ctx = new ViewContext(view, obj);
      // render node
      const viewNode = n(() => ctx.renderView());
      // export context
      viewNode.ctx = ctx;
      viewNode.__isViewNode = true;
      return viewNode;
    };
  },

  isViewNode
};
