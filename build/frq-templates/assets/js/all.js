(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './foundation'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./foundation'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.foundation);
    global.component = mod.exports;
  }
})(this, function (module, exports, _foundation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foundation2 = _interopRequireDefault(_foundation);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MDCComponent = function () {
    _createClass(MDCComponent, null, [{
      key: 'attachTo',
      value: function attachTo(root) {
        // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
        // returns an instantiated component with its root set to that element. Also note that in the cases of
        // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
        // from getDefaultFoundation().
        return new MDCComponent(root, new _foundation2.default());
      }
    }]);

    /**
     * @param {!Element} root
     * @param {F=} foundation
     * @param {...?} args
     */
    function MDCComponent(root) {
      var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      _classCallCheck(this, MDCComponent);

      /** @protected {!Element} */
      this.root_ = root;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      this.initialize.apply(this, args);
      // Note that we initialize foundation here and not within the constructor's default param so that
      // this.root_ is defined and can be used within the foundation class.
      /** @protected {!F} */
      this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
      this.foundation_.init();
      this.initialSyncWithDOM();
    }

    _createClass(MDCComponent, [{
      key: 'initialize',
      value: function initialize() /* ...args */{}
    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        // Subclasses must override this method to return a properly configured foundation class for the
        // component.
        throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        // Subclasses should override this method if they need to perform work to synchronize with a host DOM
        // object. An example of this would be a form control wrapper that needs to synchronize its internal state
        // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
        // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        // Subclasses may implement this method to release any resources / deregister any listeners they have
        // attached. An example of this might be deregistering a resize event from the window object.
        this.foundation_.destroy();
      }
    }, {
      key: 'listen',
      value: function listen(evtType, handler) {
        this.root_.addEventListener(evtType, handler);
      }
    }, {
      key: 'unlisten',
      value: function unlisten(evtType, handler) {
        this.root_.removeEventListener(evtType, handler);
      }
    }, {
      key: 'emit',
      value: function emit(evtType, evtData) {
        var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var evt = void 0;
        if (typeof CustomEvent === 'function') {
          evt = new CustomEvent(evtType, {
            detail: evtData,
            bubbles: shouldBubble
          });
        } else {
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(evtType, shouldBubble, false, evtData);
        }

        this.root_.dispatchEvent(evt);
      }
    }]);

    return MDCComponent;
  }();

  exports.default = MDCComponent;
  module.exports = exports['default'];
});

},{"./foundation":2}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.foundation = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MDCFoundation = function () {
    _createClass(MDCFoundation, null, [{
      key: "cssClasses",
      get: function get() {
        // Classes extending MDCFoundation should implement this method to return an object which exports every
        // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
        return {};
      }
    }, {
      key: "strings",
      get: function get() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
        return {};
      }
    }, {
      key: "numbers",
      get: function get() {
        // Classes extending MDCFoundation should implement this method to return an object which exports all
        // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
        return {};
      }
    }, {
      key: "defaultAdapter",
      get: function get() {
        // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
        // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
        // validation.
        return {};
      }
    }]);

    /**
     * @param {A=} adapter
     */
    function MDCFoundation() {
      var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, MDCFoundation);

      /** @protected {!A} */
      this.adapter_ = adapter;
    }

    _createClass(MDCFoundation, [{
      key: "init",
      value: function init() {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
      }
    }, {
      key: "destroy",
      value: function destroy() {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
      }
    }]);

    return MDCFoundation;
  }();

  exports.default = MDCFoundation;
  module.exports = exports["default"];
});

},{}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.adapter = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MDCRippleAdapter = function () {
    function MDCRippleAdapter() {
      _classCallCheck(this, MDCRippleAdapter);
    }

    _createClass(MDCRippleAdapter, [{
      key: "browserSupportsCssVars",
      value: function browserSupportsCssVars() {}
    }, {
      key: "isUnbounded",
      value: function isUnbounded() {}
    }, {
      key: "isSurfaceActive",
      value: function isSurfaceActive() {}
    }, {
      key: "isSurfaceDisabled",
      value: function isSurfaceDisabled() {}
    }, {
      key: "addClass",
      value: function addClass(className) {}
    }, {
      key: "removeClass",
      value: function removeClass(className) {}
    }, {
      key: "containsEventTarget",
      value: function containsEventTarget(target) {}
    }, {
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(evtType, handler) {}
    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(evtType, handler) {}
    }, {
      key: "registerDocumentInteractionHandler",
      value: function registerDocumentInteractionHandler(evtType, handler) {}
    }, {
      key: "deregisterDocumentInteractionHandler",
      value: function deregisterDocumentInteractionHandler(evtType, handler) {}
    }, {
      key: "registerResizeHandler",
      value: function registerResizeHandler(handler) {}
    }, {
      key: "deregisterResizeHandler",
      value: function deregisterResizeHandler(handler) {}
    }, {
      key: "updateCssVariable",
      value: function updateCssVariable(varName, value) {}
    }, {
      key: "computeBoundingRect",
      value: function computeBoundingRect() {}
    }, {
      key: "getWindowPageOffset",
      value: function getWindowPageOffset() {}
    }]);

    return MDCRippleAdapter;
  }();

  exports.default = MDCRippleAdapter;
  module.exports = exports["default"];
});

},{}],4:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.constants = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  var cssClasses = {
    // Ripple is a special case where the "root" component is really a "mixin" of sorts,
    // given that it's an 'upgrade' to an existing component. That being said it is the root
    // CSS class that all other CSS classes derive from.
    ROOT: 'mdc-ripple-upgraded',
    UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
    BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
    FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
    FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
  };

  var strings = {
    VAR_LEFT: '--mdc-ripple-left',
    VAR_TOP: '--mdc-ripple-top',
    VAR_FG_SIZE: '--mdc-ripple-fg-size',
    VAR_FG_SCALE: '--mdc-ripple-fg-scale',
    VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
    VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
  };

  var numbers = {
    PADDING: 10,
    INITIAL_ORIGIN_SCALE: 0.6,
    DEACTIVATION_TIMEOUT_MS: 225, // Corresponds to $mdc-ripple-translate-duration (i.e. activation animation duration)
    FG_DEACTIVATION_MS: 150, // Corresponds to $mdc-ripple-fade-out-duration (i.e. deactivation animation duration)
    TAP_DELAY_MS: 300 // Delay between touch and simulated mouse events on touch devices
  };

  exports.cssClasses = cssClasses;
  exports.strings = strings;
  exports.numbers = numbers;
});

},{}],5:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '@material/base/foundation', './adapter', './constants', './util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('@material/base/foundation'), require('./adapter'), require('./constants'), require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.foundation, global.adapter, global.constants, global.util);
    global.foundation = mod.exports;
  }
})(this, function (module, exports, _foundation, _adapter, _constants, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foundation2 = _interopRequireDefault(_foundation);

  var _adapter2 = _interopRequireDefault(_adapter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  /**
   * @typedef {{
   *   isActivated: (boolean|undefined),
   *   hasDeactivationUXRun: (boolean|undefined),
   *   wasActivatedByPointer: (boolean|undefined),
   *   wasElementMadeActive: (boolean|undefined),
   *   activationEvent: (!Event|undefined),
   *   isProgrammatic: (boolean|undefined)
   * }}
   */
  var ActivationStateType = void 0;

  /**
   * @typedef {{
   *   activate: (string|undefined),
   *   deactivate: (string|undefined),
   *   focus: (string|undefined),
   *   blur: (string|undefined)
   * }}
   */
  var ListenerInfoType = void 0;

  /**
   * @typedef {{
   *   activate: function(!Event),
   *   deactivate: function(!Event=),
   *   focus: function(),
   *   blur: function()
   * }}
   */
  var ListenersType = void 0;

  /**
   * @typedef {{
   *   x: number,
   *   y: number
   * }}
   */
  var PointType = void 0;

  // Activation events registered on the root element of each instance for activation
  var ACTIVATION_EVENT_TYPES = ['touchstart', 'pointerdown', 'mousedown', 'keydown'];

  // Deactivation events registered on documentElement when a pointer-related down event occurs
  var POINTER_DEACTIVATION_EVENT_TYPES = ['touchend', 'pointerup', 'mouseup'];

  // Tracks activations that have occurred on the current frame, to avoid simultaneous nested activations
  /** @type {!Array<!EventTarget>} */
  var activatedTargets = [];

  /**
   * @extends {MDCFoundation<!MDCRippleAdapter>}
   */

  var MDCRippleFoundation = function (_MDCFoundation) {
    _inherits(MDCRippleFoundation, _MDCFoundation);

    _createClass(MDCRippleFoundation, null, [{
      key: 'cssClasses',
      get: function get() {
        return _constants.cssClasses;
      }
    }, {
      key: 'strings',
      get: function get() {
        return _constants.strings;
      }
    }, {
      key: 'numbers',
      get: function get() {
        return _constants.numbers;
      }
    }, {
      key: 'defaultAdapter',
      get: function get() {
        return {
          browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
          isUnbounded: function isUnbounded() /* boolean */{},
          isSurfaceActive: function isSurfaceActive() /* boolean */{},
          isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          containsEventTarget: function containsEventTarget() /* target: !EventTarget */{},
          registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler() /* evtType: string, handler: EventListener */{},
          registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
          deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
          updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
          computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
          getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
        };
      }
    }]);

    function MDCRippleFoundation(adapter) {
      _classCallCheck(this, MDCRippleFoundation);

      var _this = _possibleConstructorReturn(this, (MDCRippleFoundation.__proto__ || Object.getPrototypeOf(MDCRippleFoundation)).call(this, Object.assign(MDCRippleFoundation.defaultAdapter, adapter)));

      /** @private {number} */
      _this.layoutFrame_ = 0;

      /** @private {!ClientRect} */
      _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

      /** @private {!ActivationStateType} */
      _this.activationState_ = _this.defaultActivationState_();

      /** @private {number} */
      _this.initialSize_ = 0;

      /** @private {number} */
      _this.maxRadius_ = 0;

      /** @private {function(!Event)} */
      _this.activateHandler_ = function (e) {
        return _this.activate_(e);
      };

      /** @private {function(!Event=)} */
      _this.deactivateHandler_ = function () {
        return _this.deactivate_();
      };

      /** @private {function(!Event=)} */
      _this.focusHandler_ = function () {
        return _this.handleFocus();
      };

      /** @private {function(!Event=)} */
      _this.blurHandler_ = function () {
        return _this.handleBlur();
      };

      /** @private {!Function} */
      _this.resizeHandler_ = function () {
        return _this.layout();
      };

      /** @private {{left: number, top:number}} */
      _this.unboundedCoords_ = {
        left: 0,
        top: 0
      };

      /** @private {number} */
      _this.fgScale_ = 0;

      /** @private {number} */
      _this.activationTimer_ = 0;

      /** @private {number} */
      _this.fgDeactivationRemovalTimer_ = 0;

      /** @private {boolean} */
      _this.activationAnimationHasEnded_ = false;

      /** @private {!Function} */
      _this.activationTimerCallback_ = function () {
        _this.activationAnimationHasEnded_ = true;
        _this.runDeactivationUXLogicIfReady_();
      };

      /** @private {!Event|undefined} */
      _this.previousActivationEvent_;
      return _this;
    }

    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     * @return {boolean}
     * @private
     */


    _createClass(MDCRippleFoundation, [{
      key: 'supportsPressRipple_',
      value: function supportsPressRipple_() {
        return this.adapter_.browserSupportsCssVars();
      }
    }, {
      key: 'defaultActivationState_',
      value: function defaultActivationState_() {
        return {
          isActivated: false,
          hasDeactivationUXRun: false,
          wasActivatedByPointer: false,
          wasElementMadeActive: false,
          activationEvent: undefined,
          isProgrammatic: false
        };
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        var supportsPressRipple = this.supportsPressRipple_();

        this.registerRootHandlers_(supportsPressRipple);

        if (supportsPressRipple) {
          var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$.ROOT,
              UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

          requestAnimationFrame(function () {
            _this2.adapter_.addClass(ROOT);
            if (_this2.adapter_.isUnbounded()) {
              _this2.adapter_.addClass(UNBOUNDED);
              // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
              _this2.layoutInternal_();
            }
          });
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        if (this.supportsPressRipple_()) {
          if (this.activationTimer_) {
            clearTimeout(this.activationTimer_);
            this.activationTimer_ = 0;
            this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
          }

          if (this.fgDeactivationRemovalTimer_) {
            clearTimeout(this.fgDeactivationRemovalTimer_);
            this.fgDeactivationRemovalTimer_ = 0;
            this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
          }

          var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
              ROOT = _MDCRippleFoundation$2.ROOT,
              UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

          requestAnimationFrame(function () {
            _this3.adapter_.removeClass(ROOT);
            _this3.adapter_.removeClass(UNBOUNDED);
            _this3.removeCssVars_();
          });
        }

        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();
      }
    }, {
      key: 'registerRootHandlers_',
      value: function registerRootHandlers_(supportsPressRipple) {
        var _this4 = this;

        if (supportsPressRipple) {
          ACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
          });
          if (this.adapter_.isUnbounded()) {
            this.adapter_.registerResizeHandler(this.resizeHandler_);
          }
        }

        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
      }
    }, {
      key: 'registerDeactivationHandlers_',
      value: function registerDeactivationHandlers_(e) {
        var _this5 = this;

        if (e.type === 'keydown') {
          this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
        } else {
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
            _this5.adapter_.registerDocumentInteractionHandler(type, _this5.deactivateHandler_);
          });
        }
      }
    }, {
      key: 'deregisterRootHandlers_',
      value: function deregisterRootHandlers_() {
        var _this6 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this6.adapter_.deregisterInteractionHandler(type, _this6.activateHandler_);
        });
        this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
        this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.deregisterResizeHandler(this.resizeHandler_);
        }
      }
    }, {
      key: 'deregisterDeactivationHandlers_',
      value: function deregisterDeactivationHandlers_() {
        var _this7 = this;

        this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
        POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this7.adapter_.deregisterDocumentInteractionHandler(type, _this7.deactivateHandler_);
        });
      }
    }, {
      key: 'removeCssVars_',
      value: function removeCssVars_() {
        var _this8 = this;

        var strings = MDCRippleFoundation.strings;

        Object.keys(strings).forEach(function (k) {
          if (k.indexOf('VAR_') === 0) {
            _this8.adapter_.updateCssVariable(strings[k], null);
          }
        });
      }
    }, {
      key: 'activate_',
      value: function activate_(e) {
        var _this9 = this;

        if (this.adapter_.isSurfaceDisabled()) {
          return;
        }

        var activationState = this.activationState_;
        if (activationState.isActivated) {
          return;
        }

        // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
        var previousActivationEvent = this.previousActivationEvent_;
        var isSameInteraction = previousActivationEvent && e !== undefined && previousActivationEvent.type !== e.type;
        if (isSameInteraction) {
          return;
        }

        activationState.isActivated = true;
        activationState.isProgrammatic = e === undefined;
        activationState.activationEvent = e;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e !== undefined && (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown');

        var hasActivatedChild = e !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) {
          return _this9.adapter_.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          // Immediately reset activation state, while preserving logic that prevents touch follow-on events
          this.resetActivationState_();
          return;
        }

        if (e !== undefined) {
          activatedTargets.push( /** @type {!EventTarget} */e.target);
          this.registerDeactivationHandlers_(e);
        }

        activationState.wasElementMadeActive = this.checkElementMadeActive_(e);
        if (activationState.wasElementMadeActive) {
          this.animateActivation_();
        }

        requestAnimationFrame(function () {
          // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
          activatedTargets = [];

          if (!activationState.wasElementMadeActive && e !== undefined && (e.key === ' ' || e.keyCode === 32)) {
            // If space was pressed, try again within an rAF call to detect :active, because different UAs report
            // active states inconsistently when they're called within event handling code:
            // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
            // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
            // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
            // variable is set within a rAF callback for a submit button interaction (#2241).
            activationState.wasElementMadeActive = _this9.checkElementMadeActive_(e);
            if (activationState.wasElementMadeActive) {
              _this9.animateActivation_();
            }
          }

          if (!activationState.wasElementMadeActive) {
            // Reset activation state immediately if element was not made active.
            _this9.activationState_ = _this9.defaultActivationState_();
          }
        });
      }
    }, {
      key: 'checkElementMadeActive_',
      value: function checkElementMadeActive_(e) {
        return e !== undefined && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
      }
    }, {
      key: 'activate',
      value: function activate(event) {
        this.activate_(event);
      }
    }, {
      key: 'animateActivation_',
      value: function animateActivation_() {
        var _this10 = this;

        var _MDCRippleFoundation$3 = MDCRippleFoundation.strings,
            VAR_FG_TRANSLATE_START = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_START,
            VAR_FG_TRANSLATE_END = _MDCRippleFoundation$3.VAR_FG_TRANSLATE_END;
        var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
            FG_DEACTIVATION = _MDCRippleFoundation$4.FG_DEACTIVATION,
            FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;
        var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


        this.layoutInternal_();

        var translateStart = '';
        var translateEnd = '';

        if (!this.adapter_.isUnbounded()) {
          var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
              startPoint = _getFgTranslationCoor.startPoint,
              endPoint = _getFgTranslationCoor.endPoint;

          translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
          translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
        }

        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
        this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
        // Cancel any ongoing activation/deactivation animations
        clearTimeout(this.activationTimer_);
        clearTimeout(this.fgDeactivationRemovalTimer_);
        this.rmBoundedActivationClasses_();
        this.adapter_.removeClass(FG_DEACTIVATION);

        // Force layout in order to re-trigger the animation.
        this.adapter_.computeBoundingRect();
        this.adapter_.addClass(FG_ACTIVATION);
        this.activationTimer_ = setTimeout(function () {
          return _this10.activationTimerCallback_();
        }, DEACTIVATION_TIMEOUT_MS);
      }
    }, {
      key: 'getFgTranslationCoordinates_',
      value: function getFgTranslationCoordinates_() {
        var _activationState_ = this.activationState_,
            activationEvent = _activationState_.activationEvent,
            wasActivatedByPointer = _activationState_.wasActivatedByPointer;


        var startPoint = void 0;
        if (wasActivatedByPointer) {
          startPoint = (0, _util.getNormalizedEventCoords)(
          /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
        } else {
          startPoint = {
            x: this.frame_.width / 2,
            y: this.frame_.height / 2
          };
        }
        // Center the element around the start point.
        startPoint = {
          x: startPoint.x - this.initialSize_ / 2,
          y: startPoint.y - this.initialSize_ / 2
        };

        var endPoint = {
          x: this.frame_.width / 2 - this.initialSize_ / 2,
          y: this.frame_.height / 2 - this.initialSize_ / 2
        };

        return { startPoint: startPoint, endPoint: endPoint };
      }
    }, {
      key: 'runDeactivationUXLogicIfReady_',
      value: function runDeactivationUXLogicIfReady_() {
        var _this11 = this;

        var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
        var _activationState_2 = this.activationState_,
            hasDeactivationUXRun = _activationState_2.hasDeactivationUXRun,
            isActivated = _activationState_2.isActivated;

        var activationHasEnded = hasDeactivationUXRun || !isActivated;

        if (activationHasEnded && this.activationAnimationHasEnded_) {
          this.rmBoundedActivationClasses_();
          this.adapter_.addClass(FG_DEACTIVATION);
          this.fgDeactivationRemovalTimer_ = setTimeout(function () {
            _this11.adapter_.removeClass(FG_DEACTIVATION);
          }, _constants.numbers.FG_DEACTIVATION_MS);
        }
      }
    }, {
      key: 'rmBoundedActivationClasses_',
      value: function rmBoundedActivationClasses_() {
        var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

        this.adapter_.removeClass(FG_ACTIVATION);
        this.activationAnimationHasEnded_ = false;
        this.adapter_.computeBoundingRect();
      }
    }, {
      key: 'resetActivationState_',
      value: function resetActivationState_() {
        var _this12 = this;

        this.previousActivationEvent_ = this.activationState_.activationEvent;
        this.activationState_ = this.defaultActivationState_();
        // Touch devices may fire additional events for the same interaction within a short time.
        // Store the previous event until it's safe to assume that subsequent events are for new interactions.
        setTimeout(function () {
          return _this12.previousActivationEvent_ = undefined;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      }
    }, {
      key: 'deactivate_',
      value: function deactivate_() {
        var _this13 = this;

        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
          return;
        }

        var state = /** @type {!ActivationStateType} */Object.assign({}, activationState);

        if (activationState.isProgrammatic) {
          requestAnimationFrame(function () {
            return _this13.animateDeactivation_(state);
          });
          this.resetActivationState_();
        } else {
          this.deregisterDeactivationHandlers_();
          requestAnimationFrame(function () {
            _this13.activationState_.hasDeactivationUXRun = true;
            _this13.animateDeactivation_(state);
            _this13.resetActivationState_();
          });
        }
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.deactivate_();
      }
    }, {
      key: 'animateDeactivation_',
      value: function animateDeactivation_(_ref) {
        var wasActivatedByPointer = _ref.wasActivatedByPointer,
            wasElementMadeActive = _ref.wasElementMadeActive;

        if (wasActivatedByPointer || wasElementMadeActive) {
          this.runDeactivationUXLogicIfReady_();
        }
      }
    }, {
      key: 'layout',
      value: function layout() {
        var _this14 = this;

        if (this.layoutFrame_) {
          cancelAnimationFrame(this.layoutFrame_);
        }
        this.layoutFrame_ = requestAnimationFrame(function () {
          _this14.layoutInternal_();
          _this14.layoutFrame_ = 0;
        });
      }
    }, {
      key: 'layoutInternal_',
      value: function layoutInternal_() {
        var _this15 = this;

        this.frame_ = this.adapter_.computeBoundingRect();
        var maxDim = Math.max(this.frame_.height, this.frame_.width);

        // Surface diameter is treated differently for unbounded vs. bounded ripples.
        // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
        // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
        // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
        // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
        // `overflow: hidden`.
        var getBoundedRadius = function getBoundedRadius() {
          var hypotenuse = Math.sqrt(Math.pow(_this15.frame_.width, 2) + Math.pow(_this15.frame_.height, 2));
          return hypotenuse + MDCRippleFoundation.numbers.PADDING;
        };

        this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();

        // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
        this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
        this.fgScale_ = this.maxRadius_ / this.initialSize_;

        this.updateLayoutCssVars_();
      }
    }, {
      key: 'updateLayoutCssVars_',
      value: function updateLayoutCssVars_() {
        var _MDCRippleFoundation$5 = MDCRippleFoundation.strings,
            VAR_FG_SIZE = _MDCRippleFoundation$5.VAR_FG_SIZE,
            VAR_LEFT = _MDCRippleFoundation$5.VAR_LEFT,
            VAR_TOP = _MDCRippleFoundation$5.VAR_TOP,
            VAR_FG_SCALE = _MDCRippleFoundation$5.VAR_FG_SCALE;


        this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
        this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

        if (this.adapter_.isUnbounded()) {
          this.unboundedCoords_ = {
            left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
            top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
          };

          this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
          this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
        }
      }
    }, {
      key: 'setUnbounded',
      value: function setUnbounded(unbounded) {
        var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;

        if (unbounded) {
          this.adapter_.addClass(UNBOUNDED);
        } else {
          this.adapter_.removeClass(UNBOUNDED);
        }
      }
    }, {
      key: 'handleFocus',
      value: function handleFocus() {
        var _this16 = this;

        requestAnimationFrame(function () {
          return _this16.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }, {
      key: 'handleBlur',
      value: function handleBlur() {
        var _this17 = this;

        requestAnimationFrame(function () {
          return _this17.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    }]);

    return MDCRippleFoundation;
  }(_foundation2.default);

  exports.default = MDCRippleFoundation;
  module.exports = exports['default'];
});

},{"./adapter":3,"./constants":4,"./util":7,"@material/base/foundation":2}],6:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/base/component', './adapter', './foundation', './util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/base/component'), require('./adapter'), require('./foundation'), require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.component, global.adapter, global.foundation, global.util);
    global.index = mod.exports;
  }
})(this, function (exports, _component, _adapter, _foundation, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.util = exports.RippleCapableSurface = exports.MDCRippleFoundation = exports.MDCRipple = undefined;

  var _component2 = _interopRequireDefault(_component);

  var _adapter2 = _interopRequireDefault(_adapter);

  var _foundation2 = _interopRequireDefault(_foundation);

  var util = _interopRequireWildcard(_util);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MDCRipple = function (_MDCComponent) {
    _inherits(MDCRipple, _MDCComponent);

    /** @param {...?} args */
    function MDCRipple() {
      var _ref;

      _classCallCheck(this, MDCRipple);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = MDCRipple.__proto__ || Object.getPrototypeOf(MDCRipple)).call.apply(_ref, [this].concat(args)));

      /** @type {boolean} */
      _this.disabled = false;

      /** @private {boolean} */
      _this.unbounded_;
      return _this;
    }

    /**
     * @param {!Element} root
     * @param {{isUnbounded: (boolean|undefined)}=} options
     * @return {!MDCRipple}
     */


    _createClass(MDCRipple, [{
      key: 'setUnbounded_',
      value: function setUnbounded_() {
        this.foundation_.setUnbounded(this.unbounded_);
      }
    }, {
      key: 'activate',
      value: function activate() {
        this.foundation_.activate();
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.foundation_.deactivate();
      }
    }, {
      key: 'layout',
      value: function layout() {
        this.foundation_.layout();
      }
    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        return new _foundation2.default(MDCRipple.createAdapter(this));
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
      }
    }, {
      key: 'unbounded',
      get: function get() {
        return this.unbounded_;
      },
      set: function set(unbounded) {
        this.unbounded_ = Boolean(unbounded);
        this.setUnbounded_();
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            _ref2$isUnbounded = _ref2.isUnbounded,
            isUnbounded = _ref2$isUnbounded === undefined ? undefined : _ref2$isUnbounded;

        var ripple = new MDCRipple(root);
        // Only override unbounded behavior if option is explicitly specified
        if (isUnbounded !== undefined) {
          ripple.unbounded = /** @type {boolean} */isUnbounded;
        }
        return ripple;
      }
    }, {
      key: 'createAdapter',
      value: function createAdapter(instance) {
        var MATCHES = util.getMatchesProperty(HTMLElement.prototype);

        return {
          browserSupportsCssVars: function browserSupportsCssVars() {
            return util.supportsCssVariables(window);
          },
          isUnbounded: function isUnbounded() {
            return instance.unbounded;
          },
          isSurfaceActive: function isSurfaceActive() {
            return instance.root_[MATCHES](':active');
          },
          isSurfaceDisabled: function isSurfaceDisabled() {
            return instance.disabled;
          },
          addClass: function addClass(className) {
            return instance.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return instance.root_.classList.remove(className);
          },
          containsEventTarget: function containsEventTarget(target) {
            return instance.root_.contains(target);
          },
          registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
            return instance.root_.addEventListener(evtType, handler, util.applyPassive());
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
            return instance.root_.removeEventListener(evtType, handler, util.applyPassive());
          },
          registerDocumentInteractionHandler: function registerDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.addEventListener(evtType, handler, util.applyPassive());
          },
          deregisterDocumentInteractionHandler: function deregisterDocumentInteractionHandler(evtType, handler) {
            return document.documentElement.removeEventListener(evtType, handler, util.applyPassive());
          },
          registerResizeHandler: function registerResizeHandler(handler) {
            return window.addEventListener('resize', handler);
          },
          deregisterResizeHandler: function deregisterResizeHandler(handler) {
            return window.removeEventListener('resize', handler);
          },
          updateCssVariable: function updateCssVariable(varName, value) {
            return instance.root_.style.setProperty(varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return instance.root_.getBoundingClientRect();
          },
          getWindowPageOffset: function getWindowPageOffset() {
            return { x: window.pageXOffset, y: window.pageYOffset };
          }
        };
      }
    }]);

    return MDCRipple;
  }(_component2.default);

  var RippleCapableSurface = function RippleCapableSurface() {
    _classCallCheck(this, RippleCapableSurface);
  };

  /** @protected {!Element} */
  RippleCapableSurface.prototype.root_;

  /**
   * Whether or not the ripple bleeds out of the bounds of the element.
   * @type {boolean|undefined}
   */
  RippleCapableSurface.prototype.unbounded;

  /**
   * Whether or not the ripple is attached to a disabled component.
   * @type {boolean|undefined}
   */
  RippleCapableSurface.prototype.disabled;

  exports.MDCRipple = MDCRipple;
  exports.MDCRippleFoundation = _foundation2.default;
  exports.RippleCapableSurface = RippleCapableSurface;
  exports.util = util;
});

},{"./adapter":3,"./foundation":5,"./util":7,"@material/base/component":1}],7:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.util = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  /**
   * Stores result from supportsCssVariables to avoid redundant processing to detect CSS custom variable support.
   * @private {boolean|undefined}
   */
  var supportsCssVariables_ = void 0;

  /**
   * Stores result from applyPassive to avoid redundant processing to detect passive event listener support.
   * @private {boolean|undefined}
   */
  var supportsPassive_ = void 0;

  /**
   * @param {!Window} windowObj
   * @return {boolean}
   */
  function detectEdgePseudoVarBug(windowObj) {
    // Detect versions of Edge with buggy var() support
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
    var document = windowObj.document;
    var node = document.createElement('div');
    node.className = 'mdc-ripple-surface--test-edge-var-bug';
    document.body.appendChild(node);

    // The bug exists if ::before style ends up propagating to the parent element.
    // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
    // but Firefox is known to support CSS custom properties correctly.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = windowObj.getComputedStyle(node);
    var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
    node.remove();
    return hasPseudoVarBug;
  }

  /**
   * @param {!Window} windowObj
   * @param {boolean=} forceRefresh
   * @return {boolean|undefined}
   */

  function supportsCssVariables(windowObj) {
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var supportsCssVariables = supportsCssVariables_;
    if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
      return supportsCssVariables;
    }

    var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
    if (!supportsFunctionPresent) {
      return;
    }

    var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
    // See: https://bugs.webkit.org/show_bug.cgi?id=154669
    // See: README section on Safari
    var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');

    if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
      supportsCssVariables = !detectEdgePseudoVarBug(windowObj);
    } else {
      supportsCssVariables = false;
    }

    if (!forceRefresh) {
      supportsCssVariables_ = supportsCssVariables;
    }
    return supportsCssVariables;
  }

  //
  /**
   * Determine whether the current browser supports passive event listeners, and if so, use them.
   * @param {!Window=} globalObj
   * @param {boolean=} forceRefresh
   * @return {boolean|!EventListenerOptions}
   */
  function applyPassive() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_ === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
            return isSupported;
          } });
      } catch (e) {}

      supportsPassive_ = isSupported;
    }

    return supportsPassive_ ? /** @type {!EventListenerOptions} */{ passive: true } : false;
  }

  /**
   * @param {!Object} HTMLElementPrototype
   * @return {string}
   */
  function getMatchesProperty(HTMLElementPrototype) {
    /**
     * Order is important because we return the first existing method we find.
     * Do not change the order of the items in the below array.
     */
    var matchesMethods = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'];
    var method = 'matches';
    for (var i = 0; i < matchesMethods.length; i++) {
      var matchesMethod = matchesMethods[i];
      if (matchesMethod in HTMLElementPrototype) {
        method = matchesMethod;
        break;
      }
    }

    return method;
  }

  /**
   * @param {!Event} ev
   * @param {{x: number, y: number}} pageOffset
   * @param {!ClientRect} clientRect
   * @return {{x: number, y: number}}
   */
  function getNormalizedEventCoords(ev, pageOffset, clientRect) {
    var x = pageOffset.x,
        y = pageOffset.y;

    var documentX = x + clientRect.left;
    var documentY = y + clientRect.top;

    var normalizedX = void 0;
    var normalizedY = void 0;
    // Determine touch point relative to the ripple container.
    if (ev.type === 'touchstart') {
      ev = /** @type {!TouchEvent} */ev;
      normalizedX = ev.changedTouches[0].pageX - documentX;
      normalizedY = ev.changedTouches[0].pageY - documentY;
    } else {
      ev = /** @type {!MouseEvent} */ev;
      normalizedX = ev.pageX - documentX;
      normalizedY = ev.pageY - documentY;
    }

    return { x: normalizedX, y: normalizedY };
  }

  exports.supportsCssVariables = supportsCssVariables;
  exports.applyPassive = applyPassive;
  exports.getMatchesProperty = getMatchesProperty;
  exports.getNormalizedEventCoords = getNormalizedEventCoords;
});

},{}],8:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/ripple/index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/ripple/index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MDCSelectionControl = exports.MDCSelectionControlState = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /* eslint-enable no-unused-vars */

  /**
   * @typedef {{
   *   checked: boolean,
   *   indeterminate: boolean,
   *   disabled: boolean,
   *   value: ?string
   * }}
   */
  var MDCSelectionControlState = void 0;

  /**
   * @record
   */

  var MDCSelectionControl = function () {
    function MDCSelectionControl() {
      _classCallCheck(this, MDCSelectionControl);
    }

    _createClass(MDCSelectionControl, [{
      key: 'ripple',
      get: function get() {}
    }]);

    return MDCSelectionControl;
  }();

  exports.MDCSelectionControlState = MDCSelectionControlState;
  exports.MDCSelectionControl = MDCSelectionControl;
});

},{"@material/ripple/index":6}],9:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.adapter = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var MDCSwitchAdapter = function () {
    function MDCSwitchAdapter() {
      _classCallCheck(this, MDCSwitchAdapter);
    }

    _createClass(MDCSwitchAdapter, [{
      key: "addClass",
      value: function addClass(className) {}
    }, {
      key: "removeClass",
      value: function removeClass(className) {}
    }, {
      key: "setNativeControlChecked",
      value: function setNativeControlChecked(checked) {}
    }, {
      key: "setNativeControlDisabled",
      value: function setNativeControlDisabled(disabled) {}
    }]);

    return MDCSwitchAdapter;
  }();

  exports.default = MDCSwitchAdapter;
  module.exports = exports["default"];
});

},{}],10:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.constants = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  /** @enum {string} */
  var cssClasses = {
    CHECKED: 'mdc-switch--checked',
    DISABLED: 'mdc-switch--disabled'
  };

  /** @enum {string} */
  var strings = {
    NATIVE_CONTROL_SELECTOR: '.mdc-switch__native-control',
    RIPPLE_SURFACE_SELECTOR: '.mdc-switch__thumb-underlay'
  };

  exports.cssClasses = cssClasses;
  exports.strings = strings;
});

},{}],11:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '@material/base/foundation', './adapter', './constants'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('@material/base/foundation'), require('./adapter'), require('./constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.foundation, global.adapter, global.constants);
    global.foundation = mod.exports;
  }
})(this, function (module, exports, _foundation, _adapter, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foundation2 = _interopRequireDefault(_foundation);

  var _adapter2 = _interopRequireDefault(_adapter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MDCSwitchFoundation = function (_MDCFoundation) {
    _inherits(MDCSwitchFoundation, _MDCFoundation);

    _createClass(MDCSwitchFoundation, null, [{
      key: 'strings',
      get: function get() {
        return _constants.strings;
      }
    }, {
      key: 'cssClasses',
      get: function get() {
        return _constants.cssClasses;
      }
    }, {
      key: 'defaultAdapter',
      get: function get() {
        return (/** @type {!MDCSwitchAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            setNativeControlChecked: function setNativeControlChecked() /* checked: boolean */{},
            setNativeControlDisabled: function setNativeControlDisabled() /* disabled: boolean */{}
          }
        );
      }
    }]);

    function MDCSwitchFoundation(adapter) {
      _classCallCheck(this, MDCSwitchFoundation);

      return _possibleConstructorReturn(this, (MDCSwitchFoundation.__proto__ || Object.getPrototypeOf(MDCSwitchFoundation)).call(this, Object.assign(MDCSwitchFoundation.defaultAdapter, adapter)));
    }

    /** @param {boolean} checked */


    _createClass(MDCSwitchFoundation, [{
      key: 'setChecked',
      value: function setChecked(checked) {
        this.adapter_.setNativeControlChecked(checked);
        this.updateCheckedStyling_(checked);
      }
    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.adapter_.setNativeControlDisabled(disabled);
        if (disabled) {
          this.adapter_.addClass(_constants.cssClasses.DISABLED);
        } else {
          this.adapter_.removeClass(_constants.cssClasses.DISABLED);
        }
      }
    }, {
      key: 'handleChange',
      value: function handleChange(evt) {
        this.updateCheckedStyling_(evt.target.checked);
      }
    }, {
      key: 'updateCheckedStyling_',
      value: function updateCheckedStyling_(checked) {
        if (checked) {
          this.adapter_.addClass(_constants.cssClasses.CHECKED);
        } else {
          this.adapter_.removeClass(_constants.cssClasses.CHECKED);
        }
      }
    }]);

    return MDCSwitchFoundation;
  }(_foundation2.default);

  exports.default = MDCSwitchFoundation;
  module.exports = exports['default'];
});

},{"./adapter":9,"./constants":10,"@material/base/foundation":2}],12:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/base/component', '@material/selection-control/index', './foundation', '@material/ripple/index', '@material/ripple/util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/base/component'), require('@material/selection-control/index'), require('./foundation'), require('@material/ripple/index'), require('@material/ripple/util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.component, global.index, global.foundation, global.index, global.util);
    global.index = mod.exports;
  }
})(this, function (exports, _component, _index, _foundation, _index2, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MDCSwitch = exports.MDCSwitchFoundation = undefined;

  var _component2 = _interopRequireDefault(_component);

  var _foundation2 = _interopRequireDefault(_foundation);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var MDCSwitch = function (_MDCComponent) {
    _inherits(MDCSwitch, _MDCComponent);

    _createClass(MDCSwitch, null, [{
      key: 'attachTo',
      value: function attachTo(root) {
        return new MDCSwitch(root);
      }
    }]);

    function MDCSwitch() {
      var _ref;

      _classCallCheck(this, MDCSwitch);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = MDCSwitch.__proto__ || Object.getPrototypeOf(MDCSwitch)).call.apply(_ref, [this].concat(args)));

      /** @private {!MDCRipple} */
      _this.ripple_ = _this.initRipple_();

      /** @private {!Function} */
      _this.changeHandler_;
      return _this;
    }

    _createClass(MDCSwitch, [{
      key: 'destroy',
      value: function destroy() {
        _get(MDCSwitch.prototype.__proto__ || Object.getPrototypeOf(MDCSwitch.prototype), 'destroy', this).call(this);
        this.ripple_.destroy();
        this.nativeControl_.removeEventListener('change', this.changeHandler_);
      }
    }, {
      key: 'initialSyncWithDOM',
      value: function initialSyncWithDOM() {
        this.changeHandler_ = this.foundation_.handleChange.bind(this.foundation_);
        this.nativeControl_.addEventListener('change', this.changeHandler_);

        // Sometimes the checked state of the input element is saved in the history.
        // The switch styling should match the checked state of the input element.
        // Do an initial sync between the native control and the foundation.
        this.checked = this.checked;
      }
    }, {
      key: 'initRipple_',
      value: function initRipple_() {
        var _this2 = this;

        var RIPPLE_SURFACE_SELECTOR = _foundation2.default.strings.RIPPLE_SURFACE_SELECTOR;

        var rippleSurface = /** @type {!Element} */this.root_.querySelector(RIPPLE_SURFACE_SELECTOR);

        var MATCHES = (0, _util.getMatchesProperty)(HTMLElement.prototype);
        var adapter = Object.assign(_index2.MDCRipple.createAdapter(this), {
          isUnbounded: function isUnbounded() {
            return true;
          },
          isSurfaceActive: function isSurfaceActive() {
            return _this2.nativeControl_[MATCHES](':active');
          },
          addClass: function addClass(className) {
            return rippleSurface.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return rippleSurface.classList.remove(className);
          },
          registerInteractionHandler: function registerInteractionHandler(type, handler) {
            return _this2.nativeControl_.addEventListener(type, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
            return _this2.nativeControl_.removeEventListener(type, handler);
          },
          updateCssVariable: function updateCssVariable(varName, value) {
            return rippleSurface.style.setProperty(varName, value);
          },
          computeBoundingRect: function computeBoundingRect() {
            return rippleSurface.getBoundingClientRect();
          }
        });
        var foundation = new _index2.MDCRippleFoundation(adapter);
        return new _index2.MDCRipple(this.root_, foundation);
      }
    }, {
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        var _this3 = this;

        return new _foundation2.default({
          addClass: function addClass(className) {
            return _this3.root_.classList.add(className);
          },
          removeClass: function removeClass(className) {
            return _this3.root_.classList.remove(className);
          },
          setNativeControlChecked: function setNativeControlChecked(checked) {
            return _this3.nativeControl_.checked = checked;
          },
          setNativeControlDisabled: function setNativeControlDisabled(disabled) {
            return _this3.nativeControl_.disabled = disabled;
          }
        });
      }
    }, {
      key: 'nativeControl_',
      get: function get() {
        var NATIVE_CONTROL_SELECTOR = _foundation2.default.strings.NATIVE_CONTROL_SELECTOR;

        var el = /** @type {?MDCSelectionControlState} */this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
        return el;
      }
    }, {
      key: 'ripple',
      get: function get() {
        return this.ripple_;
      }
    }, {
      key: 'checked',
      get: function get() {
        return this.nativeControl_.checked;
      },
      set: function set(checked) {
        this.foundation_.setChecked(checked);
      }
    }, {
      key: 'disabled',
      get: function get() {
        return this.nativeControl_.disabled;
      },
      set: function set(disabled) {
        this.foundation_.setDisabled(disabled);
      }
    }]);

    return MDCSwitch;
  }(_component2.default);

  exports.MDCSwitchFoundation = _foundation2.default;
  exports.MDCSwitch = MDCSwitch;
});

},{"./foundation":11,"@material/base/component":1,"@material/ripple/index":6,"@material/ripple/util":7,"@material/selection-control/index":8}],13:[function(require,module,exports){
"use strict";

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports !== "undefined") {
        factory();
    } else {
        var mod = {
            exports: {}
        };
        factory();
        global.main = mod.exports;
    }
})(undefined, function () {
    'use strict';

    $(document).ready(function () {

        $(document).on('click', '.header__menu-open', function () {
            $(this).addClass('d-none');
            $('.header__menu-close').addClass('d-flex');
            $('.header').addClass('header--open');
            $('body').addClass('noscroll-y');
        });

        $(document).on('click', '.header__menu-close', function () {
            $(".header__menu-open").removeClass('d-none');
            $(this).removeClass('d-flex');
            $('.header').removeClass('header--open');
            $('body').removeClass('noscroll-y');
        });

        $(".collapse").on('show.bs.collapse', function () {
            $(this).prev().addClass('active');
        });
        $(".collapse").on('hide.bs.collapse', function () {
            $(this).prev().removeClass('active');
        });

        $('.date').datetimepicker({
            format: 'DD.MM.YY',
            defaultDate: moment(),
            icons: {
                previous: 'material-icons',
                next: 'material-icons'
            }
        });

        // var stickyFooterFunc;
        // (stickyFooterFunc = function stickyFooterFunc() {
        //     $('footer').css('position', 'static');
        //     $('body').css('min-height', '100px');
        //
        //     var bodyHeight = $('body').outerHeight();
        //     if (window.innerHeight > bodyHeight) {
        //         $('body').css('min-height', '100vh');
        //         $('footer').css({ 'position': 'absolute', 'bottom': '0' });
        //     }
        // })();
        // stickyFooterFunc();

        $('.form-group input, textarea').keyup(function () {
            if ($(this).val() != 0) {
                $(this).prev().css('color', '#53AE3B');
            } else $(this).prev().css('color', '#333');
        });

        $('select.selectpicker').on('change', function () {
            var selected = $(this).val();
            console.log(selected);
            if (selected) {
                $(this).closest('.form-group').find('label').css('color', '#53AE3B');
            } else $(this).closest('.form-group').find('label').css('color', '#333');
        });

        $('').each(function () {
            var _select = $(this).find('select');
            _select.on('changed.bs.select', function () {

                var _selectedOption = $(this).find('option:selected');
            });
        });

        // $('.selectpicker').selectpicker();


        $('input.only-number').bind('keypress', function (e) {
            if (e.which != 13) {
                return (/[\d.+]/.test(e.key)
                ); // IE > 9
            }
        });

        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;

        window.onresize = function () {

            // stickyFooterFunc();
            var t = w.innerWidth || e.clientWidth || g.clientWidth;
            if (t !== x) {}
        };
    });
});

},{}]},{},[13,12])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcYmFzZVxcY29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXGJhc2VcXGZvdW5kYXRpb24uanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxccmlwcGxlXFxhZGFwdGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcZm91bmRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxyaXBwbGVcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcdXRpbC5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxzZWxlY3Rpb24tY29udHJvbFxcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcc3dpdGNoXFxhZGFwdGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHN3aXRjaFxcY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHN3aXRjaFxcZm91bmRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxzd2l0Y2hcXGluZGV4LmpzIiwic3JjXFxmcnEtdGVtcGxhdGVzXFxhc3NldHNcXGpzXFxtYWluXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQ2lDRSxJLEVBQXNCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTyxJQUFBLFlBQUEsQ0FBQSxJQUFBLEVBQXVCLElBQTlCLG9CQUE4QixFQUF2QixDQUFQO0FBQ0Q7OztBQUVEOzs7OztBQUtBLDBCQUFBLElBQUEsRUFBbUQ7QUFBQSxV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QUFrQixZQUFZOztBQUcxQjtBQUNBLGdCQUFJLElBQUksRUFBQSxVQUFBLElBQWdCLEVBQWhCLFdBQUEsSUFBaUMsRUFBekMsV0FBQTtBQUNBLGdCQUFJLE1BQUosQ0FBQSxFQUFhLENBRVo7QUFQTCxTQUFBO0FBMUZKLEtBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogKCFFdmVudHx1bmRlZmluZWQpLFxuICogICBpc1Byb2dyYW1tYXRpYzogKGJvb2xlYW58dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IEFjdGl2YXRpb25TdGF0ZVR5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZGVhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBmb2N1czogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBibHVyOiAoc3RyaW5nfHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lckluZm9UeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQpLFxuICogICBkZWFjdGl2YXRlOiBmdW5jdGlvbighRXZlbnQ9KSxcbiAqICAgZm9jdXM6IGZ1bmN0aW9uKCksXG4gKiAgIGJsdXI6IGZ1bmN0aW9uKClcbiAqIH19XG4gKi9cbmxldCBMaXN0ZW5lcnNUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIHg6IG51bWJlcixcbiAqICAgeTogbnVtYmVyXG4gKiB9fVxuICovXG5sZXQgUG9pbnRUeXBlO1xuXG4vLyBBY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIHRoZSByb290IGVsZW1lbnQgb2YgZWFjaCBpbnN0YW5jZSBmb3IgYWN0aXZhdGlvblxuY29uc3QgQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hzdGFydCcsICdwb2ludGVyZG93bicsICdtb3VzZWRvd24nLCAna2V5ZG93biddO1xuXG4vLyBEZWFjdGl2YXRpb24gZXZlbnRzIHJlZ2lzdGVyZWQgb24gZG9jdW1lbnRFbGVtZW50IHdoZW4gYSBwb2ludGVyLXJlbGF0ZWQgZG93biBldmVudCBvY2N1cnNcbmNvbnN0IFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTID0gWyd0b3VjaGVuZCcsICdwb2ludGVydXAnLCAnbW91c2V1cCddO1xuXG4vLyBUcmFja3MgYWN0aXZhdGlvbnMgdGhhdCBoYXZlIG9jY3VycmVkIG9uIHRoZSBjdXJyZW50IGZyYW1lLCB0byBhdm9pZCBzaW11bHRhbmVvdXMgbmVzdGVkIGFjdGl2YXRpb25zXG4vKiogQHR5cGUgeyFBcnJheTwhRXZlbnRUYXJnZXQ+fSAqL1xubGV0IGFjdGl2YXRlZFRhcmdldHMgPSBbXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDUmlwcGxlQWRhcHRlcj59XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZUZvdW5kYXRpb24gZXh0ZW5kcyBNRENGb3VuZGF0aW9uIHtcbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIHJldHVybiBudW1iZXJzO1xuICB9XG5cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlclN1cHBvcnRzQ3NzVmFyczogKCkgPT4gLyogYm9vbGVhbiAtIGNhY2hlZCAqLyB7fSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IC8qIGJvb2xlYW4gKi8ge30sXG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29udGFpbnNFdmVudFRhcmdldDogKC8qIHRhcmdldDogIUV2ZW50VGFyZ2V0ICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICgvKiB2YXJOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gLyogQ2xpZW50UmVjdCAqLyB7fSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+IC8qIHt4OiBudW1iZXIsIHk6IG51bWJlcn0gKi8ge30sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1JpcHBsZUZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUNsaWVudFJlY3R9ICovXG4gICAgdGhpcy5mcmFtZV8gPSAvKiogQHR5cGUgeyFDbGllbnRSZWN0fSAqLyAoe3dpZHRoOiAwLCBoZWlnaHQ6IDB9KTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5pbml0aWFsU2l6ZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50KX0gKi9cbiAgICB0aGlzLmFjdGl2YXRlSGFuZGxlcl8gPSAoZSkgPT4gdGhpcy5hY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudD0pfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5kZWFjdGl2YXRlXygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQ9KX0gKi9cbiAgICB0aGlzLmZvY3VzSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUZvY3VzKCk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudD0pfSAqL1xuICAgIHRoaXMuYmx1ckhhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVCbHVyKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLnJlc2l6ZUhhbmRsZXJfID0gKCkgPT4gdGhpcy5sYXlvdXQoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7e2xlZnQ6IG51bWJlciwgdG9wOm51bWJlcn19ICovXG4gICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ1NjYWxlXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtib29sZWFufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IGZhbHNlO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18gPSAoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSB0cnVlO1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9O1xuXG4gICAgLyoqIEBwcml2YXRlIHshRXZlbnR8dW5kZWZpbmVkfSAqL1xuICAgIHRoaXMucHJldmlvdXNBY3RpdmF0aW9uRXZlbnRfO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlIGNvbXB1dGUgdGhpcyBwcm9wZXJ0eSBzbyB0aGF0IHdlIGFyZSBub3QgcXVlcnlpbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGNsaWVudFxuICAgKiB1bnRpbCB0aGUgcG9pbnQgaW4gdGltZSB3aGVyZSB0aGUgZm91bmRhdGlvbiByZXF1ZXN0cyBpdC4gVGhpcyBwcmV2ZW50cyBzY2VuYXJpb3Mgd2hlcmVcbiAgICogY2xpZW50LXNpZGUgZmVhdHVyZS1kZXRlY3Rpb24gbWF5IGhhcHBlbiB0b28gZWFybHksIHN1Y2ggYXMgd2hlbiBjb21wb25lbnRzIGFyZSByZW5kZXJlZCBvbiB0aGUgc2VydmVyXG4gICAqIGFuZCB0aGVuIGluaXRpYWxpemVkIGF0IG1vdW50IHRpbWUgb24gdGhlIGNsaWVudC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN1cHBvcnRzUHJlc3NSaXBwbGVfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiB1bmRlZmluZWQsXG4gICAgICBpc1Byb2dyYW1tYXRpYzogZmFsc2UsXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBzdXBwb3J0c1ByZXNzUmlwcGxlID0gdGhpcy5zdXBwb3J0c1ByZXNzUmlwcGxlXygpO1xuXG4gICAgdGhpcy5yZWdpc3RlclJvb3RIYW5kbGVyc18oc3VwcG9ydHNQcmVzc1JpcHBsZSk7XG5cbiAgICBpZiAoc3VwcG9ydHNQcmVzc1JpcHBsZSkge1xuICAgICAgY29uc3Qge1JPT1QsIFVOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFJPT1QpO1xuICAgICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAgIC8vIFVuYm91bmRlZCByaXBwbGVzIG5lZWQgbGF5b3V0IGxvZ2ljIGFwcGxpZWQgaW1tZWRpYXRlbHkgdG8gc2V0IGNvb3JkaW5hdGVzIGZvciBib3RoIHNoYWRlIGFuZCByaXBwbGVcbiAgICAgICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuc3VwcG9ydHNQcmVzc1JpcHBsZV8oKSkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuRkdfQUNUSVZBVElPTik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXykge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICB0aGlzLnJlbW92ZUNzc1ZhcnNfKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFufSBzdXBwb3J0c1ByZXNzUmlwcGxlIFBhc3NlZCBmcm9tIGluaXQgdG8gc2F2ZSBhIHJlZHVuZGFudCBmdW5jdGlvbiBjYWxsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oc3VwcG9ydHNQcmVzc1JpcHBsZSkge1xuICAgIGlmIChzdXBwb3J0c1ByZXNzUmlwcGxlKSB7XG4gICAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKSB7XG4gICAgaWYgKGUudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCkge1xuICAgIEFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdibHVyJywgdGhpcy5ibHVySGFuZGxlcl8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZW1vdmVDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7c3RyaW5nc30gPSBNRENSaXBwbGVGb3VuZGF0aW9uO1xuICAgIE9iamVjdC5rZXlzKHN0cmluZ3MpLmZvckVhY2goKGspID0+IHtcbiAgICAgIGlmIChrLmluZGV4T2YoJ1ZBUl8nKSA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKHN0cmluZ3Nba10sIG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50PX0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYWN0aXZhdGVfKGUpIHtcbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VEaXNhYmxlZCgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCByZWFjdGluZyB0byBmb2xsb3ctb24gZXZlbnRzIGZpcmVkIGJ5IHRvdWNoIGRldmljZSBhZnRlciBhbiBhbHJlYWR5LXByb2Nlc3NlZCB1c2VyIGludGVyYWN0aW9uXG4gICAgY29uc3QgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQgPSB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgICBjb25zdCBpc1NhbWVJbnRlcmFjdGlvbiA9IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ICYmIGUgIT09IHVuZGVmaW5lZCAmJiBwcmV2aW91c0FjdGl2YXRpb25FdmVudC50eXBlICE9PSBlLnR5cGU7XG4gICAgaWYgKGlzU2FtZUludGVyYWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkID0gdHJ1ZTtcbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPSBlID09PSB1bmRlZmluZWQ7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogZSAhPT0gdW5kZWZpbmVkICYmIChcbiAgICAgIGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAncG9pbnRlcmRvd24nXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0FjdGl2YXRlZENoaWxkID0gZSAhPT0gdW5kZWZpbmVkICYmIGFjdGl2YXRlZFRhcmdldHMubGVuZ3RoID4gMCAmJiBhY3RpdmF0ZWRUYXJnZXRzLnNvbWUoXG4gICAgICAodGFyZ2V0KSA9PiB0aGlzLmFkYXB0ZXJfLmNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSk7XG4gICAgaWYgKGhhc0FjdGl2YXRlZENoaWxkKSB7XG4gICAgICAvLyBJbW1lZGlhdGVseSByZXNldCBhY3RpdmF0aW9uIHN0YXRlLCB3aGlsZSBwcmVzZXJ2aW5nIGxvZ2ljIHRoYXQgcHJldmVudHMgdG91Y2ggZm9sbG93LW9uIGV2ZW50c1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIGUgIT09IHVuZGVmaW5lZCAmJiAoZS5rZXkgPT09ICcgJyB8fCBlLmtleUNvZGUgPT09IDMyKSkge1xuICAgICAgICAvLyBJZiBzcGFjZSB3YXMgcHJlc3NlZCwgdHJ5IGFnYWluIHdpdGhpbiBhbiByQUYgY2FsbCB0byBkZXRlY3QgOmFjdGl2ZSwgYmVjYXVzZSBkaWZmZXJlbnQgVUFzIHJlcG9ydFxuICAgICAgICAvLyBhY3RpdmUgc3RhdGVzIGluY29uc2lzdGVudGx5IHdoZW4gdGhleSdyZSBjYWxsZWQgd2l0aGluIGV2ZW50IGhhbmRsaW5nIGNvZGU6XG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NjM1OTcxXG4gICAgICAgIC8vIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTI5Mzc0MVxuICAgICAgICAvLyBXZSB0cnkgZmlyc3Qgb3V0c2lkZSByQUYgdG8gc3VwcG9ydCBFZGdlLCB3aGljaCBkb2VzIG5vdCBleGhpYml0IHRoaXMgcHJvYmxlbSwgYnV0IHdpbGwgY3Jhc2ggaWYgYSBDU1NcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgc2V0IHdpdGhpbiBhIHJBRiBjYWxsYmFjayBmb3IgYSBzdWJtaXQgYnV0dG9uIGludGVyYWN0aW9uICgjMjI0MSkuXG4gICAgICAgIGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSA9IHRoaXMuY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSk7XG4gICAgICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgIC8vIFJlc2V0IGFjdGl2YXRpb24gc3RhdGUgaW1tZWRpYXRlbHkgaWYgZWxlbWVudCB3YXMgbm90IG1hZGUgYWN0aXZlLlxuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8gPSB0aGlzLmRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnQ9fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKSB7XG4gICAgcmV0dXJuIChlICE9PSB1bmRlZmluZWQgJiYgZS50eXBlID09PSAna2V5ZG93bicpID8gdGhpcy5hZGFwdGVyXy5pc1N1cmZhY2VBY3RpdmUoKSA6IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgYWN0aXZhdGUoZXZlbnQpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHVuZGVmaW5lZCwgTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLlRBUF9ERUxBWV9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRlYWN0aXZhdGVfKCkge1xuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaW4gc2NlbmFyaW9zIHN1Y2ggYXMgd2hlbiB5b3UgaGF2ZSBhIGtleXVwIGV2ZW50IHRoYXQgYmx1cnMgdGhlIGVsZW1lbnQuXG4gICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IC8qKiBAdHlwZSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9ICovIChPYmplY3QuYXNzaWduKHt9LCBhY3RpdmF0aW9uU3RhdGUpKTtcblxuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKHN0YXRlKSk7XG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXy5oYXNEZWFjdGl2YXRpb25VWFJ1biA9IHRydWU7XG4gICAgICAgIHRoaXMuYW5pbWF0ZURlYWN0aXZhdGlvbl8oc3RhdGUpO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gb3B0aW9uc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYW5pbWF0ZURlYWN0aXZhdGlvbl8oe3dhc0FjdGl2YXRlZEJ5UG9pbnRlciwgd2FzRWxlbWVudE1hZGVBY3RpdmV9KSB7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlciB8fCB3YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgdGhpcy5ydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKTtcbiAgICB9XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgaWYgKHRoaXMubGF5b3V0RnJhbWVfKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxheW91dEZyYW1lXyk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0RnJhbWVfID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgbGF5b3V0SW50ZXJuYWxfKCkge1xuICAgIHRoaXMuZnJhbWVfID0gdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgodGhpcy5mcmFtZV8uaGVpZ2h0LCB0aGlzLmZyYW1lXy53aWR0aCk7XG5cbiAgICAvLyBTdXJmYWNlIGRpYW1ldGVyIGlzIHRyZWF0ZWQgZGlmZmVyZW50bHkgZm9yIHVuYm91bmRlZCB2cy4gYm91bmRlZCByaXBwbGVzLlxuICAgIC8vIFVuYm91bmRlZCByaXBwbGUgZGlhbWV0ZXIgaXMgY2FsY3VsYXRlZCBzbWFsbGVyIHNpbmNlIHRoZSBzdXJmYWNlIGlzIGV4cGVjdGVkIHRvIGFscmVhZHkgYmUgcGFkZGVkIGFwcHJvcHJpYXRlbHlcbiAgICAvLyB0byBleHRlbmQgdGhlIGhpdGJveCwgYW5kIHRoZSByaXBwbGUgaXMgZXhwZWN0ZWQgdG8gbWVldCB0aGUgZWRnZXMgb2YgdGhlIHBhZGRlZCBoaXRib3ggKHdoaWNoIGlzIHR5cGljYWxseVxuICAgIC8vIHNxdWFyZSkuIEJvdW5kZWQgcmlwcGxlcywgb24gdGhlIG90aGVyIGhhbmQsIGFyZSBmdWxseSBleHBlY3RlZCB0byBleHBhbmQgYmV5b25kIHRoZSBzdXJmYWNlJ3MgbG9uZ2VzdCBkaWFtZXRlclxuICAgIC8vIChjYWxjdWxhdGVkIGJhc2VkIG9uIHRoZSBkaWFnb25hbCBwbHVzIGEgY29uc3RhbnQgcGFkZGluZyksIGFuZCBhcmUgY2xpcHBlZCBhdCB0aGUgc3VyZmFjZSdzIGJvcmRlciB2aWFcbiAgICAvLyBgb3ZlcmZsb3c6IGhpZGRlbmAuXG4gICAgY29uc3QgZ2V0Qm91bmRlZFJhZGl1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGh5cG90ZW51c2UgPSBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5mcmFtZV8ud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5mcmFtZV8uaGVpZ2h0LCAyKSk7XG4gICAgICByZXR1cm4gaHlwb3RlbnVzZSArIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5QQURESU5HO1xuICAgIH07XG5cbiAgICB0aGlzLm1heFJhZGl1c18gPSB0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkgPyBtYXhEaW0gOiBnZXRCb3VuZGVkUmFkaXVzKCk7XG5cbiAgICAvLyBSaXBwbGUgaXMgc2l6ZWQgYXMgYSBmcmFjdGlvbiBvZiB0aGUgbGFyZ2VzdCBkaW1lbnNpb24gb2YgdGhlIHN1cmZhY2UsIHRoZW4gc2NhbGVzIHVwIHVzaW5nIGEgQ1NTIHNjYWxlIHRyYW5zZm9ybVxuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gTWF0aC5mbG9vcihtYXhEaW0gKiBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuSU5JVElBTF9PUklHSU5fU0NBTEUpO1xuICAgIHRoaXMuZmdTY2FsZV8gPSB0aGlzLm1heFJhZGl1c18gLyB0aGlzLmluaXRpYWxTaXplXztcblxuICAgIHRoaXMudXBkYXRlTGF5b3V0Q3NzVmFyc18oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB1cGRhdGVMYXlvdXRDc3NWYXJzXygpIHtcbiAgICBjb25zdCB7XG4gICAgICBWQVJfRkdfU0laRSwgVkFSX0xFRlQsIFZBUl9UT1AsIFZBUl9GR19TQ0FMRSxcbiAgICB9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0laRSwgYCR7dGhpcy5pbml0aWFsU2l6ZV99cHhgKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9GR19TQ0FMRSwgdGhpcy5mZ1NjYWxlXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICAgIGxlZnQ6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICAgIHRvcDogTWF0aC5yb3VuZCgodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLmFkYXB0ZXJfLnVwZGF0ZUNzc1ZhcmlhYmxlKFZBUl9MRUZULCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18ubGVmdH1weGApO1xuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfVE9QLCBgJHt0aGlzLnVuYm91bmRlZENvb3Jkc18udG9wfXB4YCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdW5ib3VuZGVkICovXG4gIHNldFVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICBjb25zdCB7VU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICBpZiAodW5ib3VuZGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKFVOQk9VTkRFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVGb2N1cygpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT5cbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkJHX0ZPQ1VTRUQpKTtcbiAgfVxuXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDUmlwcGxlRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IE1EQ1JpcHBsZUZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAZXh0ZW5kcyBNRENDb21wb25lbnQ8IU1EQ1JpcHBsZUZvdW5kYXRpb24+XG4gKi9cbmNsYXNzIE1EQ1JpcHBsZSBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKiBAcGFyYW0gey4uLj99IGFyZ3MgKi9cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLyoqIEB0eXBlIHtib29sZWFufSAqL1xuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRWxlbWVudH0gcm9vdFxuICAgKiBAcGFyYW0ge3tpc1VuYm91bmRlZDogKGJvb2xlYW58dW5kZWZpbmVkKX09fSBvcHRpb25zXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGV9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCwge2lzVW5ib3VuZGVkID0gdW5kZWZpbmVkfSA9IHt9KSB7XG4gICAgY29uc3QgcmlwcGxlID0gbmV3IE1EQ1JpcHBsZShyb290KTtcbiAgICAvLyBPbmx5IG92ZXJyaWRlIHVuYm91bmRlZCBiZWhhdmlvciBpZiBvcHRpb24gaXMgZXhwbGljaXRseSBzcGVjaWZpZWRcbiAgICBpZiAoaXNVbmJvdW5kZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmlwcGxlLnVuYm91bmRlZCA9IC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi8gKGlzVW5ib3VuZGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJpcHBsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFSaXBwbGVDYXBhYmxlU3VyZmFjZX0gaW5zdGFuY2VcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZUFkYXB0ZXJ9XG4gICAqL1xuICBzdGF0aWMgY3JlYXRlQWRhcHRlcihpbnN0YW5jZSkge1xuICAgIGNvbnN0IE1BVENIRVMgPSB1dGlsLmdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IHV0aWwuc3VwcG9ydHNDc3NWYXJpYWJsZXMod2luZG93KSxcbiAgICAgIGlzVW5ib3VuZGVkOiAoKSA9PiBpbnN0YW5jZS51bmJvdW5kZWQsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IGluc3RhbmNlLnJvb3RfW01BVENIRVNdKCc6YWN0aXZlJyksXG4gICAgICBpc1N1cmZhY2VEaXNhYmxlZDogKCkgPT4gaW5zdGFuY2UuZGlzYWJsZWQsXG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gaW5zdGFuY2Uucm9vdF8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICh0YXJnZXQpID0+IGluc3RhbmNlLnJvb3RfLmNvbnRhaW5zKHRhcmdldCksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgaW5zdGFuY2Uucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlciksXG4gICAgICB1cGRhdGVDc3NWYXJpYWJsZTogKHZhck5hbWUsIHZhbHVlKSA9PiBpbnN0YW5jZS5yb290Xy5zdHlsZS5zZXRQcm9wZXJ0eSh2YXJOYW1lLCB2YWx1ZSksXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiBpbnN0YW5jZS5yb290Xy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgIGdldFdpbmRvd1BhZ2VPZmZzZXQ6ICgpID0+ICh7eDogd2luZG93LnBhZ2VYT2Zmc2V0LCB5OiB3aW5kb3cucGFnZVlPZmZzZXR9KSxcbiAgICB9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCB1bmJvdW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMudW5ib3VuZGVkXztcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXQgdW5ib3VuZGVkKHVuYm91bmRlZCkge1xuICAgIHRoaXMudW5ib3VuZGVkXyA9IEJvb2xlYW4odW5ib3VuZGVkKTtcbiAgICB0aGlzLnNldFVuYm91bmRlZF8oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zdXJlIENvbXBpbGVyIHRocm93cyBhbiBhY2Nlc3MgY29udHJvbCBlcnJvciB3aGVuIGRpcmVjdGx5IGFjY2Vzc2luZyBhXG4gICAqIHByb3RlY3RlZCBvciBwcml2YXRlIHByb3BlcnR5IGluc2lkZSBhIGdldHRlci9zZXR0ZXIsIGxpa2UgdW5ib3VuZGVkIGFib3ZlLlxuICAgKiBCeSBhY2Nlc3NpbmcgdGhlIHByb3RlY3RlZCBwcm9wZXJ0eSBpbnNpZGUgYSBtZXRob2QsIHdlIHNvbHZlIHRoYXQgcHJvYmxlbS5cbiAgICogVGhhdCdzIHdoeSB0aGlzIGZ1bmN0aW9uIGV4aXN0cy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldFVuYm91bmRlZF8oKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRVbmJvdW5kZWQodGhpcy51bmJvdW5kZWRfKTtcbiAgfVxuXG4gIGFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uYWN0aXZhdGUoKTtcbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZWFjdGl2YXRlKCk7XG4gIH1cblxuICBsYXlvdXQoKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5sYXlvdXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlRm91bmRhdGlvbn1cbiAgICogQG92ZXJyaWRlXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE1EQ1JpcHBsZUZvdW5kYXRpb24oTURDUmlwcGxlLmNyZWF0ZUFkYXB0ZXIodGhpcykpO1xuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgdGhpcy51bmJvdW5kZWQgPSAnbWRjUmlwcGxlSXNVbmJvdW5kZWQnIGluIHRoaXMucm9vdF8uZGF0YXNldDtcbiAgfVxufVxuXG4vKipcbiAqIFNlZSBNYXRlcmlhbCBEZXNpZ24gc3BlYyBmb3IgbW9yZSBkZXRhaWxzIG9uIHdoZW4gdG8gdXNlIHJpcHBsZXMuXG4gKiBodHRwczovL21hdGVyaWFsLmlvL2d1aWRlbGluZXMvbW90aW9uL2Nob3Jlb2dyYXBoeS5odG1sI2Nob3Jlb2dyYXBoeS1jcmVhdGlvblxuICogQHJlY29yZFxuICovXG5jbGFzcyBSaXBwbGVDYXBhYmxlU3VyZmFjZSB7fVxuXG4vKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUucm9vdF87XG5cbi8qKlxuICogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBibGVlZHMgb3V0IG9mIHRoZSBib3VuZHMgb2YgdGhlIGVsZW1lbnQuXG4gKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS51bmJvdW5kZWQ7XG5cbi8qKlxuICogV2hldGhlciBvciBub3QgdGhlIHJpcHBsZSBpcyBhdHRhY2hlZCB0byBhIGRpc2FibGVkIGNvbXBvbmVudC5cbiAqIEB0eXBlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLmRpc2FibGVkO1xuXG5leHBvcnQge01EQ1JpcHBsZSwgTURDUmlwcGxlRm91bmRhdGlvbiwgUmlwcGxlQ2FwYWJsZVN1cmZhY2UsIHV0aWx9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIHN1cHBvcnRzQ3NzVmFyaWFibGVzIHRvIGF2b2lkIHJlZHVuZGFudCBwcm9jZXNzaW5nIHRvIGRldGVjdCBDU1MgY3VzdG9tIHZhcmlhYmxlIHN1cHBvcnQuXG4gKiBAcHJpdmF0ZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cbmxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlc187XG5cbi8qKlxuICogU3RvcmVzIHJlc3VsdCBmcm9tIGFwcGx5UGFzc2l2ZSB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgcGFzc2l2ZSBldmVudCBsaXN0ZW5lciBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNQYXNzaXZlXztcblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopIHtcbiAgLy8gRGV0ZWN0IHZlcnNpb25zIG9mIEVkZ2Ugd2l0aCBidWdneSB2YXIoKSBzdXBwb3J0XG4gIC8vIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTE0OTU0NDgvXG4gIGNvbnN0IGRvY3VtZW50ID0gd2luZG93T2JqLmRvY3VtZW50O1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NOYW1lID0gJ21kYy1yaXBwbGUtc3VyZmFjZS0tdGVzdC1lZGdlLXZhci1idWcnO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuXG4gIC8vIFRoZSBidWcgZXhpc3RzIGlmIDo6YmVmb3JlIHN0eWxlIGVuZHMgdXAgcHJvcGFnYXRpbmcgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAvLyBBZGRpdGlvbmFsbHksIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGlmcmFtZXMgd2l0aCBkaXNwbGF5OiBcIm5vbmVcIiBpbiBGaXJlZm94LFxuICAvLyBidXQgRmlyZWZveCBpcyBrbm93biB0byBzdXBwb3J0IENTUyBjdXN0b20gcHJvcGVydGllcyBjb3JyZWN0bHkuXG4gIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSB3aW5kb3dPYmouZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgY29uc3QgaGFzUHNldWRvVmFyQnVnID0gY29tcHV0ZWRTdHlsZSAhPT0gbnVsbCAmJiBjb21wdXRlZFN0eWxlLmJvcmRlclRvcFN0eWxlID09PSAnc29saWQnO1xuICBub2RlLnJlbW92ZSgpO1xuICByZXR1cm4gaGFzUHNldWRvVmFyQnVnO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7IVdpbmRvd30gd2luZG93T2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvd09iaiwgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgbGV0IHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9PT0gJ2Jvb2xlYW4nICYmICFmb3JjZVJlZnJlc2gpIHtcbiAgICByZXR1cm4gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cblxuICBjb25zdCBzdXBwb3J0c0Z1bmN0aW9uUHJlc2VudCA9IHdpbmRvd09iai5DU1MgJiYgdHlwZW9mIHdpbmRvd09iai5DU1Muc3VwcG9ydHMgPT09ICdmdW5jdGlvbic7XG4gIGlmICghc3VwcG9ydHNGdW5jdGlvblByZXNlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBleHBsaWNpdGx5U3VwcG9ydHNDc3NWYXJzID0gd2luZG93T2JqLkNTUy5zdXBwb3J0cygnLS1jc3MtdmFycycsICd5ZXMnKTtcbiAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU0NjY5XG4gIC8vIFNlZTogUkVBRE1FIHNlY3Rpb24gb24gU2FmYXJpXG4gIGNvbnN0IHdlQXJlRmVhdHVyZURldGVjdGluZ1NhZmFyaTEwcGx1cyA9IChcbiAgICB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzKCcoLS1jc3MtdmFyczogeWVzKScpICYmXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnY29sb3InLCAnIzAwMDAwMDAwJylcbiAgKTtcblxuICBpZiAoZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyB8fCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMpIHtcbiAgICBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9ICFkZXRlY3RFZGdlUHNldWRvVmFyQnVnKHdpbmRvd09iaik7XG4gIH0gZWxzZSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghZm9yY2VSZWZyZXNoKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXNfID0gc3VwcG9ydHNDc3NWYXJpYWJsZXM7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xufVxuXG4vL1xuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXJzLCBhbmQgaWYgc28sIHVzZSB0aGVtLlxuICogQHBhcmFtIHshV2luZG93PX0gZ2xvYmFsT2JqXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBmb3JjZVJlZnJlc2hcbiAqIEByZXR1cm4ge2Jvb2xlYW58IUV2ZW50TGlzdGVuZXJPcHRpb25zfVxuICovXG5mdW5jdGlvbiBhcHBseVBhc3NpdmUoZ2xvYmFsT2JqID0gd2luZG93LCBmb3JjZVJlZnJlc2ggPSBmYWxzZSkge1xuICBpZiAoc3VwcG9ydHNQYXNzaXZlXyA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlUmVmcmVzaCkge1xuICAgIGxldCBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBnbG9iYWxPYmouZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIHtnZXQgcGFzc2l2ZSgpIHtcbiAgICAgICAgaXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XG4gICAgICB9fSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICBzdXBwb3J0c1Bhc3NpdmVfID0gaXNTdXBwb3J0ZWQ7XG4gIH1cblxuICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlX1xuICAgID8gLyoqIEB0eXBlIHshRXZlbnRMaXN0ZW5lck9wdGlvbnN9ICovICh7cGFzc2l2ZTogdHJ1ZX0pXG4gICAgOiBmYWxzZTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IEhUTUxFbGVtZW50UHJvdG90eXBlXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICAvKipcbiAgICogT3JkZXIgaXMgaW1wb3J0YW50IGJlY2F1c2Ugd2UgcmV0dXJuIHRoZSBmaXJzdCBleGlzdGluZyBtZXRob2Qgd2UgZmluZC5cbiAgICogRG8gbm90IGNoYW5nZSB0aGUgb3JkZXIgb2YgdGhlIGl0ZW1zIGluIHRoZSBiZWxvdyBhcnJheS5cbiAgICovXG4gIGNvbnN0IG1hdGNoZXNNZXRob2RzID0gWydtYXRjaGVzJywgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsICdtc01hdGNoZXNTZWxlY3RvciddO1xuICBsZXQgbWV0aG9kID0gJ21hdGNoZXMnO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1hdGNoZXNNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbWF0Y2hlc01ldGhvZCA9IG1hdGNoZXNNZXRob2RzW2ldO1xuICAgIGlmIChtYXRjaGVzTWV0aG9kIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKSB7XG4gICAgICBtZXRob2QgPSBtYXRjaGVzTWV0aG9kO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1ldGhvZDtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgZXYgPSAvKiogQHR5cGUgeyFUb3VjaEV2ZW50fSAqLyAoZXYpO1xuICAgIG5vcm1hbGl6ZWRYID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfSBlbHNlIHtcbiAgICBldiA9IC8qKiBAdHlwZSB7IU1vdXNlRXZlbnR9ICovIChldik7XG4gICAgbm9ybWFsaXplZFggPSBldi5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9XG5cbiAgcmV0dXJuIHt4OiBub3JtYWxpemVkWCwgeTogbm9ybWFsaXplZFl9O1xufVxuXG5leHBvcnQge3N1cHBvcnRzQ3NzVmFyaWFibGVzLCBhcHBseVBhc3NpdmUsIGdldE1hdGNoZXNQcm9wZXJ0eSwgZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtNRENSaXBwbGV9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvaW5kZXgnO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGNoZWNrZWQ6IGJvb2xlYW4sXG4gKiAgIGluZGV0ZXJtaW5hdGU6IGJvb2xlYW4sXG4gKiAgIGRpc2FibGVkOiBib29sZWFuLFxuICogICB2YWx1ZTogP3N0cmluZ1xuICogfX1cbiAqL1xubGV0IE1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZTtcblxuLyoqXG4gKiBAcmVjb3JkXG4gKi9cbmNsYXNzIE1EQ1NlbGVjdGlvbkNvbnRyb2wge1xuICAvKiogQHJldHVybiB7P01EQ1JpcHBsZX0gKi9cbiAgZ2V0IHJpcHBsZSgpIHt9XG59XG5cbmV4cG9ydCB7TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlLCBNRENTZWxlY3Rpb25Db250cm9sfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgU3dpdGNoLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENTd2l0Y2hBZGFwdGVyIHtcbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBjaGVja2VkICovXG4gIHNldE5hdGl2ZUNvbnRyb2xDaGVja2VkKGNoZWNrZWQpIHt9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgKi9cbiAgc2V0TmF0aXZlQ29udHJvbERpc2FibGVkKGRpc2FibGVkKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTd2l0Y2hBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgQ0hFQ0tFRDogJ21kYy1zd2l0Y2gtLWNoZWNrZWQnLFxuICBESVNBQkxFRDogJ21kYy1zd2l0Y2gtLWRpc2FibGVkJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgTkFUSVZFX0NPTlRST0xfU0VMRUNUT1I6ICcubWRjLXN3aXRjaF9fbmF0aXZlLWNvbnRyb2wnLFxuICBSSVBQTEVfU1VSRkFDRV9TRUxFQ1RPUjogJy5tZGMtc3dpdGNoX190aHVtYi11bmRlcmxheScsXG59O1xuXG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDU3dpdGNoQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1N3aXRjaEFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENTd2l0Y2hGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIHJldHVybiBzdHJpbmdzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4gZW51bSB7c3RyaW5nfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ1N3aXRjaEFkYXB0ZXJ9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IU1EQ1N3aXRjaEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0TmF0aXZlQ29udHJvbENoZWNrZWQ6ICgvKiBjaGVja2VkOiBib29sZWFuICovKSA9PiB7fSxcbiAgICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogKC8qIGRpc2FibGVkOiBib29sZWFuICovKSA9PiB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ1N3aXRjaEZvdW5kYXRpb24uZGVmYXVsdEFkYXB0ZXIsIGFkYXB0ZXIpKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWQgKi9cbiAgc2V0Q2hlY2tlZChjaGVja2VkKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXROYXRpdmVDb250cm9sQ2hlY2tlZChjaGVja2VkKTtcbiAgICB0aGlzLnVwZGF0ZUNoZWNrZWRTdHlsaW5nXyhjaGVja2VkKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5zZXROYXRpdmVDb250cm9sRGlzYWJsZWQoZGlzYWJsZWQpO1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkRJU0FCTEVEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkRJU0FCTEVEKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgY2hhbmdlIGV2ZW50IGZvciB0aGUgc3dpdGNoIG5hdGl2ZSBjb250cm9sLlxuICAgKiBAcGFyYW0geyFFdmVudH0gZXZ0XG4gICAqL1xuICBoYW5kbGVDaGFuZ2UoZXZ0KSB7XG4gICAgdGhpcy51cGRhdGVDaGVja2VkU3R5bGluZ18oZXZ0LnRhcmdldC5jaGVja2VkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBzdHlsaW5nIG9mIHRoZSBzd2l0Y2ggYmFzZWQgb24gaXRzIGNoZWNrZWQgc3RhdGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlQ2hlY2tlZFN0eWxpbmdfKGNoZWNrZWQpIHtcbiAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhjc3NDbGFzc2VzLkNIRUNLRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuQ0hFQ0tFRCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1N3aXRjaEZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlLCBNRENTZWxlY3Rpb25Db250cm9sfSBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbnRyb2wvaW5kZXgnO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IE1EQ1N3aXRjaEZvdW5kYXRpb24gZnJvbSAnLi9mb3VuZGF0aW9uJztcbmltcG9ydCB7TURDUmlwcGxlLCBNRENSaXBwbGVGb3VuZGF0aW9ufSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2luZGV4JztcbmltcG9ydCB7Z2V0TWF0Y2hlc1Byb3BlcnR5fSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL3V0aWwnO1xuXG4vKipcbiAqIEBleHRlbmRzIE1EQ0NvbXBvbmVudDwhTURDU3dpdGNoRm91bmRhdGlvbj5cbiAqIEBpbXBsZW1lbnRzIHtNRENTZWxlY3Rpb25Db250cm9sfVxuICovXG5jbGFzcyBNRENTd2l0Y2ggZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDU3dpdGNoKHJvb3QpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshTURDUmlwcGxlfSAqL1xuICAgIHRoaXMucmlwcGxlXyA9IHRoaXMuaW5pdFJpcHBsZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuY2hhbmdlSGFuZGxlcl87XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLnJpcHBsZV8uZGVzdHJveSgpO1xuICAgIHRoaXMubmF0aXZlQ29udHJvbF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VIYW5kbGVyXyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgdGhpcy5jaGFuZ2VIYW5kbGVyXyA9IHRoaXMuZm91bmRhdGlvbl8uaGFuZGxlQ2hhbmdlLmJpbmQodGhpcy5mb3VuZGF0aW9uXyk7XG4gICAgdGhpcy5uYXRpdmVDb250cm9sXy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmNoYW5nZUhhbmRsZXJfKTtcblxuICAgIC8vIFNvbWV0aW1lcyB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgaW5wdXQgZWxlbWVudCBpcyBzYXZlZCBpbiB0aGUgaGlzdG9yeS5cbiAgICAvLyBUaGUgc3dpdGNoIHN0eWxpbmcgc2hvdWxkIG1hdGNoIHRoZSBjaGVja2VkIHN0YXRlIG9mIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgIC8vIERvIGFuIGluaXRpYWwgc3luYyBiZXR3ZWVuIHRoZSBuYXRpdmUgY29udHJvbCBhbmQgdGhlIGZvdW5kYXRpb24uXG4gICAgdGhpcy5jaGVja2VkID0gdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHN0YXRlIG9mIHRoZSBuYXRpdmUgY29udHJvbCBlbGVtZW50LCBvciBudWxsIGlmIHRoZSBuYXRpdmUgY29udHJvbCBlbGVtZW50IGlzIG5vdCBwcmVzZW50LlxuICAgKiBAcmV0dXJuIHs/TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0IG5hdGl2ZUNvbnRyb2xfKCkge1xuICAgIGNvbnN0IHtOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUn0gPSBNRENTd2l0Y2hGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3QgZWwgPSAvKiogQHR5cGUgez9NRENTZWxlY3Rpb25Db250cm9sU3RhdGV9ICovIChcbiAgICAgIHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUikpO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaW5pdFJpcHBsZV8oKSB7XG4gICAgY29uc3Qge1JJUFBMRV9TVVJGQUNFX1NFTEVDVE9SfSA9IE1EQ1N3aXRjaEZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCByaXBwbGVTdXJmYWNlID0gLyoqIEB0eXBlIHshRWxlbWVudH0gKi8gKHRoaXMucm9vdF8ucXVlcnlTZWxlY3RvcihSSVBQTEVfU1VSRkFDRV9TRUxFQ1RPUikpO1xuXG4gICAgY29uc3QgTUFUQ0hFUyA9IGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBPYmplY3QuYXNzaWduKE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyKHRoaXMpLCB7XG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gdHJ1ZSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gdGhpcy5uYXRpdmVDb250cm9sX1tNQVRDSEVTXSgnOmFjdGl2ZScpLFxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHJpcHBsZVN1cmZhY2UuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHJpcHBsZVN1cmZhY2UuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB0aGlzLm5hdGl2ZUNvbnRyb2xfLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4gdGhpcy5uYXRpdmVDb250cm9sXy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpLFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4gcmlwcGxlU3VyZmFjZS5zdHlsZS5zZXRQcm9wZXJ0eSh2YXJOYW1lLCB2YWx1ZSksXG4gICAgICBjb21wdXRlQm91bmRpbmdSZWN0OiAoKSA9PiByaXBwbGVTdXJmYWNlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgIH0pO1xuICAgIGNvbnN0IGZvdW5kYXRpb24gPSBuZXcgTURDUmlwcGxlRm91bmRhdGlvbihhZGFwdGVyKTtcbiAgICByZXR1cm4gbmV3IE1EQ1JpcHBsZSh0aGlzLnJvb3RfLCBmb3VuZGF0aW9uKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDU3dpdGNoRm91bmRhdGlvbn0gKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENTd2l0Y2hGb3VuZGF0aW9uKHtcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiB0aGlzLnJvb3RfLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIHNldE5hdGl2ZUNvbnRyb2xDaGVja2VkOiAoY2hlY2tlZCkgPT4gdGhpcy5uYXRpdmVDb250cm9sXy5jaGVja2VkID0gY2hlY2tlZCxcbiAgICAgIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZDogKGRpc2FibGVkKSA9PiB0aGlzLm5hdGl2ZUNvbnRyb2xfLmRpc2FibGVkID0gZGlzYWJsZWQsXG4gICAgfSk7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ1JpcHBsZX0gKi9cbiAgZ2V0IHJpcHBsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yaXBwbGVfO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBjaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZUNvbnRyb2xfLmNoZWNrZWQ7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBjaGVja2VkICovXG4gIHNldCBjaGVja2VkKGNoZWNrZWQpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldENoZWNrZWQoY2hlY2tlZCk7XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgZ2V0IGRpc2FibGVkKCkge1xuICAgIHJldHVybiB0aGlzLm5hdGl2ZUNvbnRyb2xfLmRpc2FibGVkO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZWQgKi9cbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXREaXNhYmxlZChkaXNhYmxlZCk7XG4gIH1cbn1cblxuZXhwb3J0IHtNRENTd2l0Y2hGb3VuZGF0aW9uLCBNRENTd2l0Y2h9O1xuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaGVhZGVyX19tZW51LW9wZW4nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgJCgnLmhlYWRlcl9fbWVudS1jbG9zZScpLmFkZENsYXNzKCdkLWZsZXgnKTtcclxuICAgICAgICAkKCcuaGVhZGVyJykuYWRkQ2xhc3MoJ2hlYWRlci0tb3BlbicpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbm9zY3JvbGwteScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5oZWFkZXJfX21lbnUtY2xvc2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5oZWFkZXJfX21lbnUtb3BlblwiKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZC1mbGV4Jyk7XHJcbiAgICAgICAgJCgnLmhlYWRlcicpLnJlbW92ZUNsYXNzKCdoZWFkZXItLW9wZW4nKTtcclxuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ25vc2Nyb2xsLXknKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIuY29sbGFwc2VcIikub24oJ3Nob3cuYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5wcmV2KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiLmNvbGxhcHNlXCIpLm9uKCdoaWRlLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykucHJldigpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKCcuZGF0ZScpLmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICBmb3JtYXQ6ICdERC5NTS5ZWScsXHJcbiAgICAgICAgZGVmYXVsdERhdGU6IG1vbWVudCgpLFxyXG4gICAgICAgIGljb25zOiB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzOiAnbWF0ZXJpYWwtaWNvbnMnLFxyXG4gICAgICAgICAgICBuZXh0OiAnbWF0ZXJpYWwtaWNvbnMnXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdmFyIHN0aWNreUZvb3RlckZ1bmM7XHJcbiAgICAvLyAoc3RpY2t5Rm9vdGVyRnVuYyA9IGZ1bmN0aW9uIHN0aWNreUZvb3RlckZ1bmMoKSB7XHJcbiAgICAvLyAgICAgJCgnZm9vdGVyJykuY3NzKCdwb3NpdGlvbicsICdzdGF0aWMnKTtcclxuICAgIC8vICAgICAkKCdib2R5JykuY3NzKCdtaW4taGVpZ2h0JywgJzEwMHB4Jyk7XHJcbiAgICAvL1xyXG4gICAgLy8gICAgIHZhciBib2R5SGVpZ2h0ID0gJCgnYm9keScpLm91dGVySGVpZ2h0KCk7XHJcbiAgICAvLyAgICAgaWYgKHdpbmRvdy5pbm5lckhlaWdodCA+IGJvZHlIZWlnaHQpIHtcclxuICAgIC8vICAgICAgICAgJCgnYm9keScpLmNzcygnbWluLWhlaWdodCcsICcxMDB2aCcpO1xyXG4gICAgLy8gICAgICAgICAkKCdmb290ZXInKS5jc3MoeyAncG9zaXRpb24nOiAnYWJzb2x1dGUnLCAnYm90dG9tJzogJzAnIH0pO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0pKCk7XHJcbiAgICAvLyBzdGlja3lGb290ZXJGdW5jKCk7XHJcblxyXG4gICAgJCgnLmZvcm0tZ3JvdXAgaW5wdXQsIHRleHRhcmVhJykua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpICE9IDApIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5wcmV2KCkuY3NzKCdjb2xvcicsICcjNTNBRTNCJyk7XHJcbiAgICAgICAgfSBlbHNlICQodGhpcykucHJldigpLmNzcygnY29sb3InLCAnIzMzMycpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoJ3NlbGVjdC5zZWxlY3RwaWNrZXInKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxlY3RlZCA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWQpO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuZmluZCgnbGFiZWwnKS5jc3MoJ2NvbG9yJywgJyM1M0FFM0InKTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmZpbmQoJ2xhYmVsJykuY3NzKCdjb2xvcicsICcjMzMzJyk7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAkKCcnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3NlbGVjdCA9ICQodGhpcykuZmluZCgnc2VsZWN0Jyk7XHJcbiAgICAgICAgX3NlbGVjdC5vbignY2hhbmdlZC5icy5zZWxlY3QnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3NlbGVjdGVkT3B0aW9uID0gJCh0aGlzKS5maW5kKCdvcHRpb246c2VsZWN0ZWQnKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vICQoJy5zZWxlY3RwaWNrZXInKS5zZWxlY3RwaWNrZXIoKTtcclxuXHJcblxyXG4gICAgJCgnaW5wdXQub25seS1udW1iZXInKS5iaW5kKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUud2hpY2ggIT0gMTMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgvW1xcZC4rXS8udGVzdChlLmtleSkpOyAgLy8gSUUgPiA5XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHZhciB3ID0gd2luZG93LFxyXG4gICAgICAgIGQgPSBkb2N1bWVudCxcclxuICAgICAgICBlID0gZC5kb2N1bWVudEVsZW1lbnQsXHJcbiAgICAgICAgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSxcclxuICAgICAgICB4ID0gdy5pbm5lcldpZHRoIHx8IGUuY2xpZW50V2lkdGggfHwgZy5jbGllbnRXaWR0aDtcclxuXHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cclxuICAgICAgICAvLyBzdGlja3lGb290ZXJGdW5jKCk7XHJcbiAgICAgICAgdmFyIHQgPSB3LmlubmVyV2lkdGggfHwgZS5jbGllbnRXaWR0aCB8fCBnLmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGlmICh0ICE9PSB4KSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pO1xyXG4iXX0=
