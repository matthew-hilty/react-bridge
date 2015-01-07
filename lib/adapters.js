var BUTTON, CHECKBOX, FORM, LABEL, LINK, PASSWORD, TEXT, a, button, collectAdapters, dollarize, ensureCheckboxProps, ensureLinkProps, ensurePasswordProps, ensureProps, ensureTextProps, form, getAdapter, input, isObject, isString, label, onChange, onClick, onSubmit, records, shallowCopy, _ref, _ref1;

_ref = require('react').DOM, a = _ref.a, button = _ref.button, form = _ref.form, input = _ref.input, label = _ref.label;

getAdapter = require('./adapter-utilities').getAdapter;

_ref1 = require('./utilities'), isObject = _ref1.isObject, isString = _ref1.isString, shallowCopy = _ref1.shallowCopy;

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

records = [[onClick, ensureProps, button, BUTTON], [onClick, ensureCheckboxProps, input, CHECKBOX], [onSubmit, ensureProps, form, FORM], [onClick, ensureProps, label, LABEL], [onClick, ensureLinkProps, a, LINK], [onChange, ensurePasswordProps, input, PASSWORD], [onChange, ensureTextProps, input, TEXT]];

module.exports = collectAdapters({}, records);
