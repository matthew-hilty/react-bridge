var connectTo, createInjectable, embedEventInside, eventHandler, exportReactEvents, getCapsule, getInjectedFactory, getWrapper, hasher, isFunction, isString, memoize, shallowCopy, stringify, _getInjectedFactory, _ref;

_ref = require('./utilities'), isFunction = _ref.isFunction, isString = _ref.isString, memoize = _ref.memoize, shallowCopy = _ref.shallowCopy;

eventHandler = null;

connectTo = function(_eventHandler) {
  return eventHandler = _eventHandler;
};

createInjectable = function(template) {
  var getFactory, getHandlerForType, inject;
  getHandlerForType = null;
  inject = function(_getHandlerForType) {
    return getHandlerForType = _getHandlerForType;
  };
  getFactory = function() {
    if (isFunction(getHandlerForType)) {
      return template(getHandlerForType);
    }
  };
  return {
    inject: inject,
    getFactory: getFactory
  };
};

embedEventInside = function(capsule) {
  return function(event) {
    capsule.event = event;
    return capsule;
  };
};

exportReactEvents = function(event) {
  if (isFunction(eventHandler)) {
    return eventHandler(event);
  }
};

getCapsule = function(type, label_slash_capsule, handler) {
  var capsule;
  if (isString(label_slash_capsule)) {
    return {
      handler: handler,
      label: label_slash_capsule,
      type: type
    };
  } else {
    capsule = shallowCopy(label_slash_capsule);
    capsule.handler = handler;
    capsule.type = type;
    return capsule;
  }
};

_getInjectedFactory = function(template, type) {
  return function(label_slash_capsule) {
    var getHandlerForType, injectable;
    getHandlerForType = function(eventType) {
      var wrap;
      wrap = getWrapper(type, label_slash_capsule, eventType);
      return function(event) {
        return exportReactEvents(wrap(event));
      };
    };
    injectable = createInjectable(template);
    injectable.inject(getHandlerForType);
    return injectable.getFactory();
  };
};

getInjectedFactory = function(template, type) {
  return memoize(_getInjectedFactory(template, type), hasher);
};

getWrapper = function(type, label_slash_capsule, eventType) {
  return embedEventInside(getCapsule(type, label_slash_capsule, eventType));
};

hasher = function(val) {
  if (isString(val)) {
    return val;
  } else {
    return stringify(val);
  }
};

stringify = JSON.stringify;

module.exports = {
  connectTo: connectTo,
  getInjectedFactory: getInjectedFactory
};
