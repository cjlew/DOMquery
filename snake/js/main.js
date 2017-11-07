const View = require('./snake-view.js');

$( () => {
  const $rootEl = $('.snake-game');
  new View($rootEl);
});

console.log("A-OK!");
