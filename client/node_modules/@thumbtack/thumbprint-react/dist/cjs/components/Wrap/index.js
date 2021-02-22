'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var React__default = _interopDefault(React);
var classNames = _interopDefault(require('classnames'));
var styles = _interopDefault(require('./index.module.scss'));

function Wrap(_ref) {
  var _classNames;

  var children = _ref.children,
      bleedBelow = _ref.bleedBelow,
      dataTest = _ref.dataTest;
  return React__default.createElement("div", {
    className: classNames((_classNames = {}, _rollupPluginBabelHelpers.defineProperty(_classNames, styles.root, true), _rollupPluginBabelHelpers.defineProperty(_classNames, styles.bleedBelowSmall, bleedBelow === 'small'), _rollupPluginBabelHelpers.defineProperty(_classNames, styles.bleedBelowMedium, bleedBelow === 'medium'), _rollupPluginBabelHelpers.defineProperty(_classNames, styles.bleedBelowLarge, bleedBelow === 'large'), _classNames)),
    "data-test": dataTest
  }, children);
}

exports.default = Wrap;
//# sourceMappingURL=index.js.map
