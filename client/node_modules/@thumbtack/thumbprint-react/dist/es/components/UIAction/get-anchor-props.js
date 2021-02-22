import isThumbtackUrl from './is-thumbtack-url.js';

var getRel = function getRel(url) {
  var shouldOpenInNewTab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (shouldOpenInNewTab) {
    if (isThumbtackUrl(url)) {
      // There are performance benefits of adding `rel="noopener"`.
      // https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
      return 'noopener';
    } // https://mathiasbynens.github.io/rel-noopener/
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md


    return 'noopener noreferrer';
  }

  return undefined;
};

/**
 * Enable plain and themed `<a>` elements to share the same props.
 */
var getAnchorProps = function getAnchorProps(_ref) {
  var isDisabled = _ref.isDisabled,
      shouldOpenInNewTab = _ref.shouldOpenInNewTab,
      to = _ref.to,
      onClick = _ref.onClick;
  return {
    onClick: onClick,
    href: isDisabled ? undefined : to,
    target: shouldOpenInNewTab ? '_blank' : '_self',
    // NOTE use `noopener` even for internal links in new tabs to prevent potential slowdown of
    // new tab https://mathiasbynens.github.io/rel-noopener/
    rel: getRel(to, shouldOpenInNewTab)
  };
};

export default getAnchorProps;
//# sourceMappingURL=get-anchor-props.js.map
