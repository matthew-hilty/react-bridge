var BUTTON, CHECKBOX, FORM, LABEL, LINK, PASSWORD, TEXT, collectAdapters, dollarize, ensureCheckboxProps, ensureLinkProps, ensurePasswordProps, ensureProps, ensureTextProps, getAdapter, getAdapters, isObject, isString, onChange, onClick, onSubmit, shallowCopy, _ref;

getAdapter = require('./adapter-utilities').getAdapter;

_ref = require('./utilities'), isObject = _ref.isObject, isString = _ref.isString, shallowCopy = _ref.shallowCopy;

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
