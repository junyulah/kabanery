'use strict';

let {
  contain
} = require('bolzano');

let {
  eventMapHook,
  globalEventTypePrefix,
  stopPropagationFlag
} = require('../const');

module.exports = () => {
  let docs = [];
  let eventTypeMap = {};
  let handlerMap = {};

  let listenEventType = (type) => {
    if (!eventTypeMap[type]) {
      updateDocs(type);
    }
    eventTypeMap[type] = true;
  };

    /**
     * attach document used to accept events
     */
  let attachDocument = (doc = document) => {
    if (!contain(docs, doc)) {
      for (let type in eventTypeMap) {
        // prevent multiple version of kabanery to binding multiple times for the same type
        let id = getGlobalEventTypeId(type);
        if (!doc[id]) {
          addEventListenerToDoc(doc, type);
          doc[id] = true;
        }
      }
      docs.push(doc);
    }
  };

  let updateDocs = (type) => {
    if (!docs.length) {
      docs.push(document);
    }
    for (let i = 0; i < docs.length; i++) {
      let doc = docs[i];
      addEventListenerToDoc(doc, type);
    }
  };

  let addEventListenerToDoc = (doc, type) => {
    let handler = null;
    if (handlerMap[type]) {
      handler = handlerMap[type];
    } else {
      handler = listener(type);
      handlerMap[type] = handler;
    }
    doc.addEventListener(type, handler);
  };

  let clearEvents = () => {
    for (let type in eventTypeMap) {
      removeListenerType(type);
    }
  };

  let removeListenerType = (type) => {
    let handler = handlerMap[type];
    if (handler) {
      for (let i = 0; i < docs.length; i++) {
        let doc = docs[i];
        doc.removeEventListener(type, handler);
      }
      delete handlerMap[type];
      delete eventTypeMap[type];
    }
  };

  let getDocs = () => docs.slice(0);

  /**
     * e = {
     *  target,
     *  stopPropagation [optional]
     * }
     */
  let listener = (type) => function(e) {
    let ctx = this;
    let target = e.target;

    // hack the stopPropagration function
    let oldProp = e.stopPropagation;
    e.stopPropagation = function(...args) {
      e[stopPropagationFlag] = true;
      return oldProp && oldProp.apply(this, args);
    };

    let nodePath = getNodePath(target);

    for (let i = 0; i < nodePath.length; i++) {
      let node = nodePath[i];
      applyNodeHandlers(e, type, node, ctx);
    }
  };

  let applyNodeHandlers = (e, type, node, ctx) => {
    if (e.__stopPropagation) { // event already been stoped by child node
      return true;
    }

    let handler = getHandler(type, node);
    return handler && handler.apply(ctx, [e]);
  };

  let getHandler = (type, target) => {
    let eventMap = target && target[eventMapHook];
    return eventMap && eventMap[type];
  };

  let dispatchEvent = (type, e) => {
    let handler = handlerMap[type];
    handler && handler(e);
  };

  return {
    listenEventType,
    clearEvents,
    removeListenerType,
    getDocs,
    attachDocument,
    dispatchEvent
  };
};

/**
 * get the path of node
 */
let getNodePath = (target) => {
  let paths = [];
  while (target) {
    paths.push(target);
    target = target.parentNode;
  }
  return paths;
};

let getGlobalEventTypeId = (type) => `${globalEventTypePrefix}${type}`;
