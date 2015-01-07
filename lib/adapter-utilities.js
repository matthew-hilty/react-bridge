var getAdapter, getInjectedFactory, getTemplate, handlerRegex, inject, isFunction, isHandler,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

getInjectedFactory = require('./factory-injector').getInjectedFactory;

isFunction = require('./utilities').isFunction;

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
