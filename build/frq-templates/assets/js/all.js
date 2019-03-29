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
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right'
            }
        }).on('dp.change', function () {
            if ($(this).val() != 0) {
                $(this).closest('.form-group').find('label').addClass('color-dark-green');
            } else $(this).closest('.form-group').find('label').removeClass('color-dark-green');
        });

        $('.form-group input, textarea').keyup(function () {
            if ($(this).val() != 0) {
                $(this).closest('.form-group').find('label').addClass('color-dark-green');
            } else $(this).closest('.form-group').find('label').removeClass('color-dark-green');
        });

        $('select.selectpicker').on('change', function () {
            var selected = $(this).val();
            console.log(selected);
            if (selected) {
                $(this).closest('.form-group').find('label').addClass('color-dark-green');
            } else $(this).closest('.form-group').find('label').removeClass('color-dark-green');
        });

        $("input").on("click", function () {
            $(this).closest('.form-group').find('p').addClass('color-dark-green');
            $(this).closest('.form-group').find('label.mb-10').addClass('color-dark-green');
        });

        var stickyFooterFunc;
        (stickyFooterFunc = function stickyFooterFunc() {
            $('footer').css('position', 'static');
            $('body').css('min-height', '100px');

            var bodyHeight = $('body').outerHeight();
            if (window.innerHeight > bodyHeight) {
                $('body').css('min-height', '100vh');
                $('footer').css({ 'position': 'absolute', 'bottom': '0' });
            }
        })();

        stickyFooterFunc();

        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;

        window.onresize = function () {

            stickyFooterFunc();
            var t = w.innerWidth || e.clientWidth || g.clientWidth;
            if (t !== x) {}
        };
    });
});

},{}]},{},[13,12])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcYmFzZVxcY29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXGJhc2VcXGZvdW5kYXRpb24uanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxccmlwcGxlXFxhZGFwdGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcZm91bmRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxyaXBwbGVcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcdXRpbC5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxzZWxlY3Rpb24tY29udHJvbFxcaW5kZXguanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcc3dpdGNoXFxhZGFwdGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHN3aXRjaFxcY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHN3aXRjaFxcZm91bmRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxzd2l0Y2hcXGluZGV4LmpzIiwic3JjXFxmcnEtdGVtcGxhdGVzXFxhc3NldHNcXGpzXFxtYWluXFxtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQ2lDRSxJLEVBQXNCO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBTyxJQUFBLFlBQUEsQ0FBQSxJQUFBLEVBQXVCLElBQTlCLG9CQUE4QixFQUF2QixDQUFQO0FBQ0Q7OztBQUVEOzs7OztBQUtBLDBCQUFBLElBQUEsRUFBbUQ7QUFBQSxV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QUVBLGdCQUFJLGFBQWEsRUFBQSxNQUFBLEVBQWpCLFdBQWlCLEVBQWpCO0FBQ0EsZ0JBQUksT0FBQSxXQUFBLEdBQUosVUFBQSxFQUFxQztBQUNqQyxrQkFBQSxNQUFBLEVBQUEsR0FBQSxDQUFBLFlBQUEsRUFBQSxPQUFBO0FBQ0Esa0JBQUEsUUFBQSxFQUFBLEdBQUEsQ0FBZ0IsRUFBQyxZQUFELFVBQUEsRUFBeUIsVUFBekMsR0FBZ0IsRUFBaEI7QUFDSDtBQVJMLFNBQUE7O0FBV0E7O0FBRUEsWUFBSSxJQUFKLE1BQUE7QUFBQSxZQUNJLElBREosUUFBQTtBQUFBLFlBRUksSUFBSSxFQUZSLGVBQUE7QUFBQSxZQUdJLElBQUksRUFBQSxvQkFBQSxDQUFBLE1BQUEsRUFIUixDQUdRLENBSFI7QUFBQSxZQUlJLElBQUksRUFBQSxVQUFBLElBQWdCLEVBQWhCLFdBQUEsSUFBaUMsRUFKekMsV0FBQTs7QUFNQSxlQUFBLFFBQUEsR0FBa0IsWUFBWTs7QUFFMUI7QUFDQSxnQkFBSSxJQUFJLEVBQUEsVUFBQSxJQUFnQixFQUFoQixXQUFBLElBQWlDLEVBQXpDLFdBQUE7QUFDQSxnQkFBSSxNQUFKLENBQUEsRUFBYSxDQUVaO0FBTkwsU0FBQTtBQTVFSixLQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuXG4vKipcbiAqIEB0ZW1wbGF0ZSBGXG4gKi9cbmNsYXNzIE1EQ0NvbXBvbmVudCB7XG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEByZXR1cm4geyFNRENDb21wb25lbnR9XG4gICAqL1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIC8vIFN1YmNsYXNzZXMgd2hpY2ggZXh0ZW5kIE1EQ0Jhc2Ugc2hvdWxkIHByb3ZpZGUgYW4gYXR0YWNoVG8oKSBtZXRob2QgdGhhdCB0YWtlcyBhIHJvb3QgZWxlbWVudCBhbmRcbiAgICAvLyByZXR1cm5zIGFuIGluc3RhbnRpYXRlZCBjb21wb25lbnQgd2l0aCBpdHMgcm9vdCBzZXQgdG8gdGhhdCBlbGVtZW50LiBBbHNvIG5vdGUgdGhhdCBpbiB0aGUgY2FzZXMgb2ZcbiAgICAvLyBzdWJjbGFzc2VzLCBhbiBleHBsaWNpdCBmb3VuZGF0aW9uIGNsYXNzIHdpbGwgbm90IGhhdmUgdG8gYmUgcGFzc2VkIGluOyBpdCB3aWxsIHNpbXBseSBiZSBpbml0aWFsaXplZFxuICAgIC8vIGZyb20gZ2V0RGVmYXVsdEZvdW5kYXRpb24oKS5cbiAgICByZXR1cm4gbmV3IE1EQ0NvbXBvbmVudChyb290LCBuZXcgTURDRm91bmRhdGlvbigpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFbGVtZW50fSByb290XG4gICAqIEBwYXJhbSB7Rj19IGZvdW5kYXRpb25cbiAgICogQHBhcmFtIHsuLi4/fSBhcmdzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihyb290LCBmb3VuZGF0aW9uID0gdW5kZWZpbmVkLCAuLi5hcmdzKSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuICAgIHRoaXMucm9vdF8gPSByb290O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSguLi5hcmdzKTtcbiAgICAvLyBOb3RlIHRoYXQgd2UgaW5pdGlhbGl6ZSBmb3VuZGF0aW9uIGhlcmUgYW5kIG5vdCB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yJ3MgZGVmYXVsdCBwYXJhbSBzbyB0aGF0XG4gICAgLy8gdGhpcy5yb290XyBpcyBkZWZpbmVkIGFuZCBjYW4gYmUgdXNlZCB3aXRoaW4gdGhlIGZvdW5kYXRpb24gY2xhc3MuXG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFGfSAqL1xuICAgIHRoaXMuZm91bmRhdGlvbl8gPSBmb3VuZGF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLmdldERlZmF1bHRGb3VuZGF0aW9uKCkgOiBmb3VuZGF0aW9uO1xuICAgIHRoaXMuZm91bmRhdGlvbl8uaW5pdCgpO1xuICAgIHRoaXMuaW5pdGlhbFN5bmNXaXRoRE9NKCk7XG4gIH1cblxuICBpbml0aWFsaXplKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICAvLyBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIGRvIGFueSBhZGRpdGlvbmFsIHNldHVwIHdvcmsgdGhhdCB3b3VsZCBiZSBjb25zaWRlcmVkIHBhcnQgb2YgYVxuICAgIC8vIFwiY29uc3RydWN0b3JcIi4gRXNzZW50aWFsbHksIGl0IGlzIGEgaG9vayBpbnRvIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgYmVmb3JlIHRoZSBmb3VuZGF0aW9uIGlzXG4gICAgLy8gaW5pdGlhbGl6ZWQuIEFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBiZXNpZGVzIHJvb3QgYW5kIGZvdW5kYXRpb24gd2lsbCBiZSBwYXNzZWQgaW4gaGVyZS5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshRn0gZm91bmRhdGlvblxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgZm91bmRhdGlvbiBjbGFzcyBmb3IgdGhlXG4gICAgLy8gY29tcG9uZW50LlxuICAgIHRocm93IG5ldyBFcnJvcignU3ViY2xhc3NlcyBtdXN0IG92ZXJyaWRlIGdldERlZmF1bHRGb3VuZGF0aW9uIHRvIHJldHVybiBhIHByb3Blcmx5IGNvbmZpZ3VyZWQgJyArXG4gICAgICAnZm91bmRhdGlvbiBjbGFzcycpO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIGlmIHRoZXkgbmVlZCB0byBwZXJmb3JtIHdvcmsgdG8gc3luY2hyb25pemUgd2l0aCBhIGhvc3QgRE9NXG4gICAgLy8gb2JqZWN0LiBBbiBleGFtcGxlIG9mIHRoaXMgd291bGQgYmUgYSBmb3JtIGNvbnRyb2wgd3JhcHBlciB0aGF0IG5lZWRzIHRvIHN5bmNocm9uaXplIGl0cyBpbnRlcm5hbCBzdGF0ZVxuICAgIC8vIHRvIHNvbWUgcHJvcGVydHkgb3IgYXR0cmlidXRlIG9mIHRoZSBob3N0IERPTS4gUGxlYXNlIG5vdGU6IHRoaXMgaXMgKm5vdCogdGhlIHBsYWNlIHRvIHBlcmZvcm0gRE9NXG4gICAgLy8gcmVhZHMvd3JpdGVzIHRoYXQgd291bGQgY2F1c2UgbGF5b3V0IC8gcGFpbnQsIGFzIHRoaXMgaXMgY2FsbGVkIHN5bmNocm9ub3VzbHkgZnJvbSB3aXRoaW4gdGhlIGNvbnN0cnVjdG9yLlxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG1heSBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmVsZWFzZSBhbnkgcmVzb3VyY2VzIC8gZGVyZWdpc3RlciBhbnkgbGlzdGVuZXJzIHRoZXkgaGF2ZVxuICAgIC8vIGF0dGFjaGVkLiBBbiBleGFtcGxlIG9mIHRoaXMgbWlnaHQgYmUgZGVyZWdpc3RlcmluZyBhIHJlc2l6ZSBldmVudCBmcm9tIHRoZSB3aW5kb3cgb2JqZWN0LlxuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVzdHJveSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdyYXBwZXIgbWV0aG9kIHRvIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3Mgcm9vdCBlbGVtZW50LiBUaGlzIGlzIG1vc3QgdXNlZnVsIHdoZW5cbiAgICogbGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgbGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gcmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiB1bmxpc3RlbmluZyBmb3IgY3VzdG9tIGV2ZW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHVubGlzdGVuKGV2dFR5cGUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogRmlyZXMgYSBjcm9zcy1icm93c2VyLWNvbXBhdGlibGUgY3VzdG9tIGV2ZW50IGZyb20gdGhlIGNvbXBvbmVudCByb290IG9mIHRoZSBnaXZlbiB0eXBlLFxuICAgKiB3aXRoIHRoZSBnaXZlbiBkYXRhLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFPYmplY3R9IGV2dERhdGFcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hvdWxkQnViYmxlXG4gICAqL1xuICBlbWl0KGV2dFR5cGUsIGV2dERhdGEsIHNob3VsZEJ1YmJsZSA9IGZhbHNlKSB7XG4gICAgbGV0IGV2dDtcbiAgICBpZiAodHlwZW9mIEN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBldnQgPSBuZXcgQ3VzdG9tRXZlbnQoZXZ0VHlwZSwge1xuICAgICAgICBkZXRhaWw6IGV2dERhdGEsXG4gICAgICAgIGJ1YmJsZXM6IHNob3VsZEJ1YmJsZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZ0VHlwZSwgc2hvdWxkQnViYmxlLCBmYWxzZSwgZXZ0RGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5yb290Xy5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDQ29tcG9uZW50O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogQHRlbXBsYXRlIEFcbiAqL1xuY2xhc3MgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW17Y3NzQ2xhc3Nlc30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgZXZlcnlcbiAgICAvLyBDU1MgY2xhc3MgdGhlIGZvdW5kYXRpb24gY2xhc3MgbmVlZHMgYXMgYSBwcm9wZXJ0eS4gZS5nLiB7QUNUSVZFOiAnbWRjLWNvbXBvbmVudC0tYWN0aXZlJ31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIHNlbWFudGljIHN0cmluZ3MgYXMgY29uc3RhbnRzLiBlLmcuIHtBUklBX1JPTEU6ICd0YWJsaXN0J31cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVte251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIHNob3VsZCBpbXBsZW1lbnQgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGFuIG9iamVjdCB3aGljaCBleHBvcnRzIGFsbFxuICAgIC8vIG9mIGl0cyBzZW1hbnRpYyBudW1iZXJzIGFzIGNvbnN0YW50cy4gZS5nLiB7QU5JTUFUSU9OX0RFTEFZX01TOiAzNTB9XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFPYmplY3R9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBtYXkgY2hvb3NlIHRvIGltcGxlbWVudCB0aGlzIGdldHRlciBpbiBvcmRlciB0byBwcm92aWRlIGEgY29udmVuaWVudFxuICAgIC8vIHdheSBvZiB2aWV3aW5nIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBvZiBhbiBhZGFwdGVyLiBJbiB0aGUgZnV0dXJlLCB0aGlzIGNvdWxkIGFsc28gYmUgdXNlZCBmb3IgYWRhcHRlclxuICAgIC8vIHZhbGlkYXRpb24uXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QT19IGFkYXB0ZXJcbiAgICovXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIgPSB7fSkge1xuICAgIC8qKiBAcHJvdGVjdGVkIHshQX0gKi9cbiAgICB0aGlzLmFkYXB0ZXJfID0gYWRhcHRlcjtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcGVyZm9ybSBpbml0aWFsaXphdGlvbiByb3V0aW5lcyAocmVnaXN0ZXJpbmcgZXZlbnRzLCBldGMuKVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGRlLWluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChkZS1yZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFsyLCB7XCJhcmdzXCI6IFwibm9uZVwifV0gKi9cblxuLyoqXG4gKiBBZGFwdGVyIGZvciBNREMgUmlwcGxlLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIENTUyB2YXJpYWJsZXNcbiAqIC0gcG9zaXRpb25cbiAqIC0gZGltZW5zaW9uc1xuICogLSBzY3JvbGwgcG9zaXRpb25cbiAqIC0gZXZlbnQgaGFuZGxlcnNcbiAqIC0gdW5ib3VuZGVkLCBhY3RpdmUgYW5kIGRpc2FibGVkIHN0YXRlc1xuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDUmlwcGxlQWRhcHRlciB7XG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBicm93c2VyU3VwcG9ydHNDc3NWYXJzKCkge31cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNVbmJvdW5kZWQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VBY3RpdmUoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1N1cmZhY2VEaXNhYmxlZCgpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHshRXZlbnRUYXJnZXR9IHRhcmdldCAqL1xuICBjb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKGV2dFR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhck5hbWVcbiAgICogQHBhcmFtIHs/bnVtYmVyfHN0cmluZ30gdmFsdWVcbiAgICovXG4gIHVwZGF0ZUNzc1ZhcmlhYmxlKHZhck5hbWUsIHZhbHVlKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHshQ2xpZW50UmVjdH0gKi9cbiAgY29tcHV0ZUJvdW5kaW5nUmVjdCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19ICovXG4gIGdldFdpbmRvd1BhZ2VPZmZzZXQoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENSaXBwbGVBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIC8vIFJpcHBsZSBpcyBhIHNwZWNpYWwgY2FzZSB3aGVyZSB0aGUgXCJyb290XCIgY29tcG9uZW50IGlzIHJlYWxseSBhIFwibWl4aW5cIiBvZiBzb3J0cyxcbiAgLy8gZ2l2ZW4gdGhhdCBpdCdzIGFuICd1cGdyYWRlJyB0byBhbiBleGlzdGluZyBjb21wb25lbnQuIFRoYXQgYmVpbmcgc2FpZCBpdCBpcyB0aGUgcm9vdFxuICAvLyBDU1MgY2xhc3MgdGhhdCBhbGwgb3RoZXIgQ1NTIGNsYXNzZXMgZGVyaXZlIGZyb20uXG4gIFJPT1Q6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkJyxcbiAgVU5CT1VOREVEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tdW5ib3VuZGVkJyxcbiAgQkdfRk9DVVNFRDogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWJhY2tncm91bmQtZm9jdXNlZCcsXG4gIEZHX0FDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWFjdGl2YXRpb24nLFxuICBGR19ERUFDVElWQVRJT046ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS1mb3JlZ3JvdW5kLWRlYWN0aXZhdGlvbicsXG59O1xuXG5jb25zdCBzdHJpbmdzID0ge1xuICBWQVJfTEVGVDogJy0tbWRjLXJpcHBsZS1sZWZ0JyxcbiAgVkFSX1RPUDogJy0tbWRjLXJpcHBsZS10b3AnLFxuICBWQVJfRkdfU0laRTogJy0tbWRjLXJpcHBsZS1mZy1zaXplJyxcbiAgVkFSX0ZHX1NDQUxFOiAnLS1tZGMtcmlwcGxlLWZnLXNjYWxlJyxcbiAgVkFSX0ZHX1RSQU5TTEFURV9TVEFSVDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtc3RhcnQnLFxuICBWQVJfRkdfVFJBTlNMQVRFX0VORDogJy0tbWRjLXJpcHBsZS1mZy10cmFuc2xhdGUtZW5kJyxcbn07XG5cbmNvbnN0IG51bWJlcnMgPSB7XG4gIFBBRERJTkc6IDEwLFxuICBJTklUSUFMX09SSUdJTl9TQ0FMRTogMC42LFxuICBERUFDVElWQVRJT05fVElNRU9VVF9NUzogMjI1LCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS10cmFuc2xhdGUtZHVyYXRpb24gKGkuZS4gYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIEZHX0RFQUNUSVZBVElPTl9NUzogMTUwLCAvLyBDb3JyZXNwb25kcyB0byAkbWRjLXJpcHBsZS1mYWRlLW91dC1kdXJhdGlvbiAoaS5lLiBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIGR1cmF0aW9uKVxuICBUQVBfREVMQVlfTVM6IDMwMCwgLy8gRGVsYXkgYmV0d2VlbiB0b3VjaCBhbmQgc2ltdWxhdGVkIG1vdXNlIGV2ZW50cyBvbiB0b3VjaCBkZXZpY2VzXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3MsIG51bWJlcnN9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHtnZXROb3JtYWxpemVkRXZlbnRDb29yZHN9IGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgaXNBY3RpdmF0ZWQ6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGhhc0RlYWN0aXZhdGlvblVYUnVuOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiAoYm9vbGVhbnx1bmRlZmluZWQpLFxuICogICBhY3RpdmF0aW9uRXZlbnQ6ICghRXZlbnR8dW5kZWZpbmVkKSxcbiAqICAgaXNQcm9ncmFtbWF0aWM6IChib29sZWFufHVuZGVmaW5lZClcbiAqIH19XG4gKi9cbmxldCBBY3RpdmF0aW9uU3RhdGVUeXBlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHt7XG4gKiAgIGFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGRlYWN0aXZhdGU6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgZm9jdXM6IChzdHJpbmd8dW5kZWZpbmVkKSxcbiAqICAgYmx1cjogKHN0cmluZ3x1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJJbmZvVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50KSxcbiAqICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oIUV2ZW50PSksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQ9KX0gKi9cbiAgICB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyA9ICgpID0+IHRoaXMuZGVhY3RpdmF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oIUV2ZW50PSl9ICovXG4gICAgdGhpcy5mb2N1c0hhbmRsZXJfID0gKCkgPT4gdGhpcy5oYW5kbGVGb2N1cygpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQ9KX0gKi9cbiAgICB0aGlzLmJsdXJIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlQmx1cigpO1xuXG4gICAgLyoqIEBwcml2YXRlIHshRnVuY3Rpb259ICovXG4gICAgdGhpcy5yZXNpemVIYW5kbGVyXyA9ICgpID0+IHRoaXMubGF5b3V0KCk7XG5cbiAgICAvKiogQHByaXZhdGUge3tsZWZ0OiBudW1iZXIsIHRvcDpudW1iZXJ9fSAqL1xuICAgIHRoaXMudW5ib3VuZGVkQ29vcmRzXyA9IHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdTY2FsZV8gPSAwO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyQ2FsbGJhY2tfID0gKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gdHJ1ZTtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUV2ZW50fHVuZGVmaW5lZH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XztcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBjb21wdXRlIHRoaXMgcHJvcGVydHkgc28gdGhhdCB3ZSBhcmUgbm90IHF1ZXJ5aW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbGllbnRcbiAgICogdW50aWwgdGhlIHBvaW50IGluIHRpbWUgd2hlcmUgdGhlIGZvdW5kYXRpb24gcmVxdWVzdHMgaXQuIFRoaXMgcHJldmVudHMgc2NlbmFyaW9zIHdoZXJlXG4gICAqIGNsaWVudC1zaWRlIGZlYXR1cmUtZGV0ZWN0aW9uIG1heSBoYXBwZW4gdG9vIGVhcmx5LCBzdWNoIGFzIHdoZW4gY29tcG9uZW50cyBhcmUgcmVuZGVyZWQgb24gdGhlIHNlcnZlclxuICAgKiBhbmQgdGhlbiBpbml0aWFsaXplZCBhdCBtb3VudCB0aW1lIG9uIHRoZSBjbGllbnQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdXBwb3J0c1ByZXNzUmlwcGxlXygpIHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyXy5icm93c2VyU3VwcG9ydHNDc3NWYXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9XG4gICAqL1xuICBkZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNBY3RpdmF0ZWQ6IGZhbHNlLFxuICAgICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IGZhbHNlLFxuICAgICAgd2FzQWN0aXZhdGVkQnlQb2ludGVyOiBmYWxzZSxcbiAgICAgIHdhc0VsZW1lbnRNYWRlQWN0aXZlOiBmYWxzZSxcbiAgICAgIGFjdGl2YXRpb25FdmVudDogdW5kZWZpbmVkLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgY29uc3Qgc3VwcG9ydHNQcmVzc1JpcHBsZSA9IHRoaXMuc3VwcG9ydHNQcmVzc1JpcHBsZV8oKTtcblxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKHN1cHBvcnRzUHJlc3NSaXBwbGUpO1xuXG4gICAgaWYgKHN1cHBvcnRzUHJlc3NSaXBwbGUpIHtcbiAgICAgIGNvbnN0IHtST09ULCBVTkJPVU5ERUR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgICAgdGhpcy5sYXlvdXRJbnRlcm5hbF8oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBvdmVycmlkZSAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1cHBvcnRzUHJlc3NSaXBwbGVfKCkpIHtcbiAgICAgIGlmICh0aGlzLmFjdGl2YXRpb25UaW1lcl8pIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzLkZHX0FDVElWQVRJT04pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmdEZWFjdGl2YXRpb25SZW1vdmFsVGltZXJfKTtcbiAgICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSAwO1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5GR19ERUFDVElWQVRJT04pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoUk9PVCk7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgICAgdGhpcy5yZW1vdmVDc3NWYXJzXygpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5kZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpO1xuICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc3VwcG9ydHNQcmVzc1JpcHBsZSBQYXNzZWQgZnJvbSBpbml0IHRvIHNhdmUgYSByZWR1bmRhbnQgZnVuY3Rpb24gY2FsbFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJSb290SGFuZGxlcnNfKHN1cHBvcnRzUHJlc3NSaXBwbGUpIHtcbiAgICBpZiAoc3VwcG9ydHNQcmVzc1JpcHBsZSkge1xuICAgICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdmb2N1cycsIHRoaXMuZm9jdXNIYW5kbGVyXyk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSkge1xuICAgIGlmIChlLnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFBPSU5URVJfREVBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyUm9vdEhhbmRsZXJzXygpIHtcbiAgICBBQ1RJVkFUSU9OX0VWRU5UX1RZUEVTLmZvckVhY2goKHR5cGUpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignYmx1cicsIHRoaXMuYmx1ckhhbmRsZXJfKTtcblxuICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXIodGhpcy5yZXNpemVIYW5kbGVyXyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGRlcmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oKSB7XG4gICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdrZXl1cCcsIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcmVtb3ZlQ3NzVmFyc18oKSB7XG4gICAgY29uc3Qge3N0cmluZ3N9ID0gTURDUmlwcGxlRm91bmRhdGlvbjtcbiAgICBPYmplY3Qua2V5cyhzdHJpbmdzKS5mb3JFYWNoKChrKSA9PiB7XG4gICAgICBpZiAoay5pbmRleE9mKCdWQVJfJykgPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShzdHJpbmdzW2tdLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFFdmVudD19IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICE9PSB1bmRlZmluZWQgJiYgcHJldmlvdXNBY3RpdmF0aW9uRXZlbnQudHlwZSAhPT0gZS50eXBlO1xuICAgIGlmIChpc1NhbWVJbnRlcmFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCA9IHRydWU7XG4gICAgYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljID0gZSA9PT0gdW5kZWZpbmVkO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5hY3RpdmF0aW9uRXZlbnQgPSBlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS53YXNBY3RpdmF0ZWRCeVBvaW50ZXIgPSBhY3RpdmF0aW9uU3RhdGUuaXNQcm9ncmFtbWF0aWMgPyBmYWxzZSA6IGUgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICBlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJ1xuICAgICk7XG5cbiAgICBjb25zdCBoYXNBY3RpdmF0ZWRDaGlsZCA9IGUgIT09IHVuZGVmaW5lZCAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKFxuICAgICAgKHRhcmdldCkgPT4gdGhpcy5hZGFwdGVyXy5jb250YWluc0V2ZW50VGFyZ2V0KHRhcmdldCkpO1xuICAgIGlmIChoYXNBY3RpdmF0ZWRDaGlsZCkge1xuICAgICAgLy8gSW1tZWRpYXRlbHkgcmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSwgd2hpbGUgcHJlc2VydmluZyBsb2dpYyB0aGF0IHByZXZlbnRzIHRvdWNoIGZvbGxvdy1vbiBldmVudHNcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cy5wdXNoKC8qKiBAdHlwZSB7IUV2ZW50VGFyZ2V0fSAqLyAoZS50YXJnZXQpKTtcbiAgICAgIHRoaXMucmVnaXN0ZXJEZWFjdGl2YXRpb25IYW5kbGVyc18oZSk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICB0aGlzLmFuaW1hdGVBY3RpdmF0aW9uXygpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAvLyBSZXNldCBhcnJheSBvbiBuZXh0IGZyYW1lIGFmdGVyIHRoZSBjdXJyZW50IGV2ZW50IGhhcyBoYWQgYSBjaGFuY2UgdG8gYnViYmxlIHRvIHByZXZlbnQgYW5jZXN0b3IgcmlwcGxlc1xuICAgICAgYWN0aXZhdGVkVGFyZ2V0cyA9IFtdO1xuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSAmJiBlICE9PSB1bmRlZmluZWQgJiYgKGUua2V5ID09PSAnICcgfHwgZS5rZXlDb2RlID09PSAzMikpIHtcbiAgICAgICAgLy8gSWYgc3BhY2Ugd2FzIHByZXNzZWQsIHRyeSBhZ2FpbiB3aXRoaW4gYW4gckFGIGNhbGwgdG8gZGV0ZWN0IDphY3RpdmUsIGJlY2F1c2UgZGlmZmVyZW50IFVBcyByZXBvcnRcbiAgICAgICAgLy8gYWN0aXZlIHN0YXRlcyBpbmNvbnNpc3RlbnRseSB3aGVuIHRoZXkncmUgY2FsbGVkIHdpdGhpbiBldmVudCBoYW5kbGluZyBjb2RlOlxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTYzNTk3MVxuICAgICAgICAvLyAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTEyOTM3NDFcbiAgICAgICAgLy8gV2UgdHJ5IGZpcnN0IG91dHNpZGUgckFGIHRvIHN1cHBvcnQgRWRnZSwgd2hpY2ggZG9lcyBub3QgZXhoaWJpdCB0aGlzIHByb2JsZW0sIGJ1dCB3aWxsIGNyYXNoIGlmIGEgQ1NTXG4gICAgICAgIC8vIHZhcmlhYmxlIGlzIHNldCB3aXRoaW4gYSByQUYgY2FsbGJhY2sgZm9yIGEgc3VibWl0IGJ1dHRvbiBpbnRlcmFjdGlvbiAoIzIyNDEpLlxuICAgICAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgICAgICBpZiAoYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlKSB7XG4gICAgICAgICAgdGhpcy5hbmltYXRlQWN0aXZhdGlvbl8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAvLyBSZXNldCBhY3RpdmF0aW9uIHN0YXRlIGltbWVkaWF0ZWx5IGlmIGVsZW1lbnQgd2FzIG5vdCBtYWRlIGFjdGl2ZS5cbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50PX0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAhPT0gdW5kZWZpbmVkICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSA/IHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlQWN0aXZlKCkgOiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUV2ZW50PX0gZXZlbnQgT3B0aW9uYWwgZXZlbnQgY29udGFpbmluZyBwb3NpdGlvbiBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGFjdGl2YXRlKGV2ZW50KSB7XG4gICAgdGhpcy5hY3RpdmF0ZV8oZXZlbnQpO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGFuaW1hdGVBY3RpdmF0aW9uXygpIHtcbiAgICBjb25zdCB7VkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgVkFSX0ZHX1RSQU5TTEFURV9FTkR9ID0gTURDUmlwcGxlRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT04sIEZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtERUFDVElWQVRJT05fVElNRU9VVF9NU30gPSBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnM7XG5cbiAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXJ0ID0gJyc7XG4gICAgbGV0IHRyYW5zbGF0ZUVuZCA9ICcnO1xuXG4gICAgaWYgKCF0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgIGNvbnN0IHtzdGFydFBvaW50LCBlbmRQb2ludH0gPSB0aGlzLmdldEZnVHJhbnNsYXRpb25Db29yZGluYXRlc18oKTtcbiAgICAgIHRyYW5zbGF0ZVN0YXJ0ID0gYCR7c3RhcnRQb2ludC54fXB4LCAke3N0YXJ0UG9pbnQueX1weGA7XG4gICAgICB0cmFuc2xhdGVFbmQgPSBgJHtlbmRQb2ludC54fXB4LCAke2VuZFBvaW50Lnl9cHhgO1xuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9TVEFSVCwgdHJhbnNsYXRlU3RhcnQpO1xuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1RSQU5TTEFURV9FTkQsIHRyYW5zbGF0ZUVuZCk7XG4gICAgLy8gQ2FuY2VsIGFueSBvbmdvaW5nIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uIGFuaW1hdGlvbnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5hY3RpdmF0aW9uVGltZXJfKTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8pO1xuICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuXG4gICAgLy8gRm9yY2UgbGF5b3V0IGluIG9yZGVyIHRvIHJlLXRyaWdnZXIgdGhlIGFuaW1hdGlvbi5cbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0FDVElWQVRJT04pO1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hY3RpdmF0aW9uVGltZXJDYWxsYmFja18oKSwgREVBQ1RJVkFUSU9OX1RJTUVPVVRfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqIEByZXR1cm4ge3tzdGFydFBvaW50OiBQb2ludFR5cGUsIGVuZFBvaW50OiBQb2ludFR5cGV9fVxuICAgKi9cbiAgZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpIHtcbiAgICBjb25zdCB7YWN0aXZhdGlvbkV2ZW50LCB3YXNBY3RpdmF0ZWRCeVBvaW50ZXJ9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuXG4gICAgbGV0IHN0YXJ0UG9pbnQ7XG4gICAgaWYgKHdhc0FjdGl2YXRlZEJ5UG9pbnRlcikge1xuICAgICAgc3RhcnRQb2ludCA9IGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhcbiAgICAgICAgLyoqIEB0eXBlIHshRXZlbnR9ICovIChhY3RpdmF0aW9uRXZlbnQpLFxuICAgICAgICB0aGlzLmFkYXB0ZXJfLmdldFdpbmRvd1BhZ2VPZmZzZXQoKSwgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMuZnJhbWVfLndpZHRoIC8gMixcbiAgICAgICAgeTogdGhpcy5mcmFtZV8uaGVpZ2h0IC8gMixcbiAgICAgIH07XG4gICAgfVxuICAgIC8vIENlbnRlciB0aGUgZWxlbWVudCBhcm91bmQgdGhlIHN0YXJ0IHBvaW50LlxuICAgIHN0YXJ0UG9pbnQgPSB7XG4gICAgICB4OiBzdGFydFBvaW50LnggLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6IHN0YXJ0UG9pbnQueSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICBjb25zdCBlbmRQb2ludCA9IHtcbiAgICAgIHg6ICh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgICB5OiAodGhpcy5mcmFtZV8uaGVpZ2h0IC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtzdGFydFBvaW50LCBlbmRQb2ludH07XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgcnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCkge1xuICAgIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBib3RoIHdoZW4gYSBwb2ludGluZyBkZXZpY2UgaXMgcmVsZWFzZWQsIGFuZCB3aGVuIHRoZSBhY3RpdmF0aW9uIGFuaW1hdGlvbiBlbmRzLlxuICAgIC8vIFRoZSBkZWFjdGl2YXRpb24gYW5pbWF0aW9uIHNob3VsZCBvbmx5IHJ1biBhZnRlciBib3RoIG9mIHRob3NlIG9jY3VyLlxuICAgIGNvbnN0IHtGR19ERUFDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIGNvbnN0IHtoYXNEZWFjdGl2YXRpb25VWFJ1biwgaXNBY3RpdmF0ZWR9ID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIGNvbnN0IGFjdGl2YXRpb25IYXNFbmRlZCA9IGhhc0RlYWN0aXZhdGlvblVYUnVuIHx8ICFpc0FjdGl2YXRlZDtcblxuICAgIGlmIChhY3RpdmF0aW9uSGFzRW5kZWQgJiYgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfKSB7XG4gICAgICB0aGlzLnJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpO1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgdGhpcy5mZ0RlYWN0aXZhdGlvblJlbW92YWxUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19ERUFDVElWQVRJT04pO1xuICAgICAgfSwgbnVtYmVycy5GR19ERUFDVElWQVRJT05fTVMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKSB7XG4gICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG4gICAgdGhpcy5hZGFwdGVyXy5jb21wdXRlQm91bmRpbmdSZWN0KCk7XG4gIH1cblxuICByZXNldEFjdGl2YXRpb25TdGF0ZV8oKSB7XG4gICAgdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uYWN0aXZhdGlvbkV2ZW50O1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAvLyBUb3VjaCBkZXZpY2VzIG1heSBmaXJlIGFkZGl0aW9uYWwgZXZlbnRzIGZvciB0aGUgc2FtZSBpbnRlcmFjdGlvbiB3aXRoaW4gYSBzaG9ydCB0aW1lLlxuICAgIC8vIFN0b3JlIHRoZSBwcmV2aW91cyBldmVudCB1bnRpbCBpdCdzIHNhZmUgdG8gYXNzdW1lIHRoYXQgc3Vic2VxdWVudCBldmVudHMgYXJlIGZvciBuZXcgaW50ZXJhY3Rpb25zLlxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF8gPSB1bmRlZmluZWQsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXygpIHtcbiAgICBjb25zdCBhY3RpdmF0aW9uU3RhdGUgPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIGluIHNjZW5hcmlvcyBzdWNoIGFzIHdoZW4geW91IGhhdmUgYSBrZXl1cCBldmVudCB0aGF0IGJsdXJzIHRoZSBlbGVtZW50LlxuICAgIGlmICghYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhdGUgPSAvKiogQHR5cGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqLyAoT2JqZWN0LmFzc2lnbih7fSwgYWN0aXZhdGlvblN0YXRlKSk7XG5cbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzUHJvZ3JhbW1hdGljKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhzdGF0ZSkpO1xuICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2YXRpb25TdGF0ZV8uaGFzRGVhY3RpdmF0aW9uVVhSdW4gPSB0cnVlO1xuICAgICAgICB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKHN0YXRlKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlXygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IE1hdGguZmxvb3IobWF4RGltICogTURDUmlwcGxlRm91bmRhdGlvbi5udW1iZXJzLklOSVRJQUxfT1JJR0lOX1NDQUxFKTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENSaXBwbGVGb3VuZGF0aW9uPlxuICovXG5jbGFzcyBNRENSaXBwbGUgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKiogQHBhcmFtIHsuLi4/fSBhcmdzICovXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy51bmJvdW5kZWRfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHt7aXNVbmJvdW5kZWQ6IChib29sZWFufHVuZGVmaW5lZCl9PX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlfVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QsIHtpc1VuYm91bmRlZCA9IHVuZGVmaW5lZH0gPSB7fSkge1xuICAgIGNvbnN0IHJpcHBsZSA9IG5ldyBNRENSaXBwbGUocm9vdCk7XG4gICAgLy8gT25seSBvdmVycmlkZSB1bmJvdW5kZWQgYmVoYXZpb3IgaWYgb3B0aW9uIGlzIGV4cGxpY2l0bHkgc3BlY2lmaWVkXG4gICAgaWYgKGlzVW5ib3VuZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJpcHBsZS51bmJvdW5kZWQgPSAvKiogQHR5cGUge2Jvb2xlYW59ICovIChpc1VuYm91bmRlZCk7XG4gICAgfVxuICAgIHJldHVybiByaXBwbGU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshUmlwcGxlQ2FwYWJsZVN1cmZhY2V9IGluc3RhbmNlXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFkYXB0ZXIoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBNQVRDSEVTID0gdXRpbC5nZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB1dGlsLnN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdyksXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gaW5zdGFuY2UudW5ib3VuZGVkLFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiBpbnN0YW5jZS5yb290X1tNQVRDSEVTXSgnOmFjdGl2ZScpLFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IGluc3RhbmNlLmRpc2FibGVkLFxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiBpbnN0YW5jZS5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiBpbnN0YW5jZS5yb290Xy5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBpbnN0YW5jZS5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4gaW5zdGFuY2Uucm9vdF8uc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFsdWUpLFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gaW5zdGFuY2Uucm9vdF8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAoe3g6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0fSksXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgdW5ib3VuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0IHVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICB0aGlzLnVuYm91bmRlZF8gPSBCb29sZWFuKHVuYm91bmRlZCk7XG4gICAgdGhpcy5zZXRVbmJvdW5kZWRfKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc3VyZSBDb21waWxlciB0aHJvd3MgYW4gYWNjZXNzIGNvbnRyb2wgZXJyb3Igd2hlbiBkaXJlY3RseSBhY2Nlc3NpbmcgYVxuICAgKiBwcm90ZWN0ZWQgb3IgcHJpdmF0ZSBwcm9wZXJ0eSBpbnNpZGUgYSBnZXR0ZXIvc2V0dGVyLCBsaWtlIHVuYm91bmRlZCBhYm92ZS5cbiAgICogQnkgYWNjZXNzaW5nIHRoZSBwcm90ZWN0ZWQgcHJvcGVydHkgaW5zaWRlIGEgbWV0aG9kLCB3ZSBzb2x2ZSB0aGF0IHByb2JsZW0uXG4gICAqIFRoYXQncyB3aHkgdGhpcyBmdW5jdGlvbiBleGlzdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRVbmJvdW5kZWRfKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0VW5ib3VuZGVkKHRoaXMudW5ib3VuZGVkXyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmFjdGl2YXRlKCk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8ubGF5b3V0KCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZUZvdW5kYXRpb259XG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENSaXBwbGVGb3VuZGF0aW9uKE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyKHRoaXMpKTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIHRoaXMudW5ib3VuZGVkID0gJ21kY1JpcHBsZUlzVW5ib3VuZGVkJyBpbiB0aGlzLnJvb3RfLmRhdGFzZXQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgTWF0ZXJpYWwgRGVzaWduIHNwZWMgZm9yIG1vcmUgZGV0YWlscyBvbiB3aGVuIHRvIHVzZSByaXBwbGVzLlxuICogaHR0cHM6Ly9tYXRlcmlhbC5pby9ndWlkZWxpbmVzL21vdGlvbi9jaG9yZW9ncmFwaHkuaHRtbCNjaG9yZW9ncmFwaHktY3JlYXRpb25cbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgUmlwcGxlQ2FwYWJsZVN1cmZhY2Uge31cblxuLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLnJvb3RfO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgYmxlZWRzIG91dCBvZiB0aGUgYm91bmRzIG9mIHRoZSBlbGVtZW50LlxuICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUudW5ib3VuZGVkO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgaXMgYXR0YWNoZWQgdG8gYSBkaXNhYmxlZCBjb21wb25lbnQuXG4gKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS5kaXNhYmxlZDtcblxuZXhwb3J0IHtNRENSaXBwbGUsIE1EQ1JpcHBsZUZvdW5kYXRpb24sIFJpcHBsZUNhcGFibGVTdXJmYWNlLCB1dGlsfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufCFFdmVudExpc3RlbmVyT3B0aW9uc31cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGlzU3VwcG9ydGVkO1xuICAgICAgfX0pO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgc3VwcG9ydHNQYXNzaXZlXyA9IGlzU3VwcG9ydGVkO1xuICB9XG5cbiAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZV9cbiAgICA/IC8qKiBAdHlwZSB7IUV2ZW50TGlzdGVuZXJPcHRpb25zfSAqLyAoe3Bhc3NpdmU6IHRydWV9KVxuICAgIDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnRQcm90b3R5cGUpIHtcbiAgLyoqXG4gICAqIE9yZGVyIGlzIGltcG9ydGFudCBiZWNhdXNlIHdlIHJldHVybiB0aGUgZmlyc3QgZXhpc3RpbmcgbWV0aG9kIHdlIGZpbmQuXG4gICAqIERvIG5vdCBjaGFuZ2UgdGhlIG9yZGVyIG9mIHRoZSBpdGVtcyBpbiB0aGUgYmVsb3cgYXJyYXkuXG4gICAqL1xuICBjb25zdCBtYXRjaGVzTWV0aG9kcyA9IFsnbWF0Y2hlcycsICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InXTtcbiAgbGV0IG1ldGhvZCA9ICdtYXRjaGVzJztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXRjaGVzTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1hdGNoZXNNZXRob2QgPSBtYXRjaGVzTWV0aG9kc1tpXTtcbiAgICBpZiAobWF0Y2hlc01ldGhvZCBpbiBIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICAgICAgbWV0aG9kID0gbWF0Y2hlc01ldGhvZDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtZXRob2Q7XG59XG5cbi8qKlxuICogQHBhcmFtIHshRXZlbnR9IGV2XG4gKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IHBhZ2VPZmZzZXRcbiAqIEBwYXJhbSB7IUNsaWVudFJlY3R9IGNsaWVudFJlY3RcbiAqIEByZXR1cm4ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRFdmVudENvb3JkcyhldiwgcGFnZU9mZnNldCwgY2xpZW50UmVjdCkge1xuICBjb25zdCB7eCwgeX0gPSBwYWdlT2Zmc2V0O1xuICBjb25zdCBkb2N1bWVudFggPSB4ICsgY2xpZW50UmVjdC5sZWZ0O1xuICBjb25zdCBkb2N1bWVudFkgPSB5ICsgY2xpZW50UmVjdC50b3A7XG5cbiAgbGV0IG5vcm1hbGl6ZWRYO1xuICBsZXQgbm9ybWFsaXplZFk7XG4gIC8vIERldGVybWluZSB0b3VjaCBwb2ludCByZWxhdGl2ZSB0byB0aGUgcmlwcGxlIGNvbnRhaW5lci5cbiAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIGV2ID0gLyoqIEB0eXBlIHshVG91Y2hFdmVudH0gKi8gKGV2KTtcbiAgICBub3JtYWxpemVkWCA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gZG9jdW1lbnRYO1xuICAgIG5vcm1hbGl6ZWRZID0gZXYuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSBkb2N1bWVudFk7XG4gIH0gZWxzZSB7XG4gICAgZXYgPSAvKiogQHR5cGUgeyFNb3VzZUV2ZW50fSAqLyAoZXYpO1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDUmlwcGxlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2luZGV4Jztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBjaGVja2VkOiBib29sZWFuLFxuICogICBpbmRldGVybWluYXRlOiBib29sZWFuLFxuICogICBkaXNhYmxlZDogYm9vbGVhbixcbiAqICAgdmFsdWU6ID9zdHJpbmdcbiAqIH19XG4gKi9cbmxldCBNRENTZWxlY3Rpb25Db250cm9sU3RhdGU7XG5cbi8qKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENTZWxlY3Rpb25Db250cm9sIHtcbiAgLyoqIEByZXR1cm4gez9NRENSaXBwbGV9ICovXG4gIGdldCByaXBwbGUoKSB7fVxufVxuXG5leHBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZSwgTURDU2VsZWN0aW9uQ29udHJvbH07XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgSW5jLlxuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiBUSEUgU09GVFdBUkUuXG4gKi9cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIFN3aXRjaC4gUHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBtYW5hZ2luZ1xuICogLSBjbGFzc2VzXG4gKiAtIGRvbVxuICpcbiAqIEFkZGl0aW9uYWxseSwgcHJvdmlkZXMgdHlwZSBpbmZvcm1hdGlvbiBmb3IgdGhlIGFkYXB0ZXIgdG8gdGhlIENsb3N1cmVcbiAqIGNvbXBpbGVyLlxuICpcbiAqIEltcGxlbWVudCB0aGlzIGFkYXB0ZXIgZm9yIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZSB0byBkZWxlZ2F0ZSB1cGRhdGVzIHRvXG4gKiB0aGUgY29tcG9uZW50IGluIHlvdXIgZnJhbWV3b3JrIG9mIGNob2ljZS4gU2VlIGFyY2hpdGVjdHVyZSBkb2N1bWVudGF0aW9uXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hdGVyaWFsLWNvbXBvbmVudHMvbWF0ZXJpYWwtY29tcG9uZW50cy13ZWIvYmxvYi9tYXN0ZXIvZG9jcy9jb2RlL2FyY2hpdGVjdHVyZS5tZFxuICpcbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgTURDU3dpdGNoQWRhcHRlciB7XG4gIC8qKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lICovXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCAqL1xuICBzZXROYXRpdmVDb250cm9sQ2hlY2tlZChjaGVja2VkKSB7fVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldE5hdGl2ZUNvbnRyb2xEaXNhYmxlZChkaXNhYmxlZCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDU3dpdGNoQWRhcHRlcjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBJbmMuXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIENIRUNLRUQ6ICdtZGMtc3dpdGNoLS1jaGVja2VkJyxcbiAgRElTQUJMRUQ6ICdtZGMtc3dpdGNoLS1kaXNhYmxlZCcsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIE5BVElWRV9DT05UUk9MX1NFTEVDVE9SOiAnLm1kYy1zd2l0Y2hfX25hdGl2ZS1jb250cm9sJyxcbiAgUklQUExFX1NVUkZBQ0VfU0VMRUNUT1I6ICcubWRjLXN3aXRjaF9fdGh1bWItdW5kZXJsYXknLFxufTtcblxuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ1N3aXRjaEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENTd2l0Y2hBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDU3dpdGNoRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmd9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ30gKi9cbiAgc3RhdGljIGdldCBjc3NDbGFzc2VzKCkge1xuICAgIHJldHVybiBjc3NDbGFzc2VzO1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFNRENTd2l0Y2hBZGFwdGVyfSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENTd2l0Y2hBZGFwdGVyfSAqLyAoe1xuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHNldE5hdGl2ZUNvbnRyb2xDaGVja2VkOiAoLyogY2hlY2tlZDogYm9vbGVhbiAqLykgPT4ge30sXG4gICAgICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQ6ICgvKiBkaXNhYmxlZDogYm9vbGVhbiAqLykgPT4ge30sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENTd2l0Y2hGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBjaGVja2VkICovXG4gIHNldENoZWNrZWQoY2hlY2tlZCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TmF0aXZlQ29udHJvbENoZWNrZWQoY2hlY2tlZCk7XG4gICAgdGhpcy51cGRhdGVDaGVja2VkU3R5bGluZ18oY2hlY2tlZCk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAqL1xuICBzZXREaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuYWRhcHRlcl8uc2V0TmF0aXZlQ29udHJvbERpc2FibGVkKGRpc2FibGVkKTtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5ESVNBQkxFRCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3Nlcy5ESVNBQkxFRCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGNoYW5nZSBldmVudCBmb3IgdGhlIHN3aXRjaCBuYXRpdmUgY29udHJvbC5cbiAgICogQHBhcmFtIHshRXZlbnR9IGV2dFxuICAgKi9cbiAgaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgIHRoaXMudXBkYXRlQ2hlY2tlZFN0eWxpbmdfKGV2dC50YXJnZXQuY2hlY2tlZCk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgc3R5bGluZyBvZiB0aGUgc3dpdGNoIGJhc2VkIG9uIGl0cyBjaGVja2VkIHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrZWRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHVwZGF0ZUNoZWNrZWRTdHlsaW5nXyhjaGVja2VkKSB7XG4gICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5DSEVDS0VEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhjc3NDbGFzc2VzLkNIRUNLRUQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENTd2l0Y2hGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCBNRENDb21wb25lbnQgZnJvbSAnQG1hdGVyaWFsL2Jhc2UvY29tcG9uZW50Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZSwgTURDU2VsZWN0aW9uQ29udHJvbH0gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdGlvbi1jb250cm9sL2luZGV4Jztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCBNRENTd2l0Y2hGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQge01EQ1JpcHBsZSwgTURDUmlwcGxlRm91bmRhdGlvbn0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS9pbmRleCc7XG5pbXBvcnQge2dldE1hdGNoZXNQcm9wZXJ0eX0gZnJvbSAnQG1hdGVyaWFsL3JpcHBsZS91dGlsJztcblxuLyoqXG4gKiBAZXh0ZW5kcyBNRENDb21wb25lbnQ8IU1EQ1N3aXRjaEZvdW5kYXRpb24+XG4gKiBAaW1wbGVtZW50cyB7TURDU2VsZWN0aW9uQ29udHJvbH1cbiAqL1xuY2xhc3MgTURDU3dpdGNoIGV4dGVuZHMgTURDQ29tcG9uZW50IHtcbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QpIHtcbiAgICByZXR1cm4gbmV3IE1EQ1N3aXRjaChyb290KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IU1EQ1JpcHBsZX0gKi9cbiAgICB0aGlzLnJpcHBsZV8gPSB0aGlzLmluaXRSaXBwbGVfKCk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmNoYW5nZUhhbmRsZXJfO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5yaXBwbGVfLmRlc3Ryb3koKTtcbiAgICB0aGlzLm5hdGl2ZUNvbnRyb2xfLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuY2hhbmdlSGFuZGxlcl8pO1xuICB9XG5cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIHRoaXMuY2hhbmdlSGFuZGxlcl8gPSB0aGlzLmZvdW5kYXRpb25fLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMuZm91bmRhdGlvbl8pO1xuICAgIHRoaXMubmF0aXZlQ29udHJvbF8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5jaGFuZ2VIYW5kbGVyXyk7XG5cbiAgICAvLyBTb21ldGltZXMgdGhlIGNoZWNrZWQgc3RhdGUgb2YgdGhlIGlucHV0IGVsZW1lbnQgaXMgc2F2ZWQgaW4gdGhlIGhpc3RvcnkuXG4gICAgLy8gVGhlIHN3aXRjaCBzdHlsaW5nIHNob3VsZCBtYXRjaCB0aGUgY2hlY2tlZCBzdGF0ZSBvZiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICAvLyBEbyBhbiBpbml0aWFsIHN5bmMgYmV0d2VlbiB0aGUgbmF0aXZlIGNvbnRyb2wgYW5kIHRoZSBmb3VuZGF0aW9uLlxuICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMuY2hlY2tlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzdGF0ZSBvZiB0aGUgbmF0aXZlIGNvbnRyb2wgZWxlbWVudCwgb3IgbnVsbCBpZiB0aGUgbmF0aXZlIGNvbnRyb2wgZWxlbWVudCBpcyBub3QgcHJlc2VudC5cbiAgICogQHJldHVybiB7P01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldCBuYXRpdmVDb250cm9sXygpIHtcbiAgICBjb25zdCB7TkFUSVZFX0NPTlRST0xfU0VMRUNUT1J9ID0gTURDU3dpdGNoRm91bmRhdGlvbi5zdHJpbmdzO1xuICAgIGNvbnN0IGVsID0gLyoqIEB0eXBlIHs/TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfSAqLyAoXG4gICAgICB0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoTkFUSVZFX0NPTlRST0xfU0VMRUNUT1IpKTtcbiAgICByZXR1cm4gZWw7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGluaXRSaXBwbGVfKCkge1xuICAgIGNvbnN0IHtSSVBQTEVfU1VSRkFDRV9TRUxFQ1RPUn0gPSBNRENTd2l0Y2hGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3QgcmlwcGxlU3VyZmFjZSA9IC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovICh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoUklQUExFX1NVUkZBQ0VfU0VMRUNUT1IpKTtcblxuICAgIGNvbnN0IE1BVENIRVMgPSBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcbiAgICBjb25zdCBhZGFwdGVyID0gT2JqZWN0LmFzc2lnbihNRENSaXBwbGUuY3JlYXRlQWRhcHRlcih0aGlzKSwge1xuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHRoaXMubmF0aXZlQ29udHJvbF9bTUFUQ0hFU10oJzphY3RpdmUnKSxcbiAgICAgIGFkZENsYXNzOiAoY2xhc3NOYW1lKSA9PiByaXBwbGVTdXJmYWNlLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiByaXBwbGVTdXJmYWNlLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKSxcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4gdGhpcy5uYXRpdmVDb250cm9sXy5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHRoaXMubmF0aXZlQ29udHJvbF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAodmFyTmFtZSwgdmFsdWUpID0+IHJpcHBsZVN1cmZhY2Uuc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFsdWUpLFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gcmlwcGxlU3VyZmFjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICB9KTtcbiAgICBjb25zdCBmb3VuZGF0aW9uID0gbmV3IE1EQ1JpcHBsZUZvdW5kYXRpb24oYWRhcHRlcik7XG4gICAgcmV0dXJuIG5ldyBNRENSaXBwbGUodGhpcy5yb290XywgZm91bmRhdGlvbik7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ1N3aXRjaEZvdW5kYXRpb259ICovXG4gIGdldERlZmF1bHRGb3VuZGF0aW9uKCkge1xuICAgIHJldHVybiBuZXcgTURDU3dpdGNoRm91bmRhdGlvbih7XG4gICAgICBhZGRDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5yb290Xy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSksXG4gICAgICByZW1vdmVDbGFzczogKGNsYXNzTmFtZSkgPT4gdGhpcy5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBzZXROYXRpdmVDb250cm9sQ2hlY2tlZDogKGNoZWNrZWQpID0+IHRoaXMubmF0aXZlQ29udHJvbF8uY2hlY2tlZCA9IGNoZWNrZWQsXG4gICAgICBzZXROYXRpdmVDb250cm9sRGlzYWJsZWQ6IChkaXNhYmxlZCkgPT4gdGhpcy5uYXRpdmVDb250cm9sXy5kaXNhYmxlZCA9IGRpc2FibGVkLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEByZXR1cm4geyFNRENSaXBwbGV9ICovXG4gIGdldCByaXBwbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlwcGxlXztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgY2hlY2tlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVDb250cm9sXy5jaGVja2VkO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCAqL1xuICBzZXQgY2hlY2tlZChjaGVja2VkKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRDaGVja2VkKGNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5uYXRpdmVDb250cm9sXy5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0RGlzYWJsZWQoZGlzYWJsZWQpO1xuICB9XG59XG5cbmV4cG9ydCB7TURDU3dpdGNoRm91bmRhdGlvbiwgTURDU3dpdGNofTtcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmhlYWRlcl9fbWVudS1vcGVuJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICQoJy5oZWFkZXJfX21lbnUtY2xvc2UnKS5hZGRDbGFzcygnZC1mbGV4Jyk7XHJcbiAgICAgICAgJCgnLmhlYWRlcicpLmFkZENsYXNzKCdoZWFkZXItLW9wZW4nKTtcclxuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ25vc2Nyb2xsLXknKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaGVhZGVyX19tZW51LWNsb3NlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIuaGVhZGVyX19tZW51LW9wZW5cIikucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xyXG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2QtZmxleCcpO1xyXG4gICAgICAgICQoJy5oZWFkZXInKS5yZW1vdmVDbGFzcygnaGVhZGVyLS1vcGVuJyk7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdub3Njcm9sbC15Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiLmNvbGxhcHNlXCIpLm9uKCdzaG93LmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykucHJldigpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pO1xyXG4gICAgJChcIi5jb2xsYXBzZVwiKS5vbignaGlkZS5icy5jb2xsYXBzZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLnByZXYoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuZGF0ZScpLmRhdGV0aW1lcGlja2VyKHtcclxuICAgICAgICBmb3JtYXQ6ICdERC5NTS5ZWScsXHJcbiAgICAgICAgZGVmYXVsdERhdGU6IG1vbWVudCgpLFxyXG4gICAgICAgIGljb25zOiB7XHJcbiAgICAgICAgICAgIHByZXZpb3VzOiAnZmEgZmEtY2hldnJvbi1sZWZ0JyxcclxuICAgICAgICAgICAgbmV4dDogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnXHJcbiAgICAgICAgfVxyXG4gICAgfSkub24oJ2RwLmNoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWwoKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5maW5kKCdsYWJlbCcpLmFkZENsYXNzKCdjb2xvci1kYXJrLWdyZWVuJyk7XHJcbiAgICAgICAgfSBlbHNlICQodGhpcykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5maW5kKCdsYWJlbCcpLnJlbW92ZUNsYXNzKCdjb2xvci1kYXJrLWdyZWVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuZm9ybS1ncm91cCBpbnB1dCwgdGV4dGFyZWEnKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsKCkgIT0gMCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuZmluZCgnbGFiZWwnKS5hZGRDbGFzcygnY29sb3ItZGFyay1ncmVlbicpO1xyXG4gICAgICAgIH0gZWxzZSAkKHRoaXMpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuZmluZCgnbGFiZWwnKS5yZW1vdmVDbGFzcygnY29sb3ItZGFyay1ncmVlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnc2VsZWN0LnNlbGVjdHBpY2tlcicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzZWxlY3RlZCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5maW5kKCdsYWJlbCcpLmFkZENsYXNzKCdjb2xvci1kYXJrLWdyZWVuJyk7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5maW5kKCdsYWJlbCcpLnJlbW92ZUNsYXNzKCdjb2xvci1kYXJrLWdyZWVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiaW5wdXRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmZpbmQoJ3AnKS5hZGRDbGFzcygnY29sb3ItZGFyay1ncmVlbicpO1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5maW5kKCdsYWJlbC5tYi0xMCcpLmFkZENsYXNzKCdjb2xvci1kYXJrLWdyZWVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc3RpY2t5Rm9vdGVyRnVuYztcclxuICAgIChzdGlja3lGb290ZXJGdW5jID0gZnVuY3Rpb24gc3RpY2t5Rm9vdGVyRnVuYygpIHtcclxuICAgICAgICAkKCdmb290ZXInKS5jc3MoJ3Bvc2l0aW9uJywgJ3N0YXRpYycpO1xyXG4gICAgICAgICQoJ2JvZHknKS5jc3MoJ21pbi1oZWlnaHQnLCAnMTAwcHgnKTtcclxuXHJcbiAgICAgICAgdmFyIGJvZHlIZWlnaHQgPSAkKCdib2R5Jykub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICBpZiAod2luZG93LmlubmVySGVpZ2h0ID4gYm9keUhlaWdodCkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuY3NzKCdtaW4taGVpZ2h0JywgJzEwMHZoJyk7XHJcbiAgICAgICAgICAgICQoJ2Zvb3RlcicpLmNzcyh7J3Bvc2l0aW9uJzogJ2Fic29sdXRlJywgJ2JvdHRvbSc6ICcwJ30pO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgc3RpY2t5Rm9vdGVyRnVuYygpO1xyXG5cclxuICAgIHZhciB3ID0gd2luZG93LFxyXG4gICAgICAgIGQgPSBkb2N1bWVudCxcclxuICAgICAgICBlID0gZC5kb2N1bWVudEVsZW1lbnQsXHJcbiAgICAgICAgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSxcclxuICAgICAgICB4ID0gdy5pbm5lcldpZHRoIHx8IGUuY2xpZW50V2lkdGggfHwgZy5jbGllbnRXaWR0aDtcclxuXHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHN0aWNreUZvb3RlckZ1bmMoKTtcclxuICAgICAgICB2YXIgdCA9IHcuaW5uZXJXaWR0aCB8fCBlLmNsaWVudFdpZHRoIHx8IGcuY2xpZW50V2lkdGg7XHJcbiAgICAgICAgaWYgKHQgIT09IHgpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSk7XHJcbiJdfQ==
