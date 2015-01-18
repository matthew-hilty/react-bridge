!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactBridge=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var getAdapter, getInjectedFactory, getTemplate, handlerRegex, inject, isFunction, isHandler,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

getInjectedFactory = _dereq_('./factory-injector').getInjectedFactory;

isFunction = _dereq_('./utilities').isFunction;

getAdapter = function(record) {
  var adapterType, defaultEventType, ensureProps, reactFactory;
  defaultEventType = record[0], ensureProps = record[1], reactFactory = record[2], adapterType = record[3];
  return getInjectedFactory(getTemplate(defaultEventType, ensureProps, reactFactory), adapterType);
};

getTemplate = function(defaultEventType, ensureProps, reactFactory) {
  var _inject;
  _inject = inject(defaultEventType, ensureProps);
  return function(getHandlerForType) {
    return function() {
      var components, newProps, props;
      props = arguments[0], components = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      newProps = _inject(getHandlerForType, props);
      return reactFactory.apply(null, [newProps].concat(__slice.call(components)));
    };
  };
};

inject = function(defaultEventType, ensureProps) {
  return function(getHandlerForType, props) {
    var key, needsHandler, newProps, value;
    needsHandler = true;
    newProps = ensureProps(props);
    for (key in newProps) {
      if (!__hasProp.call(newProps, key)) continue;
      value = newProps[key];
      if (isHandler(key)) {
        needsHandler = false;
        if (!isFunction(value)) {
          newProps[key] = getHandlerForType(key);
        }
      }
    }
    if (needsHandler) {
      newProps[defaultEventType] = getHandlerForType(defaultEventType);
    }
    return newProps;
  };
};

isHandler = function(val) {
  return handlerRegex.test(val);
};

handlerRegex = /^on[A-Z]/;

