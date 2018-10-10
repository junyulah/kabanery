const {
  isFunction
} = require('../util');
const updateData = require('./updateData');
const replace = require('./replace');
const {
  mount
} = require('../resolver');

const ViewContext = function(render, obj) {
  this.nativeNode = null; // record corresponding native node
  this.data = obj;
  this.render = render;
  this.kNode = null; // cache old kabanery node
};

ViewContext.prototype = {
  construct: ViewContext,

  update: function(...args) {
    updateData(this.data, args);
    return this.renderNativeView();
  },

  // for some special situation, like log view
  // TODO prepend?
  appendView: function(itemView) {
    if (this.nativeNode) {
      mount(itemView, this.nativeNode);
    }
  },

  /**
   * render view according to current data
   *
   * do the diff to reduce dom operations
   */
  renderNativeView: function() {
    const newKNode = this.getKabaneryNode();
    this.nativeNode = replace(this.nativeNode, newKNode, this.kNode);
    // update KNode to latest
    this.kNode = newKNode;
    return this.nativeNode;
  },

  /**
   * run render function and get the tree based on n function
   */
  renderKabaneryNode: function() {
    this.kNode = this.getKabaneryNode();
    return this.kNode;
  },

  getKabaneryNode: function() {
    const kNode = this.render(this.data, this.getContext());

    if (isFunction(kNode)) { // closure
      this.render = kNode;
      return this.getKabaneryNode(this.data, this.getContext());
    } else {
      kNode.ctx = this.getContext(); // hook the content
      return kNode;
    }
  },

  getKNode: function() {
    return this.kNode;
  },

  getNativeNode: function() {
    return this.nativeNode;
  },

  getData: function() {
    return this.data;
  },

  getContext: function() {
    return this._ctx;
  },

  bindNativeNode: function(node) {
    this.nativeNode = node;
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
  /**
   * create a view class
   */
  view: (viewFun) => {
    /**
     * create a view instance
     *
     * (data) -> nativeNode
     */
    return (obj) => {
      // create context
      const ctx = getViewContext(viewFun, obj);
      // render node
      const kNode = ctx.renderKabaneryNode();

      return kNode;
    };
  }
};
