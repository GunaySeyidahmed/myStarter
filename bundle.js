(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @license
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /**
   * @typedef {{
   *   noPrefix: string,
   *   webkitPrefix: string,
   *   styleProperty: string
   * }}
   */
  var VendorPropertyMapType = void 0;

  /** @const {Object<string, !VendorPropertyMapType>} */
  var eventTypeMap = {
    'animationstart': {
      noPrefix: 'animationstart',
      webkitPrefix: 'webkitAnimationStart',
      styleProperty: 'animation'
    },
    'animationend': {
      noPrefix: 'animationend',
      webkitPrefix: 'webkitAnimationEnd',
      styleProperty: 'animation'
    },
    'animationiteration': {
      noPrefix: 'animationiteration',
      webkitPrefix: 'webkitAnimationIteration',
      styleProperty: 'animation'
    },
    'transitionend': {
      noPrefix: 'transitionend',
      webkitPrefix: 'webkitTransitionEnd',
      styleProperty: 'transition'
    }
  };

  /** @const {Object<string, !VendorPropertyMapType>} */
  var cssPropertyMap = {
    'animation': {
      noPrefix: 'animation',
      webkitPrefix: '-webkit-animation'
    },
    'transform': {
      noPrefix: 'transform',
      webkitPrefix: '-webkit-transform'
    },
    'transition': {
      noPrefix: 'transition',
      webkitPrefix: '-webkit-transition'
    }
  };

  /**
   * @param {!Object} windowObj
   * @return {boolean}
   */
  function hasProperShape(windowObj) {
    return windowObj['document'] !== undefined && typeof windowObj['document']['createElement'] === 'function';
  }

  /**
   * @param {string} eventType
   * @return {boolean}
   */
  function eventFoundInMaps(eventType) {
    return eventType in eventTypeMap || eventType in cssPropertyMap;
  }

  /**
   * @param {string} eventType
   * @param {!Object<string, !VendorPropertyMapType>} map
   * @param {!Element} el
   * @return {string}
   */
  function getJavaScriptEventName(eventType, map, el) {
    return map[eventType].styleProperty in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
  }

  /**
   * Helper function to determine browser prefix for CSS3 animation events
   * and property names.
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getAnimationName(windowObj, eventType) {
    if (!hasProperShape(windowObj) || !eventFoundInMaps(eventType)) {
      return eventType;
    }

    var map = /** @type {!Object<string, !VendorPropertyMapType>} */eventType in eventTypeMap ? eventTypeMap : cssPropertyMap;
    var el = windowObj['document']['createElement']('div');
    var eventName = '';

    if (map === eventTypeMap) {
      eventName = getJavaScriptEventName(eventType, map, el);
    } else {
      eventName = map[eventType].noPrefix in el.style ? map[eventType].noPrefix : map[eventType].webkitPrefix;
    }

    return eventName;
  }

  // Public functions to access getAnimationName() for JavaScript events or CSS
  // property names.

  var transformStyleProperties = ['transform', 'WebkitTransform', 'MozTransform', 'OTransform', 'MSTransform'];

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectEventName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

  /**
   * @param {!Object} windowObj
   * @param {string} eventType
   * @return {string}
   */
  function getCorrectPropertyName(windowObj, eventType) {
    return getAnimationName(windowObj, eventType);
  }

  exports.transformStyleProperties = transformStyleProperties;
  exports.getCorrectEventName = getCorrectEventName;
  exports.getCorrectPropertyName = getCorrectPropertyName;
});

},{}],2:[function(require,module,exports){
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

},{"./foundation":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '@material/selection-control/index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('@material/selection-control/index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.index);
    global.adapter = mod.exports;
  }
})(this, function (module, exports, _index) {
  'use strict';

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

  var MDCCheckboxAdapter = function () {
    function MDCCheckboxAdapter() {
      _classCallCheck(this, MDCCheckboxAdapter);
    }

    _createClass(MDCCheckboxAdapter, [{
      key: 'addClass',
      value: function addClass(className) {}
    }, {
      key: 'removeClass',
      value: function removeClass(className) {}
    }, {
      key: 'setNativeControlAttr',
      value: function setNativeControlAttr(attr, value) {}
    }, {
      key: 'removeNativeControlAttr',
      value: function removeNativeControlAttr(attr) {}
    }, {
      key: 'registerAnimationEndHandler',
      value: function registerAnimationEndHandler(handler) {}
    }, {
      key: 'deregisterAnimationEndHandler',
      value: function deregisterAnimationEndHandler(handler) {}
    }, {
      key: 'registerChangeHandler',
      value: function registerChangeHandler(handler) {}
    }, {
      key: 'deregisterChangeHandler',
      value: function deregisterChangeHandler(handler) {}
    }, {
      key: 'getNativeControl',
      value: function getNativeControl() {}
    }, {
      key: 'forceLayout',
      value: function forceLayout() {}
    }, {
      key: 'isAttachedToDOM',
      value: function isAttachedToDOM() {}
    }]);

    return MDCCheckboxAdapter;
  }();

  exports.default = MDCCheckboxAdapter;
  module.exports = exports['default'];
});

},{"@material/selection-control/index":17}],5:[function(require,module,exports){
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
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @const {string} */
  var ROOT = 'mdc-checkbox';

  /** @enum {string} */
  var cssClasses = {
    UPGRADED: 'mdc-checkbox--upgraded',
    CHECKED: 'mdc-checkbox--checked',
    INDETERMINATE: 'mdc-checkbox--indeterminate',
    DISABLED: 'mdc-checkbox--disabled',
    ANIM_UNCHECKED_CHECKED: 'mdc-checkbox--anim-unchecked-checked',
    ANIM_UNCHECKED_INDETERMINATE: 'mdc-checkbox--anim-unchecked-indeterminate',
    ANIM_CHECKED_UNCHECKED: 'mdc-checkbox--anim-checked-unchecked',
    ANIM_CHECKED_INDETERMINATE: 'mdc-checkbox--anim-checked-indeterminate',
    ANIM_INDETERMINATE_CHECKED: 'mdc-checkbox--anim-indeterminate-checked',
    ANIM_INDETERMINATE_UNCHECKED: 'mdc-checkbox--anim-indeterminate-unchecked'
  };

  /** @enum {string} */
  var strings = {
    NATIVE_CONTROL_SELECTOR: '.' + ROOT + '__native-control',
    TRANSITION_STATE_INIT: 'init',
    TRANSITION_STATE_CHECKED: 'checked',
    TRANSITION_STATE_UNCHECKED: 'unchecked',
    TRANSITION_STATE_INDETERMINATE: 'indeterminate',
    ARIA_CHECKED_ATTR: 'aria-checked',
    ARIA_CHECKED_INDETERMINATE_VALUE: 'mixed'
  };

  /** @enum {number} */
  var numbers = {
    ANIM_END_LATCH_MS: 250
  };

  exports.cssClasses = cssClasses;
  exports.strings = strings;
  exports.numbers = numbers;
});

},{}],6:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '@material/base/foundation', '@material/selection-control/index', './adapter', './constants'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('@material/base/foundation'), require('@material/selection-control/index'), require('./adapter'), require('./constants'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.foundation, global.index, global.adapter, global.constants);
    global.foundation = mod.exports;
  }
})(this, function (module, exports, _foundation, _index, _adapter, _constants) {
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

  /** @const {!Array<string>} */
  var CB_PROTO_PROPS = ['checked', 'indeterminate'];

  /**
   * @extends {MDCFoundation<!MDCCheckboxAdapter>}
   */

  var MDCCheckboxFoundation = function (_MDCFoundation) {
    _inherits(MDCCheckboxFoundation, _MDCFoundation);

    _createClass(MDCCheckboxFoundation, null, [{
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
        return (/** @type {!MDCCheckboxAdapter} */{
            addClass: function addClass() /* className: string */{},
            removeClass: function removeClass() /* className: string */{},
            setNativeControlAttr: function setNativeControlAttr() /* attr: string, value: string */{},
            removeNativeControlAttr: function removeNativeControlAttr() /* attr: string */{},
            registerAnimationEndHandler: function registerAnimationEndHandler() /* handler: EventListener */{},
            deregisterAnimationEndHandler: function deregisterAnimationEndHandler() /* handler: EventListener */{},
            registerChangeHandler: function registerChangeHandler() /* handler: EventListener */{},
            deregisterChangeHandler: function deregisterChangeHandler() /* handler: EventListener */{},
            getNativeControl: function getNativeControl() /* !MDCSelectionControlState */{},
            forceLayout: function forceLayout() {},
            isAttachedToDOM: function isAttachedToDOM() /* boolean */{}
          }
        );
      }
    }]);

    function MDCCheckboxFoundation(adapter) {
      _classCallCheck(this, MDCCheckboxFoundation);

      var _this = _possibleConstructorReturn(this, (MDCCheckboxFoundation.__proto__ || Object.getPrototypeOf(MDCCheckboxFoundation)).call(this, Object.assign(MDCCheckboxFoundation.defaultAdapter, adapter)));

      /** @private {string} */
      _this.currentCheckState_ = _constants.strings.TRANSITION_STATE_INIT;

      /** @private {string} */
      _this.currentAnimationClass_ = '';

      /** @private {number} */
      _this.animEndLatchTimer_ = 0;

      _this.animEndHandler_ = /** @private {!EventListener} */function () {
        return _this.handleAnimationEnd();
      };

      _this.changeHandler_ = /** @private {!EventListener} */function () {
        return _this.handleChange();
      };
      return _this;
    }

    /** @override */


    _createClass(MDCCheckboxFoundation, [{
      key: 'init',
      value: function init() {
        this.currentCheckState_ = this.determineCheckState_(this.getNativeControl_());
        this.updateAriaChecked_();
        this.adapter_.addClass(_constants.cssClasses.UPGRADED);
        this.adapter_.registerChangeHandler(this.changeHandler_);
        this.installPropertyChangeHooks_();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterChangeHandler(this.changeHandler_);
        this.uninstallPropertyChangeHooks_();
      }
    }, {
      key: 'isChecked',
      value: function isChecked() {
        return this.getNativeControl_().checked;
      }
    }, {
      key: 'setChecked',
      value: function setChecked(checked) {
        this.getNativeControl_().checked = checked;
      }
    }, {
      key: 'isIndeterminate',
      value: function isIndeterminate() {
        return this.getNativeControl_().indeterminate;
      }
    }, {
      key: 'setIndeterminate',
      value: function setIndeterminate(indeterminate) {
        this.getNativeControl_().indeterminate = indeterminate;
      }
    }, {
      key: 'isDisabled',
      value: function isDisabled() {
        return this.getNativeControl_().disabled;
      }
    }, {
      key: 'setDisabled',
      value: function setDisabled(disabled) {
        this.getNativeControl_().disabled = disabled;
        if (disabled) {
          this.adapter_.addClass(_constants.cssClasses.DISABLED);
        } else {
          this.adapter_.removeClass(_constants.cssClasses.DISABLED);
        }
      }
    }, {
      key: 'getValue',
      value: function getValue() {
        return this.getNativeControl_().value;
      }
    }, {
      key: 'setValue',
      value: function setValue(value) {
        this.getNativeControl_().value = value;
      }
    }, {
      key: 'handleAnimationEnd',
      value: function handleAnimationEnd() {
        var _this2 = this;

        clearTimeout(this.animEndLatchTimer_);
        this.animEndLatchTimer_ = setTimeout(function () {
          _this2.adapter_.removeClass(_this2.currentAnimationClass_);
          _this2.adapter_.deregisterAnimationEndHandler(_this2.animEndHandler_);
        }, _constants.numbers.ANIM_END_LATCH_MS);
      }
    }, {
      key: 'handleChange',
      value: function handleChange() {
        this.transitionCheckState_();
      }
    }, {
      key: 'installPropertyChangeHooks_',
      value: function installPropertyChangeHooks_() {
        var _this3 = this;

        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = Object.getOwnPropertyDescriptor(cbProto, controlState);
          // We have to check for this descriptor, since some browsers (Safari) don't support its return.
          // See: https://bugs.webkit.org/show_bug.cgi?id=49739
          if (validDescriptor(desc)) {
            var nativeCbDesc = /** @type {!ObjectPropertyDescriptor} */{
              get: desc.get,
              set: function set(state) {
                desc.set.call(nativeCb, state);
                _this3.transitionCheckState_();
              },
              configurable: desc.configurable,
              enumerable: desc.enumerable
            };
            Object.defineProperty(nativeCb, controlState, nativeCbDesc);
          }
        });
      }
    }, {
      key: 'uninstallPropertyChangeHooks_',
      value: function uninstallPropertyChangeHooks_() {
        var nativeCb = this.getNativeControl_();
        var cbProto = Object.getPrototypeOf(nativeCb);

        CB_PROTO_PROPS.forEach(function (controlState) {
          var desc = /** @type {!ObjectPropertyDescriptor} */Object.getOwnPropertyDescriptor(cbProto, controlState);
          if (validDescriptor(desc)) {
            Object.defineProperty(nativeCb, controlState, desc);
          }
        });
      }
    }, {
      key: 'transitionCheckState_',
      value: function transitionCheckState_() {
        var nativeCb = this.adapter_.getNativeControl();
        if (!nativeCb) {
          return;
        }
        var oldState = this.currentCheckState_;
        var newState = this.determineCheckState_(nativeCb);
        if (oldState === newState) {
          return;
        }

        this.updateAriaChecked_();

        // Check to ensure that there isn't a previously existing animation class, in case for example
        // the user interacted with the checkbox before the animation was finished.
        if (this.currentAnimationClass_.length > 0) {
          clearTimeout(this.animEndLatchTimer_);
          this.adapter_.forceLayout();
          this.adapter_.removeClass(this.currentAnimationClass_);
        }

        this.currentAnimationClass_ = this.getTransitionAnimationClass_(oldState, newState);
        this.currentCheckState_ = newState;

        // Check for parentNode so that animations are only run when the element is attached
        // to the DOM.
        if (this.adapter_.isAttachedToDOM() && this.currentAnimationClass_.length > 0) {
          this.adapter_.addClass(this.currentAnimationClass_);
          this.adapter_.registerAnimationEndHandler(this.animEndHandler_);
        }
      }
    }, {
      key: 'determineCheckState_',
      value: function determineCheckState_(nativeCb) {
        var TRANSITION_STATE_INDETERMINATE = _constants.strings.TRANSITION_STATE_INDETERMINATE,
            TRANSITION_STATE_CHECKED = _constants.strings.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = _constants.strings.TRANSITION_STATE_UNCHECKED;


        if (nativeCb.indeterminate) {
          return TRANSITION_STATE_INDETERMINATE;
        }
        return nativeCb.checked ? TRANSITION_STATE_CHECKED : TRANSITION_STATE_UNCHECKED;
      }
    }, {
      key: 'getTransitionAnimationClass_',
      value: function getTransitionAnimationClass_(oldState, newState) {
        var TRANSITION_STATE_INIT = _constants.strings.TRANSITION_STATE_INIT,
            TRANSITION_STATE_CHECKED = _constants.strings.TRANSITION_STATE_CHECKED,
            TRANSITION_STATE_UNCHECKED = _constants.strings.TRANSITION_STATE_UNCHECKED;
        var _MDCCheckboxFoundatio = MDCCheckboxFoundation.cssClasses,
            ANIM_UNCHECKED_CHECKED = _MDCCheckboxFoundatio.ANIM_UNCHECKED_CHECKED,
            ANIM_UNCHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_UNCHECKED_INDETERMINATE,
            ANIM_CHECKED_UNCHECKED = _MDCCheckboxFoundatio.ANIM_CHECKED_UNCHECKED,
            ANIM_CHECKED_INDETERMINATE = _MDCCheckboxFoundatio.ANIM_CHECKED_INDETERMINATE,
            ANIM_INDETERMINATE_CHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_CHECKED,
            ANIM_INDETERMINATE_UNCHECKED = _MDCCheckboxFoundatio.ANIM_INDETERMINATE_UNCHECKED;


        switch (oldState) {
          case TRANSITION_STATE_INIT:
            if (newState === TRANSITION_STATE_UNCHECKED) {
              return '';
            }
          // fallthrough
          case TRANSITION_STATE_UNCHECKED:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_UNCHECKED_CHECKED : ANIM_UNCHECKED_INDETERMINATE;
          case TRANSITION_STATE_CHECKED:
            return newState === TRANSITION_STATE_UNCHECKED ? ANIM_CHECKED_UNCHECKED : ANIM_CHECKED_INDETERMINATE;
          // TRANSITION_STATE_INDETERMINATE
          default:
            return newState === TRANSITION_STATE_CHECKED ? ANIM_INDETERMINATE_CHECKED : ANIM_INDETERMINATE_UNCHECKED;
        }
      }
    }, {
      key: 'updateAriaChecked_',
      value: function updateAriaChecked_() {
        // Ensure aria-checked is set to mixed if checkbox is in indeterminate state.
        if (this.isIndeterminate()) {
          this.adapter_.setNativeControlAttr(_constants.strings.ARIA_CHECKED_ATTR, _constants.strings.ARIA_CHECKED_INDETERMINATE_VALUE);
        } else {
          this.adapter_.removeNativeControlAttr(_constants.strings.ARIA_CHECKED_ATTR);
        }
      }
    }, {
      key: 'getNativeControl_',
      value: function getNativeControl_() {
        return this.adapter_.getNativeControl() || {
          checked: false,
          indeterminate: false,
          disabled: false,
          value: null
        };
      }
    }]);

    return MDCCheckboxFoundation;
  }(_foundation2.default);

  /**
   * @param {ObjectPropertyDescriptor|undefined} inputPropDesc
   * @return {boolean}
   */
  function validDescriptor(inputPropDesc) {
    return !!inputPropDesc && typeof inputPropDesc.set === 'function';
  }

  exports.default = MDCCheckboxFoundation;
  module.exports = exports['default'];
});

},{"./adapter":4,"./constants":5,"@material/base/foundation":3,"@material/selection-control/index":17}],7:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/animation/index', '@material/base/component', '@material/selection-control/index', './foundation', '@material/ripple/index', '@material/ripple/util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/animation/index'), require('@material/base/component'), require('@material/selection-control/index'), require('./foundation'), require('@material/ripple/index'), require('@material/ripple/util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.index, global.component, global.index, global.foundation, global.index, global.util);
    global.index = mod.exports;
  }
})(this, function (exports, _index, _component, _index2, _foundation, _index3, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MDCCheckbox = exports.MDCCheckboxFoundation = undefined;

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

  var MDCCheckbox = function (_MDCComponent) {
    _inherits(MDCCheckbox, _MDCComponent);

    _createClass(MDCCheckbox, [{
      key: 'nativeCb_',
      get: function get() {
        var NATIVE_CONTROL_SELECTOR = _foundation2.default.strings.NATIVE_CONTROL_SELECTOR;

        var cbEl = /** @type {?MDCSelectionControlState} */this.root_.querySelector(NATIVE_CONTROL_SELECTOR);
        return cbEl;
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        return new MDCCheckbox(root);
      }
    }]);

    function MDCCheckbox() {
      var _ref;

      _classCallCheck(this, MDCCheckbox);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = MDCCheckbox.__proto__ || Object.getPrototypeOf(MDCCheckbox)).call.apply(_ref, [this].concat(args)));

      /** @private {!MDCRipple} */
      _this.ripple_ = _this.initRipple_();
      return _this;
    }

    /**
     * @return {!MDCRipple}
     * @private
     */


    _createClass(MDCCheckbox, [{
      key: 'initRipple_',
      value: function initRipple_() {
        var _this2 = this;

        var MATCHES = (0, _util.getMatchesProperty)(HTMLElement.prototype);
        var adapter = Object.assign(_index3.MDCRipple.createAdapter(this), {
          isUnbounded: function isUnbounded() {
            return true;
          },
          isSurfaceActive: function isSurfaceActive() {
            return _this2.nativeCb_[MATCHES](':active');
          },
          registerInteractionHandler: function registerInteractionHandler(type, handler) {
            return _this2.nativeCb_.addEventListener(type, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
            return _this2.nativeCb_.removeEventListener(type, handler);
          }
        });
        var foundation = new _index3.MDCRippleFoundation(adapter);
        return new _index3.MDCRipple(this.root_, foundation);
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
          setNativeControlAttr: function setNativeControlAttr(attr, value) {
            return _this3.nativeCb_.setAttribute(attr, value);
          },
          removeNativeControlAttr: function removeNativeControlAttr(attr) {
            return _this3.nativeCb_.removeAttribute(attr);
          },
          registerAnimationEndHandler: function registerAnimationEndHandler(handler) {
            return _this3.root_.addEventListener((0, _index.getCorrectEventName)(window, 'animationend'), handler);
          },
          deregisterAnimationEndHandler: function deregisterAnimationEndHandler(handler) {
            return _this3.root_.removeEventListener((0, _index.getCorrectEventName)(window, 'animationend'), handler);
          },
          registerChangeHandler: function registerChangeHandler(handler) {
            return _this3.nativeCb_.addEventListener('change', handler);
          },
          deregisterChangeHandler: function deregisterChangeHandler(handler) {
            return _this3.nativeCb_.removeEventListener('change', handler);
          },
          getNativeControl: function getNativeControl() {
            return _this3.nativeCb_;
          },
          forceLayout: function forceLayout() {
            return _this3.root_.offsetWidth;
          },
          isAttachedToDOM: function isAttachedToDOM() {
            return Boolean(_this3.root_.parentNode);
          }
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.ripple_.destroy();
        _get(MDCCheckbox.prototype.__proto__ || Object.getPrototypeOf(MDCCheckbox.prototype), 'destroy', this).call(this);
      }
    }, {
      key: 'ripple',
      get: function get() {
        return this.ripple_;
      }
    }, {
      key: 'checked',
      get: function get() {
        return this.foundation_.isChecked();
      },
      set: function set(checked) {
        this.foundation_.setChecked(checked);
      }
    }, {
      key: 'indeterminate',
      get: function get() {
        return this.foundation_.isIndeterminate();
      },
      set: function set(indeterminate) {
        this.foundation_.setIndeterminate(indeterminate);
      }
    }, {
      key: 'disabled',
      get: function get() {
        return this.foundation_.isDisabled();
      },
      set: function set(disabled) {
        this.foundation_.setDisabled(disabled);
      }
    }, {
      key: 'value',
      get: function get() {
        return this.foundation_.getValue();
      },
      set: function set(value) {
        this.foundation_.setValue(value);
      }
    }]);

    return MDCCheckbox;
  }(_component2.default);

  exports.MDCCheckboxFoundation = _foundation2.default;
  exports.MDCCheckbox = MDCCheckbox;
});

},{"./foundation":6,"@material/animation/index":1,"@material/base/component":2,"@material/ripple/index":15,"@material/ripple/util":16,"@material/selection-control/index":17}],8:[function(require,module,exports){
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

  var MDCFormFieldAdapter = function () {
    function MDCFormFieldAdapter() {
      _classCallCheck(this, MDCFormFieldAdapter);
    }

    _createClass(MDCFormFieldAdapter, [{
      key: "registerInteractionHandler",
      value: function registerInteractionHandler(type, handler) {}
    }, {
      key: "deregisterInteractionHandler",
      value: function deregisterInteractionHandler(type, handler) {}
    }, {
      key: "activateInputRipple",
      value: function activateInputRipple() {}
    }, {
      key: "deactivateInputRipple",
      value: function deactivateInputRipple() {}
    }]);

    return MDCFormFieldAdapter;
  }();

  exports.default = MDCFormFieldAdapter;
  module.exports = exports["default"];
});

},{}],9:[function(require,module,exports){
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
   * Copyright 2017 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  /** @enum {string} */
  var cssClasses = {
    ROOT: 'mdc-form-field'
  };

  /** @enum {string} */
  var strings = {
    LABEL_SELECTOR: '.mdc-form-field > label'
  };

  exports.cssClasses = cssClasses;
  exports.strings = strings;
});

},{}],10:[function(require,module,exports){
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

  var MDCFormFieldFoundation = function (_MDCFoundation) {
    _inherits(MDCFormFieldFoundation, _MDCFoundation);

    _createClass(MDCFormFieldFoundation, null, [{
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
      key: 'defaultAdapter',
      get: function get() {
        return {
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          activateInputRipple: function activateInputRipple() {},
          deactivateInputRipple: function deactivateInputRipple() {}
        };
      }
    }]);

    function MDCFormFieldFoundation(adapter) {
      _classCallCheck(this, MDCFormFieldFoundation);

      var _this = _possibleConstructorReturn(this, (MDCFormFieldFoundation.__proto__ || Object.getPrototypeOf(MDCFormFieldFoundation)).call(this, Object.assign(MDCFormFieldFoundation.defaultAdapter, adapter)));

      /** @private {!EventListener} */
      _this.clickHandler_ = /** @type {!EventListener} */function () {
        return _this.handleClick_();
      };
      return _this;
    }

    _createClass(MDCFormFieldFoundation, [{
      key: 'init',
      value: function init() {
        this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      }
    }, {
      key: 'handleClick_',
      value: function handleClick_() {
        var _this2 = this;

        this.adapter_.activateInputRipple();
        requestAnimationFrame(function () {
          return _this2.adapter_.deactivateInputRipple();
        });
      }
    }]);

    return MDCFormFieldFoundation;
  }(_foundation2.default);

  exports.default = MDCFormFieldFoundation;
  module.exports = exports['default'];
});

},{"./adapter":8,"./constants":9,"@material/base/foundation":3}],11:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '@material/base/component', './foundation', '@material/selection-control/index'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('@material/base/component'), require('./foundation'), require('@material/selection-control/index'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.component, global.foundation, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _component, _foundation, _index) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MDCFormFieldFoundation = exports.MDCFormField = undefined;

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

  var MDCFormField = function (_MDCComponent) {
    _inherits(MDCFormField, _MDCComponent);

    _createClass(MDCFormField, [{
      key: 'input',
      set: function set(input) {
        this.input_ = input;
      },
      get: function get() {
        return this.input_;
      }
    }], [{
      key: 'attachTo',
      value: function attachTo(root) {
        return new MDCFormField(root);
      }
    }]);

    function MDCFormField() {
      var _ref;

      _classCallCheck(this, MDCFormField);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = MDCFormField.__proto__ || Object.getPrototypeOf(MDCFormField)).call.apply(_ref, [this].concat(args)));

      /** @private {?MDCSelectionControl} */
      _this.input_;
      return _this;
    }

    /**
     * @return {!Element}
     * @private
     */


    _createClass(MDCFormField, [{
      key: 'getDefaultFoundation',
      value: function getDefaultFoundation() {
        var _this2 = this;

        return new _foundation2.default({
          registerInteractionHandler: function registerInteractionHandler(type, handler) {
            return _this2.label_.addEventListener(type, handler);
          },
          deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
            return _this2.label_.removeEventListener(type, handler);
          },
          activateInputRipple: function activateInputRipple() {
            if (_this2.input_ && _this2.input_.ripple) {
              _this2.input_.ripple.activate();
            }
          },
          deactivateInputRipple: function deactivateInputRipple() {
            if (_this2.input_ && _this2.input_.ripple) {
              _this2.input_.ripple.deactivate();
            }
          }
        });
      }
    }, {
      key: 'label_',
      get: function get() {
        var LABEL_SELECTOR = _foundation2.default.strings.LABEL_SELECTOR;

        return (/** @type {!Element} */this.root_.querySelector(LABEL_SELECTOR)
        );
      }
    }]);

    return MDCFormField;
  }(_component2.default);

  exports.MDCFormField = MDCFormField;
  exports.MDCFormFieldFoundation = _foundation2.default;
});

},{"./foundation":10,"@material/base/component":2,"@material/selection-control/index":17}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
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

},{}],14:[function(require,module,exports){
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
   *   activationEvent: Event,
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
   *   deactivate: function(!Event),
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

      /** @private {function(!Event)} */
      _this.deactivateHandler_ = function (e) {
        return _this.deactivate_(e);
      };

      /** @private {function(?Event=)} */
      _this.focusHandler_ = function () {
        return _this.handleFocus();
      };

      /** @private {function(?Event=)} */
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

      /** @private {?Event} */
      _this.previousActivationEvent_ = null;
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
      key: 'isSupported_',
      value: function isSupported_() {
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
          activationEvent: null,
          isProgrammatic: false
        };
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        if (!this.isSupported_()) {
          return;
        }
        this.registerRootHandlers_();

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
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        if (!this.isSupported_()) {
          return;
        }

        if (this.activationTimer_) {
          clearTimeout(this.activationTimer_);
          this.activationTimer_ = 0;
          var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;

          this.adapter_.removeClass(FG_ACTIVATION);
        }

        this.deregisterRootHandlers_();
        this.deregisterDeactivationHandlers_();

        var _MDCRippleFoundation$2 = MDCRippleFoundation.cssClasses,
            ROOT = _MDCRippleFoundation$2.ROOT,
            UNBOUNDED = _MDCRippleFoundation$2.UNBOUNDED;

        requestAnimationFrame(function () {
          _this3.adapter_.removeClass(ROOT);
          _this3.adapter_.removeClass(UNBOUNDED);
          _this3.removeCssVars_();
        });
      }
    }, {
      key: 'registerRootHandlers_',
      value: function registerRootHandlers_() {
        var _this4 = this;

        ACTIVATION_EVENT_TYPES.forEach(function (type) {
          _this4.adapter_.registerInteractionHandler(type, _this4.activateHandler_);
        });
        this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
        this.adapter_.registerInteractionHandler('blur', this.blurHandler_);

        if (this.adapter_.isUnbounded()) {
          this.adapter_.registerResizeHandler(this.resizeHandler_);
        }
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
        var isSameInteraction = previousActivationEvent && e && previousActivationEvent.type !== e.type;
        if (isSameInteraction) {
          return;
        }

        activationState.isActivated = true;
        activationState.isProgrammatic = e === null;
        activationState.activationEvent = e;
        activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';

        var hasActivatedChild = e && activatedTargets.length > 0 && activatedTargets.some(function (target) {
          return _this9.adapter_.containsEventTarget(target);
        });
        if (hasActivatedChild) {
          // Immediately reset activation state, while preserving logic that prevents touch follow-on events
          this.resetActivationState_();
          return;
        }

        if (e) {
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

          if (!activationState.wasElementMadeActive && (e.key === ' ' || e.keyCode === 32)) {
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
        return e && e.type === 'keydown' ? this.adapter_.isSurfaceActive() : true;
      }
    }, {
      key: 'activate',
      value: function activate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

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
          return _this12.previousActivationEvent_ = null;
        }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      }
    }, {
      key: 'deactivate_',
      value: function deactivate_(e) {
        var _this13 = this;

        var activationState = this.activationState_;
        // This can happen in scenarios such as when you have a keyup event that blurs the element.
        if (!activationState.isActivated) {
          return;
        }

        var state = /** @type {!ActivationStateType} */Object.assign({}, activationState);

        if (activationState.isProgrammatic) {
          var evtObject = null;
          requestAnimationFrame(function () {
            return _this13.animateDeactivation_(evtObject, state);
          });
          this.resetActivationState_();
        } else {
          this.deregisterDeactivationHandlers_();
          requestAnimationFrame(function () {
            _this13.activationState_.hasDeactivationUXRun = true;
            _this13.animateDeactivation_(e, state);
            _this13.resetActivationState_();
          });
        }
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.deactivate_(event);
      }
    }, {
      key: 'animateDeactivation_',
      value: function animateDeactivation_(e, _ref) {
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
        this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;
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

},{"./adapter":12,"./constants":13,"./util":16,"@material/base/foundation":3}],15:[function(require,module,exports){
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

},{"./adapter":12,"./foundation":14,"./util":16,"@material/base/component":2}],16:[function(require,module,exports){
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
   * Copyright 2016 Google Inc. All Rights Reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
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
   * @return {boolean|{passive: boolean}}
   */
  function applyPassive() {
    var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (supportsPassive_ === undefined || forceRefresh) {
      var isSupported = false;
      try {
        globalObj.document.addEventListener('test', null, { get passive() {
            isSupported = true;
          } });
      } catch (e) {}

      supportsPassive_ = isSupported;
    }

    return supportsPassive_ ? { passive: true } : false;
  }

  /**
   * @param {!Object} HTMLElementPrototype
   * @return {!Array<string>}
   */
  function getMatchesProperty(HTMLElementPrototype) {
    return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
      return p in HTMLElementPrototype;
    }).pop();
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
      normalizedX = ev.changedTouches[0].pageX - documentX;
      normalizedY = ev.changedTouches[0].pageY - documentY;
    } else {
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

},{}],17:[function(require,module,exports){
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

},{"@material/ripple/index":15}],18:[function(require,module,exports){
'use strict';

(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['@material/form-field', '@material/checkbox'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('@material/form-field'), require('@material/checkbox'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.formField, global.checkbox);
		global.main = mod.exports;
	}
})(undefined, function (_formField, _checkbox) {
	'use strict';

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

	'use strict';
	////// POPUP


	function ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}

	ready(function () {

		// const checkbox = new MDCCheckbox(document.querySelector('.mdc-checkbox'));
		// const formField = new MDCFormField(document.querySelector('.mdc-form-field'));
		// formField.input = checkbox;

		var screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		window.onresize = function (e) {
			screenSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

			console.log(screenSize);
		};
		var mobileSize = 767;

		// Object.prototype.changeStyle = () => {
		// 	if(this) 
		// }
		var popupAll = document.querySelectorAll('.b-card__popup');
		var popupButton = document.querySelectorAll('.popup-button');
		var fullContainer = document.querySelector('.full-container');
		var showPopup = function showPopup(id) {
			var popup = document.querySelector('.b-card__popup[data-id="' + id + '"]');
			popup.style.display = '';
			fullContainer.classList.add('blur');
			fullContainer.style.position = "fixed";
		};
		if (popupButton) {
			Array.from(popupButton).forEach(function (el) {
				el.addEventListener('click', function (e) {
					e.preventDefault();

					Array.from(popupAll).forEach(function (pa) {
						pa.style.display = "none";
					});
					showPopup(el.dataset.id);
				});
			});
		}

		var body = document.body;
		var burgerMenu = document.getElementsByClassName('b-menu')[0];
		var burgerContain = document.getElementsByClassName('b-burger')[0];
		var burgerNav = document.getElementsByClassName('b-nav')[0];
		// console.log([body, burgerContain, burgerNav])
		if (burgerContain) {
			burgerContain.addEventListener('click', function toggleClasses() {
				[body, burgerContain, burgerNav].forEach(function (el) {
					el.classList.toggle('open');
				});
			}, false);
		}

		//  hover img
		Element.prototype.appendAfter = function (element) {
			element.parentNode.insertBefore(this, element.nextSibling);
		}, false;

		var imgs = document.getElementsByClassName('img-hover');
		Array.from(imgs).forEach(function (e) {
			// const newImg = new Image
			// newImg.src = e.getAttribute('hover-img')
			var parent = e.parentNode;
			var hiddenImg = e.cloneNode();
			hiddenImg.src = e.getAttribute('hover-img');
			hiddenImg.style.display = 'none';
			hiddenImg.appendAfter(e);
			parent.onmouseenter = function () {
				e.style.display = 'none';
				hiddenImg.style.display = '';
			};
			parent.onmouseleave = function () {
				e.style.display = '';
				hiddenImg.style.display = 'none';
			};

			e.parentNode.onmouseenter();
			e.parentNode.onmouseleave();
		});

		var getClosest = function getClosest(elem, selector) {

			// Element.matches() polyfill
			if (!Element.prototype.matches) {
				Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					    i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
			}

			// Get the closest matching element
			for (; elem && elem !== document; elem = elem.parentNode) {
				if (elem.matches(selector)) return elem;
			}
			return null;
		};

		//Add contact to input
		var contact = document.querySelectorAll('.b-contact__item');
		// console.log(contact)

		NodeList.prototype.onclick = function (c) {

			Array.from(this).forEach(function (t) {
				t.onclick = function () {
					c(t);
				};
			});
		};

		contact.onclick(function (t) {
			var number = t.querySelector('.b-contact__item-number');
			number = number.innerText || number.textContent;
			number = number.substring(1);
			getClosest(t, '.b-card__form-row').querySelector('.phone-number-area').value = number;
			allContacts.forEach(function (c) {
				c.style.display = 'none';
			});
		});

		// show CRUD buttons

		var showIcons = document.querySelectorAll('.show-crud-icons');

		if (showIcons) {
			Array.from(showIcons).forEach(function (s) {
				var contactIcons = s.parentNode.querySelector('.b-contact__icons');
				s.addEventListener('click', function () {
					s.style.display = 'none';
					contactIcons.style.display = 'block';
				});
			});
		}

		// tabs

		var tabLinks = new Array();
		var contentDivs = new Array();

		function init() {

			// Grab the tab links and content divs from the page
			// let firstTab = document.querySelector('.tabs')
			// const tabs = document.querySelector('.tabs')
			var tabs = document.querySelectorAll('.tabs');

			// check if tabs  exist
			// if (tabs.length==0) return

			Array.from(tabs).forEach(function (tab) {

				var tabListItems = tab.childNodes;
				for (var _i = 0; _i < tabListItems.length; _i++) {
					if (tabListItems[_i].nodeName == "A") {
						var tabLink = tabListItems[_i];
						var id = getHash(tabLink.getAttribute('href'));
						tabLinks[id] = tabLink;
						contentDivs[id] = document.getElementById(id);
					}
				}

				// Assign onclick events to the tab links, and
				// highlight the first tab
				var i = 0;

				for (var _id in tabLinks) {
					tabLinks[_id].onclick = showTab;
					tabLinks[_id].onfocus = function () {
						this.blur();
					};
					if (i == 0) tabLinks[_id].classList.add('tab--active');
					i++;
				}

				// Hide all content divs except the first
				i = 0;

				for (var _id2 in contentDivs) {
					if (i != 0) contentDivs[_id2].classList.add('hide');
					i++;
				}
			});
		}

		function showTab(e) {
			e.preventDefault;
			var selectedId = getHash(this.getAttribute('href'));

			// Highlight the selected tab, and dim all others.
			// Also show the selected content div, and hide all others.
			for (var id in contentDivs) {
				if (id == selectedId) {
					tabLinks[id].classList.add('tab--active');
					contentDivs[id].classList.remove('hide');
				} else {
					tabLinks[id].classList.remove('tab--active');
					contentDivs[id].classList.add('hide');
				}
			}

			// Stop the browser following the link
			return false;
		}

		function getFirstChildWithTagName(element, tagName) {
			for (var i = 0; i < element.childNodes.length; i++) {
				if (element.childNodes[i].nodeName == tagName) return element.childNodes[i];
			}
		}

		function getHash(url) {
			var hashPos = url.lastIndexOf('#');
			return url.substring(hashPos + 1);
		}

		init();

		function clearSelection() {
			if (document.selection && document.selection.empty) {
				document.selection.empty();
			} else if (window.getSelection) {
				var sel = window.getSelection();
				sel.removeAllRanges();
			}
		}

		function animate() {
			var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
			var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
			var continuingCb = arguments[3];
			var endedCb = arguments[4];

			// console.time()
			// console.log(ms)
			var animationInterval = Math.round(ms / (ms / 1000 * 24));
			var changingRate = Math.round((to - from) / (ms / 1000 * 24));
			var expanding = void 0;
			if (from < to) {
				expanding = true; // update parameters
			} else {
				expanding = false; // update parameters
			}
			function frame() {

				if (expanding) {
					from += changingRate;
				} else {
					from += changingRate;
				}

				continuingCb(from);

				if (expanding && from > to || !expanding && from < to) {
					// check finish condition
					clearInterval(id);
					// console.timeEnd()
					endedCb();
				}

				// show frame
			}
			var id = setInterval(frame, animationInterval); // draw every * ms
		}

		var toNodes = function toNodes(html) {
			return new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];
		};
		var expandCard = function expandCard(inner, innerInitialHeight, e) {
			e.preventDefault;
			clearSelection();

			// if (this.style.display!='none')
			// 	this.style.display = 'none'
			// else this.style.display = ''

			var parentCard = getClosest(this, '.b-card');

			// 

			// console.log(innerInitialHeight)

			if (parentCard.classList.contains('b-card--shrink')) {

				animate(0, innerInitialHeight, 100, function (num) {
					inner.style.maxHeight = num + 'px';
				}, function () {
					parentCard.classList.remove('b-card--shrink');
				});
			} else {
				animate(innerInitialHeight, 0, 100, function (num) {
					inner.style.maxHeight = num + 'px';
				}, function () {
					// parentCard.classList.remove('b-card--shrink')
					inner.style.maxHeight = 0;
				});
				parentCard.classList.add('b-card--shrink');
			}

			var cardTop = parentCard.querySelector('.b-card__top--right');
			if (cardTop) {
				if (this.style.display != 'none') {
					this.style.display = 'none';
					cardTop.style.display = 'block';
				} else {
					this.style.display = '';
					cardTop.style.display = 'none';
				}
			}

			/*if(e.target.nodeName != 'A') parentCard.classList.toggle('b-card--shrink')*/
		};

		/// corrected expanding effect
		var expandCardIcon = toNodes('<img class="img img__icon pull-right no-margin rotate-90 expand-card-icon" src="./img/icons/code.svg" style="width:20px;height: auto">');
		var cardTop = document.querySelectorAll('.b-card__top:not(.no-expand)');
		var cardTopRight = document.querySelectorAll('.b-card__top--right');
		if (cardTop.length > 0) {

			// let ruleString = ''

			var addClickListenerToExpandCard = void 0;

			(addClickListenerToExpandCard = function addClickListenerToExpandCard() {
				Array.from(cardTop).forEach(function (el, i) {
					// shrink inner side of card
					// adding max height for transition effect

					var parent = el.parentNode;
					var inner = parent.querySelector('.b-card__inner');
					inner.style.maxHeight = 'fit-content';
					var innerInitialHeight = parent.querySelector('.b-card__inner').offsetHeight; // we do it here to get the height before shrinking
					// if(innerHeight>higherInner) higherInner = innerHeight
					// console.log(elHeight)
					// ruleString += '.b-card__inner:nth-of-type(' + i + '){max-height: ' + elHeight + 'px}'
					// el.style.maxHeight = elHeight
					// console.log(innerInitialHeight)

					parent.classList.add('b-card--shrink');
					inner.style.maxHeight = 0;

					var expandCardIconClone = expandCardIcon.cloneNode();

					el.appendChild(expandCardIconClone);

					var thisCardTop = getClosest(expandCardIconClone, '.b-card__top');

					// thisCardTop.removeEventListener('click', expandOrShrink)
					// thisCardTop.addEventListener('click', expandOrShrink)
					thisCardTop.onclick = expandCard.bind(expandCardIconClone, inner, innerInitialHeight);
				});

				Array.from(cardTopRight).forEach(function (el) {
					el.style.display = 'none';
				});
			})();

			var resizeTimer = void 0;
			window.onresize = function () {
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function () {

					addClickListenerToExpandCard();
				}, 250);
			};
		}

		var bNavHeader = document.querySelector('.b-nav__header');
		var bNavHeaderText = document.querySelector('b-nav__header');
		if (bNavHeader && bNavHeaderText) {
			bNavHeaderText = bNavHeaderText.innerText || bNavHeaderText.textContent;
			bNavHeader.innerText = bNavHeaderText;
		}

		//  change page button
		// let page = 1
		// let url = window.location.href
		// let page = parseInt(url.substring(url.indexOf('.html')-1, url.indexOf('.html'))
		// console.log(page+1)
		// let newUrl = url.replace
		// console.log(url)
		// const changePageBtn = '<a href="">'

		var switchCards = document.querySelectorAll('.b-card__inner--switch');

		if (switchCards) {
			var checkInputsAndAddActiveClass = function checkInputsAndAddActiveClass(e, input, switchText) {
				if (!input) return false;
				if (input.checked) {
					e.classList.add('b-card__inner--switch--checked');
					switchText.innerText = 'AKTİVDİR';
					switchText.classList.add('green');
				} else {
					e.classList.remove('b-card__inner--switch--checked');
					switchText.innerText = 'DEAKTİVDİR';
					switchText.classList.remove('green');
				}
			};

			Array.from(switchCards).forEach(function (e) {
				var input = e.querySelector('.switch__checkbox');
				var switchText = e.querySelector('.switch__text');

				checkInputsAndAddActiveClass(e, input, switchText);
				e.addEventListener('change', function () {
					checkInputsAndAddActiveClass(e, input, switchText);
				});
			});
		}

		var clientMessage = document.querySelector('.client-message');
		if (clientMessage) {
			var count = void 0,
			    messageCount = void 0;
			var limit = 500;
			var parent = clientMessage.parentNode;
			var currentChars = parent.querySelector('.current-chars');
			var messageCountDOM = parent.querySelector('.message-count');
			clientMessage.onkeyup = function () {
				count = this.value.length;
				currentChars.innerText = count;

				messageCount = Math.floor((count - 1) / limit) + 1;
				/*messageCountDOM.innerText = messageCount*/

				// if(count<=limit) messageCountDOM.innerText = 1
			};
		}

		/// stick footer bottom
		var footer = document.querySelector('.footer');
		var fullContainerHeight = fullContainer.offsetHeight;
		var windowHeight = window.innerHeight;

		if (windowHeight > fullContainerHeight) {
			footer.style.marginTop = windowHeight - fullContainerHeight - footer.offsetHeight + 'px';
		}

		var rules = document.querySelector('.b-card__rules');
		if (rules) {
			rules.addEventListener('scroll', function (event) {
				var element = event.target;
				if (element.scrollHeight - Math.round(element.scrollTop) === element.clientHeight) {
					var iAcceptButton = document.querySelector('.i-accept-button');
					if (iAcceptButton) {
						iAcceptButton.disabled = false;
					}
				}
			});
		}

		var selects = document.querySelectorAll('.material-select');
		Array.from(selects).forEach(function (s) {
			// const wrapper = document.createElement('div')
			// wrapper.className = 'inline-block-wrapper'
			// wrapper.appendChild(s)
			var dropdown = document.createElement('div');
			dropdown.className = 'material-select__options';

			var options = s.querySelectorAll('option');
			Array.from(options).forEach(function (o) {
				var p = document.createElement('p');
				p.className = 'material-select__option';
				p.setAttribute('value', o.value);
				p.innerHTML = o.text;
				dropdown.appendChild(p);
				dropdown.appendAfter(s);
				p.onclick = function (e) {
					s.value = o.value;
					dropdown.classList.remove('material-select__options--visible');
				};
			});
			s.onmousedown = function (e) {
				e.preventDefault();
				dropdown.classList.toggle('material-select__options--visible');
			};
		});

		/*	// accordion script begin
  	const company_accordion = document.querySelectorAll('.company__accordion');
  	if(company_accordion) {
  		Array.from(company_accordion).forEach((el)=>{
  			const accordion_header = el.querySelector('.company__header');
  			const accordion_text = el.querySelector('.b-jumbotron');
  
  			accordion_header.addEventListener('click', function () {
  				accordion_text.classList.add('company__accordion--hide')
  			})
  
  		})
  	}*/

		//autocomplete script begin 
		var complete_input = document.querySelectorAll('.autocomplete input');
		if (complete_input.length > 0) {
			var autocomplete = function autocomplete(inp, arr) {
				/*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
				var currentFocus;
				/*execute a function when someone writes in the text field:*/
				inp.addEventListener("input", function (e) {
					var a,
					    b,
					    i,
					    val = this.value;
					/*close any already open lists of autocompleted values*/
					closeAllLists();
					if (!val) {
						return false;
					}
					currentFocus = -1;
					/*create a DIV element that will contain the items (values):*/
					a = document.createElement("DIV");
					a.setAttribute("id", this.id + "autocomplete-list");
					a.setAttribute("class", "autocomplete-items");
					/*append the DIV element as a child of the autocomplete container:*/
					this.parentNode.appendChild(a);
					/*for each item in the array...*/
					for (i = 0; i < arr.length; i++) {
						/*check if the item starts with the same letters as the text field value:*/
						if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
							/*create a DIV element for each matching element:*/
							b = document.createElement("DIV");
							/*make the matching letters bold:*/
							b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
							b.innerHTML += arr[i].substr(val.length);
							/*insert a input field that will hold the current array item's value:*/
							b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
							/*execute a function when someone clicks on the item value (DIV element):*/
							b.addEventListener("click", function (e) {
								/*insert the value for the autocomplete text field:*/
								inp.value = this.getElementsByTagName("input")[0].value;
								/*close the list of autocompleted values,
        (or any other open lists of autocompleted values:*/
								closeAllLists();
							});
							a.appendChild(b);
						}
					}
				});
				/*execute a function presses a key on the keyboard:*/
				inp.addEventListener("keydown", function (e) {
					var x = document.getElementById(this.id + "autocomplete-list");
					if (x) x = x.getElementsByTagName("div");
					if (e.keyCode == 40) {
						/*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
						currentFocus++;
						/*and and make the current item more visible:*/
						addActive(x);
					} else if (e.keyCode == 38) {
						//up
						/*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
						currentFocus--;
						/*and and make the current item more visible:*/
						addActive(x);
					} else if (e.keyCode == 13) {
						/*If the ENTER key is pressed, prevent the form from being submitted,*/
						e.preventDefault();
						if (currentFocus > -1) {
							/*and simulate a click on the "active" item:*/
							if (x) x[currentFocus].click();
						}
					}
				});
				function addActive(x) {
					/*a function to classify an item as "active":*/
					if (!x) return false;
					/*start by removing the "active" class on all items:*/
					removeActive(x);
					if (currentFocus >= x.length) currentFocus = 0;
					if (currentFocus < 0) currentFocus = x.length - 1;
					/*add class "autocomplete-active":*/
					x[currentFocus].classList.add("autocomplete-active");
				}
				function removeActive(x) {
					/*a function to remove the "active" class from all autocomplete items:*/
					for (var i = 0; i < x.length; i++) {
						x[i].classList.remove("autocomplete-active");
					}
				}
				function closeAllLists(elmnt) {
					/*close all autocomplete lists in the document,
     except the one passed as an argument:*/
					var x = document.getElementsByClassName("autocomplete-items");
					for (var i = 0; i < x.length; i++) {
						if (elmnt != x[i] && elmnt != inp) {
							x[i].parentNode.removeChild(x[i]);
						}
					}
				}
				/*execute a function when someone clicks in the document:*/
				document.addEventListener("click", function (e) {
					closeAllLists(e.target);
				});
			};

			var department = ["Maliyyə", "Marketinq"];
			if (department) {
				autocomplete(document.getElementById("department"), department);
			}
		}
		//autocomplete script end


		// table script begin
		var table_export = document.querySelectorAll('.b-table .b-table__wrapper');

		if (table_export) {
			Array.from(table_export).forEach(function (el) {
				var download_btn = el.querySelector('.b-table__export-download');
				var export_btns = el.querySelector('.b-table__export-btns');

				if (download_btn) {

					download_btn.addEventListener('click', function () {
						download_btn.style.display = "none";
						export_btns.style.display = "block";
					});
				}
			});
		}

		var table_collapsed = document.querySelectorAll('.table-collapsed');

		if (table_collapsed) {

			Array.from(table_collapsed).forEach(function (tc) {

				var table_roll_btn = tc.querySelectorAll('.b-table__roll-icon');
				if (table_roll_btn) {

					Array.from(table_roll_btn).forEach(function (el) {
						el.addEventListener('click', function () {

							var _table_icons_td = el.parentNode;
							var _table_icons_td_index = Array.from(_table_icons_td.parentNode.children).indexOf(_table_icons_td);

							var table_tr = tc.querySelectorAll('.table tr:not(.b-table__hover)');

							Array.from(table_tr).forEach(function (tr) {
								tr.querySelectorAll('td , th')[_table_icons_td_index].classList.add('b-table__rolled');
							});

							var table_icons_td = tc.querySelectorAll('.b-table__hover td');

							table_icons_td[_table_icons_td_index].classList.add('b-table__show_unroll-icon');
						}, false);
					});
				}

				var table_unroll_btn = tc.querySelectorAll('.b-table__unroll-icon');
				if (table_unroll_btn) {

					Array.from(table_unroll_btn).forEach(function (el) {
						el.addEventListener('click', function () {

							var _table_icons_td = el.parentNode;
							var _table_icons_td_index = Array.from(_table_icons_td.parentNode.children).indexOf(_table_icons_td);

							var table_tr = tc.querySelectorAll('.table tr:not(.b-table__hover)');

							Array.from(table_tr).forEach(function (tr) {
								tr.querySelectorAll('td , th')[_table_icons_td_index].classList.remove('b-table__rolled');
							});

							var table_icons_td = tc.querySelectorAll('.b-table__hover td');

							table_icons_td[_table_icons_td_index].classList.remove('b-table__show_unroll-icon');
						}, false);
					});
				}

				var firstRow = tc.querySelector('.b-table__hover');
				var hover_in_out = tc.querySelectorAll('.table th, .b-table__hover td');

				Array.from(hover_in_out).forEach(function (el) {
					el.onmouseenter = function () {
						var hover_el_index = Array.from(el.parentNode.children).indexOf(el);
						firstRow.querySelectorAll('td')[hover_el_index].classList.add('b-table__show_all-icons');
					};
				});

				Array.from(hover_in_out).forEach(function (el) {
					el.onmouseleave = function () {
						var hover_el_index = Array.from(el.parentNode.children).indexOf(el);
						el.classList.remove('b-table__show_all-icons');
						firstRow.querySelectorAll('td')[hover_el_index].classList.remove('b-table__show_all-icons');
					};
				});

				var table_search_btn = tc.querySelectorAll('.b-table__search-icon');
				if (table_search_btn) {

					Array.from(table_search_btn).forEach(function (el) {
						el.addEventListener('click', function () {

							var _table_icons_td = el.parentNode;

							var search_block = tc.querySelectorAll('.b-table__search');
							Array.from(search_block).forEach(function (sb) {
								sb.style.display = "none";
							});

							var not_unroll_icon = tc.querySelectorAll('.b-table__hover td .b-table__icons:not(.b-table__unroll-icon)');
							Array.from(not_unroll_icon).forEach(function (nui) {
								nui.style.display = "inline";
							});

							var _table_icons = _table_icons_td.querySelectorAll('.b-table__icons');
							Array.from(_table_icons).forEach(function (ti) {
								ti.style.display = "none";
							});

							var _table_search_block = _table_icons_td.querySelectorAll('.b-table__search');
							Array.from(_table_search_block).forEach(function (tsb) {
								tsb.style.display = "inline";
							});
						}, false);
					});
				}

				var table_search_close_btn = tc.querySelectorAll('.b-table__search-close');
				if (table_search_close_btn) {

					Array.from(table_search_close_btn).forEach(function (el) {
						el.addEventListener('click', function () {

							var _table_icons_td = getClosest(el, '.b-table__hover td');

							var not_unroll_icon = tc.querySelectorAll('.b-table__hover td .b-table__icons:not(.b-table__unroll-icon)');

							Array.from(not_unroll_icon).forEach(function (nui) {
								nui.style.display = "inline";
							});

							var _table_search_block = _table_icons_td.querySelectorAll('.b-table__search');
							Array.from(_table_search_block).forEach(function (tsb) {
								tsb.style.display = "none";
							});
						}, false);
					});
				}

				//mobile-table

				var mob_rolled_default_th = tc.querySelectorAll('th.b-table__rolled-th-mobile');
				if (mob_rolled_default_th) {

					Array.from(mob_rolled_default_th).forEach(function (mrt) {

						var mob_active_th_index = Array.from(mrt.parentNode.children).indexOf(mrt);
						var mob_active_td = tc.querySelectorAll('tbody tr');
						Array.from(mob_active_td).forEach(function (mat) {

							var mob_active_td_index = mat.querySelectorAll('td');
							mob_active_td_index[mob_active_th_index].classList.add('b-table__rolled-th-mobile');
						});

						var popup = document.querySelectorAll('.b-card__table-popup');
						var unrolled_th_mobile_id = tc.querySelector('.b-table__unroll-mobile span').dataset.id;

						Array.from(popup).forEach(function (p) {

							var popup_id = p.dataset.id;

							if (popup_id == unrolled_th_mobile_id) {

								var rolled_th_list = p.querySelector('.b-card__popup-list');

								var rolled_th_mobile = tc.querySelectorAll('th.b-table__rolled-th-mobile.taken:not(.taken-default)');

								if (rolled_th_mobile.length > 0) {

									Array.from(rolled_th_mobile).forEach(function (rtm) {

										var rolled_th_mobile_span = rtm.querySelector('span');

										console.log(rolled_th_mobile_span);
										var rolled_th_mobile_trigger_data = rolled_th_mobile_span.getAttribute('data-trigger');

										var rolled_th_mobile_span_value = rolled_th_mobile_span.textContent;
										var rolled_th_item = document.createElement('li');
										rolled_th_item.className = 'b-card__popup-item b-table__unroll-mobile-icon';
										rolled_th_list.appendChild(rolled_th_item);
										rolled_th_item.setAttribute('data-trigger', rolled_th_mobile_trigger_data);

										var mobile_th_unrolled_icon = toNodes('<img src="./img/icons/table_unroll.svg" class="b-card__popup-icon" alt="unroll-icon">');

										var _span = document.createElement("span");
										_span.innerHTML = rolled_th_mobile_span_value;
										_span.className = 'simple-p simple-p--secondary dark-color no-margin';

										rolled_th_item.appendChild(mobile_th_unrolled_icon);
										rolled_th_item.appendChild(_span);

										rtm.classList.add('taken-default');
									});
								}
							}
						});
					});
				}

				var roll_btn_mobile = document.querySelector('.b-card__table-popup .b-table__roll-mobile');
				if (roll_btn_mobile) {
					var mobile_th = tc.querySelectorAll('th');

					Array.from(mobile_th).forEach(function (mt) {

						mt.addEventListener('click', function () {
							if (screenSize > mobileSize) {
								Array.from(popupAll).forEach(function (popup) {
									popup.style.display = 'none';
								});
								fullContainer.classList.remove('blur');
								fullContainer.style.position = "static";
							}
							mt.classList.add('active-popup');
						});
					});

					var mobileRollCols = void 0;
					(mobileRollCols = function mobileRollCols() {
						var mob_active_th = tc.querySelector('.active-popup');

						if (mob_active_th) {

							mob_active_th.classList.add('b-table__rolled-th-mobile');

							var mob_active_th_index = Array.from(mob_active_th.parentNode.children).indexOf(mob_active_th);

							var mob_active_td = tc.querySelectorAll('tbody tr');

							Array.from(mob_active_td).forEach(function (mat) {

								var mob_active_td_index = mat.querySelectorAll('td');
								mob_active_td_index[mob_active_th_index].classList.add('b-table__rolled-th-mobile');
							});

							Array.from(popupAll).forEach(function (popup) {
								popup.style.display = 'none';
							});
							fullContainer.classList.remove('blur');
							fullContainer.style.position = "static";

							mob_active_th.classList.remove('active-popup');

							var popup = document.querySelectorAll('.b-card__table-popup');
							var unrolled_th_mobile_id = tc.querySelector('.b-table__unroll-mobile span').dataset.id;

							Array.from(popup).forEach(function (p) {

								var popup_id = p.dataset.id;

								if (popup_id == unrolled_th_mobile_id) {

									var rolled_th_list = p.querySelector('.b-card__popup-list');

									var rolled_th_mobile = tc.querySelectorAll('th.b-table__rolled-th-mobile:not(.taken)');

									if (rolled_th_mobile.length > 0) {

										Array.from(rolled_th_mobile).forEach(function (rtm) {

											var rolled_th_mobile_span = rtm.querySelector('span');

											console.log(rolled_th_mobile_span);
											var rolled_th_mobile_trigger_data = rolled_th_mobile_span.getAttribute('data-trigger');

											var rolled_th_mobile_span_value = rolled_th_mobile_span.textContent;
											var rolled_th_item = document.createElement('li');
											rolled_th_item.className = 'b-card__popup-item b-table__unroll-mobile-icon';
											rolled_th_list.appendChild(rolled_th_item);
											rolled_th_item.setAttribute('data-trigger', rolled_th_mobile_trigger_data);

											var mobile_th_unrolled_icon = toNodes('<img src="./img/icons/table_unroll.svg" class="b-card__popup-icon" alt="unroll-icon">');

											var _span = document.createElement("span");
											_span.innerHTML = rolled_th_mobile_span_value;
											_span.className = 'simple-p simple-p--secondary dark-color no-margin';

											rolled_th_item.appendChild(mobile_th_unrolled_icon);
											rolled_th_item.appendChild(_span);

											rtm.classList.add('taken');
										});
									}
								}
							});
						}
					})();

					roll_btn_mobile.addEventListener('click', function (e) {

						mobileRollCols();
					});
				}

				/*const unrolled_th_mobile = tc.querySelector('.b-table__unroll-mobile');
    if(unrolled_th_mobile) {
    const popup = document.querySelectorAll('.b-card__table-popup');
    const unrolled_th_mobile_id = unrolled_th_mobile.querySelector('span').dataset.id;
    unrolled_th_mobile.addEventListener('click', function (e) {
    
    Array.from(popup).forEach((p)=>{
    		const popup_id = p.dataset.id;	
    		if(popup_id == unrolled_th_mobile_id) {
    			const unroll_btn_mobile = document.querySelectorAll('.b-card__table-popup .b-table__unroll-mobile-icon');
    				}
    })
    })
    
    }*/
			});
		}

		// table script end


		// upload script begin
		// feature detection for drag&drop upload
		var isAdvancedUpload = function () {
			var div = document.createElement('div');
			return ('draggable' in div || 'ondragstart' in div && 'ondrop' in div) && 'FormData' in window && 'FileReader' in window;
		}();

		// applying the effect for every form
		var forms = document.querySelectorAll('.upload');
		Array.prototype.forEach.call(forms, function (form) {
			var input = form.querySelector('input[type="file"]'),
			    successMsg = form.querySelector('.upload__success-message'),
			    label = form.querySelector('label'),
			    errorMsg = form.querySelector('.upload__error-message'),
			    droppedFiles = false,
			    showFiles = function showFiles(files) {
				/*label.textContent = files.length > 1 ? ( input.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', files.length ) : files[ 0 ].name;*/
				//file Name
			},
			    triggerFormSubmit = function triggerFormSubmit() {
				var event = document.createEvent('HTMLEvents');
				event.initEvent('submit', true, false);
				form.dispatchEvent(event);
			};

			// letting the server side to know we are going to make an Ajax request
			var ajaxFlag = document.createElement('input');
			ajaxFlag.setAttribute('type', 'hidden');
			ajaxFlag.setAttribute('name', 'ajax');
			ajaxFlag.setAttribute('value', 1);
			form.appendChild(ajaxFlag);

			// automatically submit the form on file select
			input.addEventListener('change', function (e) {
				showFiles(e.target.files);

				triggerFormSubmit();
			});

			// drag&drop files if the feature is available
			if (isAdvancedUpload) {
				form.classList.add('has-advanced-upload'); // letting the CSS part to know drag&drop is supported by the browser

				['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function (event) {
					form.addEventListener(event, function (e) {
						// preventing the unwanted behaviours
						e.preventDefault();
						e.stopPropagation();
					});
				});
				['dragover', 'dragenter'].forEach(function (event) {
					form.addEventListener(event, function () {
						form.classList.add('is-dragover');
					});
				});
				['dragleave', 'dragend', 'drop'].forEach(function (event) {
					form.addEventListener(event, function () {
						form.classList.remove('is-dragover');
					});
				});
				form.addEventListener('drop', function (e) {
					droppedFiles = e.dataTransfer.files; // the files that were dropped
					showFiles(droppedFiles);

					triggerFormSubmit();
				});
			}

			// if the form was submitted
			form.addEventListener('submit', function (e) {
				// preventing the duplicate submissions if the current one is in progress
				if (form.classList.contains('is-uploading')) return false;

				form.classList.add('is-uploading');
				form.classList.remove('is-error');

				if (isAdvancedUpload) // ajax file upload for modern browsers
					{
						e.preventDefault();

						// gathering the form data
						var ajaxData = new FormData(form);
						if (droppedFiles) {
							Array.prototype.forEach.call(droppedFiles, function (file) {
								ajaxData.append(input.getAttribute('name'), file);
							});
						}

						// ajax request
						var ajax = new XMLHttpRequest();
						ajax.open(form.getAttribute('method'), form.getAttribute('action'), true);

						ajax.onload = function () {
							form.classList.remove('is-uploading');
							if (ajax.status >= 200 && ajax.status < 400) {
								var data = JSON.parse(ajax.responseText);
								form.classList.add(data.success == true ? 'is-success' : 'is-error');
								if (!data.success) errorMsg.textContent = data.error;
							} else alert('Error. Please, contact the webmaster!');
						};

						ajax.onerror = function () {
							form.classList.remove('is-uploading');
							alert('Error. Please, try again!');
						};

						ajax.send(ajaxData);
					} else // fallback Ajax solution upload for older browsers
					{
						var iframeName = 'uploadiframe' + new Date().getTime(),
						    iframe = document.createElement('iframe');

						$iframe = $('<iframe name="' + iframeName + '" style="display: none;"></iframe>');

						iframe.setAttribute('name', iframeName);
						iframe.style.display = 'none';

						document.body.appendChild(iframe);
						form.setAttribute('target', iframeName);

						iframe.addEventListener('load', function () {
							var data = JSON.parse(iframe.contentDocument.body.innerHTML);
							form.classList.remove('is-uploading');
							form.classList.add(data.success == true ? 'is-success' : 'is-error');
							form.removeAttribute('target');
							if (!data.success) errorMsg.textContent = data.error;
							iframe.parentNode.removeChild(iframe);
						});
					}
			});

			// Firefox focus bug fix for file input
			input.addEventListener('focus', function () {
				input.classList.add('has-focus');
			});
			input.addEventListener('blur', function () {
				input.classList.remove('has-focus');
			});
		});

		//upload script end


		document.body.onclick = function (e) {
			if (popupAll.length > 0 && (e.target.className.indexOf('popup-button') === -1 && getClosest(e.target, '.b-card__popup') === null || e.target.className.indexOf('close-popup') > -1)) {

				Array.from(popupAll).forEach(function (popup) {
					popup.style.display = 'none';
				});
				fullContainer.classList.remove('blur');
				fullContainer.style.position = "static";

				var mobile_th_active = document.querySelector('.table-collapsed th.active-popup');
				if (mobile_th_active) {
					mobile_th_active.classList.remove('active-popup');
				}
			}

			// for material selects
			var allDropdowns = document.querySelectorAll('.material-select__options--visible');
			if (allDropdowns.length > 0 && e.target.nodeName != 'SELECT') {
				Array.from(allDropdowns).forEach(function (d) {
					d.classList.remove('material-select__options--visible');
				});
			}

			var export_wrapper = document.querySelectorAll('.b-table__export-wrapper');
			if (export_wrapper && getClosest(e.target, '.b-table__export-btn') === null) {

				Array.from(export_wrapper).forEach(function (el) {
					var download_btn = el.querySelector('.b-table__export-download');
					var export_btns = el.querySelector('.b-table__export-btns');

					if (download_btn) {
						download_btn.style.display = "block";
						export_btns.style.display = "none";
					}
				});
			}
		};
	}); // document ready

	var showOwe = function showOwe(e) {
		e.parentNode.parentNode.style.display = 'none';document.querySelector('.owe').style.display = 'block';
	};

	///

	window.onload = function () {
		var Swipe = function () {
			function Swipe(element) {
				_classCallCheck(this, Swipe);

				this.xDown = null;
				this.yDown = null;
				this.element = typeof element === 'string' ? document.querySelector(element) : element;

				this.element.addEventListener('touchstart', function (evt) {
					this.xDown = evt.touches[0].clientX;
					this.yDown = evt.touches[0].clientY;
				}.bind(this), false);
			}

			_createClass(Swipe, [{
				key: 'onLeft',
				value: function onLeft(callback) {
					this.onLeft = callback;

					return this;
				}
			}, {
				key: 'onRight',
				value: function onRight(callback) {
					this.onRight = callback;

					return this;
				}
			}, {
				key: 'onUp',
				value: function onUp(callback) {
					this.onUp = callback;

					return this;
				}
			}, {
				key: 'onDown',
				value: function onDown(callback) {
					this.onDown = callback;

					return this;
				}
			}, {
				key: 'handleTouchMove',
				value: function handleTouchMove(evt) {
					if (!this.xDown || !this.yDown) {
						return;
					}

					var xUp = evt.touches[0].clientX;
					var yUp = evt.touches[0].clientY;

					this.xDiff = this.xDown - xUp;
					this.yDiff = this.yDown - yUp;

					if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
						// Most significant.
						if (this.xDiff > 0) {
							this.onLeft();
						} else {
							this.onRight();
						}
					} else {
						if (this.yDiff > 0) {
							this.onUp();
						} else {
							this.onDown();
						}
					}

					// Reset values.
					this.xDown = null;
					this.yDown = null;
				}
			}, {
				key: 'run',
				value: function run() {
					this.element.addEventListener('touchmove', function (evt) {
						this.handleTouchMove(evt);
					}.bind(this), false);
				}
			}]);

			return Swipe;
		}();

		var slider = document.querySelector('.b-card__slider');
		var sliderContents = document.querySelectorAll('.b-card__slider-content');
		var dotsDOM = document.querySelector('.b-card__dots');
		var sliderHeaderDOM = document.querySelector('.b-card__header');

		var currentSlider = 0;
		// HTMLCollection.prototype.removeClass = function(c){
		// 	Array.from(this).forEach(e=>{
		// 		e.classList.remove(c)
		// 	})
		// }

		if (slider) {
			var dotClick = function dotClick(num) {
				sliderContents[currentSlider].classList.remove('active'); // IE9+

				dots[currentSlider].classList.remove('active'); // IE9+
				this.classList.add('active');
				currentSlider = num;
				sliderContents[num].classList.add('active');
				sliderHeaderDOM.innerText = sliderContents[currentSlider].querySelector('b-header').innerText || sliderContents[currentSlider].querySelector('b-header').textContent;

				if (currentSlider == dots.length - 1) {
					//slider ended
					nextSliderButton.classList.remove('btn__material--hollow');
					nextSliderButton.classList.add('btn__material--full');
					var buttonDefText = nextSliderButton.innerText;
					nextSliderButton.innerText = nextSliderButton.getAttribute('end-text');
					nextSliderButton.setAttribute('end-text', buttonDefText);
					buttonChangedToMain = true;
				} else if (buttonChangedToMain) {
					//slider ended returned to previous slides
					nextSliderButton.classList.add('btn__material--hollow');
					nextSliderButton.classList.remove('btn__material--full');
					var _buttonDefText = nextSliderButton.innerText;
					nextSliderButton.innerText = nextSliderButton.getAttribute('end-text');
					nextSliderButton.setAttribute('end-text', _buttonDefText);
					buttonChangedToMain = false;
				}

				if (currentSlider == 0) prevSliderButton.style.display = 'none';else prevSliderButton.style.display = '';
			};

			for (var i = 0; i < sliderContents.length; ++i) {

				var dot = document.createElement('span');
				dot.setAttribute('class', 'dot');
				dot.onclick = dotClick.bind(dot, i);
				dotsDOM.appendChild(dot);
			}

			var dots = dotsDOM.getElementsByClassName('dot');
			dots[0].className += ' active';
			var prevSliderButton = document.querySelector('.prev-slider-button');
			var nextSliderButton = document.querySelector('.next-slider-button');
			var buttonChangedToMain = false;

			var swiper = new Swipe('.b-card__slider');
			swiper.onLeft(function () {
				goNextSlider();
			});
			swiper.onRight(function () {
				goPrevSlider();
			});
			swiper.run();

			prevSliderButton.addEventListener('click', function (e) {
				e.preventDefault();
				goPrevSlider();
			});
			nextSliderButton.addEventListener('click', function (e) {
				e.preventDefault();

				goNextSlider();
			});

			var goPrevSlider = function goPrevSlider() {
				if (currentSlider == 0) return false;

				dots[currentSlider - 1].click();
			};
			var goNextSlider = function goNextSlider() {
				dots[currentSlider + 1].click();
			};
		}
	};
});

},{"@material/checkbox":7,"@material/form-field":11}]},{},[18,11])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcYW5pbWF0aW9uXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxiYXNlXFxjb21wb25lbnQuanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcYmFzZVxcZm91bmRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxjaGVja2JveFxcYWRhcHRlci5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxjaGVja2JveFxcY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXGNoZWNrYm94XFxmb3VuZGF0aW9uLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXGNoZWNrYm94XFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxmb3JtLWZpZWxkXFxhZGFwdGVyLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXGZvcm0tZmllbGRcXGNvbnN0YW50cy5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxmb3JtLWZpZWxkXFxmb3VuZGF0aW9uLmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXGZvcm0tZmllbGRcXGluZGV4LmpzIiwibm9kZV9tb2R1bGVzXFxAbWF0ZXJpYWxcXHJpcHBsZVxcYWRhcHRlci5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxyaXBwbGVcXGNvbnN0YW50cy5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxyaXBwbGVcXGZvdW5kYXRpb24uanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxccmlwcGxlXFxpbmRleC5qcyIsIm5vZGVfbW9kdWxlc1xcQG1hdGVyaWFsXFxyaXBwbGVcXHV0aWwuanMiLCJub2RlX21vZHVsZXNcXEBtYXRlcmlhbFxcc2VsZWN0aW9uLWNvbnRyb2xcXGluZGV4LmpzIiwic3JjXFxqc1xcbWFp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WUFBZSxHQUFJO0FBQ3hCLFNBQUssZ0JBQUwsQ0FBQSxFQUFBLEtBQUE7QUFERCxJQUFBO0FBSUE7QUFsS0YsRUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBub1ByZWZpeDogc3RyaW5nLFxuICogICB3ZWJraXRQcmVmaXg6IHN0cmluZyxcbiAqICAgc3R5bGVQcm9wZXJ0eTogc3RyaW5nXG4gKiB9fVxuICovXG5sZXQgVmVuZG9yUHJvcGVydHlNYXBUeXBlO1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGV2ZW50VHlwZU1hcCA9IHtcbiAgJ2FuaW1hdGlvbnN0YXJ0Jzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uc3RhcnQnLFxuICAgIHdlYmtpdFByZWZpeDogJ3dlYmtpdEFuaW1hdGlvblN0YXJ0JyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbmVuZCc6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbmVuZCcsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ2FuaW1hdGlvbml0ZXJhdGlvbic6IHtcbiAgICBub1ByZWZpeDogJ2FuaW1hdGlvbml0ZXJhdGlvbicsXG4gICAgd2Via2l0UHJlZml4OiAnd2Via2l0QW5pbWF0aW9uSXRlcmF0aW9uJyxcbiAgICBzdHlsZVByb3BlcnR5OiAnYW5pbWF0aW9uJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb25lbmQnOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICB3ZWJraXRQcmVmaXg6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICBzdHlsZVByb3BlcnR5OiAndHJhbnNpdGlvbicsXG4gIH0sXG59O1xuXG4vKiogQGNvbnN0IHtPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi9cbmNvbnN0IGNzc1Byb3BlcnR5TWFwID0ge1xuICAnYW5pbWF0aW9uJzoge1xuICAgIG5vUHJlZml4OiAnYW5pbWF0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LWFuaW1hdGlvbicsXG4gIH0sXG4gICd0cmFuc2Zvcm0nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2Zvcm0nLFxuICAgIHdlYmtpdFByZWZpeDogJy13ZWJraXQtdHJhbnNmb3JtJyxcbiAgfSxcbiAgJ3RyYW5zaXRpb24nOiB7XG4gICAgbm9QcmVmaXg6ICd0cmFuc2l0aW9uJyxcbiAgICB3ZWJraXRQcmVmaXg6ICctd2Via2l0LXRyYW5zaXRpb24nLFxuICB9LFxufTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaGFzUHJvcGVyU2hhcGUod2luZG93T2JqKSB7XG4gIHJldHVybiAod2luZG93T2JqWydkb2N1bWVudCddICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddID09PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBldmVudEZvdW5kSW5NYXBzKGV2ZW50VHlwZSkge1xuICByZXR1cm4gKGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgfHwgZXZlbnRUeXBlIGluIGNzc1Byb3BlcnR5TWFwKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0geyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gbWFwXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRKYXZhU2NyaXB0RXZlbnROYW1lKGV2ZW50VHlwZSwgbWFwLCBlbCkge1xuICByZXR1cm4gbWFwW2V2ZW50VHlwZV0uc3R5bGVQcm9wZXJ0eSBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgYnJvd3NlciBwcmVmaXggZm9yIENTUzMgYW5pbWF0aW9uIGV2ZW50c1xuICogYW5kIHByb3BlcnR5IG5hbWVzLlxuICogQHBhcmFtIHshT2JqZWN0fSB3aW5kb3dPYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0QW5pbWF0aW9uTmFtZSh3aW5kb3dPYmosIGV2ZW50VHlwZSkge1xuICBpZiAoIWhhc1Byb3BlclNoYXBlKHdpbmRvd09iaikgfHwgIWV2ZW50Rm91bmRJbk1hcHMoZXZlbnRUeXBlKSkge1xuICAgIHJldHVybiBldmVudFR5cGU7XG4gIH1cblxuICBjb25zdCBtYXAgPSAvKiogQHR5cGUgeyFPYmplY3Q8c3RyaW5nLCAhVmVuZG9yUHJvcGVydHlNYXBUeXBlPn0gKi8gKFxuICAgIGV2ZW50VHlwZSBpbiBldmVudFR5cGVNYXAgPyBldmVudFR5cGVNYXAgOiBjc3NQcm9wZXJ0eU1hcFxuICApO1xuICBjb25zdCBlbCA9IHdpbmRvd09ialsnZG9jdW1lbnQnXVsnY3JlYXRlRWxlbWVudCddKCdkaXYnKTtcbiAgbGV0IGV2ZW50TmFtZSA9ICcnO1xuXG4gIGlmIChtYXAgPT09IGV2ZW50VHlwZU1hcCkge1xuICAgIGV2ZW50TmFtZSA9IGdldEphdmFTY3JpcHRFdmVudE5hbWUoZXZlbnRUeXBlLCBtYXAsIGVsKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudE5hbWUgPSBtYXBbZXZlbnRUeXBlXS5ub1ByZWZpeCBpbiBlbC5zdHlsZSA/IG1hcFtldmVudFR5cGVdLm5vUHJlZml4IDogbWFwW2V2ZW50VHlwZV0ud2Via2l0UHJlZml4O1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZTtcbn1cblxuLy8gUHVibGljIGZ1bmN0aW9ucyB0byBhY2Nlc3MgZ2V0QW5pbWF0aW9uTmFtZSgpIGZvciBKYXZhU2NyaXB0IGV2ZW50cyBvciBDU1Ncbi8vIHByb3BlcnR5IG5hbWVzLlxuXG5jb25zdCB0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMgPSBbJ3RyYW5zZm9ybScsICdXZWJraXRUcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTVNUcmFuc2Zvcm0nXTtcblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0RXZlbnROYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFPYmplY3R9IHdpbmRvd09ialxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb3JyZWN0UHJvcGVydHlOYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKSB7XG4gIHJldHVybiBnZXRBbmltYXRpb25OYW1lKHdpbmRvd09iaiwgZXZlbnRUeXBlKTtcbn1cblxuZXhwb3J0IHt0cmFuc2Zvcm1TdHlsZVByb3BlcnRpZXMsIGdldENvcnJlY3RFdmVudE5hbWUsIGdldENvcnJlY3RQcm9wZXJ0eU5hbWV9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5cbi8qKlxuICogQHRlbXBsYXRlIEZcbiAqL1xuY2xhc3MgTURDQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHJldHVybiB7IU1EQ0NvbXBvbmVudH1cbiAgICovXG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgLy8gU3ViY2xhc3NlcyB3aGljaCBleHRlbmQgTURDQmFzZSBzaG91bGQgcHJvdmlkZSBhbiBhdHRhY2hUbygpIG1ldGhvZCB0aGF0IHRha2VzIGEgcm9vdCBlbGVtZW50IGFuZFxuICAgIC8vIHJldHVybnMgYW4gaW5zdGFudGlhdGVkIGNvbXBvbmVudCB3aXRoIGl0cyByb290IHNldCB0byB0aGF0IGVsZW1lbnQuIEFsc28gbm90ZSB0aGF0IGluIHRoZSBjYXNlcyBvZlxuICAgIC8vIHN1YmNsYXNzZXMsIGFuIGV4cGxpY2l0IGZvdW5kYXRpb24gY2xhc3Mgd2lsbCBub3QgaGF2ZSB0byBiZSBwYXNzZWQgaW47IGl0IHdpbGwgc2ltcGx5IGJlIGluaXRpYWxpemVkXG4gICAgLy8gZnJvbSBnZXREZWZhdWx0Rm91bmRhdGlvbigpLlxuICAgIHJldHVybiBuZXcgTURDQ29tcG9uZW50KHJvb3QsIG5ldyBNRENGb3VuZGF0aW9uKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHtGPX0gZm91bmRhdGlvblxuICAgKiBAcGFyYW0gey4uLj99IGFyZ3NcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZvdW5kYXRpb24gPSB1bmRlZmluZWQsIC4uLmFyZ3MpIHtcbiAgICAvKiogQHByb3RlY3RlZCB7IUVsZW1lbnR9ICovXG4gICAgdGhpcy5yb290XyA9IHJvb3Q7XG4gICAgdGhpcy5pbml0aWFsaXplKC4uLmFyZ3MpO1xuICAgIC8vIE5vdGUgdGhhdCB3ZSBpbml0aWFsaXplIGZvdW5kYXRpb24gaGVyZSBhbmQgbm90IHdpdGhpbiB0aGUgY29uc3RydWN0b3IncyBkZWZhdWx0IHBhcmFtIHNvIHRoYXRcbiAgICAvLyB0aGlzLnJvb3RfIGlzIGRlZmluZWQgYW5kIGNhbiBiZSB1c2VkIHdpdGhpbiB0aGUgZm91bmRhdGlvbiBjbGFzcy5cbiAgICAvKiogQHByb3RlY3RlZCB7IUZ9ICovXG4gICAgdGhpcy5mb3VuZGF0aW9uXyA9IGZvdW5kYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSA6IGZvdW5kYXRpb247XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5pbml0KCk7XG4gICAgdGhpcy5pbml0aWFsU3luY1dpdGhET00oKTtcbiAgfVxuXG4gIGluaXRpYWxpemUoLyogLi4uYXJncyAqLykge1xuICAgIC8vIFN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgdG8gZG8gYW55IGFkZGl0aW9uYWwgc2V0dXAgd29yayB0aGF0IHdvdWxkIGJlIGNvbnNpZGVyZWQgcGFydCBvZiBhXG4gICAgLy8gXCJjb25zdHJ1Y3RvclwiLiBFc3NlbnRpYWxseSwgaXQgaXMgYSBob29rIGludG8gdGhlIHBhcmVudCBjb25zdHJ1Y3RvciBiZWZvcmUgdGhlIGZvdW5kYXRpb24gaXNcbiAgICAvLyBpbml0aWFsaXplZC4gQW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIGJlc2lkZXMgcm9vdCBhbmQgZm91bmRhdGlvbiB3aWxsIGJlIHBhc3NlZCBpbiBoZXJlLlxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4geyFGfSBmb3VuZGF0aW9uXG4gICAqL1xuICBnZXREZWZhdWx0Rm91bmRhdGlvbigpIHtcbiAgICAvLyBTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCBmb3VuZGF0aW9uIGNsYXNzIGZvciB0aGVcbiAgICAvLyBjb21wb25lbnQuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdTdWJjbGFzc2VzIG11c3Qgb3ZlcnJpZGUgZ2V0RGVmYXVsdEZvdW5kYXRpb24gdG8gcmV0dXJuIGEgcHJvcGVybHkgY29uZmlndXJlZCAnICtcbiAgICAgICdmb3VuZGF0aW9uIGNsYXNzJyk7XG4gIH1cblxuICBpbml0aWFsU3luY1dpdGhET00oKSB7XG4gICAgLy8gU3ViY2xhc3NlcyBzaG91bGQgb3ZlcnJpZGUgdGhpcyBtZXRob2QgaWYgdGhleSBuZWVkIHRvIHBlcmZvcm0gd29yayB0byBzeW5jaHJvbml6ZSB3aXRoIGEgaG9zdCBET01cbiAgICAvLyBvYmplY3QuIEFuIGV4YW1wbGUgb2YgdGhpcyB3b3VsZCBiZSBhIGZvcm0gY29udHJvbCB3cmFwcGVyIHRoYXQgbmVlZHMgdG8gc3luY2hyb25pemUgaXRzIGludGVybmFsIHN0YXRlXG4gICAgLy8gdG8gc29tZSBwcm9wZXJ0eSBvciBhdHRyaWJ1dGUgb2YgdGhlIGhvc3QgRE9NLiBQbGVhc2Ugbm90ZTogdGhpcyBpcyAqbm90KiB0aGUgcGxhY2UgdG8gcGVyZm9ybSBET01cbiAgICAvLyByZWFkcy93cml0ZXMgdGhhdCB3b3VsZCBjYXVzZSBsYXlvdXQgLyBwYWludCwgYXMgdGhpcyBpcyBjYWxsZWQgc3luY2hyb25vdXNseSBmcm9tIHdpdGhpbiB0aGUgY29uc3RydWN0b3IuXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgbWF5IGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZWxlYXNlIGFueSByZXNvdXJjZXMgLyBkZXJlZ2lzdGVyIGFueSBsaXN0ZW5lcnMgdGhleSBoYXZlXG4gICAgLy8gYXR0YWNoZWQuIEFuIGV4YW1wbGUgb2YgdGhpcyBtaWdodCBiZSBkZXJlZ2lzdGVyaW5nIGEgcmVzaXplIGV2ZW50IGZyb20gdGhlIHdpbmRvdyBvYmplY3QuXG4gICAgdGhpcy5mb3VuZGF0aW9uXy5kZXN0cm95KCk7XG4gIH1cblxuICAvKipcbiAgICogV3JhcHBlciBtZXRob2QgdG8gYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByb290IGVsZW1lbnQuIFRoaXMgaXMgbW9zdCB1c2VmdWwgd2hlblxuICAgKiBsaXN0ZW5pbmcgZm9yIGN1c3RvbSBldmVudHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBsaXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8uYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcmFwcGVyIG1ldGhvZCB0byByZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJvb3QgZWxlbWVudC4gVGhpcyBpcyBtb3N0IHVzZWZ1bCB3aGVuXG4gICAqIHVubGlzdGVuaW5nIGZvciBjdXN0b20gZXZlbnRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgdW5saXN0ZW4oZXZ0VHlwZSwgaGFuZGxlcikge1xuICAgIHRoaXMucm9vdF8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlcyBhIGNyb3NzLWJyb3dzZXItY29tcGF0aWJsZSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgY29tcG9uZW50IHJvb3Qgb2YgdGhlIGdpdmVuIHR5cGUsXG4gICAqIHdpdGggdGhlIGdpdmVuIGRhdGEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlXG4gICAqIEBwYXJhbSB7IU9iamVjdH0gZXZ0RGF0YVxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBzaG91bGRCdWJibGVcbiAgICovXG4gIGVtaXQoZXZ0VHlwZSwgZXZ0RGF0YSwgc2hvdWxkQnViYmxlID0gZmFsc2UpIHtcbiAgICBsZXQgZXZ0O1xuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGV2dCA9IG5ldyBDdXN0b21FdmVudChldnRUeXBlLCB7XG4gICAgICAgIGRldGFpbDogZXZ0RGF0YSxcbiAgICAgICAgYnViYmxlczogc2hvdWxkQnViYmxlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldnRUeXBlLCBzaG91bGRCdWJibGUsIGZhbHNlLCBldnREYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLnJvb3RfLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDb21wb25lbnQ7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBAdGVtcGxhdGUgQVxuICovXG5jbGFzcyBNRENGb3VuZGF0aW9uIHtcbiAgLyoqIEByZXR1cm4gZW51bXtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgLy8gQ2xhc3NlcyBleHRlbmRpbmcgTURDRm91bmRhdGlvbiBzaG91bGQgaW1wbGVtZW50IHRoaXMgbWV0aG9kIHRvIHJldHVybiBhbiBvYmplY3Qgd2hpY2ggZXhwb3J0cyBldmVyeVxuICAgIC8vIENTUyBjbGFzcyB0aGUgZm91bmRhdGlvbiBjbGFzcyBuZWVkcyBhcyBhIHByb3BlcnR5LiBlLmcuIHtBQ1RJVkU6ICdtZGMtY29tcG9uZW50LS1hY3RpdmUnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17c3RyaW5nc30gKi9cbiAgc3RhdGljIGdldCBzdHJpbmdzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gc2VtYW50aWMgc3RyaW5ncyBhcyBjb25zdGFudHMuIGUuZy4ge0FSSUFfUk9MRTogJ3RhYmxpc3QnfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW17bnVtYmVyc30gKi9cbiAgc3RhdGljIGdldCBudW1iZXJzKCkge1xuICAgIC8vIENsYXNzZXMgZXh0ZW5kaW5nIE1EQ0ZvdW5kYXRpb24gc2hvdWxkIGltcGxlbWVudCB0aGlzIG1ldGhvZCB0byByZXR1cm4gYW4gb2JqZWN0IHdoaWNoIGV4cG9ydHMgYWxsXG4gICAgLy8gb2YgaXRzIHNlbWFudGljIG51bWJlcnMgYXMgY29uc3RhbnRzLiBlLmcuIHtBTklNQVRJT05fREVMQVlfTVM6IDM1MH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKiogQHJldHVybiB7IU9iamVjdH0gKi9cbiAgc3RhdGljIGdldCBkZWZhdWx0QWRhcHRlcigpIHtcbiAgICAvLyBDbGFzc2VzIGV4dGVuZGluZyBNRENGb3VuZGF0aW9uIG1heSBjaG9vc2UgdG8gaW1wbGVtZW50IHRoaXMgZ2V0dGVyIGluIG9yZGVyIHRvIHByb3ZpZGUgYSBjb252ZW5pZW50XG4gICAgLy8gd2F5IG9mIHZpZXdpbmcgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIG9mIGFuIGFkYXB0ZXIuIEluIHRoZSBmdXR1cmUsIHRoaXMgY291bGQgYWxzbyBiZSB1c2VkIGZvciBhZGFwdGVyXG4gICAgLy8gdmFsaWRhdGlvbi5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBPX0gYWRhcHRlclxuICAgKi9cbiAgY29uc3RydWN0b3IoYWRhcHRlciA9IHt9KSB7XG4gICAgLyoqIEBwcm90ZWN0ZWQgeyFBfSAqL1xuICAgIHRoaXMuYWRhcHRlcl8gPSBhZGFwdGVyO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAvLyBTdWJjbGFzc2VzIHNob3VsZCBvdmVycmlkZSB0aGlzIG1ldGhvZCB0byBwZXJmb3JtIGluaXRpYWxpemF0aW9uIHJvdXRpbmVzIChyZWdpc3RlcmluZyBldmVudHMsIGV0Yy4pXG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIC8vIFN1YmNsYXNzZXMgc2hvdWxkIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIHBlcmZvcm0gZGUtaW5pdGlhbGl6YXRpb24gcm91dGluZXMgKGRlLXJlZ2lzdGVyaW5nIGV2ZW50cywgZXRjLilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3VuZGF0aW9uO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX0gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdGlvbi1jb250cm9sL2luZGV4JztcblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbMiwge1wiYXJnc1wiOiBcIm5vbmVcIn1dICovXG5cbi8qKlxuICogQWRhcHRlciBmb3IgTURDIENoZWNrYm94LiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGNsYXNzZXNcbiAqIC0gZG9tXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENDaGVja2JveEFkYXB0ZXIge1xuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIGF0dHJpYnV0ZSB3aXRoIGEgZ2l2ZW4gdmFsdWUgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgc2V0TmF0aXZlQ29udHJvbEF0dHIoYXR0ciwgdmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gYXR0cmlidXRlIGZyb20gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyXG4gICAqL1xuICByZW1vdmVOYXRpdmVDb250cm9sQXR0cihhdHRyKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyICovXG4gIHJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudExpc3RlbmVyfSBoYW5kbGVyICovXG4gIGRlcmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXIgKi9cbiAgcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXIgKi9cbiAgZGVyZWdpc3RlckNoYW5nZUhhbmRsZXIoaGFuZGxlcikge31cblxuICAvKiogQHJldHVybiB7IU1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX0gKi9cbiAgZ2V0TmF0aXZlQ29udHJvbCgpIHt9XG5cbiAgZm9yY2VMYXlvdXQoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0F0dGFjaGVkVG9ET00oKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENDaGVja2JveEFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqIEBjb25zdCB7c3RyaW5nfSAqL1xuY29uc3QgUk9PVCA9ICdtZGMtY2hlY2tib3gnO1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IGNzc0NsYXNzZXMgPSB7XG4gIFVQR1JBREVEOiAnbWRjLWNoZWNrYm94LS11cGdyYWRlZCcsXG4gIENIRUNLRUQ6ICdtZGMtY2hlY2tib3gtLWNoZWNrZWQnLFxuICBJTkRFVEVSTUlOQVRFOiAnbWRjLWNoZWNrYm94LS1pbmRldGVybWluYXRlJyxcbiAgRElTQUJMRUQ6ICdtZGMtY2hlY2tib3gtLWRpc2FibGVkJyxcbiAgQU5JTV9VTkNIRUNLRURfQ0hFQ0tFRDogJ21kYy1jaGVja2JveC0tYW5pbS11bmNoZWNrZWQtY2hlY2tlZCcsXG4gIEFOSU1fVU5DSEVDS0VEX0lOREVURVJNSU5BVEU6ICdtZGMtY2hlY2tib3gtLWFuaW0tdW5jaGVja2VkLWluZGV0ZXJtaW5hdGUnLFxuICBBTklNX0NIRUNLRURfVU5DSEVDS0VEOiAnbWRjLWNoZWNrYm94LS1hbmltLWNoZWNrZWQtdW5jaGVja2VkJyxcbiAgQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEU6ICdtZGMtY2hlY2tib3gtLWFuaW0tY2hlY2tlZC1pbmRldGVybWluYXRlJyxcbiAgQU5JTV9JTkRFVEVSTUlOQVRFX0NIRUNLRUQ6ICdtZGMtY2hlY2tib3gtLWFuaW0taW5kZXRlcm1pbmF0ZS1jaGVja2VkJyxcbiAgQU5JTV9JTkRFVEVSTUlOQVRFX1VOQ0hFQ0tFRDogJ21kYy1jaGVja2JveC0tYW5pbS1pbmRldGVybWluYXRlLXVuY2hlY2tlZCcsXG59O1xuXG4vKiogQGVudW0ge3N0cmluZ30gKi9cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIE5BVElWRV9DT05UUk9MX1NFTEVDVE9SOiBgLiR7Uk9PVH1fX25hdGl2ZS1jb250cm9sYCxcbiAgVFJBTlNJVElPTl9TVEFURV9JTklUOiAnaW5pdCcsXG4gIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRDogJ2NoZWNrZWQnLFxuICBUUkFOU0lUSU9OX1NUQVRFX1VOQ0hFQ0tFRDogJ3VuY2hlY2tlZCcsXG4gIFRSQU5TSVRJT05fU1RBVEVfSU5ERVRFUk1JTkFURTogJ2luZGV0ZXJtaW5hdGUnLFxuICBBUklBX0NIRUNLRURfQVRUUjogJ2FyaWEtY2hlY2tlZCcsXG4gIEFSSUFfQ0hFQ0tFRF9JTkRFVEVSTUlOQVRFX1ZBTFVFOiAnbWl4ZWQnLFxufTtcblxuLyoqIEBlbnVtIHtudW1iZXJ9ICovXG5jb25zdCBudW1iZXJzID0ge1xuICBBTklNX0VORF9MQVRDSF9NUzogMjUwLFxufTtcblxuZXhwb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDRm91bmRhdGlvbiBmcm9tICdAbWF0ZXJpYWwvYmFzZS9mb3VuZGF0aW9uJztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX0gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdGlvbi1jb250cm9sL2luZGV4JztcbmltcG9ydCBNRENDaGVja2JveEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKiogQGNvbnN0IHshQXJyYXk8c3RyaW5nPn0gKi9cbmNvbnN0IENCX1BST1RPX1BST1BTID0gWydjaGVja2VkJywgJ2luZGV0ZXJtaW5hdGUnXTtcblxuLyoqXG4gKiBAZXh0ZW5kcyB7TURDRm91bmRhdGlvbjwhTURDQ2hlY2tib3hBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDQ2hlY2tib3hGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIC8qKiBAcmV0dXJuIGVudW0ge2Nzc0NsYXNzZXN9ICovXG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge3N0cmluZ3N9ICovXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIGVudW0ge251bWJlcnN9ICovXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDQ2hlY2tib3hBZGFwdGVyfSAqL1xuICBzdGF0aWMgZ2V0IGRlZmF1bHRBZGFwdGVyKCkge1xuICAgIHJldHVybiAvKiogQHR5cGUgeyFNRENDaGVja2JveEFkYXB0ZXJ9ICovICh7XG4gICAgICBhZGRDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoLyogY2xhc3NOYW1lOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgc2V0TmF0aXZlQ29udHJvbEF0dHI6ICgvKiBhdHRyOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVtb3ZlTmF0aXZlQ29udHJvbEF0dHI6ICgvKiBhdHRyOiBzdHJpbmcgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQW5pbWF0aW9uRW5kSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyOiAoLyogaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVyQ2hhbmdlSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZ2V0TmF0aXZlQ29udHJvbDogKCkgPT4gLyogIU1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZSAqLyB7fSxcbiAgICAgIGZvcmNlTGF5b3V0OiAoKSA9PiB7fSxcbiAgICAgIGlzQXR0YWNoZWRUb0RPTTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXIpIHtcbiAgICBzdXBlcihPYmplY3QuYXNzaWduKE1EQ0NoZWNrYm94Rm91bmRhdGlvbi5kZWZhdWx0QWRhcHRlciwgYWRhcHRlcikpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtzdHJpbmd9ICovXG4gICAgdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV8gPSBzdHJpbmdzLlRSQU5TSVRJT05fU1RBVEVfSU5JVDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzXyA9ICcnO1xuXG4gICAgLyoqIEBwcml2YXRlIHtudW1iZXJ9ICovXG4gICAgdGhpcy5hbmltRW5kTGF0Y2hUaW1lcl8gPSAwO1xuXG4gICAgdGhpcy5hbmltRW5kSGFuZGxlcl8gPSAvKiogQHByaXZhdGUgeyFFdmVudExpc3RlbmVyfSAqLyAoXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZUFuaW1hdGlvbkVuZCgpKTtcblxuICAgIHRoaXMuY2hhbmdlSGFuZGxlcl8gPSAvKiogQHByaXZhdGUgeyFFdmVudExpc3RlbmVyfSAqLyAoXG4gICAgICAoKSA9PiB0aGlzLmhhbmRsZUNoYW5nZSgpKTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmN1cnJlbnRDaGVja1N0YXRlXyA9IHRoaXMuZGV0ZXJtaW5lQ2hlY2tTdGF0ZV8odGhpcy5nZXROYXRpdmVDb250cm9sXygpKTtcbiAgICB0aGlzLnVwZGF0ZUFyaWFDaGVja2VkXygpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoY3NzQ2xhc3Nlcy5VUEdSQURFRCk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckNoYW5nZUhhbmRsZXIodGhpcy5jaGFuZ2VIYW5kbGVyXyk7XG4gICAgdGhpcy5pbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18oKTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyKHRoaXMuY2hhbmdlSGFuZGxlcl8pO1xuICAgIHRoaXMudW5pbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18oKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc0NoZWNrZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5jaGVja2VkO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCAqL1xuICBzZXRDaGVja2VkKGNoZWNrZWQpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkuY2hlY2tlZCA9IGNoZWNrZWQ7XG4gIH1cblxuICAvKiogQHJldHVybiB7Ym9vbGVhbn0gKi9cbiAgaXNJbmRldGVybWluYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkuaW5kZXRlcm1pbmF0ZTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGluZGV0ZXJtaW5hdGUgKi9cbiAgc2V0SW5kZXRlcm1pbmF0ZShpbmRldGVybWluYXRlKSB7XG4gICAgdGhpcy5nZXROYXRpdmVDb250cm9sXygpLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmF0aXZlQ29udHJvbF8oKS5kaXNhYmxlZDtcbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVkICovXG4gIHNldERpc2FibGVkKGRpc2FibGVkKSB7XG4gICAgdGhpcy5nZXROYXRpdmVDb250cm9sXygpLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgaWYgKGRpc2FibGVkKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKGNzc0NsYXNzZXMuRElTQUJMRUQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHs/c3RyaW5nfSAqL1xuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROYXRpdmVDb250cm9sXygpLnZhbHVlO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7P3N0cmluZ30gdmFsdWUgKi9cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBhbmltYXRpb25lbmQgZXZlbnQgZm9yIHRoZSBjaGVja2JveFxuICAgKi9cbiAgaGFuZGxlQW5pbWF0aW9uRW5kKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1FbmRMYXRjaFRpbWVyXyk7XG4gICAgdGhpcy5hbmltRW5kTGF0Y2hUaW1lcl8gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3ModGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXIodGhpcy5hbmltRW5kSGFuZGxlcl8pO1xuICAgIH0sIG51bWJlcnMuQU5JTV9FTkRfTEFUQ0hfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGNoYW5nZSBldmVudCBmb3IgdGhlIGNoZWNrYm94XG4gICAqL1xuICBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgdGhpcy50cmFuc2l0aW9uQ2hlY2tTdGF0ZV8oKTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBpbnN0YWxsUHJvcGVydHlDaGFuZ2VIb29rc18oKSB7XG4gICAgY29uc3QgbmF0aXZlQ2IgPSB0aGlzLmdldE5hdGl2ZUNvbnRyb2xfKCk7XG4gICAgY29uc3QgY2JQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihuYXRpdmVDYik7XG5cbiAgICBDQl9QUk9UT19QUk9QUy5mb3JFYWNoKChjb250cm9sU3RhdGUpID0+IHtcbiAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNiUHJvdG8sIGNvbnRyb2xTdGF0ZSk7XG4gICAgICAvLyBXZSBoYXZlIHRvIGNoZWNrIGZvciB0aGlzIGRlc2NyaXB0b3IsIHNpbmNlIHNvbWUgYnJvd3NlcnMgKFNhZmFyaSkgZG9uJ3Qgc3VwcG9ydCBpdHMgcmV0dXJuLlxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NDk3MzlcbiAgICAgIGlmICh2YWxpZERlc2NyaXB0b3IoZGVzYykpIHtcbiAgICAgICAgY29uc3QgbmF0aXZlQ2JEZXNjID0gLyoqIEB0eXBlIHshT2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfSAqLyAoe1xuICAgICAgICAgIGdldDogZGVzYy5nZXQsXG4gICAgICAgICAgc2V0OiAoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGRlc2Muc2V0LmNhbGwobmF0aXZlQ2IsIHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNpdGlvbkNoZWNrU3RhdGVfKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGRlc2MuY29uZmlndXJhYmxlLFxuICAgICAgICAgIGVudW1lcmFibGU6IGRlc2MuZW51bWVyYWJsZSxcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXRpdmVDYiwgY29udHJvbFN0YXRlLCBuYXRpdmVDYkRlc2MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHVuaW5zdGFsbFByb3BlcnR5Q2hhbmdlSG9va3NfKCkge1xuICAgIGNvbnN0IG5hdGl2ZUNiID0gdGhpcy5nZXROYXRpdmVDb250cm9sXygpO1xuICAgIGNvbnN0IGNiUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YobmF0aXZlQ2IpO1xuXG4gICAgQ0JfUFJPVE9fUFJPUFMuZm9yRWFjaCgoY29udHJvbFN0YXRlKSA9PiB7XG4gICAgICBjb25zdCBkZXNjID0gLyoqIEB0eXBlIHshT2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfSAqLyAoXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY2JQcm90bywgY29udHJvbFN0YXRlKSk7XG4gICAgICBpZiAodmFsaWREZXNjcmlwdG9yKGRlc2MpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXRpdmVDYiwgY29udHJvbFN0YXRlLCBkZXNjKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICB0cmFuc2l0aW9uQ2hlY2tTdGF0ZV8oKSB7XG4gICAgY29uc3QgbmF0aXZlQ2IgPSB0aGlzLmFkYXB0ZXJfLmdldE5hdGl2ZUNvbnRyb2woKTtcbiAgICBpZiAoIW5hdGl2ZUNiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV87XG4gICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmRldGVybWluZUNoZWNrU3RhdGVfKG5hdGl2ZUNiKTtcbiAgICBpZiAob2xkU3RhdGUgPT09IG5ld1N0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBcmlhQ2hlY2tlZF8oKTtcblxuICAgIC8vIENoZWNrIHRvIGVuc3VyZSB0aGF0IHRoZXJlIGlzbid0IGEgcHJldmlvdXNseSBleGlzdGluZyBhbmltYXRpb24gY2xhc3MsIGluIGNhc2UgZm9yIGV4YW1wbGVcbiAgICAvLyB0aGUgdXNlciBpbnRlcmFjdGVkIHdpdGggdGhlIGNoZWNrYm94IGJlZm9yZSB0aGUgYW5pbWF0aW9uIHdhcyBmaW5pc2hlZC5cbiAgICBpZiAodGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfLmxlbmd0aCA+IDApIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmFuaW1FbmRMYXRjaFRpbWVyXyk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmZvcmNlTGF5b3V0KCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKHRoaXMuY3VycmVudEFuaW1hdGlvbkNsYXNzXyk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfID0gdGhpcy5nZXRUcmFuc2l0aW9uQW5pbWF0aW9uQ2xhc3NfKG9sZFN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgdGhpcy5jdXJyZW50Q2hlY2tTdGF0ZV8gPSBuZXdTdGF0ZTtcblxuICAgIC8vIENoZWNrIGZvciBwYXJlbnROb2RlIHNvIHRoYXQgYW5pbWF0aW9ucyBhcmUgb25seSBydW4gd2hlbiB0aGUgZWxlbWVudCBpcyBhdHRhY2hlZFxuICAgIC8vIHRvIHRoZSBET00uXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNBdHRhY2hlZFRvRE9NKCkgJiYgdGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3ModGhpcy5jdXJyZW50QW5pbWF0aW9uQ2xhc3NfKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyKHRoaXMuYW5pbUVuZEhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshTURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfSBuYXRpdmVDYlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXRlcm1pbmVDaGVja1N0YXRlXyhuYXRpdmVDYikge1xuICAgIGNvbnN0IHtcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfSU5ERVRFUk1JTkFURSxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRCxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VELFxuICAgIH0gPSBzdHJpbmdzO1xuXG4gICAgaWYgKG5hdGl2ZUNiLmluZGV0ZXJtaW5hdGUpIHtcbiAgICAgIHJldHVybiBUUkFOU0lUSU9OX1NUQVRFX0lOREVURVJNSU5BVEU7XG4gICAgfVxuICAgIHJldHVybiBuYXRpdmVDYi5jaGVja2VkID8gVFJBTlNJVElPTl9TVEFURV9DSEVDS0VEIDogVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFN0YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdTdGF0ZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBnZXRUcmFuc2l0aW9uQW5pbWF0aW9uQ2xhc3NfKG9sZFN0YXRlLCBuZXdTdGF0ZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfSU5JVCxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRCxcbiAgICAgIFRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VELFxuICAgIH0gPSBzdHJpbmdzO1xuXG4gICAgY29uc3Qge1xuICAgICAgQU5JTV9VTkNIRUNLRURfQ0hFQ0tFRCxcbiAgICAgIEFOSU1fVU5DSEVDS0VEX0lOREVURVJNSU5BVEUsXG4gICAgICBBTklNX0NIRUNLRURfVU5DSEVDS0VELFxuICAgICAgQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEUsXG4gICAgICBBTklNX0lOREVURVJNSU5BVEVfQ0hFQ0tFRCxcbiAgICAgIEFOSU1fSU5ERVRFUk1JTkFURV9VTkNIRUNLRUQsXG4gICAgfSA9IE1EQ0NoZWNrYm94Rm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuXG4gICAgc3dpdGNoIChvbGRTdGF0ZSkge1xuICAgIGNhc2UgVFJBTlNJVElPTl9TVEFURV9JTklUOlxuICAgICAgaWYgKG5ld1N0YXRlID09PSBUUkFOU0lUSU9OX1NUQVRFX1VOQ0hFQ0tFRCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgLy8gZmFsbHRocm91Z2hcbiAgICBjYXNlIFRSQU5TSVRJT05fU1RBVEVfVU5DSEVDS0VEOlxuICAgICAgcmV0dXJuIG5ld1N0YXRlID09PSBUUkFOU0lUSU9OX1NUQVRFX0NIRUNLRUQgPyBBTklNX1VOQ0hFQ0tFRF9DSEVDS0VEIDogQU5JTV9VTkNIRUNLRURfSU5ERVRFUk1JTkFURTtcbiAgICBjYXNlIFRSQU5TSVRJT05fU1RBVEVfQ0hFQ0tFRDpcbiAgICAgIHJldHVybiBuZXdTdGF0ZSA9PT0gVFJBTlNJVElPTl9TVEFURV9VTkNIRUNLRUQgPyBBTklNX0NIRUNLRURfVU5DSEVDS0VEIDogQU5JTV9DSEVDS0VEX0lOREVURVJNSU5BVEU7XG4gICAgLy8gVFJBTlNJVElPTl9TVEFURV9JTkRFVEVSTUlOQVRFXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBuZXdTdGF0ZSA9PT0gVFJBTlNJVElPTl9TVEFURV9DSEVDS0VEID9cbiAgICAgICAgQU5JTV9JTkRFVEVSTUlOQVRFX0NIRUNLRUQgOiBBTklNX0lOREVURVJNSU5BVEVfVU5DSEVDS0VEO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUFyaWFDaGVja2VkXygpIHtcbiAgICAvLyBFbnN1cmUgYXJpYS1jaGVja2VkIGlzIHNldCB0byBtaXhlZCBpZiBjaGVja2JveCBpcyBpbiBpbmRldGVybWluYXRlIHN0YXRlLlxuICAgIGlmICh0aGlzLmlzSW5kZXRlcm1pbmF0ZSgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnNldE5hdGl2ZUNvbnRyb2xBdHRyKFxuICAgICAgICBzdHJpbmdzLkFSSUFfQ0hFQ0tFRF9BVFRSLCBzdHJpbmdzLkFSSUFfQ0hFQ0tFRF9JTkRFVEVSTUlOQVRFX1ZBTFVFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVOYXRpdmVDb250cm9sQXR0cihzdHJpbmdzLkFSSUFfQ0hFQ0tFRF9BVFRSKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE5hdGl2ZUNvbnRyb2xfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmdldE5hdGl2ZUNvbnRyb2woKSB8fCB7XG4gICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgIGluZGV0ZXJtaW5hdGU6IGZhbHNlLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgfTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0UHJvcGVydHlEZXNjcmlwdG9yfHVuZGVmaW5lZH0gaW5wdXRQcm9wRGVzY1xuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gdmFsaWREZXNjcmlwdG9yKGlucHV0UHJvcERlc2MpIHtcbiAgcmV0dXJuICEhaW5wdXRQcm9wRGVzYyAmJiB0eXBlb2YgaW5wdXRQcm9wRGVzYy5zZXQgPT09ICdmdW5jdGlvbic7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ0NoZWNrYm94Rm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge2dldENvcnJlY3RFdmVudE5hbWV9IGZyb20gJ0BtYXRlcmlhbC9hbmltYXRpb24vaW5kZXgnO1xuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlLCBNRENTZWxlY3Rpb25Db250cm9sfSBmcm9tICdAbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbnRyb2wvaW5kZXgnO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IE1EQ0NoZWNrYm94Rm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuaW1wb3J0IHtNRENSaXBwbGUsIE1EQ1JpcHBsZUZvdW5kYXRpb259IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvaW5kZXgnO1xuaW1wb3J0IHtnZXRNYXRjaGVzUHJvcGVydHl9IGZyb20gJ0BtYXRlcmlhbC9yaXBwbGUvdXRpbCc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENDaGVja2JveEZvdW5kYXRpb24+XG4gKiBAaW1wbGVtZW50cyB7TURDU2VsZWN0aW9uQ29udHJvbH1cbiAqL1xuY2xhc3MgTURDQ2hlY2tib3ggZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICBzdGF0aWMgYXR0YWNoVG8ocm9vdCkge1xuICAgIHJldHVybiBuZXcgTURDQ2hlY2tib3gocm9vdCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc3RhdGUgb2YgdGhlIG5hdGl2ZSBjb250cm9sIGVsZW1lbnQsIG9yIG51bGwgaWYgdGhlIG5hdGl2ZSBjb250cm9sIGVsZW1lbnQgaXMgbm90IHByZXNlbnQuXG4gICAqIEByZXR1cm4gez9NRENTZWxlY3Rpb25Db250cm9sU3RhdGV9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXQgbmF0aXZlQ2JfKCkge1xuICAgIGNvbnN0IHtOQVRJVkVfQ09OVFJPTF9TRUxFQ1RPUn0gPSBNRENDaGVja2JveEZvdW5kYXRpb24uc3RyaW5ncztcbiAgICBjb25zdCBjYkVsID0gLyoqIEB0eXBlIHs/TURDU2VsZWN0aW9uQ29udHJvbFN0YXRlfSAqLyAoXG4gICAgICB0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoTkFUSVZFX0NPTlRST0xfU0VMRUNUT1IpKTtcbiAgICByZXR1cm4gY2JFbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IU1EQ1JpcHBsZX0gKi9cbiAgICB0aGlzLnJpcHBsZV8gPSB0aGlzLmluaXRSaXBwbGVfKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGluaXRSaXBwbGVfKCkge1xuICAgIGNvbnN0IE1BVENIRVMgPSBnZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcbiAgICBjb25zdCBhZGFwdGVyID0gT2JqZWN0LmFzc2lnbihNRENSaXBwbGUuY3JlYXRlQWRhcHRlcih0aGlzKSwge1xuICAgICAgaXNVbmJvdW5kZWQ6ICgpID0+IHRydWUsXG4gICAgICBpc1N1cmZhY2VBY3RpdmU6ICgpID0+IHRoaXMubmF0aXZlQ2JfW01BVENIRVNdKCc6YWN0aXZlJyksXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKHR5cGUsIGhhbmRsZXIpID0+IHRoaXMubmF0aXZlQ2JfLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciksXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4gdGhpcy5uYXRpdmVDYl8ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICB9KTtcbiAgICBjb25zdCBmb3VuZGF0aW9uID0gbmV3IE1EQ1JpcHBsZUZvdW5kYXRpb24oYWRhcHRlcik7XG4gICAgcmV0dXJuIG5ldyBNRENSaXBwbGUodGhpcy5yb290XywgZm91bmRhdGlvbik7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ0NoZWNrYm94Rm91bmRhdGlvbn0gKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENDaGVja2JveEZvdW5kYXRpb24oe1xuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMucm9vdF8uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpLFxuICAgICAgcmVtb3ZlQ2xhc3M6IChjbGFzc05hbWUpID0+IHRoaXMucm9vdF8uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpLFxuICAgICAgc2V0TmF0aXZlQ29udHJvbEF0dHI6IChhdHRyLCB2YWx1ZSkgPT4gdGhpcy5uYXRpdmVDYl8uc2V0QXR0cmlidXRlKGF0dHIsIHZhbHVlKSxcbiAgICAgIHJlbW92ZU5hdGl2ZUNvbnRyb2xBdHRyOiAoYXR0cikgPT4gdGhpcy5uYXRpdmVDYl8ucmVtb3ZlQXR0cmlidXRlKGF0dHIpLFxuICAgICAgcmVnaXN0ZXJBbmltYXRpb25FbmRIYW5kbGVyOlxuICAgICAgICAoaGFuZGxlcikgPT4gdGhpcy5yb290Xy5hZGRFdmVudExpc3RlbmVyKGdldENvcnJlY3RFdmVudE5hbWUod2luZG93LCAnYW5pbWF0aW9uZW5kJyksIGhhbmRsZXIpLFxuICAgICAgZGVyZWdpc3RlckFuaW1hdGlvbkVuZEhhbmRsZXI6XG4gICAgICAgIChoYW5kbGVyKSA9PiB0aGlzLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZ2V0Q29ycmVjdEV2ZW50TmFtZSh3aW5kb3csICdhbmltYXRpb25lbmQnKSwgaGFuZGxlciksXG4gICAgICByZWdpc3RlckNoYW5nZUhhbmRsZXI6IChoYW5kbGVyKSA9PiB0aGlzLm5hdGl2ZUNiXy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJDaGFuZ2VIYW5kbGVyOiAoaGFuZGxlcikgPT4gdGhpcy5uYXRpdmVDYl8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaGFuZGxlciksXG4gICAgICBnZXROYXRpdmVDb250cm9sOiAoKSA9PiB0aGlzLm5hdGl2ZUNiXyxcbiAgICAgIGZvcmNlTGF5b3V0OiAoKSA9PiB0aGlzLnJvb3RfLm9mZnNldFdpZHRoLFxuICAgICAgaXNBdHRhY2hlZFRvRE9NOiAoKSA9PiBCb29sZWFuKHRoaXMucm9vdF8ucGFyZW50Tm9kZSksXG4gICAgfSk7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ1JpcHBsZX0gKi9cbiAgZ2V0IHJpcHBsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yaXBwbGVfO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBjaGVja2VkKCkge1xuICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb25fLmlzQ2hlY2tlZCgpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tlZCAqL1xuICBzZXQgY2hlY2tlZChjaGVja2VkKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRDaGVja2VkKGNoZWNrZWQpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBpbmRldGVybWluYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmZvdW5kYXRpb25fLmlzSW5kZXRlcm1pbmF0ZSgpO1xuICB9XG5cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gaW5kZXRlcm1pbmF0ZSAqL1xuICBzZXQgaW5kZXRlcm1pbmF0ZShpbmRldGVybWluYXRlKSB7XG4gICAgdGhpcy5mb3VuZGF0aW9uXy5zZXRJbmRldGVybWluYXRlKGluZGV0ZXJtaW5hdGUpO1xuICB9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGdldCBkaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3VuZGF0aW9uXy5pc0Rpc2FibGVkKCk7XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAqL1xuICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLnNldERpc2FibGVkKGRpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHs/c3RyaW5nfSAqL1xuICBnZXQgdmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm91bmRhdGlvbl8uZ2V0VmFsdWUoKTtcbiAgfVxuXG4gIC8qKiBAcGFyYW0gez9zdHJpbmd9IHZhbHVlICovXG4gIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLnJpcHBsZV8uZGVzdHJveSgpO1xuICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgfVxufVxuXG5leHBvcnQge01EQ0NoZWNrYm94Rm91bmRhdGlvbiwgTURDQ2hlY2tib3h9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBGb3JtIEZpZWxkLiBQcm92aWRlcyBhbiBpbnRlcmZhY2UgZm9yIG1hbmFnaW5nXG4gKiAtIGV2ZW50IGhhbmRsZXJzXG4gKiAtIHJpcHBsZSBhY3RpdmF0aW9uXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENGb3JtRmllbGRBZGFwdGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7IUV2ZW50TGlzdGVuZXJ9IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgaGFuZGxlcikge31cblxuICBhY3RpdmF0ZUlucHV0UmlwcGxlKCkge31cblxuICBkZWFjdGl2YXRlSW5wdXRSaXBwbGUoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNRENGb3JtRmllbGRBZGFwdGVyO1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgUk9PVDogJ21kYy1mb3JtLWZpZWxkJyxcbn07XG5cbi8qKiBAZW51bSB7c3RyaW5nfSAqL1xuY29uc3Qgc3RyaW5ncyA9IHtcbiAgTEFCRUxfU0VMRUNUT1I6ICcubWRjLWZvcm0tZmllbGQgPiBsYWJlbCcsXG59O1xuXG5leHBvcnQge2Nzc0NsYXNzZXMsIHN0cmluZ3N9O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCBNRENGb3VuZGF0aW9uIGZyb20gJ0BtYXRlcmlhbC9iYXNlL2ZvdW5kYXRpb24nO1xuaW1wb3J0IE1EQ0Zvcm1GaWVsZEFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5nc30gZnJvbSAnLi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEBleHRlbmRzIHtNRENGb3VuZGF0aW9uPCFNRENGb3JtRmllbGRBZGFwdGVyPn1cbiAqL1xuY2xhc3MgTURDRm9ybUZpZWxkRm91bmRhdGlvbiBleHRlbmRzIE1EQ0ZvdW5kYXRpb24ge1xuICAvKiogQHJldHVybiBlbnVtIHtjc3NDbGFzc2VzfSAqL1xuICBzdGF0aWMgZ2V0IGNzc0NsYXNzZXMoKSB7XG4gICAgcmV0dXJuIGNzc0NsYXNzZXM7XG4gIH1cblxuICAvKiogQHJldHVybiBlbnVtIHtzdHJpbmdzfSAqL1xuICBzdGF0aWMgZ2V0IHN0cmluZ3MoKSB7XG4gICAgcmV0dXJuIHN0cmluZ3M7XG4gIH1cblxuICAvKiogQHJldHVybiB7IU1EQ0Zvcm1GaWVsZEFkYXB0ZXJ9ICovXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogdHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiB0eXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgYWN0aXZhdGVJbnB1dFJpcHBsZTogKCkgPT4ge30sXG4gICAgICBkZWFjdGl2YXRlSW5wdXRSaXBwbGU6ICgpID0+IHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENGb3JtRmllbGRGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFFdmVudExpc3RlbmVyfSAqL1xuICAgIHRoaXMuY2xpY2tIYW5kbGVyXyA9IC8qKiBAdHlwZSB7IUV2ZW50TGlzdGVuZXJ9ICovIChcbiAgICAgICgpID0+IHRoaXMuaGFuZGxlQ2xpY2tfKCkpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKCdjbGljaycsIHRoaXMuY2xpY2tIYW5kbGVyXyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignY2xpY2snLCB0aGlzLmNsaWNrSGFuZGxlcl8pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGhhbmRsZUNsaWNrXygpIHtcbiAgICB0aGlzLmFkYXB0ZXJfLmFjdGl2YXRlSW5wdXRSaXBwbGUoKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hZGFwdGVyXy5kZWFjdGl2YXRlSW5wdXRSaXBwbGUoKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTURDRm9ybUZpZWxkRm91bmRhdGlvbjtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgTURDQ29tcG9uZW50IGZyb20gJ0BtYXRlcmlhbC9iYXNlL2NvbXBvbmVudCc7XG5pbXBvcnQgTURDRm9ybUZpZWxkRm91bmRhdGlvbiBmcm9tICcuL2ZvdW5kYXRpb24nO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDU2VsZWN0aW9uQ29udHJvbH0gZnJvbSAnQG1hdGVyaWFsL3NlbGVjdGlvbi1jb250cm9sL2luZGV4Jztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAZXh0ZW5kcyBNRENDb21wb25lbnQ8IU1EQ0Zvcm1GaWVsZEZvdW5kYXRpb24+XG4gKi9cbmNsYXNzIE1EQ0Zvcm1GaWVsZCBleHRlbmRzIE1EQ0NvbXBvbmVudCB7XG4gIHN0YXRpYyBhdHRhY2hUbyhyb290KSB7XG4gICAgcmV0dXJuIG5ldyBNRENGb3JtRmllbGQocm9vdCk7XG4gIH1cblxuICAvKiogQHBhcmFtIHs/TURDU2VsZWN0aW9uQ29udHJvbH0gaW5wdXQgKi9cbiAgc2V0IGlucHV0KGlucHV0KSB7XG4gICAgdGhpcy5pbnB1dF8gPSBpbnB1dDtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHs/TURDU2VsZWN0aW9uQ29udHJvbH0gKi9cbiAgZ2V0IGlucHV0KCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0XztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7P01EQ1NlbGVjdGlvbkNvbnRyb2x9ICovXG4gICAgdGhpcy5pbnB1dF87XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IUVsZW1lbnR9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXQgbGFiZWxfKCkge1xuICAgIGNvbnN0IHtMQUJFTF9TRUxFQ1RPUn0gPSBNRENGb3JtRmllbGRGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgcmV0dXJuIC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovICh0aGlzLnJvb3RfLnF1ZXJ5U2VsZWN0b3IoTEFCRUxfU0VMRUNUT1IpKTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHshTURDRm9ybUZpZWxkRm91bmRhdGlvbn0gKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENGb3JtRmllbGRGb3VuZGF0aW9uKHtcbiAgICAgIHJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAodHlwZSwgaGFuZGxlcikgPT4gdGhpcy5sYWJlbF8uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6ICh0eXBlLCBoYW5kbGVyKSA9PiB0aGlzLmxhYmVsXy5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpLFxuICAgICAgYWN0aXZhdGVJbnB1dFJpcHBsZTogKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbnB1dF8gJiYgdGhpcy5pbnB1dF8ucmlwcGxlKSB7XG4gICAgICAgICAgdGhpcy5pbnB1dF8ucmlwcGxlLmFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZWFjdGl2YXRlSW5wdXRSaXBwbGU6ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRfICYmIHRoaXMuaW5wdXRfLnJpcHBsZSkge1xuICAgICAgICAgIHRoaXMuaW5wdXRfLnJpcHBsZS5kZWFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHtNRENGb3JtRmllbGQsIE1EQ0Zvcm1GaWVsZEZvdW5kYXRpb259O1xuIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTYgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogWzIsIHtcImFyZ3NcIjogXCJub25lXCJ9XSAqL1xuXG4vKipcbiAqIEFkYXB0ZXIgZm9yIE1EQyBSaXBwbGUuIFByb3ZpZGVzIGFuIGludGVyZmFjZSBmb3IgbWFuYWdpbmdcbiAqIC0gY2xhc3Nlc1xuICogLSBkb21cbiAqIC0gQ1NTIHZhcmlhYmxlc1xuICogLSBwb3NpdGlvblxuICogLSBkaW1lbnNpb25zXG4gKiAtIHNjcm9sbCBwb3NpdGlvblxuICogLSBldmVudCBoYW5kbGVyc1xuICogLSB1bmJvdW5kZWQsIGFjdGl2ZSBhbmQgZGlzYWJsZWQgc3RhdGVzXG4gKlxuICogQWRkaXRpb25hbGx5LCBwcm92aWRlcyB0eXBlIGluZm9ybWF0aW9uIGZvciB0aGUgYWRhcHRlciB0byB0aGUgQ2xvc3VyZVxuICogY29tcGlsZXIuXG4gKlxuICogSW1wbGVtZW50IHRoaXMgYWRhcHRlciBmb3IgeW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlIHRvIGRlbGVnYXRlIHVwZGF0ZXMgdG9cbiAqIHRoZSBjb21wb25lbnQgaW4geW91ciBmcmFtZXdvcmsgb2YgY2hvaWNlLiBTZWUgYXJjaGl0ZWN0dXJlIGRvY3VtZW50YXRpb25cbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbWF0ZXJpYWwtY29tcG9uZW50cy9tYXRlcmlhbC1jb21wb25lbnRzLXdlYi9ibG9iL21hc3Rlci9kb2NzL2NvZGUvYXJjaGl0ZWN0dXJlLm1kXG4gKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENSaXBwbGVBZGFwdGVyIHtcbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKSB7fVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBpc1VuYm91bmRlZCgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZUFjdGl2ZSgpIHt9XG5cbiAgLyoqIEByZXR1cm4ge2Jvb2xlYW59ICovXG4gIGlzU3VyZmFjZURpc2FibGVkKCkge31cblxuICAvKiogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZSAqL1xuICBhZGRDbGFzcyhjbGFzc05hbWUpIHt9XG5cbiAgLyoqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWUgKi9cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7fVxuXG4gIC8qKiBAcGFyYW0geyFFdmVudFRhcmdldH0gdGFyZ2V0ICovXG4gIGNvbnRhaW5zRXZlbnRUYXJnZXQodGFyZ2V0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZVxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIoZXZ0VHlwZSwgaGFuZGxlcikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGVcbiAgICogQHBhcmFtIHshRnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIGRlcmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcihldnRUeXBlLCBoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyFGdW5jdGlvbn0gaGFuZGxlclxuICAgKi9cbiAgcmVnaXN0ZXJSZXNpemVIYW5kbGVyKGhhbmRsZXIpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUZ1bmN0aW9ufSBoYW5kbGVyXG4gICAqL1xuICBkZXJlZ2lzdGVyUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdmFyTmFtZVxuICAgKiBAcGFyYW0gez9udW1iZXJ8c3RyaW5nfSB2YWx1ZVxuICAgKi9cbiAgdXBkYXRlQ3NzVmFyaWFibGUodmFyTmFtZSwgdmFsdWUpIHt9XG5cbiAgLyoqIEByZXR1cm4geyFDbGllbnRSZWN0fSAqL1xuICBjb21wdXRlQm91bmRpbmdSZWN0KCkge31cblxuICAvKiogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gKi9cbiAgZ2V0V2luZG93UGFnZU9mZnNldCgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUFkYXB0ZXI7XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgY3NzQ2xhc3NlcyA9IHtcbiAgLy8gUmlwcGxlIGlzIGEgc3BlY2lhbCBjYXNlIHdoZXJlIHRoZSBcInJvb3RcIiBjb21wb25lbnQgaXMgcmVhbGx5IGEgXCJtaXhpblwiIG9mIHNvcnRzLFxuICAvLyBnaXZlbiB0aGF0IGl0J3MgYW4gJ3VwZ3JhZGUnIHRvIGFuIGV4aXN0aW5nIGNvbXBvbmVudC4gVGhhdCBiZWluZyBzYWlkIGl0IGlzIHRoZSByb290XG4gIC8vIENTUyBjbGFzcyB0aGF0IGFsbCBvdGhlciBDU1MgY2xhc3NlcyBkZXJpdmUgZnJvbS5cbiAgUk9PVDogJ21kYy1yaXBwbGUtdXBncmFkZWQnLFxuICBVTkJPVU5ERUQ6ICdtZGMtcmlwcGxlLXVwZ3JhZGVkLS11bmJvdW5kZWQnLFxuICBCR19GT0NVU0VEOiAnbWRjLXJpcHBsZS11cGdyYWRlZC0tYmFja2dyb3VuZC1mb2N1c2VkJyxcbiAgRkdfQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtYWN0aXZhdGlvbicsXG4gIEZHX0RFQUNUSVZBVElPTjogJ21kYy1yaXBwbGUtdXBncmFkZWQtLWZvcmVncm91bmQtZGVhY3RpdmF0aW9uJyxcbn07XG5cbmNvbnN0IHN0cmluZ3MgPSB7XG4gIFZBUl9MRUZUOiAnLS1tZGMtcmlwcGxlLWxlZnQnLFxuICBWQVJfVE9QOiAnLS1tZGMtcmlwcGxlLXRvcCcsXG4gIFZBUl9GR19TSVpFOiAnLS1tZGMtcmlwcGxlLWZnLXNpemUnLFxuICBWQVJfRkdfU0NBTEU6ICctLW1kYy1yaXBwbGUtZmctc2NhbGUnLFxuICBWQVJfRkdfVFJBTlNMQVRFX1NUQVJUOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1zdGFydCcsXG4gIFZBUl9GR19UUkFOU0xBVEVfRU5EOiAnLS1tZGMtcmlwcGxlLWZnLXRyYW5zbGF0ZS1lbmQnLFxufTtcblxuY29uc3QgbnVtYmVycyA9IHtcbiAgUEFERElORzogMTAsXG4gIElOSVRJQUxfT1JJR0lOX1NDQUxFOiAwLjYsXG4gIERFQUNUSVZBVElPTl9USU1FT1VUX01TOiAyMjUsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLXRyYW5zbGF0ZS1kdXJhdGlvbiAoaS5lLiBhY3RpdmF0aW9uIGFuaW1hdGlvbiBkdXJhdGlvbilcbiAgRkdfREVBQ1RJVkFUSU9OX01TOiAxNTAsIC8vIENvcnJlc3BvbmRzIHRvICRtZGMtcmlwcGxlLWZhZGUtb3V0LWR1cmF0aW9uIChpLmUuIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gZHVyYXRpb24pXG4gIFRBUF9ERUxBWV9NUzogMzAwLCAvLyBEZWxheSBiZXR3ZWVuIHRvdWNoIGFuZCBzaW11bGF0ZWQgbW91c2UgZXZlbnRzIG9uIHRvdWNoIGRldmljZXNcbn07XG5cbmV4cG9ydCB7Y3NzQ2xhc3Nlcywgc3RyaW5ncywgbnVtYmVyc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0ZvdW5kYXRpb24gZnJvbSAnQG1hdGVyaWFsL2Jhc2UvZm91bmRhdGlvbic7XG5pbXBvcnQgTURDUmlwcGxlQWRhcHRlciBmcm9tICcuL2FkYXB0ZXInO1xuaW1wb3J0IHtjc3NDbGFzc2VzLCBzdHJpbmdzLCBudW1iZXJzfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge2dldE5vcm1hbGl6ZWRFdmVudENvb3Jkc30gZnJvbSAnLi91dGlsJztcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBpc0FjdGl2YXRlZDogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgaGFzRGVhY3RpdmF0aW9uVVhSdW46IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcjogKGJvb2xlYW58dW5kZWZpbmVkKSxcbiAqICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IChib29sZWFufHVuZGVmaW5lZCksXG4gKiAgIGFjdGl2YXRpb25FdmVudDogRXZlbnQsXG4gKiAgIGlzUHJvZ3JhbW1hdGljOiAoYm9vbGVhbnx1bmRlZmluZWQpXG4gKiB9fVxuICovXG5sZXQgQWN0aXZhdGlvblN0YXRlVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBhY3RpdmF0ZTogKHN0cmluZ3x1bmRlZmluZWQpLFxuICogICBkZWFjdGl2YXRlOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGZvY3VzOiAoc3RyaW5nfHVuZGVmaW5lZCksXG4gKiAgIGJsdXI6IChzdHJpbmd8dW5kZWZpbmVkKVxuICogfX1cbiAqL1xubGV0IExpc3RlbmVySW5mb1R5cGU7XG5cbi8qKlxuICogQHR5cGVkZWYge3tcbiAqICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKCFFdmVudCksXG4gKiAgIGZvY3VzOiBmdW5jdGlvbigpLFxuICogICBibHVyOiBmdW5jdGlvbigpXG4gKiB9fVxuICovXG5sZXQgTGlzdGVuZXJzVHlwZTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICB4OiBudW1iZXIsXG4gKiAgIHk6IG51bWJlclxuICogfX1cbiAqL1xubGV0IFBvaW50VHlwZTtcblxuLy8gQWN0aXZhdGlvbiBldmVudHMgcmVnaXN0ZXJlZCBvbiB0aGUgcm9vdCBlbGVtZW50IG9mIGVhY2ggaW5zdGFuY2UgZm9yIGFjdGl2YXRpb25cbmNvbnN0IEFDVElWQVRJT05fRVZFTlRfVFlQRVMgPSBbJ3RvdWNoc3RhcnQnLCAncG9pbnRlcmRvd24nLCAnbW91c2Vkb3duJywgJ2tleWRvd24nXTtcblxuLy8gRGVhY3RpdmF0aW9uIGV2ZW50cyByZWdpc3RlcmVkIG9uIGRvY3VtZW50RWxlbWVudCB3aGVuIGEgcG9pbnRlci1yZWxhdGVkIGRvd24gZXZlbnQgb2NjdXJzXG5jb25zdCBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUyA9IFsndG91Y2hlbmQnLCAncG9pbnRlcnVwJywgJ21vdXNldXAnXTtcblxuLy8gVHJhY2tzIGFjdGl2YXRpb25zIHRoYXQgaGF2ZSBvY2N1cnJlZCBvbiB0aGUgY3VycmVudCBmcmFtZSwgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIG5lc3RlZCBhY3RpdmF0aW9uc1xuLyoqIEB0eXBlIHshQXJyYXk8IUV2ZW50VGFyZ2V0Pn0gKi9cbmxldCBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbi8qKlxuICogQGV4dGVuZHMge01EQ0ZvdW5kYXRpb248IU1EQ1JpcHBsZUFkYXB0ZXI+fVxuICovXG5jbGFzcyBNRENSaXBwbGVGb3VuZGF0aW9uIGV4dGVuZHMgTURDRm91bmRhdGlvbiB7XG4gIHN0YXRpYyBnZXQgY3NzQ2xhc3NlcygpIHtcbiAgICByZXR1cm4gY3NzQ2xhc3NlcztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgc3RyaW5ncygpIHtcbiAgICByZXR1cm4gc3RyaW5ncztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgbnVtYmVycygpIHtcbiAgICByZXR1cm4gbnVtYmVycztcbiAgfVxuXG4gIHN0YXRpYyBnZXQgZGVmYXVsdEFkYXB0ZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnM6ICgpID0+IC8qIGJvb2xlYW4gLSBjYWNoZWQgKi8ge30sXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZUFjdGl2ZTogKCkgPT4gLyogYm9vbGVhbiAqLyB7fSxcbiAgICAgIGlzU3VyZmFjZURpc2FibGVkOiAoKSA9PiAvKiBib29sZWFuICovIHt9LFxuICAgICAgYWRkQ2xhc3M6ICgvKiBjbGFzc05hbWU6IHN0cmluZyAqLykgPT4ge30sXG4gICAgICByZW1vdmVDbGFzczogKC8qIGNsYXNzTmFtZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbnRhaW5zRXZlbnRUYXJnZXQ6ICgvKiB0YXJnZXQ6ICFFdmVudFRhcmdldCAqLykgPT4ge30sXG4gICAgICByZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKC8qIGV2dFR5cGU6IHN0cmluZywgaGFuZGxlcjogRXZlbnRMaXN0ZW5lciAqLykgPT4ge30sXG4gICAgICBkZXJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6ICgvKiBldnRUeXBlOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoLyogZXZ0VHlwZTogc3RyaW5nLCBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKC8qIGhhbmRsZXI6IEV2ZW50TGlzdGVuZXIgKi8pID0+IHt9LFxuICAgICAgZGVyZWdpc3RlclJlc2l6ZUhhbmRsZXI6ICgvKiBoYW5kbGVyOiBFdmVudExpc3RlbmVyICovKSA9PiB7fSxcbiAgICAgIHVwZGF0ZUNzc1ZhcmlhYmxlOiAoLyogdmFyTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nICovKSA9PiB7fSxcbiAgICAgIGNvbXB1dGVCb3VuZGluZ1JlY3Q6ICgpID0+IC8qIENsaWVudFJlY3QgKi8ge30sXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAvKiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9ICovIHt9LFxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyKSB7XG4gICAgc3VwZXIoT2JqZWN0LmFzc2lnbihNRENSaXBwbGVGb3VuZGF0aW9uLmRlZmF1bHRBZGFwdGVyLCBhZGFwdGVyKSk7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUgeyFDbGllbnRSZWN0fSAqL1xuICAgIHRoaXMuZnJhbWVfID0gLyoqIEB0eXBlIHshQ2xpZW50UmVjdH0gKi8gKHt3aWR0aDogMCwgaGVpZ2h0OiAwfSk7XG5cbiAgICAvKiogQHByaXZhdGUgeyFBY3RpdmF0aW9uU3RhdGVUeXBlfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuaW5pdGlhbFNpemVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMubWF4UmFkaXVzXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKCFFdmVudCl9ICovXG4gICAgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuYWN0aXZhdGVfKGUpO1xuXG4gICAgLyoqIEBwcml2YXRlIHtmdW5jdGlvbighRXZlbnQpfSAqL1xuICAgIHRoaXMuZGVhY3RpdmF0ZUhhbmRsZXJfID0gKGUpID0+IHRoaXMuZGVhY3RpdmF0ZV8oZSk7XG5cbiAgICAvKiogQHByaXZhdGUge2Z1bmN0aW9uKD9FdmVudD0pfSAqL1xuICAgIHRoaXMuZm9jdXNIYW5kbGVyXyA9ICgpID0+IHRoaXMuaGFuZGxlRm9jdXMoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7ZnVuY3Rpb24oP0V2ZW50PSl9ICovXG4gICAgdGhpcy5ibHVySGFuZGxlcl8gPSAoKSA9PiB0aGlzLmhhbmRsZUJsdXIoKTtcblxuICAgIC8qKiBAcHJpdmF0ZSB7IUZ1bmN0aW9ufSAqL1xuICAgIHRoaXMucmVzaXplSGFuZGxlcl8gPSAoKSA9PiB0aGlzLmxheW91dCgpO1xuXG4gICAgLyoqIEBwcml2YXRlIHt7bGVmdDogbnVtYmVyLCB0b3A6bnVtYmVyfX0gKi9cbiAgICB0aGlzLnVuYm91bmRlZENvb3Jkc18gPSB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnU2NhbGVfID0gMDtcblxuICAgIC8qKiBAcHJpdmF0ZSB7bnVtYmVyfSAqL1xuICAgIHRoaXMuYWN0aXZhdGlvblRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge251bWJlcn0gKi9cbiAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IDA7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy5hY3RpdmF0aW9uQW5pbWF0aW9uSGFzRW5kZWRfID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUgeyFGdW5jdGlvbn0gKi9cbiAgICB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXyA9ICgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGlvbkFuaW1hdGlvbkhhc0VuZGVkXyA9IHRydWU7XG4gICAgICB0aGlzLnJ1bkRlYWN0aXZhdGlvblVYTG9naWNJZlJlYWR5XygpO1xuICAgIH07XG5cbiAgICAvKiogQHByaXZhdGUgez9FdmVudH0gKi9cbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogV2UgY29tcHV0ZSB0aGlzIHByb3BlcnR5IHNvIHRoYXQgd2UgYXJlIG5vdCBxdWVyeWluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgY2xpZW50XG4gICAqIHVudGlsIHRoZSBwb2ludCBpbiB0aW1lIHdoZXJlIHRoZSBmb3VuZGF0aW9uIHJlcXVlc3RzIGl0LiBUaGlzIHByZXZlbnRzIHNjZW5hcmlvcyB3aGVyZVxuICAgKiBjbGllbnQtc2lkZSBmZWF0dXJlLWRldGVjdGlvbiBtYXkgaGFwcGVuIHRvbyBlYXJseSwgc3VjaCBhcyB3aGVuIGNvbXBvbmVudHMgYXJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXJcbiAgICogYW5kIHRoZW4gaW5pdGlhbGl6ZWQgYXQgbW91bnQgdGltZSBvbiB0aGUgY2xpZW50LlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNTdXBwb3J0ZWRfKCkge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXJfLmJyb3dzZXJTdXBwb3J0c0Nzc1ZhcnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHshQWN0aXZhdGlvblN0YXRlVHlwZX1cbiAgICovXG4gIGRlZmF1bHRBY3RpdmF0aW9uU3RhdGVfKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpc0FjdGl2YXRlZDogZmFsc2UsXG4gICAgICBoYXNEZWFjdGl2YXRpb25VWFJ1bjogZmFsc2UsXG4gICAgICB3YXNBY3RpdmF0ZWRCeVBvaW50ZXI6IGZhbHNlLFxuICAgICAgd2FzRWxlbWVudE1hZGVBY3RpdmU6IGZhbHNlLFxuICAgICAgYWN0aXZhdGlvbkV2ZW50OiBudWxsLFxuICAgICAgaXNQcm9ncmFtbWF0aWM6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhST09UKTtcbiAgICAgIGlmICh0aGlzLmFkYXB0ZXJfLmlzVW5ib3VuZGVkKCkpIHtcbiAgICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgICAgICAvLyBVbmJvdW5kZWQgcmlwcGxlcyBuZWVkIGxheW91dCBsb2dpYyBhcHBsaWVkIGltbWVkaWF0ZWx5IHRvIHNldCBjb29yZGluYXRlcyBmb3IgYm90aCBzaGFkZSBhbmQgcmlwcGxlXG4gICAgICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG92ZXJyaWRlICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLmlzU3VwcG9ydGVkXygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYWN0aXZhdGlvblRpbWVyXykge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYWN0aXZhdGlvblRpbWVyXyk7XG4gICAgICB0aGlzLmFjdGl2YXRpb25UaW1lcl8gPSAwO1xuICAgICAgY29uc3Qge0ZHX0FDVElWQVRJT059ID0gTURDUmlwcGxlRm91bmRhdGlvbi5jc3NDbGFzc2VzO1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlcmVnaXN0ZXJSb290SGFuZGxlcnNfKCk7XG4gICAgdGhpcy5kZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCk7XG5cbiAgICBjb25zdCB7Uk9PVCwgVU5CT1VOREVEfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3NlcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhST09UKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVtb3ZlQ2xhc3MoVU5CT1VOREVEKTtcbiAgICAgIHRoaXMucmVtb3ZlQ3NzVmFyc18oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICByZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVySW50ZXJhY3Rpb25IYW5kbGVyKHR5cGUsIHRoaXMuYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgfSk7XG4gICAgdGhpcy5hZGFwdGVyXy5yZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcignZm9jdXMnLCB0aGlzLmZvY3VzSGFuZGxlcl8pO1xuICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlZ2lzdGVyUmVzaXplSGFuZGxlcih0aGlzLnJlc2l6ZUhhbmRsZXJfKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshRXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2tleXVwJywgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBQT0lOVEVSX0RFQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8ucmVnaXN0ZXJEb2N1bWVudEludGVyYWN0aW9uSGFuZGxlcih0eXBlLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgZGVyZWdpc3RlclJvb3RIYW5kbGVyc18oKSB7XG4gICAgQUNUSVZBVElPTl9FVkVOVF9UWVBFUy5mb3JFYWNoKCh0eXBlKSA9PiB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5hY3RpdmF0ZUhhbmRsZXJfKTtcbiAgICB9KTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2ZvY3VzJywgdGhpcy5mb2N1c0hhbmRsZXJfKTtcbiAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXIoJ2JsdXInLCB0aGlzLmJsdXJIYW5kbGVyXyk7XG5cbiAgICBpZiAodGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpKSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyKHRoaXMucmVzaXplSGFuZGxlcl8pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBkZXJlZ2lzdGVyRGVhY3RpdmF0aW9uSGFuZGxlcnNfKCkge1xuICAgIHRoaXMuYWRhcHRlcl8uZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcigna2V5dXAnLCB0aGlzLmRlYWN0aXZhdGVIYW5kbGVyXyk7XG4gICAgUE9JTlRFUl9ERUFDVElWQVRJT05fRVZFTlRfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgICAgdGhpcy5hZGFwdGVyXy5kZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXIodHlwZSwgdGhpcy5kZWFjdGl2YXRlSGFuZGxlcl8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJlbW92ZUNzc1ZhcnNfKCkge1xuICAgIGNvbnN0IHtzdHJpbmdzfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4gICAgT2JqZWN0LmtleXMoc3RyaW5ncykuZm9yRWFjaCgoaykgPT4ge1xuICAgICAgaWYgKGsuaW5kZXhPZignVkFSXycpID09PSAwKSB7XG4gICAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoc3RyaW5nc1trXSwgbnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnR9IGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjdGl2YXRlXyhlKSB7XG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNTdXJmYWNlRGlzYWJsZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2YXRpb25TdGF0ZSA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXztcbiAgICBpZiAoYWN0aXZhdGlvblN0YXRlLmlzQWN0aXZhdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQXZvaWQgcmVhY3RpbmcgdG8gZm9sbG93LW9uIGV2ZW50cyBmaXJlZCBieSB0b3VjaCBkZXZpY2UgYWZ0ZXIgYW4gYWxyZWFkeS1wcm9jZXNzZWQgdXNlciBpbnRlcmFjdGlvblxuICAgIGNvbnN0IHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50ID0gdGhpcy5wcmV2aW91c0FjdGl2YXRpb25FdmVudF87XG4gICAgY29uc3QgaXNTYW1lSW50ZXJhY3Rpb24gPSBwcmV2aW91c0FjdGl2YXRpb25FdmVudCAmJiBlICYmIHByZXZpb3VzQWN0aXZhdGlvbkV2ZW50LnR5cGUgIT09IGUudHlwZTtcbiAgICBpZiAoaXNTYW1lSW50ZXJhY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUuaXNBY3RpdmF0ZWQgPSB0cnVlO1xuICAgIGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA9IGUgPT09IG51bGw7XG4gICAgYWN0aXZhdGlvblN0YXRlLmFjdGl2YXRpb25FdmVudCA9IGU7XG4gICAgYWN0aXZhdGlvblN0YXRlLndhc0FjdGl2YXRlZEJ5UG9pbnRlciA9IGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYyA/IGZhbHNlIDogKFxuICAgICAgZS50eXBlID09PSAnbW91c2Vkb3duJyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICdwb2ludGVyZG93bidcbiAgICApO1xuXG4gICAgY29uc3QgaGFzQWN0aXZhdGVkQ2hpbGQgPVxuICAgICAgZSAmJiBhY3RpdmF0ZWRUYXJnZXRzLmxlbmd0aCA+IDAgJiYgYWN0aXZhdGVkVGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHRoaXMuYWRhcHRlcl8uY29udGFpbnNFdmVudFRhcmdldCh0YXJnZXQpKTtcbiAgICBpZiAoaGFzQWN0aXZhdGVkQ2hpbGQpIHtcbiAgICAgIC8vIEltbWVkaWF0ZWx5IHJlc2V0IGFjdGl2YXRpb24gc3RhdGUsIHdoaWxlIHByZXNlcnZpbmcgbG9naWMgdGhhdCBwcmV2ZW50cyB0b3VjaCBmb2xsb3ctb24gZXZlbnRzXG4gICAgICB0aGlzLnJlc2V0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlKSB7XG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzLnB1c2goLyoqIEB0eXBlIHshRXZlbnRUYXJnZXR9ICovIChlLnRhcmdldCkpO1xuICAgICAgdGhpcy5yZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXyhlKTtcbiAgICB9XG5cbiAgICBhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUgPSB0aGlzLmNoZWNrRWxlbWVudE1hZGVBY3RpdmVfKGUpO1xuICAgIGlmIChhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIC8vIFJlc2V0IGFycmF5IG9uIG5leHQgZnJhbWUgYWZ0ZXIgdGhlIGN1cnJlbnQgZXZlbnQgaGFzIGhhZCBhIGNoYW5jZSB0byBidWJibGUgdG8gcHJldmVudCBhbmNlc3RvciByaXBwbGVzXG4gICAgICBhY3RpdmF0ZWRUYXJnZXRzID0gW107XG5cbiAgICAgIGlmICghYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlICYmIChlLmtleSA9PT0gJyAnIHx8IGUua2V5Q29kZSA9PT0gMzIpKSB7XG4gICAgICAgIC8vIElmIHNwYWNlIHdhcyBwcmVzc2VkLCB0cnkgYWdhaW4gd2l0aGluIGFuIHJBRiBjYWxsIHRvIGRldGVjdCA6YWN0aXZlLCBiZWNhdXNlIGRpZmZlcmVudCBVQXMgcmVwb3J0XG4gICAgICAgIC8vIGFjdGl2ZSBzdGF0ZXMgaW5jb25zaXN0ZW50bHkgd2hlbiB0aGV5J3JlIGNhbGxlZCB3aXRoaW4gZXZlbnQgaGFuZGxpbmcgY29kZTpcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD02MzU5NzFcbiAgICAgICAgLy8gLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMjkzNzQxXG4gICAgICAgIC8vIFdlIHRyeSBmaXJzdCBvdXRzaWRlIHJBRiB0byBzdXBwb3J0IEVkZ2UsIHdoaWNoIGRvZXMgbm90IGV4aGliaXQgdGhpcyBwcm9ibGVtLCBidXQgd2lsbCBjcmFzaCBpZiBhIENTU1xuICAgICAgICAvLyB2YXJpYWJsZSBpcyBzZXQgd2l0aGluIGEgckFGIGNhbGxiYWNrIGZvciBhIHN1Ym1pdCBidXR0b24gaW50ZXJhY3Rpb24gKCMyMjQxKS5cbiAgICAgICAgYWN0aXZhdGlvblN0YXRlLndhc0VsZW1lbnRNYWRlQWN0aXZlID0gdGhpcy5jaGVja0VsZW1lbnRNYWRlQWN0aXZlXyhlKTtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25TdGF0ZS53YXNFbGVtZW50TWFkZUFjdGl2ZSkge1xuICAgICAgICAgIHRoaXMuYW5pbWF0ZUFjdGl2YXRpb25fKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhY3RpdmF0aW9uU3RhdGUud2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgICAgLy8gUmVzZXQgYWN0aXZhdGlvbiBzdGF0ZSBpbW1lZGlhdGVseSBpZiBlbGVtZW50IHdhcyBub3QgbWFkZSBhY3RpdmUuXG4gICAgICAgIHRoaXMuYWN0aXZhdGlvblN0YXRlXyA9IHRoaXMuZGVmYXVsdEFjdGl2YXRpb25TdGF0ZV8oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudH0gZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2hlY2tFbGVtZW50TWFkZUFjdGl2ZV8oZSkge1xuICAgIHJldHVybiAoZSAmJiBlLnR5cGUgPT09ICdrZXlkb3duJykgPyB0aGlzLmFkYXB0ZXJfLmlzU3VyZmFjZUFjdGl2ZSgpIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gez9FdmVudD19IGV2ZW50IE9wdGlvbmFsIGV2ZW50IGNvbnRhaW5pbmcgcG9zaXRpb24gaW5mb3JtYXRpb24uXG4gICAqL1xuICBhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmFjdGl2YXRlXyhldmVudCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgYW5pbWF0ZUFjdGl2YXRpb25fKCkge1xuICAgIGNvbnN0IHtWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCBWQVJfRkdfVFJBTlNMQVRFX0VORH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLnN0cmluZ3M7XG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTiwgRkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge0RFQUNUSVZBVElPTl9USU1FT1VUX01TfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycztcblxuICAgIHRoaXMubGF5b3V0SW50ZXJuYWxfKCk7XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhcnQgPSAnJztcbiAgICBsZXQgdHJhbnNsYXRlRW5kID0gJyc7XG5cbiAgICBpZiAoIXRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgY29uc3Qge3N0YXJ0UG9pbnQsIGVuZFBvaW50fSA9IHRoaXMuZ2V0RmdUcmFuc2xhdGlvbkNvb3JkaW5hdGVzXygpO1xuICAgICAgdHJhbnNsYXRlU3RhcnQgPSBgJHtzdGFydFBvaW50Lnh9cHgsICR7c3RhcnRQb2ludC55fXB4YDtcbiAgICAgIHRyYW5zbGF0ZUVuZCA9IGAke2VuZFBvaW50Lnh9cHgsICR7ZW5kUG9pbnQueX1weGA7XG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX1NUQVJULCB0cmFuc2xhdGVTdGFydCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfVFJBTlNMQVRFX0VORCwgdHJhbnNsYXRlRW5kKTtcbiAgICAvLyBDYW5jZWwgYW55IG9uZ29pbmcgYWN0aXZhdGlvbi9kZWFjdGl2YXRpb24gYW5pbWF0aW9uc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmFjdGl2YXRpb25UaW1lcl8pO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyk7XG4gICAgdGhpcy5ybUJvdW5kZWRBY3RpdmF0aW9uQ2xhc3Nlc18oKTtcbiAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG5cbiAgICAvLyBGb3JjZSBsYXlvdXQgaW4gb3JkZXIgdG8gcmUtdHJpZ2dlciB0aGUgYW5pbWF0aW9uLlxuICAgIHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIHRoaXMuYWRhcHRlcl8uYWRkQ2xhc3MoRkdfQUNUSVZBVElPTik7XG4gICAgdGhpcy5hY3RpdmF0aW9uVGltZXJfID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmFjdGl2YXRpb25UaW1lckNhbGxiYWNrXygpLCBERUFDVElWQVRJT05fVElNRU9VVF9NUyk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybiB7e3N0YXJ0UG9pbnQ6IFBvaW50VHlwZSwgZW5kUG9pbnQ6IFBvaW50VHlwZX19XG4gICAqL1xuICBnZXRGZ1RyYW5zbGF0aW9uQ29vcmRpbmF0ZXNfKCkge1xuICAgIGNvbnN0IHthY3RpdmF0aW9uRXZlbnQsIHdhc0FjdGl2YXRlZEJ5UG9pbnRlcn0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG5cbiAgICBsZXQgc3RhcnRQb2ludDtcbiAgICBpZiAod2FzQWN0aXZhdGVkQnlQb2ludGVyKSB7XG4gICAgICBzdGFydFBvaW50ID0gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKFxuICAgICAgICAvKiogQHR5cGUgeyFFdmVudH0gKi8gKGFjdGl2YXRpb25FdmVudCksXG4gICAgICAgIHRoaXMuYWRhcHRlcl8uZ2V0V2luZG93UGFnZU9mZnNldCgpLCB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRQb2ludCA9IHtcbiAgICAgICAgeDogdGhpcy5mcmFtZV8ud2lkdGggLyAyLFxuICAgICAgICB5OiB0aGlzLmZyYW1lXy5oZWlnaHQgLyAyLFxuICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ2VudGVyIHRoZSBlbGVtZW50IGFyb3VuZCB0aGUgc3RhcnQgcG9pbnQuXG4gICAgc3RhcnRQb2ludCA9IHtcbiAgICAgIHg6IHN0YXJ0UG9pbnQueCAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgICAgeTogc3RhcnRQb2ludC55IC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMiksXG4gICAgfTtcblxuICAgIGNvbnN0IGVuZFBvaW50ID0ge1xuICAgICAgeDogKHRoaXMuZnJhbWVfLndpZHRoIC8gMikgLSAodGhpcy5pbml0aWFsU2l6ZV8gLyAyKSxcbiAgICAgIHk6ICh0aGlzLmZyYW1lXy5oZWlnaHQgLyAyKSAtICh0aGlzLmluaXRpYWxTaXplXyAvIDIpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge3N0YXJ0UG9pbnQsIGVuZFBvaW50fTtcbiAgfVxuXG4gIC8qKiBAcHJpdmF0ZSAqL1xuICBydW5EZWFjdGl2YXRpb25VWExvZ2ljSWZSZWFkeV8oKSB7XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgY2FsbGVkIGJvdGggd2hlbiBhIHBvaW50aW5nIGRldmljZSBpcyByZWxlYXNlZCwgYW5kIHdoZW4gdGhlIGFjdGl2YXRpb24gYW5pbWF0aW9uIGVuZHMuXG4gICAgLy8gVGhlIGRlYWN0aXZhdGlvbiBhbmltYXRpb24gc2hvdWxkIG9ubHkgcnVuIGFmdGVyIGJvdGggb2YgdGhvc2Ugb2NjdXIuXG4gICAgY29uc3Qge0ZHX0RFQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgY29uc3Qge2hhc0RlYWN0aXZhdGlvblVYUnVuLCBpc0FjdGl2YXRlZH0gPSB0aGlzLmFjdGl2YXRpb25TdGF0ZV87XG4gICAgY29uc3QgYWN0aXZhdGlvbkhhc0VuZGVkID0gaGFzRGVhY3RpdmF0aW9uVVhSdW4gfHwgIWlzQWN0aXZhdGVkO1xuXG4gICAgaWYgKGFjdGl2YXRpb25IYXNFbmRlZCAmJiB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8pIHtcbiAgICAgIHRoaXMucm1Cb3VuZGVkQWN0aXZhdGlvbkNsYXNzZXNfKCk7XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB0aGlzLmZnRGVhY3RpdmF0aW9uUmVtb3ZhbFRpbWVyXyA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKEZHX0RFQUNUSVZBVElPTik7XG4gICAgICB9LCBudW1iZXJzLkZHX0RFQUNUSVZBVElPTl9NUyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIHJtQm91bmRlZEFjdGl2YXRpb25DbGFzc2VzXygpIHtcbiAgICBjb25zdCB7RkdfQUNUSVZBVElPTn0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhGR19BQ1RJVkFUSU9OKTtcbiAgICB0aGlzLmFjdGl2YXRpb25BbmltYXRpb25IYXNFbmRlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmFkYXB0ZXJfLmNvbXB1dGVCb3VuZGluZ1JlY3QoKTtcbiAgfVxuXG4gIHJlc2V0QWN0aXZhdGlvblN0YXRlXygpIHtcbiAgICB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IHRoaXMuYWN0aXZhdGlvblN0YXRlXy5hY3RpdmF0aW9uRXZlbnQ7XG4gICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfID0gdGhpcy5kZWZhdWx0QWN0aXZhdGlvblN0YXRlXygpO1xuICAgIC8vIFRvdWNoIGRldmljZXMgbWF5IGZpcmUgYWRkaXRpb25hbCBldmVudHMgZm9yIHRoZSBzYW1lIGludGVyYWN0aW9uIHdpdGhpbiBhIHNob3J0IHRpbWUuXG4gICAgLy8gU3RvcmUgdGhlIHByZXZpb3VzIGV2ZW50IHVudGlsIGl0J3Mgc2FmZSB0byBhc3N1bWUgdGhhdCBzdWJzZXF1ZW50IGV2ZW50cyBhcmUgZm9yIG5ldyBpbnRlcmFjdGlvbnMuXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZXZpb3VzQWN0aXZhdGlvbkV2ZW50XyA9IG51bGwsIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5UQVBfREVMQVlfTVMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7P0V2ZW50fSBlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWFjdGl2YXRlXyhlKSB7XG4gICAgY29uc3QgYWN0aXZhdGlvblN0YXRlID0gdGhpcy5hY3RpdmF0aW9uU3RhdGVfO1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBzY2VuYXJpb3Mgc3VjaCBhcyB3aGVuIHlvdSBoYXZlIGEga2V5dXAgZXZlbnQgdGhhdCBibHVycyB0aGUgZWxlbWVudC5cbiAgICBpZiAoIWFjdGl2YXRpb25TdGF0ZS5pc0FjdGl2YXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXRlID0gLyoqIEB0eXBlIHshQWN0aXZhdGlvblN0YXRlVHlwZX0gKi8gKE9iamVjdC5hc3NpZ24oe30sIGFjdGl2YXRpb25TdGF0ZSkpO1xuXG4gICAgaWYgKGFjdGl2YXRpb25TdGF0ZS5pc1Byb2dyYW1tYXRpYykge1xuICAgICAgY29uc3QgZXZ0T2JqZWN0ID0gbnVsbDtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFuaW1hdGVEZWFjdGl2YXRpb25fKGV2dE9iamVjdCwgc3RhdGUpKTtcbiAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVyZWdpc3RlckRlYWN0aXZhdGlvbkhhbmRsZXJzXygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hY3RpdmF0aW9uU3RhdGVfLmhhc0RlYWN0aXZhdGlvblVYUnVuID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hbmltYXRlRGVhY3RpdmF0aW9uXyhlLCBzdGF0ZSk7XG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmF0aW9uU3RhdGVfKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHs/RXZlbnQ9fSBldmVudCBPcHRpb25hbCBldmVudCBjb250YWluaW5nIHBvc2l0aW9uIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZGVhY3RpdmF0ZShldmVudCA9IG51bGwpIHtcbiAgICB0aGlzLmRlYWN0aXZhdGVfKGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBlXG4gICAqIEBwYXJhbSB7IUFjdGl2YXRpb25TdGF0ZVR5cGV9IG9wdGlvbnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFuaW1hdGVEZWFjdGl2YXRpb25fKGUsIHt3YXNBY3RpdmF0ZWRCeVBvaW50ZXIsIHdhc0VsZW1lbnRNYWRlQWN0aXZlfSkge1xuICAgIGlmICh3YXNBY3RpdmF0ZWRCeVBvaW50ZXIgfHwgd2FzRWxlbWVudE1hZGVBY3RpdmUpIHtcbiAgICAgIHRoaXMucnVuRGVhY3RpdmF0aW9uVVhMb2dpY0lmUmVhZHlfKCk7XG4gICAgfVxuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIGlmICh0aGlzLmxheW91dEZyYW1lXykge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5sYXlvdXRGcmFtZV8pO1xuICAgIH1cbiAgICB0aGlzLmxheW91dEZyYW1lXyA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmxheW91dEludGVybmFsXygpO1xuICAgICAgdGhpcy5sYXlvdXRGcmFtZV8gPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIEBwcml2YXRlICovXG4gIGxheW91dEludGVybmFsXygpIHtcbiAgICB0aGlzLmZyYW1lXyA9IHRoaXMuYWRhcHRlcl8uY29tcHV0ZUJvdW5kaW5nUmVjdCgpO1xuICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KHRoaXMuZnJhbWVfLmhlaWdodCwgdGhpcy5mcmFtZV8ud2lkdGgpO1xuXG4gICAgLy8gU3VyZmFjZSBkaWFtZXRlciBpcyB0cmVhdGVkIGRpZmZlcmVudGx5IGZvciB1bmJvdW5kZWQgdnMuIGJvdW5kZWQgcmlwcGxlcy5cbiAgICAvLyBVbmJvdW5kZWQgcmlwcGxlIGRpYW1ldGVyIGlzIGNhbGN1bGF0ZWQgc21hbGxlciBzaW5jZSB0aGUgc3VyZmFjZSBpcyBleHBlY3RlZCB0byBhbHJlYWR5IGJlIHBhZGRlZCBhcHByb3ByaWF0ZWx5XG4gICAgLy8gdG8gZXh0ZW5kIHRoZSBoaXRib3gsIGFuZCB0aGUgcmlwcGxlIGlzIGV4cGVjdGVkIHRvIG1lZXQgdGhlIGVkZ2VzIG9mIHRoZSBwYWRkZWQgaGl0Ym94ICh3aGljaCBpcyB0eXBpY2FsbHlcbiAgICAvLyBzcXVhcmUpLiBCb3VuZGVkIHJpcHBsZXMsIG9uIHRoZSBvdGhlciBoYW5kLCBhcmUgZnVsbHkgZXhwZWN0ZWQgdG8gZXhwYW5kIGJleW9uZCB0aGUgc3VyZmFjZSdzIGxvbmdlc3QgZGlhbWV0ZXJcbiAgICAvLyAoY2FsY3VsYXRlZCBiYXNlZCBvbiB0aGUgZGlhZ29uYWwgcGx1cyBhIGNvbnN0YW50IHBhZGRpbmcpLCBhbmQgYXJlIGNsaXBwZWQgYXQgdGhlIHN1cmZhY2UncyBib3JkZXIgdmlhXG4gICAgLy8gYG92ZXJmbG93OiBoaWRkZW5gLlxuICAgIGNvbnN0IGdldEJvdW5kZWRSYWRpdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBoeXBvdGVudXNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuZnJhbWVfLndpZHRoLCAyKSArIE1hdGgucG93KHRoaXMuZnJhbWVfLmhlaWdodCwgMikpO1xuICAgICAgcmV0dXJuIGh5cG90ZW51c2UgKyBNRENSaXBwbGVGb3VuZGF0aW9uLm51bWJlcnMuUEFERElORztcbiAgICB9O1xuXG4gICAgdGhpcy5tYXhSYWRpdXNfID0gdGhpcy5hZGFwdGVyXy5pc1VuYm91bmRlZCgpID8gbWF4RGltIDogZ2V0Qm91bmRlZFJhZGl1cygpO1xuXG4gICAgLy8gUmlwcGxlIGlzIHNpemVkIGFzIGEgZnJhY3Rpb24gb2YgdGhlIGxhcmdlc3QgZGltZW5zaW9uIG9mIHRoZSBzdXJmYWNlLCB0aGVuIHNjYWxlcyB1cCB1c2luZyBhIENTUyBzY2FsZSB0cmFuc2Zvcm1cbiAgICB0aGlzLmluaXRpYWxTaXplXyA9IG1heERpbSAqIE1EQ1JpcHBsZUZvdW5kYXRpb24ubnVtYmVycy5JTklUSUFMX09SSUdJTl9TQ0FMRTtcbiAgICB0aGlzLmZnU2NhbGVfID0gdGhpcy5tYXhSYWRpdXNfIC8gdGhpcy5pbml0aWFsU2l6ZV87XG5cbiAgICB0aGlzLnVwZGF0ZUxheW91dENzc1ZhcnNfKCk7XG4gIH1cblxuICAvKiogQHByaXZhdGUgKi9cbiAgdXBkYXRlTGF5b3V0Q3NzVmFyc18oKSB7XG4gICAgY29uc3Qge1xuICAgICAgVkFSX0ZHX1NJWkUsIFZBUl9MRUZULCBWQVJfVE9QLCBWQVJfRkdfU0NBTEUsXG4gICAgfSA9IE1EQ1JpcHBsZUZvdW5kYXRpb24uc3RyaW5ncztcblxuICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX0ZHX1NJWkUsIGAke3RoaXMuaW5pdGlhbFNpemVffXB4YCk7XG4gICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfRkdfU0NBTEUsIHRoaXMuZmdTY2FsZV8pO1xuXG4gICAgaWYgKHRoaXMuYWRhcHRlcl8uaXNVbmJvdW5kZWQoKSkge1xuICAgICAgdGhpcy51bmJvdW5kZWRDb29yZHNfID0ge1xuICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKCh0aGlzLmZyYW1lXy53aWR0aCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgICB0b3A6IE1hdGgucm91bmQoKHRoaXMuZnJhbWVfLmhlaWdodCAvIDIpIC0gKHRoaXMuaW5pdGlhbFNpemVfIC8gMikpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hZGFwdGVyXy51cGRhdGVDc3NWYXJpYWJsZShWQVJfTEVGVCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLmxlZnR9cHhgKTtcbiAgICAgIHRoaXMuYWRhcHRlcl8udXBkYXRlQ3NzVmFyaWFibGUoVkFSX1RPUCwgYCR7dGhpcy51bmJvdW5kZWRDb29yZHNfLnRvcH1weGApO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHVuYm91bmRlZCAqL1xuICBzZXRVbmJvdW5kZWQodW5ib3VuZGVkKSB7XG4gICAgY29uc3Qge1VOQk9VTkRFRH0gPSBNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXM7XG4gICAgaWYgKHVuYm91bmRlZCkge1xuICAgICAgdGhpcy5hZGFwdGVyXy5hZGRDbGFzcyhVTkJPVU5ERUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkYXB0ZXJfLnJlbW92ZUNsYXNzKFVOQk9VTkRFRCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+XG4gICAgICB0aGlzLmFkYXB0ZXJfLmFkZENsYXNzKE1EQ1JpcHBsZUZvdW5kYXRpb24uY3NzQ2xhc3Nlcy5CR19GT0NVU0VEKSk7XG4gIH1cblxuICBoYW5kbGVCbHVyKCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PlxuICAgICAgdGhpcy5hZGFwdGVyXy5yZW1vdmVDbGFzcyhNRENSaXBwbGVGb3VuZGF0aW9uLmNzc0NsYXNzZXMuQkdfRk9DVVNFRCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1EQ1JpcHBsZUZvdW5kYXRpb247XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNiBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IE1EQ0NvbXBvbmVudCBmcm9tICdAbWF0ZXJpYWwvYmFzZS9jb21wb25lbnQnO1xuaW1wb3J0IE1EQ1JpcHBsZUFkYXB0ZXIgZnJvbSAnLi9hZGFwdGVyJztcbmltcG9ydCBNRENSaXBwbGVGb3VuZGF0aW9uIGZyb20gJy4vZm91bmRhdGlvbic7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4vdXRpbCc7XG5cbi8qKlxuICogQGV4dGVuZHMgTURDQ29tcG9uZW50PCFNRENSaXBwbGVGb3VuZGF0aW9uPlxuICovXG5jbGFzcyBNRENSaXBwbGUgZXh0ZW5kcyBNRENDb21wb25lbnQge1xuICAvKiogQHBhcmFtIHsuLi4/fSBhcmdzICovXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIC8qKiBAdHlwZSB7Ym9vbGVhbn0gKi9cbiAgICB0aGlzLmRpc2FibGVkID0gZmFsc2U7XG5cbiAgICAvKiogQHByaXZhdGUge2Jvb2xlYW59ICovXG4gICAgdGhpcy51bmJvdW5kZWRfO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7IUVsZW1lbnR9IHJvb3RcbiAgICogQHBhcmFtIHt7aXNVbmJvdW5kZWQ6IChib29sZWFufHVuZGVmaW5lZCl9PX0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHshTURDUmlwcGxlfVxuICAgKi9cbiAgc3RhdGljIGF0dGFjaFRvKHJvb3QsIHtpc1VuYm91bmRlZCA9IHVuZGVmaW5lZH0gPSB7fSkge1xuICAgIGNvbnN0IHJpcHBsZSA9IG5ldyBNRENSaXBwbGUocm9vdCk7XG4gICAgLy8gT25seSBvdmVycmlkZSB1bmJvdW5kZWQgYmVoYXZpb3IgaWYgb3B0aW9uIGlzIGV4cGxpY2l0bHkgc3BlY2lmaWVkXG4gICAgaWYgKGlzVW5ib3VuZGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJpcHBsZS51bmJvdW5kZWQgPSAvKiogQHR5cGUge2Jvb2xlYW59ICovIChpc1VuYm91bmRlZCk7XG4gICAgfVxuICAgIHJldHVybiByaXBwbGU7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHshUmlwcGxlQ2FwYWJsZVN1cmZhY2V9IGluc3RhbmNlXG4gICAqIEByZXR1cm4geyFNRENSaXBwbGVBZGFwdGVyfVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUFkYXB0ZXIoaW5zdGFuY2UpIHtcbiAgICBjb25zdCBNQVRDSEVTID0gdXRpbC5nZXRNYXRjaGVzUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBicm93c2VyU3VwcG9ydHNDc3NWYXJzOiAoKSA9PiB1dGlsLnN1cHBvcnRzQ3NzVmFyaWFibGVzKHdpbmRvdyksXG4gICAgICBpc1VuYm91bmRlZDogKCkgPT4gaW5zdGFuY2UudW5ib3VuZGVkLFxuICAgICAgaXNTdXJmYWNlQWN0aXZlOiAoKSA9PiBpbnN0YW5jZS5yb290X1tNQVRDSEVTXSgnOmFjdGl2ZScpLFxuICAgICAgaXNTdXJmYWNlRGlzYWJsZWQ6ICgpID0+IGluc3RhbmNlLmRpc2FibGVkLFxuICAgICAgYWRkQ2xhc3M6IChjbGFzc05hbWUpID0+IGluc3RhbmNlLnJvb3RfLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSxcbiAgICAgIHJlbW92ZUNsYXNzOiAoY2xhc3NOYW1lKSA9PiBpbnN0YW5jZS5yb290Xy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSksXG4gICAgICBjb250YWluc0V2ZW50VGFyZ2V0OiAodGFyZ2V0KSA9PiBpbnN0YW5jZS5yb290Xy5jb250YWlucyh0YXJnZXQpLFxuICAgICAgcmVnaXN0ZXJJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBpbnN0YW5jZS5yb290Xy5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZXIsIHV0aWwuYXBwbHlQYXNzaXZlKCkpLFxuICAgICAgZGVyZWdpc3RlckludGVyYWN0aW9uSGFuZGxlcjogKGV2dFR5cGUsIGhhbmRsZXIpID0+XG4gICAgICAgIGluc3RhbmNlLnJvb3RfLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICByZWdpc3RlckRvY3VtZW50SW50ZXJhY3Rpb25IYW5kbGVyOiAoZXZ0VHlwZSwgaGFuZGxlcikgPT5cbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlciwgdXRpbC5hcHBseVBhc3NpdmUoKSksXG4gICAgICBkZXJlZ2lzdGVyRG9jdW1lbnRJbnRlcmFjdGlvbkhhbmRsZXI6IChldnRUeXBlLCBoYW5kbGVyKSA9PlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGVyLCB1dGlsLmFwcGx5UGFzc2l2ZSgpKSxcbiAgICAgIHJlZ2lzdGVyUmVzaXplSGFuZGxlcjogKGhhbmRsZXIpID0+IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVyKSxcbiAgICAgIGRlcmVnaXN0ZXJSZXNpemVIYW5kbGVyOiAoaGFuZGxlcikgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZXIpLFxuICAgICAgdXBkYXRlQ3NzVmFyaWFibGU6ICh2YXJOYW1lLCB2YWx1ZSkgPT4gaW5zdGFuY2Uucm9vdF8uc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFsdWUpLFxuICAgICAgY29tcHV0ZUJvdW5kaW5nUmVjdDogKCkgPT4gaW5zdGFuY2Uucm9vdF8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICBnZXRXaW5kb3dQYWdlT2Zmc2V0OiAoKSA9PiAoe3g6IHdpbmRvdy5wYWdlWE9mZnNldCwgeTogd2luZG93LnBhZ2VZT2Zmc2V0fSksXG4gICAgfTtcbiAgfVxuXG4gIC8qKiBAcmV0dXJuIHtib29sZWFufSAqL1xuICBnZXQgdW5ib3VuZGVkKCkge1xuICAgIHJldHVybiB0aGlzLnVuYm91bmRlZF87XG4gIH1cblxuICAvKiogQHBhcmFtIHtib29sZWFufSB1bmJvdW5kZWQgKi9cbiAgc2V0IHVuYm91bmRlZCh1bmJvdW5kZWQpIHtcbiAgICB0aGlzLnVuYm91bmRlZF8gPSBCb29sZWFuKHVuYm91bmRlZCk7XG4gICAgdGhpcy5zZXRVbmJvdW5kZWRfKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc3VyZSBDb21waWxlciB0aHJvd3MgYW4gYWNjZXNzIGNvbnRyb2wgZXJyb3Igd2hlbiBkaXJlY3RseSBhY2Nlc3NpbmcgYVxuICAgKiBwcm90ZWN0ZWQgb3IgcHJpdmF0ZSBwcm9wZXJ0eSBpbnNpZGUgYSBnZXR0ZXIvc2V0dGVyLCBsaWtlIHVuYm91bmRlZCBhYm92ZS5cbiAgICogQnkgYWNjZXNzaW5nIHRoZSBwcm90ZWN0ZWQgcHJvcGVydHkgaW5zaWRlIGEgbWV0aG9kLCB3ZSBzb2x2ZSB0aGF0IHByb2JsZW0uXG4gICAqIFRoYXQncyB3aHkgdGhpcyBmdW5jdGlvbiBleGlzdHMuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzZXRVbmJvdW5kZWRfKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uc2V0VW5ib3VuZGVkKHRoaXMudW5ib3VuZGVkXyk7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLmZvdW5kYXRpb25fLmFjdGl2YXRlKCk7XG4gIH1cblxuICBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8uZGVhY3RpdmF0ZSgpO1xuICB9XG5cbiAgbGF5b3V0KCkge1xuICAgIHRoaXMuZm91bmRhdGlvbl8ubGF5b3V0KCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7IU1EQ1JpcHBsZUZvdW5kYXRpb259XG4gICAqIEBvdmVycmlkZVxuICAgKi9cbiAgZ2V0RGVmYXVsdEZvdW5kYXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBNRENSaXBwbGVGb3VuZGF0aW9uKE1EQ1JpcHBsZS5jcmVhdGVBZGFwdGVyKHRoaXMpKTtcbiAgfVxuXG4gIC8qKiBAb3ZlcnJpZGUgKi9cbiAgaW5pdGlhbFN5bmNXaXRoRE9NKCkge1xuICAgIHRoaXMudW5ib3VuZGVkID0gJ21kY1JpcHBsZUlzVW5ib3VuZGVkJyBpbiB0aGlzLnJvb3RfLmRhdGFzZXQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWUgTWF0ZXJpYWwgRGVzaWduIHNwZWMgZm9yIG1vcmUgZGV0YWlscyBvbiB3aGVuIHRvIHVzZSByaXBwbGVzLlxuICogaHR0cHM6Ly9tYXRlcmlhbC5pby9ndWlkZWxpbmVzL21vdGlvbi9jaG9yZW9ncmFwaHkuaHRtbCNjaG9yZW9ncmFwaHktY3JlYXRpb25cbiAqIEByZWNvcmRcbiAqL1xuY2xhc3MgUmlwcGxlQ2FwYWJsZVN1cmZhY2Uge31cblxuLyoqIEBwcm90ZWN0ZWQgeyFFbGVtZW50fSAqL1xuUmlwcGxlQ2FwYWJsZVN1cmZhY2UucHJvdG90eXBlLnJvb3RfO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgYmxlZWRzIG91dCBvZiB0aGUgYm91bmRzIG9mIHRoZSBlbGVtZW50LlxuICogQHR5cGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5SaXBwbGVDYXBhYmxlU3VyZmFjZS5wcm90b3R5cGUudW5ib3VuZGVkO1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSByaXBwbGUgaXMgYXR0YWNoZWQgdG8gYSBkaXNhYmxlZCBjb21wb25lbnQuXG4gKiBAdHlwZSB7Ym9vbGVhbnx1bmRlZmluZWR9XG4gKi9cblJpcHBsZUNhcGFibGVTdXJmYWNlLnByb3RvdHlwZS5kaXNhYmxlZDtcblxuZXhwb3J0IHtNRENSaXBwbGUsIE1EQ1JpcHBsZUZvdW5kYXRpb24sIFJpcHBsZUNhcGFibGVTdXJmYWNlLCB1dGlsfTtcbiIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE2IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyB0byBhdm9pZCByZWR1bmRhbnQgcHJvY2Vzc2luZyB0byBkZXRlY3QgQ1NTIGN1c3RvbSB2YXJpYWJsZSBzdXBwb3J0LlxuICogQHByaXZhdGUge2Jvb2xlYW58dW5kZWZpbmVkfVxuICovXG5sZXQgc3VwcG9ydHNDc3NWYXJpYWJsZXNfO1xuXG4vKipcbiAqIFN0b3JlcyByZXN1bHQgZnJvbSBhcHBseVBhc3NpdmUgdG8gYXZvaWQgcmVkdW5kYW50IHByb2Nlc3NpbmcgdG8gZGV0ZWN0IHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIgc3VwcG9ydC5cbiAqIEBwcml2YXRlIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xubGV0IHN1cHBvcnRzUGFzc2l2ZV87XG5cbi8qKlxuICogQHBhcmFtIHshV2luZG93fSB3aW5kb3dPYmpcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRldGVjdEVkZ2VQc2V1ZG9WYXJCdWcod2luZG93T2JqKSB7XG4gIC8vIERldGVjdCB2ZXJzaW9ucyBvZiBFZGdlIHdpdGggYnVnZ3kgdmFyKCkgc3VwcG9ydFxuICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzExNDk1NDQ4L1xuICBjb25zdCBkb2N1bWVudCA9IHdpbmRvd09iai5kb2N1bWVudDtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBub2RlLmNsYXNzTmFtZSA9ICdtZGMtcmlwcGxlLXN1cmZhY2UtLXRlc3QtZWRnZS12YXItYnVnJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcblxuICAvLyBUaGUgYnVnIGV4aXN0cyBpZiA6OmJlZm9yZSBzdHlsZSBlbmRzIHVwIHByb3BhZ2F0aW5nIHRvIHRoZSBwYXJlbnQgZWxlbWVudC5cbiAgLy8gQWRkaXRpb25hbGx5LCBnZXRDb21wdXRlZFN0eWxlIHJldHVybnMgbnVsbCBpbiBpZnJhbWVzIHdpdGggZGlzcGxheTogXCJub25lXCIgaW4gRmlyZWZveCxcbiAgLy8gYnV0IEZpcmVmb3ggaXMga25vd24gdG8gc3VwcG9ydCBDU1MgY3VzdG9tIHByb3BlcnRpZXMgY29ycmVjdGx5LlxuICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93T2JqLmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGNvbnN0IGhhc1BzZXVkb1ZhckJ1ZyA9IGNvbXB1dGVkU3R5bGUgIT09IG51bGwgJiYgY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BTdHlsZSA9PT0gJ3NvbGlkJztcbiAgbm9kZS5yZW1vdmUoKTtcbiAgcmV0dXJuIGhhc1BzZXVkb1ZhckJ1Zztcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFXaW5kb3d9IHdpbmRvd09ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHVuZGVmaW5lZH1cbiAqL1xuXG5mdW5jdGlvbiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyh3aW5kb3dPYmosIGZvcmNlUmVmcmVzaCA9IGZhbHNlKSB7XG4gIGxldCBzdXBwb3J0c0Nzc1ZhcmlhYmxlcyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzXztcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0Nzc1ZhcmlhYmxlc18gPT09ICdib29sZWFuJyAmJiAhZm9yY2VSZWZyZXNoKSB7XG4gICAgcmV0dXJuIHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG5cbiAgY29uc3Qgc3VwcG9ydHNGdW5jdGlvblByZXNlbnQgPSB3aW5kb3dPYmouQ1NTICYmIHR5cGVvZiB3aW5kb3dPYmouQ1NTLnN1cHBvcnRzID09PSAnZnVuY3Rpb24nO1xuICBpZiAoIXN1cHBvcnRzRnVuY3Rpb25QcmVzZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZXhwbGljaXRseVN1cHBvcnRzQ3NzVmFycyA9IHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJy0tY3NzLXZhcnMnLCAneWVzJyk7XG4gIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE1NDY2OVxuICAvLyBTZWU6IFJFQURNRSBzZWN0aW9uIG9uIFNhZmFyaVxuICBjb25zdCB3ZUFyZUZlYXR1cmVEZXRlY3RpbmdTYWZhcmkxMHBsdXMgPSAoXG4gICAgd2luZG93T2JqLkNTUy5zdXBwb3J0cygnKC0tY3NzLXZhcnM6IHllcyknKSAmJlxuICAgIHdpbmRvd09iai5DU1Muc3VwcG9ydHMoJ2NvbG9yJywgJyMwMDAwMDAwMCcpXG4gICk7XG5cbiAgaWYgKGV4cGxpY2l0bHlTdXBwb3J0c0Nzc1ZhcnMgfHwgd2VBcmVGZWF0dXJlRGV0ZWN0aW5nU2FmYXJpMTBwbHVzKSB7XG4gICAgc3VwcG9ydHNDc3NWYXJpYWJsZXMgPSAhZGV0ZWN0RWRnZVBzZXVkb1ZhckJ1Zyh3aW5kb3dPYmopO1xuICB9IGVsc2Uge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWZvcmNlUmVmcmVzaCkge1xuICAgIHN1cHBvcnRzQ3NzVmFyaWFibGVzXyA9IHN1cHBvcnRzQ3NzVmFyaWFibGVzO1xuICB9XG4gIHJldHVybiBzdXBwb3J0c0Nzc1ZhcmlhYmxlcztcbn1cblxuLy9cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGN1cnJlbnQgYnJvd3NlciBzdXBwb3J0cyBwYXNzaXZlIGV2ZW50IGxpc3RlbmVycywgYW5kIGlmIHNvLCB1c2UgdGhlbS5cbiAqIEBwYXJhbSB7IVdpbmRvdz19IGdsb2JhbE9ialxuICogQHBhcmFtIHtib29sZWFuPX0gZm9yY2VSZWZyZXNoXG4gKiBAcmV0dXJuIHtib29sZWFufHtwYXNzaXZlOiBib29sZWFufX1cbiAqL1xuZnVuY3Rpb24gYXBwbHlQYXNzaXZlKGdsb2JhbE9iaiA9IHdpbmRvdywgZm9yY2VSZWZyZXNoID0gZmFsc2UpIHtcbiAgaWYgKHN1cHBvcnRzUGFzc2l2ZV8gPT09IHVuZGVmaW5lZCB8fCBmb3JjZVJlZnJlc2gpIHtcbiAgICBsZXQgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsT2JqLmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCB7Z2V0IHBhc3NpdmUoKSB7XG4gICAgICAgIGlzU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIH19KTtcbiAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgIHN1cHBvcnRzUGFzc2l2ZV8gPSBpc1N1cHBvcnRlZDtcbiAgfVxuXG4gIHJldHVybiBzdXBwb3J0c1Bhc3NpdmVfID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2U7XG59XG5cbi8qKlxuICogQHBhcmFtIHshT2JqZWN0fSBIVE1MRWxlbWVudFByb3RvdHlwZVxuICogQHJldHVybiB7IUFycmF5PHN0cmluZz59XG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoZXNQcm9wZXJ0eShIVE1MRWxlbWVudFByb3RvdHlwZSkge1xuICByZXR1cm4gW1xuICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLCAnbXNNYXRjaGVzU2VsZWN0b3InLCAnbWF0Y2hlcycsXG4gIF0uZmlsdGVyKChwKSA9PiBwIGluIEhUTUxFbGVtZW50UHJvdG90eXBlKS5wb3AoKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0geyFFdmVudH0gZXZcbiAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gcGFnZU9mZnNldFxuICogQHBhcmFtIHshQ2xpZW50UmVjdH0gY2xpZW50UmVjdFxuICogQHJldHVybiB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Tm9ybWFsaXplZEV2ZW50Q29vcmRzKGV2LCBwYWdlT2Zmc2V0LCBjbGllbnRSZWN0KSB7XG4gIGNvbnN0IHt4LCB5fSA9IHBhZ2VPZmZzZXQ7XG4gIGNvbnN0IGRvY3VtZW50WCA9IHggKyBjbGllbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IGRvY3VtZW50WSA9IHkgKyBjbGllbnRSZWN0LnRvcDtcblxuICBsZXQgbm9ybWFsaXplZFg7XG4gIGxldCBub3JtYWxpemVkWTtcbiAgLy8gRGV0ZXJtaW5lIHRvdWNoIHBvaW50IHJlbGF0aXZlIHRvIHRoZSByaXBwbGUgY29udGFpbmVyLlxuICBpZiAoZXYudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgbm9ybWFsaXplZFggPSBldi5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIGRvY3VtZW50WDtcbiAgICBub3JtYWxpemVkWSA9IGV2LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gZG9jdW1lbnRZO1xuICB9IGVsc2Uge1xuICAgIG5vcm1hbGl6ZWRYID0gZXYucGFnZVggLSBkb2N1bWVudFg7XG4gICAgbm9ybWFsaXplZFkgPSBldi5wYWdlWSAtIGRvY3VtZW50WTtcbiAgfVxuXG4gIHJldHVybiB7eDogbm9ybWFsaXplZFgsIHk6IG5vcm1hbGl6ZWRZfTtcbn1cblxuZXhwb3J0IHtzdXBwb3J0c0Nzc1ZhcmlhYmxlcywgYXBwbHlQYXNzaXZlLCBnZXRNYXRjaGVzUHJvcGVydHksIGdldE5vcm1hbGl6ZWRFdmVudENvb3Jkc307XG4iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB7TURDUmlwcGxlfSBmcm9tICdAbWF0ZXJpYWwvcmlwcGxlL2luZGV4Jztcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7e1xuICogICBjaGVja2VkOiBib29sZWFuLFxuICogICBpbmRldGVybWluYXRlOiBib29sZWFuLFxuICogICBkaXNhYmxlZDogYm9vbGVhbixcbiAqICAgdmFsdWU6ID9zdHJpbmdcbiAqIH19XG4gKi9cbmxldCBNRENTZWxlY3Rpb25Db250cm9sU3RhdGU7XG5cbi8qKlxuICogQHJlY29yZFxuICovXG5jbGFzcyBNRENTZWxlY3Rpb25Db250cm9sIHtcbiAgLyoqIEByZXR1cm4gez9NRENSaXBwbGV9ICovXG4gIGdldCByaXBwbGUoKSB7fVxufVxuXG5leHBvcnQge01EQ1NlbGVjdGlvbkNvbnRyb2xTdGF0ZSwgTURDU2VsZWN0aW9uQ29udHJvbH07XG4iLCJpbXBvcnQge01EQ0Zvcm1GaWVsZH0gZnJvbSAnQG1hdGVyaWFsL2Zvcm0tZmllbGQnO1xyXG5pbXBvcnQge01EQ0NoZWNrYm94fSBmcm9tICdAbWF0ZXJpYWwvY2hlY2tib3gnO1xyXG4ndXNlIHN0cmljdCdcclxuLy8vLy8vIFBPUFVQXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHJlYWR5KGZuKSB7XHJcbiAgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50ID8gZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiIDogZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIpe1xyXG4gICAgZm4oKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZm4pXHJcbiAgfVxyXG59XHJcblxyXG5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcblxyXG5cclxuXHQvLyBjb25zdCBjaGVja2JveCA9IG5ldyBNRENDaGVja2JveChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWRjLWNoZWNrYm94JykpO1xyXG5cdC8vIGNvbnN0IGZvcm1GaWVsZCA9IG5ldyBNRENGb3JtRmllbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kYy1mb3JtLWZpZWxkJykpO1xyXG5cdC8vIGZvcm1GaWVsZC5pbnB1dCA9IGNoZWNrYm94O1xyXG5cclxuICAgIGxldCBzY3JlZW5TaXplID0gd2luZG93LmlubmVyV2lkdGhcclxuXHRcdHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG5cdFx0fHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHR3aW5kb3cub25yZXNpemUgPSAoZSk9PntcclxuXHRcdHNjcmVlblNpemUgPSB3aW5kb3cuaW5uZXJXaWR0aFxyXG5cdFx0fHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcblx0XHR8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKHNjcmVlblNpemUpXHJcblx0fVxyXG5cdGNvbnN0IG1vYmlsZVNpemUgPSA3Njc7XHJcblxyXG5cdC8vIE9iamVjdC5wcm90b3R5cGUuY2hhbmdlU3R5bGUgPSAoKSA9PiB7XHJcblx0Ly8gXHRpZih0aGlzKSBcclxuXHQvLyB9XHJcblx0Y29uc3QgcG9wdXBBbGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jYXJkX19wb3B1cCcpXHJcblx0Y29uc3QgcG9wdXBCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXAtYnV0dG9uJylcclxuXHRjb25zdCBmdWxsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1bGwtY29udGFpbmVyJylcclxuXHRjb25zdCBzaG93UG9wdXAgPSAoIGlkICkgPT4ge1xyXG5cdFx0Y29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYi1jYXJkX19wb3B1cFtkYXRhLWlkPVwiJytpZCsnXCJdJylcclxuXHRcdHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG5cdFx0ZnVsbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdibHVyJyk7XHJcblx0XHRmdWxsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG5cdH1cclxuXHRpZihwb3B1cEJ1dHRvbikge1xyXG5cdFx0QXJyYXkuZnJvbShwb3B1cEJ1dHRvbikuZm9yRWFjaCgoZWwpPT57XHJcblx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlPT57XHJcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdFx0XHRBcnJheS5mcm9tKHBvcHVwQWxsKS5mb3JFYWNoKChwYSk9PntcclxuXHRcdFx0XHRcdHBhLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHNob3dQb3B1cChlbC5kYXRhc2V0LmlkKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0XHJcbiAgXHJcblx0dmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5XHJcblx0dmFyIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiLW1lbnUnKVswXVxyXG5cdHZhciBidXJnZXJDb250YWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYi1idXJnZXInKVswXVxyXG5cdHZhciBidXJnZXJOYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdiLW5hdicpWzBdXHJcblx0Ly8gY29uc29sZS5sb2coW2JvZHksIGJ1cmdlckNvbnRhaW4sIGJ1cmdlck5hdl0pXHJcblx0aWYoYnVyZ2VyQ29udGFpbil7XHJcblx0XHRidXJnZXJDb250YWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gdG9nZ2xlQ2xhc3NlcygpIHtcclxuXHRcdFx0W2JvZHksIGJ1cmdlckNvbnRhaW4sIGJ1cmdlck5hdl0uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuXHRcdCAgXHRcdGVsLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSwgZmFsc2UpXHJcblx0fVxyXG5cclxuXHJcblx0Ly8gIGhvdmVyIGltZ1xyXG5cdEVsZW1lbnQucHJvdG90eXBlLmFwcGVuZEFmdGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuXHQgIGVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcywgZWxlbWVudC5uZXh0U2libGluZylcclxuXHR9LGZhbHNlXHJcblxyXG5cdGNvbnN0IGltZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWctaG92ZXInKVxyXG5cdEFycmF5LmZyb20oaW1ncykuZm9yRWFjaChlPT57XHJcblx0XHQvLyBjb25zdCBuZXdJbWcgPSBuZXcgSW1hZ2VcclxuXHRcdC8vIG5ld0ltZy5zcmMgPSBlLmdldEF0dHJpYnV0ZSgnaG92ZXItaW1nJylcclxuXHRcdGNvbnN0IHBhcmVudCA9IGUucGFyZW50Tm9kZVxyXG5cdFx0Y29uc3QgaGlkZGVuSW1nID0gZS5jbG9uZU5vZGUoKVxyXG5cdFx0aGlkZGVuSW1nLnNyYyA9IGUuZ2V0QXR0cmlidXRlKCdob3Zlci1pbWcnKVxyXG5cdFx0aGlkZGVuSW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuXHRcdGhpZGRlbkltZy5hcHBlbmRBZnRlcihlKVxyXG5cdFx0cGFyZW50Lm9ubW91c2VlbnRlciA9ICgpPT57XHJcblx0XHRcdGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG5cdFx0XHRoaWRkZW5JbWcuc3R5bGUuZGlzcGxheSA9ICcnXHJcblx0XHR9XHJcblx0XHRwYXJlbnQub25tb3VzZWxlYXZlID0gKCk9PntcdFx0XHJcblx0XHRcdGUuc3R5bGUuZGlzcGxheSA9ICcnXHJcblx0XHRcdGhpZGRlbkltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcblx0XHR9XHJcblxyXG5cdFx0ZS5wYXJlbnROb2RlLm9ubW91c2VlbnRlcigpXHJcblx0XHRlLnBhcmVudE5vZGUub25tb3VzZWxlYXZlKClcclxuXHR9KVxyXG5cclxuXHJcblx0Y29uc3QgZ2V0Q2xvc2VzdCA9IChlbGVtLCBzZWxlY3RvcikgPT4ge1xyXG5cclxuXHRcdC8vIEVsZW1lbnQubWF0Y2hlcygpIHBvbHlmaWxsXHJcblx0XHRpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcclxuXHRcdCAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID1cclxuXHRcdCAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlc1NlbGVjdG9yIHx8XHJcblx0XHQgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fFxyXG5cdFx0ICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fFxyXG5cdFx0ICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yIHx8XHJcblx0XHQgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxyXG5cdFx0ICAgICAgICBmdW5jdGlvbihzKSB7XHJcblx0XHQgICAgICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcclxuXHRcdCAgICAgICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGhcclxuXHRcdCAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IHRoaXMpIHt9XHJcblx0XHQgICAgICAgICAgICByZXR1cm4gaSA+IC0xXHJcblx0XHQgICAgICAgIH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBHZXQgdGhlIGNsb3Nlc3QgbWF0Y2hpbmcgZWxlbWVudFxyXG5cdFx0Zm9yICggOyBlbGVtICYmIGVsZW0gIT09IGRvY3VtZW50OyBlbGVtID0gZWxlbS5wYXJlbnROb2RlICkge1xyXG5cdFx0XHRpZiAoIGVsZW0ubWF0Y2hlcyggc2VsZWN0b3IgKSApIHJldHVybiBlbGVtO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvL0FkZCBjb250YWN0IHRvIGlucHV0XHJcblx0Y29uc3QgY29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNvbnRhY3RfX2l0ZW0nKVxyXG5cdC8vIGNvbnNvbGUubG9nKGNvbnRhY3QpXHJcblxyXG5cdE5vZGVMaXN0LnByb3RvdHlwZS5vbmNsaWNrID0gZnVuY3Rpb24oYyl7XHJcblxyXG5cdFx0QXJyYXkuZnJvbSh0aGlzKS5mb3JFYWNoKHQ9PntcclxuXHRcdFx0dC5vbmNsaWNrID0gKCk9PntjKHQpfVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdH0gXHJcblxyXG5cdGNvbnRhY3Qub25jbGljayhcclxuXHRcdCh0KT0+e1xyXG5cdFx0XHRsZXQgbnVtYmVyID0gdC5xdWVyeVNlbGVjdG9yKCcuYi1jb250YWN0X19pdGVtLW51bWJlcicpXHJcblx0XHRcdG51bWJlciA9IG51bWJlci5pbm5lclRleHQgfHwgbnVtYmVyLnRleHRDb250ZW50XHJcblx0XHRcdG51bWJlciA9IG51bWJlci5zdWJzdHJpbmcoMSlcclxuXHRcdFx0Z2V0Q2xvc2VzdCh0LCcuYi1jYXJkX19mb3JtLXJvdycpLnF1ZXJ5U2VsZWN0b3IoJy5waG9uZS1udW1iZXItYXJlYScpLnZhbHVlID0gbnVtYmVyXHJcblx0XHRcdGFsbENvbnRhY3RzLmZvckVhY2goYz0+e1xyXG5cdFx0XHRcdGMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0XHRcclxuXHQpXHJcblxyXG5cclxuXHJcblx0XHJcblx0Ly8gc2hvdyBDUlVEIGJ1dHRvbnNcclxuXHJcblx0Y29uc3Qgc2hvd0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNob3ctY3J1ZC1pY29ucycpXHJcblx0XHJcblxyXG5cdGlmIChzaG93SWNvbnMpIHtcclxuXHRcdEFycmF5LmZyb20oc2hvd0ljb25zKS5mb3JFYWNoKHM9PntcclxuXHRcdFx0Y29uc3QgY29udGFjdEljb25zID0gcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5iLWNvbnRhY3RfX2ljb25zJylcclxuXHRcdFx0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcblx0XHRcdFx0cy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcblx0XHRcdFx0Y29udGFjdEljb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcblxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0Ly8gdGFic1xyXG5cclxuXHR2YXIgdGFiTGlua3MgPSBuZXcgQXJyYXkoKVxyXG5cdHZhciBjb250ZW50RGl2cyA9IG5ldyBBcnJheSgpXHJcblxyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcblxyXG5cdCAgLy8gR3JhYiB0aGUgdGFiIGxpbmtzIGFuZCBjb250ZW50IGRpdnMgZnJvbSB0aGUgcGFnZVxyXG5cdCAgLy8gbGV0IGZpcnN0VGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhYnMnKVxyXG5cdCAgLy8gY29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJzJylcclxuXHQgICAgY29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJzJylcclxuXHJcblx0XHQvLyBjaGVjayBpZiB0YWJzICBleGlzdFxyXG5cdFx0Ly8gaWYgKHRhYnMubGVuZ3RoPT0wKSByZXR1cm5cclxuXHJcblx0ICAgIEFycmF5LmZyb20odGFicykuZm9yRWFjaCh0YWI9PntcclxuXHJcblxyXG5cdFx0ICB2YXIgdGFiTGlzdEl0ZW1zID0gdGFiLmNoaWxkTm9kZXNcclxuXHRcdCAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWJMaXN0SXRlbXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdCAgICBpZiAodGFiTGlzdEl0ZW1zW2ldLm5vZGVOYW1lID09IFwiQVwiKSB7XHJcblx0XHQgICAgICB2YXIgdGFiTGluayA9IHRhYkxpc3RJdGVtc1tpXVxyXG5cdFx0ICAgICAgdmFyIGlkID0gZ2V0SGFzaCh0YWJMaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpKVxyXG5cdFx0ICAgICAgdGFiTGlua3NbaWRdID0gdGFiTGlua1xyXG5cdFx0ICAgICAgY29udGVudERpdnNbaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXHJcblx0XHQgICAgfVxyXG5cdFx0ICB9XHJcblxyXG5cdFx0ICAvLyBBc3NpZ24gb25jbGljayBldmVudHMgdG8gdGhlIHRhYiBsaW5rcywgYW5kXHJcblx0XHQgIC8vIGhpZ2hsaWdodCB0aGUgZmlyc3QgdGFiXHJcblx0XHQgIGxldCBpID0gMFxyXG5cclxuXHRcdCAgZm9yIChsZXQgaWQgaW4gdGFiTGlua3MpIHtcclxuXHRcdCAgICB0YWJMaW5rc1tpZF0ub25jbGljayA9IHNob3dUYWJcclxuXHRcdCAgICB0YWJMaW5rc1tpZF0ub25mb2N1cyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0ICAgICAgdGhpcy5ibHVyKClcclxuXHRcdCAgICB9XHJcblx0XHQgICAgaWYgKGkgPT0gMCkgdGFiTGlua3NbaWRdLmNsYXNzTGlzdC5hZGQoJ3RhYi0tYWN0aXZlJylcclxuXHRcdCAgICBpKytcclxuXHRcdCAgfVxyXG5cclxuXHRcdCAgLy8gSGlkZSBhbGwgY29udGVudCBkaXZzIGV4Y2VwdCB0aGUgZmlyc3RcclxuXHRcdCAgaSA9IDBcclxuXHJcblx0XHQgIGZvciAobGV0IGlkIGluIGNvbnRlbnREaXZzKSB7XHJcblx0XHQgICAgaWYgKGkgIT0gMCkgY29udGVudERpdnNbaWRdLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG5cdFx0ICAgIGkrK1xyXG5cdFx0ICB9XHJcblxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHNob3dUYWIoZSkge1xyXG5cdCAgZS5wcmV2ZW50RGVmYXVsdFxyXG5cdCAgdmFyIHNlbGVjdGVkSWQgPSBnZXRIYXNoKHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpXHJcblxyXG5cdCAgLy8gSGlnaGxpZ2h0IHRoZSBzZWxlY3RlZCB0YWIsIGFuZCBkaW0gYWxsIG90aGVycy5cclxuXHQgIC8vIEFsc28gc2hvdyB0aGUgc2VsZWN0ZWQgY29udGVudCBkaXYsIGFuZCBoaWRlIGFsbCBvdGhlcnMuXHJcblx0ICBmb3IgKGxldCBpZCBpbiBjb250ZW50RGl2cykge1xyXG5cdCAgICBpZiAoaWQgPT0gc2VsZWN0ZWRJZCkge1xyXG5cdCAgICAgIHRhYkxpbmtzW2lkXS5jbGFzc0xpc3QuYWRkKCd0YWItLWFjdGl2ZScpXHJcblx0ICAgICAgY29udGVudERpdnNbaWRdLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKVxyXG5cdCAgICB9IGVsc2Uge1xyXG5cdCAgICAgIHRhYkxpbmtzW2lkXS5jbGFzc0xpc3QucmVtb3ZlKCd0YWItLWFjdGl2ZScpXHJcblx0ICAgICAgY29udGVudERpdnNbaWRdLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKVxyXG5cdCAgICB9XHJcblx0ICB9XHJcblxyXG5cdCAgLy8gU3RvcCB0aGUgYnJvd3NlciBmb2xsb3dpbmcgdGhlIGxpbmtcclxuXHQgIHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0Rmlyc3RDaGlsZFdpdGhUYWdOYW1lKGVsZW1lbnQsIHRhZ05hbWUpIHtcclxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0ICAgIGlmIChlbGVtZW50LmNoaWxkTm9kZXNbaV0ubm9kZU5hbWUgPT0gdGFnTmFtZSkgcmV0dXJuIGVsZW1lbnQuY2hpbGROb2Rlc1tpXVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0SGFzaCh1cmwpIHtcclxuXHQgIHZhciBoYXNoUG9zID0gdXJsLmxhc3RJbmRleE9mKCcjJylcclxuXHQgIHJldHVybiB1cmwuc3Vic3RyaW5nKGhhc2hQb3MgKyAxKVxyXG5cdH1cclxuXHJcblx0aW5pdCgpXHJcblxyXG5cdGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uKCkge1xyXG5cdCAgICBpZihkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KSB7XHJcblx0ICAgICAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKVxyXG5cdCAgICB9IGVsc2UgaWYod2luZG93LmdldFNlbGVjdGlvbikge1xyXG5cdCAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxyXG5cdCAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXHJcblx0ICAgIH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGFuaW1hdGUoZnJvbT0wLCB0bz0xMDAsIG1zPTEwMDAsIGNvbnRpbnVpbmdDYiwgZW5kZWRDYikge1xyXG5cdFx0Ly8gY29uc29sZS50aW1lKClcclxuXHRcdC8vIGNvbnNvbGUubG9nKG1zKVxyXG5cdFx0Y29uc3QgYW5pbWF0aW9uSW50ZXJ2YWwgPSBNYXRoLnJvdW5kKG1zLyhtcy8xMDAwKjI0KSlcclxuXHRcdGNvbnN0IGNoYW5naW5nUmF0ZSA9IE1hdGgucm91bmQoKHRvLWZyb20pLyhtcy8xMDAwKjI0KSlcclxuXHRcdGxldCBleHBhbmRpbmdcclxuXHRcdGlmKGZyb20gPCB0bykge1xyXG4gICAgICAgIFx0ZXhwYW5kaW5nID0gdHJ1ZSAgLy8gdXBkYXRlIHBhcmFtZXRlcnNcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFx0ZXhwYW5kaW5nID0gZmFsc2UgIC8vIHVwZGF0ZSBwYXJhbWV0ZXJzXHJcbiAgICAgICAgfVxyXG5cdCAgICBmdW5jdGlvbiBmcmFtZSgpIHtcclxuXHQgICAgXHRcclxuXHJcblx0ICAgIFx0XHJcblx0ICAgIFx0XHJcblx0ICAgICAgICBpZihleHBhbmRpbmcpIHtcclxuXHQgICAgICAgIFx0ZnJvbSArPSBjaGFuZ2luZ1JhdGVcclxuXHQgICAgICAgIH0gZWxzZSB7XHJcblx0ICAgICAgICBcdGZyb20gKz0gY2hhbmdpbmdSYXRlXHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgY29udGludWluZ0NiKGZyb20pXHJcblxyXG5cdCAgICAgICAgaWYgKChleHBhbmRpbmcgJiYgZnJvbSA+IHRvKSBcclxuXHQgICAgICAgIHx8ICghZXhwYW5kaW5nICYmIGZyb20gPCB0bykpeyAgLy8gY2hlY2sgZmluaXNoIGNvbmRpdGlvblxyXG5cdCAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaWQpXHJcblx0ICAgICAgICBcdC8vIGNvbnNvbGUudGltZUVuZCgpXHJcblx0ICAgICAgICBcdGVuZGVkQ2IoKVxyXG5cclxuXHQgICAgXHR9XHJcblx0ICAgICAgICBcclxuXHQgICAgICAgICAvLyBzaG93IGZyYW1lXHJcblx0ICAgICAgICBcclxuXHQgICAgfVxyXG5cdCAgICB2YXIgaWQgPSBzZXRJbnRlcnZhbChmcmFtZSwgYW5pbWF0aW9uSW50ZXJ2YWwpIC8vIGRyYXcgZXZlcnkgKiBtc1xyXG5cdH1cclxuXHJcblx0Y29uc3QgdG9Ob2RlcyA9IGh0bWwgPT4gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAndGV4dC9odG1sJykuYm9keS5jaGlsZE5vZGVzWzBdXHJcblx0Y29uc3QgZXhwYW5kQ2FyZCA9IGZ1bmN0aW9uKGlubmVyLCBpbm5lckluaXRpYWxIZWlnaHQsIGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHRcclxuXHRcdGNsZWFyU2VsZWN0aW9uKClcclxuXHJcblx0XHQvLyBpZiAodGhpcy5zdHlsZS5kaXNwbGF5IT0nbm9uZScpXHJcblx0XHQvLyBcdHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG5cdFx0Ly8gZWxzZSB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnJ1xyXG5cclxuXHRcdGNvbnN0IHBhcmVudENhcmQgPSBnZXRDbG9zZXN0ICh0aGlzLCAnLmItY2FyZCcpXHJcblxyXG5cdFx0Ly8gXHJcblx0XHRcclxuXHRcdC8vIGNvbnNvbGUubG9nKGlubmVySW5pdGlhbEhlaWdodClcclxuXHJcblx0XHRpZihwYXJlbnRDYXJkLmNsYXNzTGlzdC5jb250YWlucygnYi1jYXJkLS1zaHJpbmsnKSl7XHJcblxyXG5cdFx0XHRhbmltYXRlKDAsIGlubmVySW5pdGlhbEhlaWdodCwgMTAwLFxyXG5cdFx0XHRcdGZ1bmN0aW9uKG51bSl7XHJcblx0XHRcdFx0XHRpbm5lci5zdHlsZS5tYXhIZWlnaHQgPSBudW0gKyAncHgnXHJcblx0XHRcdFx0fSxcdFxyXG5cdFx0XHRcdGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRwYXJlbnRDYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2ItY2FyZC0tc2hyaW5rJylcclxuXHRcdFx0XHR9XHJcblx0XHRcdClcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbmltYXRlKGlubmVySW5pdGlhbEhlaWdodCwgMCwgMTAwLFxyXG5cdFx0XHRcdGZ1bmN0aW9uKG51bSl7XHJcblx0XHRcdFx0XHRpbm5lci5zdHlsZS5tYXhIZWlnaHQgPSBudW0gKyAncHgnXHJcblx0XHRcdFx0fSxcdFxyXG5cdFx0XHRcdGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQvLyBwYXJlbnRDYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2ItY2FyZC0tc2hyaW5rJylcclxuXHRcdFx0XHRcdGlubmVyLnN0eWxlLm1heEhlaWdodCA9IDBcclxuXHRcdFx0XHR9XHJcblx0XHRcdClcclxuXHRcdFx0cGFyZW50Q2FyZC5jbGFzc0xpc3QuYWRkKCdiLWNhcmQtLXNocmluaycpXHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGNhcmRUb3AgPSBwYXJlbnRDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5iLWNhcmRfX3RvcC0tcmlnaHQnKVxyXG5cdFx0aWYgKGNhcmRUb3ApIHtcclxuXHRcdFx0aWYgKHRoaXMuc3R5bGUuZGlzcGxheSE9J25vbmUnKXtcclxuXHRcdFx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuXHRcdFx0XHRjYXJkVG9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gJydcclxuXHRcdFx0XHRjYXJkVG9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHQvKmlmKGUudGFyZ2V0Lm5vZGVOYW1lICE9ICdBJykgcGFyZW50Q2FyZC5jbGFzc0xpc3QudG9nZ2xlKCdiLWNhcmQtLXNocmluaycpKi9cclxuXHR9XHJcblxyXG5cdFx0IC8vLyBjb3JyZWN0ZWQgZXhwYW5kaW5nIGVmZmVjdFxyXG5cdGNvbnN0IGV4cGFuZENhcmRJY29uPSB0b05vZGVzKCc8aW1nIGNsYXNzPVwiaW1nIGltZ19faWNvbiBwdWxsLXJpZ2h0IG5vLW1hcmdpbiByb3RhdGUtOTAgZXhwYW5kLWNhcmQtaWNvblwiIHNyYz1cIi4vaW1nL2ljb25zL2NvZGUuc3ZnXCIgc3R5bGU9XCJ3aWR0aDoyMHB4O2hlaWdodDogYXV0b1wiPicpXHJcblx0Y29uc3QgY2FyZFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNhcmRfX3RvcDpub3QoLm5vLWV4cGFuZCknKVxyXG5cdGNvbnN0IGNhcmRUb3BSaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNhcmRfX3RvcC0tcmlnaHQnKVxyXG5cdGlmKGNhcmRUb3AubGVuZ3RoPjApe1xyXG5cclxuXHRcdC8vIGxldCBydWxlU3RyaW5nID0gJydcclxuXHRcdFxyXG5cdFx0bGV0IGFkZENsaWNrTGlzdGVuZXJUb0V4cGFuZENhcmRcclxuXHJcblxyXG5cdFx0KGFkZENsaWNrTGlzdGVuZXJUb0V4cGFuZENhcmQgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRBcnJheS5mcm9tKGNhcmRUb3ApLmZvckVhY2goKGVsLCBpKT0+e1xyXG5cdFx0XHRcdC8vIHNocmluayBpbm5lciBzaWRlIG9mIGNhcmRcclxuXHRcdFx0XHQvLyBhZGRpbmcgbWF4IGhlaWdodCBmb3IgdHJhbnNpdGlvbiBlZmZlY3RcclxuXHJcblx0XHRcdFx0Y29uc3QgcGFyZW50ID0gZWwucGFyZW50Tm9kZVxyXG5cdFx0XHRcdGNvbnN0IGlubmVyID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5iLWNhcmRfX2lubmVyJylcclxuXHRcdFx0XHRpbm5lci5zdHlsZS5tYXhIZWlnaHQgPSAnZml0LWNvbnRlbnQnXHJcblx0XHRcdFx0Y29uc3QgaW5uZXJJbml0aWFsSGVpZ2h0ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5iLWNhcmRfX2lubmVyJykub2Zmc2V0SGVpZ2h0IC8vIHdlIGRvIGl0IGhlcmUgdG8gZ2V0IHRoZSBoZWlnaHQgYmVmb3JlIHNocmlua2luZ1xyXG5cdFx0XHRcdC8vIGlmKGlubmVySGVpZ2h0PmhpZ2hlcklubmVyKSBoaWdoZXJJbm5lciA9IGlubmVySGVpZ2h0XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coZWxIZWlnaHQpXHJcblx0XHRcdFx0Ly8gcnVsZVN0cmluZyArPSAnLmItY2FyZF9faW5uZXI6bnRoLW9mLXR5cGUoJyArIGkgKyAnKXttYXgtaGVpZ2h0OiAnICsgZWxIZWlnaHQgKyAncHh9J1xyXG5cdFx0XHRcdC8vIGVsLnN0eWxlLm1heEhlaWdodCA9IGVsSGVpZ2h0XHJcblx0XHRcdFx0Ly8gY29uc29sZS5sb2coaW5uZXJJbml0aWFsSGVpZ2h0KVxyXG5cclxuXHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnYi1jYXJkLS1zaHJpbmsnKVxyXG5cdFx0XHRcdGlubmVyLnN0eWxlLm1heEhlaWdodCA9IDBcclxuXHJcblx0XHRcdFx0Y29uc3QgZXhwYW5kQ2FyZEljb25DbG9uZSA9IGV4cGFuZENhcmRJY29uLmNsb25lTm9kZSgpXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0ZWwuYXBwZW5kQ2hpbGQoZXhwYW5kQ2FyZEljb25DbG9uZSlcclxuXHJcblx0XHRcdFx0Y29uc3QgdGhpc0NhcmRUb3AgPSBnZXRDbG9zZXN0KGV4cGFuZENhcmRJY29uQ2xvbmUsICcuYi1jYXJkX190b3AnKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8vIHRoaXNDYXJkVG9wLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXhwYW5kT3JTaHJpbmspXHJcblx0XHRcdFx0Ly8gdGhpc0NhcmRUb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBleHBhbmRPclNocmluaylcclxuXHRcdFx0XHR0aGlzQ2FyZFRvcC5vbmNsaWNrID0gZXhwYW5kQ2FyZC5iaW5kKGV4cGFuZENhcmRJY29uQ2xvbmUsIGlubmVyLCBpbm5lckluaXRpYWxIZWlnaHQpXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRBcnJheS5mcm9tKGNhcmRUb3BSaWdodCkuZm9yRWFjaChlbD0+e1xyXG5cdFx0XHRcdGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuXHRcdFx0fSlcclxuXHRcdH0pKClcclxuXHJcblx0XHRcclxuXHJcblx0XHRcclxuXHJcblxyXG5cdFx0bGV0IHJlc2l6ZVRpbWVyXHJcblx0XHR3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xyXG5cdFx0XHRyZXNpemVUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0XHRcdGFkZENsaWNrTGlzdGVuZXJUb0V4cGFuZENhcmQoKVxyXG5cdFx0XHQgICAgICAgIFxyXG5cdFx0XHR9LCAyNTApO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHRjb25zdCBiTmF2SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmItbmF2X19oZWFkZXInKVxyXG5cdGxldCBiTmF2SGVhZGVyVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ItbmF2X19oZWFkZXInKVxyXG5cdGlmKGJOYXZIZWFkZXIgJiYgYk5hdkhlYWRlclRleHQpe1xyXG5cdFx0Yk5hdkhlYWRlclRleHQgPSBiTmF2SGVhZGVyVGV4dC5pbm5lclRleHQgfHwgYk5hdkhlYWRlclRleHQudGV4dENvbnRlbnRcclxuXHRcdGJOYXZIZWFkZXIuaW5uZXJUZXh0ID0gYk5hdkhlYWRlclRleHRcclxuXHR9XHJcblxyXG5cclxuXHQvLyAgY2hhbmdlIHBhZ2UgYnV0dG9uXHJcblx0Ly8gbGV0IHBhZ2UgPSAxXHJcblx0Ly8gbGV0IHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcblx0Ly8gbGV0IHBhZ2UgPSBwYXJzZUludCh1cmwuc3Vic3RyaW5nKHVybC5pbmRleE9mKCcuaHRtbCcpLTEsIHVybC5pbmRleE9mKCcuaHRtbCcpKVxyXG5cdC8vIGNvbnNvbGUubG9nKHBhZ2UrMSlcclxuXHQvLyBsZXQgbmV3VXJsID0gdXJsLnJlcGxhY2VcclxuXHQvLyBjb25zb2xlLmxvZyh1cmwpXHJcblx0Ly8gY29uc3QgY2hhbmdlUGFnZUJ0biA9ICc8YSBocmVmPVwiXCI+J1xyXG5cclxuXHRjb25zdCBzd2l0Y2hDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLWNhcmRfX2lubmVyLS1zd2l0Y2gnKVxyXG5cdFxyXG5cdGlmIChzd2l0Y2hDYXJkcykge1xyXG5cdFx0Y29uc3QgY2hlY2tJbnB1dHNBbmRBZGRBY3RpdmVDbGFzcyA9IChlLCBpbnB1dCwgc3dpdGNoVGV4dCk9PntcclxuXHRcdFx0aWYoIWlucHV0KSByZXR1cm4gZmFsc2VcclxuXHRcdFx0aWYgKGlucHV0LmNoZWNrZWQpIHtcclxuXHRcdFx0XHRlLmNsYXNzTGlzdC5hZGQoJ2ItY2FyZF9faW5uZXItLXN3aXRjaC0tY2hlY2tlZCcpXHJcblx0XHRcdFx0c3dpdGNoVGV4dC5pbm5lclRleHQgPSAnQUtUxLBWRMSwUidcclxuXHRcdFx0XHRzd2l0Y2hUZXh0LmNsYXNzTGlzdC5hZGQoJ2dyZWVuJylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlLmNsYXNzTGlzdC5yZW1vdmUoJ2ItY2FyZF9faW5uZXItLXN3aXRjaC0tY2hlY2tlZCcpXHJcblx0XHRcdFx0c3dpdGNoVGV4dC5pbm5lclRleHQgPSAnREVBS1TEsFZExLBSJ1xyXG5cdFx0XHRcdHN3aXRjaFRleHQuY2xhc3NMaXN0LnJlbW92ZSgnZ3JlZW4nKVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRBcnJheS5mcm9tKHN3aXRjaENhcmRzKS5mb3JFYWNoKChlKT0+e1xyXG5cdFx0XHRjb25zdCBpbnB1dCA9IGUucXVlcnlTZWxlY3RvcignLnN3aXRjaF9fY2hlY2tib3gnKVxyXG5cdFx0XHRjb25zdCBzd2l0Y2hUZXh0ID0gZS5xdWVyeVNlbGVjdG9yKCcuc3dpdGNoX190ZXh0JylcclxuXHJcblx0XHRcdGNoZWNrSW5wdXRzQW5kQWRkQWN0aXZlQ2xhc3MoZSwgaW5wdXQsIHN3aXRjaFRleHQpXHJcblx0XHRcdGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCk9PntcclxuXHRcdFx0XHRjaGVja0lucHV0c0FuZEFkZEFjdGl2ZUNsYXNzKGUsIGlucHV0LCBzd2l0Y2hUZXh0KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGNvbnN0IGNsaWVudE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xpZW50LW1lc3NhZ2UnKVxyXG5cdGlmIChjbGllbnRNZXNzYWdlKSB7XHJcblx0XHRsZXQgY291bnQsIG1lc3NhZ2VDb3VudFxyXG5cdFx0Y29uc3QgbGltaXQgPSA1MDBcclxuXHRcdGNvbnN0IHBhcmVudCA9IGNsaWVudE1lc3NhZ2UucGFyZW50Tm9kZVxyXG5cdFx0Y29uc3QgY3VycmVudENoYXJzID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LWNoYXJzJylcclxuXHRcdGNvbnN0IG1lc3NhZ2VDb3VudERPTSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1jb3VudCcpXHJcblx0XHRjbGllbnRNZXNzYWdlLm9ua2V5dXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRjb3VudCA9IHRoaXMudmFsdWUubGVuZ3RoXHJcblx0XHRcdGN1cnJlbnRDaGFycy5pbm5lclRleHQgPSBjb3VudFxyXG5cdFx0XHRcclxuXHRcdFx0bWVzc2FnZUNvdW50ID0gTWF0aC5mbG9vcigoY291bnQtMSkvbGltaXQpKzFcclxuXHRcdFx0LyptZXNzYWdlQ291bnRET00uaW5uZXJUZXh0ID0gbWVzc2FnZUNvdW50Ki9cclxuXHRcdFx0XHJcblx0XHRcdC8vIGlmKGNvdW50PD1saW1pdCkgbWVzc2FnZUNvdW50RE9NLmlubmVyVGV4dCA9IDFcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHQvLy8gc3RpY2sgZm9vdGVyIGJvdHRvbVxyXG5cdGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKVxyXG5cdGNvbnN0IGZ1bGxDb250YWluZXJIZWlnaHQgPSBmdWxsQ29udGFpbmVyLm9mZnNldEhlaWdodFxyXG5cdGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxyXG5cclxuXHRpZih3aW5kb3dIZWlnaHQ+ZnVsbENvbnRhaW5lckhlaWdodCl7XHJcblx0XHRmb290ZXIuc3R5bGUubWFyZ2luVG9wID0gKHdpbmRvd0hlaWdodC1mdWxsQ29udGFpbmVySGVpZ2h0LWZvb3Rlci5vZmZzZXRIZWlnaHQpKydweCdcclxuXHR9XHJcblxyXG5cclxuXHRjb25zdCBydWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iLWNhcmRfX3J1bGVzJylcclxuXHRpZihydWxlcyl7XHJcblx0XHRydWxlcy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+XHJcblx0XHR7XHJcblx0XHQgICAgY29uc3QgZWxlbWVudCA9IGV2ZW50LnRhcmdldDtcclxuXHRcdCAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgLSBNYXRoLnJvdW5kKGVsZW1lbnQuc2Nyb2xsVG9wKSA9PT0gZWxlbWVudC5jbGllbnRIZWlnaHQpXHJcblx0XHQgICAge1xyXG5cdFx0ICAgIFx0Y29uc3QgaUFjY2VwdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pLWFjY2VwdC1idXR0b24nKVxyXG5cdFx0ICAgICAgICBpZihpQWNjZXB0QnV0dG9uKXtcclxuXHRcdCAgICAgICAgXHRpQWNjZXB0QnV0dG9uLmRpc2FibGVkID0gZmFsc2VcclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgIH1cclxuXHRcdH0pO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdGNvbnN0IHNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWF0ZXJpYWwtc2VsZWN0JylcclxuXHRBcnJheS5mcm9tKHNlbGVjdHMpLmZvckVhY2goKHMpPT57XHJcblx0XHQvLyBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHRcdC8vIHdyYXBwZXIuY2xhc3NOYW1lID0gJ2lubGluZS1ibG9jay13cmFwcGVyJ1xyXG5cdFx0Ly8gd3JhcHBlci5hcHBlbmRDaGlsZChzKVxyXG5cdFx0Y29uc3QgZHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG5cdFx0ZHJvcGRvd24uY2xhc3NOYW1lID0gJ21hdGVyaWFsLXNlbGVjdF9fb3B0aW9ucydcclxuXHJcblx0XHRjb25zdCBvcHRpb25zID0gcy5xdWVyeVNlbGVjdG9yQWxsKCdvcHRpb24nKVxyXG5cdFx0QXJyYXkuZnJvbShvcHRpb25zKS5mb3JFYWNoKG89PntcclxuXHRcdFx0Y29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSBcclxuXHRcdFx0cC5jbGFzc05hbWUgPSAnbWF0ZXJpYWwtc2VsZWN0X19vcHRpb24nXHJcblx0XHRcdHAuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG8udmFsdWUpXHJcblx0XHRcdHAuaW5uZXJIVE1MID0gby50ZXh0XHJcblx0XHRcdGRyb3Bkb3duLmFwcGVuZENoaWxkKHApXHJcblx0XHRcdGRyb3Bkb3duLmFwcGVuZEFmdGVyKHMpXHJcblx0XHRcdHAub25jbGljayA9IChlKT0+e1xyXG5cdFx0XHRcdHMudmFsdWUgPSBvLnZhbHVlXHJcblx0XHRcdFx0ZHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgnbWF0ZXJpYWwtc2VsZWN0X19vcHRpb25zLS12aXNpYmxlJylcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdHMub25tb3VzZWRvd24gPSAoZSk9PntcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdGRyb3Bkb3duLmNsYXNzTGlzdC50b2dnbGUoJ21hdGVyaWFsLXNlbGVjdF9fb3B0aW9ucy0tdmlzaWJsZScpXHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fSlcclxuXHJcblxyXG4vKlx0Ly8gYWNjb3JkaW9uIHNjcmlwdCBiZWdpblxyXG5cdGNvbnN0IGNvbXBhbnlfYWNjb3JkaW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbXBhbnlfX2FjY29yZGlvbicpO1xyXG5cdGlmKGNvbXBhbnlfYWNjb3JkaW9uKSB7XHJcblx0XHRBcnJheS5mcm9tKGNvbXBhbnlfYWNjb3JkaW9uKS5mb3JFYWNoKChlbCk9PntcclxuXHRcdFx0Y29uc3QgYWNjb3JkaW9uX2hlYWRlciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jb21wYW55X19oZWFkZXInKTtcclxuXHRcdFx0Y29uc3QgYWNjb3JkaW9uX3RleHQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuYi1qdW1ib3Ryb24nKTtcclxuXHJcblx0XHRcdGFjY29yZGlvbl9oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0YWNjb3JkaW9uX3RleHQuY2xhc3NMaXN0LmFkZCgnY29tcGFueV9fYWNjb3JkaW9uLS1oaWRlJylcclxuXHRcdFx0fSlcclxuXHJcblx0XHR9KVxyXG5cdH0qL1xyXG5cclxuXHQvL2F1dG9jb21wbGV0ZSBzY3JpcHQgYmVnaW4gXHJcblx0Y29uc3QgY29tcGxldGVfaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXV0b2NvbXBsZXRlIGlucHV0Jyk7IFxyXG5cdGlmKGNvbXBsZXRlX2lucHV0Lmxlbmd0aCA+IDAgKSB7XHJcblx0XHRcclxuXHRcdGZ1bmN0aW9uIGF1dG9jb21wbGV0ZShpbnAsIGFycikge1xyXG5cdFx0ICAvKnRoZSBhdXRvY29tcGxldGUgZnVuY3Rpb24gdGFrZXMgdHdvIGFyZ3VtZW50cyxcclxuXHRcdCAgdGhlIHRleHQgZmllbGQgZWxlbWVudCBhbmQgYW4gYXJyYXkgb2YgcG9zc2libGUgYXV0b2NvbXBsZXRlZCB2YWx1ZXM6Ki9cclxuXHRcdCAgdmFyIGN1cnJlbnRGb2N1cztcclxuXHRcdCAgLypleGVjdXRlIGEgZnVuY3Rpb24gd2hlbiBzb21lb25lIHdyaXRlcyBpbiB0aGUgdGV4dCBmaWVsZDoqL1xyXG5cdFx0ICBpbnAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICAgIHZhciBhLCBiLCBpLCB2YWwgPSB0aGlzLnZhbHVlO1xyXG5cdFx0ICAgICAgLypjbG9zZSBhbnkgYWxyZWFkeSBvcGVuIGxpc3RzIG9mIGF1dG9jb21wbGV0ZWQgdmFsdWVzKi9cclxuXHRcdCAgICAgIGNsb3NlQWxsTGlzdHMoKTtcclxuXHRcdCAgICAgIGlmICghdmFsKSB7IHJldHVybiBmYWxzZTt9XHJcblx0XHQgICAgICBjdXJyZW50Rm9jdXMgPSAtMTtcclxuXHRcdCAgICAgIC8qY3JlYXRlIGEgRElWIGVsZW1lbnQgdGhhdCB3aWxsIGNvbnRhaW4gdGhlIGl0ZW1zICh2YWx1ZXMpOiovXHJcblx0XHQgICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcclxuXHRcdCAgICAgIGEuc2V0QXR0cmlidXRlKFwiaWRcIiwgdGhpcy5pZCArIFwiYXV0b2NvbXBsZXRlLWxpc3RcIik7XHJcblx0XHQgICAgICBhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYXV0b2NvbXBsZXRlLWl0ZW1zXCIpO1xyXG5cdFx0ICAgICAgLyphcHBlbmQgdGhlIERJViBlbGVtZW50IGFzIGEgY2hpbGQgb2YgdGhlIGF1dG9jb21wbGV0ZSBjb250YWluZXI6Ki9cclxuXHRcdCAgICAgIHRoaXMucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChhKTtcclxuXHRcdCAgICAgIC8qZm9yIGVhY2ggaXRlbSBpbiB0aGUgYXJyYXkuLi4qL1xyXG5cdFx0ICAgICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG5cdFx0ICAgICAgICAvKmNoZWNrIGlmIHRoZSBpdGVtIHN0YXJ0cyB3aXRoIHRoZSBzYW1lIGxldHRlcnMgYXMgdGhlIHRleHQgZmllbGQgdmFsdWU6Ki9cclxuXHRcdCAgICAgICAgaWYgKGFycltpXS5zdWJzdHIoMCwgdmFsLmxlbmd0aCkudG9VcHBlckNhc2UoKSA9PSB2YWwudG9VcHBlckNhc2UoKSkge1xyXG5cdFx0ICAgICAgICAgIC8qY3JlYXRlIGEgRElWIGVsZW1lbnQgZm9yIGVhY2ggbWF0Y2hpbmcgZWxlbWVudDoqL1xyXG5cdFx0ICAgICAgICAgIGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xyXG5cdFx0ICAgICAgICAgIC8qbWFrZSB0aGUgbWF0Y2hpbmcgbGV0dGVycyBib2xkOiovXHJcblx0XHQgICAgICAgICAgYi5pbm5lckhUTUwgPSBcIjxzdHJvbmc+XCIgKyBhcnJbaV0uc3Vic3RyKDAsIHZhbC5sZW5ndGgpICsgXCI8L3N0cm9uZz5cIjtcclxuXHRcdCAgICAgICAgICBiLmlubmVySFRNTCArPSBhcnJbaV0uc3Vic3RyKHZhbC5sZW5ndGgpO1xyXG5cdFx0ICAgICAgICAgIC8qaW5zZXJ0IGEgaW5wdXQgZmllbGQgdGhhdCB3aWxsIGhvbGQgdGhlIGN1cnJlbnQgYXJyYXkgaXRlbSdzIHZhbHVlOiovXHJcblx0XHQgICAgICAgICAgYi5pbm5lckhUTUwgKz0gXCI8aW5wdXQgdHlwZT0naGlkZGVuJyB2YWx1ZT0nXCIgKyBhcnJbaV0gKyBcIic+XCI7XHJcblx0XHQgICAgICAgICAgLypleGVjdXRlIGEgZnVuY3Rpb24gd2hlbiBzb21lb25lIGNsaWNrcyBvbiB0aGUgaXRlbSB2YWx1ZSAoRElWIGVsZW1lbnQpOiovXHJcblx0XHQgICAgICAgICAgICAgIGIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuXHRcdCAgICAgICAgICAgICAgLyppbnNlcnQgdGhlIHZhbHVlIGZvciB0aGUgYXV0b2NvbXBsZXRlIHRleHQgZmllbGQ6Ki9cclxuXHRcdCAgICAgICAgICAgICAgaW5wLnZhbHVlID0gdGhpcy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdLnZhbHVlO1xyXG5cdFx0ICAgICAgICAgICAgICAvKmNsb3NlIHRoZSBsaXN0IG9mIGF1dG9jb21wbGV0ZWQgdmFsdWVzLFxyXG5cdFx0ICAgICAgICAgICAgICAob3IgYW55IG90aGVyIG9wZW4gbGlzdHMgb2YgYXV0b2NvbXBsZXRlZCB2YWx1ZXM6Ki9cclxuXHRcdCAgICAgICAgICAgICAgY2xvc2VBbGxMaXN0cygpO1xyXG5cdFx0ICAgICAgICAgIH0pO1xyXG5cdFx0ICAgICAgICAgIGEuYXBwZW5kQ2hpbGQoYik7XHJcblx0XHQgICAgICAgIH1cclxuXHRcdCAgICAgIH1cclxuXHRcdCAgfSk7XHJcblx0XHQgIC8qZXhlY3V0ZSBhIGZ1bmN0aW9uIHByZXNzZXMgYSBrZXkgb24gdGhlIGtleWJvYXJkOiovXHJcblx0XHQgIGlucC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKSB7XHJcblx0XHQgICAgICB2YXIgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQgKyBcImF1dG9jb21wbGV0ZS1saXN0XCIpO1xyXG5cdFx0ICAgICAgaWYgKHgpIHggPSB4LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiZGl2XCIpO1xyXG5cdFx0ICAgICAgaWYgKGUua2V5Q29kZSA9PSA0MCkge1xyXG5cdFx0ICAgICAgICAvKklmIHRoZSBhcnJvdyBET1dOIGtleSBpcyBwcmVzc2VkLFxyXG5cdFx0ICAgICAgICBpbmNyZWFzZSB0aGUgY3VycmVudEZvY3VzIHZhcmlhYmxlOiovXHJcblx0XHQgICAgICAgIGN1cnJlbnRGb2N1cysrO1xyXG5cdFx0ICAgICAgICAvKmFuZCBhbmQgbWFrZSB0aGUgY3VycmVudCBpdGVtIG1vcmUgdmlzaWJsZToqL1xyXG5cdFx0ICAgICAgICBhZGRBY3RpdmUoeCk7XHJcblx0XHQgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzOCkgeyAvL3VwXHJcblx0XHQgICAgICAgIC8qSWYgdGhlIGFycm93IFVQIGtleSBpcyBwcmVzc2VkLFxyXG5cdFx0ICAgICAgICBkZWNyZWFzZSB0aGUgY3VycmVudEZvY3VzIHZhcmlhYmxlOiovXHJcblx0XHQgICAgICAgIGN1cnJlbnRGb2N1cy0tO1xyXG5cdFx0ICAgICAgICAvKmFuZCBhbmQgbWFrZSB0aGUgY3VycmVudCBpdGVtIG1vcmUgdmlzaWJsZToqL1xyXG5cdFx0ICAgICAgICBhZGRBY3RpdmUoeCk7XHJcblx0XHQgICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAxMykge1xyXG5cdFx0ICAgICAgICAvKklmIHRoZSBFTlRFUiBrZXkgaXMgcHJlc3NlZCwgcHJldmVudCB0aGUgZm9ybSBmcm9tIGJlaW5nIHN1Ym1pdHRlZCwqL1xyXG5cdFx0ICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHQgICAgICAgIGlmIChjdXJyZW50Rm9jdXMgPiAtMSkge1xyXG5cdFx0ICAgICAgICAgIC8qYW5kIHNpbXVsYXRlIGEgY2xpY2sgb24gdGhlIFwiYWN0aXZlXCIgaXRlbToqL1xyXG5cdFx0ICAgICAgICAgIGlmICh4KSB4W2N1cnJlbnRGb2N1c10uY2xpY2soKTtcclxuXHRcdCAgICAgICAgfVxyXG5cdFx0ICAgICAgfVxyXG5cdFx0ICB9KTtcclxuXHRcdCAgZnVuY3Rpb24gYWRkQWN0aXZlKHgpIHtcclxuXHRcdCAgICAvKmEgZnVuY3Rpb24gdG8gY2xhc3NpZnkgYW4gaXRlbSBhcyBcImFjdGl2ZVwiOiovXHJcblx0XHQgICAgaWYgKCF4KSByZXR1cm4gZmFsc2U7XHJcblx0XHQgICAgLypzdGFydCBieSByZW1vdmluZyB0aGUgXCJhY3RpdmVcIiBjbGFzcyBvbiBhbGwgaXRlbXM6Ki9cclxuXHRcdCAgICByZW1vdmVBY3RpdmUoeCk7XHJcblx0XHQgICAgaWYgKGN1cnJlbnRGb2N1cyA+PSB4Lmxlbmd0aCkgY3VycmVudEZvY3VzID0gMDtcclxuXHRcdCAgICBpZiAoY3VycmVudEZvY3VzIDwgMCkgY3VycmVudEZvY3VzID0gKHgubGVuZ3RoIC0gMSk7XHJcblx0XHQgICAgLyphZGQgY2xhc3MgXCJhdXRvY29tcGxldGUtYWN0aXZlXCI6Ki9cclxuXHRcdCAgICB4W2N1cnJlbnRGb2N1c10uY2xhc3NMaXN0LmFkZChcImF1dG9jb21wbGV0ZS1hY3RpdmVcIik7XHJcblx0XHQgIH1cclxuXHRcdCAgZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKHgpIHtcclxuXHRcdCAgICAvKmEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBcImFjdGl2ZVwiIGNsYXNzIGZyb20gYWxsIGF1dG9jb21wbGV0ZSBpdGVtczoqL1xyXG5cdFx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xyXG5cdFx0ICAgICAgeFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiYXV0b2NvbXBsZXRlLWFjdGl2ZVwiKTtcclxuXHRcdCAgICB9XHJcblx0XHQgIH1cclxuXHRcdCAgZnVuY3Rpb24gY2xvc2VBbGxMaXN0cyhlbG1udCkge1xyXG5cdFx0ICAgIC8qY2xvc2UgYWxsIGF1dG9jb21wbGV0ZSBsaXN0cyBpbiB0aGUgZG9jdW1lbnQsXHJcblx0XHQgICAgZXhjZXB0IHRoZSBvbmUgcGFzc2VkIGFzIGFuIGFyZ3VtZW50OiovXHJcblx0XHQgICAgdmFyIHggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYXV0b2NvbXBsZXRlLWl0ZW1zXCIpO1xyXG5cdFx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xyXG5cdFx0ICAgICAgaWYgKGVsbW50ICE9IHhbaV0gJiYgZWxtbnQgIT0gaW5wKSB7XHJcblx0XHQgICAgICB4W2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoeFtpXSk7XHJcblx0XHQgICAgfVxyXG5cdFx0ICB9XHJcblx0XHR9XHJcblx0XHQvKmV4ZWN1dGUgYSBmdW5jdGlvbiB3aGVuIHNvbWVvbmUgY2xpY2tzIGluIHRoZSBkb2N1bWVudDoqL1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQgICAgY2xvc2VBbGxMaXN0cyhlLnRhcmdldCk7XHJcblx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgZGVwYXJ0bWVudCA9IFtcIk1hbGl5ecmZXCIsXCJNYXJrZXRpbnFcIl07XHJcblx0XHRpZihkZXBhcnRtZW50KSB7XHJcblx0XHRcdGF1dG9jb21wbGV0ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlcGFydG1lbnRcIiksIGRlcGFydG1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0Ly9hdXRvY29tcGxldGUgc2NyaXB0IGVuZFxyXG5cclxuXHJcblx0Ly8gdGFibGUgc2NyaXB0IGJlZ2luXHJcblx0Y29uc3QgdGFibGVfZXhwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGUgLmItdGFibGVfX3dyYXBwZXInKVxyXG5cclxuXHRpZih0YWJsZV9leHBvcnQpIHtcclxuXHRcdEFycmF5LmZyb20odGFibGVfZXhwb3J0KS5mb3JFYWNoKChlbCk9PntcclxuXHRcdFx0Y29uc3QgZG93bmxvYWRfYnRuID0gZWwucXVlcnlTZWxlY3RvcignLmItdGFibGVfX2V4cG9ydC1kb3dubG9hZCcpO1xyXG5cdFx0XHRjb25zdCBleHBvcnRfYnRucyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5iLXRhYmxlX19leHBvcnQtYnRucycpO1xyXG5cclxuXHRcdFx0aWYoZG93bmxvYWRfYnRuKSB7XHJcblxyXG5cdFx0XHRcdGRvd25sb2FkX2J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdGRvd25sb2FkX2J0bi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdFx0XHRleHBvcnRfYnRucy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG5cdFx0XHRcdH0pXHJcblxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblxyXG5cdGNvbnN0IHRhYmxlX2NvbGxhcHNlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1jb2xsYXBzZWQnKTtcclxuXHJcblx0aWYodGFibGVfY29sbGFwc2VkKSB7XHJcblxyXG5cdFx0QXJyYXkuZnJvbSh0YWJsZV9jb2xsYXBzZWQpLmZvckVhY2goKHRjKT0+e1xyXG5cclxuXHJcblx0XHRcdGNvbnN0IHRhYmxlX3JvbGxfYnRuID0gdGMucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGVfX3JvbGwtaWNvbicpO1xyXG5cdFx0ICBcdGlmKHRhYmxlX3JvbGxfYnRuKSB7XHJcblxyXG5cdFx0XHRcdEFycmF5LmZyb20odGFibGVfcm9sbF9idG4pLmZvckVhY2goKGVsKT0+e1xyXG5cdFx0XHRcdFx0ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCBfdGFibGVfaWNvbnNfdGQgPSBlbC5wYXJlbnROb2RlO1xyXG5cdFx0XHRcdFx0XHRjb25zdCBfdGFibGVfaWNvbnNfdGRfaW5kZXggPSBBcnJheS5mcm9tKF90YWJsZV9pY29uc190ZC5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKF90YWJsZV9pY29uc190ZCk7XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCB0YWJsZV90ciA9IHRjLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZSB0cjpub3QoLmItdGFibGVfX2hvdmVyKScpO1xyXG5cclxuXHRcdFx0XHRcdFx0QXJyYXkuZnJvbSh0YWJsZV90cikuZm9yRWFjaCgodHIpPT57XHJcblx0XHRcdFx0XHRcdFx0dHIucXVlcnlTZWxlY3RvckFsbCgndGQgLCB0aCcpW190YWJsZV9pY29uc190ZF9pbmRleF0uY2xhc3NMaXN0LmFkZCgnYi10YWJsZV9fcm9sbGVkJyk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCB0YWJsZV9pY29uc190ZCA9IHRjLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLXRhYmxlX19ob3ZlciB0ZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0dGFibGVfaWNvbnNfdGRbX3RhYmxlX2ljb25zX3RkX2luZGV4XS5jbGFzc0xpc3QuYWRkKCdiLXRhYmxlX19zaG93X3Vucm9sbC1pY29uJyk7XHJcblxyXG5cdFx0XHRcdFx0fSwgZmFsc2UpO1xyXG5cdFx0XHRcdH0pXHJcbiAgXHRcdFx0fVxyXG5cclxuICBcdFx0XHRjb25zdCB0YWJsZV91bnJvbGxfYnRuID0gdGMucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGVfX3Vucm9sbC1pY29uJyk7XHJcblx0XHRcdGlmKHRhYmxlX3Vucm9sbF9idG4pIHtcclxuXHJcblx0XHRcdCAgICBBcnJheS5mcm9tKHRhYmxlX3Vucm9sbF9idG4pLmZvckVhY2goKGVsKT0+e1xyXG5cdFx0XHQgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQgICAgICAgIFxyXG5cdFx0XHRcdCAgICAgICAgY29uc3QgX3RhYmxlX2ljb25zX3RkID0gZWwucGFyZW50Tm9kZTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgX3RhYmxlX2ljb25zX3RkX2luZGV4ID0gQXJyYXkuZnJvbShfdGFibGVfaWNvbnNfdGQucGFyZW50Tm9kZS5jaGlsZHJlbikuaW5kZXhPZihfdGFibGVfaWNvbnNfdGQpO1xyXG5cclxuXHRcdFx0XHQgICAgICAgIGNvbnN0IHRhYmxlX3RyID0gdGMucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlIHRyOm5vdCguYi10YWJsZV9faG92ZXIpJyk7XHJcblxyXG5cdFx0XHRcdCAgICAgICAgQXJyYXkuZnJvbSh0YWJsZV90cikuZm9yRWFjaCgodHIpPT57XHJcblx0XHRcdFx0XHRcdFx0dHIucXVlcnlTZWxlY3RvckFsbCgndGQgLCB0aCcpW190YWJsZV9pY29uc190ZF9pbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYi10YWJsZV9fcm9sbGVkJyk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdCAgICAgICAgY29uc3QgdGFibGVfaWNvbnNfdGQgPSB0Yy5xdWVyeVNlbGVjdG9yQWxsKCcuYi10YWJsZV9faG92ZXIgdGQnKTtcclxuXHJcblx0XHRcdFx0XHRcdHRhYmxlX2ljb25zX3RkW190YWJsZV9pY29uc190ZF9pbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYi10YWJsZV9fc2hvd191bnJvbGwtaWNvbicpO1xyXG5cclxuXHRcdFx0ICAgICAgICB9LCBmYWxzZSk7XHJcblx0XHRcdCAgICB9KVxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0Y29uc3QgZmlyc3RSb3cgPSB0Yy5xdWVyeVNlbGVjdG9yKCcuYi10YWJsZV9faG92ZXInKTtcclxuXHRcdFx0Y29uc3QgaG92ZXJfaW5fb3V0ID0gdGMucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlIHRoLCAuYi10YWJsZV9faG92ZXIgdGQnKTtcclxuXHJcblx0XHRcdEFycmF5LmZyb20oaG92ZXJfaW5fb3V0KS5mb3JFYWNoKChlbCk9PntcclxuXHRcdFx0XHRlbC5vbm1vdXNlZW50ZXIgPSAoKT0+e1xyXG5cdFx0XHRcdFx0Y29uc3QgaG92ZXJfZWxfaW5kZXggPSBBcnJheS5mcm9tKGVsLnBhcmVudE5vZGUuY2hpbGRyZW4pLmluZGV4T2YoZWwpO1xyXG5cdFx0XHRcdFx0Zmlyc3RSb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKVtob3Zlcl9lbF9pbmRleF0uY2xhc3NMaXN0LmFkZCgnYi10YWJsZV9fc2hvd19hbGwtaWNvbnMnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRBcnJheS5mcm9tKGhvdmVyX2luX291dCkuZm9yRWFjaCgoZWwpPT57XHJcblx0XHRcdFx0ZWwub25tb3VzZWxlYXZlID0gKCk9PntcclxuXHRcdFx0XHRcdGNvbnN0IGhvdmVyX2VsX2luZGV4ID0gQXJyYXkuZnJvbShlbC5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKGVsKTtcclxuXHRcdFx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ItdGFibGVfX3Nob3dfYWxsLWljb25zJylcclxuXHRcdFx0XHRcdGZpcnN0Um93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbaG92ZXJfZWxfaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2ItdGFibGVfX3Nob3dfYWxsLWljb25zJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cclxuXHJcblx0XHRcdGNvbnN0IHRhYmxlX3NlYXJjaF9idG4gPSB0Yy5xdWVyeVNlbGVjdG9yQWxsKCcuYi10YWJsZV9fc2VhcmNoLWljb24nKTtcclxuXHRcdFx0aWYodGFibGVfc2VhcmNoX2J0bikge1xyXG5cclxuXHRcdFx0ICAgIEFycmF5LmZyb20odGFibGVfc2VhcmNoX2J0bikuZm9yRWFjaCgoZWwpPT57XHJcblx0XHRcdCAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdCAgICAgICAgXHJcblx0XHRcdCAgICAgICAgXHRjb25zdCBfdGFibGVfaWNvbnNfdGQgPSBlbC5wYXJlbnROb2RlO1xyXG5cdFx0XHQgICAgICAgICAgXHJcblx0XHRcdFx0ICAgICAgICBjb25zdCBzZWFyY2hfYmxvY2sgPSB0Yy5xdWVyeVNlbGVjdG9yQWxsKCcuYi10YWJsZV9fc2VhcmNoJyk7XHJcblx0XHRcdFx0ICAgICAgICBBcnJheS5mcm9tKHNlYXJjaF9ibG9jaykuZm9yRWFjaCgoc2IpPT57XHJcblx0XHRcdFx0ICAgICAgICAgICAgc2Iuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHRcdCAgICAgICAgfSlcclxuXHJcblx0XHRcdFx0ICAgICAgICBjb25zdCBub3RfdW5yb2xsX2ljb24gPSB0Yy5xdWVyeVNlbGVjdG9yQWxsKCcuYi10YWJsZV9faG92ZXIgdGQgLmItdGFibGVfX2ljb25zOm5vdCguYi10YWJsZV9fdW5yb2xsLWljb24pJyk7XHJcblx0XHRcdFx0ICAgICAgICBBcnJheS5mcm9tKG5vdF91bnJvbGxfaWNvbikuZm9yRWFjaCgobnVpKT0+e1xyXG5cdFx0XHRcdCAgICAgICAgICAgIG51aS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuXHRcdFx0XHQgICAgICAgIH0pXHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCBfdGFibGVfaWNvbnMgPSBfdGFibGVfaWNvbnNfdGQucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGVfX2ljb25zJyk7XHJcblx0XHRcdFx0XHRcdEFycmF5LmZyb20oX3RhYmxlX2ljb25zKS5mb3JFYWNoKCh0aSk9PntcclxuXHRcdFx0XHRcdFx0XHR0aS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCBfdGFibGVfc2VhcmNoX2Jsb2NrID0gX3RhYmxlX2ljb25zX3RkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5iLXRhYmxlX19zZWFyY2gnKTtcclxuXHRcdFx0XHRcdFx0QXJyYXkuZnJvbShfdGFibGVfc2VhcmNoX2Jsb2NrKS5mb3JFYWNoKCh0c2IpPT57XHJcblx0XHRcdFx0XHRcdFx0dHNiLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHQgICAgICAgICAgXHJcblx0XHRcdCAgICAgICAgfSwgZmFsc2UpO1xyXG5cdFx0XHQgICAgICB9KVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCB0YWJsZV9zZWFyY2hfY2xvc2VfYnRuID0gdGMucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGVfX3NlYXJjaC1jbG9zZScpO1xyXG5cdFx0ICBcdGlmKHRhYmxlX3NlYXJjaF9jbG9zZV9idG4pIHtcclxuXHJcblx0XHRcdCAgICBBcnJheS5mcm9tKHRhYmxlX3NlYXJjaF9jbG9zZV9idG4pLmZvckVhY2goKGVsKT0+e1xyXG5cdFx0XHQgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHQgICAgICAgIFxyXG5cdFx0XHQgICAgICAgIFx0Y29uc3QgX3RhYmxlX2ljb25zX3RkID0gZ2V0Q2xvc2VzdChlbCwgJy5iLXRhYmxlX19ob3ZlciB0ZCcpO1xyXG5cclxuXHRcdFx0XHRcdFx0Y29uc3Qgbm90X3Vucm9sbF9pY29uID0gdGMucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGVfX2hvdmVyIHRkIC5iLXRhYmxlX19pY29uczpub3QoLmItdGFibGVfX3Vucm9sbC1pY29uKScpO1xyXG5cclxuXHRcdFx0XHQgICAgICAgIEFycmF5LmZyb20obm90X3Vucm9sbF9pY29uKS5mb3JFYWNoKChudWkpPT57XHJcblx0XHRcdFx0ICAgICAgICAgICAgbnVpLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xyXG5cdFx0XHRcdCAgICAgICAgfSlcclxuXHRcdFx0XHRcdCAgXHJcblx0XHRcdFx0XHRcdGNvbnN0IF90YWJsZV9zZWFyY2hfYmxvY2sgPSBfdGFibGVfaWNvbnNfdGQucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGVfX3NlYXJjaCcpO1xyXG5cdFx0XHRcdFx0XHRBcnJheS5mcm9tKF90YWJsZV9zZWFyY2hfYmxvY2spLmZvckVhY2goKHRzYik9PntcclxuXHRcdFx0XHRcdFx0XHR0c2Iuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHQgICAgICAgICAgXHJcblx0XHRcdCAgICAgICAgfSwgZmFsc2UpO1xyXG5cdFx0XHQgICAgfSlcclxuXHRcdCAgICB9XHJcblxyXG5cclxuXHJcblx0XHQgICAgLy9tb2JpbGUtdGFibGVcclxuXHJcblx0XHQgICAgY29uc3QgbW9iX3JvbGxlZF9kZWZhdWx0X3RoID0gdGMucXVlcnlTZWxlY3RvckFsbCgndGguYi10YWJsZV9fcm9sbGVkLXRoLW1vYmlsZScpO1xyXG5cdFx0XHRpZihtb2Jfcm9sbGVkX2RlZmF1bHRfdGgpIHtcclxuXHJcblx0XHRcdFx0QXJyYXkuZnJvbShtb2Jfcm9sbGVkX2RlZmF1bHRfdGgpLmZvckVhY2goKG1ydCk9PntcclxuXHJcblx0ICAgIFx0XHRcdGNvbnN0IG1vYl9hY3RpdmVfdGhfaW5kZXggPSBBcnJheS5mcm9tKG1ydC5wYXJlbnROb2RlLmNoaWxkcmVuKS5pbmRleE9mKG1ydCk7XHJcblx0ICAgIFx0XHRcdGNvbnN0IG1vYl9hY3RpdmVfdGQgPSB0Yy5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0cicpO1xyXG5cdCAgICBcdFx0XHRBcnJheS5mcm9tKG1vYl9hY3RpdmVfdGQpLmZvckVhY2goKG1hdCk9PntcclxuXHJcblx0ICAgIFx0XHRcdFx0Y29uc3QgbW9iX2FjdGl2ZV90ZF9pbmRleCA9IG1hdC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpO1xyXG5cdCAgICBcdFx0XHRcdG1vYl9hY3RpdmVfdGRfaW5kZXhbbW9iX2FjdGl2ZV90aF9pbmRleF0uY2xhc3NMaXN0LmFkZCgnYi10YWJsZV9fcm9sbGVkLXRoLW1vYmlsZScpO1x0XHJcblxyXG5cdFx0XHQgICAgXHR9KVxyXG5cclxuXHJcblx0XHRcdCAgICBcdGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItY2FyZF9fdGFibGUtcG9wdXAnKTtcclxuXHRcdFx0XHRcdGNvbnN0IHVucm9sbGVkX3RoX21vYmlsZV9pZCA9IHRjLnF1ZXJ5U2VsZWN0b3IoJy5iLXRhYmxlX191bnJvbGwtbW9iaWxlIHNwYW4nKS5kYXRhc2V0LmlkO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdEFycmF5LmZyb20ocG9wdXApLmZvckVhY2goKHApPT57XHJcblxyXG5cdFx0XHRcdFx0XHRjb25zdCBwb3B1cF9pZCA9IHAuZGF0YXNldC5pZDtcdFxyXG5cclxuXHRcdFx0XHRcdFx0aWYocG9wdXBfaWQgPT0gdW5yb2xsZWRfdGhfbW9iaWxlX2lkKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHJvbGxlZF90aF9saXN0ID0gcC5xdWVyeVNlbGVjdG9yKCcuYi1jYXJkX19wb3B1cC1saXN0Jyk7XHJcblx0XHQgICAgXHRcdFx0XHRcdFxyXG5cdFx0ICAgIFx0XHRcdFx0XHRjb25zdCByb2xsZWRfdGhfbW9iaWxlID0gdGMucXVlcnlTZWxlY3RvckFsbCgndGguYi10YWJsZV9fcm9sbGVkLXRoLW1vYmlsZS50YWtlbjpub3QoLnRha2VuLWRlZmF1bHQpJyk7XHJcblx0XHQgICAgXHRcdFx0XHRcdFxyXG5cdFx0ICAgIFx0XHRcdFx0XHRpZihyb2xsZWRfdGhfbW9iaWxlLmxlbmd0aD4wKSB7XHJcblxyXG5cdFx0ICAgIFx0XHRcdFx0XHRcdEFycmF5LmZyb20ocm9sbGVkX3RoX21vYmlsZSkuZm9yRWFjaCgocnRtKT0+e1xyXG5cdFx0ICAgIFx0XHRcdFx0XHRcdFx0XHJcblx0XHRcdCAgICBcdFx0XHRcdFx0XHRjb25zdCByb2xsZWRfdGhfbW9iaWxlX3NwYW4gPSBydG0ucXVlcnlTZWxlY3Rvcignc3BhbicpO1xyXG5cclxuXHRcdFx0ICAgIFx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJvbGxlZF90aF9tb2JpbGVfc3BhbilcclxuXHRcdFx0ICAgIFx0XHRcdFx0XHRcdGNvbnN0IHJvbGxlZF90aF9tb2JpbGVfdHJpZ2dlcl9kYXRhID0gcm9sbGVkX3RoX21vYmlsZV9zcGFuLmdldEF0dHJpYnV0ZSgnZGF0YS10cmlnZ2VyJyk7XHJcblxyXG5cdFx0XHQgICAgXHRcdFx0XHRcdFx0Y29uc3Qgcm9sbGVkX3RoX21vYmlsZV9zcGFuX3ZhbHVlID0gcm9sbGVkX3RoX21vYmlsZV9zcGFuLnRleHRDb250ZW50O1xyXG5cdFx0XHQgICAgXHRcdFx0XHRcdFx0Y29uc3Qgcm9sbGVkX3RoX2l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sbGVkX3RoX2l0ZW0uY2xhc3NOYW1lID0gJ2ItY2FyZF9fcG9wdXAtaXRlbSBiLXRhYmxlX191bnJvbGwtbW9iaWxlLWljb24nO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGxlZF90aF9saXN0LmFwcGVuZENoaWxkKHJvbGxlZF90aF9pdGVtKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xsZWRfdGhfaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJpZ2dlcicsIHJvbGxlZF90aF9tb2JpbGVfdHJpZ2dlcl9kYXRhKVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBtb2JpbGVfdGhfdW5yb2xsZWRfaWNvbiA9IHRvTm9kZXMoJzxpbWcgc3JjPVwiLi9pbWcvaWNvbnMvdGFibGVfdW5yb2xsLnN2Z1wiIGNsYXNzPVwiYi1jYXJkX19wb3B1cC1pY29uXCIgYWx0PVwidW5yb2xsLWljb25cIj4nKVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgX3NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9zcGFuLmlubmVySFRNTCA9IHJvbGxlZF90aF9tb2JpbGVfc3Bhbl92YWx1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRfc3Bhbi5jbGFzc05hbWUgPSAnc2ltcGxlLXAgc2ltcGxlLXAtLXNlY29uZGFyeSBkYXJrLWNvbG9yIG5vLW1hcmdpbic7XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xsZWRfdGhfaXRlbS5hcHBlbmRDaGlsZChtb2JpbGVfdGhfdW5yb2xsZWRfaWNvbik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sbGVkX3RoX2l0ZW0uYXBwZW5kQ2hpbGQoX3NwYW4pO1xyXG5cclxuXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cnRtLmNsYXNzTGlzdC5hZGQoJ3Rha2VuLWRlZmF1bHQnKVxyXG5cclxuXHRcdFx0XHRcdFx0XHQgICAgXHR9KVxyXG5cclxuXHRcdCAgICBcdFx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblxyXG5cdFx0ICAgIFx0fSlcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHQgICAgY29uc3Qgcm9sbF9idG5fbW9iaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmItY2FyZF9fdGFibGUtcG9wdXAgLmItdGFibGVfX3JvbGwtbW9iaWxlJylcclxuXHRcdCAgICBpZihyb2xsX2J0bl9tb2JpbGUpIHtcclxuXHRcdCAgICBcdGNvbnN0IG1vYmlsZV90aCA9IHRjLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoJyk7XHJcblxyXG5cdFx0ICAgIFx0QXJyYXkuZnJvbShtb2JpbGVfdGgpLmZvckVhY2goKG10KT0+e1xyXG5cclxuXHRcdCAgICBcdFx0bXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHQgICAgXHRcdFx0aWYoc2NyZWVuU2l6ZT5tb2JpbGVTaXplKSB7XHJcblx0XHQgICAgXHRcdFx0XHRBcnJheS5mcm9tKHBvcHVwQWxsKS5mb3JFYWNoKHBvcHVwPT57XHJcblx0XHRcdFx0XHRcdFx0XHRwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRmdWxsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2JsdXInKTtcclxuXHRcdFx0XHRcdFx0XHRmdWxsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJzdGF0aWNcIjtcclxuXHRcdCAgICBcdFx0XHR9XHJcblx0XHQgICAgXHRcdFx0bXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlLXBvcHVwJyk7XHJcblx0XHQgICAgXHRcdH0pXHJcblxyXG5cdFx0ICAgIFx0fSlcclxuXHJcblx0XHQgICAgXHRsZXQgbW9iaWxlUm9sbENvbHNcclxuXHRcdCAgICBcdChtb2JpbGVSb2xsQ29scyA9ICgpPT57XHJcblx0XHQgICAgXHRcdGNvbnN0IG1vYl9hY3RpdmVfdGggPSB0Yy5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlLXBvcHVwJyk7XHJcblxyXG5cdCAgICBcdFx0XHRpZihtb2JfYWN0aXZlX3RoKSB7XHJcblxyXG5cdCAgICBcdFx0XHRcdG1vYl9hY3RpdmVfdGguY2xhc3NMaXN0LmFkZCgnYi10YWJsZV9fcm9sbGVkLXRoLW1vYmlsZScpXHJcblxyXG5cdFx0ICAgIFx0XHRcdGNvbnN0IG1vYl9hY3RpdmVfdGhfaW5kZXggPSBBcnJheS5mcm9tKG1vYl9hY3RpdmVfdGgucGFyZW50Tm9kZS5jaGlsZHJlbikuaW5kZXhPZihtb2JfYWN0aXZlX3RoKTtcclxuXHJcblx0XHQgICAgXHRcdFx0Y29uc3QgbW9iX2FjdGl2ZV90ZCA9IHRjLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJyk7XHJcblxyXG5cdFx0ICAgIFx0XHRcdEFycmF5LmZyb20obW9iX2FjdGl2ZV90ZCkuZm9yRWFjaCgobWF0KT0+e1xyXG5cclxuXHRcdCAgICBcdFx0XHRcdGNvbnN0IG1vYl9hY3RpdmVfdGRfaW5kZXggPSBtYXQucXVlcnlTZWxlY3RvckFsbCgndGQnKTtcclxuXHRcdCAgICBcdFx0XHRcdG1vYl9hY3RpdmVfdGRfaW5kZXhbbW9iX2FjdGl2ZV90aF9pbmRleF0uY2xhc3NMaXN0LmFkZCgnYi10YWJsZV9fcm9sbGVkLXRoLW1vYmlsZScpO1x0XHJcblxyXG5cdFx0XHRcdCAgICBcdH0pXHJcblxyXG5cdFx0ICAgIFx0XHRcdEFycmF5LmZyb20ocG9wdXBBbGwpLmZvckVhY2gocG9wdXA9PntcclxuXHRcdFx0XHRcdFx0XHRwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdGZ1bGxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYmx1cicpO1xyXG5cdFx0XHRcdFx0XHRmdWxsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJzdGF0aWNcIjtcclxuXHJcblx0XHRcdFx0XHRcdG1vYl9hY3RpdmVfdGguY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlLXBvcHVwJyk7XHJcblxyXG5cclxuXHJcblx0XHRcdFx0XHRcdGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItY2FyZF9fdGFibGUtcG9wdXAnKTtcclxuXHRcdFx0XHRcdFx0Y29uc3QgdW5yb2xsZWRfdGhfbW9iaWxlX2lkID0gdGMucXVlcnlTZWxlY3RvcignLmItdGFibGVfX3Vucm9sbC1tb2JpbGUgc3BhbicpLmRhdGFzZXQuaWQ7XHJcblxyXG5cdFx0XHRcdFx0XHRBcnJheS5mcm9tKHBvcHVwKS5mb3JFYWNoKChwKT0+e1xyXG5cclxuXHRcdCAgICBcdFx0XHRcdGNvbnN0IHBvcHVwX2lkID0gcC5kYXRhc2V0LmlkO1x0XHJcblxyXG5cdFx0ICAgIFx0XHRcdFx0aWYocG9wdXBfaWQgPT0gdW5yb2xsZWRfdGhfbW9iaWxlX2lkKSB7XHJcblxyXG5cdFx0ICAgIFx0XHRcdFx0XHRjb25zdCByb2xsZWRfdGhfbGlzdCA9IHAucXVlcnlTZWxlY3RvcignLmItY2FyZF9fcG9wdXAtbGlzdCcpO1xyXG5cdFx0ICAgIFx0XHRcdFx0XHRcclxuXHRcdCAgICBcdFx0XHRcdFx0Y29uc3Qgcm9sbGVkX3RoX21vYmlsZSA9IHRjLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoLmItdGFibGVfX3JvbGxlZC10aC1tb2JpbGU6bm90KC50YWtlbiknKTtcclxuXHRcdCAgICBcdFx0XHRcdFx0XHJcblx0XHQgICAgXHRcdFx0XHRcdGlmKHJvbGxlZF90aF9tb2JpbGUubGVuZ3RoPjApIHtcclxuXHJcblx0XHQgICAgXHRcdFx0XHRcdFx0QXJyYXkuZnJvbShyb2xsZWRfdGhfbW9iaWxlKS5mb3JFYWNoKChydG0pPT57XHJcblx0XHQgICAgXHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0ICAgIFx0XHRcdFx0XHRcdGNvbnN0IHJvbGxlZF90aF9tb2JpbGVfc3BhbiA9IHJ0bS5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XHJcblxyXG5cdFx0XHQgICAgXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocm9sbGVkX3RoX21vYmlsZV9zcGFuKVxyXG5cdFx0XHQgICAgXHRcdFx0XHRcdFx0Y29uc3Qgcm9sbGVkX3RoX21vYmlsZV90cmlnZ2VyX2RhdGEgPSByb2xsZWRfdGhfbW9iaWxlX3NwYW4uZ2V0QXR0cmlidXRlKCdkYXRhLXRyaWdnZXInKTtcclxuXHJcblx0XHRcdCAgICBcdFx0XHRcdFx0XHRjb25zdCByb2xsZWRfdGhfbW9iaWxlX3NwYW5fdmFsdWUgPSByb2xsZWRfdGhfbW9iaWxlX3NwYW4udGV4dENvbnRlbnQ7XHJcblx0XHRcdCAgICBcdFx0XHRcdFx0XHRjb25zdCByb2xsZWRfdGhfaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xsZWRfdGhfaXRlbS5jbGFzc05hbWUgPSAnYi1jYXJkX19wb3B1cC1pdGVtIGItdGFibGVfX3Vucm9sbC1tb2JpbGUtaWNvbic7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cm9sbGVkX3RoX2xpc3QuYXBwZW5kQ2hpbGQocm9sbGVkX3RoX2l0ZW0pO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGxlZF90aF9pdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS10cmlnZ2VyJywgcm9sbGVkX3RoX21vYmlsZV90cmlnZ2VyX2RhdGEpXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IG1vYmlsZV90aF91bnJvbGxlZF9pY29uID0gdG9Ob2RlcygnPGltZyBzcmM9XCIuL2ltZy9pY29ucy90YWJsZV91bnJvbGwuc3ZnXCIgY2xhc3M9XCJiLWNhcmRfX3BvcHVwLWljb25cIiBhbHQ9XCJ1bnJvbGwtaWNvblwiPicpXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxldCBfc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0X3NwYW4uaW5uZXJIVE1MID0gcm9sbGVkX3RoX21vYmlsZV9zcGFuX3ZhbHVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF9zcGFuLmNsYXNzTmFtZSA9ICdzaW1wbGUtcCBzaW1wbGUtcC0tc2Vjb25kYXJ5IGRhcmstY29sb3Igbm8tbWFyZ2luJztcclxuXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJvbGxlZF90aF9pdGVtLmFwcGVuZENoaWxkKG1vYmlsZV90aF91bnJvbGxlZF9pY29uKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyb2xsZWRfdGhfaXRlbS5hcHBlbmRDaGlsZChfc3Bhbik7XHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJ0bS5jbGFzc0xpc3QuYWRkKCd0YWtlbicpXHJcblxyXG5cdFx0XHRcdFx0XHRcdCAgICBcdH0pXHJcblxyXG5cdFx0ICAgIFx0XHRcdFx0XHR9XHJcblx0XHQgICAgXHRcdFx0XHRcdFxyXG5cclxuXHRcdCAgICBcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ICAgIFx0fSlcclxuXHJcblx0XHRcdFxyXG5cdCAgICBcdFx0XHR9XHJcblx0XHQgICAgXHR9KSgpXHJcblxyXG5cdCAgICBcdFx0cm9sbF9idG5fbW9iaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0ICAgIFx0XHRcdG1vYmlsZVJvbGxDb2xzKClcclxuXHJcblxyXG5cdCAgICBcdFx0fSlcclxuXHJcblx0XHQgICAgfVxyXG5cclxuXHJcblx0XHQgICAgLypjb25zdCB1bnJvbGxlZF90aF9tb2JpbGUgPSB0Yy5xdWVyeVNlbGVjdG9yKCcuYi10YWJsZV9fdW5yb2xsLW1vYmlsZScpO1xyXG5cdFx0XHRpZih1bnJvbGxlZF90aF9tb2JpbGUpIHtcclxuXHJcblx0XHRcdFx0Y29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jYXJkX190YWJsZS1wb3B1cCcpO1xyXG5cdFx0XHRcdGNvbnN0IHVucm9sbGVkX3RoX21vYmlsZV9pZCA9IHVucm9sbGVkX3RoX21vYmlsZS5xdWVyeVNlbGVjdG9yKCdzcGFuJykuZGF0YXNldC5pZDtcclxuXHJcblx0XHRcdFx0dW5yb2xsZWRfdGhfbW9iaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0QXJyYXkuZnJvbShwb3B1cCkuZm9yRWFjaCgocCk9PntcclxuXHJcblx0XHRcdFx0XHRcdGNvbnN0IHBvcHVwX2lkID0gcC5kYXRhc2V0LmlkO1x0XHJcblxyXG5cdFx0XHRcdFx0XHRpZihwb3B1cF9pZCA9PSB1bnJvbGxlZF90aF9tb2JpbGVfaWQpIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgdW5yb2xsX2J0bl9tb2JpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYi1jYXJkX190YWJsZS1wb3B1cCAuYi10YWJsZV9fdW5yb2xsLW1vYmlsZS1pY29uJyk7XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSlcclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRcclxuXHJcblx0XHRcdH0qL1xyXG5cclxuXHJcblxyXG5cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuICAgIC8vIHRhYmxlIHNjcmlwdCBlbmRcclxuXHJcblxyXG5cclxuICAgIC8vIHVwbG9hZCBzY3JpcHQgYmVnaW5cclxuICAgIC8vIGZlYXR1cmUgZGV0ZWN0aW9uIGZvciBkcmFnJmRyb3AgdXBsb2FkXHJcblx0dmFyIGlzQWR2YW5jZWRVcGxvYWQgPSBmdW5jdGlvbigpXHJcblx0XHR7XHJcblx0XHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xyXG5cdFx0XHRyZXR1cm4gKCAoICdkcmFnZ2FibGUnIGluIGRpdiApIHx8ICggJ29uZHJhZ3N0YXJ0JyBpbiBkaXYgJiYgJ29uZHJvcCcgaW4gZGl2ICkgKSAmJiAnRm9ybURhdGEnIGluIHdpbmRvdyAmJiAnRmlsZVJlYWRlcicgaW4gd2luZG93O1xyXG5cdFx0fSgpO1xyXG5cclxuXHJcblx0Ly8gYXBwbHlpbmcgdGhlIGVmZmVjdCBmb3IgZXZlcnkgZm9ybVxyXG5cdHZhciBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcudXBsb2FkJyApO1xyXG5cdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoIGZvcm1zLCBmdW5jdGlvbiggZm9ybSApXHJcblx0e1xyXG5cdFx0dmFyIGlucHV0XHRcdCA9IGZvcm0ucXVlcnlTZWxlY3RvciggJ2lucHV0W3R5cGU9XCJmaWxlXCJdJyApLFxyXG5cdFx0XHRzdWNjZXNzTXNnICA9IGZvcm0ucXVlcnlTZWxlY3RvciggJy51cGxvYWRfX3N1Y2Nlc3MtbWVzc2FnZScgKSxcclxuXHRcdFx0bGFiZWxcdFx0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCAnbGFiZWwnICksXHJcblx0XHRcdGVycm9yTXNnXHQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoICcudXBsb2FkX19lcnJvci1tZXNzYWdlJyApLFxyXG5cdFx0XHRkcm9wcGVkRmlsZXMgPSBmYWxzZSxcclxuXHRcdFx0c2hvd0ZpbGVzXHQgPSBmdW5jdGlvbiggZmlsZXMgKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0LypsYWJlbC50ZXh0Q29udGVudCA9IGZpbGVzLmxlbmd0aCA+IDEgPyAoIGlucHV0LmdldEF0dHJpYnV0ZSggJ2RhdGEtbXVsdGlwbGUtY2FwdGlvbicgKSB8fCAnJyApLnJlcGxhY2UoICd7Y291bnR9JywgZmlsZXMubGVuZ3RoICkgOiBmaWxlc1sgMCBdLm5hbWU7Ki8gXHJcblx0XHRcdFx0Ly9maWxlIE5hbWVcclxuXHRcdFx0fSxcclxuXHRcdFx0dHJpZ2dlckZvcm1TdWJtaXQgPSBmdW5jdGlvbigpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCggJ0hUTUxFdmVudHMnICk7XHJcblx0XHRcdFx0ZXZlbnQuaW5pdEV2ZW50KCAnc3VibWl0JywgdHJ1ZSwgZmFsc2UgKTtcclxuXHRcdFx0XHRmb3JtLmRpc3BhdGNoRXZlbnQoIGV2ZW50ICk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0Ly8gbGV0dGluZyB0aGUgc2VydmVyIHNpZGUgdG8ga25vdyB3ZSBhcmUgZ29pbmcgdG8gbWFrZSBhbiBBamF4IHJlcXVlc3RcclxuXHRcdHZhciBhamF4RmxhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdpbnB1dCcgKTtcclxuXHRcdGFqYXhGbGFnLnNldEF0dHJpYnV0ZSggJ3R5cGUnLCAnaGlkZGVuJyApO1xyXG5cdFx0YWpheEZsYWcuc2V0QXR0cmlidXRlKCAnbmFtZScsICdhamF4JyApO1xyXG5cdFx0YWpheEZsYWcuc2V0QXR0cmlidXRlKCAndmFsdWUnLCAxICk7XHJcblx0XHRmb3JtLmFwcGVuZENoaWxkKCBhamF4RmxhZyApO1xyXG5cclxuXHRcdC8vIGF1dG9tYXRpY2FsbHkgc3VibWl0IHRoZSBmb3JtIG9uIGZpbGUgc2VsZWN0XHJcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnY2hhbmdlJywgZnVuY3Rpb24oIGUgKVxyXG5cdFx0e1xyXG5cdFx0XHRzaG93RmlsZXMoIGUudGFyZ2V0LmZpbGVzICk7XHJcblxyXG5cdFx0XHRcclxuXHRcdFx0dHJpZ2dlckZvcm1TdWJtaXQoKTtcclxuXHJcblx0XHRcdFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gZHJhZyZkcm9wIGZpbGVzIGlmIHRoZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxyXG5cdFx0aWYoIGlzQWR2YW5jZWRVcGxvYWQgKVxyXG5cdFx0e1xyXG5cdFx0XHRmb3JtLmNsYXNzTGlzdC5hZGQoICdoYXMtYWR2YW5jZWQtdXBsb2FkJyApOyAvLyBsZXR0aW5nIHRoZSBDU1MgcGFydCB0byBrbm93IGRyYWcmZHJvcCBpcyBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXJcclxuXHJcblx0XHRcdFsgJ2RyYWcnLCAnZHJhZ3N0YXJ0JywgJ2RyYWdlbmQnLCAnZHJhZ292ZXInLCAnZHJhZ2VudGVyJywgJ2RyYWdsZWF2ZScsICdkcm9wJyBdLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudCApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50LCBmdW5jdGlvbiggZSApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Ly8gcHJldmVudGluZyB0aGUgdW53YW50ZWQgYmVoYXZpb3Vyc1xyXG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFsgJ2RyYWdvdmVyJywgJ2RyYWdlbnRlcicgXS5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnQgKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCBldmVudCwgZnVuY3Rpb24oKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZvcm0uY2xhc3NMaXN0LmFkZCggJ2lzLWRyYWdvdmVyJyApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0WyAnZHJhZ2xlYXZlJywgJ2RyYWdlbmQnLCAnZHJvcCcgXS5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnQgKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCBldmVudCwgZnVuY3Rpb24oKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZvcm0uY2xhc3NMaXN0LnJlbW92ZSggJ2lzLWRyYWdvdmVyJyApO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCAnZHJvcCcsIGZ1bmN0aW9uKCBlIClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGRyb3BwZWRGaWxlcyA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzOyAvLyB0aGUgZmlsZXMgdGhhdCB3ZXJlIGRyb3BwZWRcclxuXHRcdFx0XHRzaG93RmlsZXMoIGRyb3BwZWRGaWxlcyApO1xyXG5cclxuXHRcdFx0XHRcclxuXHRcdFx0XHR0cmlnZ2VyRm9ybVN1Ym1pdCgpO1xyXG5cclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBpZiB0aGUgZm9ybSB3YXMgc3VibWl0dGVkXHJcblx0XHRmb3JtLmFkZEV2ZW50TGlzdGVuZXIoICdzdWJtaXQnLCBmdW5jdGlvbiggZSApXHJcblx0XHR7XHJcblx0XHRcdC8vIHByZXZlbnRpbmcgdGhlIGR1cGxpY2F0ZSBzdWJtaXNzaW9ucyBpZiB0aGUgY3VycmVudCBvbmUgaXMgaW4gcHJvZ3Jlc3NcclxuXHRcdFx0aWYoIGZvcm0uY2xhc3NMaXN0LmNvbnRhaW5zKCAnaXMtdXBsb2FkaW5nJyApICkgcmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0Zm9ybS5jbGFzc0xpc3QuYWRkKCAnaXMtdXBsb2FkaW5nJyApO1xyXG5cdFx0XHRmb3JtLmNsYXNzTGlzdC5yZW1vdmUoICdpcy1lcnJvcicgKTtcclxuXHJcblx0XHRcdGlmKCBpc0FkdmFuY2VkVXBsb2FkICkgLy8gYWpheCBmaWxlIHVwbG9hZCBmb3IgbW9kZXJuIGJyb3dzZXJzXHJcblx0XHRcdHtcclxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cdFx0XHRcdC8vIGdhdGhlcmluZyB0aGUgZm9ybSBkYXRhXHJcblx0XHRcdFx0dmFyIGFqYXhEYXRhID0gbmV3IEZvcm1EYXRhKCBmb3JtICk7XHJcblx0XHRcdFx0aWYoIGRyb3BwZWRGaWxlcyApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCggZHJvcHBlZEZpbGVzLCBmdW5jdGlvbiggZmlsZSApXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGFqYXhEYXRhLmFwcGVuZCggaW5wdXQuZ2V0QXR0cmlidXRlKCAnbmFtZScgKSwgZmlsZSApO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBhamF4IHJlcXVlc3RcclxuXHRcdFx0XHR2YXIgYWpheCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0XHRcdGFqYXgub3BlbiggZm9ybS5nZXRBdHRyaWJ1dGUoICdtZXRob2QnICksIGZvcm0uZ2V0QXR0cmlidXRlKCAnYWN0aW9uJyApLCB0cnVlICk7XHJcblxyXG5cdFx0XHRcdGFqYXgub25sb2FkID0gZnVuY3Rpb24oKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZvcm0uY2xhc3NMaXN0LnJlbW92ZSggJ2lzLXVwbG9hZGluZycgKTtcclxuXHRcdFx0XHRcdGlmKCBhamF4LnN0YXR1cyA+PSAyMDAgJiYgYWpheC5zdGF0dXMgPCA0MDAgKVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHR2YXIgZGF0YSA9IEpTT04ucGFyc2UoIGFqYXgucmVzcG9uc2VUZXh0ICk7XHJcblx0XHRcdFx0XHRcdGZvcm0uY2xhc3NMaXN0LmFkZCggZGF0YS5zdWNjZXNzID09IHRydWUgPyAnaXMtc3VjY2VzcycgOiAnaXMtZXJyb3InICk7XHJcblx0XHRcdFx0XHRcdGlmKCAhZGF0YS5zdWNjZXNzICkgZXJyb3JNc2cudGV4dENvbnRlbnQgPSBkYXRhLmVycm9yO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0ZWxzZSBhbGVydCggJ0Vycm9yLiBQbGVhc2UsIGNvbnRhY3QgdGhlIHdlYm1hc3RlciEnICk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0YWpheC5vbmVycm9yID0gZnVuY3Rpb24oKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdGZvcm0uY2xhc3NMaXN0LnJlbW92ZSggJ2lzLXVwbG9hZGluZycgKTtcclxuXHRcdFx0XHRcdGFsZXJ0KCAnRXJyb3IuIFBsZWFzZSwgdHJ5IGFnYWluIScgKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRhamF4LnNlbmQoIGFqYXhEYXRhICk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSAvLyBmYWxsYmFjayBBamF4IHNvbHV0aW9uIHVwbG9hZCBmb3Igb2xkZXIgYnJvd3NlcnNcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHZhciBpZnJhbWVOYW1lXHQ9ICd1cGxvYWRpZnJhbWUnICsgbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcblx0XHRcdFx0XHRpZnJhbWVcdFx0PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnaWZyYW1lJyApO1xyXG5cclxuXHRcdFx0XHRcdCRpZnJhbWVcdFx0PSAkKCAnPGlmcmFtZSBuYW1lPVwiJyArIGlmcmFtZU5hbWUgKyAnXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvaWZyYW1lPicgKTtcclxuXHJcblx0XHRcdFx0aWZyYW1lLnNldEF0dHJpYnV0ZSggJ25hbWUnLCBpZnJhbWVOYW1lICk7XHJcblx0XHRcdFx0aWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoIGlmcmFtZSApO1xyXG5cdFx0XHRcdGZvcm0uc2V0QXR0cmlidXRlKCAndGFyZ2V0JywgaWZyYW1lTmFtZSApO1xyXG5cclxuXHRcdFx0XHRpZnJhbWUuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCBmdW5jdGlvbigpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKCBpZnJhbWUuY29udGVudERvY3VtZW50LmJvZHkuaW5uZXJIVE1MICk7XHJcblx0XHRcdFx0XHRmb3JtLmNsYXNzTGlzdC5yZW1vdmUoICdpcy11cGxvYWRpbmcnIClcclxuXHRcdFx0XHRcdGZvcm0uY2xhc3NMaXN0LmFkZCggZGF0YS5zdWNjZXNzID09IHRydWUgPyAnaXMtc3VjY2VzcycgOiAnaXMtZXJyb3InIClcclxuXHRcdFx0XHRcdGZvcm0ucmVtb3ZlQXR0cmlidXRlKCAndGFyZ2V0JyApO1xyXG5cdFx0XHRcdFx0aWYoICFkYXRhLnN1Y2Nlc3MgKSBlcnJvck1zZy50ZXh0Q29udGVudCA9IGRhdGEuZXJyb3I7XHJcblx0XHRcdFx0XHRpZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggaWZyYW1lICk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEZpcmVmb3ggZm9jdXMgYnVnIGZpeCBmb3IgZmlsZSBpbnB1dFxyXG5cdFx0aW5wdXQuYWRkRXZlbnRMaXN0ZW5lciggJ2ZvY3VzJywgZnVuY3Rpb24oKXsgaW5wdXQuY2xhc3NMaXN0LmFkZCggJ2hhcy1mb2N1cycgKTsgfSk7XHJcblx0XHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnYmx1cicsIGZ1bmN0aW9uKCl7IGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoICdoYXMtZm9jdXMnICk7IH0pO1xyXG5cclxuXHR9KTtcclxuXHJcblx0Ly91cGxvYWQgc2NyaXB0IGVuZFxyXG5cclxuXHJcblxyXG5cclxuXHRkb2N1bWVudC5ib2R5Lm9uY2xpY2sgPSBlPT57XHJcblx0XHRpZiggcG9wdXBBbGwubGVuZ3RoPjAgJiYgXHJcblx0XHRcdCgoZS50YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ3BvcHVwLWJ1dHRvbicpPT09LTEgJiYgXHJcblx0XHRcdGdldENsb3Nlc3QoZS50YXJnZXQsICcuYi1jYXJkX19wb3B1cCcpPT09bnVsbCkgfHwgXHJcblx0XHRcdGUudGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdjbG9zZS1wb3B1cCcpPi0xKVxyXG5cdFx0KSB7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0QXJyYXkuZnJvbShwb3B1cEFsbCkuZm9yRWFjaChwb3B1cD0+e1xyXG5cdFx0XHRcdFx0cG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdGZ1bGxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYmx1cicpO1xyXG5cdFx0XHRmdWxsQ29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJzdGF0aWNcIjtcclxuXHJcblx0XHRcdGNvbnN0IG1vYmlsZV90aF9hY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGUtY29sbGFwc2VkIHRoLmFjdGl2ZS1wb3B1cCcpO1xyXG5cdFx0XHRpZihtb2JpbGVfdGhfYWN0aXZlKSB7XHJcblx0XHRcdFx0bW9iaWxlX3RoX2FjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtcG9wdXAnKVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGZvciBtYXRlcmlhbCBzZWxlY3RzXHJcblx0XHRjb25zdCBhbGxEcm9wZG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWF0ZXJpYWwtc2VsZWN0X19vcHRpb25zLS12aXNpYmxlJylcclxuXHRcdGlmKGFsbERyb3Bkb3ducy5sZW5ndGg+MCAmJiBlLnRhcmdldC5ub2RlTmFtZSE9J1NFTEVDVCcpe1xyXG5cdFx0XHRBcnJheS5mcm9tKGFsbERyb3Bkb3ducykuZm9yRWFjaChkPT57XHJcblx0XHRcdFx0ZC5jbGFzc0xpc3QucmVtb3ZlKCdtYXRlcmlhbC1zZWxlY3RfX29wdGlvbnMtLXZpc2libGUnKVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGV4cG9ydF93cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItdGFibGVfX2V4cG9ydC13cmFwcGVyJyk7XHJcblx0XHRpZiggZXhwb3J0X3dyYXBwZXIgXHJcblx0XHRcdCYmIGdldENsb3Nlc3QoZS50YXJnZXQsICcuYi10YWJsZV9fZXhwb3J0LWJ0bicpPT09bnVsbCBcclxuXHRcdFx0KSB7XHJcblxyXG5cdFx0XHRBcnJheS5mcm9tKGV4cG9ydF93cmFwcGVyKS5mb3JFYWNoKChlbCk9PntcclxuXHRcdFx0XHRjb25zdCBkb3dubG9hZF9idG4gPSBlbC5xdWVyeVNlbGVjdG9yKCcuYi10YWJsZV9fZXhwb3J0LWRvd25sb2FkJyk7XHJcblx0XHRcdFx0Y29uc3QgZXhwb3J0X2J0bnMgPSBlbC5xdWVyeVNlbGVjdG9yKCcuYi10YWJsZV9fZXhwb3J0LWJ0bnMnKTtcclxuXHJcblx0XHRcdFx0aWYoZG93bmxvYWRfYnRuKSB7XHJcblx0XHRcdFx0XHRkb3dubG9hZF9idG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHRcdFx0XHRcdGV4cG9ydF9idG5zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjsgXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxufSkgLy8gZG9jdW1lbnQgcmVhZHlcclxuXHJcbmNvbnN0IHNob3dPd2UgPSBmdW5jdGlvbihlKSB7XHJcblx0ZS5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3dlJykuc3R5bGUuZGlzcGxheT0nYmxvY2snXHJcbn1cclxuXHJcbi8vL1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2xhc3MgU3dpcGUge1xyXG5cdCAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcblx0ICAgICAgICB0aGlzLnhEb3duID0gbnVsbFxyXG5cdCAgICAgICAgdGhpcy55RG93biA9IG51bGxcclxuXHQgICAgICAgIHRoaXMuZWxlbWVudCA9IHR5cGVvZihlbGVtZW50KSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpIDogZWxlbWVudFxyXG5cclxuXHQgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZ0KSB7XHJcblx0ICAgICAgICAgICAgdGhpcy54RG93biA9IGV2dC50b3VjaGVzWzBdLmNsaWVudFhcclxuXHQgICAgICAgICAgICB0aGlzLnlEb3duID0gZXZ0LnRvdWNoZXNbMF0uY2xpZW50WVxyXG5cdCAgICAgICAgfS5iaW5kKHRoaXMpLCBmYWxzZSlcclxuXHJcblx0ICAgIH1cclxuXHJcblx0ICAgIG9uTGVmdChjYWxsYmFjaykge1xyXG5cdCAgICAgICAgdGhpcy5vbkxlZnQgPSBjYWxsYmFja1xyXG5cclxuXHQgICAgICAgIHJldHVybiB0aGlzXHJcblx0ICAgIH1cclxuXHJcblx0ICAgIG9uUmlnaHQoY2FsbGJhY2spIHtcclxuXHQgICAgICAgIHRoaXMub25SaWdodCA9IGNhbGxiYWNrXHJcblxyXG5cdCAgICAgICAgcmV0dXJuIHRoaXNcclxuXHQgICAgfVxyXG5cclxuXHQgICAgb25VcChjYWxsYmFjaykge1xyXG5cdCAgICAgICAgdGhpcy5vblVwID0gY2FsbGJhY2tcclxuXHJcblx0ICAgICAgICByZXR1cm4gdGhpc1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBvbkRvd24oY2FsbGJhY2spIHtcclxuXHQgICAgICAgIHRoaXMub25Eb3duID0gY2FsbGJhY2tcclxuXHJcblx0ICAgICAgICByZXR1cm4gdGhpc1xyXG5cdCAgICB9XHJcblxyXG5cdCAgICBoYW5kbGVUb3VjaE1vdmUoZXZ0KSB7XHJcblx0ICAgICAgICBpZiAoICEgdGhpcy54RG93biB8fCAhIHRoaXMueURvd24gKSB7XHJcblx0ICAgICAgICAgICAgcmV0dXJuXHJcblx0ICAgICAgICB9XHJcblxyXG5cdCAgICAgICAgdmFyIHhVcCA9IGV2dC50b3VjaGVzWzBdLmNsaWVudFhcclxuXHQgICAgICAgIHZhciB5VXAgPSBldnQudG91Y2hlc1swXS5jbGllbnRZXHJcblxyXG5cdCAgICAgICAgdGhpcy54RGlmZiA9IHRoaXMueERvd24gLSB4VXBcclxuXHQgICAgICAgIHRoaXMueURpZmYgPSB0aGlzLnlEb3duIC0geVVwXHJcblxyXG5cdCAgICAgICAgaWYgKCBNYXRoLmFicyggdGhpcy54RGlmZiApID4gTWF0aC5hYnMoIHRoaXMueURpZmYgKSApIHsgLy8gTW9zdCBzaWduaWZpY2FudC5cclxuXHQgICAgICAgICAgICBpZiAoIHRoaXMueERpZmYgPiAwICkge1xyXG5cdCAgICAgICAgICAgICAgICB0aGlzLm9uTGVmdCgpXHJcblx0ICAgICAgICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICAgICAgICAgdGhpcy5vblJpZ2h0KClcclxuXHQgICAgICAgICAgICB9XHJcblx0ICAgICAgICB9IGVsc2Uge1xyXG5cdCAgICAgICAgICAgIGlmICggdGhpcy55RGlmZiA+IDAgKSB7XHJcblx0ICAgICAgICAgICAgICAgIHRoaXMub25VcCgpXHJcblx0ICAgICAgICAgICAgfSBlbHNlIHtcclxuXHQgICAgICAgICAgICAgICAgdGhpcy5vbkRvd24oKVxyXG5cdCAgICAgICAgICAgIH1cclxuXHQgICAgICAgIH1cclxuXHJcblx0ICAgICAgICAvLyBSZXNldCB2YWx1ZXMuXHJcblx0ICAgICAgICB0aGlzLnhEb3duID0gbnVsbFxyXG5cdCAgICAgICAgdGhpcy55RG93biA9IG51bGxcclxuXHQgICAgfVxyXG5cclxuXHQgICAgcnVuKCkge1xyXG5cdCAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGV2dCkge1xyXG5cdCAgICAgICAgICAgIHRoaXMuaGFuZGxlVG91Y2hNb3ZlKGV2dClcclxuXHQgICAgICAgIH0uYmluZCh0aGlzKSwgZmFsc2UpXHJcblx0ICAgIH1cclxuXHR9XHJcblxyXG5cdFxyXG5cclxuXHRjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYi1jYXJkX19zbGlkZXInKVxyXG5cdGNvbnN0IHNsaWRlckNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmItY2FyZF9fc2xpZGVyLWNvbnRlbnQnKVxyXG5cdGNvbnN0IGRvdHNET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYi1jYXJkX19kb3RzJylcclxuXHRjb25zdCBzbGlkZXJIZWFkZXJET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYi1jYXJkX19oZWFkZXInKVxyXG5cclxuXHRsZXQgY3VycmVudFNsaWRlciA9IDBcclxuXHQvLyBIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihjKXtcclxuXHQvLyBcdEFycmF5LmZyb20odGhpcykuZm9yRWFjaChlPT57XHJcblx0Ly8gXHRcdGUuY2xhc3NMaXN0LnJlbW92ZShjKVxyXG5cdC8vIFx0fSlcclxuXHQvLyB9XHJcblxyXG5cdGlmKHNsaWRlcil7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlckNvbnRlbnRzLmxlbmd0aDsgKytpKSB7XHJcblxyXG5cdFx0XHRjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcclxuXHRcdFx0ZG90LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCdkb3QnKVxyXG5cdFx0XHRkb3Qub25jbGljayA9ICBkb3RDbGljay5iaW5kKGRvdCwgaSk7XHJcblx0XHRcdGRvdHNET00uYXBwZW5kQ2hpbGQoZG90KVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBkb3RzID0gZG90c0RPTS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkb3QnKVxyXG5cdFx0ZG90c1swXS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnXHJcblx0XHRjb25zdCBwcmV2U2xpZGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXYtc2xpZGVyLWJ1dHRvbicpXHJcblx0XHRjb25zdCBuZXh0U2xpZGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5leHQtc2xpZGVyLWJ1dHRvbicpXHJcblx0XHRsZXQgYnV0dG9uQ2hhbmdlZFRvTWFpbiA9IGZhbHNlXHJcblxyXG5cdFx0XHJcblxyXG5cdFx0ZnVuY3Rpb24gZG90Q2xpY2sobnVtKSB7XHJcblx0XHRcdHNsaWRlckNvbnRlbnRzW2N1cnJlbnRTbGlkZXJdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpIC8vIElFOStcclxuXHRcdFx0XHJcblx0XHRcdGRvdHNbY3VycmVudFNsaWRlcl0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykgLy8gSUU5K1xyXG5cdFx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcblx0XHRcdGN1cnJlbnRTbGlkZXIgPSBudW1cclxuXHRcdFx0c2xpZGVyQ29udGVudHNbbnVtXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG5cdFx0XHRzbGlkZXJIZWFkZXJET00uaW5uZXJUZXh0ID0gc2xpZGVyQ29udGVudHNbY3VycmVudFNsaWRlcl0ucXVlcnlTZWxlY3RvcignYi1oZWFkZXInKS5pbm5lclRleHQgfHwgc2xpZGVyQ29udGVudHNbY3VycmVudFNsaWRlcl0ucXVlcnlTZWxlY3RvcignYi1oZWFkZXInKS50ZXh0Q29udGVudFxyXG5cclxuXHRcdFx0aWYgKGN1cnJlbnRTbGlkZXI9PWRvdHMubGVuZ3RoLTEpIHsgLy9zbGlkZXIgZW5kZWRcclxuXHRcdFx0XHRuZXh0U2xpZGVyQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bl9fbWF0ZXJpYWwtLWhvbGxvdycpXHJcblx0XHRcdFx0bmV4dFNsaWRlckJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG5fX21hdGVyaWFsLS1mdWxsJylcclxuXHRcdFx0XHRjb25zdCBidXR0b25EZWZUZXh0ID0gbmV4dFNsaWRlckJ1dHRvbi5pbm5lclRleHRcclxuXHRcdFx0XHRuZXh0U2xpZGVyQnV0dG9uLmlubmVyVGV4dCA9IG5leHRTbGlkZXJCdXR0b24uZ2V0QXR0cmlidXRlKCdlbmQtdGV4dCcpXHJcblx0XHRcdFx0bmV4dFNsaWRlckJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2VuZC10ZXh0JywgYnV0dG9uRGVmVGV4dClcclxuXHRcdFx0XHRidXR0b25DaGFuZ2VkVG9NYWluID0gdHJ1ZVxyXG5cdFx0XHR9IGVsc2UgaWYoYnV0dG9uQ2hhbmdlZFRvTWFpbil7IC8vc2xpZGVyIGVuZGVkIHJldHVybmVkIHRvIHByZXZpb3VzIHNsaWRlc1xyXG5cdFx0XHRcdG5leHRTbGlkZXJCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuX19tYXRlcmlhbC0taG9sbG93JylcclxuXHRcdFx0XHRuZXh0U2xpZGVyQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2J0bl9fbWF0ZXJpYWwtLWZ1bGwnKVxyXG5cdFx0XHRcdGNvbnN0IGJ1dHRvbkRlZlRleHQgPSBuZXh0U2xpZGVyQnV0dG9uLmlubmVyVGV4dFxyXG5cdFx0XHRcdG5leHRTbGlkZXJCdXR0b24uaW5uZXJUZXh0ID0gbmV4dFNsaWRlckJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2VuZC10ZXh0JylcclxuXHRcdFx0XHRuZXh0U2xpZGVyQnV0dG9uLnNldEF0dHJpYnV0ZSgnZW5kLXRleHQnLCBidXR0b25EZWZUZXh0KVxyXG5cdFx0XHRcdGJ1dHRvbkNoYW5nZWRUb01haW4gPSBmYWxzZVxyXG5cdFx0XHR9IFxyXG5cclxuXHRcdFx0aWYoY3VycmVudFNsaWRlcj09MCkgcHJldlNsaWRlckJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcblx0XHRcdGVsc2UgcHJldlNsaWRlckJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJydcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHN3aXBlciA9IG5ldyBTd2lwZSgnLmItY2FyZF9fc2xpZGVyJylcclxuXHRcdHN3aXBlci5vbkxlZnQoZnVuY3Rpb24oKSB7IGdvTmV4dFNsaWRlcigpIH0pXHJcblx0XHRzd2lwZXIub25SaWdodChmdW5jdGlvbigpIHsgZ29QcmV2U2xpZGVyKCkgfSlcclxuXHRcdHN3aXBlci5ydW4oKTtcclxuXHJcblx0XHRwcmV2U2xpZGVyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxyXG5cdFx0XHRnb1ByZXZTbGlkZXIoKVxyXG5cdFx0fSlcclxuXHRcdG5leHRTbGlkZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHRcdFxyXG5cdFx0XHRnb05leHRTbGlkZXIoKVxyXG5cclxuXHRcdH0pXHJcblxyXG5cdFx0Y29uc3QgZ29QcmV2U2xpZGVyID0gKCk9PntcclxuXHRcdFx0aWYgKGN1cnJlbnRTbGlkZXI9PTApIHJldHVybiBmYWxzZVxyXG5cclxuXHRcdFx0ZG90c1tjdXJyZW50U2xpZGVyLTFdLmNsaWNrKClcclxuXHRcdH1cclxuXHRcdGNvbnN0IGdvTmV4dFNsaWRlciA9ICgpPT57XHJcblx0XHRcdGRvdHNbY3VycmVudFNsaWRlcisxXS5jbGljaygpXHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdFxyXG59Il19
