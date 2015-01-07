var adapters, connectTo, sensitize;

adapters = require('./adapters');

connectTo = require('./factory-injector').connectTo;

sensitize = require('./sensitive-component');

module.exports = {
  adapters: adapters,
  connectTo: connectTo,
  sensitize: sensitize
};
