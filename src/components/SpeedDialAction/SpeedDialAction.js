"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = require("@material-ui/core/styles");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root (`Tooltip`) component. */
    root: {
      position: 'relative'
    },

    /* Styles applied to the `Button` component. */
    button: {
      margin: 8,
      color: theme.palette.text.secondary,
      backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.background.default, 0.12),
      '&:hover': {
        backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.background.default, 0.15)
      },
      transition: "".concat(theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter
      }), ", opacity 0.8s"),
      opacity: 1
    },

    /* Styles applied to the `Button` component if `open={false}`. */
    buttonClosed: {
      opacity: 0,
      transform: 'scale(0)'
    }
  };
};

exports.styles = styles;

var SpeedDialAction =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(SpeedDialAction, _React$Component);

  function SpeedDialAction() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, SpeedDialAction);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(SpeedDialAction)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      tooltipOpen: false
    };

    _this.handleTooltipClose = function () {
      if (_this.props.tooltipOpen) return;

      _this.setState({
        tooltipOpen: false
      });
    };

    _this.handleTooltipOpen = function () {
      if (_this.props.tooltipOpen) return;

      _this.setState({
        tooltipOpen: true
      });
    };

    _this.componentDidUpdate = function (prevProps) {
      if (!_this.props.tooltipOpen || prevProps.open === _this.props.open) return;

      if (!_this.state.tooltipOpen) {
        _this.timeout = setTimeout(function () {
          return _this.setState({
            tooltipOpen: true
          });
        }, _this.props.delay + 100);
      }
    };

    _this.componentWillUnmount = function () {
      return clearTimeout(_this.timeout);
    };

    return _this;
  }

  (0, _createClass2.default)(SpeedDialAction, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          ButtonProps = _this$props.ButtonProps,
          classes = _this$props.classes,
          classNameProp = _this$props.className,
          delay = _this$props.delay,
          icon = _this$props.icon,
          id = _this$props.id,
          onClick = _this$props.onClick,
          open = _this$props.open,
          tooltipTitle = _this$props.tooltipTitle,
          tooltipPlacement = _this$props.tooltipPlacement,
          tooltipOpen = _this$props.tooltipOpen,
          other = (0, _objectWithoutProperties2.default)(_this$props, ["ButtonProps", "classes", "className", "delay", "icon", "id", "onClick", "open", "tooltipTitle", "tooltipPlacement", "tooltipOpen"]);
      return _react.default.createElement(_Tooltip.default, (0, _extends2.default)({
        id: id,
        className: (0, _classnames.default)(classes.root, classNameProp),
        title: tooltipTitle,
        placement: tooltipPlacement,
        onClose: this.handleTooltipClose,
        onOpen: this.handleTooltipOpen,
        open: open && this.state.tooltipOpen
      }, other), _react.default.createElement(_Button.default, (0, _extends2.default)({
        variant: "fab",
        mini: true,
        className: (0, _classnames.default)(classes.button, !open && classes.buttonClosed),
        style: {
          transitionDelay: "".concat(delay, "ms")
        },
        onClick: onClick,
        tabIndex: -1,
        role: "menuitem",
        "aria-labelledby": id
      }, ButtonProps), icon));
    }
  }]);
  return SpeedDialAction;
}(_react.default.Component);

SpeedDialAction.getDerivedStateFromProps = function (props, state) {
  if (!props.open && state.tooltipOpen) {
    return {
      tooltipOpen: false
    };
  }

  return null;
};

SpeedDialAction.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Properties applied to the [`Button`](/api/button) component.
   */
  ButtonProps: _propTypes.default.object,

  /**
   * Useful to extend the style applied to components.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   */
  delay: _propTypes.default.number,

  /**
   * The Icon to display in the SpeedDial Floating Action Button.
   */
  icon: _propTypes.default.node.isRequired,

  /**
   * @ignore
   */
  id: _propTypes.default.string,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * @ignore
   */
  onKeyDown: _propTypes.default.func,

  /**
   * @ignore
   */
  open: _propTypes.default.bool,

  /**
   * Make the tooltip always visible when the SpeedDial is open.
   */
  tooltipOpen: _propTypes.default.bool,

  /**
   * Placement of the tooltip.
   */
  tooltipPlacement: _propTypes.default.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Label to display in the tooltip.
   */
  tooltipTitle: _propTypes.default.node
} : {};
SpeedDialAction.defaultProps = {
  delay: 0,
  open: false,
  tooltipPlacement: 'left'
};

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiSpeedDialAction'
})(SpeedDialAction);

exports.default = _default;