module.exports = {
  getAdapter: getAdapter
};



},{"./factory-injector":4,"./utilities":6}],2:[function(_dereq_,module,exports){
var BUTTON, CHECKBOX, FORM, LABEL, LINK, PASSWORD, TEXT, collectAdapters, dollarize, ensureCheckboxProps, ensureLinkProps, ensurePasswordProps, ensureProps, ensureTextProps, getAdapter, getAdapters, isObject, isString, onChange, onClick, onSubmit, shallowCopy, _ref;

getAdapter = _dereq_('./adapter-utilities').getAdapter;

_ref = _dereq_('./utilities'), isObject = _ref.isObject, isString = _ref.isString, shallowCopy = _ref.shallowCopy;

BUTTON = 'button';

CHECKBOX = 'checkbox';

FORM = 'form';

LABEL = 'label';

LINK = 'link';

PASSWORD = 'password';

TEXT = 'text';

onChange = 'onChange';

onClick = 'onClick';

onSubmit = 'onSubmit';

collectAdapters = function(container, data) {
  var record, _i, _len;
  for (_i = 0, _len = data.length; _i < _len; _i++) {
    record = data[_i];
    container[dollarize(record[3])] = getAdapter(record);
  }
  return container;
};

dollarize = function(string) {
  return '$' + string;
};

getAdapters = function(DOMElements) {
  var a, button, form, input, label, records;
  a = DOMElements.a, button = DOMElements.button, form = DOMElements.form, input = DOMElements.input, label = DOMElements.label;
  records = [[onClick, ensureProps, button, BUTTON], [onClick, ensureCheckboxProps, input, CHECKBOX], [onSubmit, ensureProps, form, FORM], [onClick, ensureProps, label, LABEL], [onClick, ensureLinkProps, a, LINK], [onChange, ensurePasswordProps, input, PASSWORD], [onChange, ensureTextProps, input, TEXT]];
  return collectAdapters({}, records);
};

ensureCheckboxProps = function(val) {
  var newProps;
  if (isObject(val)) {
    newProps = shallowCopy(val);
    newProps.type = CHECKBOX;
    return newProps;
  } else {
    return {
      type: CHECKBOX
    };
  }
};

ensureLinkProps = function(val) {
  if (isString(val)) {
    return {
      href: val
    };
  } else {
    return shallowCopy(val);
  }
};

ensurePasswordProps = function(val) {
  var newProps;
  if (isObject(val)) {
    newProps = shallowCopy(val);
    newProps.type = PASSWORD;
    return newProps;
  } else {
    return {
      type: PASSWORD
    };
  }
};

ensureProps = function(val) {
  if (isObject(val)) {
    return shallowCopy(val);
  } else {
    return {};
  }
};

ensureTextProps = function(val) {
  var newProps;
  if (isString(val)) {
    return {
      placeholder: val,
      type: TEXT
    };
  } else {
    newProps = shallowCopy(val);
    newProps.type = TEXT;
    return newProps;
  }
};

module.exports = getAdapters;



},{"./adapter-utilities":1,"./utilities":6}],3:[function(_dereq_,module,exports){
var createSensitizingMixin, exportReactEvents, getCapsule, wrapSensitiveComponentWith, _ref;

_ref = _dereq_('./factory-injector'), exportReactEvents = _ref.exportReactEvents, getCapsule = _ref.getCapsule;

wrapSensitiveComponentWith = function(label_slash_capsule) {
  return function(handler, component) {
    var capsule;
    capsule = getCapsule('sensitive', label_slash_capsule, handler);
    capsule.component = component;
    return capsule;
  };
};

createSensitizingMixin = function(label_slash_capsule) {
  var trigger, wrap;
  wrap = wrapSensitiveComponentWith(label_slash_capsule);
  trigger = function(component, lifeCycleEvent) {
    return exportReactEvents(wrap(component, lifeCycleEvent));
  };
  return {
    componentDidMount: function() {
      return trigger(this, 'onDidMount');
    },
    componentWillUnmount: function() {
      return trigger(this, 'onWillUnmount');
    }
  };
};



},{"./factory-injector":4}],4:[function(_dereq_,module,exports){
var connectTo, createInjectable, embedEventInside, eventHandler, exportReactEvents, getCapsule, getHandlerForType, getInjectedFactory, getWrapper, hasher, isFunction, isString, memoize, shallowCopy, stringify, _getInjectedFactory, _ref;

_ref = _dereq_('./utilities'), isFunction = _ref.isFunction, isString = _ref.isString, memoize = _ref.memoize, shallowCopy = _ref.shallowCopy;

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

getHandlerForType = function(type, label_slash_capsule) {
  return function(eventType) {
    var wrap;
    wrap = getWrapper(type, label_slash_capsule, eventType);
    return function(event) {
      return exportReactEvents(wrap(event));
    };
  };
};

_getInjectedFactory = function(template, type) {
  return function(label_slash_capsule) {
    var injectable;
    injectable = createInjectable(template);
    injectable.inject(getHandlerForType(type, label_slash_capsule));
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
  exportReactEvents: exportReactEvents,
  getCapsule: getCapsule,
  getInjectedFactory: getInjectedFactory
};



},{"./utilities":6}],5:[function(_dereq_,module,exports){
var connectTo, createSensitizingMixin, getAdapters, getBridge;

getAdapters = _dereq_('./adapters');

connectTo = _dereq_('./factory-injector').connectTo;

createSensitizingMixin = _dereq_('./createSensitizingMixin');

getBridge = function(DOMElements) {
  var adapters;
  adapters = getAdapters(DOMElements);
  return {
    adapters: adapters,
    createSensitizingMixin: createSensitizingMixin,
    connectTo: connectTo
  };
};

module.exports = getBridge;



},{"./adapters":2,"./createSensitizingMixin":3,"./factory-injector":4}],6:[function(_dereq_,module,exports){
var ObjProto, hasType, identity, isArray, isFunction, isObject, isString, memoize, shallowCopy, toString, _ref,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

hasType = function(type) {
  return function(val) {
    return ("[object " + type + "]") === toString(val);
  };
};

identity = function(arg1) {
  return arg1;
};

isArray = function(val) {
  return val instanceof Array;
};

memoize = function(fn, hasher) {
  var memo;
  memo = {};
  if (!isFunction(hasher)) {
    hasher = identity;
  }
  return function() {
    var args, key;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    key = hasher.apply(null, args);
    if (memo.hasOwnProperty(key)) {
      return memo[key];
    } else {
      return memo[key] = fn.apply(null, args);
    }
  };
};

shallowCopy = function(val) {
  var copy, key, prop;
  switch (false) {
    case !isObject(val):
      copy = {};
      for (key in val) {
        if (!__hasProp.call(val, key)) continue;
        prop = val[key];
        copy[key] = prop;
      }
      return copy;
    case !isArray(val):
      return val.map(identity);
    default:
      return val;
  }
};

toString = function(val) {
  return ObjProto.toString.call(val);
};

_ref = ['Function', 'Object', 'String'].map(hasType), isFunction = _ref[0], isObject = _ref[1], isString = _ref[2];

ObjProto = Object.prototype;

module.exports = {
  isFunction: isFunction,
  isObject: isObject,
  isString: isString,
  memoize: memoize,
  shallowCopy: shallowCopy
};



},{}]},{},[5])
(5)
});