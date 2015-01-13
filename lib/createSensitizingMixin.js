var createSensitizingMixin, exportReactEvents, getCapsule, wrapSensitiveComponentWith, _ref;

_ref = require('./factory-injector'), exportReactEvents = _ref.exportReactEvents, getCapsule = _ref.getCapsule;

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
