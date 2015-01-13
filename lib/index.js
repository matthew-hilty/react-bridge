var React, adapters, connectTo, createSensitizingMixin;

adapters = require('./adapters');

connectTo = require('./factory-injector').connectTo;

createSensitizingMixin = require('./createSensitizingMixin');

React = require('./react');

module.exports = {
  adapters: adapters,
  createSensitizingMixin: createSensitizingMixin,
  connectTo: connectTo,
  React: React
};
