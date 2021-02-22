import { defineProperty as _defineProperty } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

function Wrap(_ref) {
  var _classNames;

  var children = _ref.children,
      bleedBelow = _ref.bleedBelow,
      dataTest = _ref.dataTest;
  return React.createElement("div", {
    className: classNames((_classNames = {}, _defineProperty(_classNames, styles.root, true), _defineProperty(_classNames, styles.bleedBelowSmall, bleedBelow === 'small'), _defineProperty(_classNames, styles.bleedBelowMedium, bleedBelow === 'medium'), _defineProperty(_classNames, styles.bleedBelowLarge, bleedBelow === 'large'), _classNames)),
    "data-test": dataTest
  }, children);
}

export default Wrap;
//# sourceMappingURL=index.js.map
