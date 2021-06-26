
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(1);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	new _app2.default();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _wordline = __webpack_require__(2);
	
	var _wordline2 = _interopRequireDefault(_wordline);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Application = function () {
	  function Application() {
	    _classCallCheck(this, Application);
	
	    this.modeSelect = $('.mode-select');
	    this.modeTitle = $('.mode-title');
	
	    this.openClass = 'open';
	
	    this.mode = 'novice';
	
	    this.setMode(this.mode);
	
	    this.bindEvents();
	  }
	
	  _createClass(Application, [{
	    key: 'setMode',
	    value: function setMode(mode) {
	      this.modeTitle.html(mode.replace(/(\b\w)/, function (letter) {
	        return letter.toUpperCase();
	      }));
	      this.wordline = new _wordline2.default(mode);
	      this.wordline.setFocus();
	    }
	  }, {
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;
	
	      this.modeSelect.click(function (e) {
	        e.stopPropagation();
	
	        _this.modeSelect.toggleClass(_this.openClass);
	      });
	
	      this.modeSelect.find('li').click(function (e) {
	        e.stopPropagation();
	
	        _this.setMode($(e.target).attr('id'));
	
	        _this.modeSelect.removeClass(_this.openClass);
	      });
	
	      $(document).click(function (e) {
	        _this.modeSelect.removeClass(_this.openClass);
	      });
	    }
	  }]);
	
	  return Application;
	}();
	
	exports.default = Application;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _generator = __webpack_require__(3);
	
	var _generator2 = _interopRequireDefault(_generator);
	
	var _speed_stats = __webpack_require__(4);
	
	var _speed_stats2 = _interopRequireDefault(_speed_stats);
	
	var _error_stats = __webpack_require__(5);
	
	var _error_stats2 = _interopRequireDefault(_error_stats);
	
	var _counter = __webpack_require__(6);
	
	var _counter2 = _interopRequireDefault(_counter);
	
	var _keyboard = __webpack_require__(7);
	
	var _keyboard2 = _interopRequireDefault(_keyboard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Wordline = function () {
	  function Wordline(mode) {
	    _classCallCheck(this, Wordline);
	
	    this.mode = mode;
	
	    this.inputline = $('.inputline');
	    this.wordline = $('.wordline');
	
	    this.inputline.val('');
	
	    this.errorStats = new _error_stats2.default();
	    this.speedStats = new _speed_stats2.default();
	    this.errorCounter = new _counter2.default();
	    this.generator = new _generator2.default({ interval: 6e4, number: 8 });
	    this.keyboard = new _keyboard2.default();
	    this.letters = '';
	
	    this.untypedClass = 'untyped';
	    this.wrongClass = 'wrong';
	    this.ctrlPressed = false;
	
	    this.bindEvents();
	
	    /*
	    * the "true" arg means that it's an initial fill,
	    * so the function will not do certain things like statistic updates
	    */
	    this.fill(true);
	  }
	
	  _createClass(Wordline, [{
	    key: 'bindEvents',
	    value: function bindEvents() {
	      var _this = this;
	
	      this.inputline.off();
	
	      this.inputline.keypress(function (e) {
	
	        if (_this.letters.length == $('.' + _this.untypedClass).length && e.keyCode != 13) {
	          _this.timeStart = Date.now();
	        }
	
	        var isOk = _this.check(String.fromCharCode(e.charCode));
	
	        if (!isOk) {
	          _this.letters.length ? _this.highlightMistake() : _this.fill();
	        }
	
	        return isOk;
	      });
	
	      // backspace is forbidden, but with ctrl it's possible to delete the entire last word
	      this.inputline.keydown(function (e) {
	        if (e.keyCode == 17) _this.ctrlPressed = true;
	
	        if (e.keyCode == 8) {
	          if (_this.ctrlPressed) {
	            _this.ctrlPressed = false;
	            var curValue = _this.inputline.val().trim();
	
	            var lastSpaceIndex = curValue.lastIndexOf(' ');
	
	            _this.rollback(lastSpaceIndex);
	
	            _this.inputline.val(curValue.slice(0, lastSpaceIndex + 1));
	
	            return false;
	          } else return false;
	        }
	
	        if (e.keyCode == 13) {
	          if ($('.' + _this.untypedClass).length == 0) {
	            _this.clean();
	          }
	        }
	      });
	    }
	  }, {
	    key: 'hightlightKeyTarget',
	    value: function hightlightKeyTarget() {
	      var untyped = $('.' + this.untypedClass);
	
	      var keyTarget = untyped.eq(0).text().trim() || 'space';
	
	      var pressed = this.letters[this.letters.length - 1];
	      if (untyped.length > 0) pressed = untyped.eq(0).prev().text().trim() || 'space';
	      var toPress = keyTarget;
	
	      this.keyboard.highlight(pressed, toPress);
	    }
	  }, {
	    key: 'highlightMistake',
	    value: function highlightMistake() {
	      var _this2 = this;
	
	      var untyped = $('.' + this.untypedClass);
	
	      untyped.addClass(this.wrongClass);
	      this.inputline.addClass(this.wrongClass);
	
	      setTimeout(function () {
	        _this2.inputline.removeClass(_this2.wrongClass);
	        untyped.removeClass(_this2.wrongClass);
	      }, 200);
	
	      this.errorCounter.up();
	
	      return false;
	    }
	  }, {
	    key: 'rollback',
	    value: function rollback(index) {
	      var letterEls = $('.letter');
	      for (var i = index + 1; i < letterEls.length; i++) {
	        letterEls.eq(i).addClass(this.untypedClass);
	      }
	    }
	  }, {
	    key: 'clean',
	    value: function clean() {
	      this.letters = [];
	      this.wordline.text('');
	      this.inputline.val('');
	    }
	  }, {
	    key: 'check',
	    value: function check(letter) {
	      var untyped = $('.' + this.untypedClass);
	
	      var output = false;
	
	      if (letter == untyped.eq(0).text()) {
	        untyped.eq(0).removeClass(this.untypedClass);
	        output = true;
	      }
	
	      if (untyped.length == 0 && letter == ' ') {
	        output = false;
	        this.clean();
	      }
	
	      if (output) {
	        this.hightlightKeyTarget();
	      }
	
	      return output;
	    }
	  }, {
	    key: 'fill',
	    value: function fill(isInit) {
	
	      if (this.mode == 'beginner') this.letters = this.generator.getOne();else this.letters = this.generator.getWords();
	
	      if (!isInit) {
	        this.errorStats.update(this.errorCounter, this.letters);
	
	        var timeEnd = Date.now();
	
	        this.speedStats.update(timeEnd - this.timeStart, this.letters);
	
	        this.errorCounter.reset();
	      }
	
	      var markup = '';
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.letters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var letter = _step.value;
	
	          markup += '<span class="untyped letter">' + letter + '</span>';
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      this.wordline.html(markup);
	
	      this.inputline.width(this.wordline.width());
	
	      this.hightlightKeyTarget();
	    }
	  }, {
	    key: 'setFocus',
	    value: function setFocus() {
	      this.inputline.focus();
	    }
	  }]);
	
	  return Wordline;
	}();
	
	exports.default = Wordline;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Generator = function () {
	  function Generator(args) {
	    var _this = this;
	
	    _classCallCheck(this, Generator);
	
	    this.interval = args.interval || 6e4;
	    this.number = args.number || 8;
	    this.words = this._update();
	
	    setInterval(function () {
	      return _this.words = _this._update();
	    }, this.interval);
	  }
	
	  /**************
	  * PRIVATE
	  **************/
	
	
	  _createClass(Generator, [{
	    key: '_rand',
	    value: function _rand(low, high) {
	      return Math.floor((high - low + 1) * Math.random()) + Math.floor(low);
	    }
	  }, {
	    key: '_update',
	    value: function _update() {
	      var output = [];
	
	      for (var i = 0; i < this.number; i++) {
	        output.push(words[this._rand(0, words.length - 1)]);
	      }return output;
	    }
	  }, {
	    key: '_shuffle',
	    value: function _shuffle(array) {
	      for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	      }
	
	      return array;
	    }
	
	    /**************
	    * PUBLIC
	    **************/
	
	  }, {
	    key: 'getWords',
	    value: function getWords() {
	      return this._shuffle(this.words).join(' ');
	    }
	  }, {
	    key: 'getOne',
	    value: function getOne() {
	      var output = [];
	
	      var word = words[this._rand(0, words.length)];
	
	      for (var i = 0; i < this.number; i++) {
	        output.push(word);
	      }return output.join(' ');
	    }
	  }]);
	
	  return Generator;
	}();
	
	exports.default = Generator;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SpeedStats = function () {
	  function SpeedStats() {
	    _classCallCheck(this, SpeedStats);
	
	    this.currentStatsEl = $('.speed-current');
	    this.averageStatsEl = $('.speed-average');
	
	    this.currentStatsEl.text('---');
	    this.averageStatsEl.text('---');
	
	    this.stats = [];
	  }
	
	  _createClass(SpeedStats, [{
	    key: '_updateAverage',
	    value: function _updateAverage(speed) {
	      this.stats.push(speed);
	
	      var total = 0;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.stats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var s = _step.value;
	
	          total += s;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      this.averageStatsEl.text(Math.round(total / this.stats.length));
	    }
	  }, {
	    key: 'update',
	    value: function update(time, letters) {
	      var speed = Math.round(letters.length / (time / 1000) * 60);
	
	      this._updateAverage(speed);
	
	      this.currentStatsEl.text(speed);
	    }
	  }]);
	
	  return SpeedStats;
	}();
	
	exports.default = SpeedStats;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ErrorStats = function () {
	  function ErrorStats() {
	    _classCallCheck(this, ErrorStats);
	
	    this.currentStatsEl = $('.error-current');
	    this.averageStatsEl = $('.error-average');
	
	    this.currentStatsEl.text('0.00%');
	    this.averageStatsEl.text('0.00%');
	
	    this.stats = [];
	  }
	
	  _createClass(ErrorStats, [{
	    key: '_updateAverage',
	    value: function _updateAverage(persentage) {
	      this.stats.push(persentage);
	
	      var total = 0;
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.stats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var p = _step.value;
	
	          total += p;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      this.averageStatsEl.text((total / this.stats.length).toFixed(2) + '%');
	    }
	  }, {
	    key: 'update',
	    value: function update(counter, letters) {
	      var persentage = counter.get() * 100 / letters.length;
	
	      this._updateAverage(persentage);
	
	      this.currentStatsEl.text(persentage.toFixed(2) + '%');
	    }
	  }]);
	
	  return ErrorStats;
	}();
	
	exports.default = ErrorStats;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Counter = function () {
	  function Counter() {
	    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	    _classCallCheck(this, Counter);
	
	    this.count = start;
	  }
	
	  _createClass(Counter, [{
	    key: "get",
	    value: function get() {
	      return this.count;
	    }
	  }, {
	    key: "set",
	    value: function set(count) {
	      this.count = count;
	    }
	  }, {
	    key: "up",
	    value: function up() {
	      return ++this.count;
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this.count = 0;
	    }
	  }]);
	
	  return Counter;
	}();
	
	exports.default = Counter;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Keyboard = function () {
	  function Keyboard() {
	    _classCallCheck(this, Keyboard);
	
	    this.root = $('.keyboard-container');
	    this.keys = $('.keyboard-container .key');
	    this.tools = $('.keyboard-toolbar .tool');
	    this.keyTargetClass = 'key-target';
	    this.righthandedSpace = 'righthand';
	
	    this.leftHalf = 'q w e r t a s d f g z x c v b'.split(/\s/);
	
	    this._bindEvents();
	  }
	
	  _createClass(Keyboard, [{
	    key: '_bindEvents',
	    value: function _bindEvents() {
	      var _this = this;
	
	      this.tools.filter('#keyboard-toggle').click(function (e) {
	        _this.root.toggleClass('hidden');
	      });
	
	      this.tools.filter('#hands-toggle').click(function (e) {
	        _this.root.toggleClass('non-hands');
	      });
	
	      this.tools.filter('#color-toggle').click(function (e) {
	        _this.root.toggleClass('colorful');
	      });
	    }
	  }, {
	    key: '_isUpper',
	    value: function _isUpper(letter) {
	      return letter == letter.toUpperCase();
	    }
	  }, {
	    key: '_isIn',
	    value: function _isIn(array, item) {
	      return array.includes(item);
	    }
	  }, {
	    key: '_handForSpace',
	    value: function _handForSpace(pressed) {
	      return this.leftHalf.includes(pressed) ? this.righthandedSpace : '';
	    }
	  }, {
	    key: 'highlight',
	    value: function highlight(pressed, toPress) {
	
	      this.keys.removeClass(this.keyTargetClass);
	
	      if (toPress == 'space') {
	        var space = this.keys.filter('#space');
	
	        if (space.hasClass(this.righthandedSpace)) {
	          space.removeClass(this.righthandedSpace);
	        }
	
	        space.addClass(this.keyTargetClass + ' ' + this._handForSpace(pressed));
	      } else {
	
	        var isUpper = this._isUpper(toPress);
	
	        toPress = toPress.toLowerCase();
	
	        if (isUpper) {
	
	          var side = this.leftHalf.includes(toPress) ? 'r' : 'l'; // r - right hand (l - left)
	
	          this.keys.filter('#shift-' + side).addClass(this.keyTargetClass);
	        }
	
	        this.keys.filter('#' + toPress).addClass(this.keyTargetClass);
	      }
	    }
	  }]);
	
	  return Keyboard;
	}();
	
	exports.default = Keyboard;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYThjNzYzZWZkOTRhY2E1ZWEzYWEiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2FwcGxpY2F0aW9uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvd29yZGxpbmUvd29yZGxpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3dvcmRsaW5lL2dlbmVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvd29yZGxpbmUvc3BlZWRfc3RhdHMuanMiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL3dvcmRsaW5lL2Vycm9yX3N0YXRzLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy93b3JkbGluZS9jb3VudGVyLmpzIiwid2VicGFjazovLy8uL3B1YmxpYy9qcy9rZXlib2FyZC9rZXlib2FyZC5qcyJdLCJuYW1lcyI6WyJBcHBsaWNhdGlvbiIsIm1vZGVTZWxlY3QiLCIkIiwibW9kZVRpdGxlIiwib3BlbkNsYXNzIiwibW9kZSIsInNldE1vZGUiLCJiaW5kRXZlbnRzIiwiaHRtbCIsInJlcGxhY2UiLCJsZXR0ZXIiLCJ0b1VwcGVyQ2FzZSIsIndvcmRsaW5lIiwic2V0Rm9jdXMiLCJjbGljayIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b2dnbGVDbGFzcyIsImZpbmQiLCJ0YXJnZXQiLCJhdHRyIiwicmVtb3ZlQ2xhc3MiLCJkb2N1bWVudCIsIldvcmRsaW5lIiwiaW5wdXRsaW5lIiwidmFsIiwiZXJyb3JTdGF0cyIsInNwZWVkU3RhdHMiLCJlcnJvckNvdW50ZXIiLCJnZW5lcmF0b3IiLCJpbnRlcnZhbCIsIm51bWJlciIsImtleWJvYXJkIiwibGV0dGVycyIsInVudHlwZWRDbGFzcyIsIndyb25nQ2xhc3MiLCJjdHJsUHJlc3NlZCIsImZpbGwiLCJvZmYiLCJrZXlwcmVzcyIsImxlbmd0aCIsImtleUNvZGUiLCJ0aW1lU3RhcnQiLCJEYXRlIiwibm93IiwiaXNPayIsImNoZWNrIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiY2hhckNvZGUiLCJoaWdobGlnaHRNaXN0YWtlIiwia2V5ZG93biIsImN1clZhbHVlIiwidHJpbSIsImxhc3RTcGFjZUluZGV4IiwibGFzdEluZGV4T2YiLCJyb2xsYmFjayIsInNsaWNlIiwiY2xlYW4iLCJ1bnR5cGVkIiwia2V5VGFyZ2V0IiwiZXEiLCJ0ZXh0IiwicHJlc3NlZCIsInByZXYiLCJ0b1ByZXNzIiwiaGlnaGxpZ2h0IiwiYWRkQ2xhc3MiLCJzZXRUaW1lb3V0IiwidXAiLCJpbmRleCIsImxldHRlckVscyIsImkiLCJvdXRwdXQiLCJoaWdodGxpZ2h0S2V5VGFyZ2V0IiwiaXNJbml0IiwiZ2V0T25lIiwiZ2V0V29yZHMiLCJ1cGRhdGUiLCJ0aW1lRW5kIiwicmVzZXQiLCJtYXJrdXAiLCJ3aWR0aCIsImZvY3VzIiwiR2VuZXJhdG9yIiwiYXJncyIsIndvcmRzIiwiX3VwZGF0ZSIsInNldEludGVydmFsIiwibG93IiwiaGlnaCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInB1c2giLCJfcmFuZCIsImFycmF5IiwiaiIsInRlbXAiLCJfc2h1ZmZsZSIsImpvaW4iLCJ3b3JkIiwiU3BlZWRTdGF0cyIsImN1cnJlbnRTdGF0c0VsIiwiYXZlcmFnZVN0YXRzRWwiLCJzdGF0cyIsInNwZWVkIiwidG90YWwiLCJzIiwicm91bmQiLCJ0aW1lIiwiX3VwZGF0ZUF2ZXJhZ2UiLCJFcnJvclN0YXRzIiwicGVyc2VudGFnZSIsInAiLCJ0b0ZpeGVkIiwiY291bnRlciIsImdldCIsIkNvdW50ZXIiLCJzdGFydCIsImNvdW50IiwiS2V5Ym9hcmQiLCJyb290Iiwia2V5cyIsInRvb2xzIiwia2V5VGFyZ2V0Q2xhc3MiLCJyaWdodGhhbmRlZFNwYWNlIiwibGVmdEhhbGYiLCJzcGxpdCIsIl9iaW5kRXZlbnRzIiwiZmlsdGVyIiwiaXRlbSIsImluY2x1ZGVzIiwic3BhY2UiLCJoYXNDbGFzcyIsIl9oYW5k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dC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGE4Yzc2M2VmZDk0YWNhNWVhM2FhIiwiaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vYXBwbGljYXRpb24vYXBwJztcblxubmV3IEFwcGxpY2F0aW9uKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL21haW4uanMiLCJpbXBvcnQgV29yZGxpbmUgZnJvbSAnLi4vd29yZGxpbmUvd29yZGxpbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBsaWNhdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubW9kZVNlbGVjdCA9ICQoJy5tb2RlLXNlbGVjdCcpO1xuICAgIHRoaXMubW9kZVRpdGxlID0gJCgnLm1vZGUtdGl0bGUnKTtcblxuICAgIHRoaXMub3BlbkNsYXNzID0gJ29wZW4nO1xuXG4gICAgdGhpcy5tb2RlID0gJ25vdmljZSc7XG5cbiAgICB0aGlzLnNldE1vZGUodGhpcy5tb2RlKTtcblxuICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICB9XG5cbiAgc2V0TW9kZShtb2RlKSB7XG4gICAgdGhpcy5tb2RlVGl0bGUuaHRtbChtb2RlLnJlcGxhY2UoLyhcXGJcXHcpLywgbGV0dGVyID0+IGxldHRlci50b1VwcGVyQ2FzZSgpKSk7XG4gICAgdGhpcy53b3JkbGluZSA9IG5ldyBXb3JkbGluZShtb2RlKTtcbiAgICB0aGlzLndvcmRsaW5lLnNldEZvY3VzKCk7XG4gIH1cblxuICBiaW5kRXZlbnRzKCkge1xuICAgIHRoaXMubW9kZVNlbGVjdC5jbGljayhlID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHRoaXMubW9kZVNlbGVjdC50b2dnbGVDbGFzcyh0aGlzLm9wZW5DbGFzcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vZGVTZWxlY3QuZmluZCgnbGknKS5jbGljayhlID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHRoaXMuc2V0TW9kZSggJChlLnRhcmdldCkuYXR0cignaWQnKSApO1xuXG4gICAgICB0aGlzLm1vZGVTZWxlY3QucmVtb3ZlQ2xhc3ModGhpcy5vcGVuQ2xhc3MpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkuY2xpY2soZSA9PiB7XG4gICAgICB0aGlzLm1vZGVTZWxlY3QucmVtb3ZlQ2xhc3ModGhpcy5vcGVuQ2xhc3MpO1xuICAgIH0pO1xuICB9XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wdWJsaWMvanMvYXBwbGljYXRpb24vYXBwLmpzIiwiaW1wb3J0IEdlbmVyYXRvciBmcm9tICcuL2dlbmVyYXRvcic7XG5pbXBvcnQgU3BlZWRTdGF0cyBmcm9tICcuL3NwZWVkX3N0YXRzJ1xuaW1wb3J0IEVycm9yU3RhdHMgZnJvbSAnLi9lcnJvcl9zdGF0cyc7XG5pbXBvcnQgQ291bnRlciBmcm9tICcuL2NvdW50ZXInO1xuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4uL2tleWJvYXJkL2tleWJvYXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV29yZGxpbmUge1xuICBjb25zdHJ1Y3Rvcihtb2RlKSB7XG4gICAgdGhpcy5tb2RlID0gbW9kZTtcblxuICAgIHRoaXMuaW5wdXRsaW5lID0gJCgnLmlucHV0bGluZScpO1xuICAgIHRoaXMud29yZGxpbmUgPSAkKCcud29yZGxpbmUnKTtcblxuICAgIHRoaXMuaW5wdXRsaW5lLnZhbCgnJylcblxuICAgIHRoaXMuZXJyb3JTdGF0cyA9IG5ldyBFcnJvclN0YXRzKCk7XG4gICAgdGhpcy5zcGVlZFN0YXRzID0gbmV3IFNwZWVkU3RhdHMoKTtcbiAgICB0aGlzLmVycm9yQ291bnRlciA9IG5ldyBDb3VudGVyKCk7XG4gICAgdGhpcy5nZW5lcmF0b3IgPSBuZXcgR2VuZXJhdG9yKHsgaW50ZXJ2YWw6IDZlNCwgbnVtYmVyOiA4IH0pO1xuICAgIHRoaXMua2V5Ym9hcmQgPSBuZXcgS2V5Ym9hcmQoKTtcbiAgICB0aGlzLmxldHRlcnMgPSAnJztcblxuICAgIHRoaXMudW50eXBlZENsYXNzID0gJ3VudHlwZWQnO1xuICAgIHRoaXMud3JvbmdDbGFzcyA9ICd3cm9uZyc7XG4gICAgdGhpcy5jdHJsUHJlc3NlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAvKlxuICAgICogdGhlIFwidHJ1ZVwiIGFyZyBtZWFucyB0aGF0IGl0J3MgYW4gaW5pdGlhbCBmaWxsLFxuICAgICogc28gdGhlIGZ1bmN0aW9uIHdpbGwgbm90IGRvIGNlcnRhaW4gdGhpbmdzIGxpa2Ugc3RhdGlzdGljIHVwZGF0ZXNcbiAgICAqL1xuICAgIHRoaXMuZmlsbCh0cnVlKTtcblxuICB9XG5cbiAgYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLmlucHV0bGluZS5vZmYoKTtcblxuICAgIHRoaXMuaW5wdXRsaW5lLmtleXByZXNzKGUgPT4ge1xuXG4gICAgICBpZih0aGlzLmxldHRlcnMubGVuZ3RoID09ICQoYC4ke3RoaXMudW50eXBlZENsYXNzfWApLmxlbmd0aCAmJiBlLmtleUNvZGUgIT0gMTMpIHtcbiAgICAgICAgdGhpcy50aW1lU3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNPayA9IHRoaXMuY2hlY2soU3RyaW5nLmZyb21DaGFyQ29kZShlLmNoYXJDb2RlKSk7XG5cbiAgICAgIGlmKCFpc09rKSB7XG4gICAgICAgIHRoaXMubGV0dGVycy5sZW5ndGggPyB0aGlzLmhpZ2hsaWdodE1pc3Rha2UoKSA6IHRoaXMuZmlsbCgpO1xuICAgICAgfSBcblxuICAgICAgcmV0dXJuIGlzT2s7XG4gICAgfSk7XG5cbiAgICAvLyBiYWNrc3BhY2UgaXMgZm9yYmlkZGVuLCBidXQgd2l0aCBjdHJsIGl0J3MgcG9zc2libGUgdG8gZGVsZXRlIHRoZSBlbnRpcmUgbGFzdCB3b3JkXG4gICAgdGhpcy5pbnB1dGxpbmUua2V5ZG93bihlID0+IHtcbiAgICAgIGlmKGUua2V5Q29kZSA9PSAxNykgdGhpcy5jdHJsUHJlc3NlZCA9IHRydWU7XG5cbiAgICAgIGlmKGUua2V5Q29kZSA9PSA4KSB7XG4gICAgICAgIGlmKHRoaXMuY3RybFByZXNzZWQpIHtcbiAgICAgICAgICB0aGlzLmN0cmxQcmVzc2VkID0gZmFsc2U7XG4gICAgICAgICAgbGV0IGN1clZhbHVlID0gdGhpcy5pbnB1dGxpbmUudmFsKCkudHJpbSgpO1xuXG4gICAgICAgICAgbGV0IGxhc3RTcGFjZUluZGV4ID0gY3VyVmFsdWUubGFzdEluZGV4T2YoJyAnKTtcblxuICAgICAgICAgIHRoaXMucm9sbGJhY2sobGFzdFNwYWNlSW5kZXgpO1xuXG4gICAgICAgICAgdGhpcy5pbnB1dGxpbmUudmFsKGN1clZhbHVlLnNsaWNlKDAsIGxhc3RTcGFjZUluZGV4KzEpKTtcblxuICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmKGUua2V5Q29kZSA9PSAxMykge1xuICAgICAgICBpZiggJChgLiR7dGhpcy51bnR5cGVkQ2xhc3N9YCkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLmNsZWFuKCk7XG4gICAgICAgIH1cbiAgICAgIH0gXG5cbiAgICB9KTtcbiAgfVxuXG4gIGhpZ2h0bGlnaHRLZXlUYXJnZXQoKSB7XG4gICAgbGV0IHVudHlwZWQgPSAkKGAuJHt0aGlzLnVudHlwZWRDbGFzc31gKTtcblxuICAgIGxldCBrZXlUYXJnZXQgPSB1bnR5cGVkLmVxKDApLnRleHQoKS50cmltKCkgfHwgJ3NwYWNlJztcblxuICAgIGxldCBwcmVzc2VkID0gdGhpcy5sZXR0ZXJzW3RoaXMubGV0dGVycy5sZW5ndGgtMV1cbiAgICBpZih1bnR5cGVkLmxlbmd0aCA+IDApXG4gICAgICBwcmVzc2VkID0gdW50eXBlZC5lcSgwKS5wcmV2KCkudGV4dCgpLnRyaW0oKSB8fCAnc3BhY2UnO1xuICAgIGxldCB0b1ByZXNzID0ga2V5VGFyZ2V0O1xuXG4gICAgdGhpcy5rZXlib2FyZC5oaWdobGlnaHQocHJlc3NlZCwgdG9QcmVzcyk7XG5cbiAgfVxuXG4gIGhpZ2hsaWdodE1pc3Rha2UoKSB7XG4gICAgbGV0IHVudHlwZWQgPSAkKGAuJHt0aGlzLnVudHlwZWRDbGFzc31gKTtcblxuICAgIHVudHlwZWQuYWRkQ2xhc3ModGhpcy53cm9uZ0NsYXNzKVxuICAgIHRoaXMuaW5wdXRsaW5lLmFkZENsYXNzKHRoaXMud3JvbmdDbGFzcyk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5wdXRsaW5lLnJlbW92ZUNsYXNzKHRoaXMud3JvbmdDbGFzcylcbiAgICAgIHVudHlwZWQucmVtb3ZlQ2xhc3ModGhpcy53cm9uZ0NsYXNzKVxuICAgIH0gLCAyMDApO1xuICAgIFxuICAgIHRoaXMuZXJyb3JDb3VudGVyLnVwKCk7XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJvbGxiYWNrKGluZGV4KSB7XG4gICAgbGV0IGxldHRlckVscyA9ICQoJy5sZXR0ZXInKTtcbiAgICBmb3IobGV0IGkgPSBpbmRleCsxOyBpIDwgbGV0dGVyRWxzLmxlbmd0aDsgaSsrKVxuICAgICAgbGV0dGVyRWxzLmVxKGkpLmFkZENsYXNzKHRoaXMudW50eXBlZENsYXNzKTtcbiAgfVxuXG4gIGNsZWFuKCkge1xuICAgIHRoaXMubGV0dGVycyA9IFtdO1xuICAgIHRoaXMud29yZGxpbmUudGV4dCgnJyk7XG4gICAgdGhpcy5pbnB1dGxpbmUudmFsKCcnKTtcbiAgfVxuXG4gIGNoZWNrKGxldHRlcikge1xuICAgIGxldCB1bnR5cGVkID0gJChgLiR7dGhpcy51bnR5cGVkQ2xhc3N9YCk7XG5cbiAgICBsZXQgb3V0cHV0ID0gZmFsc2U7XG5cbiAgICBpZihsZXR0ZXIgPT0gdW50eXBlZC5lcSgwKS50ZXh0KCkpIHtcbiAgICAgIHVudHlwZWQuZXEoMCkucmVtb3ZlQ2xhc3ModGhpcy51bnR5cGVkQ2xhc3MpO1xuICAgICAgb3V0cHV0ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZih1bnR5cGVkLmxlbmd0aCA9PSAwICYmIGxldHRlciA9PSAnICcpIHtcbiAgICAgIG91dHB1dCA9IGZhbHNlXG4gICAgICB0aGlzLmNsZWFuKCk7XG4gICAgfVxuXG4gICAgaWYob3V0cHV0KSB7XG4gICAgICB0aGlzLmhpZ2h0bGlnaHRLZXlUYXJnZXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgZmlsbChpc0luaXQpIHtcblxuICAgIGlmKHRoaXMubW9kZSA9PSAnYmVnaW5uZXInKVxuICAgICAgdGhpcy5sZXR0ZXJzID0gdGhpcy5nZW5lcmF0b3IuZ2V0T25lKCk7XG4gICAgZWxzZVxuICAgICAgdGhpcy5sZXR0ZXJzID0gdGhpcy5nZW5lcmF0b3IuZ2V0V29yZHMoKTtcblxuICAgIGlmKCFpc0luaXQpIHtcbiAgICAgIHRoaXMuZXJyb3JTdGF0cy51cGRhdGUodGhpcy5lcnJvckNvdW50ZXIsIHRoaXMubGV0dGVycyk7XG5cbiAgICAgIGxldCB0aW1lRW5kID0gRGF0ZS5ub3coKTtcblxuICAgICAgdGhpcy5zcGVlZFN0YXRzLnVwZGF0ZSh0aW1lRW5kIC0gdGhpcy50aW1lU3RhcnQsIHRoaXMubGV0dGVycyk7XG5cbiAgICAgIHRoaXMuZXJyb3JDb3VudGVyLnJlc2V0KCk7XG5cbiAgICB9XG5cbiAgICBsZXQgbWFya3VwID0gJyc7XG4gICAgZm9yKGxldCBsZXR0ZXIgb2YgdGhpcy5sZXR0ZXJzKVxuICAgICAgbWFya3VwICs9IGA8c3BhbiBjbGFzcz1cInVudHlwZWQgbGV0dGVyXCI+JHtsZXR0ZXJ9PC9zcGFuPmBcblxuICAgIHRoaXMud29yZGxpbmUuaHRtbChtYXJrdXApO1xuXG4gICAgdGhpcy5pbnB1dGxpbmUud2lkdGgodGhpcy53b3JkbGluZS53aWR0aCgpKTtcbiAgICBcbiAgICB0aGlzLmhpZ2h0bGlnaHRLZXlUYXJnZXQoKTtcbiAgfVxuXG4gIHNldEZvY3VzKCkge1xuICAgIHRoaXMuaW5wdXRsaW5lLmZvY3VzKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy93b3JkbGluZS93b3JkbGluZS5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKGFyZ3MpIHtcbiAgICB0aGlzLmludGVydmFsID0gYXJncy5pbnRlcnZhbCB8fCA2ZTQ7XG4gICAgdGhpcy5udW1iZXIgPSBhcmdzLm51bWJlciB8fCA4O1xuICAgIHRoaXMud29yZHMgPSB0aGlzLl91cGRhdGUoKTtcblxuICAgIHNldEludGVydmFsKCgpID0+IHRoaXMud29yZHMgPSB0aGlzLl91cGRhdGUoKSwgdGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICAvKioqKioqKioqKioqKipcbiAgKiBQUklWQVRFXG4gICoqKioqKioqKioqKioqL1xuICBfcmFuZChsb3csIGhpZ2gpIHsgXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKGhpZ2gtbG93KzEpKk1hdGgucmFuZG9tKCkpK01hdGguZmxvb3IobG93KVxuICB9XG5cbiAgX3VwZGF0ZSgpIHtcbiAgICBsZXQgb3V0cHV0ID0gW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXI7IGkrKylcbiAgICAgIG91dHB1dC5wdXNoKHdvcmRzW3RoaXMuX3JhbmQoMCwgd29yZHMubGVuZ3RoLTEpXSlcbiAgICBcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgX3NodWZmbGUoYXJyYXkpIHtcbiAgICBmb3IgKHZhciBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICB2YXIgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xuICAgICAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xuICAgICAgICBhcnJheVtqXSA9IHRlbXA7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKioqKioqKioqKioqKlxuICAqIFBVQkxJQ1xuICAqKioqKioqKioqKioqKi9cbiAgZ2V0V29yZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NodWZmbGUodGhpcy53b3Jkcykuam9pbignICcpO1xuICB9XG5cbiAgZ2V0T25lKCkge1xuICAgIGxldCBvdXRwdXQgPSBbXTtcblxuICAgIGxldCB3b3JkID0gd29yZHNbdGhpcy5fcmFuZCgwLCB3b3Jkcy5sZW5ndGgpXTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlcjsgaSsrKVxuICAgICAgb3V0cHV0LnB1c2god29yZCk7XG5cbiAgICByZXR1cm4gb3V0cHV0LmpvaW4oJyAnKTtcbiAgfVxuXG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy93b3JkbGluZS9nZW5lcmF0b3IuanMiLCJjbGFzcyBTcGVlZFN0YXRzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50U3RhdHNFbCA9ICQoJy5zcGVlZC1jdXJyZW50Jyk7XG4gICAgdGhpcy5hdmVyYWdlU3RhdHNFbCA9ICQoJy5zcGVlZC1hdmVyYWdlJyk7XG5cbiAgICB0aGlzLmN1cnJlbnRTdGF0c0VsLnRleHQoJy0tLScpO1xuICAgIHRoaXMuYXZlcmFnZVN0YXRzRWwudGV4dCgnLS0tJyk7XG5cbiAgICB0aGlzLnN0YXRzID0gW107XG4gIH1cblxuICBfdXBkYXRlQXZlcmFnZShzcGVlZCkge1xuICAgIHRoaXMuc3RhdHMucHVzaChzcGVlZCk7XG5cbiAgICBsZXQgdG90YWwgPSAwO1xuICAgIGZvcihsZXQgcyBvZiB0aGlzLnN0YXRzKVxuICAgICAgdG90YWwgKz0gcztcblxuICAgIHRoaXMuYXZlcmFnZVN0YXRzRWwudGV4dChNYXRoLnJvdW5kKHRvdGFsIC8gdGhpcy5zdGF0cy5sZW5ndGgpKTtcbiAgfVxuXG4gIHVwZGF0ZSh0aW1lLCBsZXR0ZXJzKSB7XG4gICAgbGV0IHNwZWVkID0gTWF0aC5yb3VuZCgobGV0dGVycy5sZW5ndGggLyAodGltZSAvIDEwMDApICkgKiA2MCk7XG5cbiAgICB0aGlzLl91cGRhdGVBdmVyYWdlKHNwZWVkKTtcblxuICAgIHRoaXMuY3VycmVudFN0YXRzRWwudGV4dChzcGVlZCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGVlZFN0YXRzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy93b3JkbGluZS9zcGVlZF9zdGF0cy5qcyIsImNsYXNzIEVycm9yU3RhdHMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGF0c0VsID0gJCgnLmVycm9yLWN1cnJlbnQnKTtcbiAgICB0aGlzLmF2ZXJhZ2VTdGF0c0VsID0gJCgnLmVycm9yLWF2ZXJhZ2UnKTtcblxuICAgIHRoaXMuY3VycmVudFN0YXRzRWwudGV4dCgnMC4wMCUnKTtcbiAgICB0aGlzLmF2ZXJhZ2VTdGF0c0VsLnRleHQoJzAuMDAlJyk7XG5cbiAgICB0aGlzLnN0YXRzID0gW107XG4gIH1cblxuICBfdXBkYXRlQXZlcmFnZShwZXJzZW50YWdlKSB7XG4gICAgdGhpcy5zdGF0cy5wdXNoKHBlcnNlbnRhZ2UpO1xuXG4gICAgbGV0IHRvdGFsID0gMDtcbiAgICBmb3IobGV0IHAgb2YgdGhpcy5zdGF0cylcbiAgICAgIHRvdGFsICs9IHA7XG5cbiAgICB0aGlzLmF2ZXJhZ2VTdGF0c0VsLnRleHQoICh0b3RhbCAvIHRoaXMuc3RhdHMubGVuZ3RoKS50b0ZpeGVkKDIpICsgJyUnKTtcbiAgfVxuXG4gIHVwZGF0ZShjb3VudGVyLCBsZXR0ZXJzKSB7XG4gICAgbGV0IHBlcnNlbnRhZ2UgPSBjb3VudGVyLmdldCgpICogMTAwIC8gbGV0dGVycy5sZW5ndGg7XG5cbiAgICB0aGlzLl91cGRhdGVBdmVyYWdlKHBlcnNlbnRhZ2UpO1xuXG4gICAgdGhpcy5jdXJyZW50U3RhdHNFbC50ZXh0KHBlcnNlbnRhZ2UudG9GaXhlZCgyKSArICclJyk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvclN0YXRzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3B1YmxpYy9qcy93b3JkbGluZS9lcnJvcl9zdGF0cy5qcyIsImNsYXNzIENvdW50ZXIge1xuICBjb25zdHJ1Y3RvcihzdGFydCA9IDApIHsgdGhpcy5jb3VudCA9IHN0YXJ0IH1cblxuICBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuY291bnRcbiAgfVxuXG4gIHNldChjb3VudCkge1xuICAgIHRoaXMuY291bnQgPSBjb3VudFxuICB9XG5cbiAgdXAoKSB7XG4gICAgcmV0dXJuICsrdGhpcy5jb3VudFxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jb3VudCA9IDBcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvdW50ZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL3dvcmRsaW5lL2NvdW50ZXIuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBLZXlib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucm9vdCA9ICQoJy5rZXlib2FyZC1jb250YWluZXInKTtcbiAgICB0aGlzLmtleXMgPSAkKCcua2V5Ym9hcmQtY29udGFpbmVyIC5rZXknKTtcbiAgICB0aGlzLnRvb2xzID0gJCgnLmtleWJvYXJkLXRvb2xiYXIgLnRvb2wnKVxuICAgIHRoaXMua2V5VGFyZ2V0Q2xhc3MgPSAna2V5LXRhcmdldCc7XG4gICAgdGhpcy5yaWdodGhhbmRlZFNwYWNlID0gJ3JpZ2h0aGFuZCc7XG5cbiAgICB0aGlzLmxlZnRIYWxmID0gJ3EgdyBlIHIgdCBhIHMgZCBmIGcgeiB4IGMgdiBiJy5zcGxpdCgvXFxzLyk7XG5cbiAgICB0aGlzLl9iaW5kRXZlbnRzKCk7XG4gIH1cblxuICBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLnRvb2xzLmZpbHRlcignI2tleWJvYXJkLXRvZ2dsZScpLmNsaWNrKGUgPT4ge1xuICAgICAgdGhpcy5yb290LnRvZ2dsZUNsYXNzKCdoaWRkZW4nKTtcbiAgICB9KTtcblxuICAgIHRoaXMudG9vbHMuZmlsdGVyKCcjaGFuZHMtdG9nZ2xlJykuY2xpY2soZSA9PiB7XG4gICAgICB0aGlzLnJvb3QudG9nZ2xlQ2xhc3MoJ25vbi1oYW5kcycpO1xuICAgIH0pO1xuXG4gICAgdGhpcy50b29scy5maWx0ZXIoJyNjb2xvci10b2dnbGUnKS5jbGljayhlID0+IHtcbiAgICAgIHRoaXMucm9vdC50b2dnbGVDbGFzcygnY29sb3JmdWwnKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9pc1VwcGVyKGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXIgPT0gbGV0dGVyLnRvVXBwZXJDYXNlKClcbiAgfVxuXG4gIF9pc0luKGFycmF5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGFycmF5LmluY2x1ZGVzKGl0ZW0pO1xuICB9XG5cbiAgX2hhbmRGb3JTcGFjZShwcmVzc2VkKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdEhhbGYuaW5jbHVkZXMocHJlc3NlZCkgPyB0aGlzLnJpZ2h0aGFuZGVkU3BhY2UgOiAnJ1xuICB9XG5cbiAgaGlnaGxpZ2h0KHByZXNzZWQsIHRvUHJlc3MpIHtcblxuICAgIHRoaXMua2V5cy5yZW1vdmVDbGFzcyh0aGlzLmtleVRhcmdldENsYXNzKTtcblxuICAgIGlmKHRvUHJlc3MgPT0gJ3NwYWNlJykge1xuICAgICAgbGV0IHNwYWNlID0gdGhpcy5rZXlzLmZpbHRlcignI3NwYWNlJyk7XG5cbiAgICAgIGlmKHNwYWNlLmhhc0NsYXNzKHRoaXMucmlnaHRoYW5kZWRTcGFjZSkpIHtcbiAgICAgICAgc3BhY2UucmVtb3ZlQ2xhc3ModGhpcy5yaWdodGhhbmRlZFNwYWNlKTtcbiAgICAgIH1cblxuICAgICAgc3BhY2UuYWRkQ2xhc3ModGhpcy5rZXlUYXJnZXRDbGFzcyArICcgJyArIHRoaXMuX2hhbmRGb3JTcGFjZShwcmVzc2VkKSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgbGV0IGlzVXBwZXIgPSB0aGlzLl9pc1VwcGVyKHRvUHJlc3MpO1xuXG4gICAgICB0b1ByZXNzID0gdG9QcmVzcy50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBpZihpc1VwcGVyKSB7XG5cbiAgICAgICAgbGV0IHNpZGUgPSB0aGlzLmxlZnRIYWxmLmluY2x1ZGVzKHRvUHJlc3MpID8gJ3InIDogJ2wnOyAvLyByIC0gcmlnaHQgaGFuZCAobCAtIGxlZnQpXG5cbiAgICAgICAgdGhpcy5rZXlzLmZpbHRlcihgI3NoaWZ0LSR7c2lkZX1gKS5hZGRDbGFzcyh0aGlzLmtleVRhcmdldENsYXNzKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5rZXlzLmZpbHRlcihgIyR7dG9QcmVzc31gKS5hZGRDbGFzcyh0aGlzLmtleVRhcmdldENsYXNzKTtcblxuICAgIH1cblxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcHVibGljL2pzL2tleWJvYXJkL2tleWJvYXJkLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==
