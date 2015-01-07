var ObjProto, hasType, isArray, isFunction, isObject, isString, memoize, shallowCopy, toString, _ref,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty;

hasType = function(type) {
  return function(val) {
    return ("[object " + type + "]") === toString(val);
  };
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
