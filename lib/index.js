var connectTo, createSensitizingMixin, getAdapters, getBridge;

connectTo = require('./factory-injector').connectTo;

createSensitizingMixin = require('./createSensitizingMixin');

getAdapters = require('./getAdapters');

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
