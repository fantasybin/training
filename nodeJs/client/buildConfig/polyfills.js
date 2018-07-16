
/*eslint-disable*/
// Safari Map constructor does not accept arguments
if (!window.Map) {
  window.Map = require('es6-map/polyfill');
} else {
  try {
    new window.Map([['k', 'v']]);
  } catch (e) {
    // Native Map doesn't support constructor arguments (Safari 8 and below).
    window.Map = require('es6-map/polyfill');
  }
}

// 增加set支持
if (!window.Set || !window.Set.prototype.forEach) {
  window.Set = require('es6-set/polyfill');
}
