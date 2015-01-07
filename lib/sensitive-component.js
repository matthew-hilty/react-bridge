var createClass, createFactory, encapsulateInfo, getInjectedFactory, sensitiveRenderMixin, sensitize, template, _ref,
  __slice = [].slice;

getInjectedFactory = require('./factory-injector').getInjectedFactory;

_ref = require('react'), createClass = _ref.createClass, createFactory = _ref.createFactory;

encapsulateInfo = function(component, state) {
  return {
    component: component,
    state: state
  };
};

sensitiveRenderMixin = function(getHandlerForType) {
  var trigger;
  trigger = function(component, state) {
    return getHandlerForType('onStateChange')(encapsulateInfo(component, state));
  };
  return {
    componentDidMount: function() {
      return trigger(this, 'didMount');
    },
    componentWillUnmount: function() {
      return trigger(this, 'willUnmount');
    }
  };
};

template = function(getHandlerForType) {
  return function() {
    var DOMFactory, getComponents, getDOMProps, mixins, sensitiveFactory, sensitiveProps, _DOMProps, _components;
    DOMFactory = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    _components = null;
    _DOMProps = null;
    getComponents = function() {
      return _components;
    };
    getDOMProps = function() {
      return _DOMProps;
    };
    sensitiveProps = {
      mixins: mixins.concat([sensitiveRenderMixin(getHandlerForType)]),
      render: function() {
        return DOMFactory.apply(null, [getDOMProps()].concat(__slice.call(getComponents())));
      }
    };
    sensitiveFactory = createFactory(createClass(sensitiveProps));
    return function() {
      var DOMProps, components;
      DOMProps = arguments[0], components = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      sensitiveProps = DOMProps.sensitiveProps;
      delete DOMProps.sensitiveProps;
      _DOMProps = DOMProps;
      _components = components;
      return sensitiveFactory(sensitiveProps);
    };
  };
};

sensitize = getInjectedFactory(template, 'sensitive');

module.exports = sensitize;
