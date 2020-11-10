/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/scripts/content_script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/components/youtube/YoutubeHome.js":
/*!*************************************************!*\
  !*** ./build/components/youtube/YoutubeHome.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YoutubeHomeObserver = void 0;

const Component_1 = __webpack_require__(/*! @modules/Component */ "./build/modules/Component.js");

const ElementObserver_1 = __webpack_require__(/*! @modules/ElementObserver */ "./build/modules/ElementObserver.js");

class YoutubeHome extends Component_1.default {
  constructor(builder) {
    super(builder);
    console.log('YT No Music'); // Content Script

    this.content = () => {
      this.observer.subscribe('grid_item').elementAdded.addListener(event => {
        let target = event.target;
        let thumbnail = target.querySelector('#thumbnail');

        if (thumbnail && thumbnail.getAttribute('href').includes('&start_radio=1')) {
          let title = target.querySelector('#video-title');
          console.log('removing video', title.innerHTML);
          target.style.setProperty('display', 'none', 'important');
        }
      });
    };
  }

}

exports.default = YoutubeHome;

class YoutubeHomeObserver extends ElementObserver_1.default {
  constructor(component) {
    super(component, {
      tags: {
        body: {
          ownedBy: []
        },
        grid_item: {
          ownedBy: ['body']
        },
        grid_item_playlist: {
          ownedBy: ['grid_item']
        }
      },
      watchers: [{
        sources: [null],
        tag: 'body',
        selectors: ['body']
      }, {
        sources: ['body'],
        tag: 'ytd_app',
        selectors: ['ytd-app']
      }, {
        sources: ['ytd_app'],
        tag: 'grid_item',
        selectors: ['div#content', 'ytd-page-manager', 'ytd-browse', 'ytd-two-column-browse-results-renderer', 'div#primary', 'ytd-rich-grid-renderer', 'div#contents', 'ytd-rich-item-renderer']
      }],
      finders: {}
    });
  }

}

exports.YoutubeHomeObserver = YoutubeHomeObserver;

/***/ }),

/***/ "./build/modules/Component.js":
/*!************************************!*\
  !*** ./build/modules/Component.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const EventListener_1 = __webpack_require__(/*! @modules/EventListener */ "./build/modules/EventListener.js");

class Component {
  constructor(builder) {
    this.name = '';
    this.url = '';
    this.context = getContext();
    this.name = builder.name;
    this.url = builder.url;
    this.eventListener = new EventListener_1.default();
    this.observer = builder.observer && new builder.observer(this);
  }

  background() {}

  content() {}

  addListener(name, callback) {
    console.debug('Component: adding event listener for', name);
    this.eventListener.addListener(name, callback);
  }

  dispatchEvent(name, data) {
    console.debug('Component: dispatching event for', name);
    this.eventListener.dispatchEvent(name, {
      data: data
    });
  }

}

exports.default = Component;

function getContext() {
  const protocol = location.protocol;
  const context = protocol === 'chrome-extension:' ? 'background' : protocol === 'http:' || protocol === 'https:' ? 'content' : null;
  return context;
}

/***/ }),

/***/ "./build/modules/ComponentBuilder.js":
/*!*******************************************!*\
  !*** ./build/modules/ComponentBuilder.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class ComponentBuilder {
  constructor(component) {
    this.name = '';
    this.url = '';
    this.component = component;
  }

  addName(name) {
    if (!name) return this;
    this.name = name;
    return this;
  }

  addUrl(url) {
    if (!url) return this;
    this.url = url;
    return this;
  }

  addObserver(observer) {
    if (!observer) return this;
    this.observer = observer;
    return this;
  }

  build() {
    let component = new this.component(this); // Background script

    if (component.context == 'background') {
      component.background();
      component.messenger && component.messenger.connect();
    } // Content Script


    if (component.context == 'content') {
      component.content();
      component.observer && component.observer.watch();
      component.messenger && component.messenger.connect();
    }

    return component;
  }

}

exports.default = ComponentBuilder;

/***/ }),

/***/ "./build/modules/ElementObserver.js":
/*!******************************************!*\
  !*** ./build/modules/ElementObserver.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MutationEmitter = void 0;

const page_parser_tree_1 = __webpack_require__(/*! page-parser-tree */ "./node_modules/page-parser-tree/js/index.js");

const toValueObservable_1 = __webpack_require__(/*! live-set/toValueObservable */ "./node_modules/live-set/toValueObservable.js");

const EventListener_1 = __webpack_require__(/*! @modules/EventListener */ "./build/modules/EventListener.js");

class MutationEmitter {
  constructor() {
    this.elementAdded = new EventListener_1.default();
    this.elementRemoved = new EventListener_1.default();
  }

}

exports.MutationEmitter = MutationEmitter;

class ElementObserver {
  constructor(component, options) {
    this.page = new page_parser_tree_1.default(document, options || {
      tags: {},
      watchers: [],
      finders: {}
    });
    this.elementAdded = new EventListener_1.default();
    this.elementRemoved = new EventListener_1.default();
    this.onReady = new EventListener_1.default();
    this.component = component;
  }

  watch() {
    if (!window.location.href.includes(this.component.url)) return;

    const mutationEvent = (listener, tag, element) => {
      let event = {
        tag: tag,
        target: element,
        index: getElementIndex(element)
      };
      listener.dispatchEvent(tag, event); // TODO: send to all listeners for debugging or something
      // listener.dispatchEvent(event)
    };

    this.page.tree.getAll().forEach(nodes => {
      toValueObservable_1.default(nodes).subscribe(({
        value,
        removal
      }) => {
        let tag = value.getTag();
        let element = value.getValue();
        console.debug('ElementObserver: element added', tag);
        mutationEvent(this.elementAdded, tag, element);
        removal.then(() => {
          console.debug('ElementMonitor: element removed', tag);
          mutationEvent(this.elementRemoved, tag, element);
        });
      });
    });
  }

  subscribe(arg1) {
    let mutations = new MutationEmitter(); // TODO check for already added listeners

    this.elementAdded.addListener(arg1, event => {
      mutations.elementAdded.dispatchEvent(arg1, event);
    });
    this.elementRemoved.addListener(arg1, event => {
      mutations.elementRemoved.dispatchEvent(arg1, event);
    });
    return mutations;
  }

}

exports.default = ElementObserver;

function getElementIndex(element) {
  if (!element.parentElement) return -1;
  let nodes = Array.prototype.slice.call(element.parentElement.children);
  return nodes.indexOf(element);
}

/***/ }),

/***/ "./build/modules/EventListener.js":
/*!****************************************!*\
  !*** ./build/modules/EventListener.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class Listener {
  constructor(arg1, arg2) {
    let name = typeof arg1 == 'string' ? arg1 : null;
    let callback = typeof arg1 == 'function' ? arg1 : arg2;
    this.name = name;
    this.callback = callback;
  }

  find(arg1) {
    let name = typeof arg1 == 'string' ? arg1 : null;
    let callback = typeof arg1 == 'function' ? arg1 : null;
    return !name && this.callback.toString() === callback.toString() || this.name == name;
  }

}

class EventListener {
  constructor() {
    this.listeners = [];
  }

  addListener(arg1, arg2) {
    let name = typeof arg1 == 'string' ? arg1 : null;
    let callback = typeof arg1 == 'function' ? arg1 : arg2;
    console.assert(callback);

    const findListener = listener => {
      return !name && listener.find(callback) || listener.find(name);
    };

    if (this.listeners.some(findListener)) return;
    this.listeners.push(new Listener(name, callback));
  }

  removeListener(arg1, arg2) {
    let name = typeof arg1 == 'string' ? arg1 : null;
    let callback = typeof arg1 == 'function' ? arg1 : arg2;

    const findListener = listener => {
      // return listener.find(name) && listener.find(callback) ||
      //        listener.find(name) ||
      //        listener.find(callback)
      return !name && listener.find(callback) || listener.find(name);
    };

    this.listeners.filter(findListener).forEach(listener => {
      let listenerIndex = this.listeners.indexOf(listener);
      console.debug('Event [Debug]: removing listener', listener);
      this.listeners.splice(listenerIndex, 1);
    });
  }

  dispatchEvent(arg1, arg2) {
    let name = typeof arg1 == 'string' ? arg1 : null;
    let event = typeof arg1 == 'object' ? arg1 : arg2;

    const findListener = listener => {
      // return listener.find(name) || listener.name == null
      return name && listener.find(name) || listener.name == null;
    };

    if (this instanceof Listener) {
      return this.callback(event);
    }

    let listeners = this.listeners.filter(findListener);
    listeners.forEach(listener => listener.callback(event));
  }

}

exports.default = EventListener;

/***/ }),

/***/ "./build/scripts/content_script.js":
/*!*****************************************!*\
  !*** ./build/scripts/content_script.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const YoutubeHome_1 = __webpack_require__(/*! @components/youtube/YoutubeHome */ "./build/components/youtube/YoutubeHome.js");

const ComponentBuilder_1 = __webpack_require__(/*! @modules/ComponentBuilder */ "./build/modules/ComponentBuilder.js");

const youtubeHome = new ComponentBuilder_1.default(YoutubeHome_1.default).addName('youtube-home').addUrl('https://www.youtube.com').addObserver(YoutubeHome_1.YoutubeHomeObserver).build();

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/asap/browser-asap.js":
/*!*******************************************!*\
  !*** ./node_modules/asap/browser-asap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// rawAsap provides everything we need except exception management.
var rawAsap = __webpack_require__(/*! ./raw */ "./node_modules/asap/browser-raw.js");
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};


/***/ }),

/***/ "./node_modules/asap/browser-raw.js":
/*!******************************************!*\
  !*** ./node_modules/asap/browser-raw.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/live-set/Scheduler.js":
/*!********************************************!*\
  !*** ./node_modules/live-set/Scheduler.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _asap = _interopRequireDefault(__webpack_require__(/*! asap */ "./node_modules/asap/browser-asap.js"));

var CAPACITY = 1024;

var Scheduler =
/*#__PURE__*/
function () {
  function Scheduler() {
    (0, _classCallCheck2.default)(this, Scheduler);
    (0, _defineProperty2.default)(this, "_queue", []);
    (0, _defineProperty2.default)(this, "_isFlushing", false);
    (0, _defineProperty2.default)(this, "_index", 0);
  }

  (0, _createClass2.default)(Scheduler, [{
    key: "schedule",
    value: function schedule(cb) {
      var _this = this;

      this._queue.push(function () {
        try {
          cb();
        } catch (e) {
          setTimeout(function () {
            throw e;
          }, 0);
        }
      });

      if (this._queue.length === 1) {
        (0, _asap.default)(function () {
          _this.flush();
        });
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      // based on https://github.com/kriskowal/asap/blob/master/raw.js
      if (this._isFlushing) return;
      this._isFlushing = true;
      var queue = this._queue;

      while (this._index < queue.length) {
        var currentIndex = this._index;
        this._index += 1;
        queue[currentIndex].call();

        if (this._index > CAPACITY) {
          for (var scan = 0, newLength = queue.length - this._index; scan < newLength; scan++) {
            queue[scan] = queue[scan + this._index];
          }

          queue.length -= this._index;
          this._index = 0;
        }
      }

      queue.length = 0;
      this._index = 0;
      this._isFlushing = false;
    }
  }]);
  return Scheduler;
}();

exports.default = Scheduler;
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9TY2hlZHVsZXIuanMiXSwibmFtZXMiOlsiQ0FQQUNJVFkiLCJTY2hlZHVsZXIiLCJjYiIsIl9xdWV1ZSIsInB1c2giLCJlIiwic2V0VGltZW91dCIsImxlbmd0aCIsImZsdXNoIiwiX2lzRmx1c2hpbmciLCJxdWV1ZSIsIl9pbmRleCIsImN1cnJlbnRJbmRleCIsImNhbGwiLCJzY2FuIiwibmV3TGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFFQSxJQUFNQSxRQUFRLEdBQUcsSUFBakI7O0lBRXFCQyxTOzs7OztrREFDTyxFO3VEQUNILEs7a0RBQ04sQzs7Ozs7NkJBRVJDLEUsRUFBYztBQUFBOztBQUNyQixXQUFLQyxNQUFMLENBQVlDLElBQVosQ0FBaUIsWUFBTTtBQUNyQixZQUFJO0FBQ0ZGLFVBQUFBLEVBQUU7QUFDSCxTQUZELENBRUUsT0FBT0csQ0FBUCxFQUFVO0FBQ1ZDLFVBQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2Ysa0JBQU1ELENBQU47QUFDRCxXQUZTLEVBRVAsQ0FGTyxDQUFWO0FBR0Q7QUFDRixPQVJEOztBQVNBLFVBQUksS0FBS0YsTUFBTCxDQUFZSSxNQUFaLEtBQXVCLENBQTNCLEVBQThCO0FBQzVCLDJCQUFLLFlBQU07QUFDVCxVQUFBLEtBQUksQ0FBQ0MsS0FBTDtBQUNELFNBRkQ7QUFHRDtBQUNGOzs7NEJBRU87QUFDTjtBQUNBLFVBQUksS0FBS0MsV0FBVCxFQUFzQjtBQUN0QixXQUFLQSxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBTUMsS0FBSyxHQUFHLEtBQUtQLE1BQW5COztBQUNBLGFBQU8sS0FBS1EsTUFBTCxHQUFjRCxLQUFLLENBQUNILE1BQTNCLEVBQW1DO0FBQ2pDLFlBQU1LLFlBQVksR0FBRyxLQUFLRCxNQUExQjtBQUNBLGFBQUtBLE1BQUwsSUFBZSxDQUFmO0FBQ0FELFFBQUFBLEtBQUssQ0FBQ0UsWUFBRCxDQUFMLENBQW9CQyxJQUFwQjs7QUFDQSxZQUFJLEtBQUtGLE1BQUwsR0FBY1gsUUFBbEIsRUFBNEI7QUFDMUIsZUFBSyxJQUFJYyxJQUFJLEdBQUcsQ0FBWCxFQUFjQyxTQUFTLEdBQUdMLEtBQUssQ0FBQ0gsTUFBTixHQUFlLEtBQUtJLE1BQW5ELEVBQTJERyxJQUFJLEdBQUdDLFNBQWxFLEVBQTZFRCxJQUFJLEVBQWpGLEVBQXFGO0FBQ25GSixZQUFBQSxLQUFLLENBQUNJLElBQUQsQ0FBTCxHQUFjSixLQUFLLENBQUNJLElBQUksR0FBRyxLQUFLSCxNQUFiLENBQW5CO0FBQ0Q7O0FBQ0RELFVBQUFBLEtBQUssQ0FBQ0gsTUFBTixJQUFnQixLQUFLSSxNQUFyQjtBQUNBLGVBQUtBLE1BQUwsR0FBYyxDQUFkO0FBQ0Q7QUFDRjs7QUFDREQsTUFBQUEsS0FBSyxDQUFDSCxNQUFOLEdBQWUsQ0FBZjtBQUNBLFdBQUtJLE1BQUwsR0FBYyxDQUFkO0FBQ0EsV0FBS0YsV0FBTCxHQUFtQixLQUFuQjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IGFzYXAgZnJvbSAnYXNhcCc7XG5cbmNvbnN0IENBUEFDSVRZID0gMTAyNDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NoZWR1bGVyIHtcbiAgX3F1ZXVlOiBBcnJheTwoKT0+dm9pZD4gPSBbXTtcbiAgX2lzRmx1c2hpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2luZGV4OiBudW1iZXIgPSAwO1xuXG4gIHNjaGVkdWxlKGNiOiAoKT0+dm9pZCkge1xuICAgIHRoaXMuX3F1ZXVlLnB1c2goKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2IoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuX3F1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgYXNhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZsdXNoKCkge1xuICAgIC8vIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvYXNhcC9ibG9iL21hc3Rlci9yYXcuanNcbiAgICBpZiAodGhpcy5faXNGbHVzaGluZykgcmV0dXJuO1xuICAgIHRoaXMuX2lzRmx1c2hpbmcgPSB0cnVlO1xuICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5fcXVldWU7XG4gICAgd2hpbGUgKHRoaXMuX2luZGV4IDwgcXVldWUubGVuZ3RoKSB7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSB0aGlzLl9pbmRleDtcbiAgICAgIHRoaXMuX2luZGV4ICs9IDE7XG4gICAgICBxdWV1ZVtjdXJyZW50SW5kZXhdLmNhbGwoKTtcbiAgICAgIGlmICh0aGlzLl9pbmRleCA+IENBUEFDSVRZKSB7XG4gICAgICAgIGZvciAobGV0IHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSB0aGlzLl9pbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgcXVldWVbc2Nhbl0gPSBxdWV1ZVtzY2FuICsgdGhpcy5faW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXVlLmxlbmd0aCAtPSB0aGlzLl9pbmRleDtcbiAgICAgICAgdGhpcy5faW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICB0aGlzLl9pc0ZsdXNoaW5nID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "./node_modules/live-set/filter.js":
/*!*****************************************!*\
  !*** ./node_modules/live-set/filter.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _ = _interopRequireDefault(__webpack_require__(/*! . */ "./node_modules/live-set/index.js"));

/* eslint-disable no-unused-vars, no-redeclare */

/*:: export default filter; */

/*:: ` */
function filter(liveSet, cb) {
  return new _.default({
    scheduler: liveSet.getScheduler(),
    read: function read() {
      var ret = new Set();
      liveSet.values().forEach(function (value) {
        if (cb(value)) {
          ret.add(value);
        }
      });
      return ret;
    },
    listen: function listen(setValues, controller) {
      var passedFilter = new Set();
      var sub = liveSet.subscribe({
        start: function start() {
          var initialValues = new Set();
          liveSet.values().forEach(function (value) {
            if (cb(value)) {
              passedFilter.add(value);
              initialValues.add(value);
            }
          });
          setValues(initialValues);
        },
        next: function next(changes) {
          changes.forEach(function (change) {
            if (change.type === 'add') {
              if (cb(change.value)) {
                passedFilter.add(change.value);
                controller.add(change.value);
              }
            } else if (change.type === 'remove') {
              if (passedFilter.has(change.value)) {
                passedFilter.delete(change.value);
                controller.remove(change.value);
              }
            }
          });
        },
        error: function error(err) {
          controller.error(err);
        },
        complete: function complete() {
          controller.end();
        }
      });
      return sub;
    }
  });
}
/*:: ` */


module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9maWx0ZXIuanMiXSwibmFtZXMiOlsiZmlsdGVyIiwibGl2ZVNldCIsImNiIiwiTGl2ZVNldCIsInNjaGVkdWxlciIsImdldFNjaGVkdWxlciIsInJlYWQiLCJyZXQiLCJTZXQiLCJ2YWx1ZXMiLCJmb3JFYWNoIiwidmFsdWUiLCJhZGQiLCJsaXN0ZW4iLCJzZXRWYWx1ZXMiLCJjb250cm9sbGVyIiwicGFzc2VkRmlsdGVyIiwic3ViIiwic3Vic2NyaWJlIiwic3RhcnQiLCJpbml0aWFsVmFsdWVzIiwibmV4dCIsImNoYW5nZXMiLCJjaGFuZ2UiLCJ0eXBlIiwiaGFzIiwiZGVsZXRlIiwicmVtb3ZlIiwiZXJyb3IiLCJlcnIiLCJjb21wbGV0ZSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0E7O0FBRkE7O0FBT0E7O0FBRUE7QUFDZSxTQUFTQSxNQUFULENBQW1CQyxPQUFuQixFQUF3Q0MsRUFBeEMsRUFBMkU7QUFDeEYsU0FBTyxJQUFJQyxTQUFKLENBQVk7QUFDakJDLElBQUFBLFNBQVMsRUFBRUgsT0FBTyxDQUFDSSxZQUFSLEVBRE07QUFFakJDLElBQUFBLElBRmlCLGtCQUVWO0FBQ0wsVUFBTUMsR0FBRyxHQUFHLElBQUlDLEdBQUosRUFBWjtBQUNBUCxNQUFBQSxPQUFPLENBQUNRLE1BQVIsR0FBaUJDLE9BQWpCLENBQXlCLFVBQUFDLEtBQUssRUFBSTtBQUNoQyxZQUFJVCxFQUFFLENBQUNTLEtBQUQsQ0FBTixFQUFlO0FBQ2JKLFVBQUFBLEdBQUcsQ0FBQ0ssR0FBSixDQUFRRCxLQUFSO0FBQ0Q7QUFDRixPQUpEO0FBS0EsYUFBT0osR0FBUDtBQUNELEtBVmdCO0FBV2pCTSxJQUFBQSxNQVhpQixrQkFXVkMsU0FYVSxFQVdDQyxVQVhELEVBV2E7QUFDNUIsVUFBTUMsWUFBWSxHQUFHLElBQUlSLEdBQUosRUFBckI7QUFFQSxVQUFNUyxHQUFHLEdBQUdoQixPQUFPLENBQUNpQixTQUFSLENBQWtCO0FBQzVCQyxRQUFBQSxLQUQ0QixtQkFDcEI7QUFDTixjQUFNQyxhQUFhLEdBQUcsSUFBSVosR0FBSixFQUF0QjtBQUNBUCxVQUFBQSxPQUFPLENBQUNRLE1BQVIsR0FBaUJDLE9BQWpCLENBQXlCLFVBQUFDLEtBQUssRUFBSTtBQUNoQyxnQkFBSVQsRUFBRSxDQUFDUyxLQUFELENBQU4sRUFBZTtBQUNiSyxjQUFBQSxZQUFZLENBQUNKLEdBQWIsQ0FBaUJELEtBQWpCO0FBQ0FTLGNBQUFBLGFBQWEsQ0FBQ1IsR0FBZCxDQUFrQkQsS0FBbEI7QUFDRDtBQUNGLFdBTEQ7QUFNQUcsVUFBQUEsU0FBUyxDQUFDTSxhQUFELENBQVQ7QUFDRCxTQVYyQjtBQVc1QkMsUUFBQUEsSUFYNEIsZ0JBV3ZCQyxPQVh1QixFQVdkO0FBQ1pBLFVBQUFBLE9BQU8sQ0FBQ1osT0FBUixDQUFnQixVQUFBYSxNQUFNLEVBQUk7QUFDeEIsZ0JBQUlBLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixLQUFwQixFQUEyQjtBQUN6QixrQkFBSXRCLEVBQUUsQ0FBQ3FCLE1BQU0sQ0FBQ1osS0FBUixDQUFOLEVBQXNCO0FBQ3BCSyxnQkFBQUEsWUFBWSxDQUFDSixHQUFiLENBQWlCVyxNQUFNLENBQUNaLEtBQXhCO0FBQ0FJLGdCQUFBQSxVQUFVLENBQUNILEdBQVgsQ0FBZVcsTUFBTSxDQUFDWixLQUF0QjtBQUNEO0FBQ0YsYUFMRCxNQUtPLElBQUlZLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUNuQyxrQkFBSVIsWUFBWSxDQUFDUyxHQUFiLENBQWlCRixNQUFNLENBQUNaLEtBQXhCLENBQUosRUFBb0M7QUFDbENLLGdCQUFBQSxZQUFZLENBQUNVLE1BQWIsQ0FBb0JILE1BQU0sQ0FBQ1osS0FBM0I7QUFDQUksZ0JBQUFBLFVBQVUsQ0FBQ1ksTUFBWCxDQUFrQkosTUFBTSxDQUFDWixLQUF6QjtBQUNEO0FBQ0Y7QUFDRixXQVpEO0FBYUQsU0F6QjJCO0FBMEI1QmlCLFFBQUFBLEtBMUI0QixpQkEwQnRCQyxHQTFCc0IsRUEwQmpCO0FBQ1RkLFVBQUFBLFVBQVUsQ0FBQ2EsS0FBWCxDQUFpQkMsR0FBakI7QUFDRCxTQTVCMkI7QUE2QjVCQyxRQUFBQSxRQTdCNEIsc0JBNkJqQjtBQUNUZixVQUFBQSxVQUFVLENBQUNnQixHQUFYO0FBQ0Q7QUEvQjJCLE9BQWxCLENBQVo7QUFrQ0EsYUFBT2QsR0FBUDtBQUNEO0FBakRnQixHQUFaLENBQVA7QUFtREQ7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycywgbm8tcmVkZWNsYXJlICovXG5cbmltcG9ydCBMaXZlU2V0IGZyb20gJy4nO1xuXG5kZWNsYXJlIGZ1bmN0aW9uIGZpbHRlcjxUPihsaXZlU2V0OiBMaXZlU2V0PFQ+LCBjYjogdHlwZW9mIEJvb2xlYW4pOiBMaXZlU2V0PCROb25NYXliZVR5cGU8VD4+O1xuZGVjbGFyZSBmdW5jdGlvbiBmaWx0ZXI8VD4obGl2ZVNldDogTGl2ZVNldDxUPiwgY2I6ICh2YWx1ZTogVCkgPT4gYW55KTogTGl2ZVNldDxUPjtcblxuLyo6OiBleHBvcnQgZGVmYXVsdCBmaWx0ZXI7ICovXG5cbi8qOjogYCAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmlsdGVyPFQ+KGxpdmVTZXQ6IExpdmVTZXQ8VD4sIGNiOiAodmFsdWU6IFQpID0+IGFueSk6IExpdmVTZXQ8VD4ge1xuICByZXR1cm4gbmV3IExpdmVTZXQoe1xuICAgIHNjaGVkdWxlcjogbGl2ZVNldC5nZXRTY2hlZHVsZXIoKSxcbiAgICByZWFkKCkge1xuICAgICAgY29uc3QgcmV0ID0gbmV3IFNldCgpO1xuICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgaWYgKGNiKHZhbHVlKSkge1xuICAgICAgICAgIHJldC5hZGQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbiAgICBsaXN0ZW4oc2V0VmFsdWVzLCBjb250cm9sbGVyKSB7XG4gICAgICBjb25zdCBwYXNzZWRGaWx0ZXIgPSBuZXcgU2V0KCk7XG5cbiAgICAgIGNvbnN0IHN1YiA9IGxpdmVTZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBsaXZlU2V0LnZhbHVlcygpLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKGNiKHZhbHVlKSkge1xuICAgICAgICAgICAgICBwYXNzZWRGaWx0ZXIuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlcy5hZGQodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldFZhbHVlcyhpbml0aWFsVmFsdWVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dChjaGFuZ2VzKSB7XG4gICAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGNoYW5nZSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgIGlmIChjYihjaGFuZ2UudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcGFzc2VkRmlsdGVyLmFkZChjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWRkKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlLnR5cGUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgIGlmIChwYXNzZWRGaWx0ZXIuaGFzKGNoYW5nZS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBwYXNzZWRGaWx0ZXIuZGVsZXRlKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgICBjb250cm9sbGVyLmVycm9yKGVycik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gc3ViO1xuICAgIH1cbiAgfSk7XG59XG4vKjo6IGAgKi9cbiJdfQ==

/***/ }),

/***/ "./node_modules/live-set/flatMapR.js":
/*!*******************************************!*\
  !*** ./node_modules/live-set/flatMapR.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flatMapR;

var _ = _interopRequireDefault(__webpack_require__(/*! . */ "./node_modules/live-set/index.js"));

function flatMapR(liveSet, cb) {
  var isReading = false;
  return new _.default({
    scheduler: liveSet.getScheduler(),
    read: function read() {
      if (isReading) {
        throw new Error('reading inactive recursively-flatMapped stream is not supported');
      }

      isReading = true;
      var s = new Set();
      liveSet.values().forEach(function (value) {
        var childSet = cb(value);
        childSet.values().forEach(function (value) {
          s.add(value);
        });
      });
      isReading = false;
      return s;
    },
    listen: function listen(setValues, controller) {
      var mainSubCompleted = false;
      var hasSubscribedToChildren = false;
      var nextHasFired = false;
      var childSetSubs = new Map();

      function childSetSubscribe(childSet) {
        if (childSet.isEnded()) {
          // optimization
          childSet.values().forEach(function (value) {
            controller.add(value);
          });
        } else {
          childSet.subscribe({
            start: function start(sub) {
              childSetSubs.set(childSet, sub);
              childSet.values().forEach(function (value) {
                controller.add(value);
              });
            },
            next: function next(changes) {
              nextHasFired = true;
              changes.forEach(function (change) {
                if (change.type === 'add') {
                  controller.add(change.value);
                } else if (change.type === 'remove') {
                  controller.remove(change.value);
                }
              });
            },
            error: function error(err) {
              controller.error(err);
            },
            complete: function complete() {
              childSetSubs.delete(childSet);

              if (mainSubCompleted && childSetSubs.size === 0) {
                controller.end();
              }
            }
          });
        }
      }

      setValues(new Set());
      var childSets = new Map();
      var mainSub = liveSet.subscribe({
        start: function start() {
          liveSet.values().forEach(function (value) {
            var childSet = cb(value);
            childSets.set(value, childSet);
            childSetSubscribe(childSet);
          });
          hasSubscribedToChildren = true;
        },
        next: function next(changes) {
          nextHasFired = true;
          changes.forEach(function (change) {
            if (change.type === 'add') {
              var childSet = cb(change.value);
              childSets.set(change.value, childSet);
              childSetSubscribe(childSet);
            } else if (change.type === 'remove') {
              var _childSet = childSets.get(change.value);

              if (!_childSet) throw new Error('removed value not in liveset');

              _childSet.values().forEach(function (value) {
                controller.remove(value);
              });

              childSets.delete(change.value);
              var childSetSub = childSetSubs.get(_childSet);

              if (childSetSub) {
                // We won't have the subscription if the childSet ended already
                childSetSub.unsubscribe();
                childSetSubs.delete(_childSet);
              }
            }
          });
        },
        error: function error(err) {
          controller.error(err);
        },
        complete: function complete() {
          mainSubCompleted = true;

          if (hasSubscribedToChildren && childSetSubs.size === 0) {
            controller.end();
          }
        }
      });
      var isPullingChanges = false;
      return {
        unsubscribe: function unsubscribe() {
          mainSub.unsubscribe();
          childSetSubs.forEach(function (sub) {
            sub.unsubscribe();
          });
          childSets.clear();
          childSetSubs.clear();
        },
        pullChanges: function pullChanges() {
          if (isPullingChanges) return;
          isPullingChanges = true;

          do {
            nextHasFired = false;
            mainSub.pullChanges();
            childSetSubs.forEach(function (sub) {
              sub.pullChanges();
            });
          } while (nextHasFired);

          isPullingChanges = false;
        }
      };
    }
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9mbGF0TWFwUi5qcyJdLCJuYW1lcyI6WyJmbGF0TWFwUiIsImxpdmVTZXQiLCJjYiIsImlzUmVhZGluZyIsIkxpdmVTZXQiLCJzY2hlZHVsZXIiLCJnZXRTY2hlZHVsZXIiLCJyZWFkIiwiRXJyb3IiLCJzIiwiU2V0IiwidmFsdWVzIiwiZm9yRWFjaCIsInZhbHVlIiwiY2hpbGRTZXQiLCJhZGQiLCJsaXN0ZW4iLCJzZXRWYWx1ZXMiLCJjb250cm9sbGVyIiwibWFpblN1YkNvbXBsZXRlZCIsImhhc1N1YnNjcmliZWRUb0NoaWxkcmVuIiwibmV4dEhhc0ZpcmVkIiwiY2hpbGRTZXRTdWJzIiwiTWFwIiwiY2hpbGRTZXRTdWJzY3JpYmUiLCJpc0VuZGVkIiwic3Vic2NyaWJlIiwic3RhcnQiLCJzdWIiLCJzZXQiLCJuZXh0IiwiY2hhbmdlcyIsImNoYW5nZSIsInR5cGUiLCJyZW1vdmUiLCJlcnJvciIsImVyciIsImNvbXBsZXRlIiwiZGVsZXRlIiwic2l6ZSIsImVuZCIsImNoaWxkU2V0cyIsIm1haW5TdWIiLCJnZXQiLCJjaGlsZFNldFN1YiIsInVuc3Vic2NyaWJlIiwiaXNQdWxsaW5nQ2hhbmdlcyIsImNsZWFyIiwicHVsbENoYW5nZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOztBQUdlLFNBQVNBLFFBQVQsQ0FBdUJDLE9BQXZCLEVBQTRDQyxFQUE1QyxFQUFzRjtBQUNuRyxNQUFJQyxTQUFTLEdBQUcsS0FBaEI7QUFFQSxTQUFPLElBQUlDLFNBQUosQ0FBWTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFSixPQUFPLENBQUNLLFlBQVIsRUFETTtBQUVqQkMsSUFBQUEsSUFGaUIsa0JBRVY7QUFDTCxVQUFJSixTQUFKLEVBQWU7QUFDYixjQUFNLElBQUlLLEtBQUosQ0FBVSxpRUFBVixDQUFOO0FBQ0Q7O0FBQ0RMLE1BQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0EsVUFBTU0sQ0FBQyxHQUFHLElBQUlDLEdBQUosRUFBVjtBQUNBVCxNQUFBQSxP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QUFBLEdBQUcsQ0FBQ29CLFdBQUo7QUFDRCxhQUZEO0FBR0QsV0FORCxRQU1TM0IsWUFOVDs7QUFRQXlCLFVBQUFBLGdCQUFnQixHQUFHLEtBQW5CO0FBQ0Q7QUF0QkksT0FBUDtBQXdCRDtBQWxJZ0IsR0FBWixDQUFQO0FBb0lEIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IExpdmVTZXQgZnJvbSAnLic7XG5pbXBvcnQgdHlwZSB7TGl2ZVNldFN1YnNjcmlwdGlvbn0gZnJvbSAnLic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZsYXRNYXBSPFQsVT4obGl2ZVNldDogTGl2ZVNldDxUPiwgY2I6ICh2YWx1ZTogVCkgPT4gTGl2ZVNldDxVPik6IExpdmVTZXQ8VT4ge1xuICBsZXQgaXNSZWFkaW5nID0gZmFsc2U7XG5cbiAgcmV0dXJuIG5ldyBMaXZlU2V0KHtcbiAgICBzY2hlZHVsZXI6IGxpdmVTZXQuZ2V0U2NoZWR1bGVyKCksXG4gICAgcmVhZCgpIHtcbiAgICAgIGlmIChpc1JlYWRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWFkaW5nIGluYWN0aXZlIHJlY3Vyc2l2ZWx5LWZsYXRNYXBwZWQgc3RyZWFtIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgIH1cbiAgICAgIGlzUmVhZGluZyA9IHRydWU7XG4gICAgICBjb25zdCBzID0gbmV3IFNldCgpO1xuICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGRTZXQgPSBjYih2YWx1ZSk7XG4gICAgICAgIGNoaWxkU2V0LnZhbHVlcygpLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgIHMuYWRkKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGlzUmVhZGluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHM7XG4gICAgfSxcbiAgICBsaXN0ZW4oc2V0VmFsdWVzLCBjb250cm9sbGVyKSB7XG4gICAgICBsZXQgbWFpblN1YkNvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgbGV0IGhhc1N1YnNjcmliZWRUb0NoaWxkcmVuID0gZmFsc2U7XG4gICAgICBsZXQgbmV4dEhhc0ZpcmVkID0gZmFsc2U7XG4gICAgICBjb25zdCBjaGlsZFNldFN1YnM6IE1hcDxMaXZlU2V0PFU+LCBMaXZlU2V0U3Vic2NyaXB0aW9uPiA9IG5ldyBNYXAoKTtcblxuICAgICAgZnVuY3Rpb24gY2hpbGRTZXRTdWJzY3JpYmUoY2hpbGRTZXQ6IExpdmVTZXQ8VT4pIHtcbiAgICAgICAgaWYgKGNoaWxkU2V0LmlzRW5kZWQoKSkgeyAvLyBvcHRpbWl6YXRpb25cbiAgICAgICAgICBjaGlsZFNldC52YWx1ZXMoKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuYWRkKHZhbHVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaGlsZFNldC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgc3RhcnQoc3ViKSB7XG4gICAgICAgICAgICAgIGNoaWxkU2V0U3Vicy5zZXQoY2hpbGRTZXQsIHN1Yik7XG4gICAgICAgICAgICAgIGNoaWxkU2V0LnZhbHVlcygpLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWRkKHZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dChjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgIG5leHRIYXNGaXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWRkKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICBjaGlsZFNldFN1YnMuZGVsZXRlKGNoaWxkU2V0KTtcbiAgICAgICAgICAgICAgaWYgKG1haW5TdWJDb21wbGV0ZWQgJiYgY2hpbGRTZXRTdWJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVuZCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc2V0VmFsdWVzKG5ldyBTZXQoKSk7XG4gICAgICBjb25zdCBjaGlsZFNldHM6IE1hcDxULCBMaXZlU2V0PFU+PiA9IG5ldyBNYXAoKTtcblxuICAgICAgY29uc3QgbWFpblN1YiA9IGxpdmVTZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgc3RhcnQoKSB7XG4gICAgICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkU2V0ID0gY2IodmFsdWUpO1xuICAgICAgICAgICAgY2hpbGRTZXRzLnNldCh2YWx1ZSwgY2hpbGRTZXQpO1xuICAgICAgICAgICAgY2hpbGRTZXRTdWJzY3JpYmUoY2hpbGRTZXQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGhhc1N1YnNjcmliZWRUb0NoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dChjaGFuZ2VzKSB7XG4gICAgICAgICAgbmV4dEhhc0ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICBjaGFuZ2VzLmZvckVhY2goY2hhbmdlID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2hpbGRTZXQgPSBjYihjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICBjaGlsZFNldHMuc2V0KGNoYW5nZS52YWx1ZSwgY2hpbGRTZXQpO1xuICAgICAgICAgICAgICBjaGlsZFNldFN1YnNjcmliZShjaGlsZFNldCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZS50eXBlID09PSAncmVtb3ZlJykge1xuICAgICAgICAgICAgICBjb25zdCBjaGlsZFNldCA9IGNoaWxkU2V0cy5nZXQoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKCFjaGlsZFNldCkgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVkIHZhbHVlIG5vdCBpbiBsaXZlc2V0Jyk7XG4gICAgICAgICAgICAgIGNoaWxkU2V0LnZhbHVlcygpLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGNoaWxkU2V0cy5kZWxldGUoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgY29uc3QgY2hpbGRTZXRTdWIgPSBjaGlsZFNldFN1YnMuZ2V0KGNoaWxkU2V0KTtcbiAgICAgICAgICAgICAgaWYgKGNoaWxkU2V0U3ViKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugd29uJ3QgaGF2ZSB0aGUgc3Vic2NyaXB0aW9uIGlmIHRoZSBjaGlsZFNldCBlbmRlZCBhbHJlYWR5XG4gICAgICAgICAgICAgICAgY2hpbGRTZXRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBjaGlsZFNldFN1YnMuZGVsZXRlKGNoaWxkU2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgICBjb250cm9sbGVyLmVycm9yKGVycik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgIG1haW5TdWJDb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgIGlmIChoYXNTdWJzY3JpYmVkVG9DaGlsZHJlbiAmJiBjaGlsZFNldFN1YnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBsZXQgaXNQdWxsaW5nQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgbWFpblN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIGNoaWxkU2V0U3Vicy5mb3JFYWNoKHN1YiA9PiB7XG4gICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjaGlsZFNldHMuY2xlYXIoKTtcbiAgICAgICAgICBjaGlsZFNldFN1YnMuY2xlYXIoKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHVsbENoYW5nZXMoKSB7XG4gICAgICAgICAgaWYgKGlzUHVsbGluZ0NoYW5nZXMpIHJldHVybjtcbiAgICAgICAgICBpc1B1bGxpbmdDaGFuZ2VzID0gdHJ1ZTtcblxuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIG5leHRIYXNGaXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbWFpblN1Yi5wdWxsQ2hhbmdlcygpO1xuICAgICAgICAgICAgY2hpbGRTZXRTdWJzLmZvckVhY2goc3ViID0+IHtcbiAgICAgICAgICAgICAgc3ViLnB1bGxDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IHdoaWxlIChuZXh0SGFzRmlyZWQpO1xuXG4gICAgICAgICAgaXNQdWxsaW5nQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG4iXX0=

/***/ }),

/***/ "./node_modules/live-set/index.js":
/*!****************************************!*\
  !*** ./node_modules/live-set/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _Scheduler = _interopRequireDefault(__webpack_require__(/*! ./Scheduler */ "./node_modules/live-set/Scheduler.js"));

var _symbolObservable = _interopRequireDefault(__webpack_require__(/*! symbol-observable */ "./node_modules/symbol-observable/es/index.js"));

var LiveSet =
/*#__PURE__*/
function () {
  // Whether we can mutate the _values Set.
  function LiveSet(init) {
    (0, _classCallCheck2.default)(this, LiveSet);
    (0, _defineProperty2.default)(this, "_init", void 0);
    (0, _defineProperty2.default)(this, "_scheduler", void 0);
    (0, _defineProperty2.default)(this, "_values", null);
    (0, _defineProperty2.default)(this, "_mutableValues", false);
    (0, _defineProperty2.default)(this, "_active", null);
    (0, _defineProperty2.default)(this, "_inSubscriptionStart", false);
    (0, _defineProperty2.default)(this, "_ended", false);
    (0, _defineProperty2.default)(this, "_endedWithError", false);
    (0, _defineProperty2.default)(this, "_error", null);
    (0, _defineProperty2.default)(this, "_queuedCall", false);
    (0, _defineProperty2.default)(this, "_changeQueue", []);
    (0, _defineProperty2.default)(this, "_observers", []);
    this._init = init;
    this._scheduler = init.scheduler || LiveSet.defaultScheduler;
  }

  (0, _createClass2.default)(LiveSet, [{
    key: "_queueChange",
    value: function _queueChange(record) {
      var _this = this;

      if (record) {
        this._changeQueue.push(record);
      }

      if (!this._queuedCall) {
        this._queuedCall = true;

        this._scheduler.schedule(function () {
          _this._queuedCall = false;
          var changes = _this._changeQueue;
          _this._changeQueue = [];
          var observersToCall;
          var ended = _this._ended;

          if (ended) {
            observersToCall = _this._observers;
            _this._observers = [];
          } else {
            observersToCall = _this._observers.slice();
          }

          observersToCall.forEach(function (record) {
            var observer = record.observer,
                ignore = record.ignore;
            var observerNext = observer.next;

            if (observerNext) {
              if (ignore === 0) {
                observerNext.call(observer, changes);
              } else {
                record.ignore = 0;
                var changesToDeliver = changes.slice(ignore);

                if (changesToDeliver.length) {
                  observerNext.call(observer, changesToDeliver);
                }
              }
            }

            if (ended) {
              if (_this._endedWithError) {
                if (observer.error) observer.error(_this._error);
              } else {
                if (observer.complete) observer.complete();
              }
            }
          });
        });
      }
    }
  }, {
    key: "_deactivate",
    value: function _deactivate() {
      if (!this._active) throw new Error('already inactive');
      var listenHandler = this._active.listenHandler;
      this._active = null;

      if (listenHandler) {
        listenHandler.unsubscribe();
      }
    }
  }, {
    key: "values",
    value: function values() {
      if (this._values) {
        if (this._active && !this._inSubscriptionStart) {
          var listenHandler = this._active.listenHandler;

          if (listenHandler.pullChanges) {
            listenHandler.pullChanges();
          }
        }

        if (this._mutableValues) {
          this._mutableValues = false;
          makeSetImmutable(this._values);
        }
        /*:: if (!this._values) throw new Error(); */


        return this._values;
      } else {
        if (this._active) {
          throw new Error('tried to call values() on liveset during subscription before setValues was called');
        }

        var s = this._init.read();

        makeSetImmutable(s);
        return s;
      }
    }
  }, {
    key: "isEnded",
    value: function isEnded() {
      return this._ended;
    }
  }, {
    key: "getScheduler",
    value: function getScheduler() {
      return this._scheduler;
    }
  }, {
    key: "subscribe",
    value: function subscribe(observerOrOnNext, onError, onComplete) {
      var _this2 = this;

      var liveSet = this;
      var observer;

      if (typeof observerOrOnNext === 'function') {
        observer = {
          next: observerOrOnNext,
          error: onError,
          complete: onComplete
        };
      } else {
        observer = observerOrOnNext;
      }

      observer;

      if (this._ended) {
        var _subscription = {
          closed: false,
          unsubscribe: function unsubscribe() {
            _subscription.closed = true;
          },
          pullChanges: function pullChanges() {}
        };

        if (observer.start) {
          observer.start(_subscription);
        }

        if (!_subscription.closed) {
          if (this._endedWithError) {
            if (observer.error) {
              observer.error(this._error);
            }
          } else {
            if (observer.complete) {
              observer.complete();
            }
          }
        }

        _subscription.closed = true;
        return _subscription;
      }

      var observerRecord = {
        observer: observer,
        ignore: this._changeQueue.length
      };
      var isStarting = true;
      var unsubscribedInStart = false;
      var subscription = {
        /*:: closed: false&&` */
        get closed() {
          return !isStarting && liveSet._observers.indexOf(observerRecord) < 0;
        }
        /*:: ` */
        ,

        unsubscribe: function unsubscribe() {
          if (isStarting) {
            unsubscribedInStart = true;
            return;
          }

          var ix = _this2._observers.indexOf(observerRecord);

          if (ix >= 0) {
            _this2._observers.splice(ix, 1);

            if (!_this2._ended && _this2._observers.length === 0) {
              _this2._values = null;

              _this2._deactivate();
            }
          }
        },
        pullChanges: function pullChanges() {
          if (_this2._active && _this2._active.listenHandler && _this2._active.listenHandler.pullChanges) {
            _this2._active.listenHandler.pullChanges();
          }

          var changeQueueLength = _this2._changeQueue.length;
          var originalNext = observer.next;

          if (changeQueueLength !== 0 && originalNext) {
            var changesToDeliver = _this2._changeQueue.slice(observerRecord.ignore);

            if (changesToDeliver.length !== 0) {
              observerRecord.ignore = changeQueueLength;
              originalNext.call(observer, changesToDeliver);
            }
          }
        }
      };

      if (!this._active) {
        var _controller2 = {
          // Flow doesn't support getters and setters yet

          /*:: closed: false&&` */
          get closed() {
            return !liveSet._active || liveSet._active.controller !== this;
          }
          /*:: ` */
          ,

          add: function add(value) {
            var values = _this2._values;
            if (!values) throw new Error('setValue must be called before controller is used');

            if (!_this2._ended && !values.has(value)) {
              if (!_this2._mutableValues) {
                _this2._values = values = new Set(values);
                _this2._mutableValues = true;
              }

              values.add(value);

              _this2._queueChange({
                type: 'add',
                value: value
              });
            }
          },
          remove: function remove(value) {
            var values = _this2._values;
            if (!values) throw new Error('setValue must be called before controller is used');

            if (!_this2._ended && values.has(value)) {
              if (!_this2._mutableValues) {
                _this2._values = values = new Set(values);
                _this2._mutableValues = true;
              }

              values.delete(value);

              _this2._queueChange({
                type: 'remove',
                value: value
              });
            }
          },
          error: function error(err) {
            if (_this2._ended) return;
            _this2._ended = true;
            _this2._endedWithError = true;
            _this2._error = err;

            _this2._queueChange();

            _this2._deactivate();
          },
          end: function end() {
            if (_this2._ended) return;
            _this2._ended = true;

            _this2._queueChange();

            _this2._deactivate();
          }
        };
        var active = this._active = {
          controller: _controller2,
          listenHandler: {
            unsubscribe: function unsubscribe() {}
          }
        };

        var setValuesError = function setValuesError() {
          throw new Error('setValues must be called once during listen');
        };

        var _setValues2 = function _setValues(values) {
          _setValues2 = setValuesError;
          makeSetImmutable(values);
          _this2._values = values;
          _this2._mutableValues = false;
        };

        var listenHandlerOrFunction = this._init.listen(function (values) {
          return _setValues2(values);
        }, _controller2);

        if (!this._values) {
          setValuesError();
        }

        if (typeof listenHandlerOrFunction === 'function') {
          active.listenHandler = {
            unsubscribe: listenHandlerOrFunction
          };
        } else if (listenHandlerOrFunction != null && typeof listenHandlerOrFunction.unsubscribe === 'function') {
          active.listenHandler = listenHandlerOrFunction;
        } else if (listenHandlerOrFunction != null) {
          throw new TypeError('listen must return object with unsubscribe method, a function, or null');
        }

        if (_controller2.closed) {
          this._active = active;

          this._deactivate();
        }
      }

      if (observer.start) {
        this._inSubscriptionStart = true;
        observer.start(subscription);
        this._inSubscriptionStart = false;
      }

      isStarting = false;
      observerRecord.ignore = this._changeQueue.length;

      if (!unsubscribedInStart) {
        this._observers.push(observerRecord);
      }

      return subscription;
    }
  }], [{
    key: "active",
    value: function active(initialValues, options) {
      var set = initialValues || new Set();
      var controller;
      var liveSet = new LiveSet({
        scheduler: options ? options.scheduler : undefined,
        read: function read() {
          return set;
        },
        listen: function listen(setValues, _controller) {
          setValues(set);
          controller = _controller;
        }
      });
      liveSet.subscribe({});
      return {
        liveSet: liveSet,
        controller: controller
      };
    }
  }, {
    key: "constant",
    value: function constant(values, options) {
      makeSetImmutable(values);

      var shouldNotHappen = function shouldNotHappen() {
        throw new Error('Should not happen');
      };

      var ls = new LiveSet({
        scheduler: options ? options.scheduler : undefined,
        read: shouldNotHappen,
        listen: shouldNotHappen
      });
      ls._ended = true;
      ls._values = values;
      ls._mutableValues = false;
      return ls;
    }
  }]);
  return LiveSet;
}(); // Assign here because Flow doesn't support computed property keys on classes:
// https://github.com/facebook/flow/issues/2286


exports.default = LiveSet;
(0, _defineProperty2.default)(LiveSet, "defaultScheduler", new _Scheduler.default());

LiveSet.prototype[_symbolObservable.default] = function () {
  return this;
};

function makeSetImmutable(set) {
  if (true) {
    set.add = set.delete = set.clear = readOnly;
  }
}

function readOnly() {
  throw new Error('Do not modify Set passed to or from LiveSet: Set is read-only in development');
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJMaXZlU2V0IiwiaW5pdCIsIl9pbml0IiwiX3NjaGVkdWxlciIsInNjaGVkdWxlciIsImRlZmF1bHRTY2hlZHVsZXIiLCJyZWNvcmQiLCJfY2hhbmdlUXVldWUiLCJwdXNoIiwiX3F1ZXVlZENhbGwiLCJzY2hlZHVsZSIsImNoYW5nZXMiLCJvYnNlcnZlcnNUb0NhbGwiLCJlbmRlZCIsIl9lbmRlZCIsIl9vYnNlcnZlcnMiLCJzbGljZSIsImZvckVhY2giLCJvYnNlcnZlciIsImlnbm9yZSIsIm9ic2VydmVyTmV4dCIsIm5leHQiLCJjYWxsIiwiY2hhbmdlc1RvRGVsaXZlciIsImxlbmd0aCIsIl9lbmRlZFdpdGhFcnJvciIsImVycm9yIiwiX2Vycm9yIiwiY29tcGxldGUiLCJfYWN0aXZlIiwiRXJyb3IiLCJsaXN0ZW5IYW5kbGVyIiwidW5zdWJzY3JpYmUiLCJfdmFsdWVzIiwiX2luU3Vic2NyaXB0aW9uU3RhcnQiLCJwdWxsQ2hhbmdlcyIsIl9tdXRhYmxlVmFsdWVzIiwibWFrZVNldEltbXV0YWJsZSIsInMiLCJyZWFkIiwib2JzZXJ2ZXJPck9uTmV4dCIsIm9uRXJyb3IiLCJvbkNvbXBsZXRlIiwibGl2ZVNldCIsInN1YnNjcmlwdGlvbiIsImNsb3NlZCIsInN0YXJ0Iiwib2JzZXJ2ZXJSZWNvcmQiLCJpc1N0YXJ0aW5nIiwidW5zdWJzY3JpYmVkSW5TdGFydCIsImluZGV4T2YiLCJpeCIsInNwbGljZSIsIl9kZWFjdGl2YXRlIiwiY2hhbmdlUXVldWVMZW5ndGgiLCJvcmlnaW5hbE5leHQiLCJjb250cm9sbGVyIiwiYWRkIiwidmFsdWUiLCJ2YWx1ZXMiLCJoYXMiLCJTZXQiLCJfcXVldWVDaGFuZ2UiLCJ0eXBlIiwicmVtb3ZlIiwiZGVsZXRlIiwiZXJyIiwiZW5kIiwiYWN0aXZlIiwic2V0VmFsdWVzRXJyb3IiLCJzZXRWYWx1ZXMiLCJsaXN0ZW5IYW5kbGVyT3JGdW5jdGlvbiIsImxpc3RlbiIsIlR5cGVFcnJvciIsImluaXRpYWxWYWx1ZXMiLCJvcHRpb25zIiwic2V0IiwidW5kZWZpbmVkIiwiX2NvbnRyb2xsZXIiLCJzdWJzY3JpYmUiLCJzaG91bGROb3RIYXBwZW4iLCJscyIsIlNjaGVkdWxlciIsInByb3RvdHlwZSIsIiQkb2JzZXJ2YWJsZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImNsZWFyIiwicmVhZE9ubHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUNBOztJQWlEcUJBLE87OztBQU9jO0FBY2pDLG1CQUFZQyxJQUFaLEVBQWtDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbURBZmYsSUFlZTtBQUFBLDBEQWRSLEtBY1E7QUFBQSxtREFUOUIsSUFTOEI7QUFBQSxnRUFSWCxLQVFXO0FBQUEsa0RBUGhCLEtBT2dCO0FBQUEsMkRBTlAsS0FNTztBQUFBLGtEQUxwQixJQUtvQjtBQUFBLHVEQUpYLEtBSVc7QUFBQSx3REFIWSxFQUdaO0FBQUEsc0RBRlksRUFFWjtBQUNoQyxTQUFLQyxLQUFMLEdBQWFELElBQWI7QUFDQSxTQUFLRSxVQUFMLEdBQWtCRixJQUFJLENBQUNHLFNBQUwsSUFBa0JKLE9BQU8sQ0FBQ0ssZ0JBQTVDO0FBQ0Q7Ozs7aUNBaUNZQyxNLEVBQWlDO0FBQUE7O0FBQzVDLFVBQUlBLE1BQUosRUFBWTtBQUNWLGFBQUtDLFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCRixNQUF2QjtBQUNEOztBQUNELFVBQUksQ0FBQyxLQUFLRyxXQUFWLEVBQXVCO0FBQ3JCLGFBQUtBLFdBQUwsR0FBbUIsSUFBbkI7O0FBQ0EsYUFBS04sVUFBTCxDQUFnQk8sUUFBaEIsQ0FBeUIsWUFBTTtBQUM3QixVQUFBLEtBQUksQ0FBQ0QsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGNBQU1FLE9BQU8sR0FBRyxLQUFJLENBQUNKLFlBQXJCO0FBQ0EsVUFBQSxLQUFJLENBQUNBLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxjQUFJSyxlQUFKO0FBQ0EsY0FBTUMsS0FBSyxHQUFHLEtBQUks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OztLQXNRSDtBQUNBOzs7OzhCQTlUcUJqRixPLHNCQUNPLElBQUlrRixrQkFBSixFOztBQThUM0JsRixPQUFELENBQWNtRixTQUFkLENBQXdCQyx5QkFBeEIsSUFBd0MsWUFBVztBQUNqRCxTQUFPLElBQVA7QUFDRCxDQUZEOztBQUlBLFNBQVMvQyxnQkFBVCxDQUEwQnVDLEdBQTFCLEVBQXlDO0FBQ3ZDLE1BQUlTLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3hDWCxJQUFBQSxHQUFELENBQVVuQixHQUFWLEdBQWlCbUIsR0FBRCxDQUFVWCxNQUFWLEdBQW9CVyxHQUFELENBQVVZLEtBQVYsR0FBa0JDLFFBQXJEO0FBQ0Q7QUFDRjs7QUFFRCxTQUFTQSxRQUFULEdBQW9CO0FBQ2xCLFFBQU0sSUFBSTNELEtBQUosQ0FBVSw4RUFBVixDQUFOO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgU2NoZWR1bGVyIGZyb20gJy4vU2NoZWR1bGVyJztcbmltcG9ydCAkJG9ic2VydmFibGUgZnJvbSAnc3ltYm9sLW9ic2VydmFibGUnO1xuXG5leHBvcnQgdHlwZSBMaXZlU2V0Q2hhbmdlUmVjb3JkPCtUPiA9XG4gIHt0eXBlOiAnYWRkJywgK3ZhbHVlOiBUfSB8XG4gIHt0eXBlOiAncmVtb3ZlJywgK3ZhbHVlOiBUfSB8XG4gIHt0eXBlOiAnZW5kJ307XG5cbmV4cG9ydCB0eXBlIExpdmVTZXRDb250cm9sbGVyPC1UPiA9IHtcbiAgY2xvc2VkOiBib29sZWFuO1xuICBhZGQoaXRlbTogVCk6IHZvaWQ7XG4gIHJlbW92ZShpdGVtOiBUKTogdm9pZDtcbiAgZXJyb3IoZXJyOiBhbnkpOiB2b2lkO1xuICBlbmQoKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIExpc3RlbkhhbmRsZXIgPSB7XG4gIHVuc3Vic2NyaWJlKCk6IHZvaWQ7XG4gICtwdWxsQ2hhbmdlcz86ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBMaXZlU2V0SW5pdDxUPiA9IHtcbiAgc2NoZWR1bGVyPzogU2NoZWR1bGVyO1xuICByZWFkKCk6IFNldDxUPjtcbiAgbGlzdGVuKFxuICAgIHNldFZhbHVlczogeyAodmFsdWVzOiBTZXQ8VD4pOiB2b2lkIH0sXG4gICAgY29udHJvbGxlcjogTGl2ZVNldENvbnRyb2xsZXI8VD5cbiAgKTogdm9pZHxMaXN0ZW5IYW5kbGVyfCgpPT52b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgTGl2ZVNldFN1YnNjcmliZXI8LVQ+ID0gKGNoYW5nZXM6ICRSZWFkT25seUFycmF5PExpdmVTZXRDaGFuZ2VSZWNvcmQ8VD4+KSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBMaXZlU2V0U3Vic2NyaXB0aW9uID0ge1xuICBjbG9zZWQ6IGJvb2xlYW47XG4gIHVuc3Vic2NyaWJlKCk6IHZvaWQ7XG4gIHB1bGxDaGFuZ2VzKCk6IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBMaXZlU2V0T2JzZXJ2ZXI8LVQ+ID0ge1xuICArc3RhcnQ/OiA/KHN1YnNjcmlwdGlvbjogTGl2ZVNldFN1YnNjcmlwdGlvbikgPT4gdm9pZDtcbiAgK25leHQ/OiA/TGl2ZVNldFN1YnNjcmliZXI8VD47XG4gICtlcnJvcj86ID8oZXJyOiBhbnkpID0+IHZvaWQ7XG4gICtjb21wbGV0ZT86ID8oKSA9PiB2b2lkO1xufTtcblxudHlwZSBMaXZlU2V0T2JzZXJ2ZXJSZWNvcmQ8VD4gPSB7XG4gIGlnbm9yZTogbnVtYmVyO1xuICBvYnNlcnZlcjogTGl2ZVNldE9ic2VydmVyPFQ+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGl2ZVNldDxUPiB7XG4gIHN0YXRpYyBkZWZhdWx0U2NoZWR1bGVyID0gbmV3IFNjaGVkdWxlcigpO1xuXG4gIF9pbml0OiBMaXZlU2V0SW5pdDxUPjtcbiAgX3NjaGVkdWxlcjogU2NoZWR1bGVyO1xuXG4gIF92YWx1ZXM6ID9TZXQ8VD4gPSBudWxsO1xuICBfbXV0YWJsZVZhbHVlczogYm9vbGVhbiA9IGZhbHNlOyAvLyBXaGV0aGVyIHdlIGNhbiBtdXRhdGUgdGhlIF92YWx1ZXMgU2V0LlxuXG4gIF9hY3RpdmU6ID97XG4gICAgY29udHJvbGxlcjogTGl2ZVNldENvbnRyb2xsZXI8VD47XG4gICAgbGlzdGVuSGFuZGxlcjogTGlzdGVuSGFuZGxlcjtcbiAgfSA9IG51bGw7XG4gIF9pblN1YnNjcmlwdGlvblN0YXJ0ID0gZmFsc2U7XG4gIF9lbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBfZW5kZWRXaXRoRXJyb3I6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2Vycm9yOiBhbnkgPSBudWxsO1xuICBfcXVldWVkQ2FsbDogYm9vbGVhbiA9IGZhbHNlO1xuICBfY2hhbmdlUXVldWU6IEFycmF5PExpdmVTZXRDaGFuZ2VSZWNvcmQ8VD4+ID0gW107XG4gIF9vYnNlcnZlcnM6IEFycmF5PExpdmVTZXRPYnNlcnZlclJlY29yZDxUPj4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihpbml0OiBMaXZlU2V0SW5pdDxUPikge1xuICAgIHRoaXMuX2luaXQgPSBpbml0O1xuICAgIHRoaXMuX3NjaGVkdWxlciA9IGluaXQuc2NoZWR1bGVyIHx8IExpdmVTZXQuZGVmYXVsdFNjaGVkdWxlcjtcbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmU8VD4oaW5pdGlhbFZhbHVlczogP1NldDxUPiwgb3B0aW9uczogP3tzY2hlZHVsZXI/OiBTY2hlZHVsZXJ9KToge2xpdmVTZXQ6IExpdmVTZXQ8VD4sIGNvbnRyb2xsZXI6IExpdmVTZXRDb250cm9sbGVyPFQ+fSB7XG4gICAgY29uc3Qgc2V0ID0gaW5pdGlhbFZhbHVlcyB8fCBuZXcgU2V0KCk7XG4gICAgbGV0IGNvbnRyb2xsZXI7XG4gICAgY29uc3QgbGl2ZVNldCA9IG5ldyBMaXZlU2V0KHtcbiAgICAgIHNjaGVkdWxlcjogb3B0aW9ucyA/IG9wdGlvbnMuc2NoZWR1bGVyIDogdW5kZWZpbmVkLFxuICAgICAgcmVhZDogKCkgPT4gc2V0LFxuICAgICAgbGlzdGVuOiAoc2V0VmFsdWVzLCBfY29udHJvbGxlcikgPT4ge1xuICAgICAgICBzZXRWYWx1ZXMoc2V0KTtcbiAgICAgICAgY29udHJvbGxlciA9IF9jb250cm9sbGVyO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpdmVTZXQuc3Vic2NyaWJlKHt9KTtcbiAgICByZXR1cm4ge2xpdmVTZXQsIGNvbnRyb2xsZXI6IChjb250cm9sbGVyOiBhbnkpfTtcbiAgfVxuXG4gIHN0YXRpYyBjb25zdGFudDxUPih2YWx1ZXM6IFNldDxUPiwgb3B0aW9uczogP3tzY2hlZHVsZXI/OiBTY2hlZHVsZXJ9KTogTGl2ZVNldDxUPiB7XG4gICAgbWFrZVNldEltbXV0YWJsZSh2YWx1ZXMpO1xuICAgIGNvbnN0IHNob3VsZE5vdEhhcHBlbiA9ICgpID0+IHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBoYXBwZW4nKTtcbiAgICB9O1xuICAgIGNvbnN0IGxzID0gbmV3IExpdmVTZXQoe1xuICAgICAgc2NoZWR1bGVyOiBvcHRpb25zID8gb3B0aW9ucy5zY2hlZHVsZXIgOiB1bmRlZmluZWQsXG4gICAgICByZWFkOiBzaG91bGROb3RIYXBwZW4sXG4gICAgICBsaXN0ZW46IHNob3VsZE5vdEhhcHBlblxuICAgIH0pO1xuICAgIGxzLl9lbmRlZCA9IHRydWU7XG4gICAgbHMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICBscy5fbXV0YWJsZVZhbHVlcyA9IGZhbHNlO1xuICAgIHJldHVybiBscztcbiAgfVxuXG4gIF9xdWV1ZUNoYW5nZShyZWNvcmQ6ID9MaXZlU2V0Q2hhbmdlUmVjb3JkPFQ+KSB7XG4gICAgaWYgKHJlY29yZCkge1xuICAgICAgdGhpcy5fY2hhbmdlUXVldWUucHVzaChyZWNvcmQpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX3F1ZXVlZENhbGwpIHtcbiAgICAgIHRoaXMuX3F1ZXVlZENhbGwgPSB0cnVlO1xuICAgICAgdGhpcy5fc2NoZWR1bGVyLnNjaGVkdWxlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fcXVldWVkQ2FsbCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fY2hhbmdlUXVldWU7XG4gICAgICAgIHRoaXMuX2NoYW5nZVF1ZXVlID0gW107XG4gICAgICAgIGxldCBvYnNlcnZlcnNUb0NhbGw7XG4gICAgICAgIGNvbnN0IGVuZGVkID0gdGhpcy5fZW5kZWQ7XG4gICAgICAgIGlmIChlbmRlZCkge1xuICAgICAgICAgIG9ic2VydmVyc1RvQ2FsbCA9IHRoaXMuX29ic2VydmVycztcbiAgICAgICAgICB0aGlzLl9vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYnNlcnZlcnNUb0NhbGwgPSB0aGlzLl9vYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgfVxuICAgICAgICBvYnNlcnZlcnNUb0NhbGwuZm9yRWFjaChyZWNvcmQgPT4ge1xuICAgICAgICAgIGNvbnN0IHtvYnNlcnZlciwgaWdub3JlfSA9IHJlY29yZDtcbiAgICAgICAgICBjb25zdCBvYnNlcnZlck5leHQgPSBvYnNlcnZlci5uZXh0O1xuICAgICAgICAgIGlmIChvYnNlcnZlck5leHQpIHtcbiAgICAgICAgICAgIGlmIChpZ25vcmUgPT09IDApIHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXJOZXh0LmNhbGwob2JzZXJ2ZXIsIGNoYW5nZXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVjb3JkLmlnbm9yZSA9IDA7XG4gICAgICAgICAgICAgIGNvbnN0IGNoYW5nZXNUb0RlbGl2ZXIgPSBjaGFuZ2VzLnNsaWNlKGlnbm9yZSk7XG4gICAgICAgICAgICAgIGlmIChjaGFuZ2VzVG9EZWxpdmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyTmV4dC5jYWxsKG9ic2VydmVyLCBjaGFuZ2VzVG9EZWxpdmVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZW5kZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9lbmRlZFdpdGhFcnJvcikge1xuICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIG9ic2VydmVyLmVycm9yKHRoaXMuX2Vycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChvYnNlcnZlci5jb21wbGV0ZSkgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgX2RlYWN0aXZhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpIHRocm93IG5ldyBFcnJvcignYWxyZWFkeSBpbmFjdGl2ZScpO1xuICAgIGNvbnN0IHtsaXN0ZW5IYW5kbGVyfSA9IHRoaXMuX2FjdGl2ZTtcbiAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuICAgIGlmIChsaXN0ZW5IYW5kbGVyKSB7XG4gICAgICBsaXN0ZW5IYW5kbGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgdmFsdWVzKCk6IFNldDxUPiB7XG4gICAgaWYgKHRoaXMuX3ZhbHVlcykge1xuICAgICAgaWYgKHRoaXMuX2FjdGl2ZSAmJiAhdGhpcy5faW5TdWJzY3JpcHRpb25TdGFydCkge1xuICAgICAgICBjb25zdCB7bGlzdGVuSGFuZGxlcn0gPSB0aGlzLl9hY3RpdmU7XG4gICAgICAgIGlmIChsaXN0ZW5IYW5kbGVyLnB1bGxDaGFuZ2VzKSB7XG4gICAgICAgICAgbGlzdGVuSGFuZGxlci5wdWxsQ2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fbXV0YWJsZVZhbHVlcykge1xuICAgICAgICB0aGlzLl9tdXRhYmxlVmFsdWVzID0gZmFsc2U7XG4gICAgICAgIG1ha2VTZXRJbW11dGFibGUodGhpcy5fdmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIC8qOjogaWYgKCF0aGlzLl92YWx1ZXMpIHRocm93IG5ldyBFcnJvcigpOyAqL1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyaWVkIHRvIGNhbGwgdmFsdWVzKCkgb24gbGl2ZXNldCBkdXJpbmcgc3Vic2NyaXB0aW9uIGJlZm9yZSBzZXRWYWx1ZXMgd2FzIGNhbGxlZCcpO1xuICAgICAgfVxuICAgICAgY29uc3QgcyA9IHRoaXMuX2luaXQucmVhZCgpO1xuICAgICAgbWFrZVNldEltbXV0YWJsZShzKTtcbiAgICAgIHJldHVybiBzO1xuICAgIH1cbiAgfVxuXG4gIGlzRW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZGVkO1xuICB9XG5cbiAgZ2V0U2NoZWR1bGVyKCk6IFNjaGVkdWxlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NjaGVkdWxlcjtcbiAgfVxuXG4gIHN1YnNjcmliZShvYnNlcnZlck9yT25OZXh0OiBMaXZlU2V0T2JzZXJ2ZXI8VD4gfCBMaXZlU2V0U3Vic2NyaWJlcjxUPiwgb25FcnJvcjogPyhlcnI6IGFueSkgPT4gdm9pZCwgb25Db21wbGV0ZTogPygpID0+IHZvaWQpOiBMaXZlU2V0U3Vic2NyaXB0aW9uIHtcbiAgICBjb25zdCBsaXZlU2V0ID0gdGhpcztcblxuICAgIGxldCBvYnNlcnZlcjtcbiAgICBpZiAodHlwZW9mIG9ic2VydmVyT3JPbk5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9ic2VydmVyID0ge1xuICAgICAgICBuZXh0OiBvYnNlcnZlck9yT25OZXh0LFxuICAgICAgICBlcnJvcjogb25FcnJvcixcbiAgICAgICAgY29tcGxldGU6IG9uQ29tcGxldGVcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ic2VydmVyID0gb2JzZXJ2ZXJPck9uTmV4dDtcbiAgICB9XG5cbiAgICAob2JzZXJ2ZXI6IExpdmVTZXRPYnNlcnZlcjxUPik7XG5cbiAgICBpZiAodGhpcy5fZW5kZWQpIHtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgY2xvc2VkOiBmYWxzZSxcbiAgICAgICAgdW5zdWJzY3JpYmU6ICgpID0+IHtcbiAgICAgICAgICBzdWJzY3JpcHRpb24uY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgcHVsbENoYW5nZXM6ICgpID0+IHt9XG4gICAgICB9O1xuICAgICAgaWYgKG9ic2VydmVyLnN0YXJ0KSB7XG4gICAgICAgIG9ic2VydmVyLnN0YXJ0KHN1YnNjcmlwdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAoIXN1YnNjcmlwdGlvbi5jbG9zZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuZGVkV2l0aEVycm9yKSB7XG4gICAgICAgICAgaWYgKG9ic2VydmVyLmVycm9yKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcih0aGlzLl9lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5jb21wbGV0ZSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN1YnNjcmlwdGlvbi5jbG9zZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCBvYnNlcnZlclJlY29yZCA9IHtvYnNlcnZlciwgaWdub3JlOiB0aGlzLl9jaGFuZ2VRdWV1ZS5sZW5ndGh9O1xuXG4gICAgbGV0IGlzU3RhcnRpbmcgPSB0cnVlO1xuICAgIGxldCB1bnN1YnNjcmliZWRJblN0YXJ0ID0gZmFsc2U7XG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0ge1xuICAgICAgLyo6OiBjbG9zZWQ6IGZhbHNlJiZgICovIGdldCBjbG9zZWQoKSB7XG4gICAgICAgIHJldHVybiAhaXNTdGFydGluZyAmJiBsaXZlU2V0Ll9vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlclJlY29yZCkgPCAwO1xuICAgICAgfS8qOjogYCAqLyxcbiAgICAgIHVuc3Vic2NyaWJlOiAoKSA9PiB7XG4gICAgICAgIGlmIChpc1N0YXJ0aW5nKSB7XG4gICAgICAgICAgdW5zdWJzY3JpYmVkSW5TdGFydCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl4ID0gdGhpcy5fb2JzZXJ2ZXJzLmluZGV4T2Yob2JzZXJ2ZXJSZWNvcmQpO1xuICAgICAgICBpZiAoaXggPj0gMCkge1xuICAgICAgICAgIHRoaXMuX29ic2VydmVycy5zcGxpY2UoaXgsIDEpO1xuICAgICAgICAgIGlmICghdGhpcy5fZW5kZWQgJiYgdGhpcy5fb2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2RlYWN0aXZhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwdWxsQ2hhbmdlczogKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fYWN0aXZlICYmIHRoaXMuX2FjdGl2ZS5saXN0ZW5IYW5kbGVyICYmIHRoaXMuX2FjdGl2ZS5saXN0ZW5IYW5kbGVyLnB1bGxDaGFuZ2VzKSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlLmxpc3RlbkhhbmRsZXIucHVsbENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGFuZ2VRdWV1ZUxlbmd0aCA9IHRoaXMuX2NoYW5nZVF1ZXVlLmxlbmd0aDtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxOZXh0ID0gb2JzZXJ2ZXIubmV4dDtcbiAgICAgICAgaWYgKGNoYW5nZVF1ZXVlTGVuZ3RoICE9PSAwICYmIG9yaWdpbmFsTmV4dCkge1xuICAgICAgICAgIGNvbnN0IGNoYW5nZXNUb0RlbGl2ZXIgPSB0aGlzLl9jaGFuZ2VRdWV1ZS5zbGljZShvYnNlcnZlclJlY29yZC5pZ25vcmUpO1xuICAgICAgICAgIGlmIChjaGFuZ2VzVG9EZWxpdmVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXJSZWNvcmQuaWdub3JlID0gY2hhbmdlUXVldWVMZW5ndGg7XG4gICAgICAgICAgICBvcmlnaW5hbE5leHQuY2FsbChvYnNlcnZlciwgY2hhbmdlc1RvRGVsaXZlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICBjb25zdCBjb250cm9sbGVyOiBMaXZlU2V0Q29udHJvbGxlcjxUPiA9IHtcbiAgICAgICAgLy8gRmxvdyBkb2Vzbid0IHN1cHBvcnQgZ2V0dGVycyBhbmQgc2V0dGVycyB5ZXRcbiAgICAgICAgLyo6OiBjbG9zZWQ6IGZhbHNlJiZgICovIGdldCBjbG9zZWQoKSB7XG4gICAgICAgICAgcmV0dXJuICFsaXZlU2V0Ll9hY3RpdmUgfHwgbGl2ZVNldC5fYWN0aXZlLmNvbnRyb2xsZXIgIT09IHRoaXM7XG4gICAgICAgIH0vKjo6IGAgKi8sXG4gICAgICAgIGFkZDogdmFsdWUgPT4ge1xuICAgICAgICAgIGxldCB2YWx1ZXMgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgICAgaWYgKCF2YWx1ZXMpIHRocm93IG5ldyBFcnJvcignc2V0VmFsdWUgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIGNvbnRyb2xsZXIgaXMgdXNlZCcpO1xuICAgICAgICAgIGlmICghdGhpcy5fZW5kZWQgJiYgIXZhbHVlcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX211dGFibGVWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzID0gbmV3IFNldCh2YWx1ZXMpO1xuICAgICAgICAgICAgICB0aGlzLl9tdXRhYmxlVmFsdWVzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlcy5hZGQodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fcXVldWVDaGFuZ2Uoe3R5cGU6ICdhZGQnLCB2YWx1ZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlOiB2YWx1ZSA9PiB7XG4gICAgICAgICAgbGV0IHZhbHVlcyA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICBpZiAoIXZhbHVlcykgdGhyb3cgbmV3IEVycm9yKCdzZXRWYWx1ZSBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgY29udHJvbGxlciBpcyB1c2VkJyk7XG4gICAgICAgICAgaWYgKCF0aGlzLl9lbmRlZCAmJiB2YWx1ZXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9tdXRhYmxlVmFsdWVzKSB7XG4gICAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcyA9IG5ldyBTZXQodmFsdWVzKTtcbiAgICAgICAgICAgICAgdGhpcy5fbXV0YWJsZVZhbHVlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZXMuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXVlQ2hhbmdlKHt0eXBlOiAncmVtb3ZlJywgdmFsdWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBlcnIgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9lbmRlZCkgcmV0dXJuO1xuICAgICAgICAgIHRoaXMuX2VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLl9lbmRlZFdpdGhFcnJvciA9IHRydWU7XG4gICAgICAgICAgdGhpcy5fZXJyb3IgPSBlcnI7XG4gICAgICAgICAgdGhpcy5fcXVldWVDaGFuZ2UoKTtcbiAgICAgICAgICB0aGlzLl9kZWFjdGl2YXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZDogKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9lbmRlZCkgcmV0dXJuO1xuICAgICAgICAgIHRoaXMuX2VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLl9xdWV1ZUNoYW5nZSgpO1xuICAgICAgICAgIHRoaXMuX2RlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuX2FjdGl2ZSA9IHtcbiAgICAgICAgY29udHJvbGxlcixcbiAgICAgICAgbGlzdGVuSGFuZGxlcjoge1xuICAgICAgICAgIHVuc3Vic2NyaWJlOiAoKSA9PiB7fVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3Qgc2V0VmFsdWVzRXJyb3I6IEZ1bmN0aW9uID0gKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFZhbHVlcyBtdXN0IGJlIGNhbGxlZCBvbmNlIGR1cmluZyBsaXN0ZW4nKTtcbiAgICAgIH07XG4gICAgICBsZXQgc2V0VmFsdWVzID0gdmFsdWVzID0+IHtcbiAgICAgICAgc2V0VmFsdWVzID0gc2V0VmFsdWVzRXJyb3I7XG4gICAgICAgIG1ha2VTZXRJbW11dGFibGUodmFsdWVzKTtcbiAgICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgICB0aGlzLl9tdXRhYmxlVmFsdWVzID0gZmFsc2U7XG4gICAgICB9O1xuICAgICAgY29uc3QgbGlzdGVuSGFuZGxlck9yRnVuY3Rpb24gPSB0aGlzLl9pbml0Lmxpc3Rlbih2YWx1ZXMgPT4gc2V0VmFsdWVzKHZhbHVlcyksIGNvbnRyb2xsZXIpO1xuICAgICAgaWYgKCF0aGlzLl92YWx1ZXMpIHtcbiAgICAgICAgc2V0VmFsdWVzRXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuSGFuZGxlck9yRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYWN0aXZlLmxpc3RlbkhhbmRsZXIgPSB7XG4gICAgICAgICAgdW5zdWJzY3JpYmU6IGxpc3RlbkhhbmRsZXJPckZ1bmN0aW9uXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbkhhbmRsZXJPckZ1bmN0aW9uICE9IG51bGwgJiYgdHlwZW9mIGxpc3RlbkhhbmRsZXJPckZ1bmN0aW9uLnVuc3Vic2NyaWJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGFjdGl2ZS5saXN0ZW5IYW5kbGVyID0gbGlzdGVuSGFuZGxlck9yRnVuY3Rpb247XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbkhhbmRsZXJPckZ1bmN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbGlzdGVuIG11c3QgcmV0dXJuIG9iamVjdCB3aXRoIHVuc3Vic2NyaWJlIG1ldGhvZCwgYSBmdW5jdGlvbiwgb3IgbnVsbCcpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRyb2xsZXIuY2xvc2VkKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGFjdGl2ZTtcbiAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvYnNlcnZlci5zdGFydCkge1xuICAgICAgdGhpcy5faW5TdWJzY3JpcHRpb25TdGFydCA9IHRydWU7XG4gICAgICBvYnNlcnZlci5zdGFydChzdWJzY3JpcHRpb24pO1xuICAgICAgdGhpcy5faW5TdWJzY3JpcHRpb25TdGFydCA9IGZhbHNlO1xuICAgIH1cbiAgICBpc1N0YXJ0aW5nID0gZmFsc2U7XG5cbiAgICBvYnNlcnZlclJlY29yZC5pZ25vcmUgPSB0aGlzLl9jaGFuZ2VRdWV1ZS5sZW5ndGg7XG4gICAgaWYgKCF1bnN1YnNjcmliZWRJblN0YXJ0KSB7XG4gICAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChvYnNlcnZlclJlY29yZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgfVxufVxuXG4vLyBBc3NpZ24gaGVyZSBiZWNhdXNlIEZsb3cgZG9lc24ndCBzdXBwb3J0IGNvbXB1dGVkIHByb3BlcnR5IGtleXMgb24gY2xhc3Nlczpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8yMjg2XG4oTGl2ZVNldDphbnkpLnByb3RvdHlwZVskJG9ic2VydmFibGVdID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gbWFrZVNldEltbXV0YWJsZShzZXQ6IFNldDxhbnk+KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgKHNldDphbnkpLmFkZCA9IChzZXQ6YW55KS5kZWxldGUgPSAoc2V0OmFueSkuY2xlYXIgPSByZWFkT25seTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkT25seSgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdEbyBub3QgbW9kaWZ5IFNldCBwYXNzZWQgdG8gb3IgZnJvbSBMaXZlU2V0OiBTZXQgaXMgcmVhZC1vbmx5IGluIGRldmVsb3BtZW50Jyk7XG59XG4iXX0=

/***/ }),

/***/ "./node_modules/live-set/merge.js":
/*!****************************************!*\
  !*** ./node_modules/live-set/merge.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;

var _ = _interopRequireDefault(__webpack_require__(/*! . */ "./node_modules/live-set/index.js"));

function merge(liveSets) {
  return new _.default({
    scheduler: liveSets[0] ? liveSets[0].getScheduler() : undefined,
    read: function read() {
      var s = new Set();
      liveSets.forEach(function (liveSet) {
        liveSet.values().forEach(function (value) {
          s.add(value);
        });
      });
      return s;
    },
    listen: function listen(setValues, controller) {
      var initialValues = new Set();
      var subs = new Set();
      var doneSubscribing = false;
      liveSets.forEach(function (liveSet) {
        var sub;
        liveSet.subscribe({
          start: function start(_sub) {
            sub = _sub;
            subs.add(sub);
            liveSet.values().forEach(function (value) {
              initialValues.add(value);
            });
          },
          next: function next(changes) {
            changes.forEach(function (change) {
              if (change.type === 'add') {
                controller.add(change.value);
              } else if (change.type === 'remove') {
                controller.remove(change.value);
              }
            });
          },
          error: function error(err) {
            controller.error(err);
          },
          complete: function complete() {
            subs.delete(sub);

            if (doneSubscribing && subs.size === 0) {
              controller.end();
            }
          }
        });
      });
      setValues(initialValues);
      doneSubscribing = true;

      if (subs.size === 0) {
        controller.end();
      }

      return {
        unsubscribe: function unsubscribe() {
          subs.forEach(function (sub) {
            sub.unsubscribe();
          });
        },
        pullChanges: function pullChanges() {
          subs.forEach(function (sub) {
            sub.pullChanges();
          });
        }
      };
    }
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tZXJnZS5qcyJdLCJuYW1lcyI6WyJtZXJnZSIsImxpdmVTZXRzIiwiTGl2ZVNldCIsInNjaGVkdWxlciIsImdldFNjaGVkdWxlciIsInVuZGVmaW5lZCIsInJlYWQiLCJzIiwiU2V0IiwiZm9yRWFjaCIsImxpdmVTZXQiLCJ2YWx1ZXMiLCJ2YWx1ZSIsImFkZCIsImxpc3RlbiIsInNldFZhbHVlcyIsImNvbnRyb2xsZXIiLCJpbml0aWFsVmFsdWVzIiwic3VicyIsImRvbmVTdWJzY3JpYmluZyIsInN1YiIsInN1YnNjcmliZSIsInN0YXJ0IiwiX3N1YiIsIm5leHQiLCJjaGFuZ2VzIiwiY2hhbmdlIiwidHlwZSIsInJlbW92ZSIsImVycm9yIiwiZXJyIiwiY29tcGxldGUiLCJkZWxldGUiLCJzaXplIiwiZW5kIiwidW5zdWJzY3JpYmUiLCJwdWxsQ2hhbmdlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7O0FBRWUsU0FBU0EsS0FBVCxDQUFrQkMsUUFBbEIsRUFBMkQ7QUFDeEUsU0FBTyxJQUFJQyxTQUFKLENBQVk7QUFDakJDLElBQUFBLFNBQVMsRUFBRUYsUUFBUSxDQUFDLENBQUQsQ0FBUixHQUFjQSxRQUFRLENBQUMsQ0FBRCxDQUFSLENBQVlHLFlBQVosRUFBZCxHQUEyQ0MsU0FEckM7QUFFakJDLElBQUFBLElBRmlCLGtCQUVWO0FBQ0wsVUFBTUMsQ0FBQyxHQUFHLElBQUlDLEdBQUosRUFBVjtBQUNBUCxNQUFBQSxRQUFRLENBQUNRLE9BQVQsQ0FBaUIsVUFBQUMsT0FBTyxFQUFJO0FBQzFCQSxRQUFBQSxPQUFPLENBQUNDLE1BQVIsR0FBaUJGLE9BQWpCLENBQXlCLFVBQUFHLEtBQUssRUFBSTtBQUNoQ0wsVUFBQUEsQ0FBQyxDQUFDTSxHQUFGLENBQU1ELEtBQU47QUFDRCxTQUZEO0FBR0QsT0FKRDtBQUtBLGFBQU9MLENBQVA7QUFDRCxLQVZnQjtBQVdqQk8sSUFBQUEsTUFYaUIsa0JBV1ZDLFNBWFUsRUFXQ0MsVUFYRCxFQVdhO0FBQzVCLFVBQU1DLGFBQWEsR0FBRyxJQUFJVCxHQUFKLEVBQXRCO0FBQ0EsVUFBTVUsSUFBSSxHQUFHLElBQUlWLEdBQUosRUFBYjtBQUNBLFVBQUlXLGVBQWUsR0FBRyxLQUF0QjtBQUNBbEIsTUFBQUEsUUFBUSxDQUFDUSxPQUFULENBQWlCLFVBQUFDLE9BQU8sRUFBSTtBQUMxQixZQUFJVSxHQUFKO0FBQ0FWLFFBQUFBLE9BQU8sQ0FBQ1csU0FBUixDQUFrQjtBQUNoQkMsVUFBQUEsS0FEZ0IsaUJBQ1ZDLElBRFUsRUFDSjtBQUNWSCxZQUFBQSxHQUFHLEdBQUdHLElBQU47QUFDQUwsWUFBQUEsSUFBSSxDQUFDTCxHQUFMLENBQVNPLEdBQVQ7QUFDQVYsWUFBQUEsT0FBTyxDQUFDQyxNQUFSLEdBQWlCRixPQUFqQixDQUF5QixVQUFBRyxLQUFLLEVBQUk7QUFDaENLLGNBQUFBLGFBQWEsQ0FBQ0osR0FBZCxDQUFrQkQsS0FBbEI7QUFDRCxhQUZEO0FBR0QsV0FQZTtBQVFoQlksVUFBQUEsSUFSZ0IsZ0JBUVhDLE9BUlcsRUFRRjtBQUNaQSxZQUFBQSxPQUFPLENBQUNoQixPQUFSLENBQWdCLFVBQUFpQixNQUFNLEVBQUk7QUFDeEIsa0JBQUlBLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixLQUFwQixFQUEyQjtBQUN6QlgsZ0JBQUFBLFVBQVUsQ0FBQ0gsR0FBWCxDQUFlYSxNQUFNLENBQUNkLEtBQXRCO0FBQ0QsZUFGRCxNQUVPLElBQUljLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUNuQ1gsZ0JBQUFBLFVBQVUsQ0FBQ1ksTUFBWCxDQUFrQkYsTUFBTSxDQUFDZCxLQUF6QjtBQUNEO0FBQ0YsYUFORDtBQU9ELFdBaEJlO0FBaUJoQmlCLFVBQUFBLEtBakJnQixpQkFpQlZDLEdBakJVLEVBaUJMO0FBQ1RkLFlBQUFBLFVBQVUsQ0FBQ2EsS0FBWCxDQUFpQkMsR0FBakI7QUFDRCxXQW5CZTtBQW9CaEJDLFVBQUFBLFFBcEJnQixzQkFvQkw7QUFDVGIsWUFBQUEsSUFBSSxDQUFDYyxNQUFMLENBQVlaLEdBQVo7O0FBQ0EsZ0JBQUlELGVBQWUsSUFBSUQsSUFBSSxDQUFDZSxJQUFMLEtBQWMsQ0FBckMsRUFBd0M7QUFDdENqQixjQUFBQSxVQUFVLENBQUNrQixHQUFYO0FBQ0Q7QUFDRjtBQXpCZSxTQUFsQjtBQTJCRCxPQTdCRDtBQStCQW5CLE1BQUFBLFNBQVMsQ0FBQ0UsYUFBRCxDQUFUO0FBRUFFLE1BQUFBLGVBQWUsR0FBRyxJQUFsQjs7QUFDQSxVQUFJRCxJQUFJLENBQUNlLElBQUwsS0FBYyxDQUFsQixFQUFxQjtBQUNuQmpCLFFBQUFBLFVBQVUsQ0FBQ2tCLEdBQVg7QUFDRDs7QUFDRCxhQUFPO0FBQ0xDLFFBQUFBLFdBREsseUJBQ1M7QUFDWmpCLFVBQUFBLElBQUksQ0FBQ1QsT0FBTCxDQUFhLFVBQUFXLEdBQUcsRUFBSTtBQUNsQkEsWUFBQUEsR0FBRyxDQUFDZSxXQUFKO0FBQ0QsV0FGRDtBQUdELFNBTEk7QUFNTEMsUUFBQUEsV0FOSyx5QkFNUztBQUNabEIsVUFBQUEsSUFBSSxDQUFDVCxPQUFMLENBQWEsVUFBQVcsR0FBRyxFQUFJO0FBQ2xCQSxZQUFBQSxHQUFHLENBQUNnQixXQUFKO0FBQ0QsV0FGRDtBQUdEO0FBVkksT0FBUDtBQVlEO0FBaEVnQixHQUFaLENBQVA7QUFrRUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTGl2ZVNldCBmcm9tICcuJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2U8VD4obGl2ZVNldHM6IEFycmF5PExpdmVTZXQ8VD4+KTogTGl2ZVNldDxUPiB7XG4gIHJldHVybiBuZXcgTGl2ZVNldCh7XG4gICAgc2NoZWR1bGVyOiBsaXZlU2V0c1swXSA/IGxpdmVTZXRzWzBdLmdldFNjaGVkdWxlcigpIDogdW5kZWZpbmVkLFxuICAgIHJlYWQoKSB7XG4gICAgICBjb25zdCBzID0gbmV3IFNldCgpO1xuICAgICAgbGl2ZVNldHMuZm9yRWFjaChsaXZlU2V0ID0+IHtcbiAgICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICBzLmFkZCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcztcbiAgICB9LFxuICAgIGxpc3RlbihzZXRWYWx1ZXMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnN0IGluaXRpYWxWYWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICBjb25zdCBzdWJzID0gbmV3IFNldCgpO1xuICAgICAgbGV0IGRvbmVTdWJzY3JpYmluZyA9IGZhbHNlO1xuICAgICAgbGl2ZVNldHMuZm9yRWFjaChsaXZlU2V0ID0+IHtcbiAgICAgICAgbGV0IHN1YjtcbiAgICAgICAgbGl2ZVNldC5zdWJzY3JpYmUoe1xuICAgICAgICAgIHN0YXJ0KF9zdWIpIHtcbiAgICAgICAgICAgIHN1YiA9IF9zdWI7XG4gICAgICAgICAgICBzdWJzLmFkZChzdWIpO1xuICAgICAgICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlcy5hZGQodmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXh0KGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaChjaGFuZ2UgPT4ge1xuICAgICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGQoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZShjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yKGVycikge1xuICAgICAgICAgICAgY29udHJvbGxlci5lcnJvcihlcnIpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgICAgICBzdWJzLmRlbGV0ZShzdWIpO1xuICAgICAgICAgICAgaWYgKGRvbmVTdWJzY3JpYmluZyAmJiBzdWJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHNldFZhbHVlcyhpbml0aWFsVmFsdWVzKTtcblxuICAgICAgZG9uZVN1YnNjcmliaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChzdWJzLnNpemUgPT09IDApIHtcbiAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIHN1YnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHB1bGxDaGFuZ2VzKCkge1xuICAgICAgICAgIHN1YnMuZm9yRWFjaChzdWIgPT4ge1xuICAgICAgICAgICAgc3ViLnB1bGxDaGFuZ2VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==

/***/ }),

/***/ "./node_modules/live-set/toValueObservable.js":
/*!****************************************************!*\
  !*** ./node_modules/live-set/toValueObservable.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toValueObservable;

var _ = _interopRequireDefault(__webpack_require__(/*! . */ "./node_modules/live-set/index.js"));

var _zenObservable = _interopRequireDefault(__webpack_require__(/*! zen-observable */ "./node_modules/zen-observable/index.js"));

function toValueObservable(liveSet) {
  return new _zenObservable.default(function (observer) {
    var resolvers = new Map();

    function addedItem(value) {
      var resolve;
      var removal = new Promise(function (_resolve) {
        resolve = _resolve;
      });
      resolvers.set(value, resolve);
      var valueWithRemoval = {
        value: value,
        removal: removal
      };
      observer.next(valueWithRemoval);
    }

    function removedItem(value) {
      var resolver = resolvers.get(value);
      if (!resolver) throw new Error('Resolver not found in map for value');
      resolvers.delete(value);
      resolver();
    }

    var sub = liveSet.subscribe({
      start: function start(sub) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = liveSet.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;
            if (sub.closed) break;
            addedItem(value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      },
      next: function next(changes) {
        changes.forEach(function (change) {
          if (change.type === 'add') {
            addedItem(change.value);
          } else if (change.type === 'remove') {
            removedItem(change.value);
          }
        });
      },
      error: function error(err) {
        observer.error(err);
      },
      complete: function complete() {
        observer.complete();
      }
    });
    return function () {
      sub.unsubscribe();
      resolvers.forEach(function (resolver) {
        resolver();
      });
    };
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90b1ZhbHVlT2JzZXJ2YWJsZS5qcyJdLCJuYW1lcyI6WyJ0b1ZhbHVlT2JzZXJ2YWJsZSIsImxpdmVTZXQiLCJPYnNlcnZhYmxlIiwib2JzZXJ2ZXIiLCJyZXNvbHZlcnMiLCJNYXAiLCJhZGRlZEl0ZW0iLCJ2YWx1ZSIsInJlc29sdmUiLCJyZW1vdmFsIiwiUHJvbWlzZSIsIl9yZXNvbHZlIiwic2V0IiwidmFsdWVXaXRoUmVtb3ZhbCIsIm5leHQiLCJyZW1vdmVkSXRlbSIsInJlc29sdmVyIiwiZ2V0IiwiRXJyb3IiLCJkZWxldGUiLCJzdWIiLCJzdWJzY3JpYmUiLCJzdGFydCIsInZhbHVlcyIsImNsb3NlZCIsImNoYW5nZXMiLCJmb3JFYWNoIiwiY2hhbmdlIiwidHlwZSIsImVycm9yIiwiZXJyIiwiY29tcGxldGUiLCJ1bnN1YnNjcmliZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7O0FBQ0E7O0FBT2UsU0FBU0EsaUJBQVQsQ0FBOEJDLE9BQTlCLEVBQW1EO0FBQ2hFLFNBQU8sSUFBSUMsc0JBQUosQ0FBZSxVQUFBQyxRQUFRLEVBQUk7QUFDaEMsUUFBTUMsU0FBMkIsR0FBRyxJQUFJQyxHQUFKLEVBQXBDOztBQUVBLGFBQVNDLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTZCO0FBQzNCLFVBQUlDLE9BQUo7QUFDQSxVQUFNQyxPQUFzQixHQUFHLElBQUlDLE9BQUosQ0FBWSxVQUFBQyxRQUFRLEVBQUk7QUFDckRILFFBQUFBLE9BQU8sR0FBR0csUUFBVjtBQUNELE9BRjhCLENBQS9CO0FBR0FQLE1BQUFBLFNBQVMsQ0FBQ1EsR0FBVixDQUFjTCxLQUFkLEVBQXNCQyxPQUF0QjtBQUNBLFVBQU1LLGdCQUFxQyxHQUFHO0FBQUNOLFFBQUFBLEtBQUssRUFBTEEsS0FBRDtBQUFRRSxRQUFBQSxPQUFPLEVBQVBBO0FBQVIsT0FBOUM7QUFDQU4sTUFBQUEsUUFBUSxDQUFDVyxJQUFULENBQWNELGdCQUFkO0FBQ0Q7O0FBRUQsYUFBU0UsV0FBVCxDQUFxQlIsS0FBckIsRUFBK0I7QUFDN0IsVUFBTVMsUUFBUSxHQUFHWixTQUFTLENBQUNhLEdBQVYsQ0FBY1YsS0FBZCxDQUFqQjtBQUNBLFVBQUksQ0FBQ1MsUUFBTCxFQUFlLE1BQU0sSUFBSUUsS0FBSixDQUFVLHFDQUFWLENBQU47QUFDZmQsTUFBQUEsU0FBUyxDQUFDZSxNQUFWLENBQWlCWixLQUFqQjtBQUNBUyxNQUFBQSxRQUFRO0FBQ1Q7O0FBRUQsUUFBTUksR0FBRyxHQUFHbkIsT0FBTyxDQUFDb0IsU0FBUixDQUFrQjtBQUM1QkMsTUFBQUEsS0FENEIsaUJBQ3RCRixHQURzQixFQUNqQjtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNULCtCQUFrQm5CLE9BQU8sQ0FBQ3NCLE1BQVIsRUFBbEIsOEhBQW9DO0FBQUEsZ0JBQTNCaEIsS0FBMkI7QUFDbEMsZ0JBQUlhLEdBQUcsQ0FBQ0ksTUFBUixFQUFnQjtBQUNoQmxCLFlBQUFBLFNBQVMsQ0FBQ0MsS0FBRCxDQUFUO0FBQ0Q7QUFKUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS1YsT0FOMkI7QUFPNUJPLE1BQUFBLElBUDRCLGdCQU92QlcsT0FQdUIsRUFPZDtBQUNaQSxRQUFBQSxPQUFPLENBQUNDLE9BQVIsQ0FBZ0IsVUFBQUMsTUFBTSxFQUFJO0FBQ3hCLGNBQUlBLE1BQU0sQ0FBQ0MsSUFBUCxLQUFnQixLQUFwQixFQUEyQjtBQUN6QnRCLFlBQUFBLFNBQVMsQ0FBQ3FCLE1BQU0sQ0FBQ3BCLEtBQVIsQ0FBVDtBQUNELFdBRkQsTUFFTyxJQUFJb0IsTUFBTSxDQUFDQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQ25DYixZQUFBQSxXQUFXLENBQUNZLE1BQU0sQ0FBQ3BCLEtBQVIsQ0FBWDtBQUNEO0FBQ0YsU0FORDtBQU9ELE9BZjJCO0FBZ0I1QnNCLE1BQUFBLEtBaEI0QixpQkFnQnRCQyxHQWhCc0IsRUFnQmpCO0FBQ1QzQixRQUFBQSxRQUFRLENBQUMwQixLQUFULENBQWVDLEdBQWY7QUFDRCxPQWxCMkI7QUFtQjVCQyxNQUFBQSxRQW5CNEIsc0JBbUJqQjtBQUNUNUIsUUFBQUEsUUFBUSxDQUFDNEIsUUFBVDtBQUNEO0FBckIyQixLQUFsQixDQUFaO0FBd0JBLFdBQU8sWUFBTTtBQUNYWCxNQUFBQSxHQUFHLENBQUNZLFdBQUo7QUFDQTVCLE1BQUFBLFNBQVMsQ0FBQ3NCLE9BQVYsQ0FBa0IsVUFBQVYsUUFBUSxFQUFJO0FBQzVCQSxRQUFBQSxRQUFRO0FBQ1QsT0FGRDtBQUdELEtBTEQ7QUFNRCxHQWxETSxDQUFQO0FBbUREIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IExpdmVTZXQgZnJvbSAnLic7XG5pbXBvcnQgT2JzZXJ2YWJsZSBmcm9tICd6ZW4tb2JzZXJ2YWJsZSc7XG5cbmV4cG9ydCB0eXBlIFZhbHVlV2l0aFJlbW92YWw8K1Q+ID0ge1xuICArdmFsdWU6IFQ7XG4gICtyZW1vdmFsOiBQcm9taXNlPHZvaWQ+O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9WYWx1ZU9ic2VydmFibGU8VD4obGl2ZVNldDogTGl2ZVNldDxUPikge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzZXJ2ZXIgPT4ge1xuICAgIGNvbnN0IHJlc29sdmVyczogTWFwPFQsICgpPT52b2lkPiA9IG5ldyBNYXAoKTtcblxuICAgIGZ1bmN0aW9uIGFkZGVkSXRlbSh2YWx1ZTogVCkge1xuICAgICAgbGV0IHJlc29sdmU7XG4gICAgICBjb25zdCByZW1vdmFsOiBQcm9taXNlPHZvaWQ+ID0gbmV3IFByb21pc2UoX3Jlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlID0gX3Jlc29sdmU7XG4gICAgICB9KTtcbiAgICAgIHJlc29sdmVycy5zZXQodmFsdWUsIChyZXNvbHZlOmFueSkpO1xuICAgICAgY29uc3QgdmFsdWVXaXRoUmVtb3ZhbDogVmFsdWVXaXRoUmVtb3ZhbDxUPiA9IHt2YWx1ZSwgcmVtb3ZhbH07XG4gICAgICBvYnNlcnZlci5uZXh0KHZhbHVlV2l0aFJlbW92YWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZWRJdGVtKHZhbHVlOiBUKSB7XG4gICAgICBjb25zdCByZXNvbHZlciA9IHJlc29sdmVycy5nZXQodmFsdWUpO1xuICAgICAgaWYgKCFyZXNvbHZlcikgdGhyb3cgbmV3IEVycm9yKCdSZXNvbHZlciBub3QgZm91bmQgaW4gbWFwIGZvciB2YWx1ZScpO1xuICAgICAgcmVzb2x2ZXJzLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICByZXNvbHZlcigpO1xuICAgIH1cblxuICAgIGNvbnN0IHN1YiA9IGxpdmVTZXQuc3Vic2NyaWJlKHtcbiAgICAgIHN0YXJ0KHN1Yikge1xuICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiBsaXZlU2V0LnZhbHVlcygpKSB7XG4gICAgICAgICAgaWYgKHN1Yi5jbG9zZWQpIGJyZWFrO1xuICAgICAgICAgIGFkZGVkSXRlbSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBuZXh0KGNoYW5nZXMpIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGNoYW5nZSA9PiB7XG4gICAgICAgICAgaWYgKGNoYW5nZS50eXBlID09PSAnYWRkJykge1xuICAgICAgICAgICAgYWRkZWRJdGVtKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgIHJlbW92ZWRJdGVtKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBlcnJvcihlcnIpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIHJlc29sdmVycy5mb3JFYWNoKHJlc29sdmVyID0+IHtcbiAgICAgICAgcmVzb2x2ZXIoKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xufVxuIl19

/***/ }),

/***/ "./node_modules/live-set/transduce.js":
/*!********************************************!*\
  !*** ./node_modules/live-set/transduce.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transduce;

var _ = _interopRequireDefault(__webpack_require__(/*! . */ "./node_modules/live-set/index.js"));

var arrayXf = {
  '@@transducer/init': function transducerInit() {
    return [];
  },
  '@@transducer/step': function transducerStep(res, input) {
    res.push(input);
    return res;
  },
  '@@transducer/result': function transducerResult(input) {
    return input;
  }
};

function transduce(liveSet, transducer) {
  function step(xform, inputValue) {
    var addsComplete = false;
    var outputValues;
    var ret = xform['@@transducer/step']([], inputValue);

    if (ret && ret['@@transducer/reduced']) {
      outputValues = ret['@@transducer/value'];
      addsComplete = true;
    } else {
      outputValues = ret;
    }

    return {
      outputValues: outputValues,
      addsComplete: addsComplete
    };
  }

  function valuesAndContext() {
    var inputToOutputValues = new Map();
    var xform = transducer(arrayXf);
    var addsComplete = false;
    var values = new Set(xform['@@transducer/init']());
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = liveSet.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        var _step2 = step(xform, value),
            outputValues = _step2.outputValues,
            _addsComplete = _step2.addsComplete;

        inputToOutputValues.set(value, outputValues);

        for (var i = 0, len = outputValues.length; i < len; i++) {
          values.add(outputValues[i]);
        }

        if (_addsComplete) {
          addsComplete = true;
          xform['@@transducer/result']([]).forEach(function (value) {
            values.add(value);
          });
          break;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return {
      values: values,
      inputToOutputValues: inputToOutputValues,
      xform: xform,
      addsComplete: addsComplete
    };
  }

  return new _.default({
    scheduler: liveSet.getScheduler(),
    read: function read() {
      return valuesAndContext().values;
    },
    listen: function listen(setValues, controller) {
      var inputToOutputValues, xform, addsComplete;
      var sub = liveSet.subscribe({
        start: function start() {
          var ret = valuesAndContext();
          setValues(ret.values);
          inputToOutputValues = ret.inputToOutputValues;
          xform = ret.xform;
          addsComplete = ret.addsComplete;
        },
        next: function next(changes) {
          for (var i = 0, len = changes.length; i < len; i++) {
            var change = changes[i];

            if (change.type === 'add') {
              if (!addsComplete) {
                var value = change.value;

                var _step3 = step(xform, value),
                    outputValues = _step3.outputValues,
                    _addsComplete = _step3.addsComplete;

                inputToOutputValues.set(value, outputValues);

                for (var _i = 0, _len = outputValues.length; _i < _len; _i++) {
                  controller.add(outputValues[_i]);
                }

                if (_addsComplete) {
                  addsComplete = true;
                  xform['@@transducer/result']([]).forEach(function (endValue) {
                    controller.add(endValue);
                  });
                }
              }
            } else if (change.type === 'remove') {
              var _value = change.value;
              var list = inputToOutputValues.get(_value);
              if (!list) throw new Error('value had not been added');
              list.forEach(function (transformedValue) {
                controller.remove(transformedValue);
              });
              inputToOutputValues.delete(_value);
            }
          }
        },
        error: function error(err) {
          controller.error(err);
        },
        complete: function complete() {
          controller.end();
        }
      });
      return sub;
    }
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy90cmFuc2R1Y2UuanMiXSwibmFtZXMiOlsiYXJyYXlYZiIsInJlcyIsImlucHV0IiwicHVzaCIsInRyYW5zZHVjZSIsImxpdmVTZXQiLCJ0cmFuc2R1Y2VyIiwic3RlcCIsInhmb3JtIiwiaW5wdXRWYWx1ZSIsImFkZHNDb21wbGV0ZSIsIm91dHB1dFZhbHVlcyIsInJldCIsInZhbHVlc0FuZENvbnRleHQiLCJpbnB1dFRvT3V0cHV0VmFsdWVzIiwiTWFwIiwidmFsdWVzIiwiU2V0IiwidmFsdWUiLCJfYWRkc0NvbXBsZXRlIiwic2V0IiwiaSIsImxlbiIsImxlbmd0aCIsImFkZCIsImZvckVhY2giLCJMaXZlU2V0Iiwic2NoZWR1bGVyIiwiZ2V0U2NoZWR1bGVyIiwicmVhZCIsImxpc3RlbiIsInNldFZhbHVlcyIsImNvbnRyb2xsZXIiLCJzdWIiLCJzdWJzY3JpYmUiLCJzdGFydCIsIm5leHQiLCJjaGFuZ2VzIiwiY2hhbmdlIiwidHlwZSIsImVuZFZhbHVlIiwibGlzdCIsImdldCIsIkVycm9yIiwidHJhbnNmb3JtZWRWYWx1ZSIsInJlbW92ZSIsImRlbGV0ZSIsImVycm9yIiwiZXJyIiwiY29tcGxldGUiLCJlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOztBQUVBLElBQU1BLE9BQU8sR0FBRztBQUNkLHFCQURjLDRCQUNRO0FBQ3BCLFdBQU8sRUFBUDtBQUNELEdBSGE7QUFJZCxxQkFKYywwQkFJTUMsR0FKTixFQUlXQyxLQUpYLEVBSWtCO0FBQzlCRCxJQUFBQSxHQUFHLENBQUNFLElBQUosQ0FBU0QsS0FBVDtBQUNBLFdBQU9ELEdBQVA7QUFDRCxHQVBhO0FBUWQsdUJBUmMsNEJBUVFDLEtBUlIsRUFRZTtBQUMzQixXQUFPQSxLQUFQO0FBQ0Q7QUFWYSxDQUFoQjs7QUFhZSxTQUFTRSxTQUFULENBQW1CQyxPQUFuQixFQUEwQ0MsVUFBMUMsRUFBOEU7QUFDM0YsV0FBU0MsSUFBVCxDQUFjQyxLQUFkLEVBQTZCQyxVQUE3QixFQUdFO0FBQ0EsUUFBSUMsWUFBWSxHQUFHLEtBQW5CO0FBQ0EsUUFBSUMsWUFBSjtBQUNBLFFBQU1DLEdBQUcsR0FBR0osS0FBSyxDQUFDLG1CQUFELENBQUwsQ0FBMkIsRUFBM0IsRUFBK0JDLFVBQS9CLENBQVo7O0FBQ0EsUUFBSUcsR0FBRyxJQUFJQSxHQUFHLENBQUMsc0JBQUQsQ0FBZCxFQUF3QztBQUN0Q0QsTUFBQUEsWUFBWSxHQUFHQyxHQUFHLENBQUMsb0JBQUQsQ0FBbEI7QUFDQUYsTUFBQUEsWUFBWSxHQUFHLElBQWY7QUFDRCxLQUhELE1BR087QUFDTEMsTUFBQUEsWUFBWSxHQUFHQyxHQUFmO0FBQ0Q7O0FBQ0QsV0FBTztBQUNMRCxNQUFBQSxZQUFZLEVBQVpBLFlBREs7QUFFTEQsTUFBQUEsWUFBWSxFQUFaQTtBQUZLLEtBQVA7QUFJRDs7QUFTRCxXQUFTRyxnQkFBVCxHQUE4QztBQUM1QyxRQUFNQyxtQkFBbUIsR0FBRyxJQUFJQyxHQUFKLEVBQTVCO0FBQ0EsUUFBTVAsS0FBSyxHQUFHRixVQUFVLENBQUNOLE9BQUQsQ0FBeEI7QUFDQSxRQUFJVSxZQUFZLEdBQUcsS0FBbkI7QUFDQSxRQUFNTSxNQUFNLEdBQUcsSUFBSUMsR0FBSixDQUFRVCxLQUFLLENBQUMsbUJBQUQsQ0FBTCxFQUFSLENBQWY7QUFKNEM7QUFBQTtBQUFBOztBQUFBO0FBSzVDLDJCQUFrQkgsT0FBTyxDQUFDVyxNQUFSLEVBQWxCLDhIQUFvQztBQUFBLFlBQTNCRSxLQUEyQjs7QUFBQSxxQkFDa0JYLElBQUksQ0FBQ0MsS0FBRCxFQUFRVSxLQUFSLENBRHRCO0FBQUEsWUFDM0JQLFlBRDJCLFVBQzNCQSxZQUQyQjtBQUFBLFlBQ0NRLGFBREQsVUFDYlQsWUFEYTs7QUFFbENJLFFBQUFBLG1CQUFtQixDQUFDTSxHQUFwQixDQUF3QkYsS0FBeEIsRUFBK0JQLFlBQS9COztBQUNBLGFBQUssSUFBSVUsQ0FBQyxHQUFDLENBQU4sRUFBUUMsR0FBRyxHQUFDWCxZQUFZLENBQUNZLE1BQTlCLEVBQXNDRixDQUFDLEdBQUNDLEdBQXhDLEVBQTZDRCxDQUFDLEVBQTlDLEVBQWtEO0FBQ2hETCxVQUFBQSxNQUFNLENBQUNRLEdBQVAsQ0FBV2IsWUFBWSxDQUFDVSxDQUFELENBQXZCO0FBQ0Q7O0FBQ0QsWUFBSUYsYUFBSixFQUFtQjtBQUNqQlQsVUFBQUEsWUFBWSxHQUFHLElBQWY7QUFDQUYsVUFBQUEsS0FBSyxDQUFDLHFCQUFELENBQUwsQ0FBNkIsRUFBN0IsRUFBaUNpQixPQUFqQyxDQUF5QyxVQUFBUCxLQUFLLEVBQUk7QUFDaERGLFlBQUFBLE1BQU0sQ0FBQ1EsR0FBUCxDQUFXTixLQUFYO0FBQ0QsV0FGRDtBQUdBO0FBQ0Q7QUFDRjtBQWxCMkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFtQjVDLFdBQU87QUFDTEYsTUFBQUEsTUFBTSxFQUFOQSxNQURLO0FBRUxGLE1BQUFBLG1CQUFtQixFQUFuQkEsbUJBRks7QUFHTE4sTUFBQUEsS0FBSyxFQUFMQSxLQUhLO0FBSUxFLE1BQUFBLFlBQVksRUFBWkE7QUFKSyxLQUFQO0FBTUQ7O0FBRUQsU0FBTyxJQUFJZ0IsU0FBSixDQUFZO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUV0QixPQUFPLENBQUN1QixZQUFSLEVBRE07QUFFakJDLElBQUFBLElBQUksRUFBRTtBQUFBLGFBQU1oQixnQkFBZ0IsR0FBR0csTUFBekI7QUFBQSxLQUZXO0FBR2pCYyxJQUFBQSxNQUhpQixrQkFHVkMsU0FIVSxFQUdDQyxVQUhELEVBR2E7QUFDNUIsVUFBSWxCLG1CQUFKLEVBQXlCTixLQUF6QixFQUFnQ0UsWUFBaEM7QUFDQSxVQUFNdUIsR0FBRyxHQUFHNUIsT0FBTyxDQUFDNkIsU0FBUixDQUFrQjtBQUM1QkMsUUFBQUEsS0FENEIsbUJBQ3BCO0FBQ04sY0FBTXZCLEdBQUcsR0FBR0MsZ0JBQWdCLEVBQTVCO0FBQ0FrQixVQUFBQSxTQUFTLENBQUNuQixHQUFHLENBQUNJLE1BQUwsQ0FBVDtBQUNBRixVQUFBQSxtQkFBbUIsR0FBR0YsR0FBRyxDQUFDRSxtQkFBMUI7QUFDQU4sVUFBQUEsS0FBSyxHQUFHSSxHQUFHLENBQUNKLEtBQVo7QUFDQUUsVUFBQUEsWUFBWSxHQUFHRSxHQUFHLENBQUNGLFlBQW5CO0FBQ0QsU0FQMkI7QUFRNUIwQixRQUFBQSxJQVI0QixnQkFRdkJDLE9BUnVCLEVBUWQ7QUFDWixlQUFLLElBQUloQixDQUFDLEdBQUMsQ0FBTixFQUFRQyxHQUFHLEdBQUNlLE9BQU8sQ0FBQ2QsTUFBekIsRUFBaUNGLENBQUMsR0FBQ0MsR0FBbkMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDM0MsZ0JBQU1pQixNQUFNLEdBQUdELE9BQU8sQ0FBQ2hCLENBQUQsQ0FBdEI7O0FBQ0EsZ0JBQUlpQixNQUFNLENBQUNDLElBQVAsS0FBZ0IsS0FBcEIsRUFBMkI7QUFDekIsa0JBQUksQ0FBQzdCLFlBQUwsRUFBbUI7QUFBQSxvQkFDVlEsS0FEVSxHQUNEb0IsTUFEQyxDQUNWcEIsS0FEVTs7QUFBQSw2QkFFbUNYLElBQUksQ0FBQ0MsS0FBRCxFQUFRVSxLQUFSLENBRnZDO0FBQUEsb0JBRVZQLFlBRlUsVUFFVkEsWUFGVTtBQUFBLG9CQUVrQlEsYUFGbEIsVUFFSVQsWUFGSjs7QUFHakJJLGdCQUFBQSxtQkFBbUIsQ0FBQ00sR0FBcEIsQ0FBd0JGLEtBQXhCLEVBQStCUCxZQUEvQjs7QUFDQSxxQkFBSyxJQUFJVSxFQUFDLEdBQUMsQ0FBTixFQUFRQyxJQUFHLEdBQUNYLFlBQVksQ0FBQ1ksTUFBOUIsRUFBc0NGLEVBQUMsR0FBQ0MsSUFBeEMsRUFBNkNELEVBQUMsRUFBOUMsRUFBa0Q7QUFDaERXLGtCQUFBQSxVQUFVLENBQUNSLEdBQVgsQ0FBZWIsWUFBWSxDQUFDVSxFQUFELENBQTNCO0FBQ0Q7O0FBQ0Qsb0JBQUlGLGFBQUosRUFBbUI7QUFDakJULGtCQUFBQSxZQUFZLEdBQUcsSUFBZjtBQUNBRixrQkFBQUEsS0FBSyxDQUFDLHFCQUFELENBQUwsQ0FBNkIsRUFBN0IsRUFBaUNpQixPQUFqQyxDQUF5QyxVQUFBZSxRQUFRLEVBQUk7QUFDbkRSLG9CQUFBQSxVQUFVLENBQUNSLEdBQVgsQ0FBZWdCLFFBQWY7QUFDRCxtQkFGRDtBQUdEO0FBQ0Y7QUFDRixhQWZELE1BZU8sSUFBSUYsTUFBTSxDQUFDQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQUEsa0JBQzVCckIsTUFENEIsR0FDbkJvQixNQURtQixDQUM1QnBCLEtBRDRCO0FBRW5DLGtCQUFNdUIsSUFBSSxHQUFHM0IsbUJBQW1CLENBQUM0QixHQUFwQixDQUF3QnhCLE1BQXhCLENBQWI7QUFDQSxrQkFBSSxDQUFDdUIsSUFBTCxFQUFXLE1BQU0sSUFBSUUsS0FBSixDQUFVLDBCQUFWLENBQU47QUFDWEYsY0FBQUEsSUFBSSxDQUFDaEIsT0FBTCxDQUFhLFVBQUFtQixnQkFBZ0IsRUFBSTtBQUMvQlosZ0JBQUFBLFVBQVUsQ0FBQ2EsTUFBWCxDQUFrQkQsZ0JBQWxCO0FBQ0QsZUFGRDtBQUdBOUIsY0FBQUEsbUJBQW1CLENBQUNnQyxNQUFwQixDQUEyQjVCLE1BQTNCO0FBQ0Q7QUFDRjtBQUNGLFNBcEMyQjtBQXFDNUI2QixRQUFBQSxLQXJDNEIsaUJBcUN0QkMsR0FyQ3NCLEVBcUNqQjtBQUNUaEIsVUFBQUEsVUFBVSxDQUFDZSxLQUFYLENBQWlCQyxHQUFqQjtBQUNELFNBdkMyQjtBQXdDNUJDLFFBQUFBLFFBeEM0QixzQkF3Q2pCO0FBQ1RqQixVQUFBQSxVQUFVLENBQUNrQixHQUFYO0FBQ0Q7QUExQzJCLE9BQWxCLENBQVo7QUE2Q0EsYUFBT2pCLEdBQVA7QUFDRDtBQW5EZ0IsR0FBWixDQUFQO0FBcUREIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuaW1wb3J0IExpdmVTZXQgZnJvbSAnLic7XG5cbmNvbnN0IGFycmF5WGYgPSB7XG4gICdAQHRyYW5zZHVjZXIvaW5pdCcoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICAnQEB0cmFuc2R1Y2VyL3N0ZXAnKHJlcywgaW5wdXQpIHtcbiAgICByZXMucHVzaChpbnB1dCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcbiAgJ0BAdHJhbnNkdWNlci9yZXN1bHQnKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2R1Y2UobGl2ZVNldDogTGl2ZVNldDxhbnk+LCB0cmFuc2R1Y2VyOiBGdW5jdGlvbik6IExpdmVTZXQ8YW55PiB7XG4gIGZ1bmN0aW9uIHN0ZXAoeGZvcm06IE9iamVjdCwgaW5wdXRWYWx1ZTogYW55KToge1xuICAgIG91dHB1dFZhbHVlczogQXJyYXk8YW55PjtcbiAgICBhZGRzQ29tcGxldGU6IGJvb2xlYW47XG4gIH0ge1xuICAgIGxldCBhZGRzQ29tcGxldGUgPSBmYWxzZTtcbiAgICBsZXQgb3V0cHV0VmFsdWVzO1xuICAgIGNvbnN0IHJldCA9IHhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKFtdLCBpbnB1dFZhbHVlKTtcbiAgICBpZiAocmV0ICYmIHJldFsnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgb3V0cHV0VmFsdWVzID0gcmV0WydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgIGFkZHNDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dFZhbHVlcyA9IHJldDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG91dHB1dFZhbHVlcyxcbiAgICAgIGFkZHNDb21wbGV0ZVxuICAgIH07XG4gIH1cblxuICB0eXBlIFZhbHVlc0FuZENvbnRleHQgPSB7XG4gICAgdmFsdWVzOiBTZXQ8YW55PjtcbiAgICBpbnB1dFRvT3V0cHV0VmFsdWVzOiBNYXA8YW55LCBBcnJheTxhbnk+PjtcbiAgICB4Zm9ybTogT2JqZWN0O1xuICAgIGFkZHNDb21wbGV0ZTogYm9vbGVhbjtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXNBbmRDb250ZXh0KCk6IFZhbHVlc0FuZENvbnRleHQge1xuICAgIGNvbnN0IGlucHV0VG9PdXRwdXRWYWx1ZXMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgeGZvcm0gPSB0cmFuc2R1Y2VyKGFycmF5WGYpO1xuICAgIGxldCBhZGRzQ29tcGxldGUgPSBmYWxzZTtcbiAgICBjb25zdCB2YWx1ZXMgPSBuZXcgU2V0KHhmb3JtWydAQHRyYW5zZHVjZXIvaW5pdCddKCkpO1xuICAgIGZvciAobGV0IHZhbHVlIG9mIGxpdmVTZXQudmFsdWVzKCkpIHtcbiAgICAgIGNvbnN0IHtvdXRwdXRWYWx1ZXMsIGFkZHNDb21wbGV0ZTogX2FkZHNDb21wbGV0ZX0gPSBzdGVwKHhmb3JtLCB2YWx1ZSk7XG4gICAgICBpbnB1dFRvT3V0cHV0VmFsdWVzLnNldCh2YWx1ZSwgb3V0cHV0VmFsdWVzKTtcbiAgICAgIGZvciAobGV0IGk9MCxsZW49b3V0cHV0VmFsdWVzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICB2YWx1ZXMuYWRkKG91dHB1dFZhbHVlc1tpXSk7XG4gICAgICB9XG4gICAgICBpZiAoX2FkZHNDb21wbGV0ZSkge1xuICAgICAgICBhZGRzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKFtdKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICB2YWx1ZXMuYWRkKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWVzLFxuICAgICAgaW5wdXRUb091dHB1dFZhbHVlcyxcbiAgICAgIHhmb3JtLFxuICAgICAgYWRkc0NvbXBsZXRlXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBuZXcgTGl2ZVNldCh7XG4gICAgc2NoZWR1bGVyOiBsaXZlU2V0LmdldFNjaGVkdWxlcigpLFxuICAgIHJlYWQ6ICgpID0+IHZhbHVlc0FuZENvbnRleHQoKS52YWx1ZXMsXG4gICAgbGlzdGVuKHNldFZhbHVlcywgY29udHJvbGxlcikge1xuICAgICAgbGV0IGlucHV0VG9PdXRwdXRWYWx1ZXMsIHhmb3JtLCBhZGRzQ29tcGxldGU7XG4gICAgICBjb25zdCBzdWIgPSBsaXZlU2V0LnN1YnNjcmliZSh7XG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgIGNvbnN0IHJldCA9IHZhbHVlc0FuZENvbnRleHQoKTtcbiAgICAgICAgICBzZXRWYWx1ZXMocmV0LnZhbHVlcyk7XG4gICAgICAgICAgaW5wdXRUb091dHB1dFZhbHVlcyA9IHJldC5pbnB1dFRvT3V0cHV0VmFsdWVzO1xuICAgICAgICAgIHhmb3JtID0gcmV0Lnhmb3JtO1xuICAgICAgICAgIGFkZHNDb21wbGV0ZSA9IHJldC5hZGRzQ29tcGxldGU7XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQoY2hhbmdlcykge1xuICAgICAgICAgIGZvciAobGV0IGk9MCxsZW49Y2hhbmdlcy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZSA9IGNoYW5nZXNbaV07XG4gICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgIGlmICghYWRkc0NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge3ZhbHVlfSA9IGNoYW5nZTtcbiAgICAgICAgICAgICAgICBjb25zdCB7b3V0cHV0VmFsdWVzLCBhZGRzQ29tcGxldGU6IF9hZGRzQ29tcGxldGV9ID0gc3RlcCh4Zm9ybSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGlucHV0VG9PdXRwdXRWYWx1ZXMuc2V0KHZhbHVlLCBvdXRwdXRWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MCxsZW49b3V0cHV0VmFsdWVzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGQob3V0cHV0VmFsdWVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF9hZGRzQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgIGFkZHNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKFtdKS5mb3JFYWNoKGVuZFZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGQoZW5kVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZS50eXBlID09PSAncmVtb3ZlJykge1xuICAgICAgICAgICAgICBjb25zdCB7dmFsdWV9ID0gY2hhbmdlO1xuICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gaW5wdXRUb091dHB1dFZhbHVlcy5nZXQodmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoIWxpc3QpIHRocm93IG5ldyBFcnJvcigndmFsdWUgaGFkIG5vdCBiZWVuIGFkZGVkJyk7XG4gICAgICAgICAgICAgIGxpc3QuZm9yRWFjaCh0cmFuc2Zvcm1lZFZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSh0cmFuc2Zvcm1lZFZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlucHV0VG9PdXRwdXRWYWx1ZXMuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yKGVycikge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGUoKSB7XG4gICAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuICB9KTtcbn1cbiJdfQ==

/***/ }),

/***/ "./node_modules/matches-selector-ng/js/index.js":
/*!******************************************************!*\
  !*** ./node_modules/matches-selector-ng/js/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

exports.__esModule = true;
exports.default = match;
var proto = global.Element && global.Element.prototype;
var vendor = proto && (proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector);

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var parentNode = el.parentNode;

  if (parentNode && typeof parentNode.querySelectorAll === 'function') {
    var nodes = parentNode.querySelectorAll(selector);

    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] === el) return true;
    }
  }

  return false;
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJwcm90byIsImdsb2JhbCIsIkVsZW1lbnQiLCJwcm90b3R5cGUiLCJ2ZW5kb3IiLCJtYXRjaGVzIiwibWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwibW96TWF0Y2hlc1NlbGVjdG9yIiwibXNNYXRjaGVzU2VsZWN0b3IiLCJvTWF0Y2hlc1NlbGVjdG9yIiwibWF0Y2giLCJlbCIsInNlbGVjdG9yIiwiY2FsbCIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwibm9kZXMiLCJpIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxNQUFNLENBQUNDLE9BQVAsSUFBa0JELE1BQU0sQ0FBQ0MsT0FBUCxDQUFlQyxTQUEvQztBQUNBLElBQU1DLE1BQU0sR0FBR0osS0FBSyxLQUFLQSxLQUFLLENBQUNLLE9BQU4sSUFDcEJMLEtBQUssQ0FBQ00sZUFEYyxJQUVwQk4sS0FBSyxDQUFDTyxxQkFGYyxJQUdwQlAsS0FBSyxDQUFDUSxrQkFIYyxJQUlwQlIsS0FBSyxDQUFDUyxpQkFKYyxJQUtwQlQsS0FBSyxDQUFDVSxnQkFMUyxDQUFwQjs7QUFPZSxTQUFTQyxLQUFULENBQWVDLEVBQWYsRUFBZ0NDLFFBQWhDLEVBQTJEO0FBQ3hFLE1BQUlULE1BQUosRUFBWSxPQUFPQSxNQUFNLENBQUNVLElBQVAsQ0FBWUYsRUFBWixFQUFnQkMsUUFBaEIsQ0FBUDtBQUQ0RCxNQUVqRUUsVUFGaUUsR0FFbkRILEVBRm1ELENBRWpFRyxVQUZpRTs7QUFHeEUsTUFBSUEsVUFBVSxJQUFJLE9BQVFBLFVBQUQsQ0FBaUJDLGdCQUF4QixLQUE2QyxVQUEvRCxFQUEyRTtBQUN6RSxRQUFNQyxLQUFLLEdBQUlGLFVBQUQsQ0FBaUJDLGdCQUFqQixDQUFrQ0gsUUFBbEMsQ0FBZDs7QUFDQSxTQUFLLElBQUlLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELEtBQUssQ0FBQ0UsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDckMsVUFBSUQsS0FBSyxDQUFDQyxDQUFELENBQUwsS0FBYU4sRUFBakIsRUFBcUIsT0FBTyxJQUFQO0FBQ3RCO0FBQ0Y7O0FBQ0QsU0FBTyxLQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5jb25zdCBwcm90byA9IGdsb2JhbC5FbGVtZW50ICYmIGdsb2JhbC5FbGVtZW50LnByb3RvdHlwZTtcbmNvbnN0IHZlbmRvciA9IHByb3RvICYmIChwcm90by5tYXRjaGVzXG4gIHx8IHByb3RvLm1hdGNoZXNTZWxlY3RvclxuICB8fCBwcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3JcbiAgfHwgcHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yXG4gIHx8IHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yXG4gIHx8IHByb3RvLm9NYXRjaGVzU2VsZWN0b3IpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRjaChlbDogSFRNTEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKHZlbmRvcikgcmV0dXJuIHZlbmRvci5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gIGNvbnN0IHtwYXJlbnROb2RlfSA9IGVsO1xuICBpZiAocGFyZW50Tm9kZSAmJiB0eXBlb2YgKHBhcmVudE5vZGU6YW55KS5xdWVyeVNlbGVjdG9yQWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3Qgbm9kZXMgPSAocGFyZW50Tm9kZTphbnkpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChub2Rlc1tpXSA9PT0gZWwpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/page-parser-tree/js/createTransformer/createCssFn.js":
/*!***************************************************************************!*\
  !*** ./node_modules/page-parser-tree/js/createTransformer/createCssFn.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createCssFn;

var _matchesSelectorNg = _interopRequireDefault(__webpack_require__(/*! matches-selector-ng */ "./node_modules/matches-selector-ng/js/index.js"));

function createCssFn(selector) {
  return function (el) {
    return (0, _matchesSelectorNg["default"])(el, selector);
  };
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=createCssFn.js.map

/***/ }),

/***/ "./node_modules/page-parser-tree/js/createTransformer/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/page-parser-tree/js/createTransformer/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createTransformer;

var _transducers = _interopRequireDefault(__webpack_require__(/*! transducers.js */ "./node_modules/transducers.js/transducers.js"));

var _transduce = _interopRequireDefault(__webpack_require__(/*! live-set/transduce */ "./node_modules/live-set/transduce.js"));

var _filter = _interopRequireDefault(__webpack_require__(/*! live-set/filter */ "./node_modules/live-set/filter.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! live-set/merge */ "./node_modules/live-set/merge.js"));

var _createCssFn = _interopRequireDefault(__webpack_require__(/*! ./createCssFn */ "./node_modules/page-parser-tree/js/createTransformer/createCssFn.js"));

var _watchMutations = _interopRequireDefault(__webpack_require__(/*! ./watchMutations */ "./node_modules/page-parser-tree/js/createTransformer/watchMutations.js"));

var _watchFilteredChildren = _interopRequireDefault(__webpack_require__(/*! ./watchFilteredChildren */ "./node_modules/page-parser-tree/js/createTransformer/watchFilteredChildren.js"));

function createTransformer(scheduler, selectors) {
  var transformers = selectors.map(function (item) {
    if (typeof item === 'string') {
      var condFn = (0, _createCssFn["default"])(item);
      return function (liveSet) {
        return (0, _watchFilteredChildren["default"])(liveSet, condFn);
      };
    } else if (item.$or) {
      var _transformers = item.$or.map(function (s) {
        return createTransformer(scheduler, s);
      });

      return function (liveSet) {
        return (0, _merge["default"])(_transformers.map(function (transformer) {
          return transformer(liveSet);
        }));
      };
    } else if (item.$watch) {
      var _item$$watch = item.$watch,
          attributeFilter = _item$$watch.attributeFilter,
          cond = _item$$watch.cond;

      var _condFn = typeof cond === 'function' ? cond : (0, _createCssFn["default"])(cond);

      return function (liveSet) {
        return (0, _watchMutations["default"])(liveSet, attributeFilter, _condFn);
      };
    } else if (item.$log) {
      var $log = item.$log;

      var filterFn = function filterFn(value) {
        console.log($log, value.el); //eslint-disable-line no-console

        return true;
      };

      return function (liveSet) {
        return (0, _filter["default"])(liveSet, filterFn);
      };
    } else if (item.$filter) {
      var $filter = item.$filter;

      var _filterFn = function _filterFn(_ref) {
        var el = _ref.el;
        return $filter(el);
      };

      return function (liveSet) {
        return (0, _filter["default"])(liveSet, _filterFn);
      };
    } else if (item.$map) {
      var $map = item.$map;

      var transducer = _transducers["default"].compose(_transducers["default"].map(function (ec) {
        return {
          el: $map(ec.el),
          parents: ec.parents
        };
      }), _transducers["default"].filter(function (ec) {
        return ec.el != null;
      }));

      return function (liveSet) {
        return (0, _transduce["default"])(liveSet, transducer);
      };
    }

    throw new Error("Invalid selector item: ".concat(JSON.stringify(item)));
  });
  return transformers.reduce(function (combined, transformer) {
    return function (liveSet) {
      return transformer(combined(liveSet));
    };
  }, function (x) {
    return x;
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/page-parser-tree/js/createTransformer/watchFilteredChildren.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/page-parser-tree/js/createTransformer/watchFilteredChildren.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = watchFilteredChildren;

var _liveSet = _interopRequireDefault(__webpack_require__(/*! live-set */ "./node_modules/live-set/index.js"));

function watchFilteredChildren(input, condFn) {
  return new _liveSet["default"]({
    scheduler: input.getScheduler(),
    read: function read() {
      throw new Error();
    },
    listen: function listen(setValues, controller) {
      setValues(new Set());
      var inputEntries = new Map();
      var outputEcs = new Map();

      function newEc(ec) {
        function addedNode(child) {
          if (child.nodeType !== 1) return;
          /*:: if (!(child instanceof HTMLElement)) throw new Error() */

          if (condFn(child)) {
            var childEc = {
              el: child,
              parents: ec.parents
            };
            outputEcs.set(child, childEc);
            controller.add(childEc);
          }
        }

        function removedNode(child) {
          if (child.nodeType !== 1) return;
          /*:: if (!(child instanceof HTMLElement)) throw new Error() */

          var childEc = outputEcs.get(child);
          if (!childEc) return;
          outputEcs["delete"](child);
          controller.remove(childEc);
        }

        function changesHandler(mutations) {
          if (mutations.length > 1) {
            // If any removals are followed by a re-add, then drop the pair.
            var removedEls = new Set();
            var addedEls = [];
            mutations.forEach(function (_ref) {
              var addedNodes = _ref.addedNodes,
                  removedNodes = _ref.removedNodes;

              for (var i = 0, len = removedNodes.length; i < len; i++) {
                var _el = removedNodes[i];
                if (_el.nodeType !== 1) continue;
                removedEls.add(removedNodes[i]);
              }

              for (var _i = 0, _len = addedNodes.length; _i < _len; _i++) {
                var _el2 = addedNodes[_i];
                if (_el2.nodeType !== 1) continue;

                if (removedEls.has(_el2)) {
                  removedEls["delete"](_el2);
                } else {
                  addedEls.push(_el2);
                }
              }
            });
            addedEls.forEach(addedNode);
            removedEls.forEach(removedNode);
          } else {
            mutations.forEach(function (mutation) {
              Array.prototype.forEach.call(mutation.addedNodes, addedNode);
              Array.prototype.forEach.call(mutation.removedNodes, removedNode);
            });
          }
        }

        Array.prototype.forEach.call(ec.el.children, addedNode);
        var observer = new MutationObserver(changesHandler);
        observer.observe(ec.el, {
          childList: true
        });
        inputEntries.set(ec, {
          observer: observer,
          removedNode: removedNode
        });
      }

      function removedEc(ec) {
        var entry = inputEntries.get(ec);
        if (!entry) throw new Error('Should not happen: Unseen ElementContext removed');
        entry.observer.takeRecords().forEach(function (mutation) {
          Array.prototype.forEach.call(mutation.removedNodes, entry.removedNode);
        });
        entry.observer.disconnect();
        Array.prototype.forEach.call(ec.el.children, entry.removedNode);
        inputEntries["delete"](ec);
      }

      var sub = input.subscribe({
        start: function start() {
          input.values().forEach(newEc);
        },
        next: function next(changes) {
          changes.forEach(function (change) {
            if (change.type === 'add') {
              newEc(change.value);
            } else if (change.type === 'remove') {
              removedEc(change.value);
            }
          });
        }
      });
      return {
        unsubscribe: function unsubscribe() {
          sub.unsubscribe();
          inputEntries.forEach(function (_ref2) {
            var observer = _ref2.observer;
            observer.disconnect();
          });
        },
        pullChanges: function pullChanges() {
          sub.pullChanges(); // Don't bother doing observer.takeRecords(), we don't need that in
          // PageParserTree for how we use pullChanges().
        }
      };
    }
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=watchFilteredChildren.js.map

/***/ }),

/***/ "./node_modules/page-parser-tree/js/createTransformer/watchMutations.js":
/*!******************************************************************************!*\
  !*** ./node_modules/page-parser-tree/js/createTransformer/watchMutations.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = watchMutations;

var _liveSet = _interopRequireDefault(__webpack_require__(/*! live-set */ "./node_modules/live-set/index.js"));

function watchMutations(input, attributeFilter, condFn) {
  return new _liveSet["default"]({
    scheduler: input.getScheduler(),
    read: function read() {
      throw new Error();
    },
    listen: function listen(setValues, controller) {
      setValues(new Set());
      var entries = new Map();

      function newEc(ec) {
        var mo = new MutationObserver(function (changes) {
          if (changes.length === 0) return;

          if (condFn(ec.el)) {
            if (!entry.passed) {
              entry.passed = true;
              controller.add(ec);
            }
          } else {
            if (entry.passed) {
              entry.passed = false;
              controller.remove(ec);
            }
          }
        });
        var entry = {
          mo: mo,
          passed: false
        };

        if (condFn(ec.el)) {
          entry.passed = true;
          controller.add(ec);
        }

        mo.observe(ec.el, {
          attributes: true,
          attributeFilter: attributeFilter
        });
        entries.set(ec, entry);
      }

      function removedEc(ec) {
        var entry = entries.get(ec);
        if (!entry) throw new Error('Should not happen: Unseen ElementContext removed');
        entry.mo.disconnect();

        if (entry.passed) {
          controller.remove(ec);
        }

        entries["delete"](ec);
      }

      var sub = input.subscribe({
        start: function start() {
          input.values().forEach(newEc);
        },
        next: function next(changes) {
          changes.forEach(function (change) {
            if (change.type === 'add') {
              newEc(change.value);
            } else if (change.type === 'remove') {
              removedEc(change.value);
            }
          });
        }
      });
      return {
        unsubscribe: function unsubscribe() {
          sub.unsubscribe();
          entries.forEach(function (_ref) {
            var mo = _ref.mo;
            mo.disconnect();
          });
        },
        pullChanges: function pullChanges() {
          sub.pullChanges(); // Don't bother doing observer.takeRecords(), we don't need that in
          // PageParserTree for how we use pullChanges().
        }
      };
    }
  });
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=watchMutations.js.map

/***/ }),

/***/ "./node_modules/page-parser-tree/js/index.js":
/*!***************************************************!*\
  !*** ./node_modules/page-parser-tree/js/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _liveSet = _interopRequireDefault(__webpack_require__(/*! live-set */ "./node_modules/live-set/index.js"));

var _merge = _interopRequireDefault(__webpack_require__(/*! live-set/merge */ "./node_modules/live-set/merge.js"));

var _flatMapR = _interopRequireDefault(__webpack_require__(/*! live-set/flatMapR */ "./node_modules/live-set/flatMapR.js"));

var _Scheduler = _interopRequireDefault(__webpack_require__(/*! live-set/Scheduler */ "./node_modules/live-set/Scheduler.js"));

var _tagTree = __webpack_require__(/*! tag-tree */ "./node_modules/tag-tree/js/index.js");

var _watcherFinderMerger = _interopRequireDefault(__webpack_require__(/*! ./watcherFinderMerger */ "./node_modules/page-parser-tree/js/watcherFinderMerger.js"));

var _createTransformer = _interopRequireDefault(__webpack_require__(/*! ./createTransformer */ "./node_modules/page-parser-tree/js/createTransformer/index.js"));

function makeTagOptions(options) {
  var map = new Map();
  var list = [];
  Object.keys(options.tags).forEach(function (tag) {
    var tagOptions = options.tags[tag];
    var ownedBy = tagOptions.ownedBy;
    list.push({
      tag: tag,
      ownedBy: ownedBy
    });
    map.set(tag, tagOptions);
  });
  Object.keys(options.finders).concat(options.watchers.map(function (w) {
    return w.tag;
  })).forEach(function (tag) {
    if (!map.has(tag)) {
      map.set(tag, {
        ownedBy: []
      });
      list.push({
        tag: tag
      });
    }
  });
  return {
    map: map,
    list: list
  };
}

var PageParserTree =
/*#__PURE__*/
function () {
  function PageParserTree(root, options) {
    var _this = this;

    (0, _classCallCheck2["default"])(this, PageParserTree);
    (0, _defineProperty2["default"])(this, "tree", void 0);
    (0, _defineProperty2["default"])(this, "_scheduler", new _Scheduler["default"]());
    (0, _defineProperty2["default"])(this, "_treeController", void 0);
    (0, _defineProperty2["default"])(this, "_rootMatchedSet", void 0);
    (0, _defineProperty2["default"])(this, "_ecSources", void 0);
    (0, _defineProperty2["default"])(this, "_logError", void 0);
    (0, _defineProperty2["default"])(this, "_options", void 0);
    (0, _defineProperty2["default"])(this, "_tagOptions", void 0);
    (0, _defineProperty2["default"])(this, "_tagsList", void 0);
    (0, _defineProperty2["default"])(this, "_subscriptions", []);
    var rootEl;

    if (root.nodeType === Node.DOCUMENT_NODE) {
      rootEl = root.documentElement;
      if (!rootEl) throw new Error('missing documentElement');
    } else {
      rootEl = root;
    }

    this._options = options;

    this._logError = options.logError || function (err) {
      setTimeout(function () {
        throw err;
      }, 0);
    };

    var _makeTagOptions = makeTagOptions(this._options),
        tagOptionsMap = _makeTagOptions.map,
        tags = _makeTagOptions.list;

    this._tagOptions = tagOptionsMap;
    this._tagsList = tags;
    this.tree = new _tagTree.TagTree({
      root: rootEl,
      tags: tags,
      executor: function executor(controller) {
        _this._treeController = controller;
      }
    });
    this._rootMatchedSet = _liveSet["default"].constant(new Set([{
      el: this.tree.getValue(),
      parents: [{
        tag: null,
        node: this.tree
      }]
    }]), {
      scheduler: this._scheduler
    });

    this._setupWatchersAndFinders();
  }

  (0, _createClass2["default"])(PageParserTree, [{
    key: "_setupWatchersAndFinders",
    value: function _setupWatchersAndFinders() {
      var _this2 = this;

      var tagsWithWatchers = new Set();

      this._options.watchers.forEach(function (watcher) {
        tagsWithWatchers.add(watcher.tag);
      });

      this._ecSources = new Map(this._tagsList.map(function (_ref) {
        var tag = _ref.tag;

        var tagOptions = _this2._tagOptions.get(tag);

        if (!tagOptions) throw new Error();
        var ownedBy = new Set(tagOptions.ownedBy || []);

        var _LiveSet$active = _liveSet["default"].active(null, {
          scheduler: _this2._scheduler
        }),
            liveSet = _LiveSet$active.liveSet,
            controller = _LiveSet$active.controller;

        var combinedWatcherSet = tagsWithWatchers.has(tag) ? (0, _flatMapR["default"])(liveSet, function (s) {
          return s;
        }) : null;
        var finder = _this2._options.finders[tag];
        var ecsToTag = finder ? (0, _watcherFinderMerger["default"])(_this2._scheduler, _this2.tree, tag, tagOptions, combinedWatcherSet, finder, _this2._logError) : combinedWatcherSet || _liveSet["default"].constant(new Set(), {
          scheduler: _this2._scheduler
        });
        var elementsToNodes = new Map();

        function findParentNode(taggedParents) {
          var parentNode;

          for (var i = taggedParents.length - 1; i >= 0; i--) {
            if (taggedParents[i].tag == null || ownedBy.has(taggedParents[i].tag)) {
              parentNode = taggedParents[i].node;
              break;
            }
          }

          if (!parentNode) throw new Error();
          return parentNode;
        }

        var ecSet = new _liveSet["default"]({
          scheduler: _this2._scheduler,
          read: function read() {
            throw new Error();
          },
          listen: function listen(setValues, controller) {
            var m = new Map();

            var cb = function cb(ec) {
              var el = ec.el,
                  parents = ec.parents;
              var parentNode = findParentNode(parents);

              var node = _this2._treeController.addTaggedValue(parentNode, tag, el);

              if (elementsToNodes.has(el)) {
                _this2._logError(new Error("PageParserTree(".concat(tag, ") watcher received element twice")), el);
              }

              elementsToNodes.set(el, node);
              var newParents = ec.parents.concat([{
                tag: tag,
                node: node
              }]);
              return {
                el: el,
                parents: newParents
              };
            };

            return ecsToTag.subscribe({
              start: function start() {
                var s = new Set();
                ecsToTag.values().forEach(function (value) {
                  var newValue = cb(value);
                  m.set(value, newValue);
                  s.add(newValue);
                });
                setValues(s);
              },
              next: function next(changes) {
                var ecsRemovedInNotification = new Set();

                if (changes.length > 1) {
                  changes.forEach(function (change) {
                    if (change.type === 'remove') {
                      ecsRemovedInNotification.add(change.value);
                    }
                  });
                }

                changes.forEach(function (change) {
                  if (change.type === 'add') {
                    // Don't process adds of elements that are removed by a later
                    // change in this notification.
                    if (ecsRemovedInNotification.has(change.value)) return;
                    var newValue = cb(change.value);
                    m.set(change.value, newValue);
                    controller.add(newValue);
                  } else if (change.type === 'remove') {
                    var _newValue = m.get(change.value);

                    if (!_newValue) return;
                    m["delete"](change.value);
                    controller.remove(_newValue);
                    var node = elementsToNodes.get(_newValue.el);
                    if (!node) throw new Error('Should not happen: received removal of unseen element');
                    elementsToNodes["delete"](_newValue.el);
                    var nodeParent = node.getParent(); // The node might have already been removed from the tree if it
                    // is owned by a node that was just removed.

                    if (nodeParent && nodeParent.ownsNode(node)) {
                      _this2._treeController.removeTaggedNode(nodeParent, tag, node);
                    }
                  }
                });
              },
              error: function error(err) {
                controller.error(err);
              },
              complete: function complete() {
                controller.end();
              }
            });
          }
        });

        _this2._subscriptions.push(ecSet.subscribe({}));

        return [tag, {
          liveSet: liveSet,
          controller: controller,
          ecSet: ecSet
        }];
      }));

      this._options.watchers.forEach(function (_ref2) {
        var sources = _ref2.sources,
            selectors = _ref2.selectors,
            tag = _ref2.tag;
        var sourceSets = sources.map(function (tag) {
          if (!tag) return _this2._rootMatchedSet;

          var entry = _this2._ecSources.get(tag);

          if (!entry) throw new Error('Unknown source: ' + tag);
          return entry.ecSet;
        });
        var sourceSet = sourceSets.length === 1 ? sourceSets[0] : (0, _merge["default"])(sourceSets);
        var transformer = (0, _createTransformer["default"])(_this2._scheduler, selectors);

        var ecEntry = _this2._ecSources.get(tag);

        if (!ecEntry) throw new Error();
        ecEntry.controller.add(transformer(sourceSet));
      });

      this._scheduler.flush();
    }
  }, {
    key: "_dumpWithoutEnd",
    value: function _dumpWithoutEnd() {
      var _this3 = this;

      this._subscriptions.forEach(function (sub) {
        sub.unsubscribe();
      });

      this._subscriptions.length = 0;
      this.tree.getOwned().forEach(function (liveSet, tag) {
        liveSet.values().forEach(function (node) {
          _this3._treeController.removeTaggedNode(_this3.tree, tag, node);
        });
      });
    }
  }, {
    key: "dump",
    value: function dump() {
      this._dumpWithoutEnd();

      this._treeController.end();
    } // Intended for use with hot module replacement.

  }, {
    key: "replaceOptions",
    value: function replaceOptions(options) {
      var tagErrStr = 'replaceOptions does not support tag changes';

      var _makeTagOptions2 = makeTagOptions(options),
          tagOptionsMap = _makeTagOptions2.map;

      if (this._tagOptions.size !== tagOptionsMap.size) {
        throw new Error(tagErrStr);
      }

      this._tagOptions.forEach(function (oldOptions, tag) {
        var newOptions = tagOptionsMap.get(tag);
        if (!newOptions) throw new Error(tagErrStr);
        var oldOwnedBy = oldOptions.ownedBy || [];
        var newOwnedBy = new Set(newOptions.ownedBy || []);
        if (oldOwnedBy.length !== newOwnedBy.size) throw new Error(tagErrStr);
        oldOwnedBy.forEach(function (tag) {
          if (!newOwnedBy.has(tag)) throw new Error(tagErrStr);
        });
      });

      this._dumpWithoutEnd();

      this._options = options;

      this._setupWatchersAndFinders();
    }
  }]);
  return PageParserTree;
}();

exports["default"] = PageParserTree;
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/page-parser-tree/js/watcherFinderMerger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/page-parser-tree/js/watcherFinderMerger.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = watcherFinderMerger;

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _liveSet = _interopRequireDefault(__webpack_require__(/*! live-set */ "./node_modules/live-set/index.js"));

function watcherFinderMerger(scheduler, tagTree, tag, tagOptions, watcherSet, finder, logError) {
  return new _liveSet["default"]({
    scheduler: scheduler,
    read: function read() {
      throw new Error('Should not happen');
    },
    listen: function listen(setValues, controller) {
      var currentElements = new Set();
      var currentElementContexts = new Set();
      var watcherFoundElements = new Set();
      var watcherFoundElementsMissedByFinder = new Set();
      var sub = null;

      if (watcherSet) {
        sub = watcherSet.subscribe({
          start: function start() {
            if (!watcherSet) throw new Error();
            var currentValues = watcherSet.values();
            setValues(currentValues);
            currentValues.forEach(function (ec) {
              watcherFoundElements.add(ec.el);
              currentElements.add(ec.el);
              currentElementContexts.add(ec);
            });
          },
          next: function next(changes) {
            changes.forEach(function (change) {
              if (change.type === 'add') {
                var _el = change.value.el;
                watcherFoundElements.add(_el);

                if (currentElements.has(_el)) {
                  logError(new Error("PageParserTree(".concat(tag, ") watcher found element already found by finder")), _el);
                } else {
                  currentElements.add(_el);
                  currentElementContexts.add(change.value);
                  controller.add(change.value);
                }
              } else if (change.type === 'remove') {
                var _el2 = change.value.el;
                watcherFoundElements["delete"](_el2);
                watcherFoundElementsMissedByFinder["delete"](_el2);

                if (currentElementContexts.has(change.value)) {
                  currentElements["delete"](_el2);
                  currentElementContexts["delete"](change.value);
                  controller.remove(change.value);
                } // else the ec was added by finder and it will deal with this

              }
            });
          },
          error: function error(err) {
            controller.error(err);
          },
          complete: function complete() {
            controller.end();
          }
        });
      } else {
        setValues(new Set());
      }

      var finderSchedule = null;

      if (finder) {
        var fn = finder.fn,
            interval = finder.interval;
        var ownedBy = tagOptions.ownedBy || [];

        var runFinder = function runFinder() {
          var finderRunFoundElements = new Set();
          var found = fn(tagTree.getValue());

          for (var i = 0, len = found.length; i < len; i++) {
            var _el3 = found[i];
            finderRunFoundElements.add(_el3);

            if (!currentElements.has(_el3)) {
              currentElements.add(_el3);
              var ec = makeElementContext(_el3, tagTree, ownedBy);
              currentElementContexts.add(ec);
              controller.add(ec);

              if (watcherSet) {
                logError(new Error("PageParserTree(".concat(tag, ") finder found element missed by watcher")), _el3);
                if (sub) sub.pullChanges();
              }
            }
          }

          currentElementContexts.forEach(function (ec) {
            var el = ec.el;

            if (!finderRunFoundElements.has(el)) {
              if (watcherFoundElements.has(el)) {
                if (!watcherFoundElementsMissedByFinder.has(el)) {
                  watcherFoundElementsMissedByFinder.add(el);
                  logError(new Error("PageParserTree(".concat(tag, ") watcher found element missed by finder")), el);
                }
              } else {
                currentElementContexts["delete"](ec);
                currentElements["delete"](el);
                controller.remove(ec);
                if (sub) sub.pullChanges();
              }
            }
          });
          scheduler.flush();
        };

        finderSchedule = scheduleRepeatingFinder(interval, currentElements, runFinder);
      }

      return {
        unsubscribe: function unsubscribe() {
          if (finderSchedule != null) finderSchedule.dispose();
          if (sub) sub.unsubscribe();
        },
        pullChanges: function pullChanges() {
          if (sub) sub.pullChanges();
        }
      };
    }
  });
}

function scheduleRepeatingFinder(interval, currentElements, runFinder) {
  var finderStartedTimestamp = Date.now();
  var timeoutHandle = null;
  var idleHandle = null;

  var step = function step() {
    idleHandle = null;
    runFinder();
    scheduleNextStep();
  };

  var scheduleNextStep = function scheduleNextStep() {
    var time;

    if (interval == null) {
      time = 5000 + Math.random() * 1000;
    } else if (typeof interval === 'number') {
      time = interval;
    } else if (typeof interval === 'function') {
      time = interval(currentElements.size, Date.now() - finderStartedTimestamp);
    } else {
      throw new Error("interval has wrong type: ".concat((0, _typeof2["default"])(interval)));
    } // Assert to Flow that all paths should have set time to a number.


    time;

    if (time === Infinity) {
      return;
    }

    timeoutHandle = setTimeout(function () {
      timeoutHandle = null;

      if (global.requestIdleCallback && global.cancelIdleCallback) {
        // Wait up to `time` milliseconds again until there's an idle moment.
        idleHandle = global.requestIdleCallback(step, {
          timeout: time
        });
      } else {
        step();
      }
    }, time);
  };

  scheduleNextStep();
  return {
    dispose: function dispose() {
      if (timeoutHandle != null) clearTimeout(timeoutHandle);
      if (idleHandle != null) global.cancelIdleCallback(idleHandle);
    }
  };
}

function makeElementContext(el, tagTree, ownedBy) {
  // Don't compute parents until it's read from.
  // This is important because nodes aren't added to the tag tree until
  // PageParserTree iterates over the results, and some of these nodes may be
  // owned by each other.
  var _cachedParents = null;
  return {
    el: el,

    get parents() {
      if (!_cachedParents) {
        var root = tagTree.getValue();
        var parents = [];
        var current = el.parentElement;

        while (current) {
          var tagTreeNodes = tagTree.getNodesForValue(current);

          for (var i = 0, len = tagTreeNodes.length; i < len; i++) {
            var node = tagTreeNodes[i];
            var tag = node.getTag();

            if (tag == null || ownedBy.indexOf(tag) >= 0) {
              parents.push({
                tag: tag,
                node: node
              });
              break;
            }
          }

          if (current === root) break;
          current = current.parentElement;
        }

        parents.reverse();
        _cachedParents = parents;
      }

      return _cachedParents;
    }

  };
}

module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=watcherFinderMerger.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ "./node_modules/symbol-observable/es/ponyfill.js");
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__["default"])(root);
/* harmony default export */ __webpack_exports__["default"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),

/***/ "./node_modules/tag-tree/js/TagTree.js":
/*!*********************************************!*\
  !*** ./node_modules/tag-tree/js/TagTree.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _liveSet = _interopRequireDefault(__webpack_require__(/*! live-set */ "./node_modules/live-set/index.js"));

var _TagTreeNode2 = _interopRequireDefault(__webpack_require__(/*! ./TagTreeNode */ "./node_modules/tag-tree/js/TagTreeNode.js"));

var EMPTY_ARRAY = Object.freeze([]);

var TagTree =
/*#__PURE__*/
function (_TagTreeNode) {
  (0, _inherits2.default)(TagTree, _TagTreeNode);

  function TagTree(init) {
    var _this;

    (0, _classCallCheck2.default)(this, TagTree);
    var rootNodeController;
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TagTree).call(this, {
      value: init.root,
      parent: null,
      ownedTags: new Set(init.tags.map(function (_ref) {
        var tag = _ref.tag;
        return tag;
      })),
      executor: function executor(controller) {
        rootNodeController = controller;
      }
    }));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_nodeControllers", new Map());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_lookupTable", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_allByTag", void 0);
    if (!rootNodeController) throw new Error();

    _this._nodeControllers.set((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), rootNodeController);

    _this._lookupTable = new Map([[init.root, [(0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))]]]);
    _this._allByTag = new Map();
    init.tags.forEach(function (_ref2) {
      var tag = _ref2.tag;

      var _LiveSet$active = _liveSet.default.active(),
          liveSet = _LiveSet$active.liveSet,
          controller = _LiveSet$active.controller;

      if (_this._allByTag.has(tag)) throw new Error('Tag specified twice: ' + tag);

      _this._allByTag.set(tag, {
        ownedTags: new Set(),
        liveSet: liveSet,
        controller: controller
      });
    });
    init.tags.forEach(function (_ref3) {
      var tag = _ref3.tag,
          ownedBy = _ref3.ownedBy;
      if (!ownedBy) return;
      ownedBy.forEach(function (owningTag) {
        var entry = _this._allByTag.get(owningTag);

        if (!entry) throw new Error("unknown ownedBy value for ".concat(tag, ": ").concat(owningTag));
        entry.ownedTags.add(tag);
      });
    });
    var controller = {
      tree: (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)),
      addTaggedValue: function addTaggedValue(parent, tag, value) {
        var tagEntry = _this._allByTag.get(tag);

        if (!tagEntry) throw new Error("unknown tag: ".concat(tag));
        var controller;
        var node = new _TagTreeNode2.default({
          value: value,
          parent: parent,
          ownedTags: tagEntry.ownedTags,
          executor: function executor(_controller) {
            controller = _controller;
          }
        });
        if (!controller) throw new Error();

        _this._nodeControllers.set(node, controller);

        tagEntry.controller.add(node);

        var valueNodes = _this._lookupTable.get(value);

        if (valueNodes) {
          valueNodes.push(node);
        } else {
          _this._lookupTable.set(value, [node]);
        }

        var parentController = _this._nodeControllers.get(parent);

        if (!parentController) throw new Error('parent is not part of TagTree');
        parentController.addOwnedNode(tag, node);
        return node;
      },
      removeTaggedNode: function removeTaggedNode(parent, tag, node) {
        var tagEntry = _this._allByTag.get(tag);

        if (!tagEntry) throw new Error("unknown tag: ".concat(tag));

        var parentController = _this._nodeControllers.get(parent);

        if (!parentController) throw new Error('parent is not part of TagTree');
        var value = node.getValue();

        var nodes = _this._lookupTable.get(value);

        if (!nodes) throw new Error('node was missing from lookup table before removal');

        if (nodes.length > 1) {
          var ix = nodes.indexOf(node);
          if (ix < 0) throw new Error('node was missing from list in lookup table before removal');
          nodes.splice(ix, 1);
        } else {
          _this._lookupTable.delete(value);
        }

        node.getOwned().forEach(function (liveSet, tag) {
          liveSet.values().forEach(function (childNode) {
            controller.removeTaggedNode(node, tag, childNode);
          });
        });
        tagEntry.controller.remove(node);
        parentController.removeOwnedNode(tag, node);

        _this._nodeControllers.delete(node);
      },
      end: function end() {
        _this._nodeControllers.forEach(function (controller) {
          controller.end();
        });

        _this._allByTag.forEach(function (_ref4) {
          var controller = _ref4.controller;
          controller.end();
        });
      }
    };
    init.executor(controller);

    init.executor = function () {}; // release reference


    return _this;
  }

  (0, _createClass2.default)(TagTree, [{
    key: "getNodesForValue",
    value: function getNodesForValue(value) {
      var l = this._lookupTable.get(value);

      return l ? Object.freeze(l.slice()) : EMPTY_ARRAY;
    }
  }, {
    key: "getAllByTag",
    value: function getAllByTag(tag) {
      var entry = this._allByTag.get(tag);

      if (!entry) throw new Error("tag does not exist in TagTree: ".concat(tag));
      return entry.liveSet;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var m = new Map();

      this._allByTag.forEach(function (_ref5, tag) {
        var liveSet = _ref5.liveSet;
        m.set(tag, liveSet);
      });

      return m;
    }
  }]);
  return TagTree;
}(_TagTreeNode2.default);

exports.default = TagTree;
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UYWdUcmVlLmpzIl0sIm5hbWVzIjpbIkVNUFRZX0FSUkFZIiwiT2JqZWN0IiwiZnJlZXplIiwiVGFnVHJlZSIsImluaXQiLCJyb290Tm9kZUNvbnRyb2xsZXIiLCJ2YWx1ZSIsInJvb3QiLCJwYXJlbnQiLCJvd25lZFRhZ3MiLCJTZXQiLCJ0YWdzIiwibWFwIiwidGFnIiwiZXhlY3V0b3IiLCJjb250cm9sbGVyIiwiTWFwIiwiRXJyb3IiLCJfbm9kZUNvbnRyb2xsZXJzIiwic2V0IiwiX2xvb2t1cFRhYmxlIiwiX2FsbEJ5VGFnIiwiZm9yRWFjaCIsIkxpdmVTZXQiLCJhY3RpdmUiLCJsaXZlU2V0IiwiaGFzIiwib3duZWRCeSIsIm93bmluZ1RhZyIsImVudHJ5IiwiZ2V0IiwiYWRkIiwidHJlZSIsImFkZFRhZ2dlZFZhbHVlIiwidGFnRW50cnkiLCJub2RlIiwiVGFnVHJlZU5vZGUiLCJfY29udHJvbGxlciIsInZhbHVlTm9kZXMiLCJwdXNoIiwicGFyZW50Q29udHJvbGxlciIsImFkZE93bmVkTm9kZSIsInJlbW92ZVRhZ2dlZE5vZGUiLCJnZXRWYWx1ZSIsIm5vZGVzIiwibGVuZ3RoIiwiaXgiLCJpbmRleE9mIiwic3BsaWNlIiwiZGVsZXRlIiwiZ2V0T3duZWQiLCJ2YWx1ZXMiLCJjaGlsZE5vZGUiLCJyZW1vdmUiLCJyZW1vdmVPd25lZE5vZGUiLCJlbmQiLCJsIiwic2xpY2UiLCJtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUdBOztBQWdCQSxJQUFNQSxXQUFrQixHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLENBQTNCOztJQUVxQkMsTzs7Ozs7QUFTbkIsbUJBQVlDLElBQVosRUFBa0M7QUFBQTs7QUFBQTtBQUNoQyxRQUFJQyxrQkFBSjtBQUNBLDZHQUFNO0FBQ0pDLE1BQUFBLEtBQUssRUFBRUYsSUFBSSxDQUFDRyxJQURSO0FBRUpDLE1BQUFBLE1BQU0sRUFBRSxJQUZKO0FBR0pD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LEdBQUYsQ0FBTU4sR0FBTixFQUFXWSxPQUFYO0FBQ0QsT0FGRDs7QUFHQSxhQUFPaUMsQ0FBUDtBQUNEOzs7RUFuSXFDdEIscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTGl2ZVNldCBmcm9tICdsaXZlLXNldCc7XG5pbXBvcnQgdHlwZSB7TGl2ZVNldENvbnRyb2xsZXJ9IGZyb20gJ2xpdmUtc2V0JztcblxuaW1wb3J0IFRhZ1RyZWVOb2RlIGZyb20gJy4vVGFnVHJlZU5vZGUnO1xuaW1wb3J0IHR5cGUge1RhZ1RyZWVOb2RlQ29udHJvbGxlcn0gZnJvbSAnLi9UYWdUcmVlTm9kZSc7XG5cbmV4cG9ydCB0eXBlIFRhZ1RyZWVDb250cm9sbGVyPFQ+ID0ge1xuICB0cmVlOiBUYWdUcmVlPFQ+O1xuICBhZGRUYWdnZWRWYWx1ZShwYXJlbnQ6IFRhZ1RyZWVOb2RlPFQ+LCB0YWc6IHN0cmluZywgdmFsdWU6IFQpOiBUYWdUcmVlTm9kZTxUPjtcbiAgcmVtb3ZlVGFnZ2VkTm9kZShwYXJlbnQ6IFRhZ1RyZWVOb2RlPFQ+LCB0YWc6IHN0cmluZywgbm9kZTogVGFnVHJlZU5vZGU8VD4pOiB2b2lkO1xuICBlbmQoKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFRhZ1RyZWVJbml0PFQ+ID0ge3xcbiAgcm9vdDogVDtcbiAgdGFnczogJFJlYWRPbmx5QXJyYXk8e3wgdGFnOiBzdHJpbmcsIG93bmVkQnk/OiA/JFJlYWRPbmx5QXJyYXk8c3RyaW5nPiB8fT47XG4gIGV4ZWN1dG9yOiAoY29udHJvbGxlcjogVGFnVHJlZUNvbnRyb2xsZXI8VD4pID0+IHZvaWQ7XG58fTtcblxuY29uc3QgRU1QVFlfQVJSQVk6IGFueVtdID0gT2JqZWN0LmZyZWV6ZShbXSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhZ1RyZWU8VD4gZXh0ZW5kcyBUYWdUcmVlTm9kZTxUPiB7XG4gIF9ub2RlQ29udHJvbGxlcnM6IE1hcDxUYWdUcmVlTm9kZTxUPiwgVGFnVHJlZU5vZGVDb250cm9sbGVyPFQ+PiA9IG5ldyBNYXAoKTtcbiAgX2xvb2t1cFRhYmxlOiBNYXA8VCwgQXJyYXk8VGFnVHJlZU5vZGU8VD4+PjtcbiAgX2FsbEJ5VGFnOiBNYXA8c3RyaW5nLCB7XG4gICAgb3duZWRUYWdzOiBTZXQ8c3RyaW5nPjtcbiAgICBsaXZlU2V0OiBMaXZlU2V0PFRhZ1RyZWVOb2RlPFQ+PjtcbiAgICBjb250cm9sbGVyOiBMaXZlU2V0Q29udHJvbGxlcjxUYWdUcmVlTm9kZTxUPj47XG4gIH0+O1xuXG4gIGNvbnN0cnVjdG9yKGluaXQ6IFRhZ1RyZWVJbml0PFQ+KSB7XG4gICAgbGV0IHJvb3ROb2RlQ29udHJvbGxlcjtcbiAgICBzdXBlcih7XG4gICAgICB2YWx1ZTogaW5pdC5yb290LFxuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgb3duZWRUYWdzOiBuZXcgU2V0KGluaXQudGFncy5tYXAoKHt0YWd9KSA9PiB0YWcpKSxcbiAgICAgIGV4ZWN1dG9yOiAoY29udHJvbGxlcikgPT4ge1xuICAgICAgICByb290Tm9kZUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghcm9vdE5vZGVDb250cm9sbGVyKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB0aGlzLl9ub2RlQ29udHJvbGxlcnMuc2V0KHRoaXMsIHJvb3ROb2RlQ29udHJvbGxlcik7XG5cbiAgICB0aGlzLl9sb29rdXBUYWJsZSA9IG5ldyBNYXAoW1tpbml0LnJvb3QsIFt0aGlzXV1dKTtcblxuICAgIHRoaXMuX2FsbEJ5VGFnID0gbmV3IE1hcCgpO1xuICAgIGluaXQudGFncy5mb3JFYWNoKCh7dGFnfSkgPT4ge1xuICAgICAgY29uc3Qge2xpdmVTZXQsIGNvbnRyb2xsZXJ9ID0gTGl2ZVNldC5hY3RpdmUoKTtcbiAgICAgIGlmICh0aGlzLl9hbGxCeVRhZy5oYXModGFnKSkgdGhyb3cgbmV3IEVycm9yKCdUYWcgc3BlY2lmaWVkIHR3aWNlOiAnK3RhZyk7XG4gICAgICB0aGlzLl9hbGxCeVRhZy5zZXQodGFnLCB7b3duZWRUYWdzOiBuZXcgU2V0KCksIGxpdmVTZXQsIGNvbnRyb2xsZXJ9KTtcbiAgICB9KTtcblxuICAgIGluaXQudGFncy5mb3JFYWNoKCh7dGFnLCBvd25lZEJ5fSkgPT4ge1xuICAgICAgaWYgKCFvd25lZEJ5KSByZXR1cm47XG4gICAgICBvd25lZEJ5LmZvckVhY2gob3duaW5nVGFnID0+IHtcbiAgICAgICAgY29uc3QgZW50cnkgPSB0aGlzLl9hbGxCeVRhZy5nZXQob3duaW5nVGFnKTtcbiAgICAgICAgaWYgKCFlbnRyeSkgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIG93bmVkQnkgdmFsdWUgZm9yICR7dGFnfTogJHtvd25pbmdUYWd9YCk7XG4gICAgICAgIGVudHJ5Lm93bmVkVGFncy5hZGQodGFnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY29udHJvbGxlciA9IHtcbiAgICAgIHRyZWU6IHRoaXMsXG4gICAgICBhZGRUYWdnZWRWYWx1ZTogKHBhcmVudCwgdGFnLCB2YWx1ZSkgPT4ge1xuICAgICAgICBjb25zdCB0YWdFbnRyeSA9IHRoaXMuX2FsbEJ5VGFnLmdldCh0YWcpO1xuICAgICAgICBpZiAoIXRhZ0VudHJ5KSB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gdGFnOiAke3RhZ31gKTtcblxuICAgICAgICBsZXQgY29udHJvbGxlcjtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5ldyBUYWdUcmVlTm9kZSh7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgcGFyZW50LFxuICAgICAgICAgIG93bmVkVGFnczogdGFnRW50cnkub3duZWRUYWdzLFxuICAgICAgICAgIGV4ZWN1dG9yOiAoX2NvbnRyb2xsZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBfY29udHJvbGxlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNvbnRyb2xsZXIpIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB0aGlzLl9ub2RlQ29udHJvbGxlcnMuc2V0KG5vZGUsIGNvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRhZ0VudHJ5LmNvbnRyb2xsZXIuYWRkKG5vZGUpO1xuXG4gICAgICAgIGNvbnN0IHZhbHVlTm9kZXMgPSB0aGlzLl9sb29rdXBUYWJsZS5nZXQodmFsdWUpO1xuICAgICAgICBpZiAodmFsdWVOb2Rlcykge1xuICAgICAgICAgIHZhbHVlTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9sb29rdXBUYWJsZS5zZXQodmFsdWUsIFtub2RlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJlbnRDb250cm9sbGVyID0gdGhpcy5fbm9kZUNvbnRyb2xsZXJzLmdldChwYXJlbnQpO1xuICAgICAgICBpZiAoIXBhcmVudENvbnRyb2xsZXIpIHRocm93IG5ldyBFcnJvcigncGFyZW50IGlzIG5vdCBwYXJ0IG9mIFRhZ1RyZWUnKTtcbiAgICAgICAgcGFyZW50Q29udHJvbGxlci5hZGRPd25lZE5vZGUodGFnLCBub2RlKTtcblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0sXG4gICAgICByZW1vdmVUYWdnZWROb2RlOiAocGFyZW50LCB0YWcsIG5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgdGFnRW50cnkgPSB0aGlzLl9hbGxCeVRhZy5nZXQodGFnKTtcbiAgICAgICAgaWYgKCF0YWdFbnRyeSkgdGhyb3cgbmV3IEVycm9yKGB1bmtub3duIHRhZzogJHt0YWd9YCk7XG5cbiAgICAgICAgY29uc3QgcGFyZW50Q29udHJvbGxlciA9IHRoaXMuX25vZGVDb250cm9sbGVycy5nZXQocGFyZW50KTtcbiAgICAgICAgaWYgKCFwYXJlbnRDb250cm9sbGVyKSB0aHJvdyBuZXcgRXJyb3IoJ3BhcmVudCBpcyBub3QgcGFydCBvZiBUYWdUcmVlJyk7XG5cbiAgICAgICAgY29uc3QgdmFsdWUgPSBub2RlLmdldFZhbHVlKCk7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5fbG9va3VwVGFibGUuZ2V0KHZhbHVlKTtcbiAgICAgICAgaWYgKCFub2RlcykgdGhyb3cgbmV3IEVycm9yKCdub2RlIHdhcyBtaXNzaW5nIGZyb20gbG9va3VwIHRhYmxlIGJlZm9yZSByZW1vdmFsJyk7XG4gICAgICAgIGlmIChub2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgY29uc3QgaXggPSBub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgIGlmIChpeCA8IDApIHRocm93IG5ldyBFcnJvcignbm9kZSB3YXMgbWlzc2luZyBmcm9tIGxpc3QgaW4gbG9va3VwIHRhYmxlIGJlZm9yZSByZW1vdmFsJyk7XG4gICAgICAgICAgbm9kZXMuc3BsaWNlKGl4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9sb29rdXBUYWJsZS5kZWxldGUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5nZXRPd25lZCgpLmZvckVhY2goKGxpdmVTZXQsIHRhZykgPT4ge1xuICAgICAgICAgIGxpdmVTZXQudmFsdWVzKCkuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICAgICAgY29udHJvbGxlci5yZW1vdmVUYWdnZWROb2RlKG5vZGUsIHRhZywgY2hpbGROb2RlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGFnRW50cnkuY29udHJvbGxlci5yZW1vdmUobm9kZSk7XG4gICAgICAgIHBhcmVudENvbnRyb2xsZXIucmVtb3ZlT3duZWROb2RlKHRhZywgbm9kZSk7XG4gICAgICAgIHRoaXMuX25vZGVDb250cm9sbGVycy5kZWxldGUobm9kZSk7XG4gICAgICB9LFxuICAgICAgZW5kOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuX25vZGVDb250cm9sbGVycy5mb3JFYWNoKGNvbnRyb2xsZXIgPT4ge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9hbGxCeVRhZy5mb3JFYWNoKCh7Y29udHJvbGxlcn0pID0+IHtcbiAgICAgICAgICBjb250cm9sbGVyLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGluaXQuZXhlY3V0b3IoY29udHJvbGxlcik7XG4gICAgaW5pdC5leGVjdXRvciA9ICgpID0+IHt9OyAvLyByZWxlYXNlIHJlZmVyZW5jZVxuICB9XG5cbiAgZ2V0Tm9kZXNGb3JWYWx1ZSh2YWx1ZTogVCk6ICRSZWFkT25seUFycmF5PFRhZ1RyZWVOb2RlPFQ+PiB7XG4gICAgY29uc3QgbCA9IHRoaXMuX2xvb2t1cFRhYmxlLmdldCh2YWx1ZSk7XG4gICAgcmV0dXJuIGwgPyBPYmplY3QuZnJlZXplKGwuc2xpY2UoKSkgOiBFTVBUWV9BUlJBWTtcbiAgfVxuXG4gIGdldEFsbEJ5VGFnKHRhZzogc3RyaW5nKTogTGl2ZVNldDxUYWdUcmVlTm9kZTxUPj4ge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5fYWxsQnlUYWcuZ2V0KHRhZyk7XG4gICAgaWYgKCFlbnRyeSkgdGhyb3cgbmV3IEVycm9yKGB0YWcgZG9lcyBub3QgZXhpc3QgaW4gVGFnVHJlZTogJHt0YWd9YCk7XG4gICAgcmV0dXJuIGVudHJ5LmxpdmVTZXQ7XG4gIH1cblxuICBnZXRBbGwoKTogTWFwPHN0cmluZywgTGl2ZVNldDxUYWdUcmVlTm9kZTxUPj4+IHtcbiAgICBjb25zdCBtID0gbmV3IE1hcCgpO1xuICAgIHRoaXMuX2FsbEJ5VGFnLmZvckVhY2goKHtsaXZlU2V0fSwgdGFnKSA9PiB7XG4gICAgICBtLnNldCh0YWcsIGxpdmVTZXQpO1xuICAgIH0pO1xuICAgIHJldHVybiBtO1xuICB9XG59XG4iXX0=

/***/ }),

/***/ "./node_modules/tag-tree/js/TagTreeNode.js":
/*!*************************************************!*\
  !*** ./node_modules/tag-tree/js/TagTreeNode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _liveSet = _interopRequireDefault(__webpack_require__(/*! live-set */ "./node_modules/live-set/index.js"));

var TagTreeNode =
/*#__PURE__*/
function () {
  function TagTreeNode(init) {
    var _this = this;

    (0, _classCallCheck2.default)(this, TagTreeNode);
    (0, _defineProperty2.default)(this, "_init", void 0);
    (0, _defineProperty2.default)(this, "_ownedNodes", new Map());
    (0, _defineProperty2.default)(this, "_ownedByTag", new Map());
    this._init = init;

    this._init.executor({
      node: this,
      addOwnedNode: function addOwnedNode(tag, node) {
        _this._ownedNodes.set(node, tag);

        var entry = _this._ownedByTag.get(tag);

        if (!entry) {
          entry = _this._createTagEntry();

          _this._ownedByTag.set(tag, entry);
        }

        var _entry = entry,
            controller = _entry.controller;
        controller.add(node);
      },
      removeOwnedNode: function removeOwnedNode(tag, node) {
        _this._ownedNodes.delete(node);

        var entry = _this._ownedByTag.get(tag);

        if (!entry) throw new Error('tag not owned');
        var controller = entry.controller;
        controller.remove(node);
      },
      end: function end() {
        _this._ownedByTag.forEach(function (_ref) {
          var controller = _ref.controller;
          controller.end();
        });
      }
    });

    this._init.executor = function () {}; // release reference

  }

  (0, _createClass2.default)(TagTreeNode, [{
    key: "_createTagEntry",
    value: function _createTagEntry() {
      return _liveSet.default.active();
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this._init.value;
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this._init.parent || null;
    }
  }, {
    key: "getOwnedByTag",
    value: function getOwnedByTag(tag) {
      var entry = this._ownedByTag.get(tag);

      if (!entry) {
        if (!this._init.ownedTags.has(tag)) {
          throw new Error("tag not owned: ".concat(tag));
        }

        entry = this._createTagEntry();

        this._ownedByTag.set(tag, entry);
      }

      return entry.liveSet;
    }
  }, {
    key: "getOwned",
    value: function getOwned() {
      var m = new Map();

      this._ownedByTag.forEach(function (_ref2, tag) {
        var liveSet = _ref2.liveSet;
        m.set(tag, liveSet);
      });

      return m;
    }
  }, {
    key: "getTag",
    value: function getTag() {
      var parent = this._init.parent;
      return parent ? parent.getTagOfOwnedNode(this) : null;
    }
  }, {
    key: "ownsNode",
    value: function ownsNode(node) {
      return this._ownedNodes.has(node);
    }
  }, {
    key: "getTagOfOwnedNode",
    value: function getTagOfOwnedNode(node) {
      var tag = this._ownedNodes.get(node);

      if (tag == null) throw new Error('node not owned');
      return tag;
    }
  }]);
  return TagTreeNode;
}();

exports.default = TagTreeNode;
module.exports = exports.default;
module.exports.default = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UYWdUcmVlTm9kZS5qcyJdLCJuYW1lcyI6WyJUYWdUcmVlTm9kZSIsImluaXQiLCJNYXAiLCJfaW5pdCIsImV4ZWN1dG9yIiwibm9kZSIsImFkZE93bmVkTm9kZSIsInRhZyIsIl9vd25lZE5vZGVzIiwic2V0IiwiZW50cnkiLCJfb3duZWRCeVRhZyIsImdldCIsIl9jcmVhdGVUYWdFbnRyeSIsImNvbnRyb2xsZXIiLCJhZGQiLCJyZW1vdmVPd25lZE5vZGUiLCJkZWxldGUiLCJFcnJvciIsInJlbW92ZSIsImVuZCIsImZvckVhY2giLCJMaXZlU2V0IiwiYWN0aXZlIiwidmFsdWUiLCJwYXJlbnQiLCJvd25lZFRhZ3MiLCJoYXMiLCJsaXZlU2V0IiwibSIsImdldFRhZ09mT3duZWROb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7SUFzQnFCQSxXOzs7QUFLbkIsdUJBQVlDLElBQVosRUFBc0M7QUFBQTs7QUFBQTtBQUFBO0FBQUEsdURBSEssSUFBSUMsR0FBSixFQUdMO0FBQUEsdURBRkUsSUFBSUEsR0FBSixFQUVGO0FBQ3BDLFNBQUtDLEtBQUwsR0FBYUYsSUFBYjs7QUFDQSxTQUFLRSxLQUFMLENBQVdDLFFBQVgsQ0FBb0I7QUFDbEJDLE1BQUFBLElBQUksRUFBRSxJQURZO0FBRWxCQyxNQUFBQSxZQUFZLEVBQUUsc0JBQUNDLEdBQUQsRUFBTUYsSUFBTixFQUFlO0FBQzNCLFFBQUEsS0FBSSxDQUFDRyxXQUFMLENBQWlCQyxHQUFqQixDQUFxQkosSUFBckIsRUFBMkJFLEdBQTNCOztBQUNBLFlBQUlHLEtBQUssR0FBRyxLQUFJLENBQUNDLFdBQUwsQ0FBaUJDLEdBQWpCLENBQXFCTCxHQUFyQixDQUFaOztBQUNBLFlBQUksQ0FBQ0csS0FBTCxFQUFZO0FBQ1ZBLFVBQUFBLEtBQUssR0FBRyxLQUFJLENBQUNHLGVBQUwsRUFBUjs7QUFDQSxVQUFBLEtBQUksQ0FBQ0YsV0FBTCxDQUFpQkYsR0FBakIsQ0FBcUJGLEdBQXJCLEVBQTBCRyxLQUExQjtBQUNEOztBQU4wQixxQkFPTkEsS0FQTTtBQUFBLFlBT3BCSSxVQVBvQixVQU9wQkEsVUFQb0I7QUFRM0JBLFFBQUFBLFVBQVUsQ0FBQ0MsR0FBWCxDQUFlVixJQUFmO0FBQ0QsT0FYaUI7QUFZbEJXLE1BQUFBLGVBQWUsRUFBRSx5QkFBQ1QsR0FBRCxFQUFNRixJQUFOLEVBQWU7QUFDOUIsUUFBQSxLQUFJLENBQUNHLFdBQUwsQ0FBaUJTLE1BQWpCLENBQXdCWixJQUF4Qjs7QUFDQSxZQUFNSyxLQUFLLEdBQUcsS0FBSSxDQUFDQyxXQUFMLENBQWlCQyxHQUFqQixDQUFxQkwsR0FBckIsQ0FBZDs7QUFDQSxZQUFJLENBQUNHLEtBQUwsRUFBWSxNQUFNLElBQUlRLEtBQUosQ0FBVSxlQUFWLENBQU47QUFIa0IsWUFJdkJKLFVBSnVCLEdBSVRKLEtBSlMsQ0FJdkJJLFVBSnVCO0FBSzlCQSxRQUFBQSxVQUFVLENBQUNLLE1BQVgsQ0FBa0JkLElBQWxCO0FBQ0QsT0FsQmlCO0FBbUJsQmUsTUFBQUEsR0FBRyxFQUFFLGVBQU07QUFDVCxRQUFBLEtBQUksQ0FBQ1QsV0FBTCxDQUFpQlUsT0FBakIsQ0FBeUIsZ0JBQWtCO0FBQUEsY0FBaEJQLFVBQWdCLFFBQWhCQSxVQUFnQjtBQUN6Q0EsVUFBQUEsVUFBVSxDQUFDTSxHQUFYO0FBQ0QsU0FGRDtBQUdEO0FBdkJpQixLQUFwQjs7QUF5QkEsU0FBS2pCLEtBQUwsQ0FBV0MsUUFBWCxHQUFzQixZQUFNLENBQUUsQ0FBOUIsQ0EzQm9DLENBMkJKOztBQUNqQzs7OztzQ0FFOEI7QUFDN0IsYUFBT2tCLGlCQUFRQyxNQUFSLEVBQVA7QUFDRDs7OytCQUVhO0FBQ1osYUFBTyxLQUFLcEIsS0FBTCxDQUFXcUIsS0FBbEI7QUFDRDs7O2dDQUVnQztBQUMvQixhQUFPLEtBQUtyQixLQUFMLENBQVdzQixNQUFYLElBQXFCLElBQTVCO0FBQ0Q7OztrQ0FFYWxCLEcsRUFBc0M7QUFDbEQsVUFBSUcsS0FBSyxHQUFHLEtBQUtDLFdBQUwsQ0FBaUJDLEdBQWpCLENBQXFCTCxHQUFyQixDQUFaOztBQUNBLFVBQUksQ0FBQ0csS0FBTCxFQUFZO0FBQ1YsWUFBSSxDQUFDLEtBQUtQLEtBQUwsQ0FBV3VCLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCcEIsR0FBekIsQ0FBTCxFQUFvQztBQUNsQyxnQkFBTSxJQUFJVyxLQUFKLDBCQUE0QlgsR0FBNUIsRUFBTjtBQUNEOztBQUNERyxRQUFBQSxLQUFLLEdBQUcsS0FBS0csZUFBTCxFQUFSOztBQUNBLGFBQUtGLFdBQUwsQ0FBaUJGLEdBQWpCLENBQXFCRixHQUFyQixFQUEwQkcsS0FBMUI7QUFDRDs7QUFDRCxhQUFPQSxLQUFLLENBQUNrQixPQUFiO0FBQ0Q7OzsrQkFFZ0Q7QUFDL0MsVUFBTUMsQ0FBQyxHQUFHLElBQUkzQixHQUFKLEVBQVY7O0FBQ0EsV0FBS1MsV0FBTCxDQUFpQlUsT0FBakIsQ0FBeUIsaUJBQVlkLEdBQVosRUFBb0I7QUFBQSxZQUFsQnFCLE9BQWtCLFNBQWxCQSxPQUFrQjtBQUMzQ0MsUUFBQUEsQ0FBQyxDQUFDcEIsR0FBRixDQUFNRixHQUFOLEVBQVdxQixPQUFYO0FBQ0QsT0FGRDs7QUFHQSxhQUFPQyxDQUFQO0FBQ0Q7Ozs2QkFFcUI7QUFBQSxVQUNiSixNQURhLEdBQ0gsS0FBS3RCLEtBREYsQ0FDYnNCLE1BRGE7QUFFcEIsYUFBT0EsTUFBTSxHQUFHQSxNQUFNLENBQUNLLGlCQUFQLENBQXlCLElBQXpCLENBQUgsR0FBb0MsSUFBakQ7QUFDRDs7OzZCQUVRekIsSSxFQUErQjtBQUN0QyxhQUFPLEtBQUtHLFdBQUwsQ0FBaUJtQixHQUFqQixDQUFxQnRCLElBQXJCLENBQVA7QUFDRDs7O3NDQUVpQkEsSSxFQUE4QjtBQUM5QyxVQUFNRSxHQUFHLEdBQUcsS0FBS0MsV0FBTCxDQUFpQkksR0FBakIsQ0FBcUJQLElBQXJCLENBQVo7O0FBQ0EsVUFBSUUsR0FBRyxJQUFJLElBQVgsRUFBaUIsTUFBTSxJQUFJVyxLQUFKLENBQVUsZ0JBQVYsQ0FBTjtBQUNqQixhQUFPWCxHQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTGl2ZVNldCBmcm9tICdsaXZlLXNldCc7XG5pbXBvcnQgdHlwZSB7TGl2ZVNldENvbnRyb2xsZXJ9IGZyb20gJ2xpdmUtc2V0JztcblxuZXhwb3J0IHR5cGUgVGFnVHJlZU5vZGVDb250cm9sbGVyPFQ+ID0ge1xuICBub2RlOiBUYWdUcmVlTm9kZTxUPjtcbiAgYWRkT3duZWROb2RlKHRhZzogc3RyaW5nLCBub2RlOiBUYWdUcmVlTm9kZTxUPik6IHZvaWQ7XG4gIHJlbW92ZU93bmVkTm9kZSh0YWc6IHN0cmluZywgbm9kZTogVGFnVHJlZU5vZGU8VD4pOiB2b2lkO1xuICBlbmQoKTogdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFRhZ1RyZWVOb2RlSW5pdDxUPiA9IHt8XG4gIHZhbHVlOiBUO1xuICBwYXJlbnQ6ID9UYWdUcmVlTm9kZTxUPjtcbiAgb3duZWRUYWdzOiBTZXQ8c3RyaW5nPjtcbiAgZXhlY3V0b3I6IChjb250cm9sbGVyOiBUYWdUcmVlTm9kZUNvbnRyb2xsZXI8VD4pID0+IHZvaWQ7XG58fTtcblxudHlwZSBUYWdFbnRyeTxUPiA9IHtcbiAgbGl2ZVNldDogTGl2ZVNldDxUYWdUcmVlTm9kZTxUPj47XG4gIGNvbnRyb2xsZXI6IExpdmVTZXRDb250cm9sbGVyPFRhZ1RyZWVOb2RlPFQ+Pjtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhZ1RyZWVOb2RlPFQ+IHtcbiAgX2luaXQ6IFRhZ1RyZWVOb2RlSW5pdDxUPjtcbiAgX293bmVkTm9kZXM6IE1hcDxUYWdUcmVlTm9kZTxUPiwgc3RyaW5nPiA9IG5ldyBNYXAoKTtcbiAgX293bmVkQnlUYWc6IE1hcDxzdHJpbmcsIFRhZ0VudHJ5PFQ+PiA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3Rvcihpbml0OiBUYWdUcmVlTm9kZUluaXQ8VD4pIHtcbiAgICB0aGlzLl9pbml0ID0gaW5pdDtcbiAgICB0aGlzLl9pbml0LmV4ZWN1dG9yKHtcbiAgICAgIG5vZGU6IHRoaXMsXG4gICAgICBhZGRPd25lZE5vZGU6ICh0YWcsIG5vZGUpID0+IHtcbiAgICAgICAgdGhpcy5fb3duZWROb2Rlcy5zZXQobm9kZSwgdGFnKTtcbiAgICAgICAgbGV0IGVudHJ5ID0gdGhpcy5fb3duZWRCeVRhZy5nZXQodGFnKTtcbiAgICAgICAgaWYgKCFlbnRyeSkge1xuICAgICAgICAgIGVudHJ5ID0gdGhpcy5fY3JlYXRlVGFnRW50cnkoKTtcbiAgICAgICAgICB0aGlzLl9vd25lZEJ5VGFnLnNldCh0YWcsIGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7Y29udHJvbGxlcn0gPSBlbnRyeTtcbiAgICAgICAgY29udHJvbGxlci5hZGQobm9kZSk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlT3duZWROb2RlOiAodGFnLCBub2RlKSA9PiB7XG4gICAgICAgIHRoaXMuX293bmVkTm9kZXMuZGVsZXRlKG5vZGUpO1xuICAgICAgICBjb25zdCBlbnRyeSA9IHRoaXMuX293bmVkQnlUYWcuZ2V0KHRhZyk7XG4gICAgICAgIGlmICghZW50cnkpIHRocm93IG5ldyBFcnJvcigndGFnIG5vdCBvd25lZCcpO1xuICAgICAgICBjb25zdCB7Y29udHJvbGxlcn0gPSBlbnRyeTtcbiAgICAgICAgY29udHJvbGxlci5yZW1vdmUobm9kZSk7XG4gICAgICB9LFxuICAgICAgZW5kOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuX293bmVkQnlUYWcuZm9yRWFjaCgoe2NvbnRyb2xsZXJ9KSA9PiB7XG4gICAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5faW5pdC5leGVjdXRvciA9ICgpID0+IHt9OyAvLyByZWxlYXNlIHJlZmVyZW5jZVxuICB9XG5cbiAgX2NyZWF0ZVRhZ0VudHJ5KCk6IFRhZ0VudHJ5PFQ+IHtcbiAgICByZXR1cm4gTGl2ZVNldC5hY3RpdmUoKTtcbiAgfVxuXG4gIGdldFZhbHVlKCk6IFQge1xuICAgIHJldHVybiB0aGlzLl9pbml0LnZhbHVlO1xuICB9XG5cbiAgZ2V0UGFyZW50KCk6IG51bGx8VGFnVHJlZU5vZGU8VD4ge1xuICAgIHJldHVybiB0aGlzLl9pbml0LnBhcmVudCB8fCBudWxsO1xuICB9XG5cbiAgZ2V0T3duZWRCeVRhZyh0YWc6IHN0cmluZyk6IExpdmVTZXQ8VGFnVHJlZU5vZGU8VD4+IHtcbiAgICBsZXQgZW50cnkgPSB0aGlzLl9vd25lZEJ5VGFnLmdldCh0YWcpO1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIGlmICghdGhpcy5faW5pdC5vd25lZFRhZ3MuaGFzKHRhZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB0YWcgbm90IG93bmVkOiAke3RhZ31gKTtcbiAgICAgIH1cbiAgICAgIGVudHJ5ID0gdGhpcy5fY3JlYXRlVGFnRW50cnkoKTtcbiAgICAgIHRoaXMuX293bmVkQnlUYWcuc2V0KHRhZywgZW50cnkpO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnkubGl2ZVNldDtcbiAgfVxuXG4gIGdldE93bmVkKCk6IE1hcDxzdHJpbmcsIExpdmVTZXQ8VGFnVHJlZU5vZGU8VD4+PiB7XG4gICAgY29uc3QgbSA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLl9vd25lZEJ5VGFnLmZvckVhY2goKHtsaXZlU2V0fSwgdGFnKSA9PiB7XG4gICAgICBtLnNldCh0YWcsIGxpdmVTZXQpO1xuICAgIH0pO1xuICAgIHJldHVybiBtO1xuICB9XG5cbiAgZ2V0VGFnKCk6IG51bGx8c3RyaW5nIHtcbiAgICBjb25zdCB7cGFyZW50fSA9IHRoaXMuX2luaXQ7XG4gICAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5nZXRUYWdPZk93bmVkTm9kZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICBvd25zTm9kZShub2RlOiBUYWdUcmVlTm9kZTxUPik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9vd25lZE5vZGVzLmhhcyhub2RlKTtcbiAgfVxuXG4gIGdldFRhZ09mT3duZWROb2RlKG5vZGU6IFRhZ1RyZWVOb2RlPFQ+KTogc3RyaW5nIHtcbiAgICBjb25zdCB0YWcgPSB0aGlzLl9vd25lZE5vZGVzLmdldChub2RlKTtcbiAgICBpZiAodGFnID09IG51bGwpIHRocm93IG5ldyBFcnJvcignbm9kZSBub3Qgb3duZWQnKTtcbiAgICByZXR1cm4gdGFnO1xuICB9XG59XG4iXX0=

/***/ }),

/***/ "./node_modules/tag-tree/js/index.js":
/*!*******************************************!*\
  !*** ./node_modules/tag-tree/js/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TagTree", {
  enumerable: true,
  get: function get() {
    return _TagTree.default;
  }
});
Object.defineProperty(exports, "TagTreeNode", {
  enumerable: true,
  get: function get() {
    return _TagTreeNode.default;
  }
});

var _TagTree = _interopRequireDefault(__webpack_require__(/*! ./TagTree */ "./node_modules/tag-tree/js/TagTree.js"));

var _TagTreeNode = _interopRequireDefault(__webpack_require__(/*! ./TagTreeNode */ "./node_modules/tag-tree/js/TagTreeNode.js"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOztBQUdBIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuZXhwb3J0IHtkZWZhdWx0IGFzIFRhZ1RyZWV9IGZyb20gJy4vVGFnVHJlZSc7XG5leHBvcnQgdHlwZSB7VGFnVHJlZUluaXQsIFRhZ1RyZWVDb250cm9sbGVyfSBmcm9tICcuL1RhZ1RyZWUnO1xuXG5leHBvcnQge2RlZmF1bHQgYXMgVGFnVHJlZU5vZGV9IGZyb20gJy4vVGFnVHJlZU5vZGUnO1xuIl19

/***/ }),

/***/ "./node_modules/transducers.js/transducers.js":
/*!****************************************************!*\
  !*** ./node_modules/transducers.js/transducers.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


// basic protocol helpers

var symbolExists = typeof Symbol !== 'undefined';

var protocols = {
  iterator: symbolExists ? Symbol.iterator : '@@iterator'
};

function throwProtocolError(name, coll) {
  throw new Error("don't know how to " + name + " collection: " +
                  coll);
}

function fulfillsProtocol(obj, name) {
  if(name === 'iterator') {
    // Accept ill-formed iterators that don't conform to the
    // protocol by accepting just next()
    return obj[protocols.iterator] || obj.next;
  }

  return obj[protocols[name]];
}

function getProtocolProperty(obj, name) {
  return obj[protocols[name]];
}

function iterator(coll) {
  var iter = getProtocolProperty(coll, 'iterator');
  if(iter) {
    return iter.call(coll);
  }
  else if(coll.next) {
    // Basic duck typing to accept an ill-formed iterator that doesn't
    // conform to the iterator protocol (all iterators should have the
    // @@iterator method and return themselves, but some engines don't
    // have that on generators like older v8)
    return coll;
  }
  else if(isArray(coll)) {
    return new ArrayIterator(coll);
  }
  else if(isObject(coll)) {
    return new ObjectIterator(coll);
  }
}

function ArrayIterator(arr) {
  this.arr = arr;
  this.index = 0;
}

ArrayIterator.prototype.next = function() {
  if(this.index < this.arr.length) {
    return {
      value: this.arr[this.index++],
      done: false
    };
  }
  return {
    done: true
  }
};

function ObjectIterator(obj) {
  this.obj = obj;
  this.keys = Object.keys(obj);
  this.index = 0;
}

ObjectIterator.prototype.next = function() {
  if(this.index < this.keys.length) {
    var k = this.keys[this.index++];
    return {
      value: [k, this.obj[k]],
      done: false
    };
  }
  return {
    done: true
  }
};

// helpers

var toString = Object.prototype.toString;
var isArray = typeof Array.isArray === 'function' ? Array.isArray : function(obj) {
  return toString.call(obj) == '[object Array]';
};

function isFunction(x) {
  return typeof x === 'function';
}

function isObject(x) {
  return x instanceof Object &&
    Object.getPrototypeOf(x) === Object.getPrototypeOf({});
}

function isNumber(x) {
  return typeof x === 'number';
}

function Reduced(value) {
  this['@@transducer/reduced'] = true;
  this['@@transducer/value'] = value;
}

function isReduced(x) {
  return (x instanceof Reduced) || (x && x['@@transducer/reduced']);
}

function deref(x) {
  return x['@@transducer/value'];
}

/**
 * This is for transforms that may call their nested transforms before
 * Reduced-wrapping the result (e.g. "take"), to avoid nested Reduced.
 */
function ensureReduced(val) {
  if(isReduced(val)) {
    return val;
  } else {
    return new Reduced(val);
  }
}

/**
 * This is for tranforms that call their nested transforms when
 * performing completion (like "partition"), to avoid signaling
 * termination after already completing.
 */
function ensureUnreduced(v) {
  if(isReduced(v)) {
    return deref(v);
  } else {
    return v;
  }
}

function reduce(coll, xform, init) {
  if(isArray(coll)) {
    var result = init;
    var index = -1;
    var len = coll.length;
    while(++index < len) {
      result = xform['@@transducer/step'](result, coll[index]);
      if(isReduced(result)) {
        result = deref(result);
        break;
      }
    }
    return xform['@@transducer/result'](result);
  }
  else if(isObject(coll) || fulfillsProtocol(coll, 'iterator')) {
    var result = init;
    var iter = iterator(coll);
    var val = iter.next();
    while(!val.done) {
      result = xform['@@transducer/step'](result, val.value);
      if(isReduced(result)) {
        result = deref(result);
        break;
      }
      val = iter.next();
    }
    return xform['@@transducer/result'](result);
  }
  throwProtocolError('iterate', coll);
}

function transduce(coll, xform, reducer, init) {
  xform = xform(reducer);
  if(init === undefined) {
    init = xform['@@transducer/init']();
  }
  return reduce(coll, xform, init);
}

function compose() {
  var funcs = Array.prototype.slice.call(arguments);
  return function(r) {
    var value = r;
    for(var i=funcs.length-1; i>=0; i--) {
      value = funcs[i](value);
    }
    return value;
  }
}

// transformations

function transformer(f) {
  var t = {};
  t['@@transducer/init'] = function() {
    throw new Error('init value unavailable');
  };
  t['@@transducer/result'] = function(v) {
    return v;
  };
  t['@@transducer/step'] = f;
  return t;
}

function bound(f, ctx, count) {
  count = count != null ? count : 1;

  if(!ctx) {
    return f;
  }
  else {
    switch(count) {
    case 1:
      return function(x) {
        return f.call(ctx, x);
      }
    case 2:
      return function(x, y) {
        return f.call(ctx, x, y);
      }
    default:
      return f.bind(ctx);
    }
  }
}

function arrayMap(arr, f, ctx) {
  var index = -1;
  var length = arr.length;
  var result = Array(length);
  f = bound(f, ctx, 2);

  while (++index < length) {
    result[index] = f(arr[index], index);
  }
  return result;
}

function arrayFilter(arr, f, ctx) {
  var len = arr.length;
  var result = [];
  f = bound(f, ctx, 2);

  for(var i=0; i<len; i++) {
    if(f(arr[i], i)) {
      result.push(arr[i]);
    }
  }
  return result;
}

function Map(f, xform) {
  this.xform = xform;
  this.f = f;
}

Map.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Map.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Map.prototype['@@transducer/step'] = function(res, input) {
  return this.xform['@@transducer/step'](res, this.f(input));
};

function map(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    if(isArray(coll)) {
      return arrayMap(coll, f, ctx);
    }
    return seq(coll, map(f));
  }

  return function(xform) {
    return new Map(f, xform);
  }
}

function Filter(f, xform) {
  this.xform = xform;
  this.f = f;
}

Filter.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Filter.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Filter.prototype['@@transducer/step'] = function(res, input) {
  if(this.f(input)) {
    return this.xform['@@transducer/step'](res, input);
  }
  return res;
};

function filter(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    if(isArray(coll)) {
      return arrayFilter(coll, f, ctx);
    }
    return seq(coll, filter(f));
  }

  return function(xform) {
    return new Filter(f, xform);
  };
}

function remove(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);
  return filter(coll, function(x) { return !f(x); });
}

function keep(coll) {
  return filter(coll, function(x) { return x != null });
}

function Dedupe(xform) {
  this.xform = xform;
  this.last = undefined;
}

Dedupe.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Dedupe.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Dedupe.prototype['@@transducer/step'] = function(result, input) {
  if(input !== this.last) {
    this.last = input;
    return this.xform['@@transducer/step'](result, input);
  }
  return result;
};

function dedupe(coll) {
  if(coll) {
    return seq(coll, dedupe());
  }

  return function(xform) {
    return new Dedupe(xform);
  }
}

function TakeWhile(f, xform) {
  this.xform = xform;
  this.f = f;
}

TakeWhile.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

TakeWhile.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

TakeWhile.prototype['@@transducer/step'] = function(result, input) {
  if(this.f(input)) {
    return this.xform['@@transducer/step'](result, input);
  }
  return new Reduced(result);
};

function takeWhile(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    return seq(coll, takeWhile(f));
  }

  return function(xform) {
    return new TakeWhile(f, xform);
  }
}

function Take(n, xform) {
  this.n = n;
  this.i = 0;
  this.xform = xform;
}

Take.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Take.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Take.prototype['@@transducer/step'] = function(result, input) {
  if (this.i < this.n) {
    result = this.xform['@@transducer/step'](result, input);
    if(this.i + 1 >= this.n) {
      // Finish reducing on the same step as the final value. TODO:
      // double-check that this doesn't break any semantics
      result = ensureReduced(result);
    }
  }
  this.i++;
  return result;
};

function take(coll, n) {
  if(isNumber(coll)) { n = coll; coll = null }

  if(coll) {
    return seq(coll, take(n));
  }

  return function(xform) {
    return new Take(n, xform);
  }
}

function Drop(n, xform) {
  this.n = n;
  this.i = 0;
  this.xform = xform;
}

Drop.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Drop.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Drop.prototype['@@transducer/step'] = function(result, input) {
  if(this.i++ < this.n) {
    return result;
  }
  return this.xform['@@transducer/step'](result, input);
};

function drop(coll, n) {
  if(isNumber(coll)) { n = coll; coll = null }

  if(coll) {
    return seq(coll, drop(n));
  }

  return function(xform) {
    return new Drop(n, xform);
  }
}

function DropWhile(f, xform) {
  this.xform = xform;
  this.f = f;
  this.dropping = true;
}

DropWhile.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

DropWhile.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

DropWhile.prototype['@@transducer/step'] = function(result, input) {
  if(this.dropping) {
    if(this.f(input)) {
      return result;
    }
    else {
      this.dropping = false;
    }
  }
  return this.xform['@@transducer/step'](result, input);
};

function dropWhile(coll, f, ctx) {
  if(isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if(coll) {
    return seq(coll, dropWhile(f));
  }

  return function(xform) {
    return new DropWhile(f, xform);
  }
}

function Partition(n, xform) {
  this.n = n;
  this.i = 0;
  this.xform = xform;
  this.part = new Array(n);
}

Partition.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Partition.prototype['@@transducer/result'] = function(v) {
  if (this.i > 0) {
    return ensureUnreduced(this.xform['@@transducer/step'](v, this.part.slice(0, this.i)));
  }
  return this.xform['@@transducer/result'](v);
};

Partition.prototype['@@transducer/step'] = function(result, input) {
  this.part[this.i] = input;
  this.i += 1;
  if (this.i === this.n) {
    var out = this.part.slice(0, this.n);
    this.part = new Array(this.n);
    this.i = 0;
    return this.xform['@@transducer/step'](result, out);
  }
  return result;
};

function partition(coll, n) {
  if (isNumber(coll)) {
    n = coll; coll = null;
  }

  if (coll) {
    return seq(coll, partition(n));
  }

  return function(xform) {
    return new Partition(n, xform);
  };
}

var NOTHING = {};

function PartitionBy(f, xform) {
  // TODO: take an "opts" object that allows the user to specify
  // equality
  this.f = f;
  this.xform = xform;
  this.part = [];
  this.last = NOTHING;
}

PartitionBy.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

PartitionBy.prototype['@@transducer/result'] = function(v) {
  var l = this.part.length;
  if (l > 0) {
    return ensureUnreduced(this.xform['@@transducer/step'](v, this.part.slice(0, l)));
  }
  return this.xform['@@transducer/result'](v);
};

PartitionBy.prototype['@@transducer/step'] = function(result, input) {
  var current = this.f(input);
  if (current === this.last || this.last === NOTHING) {
    this.part.push(input);
  } else {
    result = this.xform['@@transducer/step'](result, this.part);
    this.part = [input];
  }
  this.last = current;
  return result;
};

function partitionBy(coll, f, ctx) {
  if (isFunction(coll)) { ctx = f; f = coll; coll = null; }
  f = bound(f, ctx);

  if (coll) {
    return seq(coll, partitionBy(f));
  }

  return function(xform) {
    return new PartitionBy(f, xform);
  };
}

function Interpose(sep, xform) {
  this.sep = sep;
  this.xform = xform;
  this.started = false;
}

Interpose.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Interpose.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Interpose.prototype['@@transducer/step'] = function(result, input) {
  if (this.started) {
    var withSep = this.xform['@@transducer/step'](result, this.sep);
    if (isReduced(withSep)) {
      return withSep;
    } else {
      return this.xform['@@transducer/step'](withSep, input);
    }
  } else {
    this.started = true;
    return this.xform['@@transducer/step'](result, input);
  }
};

/**
 * Returns a new collection containing elements of the given
 * collection, separated by the specified separator. Returns a
 * transducer if a collection is not provided.
 */
function interpose(coll, separator) {
  if (arguments.length === 1) {
    separator = coll;
    return function(xform) {
      return new Interpose(separator, xform);
    };
  }
  return seq(coll, interpose(separator));
}

function Repeat(n, xform) {
  this.xform = xform;
  this.n = n;
}

Repeat.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Repeat.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Repeat.prototype['@@transducer/step'] = function(result, input) {
  var n = this.n;
  var r = result;
  for (var i = 0; i < n; i++) {
    r = this.xform['@@transducer/step'](r, input);
    if (isReduced(r)) {
      break;
    }
  }
  return r;
};

/**
 * Returns a new collection containing elements of the given
 * collection, each repeated n times. Returns a transducer if a
 * collection is not provided.
 */
function repeat(coll, n) {
  if (arguments.length === 1) {
    n = coll;
    return function(xform) {
      return new Repeat(n, xform);
    };
  }
  return seq(coll, repeat(n));
}

function TakeNth(n, xform) {
  this.xform = xform;
  this.n = n;
  this.i = -1;
}

TakeNth.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

TakeNth.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

TakeNth.prototype['@@transducer/step'] = function(result, input) {
  this.i += 1;
  if (this.i % this.n === 0) {
    return this.xform['@@transducer/step'](result, input);
  }
  return result;
};

/**
 * Returns a new collection of every nth element of the given
 * collection. Returns a transducer if a collection is not provided.
 */
function takeNth(coll, nth) {
  if (arguments.length === 1) {
    nth = coll;
    return function(xform) {
      return new TakeNth(nth, xform);
    };
  }
  return seq(coll, takeNth(nth));
}

// pure transducers (cannot take collections)

function Cat(xform) {
  this.xform = xform;
}

Cat.prototype['@@transducer/init'] = function() {
  return this.xform['@@transducer/init']();
};

Cat.prototype['@@transducer/result'] = function(v) {
  return this.xform['@@transducer/result'](v);
};

Cat.prototype['@@transducer/step'] = function(result, input) {
  var xform = this.xform;
  var newxform = {};
  newxform['@@transducer/init'] = function() {
    return xform['@@transducer/init']();
  };
  newxform['@@transducer/result'] = function(v) {
    return v;
  };
  newxform['@@transducer/step'] = function(result, input) {
    var val = xform['@@transducer/step'](result, input);
    return isReduced(val) ? deref(val) : val;
  };

  return reduce(input, newxform, result);
};

function cat(xform) {
  return new Cat(xform);
}

function mapcat(f, ctx) {
  f = bound(f, ctx);
  return compose(map(f), cat);
}

// collection helpers

function push(arr, x) {
  arr.push(x);
  return arr;
}

function merge(obj, x) {
  if(isArray(x) && x.length === 2) {
    obj[x[0]] = x[1];
  }
  else {
    var keys = Object.keys(x);
    var len = keys.length;
    for(var i=0; i<len; i++) {
      obj[keys[i]] = x[keys[i]];
    }
  }
  return obj;
}

var arrayReducer = {};
arrayReducer['@@transducer/init'] = function() {
  return [];
};
arrayReducer['@@transducer/result'] = function(v) {
  return v;
};
arrayReducer['@@transducer/step'] = push;

var objReducer = {};
objReducer['@@transducer/init'] = function() {
  return {};
};
objReducer['@@transducer/result'] = function(v) {
  return v;
};
objReducer['@@transducer/step'] = merge;

// building new collections

function toArray(coll, xform) {
  if(!xform) {
    return reduce(coll, arrayReducer, []);
  }
  return transduce(coll, xform, arrayReducer, []);
}

function toObj(coll, xform) {
  if(!xform) {
    return reduce(coll, objReducer, {});
  }
  return transduce(coll, xform, objReducer, {});
}

function toIter(coll, xform) {
  if(!xform) {
    return iterator(coll);
  }
  return new LazyTransformer(xform, coll);
}

function seq(coll, xform) {
  if(isArray(coll)) {
    return transduce(coll, xform, arrayReducer, []);
  }
  else if(isObject(coll)) {
    return transduce(coll, xform, objReducer, {});
  }
  else if(coll['@@transducer/step']) {
    var init;
    if(coll['@@transducer/init']) {
      init = coll['@@transducer/init']();
    }
    else {
      init = new coll.constructor();
    }

    return transduce(coll, xform, coll, init);
  }
  else if(fulfillsProtocol(coll, 'iterator')) {
    return new LazyTransformer(xform, coll);
  }
  throwProtocolError('sequence', coll);
}

function into(to, xform, from) {
  if(isArray(to)) {
    return transduce(from, xform, arrayReducer, to);
  }
  else if(isObject(to)) {
    return transduce(from, xform, objReducer, to);
  }
  else if(to['@@transducer/step']) {
    return transduce(from,
                     xform,
                     to,
                     to);
  }
  throwProtocolError('into', to);
}

// laziness

var stepper = {};
stepper['@@transducer/result'] = function(v) {
  return isReduced(v) ? deref(v) : v;
};
stepper['@@transducer/step'] = function(lt, x) {
  lt.items.push(x);
  return lt.rest;
};

function Stepper(xform, iter) {
  this.xform = xform(stepper);
  this.iter = iter;
}

Stepper.prototype['@@transducer/step'] = function(lt) {
  var len = lt.items.length;
  while(lt.items.length === len) {
    var n = this.iter.next();
    if(n.done || isReduced(n.value)) {
      // finalize
      this.xform['@@transducer/result'](this);
      break;
    }

    // step
    this.xform['@@transducer/step'](lt, n.value);
  }
}

function LazyTransformer(xform, coll) {
  this.iter = iterator(coll);
  this.items = [];
  this.stepper = new Stepper(xform, iterator(coll));
}

LazyTransformer.prototype[protocols.iterator] = function() {
  return this;
}

LazyTransformer.prototype.next = function() {
  this['@@transducer/step']();

  if(this.items.length) {
    return {
      value: this.items.pop(),
      done: false
    }
  }
  else {
    return { done: true };
  }
};

LazyTransformer.prototype['@@transducer/step'] = function() {
  if(!this.items.length) {
    this.stepper['@@transducer/step'](this);
  }
}

// util

function range(n) {
  var arr = new Array(n);
  for(var i=0; i<arr.length; i++) {
    arr[i] = i;
  }
  return arr;
}

module.exports = {
  reduce: reduce,
  transformer: transformer,
  Reduced: Reduced,
  isReduced: isReduced,
  iterator: iterator,
  push: push,
  merge: merge,
  transduce: transduce,
  seq: seq,
  toArray: toArray,
  toObj: toObj,
  toIter: toIter,
  into: into,
  compose: compose,
  map: map,
  filter: filter,
  remove: remove,
  cat: cat,
  mapcat: mapcat,
  keep: keep,
  dedupe: dedupe,
  take: take,
  takeWhile: takeWhile,
  takeNth: takeNth,
  drop: drop,
  dropWhile: dropWhile,
  partition: partition,
  partitionBy: partitionBy,
  interpose: interpose,
  repeat: repeat,
  range: range,

  LazyTransformer: LazyTransformer
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/zen-observable/index.js":
/*!**********************************************!*\
  !*** ./node_modules/zen-observable/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/Observable.js */ "./node_modules/zen-observable/lib/Observable.js").Observable;


/***/ }),

/***/ "./node_modules/zen-observable/lib/Observable.js":
/*!*******************************************************!*\
  !*** ./node_modules/zen-observable/lib/Observable.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// === Symbol Support ===
var hasSymbols = function () {
  return typeof Symbol === 'function';
};

var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};

var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return undefined;
  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;

  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];

    if (ctor === null) {
      ctor = undefined;
    }
  }

  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;
  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');

      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;

  if (!queue) {
    return;
  }

  subscription._queue = undefined;
  subscription._state = 'ready';

  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';
  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);

    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;

      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;

      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({
      type: type,
      value: value
    });

    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{
      type: type,
      value: value
    }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription =
/*#__PURE__*/
function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription);

    // ASSERT: observer is an object
    // ASSERT: subscriber is callable
    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';
    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: "unsubscribe",
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: "closed",
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver =
/*#__PURE__*/
function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: "next",
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: "error",
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: "complete",
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: "closed",
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable =
/*#__PURE__*/
function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }

      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: "forEach",
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: "map",
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "filter",
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }

            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "reduce",
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;
      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: "concat",
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);
      return new C(function (observer) {
        var subscription;
        var index = 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (index === sources.length) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources[index++]));
              }
            }
          });
        }

        startNext(_this5);
        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: "flatMap",
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
      var C = getSpecies(this);
      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });
            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: SymbolObservable,
    value: function () {
      return this;
    }
  }], [{
    key: "from",
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;
      if (x == null) throw new TypeError(x + ' is not an object');
      var method = getMethod(x, SymbolObservable);

      if (method) {
        var observable = method.call(x);
        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
        if (isObservable(observable) && observable.constructor === C) return observable;
        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, SymbolIterator);

        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var _item = _step.value;
                  observer.next(_item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;
      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;

          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }

          observer.complete();
        });
      });
    }
  }, {
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

exports.Observable = Observable;

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYnVpbGQvY29tcG9uZW50cy95b3V0dWJlL1lvdXR1YmVIb21lLmpzIiwid2VicGFjazovLy8uL2J1aWxkL21vZHVsZXMvQ29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2J1aWxkL21vZHVsZXMvQ29tcG9uZW50QnVpbGRlci5qcyIsIndlYnBhY2s6Ly8vLi9idWlsZC9tb2R1bGVzL0VsZW1lbnRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9idWlsZC9tb2R1bGVzL0V2ZW50TGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYnVpbGQvc2NyaXB0cy9jb250ZW50X3NjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hc2FwL2Jyb3dzZXItYXNhcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXNhcC9icm93c2VyLXJhdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl2ZS1zZXQvU2NoZWR1bGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXZlLXNldC9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdmUtc2V0L2ZsYXRNYXBSLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXZlLXNldC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbGl2ZS1zZXQvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2xpdmUtc2V0L3RvVmFsdWVPYnNlcnZhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saXZlLXNldC90cmFuc2R1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21hdGNoZXMtc2VsZWN0b3ItbmcvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhZ2UtcGFyc2VyLXRyZWUvanMvY3JlYXRlVHJhbnNmb3JtZXIvY3JlYXRlQ3NzRm4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhZ2UtcGFyc2VyLXRyZWUvanMvY3JlYXRlVHJhbnNmb3JtZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhZ2UtcGFyc2VyLXRyZWUvanMvY3JlYXRlVHJhbnNmb3JtZXIvd2F0Y2hGaWx0ZXJlZENoaWxkcmVuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYWdlLXBhcnNlci10cmVlL2pzL2NyZWF0ZVRyYW5zZm9ybWVyL3dhdGNoTXV0YXRpb25zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYWdlLXBhcnNlci10cmVlL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYWdlLXBhcnNlci10cmVlL2pzL3dhdGNoZXJGaW5kZXJNZXJnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9lcy9wb255ZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGFnLXRyZWUvanMvVGFnVHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGFnLXRyZWUvanMvVGFnVHJlZU5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3RhZy10cmVlL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90cmFuc2R1Y2Vycy5qcy90cmFuc2R1Y2Vycy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9oYXJtb255LW1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvemVuLW9ic2VydmFibGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3plbi1vYnNlcnZhYmxlL2xpYi9PYnNlcnZhYmxlLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiWW91dHViZUhvbWVPYnNlcnZlciIsIkNvbXBvbmVudF8xIiwicmVxdWlyZSIsIkVsZW1lbnRPYnNlcnZlcl8xIiwiWW91dHViZUhvbWUiLCJkZWZhdWx0IiwiY29uc3RydWN0b3IiLCJidWlsZGVyIiwiY29uc29sZSIsImxvZyIsImNvbnRlbnQiLCJvYnNlcnZlciIsInN1YnNjcmliZSIsImVsZW1lbnRBZGRlZCIsImFkZExpc3RlbmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJ0aHVtYm5haWwiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwiaW5jbHVkZXMiLCJ0aXRsZSIsImlubmVySFRNTCIsInN0eWxlIiwic2V0UHJvcGVydHkiLCJjb21wb25lbnQiLCJ0YWdzIiwiYm9keSIsIm93bmVkQnkiLCJncmlkX2l0ZW0iLCJncmlkX2l0ZW1fcGxheWxpc3QiLCJ3YXRjaGVycyIsInNvdXJjZXMiLCJ0YWciLCJzZWxlY3RvcnMiLCJmaW5kZXJzIiwiRXZlbnRMaXN0ZW5lcl8xIiwiQ29tcG9uZW50IiwibmFtZSIsInVybCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZXZlbnRMaXN0ZW5lciIsImJhY2tncm91bmQiLCJjYWxsYmFjayIsImRlYnVnIiwiZGlzcGF0Y2hFdmVudCIsImRhdGEiLCJwcm90b2NvbCIsImxvY2F0aW9uIiwiQ29tcG9uZW50QnVpbGRlciIsImFkZE5hbWUiLCJhZGRVcmwiLCJhZGRPYnNlcnZlciIsImJ1aWxkIiwibWVzc2VuZ2VyIiwiY29ubmVjdCIsIndhdGNoIiwiTXV0YXRpb25FbWl0dGVyIiwicGFnZV9wYXJzZXJfdHJlZV8xIiwidG9WYWx1ZU9ic2VydmFibGVfMSIsImVsZW1lbnRSZW1vdmVkIiwiRWxlbWVudE9ic2VydmVyIiwib3B0aW9ucyIsInBhZ2UiLCJkb2N1bWVudCIsIm9uUmVhZHkiLCJ3aW5kb3ciLCJocmVmIiwibXV0YXRpb25FdmVudCIsImxpc3RlbmVyIiwiZWxlbWVudCIsImluZGV4IiwiZ2V0RWxlbWVudEluZGV4IiwidHJlZSIsImdldEFsbCIsImZvckVhY2giLCJub2RlcyIsInJlbW92YWwiLCJnZXRUYWciLCJnZXRWYWx1ZSIsInRoZW4iLCJhcmcxIiwibXV0YXRpb25zIiwicGFyZW50RWxlbWVudCIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiY2hpbGRyZW4iLCJpbmRleE9mIiwiTGlzdGVuZXIiLCJhcmcyIiwiZmluZCIsInRvU3RyaW5nIiwiRXZlbnRMaXN0ZW5lciIsImxpc3RlbmVycyIsImFzc2VydCIsImZpbmRMaXN0ZW5lciIsInNvbWUiLCJwdXNoIiwicmVtb3ZlTGlzdGVuZXIiLCJmaWx0ZXIiLCJsaXN0ZW5lckluZGV4Iiwic3BsaWNlIiwiWW91dHViZUhvbWVfMSIsIkNvbXBvbmVudEJ1aWxkZXJfMSIsInlvdXR1YmVIb21lIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUNiQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQUVDLE9BQUssRUFBRTtBQUFULENBQTdDO0FBQ0FELE9BQU8sQ0FBQ0UsbUJBQVIsR0FBOEIsS0FBSyxDQUFuQzs7QUFDQSxNQUFNQyxXQUFXLEdBQUdDLG1CQUFP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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakVBLDhDQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxrQkFBa0I7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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OztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7OztBQUdsRDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsTUFBTTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsU0FBUyxVQUFVLGFBQWE7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLFNBQVMsVUFBVSxhQUFhO0FBQ3hEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixTQUFTLFVBQVUsYUFBYTtBQUN4RDtBQUNBLG1DQUFtQyxjQUFjLEVBQUU7QUFDbkQ7O0FBRUE7QUFDQSxtQ0FBbUMsbUJBQW1CO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsU0FBUyxVQUFVLGFBQWE7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsVUFBVTs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsVUFBVTs7QUFFaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLFNBQVMsVUFBVSxhQUFhO0FBQ3hEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QixTQUFTLFVBQVUsYUFBYTtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBLDhDQUE4QztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGNBQWM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyOEJBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkJBLGlCQUFpQixtQkFBTyxDQUFDLDRFQUFxQjs7Ozs7Ozs7Ozs7OztBQ0FqQzs7QUFFYjtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFOztBQUUzVCw2REFBNkQsc0VBQXNFLDhEQUE4RCxvQkFBb0I7O0FBRXJOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUEsMEVBQTBFO0FBQzFFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0gsQyIsImZpbGUiOiJjb250ZW50X3NjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYnVpbGQvc2NyaXB0cy9jb250ZW50X3NjcmlwdC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Zb3V0dWJlSG9tZU9ic2VydmVyID0gdm9pZCAwO1xuY29uc3QgQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiQG1vZHVsZXMvQ29tcG9uZW50XCIpO1xuY29uc3QgRWxlbWVudE9ic2VydmVyXzEgPSByZXF1aXJlKFwiQG1vZHVsZXMvRWxlbWVudE9ic2VydmVyXCIpO1xuY2xhc3MgWW91dHViZUhvbWUgZXh0ZW5kcyBDb21wb25lbnRfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihidWlsZGVyKSB7XG4gICAgICAgIHN1cGVyKGJ1aWxkZXIpO1xuICAgICAgICBjb25zb2xlLmxvZygnWVQgTm8gTXVzaWMnKTtcbiAgICAgICAgLy8gQ29udGVudCBTY3JpcHRcbiAgICAgICAgdGhpcy5jb250ZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vYnNlcnZlci5zdWJzY3JpYmUoJ2dyaWRfaXRlbScpXG4gICAgICAgICAgICAgICAgLmVsZW1lbnRBZGRlZC5hZGRMaXN0ZW5lcihldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICBsZXQgdGh1bWJuYWlsID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJyN0aHVtYm5haWwnKTtcbiAgICAgICAgICAgICAgICBpZiAodGh1bWJuYWlsICYmIHRodW1ibmFpbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5pbmNsdWRlcygnJnN0YXJ0X3JhZGlvPTEnKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGl0bGUgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignI3ZpZGVvLXRpdGxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmluZyB2aWRlbycsIHRpdGxlLmlubmVySFRNTCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJywgJ2ltcG9ydGFudCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFlvdXR1YmVIb21lO1xuY2xhc3MgWW91dHViZUhvbWVPYnNlcnZlciBleHRlbmRzIEVsZW1lbnRPYnNlcnZlcl8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgICAgICBzdXBlcihjb21wb25lbnQsIHtcbiAgICAgICAgICAgIHRhZ3M6IHtcbiAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgIG93bmVkQnk6IFtdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncmlkX2l0ZW06IHtcbiAgICAgICAgICAgICAgICAgICAgb3duZWRCeTogWydib2R5J11cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdyaWRfaXRlbV9wbGF5bGlzdDoge1xuICAgICAgICAgICAgICAgICAgICBvd25lZEJ5OiBbJ2dyaWRfaXRlbSddXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdhdGNoZXJzOiBbXG4gICAgICAgICAgICAgICAgeyBzb3VyY2VzOiBbbnVsbF0sIHRhZzogJ2JvZHknLCBzZWxlY3RvcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdib2R5J1xuICAgICAgICAgICAgICAgICAgICBdIH0sXG4gICAgICAgICAgICAgICAgeyBzb3VyY2VzOiBbJ2JvZHknXSwgdGFnOiAneXRkX2FwcCcsIHNlbGVjdG9yczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3l0ZC1hcHAnXG4gICAgICAgICAgICAgICAgICAgIF0gfSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZXM6IFsneXRkX2FwcCddLCB0YWc6ICdncmlkX2l0ZW0nLCBzZWxlY3RvcnM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYjY29udGVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAneXRkLXBhZ2UtbWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAneXRkLWJyb3dzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAneXRkLXR3by1jb2x1bW4tYnJvd3NlLXJlc3VsdHMtcmVuZGVyZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdiNwcmltYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd5dGQtcmljaC1ncmlkLXJlbmRlcmVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYjY29udGVudHMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3l0ZC1yaWNoLWl0ZW0tcmVuZGVyZXInXG4gICAgICAgICAgICAgICAgICAgIF0gfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGZpbmRlcnM6IHt9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuWW91dHViZUhvbWVPYnNlcnZlciA9IFlvdXR1YmVIb21lT2JzZXJ2ZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEV2ZW50TGlzdGVuZXJfMSA9IHJlcXVpcmUoXCJAbW9kdWxlcy9FdmVudExpc3RlbmVyXCIpO1xuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihidWlsZGVyKSB7XG4gICAgICAgIHRoaXMubmFtZSA9ICcnO1xuICAgICAgICB0aGlzLnVybCA9ICcnO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBnZXRDb250ZXh0KCk7XG4gICAgICAgIHRoaXMubmFtZSA9IGJ1aWxkZXIubmFtZTtcbiAgICAgICAgdGhpcy51cmwgPSBidWlsZGVyLnVybDtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyID0gbmV3IEV2ZW50TGlzdGVuZXJfMS5kZWZhdWx0KCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBidWlsZGVyLm9ic2VydmVyICYmIG5ldyBidWlsZGVyLm9ic2VydmVyKHRoaXMpO1xuICAgIH1cbiAgICBiYWNrZ3JvdW5kKCkge1xuICAgIH1cbiAgICBjb250ZW50KCkge1xuICAgIH1cbiAgICBhZGRMaXN0ZW5lcihuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zb2xlLmRlYnVnKCdDb21wb25lbnQ6IGFkZGluZyBldmVudCBsaXN0ZW5lciBmb3InLCBuYW1lKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyLmFkZExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZGlzcGF0Y2hFdmVudChuYW1lLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoJ0NvbXBvbmVudDogZGlzcGF0Y2hpbmcgZXZlbnQgZm9yJywgbmFtZSk7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lci5kaXNwYXRjaEV2ZW50KG5hbWUsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gQ29tcG9uZW50O1xuZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcbiAgICBjb25zdCBwcm90b2NvbCA9IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIGNvbnN0IGNvbnRleHQgPSBwcm90b2NvbCA9PT0gJ2Nocm9tZS1leHRlbnNpb246JyA/ICdiYWNrZ3JvdW5kJyA6XG4gICAgICAgIHByb3RvY29sID09PSAnaHR0cDonIHx8IHByb3RvY29sID09PSAnaHR0cHM6JyA/ICdjb250ZW50JyA6IG51bGw7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIENvbXBvbmVudEJ1aWxkZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLm5hbWUgPSAnJztcbiAgICAgICAgdGhpcy51cmwgPSAnJztcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgfVxuICAgIGFkZE5hbWUobmFtZSkge1xuICAgICAgICBpZiAoIW5hbWUpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFVybCh1cmwpIHtcbiAgICAgICAgaWYgKCF1cmwpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBhZGRPYnNlcnZlcihvYnNlcnZlcikge1xuICAgICAgICBpZiAoIW9ic2VydmVyKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIgPSBvYnNlcnZlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGJ1aWxkKCkge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gbmV3IHRoaXMuY29tcG9uZW50KHRoaXMpO1xuICAgICAgICAvLyBCYWNrZ3JvdW5kIHNjcmlwdFxuICAgICAgICBpZiAoY29tcG9uZW50LmNvbnRleHQgPT0gJ2JhY2tncm91bmQnKSB7XG4gICAgICAgICAgICBjb21wb25lbnQuYmFja2dyb3VuZCgpO1xuICAgICAgICAgICAgY29tcG9uZW50Lm1lc3NlbmdlciAmJiBjb21wb25lbnQubWVzc2VuZ2VyLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDb250ZW50IFNjcmlwdFxuICAgICAgICBpZiAoY29tcG9uZW50LmNvbnRleHQgPT0gJ2NvbnRlbnQnKSB7XG4gICAgICAgICAgICBjb21wb25lbnQuY29udGVudCgpO1xuICAgICAgICAgICAgY29tcG9uZW50Lm9ic2VydmVyICYmIGNvbXBvbmVudC5vYnNlcnZlci53YXRjaCgpO1xuICAgICAgICAgICAgY29tcG9uZW50Lm1lc3NlbmdlciAmJiBjb21wb25lbnQubWVzc2VuZ2VyLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IENvbXBvbmVudEJ1aWxkZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTXV0YXRpb25FbWl0dGVyID0gdm9pZCAwO1xuY29uc3QgcGFnZV9wYXJzZXJfdHJlZV8xID0gcmVxdWlyZShcInBhZ2UtcGFyc2VyLXRyZWVcIik7XG5jb25zdCB0b1ZhbHVlT2JzZXJ2YWJsZV8xID0gcmVxdWlyZShcImxpdmUtc2V0L3RvVmFsdWVPYnNlcnZhYmxlXCIpO1xuY29uc3QgRXZlbnRMaXN0ZW5lcl8xID0gcmVxdWlyZShcIkBtb2R1bGVzL0V2ZW50TGlzdGVuZXJcIik7XG5jbGFzcyBNdXRhdGlvbkVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRBZGRlZCA9IG5ldyBFdmVudExpc3RlbmVyXzEuZGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmVsZW1lbnRSZW1vdmVkID0gbmV3IEV2ZW50TGlzdGVuZXJfMS5kZWZhdWx0KCk7XG4gICAgfVxufVxuZXhwb3J0cy5NdXRhdGlvbkVtaXR0ZXIgPSBNdXRhdGlvbkVtaXR0ZXI7XG5jbGFzcyBFbGVtZW50T2JzZXJ2ZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnBhZ2UgPSBuZXcgcGFnZV9wYXJzZXJfdHJlZV8xLmRlZmF1bHQoZG9jdW1lbnQsIG9wdGlvbnMgfHwge1xuICAgICAgICAgICAgdGFnczoge30sXG4gICAgICAgICAgICB3YXRjaGVyczogW10sXG4gICAgICAgICAgICBmaW5kZXJzOiB7fVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lbGVtZW50QWRkZWQgPSBuZXcgRXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50UmVtb3ZlZCA9IG5ldyBFdmVudExpc3RlbmVyXzEuZGVmYXVsdCgpO1xuICAgICAgICB0aGlzLm9uUmVhZHkgPSBuZXcgRXZlbnRMaXN0ZW5lcl8xLmRlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnQgPSBjb21wb25lbnQ7XG4gICAgfVxuICAgIHdhdGNoKCkge1xuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKHRoaXMuY29tcG9uZW50LnVybCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IG11dGF0aW9uRXZlbnQgPSAobGlzdGVuZXIsIHRhZywgZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0ge1xuICAgICAgICAgICAgICAgIHRhZzogdGFnLFxuICAgICAgICAgICAgICAgIHRhcmdldDogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBpbmRleDogZ2V0RWxlbWVudEluZGV4KGVsZW1lbnQpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbGlzdGVuZXIuZGlzcGF0Y2hFdmVudCh0YWcsIGV2ZW50KTtcbiAgICAgICAgICAgIC8vIFRPRE86IHNlbmQgdG8gYWxsIGxpc3RlbmVycyBmb3IgZGVidWdnaW5nIG9yIHNvbWV0aGluZ1xuICAgICAgICAgICAgLy8gbGlzdGVuZXIuZGlzcGF0Y2hFdmVudChldmVudClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wYWdlLnRyZWUuZ2V0QWxsKCkuZm9yRWFjaChub2RlcyA9PiB7XG4gICAgICAgICAgICB0b1ZhbHVlT2JzZXJ2YWJsZV8xLmRlZmF1bHQobm9kZXMpLnN1YnNjcmliZSgoeyB2YWx1ZSwgcmVtb3ZhbCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHRhZyA9IHZhbHVlLmdldFRhZygpO1xuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdmFsdWUuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRlYnVnKCdFbGVtZW50T2JzZXJ2ZXI6IGVsZW1lbnQgYWRkZWQnLCB0YWcpO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uRXZlbnQodGhpcy5lbGVtZW50QWRkZWQsIHRhZywgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZhbC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZygnRWxlbWVudE1vbml0b3I6IGVsZW1lbnQgcmVtb3ZlZCcsIHRhZyk7XG4gICAgICAgICAgICAgICAgICAgIG11dGF0aW9uRXZlbnQodGhpcy5lbGVtZW50UmVtb3ZlZCwgdGFnLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3Vic2NyaWJlKGFyZzEpIHtcbiAgICAgICAgbGV0IG11dGF0aW9ucyA9IG5ldyBNdXRhdGlvbkVtaXR0ZXIoKTtcbiAgICAgICAgLy8gVE9ETyBjaGVjayBmb3IgYWxyZWFkeSBhZGRlZCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5lbGVtZW50QWRkZWQuYWRkTGlzdGVuZXIoYXJnMSwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgbXV0YXRpb25zLmVsZW1lbnRBZGRlZC5kaXNwYXRjaEV2ZW50KGFyZzEsIGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlbW92ZWQuYWRkTGlzdGVuZXIoYXJnMSwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgbXV0YXRpb25zLmVsZW1lbnRSZW1vdmVkLmRpc3BhdGNoRXZlbnQoYXJnMSwgZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG11dGF0aW9ucztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBFbGVtZW50T2JzZXJ2ZXI7XG5mdW5jdGlvbiBnZXRFbGVtZW50SW5kZXgoZWxlbWVudCkge1xuICAgIGlmICghZWxlbWVudC5wYXJlbnRFbGVtZW50KVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgbGV0IG5vZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKTtcbiAgICByZXR1cm4gbm9kZXMuaW5kZXhPZihlbGVtZW50KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgTGlzdGVuZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZzEsIGFyZzIpIHtcbiAgICAgICAgbGV0IG5hbWUgPSB0eXBlb2YgYXJnMSA9PSAnc3RyaW5nJyA/IGFyZzEgOiBudWxsO1xuICAgICAgICBsZXQgY2FsbGJhY2sgPSB0eXBlb2YgYXJnMSA9PSAnZnVuY3Rpb24nID8gYXJnMSA6IGFyZzI7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgZmluZChhcmcxKSB7XG4gICAgICAgIGxldCBuYW1lID0gdHlwZW9mIGFyZzEgPT0gJ3N0cmluZycgPyBhcmcxIDogbnVsbDtcbiAgICAgICAgbGV0IGNhbGxiYWNrID0gdHlwZW9mIGFyZzEgPT0gJ2Z1bmN0aW9uJyA/IGFyZzEgOiBudWxsO1xuICAgICAgICByZXR1cm4gIW5hbWUgJiYgdGhpcy5jYWxsYmFjay50b1N0cmluZygpID09PSBjYWxsYmFjay50b1N0cmluZygpIHx8XG4gICAgICAgICAgICB0aGlzLm5hbWUgPT0gbmFtZTtcbiAgICB9XG59XG5jbGFzcyBFdmVudExpc3RlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgYWRkTGlzdGVuZXIoYXJnMSwgYXJnMikge1xuICAgICAgICBsZXQgbmFtZSA9IHR5cGVvZiBhcmcxID09ICdzdHJpbmcnID8gYXJnMSA6IG51bGw7XG4gICAgICAgIGxldCBjYWxsYmFjayA9IHR5cGVvZiBhcmcxID09ICdmdW5jdGlvbicgPyBhcmcxIDogYXJnMjtcbiAgICAgICAgY29uc29sZS5hc3NlcnQoY2FsbGJhY2spO1xuICAgICAgICBjb25zdCBmaW5kTGlzdGVuZXIgPSAobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAhbmFtZSAmJiBsaXN0ZW5lci5maW5kKGNhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmZpbmQobmFtZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVycy5zb21lKGZpbmRMaXN0ZW5lcikpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobmV3IExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKSk7XG4gICAgfVxuICAgIHJlbW92ZUxpc3RlbmVyKGFyZzEsIGFyZzIpIHtcbiAgICAgICAgbGV0IG5hbWUgPSB0eXBlb2YgYXJnMSA9PSAnc3RyaW5nJyA/IGFyZzEgOiBudWxsO1xuICAgICAgICBsZXQgY2FsbGJhY2sgPSB0eXBlb2YgYXJnMSA9PSAnZnVuY3Rpb24nID8gYXJnMSA6IGFyZzI7XG4gICAgICAgIGNvbnN0IGZpbmRMaXN0ZW5lciA9IChsaXN0ZW5lcikgPT4ge1xuICAgICAgICAgICAgLy8gcmV0dXJuIGxpc3RlbmVyLmZpbmQobmFtZSkgJiYgbGlzdGVuZXIuZmluZChjYWxsYmFjaykgfHxcbiAgICAgICAgICAgIC8vICAgICAgICBsaXN0ZW5lci5maW5kKG5hbWUpIHx8XG4gICAgICAgICAgICAvLyAgICAgICAgbGlzdGVuZXIuZmluZChjYWxsYmFjaylcbiAgICAgICAgICAgIHJldHVybiAhbmFtZSAmJiBsaXN0ZW5lci5maW5kKGNhbGxiYWNrKSB8fFxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmZpbmQobmFtZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmZpbHRlcihmaW5kTGlzdGVuZXIpLmZvckVhY2gobGlzdGVuZXIgPT4ge1xuICAgICAgICAgICAgbGV0IGxpc3RlbmVySW5kZXggPSB0aGlzLmxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ0V2ZW50IFtEZWJ1Z106IHJlbW92aW5nIGxpc3RlbmVyJywgbGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMuc3BsaWNlKGxpc3RlbmVySW5kZXgsIDEpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGlzcGF0Y2hFdmVudChhcmcxLCBhcmcyKSB7XG4gICAgICAgIGxldCBuYW1lID0gdHlwZW9mIGFyZzEgPT0gJ3N0cmluZycgPyBhcmcxIDogbnVsbDtcbiAgICAgICAgbGV0IGV2ZW50ID0gdHlwZW9mIGFyZzEgPT0gJ29iamVjdCcgPyBhcmcxIDogYXJnMjtcbiAgICAgICAgY29uc3QgZmluZExpc3RlbmVyID0gKGxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgICAvLyByZXR1cm4gbGlzdGVuZXIuZmluZChuYW1lKSB8fCBsaXN0ZW5lci5uYW1lID09IG51bGxcbiAgICAgICAgICAgIHJldHVybiBuYW1lICYmIGxpc3RlbmVyLmZpbmQobmFtZSkgfHxcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5uYW1lID09IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGZpbmRMaXN0ZW5lcik7XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IGxpc3RlbmVyLmNhbGxiYWNrKGV2ZW50KSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRMaXN0ZW5lcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgWW91dHViZUhvbWVfMSA9IHJlcXVpcmUoXCJAY29tcG9uZW50cy95b3V0dWJlL1lvdXR1YmVIb21lXCIpO1xuY29uc3QgQ29tcG9uZW50QnVpbGRlcl8xID0gcmVxdWlyZShcIkBtb2R1bGVzL0NvbXBvbmVudEJ1aWxkZXJcIik7XG5jb25zdCB5b3V0dWJlSG9tZSA9IG5ldyBDb21wb25lbnRCdWlsZGVyXzEuZGVmYXVsdChZb3V0dWJlSG9tZV8xLmRlZmF1bHQpXG4gICAgLmFkZE5hbWUoJ3lvdXR1YmUtaG9tZScpXG4gICAgLmFkZFVybCgnaHR0cHM6Ly93d3cueW91dHViZS5jb20nKVxuICAgIC5hZGRPYnNlcnZlcihZb3V0dWJlSG9tZV8xLllvdXR1YmVIb21lT2JzZXJ2ZXIpXG4gICAgLmJ1aWxkKCk7XG4iLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YgOiBmdW5jdGlvbiBfZ2V0UHJvdG90eXBlT2Yobykge1xuICAgIHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7XG4gIH07XG4gIHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mOyIsInZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuL3NldFByb3RvdHlwZU9mXCIpO1xuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBzZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2luaGVyaXRzOyIsImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQgPSByZXF1aXJlKFwiLi9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIik7XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHtcbiAgaWYgKGNhbGwgJiYgKF90eXBlb2YoY2FsbCkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICByZXR1cm4gY2FsbDtcbiAgfVxuXG4gIHJldHVybiBhc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm47IiwiZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG5cbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2V0UHJvdG90eXBlT2Y7IiwiZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyByYXdBc2FwIHByb3ZpZGVzIGV2ZXJ5dGhpbmcgd2UgbmVlZCBleGNlcHQgZXhjZXB0aW9uIG1hbmFnZW1lbnQuXG52YXIgcmF3QXNhcCA9IHJlcXVpcmUoXCIuL3Jhd1wiKTtcbi8vIFJhd1Rhc2tzIGFyZSByZWN5Y2xlZCB0byByZWR1Y2UgR0MgY2h1cm4uXG52YXIgZnJlZVRhc2tzID0gW107XG4vLyBXZSBxdWV1ZSBlcnJvcnMgdG8gZW5zdXJlIHRoZXkgYXJlIHRocm93biBpbiByaWdodCBvcmRlciAoRklGTykuXG4vLyBBcnJheS1hcy1xdWV1ZSBpcyBnb29kIGVub3VnaCBoZXJlLCBzaW5jZSB3ZSBhcmUganVzdCBkZWFsaW5nIHdpdGggZXhjZXB0aW9ucy5cbnZhciBwZW5kaW5nRXJyb3JzID0gW107XG52YXIgcmVxdWVzdEVycm9yVGhyb3cgPSByYXdBc2FwLm1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcih0aHJvd0ZpcnN0RXJyb3IpO1xuXG5mdW5jdGlvbiB0aHJvd0ZpcnN0RXJyb3IoKSB7XG4gICAgaWYgKHBlbmRpbmdFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IHBlbmRpbmdFcnJvcnMuc2hpZnQoKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2FsbHMgYSB0YXNrIGFzIHNvb24gYXMgcG9zc2libGUgYWZ0ZXIgcmV0dXJuaW5nLCBpbiBpdHMgb3duIGV2ZW50LCB3aXRoIHByaW9yaXR5XG4gKiBvdmVyIG90aGVyIGV2ZW50cyBsaWtlIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVwYWludC4gQW4gZXJyb3IgdGhyb3duIGZyb20gYW5cbiAqIGV2ZW50IHdpbGwgbm90IGludGVycnVwdCwgbm9yIGV2ZW4gc3Vic3RhbnRpYWxseSBzbG93IGRvd24gdGhlIHByb2Nlc3Npbmcgb2ZcbiAqIG90aGVyIGV2ZW50cywgYnV0IHdpbGwgYmUgcmF0aGVyIHBvc3Rwb25lZCB0byBhIGxvd2VyIHByaW9yaXR5IGV2ZW50LlxuICogQHBhcmFtIHt7Y2FsbH19IHRhc2sgQSBjYWxsYWJsZSBvYmplY3QsIHR5cGljYWxseSBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgbm9cbiAqIGFyZ3VtZW50cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBhc2FwO1xuZnVuY3Rpb24gYXNhcCh0YXNrKSB7XG4gICAgdmFyIHJhd1Rhc2s7XG4gICAgaWYgKGZyZWVUYXNrcy5sZW5ndGgpIHtcbiAgICAgICAgcmF3VGFzayA9IGZyZWVUYXNrcy5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByYXdUYXNrID0gbmV3IFJhd1Rhc2soKTtcbiAgICB9XG4gICAgcmF3VGFzay50YXNrID0gdGFzaztcbiAgICByYXdBc2FwKHJhd1Rhc2spO1xufVxuXG4vLyBXZSB3cmFwIHRhc2tzIHdpdGggcmVjeWNsYWJsZSB0YXNrIG9iamVjdHMuICBBIHRhc2sgb2JqZWN0IGltcGxlbWVudHNcbi8vIGBjYWxsYCwganVzdCBsaWtlIGEgZnVuY3Rpb24uXG5mdW5jdGlvbiBSYXdUYXNrKCkge1xuICAgIHRoaXMudGFzayA9IG51bGw7XG59XG5cbi8vIFRoZSBzb2xlIHB1cnBvc2Ugb2Ygd3JhcHBpbmcgdGhlIHRhc2sgaXMgdG8gY2F0Y2ggdGhlIGV4Y2VwdGlvbiBhbmQgcmVjeWNsZVxuLy8gdGhlIHRhc2sgb2JqZWN0IGFmdGVyIGl0cyBzaW5nbGUgdXNlLlxuUmF3VGFzay5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICB0aGlzLnRhc2suY2FsbCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChhc2FwLm9uZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaG9vayBleGlzdHMgcHVyZWx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzLlxuICAgICAgICAgICAgLy8gSXRzIG5hbWUgd2lsbCBiZSBwZXJpb2RpY2FsbHkgcmFuZG9taXplZCB0byBicmVhayBhbnkgY29kZSB0aGF0XG4gICAgICAgICAgICAvLyBkZXBlbmRzIG9uIGl0cyBleGlzdGVuY2UuXG4gICAgICAgICAgICBhc2FwLm9uZXJyb3IoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW4gYSB3ZWIgYnJvd3NlciwgZXhjZXB0aW9ucyBhcmUgbm90IGZhdGFsLiBIb3dldmVyLCB0byBhdm9pZFxuICAgICAgICAgICAgLy8gc2xvd2luZyBkb3duIHRoZSBxdWV1ZSBvZiBwZW5kaW5nIHRhc2tzLCB3ZSByZXRocm93IHRoZSBlcnJvciBpbiBhXG4gICAgICAgICAgICAvLyBsb3dlciBwcmlvcml0eSB0dXJuLlxuICAgICAgICAgICAgcGVuZGluZ0Vycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICAgIHJlcXVlc3RFcnJvclRocm93KCk7XG4gICAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLnRhc2sgPSBudWxsO1xuICAgICAgICBmcmVlVGFza3NbZnJlZVRhc2tzLmxlbmd0aF0gPSB0aGlzO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gVXNlIHRoZSBmYXN0ZXN0IG1lYW5zIHBvc3NpYmxlIHRvIGV4ZWN1dGUgYSB0YXNrIGluIGl0cyBvd24gdHVybiwgd2l0aFxuLy8gcHJpb3JpdHkgb3ZlciBvdGhlciBldmVudHMgaW5jbHVkaW5nIElPLCBhbmltYXRpb24sIHJlZmxvdywgYW5kIHJlZHJhd1xuLy8gZXZlbnRzIGluIGJyb3dzZXJzLlxuLy9cbi8vIEFuIGV4Y2VwdGlvbiB0aHJvd24gYnkgYSB0YXNrIHdpbGwgcGVybWFuZW50bHkgaW50ZXJydXB0IHRoZSBwcm9jZXNzaW5nIG9mXG4vLyBzdWJzZXF1ZW50IHRhc2tzLiBUaGUgaGlnaGVyIGxldmVsIGBhc2FwYCBmdW5jdGlvbiBlbnN1cmVzIHRoYXQgaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24gYnkgYSB0YXNrLCB0aGF0IHRoZSB0YXNrIHF1ZXVlIHdpbGwgY29udGludWUgZmx1c2hpbmcgYXNcbi8vIHNvb24gYXMgcG9zc2libGUsIGJ1dCBpZiB5b3UgdXNlIGByYXdBc2FwYCBkaXJlY3RseSwgeW91IGFyZSByZXNwb25zaWJsZSB0b1xuLy8gZWl0aGVyIGVuc3VyZSB0aGF0IG5vIGV4Y2VwdGlvbnMgYXJlIHRocm93biBmcm9tIHlvdXIgdGFzaywgb3IgdG8gbWFudWFsbHlcbi8vIGNhbGwgYHJhd0FzYXAucmVxdWVzdEZsdXNoYCBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duLlxubW9kdWxlLmV4cG9ydHMgPSByYXdBc2FwO1xuZnVuY3Rpb24gcmF3QXNhcCh0YXNrKSB7XG4gICAgaWYgKCFxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcmVxdWVzdEZsdXNoKCk7XG4gICAgICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gRXF1aXZhbGVudCB0byBwdXNoLCBidXQgYXZvaWRzIGEgZnVuY3Rpb24gY2FsbC5cbiAgICBxdWV1ZVtxdWV1ZS5sZW5ndGhdID0gdGFzaztcbn1cblxudmFyIHF1ZXVlID0gW107XG4vLyBPbmNlIGEgZmx1c2ggaGFzIGJlZW4gcmVxdWVzdGVkLCBubyBmdXJ0aGVyIGNhbGxzIHRvIGByZXF1ZXN0Rmx1c2hgIGFyZVxuLy8gbmVjZXNzYXJ5IHVudGlsIHRoZSBuZXh0IGBmbHVzaGAgY29tcGxldGVzLlxudmFyIGZsdXNoaW5nID0gZmFsc2U7XG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBhbiBpbXBsZW1lbnRhdGlvbi1zcGVjaWZpYyBtZXRob2QgdGhhdCBhdHRlbXB0cyB0byBraWNrXG4vLyBvZmYgYSBgZmx1c2hgIGV2ZW50IGFzIHF1aWNrbHkgYXMgcG9zc2libGUuIGBmbHVzaGAgd2lsbCBhdHRlbXB0IHRvIGV4aGF1c3Rcbi8vIHRoZSBldmVudCBxdWV1ZSBiZWZvcmUgeWllbGRpbmcgdG8gdGhlIGJyb3dzZXIncyBvd24gZXZlbnQgbG9vcC5cbnZhciByZXF1ZXN0Rmx1c2g7XG4vLyBUaGUgcG9zaXRpb24gb2YgdGhlIG5leHQgdGFzayB0byBleGVjdXRlIGluIHRoZSB0YXNrIHF1ZXVlLiBUaGlzIGlzXG4vLyBwcmVzZXJ2ZWQgYmV0d2VlbiBjYWxscyB0byBgZmx1c2hgIHNvIHRoYXQgaXQgY2FuIGJlIHJlc3VtZWQgaWZcbi8vIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLlxudmFyIGluZGV4ID0gMDtcbi8vIElmIGEgdGFzayBzY2hlZHVsZXMgYWRkaXRpb25hbCB0YXNrcyByZWN1cnNpdmVseSwgdGhlIHRhc2sgcXVldWUgY2FuIGdyb3dcbi8vIHVuYm91bmRlZC4gVG8gcHJldmVudCBtZW1vcnkgZXhoYXVzdGlvbiwgdGhlIHRhc2sgcXVldWUgd2lsbCBwZXJpb2RpY2FsbHlcbi8vIHRydW5jYXRlIGFscmVhZHktY29tcGxldGVkIHRhc2tzLlxudmFyIGNhcGFjaXR5ID0gMTAyNDtcblxuLy8gVGhlIGZsdXNoIGZ1bmN0aW9uIHByb2Nlc3NlcyBhbGwgdGFza3MgdGhhdCBoYXZlIGJlZW4gc2NoZWR1bGVkIHdpdGhcbi8vIGByYXdBc2FwYCB1bmxlc3MgYW5kIHVudGlsIG9uZSBvZiB0aG9zZSB0YXNrcyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuLy8gSWYgYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24sIGBmbHVzaGAgZW5zdXJlcyB0aGF0IGl0cyBzdGF0ZSB3aWxsIHJlbWFpblxuLy8gY29uc2lzdGVudCBhbmQgd2lsbCByZXN1bWUgd2hlcmUgaXQgbGVmdCBvZmYgd2hlbiBjYWxsZWQgYWdhaW4uXG4vLyBIb3dldmVyLCBgZmx1c2hgIGRvZXMgbm90IG1ha2UgYW55IGFycmFuZ2VtZW50cyB0byBiZSBjYWxsZWQgYWdhaW4gaWYgYW5cbi8vIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5mdW5jdGlvbiBmbHVzaCgpIHtcbiAgICB3aGlsZSAoaW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAvLyBBZHZhbmNlIHRoZSBpbmRleCBiZWZvcmUgY2FsbGluZyB0aGUgdGFzay4gVGhpcyBlbnN1cmVzIHRoYXQgd2Ugd2lsbFxuICAgICAgICAvLyBiZWdpbiBmbHVzaGluZyBvbiB0aGUgbmV4dCB0YXNrIHRoZSB0YXNrIHRocm93cyBhbiBlcnJvci5cbiAgICAgICAgaW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgIHF1ZXVlW2N1cnJlbnRJbmRleF0uY2FsbCgpO1xuICAgICAgICAvLyBQcmV2ZW50IGxlYWtpbmcgbWVtb3J5IGZvciBsb25nIGNoYWlucyBvZiByZWN1cnNpdmUgY2FsbHMgdG8gYGFzYXBgLlxuICAgICAgICAvLyBJZiB3ZSBjYWxsIGBhc2FwYCB3aXRoaW4gdGFza3Mgc2NoZWR1bGVkIGJ5IGBhc2FwYCwgdGhlIHF1ZXVlIHdpbGxcbiAgICAgICAgLy8gZ3JvdywgYnV0IHRvIGF2b2lkIGFuIE8obikgd2FsayBmb3IgZXZlcnkgdGFzayB3ZSBleGVjdXRlLCB3ZSBkb24ndFxuICAgICAgICAvLyBzaGlmdCB0YXNrcyBvZmYgdGhlIHF1ZXVlIGFmdGVyIHRoZXkgaGF2ZSBiZWVuIGV4ZWN1dGVkLlxuICAgICAgICAvLyBJbnN0ZWFkLCB3ZSBwZXJpb2RpY2FsbHkgc2hpZnQgMTAyNCB0YXNrcyBvZmYgdGhlIHF1ZXVlLlxuICAgICAgICBpZiAoaW5kZXggPiBjYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gTWFudWFsbHkgc2hpZnQgYWxsIHZhbHVlcyBzdGFydGluZyBhdCB0aGUgaW5kZXggYmFjayB0byB0aGVcbiAgICAgICAgICAgIC8vIGJlZ2lubmluZyBvZiB0aGUgcXVldWUuXG4gICAgICAgICAgICBmb3IgKHZhciBzY2FuID0gMCwgbmV3TGVuZ3RoID0gcXVldWUubGVuZ3RoIC0gaW5kZXg7IHNjYW4gPCBuZXdMZW5ndGg7IHNjYW4rKykge1xuICAgICAgICAgICAgICAgIHF1ZXVlW3NjYW5dID0gcXVldWVbc2NhbiArIGluZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXVlLmxlbmd0aCAtPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgIGluZGV4ID0gMDtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCBpcyBpbXBsZW1lbnRlZCB1c2luZyBhIHN0cmF0ZWd5IGJhc2VkIG9uIGRhdGEgY29sbGVjdGVkIGZyb21cbi8vIGV2ZXJ5IGF2YWlsYWJsZSBTYXVjZUxhYnMgU2VsZW5pdW0gd2ViIGRyaXZlciB3b3JrZXIgYXQgdGltZSBvZiB3cml0aW5nLlxuLy8gaHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMW1HLTVVWUd1cDVxeEdkRU1Xa2hQNkJXQ3owNTNOVWIyRTFRb1VUVTE2dUEvZWRpdCNnaWQ9NzgzNzI0NTkzXG5cbi8vIFNhZmFyaSA2IGFuZCA2LjEgZm9yIGRlc2t0b3AsIGlQYWQsIGFuZCBpUGhvbmUgYXJlIHRoZSBvbmx5IGJyb3dzZXJzIHRoYXRcbi8vIGhhdmUgV2ViS2l0TXV0YXRpb25PYnNlcnZlciBidXQgbm90IHVuLXByZWZpeGVkIE11dGF0aW9uT2JzZXJ2ZXIuXG4vLyBNdXN0IHVzZSBgZ2xvYmFsYCBvciBgc2VsZmAgaW5zdGVhZCBvZiBgd2luZG93YCB0byB3b3JrIGluIGJvdGggZnJhbWVzIGFuZCB3ZWJcbi8vIHdvcmtlcnMuIGBnbG9iYWxgIGlzIGEgcHJvdmlzaW9uIG9mIEJyb3dzZXJpZnksIE1yLCBNcnMsIG9yIE1vcC5cblxuLyogZ2xvYmFscyBzZWxmICovXG52YXIgc2NvcGUgPSB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogc2VsZjtcbnZhciBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9IHNjb3BlLk11dGF0aW9uT2JzZXJ2ZXIgfHwgc2NvcGUuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblxuLy8gTXV0YXRpb25PYnNlcnZlcnMgYXJlIGRlc2lyYWJsZSBiZWNhdXNlIHRoZXkgaGF2ZSBoaWdoIHByaW9yaXR5IGFuZCB3b3JrXG4vLyByZWxpYWJseSBldmVyeXdoZXJlIHRoZXkgYXJlIGltcGxlbWVudGVkLlxuLy8gVGhleSBhcmUgaW1wbGVtZW50ZWQgaW4gYWxsIG1vZGVybiBicm93c2Vycy5cbi8vXG4vLyAtIEFuZHJvaWQgNC00LjNcbi8vIC0gQ2hyb21lIDI2LTM0XG4vLyAtIEZpcmVmb3ggMTQtMjlcbi8vIC0gSW50ZXJuZXQgRXhwbG9yZXIgMTFcbi8vIC0gaVBhZCBTYWZhcmkgNi03LjFcbi8vIC0gaVBob25lIFNhZmFyaSA3LTcuMVxuLy8gLSBTYWZhcmkgNi03XG5pZiAodHlwZW9mIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihmbHVzaCk7XG5cbi8vIE1lc3NhZ2VDaGFubmVscyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBnaXZlIGRpcmVjdCBhY2Nlc3MgdG8gdGhlIEhUTUxcbi8vIHRhc2sgcXVldWUsIGFyZSBpbXBsZW1lbnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMCwgU2FmYXJpIDUuMC0xLCBhbmQgT3BlcmFcbi8vIDExLTEyLCBhbmQgaW4gd2ViIHdvcmtlcnMgaW4gbWFueSBlbmdpbmVzLlxuLy8gQWx0aG91Z2ggbWVzc2FnZSBjaGFubmVscyB5aWVsZCB0byBhbnkgcXVldWVkIHJlbmRlcmluZyBhbmQgSU8gdGFza3MsIHRoZXlcbi8vIHdvdWxkIGJlIGJldHRlciB0aGFuIGltcG9zaW5nIHRoZSA0bXMgZGVsYXkgb2YgdGltZXJzLlxuLy8gSG93ZXZlciwgdGhleSBkbyBub3Qgd29yayByZWxpYWJseSBpbiBJbnRlcm5ldCBFeHBsb3JlciBvciBTYWZhcmkuXG5cbi8vIEludGVybmV0IEV4cGxvcmVyIDEwIGlzIHRoZSBvbmx5IGJyb3dzZXIgdGhhdCBoYXMgc2V0SW1tZWRpYXRlIGJ1dCBkb2VzXG4vLyBub3QgaGF2ZSBNdXRhdGlvbk9ic2VydmVycy5cbi8vIEFsdGhvdWdoIHNldEltbWVkaWF0ZSB5aWVsZHMgdG8gdGhlIGJyb3dzZXIncyByZW5kZXJlciwgaXQgd291bGQgYmVcbi8vIHByZWZlcnJhYmxlIHRvIGZhbGxpbmcgYmFjayB0byBzZXRUaW1lb3V0IHNpbmNlIGl0IGRvZXMgbm90IGhhdmVcbi8vIHRoZSBtaW5pbXVtIDRtcyBwZW5hbHR5LlxuLy8gVW5mb3J0dW5hdGVseSB0aGVyZSBhcHBlYXJzIHRvIGJlIGEgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDEwIE1vYmlsZSAoYW5kXG4vLyBEZXNrdG9wIHRvIGEgbGVzc2VyIGV4dGVudCkgdGhhdCByZW5kZXJzIGJvdGggc2V0SW1tZWRpYXRlIGFuZFxuLy8gTWVzc2FnZUNoYW5uZWwgdXNlbGVzcyBmb3IgdGhlIHB1cnBvc2VzIG9mIEFTQVAuXG4vLyBodHRwczovL2dpdGh1Yi5jb20va3Jpc2tvd2FsL3EvaXNzdWVzLzM5NlxuXG4vLyBUaW1lcnMgYXJlIGltcGxlbWVudGVkIHVuaXZlcnNhbGx5LlxuLy8gV2UgZmFsbCBiYWNrIHRvIHRpbWVycyBpbiB3b3JrZXJzIGluIG1vc3QgZW5naW5lcywgYW5kIGluIGZvcmVncm91bmRcbi8vIGNvbnRleHRzIGluIHRoZSBmb2xsb3dpbmcgYnJvd3NlcnMuXG4vLyBIb3dldmVyLCBub3RlIHRoYXQgZXZlbiB0aGlzIHNpbXBsZSBjYXNlIHJlcXVpcmVzIG51YW5jZXMgdG8gb3BlcmF0ZSBpbiBhXG4vLyBicm9hZCBzcGVjdHJ1bSBvZiBicm93c2Vycy5cbi8vXG4vLyAtIEZpcmVmb3ggMy0xM1xuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciA2LTlcbi8vIC0gaVBhZCBTYWZhcmkgNC4zXG4vLyAtIEx5bnggMi44Ljdcbn0gZWxzZSB7XG4gICAgcmVxdWVzdEZsdXNoID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGZsdXNoKTtcbn1cblxuLy8gYHJlcXVlc3RGbHVzaGAgcmVxdWVzdHMgdGhhdCB0aGUgaGlnaCBwcmlvcml0eSBldmVudCBxdWV1ZSBiZSBmbHVzaGVkIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLlxuLy8gVGhpcyBpcyB1c2VmdWwgdG8gcHJldmVudCBhbiBlcnJvciB0aHJvd24gaW4gYSB0YXNrIGZyb20gc3RhbGxpbmcgdGhlIGV2ZW50XG4vLyBxdWV1ZSBpZiB0aGUgZXhjZXB0aW9uIGhhbmRsZWQgYnkgTm9kZS5qc+KAmXNcbi8vIGBwcm9jZXNzLm9uKFwidW5jYXVnaHRFeGNlcHRpb25cIilgIG9yIGJ5IGEgZG9tYWluLlxucmF3QXNhcC5yZXF1ZXN0Rmx1c2ggPSByZXF1ZXN0Rmx1c2g7XG5cbi8vIFRvIHJlcXVlc3QgYSBoaWdoIHByaW9yaXR5IGV2ZW50LCB3ZSBpbmR1Y2UgYSBtdXRhdGlvbiBvYnNlcnZlciBieSB0b2dnbGluZ1xuLy8gdGhlIHRleHQgb2YgYSB0ZXh0IG5vZGUgYmV0d2VlbiBcIjFcIiBhbmQgXCItMVwiLlxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spIHtcbiAgICB2YXIgdG9nZ2xlID0gMTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShub2RlLCB7Y2hhcmFjdGVyRGF0YTogdHJ1ZX0pO1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgdG9nZ2xlID0gLXRvZ2dsZTtcbiAgICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlO1xuICAgIH07XG59XG5cbi8vIFRoZSBtZXNzYWdlIGNoYW5uZWwgdGVjaG5pcXVlIHdhcyBkaXNjb3ZlcmVkIGJ5IE1hbHRlIFVibCBhbmQgd2FzIHRoZVxuLy8gb3JpZ2luYWwgZm91bmRhdGlvbiBmb3IgdGhpcyBsaWJyYXJ5LlxuLy8gaHR0cDovL3d3dy5ub25ibG9ja2luZy5pby8yMDExLzA2L3dpbmRvd25leHR0aWNrLmh0bWxcblxuLy8gU2FmYXJpIDYuMC41IChhdCBsZWFzdCkgaW50ZXJtaXR0ZW50bHkgZmFpbHMgdG8gY3JlYXRlIG1lc3NhZ2UgcG9ydHMgb24gYVxuLy8gcGFnZSdzIGZpcnN0IGxvYWQuIFRoYW5rZnVsbHksIHRoaXMgdmVyc2lvbiBvZiBTYWZhcmkgc3VwcG9ydHNcbi8vIE11dGF0aW9uT2JzZXJ2ZXJzLCBzbyB3ZSBkb24ndCBuZWVkIHRvIGZhbGwgYmFjayBpbiB0aGF0IGNhc2UuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21NZXNzYWdlQ2hhbm5lbChjYWxsYmFjaykge1xuLy8gICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4vLyAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBjYWxsYmFjaztcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoMCk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gRm9yIHJlYXNvbnMgZXhwbGFpbmVkIGFib3ZlLCB3ZSBhcmUgYWxzbyB1bmFibGUgdG8gdXNlIGBzZXRJbW1lZGlhdGVgXG4vLyB1bmRlciBhbnkgY2lyY3Vtc3RhbmNlcy5cbi8vIEV2ZW4gaWYgd2Ugd2VyZSwgdGhlcmUgaXMgYW5vdGhlciBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAuXG4vLyBJdCBpcyBub3Qgc3VmZmljaWVudCB0byBhc3NpZ24gYHNldEltbWVkaWF0ZWAgdG8gYHJlcXVlc3RGbHVzaGAgYmVjYXVzZVxuLy8gYHNldEltbWVkaWF0ZWAgbXVzdCBiZSBjYWxsZWQgKmJ5IG5hbWUqIGFuZCB0aGVyZWZvcmUgbXVzdCBiZSB3cmFwcGVkIGluIGFcbi8vIGNsb3N1cmUuXG4vLyBOZXZlciBmb3JnZXQuXG5cbi8vIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21TZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbi8vICAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4vLyAgICAgICAgIHNldEltbWVkaWF0ZShjYWxsYmFjayk7XG4vLyAgICAgfTtcbi8vIH1cblxuLy8gU2FmYXJpIDYuMCBoYXMgYSBwcm9ibGVtIHdoZXJlIHRpbWVycyB3aWxsIGdldCBsb3N0IHdoaWxlIHRoZSB1c2VyIGlzXG4vLyBzY3JvbGxpbmcuIFRoaXMgcHJvYmxlbSBkb2VzIG5vdCBpbXBhY3QgQVNBUCBiZWNhdXNlIFNhZmFyaSA2LjAgc3VwcG9ydHNcbi8vIG11dGF0aW9uIG9ic2VydmVycywgc28gdGhhdCBpbXBsZW1lbnRhdGlvbiBpcyB1c2VkIGluc3RlYWQuXG4vLyBIb3dldmVyLCBpZiB3ZSBldmVyIGVsZWN0IHRvIHVzZSB0aW1lcnMgaW4gU2FmYXJpLCB0aGUgcHJldmFsZW50IHdvcmstYXJvdW5kXG4vLyBpcyB0byBhZGQgYSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgdGhhdCBjYWxscyBmb3IgYSBmbHVzaC5cblxuLy8gYHNldFRpbWVvdXRgIGRvZXMgbm90IGNhbGwgdGhlIHBhc3NlZCBjYWxsYmFjayBpZiB0aGUgZGVsYXkgaXMgbGVzcyB0aGFuXG4vLyBhcHByb3hpbWF0ZWx5IDcgaW4gd2ViIHdvcmtlcnMgaW4gRmlyZWZveCA4IHRocm91Z2ggMTgsIGFuZCBzb21ldGltZXMgbm90XG4vLyBldmVuIHRoZW4uXG5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcihjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbiAgICAgICAgLy8gV2UgZGlzcGF0Y2ggYSB0aW1lb3V0IHdpdGggYSBzcGVjaWZpZWQgZGVsYXkgb2YgMCBmb3IgZW5naW5lcyB0aGF0XG4gICAgICAgIC8vIGNhbiByZWxpYWJseSBhY2NvbW1vZGF0ZSB0aGF0IHJlcXVlc3QuIFRoaXMgd2lsbCB1c3VhbGx5IGJlIHNuYXBwZWRcbiAgICAgICAgLy8gdG8gYSA0IG1pbGlzZWNvbmQgZGVsYXksIGJ1dCBvbmNlIHdlJ3JlIGZsdXNoaW5nLCB0aGVyZSdzIG5vIGRlbGF5XG4gICAgICAgIC8vIGJldHdlZW4gZXZlbnRzLlxuICAgICAgICB2YXIgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoaGFuZGxlVGltZXIsIDApO1xuICAgICAgICAvLyBIb3dldmVyLCBzaW5jZSB0aGlzIHRpbWVyIGdldHMgZnJlcXVlbnRseSBkcm9wcGVkIGluIEZpcmVmb3hcbiAgICAgICAgLy8gd29ya2Vycywgd2UgZW5saXN0IGFuIGludGVydmFsIGhhbmRsZSB0aGF0IHdpbGwgdHJ5IHRvIGZpcmVcbiAgICAgICAgLy8gYW4gZXZlbnQgMjAgdGltZXMgcGVyIHNlY29uZCB1bnRpbCBpdCBzdWNjZWVkcy5cbiAgICAgICAgdmFyIGludGVydmFsSGFuZGxlID0gc2V0SW50ZXJ2YWwoaGFuZGxlVGltZXIsIDUwKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVUaW1lcigpIHtcbiAgICAgICAgICAgIC8vIFdoaWNoZXZlciB0aW1lciBzdWNjZWVkcyB3aWxsIGNhbmNlbCBib3RoIHRpbWVycyBhbmRcbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgdGhlIGNhbGxiYWNrLlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbEhhbmRsZSk7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuLy8gVGhpcyBpcyBmb3IgYGFzYXAuanNgIG9ubHkuXG4vLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXQgZGVwZW5kcyBvblxuLy8gaXRzIGV4aXN0ZW5jZS5cbnJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyID0gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyO1xuXG4vLyBBU0FQIHdhcyBvcmlnaW5hbGx5IGEgbmV4dFRpY2sgc2hpbSBpbmNsdWRlZCBpbiBRLiBUaGlzIHdhcyBmYWN0b3JlZCBvdXRcbi8vIGludG8gdGhpcyBBU0FQIHBhY2thZ2UuIEl0IHdhcyBsYXRlciBhZGFwdGVkIHRvIFJTVlAgd2hpY2ggbWFkZSBmdXJ0aGVyXG4vLyBhbWVuZG1lbnRzLiBUaGVzZSBkZWNpc2lvbnMsIHBhcnRpY3VsYXJseSB0byBtYXJnaW5hbGl6ZSBNZXNzYWdlQ2hhbm5lbCBhbmRcbi8vIHRvIGNhcHR1cmUgdGhlIE11dGF0aW9uT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24gaW4gYSBjbG9zdXJlLCB3ZXJlIGludGVncmF0ZWRcbi8vIGJhY2sgaW50byBBU0FQIHByb3Blci5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90aWxkZWlvL3JzdnAuanMvYmxvYi9jZGRmNzIzMjU0NmE5Y2Y4NTg1MjRiNzVjZGU2ZjllZGY3MjYyMGE3L2xpYi9yc3ZwL2FzYXAuanNcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9hc2FwID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiYXNhcFwiKSk7XG5cbnZhciBDQVBBQ0lUWSA9IDEwMjQ7XG5cbnZhciBTY2hlZHVsZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTY2hlZHVsZXIoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgU2NoZWR1bGVyKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0aGlzLCBcIl9xdWV1ZVwiLCBbXSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGhpcywgXCJfaXNGbHVzaGluZ1wiLCBmYWxzZSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGhpcywgXCJfaW5kZXhcIiwgMCk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShTY2hlZHVsZXIsIFt7XG4gICAga2V5OiBcInNjaGVkdWxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNjaGVkdWxlKGNiKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB0aGlzLl9xdWV1ZS5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjYigpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMuX3F1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAoMCwgX2FzYXAuZGVmYXVsdCkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmbHVzaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICAgIC8vIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvYXNhcC9ibG9iL21hc3Rlci9yYXcuanNcbiAgICAgIGlmICh0aGlzLl9pc0ZsdXNoaW5nKSByZXR1cm47XG4gICAgICB0aGlzLl9pc0ZsdXNoaW5nID0gdHJ1ZTtcbiAgICAgIHZhciBxdWV1ZSA9IHRoaXMuX3F1ZXVlO1xuXG4gICAgICB3aGlsZSAodGhpcy5faW5kZXggPCBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHRoaXMuX2luZGV4O1xuICAgICAgICB0aGlzLl9pbmRleCArPSAxO1xuICAgICAgICBxdWV1ZVtjdXJyZW50SW5kZXhdLmNhbGwoKTtcblxuICAgICAgICBpZiAodGhpcy5faW5kZXggPiBDQVBBQ0lUWSkge1xuICAgICAgICAgIGZvciAodmFyIHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSB0aGlzLl9pbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgICBxdWV1ZVtzY2FuXSA9IHF1ZXVlW3NjYW4gKyB0aGlzLl9pbmRleF07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcXVldWUubGVuZ3RoIC09IHRoaXMuX2luZGV4O1xuICAgICAgICAgIHRoaXMuX2luZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5faW5kZXggPSAwO1xuICAgICAgdGhpcy5faXNGbHVzaGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gU2NoZWR1bGVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTY2hlZHVsZXI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5VFkyaGxaSFZzWlhJdWFuTWlYU3dpYm1GdFpYTWlPbHNpUTBGUVFVTkpWRmtpTENKVFkyaGxaSFZzWlhJaUxDSmpZaUlzSWw5eGRXVjFaU0lzSW5CMWMyZ2lMQ0psSWl3aWMyVjBWR2x0Wlc5MWRDSXNJbXhsYm1kMGFDSXNJbVpzZFhOb0lpd2lYMmx6Um14MWMyaHBibWNpTENKeGRXVjFaU0lzSWw5cGJtUmxlQ0lzSW1OMWNuSmxiblJKYm1SbGVDSXNJbU5oYkd3aUxDSnpZMkZ1SWl3aWJtVjNUR1Z1WjNSb0lsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3T3pzN096czdRVUZGUVRzN1FVRkZRU3hKUVVGTlFTeFJRVUZSTEVkQlFVY3NTVUZCYWtJN08wbEJSWEZDUXl4VE96czdPenRyUkVGRFR5eEZPM1ZFUVVOSUxFczdhMFJCUTA0c1F6czdPenM3TmtKQlJWSkRMRVVzUlVGQll6dEJRVUZCT3p0QlFVTnlRaXhYUVVGTFF5eE5RVUZNTEVOQlFWbERMRWxCUVZvc1EwRkJhVUlzV1VGQlRUdEJRVU55UWl4WlFVRkpPMEZCUTBaR0xGVkJRVUZCTEVWQlFVVTdRVUZEU0N4VFFVWkVMRU5CUlVVc1QwRkJUMGNzUTBGQlVDeEZRVUZWTzBGQlExWkRMRlZCUVVGQkxGVkJRVlVzUTBGQlF5eFpRVUZOTzBGQlEyWXNhMEpCUVUxRUxFTkJRVTQ3UVVGRFJDeFhRVVpUTEVWQlJWQXNRMEZHVHl4RFFVRldPMEZCUjBRN1FVRkRSaXhQUVZKRU96dEJRVk5CTEZWQlFVa3NTMEZCUzBZc1RVRkJUQ3hEUVVGWlNTeE5RVUZhTEV0QlFYVkNMRU5CUVROQ0xFVkJRVGhDTzBGQlF6VkNMREpDUVVGTExGbEJRVTA3UVVGRFZDeFZRVUZCTEV0QlFVa3NRMEZCUTBNc1MwRkJURHRCUVVORUxGTkJSa1E3UVVGSFJEdEJRVU5HT3pzN05FSkJSVTg3UVVGRFRqdEJRVU5CTEZWQlFVa3NTMEZCUzBNc1YwRkJWQ3hGUVVGelFqdEJRVU4wUWl4WFFVRkxRU3hYUVVGTUxFZEJRVzFDTEVsQlFXNUNPMEZCUTBFc1ZVRkJUVU1zUzBGQlN5eEhRVUZITEV0QlFVdFFMRTFCUVc1Q096dEJRVU5CTEdGQlFVOHNTMEZCUzFFc1RVRkJUQ3hIUVVGalJDeExRVUZMTEVOQlFVTklMRTFCUVROQ0xFVkJRVzFETzBGQlEycERMRmxCUVUxTExGbEJRVmtzUjBGQlJ5eExRVUZMUkN4TlFVRXhRanRCUVVOQkxHRkJRVXRCTEUxQlFVd3NTVUZCWlN4RFFVRm1PMEZCUTBGRUxGRkJRVUZCTEV0QlFVc3NRMEZCUTBVc1dVRkJSQ3hEUVVGTUxFTkJRVzlDUXl4SlFVRndRanM3UVVGRFFTeFpRVUZKTEV0QlFVdEdMRTFCUVV3c1IwRkJZMWdzVVVGQmJFSXNSVUZCTkVJN1FVRkRNVUlzWlVGQlN5eEpRVUZKWXl4SlFVRkpMRWRCUVVjc1EwRkJXQ3hGUVVGalF5eFRRVUZUTEVkQlFVZE1MRXRCUVVzc1EwRkJRMGdzVFVGQlRpeEhRVUZsTEV0QlFVdEpMRTFCUVc1RUxFVkJRVEpFUnl4SlFVRkpMRWRCUVVkRExGTkJRV3hGTEVWQlFUWkZSQ3hKUVVGSkxFVkJRV3BHTEVWQlFYRkdPMEZCUTI1R1NpeFpRVUZCUVN4TFFVRkxMRU5CUVVOSkxFbEJRVVFzUTBGQlRDeEhRVUZqU2l4TFFVRkxMRU5CUVVOSkxFbEJRVWtzUjBGQlJ5eExRVUZMU0N4TlFVRmlMRU5CUVc1Q08wRkJRMFE3TzBGQlEwUkVMRlZCUVVGQkxFdEJRVXNzUTBGQlEwZ3NUVUZCVGl4SlFVRm5RaXhMUVVGTFNTeE5RVUZ5UWp0QlFVTkJMR1ZCUVV0QkxFMUJRVXdzUjBGQll5eERRVUZrTzBGQlEwUTdRVUZEUmpzN1FVRkRSRVFzVFVGQlFVRXNTMEZCU3l4RFFVRkRTQ3hOUVVGT0xFZEJRV1VzUTBGQlpqdEJRVU5CTEZkQlFVdEpMRTFCUVV3c1IwRkJZeXhEUVVGa08wRkJRMEVzVjBGQlMwWXNWMEZCVEN4SFFVRnRRaXhMUVVGdVFqdEJRVU5FSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5b2dRR1pzYjNjZ0tpOWNibHh1YVcxd2IzSjBJR0Z6WVhBZ1puSnZiU0FuWVhOaGNDYzdYRzVjYm1OdmJuTjBJRU5CVUVGRFNWUlpJRDBnTVRBeU5EdGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdZMnhoYzNNZ1UyTm9aV1IxYkdWeUlIdGNiaUFnWDNGMVpYVmxPaUJCY25KaGVUd29LVDArZG05cFpENGdQU0JiWFR0Y2JpQWdYMmx6Um14MWMyaHBibWM2SUdKdmIyeGxZVzRnUFNCbVlXeHpaVHRjYmlBZ1gybHVaR1Y0T2lCdWRXMWlaWElnUFNBd08xeHVYRzRnSUhOamFHVmtkV3hsS0dOaU9pQW9LVDArZG05cFpDa2dlMXh1SUNBZ0lIUm9hWE11WDNGMVpYVmxMbkIxYzJnb0tDa2dQVDRnZTF4dUlDQWdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDQWdZMklvS1R0Y2JpQWdJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2dvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnZEdoeWIzY2daVHRjYmlBZ0lDQWdJQ0FnZlN3Z01DazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTazdYRzRnSUNBZ2FXWWdLSFJvYVhNdVgzRjFaWFZsTG14bGJtZDBhQ0E5UFQwZ01Ta2dlMXh1SUNBZ0lDQWdZWE5oY0Nnb0tTQTlQaUI3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVabXgxYzJnb0tUdGNiaUFnSUNBZ0lIMHBPMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1pzZFhOb0tDa2dlMXh1SUNBZ0lDOHZJR0poYzJWa0lHOXVJR2gwZEhCek9pOHZaMmwwYUhWaUxtTnZiUzlyY21semEyOTNZV3d2WVhOaGNDOWliRzlpTDIxaGMzUmxjaTl5WVhjdWFuTmNiaUFnSUNCcFppQW9kR2hwY3k1ZmFYTkdiSFZ6YUdsdVp5a2djbVYwZFhKdU8xeHVJQ0FnSUhSb2FYTXVYMmx6Um14MWMyaHBibWNnUFNCMGNuVmxPMXh1SUNBZ0lHTnZibk4wSUhGMVpYVmxJRDBnZEdocGN5NWZjWFZsZFdVN1hHNGdJQ0FnZDJocGJHVWdLSFJvYVhNdVgybHVaR1Y0SUR3Z2NYVmxkV1V1YkdWdVozUm9LU0I3WEc0Z0lDQWdJQ0JqYjI1emRDQmpkWEp5Wlc1MFNXNWtaWGdnUFNCMGFHbHpMbDlwYm1SbGVEdGNiaUFnSUNBZ0lIUm9hWE11WDJsdVpHVjRJQ3M5SURFN1hHNGdJQ0FnSUNCeGRXVjFaVnRqZFhKeVpXNTBTVzVrWlhoZExtTmhiR3dvS1R0Y2JpQWdJQ0FnSUdsbUlDaDBhR2x6TGw5cGJtUmxlQ0ErSUVOQlVFRkRTVlJaS1NCN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElITmpZVzRnUFNBd0xDQnVaWGRNWlc1bmRHZ2dQU0J4ZFdWMVpTNXNaVzVuZEdnZ0xTQjBhR2x6TGw5cGJtUmxlRHNnYzJOaGJpQThJRzVsZDB4bGJtZDBhRHNnYzJOaGJpc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2NYVmxkV1ZiYzJOaGJsMGdQU0J4ZFdWMVpWdHpZMkZ1SUNzZ2RHaHBjeTVmYVc1a1pYaGRPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhGMVpYVmxMbXhsYm1kMGFDQXRQU0IwYUdsekxsOXBibVJsZUR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmYVc1a1pYZ2dQU0F3TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnhkV1YxWlM1c1pXNW5kR2dnUFNBd08xeHVJQ0FnSUhSb2FYTXVYMmx1WkdWNElEMGdNRHRjYmlBZ0lDQjBhR2x6TGw5cGMwWnNkWE5vYVc1bklEMGdabUZzYzJVN1hHNGdJSDFjYm4xY2JpSmRmUT09IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZmlsdGVyO1xuXG52YXIgXyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi5cIikpO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycywgbm8tcmVkZWNsYXJlICovXG5cbi8qOjogZXhwb3J0IGRlZmF1bHQgZmlsdGVyOyAqL1xuXG4vKjo6IGAgKi9cbmZ1bmN0aW9uIGZpbHRlcihsaXZlU2V0LCBjYikge1xuICByZXR1cm4gbmV3IF8uZGVmYXVsdCh7XG4gICAgc2NoZWR1bGVyOiBsaXZlU2V0LmdldFNjaGVkdWxlcigpLFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICB2YXIgcmV0ID0gbmV3IFNldCgpO1xuICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoY2IodmFsdWUpKSB7XG4gICAgICAgICAgcmV0LmFkZCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9LFxuICAgIGxpc3RlbjogZnVuY3Rpb24gbGlzdGVuKHNldFZhbHVlcywgY29udHJvbGxlcikge1xuICAgICAgdmFyIHBhc3NlZEZpbHRlciA9IG5ldyBTZXQoKTtcbiAgICAgIHZhciBzdWIgPSBsaXZlU2V0LnN1YnNjcmliZSh7XG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICB2YXIgaW5pdGlhbFZhbHVlcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICBsaXZlU2V0LnZhbHVlcygpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoY2IodmFsdWUpKSB7XG4gICAgICAgICAgICAgIHBhc3NlZEZpbHRlci5hZGQodmFsdWUpO1xuICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VmFsdWVzKGluaXRpYWxWYWx1ZXMpO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KGNoYW5nZXMpIHtcbiAgICAgICAgICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS50eXBlID09PSAnYWRkJykge1xuICAgICAgICAgICAgICBpZiAoY2IoY2hhbmdlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHBhc3NlZEZpbHRlci5hZGQoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFkZChjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZS50eXBlID09PSAncmVtb3ZlJykge1xuICAgICAgICAgICAgICBpZiAocGFzc2VkRmlsdGVyLmhhcyhjaGFuZ2UudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcGFzc2VkRmlsdGVyLmRlbGV0ZShjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN1YjtcbiAgICB9XG4gIH0pO1xufVxuLyo6OiBgICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OW1hV3gwWlhJdWFuTWlYU3dpYm1GdFpYTWlPbHNpWm1sc2RHVnlJaXdpYkdsMlpWTmxkQ0lzSW1OaUlpd2lUR2wyWlZObGRDSXNJbk5qYUdWa2RXeGxjaUlzSW1kbGRGTmphR1ZrZFd4bGNpSXNJbkpsWVdRaUxDSnlaWFFpTENKVFpYUWlMQ0oyWVd4MVpYTWlMQ0ptYjNKRllXTm9JaXdpZG1Gc2RXVWlMQ0poWkdRaUxDSnNhWE4wWlc0aUxDSnpaWFJXWVd4MVpYTWlMQ0pqYjI1MGNtOXNiR1Z5SWl3aWNHRnpjMlZrUm1sc2RHVnlJaXdpYzNWaUlpd2ljM1ZpYzJOeWFXSmxJaXdpYzNSaGNuUWlMQ0pwYm1sMGFXRnNWbUZzZFdWeklpd2libVY0ZENJc0ltTm9ZVzVuWlhNaUxDSmphR0Z1WjJVaUxDSjBlWEJsSWl3aWFHRnpJaXdpWkdWc1pYUmxJaXdpY21WdGIzWmxJaXdpWlhKeWIzSWlMQ0psY25JaUxDSmpiMjF3YkdWMFpTSXNJbVZ1WkNKZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096czdPMEZCUjBFN08wRkJSa0U3TzBGQlQwRTdPMEZCUlVFN1FVRkRaU3hUUVVGVFFTeE5RVUZVTEVOQlFXMUNReXhQUVVGdVFpeEZRVUYzUTBNc1JVRkJlRU1zUlVGQk1rVTdRVUZEZUVZc1UwRkJUeXhKUVVGSlF5eFRRVUZLTEVOQlFWazdRVUZEYWtKRExFbEJRVUZCTEZOQlFWTXNSVUZCUlVnc1QwRkJUeXhEUVVGRFNTeFpRVUZTTEVWQlJFMDdRVUZGYWtKRExFbEJRVUZCTEVsQlJtbENMR3RDUVVWV08wRkJRMHdzVlVGQlRVTXNSMEZCUnl4SFFVRkhMRWxCUVVsRExFZEJRVW9zUlVGQldqdEJRVU5CVUN4TlFVRkJRU3hQUVVGUExFTkJRVU5STEUxQlFWSXNSMEZCYVVKRExFOUJRV3BDTEVOQlFYbENMRlZCUVVGRExFdEJRVXNzUlVGQlNUdEJRVU5vUXl4WlFVRkpWQ3hGUVVGRkxFTkJRVU5UTEV0QlFVUXNRMEZCVGl4RlFVRmxPMEZCUTJKS0xGVkJRVUZCTEVkQlFVY3NRMEZCUTBzc1IwRkJTaXhEUVVGUlJDeExRVUZTTzBGQlEwUTdRVUZEUml4UFFVcEVPMEZCUzBFc1lVRkJUMG9zUjBGQlVEdEJRVU5FTEV0QlZtZENPMEZCVjJwQ1RTeEpRVUZCUVN4TlFWaHBRaXhyUWtGWFZrTXNVMEZZVlN4RlFWZERReXhWUVZoRUxFVkJWMkU3UVVGRE5VSXNWVUZCVFVNc1dVRkJXU3hIUVVGSExFbEJRVWxTTEVkQlFVb3NSVUZCY2tJN1FVRkZRU3hWUVVGTlV5eEhRVUZITEVkQlFVZG9RaXhQUVVGUExFTkJRVU5wUWl4VFFVRlNMRU5CUVd0Q08wRkJRelZDUXl4UlFVRkJRU3hMUVVRMFFpeHRRa0ZEY0VJN1FVRkRUaXhqUVVGTlF5eGhRVUZoTEVkQlFVY3NTVUZCU1Zvc1IwRkJTaXhGUVVGMFFqdEJRVU5CVUN4VlFVRkJRU3hQUVVGUExFTkJRVU5STEUxQlFWSXNSMEZCYVVKRExFOUJRV3BDTEVOQlFYbENMRlZCUVVGRExFdEJRVXNzUlVGQlNUdEJRVU5vUXl4blFrRkJTVlFzUlVGQlJTeERRVUZEVXl4TFFVRkVMRU5CUVU0c1JVRkJaVHRCUVVOaVN5eGpRVUZCUVN4WlFVRlpMRU5CUVVOS0xFZEJRV0lzUTBGQmFVSkVMRXRCUVdwQ08wRkJRMEZUTEdOQlFVRkJMR0ZCUVdFc1EwRkJRMUlzUjBGQlpDeERRVUZyUWtRc1MwRkJiRUk3UVVGRFJEdEJRVU5HTEZkQlRFUTdRVUZOUVVjc1ZVRkJRVUVzVTBGQlV5eERRVUZEVFN4aFFVRkVMRU5CUVZRN1FVRkRSQ3hUUVZZeVFqdEJRVmMxUWtNc1VVRkJRVUVzU1VGWU5FSXNaMEpCVjNaQ1F5eFBRVmgxUWl4RlFWZGtPMEZCUTFwQkxGVkJRVUZCTEU5QlFVOHNRMEZCUTFvc1QwRkJVaXhEUVVGblFpeFZRVUZCWVN4TlFVRk5MRVZCUVVrN1FVRkRlRUlzWjBKQlFVbEJMRTFCUVUwc1EwRkJRME1zU1VGQlVDeExRVUZuUWl4TFFVRndRaXhGUVVFeVFqdEJRVU42UWl4clFrRkJTWFJDTEVWQlFVVXNRMEZCUTNGQ0xFMUJRVTBzUTBGQlExb3NTMEZCVWl4RFFVRk9MRVZCUVhOQ08wRkJRM0JDU3l4blFrRkJRVUVzV1VGQldTeERRVUZEU2l4SFFVRmlMRU5CUVdsQ1Z5eE5RVUZOTEVOQlFVTmFMRXRCUVhoQ08wRkJRMEZKTEdkQ1FVRkJRU3hWUVVGVkxFTkJRVU5JTEVkQlFWZ3NRMEZCWlZjc1RVRkJUU3hEUVVGRFdpeExRVUYwUWp0QlFVTkVPMEZCUTBZc1lVRk1SQ3hOUVV0UExFbEJRVWxaTEUxQlFVMHNRMEZCUTBNc1NVRkJVQ3hMUVVGblFpeFJRVUZ3UWl4RlFVRTRRanRCUVVOdVF5eHJRa0ZCU1ZJc1dVRkJXU3hEUVVGRFV5eEhRVUZpTEVOQlFXbENSaXhOUVVGTkxFTkJRVU5hTEV0QlFYaENMRU5CUVVvc1JVRkJiME03UVVGRGJFTkxMR2RDUVVGQlFTeFpRVUZaTEVOQlFVTlZMRTFCUVdJc1EwRkJiMEpJTEUxQlFVMHNRMEZCUTFvc1MwRkJNMEk3UVVGRFFVa3NaMEpCUVVGQkxGVkJRVlVzUTBGQlExa3NUVUZCV0N4RFFVRnJRa29zVFVGQlRTeERRVUZEV2l4TFFVRjZRanRCUVVORU8wRkJRMFk3UVVGRFJpeFhRVnBFTzBGQllVUXNVMEY2UWpKQ08wRkJNRUkxUW1sQ0xGRkJRVUZCTEV0Qk1VSTBRaXhwUWtFd1FuUkNReXhIUVRGQ2MwSXNSVUV3UW1wQ08wRkJRMVJrTEZWQlFVRkJMRlZCUVZVc1EwRkJRMkVzUzBGQldDeERRVUZwUWtNc1IwRkJha0k3UVVGRFJDeFRRVFZDTWtJN1FVRTJRalZDUXl4UlFVRkJRU3hSUVRkQ05FSXNjMEpCTmtKcVFqdEJRVU5VWml4VlFVRkJRU3hWUVVGVkxFTkJRVU5uUWl4SFFVRllPMEZCUTBRN1FVRXZRakpDTEU5QlFXeENMRU5CUVZvN1FVRnJRMEVzWVVGQlQyUXNSMEZCVUR0QlFVTkVPMEZCYWtSblFpeEhRVUZhTEVOQlFWQTdRVUZ0UkVRN1FVRkRSQ0lzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cUlFQm1iRzkzSUNvdlhHNHZLaUJsYzJ4cGJuUXRaR2x6WVdKc1pTQnVieTExYm5WelpXUXRkbUZ5Y3l3Z2JtOHRjbVZrWldOc1lYSmxJQ292WEc1Y2JtbHRjRzl5ZENCTWFYWmxVMlYwSUdaeWIyMGdKeTRuTzF4dVhHNWtaV05zWVhKbElHWjFibU4wYVc5dUlHWnBiSFJsY2p4VVBpaHNhWFpsVTJWME9pQk1hWFpsVTJWMFBGUStMQ0JqWWpvZ2RIbHdaVzltSUVKdmIyeGxZVzRwT2lCTWFYWmxVMlYwUENST2IyNU5ZWGxpWlZSNWNHVThWRDQrTzF4dVpHVmpiR0Z5WlNCbWRXNWpkR2x2YmlCbWFXeDBaWEk4VkQ0b2JHbDJaVk5sZERvZ1RHbDJaVk5sZER4VVBpd2dZMkk2SUNoMllXeDFaVG9nVkNrZ1BUNGdZVzU1S1RvZ1RHbDJaVk5sZER4VVBqdGNibHh1THlvNk9pQmxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWFXeDBaWEk3SUNvdlhHNWNiaThxT2pvZ1lDQXFMMXh1Wlhod2IzSjBJR1JsWm1GMWJIUWdablZ1WTNScGIyNGdabWxzZEdWeVBGUStLR3hwZG1WVFpYUTZJRXhwZG1WVFpYUThWRDRzSUdOaU9pQW9kbUZzZFdVNklGUXBJRDArSUdGdWVTazZJRXhwZG1WVFpYUThWRDRnZTF4dUlDQnlaWFIxY200Z2JtVjNJRXhwZG1WVFpYUW9lMXh1SUNBZ0lITmphR1ZrZFd4bGNqb2diR2wyWlZObGRDNW5aWFJUWTJobFpIVnNaWElvS1N4Y2JpQWdJQ0J5WldGa0tDa2dlMXh1SUNBZ0lDQWdZMjl1YzNRZ2NtVjBJRDBnYm1WM0lGTmxkQ2dwTzF4dUlDQWdJQ0FnYkdsMlpWTmxkQzUyWVd4MVpYTW9LUzVtYjNKRllXTm9LSFpoYkhWbElEMCtJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHTmlLSFpoYkhWbEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUhKbGRDNWhaR1FvZG1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ5WlhRN1hHNGdJQ0FnZlN4Y2JpQWdJQ0JzYVhOMFpXNG9jMlYwVm1Gc2RXVnpMQ0JqYjI1MGNtOXNiR1Z5S1NCN1hHNGdJQ0FnSUNCamIyNXpkQ0J3WVhOelpXUkdhV3gwWlhJZ1BTQnVaWGNnVTJWMEtDazdYRzVjYmlBZ0lDQWdJR052Ym5OMElITjFZaUE5SUd4cGRtVlRaWFF1YzNWaWMyTnlhV0psS0h0Y2JpQWdJQ0FnSUNBZ2MzUmhjblFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2FXNXBkR2xoYkZaaGJIVmxjeUE5SUc1bGR5QlRaWFFvS1R0Y2JpQWdJQ0FnSUNBZ0lDQnNhWFpsVTJWMExuWmhiSFZsY3lncExtWnZja1ZoWTJnb2RtRnNkV1VnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHTmlLSFpoYkhWbEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQndZWE56WldSR2FXeDBaWEl1WVdSa0tIWmhiSFZsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnYVc1cGRHbGhiRlpoYkhWbGN5NWhaR1FvZG1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnSUNBZ0lITmxkRlpoYkhWbGN5aHBibWwwYVdGc1ZtRnNkV1Z6S1R0Y2JpQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdibVY0ZENoamFHRnVaMlZ6S1NCN1hHNGdJQ0FnSUNBZ0lDQWdZMmhoYm1kbGN5NW1iM0pGWVdOb0tHTm9ZVzVuWlNBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZMmhoYm1kbExuUjVjR1VnUFQwOUlDZGhaR1FuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaGpZaWhqYUdGdVoyVXVkbUZzZFdVcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjR0Z6YzJWa1JtbHNkR1Z5TG1Ga1pDaGphR0Z1WjJVdWRtRnNkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuUnliMnhzWlhJdVlXUmtLR05vWVc1blpTNTJZV3gxWlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvWTJoaGJtZGxMblI1Y0dVZ1BUMDlJQ2R5WlcxdmRtVW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNod1lYTnpaV1JHYVd4MFpYSXVhR0Z6S0dOb1lXNW5aUzUyWVd4MVpTa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J3WVhOelpXUkdhV3gwWlhJdVpHVnNaWFJsS0dOb1lXNW5aUzUyWVd4MVpTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEhKdmJHeGxjaTV5WlcxdmRtVW9ZMmhoYm1kbExuWmhiSFZsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdJQ0JsY25KdmNpaGxjbklwSUh0Y2JpQWdJQ0FnSUNBZ0lDQmpiMjUwY205c2JHVnlMbVZ5Y205eUtHVnljaWs3WEc0Z0lDQWdJQ0FnSUgwc1hHNGdJQ0FnSUNBZ0lHTnZiWEJzWlhSbEtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUdOdmJuUnliMnhzWlhJdVpXNWtLQ2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgwcE8xeHVYRzRnSUNBZ0lDQnlaWFIxY200Z2MzVmlPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNTlYRzR2S2pvNklHQWdLaTljYmlKZGZRPT0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmbGF0TWFwUjtcblxudmFyIF8gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuXCIpKTtcblxuZnVuY3Rpb24gZmxhdE1hcFIobGl2ZVNldCwgY2IpIHtcbiAgdmFyIGlzUmVhZGluZyA9IGZhbHNlO1xuICByZXR1cm4gbmV3IF8uZGVmYXVsdCh7XG4gICAgc2NoZWR1bGVyOiBsaXZlU2V0LmdldFNjaGVkdWxlcigpLFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICBpZiAoaXNSZWFkaW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVhZGluZyBpbmFjdGl2ZSByZWN1cnNpdmVseS1mbGF0TWFwcGVkIHN0cmVhbSBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICB9XG5cbiAgICAgIGlzUmVhZGluZyA9IHRydWU7XG4gICAgICB2YXIgcyA9IG5ldyBTZXQoKTtcbiAgICAgIGxpdmVTZXQudmFsdWVzKCkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGNoaWxkU2V0ID0gY2IodmFsdWUpO1xuICAgICAgICBjaGlsZFNldC52YWx1ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHMuYWRkKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGlzUmVhZGluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHM7XG4gICAgfSxcbiAgICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3RlbihzZXRWYWx1ZXMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIHZhciBtYWluU3ViQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICB2YXIgaGFzU3Vic2NyaWJlZFRvQ2hpbGRyZW4gPSBmYWxzZTtcbiAgICAgIHZhciBuZXh0SGFzRmlyZWQgPSBmYWxzZTtcbiAgICAgIHZhciBjaGlsZFNldFN1YnMgPSBuZXcgTWFwKCk7XG5cbiAgICAgIGZ1bmN0aW9uIGNoaWxkU2V0U3Vic2NyaWJlKGNoaWxkU2V0KSB7XG4gICAgICAgIGlmIChjaGlsZFNldC5pc0VuZGVkKCkpIHtcbiAgICAgICAgICAvLyBvcHRpbWl6YXRpb25cbiAgICAgICAgICBjaGlsZFNldC52YWx1ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgY29udHJvbGxlci5hZGQodmFsdWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNoaWxkU2V0LnN1YnNjcmliZSh7XG4gICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoc3ViKSB7XG4gICAgICAgICAgICAgIGNoaWxkU2V0U3Vicy5zZXQoY2hpbGRTZXQsIHN1Yik7XG4gICAgICAgICAgICAgIGNoaWxkU2V0LnZhbHVlcygpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGQodmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgbmV4dEhhc0ZpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFkZChjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlLnR5cGUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZShjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIGVycm9yKGVycikge1xuICAgICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKGVycik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICBjaGlsZFNldFN1YnMuZGVsZXRlKGNoaWxkU2V0KTtcblxuICAgICAgICAgICAgICBpZiAobWFpblN1YkNvbXBsZXRlZCAmJiBjaGlsZFNldFN1YnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5kKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBzZXRWYWx1ZXMobmV3IFNldCgpKTtcbiAgICAgIHZhciBjaGlsZFNldHMgPSBuZXcgTWFwKCk7XG4gICAgICB2YXIgbWFpblN1YiA9IGxpdmVTZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICAgIGxpdmVTZXQudmFsdWVzKCkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZFNldCA9IGNiKHZhbHVlKTtcbiAgICAgICAgICAgIGNoaWxkU2V0cy5zZXQodmFsdWUsIGNoaWxkU2V0KTtcbiAgICAgICAgICAgIGNoaWxkU2V0U3Vic2NyaWJlKGNoaWxkU2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBoYXNTdWJzY3JpYmVkVG9DaGlsZHJlbiA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoY2hhbmdlcykge1xuICAgICAgICAgIG5leHRIYXNGaXJlZCA9IHRydWU7XG4gICAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgdmFyIGNoaWxkU2V0ID0gY2IoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgY2hpbGRTZXRzLnNldChjaGFuZ2UudmFsdWUsIGNoaWxkU2V0KTtcbiAgICAgICAgICAgICAgY2hpbGRTZXRTdWJzY3JpYmUoY2hpbGRTZXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgdmFyIF9jaGlsZFNldCA9IGNoaWxkU2V0cy5nZXQoY2hhbmdlLnZhbHVlKTtcblxuICAgICAgICAgICAgICBpZiAoIV9jaGlsZFNldCkgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVkIHZhbHVlIG5vdCBpbiBsaXZlc2V0Jyk7XG5cbiAgICAgICAgICAgICAgX2NoaWxkU2V0LnZhbHVlcygpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5yZW1vdmUodmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBjaGlsZFNldHMuZGVsZXRlKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgIHZhciBjaGlsZFNldFN1YiA9IGNoaWxkU2V0U3Vicy5nZXQoX2NoaWxkU2V0KTtcblxuICAgICAgICAgICAgICBpZiAoY2hpbGRTZXRTdWIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSB3b24ndCBoYXZlIHRoZSBzdWJzY3JpcHRpb24gaWYgdGhlIGNoaWxkU2V0IGVuZGVkIGFscmVhZHlcbiAgICAgICAgICAgICAgICBjaGlsZFNldFN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIGNoaWxkU2V0U3Vicy5kZWxldGUoX2NoaWxkU2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgY29udHJvbGxlci5lcnJvcihlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgbWFpblN1YkNvbXBsZXRlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoaGFzU3Vic2NyaWJlZFRvQ2hpbGRyZW4gJiYgY2hpbGRTZXRTdWJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBpc1B1bGxpbmdDaGFuZ2VzID0gZmFsc2U7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgbWFpblN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIGNoaWxkU2V0U3Vicy5mb3JFYWNoKGZ1bmN0aW9uIChzdWIpIHtcbiAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNoaWxkU2V0cy5jbGVhcigpO1xuICAgICAgICAgIGNoaWxkU2V0U3Vicy5jbGVhcigpO1xuICAgICAgICB9LFxuICAgICAgICBwdWxsQ2hhbmdlczogZnVuY3Rpb24gcHVsbENoYW5nZXMoKSB7XG4gICAgICAgICAgaWYgKGlzUHVsbGluZ0NoYW5nZXMpIHJldHVybjtcbiAgICAgICAgICBpc1B1bGxpbmdDaGFuZ2VzID0gdHJ1ZTtcblxuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIG5leHRIYXNGaXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgbWFpblN1Yi5wdWxsQ2hhbmdlcygpO1xuICAgICAgICAgICAgY2hpbGRTZXRTdWJzLmZvckVhY2goZnVuY3Rpb24gKHN1Yikge1xuICAgICAgICAgICAgICBzdWIucHVsbENoYW5nZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gd2hpbGUgKG5leHRIYXNGaXJlZCk7XG5cbiAgICAgICAgICBpc1B1bGxpbmdDaGFuZ2VzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OW1iR0YwVFdGd1VpNXFjeUpkTENKdVlXMWxjeUk2V3lKbWJHRjBUV0Z3VWlJc0lteHBkbVZUWlhRaUxDSmpZaUlzSW1selVtVmhaR2x1WnlJc0lreHBkbVZUWlhRaUxDSnpZMmhsWkhWc1pYSWlMQ0puWlhSVFkyaGxaSFZzWlhJaUxDSnlaV0ZrSWl3aVJYSnliM0lpTENKeklpd2lVMlYwSWl3aWRtRnNkV1Z6SWl3aVptOXlSV0ZqYUNJc0luWmhiSFZsSWl3aVkyaHBiR1JUWlhRaUxDSmhaR1FpTENKc2FYTjBaVzRpTENKelpYUldZV3gxWlhNaUxDSmpiMjUwY205c2JHVnlJaXdpYldGcGJsTjFZa052YlhCc1pYUmxaQ0lzSW1oaGMxTjFZbk5qY21saVpXUlViME5vYVd4a2NtVnVJaXdpYm1WNGRFaGhjMFpwY21Wa0lpd2lZMmhwYkdSVFpYUlRkV0p6SWl3aVRXRndJaXdpWTJocGJHUlRaWFJUZFdKelkzSnBZbVVpTENKcGMwVnVaR1ZrSWl3aWMzVmljMk55YVdKbElpd2ljM1JoY25RaUxDSnpkV0lpTENKelpYUWlMQ0p1WlhoMElpd2lZMmhoYm1kbGN5SXNJbU5vWVc1blpTSXNJblI1Y0dVaUxDSnlaVzF2ZG1VaUxDSmxjbkp2Y2lJc0ltVnljaUlzSW1OdmJYQnNaWFJsSWl3aVpHVnNaWFJsSWl3aWMybDZaU0lzSW1WdVpDSXNJbU5vYVd4a1UyVjBjeUlzSW0xaGFXNVRkV0lpTENKblpYUWlMQ0pqYUdsc1pGTmxkRk4xWWlJc0luVnVjM1ZpYzJOeWFXSmxJaXdpYVhOUWRXeHNhVzVuUTJoaGJtZGxjeUlzSW1Oc1pXRnlJaXdpY0hWc2JFTm9ZVzVuWlhNaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenRCUVVWQk96dEJRVWRsTEZOQlFWTkJMRkZCUVZRc1EwRkJkVUpETEU5QlFYWkNMRVZCUVRSRFF5eEZRVUUxUXl4RlFVRnpSanRCUVVOdVJ5eE5RVUZKUXl4VFFVRlRMRWRCUVVjc1MwRkJhRUk3UVVGRlFTeFRRVUZQTEVsQlFVbERMRk5CUVVvc1EwRkJXVHRCUVVOcVFrTXNTVUZCUVVFc1UwRkJVeXhGUVVGRlNpeFBRVUZQTEVOQlFVTkxMRmxCUVZJc1JVRkVUVHRCUVVWcVFrTXNTVUZCUVVFc1NVRkdhVUlzYTBKQlJWWTdRVUZEVEN4VlFVRkpTaXhUUVVGS0xFVkJRV1U3UVVGRFlpeGpRVUZOTEVsQlFVbExMRXRCUVVvc1EwRkJWU3hwUlVGQlZpeERRVUZPTzBGQlEwUTdPMEZCUTBSTUxFMUJRVUZCTEZOQlFWTXNSMEZCUnl4SlFVRmFPMEZCUTBFc1ZVRkJUVTBzUTBGQlF5eEhRVUZITEVsQlFVbERMRWRCUVVvc1JVRkJWanRCUVVOQlZDeE5RVUZCUVN4UFFVRlBMRU5CUVVOVkxFMUJRVklzUjBGQmFVSkRMRTlCUVdwQ0xFTkJRWGxDTEZWQlFVRkRMRXRCUVVzc1JVRkJTVHRCUVVOb1F5eFpRVUZOUXl4UlFVRlJMRWRCUVVkYUxFVkJRVVVzUTBGQlExY3NTMEZCUkN4RFFVRnVRanRCUVVOQlF5eFJRVUZCUVN4UlFVRlJMRU5CUVVOSUxFMUJRVlFzUjBGQmEwSkRMRTlCUVd4Q0xFTkJRVEJDTEZWQlFVRkRMRXRCUVVzc1JVRkJTVHRCUVVOcVEwb3NWVUZCUVVFc1EwRkJReXhEUVVGRFRTeEhRVUZHTEVOQlFVMUdMRXRCUVU0N1FVRkRSQ3hUUVVaRU8wRkJSMFFzVDBGTVJEdEJRVTFCVml4TlFVRkJRU3hUUVVGVExFZEJRVWNzUzBGQldqdEJRVU5CTEdGQlFVOU5MRU5CUVZBN1FVRkRSQ3hMUVdoQ1owSTdRVUZwUW1wQ1R5eEpRVUZCUVN4TlFXcENhVUlzYTBKQmFVSldReXhUUVdwQ1ZTeEZRV2xDUTBNc1ZVRnFRa1FzUlVGcFFtRTdRVUZETlVJc1ZVRkJTVU1zWjBKQlFXZENMRWRCUVVjc1MwRkJka0k3UVVGRFFTeFZRVUZKUXl4MVFrRkJkVUlzUjBGQlJ5eExRVUU1UWp0QlFVTkJMRlZCUVVsRExGbEJRVmtzUjBGQlJ5eExRVUZ1UWp0QlFVTkJMRlZCUVUxRExGbEJRV3RFTEVkQlFVY3NTVUZCU1VNc1IwRkJTaXhGUVVFelJEczdRVUZGUVN4bFFVRlRReXhwUWtGQlZDeERRVUV5UWxZc1VVRkJNMElzUlVGQmFVUTdRVUZETDBNc1dVRkJTVUVzVVVGQlVTeERRVUZEVnl4UFFVRlVMRVZCUVVvc1JVRkJkMEk3UVVGQlJUdEJRVU40UWxnc1ZVRkJRVUVzVVVGQlVTeERRVUZEU0N4TlFVRlVMRWRCUVd0Q1F5eFBRVUZzUWl4RFFVRXdRaXhWUVVGQlF5eExRVUZMTEVWQlFVazdRVUZEYWtOTExGbEJRVUZCTEZWQlFWVXNRMEZCUTBnc1IwRkJXQ3hEUVVGbFJpeExRVUZtTzBGQlEwUXNWMEZHUkR0QlFVZEVMRk5CU2tRc1RVRkpUenRCUVVOTVF5eFZRVUZCUVN4UlFVRlJMRU5CUVVOWkxGTkJRVlFzUTBGQmJVSTdRVUZEYWtKRExGbEJRVUZCTEV0QlJHbENMR2xDUVVOWVF5eEhRVVJYTEVWQlEwNDdRVUZEVkU0c1kwRkJRVUVzV1VGQldTeERRVUZEVHl4SFFVRmlMRU5CUVdsQ1ppeFJRVUZxUWl4RlFVRXlRbU1zUjBGQk0wSTdRVUZEUVdRc1kwRkJRVUVzVVVGQlVTeERRVUZEU0N4TlFVRlVMRWRCUVd0Q1F5eFBRVUZzUWl4RFFVRXdRaXhWUVVGQlF5eExRVUZMTEVWQlFVazdRVUZEYWtOTExHZENRVUZCUVN4VlFVRlZMRU5CUVVOSUxFZEJRVmdzUTBGQlpVWXNTMEZCWmp0QlFVTkVMR1ZCUmtRN1FVRkhSQ3hoUVU1blFqdEJRVTlxUW1sQ0xGbEJRVUZCTEVsQlVHbENMR2RDUVU5YVF5eFBRVkJaTEVWQlQwZzdRVUZEV2xZc1kwRkJRVUVzV1VGQldTeEhRVUZITEVsQlFXWTdRVUZEUVZVc1kwRkJRVUVzVDBGQlR5eERRVUZEYmtJc1QwRkJVaXhEUVVGblFpeFZRVUZCYjBJc1RVRkJUU3hGUVVGSk8wRkJRM2hDTEc5Q1FVRkpRU3hOUVVGTkxFTkJRVU5ETEVsQlFWQXNTMEZCWjBJc1MwRkJjRUlzUlVGQk1rSTdRVUZEZWtKbUxHdENRVUZCUVN4VlFVRlZMRU5CUVVOSUxFZEJRVmdzUTBGQlpXbENMRTFCUVUwc1EwRkJRMjVDTEV0QlFYUkNPMEZCUTBRc2FVSkJSa1FzVFVGRlR5eEpRVUZKYlVJc1RVRkJUU3hEUVVGRFF5eEpRVUZRTEV0QlFXZENMRkZCUVhCQ0xFVkJRVGhDTzBGQlEyNURaaXhyUWtGQlFVRXNWVUZCVlN4RFFVRkRaMElzVFVGQldDeERRVUZyUWtZc1RVRkJUU3hEUVVGRGJrSXNTMEZCZWtJN1FVRkRSRHRCUVVOR0xHVkJUa1E3UVVGUFJDeGhRV2hDWjBJN1FVRnBRbXBDYzBJc1dVRkJRVUVzUzBGcVFtbENMR2xDUVdsQ1dFTXNSMEZxUWxjc1JVRnBRazQ3UVVGRFZHeENMR05CUVVGQkxGVkJRVlVzUTBGQlEybENMRXRCUVZnc1EwRkJhVUpETEVkQlFXcENPMEZCUTBRc1lVRnVRbWRDTzBGQmIwSnFRa01zV1VGQlFVRXNVVUZ3UW1sQ0xITkNRVzlDVGp0QlFVTlVaaXhqUVVGQlFTeFpRVUZaTEVOQlFVTm5RaXhOUVVGaUxFTkJRVzlDZUVJc1VVRkJjRUk3TzBGQlEwRXNhMEpCUVVsTExHZENRVUZuUWl4SlFVRkpSeXhaUVVGWkxFTkJRVU5wUWl4SlFVRmlMRXRCUVhOQ0xFTkJRVGxETEVWQlFXbEVPMEZCUXk5RGNrSXNaMEpCUVVGQkxGVkJRVlVzUTBGQlEzTkNMRWRCUVZnN1FVRkRSRHRCUVVOR08wRkJla0puUWl4WFFVRnVRanRCUVRKQ1JEdEJRVU5HT3p0QlFVVkVka0lzVFVGQlFVRXNVMEZCVXl4RFFVRkRMRWxCUVVsUUxFZEJRVW9zUlVGQlJDeERRVUZVTzBGQlEwRXNWVUZCVFN0Q0xGTkJRVFpDTEVkQlFVY3NTVUZCU1d4Q0xFZEJRVW9zUlVGQmRFTTdRVUZGUVN4VlFVRk5iVUlzVDBGQlR5eEhRVUZIZWtNc1QwRkJUeXhEUVVGRGVVSXNVMEZCVWl4RFFVRnJRanRCUVVOb1EwTXNVVUZCUVVFc1MwRkVaME1zYlVKQlEzaENPMEZCUTA0eFFpeFZRVUZCUVN4UFFVRlBMRU5CUVVOVkxFMUJRVklzUjBGQmFVSkRMRTlCUVdwQ0xFTkJRWGxDTEZWQlFVRkRMRXRCUVVzc1JVRkJTVHRCUVVOb1F5eG5Ra0ZCVFVNc1VVRkJVU3hIUVVGSFdpeEZRVUZGTEVOQlFVTlhMRXRCUVVRc1EwRkJia0k3UVVGRFFUUkNMRmxCUVVGQkxGTkJRVk1zUTBGQlExb3NSMEZCVml4RFFVRmphRUlzUzBGQlpDeEZRVUZ4UWtNc1VVRkJja0k3UVVGRFFWVXNXVUZCUVVFc2FVSkJRV2xDTEVOQlFVTldMRkZCUVVRc1EwRkJha0k3UVVGRFJDeFhRVXBFTzBGQlMwRk5MRlZCUVVGQkxIVkNRVUYxUWl4SFFVRkhMRWxCUVRGQ08wRkJRMFFzVTBGU0swSTdRVUZUYUVOVkxGRkJRVUZCTEVsQlZHZERMR2RDUVZNelFrTXNUMEZVTWtJc1JVRlRiRUk3UVVGRFdsWXNWVUZCUVVFc1dVRkJXU3hIUVVGSExFbEJRV1k3UVVGRFFWVXNWVUZCUVVFc1QwRkJUeXhEUVVGRGJrSXNUMEZCVWl4RFFVRm5RaXhWUVVGQmIwSXNUVUZCVFN4RlFVRkpPMEZCUTNoQ0xHZENRVUZKUVN4TlFVRk5MRU5CUVVORExFbEJRVkFzUzBGQlowSXNTMEZCY0VJc1JVRkJNa0k3UVVGRGVrSXNhMEpCUVUxdVFpeFJRVUZSTEVkQlFVZGFMRVZCUVVVc1EwRkJRemhDTEUxQlFVMHNRMEZCUTI1Q0xFdEJRVklzUTBGQmJrSTdRVUZEUVRSQ0xHTkJRVUZCTEZOQlFWTXNRMEZCUTFvc1IwRkJWaXhEUVVGalJ5eE5RVUZOTEVOQlFVTnVRaXhMUVVGeVFpeEZRVUUwUWtNc1VVRkJOVUk3UVVGRFFWVXNZMEZCUVVFc2FVSkJRV2xDTEVOQlFVTldMRkZCUVVRc1EwRkJha0k3UVVGRFJDeGhRVXBFTEUxQlNVOHNTVUZCU1d0Q0xFMUJRVTBzUTBGQlEwTXNTVUZCVUN4TFFVRm5RaXhSUVVGd1FpeEZRVUU0UWp0QlFVTnVReXhyUWtGQlRXNUNMRk5CUVZFc1IwRkJSekpDTEZOQlFWTXNRMEZCUTBVc1IwRkJWaXhEUVVGaldDeE5RVUZOTEVOQlFVTnVRaXhMUVVGeVFpeERRVUZxUWpzN1FVRkRRU3hyUWtGQlNTeERRVUZEUXl4VFFVRk1MRVZCUVdVc1RVRkJUU3hKUVVGSlRpeExRVUZLTEVOQlFWVXNPRUpCUVZZc1EwRkJUanM3UVVGRFprMHNZMEZCUVVFc1UwRkJVU3hEUVVGRFNDeE5RVUZVTEVkQlFXdENReXhQUVVGc1FpeERRVUV3UWl4VlFVRkJReXhMUVVGTExFVkJRVWs3UVVGRGFrTkxMR2RDUVVGQlFTeFZRVUZWTEVOQlFVTm5RaXhOUVVGWUxFTkJRV3RDY2tJc1MwRkJiRUk3UVVGRFJDeGxRVVpFT3p0QlFVZEJORUlzWTBGQlFVRXNVMEZCVXl4RFFVRkRTQ3hOUVVGV0xFTkJRV2xDVGl4TlFVRk5MRU5CUVVOdVFpeExRVUY0UWp0QlFVTkJMR3RDUVVGTkswSXNWMEZCVnl4SFFVRkhkRUlzV1VGQldTeERRVUZEY1VJc1IwRkJZaXhEUVVGcFFqZENMRk5CUVdwQ0xFTkJRWEJDT3p0QlFVTkJMR3RDUVVGSk9FSXNWMEZCU2l4RlFVRnBRanRCUVVObU8wRkJRMEZCTEdkQ1FVRkJRU3hYUVVGWExFTkJRVU5ETEZkQlFWbzdRVUZEUVhaQ0xHZENRVUZCUVN4WlFVRlpMRU5CUVVOblFpeE5RVUZpTEVOQlFXOUNlRUlzVTBGQmNFSTdRVUZEUkR0QlFVTkdPMEZCUTBZc1YwRnVRa1E3UVVGdlFrUXNVMEV2UWl0Q08wRkJaME5vUTNGQ0xGRkJRVUZCTEV0QmFFTm5ReXhwUWtGblF6RkNReXhIUVdoRE1FSXNSVUZuUTNKQ08wRkJRMVJzUWl4VlFVRkJRU3hWUVVGVkxFTkJRVU5wUWl4TFFVRllMRU5CUVdsQ1F5eEhRVUZxUWp0QlFVTkVMRk5CYkVNclFqdEJRVzFEYUVORExGRkJRVUZCTEZGQmJrTm5ReXh6UWtGdFEzSkNPMEZCUTFSc1FpeFZRVUZCUVN4blFrRkJaMElzUjBGQlJ5eEpRVUZ1UWpzN1FVRkRRU3hqUVVGSlF5eDFRa0ZCZFVJc1NVRkJTVVVzV1VGQldTeERRVUZEYVVJc1NVRkJZaXhMUVVGelFpeERRVUZ5UkN4RlFVRjNSRHRCUVVOMFJISkNMRmxCUVVGQkxGVkJRVlVzUTBGQlEzTkNMRWRCUVZnN1FVRkRSRHRCUVVOR08wRkJlRU1yUWl4UFFVRnNRaXhEUVVGb1FqdEJRVEpEUVN4VlFVRkpUU3huUWtGQlowSXNSMEZCUnl4TFFVRjJRanRCUVVOQkxHRkJRVTg3UVVGRFRFUXNVVUZCUVVFc1YwRkVTeXg1UWtGRFV6dEJRVU5hU0N4VlFVRkJRU3hQUVVGUExFTkJRVU5ITEZkQlFWSTdRVUZEUVhaQ0xGVkJRVUZCTEZsQlFWa3NRMEZCUTFZc1QwRkJZaXhEUVVGeFFpeFZRVUZCWjBJc1IwRkJSeXhGUVVGSk8wRkJRekZDUVN4WlFVRkJRU3hIUVVGSExFTkJRVU5wUWl4WFFVRktPMEZCUTBRc1YwRkdSRHRCUVVkQlNpeFZRVUZCUVN4VFFVRlRMRU5CUVVOTkxFdEJRVlk3UVVGRFFYcENMRlZCUVVGQkxGbEJRVmtzUTBGQlEzbENMRXRCUVdJN1FVRkRSQ3hUUVZKSk8wRkJVMHhETEZGQlFVRkJMRmRCVkVzc2VVSkJVMU03UVVGRFdpeGpRVUZKUml4blFrRkJTaXhGUVVGelFqdEJRVU4wUWtFc1ZVRkJRVUVzWjBKQlFXZENMRWRCUVVjc1NVRkJia0k3TzBGQlJVRXNZVUZCUnp0QlFVTkVla0lzV1VGQlFVRXNXVUZCV1N4SFFVRkhMRXRCUVdZN1FVRkRRWEZDTEZsQlFVRkJMRTlCUVU4c1EwRkJRMDBzVjBGQlVqdEJRVU5CTVVJc1dVRkJRVUVzV1VGQldTeERRVUZEVml4UFFVRmlMRU5CUVhGQ0xGVkJRVUZuUWl4SFFVRkhMRVZCUVVrN1FVRkRNVUpCTEdOQlFVRkJMRWRCUVVjc1EwRkJRMjlDTEZkQlFVbzdRVUZEUkN4aFFVWkVPMEZCUjBRc1YwRk9SQ3hSUVUxVE0wSXNXVUZPVkRzN1FVRlJRWGxDTEZWQlFVRkJMR2RDUVVGblFpeEhRVUZITEV0QlFXNUNPMEZCUTBRN1FVRjBRa2tzVDBGQlVEdEJRWGRDUkR0QlFXeEpaMElzUjBGQldpeERRVUZRTzBGQmIwbEVJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlvZ1FHWnNiM2NnS2k5Y2JseHVhVzF3YjNKMElFeHBkbVZUWlhRZ1puSnZiU0FuTGljN1hHNXBiWEJ2Y25RZ2RIbHdaU0I3VEdsMlpWTmxkRk4xWW5OamNtbHdkR2x2Ym4wZ1puSnZiU0FuTGljN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHWjFibU4wYVc5dUlHWnNZWFJOWVhCU1BGUXNWVDRvYkdsMlpWTmxkRG9nVEdsMlpWTmxkRHhVUGl3Z1kySTZJQ2gyWVd4MVpUb2dWQ2tnUFQ0Z1RHbDJaVk5sZER4VlBpazZJRXhwZG1WVFpYUThWVDRnZTF4dUlDQnNaWFFnYVhOU1pXRmthVzVuSUQwZ1ptRnNjMlU3WEc1Y2JpQWdjbVYwZFhKdUlHNWxkeUJNYVhabFUyVjBLSHRjYmlBZ0lDQnpZMmhsWkhWc1pYSTZJR3hwZG1WVFpYUXVaMlYwVTJOb1pXUjFiR1Z5S0Nrc1hHNGdJQ0FnY21WaFpDZ3BJSHRjYmlBZ0lDQWdJR2xtSUNocGMxSmxZV1JwYm1jcElIdGNiaUFnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHlaV0ZrYVc1bklHbHVZV04wYVhabElISmxZM1Z5YzJsMlpXeDVMV1pzWVhSTllYQndaV1FnYzNSeVpXRnRJR2x6SUc1dmRDQnpkWEJ3YjNKMFpXUW5LVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQWdJR2x6VW1WaFpHbHVaeUE5SUhSeWRXVTdYRzRnSUNBZ0lDQmpiMjV6ZENCeklEMGdibVYzSUZObGRDZ3BPMXh1SUNBZ0lDQWdiR2wyWlZObGRDNTJZV3gxWlhNb0tTNW1iM0pGWVdOb0tIWmhiSFZsSUQwK0lIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1kyaHBiR1JUWlhRZ1BTQmpZaWgyWVd4MVpTazdYRzRnSUNBZ0lDQWdJR05vYVd4a1UyVjBMblpoYkhWbGN5Z3BMbVp2Y2tWaFkyZ29kbUZzZFdVZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUhNdVlXUmtLSFpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUdselVtVmhaR2x1WnlBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnY21WMGRYSnVJSE03WEc0Z0lDQWdmU3hjYmlBZ0lDQnNhWE4wWlc0b2MyVjBWbUZzZFdWekxDQmpiMjUwY205c2JHVnlLU0I3WEc0Z0lDQWdJQ0JzWlhRZ2JXRnBibE4xWWtOdmJYQnNaWFJsWkNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnYkdWMElHaGhjMU4xWW5OamNtbGlaV1JVYjBOb2FXeGtjbVZ1SUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0JzWlhRZ2JtVjRkRWhoYzBacGNtVmtJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQmpiMjV6ZENCamFHbHNaRk5sZEZOMVluTTZJRTFoY0R4TWFYWmxVMlYwUEZVK0xDQk1hWFpsVTJWMFUzVmljMk55YVhCMGFXOXVQaUE5SUc1bGR5Qk5ZWEFvS1R0Y2JseHVJQ0FnSUNBZ1puVnVZM1JwYjI0Z1kyaHBiR1JUWlhSVGRXSnpZM0pwWW1Vb1kyaHBiR1JUWlhRNklFeHBkbVZUWlhROFZUNHBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHTm9hV3hrVTJWMExtbHpSVzVrWldRb0tTa2dleUF2THlCdmNIUnBiV2w2WVhScGIyNWNiaUFnSUNBZ0lDQWdJQ0JqYUdsc1pGTmxkQzUyWVd4MVpYTW9LUzVtYjNKRllXTm9LSFpoYkhWbElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZiblJ5YjJ4c1pYSXVZV1JrS0haaGJIVmxLVHRjYmlBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0JqYUdsc1pGTmxkQzV6ZFdKelkzSnBZbVVvZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjM1JoY25Rb2MzVmlLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR05vYVd4a1UyVjBVM1ZpY3k1elpYUW9ZMmhwYkdSVFpYUXNJSE4xWWlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdOb2FXeGtVMlYwTG5aaGJIVmxjeWdwTG1admNrVmhZMmdvZG1Gc2RXVWdQVDRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuUnliMnhzWlhJdVlXUmtLSFpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnYm1WNGRDaGphR0Z1WjJWektTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHNWxlSFJJWVhOR2FYSmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHTm9ZVzVuWlhNdVptOXlSV0ZqYUNoamFHRnVaMlVnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hqYUdGdVoyVXVkSGx3WlNBOVBUMGdKMkZrWkNjcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052Ym5SeWIyeHNaWEl1WVdSa0tHTm9ZVzVuWlM1MllXeDFaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoamFHRnVaMlV1ZEhsd1pTQTlQVDBnSjNKbGJXOTJaU2NwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiblJ5YjJ4c1pYSXVjbVZ0YjNabEtHTm9ZVzVuWlM1MllXeDFaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQmxjbkp2Y2lobGNuSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEhKdmJHeGxjaTVsY25KdmNpaGxjbklwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZiWEJzWlhSbEtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQmphR2xzWkZObGRGTjFZbk11WkdWc1pYUmxLR05vYVd4a1UyVjBLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0cxaGFXNVRkV0pEYjIxd2JHVjBaV1FnSmlZZ1kyaHBiR1JUWlhSVGRXSnpMbk5wZW1VZ1BUMDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNTBjbTlzYkdWeUxtVnVaQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMWNibHh1SUNBZ0lDQWdjMlYwVm1Gc2RXVnpLRzVsZHlCVFpYUW9LU2s3WEc0Z0lDQWdJQ0JqYjI1emRDQmphR2xzWkZObGRITTZJRTFoY0R4VUxDQk1hWFpsVTJWMFBGVStQaUE5SUc1bGR5Qk5ZWEFvS1R0Y2JseHVJQ0FnSUNBZ1kyOXVjM1FnYldGcGJsTjFZaUE5SUd4cGRtVlRaWFF1YzNWaWMyTnlhV0psS0h0Y2JpQWdJQ0FnSUNBZ2MzUmhjblFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdiR2wyWlZObGRDNTJZV3gxWlhNb0tTNW1iM0pGWVdOb0tIWmhiSFZsSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJR05vYVd4a1UyVjBJRDBnWTJJb2RtRnNkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMmhwYkdSVFpYUnpMbk5sZENoMllXeDFaU3dnWTJocGJHUlRaWFFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMmhwYkdSVFpYUlRkV0p6WTNKcFltVW9ZMmhwYkdSVFpYUXBPMXh1SUNBZ0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQWdJR2hoYzFOMVluTmpjbWxpWldSVWIwTm9hV3hrY21WdUlEMGdkSEoxWlR0Y2JpQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdibVY0ZENoamFHRnVaMlZ6S1NCN1hHNGdJQ0FnSUNBZ0lDQWdibVY0ZEVoaGMwWnBjbVZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnSUNCamFHRnVaMlZ6TG1admNrVmhZMmdvWTJoaGJtZGxJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoamFHRnVaMlV1ZEhsd1pTQTlQVDBnSjJGa1pDY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ1kyaHBiR1JUWlhRZ1BTQmpZaWhqYUdGdVoyVXVkbUZzZFdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCamFHbHNaRk5sZEhNdWMyVjBLR05vWVc1blpTNTJZV3gxWlN3Z1kyaHBiR1JUWlhRcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCamFHbHNaRk5sZEZOMVluTmpjbWxpWlNoamFHbHNaRk5sZENrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0dOb1lXNW5aUzUwZVhCbElEMDlQU0FuY21WdGIzWmxKeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1emRDQmphR2xzWkZObGRDQTlJR05vYVd4a1UyVjBjeTVuWlhRb1kyaGhibWRsTG5aaGJIVmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGamFHbHNaRk5sZENrZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkeVpXMXZkbVZrSUhaaGJIVmxJRzV2ZENCcGJpQnNhWFpsYzJWMEp5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHTm9hV3hrVTJWMExuWmhiSFZsY3lncExtWnZja1ZoWTJnb2RtRnNkV1VnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiblJ5YjJ4c1pYSXVjbVZ0YjNabEtIWmhiSFZsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdOb2FXeGtVMlYwY3k1a1pXeGxkR1VvWTJoaGJtZGxMblpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnWTJocGJHUlRaWFJUZFdJZ1BTQmphR2xzWkZObGRGTjFZbk11WjJWMEtHTm9hV3hrVTJWMEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR05vYVd4a1UyVjBVM1ZpS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdWMlVnZDI5dUozUWdhR0YyWlNCMGFHVWdjM1ZpYzJOeWFYQjBhVzl1SUdsbUlIUm9aU0JqYUdsc1pGTmxkQ0JsYm1SbFpDQmhiSEpsWVdSNVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyaHBiR1JUWlhSVGRXSXVkVzV6ZFdKelkzSnBZbVVvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamFHbHNaRk5sZEZOMVluTXVaR1ZzWlhSbEtHTm9hV3hrVTJWMEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0I5TEZ4dUlDQWdJQ0FnSUNCbGNuSnZjaWhsY25JcElIdGNiaUFnSUNBZ0lDQWdJQ0JqYjI1MGNtOXNiR1Z5TG1WeWNtOXlLR1Z5Y2lrN1hHNGdJQ0FnSUNBZ0lIMHNYRzRnSUNBZ0lDQWdJR052YlhCc1pYUmxLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lHMWhhVzVUZFdKRGIyMXdiR1YwWldRZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2hvWVhOVGRXSnpZM0pwWW1Wa1ZHOURhR2xzWkhKbGJpQW1KaUJqYUdsc1pGTmxkRk4xWW5NdWMybDZaU0E5UFQwZ01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNWxibVFvS1R0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDBwTzF4dVhHNGdJQ0FnSUNCc1pYUWdhWE5RZFd4c2FXNW5RMmhoYm1kbGN5QTlJR1poYkhObE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUh0Y2JpQWdJQ0FnSUNBZ2RXNXpkV0p6WTNKcFltVW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ2JXRnBibE4xWWk1MWJuTjFZbk5qY21saVpTZ3BPMXh1SUNBZ0lDQWdJQ0FnSUdOb2FXeGtVMlYwVTNWaWN5NW1iM0pGWVdOb0tITjFZaUE5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZFdJdWRXNXpkV0p6WTNKcFltVW9LVHRjYmlBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdJQ0JqYUdsc1pGTmxkSE11WTJ4bFlYSW9LVHRjYmlBZ0lDQWdJQ0FnSUNCamFHbHNaRk5sZEZOMVluTXVZMnhsWVhJb0tUdGNiaUFnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnY0hWc2JFTm9ZVzVuWlhNb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHbHpVSFZzYkdsdVowTm9ZVzVuWlhNcElISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ0lDQnBjMUIxYkd4cGJtZERhR0Z1WjJWeklEMGdkSEoxWlR0Y2JseHVJQ0FnSUNBZ0lDQWdJR1J2SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzVsZUhSSVlYTkdhWEpsWkNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNBZ0lDQWdiV0ZwYmxOMVlpNXdkV3hzUTJoaGJtZGxjeWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZMmhwYkdSVFpYUlRkV0p6TG1admNrVmhZMmdvYzNWaUlEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdjM1ZpTG5CMWJHeERhR0Z1WjJWektDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdJQ0I5SUhkb2FXeGxJQ2h1WlhoMFNHRnpSbWx5WldRcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnYVhOUWRXeHNhVzVuUTJoaGJtZGxjeUE5SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJSDFjYmlBZ2ZTazdYRzU5WEc0aVhYMD0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiKSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKSk7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eVwiKSk7XG5cbnZhciBfU2NoZWR1bGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9TY2hlZHVsZXJcIikpO1xuXG52YXIgX3N5bWJvbE9ic2VydmFibGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJzeW1ib2wtb2JzZXJ2YWJsZVwiKSk7XG5cbnZhciBMaXZlU2V0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgLy8gV2hldGhlciB3ZSBjYW4gbXV0YXRlIHRoZSBfdmFsdWVzIFNldC5cbiAgZnVuY3Rpb24gTGl2ZVNldChpbml0KSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgTGl2ZVNldCk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGhpcywgXCJfaW5pdFwiLCB2b2lkIDApO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRoaXMsIFwiX3NjaGVkdWxlclwiLCB2b2lkIDApO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRoaXMsIFwiX3ZhbHVlc1wiLCBudWxsKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0aGlzLCBcIl9tdXRhYmxlVmFsdWVzXCIsIGZhbHNlKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0aGlzLCBcIl9hY3RpdmVcIiwgbnVsbCk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGhpcywgXCJfaW5TdWJzY3JpcHRpb25TdGFydFwiLCBmYWxzZSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGhpcywgXCJfZW5kZWRcIiwgZmFsc2UpO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRoaXMsIFwiX2VuZGVkV2l0aEVycm9yXCIsIGZhbHNlKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0aGlzLCBcIl9lcnJvclwiLCBudWxsKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0aGlzLCBcIl9xdWV1ZWRDYWxsXCIsIGZhbHNlKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0aGlzLCBcIl9jaGFuZ2VRdWV1ZVwiLCBbXSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGhpcywgXCJfb2JzZXJ2ZXJzXCIsIFtdKTtcbiAgICB0aGlzLl9pbml0ID0gaW5pdDtcbiAgICB0aGlzLl9zY2hlZHVsZXIgPSBpbml0LnNjaGVkdWxlciB8fCBMaXZlU2V0LmRlZmF1bHRTY2hlZHVsZXI7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShMaXZlU2V0LCBbe1xuICAgIGtleTogXCJfcXVldWVDaGFuZ2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3F1ZXVlQ2hhbmdlKHJlY29yZCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgaWYgKHJlY29yZCkge1xuICAgICAgICB0aGlzLl9jaGFuZ2VRdWV1ZS5wdXNoKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fcXVldWVkQ2FsbCkge1xuICAgICAgICB0aGlzLl9xdWV1ZWRDYWxsID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIF90aGlzLl9xdWV1ZWRDYWxsID0gZmFsc2U7XG4gICAgICAgICAgdmFyIGNoYW5nZXMgPSBfdGhpcy5fY2hhbmdlUXVldWU7XG4gICAgICAgICAgX3RoaXMuX2NoYW5nZVF1ZXVlID0gW107XG4gICAgICAgICAgdmFyIG9ic2VydmVyc1RvQ2FsbDtcbiAgICAgICAgICB2YXIgZW5kZWQgPSBfdGhpcy5fZW5kZWQ7XG5cbiAgICAgICAgICBpZiAoZW5kZWQpIHtcbiAgICAgICAgICAgIG9ic2VydmVyc1RvQ2FsbCA9IF90aGlzLl9vYnNlcnZlcnM7XG4gICAgICAgICAgICBfdGhpcy5fb2JzZXJ2ZXJzID0gW107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ic2VydmVyc1RvQ2FsbCA9IF90aGlzLl9vYnNlcnZlcnMuc2xpY2UoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvYnNlcnZlcnNUb0NhbGwuZm9yRWFjaChmdW5jdGlvbiAocmVjb3JkKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXIgPSByZWNvcmQub2JzZXJ2ZXIsXG4gICAgICAgICAgICAgICAgaWdub3JlID0gcmVjb3JkLmlnbm9yZTtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlck5leHQgPSBvYnNlcnZlci5uZXh0O1xuXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJOZXh0KSB7XG4gICAgICAgICAgICAgIGlmIChpZ25vcmUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlck5leHQuY2FsbChvYnNlcnZlciwgY2hhbmdlcyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjb3JkLmlnbm9yZSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZXNUb0RlbGl2ZXIgPSBjaGFuZ2VzLnNsaWNlKGlnbm9yZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlc1RvRGVsaXZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIG9ic2VydmVyTmV4dC5jYWxsKG9ic2VydmVyLCBjaGFuZ2VzVG9EZWxpdmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVuZGVkKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5fZW5kZWRXaXRoRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuZXJyb3IpIG9ic2VydmVyLmVycm9yKF90aGlzLl9lcnJvcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNvbXBsZXRlKSBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfZGVhY3RpdmF0ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZGVhY3RpdmF0ZSgpIHtcbiAgICAgIGlmICghdGhpcy5fYWN0aXZlKSB0aHJvdyBuZXcgRXJyb3IoJ2FscmVhZHkgaW5hY3RpdmUnKTtcbiAgICAgIHZhciBsaXN0ZW5IYW5kbGVyID0gdGhpcy5fYWN0aXZlLmxpc3RlbkhhbmRsZXI7XG4gICAgICB0aGlzLl9hY3RpdmUgPSBudWxsO1xuXG4gICAgICBpZiAobGlzdGVuSGFuZGxlcikge1xuICAgICAgICBsaXN0ZW5IYW5kbGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInZhbHVlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgICBpZiAodGhpcy5fdmFsdWVzKSB7XG4gICAgICAgIGlmICh0aGlzLl9hY3RpdmUgJiYgIXRoaXMuX2luU3Vic2NyaXB0aW9uU3RhcnQpIHtcbiAgICAgICAgICB2YXIgbGlzdGVuSGFuZGxlciA9IHRoaXMuX2FjdGl2ZS5saXN0ZW5IYW5kbGVyO1xuXG4gICAgICAgICAgaWYgKGxpc3RlbkhhbmRsZXIucHVsbENoYW5nZXMpIHtcbiAgICAgICAgICAgIGxpc3RlbkhhbmRsZXIucHVsbENoYW5nZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fbXV0YWJsZVZhbHVlcykge1xuICAgICAgICAgIHRoaXMuX211dGFibGVWYWx1ZXMgPSBmYWxzZTtcbiAgICAgICAgICBtYWtlU2V0SW1tdXRhYmxlKHRoaXMuX3ZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgLyo6OiBpZiAoIXRoaXMuX3ZhbHVlcykgdGhyb3cgbmV3IEVycm9yKCk7ICovXG5cblxuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndHJpZWQgdG8gY2FsbCB2YWx1ZXMoKSBvbiBsaXZlc2V0IGR1cmluZyBzdWJzY3JpcHRpb24gYmVmb3JlIHNldFZhbHVlcyB3YXMgY2FsbGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcyA9IHRoaXMuX2luaXQucmVhZCgpO1xuXG4gICAgICAgIG1ha2VTZXRJbW11dGFibGUocyk7XG4gICAgICAgIHJldHVybiBzO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpc0VuZGVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzRW5kZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZW5kZWQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFNjaGVkdWxlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTY2hlZHVsZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2NoZWR1bGVyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzdWJzY3JpYmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyT3JPbk5leHQsIG9uRXJyb3IsIG9uQ29tcGxldGUpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgbGl2ZVNldCA9IHRoaXM7XG4gICAgICB2YXIgb2JzZXJ2ZXI7XG5cbiAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXJPck9uTmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYnNlcnZlciA9IHtcbiAgICAgICAgICBuZXh0OiBvYnNlcnZlck9yT25OZXh0LFxuICAgICAgICAgIGVycm9yOiBvbkVycm9yLFxuICAgICAgICAgIGNvbXBsZXRlOiBvbkNvbXBsZXRlXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYnNlcnZlciA9IG9ic2VydmVyT3JPbk5leHQ7XG4gICAgICB9XG5cbiAgICAgIG9ic2VydmVyO1xuXG4gICAgICBpZiAodGhpcy5fZW5kZWQpIHtcbiAgICAgICAgdmFyIF9zdWJzY3JpcHRpb24gPSB7XG4gICAgICAgICAgY2xvc2VkOiBmYWxzZSxcbiAgICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICBfc3Vic2NyaXB0aW9uLmNsb3NlZCA9IHRydWU7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBwdWxsQ2hhbmdlczogZnVuY3Rpb24gcHVsbENoYW5nZXMoKSB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChvYnNlcnZlci5zdGFydCkge1xuICAgICAgICAgIG9ic2VydmVyLnN0YXJ0KF9zdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfc3Vic2NyaXB0aW9uLmNsb3NlZCkge1xuICAgICAgICAgIGlmICh0aGlzLl9lbmRlZFdpdGhFcnJvcikge1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmVycm9yKSB7XG4gICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKHRoaXMuX2Vycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX3N1YnNjcmlwdGlvbi5jbG9zZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gX3N1YnNjcmlwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9ic2VydmVyUmVjb3JkID0ge1xuICAgICAgICBvYnNlcnZlcjogb2JzZXJ2ZXIsXG4gICAgICAgIGlnbm9yZTogdGhpcy5fY2hhbmdlUXVldWUubGVuZ3RoXG4gICAgICB9O1xuICAgICAgdmFyIGlzU3RhcnRpbmcgPSB0cnVlO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlZEluU3RhcnQgPSBmYWxzZTtcbiAgICAgIHZhciBzdWJzY3JpcHRpb24gPSB7XG4gICAgICAgIC8qOjogY2xvc2VkOiBmYWxzZSYmYCAqL1xuICAgICAgICBnZXQgY2xvc2VkKCkge1xuICAgICAgICAgIHJldHVybiAhaXNTdGFydGluZyAmJiBsaXZlU2V0Ll9vYnNlcnZlcnMuaW5kZXhPZihvYnNlcnZlclJlY29yZCkgPCAwO1xuICAgICAgICB9XG4gICAgICAgIC8qOjogYCAqL1xuICAgICAgICAsXG5cbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIGlmIChpc1N0YXJ0aW5nKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZWRJblN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgaXggPSBfdGhpczIuX29ic2VydmVycy5pbmRleE9mKG9ic2VydmVyUmVjb3JkKTtcblxuICAgICAgICAgIGlmIChpeCA+PSAwKSB7XG4gICAgICAgICAgICBfdGhpczIuX29ic2VydmVycy5zcGxpY2UoaXgsIDEpO1xuXG4gICAgICAgICAgICBpZiAoIV90aGlzMi5fZW5kZWQgJiYgX3RoaXMyLl9vYnNlcnZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIF90aGlzMi5fdmFsdWVzID0gbnVsbDtcblxuICAgICAgICAgICAgICBfdGhpczIuX2RlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHB1bGxDaGFuZ2VzOiBmdW5jdGlvbiBwdWxsQ2hhbmdlcygpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLl9hY3RpdmUgJiYgX3RoaXMyLl9hY3RpdmUubGlzdGVuSGFuZGxlciAmJiBfdGhpczIuX2FjdGl2ZS5saXN0ZW5IYW5kbGVyLnB1bGxDaGFuZ2VzKSB7XG4gICAgICAgICAgICBfdGhpczIuX2FjdGl2ZS5saXN0ZW5IYW5kbGVyLnB1bGxDaGFuZ2VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGNoYW5nZVF1ZXVlTGVuZ3RoID0gX3RoaXMyLl9jaGFuZ2VRdWV1ZS5sZW5ndGg7XG4gICAgICAgICAgdmFyIG9yaWdpbmFsTmV4dCA9IG9ic2VydmVyLm5leHQ7XG5cbiAgICAgICAgICBpZiAoY2hhbmdlUXVldWVMZW5ndGggIT09IDAgJiYgb3JpZ2luYWxOZXh0KSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlc1RvRGVsaXZlciA9IF90aGlzMi5fY2hhbmdlUXVldWUuc2xpY2Uob2JzZXJ2ZXJSZWNvcmQuaWdub3JlKTtcblxuICAgICAgICAgICAgaWYgKGNoYW5nZXNUb0RlbGl2ZXIubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgIG9ic2VydmVyUmVjb3JkLmlnbm9yZSA9IGNoYW5nZVF1ZXVlTGVuZ3RoO1xuICAgICAgICAgICAgICBvcmlnaW5hbE5leHQuY2FsbChvYnNlcnZlciwgY2hhbmdlc1RvRGVsaXZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgICB2YXIgX2NvbnRyb2xsZXIyID0ge1xuICAgICAgICAgIC8vIEZsb3cgZG9lc24ndCBzdXBwb3J0IGdldHRlcnMgYW5kIHNldHRlcnMgeWV0XG5cbiAgICAgICAgICAvKjo6IGNsb3NlZDogZmFsc2UmJmAgKi9cbiAgICAgICAgICBnZXQgY2xvc2VkKCkge1xuICAgICAgICAgICAgcmV0dXJuICFsaXZlU2V0Ll9hY3RpdmUgfHwgbGl2ZVNldC5fYWN0aXZlLmNvbnRyb2xsZXIgIT09IHRoaXM7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qOjogYCAqL1xuICAgICAgICAgICxcblxuICAgICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gX3RoaXMyLl92YWx1ZXM7XG4gICAgICAgICAgICBpZiAoIXZhbHVlcykgdGhyb3cgbmV3IEVycm9yKCdzZXRWYWx1ZSBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgY29udHJvbGxlciBpcyB1c2VkJyk7XG5cbiAgICAgICAgICAgIGlmICghX3RoaXMyLl9lbmRlZCAmJiAhdmFsdWVzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgaWYgKCFfdGhpczIuX211dGFibGVWYWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBfdGhpczIuX3ZhbHVlcyA9IHZhbHVlcyA9IG5ldyBTZXQodmFsdWVzKTtcbiAgICAgICAgICAgICAgICBfdGhpczIuX211dGFibGVWYWx1ZXMgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFsdWVzLmFkZCh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgX3RoaXMyLl9xdWV1ZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FkZCcsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBfdGhpczIuX3ZhbHVlcztcbiAgICAgICAgICAgIGlmICghdmFsdWVzKSB0aHJvdyBuZXcgRXJyb3IoJ3NldFZhbHVlIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBjb250cm9sbGVyIGlzIHVzZWQnKTtcblxuICAgICAgICAgICAgaWYgKCFfdGhpczIuX2VuZGVkICYmIHZhbHVlcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICAgIGlmICghX3RoaXMyLl9tdXRhYmxlVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMyLl92YWx1ZXMgPSB2YWx1ZXMgPSBuZXcgU2V0KHZhbHVlcyk7XG4gICAgICAgICAgICAgICAgX3RoaXMyLl9tdXRhYmxlVmFsdWVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhbHVlcy5kZWxldGUodmFsdWUpO1xuXG4gICAgICAgICAgICAgIF90aGlzMi5fcXVldWVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdyZW1vdmUnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgICAgIGlmIChfdGhpczIuX2VuZGVkKSByZXR1cm47XG4gICAgICAgICAgICBfdGhpczIuX2VuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIF90aGlzMi5fZW5kZWRXaXRoRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgX3RoaXMyLl9lcnJvciA9IGVycjtcblxuICAgICAgICAgICAgX3RoaXMyLl9xdWV1ZUNoYW5nZSgpO1xuXG4gICAgICAgICAgICBfdGhpczIuX2RlYWN0aXZhdGUoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVuZDogZnVuY3Rpb24gZW5kKCkge1xuICAgICAgICAgICAgaWYgKF90aGlzMi5fZW5kZWQpIHJldHVybjtcbiAgICAgICAgICAgIF90aGlzMi5fZW5kZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICBfdGhpczIuX3F1ZXVlQ2hhbmdlKCk7XG5cbiAgICAgICAgICAgIF90aGlzMi5fZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGFjdGl2ZSA9IHRoaXMuX2FjdGl2ZSA9IHtcbiAgICAgICAgICBjb250cm9sbGVyOiBfY29udHJvbGxlcjIsXG4gICAgICAgICAgbGlzdGVuSGFuZGxlcjoge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge31cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHNldFZhbHVlc0Vycm9yID0gZnVuY3Rpb24gc2V0VmFsdWVzRXJyb3IoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRWYWx1ZXMgbXVzdCBiZSBjYWxsZWQgb25jZSBkdXJpbmcgbGlzdGVuJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIF9zZXRWYWx1ZXMyID0gZnVuY3Rpb24gX3NldFZhbHVlcyh2YWx1ZXMpIHtcbiAgICAgICAgICBfc2V0VmFsdWVzMiA9IHNldFZhbHVlc0Vycm9yO1xuICAgICAgICAgIG1ha2VTZXRJbW11dGFibGUodmFsdWVzKTtcbiAgICAgICAgICBfdGhpczIuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgICBfdGhpczIuX211dGFibGVWYWx1ZXMgPSBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbGlzdGVuSGFuZGxlck9yRnVuY3Rpb24gPSB0aGlzLl9pbml0Lmxpc3RlbihmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgICAgICAgcmV0dXJuIF9zZXRWYWx1ZXMyKHZhbHVlcyk7XG4gICAgICAgIH0sIF9jb250cm9sbGVyMik7XG5cbiAgICAgICAgaWYgKCF0aGlzLl92YWx1ZXMpIHtcbiAgICAgICAgICBzZXRWYWx1ZXNFcnJvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5IYW5kbGVyT3JGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGFjdGl2ZS5saXN0ZW5IYW5kbGVyID0ge1xuICAgICAgICAgICAgdW5zdWJzY3JpYmU6IGxpc3RlbkhhbmRsZXJPckZ1bmN0aW9uXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0ZW5IYW5kbGVyT3JGdW5jdGlvbiAhPSBudWxsICYmIHR5cGVvZiBsaXN0ZW5IYW5kbGVyT3JGdW5jdGlvbi51bnN1YnNjcmliZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGFjdGl2ZS5saXN0ZW5IYW5kbGVyID0gbGlzdGVuSGFuZGxlck9yRnVuY3Rpb247XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdGVuSGFuZGxlck9yRnVuY3Rpb24gIT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xpc3RlbiBtdXN0IHJldHVybiBvYmplY3Qgd2l0aCB1bnN1YnNjcmliZSBtZXRob2QsIGEgZnVuY3Rpb24sIG9yIG51bGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfY29udHJvbGxlcjIuY2xvc2VkKSB7XG4gICAgICAgICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xuXG4gICAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvYnNlcnZlci5zdGFydCkge1xuICAgICAgICB0aGlzLl9pblN1YnNjcmlwdGlvblN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgb2JzZXJ2ZXIuc3RhcnQoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5faW5TdWJzY3JpcHRpb25TdGFydCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpc1N0YXJ0aW5nID0gZmFsc2U7XG4gICAgICBvYnNlcnZlclJlY29yZC5pZ25vcmUgPSB0aGlzLl9jaGFuZ2VRdWV1ZS5sZW5ndGg7XG5cbiAgICAgIGlmICghdW5zdWJzY3JpYmVkSW5TdGFydCkge1xuICAgICAgICB0aGlzLl9vYnNlcnZlcnMucHVzaChvYnNlcnZlclJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiYWN0aXZlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFjdGl2ZShpbml0aWFsVmFsdWVzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgc2V0ID0gaW5pdGlhbFZhbHVlcyB8fCBuZXcgU2V0KCk7XG4gICAgICB2YXIgY29udHJvbGxlcjtcbiAgICAgIHZhciBsaXZlU2V0ID0gbmV3IExpdmVTZXQoe1xuICAgICAgICBzY2hlZHVsZXI6IG9wdGlvbnMgPyBvcHRpb25zLnNjaGVkdWxlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICByZXR1cm4gc2V0O1xuICAgICAgICB9LFxuICAgICAgICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3RlbihzZXRWYWx1ZXMsIF9jb250cm9sbGVyKSB7XG4gICAgICAgICAgc2V0VmFsdWVzKHNldCk7XG4gICAgICAgICAgY29udHJvbGxlciA9IF9jb250cm9sbGVyO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxpdmVTZXQuc3Vic2NyaWJlKHt9KTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxpdmVTZXQ6IGxpdmVTZXQsXG4gICAgICAgIGNvbnRyb2xsZXI6IGNvbnRyb2xsZXJcbiAgICAgIH07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnN0YW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlcywgb3B0aW9ucykge1xuICAgICAgbWFrZVNldEltbXV0YWJsZSh2YWx1ZXMpO1xuXG4gICAgICB2YXIgc2hvdWxkTm90SGFwcGVuID0gZnVuY3Rpb24gc2hvdWxkTm90SGFwcGVuKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgaGFwcGVuJyk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgbHMgPSBuZXcgTGl2ZVNldCh7XG4gICAgICAgIHNjaGVkdWxlcjogb3B0aW9ucyA/IG9wdGlvbnMuc2NoZWR1bGVyIDogdW5kZWZpbmVkLFxuICAgICAgICByZWFkOiBzaG91bGROb3RIYXBwZW4sXG4gICAgICAgIGxpc3Rlbjogc2hvdWxkTm90SGFwcGVuXG4gICAgICB9KTtcbiAgICAgIGxzLl9lbmRlZCA9IHRydWU7XG4gICAgICBscy5fdmFsdWVzID0gdmFsdWVzO1xuICAgICAgbHMuX211dGFibGVWYWx1ZXMgPSBmYWxzZTtcbiAgICAgIHJldHVybiBscztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExpdmVTZXQ7XG59KCk7IC8vIEFzc2lnbiBoZXJlIGJlY2F1c2UgRmxvdyBkb2Vzbid0IHN1cHBvcnQgY29tcHV0ZWQgcHJvcGVydHkga2V5cyBvbiBjbGFzc2VzOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzIyODZcblxuXG5leHBvcnRzLmRlZmF1bHQgPSBMaXZlU2V0O1xuKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkoTGl2ZVNldCwgXCJkZWZhdWx0U2NoZWR1bGVyXCIsIG5ldyBfU2NoZWR1bGVyLmRlZmF1bHQoKSk7XG5cbkxpdmVTZXQucHJvdG90eXBlW19zeW1ib2xPYnNlcnZhYmxlLmRlZmF1bHRdID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIG1ha2VTZXRJbW11dGFibGUoc2V0KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgc2V0LmFkZCA9IHNldC5kZWxldGUgPSBzZXQuY2xlYXIgPSByZWFkT25seTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZWFkT25seSgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdEbyBub3QgbW9kaWZ5IFNldCBwYXNzZWQgdG8gb3IgZnJvbSBMaXZlU2V0OiBTZXQgaXMgcmVhZC1vbmx5IGluIGRldmVsb3BtZW50Jyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTlwYm1SbGVDNXFjeUpkTENKdVlXMWxjeUk2V3lKTWFYWmxVMlYwSWl3aWFXNXBkQ0lzSWw5cGJtbDBJaXdpWDNOamFHVmtkV3hsY2lJc0luTmphR1ZrZFd4bGNpSXNJbVJsWm1GMWJIUlRZMmhsWkhWc1pYSWlMQ0p5WldOdmNtUWlMQ0pmWTJoaGJtZGxVWFZsZFdVaUxDSndkWE5vSWl3aVgzRjFaWFZsWkVOaGJHd2lMQ0p6WTJobFpIVnNaU0lzSW1Ob1lXNW5aWE1pTENKdlluTmxjblpsY25OVWIwTmhiR3dpTENKbGJtUmxaQ0lzSWw5bGJtUmxaQ0lzSWw5dlluTmxjblpsY25NaUxDSnpiR2xqWlNJc0ltWnZja1ZoWTJnaUxDSnZZbk5sY25abGNpSXNJbWxuYm05eVpTSXNJbTlpYzJWeWRtVnlUbVY0ZENJc0ltNWxlSFFpTENKallXeHNJaXdpWTJoaGJtZGxjMVJ2UkdWc2FYWmxjaUlzSW14bGJtZDBhQ0lzSWw5bGJtUmxaRmRwZEdoRmNuSnZjaUlzSW1WeWNtOXlJaXdpWDJWeWNtOXlJaXdpWTI5dGNHeGxkR1VpTENKZllXTjBhWFpsSWl3aVJYSnliM0lpTENKc2FYTjBaVzVJWVc1a2JHVnlJaXdpZFc1emRXSnpZM0pwWW1VaUxDSmZkbUZzZFdWeklpd2lYMmx1VTNWaWMyTnlhWEIwYVc5dVUzUmhjblFpTENKd2RXeHNRMmhoYm1kbGN5SXNJbDl0ZFhSaFlteGxWbUZzZFdWeklpd2liV0ZyWlZObGRFbHRiWFYwWVdKc1pTSXNJbk1pTENKeVpXRmtJaXdpYjJKelpYSjJaWEpQY2s5dVRtVjRkQ0lzSW05dVJYSnliM0lpTENKdmJrTnZiWEJzWlhSbElpd2liR2wyWlZObGRDSXNJbk4xWW5OamNtbHdkR2x2YmlJc0ltTnNiM05sWkNJc0luTjBZWEowSWl3aWIySnpaWEoyWlhKU1pXTnZjbVFpTENKcGMxTjBZWEowYVc1bklpd2lkVzV6ZFdKelkzSnBZbVZrU1c1VGRHRnlkQ0lzSW1sdVpHVjRUMllpTENKcGVDSXNJbk53YkdsalpTSXNJbDlrWldGamRHbDJZWFJsSWl3aVkyaGhibWRsVVhWbGRXVk1aVzVuZEdnaUxDSnZjbWxuYVc1aGJFNWxlSFFpTENKamIyNTBjbTlzYkdWeUlpd2lZV1JrSWl3aWRtRnNkV1VpTENKMllXeDFaWE1pTENKb1lYTWlMQ0pUWlhRaUxDSmZjWFZsZFdWRGFHRnVaMlVpTENKMGVYQmxJaXdpY21WdGIzWmxJaXdpWkdWc1pYUmxJaXdpWlhKeUlpd2laVzVrSWl3aVlXTjBhWFpsSWl3aWMyVjBWbUZzZFdWelJYSnliM0lpTENKelpYUldZV3gxWlhNaUxDSnNhWE4wWlc1SVlXNWtiR1Z5VDNKR2RXNWpkR2x2YmlJc0lteHBjM1JsYmlJc0lsUjVjR1ZGY25KdmNpSXNJbWx1YVhScFlXeFdZV3gxWlhNaUxDSnZjSFJwYjI1eklpd2ljMlYwSWl3aWRXNWtaV1pwYm1Wa0lpd2lYMk52Ym5SeWIyeHNaWElpTENKemRXSnpZM0pwWW1VaUxDSnphRzkxYkdST2IzUklZWEJ3Wlc0aUxDSnNjeUlzSWxOamFHVmtkV3hsY2lJc0luQnliM1J2ZEhsd1pTSXNJaVFrYjJKelpYSjJZV0pzWlNJc0luQnliMk5sYzNNaUxDSmxibllpTENKT1QwUkZYMFZPVmlJc0ltTnNaV0Z5SWl3aWNtVmhaRTl1YkhraVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3T3pzN096dEJRVVZCT3p0QlFVTkJPenRKUVdsRWNVSkJMRTg3T3p0QlFVOWpPMEZCWTJwRExHMUNRVUZaUXl4SlFVRmFMRVZCUVd0RE8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRXNiVVJCWm1Zc1NVRmxaVHRCUVVGQkxEQkVRV1JTTEV0QlkxRTdRVUZCUVN4dFJFRlVPVUlzU1VGVE9FSTdRVUZCUVN4blJVRlNXQ3hMUVZGWE8wRkJRVUVzYTBSQlVHaENMRXRCVDJkQ08wRkJRVUVzTWtSQlRsQXNTMEZOVHp0QlFVRkJMR3RFUVV4d1FpeEpRVXR2UWp0QlFVRkJMSFZFUVVwWUxFdEJTVmM3UVVGQlFTeDNSRUZJV1N4RlFVZGFPMEZCUVVFc2MwUkJSbGtzUlVGRldqdEJRVU5vUXl4VFFVRkxReXhMUVVGTUxFZEJRV0ZFTEVsQlFXSTdRVUZEUVN4VFFVRkxSU3hWUVVGTUxFZEJRV3RDUml4SlFVRkpMRU5CUVVOSExGTkJRVXdzU1VGQmEwSktMRTlCUVU4c1EwRkJRMHNzWjBKQlFUVkRPMEZCUTBRN096czdhVU5CYVVOWlF5eE5MRVZCUVdsRE8wRkJRVUU3TzBGQlF6VkRMRlZCUVVsQkxFMUJRVW9zUlVGQldUdEJRVU5XTEdGQlFVdERMRmxCUVV3c1EwRkJhMEpETEVsQlFXeENMRU5CUVhWQ1JpeE5RVUYyUWp0QlFVTkVPenRCUVVORUxGVkJRVWtzUTBGQlF5eExRVUZMUnl4WFFVRldMRVZCUVhWQ08wRkJRM0pDTEdGQlFVdEJMRmRCUVV3c1IwRkJiVUlzU1VGQmJrSTdPMEZCUTBFc1lVRkJTMDRzVlVGQlRDeERRVUZuUWs4c1VVRkJhRUlzUTBGQmVVSXNXVUZCVFR0QlFVTTNRaXhWUVVGQkxFdEJRVWtzUTBGQlEwUXNWMEZCVEN4SFFVRnRRaXhMUVVGdVFqdEJRVU5CTEdOQlFVMUZMRTlCUVU4c1IwRkJSeXhMUVVGSkxFTkJRVU5LTEZsQlFYSkNPMEZCUTBFc1ZVRkJRU3hMUVVGSkxFTkJRVU5CTEZsQlFVd3NSMEZCYjBJc1JVRkJjRUk3UVVGRFFTeGpRVUZKU3l4bFFVRktPMEZCUTBFc1kwRkJUVU1zUzBGQlN5eEhRVUZITEV0QlFVa3NRMEZCUTBNc1RVRkJia0k3TzBGQlEwRXNZMEZCU1VRc1MwRkJTaXhGUVVGWE8wRkJRMVJFTEZsQlFVRkJMR1ZCUVdVc1IwRkJSeXhMUVVGSkxFTkJRVU5ITEZWQlFYWkNPMEZCUTBFc1dVRkJRU3hMUVVGSkxFTkJRVU5CTEZWQlFVd3NSMEZCYTBJc1JVRkJiRUk3UVVGRFJDeFhRVWhFTEUxQlIwODdRVUZEVEVnc1dVRkJRVUVzWlVGQlpTeEhRVUZITEV0QlFVa3NRMEZCUTBjc1ZVRkJUQ3hEUVVGblFrTXNTMEZCYUVJc1JVRkJiRUk3UVVGRFJEczdRVUZEUkVvc1ZVRkJRVUVzWlVGQlpTeERRVUZEU3l4UFFVRm9RaXhEUVVGM1FpeFZRVUZCV0N4TlFVRk5MRVZCUVVrN1FVRkJRU3huUWtGRGVrSlpMRkZCUkhsQ0xFZEJRMHhhTEUxQlJFc3NRMEZEZWtKWkxGRkJSSGxDTzBGQlFVRXNaMEpCUTJaRExFMUJSR1VzUjBGRFRHSXNUVUZFU3l4RFFVTm1ZU3hOUVVSbE8wRkJSV2hETEdkQ1FVRk5ReXhaUVVGWkxFZEJRVWRHTEZGQlFWRXNRMEZCUTBjc1NVRkJPVUk3TzBGQlEwRXNaMEpCUVVsRUxGbEJRVW9zUlVGQmEwSTdRVUZEYUVJc2EwSkJRVWxFTEUxQlFVMHNTMEZCU3l4RFFVRm1MRVZCUVd0Q08wRkJRMmhDUXl4blFrRkJRVUVzV1VGQldTeERRVUZEUlN4SlFVRmlMRU5CUVd0Q1NpeFJRVUZzUWl4RlFVRTBRbEFzVDBGQk5VSTdRVUZEUkN4bFFVWkVMRTFCUlU4N1FVRkRURXdzWjBKQlFVRkJMRTFCUVUwc1EwRkJRMkVzVFVGQlVDeEhRVUZuUWl4RFFVRm9RanRCUVVOQkxHOUNRVUZOU1N4blFrRkJaMElzUjBGQlIxb3NUMEZCVHl4RFFVRkRTeXhMUVVGU0xFTkJRV05ITEUxQlFXUXNRMEZCZWtJN08wRkJRMEVzYjBKQlFVbEpMR2RDUVVGblFpeERRVUZEUXl4TlFVRnlRaXhGUVVFMlFqdEJRVU16UWtvc2EwSkJRVUZCTEZsQlFWa3NRMEZCUTBVc1NVRkJZaXhEUVVGclFrb3NVVUZCYkVJc1JVRkJORUpMTEdkQ1FVRTFRanRCUVVORU8wRkJRMFk3UVVGRFJqczdRVUZEUkN4blFrRkJTVllzUzBGQlNpeEZRVUZYTzBGQlExUXNhMEpCUVVrc1MwRkJTU3hEUVVGRFdTeGxRVUZVTEVWQlFUQkNPMEZCUTNoQ0xHOUNRVUZKVUN4UlFVRlJMRU5CUVVOUkxFdEJRV0lzUlVGQmIwSlNMRkZCUVZFc1EwRkJRMUVzUzBGQlZDeERRVUZsTEV0QlFVa3NRMEZCUTBNc1RVRkJjRUk3UVVGRGNrSXNaVUZHUkN4TlFVVlBPMEZCUTB3c2IwSkJRVWxVTEZGQlFWRXNRMEZCUTFVc1VVRkJZaXhGUVVGMVFsWXNVVUZCVVN4RFFVRkRWU3hSUVVGVU8wRkJRM2hDTzBGQlEwWTdRVUZEUml4WFFYSkNSRHRCUVhOQ1JDeFRRV3hEUkR0QlFXMURSRHRCUVVOR096czdhME5CUldFN1FVRkRXaXhWUVVGSkxFTkJRVU1zUzBGQlMwTXNUMEZCVml4RlFVRnRRaXhOUVVGTkxFbEJRVWxETEV0QlFVb3NRMEZCVlN4clFrRkJWaXhEUVVGT08wRkJSRkFzVlVGRlRFTXNZVUZHU3l4SFFVVlpMRXRCUVV0R0xFOUJSbXBDTEVOQlJVeEZMR0ZCUmtzN1FVRkhXaXhYUVVGTFJpeFBRVUZNTEVkQlFXVXNTVUZCWmpzN1FVRkRRU3hWUVVGSlJTeGhRVUZLTEVWQlFXMUNPMEZCUTJwQ1FTeFJRVUZCUVN4aFFVRmhMRU5CUVVORExGZEJRV1E3UVVGRFJEdEJRVU5HT3pzN05rSkJSV2RDTzBGQlEyWXNWVUZCU1N4TFFVRkxReXhQUVVGVUxFVkJRV3RDTzBGQlEyaENMRmxCUVVrc1MwRkJTMG9zVDBGQlRDeEpRVUZuUWl4RFFVRkRMRXRCUVV0TExHOUNRVUV4UWl4RlFVRm5SRHRCUVVGQkxHTkJRM1pEU0N4aFFVUjFReXhIUVVOMFFpeExRVUZMUml4UFFVUnBRaXhEUVVOMlEwVXNZVUZFZFVNN08wRkJSVGxETEdOQlFVbEJMR0ZCUVdFc1EwRkJRMGtzVjBGQmJFSXNSVUZCSzBJN1FVRkROMEpLTEZsQlFVRkJMR0ZCUVdFc1EwRkJRMGtzVjBGQlpEdEJRVU5FTzBGQlEwWTdPMEZCUTBRc1dVRkJTU3hMUVVGTFF5eGpRVUZVTEVWQlFYbENPMEZCUTNaQ0xHVkJRVXRCTEdOQlFVd3NSMEZCYzBJc1MwRkJkRUk3UVVGRFFVTXNWVUZCUVVFc1owSkJRV2RDTEVOQlFVTXNTMEZCUzBvc1QwRkJUaXhEUVVGb1FqdEJRVU5FTzBGQlEwUTdPenRCUVVOQkxHVkJRVThzUzBGQlMwRXNUMEZCV2p0QlFVTkVMRTlCWWtRc1RVRmhUenRCUVVOTUxGbEJRVWtzUzBGQlMwb3NUMEZCVkN4RlFVRnJRanRCUVVOb1FpeG5Ra0ZCVFN4SlFVRkpReXhMUVVGS0xFTkJRVlVzYlVaQlFWWXNRMEZCVGp0QlFVTkVPenRCUVVORUxGbEJRVTFSTEVOQlFVTXNSMEZCUnl4TFFVRkxjRU1zUzBGQlRDeERRVUZYY1VNc1NVRkJXQ3hGUVVGV096dEJRVU5CUml4UlFVRkJRU3huUWtGQlowSXNRMEZCUTBNc1EwRkJSQ3hEUVVGb1FqdEJRVU5CTEdWQlFVOUJMRU5CUVZBN1FVRkRSRHRCUVVOR096czdPRUpCUld0Q08wRkJRMnBDTEdGQlFVOHNTMEZCUzNoQ0xFMUJRVm83UVVGRFJEczdPMjFEUVVWNVFqdEJRVU40UWl4aFFVRlBMRXRCUVV0WUxGVkJRVm83UVVGRFJEczdPemhDUVVWVGNVTXNaMElzUlVGQk5rUkRMRThzUlVGQk9FSkRMRlVzUlVGQk9FTTdRVUZCUVRzN1FVRkRha29zVlVGQlRVTXNUMEZCVHl4SFFVRkhMRWxCUVdoQ08wRkJSVUVzVlVGQlNYcENMRkZCUVVvN08wRkJRMEVzVlVGQlNTeFBRVUZQYzBJc1owSkJRVkFzUzBGQk5FSXNWVUZCYUVNc1JVRkJORU03UVVGRE1VTjBRaXhSUVVGQlFTeFJRVUZSTEVkQlFVYzdRVUZEVkVjc1ZVRkJRVUVzU1VGQlNTeEZRVUZGYlVJc1owSkJSRWM3UVVGRlZHUXNWVUZCUVVFc1MwRkJTeXhGUVVGRlpTeFBRVVpGTzBGQlIxUmlMRlZCUVVGQkxGRkJRVkVzUlVGQlJXTTdRVUZJUkN4VFFVRllPMEZCUzBRc1QwRk9SQ3hOUVUxUE8wRkJRMHg0UWl4UlFVRkJRU3hSUVVGUkxFZEJRVWR6UWl4blFrRkJXRHRCUVVORU96dEJRVVZCZEVJc1RVRkJRVUVzVVVGQlJEczdRVUZGUVN4VlFVRkpMRXRCUVV0S0xFMUJRVlFzUlVGQmFVSTdRVUZEWml4WlFVRk5PRUlzWVVGQldTeEhRVUZITzBGQlEyNUNReXhWUVVGQlFTeE5RVUZOTEVWQlFVVXNTMEZFVnp0QlFVVnVRbUlzVlVGQlFVRXNWMEZCVnl4RlFVRkZMSFZDUVVGTk8wRkJRMnBDV1N4WlFVRkJRU3hoUVVGWkxFTkJRVU5ETEUxQlFXSXNSMEZCYzBJc1NVRkJkRUk3UVVGRFJDeFhRVXByUWp0QlFVdHVRbFlzVlVGQlFVRXNWMEZCVnl4RlFVRkZMSFZDUVVGTkxFTkJRVVU3UVVGTVJpeFRRVUZ5UWpzN1FVRlBRU3haUVVGSmFrSXNVVUZCVVN4RFFVRkRORUlzUzBGQllpeEZRVUZ2UWp0QlFVTnNRalZDTEZWQlFVRkJMRkZCUVZFc1EwRkJRelJDTEV0QlFWUXNRMEZCWlVZc1lVRkJaanRCUVVORU96dEJRVU5FTEZsQlFVa3NRMEZCUTBFc1lVRkJXU3hEUVVGRFF5eE5RVUZzUWl4RlFVRXdRanRCUVVONFFpeGpRVUZKTEV0QlFVdHdRaXhsUVVGVUxFVkJRVEJDTzBGQlEzaENMR2RDUVVGSlVDeFJRVUZSTEVOQlFVTlJMRXRCUVdJc1JVRkJiMEk3UVVGRGJFSlNMR05CUVVGQkxGRkJRVkVzUTBGQlExRXNTMEZCVkN4RFFVRmxMRXRCUVV0RExFMUJRWEJDTzBGQlEwUTdRVUZEUml4WFFVcEVMRTFCU1U4N1FVRkRUQ3huUWtGQlNWUXNVVUZCVVN4RFFVRkRWU3hSUVVGaUxFVkJRWFZDTzBGQlEzSkNWaXhqUVVGQlFTeFJRVUZSTEVOQlFVTlZMRkZCUVZRN1FVRkRSRHRCUVVOR08wRkJRMFk3TzBGQlEwUm5RaXhSUVVGQlFTeGhRVUZaTEVOQlFVTkRMRTFCUVdJc1IwRkJjMElzU1VGQmRFSTdRVUZEUVN4bFFVRlBSQ3hoUVVGUU8wRkJRMFE3TzBGQlJVUXNWVUZCVFVjc1kwRkJZeXhIUVVGSE8wRkJRVU0zUWl4UlFVRkJRU3hSUVVGUkxFVkJRVkpCTEZGQlFVUTdRVUZCVjBNc1VVRkJRVUVzVFVGQlRTeEZRVUZGTEV0QlFVdGFMRmxCUVV3c1EwRkJhMEpwUWp0QlFVRnlReXhQUVVGMlFqdEJRVVZCTEZWQlFVbDNRaXhWUVVGVkxFZEJRVWNzU1VGQmFrSTdRVUZEUVN4VlFVRkpReXh0UWtGQmJVSXNSMEZCUnl4TFFVRXhRanRCUVVOQkxGVkJRVTFNTEZsQlFWa3NSMEZCUnp0QlFVTnVRanRCUVVGNVFpeFpRVUZKUXl4TlFVRktMRWRCUVdFN1FVRkRjRU1zYVVKQlFVOHNRMEZCUTBjc1ZVRkJSQ3hKUVVGbFRDeFBRVUZQTEVOQlFVTTFRaXhWUVVGU0xFTkJRVzFDYlVNc1QwRkJia0lzUTBGQk1rSklMR05CUVROQ0xFbEJRVFpETEVOQlFXNUZPMEZCUTBRN1FVRkJRVHRCUVVoclFqczdRVUZKYmtKbUxGRkJRVUZCTEZkQlFWY3NSVUZCUlN4MVFrRkJUVHRCUVVOcVFpeGpRVUZKWjBJc1ZVRkJTaXhGUVVGblFqdEJRVU5rUXl4WlFVRkJRU3h0UWtGQmJVSXNSMEZCUnl4SlFVRjBRanRCUVVOQk8wRkJRMFE3TzBGQlEwUXNZMEZCVFVVc1JVRkJSU3hIUVVGSExFMUJRVWtzUTBGQlEzQkRMRlZCUVV3c1EwRkJaMEp0UXl4UFFVRm9RaXhEUVVGM1FrZ3NZMEZCZUVJc1EwRkJXRHM3UVVGRFFTeGpRVUZKU1N4RlFVRkZMRWxCUVVrc1EwRkJWaXhGUVVGaE8wRkJRMWdzV1VGQlFTeE5RVUZKTEVOQlFVTndReXhWUVVGTUxFTkJRV2RDY1VNc1RVRkJhRUlzUTBGQmRVSkVMRVZCUVhaQ0xFVkJRVEpDTEVOQlFUTkNPenRCUVVOQkxHZENRVUZKTEVOQlFVTXNUVUZCU1N4RFFVRkRja01zVFVGQlRpeEpRVUZuUWl4TlFVRkpMRU5CUVVORExGVkJRVXdzUTBGQlowSlRMRTFCUVdoQ0xFdEJRVEpDTEVOQlFTOURMRVZCUVd0RU8wRkJRMmhFTEdOQlFVRXNUVUZCU1N4RFFVRkRVeXhQUVVGTUxFZEJRV1VzU1VGQlpqczdRVUZEUVN4alFVRkJMRTFCUVVrc1EwRkJRMjlDTEZkQlFVdzdRVUZEUkR0QlFVTkdPMEZCUTBZc1UwRnFRbXRDTzBGQmEwSnVRbXhDTEZGQlFVRkJMRmRCUVZjc1JVRkJSU3gxUWtGQlRUdEJRVU5xUWl4alFVRkpMRTFCUVVrc1EwRkJRMDRzVDBGQlRDeEpRVUZuUWl4TlFVRkpMRU5CUVVOQkxFOUJRVXdzUTBGQllVVXNZVUZCTjBJc1NVRkJPRU1zVFVGQlNTeERRVUZEUml4UFFVRk1MRU5CUVdGRkxHRkJRV0lzUTBGQk1rSkpMRmRCUVRkRkxFVkJRVEJHTzBGQlEzaEdMRmxCUVVFc1RVRkJTU3hEUVVGRFRpeFBRVUZNTEVOQlFXRkZMR0ZCUVdJc1EwRkJNa0pKTEZkQlFUTkNPMEZCUTBRN08wRkJRMFFzWTBGQlRXMUNMR2xDUVVGcFFpeEhRVUZITEUxQlFVa3NRMEZCUXk5RExGbEJRVXdzUTBGQmEwSnBRaXhOUVVFMVF6dEJRVU5CTEdOQlFVMHJRaXhaUVVGWkxFZEJRVWR5UXl4UlFVRlJMRU5CUVVOSExFbEJRVGxDT3p0QlFVTkJMR05CUVVscFF5eHBRa0ZCYVVJc1MwRkJTeXhEUVVGMFFpeEpRVUV5UWtNc1dVRkJMMElzUlVGQk5rTTdRVUZETTBNc1owSkJRVTFvUXl4blFrRkJaMElzUjBGQlJ5eE5RVUZKTEVOQlFVTm9RaXhaUVVGTUxFTkJRV3RDVXl4TFFVRnNRaXhEUVVGM1FpdENMR05CUVdNc1EwRkJRelZDTEUxQlFYWkRMRU5CUVhwQ096dEJRVU5CTEdkQ1FVRkpTU3huUWtGQlowSXNRMEZCUTBNc1RVRkJha0lzUzBGQk5FSXNRMEZCYUVNc1JVRkJiVU03UVVGRGFrTjFRaXhqUVVGQlFTeGpRVUZqTEVOQlFVTTFRaXhOUVVGbUxFZEJRWGRDYlVNc2FVSkJRWGhDTzBGQlEwRkRMR05CUVVGQkxGbEJRVmtzUTBGQlEycERMRWxCUVdJc1EwRkJhMEpLTEZGQlFXeENMRVZCUVRSQ1N5eG5Ra0ZCTlVJN1FVRkRSRHRCUVVOR08wRkJRMFk3UVVFdlFtdENMRTlCUVhKQ096dEJRV3REUVN4VlFVRkpMRU5CUVVNc1MwRkJTMDBzVDBGQlZpeEZRVUZ0UWp0QlFVTnFRaXhaUVVGTk1rSXNXVUZCWjBNc1IwRkJSenRCUVVOMlF6czdRVUZEUVR0QlFVRjVRaXhqUVVGSldDeE5RVUZLTEVkQlFXRTdRVUZEY0VNc2JVSkJRVThzUTBGQlEwWXNUMEZCVHl4RFFVRkRaQ3hQUVVGVUxFbEJRVzlDWXl4UFFVRlBMRU5CUVVOa0xFOUJRVklzUTBGQlowSXlRaXhWUVVGb1FpeExRVUVyUWl4SlFVRXhSRHRCUVVORU8wRkJRVUU3UVVGS2MwTTdPMEZCUzNaRFF5eFZRVUZCUVN4SFFVRkhMRVZCUVVVc1lVRkJRVU1zUzBGQlN5eEZRVUZKTzBGQlExb3NaMEpCUVVsRExFMUJRVTBzUjBGQlJ5eE5RVUZKTEVOQlFVTXhRaXhQUVVGc1FqdEJRVU5CTEdkQ1FVRkpMRU5CUVVNd1FpeE5RVUZNTEVWQlFXRXNUVUZCVFN4SlFVRkpOMElzUzBGQlNpeERRVUZWTEcxRVFVRldMRU5CUVU0N08wRkJRMklzWjBKQlFVa3NRMEZCUXl4TlFVRkpMRU5CUVVOb1FpeE5RVUZPTEVsQlFXZENMRU5CUVVNMlF5eE5RVUZOTEVOQlFVTkRMRWRCUVZBc1EwRkJWMFlzUzBGQldDeERRVUZ5UWl4RlFVRjNRenRCUVVOMFF5eHJRa0ZCU1N4RFFVRkRMRTFCUVVrc1EwRkJRM1JDTEdOQlFWWXNSVUZCTUVJN1FVRkRlRUlzWjBKQlFVRXNUVUZCU1N4RFFVRkRTQ3hQUVVGTUxFZEJRV1V3UWl4TlFVRk5MRWRCUVVjc1NVRkJTVVVzUjBGQlNpeERRVUZSUml4TlFVRlNMRU5CUVhoQ08wRkJRMEVzWjBKQlFVRXNUVUZCU1N4RFFVRkRka0lzWTBGQlRDeEhRVUZ6UWl4SlFVRjBRanRCUVVORU96dEJRVU5FZFVJc1kwRkJRVUVzVFVGQlRTeERRVUZEUml4SFFVRlFMRU5CUVZkRExFdEJRVmc3TzBGQlEwRXNZMEZCUVN4TlFVRkpMRU5CUVVOSkxGbEJRVXdzUTBGQmEwSTdRVUZCUTBNc1owSkJRVUZCTEVsQlFVa3NSVUZCUlN4TFFVRlFPMEZCUVdOTUxHZENRVUZCUVN4TFFVRkxMRVZCUVV4Qk8wRkJRV1FzWlVGQmJFSTdRVUZEUkR0QlFVTkdMRmRCYUVKelF6dEJRV2xDZGtOTkxGVkJRVUZCTEUxQlFVMHNSVUZCUlN4blFrRkJRVTRzUzBGQlN5eEZRVUZKTzBGQlEyWXNaMEpCUVVsRExFMUJRVTBzUjBGQlJ5eE5RVUZKTEVOQlFVTXhRaXhQUVVGc1FqdEJRVU5CTEdkQ1FVRkpMRU5CUVVNd1FpeE5RVUZNTEVWQlFXRXNUVUZCVFN4SlFVRkpOMElzUzBGQlNpeERRVUZWTEcxRVFVRldMRU5CUVU0N08wRkJRMklzWjBKQlFVa3NRMEZCUXl4TlFVRkpMRU5CUVVOb1FpeE5RVUZPTEVsQlFXZENOa01zVFVGQlRTeERRVUZEUXl4SFFVRlFMRU5CUVZkR0xFdEJRVmdzUTBGQmNFSXNSVUZCZFVNN1FVRkRja01zYTBKQlFVa3NRMEZCUXl4TlFVRkpMRU5CUVVOMFFpeGpRVUZXTEVWQlFUQkNPMEZCUTNoQ0xHZENRVUZCTEUxQlFVa3NRMEZCUTBnc1QwRkJUQ3hIUVVGbE1FSXNUVUZCVFN4SFFVRkhMRWxCUVVsRkxFZEJRVW9zUTBGQlVVWXNUVUZCVWl4RFFVRjRRanRCUVVOQkxHZENRVUZCTEUxQlFVa3NRMEZCUTNaQ0xHTkJRVXdzUjBGQmMwSXNTVUZCZEVJN1FVRkRSRHM3UVVGRFJIVkNMR05CUVVGQkxFMUJRVTBzUTBGQlEwMHNUVUZCVUN4RFFVRmpVQ3hMUVVGa096dEJRVU5CTEdOQlFVRXNUVUZCU1N4RFFVRkRTU3haUVVGTUxFTkJRV3RDTzBGQlFVTkRMR2RDUVVGQlFTeEpRVUZKTEVWQlFVVXNVVUZCVUR0QlFVRnBRa3dzWjBKQlFVRkJMRXRCUVVzc1JVRkJURUU3UVVGQmFrSXNaVUZCYkVJN1FVRkRSRHRCUVVOR0xGZEJOVUp6UXp0QlFUWkNka05vUXl4VlFVRkJRU3hMUVVGTExFVkJRVVVzWlVGQlFYZERMRWRCUVVjc1JVRkJTVHRCUVVOYUxHZENRVUZKTEUxQlFVa3NRMEZCUTNCRUxFMUJRVlFzUlVGQmFVSTdRVUZEYWtJc1dVRkJRU3hOUVVGSkxFTkJRVU5CTEUxQlFVd3NSMEZCWXl4SlFVRmtPMEZCUTBFc1dVRkJRU3hOUVVGSkxFTkJRVU5YTEdWQlFVd3NSMEZCZFVJc1NVRkJka0k3UVVGRFFTeFpRVUZCTEUxQlFVa3NRMEZCUTBVc1RVRkJUQ3hIUVVGamRVTXNSMEZCWkRzN1FVRkRRU3haUVVGQkxFMUJRVWtzUTBGQlEwb3NXVUZCVERzN1FVRkRRU3haUVVGQkxFMUJRVWtzUTBGQlExUXNWMEZCVER0QlFVTkVMRmRCY0VOelF6dEJRWEZEZGtOakxGVkJRVUZCTEVkQlFVY3NSVUZCUlN4bFFVRk5PMEZCUTFRc1owSkJRVWtzVFVGQlNTeERRVUZEY2tRc1RVRkJWQ3hGUVVGcFFqdEJRVU5xUWl4WlFVRkJMRTFCUVVrc1EwRkJRMEVzVFVGQlRDeEhRVUZqTEVsQlFXUTdPMEZCUTBFc1dVRkJRU3hOUVVGSkxFTkJRVU5uUkN4WlFVRk1PenRCUVVOQkxGbEJRVUVzVFVGQlNTeERRVUZEVkN4WFFVRk1PMEZCUTBRN1FVRXhRM05ETEZOQlFYcERPMEZCTkVOQkxGbEJRVTFsTEUxQlFVMHNSMEZCUnl4TFFVRkxka01zVDBGQlRDeEhRVUZsTzBGQlF6VkNNa0lzVlVGQlFVRXNWVUZCVlN4RlFVRldRU3haUVVRMFFqdEJRVVUxUW5wQ0xGVkJRVUZCTEdGQlFXRXNSVUZCUlR0QlFVTmlReXhaUVVGQlFTeFhRVUZYTEVWQlFVVXNkVUpCUVUwc1EwRkJSVHRCUVVSU08wRkJSbUVzVTBGQk9VSTdPMEZCVFVFc1dVRkJUWEZETEdOQlFYZENMRWRCUVVjc1UwRkJNMEpCTEdOQlFUSkNMRWRCUVUwN1FVRkRja01zWjBKQlFVMHNTVUZCU1haRExFdEJRVW9zUTBGQlZTdzJRMEZCVml4RFFVRk9PMEZCUTBRc1UwRkdSRHM3UVVGSFFTeFpRVUZKZDBNc1YwRkJVeXhIUVVGSExHOUNRVUZCV0N4TlFVRk5MRVZCUVVrN1FVRkRlRUpYTEZWQlFVRkJMRmRCUVZNc1IwRkJSMFFzWTBGQldqdEJRVU5CYUVNc1ZVRkJRVUVzWjBKQlFXZENMRU5CUVVOelFpeE5RVUZFTEVOQlFXaENPMEZCUTBFc1ZVRkJRU3hOUVVGSkxFTkJRVU14UWl4UFFVRk1MRWRCUVdVd1FpeE5RVUZtTzBGQlEwRXNWVUZCUVN4TlFVRkpMRU5CUVVOMlFpeGpRVUZNTEVkQlFYTkNMRXRCUVhSQ08wRkJRMFFzVTBGTVJEczdRVUZOUVN4WlFVRk5iVU1zZFVKQlFYVkNMRWRCUVVjc1MwRkJTM0pGTEV0QlFVd3NRMEZCVjNORkxFMUJRVmdzUTBGQmEwSXNWVUZCUVdJc1RVRkJUVHRCUVVGQkxHbENRVUZKVnl4WFFVRlRMRU5CUVVOWUxFMUJRVVFzUTBGQllqdEJRVUZCTEZOQlFYaENMRVZCUVN0RFNDeFpRVUV2UXl4RFFVRm9RenM3UVVGRFFTeFpRVUZKTEVOQlFVTXNTMEZCUzNaQ0xFOUJRVllzUlVGQmJVSTdRVUZEYWtKdlF5eFZRVUZCUVN4alFVRmpPMEZCUTJZN08wRkJRMFFzV1VGQlNTeFBRVUZQUlN4MVFrRkJVQ3hMUVVGdFF5eFZRVUYyUXl4RlFVRnRSRHRCUVVOcVJFZ3NWVUZCUVVFc1RVRkJUU3hEUVVGRGNrTXNZVUZCVUN4SFFVRjFRanRCUVVOeVFrTXNXVUZCUVVFc1YwRkJWeXhGUVVGRmRVTTdRVUZFVVN4WFFVRjJRanRCUVVkRUxGTkJTa1FzVFVGSlR5eEpRVUZKUVN4MVFrRkJkVUlzU1VGQlNTeEpRVUV6UWl4SlFVRnRReXhQUVVGUFFTeDFRa0ZCZFVJc1EwRkJRM1pETEZkQlFTOUNMRXRCUVN0RExGVkJRWFJHTEVWQlFXdEhPMEZCUTNaSGIwTXNWVUZCUVVFc1RVRkJUU3hEUVVGRGNrTXNZVUZCVUN4SFFVRjFRbmRETEhWQ1FVRjJRanRCUVVORUxGTkJSazBzVFVGRlFTeEpRVUZKUVN4MVFrRkJkVUlzU1VGQlNTeEpRVUV2UWl4RlFVRnhRenRCUVVNeFF5eG5Ra0ZCVFN4SlFVRkpSU3hUUVVGS0xFTkJRV01zZDBWQlFXUXNRMEZCVGp0QlFVTkVPenRCUVVORUxGbEJRVWxxUWl4WlFVRlZMRU5CUVVOWUxFMUJRV1lzUlVGQmRVSTdRVUZEY2tJc1pVRkJTMmhDTEU5QlFVd3NSMEZCWlhWRExFMUJRV1k3TzBGQlEwRXNaVUZCUzJZc1YwRkJURHRCUVVORU8wRkJRMFk3TzBGQlJVUXNWVUZCU1c1RExGRkJRVkVzUTBGQlF6UkNMRXRCUVdJc1JVRkJiMEk3UVVGRGJFSXNZVUZCUzFvc2IwSkJRVXdzUjBGQk5FSXNTVUZCTlVJN1FVRkRRV2hDTEZGQlFVRkJMRkZCUVZFc1EwRkJRelJDTEV0QlFWUXNRMEZCWlVZc1dVRkJaanRCUVVOQkxHRkJRVXRXTEc5Q1FVRk1MRWRCUVRSQ0xFdEJRVFZDTzBGQlEwUTdPMEZCUTBSakxFMUJRVUZCTEZWQlFWVXNSMEZCUnl4TFFVRmlPMEZCUlVGRUxFMUJRVUZCTEdOQlFXTXNRMEZCUXpWQ0xFMUJRV1lzUjBGQmQwSXNTMEZCUzFvc1dVRkJUQ3hEUVVGclFtbENMRTFCUVRGRE96dEJRVU5CTEZWQlFVa3NRMEZCUTNsQ0xHMUNRVUZNTEVWQlFUQkNPMEZCUTNoQ0xHRkJRVXRzUXl4VlFVRk1MRU5CUVdkQ1VDeEpRVUZvUWl4RFFVRnhRblZETEdOQlFYSkNPMEZCUTBRN08wRkJSVVFzWVVGQlQwZ3NXVUZCVUR0QlFVTkVPenM3TWtKQmFGTm5RamhDTEdFc1JVRkJkMEpETEU4c1JVRkJORVk3UVVGRGJra3NWVUZCVFVNc1IwRkJSeXhIUVVGSFJpeGhRVUZoTEVsQlFVa3NTVUZCU1dJc1IwRkJTaXhGUVVFM1FqdEJRVU5CTEZWQlFVbE1MRlZCUVVvN1FVRkRRU3hWUVVGTllpeFBRVUZQTEVkQlFVY3NTVUZCU1RORExFOUJRVW9zUTBGQldUdEJRVU14UWtrc1VVRkJRVUVzVTBGQlV5eEZRVUZGZFVVc1QwRkJUeXhIUVVGSFFTeFBRVUZQTEVOQlFVTjJSU3hUUVVGWUxFZEJRWFZDZVVVc1UwRkVaanRCUVVVeFFuUkRMRkZCUVVGQkxFbEJRVWtzUlVGQlJUdEJRVUZCTEdsQ1FVRk5jVU1zUjBGQlRqdEJRVUZCTEZOQlJtOUNPMEZCUnpGQ1NpeFJRVUZCUVN4TlFVRk5MRVZCUVVVc1owSkJRVU5HTEZOQlFVUXNSVUZCV1ZFc1YwRkJXaXhGUVVFMFFqdEJRVU5zUTFJc1ZVRkJRVUVzVTBGQlV5eERRVUZEVFN4SFFVRkVMRU5CUVZRN1FVRkRRWEJDTEZWQlFVRkJMRlZCUVZVc1IwRkJSM05DTEZkQlFXSTdRVUZEUkR0QlFVNTVRaXhQUVVGYUxFTkJRV2hDTzBGQlVVRnVReXhOUVVGQlFTeFBRVUZQTEVOQlFVTnZReXhUUVVGU0xFTkJRV3RDTEVWQlFXeENPMEZCUTBFc1lVRkJUenRCUVVGRGNFTXNVVUZCUVVFc1QwRkJUeXhGUVVGUVFTeFBRVUZFTzBGQlFWVmhMRkZCUVVGQkxGVkJRVlVzUlVGQlIwRTdRVUZCZGtJc1QwRkJVRHRCUVVORU96czdOa0pCUld0Q1J5eE5MRVZCUVdkQ1owSXNUeXhGUVVFclF6dEJRVU5vUm5SRExFMUJRVUZCTEdkQ1FVRm5RaXhEUVVGRGMwSXNUVUZCUkN4RFFVRm9RanM3UVVGRFFTeFZRVUZOY1VJc1pVRkJaU3hIUVVGSExGTkJRV3hDUVN4bFFVRnJRaXhIUVVGTk8wRkJRelZDTEdOQlFVMHNTVUZCU1d4RUxFdEJRVW9zUTBGQlZTeHRRa0ZCVml4RFFVRk9PMEZCUTBRc1QwRkdSRHM3UVVGSFFTeFZRVUZOYlVRc1JVRkJSU3hIUVVGSExFbEJRVWxxUml4UFFVRktMRU5CUVZrN1FVRkRja0pKTEZGQlFVRkJMRk5CUVZNc1JVRkJSWFZGTEU5QlFVOHNSMEZCUjBFc1QwRkJUeXhEUVVGRGRrVXNVMEZCV0N4SFFVRjFRbmxGTEZOQlJIQkNPMEZCUlhKQ2RFTXNVVUZCUVVFc1NVRkJTU3hGUVVGRmVVTXNaVUZHWlR0QlFVZHlRbElzVVVGQlFVRXNUVUZCVFN4RlFVRkZVVHRCUVVoaExFOUJRVm9zUTBGQldEdEJRVXRCUXl4TlFVRkJRU3hGUVVGRkxFTkJRVU51UlN4TlFVRklMRWRCUVZrc1NVRkJXanRCUVVOQmJVVXNUVUZCUVVFc1JVRkJSU3hEUVVGRGFFUXNUMEZCU0N4SFFVRmhNRUlzVFVGQllqdEJRVU5CYzBJc1RVRkJRVUVzUlVGQlJTeERRVUZETjBNc1kwRkJTQ3hIUVVGdlFpeExRVUZ3UWp0QlFVTkJMR0ZCUVU4MlF5eEZRVUZRTzBGQlEwUTdPenRMUVhOUlNEdEJRVU5CT3pzN096aENRVGxVY1VKcVJpeFBMSE5DUVVOUExFbEJRVWxyUml4clFrRkJTaXhGT3p0QlFUaFVNMEpzUml4UFFVRkVMRU5CUVdOdFJpeFRRVUZrTEVOQlFYZENReXg1UWtGQmVFSXNTVUZCZDBNc1dVRkJWenRCUVVOcVJDeFRRVUZQTEVsQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQkxGTkJRVk12UXl4blFrRkJWQ3hEUVVFd1FuVkRMRWRCUVRGQ0xFVkJRWGxETzBGQlEzWkRMRTFCUVVsVExFOUJRVThzUTBGQlEwTXNSMEZCVWl4RFFVRlpReXhSUVVGYUxFdEJRWGxDTEZsQlFUZENMRVZCUVRKRE8wRkJRM2hEV0N4SlFVRkJRU3hIUVVGRUxFTkJRVlZ1UWl4SFFVRldMRWRCUVdsQ2JVSXNSMEZCUkN4RFFVRlZXQ3hOUVVGV0xFZEJRVzlDVnl4SFFVRkVMRU5CUVZWWkxFdEJRVllzUjBGQmEwSkRMRkZCUVhKRU8wRkJRMFE3UVVGRFJqczdRVUZGUkN4VFFVRlRRU3hSUVVGVUxFZEJRVzlDTzBGQlEyeENMRkZCUVUwc1NVRkJTVE5FTEV0QlFVb3NRMEZCVlN3NFJVRkJWaXhEUVVGT08wRkJRMFFpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktpQkFabXh2ZHlBcUwxeHVYRzVwYlhCdmNuUWdVMk5vWldSMWJHVnlJR1p5YjIwZ0p5NHZVMk5vWldSMWJHVnlKenRjYm1sdGNHOXlkQ0FrSkc5aWMyVnlkbUZpYkdVZ1puSnZiU0FuYzNsdFltOXNMVzlpYzJWeWRtRmliR1VuTzF4dVhHNWxlSEJ2Y25RZ2RIbHdaU0JNYVhabFUyVjBRMmhoYm1kbFVtVmpiM0prUEN0VVBpQTlYRzRnSUh0MGVYQmxPaUFuWVdSa0p5d2dLM1poYkhWbE9pQlVmU0I4WEc0Z0lIdDBlWEJsT2lBbmNtVnRiM1psSnl3Z0szWmhiSFZsT2lCVWZTQjhYRzRnSUh0MGVYQmxPaUFuWlc1a0ozMDdYRzVjYm1WNGNHOXlkQ0IwZVhCbElFeHBkbVZUWlhSRGIyNTBjbTlzYkdWeVBDMVVQaUE5SUh0Y2JpQWdZMnh2YzJWa09pQmliMjlzWldGdU8xeHVJQ0JoWkdRb2FYUmxiVG9nVkNrNklIWnZhV1E3WEc0Z0lISmxiVzkyWlNocGRHVnRPaUJVS1RvZ2RtOXBaRHRjYmlBZ1pYSnliM0lvWlhKeU9pQmhibmtwT2lCMmIybGtPMXh1SUNCbGJtUW9LVG9nZG05cFpEdGNibjA3WEc1Y2JtVjRjRzl5ZENCMGVYQmxJRXhwYzNSbGJraGhibVJzWlhJZ1BTQjdYRzRnSUhWdWMzVmljMk55YVdKbEtDazZJSFp2YVdRN1hHNGdJQ3R3ZFd4c1EyaGhibWRsY3o4NklDZ3BJRDArSUhadmFXUTdYRzU5TzF4dVhHNWxlSEJ2Y25RZ2RIbHdaU0JNYVhabFUyVjBTVzVwZER4VVBpQTlJSHRjYmlBZ2MyTm9aV1IxYkdWeVB6b2dVMk5vWldSMWJHVnlPMXh1SUNCeVpXRmtLQ2s2SUZObGREeFVQanRjYmlBZ2JHbHpkR1Z1S0Z4dUlDQWdJSE5sZEZaaGJIVmxjem9nZXlBb2RtRnNkV1Z6T2lCVFpYUThWRDRwT2lCMmIybGtJSDBzWEc0Z0lDQWdZMjl1ZEhKdmJHeGxjam9nVEdsMlpWTmxkRU52Ym5SeWIyeHNaWEk4VkQ1Y2JpQWdLVG9nZG05cFpIeE1hWE4wWlc1SVlXNWtiR1Z5ZkNncFBUNTJiMmxrTzF4dWZUdGNibHh1Wlhod2IzSjBJSFI1Y0dVZ1RHbDJaVk5sZEZOMVluTmpjbWxpWlhJOExWUStJRDBnS0dOb1lXNW5aWE02SUNSU1pXRmtUMjVzZVVGeWNtRjVQRXhwZG1WVFpYUkRhR0Z1WjJWU1pXTnZjbVE4VkQ0K0tTQTlQaUIyYjJsa08xeHVYRzVsZUhCdmNuUWdkSGx3WlNCTWFYWmxVMlYwVTNWaWMyTnlhWEIwYVc5dUlEMGdlMXh1SUNCamJHOXpaV1E2SUdKdmIyeGxZVzQ3WEc0Z0lIVnVjM1ZpYzJOeWFXSmxLQ2s2SUhadmFXUTdYRzRnSUhCMWJHeERhR0Z1WjJWektDazZJSFp2YVdRN1hHNTlPMXh1WEc1bGVIQnZjblFnZEhsd1pTQk1hWFpsVTJWMFQySnpaWEoyWlhJOExWUStJRDBnZTF4dUlDQXJjM1JoY25RL09pQS9LSE4xWW5OamNtbHdkR2x2YmpvZ1RHbDJaVk5sZEZOMVluTmpjbWx3ZEdsdmJpa2dQVDRnZG05cFpEdGNiaUFnSzI1bGVIUS9PaUEvVEdsMlpWTmxkRk4xWW5OamNtbGlaWEk4VkQ0N1hHNGdJQ3RsY25KdmNqODZJRDhvWlhKeU9pQmhibmtwSUQwK0lIWnZhV1E3WEc0Z0lDdGpiMjF3YkdWMFpUODZJRDhvS1NBOVBpQjJiMmxrTzF4dWZUdGNibHh1ZEhsd1pTQk1hWFpsVTJWMFQySnpaWEoyWlhKU1pXTnZjbVE4VkQ0Z1BTQjdYRzRnSUdsbmJtOXlaVG9nYm5WdFltVnlPMXh1SUNCdlluTmxjblpsY2pvZ1RHbDJaVk5sZEU5aWMyVnlkbVZ5UEZRK08xeHVmVHRjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnWTJ4aGMzTWdUR2wyWlZObGREeFVQaUI3WEc0Z0lITjBZWFJwWXlCa1pXWmhkV3gwVTJOb1pXUjFiR1Z5SUQwZ2JtVjNJRk5qYUdWa2RXeGxjaWdwTzF4dVhHNGdJRjlwYm1sME9pQk1hWFpsVTJWMFNXNXBkRHhVUGp0Y2JpQWdYM05qYUdWa2RXeGxjam9nVTJOb1pXUjFiR1Z5TzF4dVhHNGdJRjkyWVd4MVpYTTZJRDlUWlhROFZENGdQU0J1ZFd4c08xeHVJQ0JmYlhWMFlXSnNaVlpoYkhWbGN6b2dZbTl2YkdWaGJpQTlJR1poYkhObE95QXZMeUJYYUdWMGFHVnlJSGRsSUdOaGJpQnRkWFJoZEdVZ2RHaGxJRjkyWVd4MVpYTWdVMlYwTGx4dVhHNGdJRjloWTNScGRtVTZJRDk3WEc0Z0lDQWdZMjl1ZEhKdmJHeGxjam9nVEdsMlpWTmxkRU52Ym5SeWIyeHNaWEk4VkQ0N1hHNGdJQ0FnYkdsemRHVnVTR0Z1Wkd4bGNqb2dUR2x6ZEdWdVNHRnVaR3hsY2p0Y2JpQWdmU0E5SUc1MWJHdzdYRzRnSUY5cGJsTjFZbk5qY21sd2RHbHZibE4wWVhKMElEMGdabUZzYzJVN1hHNGdJRjlsYm1SbFpEb2dZbTl2YkdWaGJpQTlJR1poYkhObE8xeHVJQ0JmWlc1a1pXUlhhWFJvUlhKeWIzSTZJR0p2YjJ4bFlXNGdQU0JtWVd4elpUdGNiaUFnWDJWeWNtOXlPaUJoYm5rZ1BTQnVkV3hzTzF4dUlDQmZjWFZsZFdWa1EyRnNiRG9nWW05dmJHVmhiaUE5SUdaaGJITmxPMXh1SUNCZlkyaGhibWRsVVhWbGRXVTZJRUZ5Y21GNVBFeHBkbVZUWlhSRGFHRnVaMlZTWldOdmNtUThWRDQrSUQwZ1cxMDdYRzRnSUY5dlluTmxjblpsY25NNklFRnljbUY1UEV4cGRtVlRaWFJQWW5ObGNuWmxjbEpsWTI5eVpEeFVQajRnUFNCYlhUdGNibHh1SUNCamIyNXpkSEoxWTNSdmNpaHBibWwwT2lCTWFYWmxVMlYwU1c1cGREeFVQaWtnZTF4dUlDQWdJSFJvYVhNdVgybHVhWFFnUFNCcGJtbDBPMXh1SUNBZ0lIUm9hWE11WDNOamFHVmtkV3hsY2lBOUlHbHVhWFF1YzJOb1pXUjFiR1Z5SUh4OElFeHBkbVZUWlhRdVpHVm1ZWFZzZEZOamFHVmtkV3hsY2p0Y2JpQWdmVnh1WEc0Z0lITjBZWFJwWXlCaFkzUnBkbVU4VkQ0b2FXNXBkR2xoYkZaaGJIVmxjem9nUDFObGREeFVQaXdnYjNCMGFXOXVjem9nUDN0elkyaGxaSFZzWlhJL09pQlRZMmhsWkhWc1pYSjlLVG9nZTJ4cGRtVlRaWFE2SUV4cGRtVlRaWFE4VkQ0c0lHTnZiblJ5YjJ4c1pYSTZJRXhwZG1WVFpYUkRiMjUwY205c2JHVnlQRlErZlNCN1hHNGdJQ0FnWTI5dWMzUWdjMlYwSUQwZ2FXNXBkR2xoYkZaaGJIVmxjeUI4ZkNCdVpYY2dVMlYwS0NrN1hHNGdJQ0FnYkdWMElHTnZiblJ5YjJ4c1pYSTdYRzRnSUNBZ1kyOXVjM1FnYkdsMlpWTmxkQ0E5SUc1bGR5Qk1hWFpsVTJWMEtIdGNiaUFnSUNBZ0lITmphR1ZrZFd4bGNqb2diM0IwYVc5dWN5QS9JRzl3ZEdsdmJuTXVjMk5vWldSMWJHVnlJRG9nZFc1a1pXWnBibVZrTEZ4dUlDQWdJQ0FnY21WaFpEb2dLQ2tnUFQ0Z2MyVjBMRnh1SUNBZ0lDQWdiR2x6ZEdWdU9pQW9jMlYwVm1Gc2RXVnpMQ0JmWTI5dWRISnZiR3hsY2lrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0J6WlhSV1lXeDFaWE1vYzJWMEtUdGNiaUFnSUNBZ0lDQWdZMjl1ZEhKdmJHeGxjaUE5SUY5amIyNTBjbTlzYkdWeU8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVJQ0FnSUd4cGRtVlRaWFF1YzNWaWMyTnlhV0psS0h0OUtUdGNiaUFnSUNCeVpYUjFjbTRnZTJ4cGRtVlRaWFFzSUdOdmJuUnliMnhzWlhJNklDaGpiMjUwY205c2JHVnlPaUJoYm5rcGZUdGNiaUFnZlZ4dVhHNGdJSE4wWVhScFl5QmpiMjV6ZEdGdWREeFVQaWgyWVd4MVpYTTZJRk5sZER4VVBpd2diM0IwYVc5dWN6b2dQM3R6WTJobFpIVnNaWEkvT2lCVFkyaGxaSFZzWlhKOUtUb2dUR2wyWlZObGREeFVQaUI3WEc0Z0lDQWdiV0ZyWlZObGRFbHRiWFYwWVdKc1pTaDJZV3gxWlhNcE8xeHVJQ0FnSUdOdmJuTjBJSE5vYjNWc1pFNXZkRWhoY0hCbGJpQTlJQ2dwSUQwK0lIdGNiaUFnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblUyaHZkV3hrSUc1dmRDQm9ZWEJ3Wlc0bktUdGNiaUFnSUNCOU8xeHVJQ0FnSUdOdmJuTjBJR3h6SUQwZ2JtVjNJRXhwZG1WVFpYUW9lMXh1SUNBZ0lDQWdjMk5vWldSMWJHVnlPaUJ2Y0hScGIyNXpJRDhnYjNCMGFXOXVjeTV6WTJobFpIVnNaWElnT2lCMWJtUmxabWx1WldRc1hHNGdJQ0FnSUNCeVpXRmtPaUJ6YUc5MWJHUk9iM1JJWVhCd1pXNHNYRzRnSUNBZ0lDQnNhWE4wWlc0NklITm9iM1ZzWkU1dmRFaGhjSEJsYmx4dUlDQWdJSDBwTzF4dUlDQWdJR3h6TGw5bGJtUmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ2JITXVYM1poYkhWbGN5QTlJSFpoYkhWbGN6dGNiaUFnSUNCc2N5NWZiWFYwWVdKc1pWWmhiSFZsY3lBOUlHWmhiSE5sTzF4dUlDQWdJSEpsZEhWeWJpQnNjenRjYmlBZ2ZWeHVYRzRnSUY5eGRXVjFaVU5vWVc1blpTaHlaV052Y21RNklEOU1hWFpsVTJWMFEyaGhibWRsVW1WamIzSmtQRlErS1NCN1hHNGdJQ0FnYVdZZ0tISmxZMjl5WkNrZ2UxeHVJQ0FnSUNBZ2RHaHBjeTVmWTJoaGJtZGxVWFZsZFdVdWNIVnphQ2h5WldOdmNtUXBPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9JWFJvYVhNdVgzRjFaWFZsWkVOaGJHd3BJSHRjYmlBZ0lDQWdJSFJvYVhNdVgzRjFaWFZsWkVOaGJHd2dQU0IwY25WbE8xeHVJQ0FnSUNBZ2RHaHBjeTVmYzJOb1pXUjFiR1Z5TG5OamFHVmtkV3hsS0NncElEMCtJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZjWFZsZFdWa1EyRnNiQ0E5SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQmphR0Z1WjJWeklEMGdkR2hwY3k1ZlkyaGhibWRsVVhWbGRXVTdYRzRnSUNBZ0lDQWdJSFJvYVhNdVgyTm9ZVzVuWlZGMVpYVmxJRDBnVzEwN1hHNGdJQ0FnSUNBZ0lHeGxkQ0J2WW5ObGNuWmxjbk5VYjBOaGJHdzdYRzRnSUNBZ0lDQWdJR052Ym5OMElHVnVaR1ZrSUQwZ2RHaHBjeTVmWlc1a1pXUTdYRzRnSUNBZ0lDQWdJR2xtSUNobGJtUmxaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lHOWljMlZ5ZG1WeWMxUnZRMkZzYkNBOUlIUm9hWE11WDI5aWMyVnlkbVZ5Y3p0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5dlluTmxjblpsY25NZ1BTQmJYVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCdlluTmxjblpsY25OVWIwTmhiR3dnUFNCMGFHbHpMbDl2WW5ObGNuWmxjbk11YzJ4cFkyVW9LVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCdlluTmxjblpsY25OVWIwTmhiR3d1Wm05eVJXRmphQ2h5WldOdmNtUWdQVDRnZTF4dUlDQWdJQ0FnSUNBZ0lHTnZibk4wSUh0dlluTmxjblpsY2l3Z2FXZHViM0psZlNBOUlISmxZMjl5WkR0Y2JpQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCdlluTmxjblpsY2s1bGVIUWdQU0J2WW5ObGNuWmxjaTV1WlhoME8xeHVJQ0FnSUNBZ0lDQWdJR2xtSUNodlluTmxjblpsY2s1bGVIUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hwWjI1dmNtVWdQVDA5SURBcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2IySnpaWEoyWlhKT1pYaDBMbU5oYkd3b2IySnpaWEoyWlhJc0lHTm9ZVzVuWlhNcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVZqYjNKa0xtbG5ibTl5WlNBOUlEQTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUdOb1lXNW5aWE5VYjBSbGJHbDJaWElnUFNCamFHRnVaMlZ6TG5Oc2FXTmxLR2xuYm05eVpTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hqYUdGdVoyVnpWRzlFWld4cGRtVnlMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzlpYzJWeWRtVnlUbVY0ZEM1allXeHNLRzlpYzJWeWRtVnlMQ0JqYUdGdVoyVnpWRzlFWld4cGRtVnlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNCcFppQW9aVzVrWldRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TGw5bGJtUmxaRmRwZEdoRmNuSnZjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2IySnpaWEoyWlhJdVpYSnliM0lwSUc5aWMyVnlkbVZ5TG1WeWNtOXlLSFJvYVhNdVgyVnljbTl5S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h2WW5ObGNuWmxjaTVqYjIxd2JHVjBaU2tnYjJKelpYSjJaWEl1WTI5dGNHeGxkR1VvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdmU2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWDJSbFlXTjBhWFpoZEdVb0tTQjdYRzRnSUNBZ2FXWWdLQ0YwYUdsekxsOWhZM1JwZG1VcElIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbllXeHlaV0ZrZVNCcGJtRmpkR2wyWlNjcE8xeHVJQ0FnSUdOdmJuTjBJSHRzYVhOMFpXNUlZVzVrYkdWeWZTQTlJSFJvYVhNdVgyRmpkR2wyWlR0Y2JpQWdJQ0IwYUdsekxsOWhZM1JwZG1VZ1BTQnVkV3hzTzF4dUlDQWdJR2xtSUNoc2FYTjBaVzVJWVc1a2JHVnlLU0I3WEc0Z0lDQWdJQ0JzYVhOMFpXNUlZVzVrYkdWeUxuVnVjM1ZpYzJOeWFXSmxLQ2s3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnZG1Gc2RXVnpLQ2s2SUZObGREeFVQaUI3WEc0Z0lDQWdhV1lnS0hSb2FYTXVYM1poYkhWbGN5a2dlMXh1SUNBZ0lDQWdhV1lnS0hSb2FYTXVYMkZqZEdsMlpTQW1KaUFoZEdocGN5NWZhVzVUZFdKelkzSnBjSFJwYjI1VGRHRnlkQ2tnZTF4dUlDQWdJQ0FnSUNCamIyNXpkQ0I3YkdsemRHVnVTR0Z1Wkd4bGNuMGdQU0IwYUdsekxsOWhZM1JwZG1VN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hzYVhOMFpXNUlZVzVrYkdWeUxuQjFiR3hEYUdGdVoyVnpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2JHbHpkR1Z1U0dGdVpHeGxjaTV3ZFd4c1EyaGhibWRsY3lncE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NWZiWFYwWVdKc1pWWmhiSFZsY3lrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5dGRYUmhZbXhsVm1Gc2RXVnpJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJRzFoYTJWVFpYUkpiVzExZEdGaWJHVW9kR2hwY3k1ZmRtRnNkV1Z6S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUM4cU9qb2dhV1lnS0NGMGFHbHpMbDkyWVd4MVpYTXBJSFJvY205M0lHNWxkeUJGY25KdmNpZ3BPeUFxTDF4dUlDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVgzWmhiSFZsY3p0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdhV1lnS0hSb2FYTXVYMkZqZEdsMlpTa2dlMXh1SUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KM1J5YVdWa0lIUnZJR05oYkd3Z2RtRnNkV1Z6S0NrZ2IyNGdiR2wyWlhObGRDQmtkWEpwYm1jZ2MzVmljMk55YVhCMGFXOXVJR0psWm05eVpTQnpaWFJXWVd4MVpYTWdkMkZ6SUdOaGJHeGxaQ2NwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnWTI5dWMzUWdjeUE5SUhSb2FYTXVYMmx1YVhRdWNtVmhaQ2dwTzF4dUlDQWdJQ0FnYldGclpWTmxkRWx0YlhWMFlXSnNaU2h6S1R0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ6TzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdselJXNWtaV1FvS1RvZ1ltOXZiR1ZoYmlCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdVgyVnVaR1ZrTzF4dUlDQjlYRzVjYmlBZ1oyVjBVMk5vWldSMWJHVnlLQ2s2SUZOamFHVmtkV3hsY2lCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdVgzTmphR1ZrZFd4bGNqdGNiaUFnZlZ4dVhHNGdJSE4xWW5OamNtbGlaU2h2WW5ObGNuWmxjazl5VDI1T1pYaDBPaUJNYVhabFUyVjBUMkp6WlhKMlpYSThWRDRnZkNCTWFYWmxVMlYwVTNWaWMyTnlhV0psY2p4VVBpd2diMjVGY25KdmNqb2dQeWhsY25JNklHRnVlU2tnUFQ0Z2RtOXBaQ3dnYjI1RGIyMXdiR1YwWlRvZ1B5Z3BJRDArSUhadmFXUXBPaUJNYVhabFUyVjBVM1ZpYzJOeWFYQjBhVzl1SUh0Y2JpQWdJQ0JqYjI1emRDQnNhWFpsVTJWMElEMGdkR2hwY3p0Y2JseHVJQ0FnSUd4bGRDQnZZbk5sY25abGNqdGNiaUFnSUNCcFppQW9kSGx3Wlc5bUlHOWljMlZ5ZG1WeVQzSlBiazVsZUhRZ1BUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUc5aWMyVnlkbVZ5SUQwZ2UxeHVJQ0FnSUNBZ0lDQnVaWGgwT2lCdlluTmxjblpsY2s5eVQyNU9aWGgwTEZ4dUlDQWdJQ0FnSUNCbGNuSnZjam9nYjI1RmNuSnZjaXhjYmlBZ0lDQWdJQ0FnWTI5dGNHeGxkR1U2SUc5dVEyOXRjR3hsZEdWY2JpQWdJQ0FnSUgwN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJRzlpYzJWeWRtVnlJRDBnYjJKelpYSjJaWEpQY2s5dVRtVjRkRHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQW9iMkp6WlhKMlpYSTZJRXhwZG1WVFpYUlBZbk5sY25abGNqeFVQaWs3WEc1Y2JpQWdJQ0JwWmlBb2RHaHBjeTVmWlc1a1pXUXBJSHRjYmlBZ0lDQWdJR052Ym5OMElITjFZbk5qY21sd2RHbHZiaUE5SUh0Y2JpQWdJQ0FnSUNBZ1kyeHZjMlZrT2lCbVlXeHpaU3hjYmlBZ0lDQWdJQ0FnZFc1emRXSnpZM0pwWW1VNklDZ3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQnpkV0p6WTNKcGNIUnBiMjR1WTJ4dmMyVmtJRDBnZEhKMVpUdGNiaUFnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnY0hWc2JFTm9ZVzVuWlhNNklDZ3BJRDArSUh0OVhHNGdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ2FXWWdLRzlpYzJWeWRtVnlMbk4wWVhKMEtTQjdYRzRnSUNBZ0lDQWdJRzlpYzJWeWRtVnlMbk4wWVhKMEtITjFZbk5qY21sd2RHbHZiaWs3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JwWmlBb0lYTjFZbk5qY21sd2RHbHZiaTVqYkc5elpXUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11WDJWdVpHVmtWMmwwYUVWeWNtOXlLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLRzlpYzJWeWRtVnlMbVZ5Y205eUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCdlluTmxjblpsY2k1bGNuSnZjaWgwYUdsekxsOWxjbkp2Y2lrN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUdsbUlDaHZZbk5sY25abGNpNWpiMjF3YkdWMFpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2IySnpaWEoyWlhJdVkyOXRjR3hsZEdVb0tUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhOMVluTmpjbWx3ZEdsdmJpNWpiRzl6WldRZ1BTQjBjblZsTzF4dUlDQWdJQ0FnY21WMGRYSnVJSE4xWW5OamNtbHdkR2x2Ymp0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JqYjI1emRDQnZZbk5sY25abGNsSmxZMjl5WkNBOUlIdHZZbk5sY25abGNpd2dhV2R1YjNKbE9pQjBhR2x6TGw5amFHRnVaMlZSZFdWMVpTNXNaVzVuZEdoOU8xeHVYRzRnSUNBZ2JHVjBJR2x6VTNSaGNuUnBibWNnUFNCMGNuVmxPMXh1SUNBZ0lHeGxkQ0IxYm5OMVluTmpjbWxpWldSSmJsTjBZWEowSUQwZ1ptRnNjMlU3WEc0Z0lDQWdZMjl1YzNRZ2MzVmljMk55YVhCMGFXOXVJRDBnZTF4dUlDQWdJQ0FnTHlvNk9pQmpiRzl6WldRNklHWmhiSE5sSmlaZ0lDb3ZJR2RsZENCamJHOXpaV1FvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlBaGFYTlRkR0Z5ZEdsdVp5QW1KaUJzYVhabFUyVjBMbDl2WW5ObGNuWmxjbk11YVc1a1pYaFBaaWh2WW5ObGNuWmxjbEpsWTI5eVpDa2dQQ0F3TzF4dUlDQWdJQ0FnZlM4cU9qb2dZQ0FxTHl4Y2JpQWdJQ0FnSUhWdWMzVmljMk55YVdKbE9pQW9LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hwYzFOMFlYSjBhVzVuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkVzV6ZFdKelkzSnBZbVZrU1c1VGRHRnlkQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR2w0SUQwZ2RHaHBjeTVmYjJKelpYSjJaWEp6TG1sdVpHVjRUMllvYjJKelpYSjJaWEpTWldOdmNtUXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2FYZ2dQajBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyOWljMlZ5ZG1WeWN5NXpjR3hwWTJVb2FYZ3NJREVwTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2doZEdocGN5NWZaVzVrWldRZ0ppWWdkR2hwY3k1ZmIySnpaWEoyWlhKekxteGxibWQwYUNBOVBUMGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmRtRnNkV1Z6SUQwZ2JuVnNiRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDJSbFlXTjBhWFpoZEdVb0tUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgwc1hHNGdJQ0FnSUNCd2RXeHNRMmhoYm1kbGN6b2dLQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NWZZV04wYVhabElDWW1JSFJvYVhNdVgyRmpkR2wyWlM1c2FYTjBaVzVJWVc1a2JHVnlJQ1ltSUhSb2FYTXVYMkZqZEdsMlpTNXNhWE4wWlc1SVlXNWtiR1Z5TG5CMWJHeERhR0Z1WjJWektTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NWZZV04wYVhabExteHBjM1JsYmtoaGJtUnNaWEl1Y0hWc2JFTm9ZVzVuWlhNb0tUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JqYjI1emRDQmphR0Z1WjJWUmRXVjFaVXhsYm1kMGFDQTlJSFJvYVhNdVgyTm9ZVzVuWlZGMVpYVmxMbXhsYm1kMGFEdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2IzSnBaMmx1WVd4T1pYaDBJRDBnYjJKelpYSjJaWEl1Ym1WNGREdGNiaUFnSUNBZ0lDQWdhV1lnS0dOb1lXNW5aVkYxWlhWbFRHVnVaM1JvSUNFOVBTQXdJQ1ltSUc5eWFXZHBibUZzVG1WNGRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUdOdmJuTjBJR05vWVc1blpYTlViMFJsYkdsMlpYSWdQU0IwYUdsekxsOWphR0Z1WjJWUmRXVjFaUzV6YkdsalpTaHZZbk5sY25abGNsSmxZMjl5WkM1cFoyNXZjbVVwTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2hqYUdGdVoyVnpWRzlFWld4cGRtVnlMbXhsYm1kMGFDQWhQVDBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYjJKelpYSjJaWEpTWldOdmNtUXVhV2R1YjNKbElEMGdZMmhoYm1kbFVYVmxkV1ZNWlc1bmRHZzdYRzRnSUNBZ0lDQWdJQ0FnSUNCdmNtbG5hVzVoYkU1bGVIUXVZMkZzYkNodlluTmxjblpsY2l3Z1kyaGhibWRsYzFSdlJHVnNhWFpsY2lrN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmx4dUlDQWdJR2xtSUNnaGRHaHBjeTVmWVdOMGFYWmxLU0I3WEc0Z0lDQWdJQ0JqYjI1emRDQmpiMjUwY205c2JHVnlPaUJNYVhabFUyVjBRMjl1ZEhKdmJHeGxjanhVUGlBOUlIdGNiaUFnSUNBZ0lDQWdMeThnUm14dmR5QmtiMlZ6YmlkMElITjFjSEJ2Y25RZ1oyVjBkR1Z5Y3lCaGJtUWdjMlYwZEdWeWN5QjVaWFJjYmlBZ0lDQWdJQ0FnTHlvNk9pQmpiRzl6WldRNklHWmhiSE5sSmlaZ0lDb3ZJR2RsZENCamJHOXpaV1FvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlDRnNhWFpsVTJWMExsOWhZM1JwZG1VZ2ZId2diR2wyWlZObGRDNWZZV04wYVhabExtTnZiblJ5YjJ4c1pYSWdJVDA5SUhSb2FYTTdYRzRnSUNBZ0lDQWdJSDB2S2pvNklHQWdLaThzWEc0Z0lDQWdJQ0FnSUdGa1pEb2dkbUZzZFdVZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUd4bGRDQjJZV3gxWlhNZ1BTQjBhR2x6TGw5MllXeDFaWE03WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLQ0YyWVd4MVpYTXBJSFJvY205M0lHNWxkeUJGY25KdmNpZ25jMlYwVm1Gc2RXVWdiWFZ6ZENCaVpTQmpZV3hzWldRZ1ltVm1iM0psSUdOdmJuUnliMnhzWlhJZ2FYTWdkWE5sWkNjcE8xeHVJQ0FnSUNBZ0lDQWdJR2xtSUNnaGRHaHBjeTVmWlc1a1pXUWdKaVlnSVhaaGJIVmxjeTVvWVhNb2RtRnNkV1VwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lYUm9hWE11WDIxMWRHRmliR1ZXWVd4MVpYTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmRtRnNkV1Z6SUQwZ2RtRnNkV1Z6SUQwZ2JtVjNJRk5sZENoMllXeDFaWE1wTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOXRkWFJoWW14bFZtRnNkV1Z6SUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGJIVmxjeTVoWkdRb2RtRnNkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmNYVmxkV1ZEYUdGdVoyVW9lM1I1Y0dVNklDZGhaR1FuTENCMllXeDFaWDBwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnY21WdGIzWmxPaUIyWVd4MVpTQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ2JHVjBJSFpoYkhWbGN5QTlJSFJvYVhNdVgzWmhiSFZsY3p0Y2JpQWdJQ0FnSUNBZ0lDQnBaaUFvSVhaaGJIVmxjeWtnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R6WlhSV1lXeDFaU0J0ZFhOMElHSmxJR05oYkd4bFpDQmlaV1p2Y21VZ1kyOXVkSEp2Ykd4bGNpQnBjeUIxYzJWa0p5azdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tDRjBhR2x6TGw5bGJtUmxaQ0FtSmlCMllXeDFaWE11YUdGektIWmhiSFZsS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDRjBhR2x6TGw5dGRYUmhZbXhsVm1Gc2RXVnpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgzWmhiSFZsY3lBOUlIWmhiSFZsY3lBOUlHNWxkeUJUWlhRb2RtRnNkV1Z6S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZiWFYwWVdKc1pWWmhiSFZsY3lBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCMllXeDFaWE11WkdWc1pYUmxLSFpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYM0YxWlhWbFEyaGhibWRsS0h0MGVYQmxPaUFuY21WdGIzWmxKeXdnZG1Gc2RXVjlLVHRjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMHNYRzRnSUNBZ0lDQWdJR1Z5Y205eU9pQmxjbklnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbDlsYm1SbFpDa2djbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyVnVaR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbDlsYm1SbFpGZHBkR2hGY25KdmNpQTlJSFJ5ZFdVN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZlpYSnliM0lnUFNCbGNuSTdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NWZjWFZsZFdWRGFHRnVaMlVvS1R0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5a1pXRmpkR2wyWVhSbEtDazdYRzRnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUdWdVpEb2dLQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbDlsYm1SbFpDa2djbVYwZFhKdU8xeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyVnVaR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbDl4ZFdWMVpVTm9ZVzVuWlNncE8xeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyUmxZV04wYVhaaGRHVW9LVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUdOdmJuTjBJR0ZqZEdsMlpTQTlJSFJvYVhNdVgyRmpkR2wyWlNBOUlIdGNiaUFnSUNBZ0lDQWdZMjl1ZEhKdmJHeGxjaXhjYmlBZ0lDQWdJQ0FnYkdsemRHVnVTR0Z1Wkd4bGNqb2dlMXh1SUNBZ0lDQWdJQ0FnSUhWdWMzVmljMk55YVdKbE9pQW9LU0E5UGlCN2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdZMjl1YzNRZ2MyVjBWbUZzZFdWelJYSnliM0k2SUVaMWJtTjBhVzl1SUQwZ0tDa2dQVDRnZTF4dUlDQWdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjNObGRGWmhiSFZsY3lCdGRYTjBJR0psSUdOaGJHeGxaQ0J2Ym1ObElHUjFjbWx1WnlCc2FYTjBaVzRuS1R0Y2JpQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCc1pYUWdjMlYwVm1Gc2RXVnpJRDBnZG1Gc2RXVnpJRDArSUh0Y2JpQWdJQ0FnSUNBZ2MyVjBWbUZzZFdWeklEMGdjMlYwVm1Gc2RXVnpSWEp5YjNJN1hHNGdJQ0FnSUNBZ0lHMWhhMlZUWlhSSmJXMTFkR0ZpYkdVb2RtRnNkV1Z6S1R0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmZG1Gc2RXVnpJRDBnZG1Gc2RXVnpPMXh1SUNBZ0lDQWdJQ0IwYUdsekxsOXRkWFJoWW14bFZtRnNkV1Z6SUQwZ1ptRnNjMlU3WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJQ0FnWTI5dWMzUWdiR2x6ZEdWdVNHRnVaR3hsY2s5eVJuVnVZM1JwYjI0Z1BTQjBhR2x6TGw5cGJtbDBMbXhwYzNSbGJpaDJZV3gxWlhNZ1BUNGdjMlYwVm1Gc2RXVnpLSFpoYkhWbGN5a3NJR052Ym5SeWIyeHNaWElwTzF4dUlDQWdJQ0FnYVdZZ0tDRjBhR2x6TGw5MllXeDFaWE1wSUh0Y2JpQWdJQ0FnSUNBZ2MyVjBWbUZzZFdWelJYSnliM0lvS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2JHbHpkR1Z1U0dGdVpHeGxjazl5Um5WdVkzUnBiMjRnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnWVdOMGFYWmxMbXhwYzNSbGJraGhibVJzWlhJZ1BTQjdYRzRnSUNBZ0lDQWdJQ0FnZFc1emRXSnpZM0pwWW1VNklHeHBjM1JsYmtoaGJtUnNaWEpQY2taMWJtTjBhVzl1WEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHeHBjM1JsYmtoaGJtUnNaWEpQY2taMWJtTjBhVzl1SUNFOUlHNTFiR3dnSmlZZ2RIbHdaVzltSUd4cGMzUmxia2hoYm1Sc1pYSlBja1oxYm1OMGFXOXVMblZ1YzNWaWMyTnlhV0psSUQwOVBTQW5ablZ1WTNScGIyNG5LU0I3WEc0Z0lDQWdJQ0FnSUdGamRHbDJaUzVzYVhOMFpXNUlZVzVrYkdWeUlEMGdiR2x6ZEdWdVNHRnVaR3hsY2s5eVJuVnVZM1JwYjI0N1hHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHeHBjM1JsYmtoaGJtUnNaWEpQY2taMWJtTjBhVzl1SUNFOUlHNTFiR3dwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lGUjVjR1ZGY25KdmNpZ25iR2x6ZEdWdUlHMTFjM1FnY21WMGRYSnVJRzlpYW1WamRDQjNhWFJvSUhWdWMzVmljMk55YVdKbElHMWxkR2h2WkN3Z1lTQm1kVzVqZEdsdmJpd2diM0lnYm5Wc2JDY3BPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdhV1lnS0dOdmJuUnliMnhzWlhJdVkyeHZjMlZrS1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WDJGamRHbDJaU0E5SUdGamRHbDJaVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZaR1ZoWTNScGRtRjBaU2dwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNodlluTmxjblpsY2k1emRHRnlkQ2tnZTF4dUlDQWdJQ0FnZEdocGN5NWZhVzVUZFdKelkzSnBjSFJwYjI1VGRHRnlkQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQnZZbk5sY25abGNpNXpkR0Z5ZENoemRXSnpZM0pwY0hScGIyNHBPMXh1SUNBZ0lDQWdkR2hwY3k1ZmFXNVRkV0p6WTNKcGNIUnBiMjVUZEdGeWRDQTlJR1poYkhObE8xeHVJQ0FnSUgxY2JpQWdJQ0JwYzFOMFlYSjBhVzVuSUQwZ1ptRnNjMlU3WEc1Y2JpQWdJQ0J2WW5ObGNuWmxjbEpsWTI5eVpDNXBaMjV2Y21VZ1BTQjBhR2x6TGw5amFHRnVaMlZSZFdWMVpTNXNaVzVuZEdnN1hHNGdJQ0FnYVdZZ0tDRjFibk4xWW5OamNtbGlaV1JKYmxOMFlYSjBLU0I3WEc0Z0lDQWdJQ0IwYUdsekxsOXZZbk5sY25abGNuTXVjSFZ6YUNodlluTmxjblpsY2xKbFkyOXlaQ2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVYwZFhKdUlITjFZbk5qY21sd2RHbHZianRjYmlBZ2ZWeHVmVnh1WEc0dkx5QkJjM05wWjI0Z2FHVnlaU0JpWldOaGRYTmxJRVpzYjNjZ1pHOWxjMjRuZENCemRYQndiM0owSUdOdmJYQjFkR1ZrSUhCeWIzQmxjblI1SUd0bGVYTWdiMjRnWTJ4aGMzTmxjenBjYmk4dklHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOW1ZV05sWW05dmF5OW1iRzkzTDJsemMzVmxjeTh5TWpnMlhHNG9UR2wyWlZObGREcGhibmtwTG5CeWIzUnZkSGx3WlZza0pHOWljMlZ5ZG1GaWJHVmRJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJSEpsZEhWeWJpQjBhR2x6TzF4dWZUdGNibHh1Wm5WdVkzUnBiMjRnYldGclpWTmxkRWx0YlhWMFlXSnNaU2h6WlhRNklGTmxkRHhoYm5rK0tTQjdYRzRnSUdsbUlDaHdjbTlqWlhOekxtVnVkaTVPVDBSRlgwVk9WaUFoUFQwZ0ozQnliMlIxWTNScGIyNG5LU0I3WEc0Z0lDQWdLSE5sZERwaGJua3BMbUZrWkNBOUlDaHpaWFE2WVc1NUtTNWtaV3hsZEdVZ1BTQW9jMlYwT21GdWVTa3VZMnhsWVhJZ1BTQnlaV0ZrVDI1c2VUdGNiaUFnZlZ4dWZWeHVYRzVtZFc1amRHbHZiaUJ5WldGa1QyNXNlU2dwSUh0Y2JpQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZEVieUJ1YjNRZ2JXOWthV1o1SUZObGRDQndZWE56WldRZ2RHOGdiM0lnWm5KdmJTQk1hWFpsVTJWME9pQlRaWFFnYVhNZ2NtVmhaQzF2Ym14NUlHbHVJR1JsZG1Wc2IzQnRaVzUwSnlrN1hHNTlYRzRpWFgwPSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IG1lcmdlO1xuXG52YXIgXyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi5cIikpO1xuXG5mdW5jdGlvbiBtZXJnZShsaXZlU2V0cykge1xuICByZXR1cm4gbmV3IF8uZGVmYXVsdCh7XG4gICAgc2NoZWR1bGVyOiBsaXZlU2V0c1swXSA/IGxpdmVTZXRzWzBdLmdldFNjaGVkdWxlcigpIDogdW5kZWZpbmVkLFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICB2YXIgcyA9IG5ldyBTZXQoKTtcbiAgICAgIGxpdmVTZXRzLmZvckVhY2goZnVuY3Rpb24gKGxpdmVTZXQpIHtcbiAgICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHMuYWRkKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzO1xuICAgIH0sXG4gICAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oc2V0VmFsdWVzLCBjb250cm9sbGVyKSB7XG4gICAgICB2YXIgaW5pdGlhbFZhbHVlcyA9IG5ldyBTZXQoKTtcbiAgICAgIHZhciBzdWJzID0gbmV3IFNldCgpO1xuICAgICAgdmFyIGRvbmVTdWJzY3JpYmluZyA9IGZhbHNlO1xuICAgICAgbGl2ZVNldHMuZm9yRWFjaChmdW5jdGlvbiAobGl2ZVNldCkge1xuICAgICAgICB2YXIgc3ViO1xuICAgICAgICBsaXZlU2V0LnN1YnNjcmliZSh7XG4gICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KF9zdWIpIHtcbiAgICAgICAgICAgIHN1YiA9IF9zdWI7XG4gICAgICAgICAgICBzdWJzLmFkZChzdWIpO1xuICAgICAgICAgICAgbGl2ZVNldC52YWx1ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICBpbml0aWFsVmFsdWVzLmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoY2hhbmdlcykge1xuICAgICAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICAgICAgaWYgKGNoYW5nZS50eXBlID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWRkKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlLnR5cGUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKGVycik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICBzdWJzLmRlbGV0ZShzdWIpO1xuXG4gICAgICAgICAgICBpZiAoZG9uZVN1YnNjcmliaW5nICYmIHN1YnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICBjb250cm9sbGVyLmVuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHNldFZhbHVlcyhpbml0aWFsVmFsdWVzKTtcbiAgICAgIGRvbmVTdWJzY3JpYmluZyA9IHRydWU7XG5cbiAgICAgIGlmIChzdWJzLnNpemUgPT09IDApIHtcbiAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcHVsbENoYW5nZXM6IGZ1bmN0aW9uIHB1bGxDaGFuZ2VzKCkge1xuICAgICAgICAgIHN1YnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7XG4gICAgICAgICAgICBzdWIucHVsbENoYW5nZXMoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk55WXk5dFpYSm5aUzVxY3lKZExDSnVZVzFsY3lJNld5SnRaWEpuWlNJc0lteHBkbVZUWlhSeklpd2lUR2wyWlZObGRDSXNJbk5qYUdWa2RXeGxjaUlzSW1kbGRGTmphR1ZrZFd4bGNpSXNJblZ1WkdWbWFXNWxaQ0lzSW5KbFlXUWlMQ0p6SWl3aVUyVjBJaXdpWm05eVJXRmphQ0lzSW14cGRtVlRaWFFpTENKMllXeDFaWE1pTENKMllXeDFaU0lzSW1Ga1pDSXNJbXhwYzNSbGJpSXNJbk5sZEZaaGJIVmxjeUlzSW1OdmJuUnliMnhzWlhJaUxDSnBibWwwYVdGc1ZtRnNkV1Z6SWl3aWMzVmljeUlzSW1SdmJtVlRkV0p6WTNKcFltbHVaeUlzSW5OMVlpSXNJbk4xWW5OamNtbGlaU0lzSW5OMFlYSjBJaXdpWDNOMVlpSXNJbTVsZUhRaUxDSmphR0Z1WjJWeklpd2lZMmhoYm1kbElpd2lkSGx3WlNJc0luSmxiVzkyWlNJc0ltVnljbTl5SWl3aVpYSnlJaXdpWTI5dGNHeGxkR1VpTENKa1pXeGxkR1VpTENKemFYcGxJaXdpWlc1a0lpd2lkVzV6ZFdKelkzSnBZbVVpTENKd2RXeHNRMmhoYm1kbGN5SmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3TzBGQlJVRTdPMEZCUldVc1UwRkJVMEVzUzBGQlZDeERRVUZyUWtNc1VVRkJiRUlzUlVGQk1rUTdRVUZEZUVVc1UwRkJUeXhKUVVGSlF5eFRRVUZLTEVOQlFWazdRVUZEYWtKRExFbEJRVUZCTEZOQlFWTXNSVUZCUlVZc1VVRkJVU3hEUVVGRExFTkJRVVFzUTBGQlVpeEhRVUZqUVN4UlFVRlJMRU5CUVVNc1EwRkJSQ3hEUVVGU0xFTkJRVmxITEZsQlFWb3NSVUZCWkN4SFFVRXlRME1zVTBGRWNrTTdRVUZGYWtKRExFbEJRVUZCTEVsQlJtbENMR3RDUVVWV08wRkJRMHdzVlVGQlRVTXNRMEZCUXl4SFFVRkhMRWxCUVVsRExFZEJRVW9zUlVGQlZqdEJRVU5CVUN4TlFVRkJRU3hSUVVGUkxFTkJRVU5STEU5QlFWUXNRMEZCYVVJc1ZVRkJRVU1zVDBGQlR5eEZRVUZKTzBGQlF6RkNRU3hSUVVGQlFTeFBRVUZQTEVOQlFVTkRMRTFCUVZJc1IwRkJhVUpHTEU5QlFXcENMRU5CUVhsQ0xGVkJRVUZITEV0QlFVc3NSVUZCU1R0QlFVTm9RMHdzVlVGQlFVRXNRMEZCUXl4RFFVRkRUU3hIUVVGR0xFTkJRVTFFTEV0QlFVNDdRVUZEUkN4VFFVWkVPMEZCUjBRc1QwRktSRHRCUVV0QkxHRkJRVTlNTEVOQlFWQTdRVUZEUkN4TFFWWm5RanRCUVZkcVFrOHNTVUZCUVVFc1RVRllhVUlzYTBKQlYxWkRMRk5CV0ZVc1JVRlhRME1zVlVGWVJDeEZRVmRoTzBGQlF6VkNMRlZCUVUxRExHRkJRV0VzUjBGQlJ5eEpRVUZKVkN4SFFVRktMRVZCUVhSQ08wRkJRMEVzVlVGQlRWVXNTVUZCU1N4SFFVRkhMRWxCUVVsV0xFZEJRVW9zUlVGQllqdEJRVU5CTEZWQlFVbFhMR1ZCUVdVc1IwRkJSeXhMUVVGMFFqdEJRVU5CYkVJc1RVRkJRVUVzVVVGQlVTeERRVUZEVVN4UFFVRlVMRU5CUVdsQ0xGVkJRVUZETEU5QlFVOHNSVUZCU1R0QlFVTXhRaXhaUVVGSlZTeEhRVUZLTzBGQlEwRldMRkZCUVVGQkxFOUJRVThzUTBGQlExY3NVMEZCVWl4RFFVRnJRanRCUVVOb1FrTXNWVUZCUVVFc1MwRkVaMElzYVVKQlExWkRMRWxCUkZVc1JVRkRTanRCUVVOV1NDeFpRVUZCUVN4SFFVRkhMRWRCUVVkSExFbEJRVTQ3UVVGRFFVd3NXVUZCUVVFc1NVRkJTU3hEUVVGRFRDeEhRVUZNTEVOQlFWTlBMRWRCUVZRN1FVRkRRVllzV1VGQlFVRXNUMEZCVHl4RFFVRkRReXhOUVVGU0xFZEJRV2xDUml4UFFVRnFRaXhEUVVGNVFpeFZRVUZCUnl4TFFVRkxMRVZCUVVrN1FVRkRhRU5MTEdOQlFVRkJMR0ZCUVdFc1EwRkJRMG9zUjBGQlpDeERRVUZyUWtRc1MwRkJiRUk3UVVGRFJDeGhRVVpFTzBGQlIwUXNWMEZRWlR0QlFWRm9RbGtzVlVGQlFVRXNTVUZTWjBJc1owSkJVVmhETEU5QlVsY3NSVUZSUmp0QlFVTmFRU3haUVVGQlFTeFBRVUZQTEVOQlFVTm9RaXhQUVVGU0xFTkJRV2RDTEZWQlFVRnBRaXhOUVVGTkxFVkJRVWs3UVVGRGVFSXNhMEpCUVVsQkxFMUJRVTBzUTBGQlEwTXNTVUZCVUN4TFFVRm5RaXhMUVVGd1FpeEZRVUV5UWp0QlFVTjZRbGdzWjBKQlFVRkJMRlZCUVZVc1EwRkJRMGdzUjBGQldDeERRVUZsWVN4TlFVRk5MRU5CUVVOa0xFdEJRWFJDTzBGQlEwUXNaVUZHUkN4TlFVVlBMRWxCUVVsakxFMUJRVTBzUTBGQlEwTXNTVUZCVUN4TFFVRm5RaXhSUVVGd1FpeEZRVUU0UWp0QlFVTnVRMWdzWjBKQlFVRkJMRlZCUVZVc1EwRkJRMWtzVFVGQldDeERRVUZyUWtZc1RVRkJUU3hEUVVGRFpDeExRVUY2UWp0QlFVTkVPMEZCUTBZc1lVRk9SRHRCUVU5RUxGZEJhRUpsTzBGQmFVSm9RbWxDTEZWQlFVRkJMRXRCYWtKblFpeHBRa0ZwUWxaRExFZEJha0pWTEVWQmFVSk1PMEZCUTFSa0xGbEJRVUZCTEZWQlFWVXNRMEZCUTJFc1MwRkJXQ3hEUVVGcFFrTXNSMEZCYWtJN1FVRkRSQ3hYUVc1Q1pUdEJRVzlDYUVKRExGVkJRVUZCTEZGQmNFSm5RaXh6UWtGdlFrdzdRVUZEVkdJc1dVRkJRVUVzU1VGQlNTeERRVUZEWXl4TlFVRk1MRU5CUVZsYUxFZEJRVm83TzBGQlEwRXNaMEpCUVVsRUxHVkJRV1VzU1VGQlNVUXNTVUZCU1N4RFFVRkRaU3hKUVVGTUxFdEJRV01zUTBGQmNrTXNSVUZCZDBNN1FVRkRkRU5xUWl4alFVRkJRU3hWUVVGVkxFTkJRVU5yUWl4SFFVRllPMEZCUTBRN1FVRkRSanRCUVhwQ1pTeFRRVUZzUWp0QlFUSkNSQ3hQUVRkQ1JEdEJRU3RDUVc1Q0xFMUJRVUZCTEZOQlFWTXNRMEZCUTBVc1lVRkJSQ3hEUVVGVU8wRkJSVUZGTEUxQlFVRkJMR1ZCUVdVc1IwRkJSeXhKUVVGc1FqczdRVUZEUVN4VlFVRkpSQ3hKUVVGSkxFTkJRVU5sTEVsQlFVd3NTMEZCWXl4RFFVRnNRaXhGUVVGeFFqdEJRVU51UW1wQ0xGRkJRVUZCTEZWQlFWVXNRMEZCUTJ0Q0xFZEJRVmc3UVVGRFJEczdRVUZEUkN4aFFVRlBPMEZCUTB4RExGRkJRVUZCTEZkQlJFc3NlVUpCUTFNN1FVRkRXbXBDTEZWQlFVRkJMRWxCUVVrc1EwRkJRMVFzVDBGQlRDeERRVUZoTEZWQlFVRlhMRWRCUVVjc1JVRkJTVHRCUVVOc1FrRXNXVUZCUVVFc1IwRkJSeXhEUVVGRFpTeFhRVUZLTzBGQlEwUXNWMEZHUkR0QlFVZEVMRk5CVEVrN1FVRk5URU1zVVVGQlFVRXNWMEZPU3l4NVFrRk5VenRCUVVOYWJFSXNWVUZCUVVFc1NVRkJTU3hEUVVGRFZDeFBRVUZNTEVOQlFXRXNWVUZCUVZjc1IwRkJSeXhGUVVGSk8wRkJRMnhDUVN4WlFVRkJRU3hIUVVGSExFTkJRVU5uUWl4WFFVRktPMEZCUTBRc1YwRkdSRHRCUVVkRU8wRkJWa2tzVDBGQlVEdEJRVmxFTzBGQmFFVm5RaXhIUVVGYUxFTkJRVkE3UVVGclJVUWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2lCQVpteHZkeUFxTDF4dVhHNXBiWEJ2Y25RZ1RHbDJaVk5sZENCbWNtOXRJQ2N1Snp0Y2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1puVnVZM1JwYjI0Z2JXVnlaMlU4VkQ0b2JHbDJaVk5sZEhNNklFRnljbUY1UEV4cGRtVlRaWFE4VkQ0K0tUb2dUR2wyWlZObGREeFVQaUI3WEc0Z0lISmxkSFZ5YmlCdVpYY2dUR2wyWlZObGRDaDdYRzRnSUNBZ2MyTm9aV1IxYkdWeU9pQnNhWFpsVTJWMGMxc3dYU0EvSUd4cGRtVlRaWFJ6V3pCZExtZGxkRk5qYUdWa2RXeGxjaWdwSURvZ2RXNWtaV1pwYm1Wa0xGeHVJQ0FnSUhKbFlXUW9LU0I3WEc0Z0lDQWdJQ0JqYjI1emRDQnpJRDBnYm1WM0lGTmxkQ2dwTzF4dUlDQWdJQ0FnYkdsMlpWTmxkSE11Wm05eVJXRmphQ2hzYVhabFUyVjBJRDArSUh0Y2JpQWdJQ0FnSUNBZ2JHbDJaVk5sZEM1MllXeDFaWE1vS1M1bWIzSkZZV05vS0haaGJIVmxJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQnpMbUZrWkNoMllXeDFaU2s3WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQnlaWFIxY200Z2N6dGNiaUFnSUNCOUxGeHVJQ0FnSUd4cGMzUmxiaWh6WlhSV1lXeDFaWE1zSUdOdmJuUnliMnhzWlhJcElIdGNiaUFnSUNBZ0lHTnZibk4wSUdsdWFYUnBZV3hXWVd4MVpYTWdQU0J1WlhjZ1UyVjBLQ2s3WEc0Z0lDQWdJQ0JqYjI1emRDQnpkV0p6SUQwZ2JtVjNJRk5sZENncE8xeHVJQ0FnSUNBZ2JHVjBJR1J2Ym1WVGRXSnpZM0pwWW1sdVp5QTlJR1poYkhObE8xeHVJQ0FnSUNBZ2JHbDJaVk5sZEhNdVptOXlSV0ZqYUNoc2FYWmxVMlYwSUQwK0lIdGNiaUFnSUNBZ0lDQWdiR1YwSUhOMVlqdGNiaUFnSUNBZ0lDQWdiR2wyWlZObGRDNXpkV0p6WTNKcFltVW9lMXh1SUNBZ0lDQWdJQ0FnSUhOMFlYSjBLRjl6ZFdJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOMVlpQTlJRjl6ZFdJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZFdKekxtRmtaQ2h6ZFdJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYkdsMlpWTmxkQzUyWVd4MVpYTW9LUzVtYjNKRllXTm9LSFpoYkhWbElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdhVzVwZEdsaGJGWmhiSFZsY3k1aFpHUW9kbUZzZFdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNCdVpYaDBLR05vWVc1blpYTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTm9ZVzVuWlhNdVptOXlSV0ZqYUNoamFHRnVaMlVnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZMmhoYm1kbExuUjVjR1VnUFQwOUlDZGhaR1FuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNWhaR1FvWTJoaGJtZGxMblpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaGphR0Z1WjJVdWRIbHdaU0E5UFQwZ0ozSmxiVzkyWlNjcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjUwY205c2JHVnlMbkpsYlc5MlpTaGphR0Z1WjJVdWRtRnNkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlLVHRjYmlBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJR1Z5Y205eUtHVnljaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEhKdmJHeGxjaTVsY25KdmNpaGxjbklwTzF4dUlDQWdJQ0FnSUNBZ0lIMHNYRzRnSUNBZ0lDQWdJQ0FnWTI5dGNHeGxkR1VvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZFdKekxtUmxiR1YwWlNoemRXSXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR1J2Ym1WVGRXSnpZM0pwWW1sdVp5QW1KaUJ6ZFdKekxuTnBlbVVnUFQwOUlEQXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1ZEhKdmJHeGxjaTVsYm1Rb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnZlNrN1hHNWNiaUFnSUNBZ0lITmxkRlpoYkhWbGN5aHBibWwwYVdGc1ZtRnNkV1Z6S1R0Y2JseHVJQ0FnSUNBZ1pHOXVaVk4xWW5OamNtbGlhVzVuSUQwZ2RISjFaVHRjYmlBZ0lDQWdJR2xtSUNoemRXSnpMbk5wZW1VZ1BUMDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNWxibVFvS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUhWdWMzVmljMk55YVdKbEtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUhOMVluTXVabTl5UldGamFDaHpkV0lnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNWaUxuVnVjM1ZpYzJOeWFXSmxLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUhCMWJHeERhR0Z1WjJWektDa2dlMXh1SUNBZ0lDQWdJQ0FnSUhOMVluTXVabTl5UldGamFDaHpkV0lnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNWaUxuQjFiR3hEYUdGdVoyVnpLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDA3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibjFjYmlKZGZRPT0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB0b1ZhbHVlT2JzZXJ2YWJsZTtcblxudmFyIF8gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuXCIpKTtcblxudmFyIF96ZW5PYnNlcnZhYmxlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiemVuLW9ic2VydmFibGVcIikpO1xuXG5mdW5jdGlvbiB0b1ZhbHVlT2JzZXJ2YWJsZShsaXZlU2V0KSB7XG4gIHJldHVybiBuZXcgX3plbk9ic2VydmFibGUuZGVmYXVsdChmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICB2YXIgcmVzb2x2ZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgZnVuY3Rpb24gYWRkZWRJdGVtKHZhbHVlKSB7XG4gICAgICB2YXIgcmVzb2x2ZTtcbiAgICAgIHZhciByZW1vdmFsID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKF9yZXNvbHZlKSB7XG4gICAgICAgIHJlc29sdmUgPSBfcmVzb2x2ZTtcbiAgICAgIH0pO1xuICAgICAgcmVzb2x2ZXJzLnNldCh2YWx1ZSwgcmVzb2x2ZSk7XG4gICAgICB2YXIgdmFsdWVXaXRoUmVtb3ZhbCA9IHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICByZW1vdmFsOiByZW1vdmFsXG4gICAgICB9O1xuICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZVdpdGhSZW1vdmFsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVkSXRlbSh2YWx1ZSkge1xuICAgICAgdmFyIHJlc29sdmVyID0gcmVzb2x2ZXJzLmdldCh2YWx1ZSk7XG4gICAgICBpZiAoIXJlc29sdmVyKSB0aHJvdyBuZXcgRXJyb3IoJ1Jlc29sdmVyIG5vdCBmb3VuZCBpbiBtYXAgZm9yIHZhbHVlJyk7XG4gICAgICByZXNvbHZlcnMuZGVsZXRlKHZhbHVlKTtcbiAgICAgIHJlc29sdmVyKCk7XG4gICAgfVxuXG4gICAgdmFyIHN1YiA9IGxpdmVTZXQuc3Vic2NyaWJlKHtcbiAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydChzdWIpIHtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gbGl2ZVNldC52YWx1ZXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IF9zdGVwLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHN1Yi5jbG9zZWQpIGJyZWFrO1xuICAgICAgICAgICAgYWRkZWRJdGVtKHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KGNoYW5nZXMpIHtcbiAgICAgICAgY2hhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGFuZ2UpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdhZGQnKSB7XG4gICAgICAgICAgICBhZGRlZEl0ZW0oY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZS50eXBlID09PSAncmVtb3ZlJykge1xuICAgICAgICAgICAgcmVtb3ZlZEl0ZW0oY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZXJyKTtcbiAgICAgIH0sXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgcmVzb2x2ZXJzLmZvckVhY2goZnVuY3Rpb24gKHJlc29sdmVyKSB7XG4gICAgICAgIHJlc29sdmVyKCk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OeVl5OTBiMVpoYkhWbFQySnpaWEoyWVdKc1pTNXFjeUpkTENKdVlXMWxjeUk2V3lKMGIxWmhiSFZsVDJKelpYSjJZV0pzWlNJc0lteHBkbVZUWlhRaUxDSlBZbk5sY25aaFlteGxJaXdpYjJKelpYSjJaWElpTENKeVpYTnZiSFpsY25NaUxDSk5ZWEFpTENKaFpHUmxaRWwwWlcwaUxDSjJZV3gxWlNJc0luSmxjMjlzZG1VaUxDSnlaVzF2ZG1Gc0lpd2lVSEp2YldselpTSXNJbDl5WlhOdmJIWmxJaXdpYzJWMElpd2lkbUZzZFdWWGFYUm9VbVZ0YjNaaGJDSXNJbTVsZUhRaUxDSnlaVzF2ZG1Wa1NYUmxiU0lzSW5KbGMyOXNkbVZ5SWl3aVoyVjBJaXdpUlhKeWIzSWlMQ0prWld4bGRHVWlMQ0p6ZFdJaUxDSnpkV0p6WTNKcFltVWlMQ0p6ZEdGeWRDSXNJblpoYkhWbGN5SXNJbU5zYjNObFpDSXNJbU5vWVc1blpYTWlMQ0ptYjNKRllXTm9JaXdpWTJoaGJtZGxJaXdpZEhsd1pTSXNJbVZ5Y205eUlpd2laWEp5SWl3aVkyOXRjR3hsZEdVaUxDSjFibk4xWW5OamNtbGlaU0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN08wRkJSVUU3TzBGQlEwRTdPMEZCVDJVc1UwRkJVMEVzYVVKQlFWUXNRMEZCT0VKRExFOUJRVGxDTEVWQlFXMUVPMEZCUTJoRkxGTkJRVThzU1VGQlNVTXNjMEpCUVVvc1EwRkJaU3hWUVVGQlF5eFJRVUZSTEVWQlFVazdRVUZEYUVNc1VVRkJUVU1zVTBGQk1rSXNSMEZCUnl4SlFVRkpReXhIUVVGS0xFVkJRWEJET3p0QlFVVkJMR0ZCUVZORExGTkJRVlFzUTBGQmJVSkRMRXRCUVc1Q0xFVkJRVFpDTzBGQlF6TkNMRlZCUVVsRExFOUJRVW83UVVGRFFTeFZRVUZOUXl4UFFVRnpRaXhIUVVGSExFbEJRVWxETEU5QlFVb3NRMEZCV1N4VlFVRkJReXhSUVVGUkxFVkJRVWs3UVVGRGNrUklMRkZCUVVGQkxFOUJRVThzUjBGQlIwY3NVVUZCVmp0QlFVTkVMRTlCUmpoQ0xFTkJRUzlDTzBGQlIwRlFMRTFCUVVGQkxGTkJRVk1zUTBGQlExRXNSMEZCVml4RFFVRmpUQ3hMUVVGa0xFVkJRWE5DUXl4UFFVRjBRanRCUVVOQkxGVkJRVTFMTEdkQ1FVRnhReXhIUVVGSE8wRkJRVU5PTEZGQlFVRkJMRXRCUVVzc1JVRkJURUVzUzBGQlJEdEJRVUZSUlN4UlFVRkJRU3hQUVVGUExFVkJRVkJCTzBGQlFWSXNUMEZCT1VNN1FVRkRRVTRzVFVGQlFVRXNVVUZCVVN4RFFVRkRWeXhKUVVGVUxFTkJRV05FTEdkQ1FVRmtPMEZCUTBRN08wRkJSVVFzWVVGQlUwVXNWMEZCVkN4RFFVRnhRbElzUzBGQmNrSXNSVUZCSzBJN1FVRkROMElzVlVGQlRWTXNVVUZCVVN4SFFVRkhXaXhUUVVGVExFTkJRVU5oTEVkQlFWWXNRMEZCWTFZc1MwRkJaQ3hEUVVGcVFqdEJRVU5CTEZWQlFVa3NRMEZCUTFNc1VVRkJUQ3hGUVVGbExFMUJRVTBzU1VGQlNVVXNTMEZCU2l4RFFVRlZMSEZEUVVGV0xFTkJRVTQ3UVVGRFptUXNUVUZCUVVFc1UwRkJVeXhEUVVGRFpTeE5RVUZXTEVOQlFXbENXaXhMUVVGcVFqdEJRVU5CVXl4TlFVRkJRU3hSUVVGUk8wRkJRMVE3TzBGQlJVUXNVVUZCVFVrc1IwRkJSeXhIUVVGSGJrSXNUMEZCVHl4RFFVRkRiMElzVTBGQlVpeERRVUZyUWp0QlFVTTFRa01zVFVGQlFVRXNTMEZFTkVJc2FVSkJRM1JDUml4SFFVUnpRaXhGUVVOcVFqdEJRVUZCTzBGQlFVRTdRVUZCUVRzN1FVRkJRVHRCUVVOVUxDdENRVUZyUW01Q0xFOUJRVThzUTBGQlEzTkNMRTFCUVZJc1JVRkJiRUlzT0VoQlFXOURPMEZCUVVFc1owSkJRVE5DYUVJc1MwRkJNa0k3UVVGRGJFTXNaMEpCUVVsaExFZEJRVWNzUTBGQlEwa3NUVUZCVWl4RlFVRm5RanRCUVVOb1FteENMRmxCUVVGQkxGTkJRVk1zUTBGQlEwTXNTMEZCUkN4RFFVRlVPMEZCUTBRN1FVRktVVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlMxWXNUMEZPTWtJN1FVRlBOVUpQTEUxQlFVRkJMRWxCVURSQ0xHZENRVTkyUWxjc1QwRlFkVUlzUlVGUFpEdEJRVU5hUVN4UlFVRkJRU3hQUVVGUExFTkJRVU5ETEU5QlFWSXNRMEZCWjBJc1ZVRkJRVU1zVFVGQlRTeEZRVUZKTzBGQlEzaENMR05CUVVsQkxFMUJRVTBzUTBGQlEwTXNTVUZCVUN4TFFVRm5RaXhMUVVGd1FpeEZRVUV5UWp0QlFVTjZRblJDTEZsQlFVRkJMRk5CUVZNc1EwRkJRM0ZDTEUxQlFVMHNRMEZCUTNCQ0xFdEJRVklzUTBGQlZEdEJRVU5FTEZkQlJrUXNUVUZGVHl4SlFVRkpiMElzVFVGQlRTeERRVUZEUXl4SlFVRlFMRXRCUVdkQ0xGRkJRWEJDTEVWQlFUaENPMEZCUTI1RFlpeFpRVUZCUVN4WFFVRlhMRU5CUVVOWkxFMUJRVTBzUTBGQlEzQkNMRXRCUVZJc1EwRkJXRHRCUVVORU8wRkJRMFlzVTBGT1JEdEJRVTlFTEU5QlpqSkNPMEZCWjBJMVFuTkNMRTFCUVVGQkxFdEJhRUkwUWl4cFFrRm5RblJDUXl4SFFXaENjMElzUlVGblFtcENPMEZCUTFRelFpeFJRVUZCUVN4UlFVRlJMRU5CUVVNd1FpeExRVUZVTEVOQlFXVkRMRWRCUVdZN1FVRkRSQ3hQUVd4Q01rSTdRVUZ0UWpWQ1F5eE5RVUZCUVN4UlFXNUNORUlzYzBKQmJVSnFRanRCUVVOVU5VSXNVVUZCUVVFc1VVRkJVU3hEUVVGRE5FSXNVVUZCVkR0QlFVTkVPMEZCY2tJeVFpeExRVUZzUWl4RFFVRmFPMEZCZDBKQkxGZEJRVThzV1VGQlRUdEJRVU5ZV0N4TlFVRkJRU3hIUVVGSExFTkJRVU5aTEZkQlFVbzdRVUZEUVRWQ0xFMUJRVUZCTEZOQlFWTXNRMEZCUTNOQ0xFOUJRVllzUTBGQmEwSXNWVUZCUVZZc1VVRkJVU3hGUVVGSk8wRkJRelZDUVN4UlFVRkJRU3hSUVVGUk8wRkJRMVFzVDBGR1JEdEJRVWRFTEV0QlRFUTdRVUZOUkN4SFFXeEVUU3hEUVVGUU8wRkJiVVJFSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5b2dRR1pzYjNjZ0tpOWNibHh1YVcxd2IzSjBJRXhwZG1WVFpYUWdabkp2YlNBbkxpYzdYRzVwYlhCdmNuUWdUMkp6WlhKMllXSnNaU0JtY205dElDZDZaVzR0YjJKelpYSjJZV0pzWlNjN1hHNWNibVY0Y0c5eWRDQjBlWEJsSUZaaGJIVmxWMmwwYUZKbGJXOTJZV3c4SzFRK0lEMGdlMXh1SUNBcmRtRnNkV1U2SUZRN1hHNGdJQ3R5WlcxdmRtRnNPaUJRY205dGFYTmxQSFp2YVdRK08xeHVmVHRjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnWm5WdVkzUnBiMjRnZEc5V1lXeDFaVTlpYzJWeWRtRmliR1U4VkQ0b2JHbDJaVk5sZERvZ1RHbDJaVk5sZER4VVBpa2dlMXh1SUNCeVpYUjFjbTRnYm1WM0lFOWljMlZ5ZG1GaWJHVW9iMkp6WlhKMlpYSWdQVDRnZTF4dUlDQWdJR052Ym5OMElISmxjMjlzZG1WeWN6b2dUV0Z3UEZRc0lDZ3BQVDUyYjJsa1BpQTlJRzVsZHlCTllYQW9LVHRjYmx4dUlDQWdJR1oxYm1OMGFXOXVJR0ZrWkdWa1NYUmxiU2gyWVd4MVpUb2dWQ2tnZTF4dUlDQWdJQ0FnYkdWMElISmxjMjlzZG1VN1hHNGdJQ0FnSUNCamIyNXpkQ0J5WlcxdmRtRnNPaUJRY205dGFYTmxQSFp2YVdRK0lEMGdibVYzSUZCeWIyMXBjMlVvWDNKbGMyOXNkbVVnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQnlaWE52YkhabElEMGdYM0psYzI5c2RtVTdYRzRnSUNBZ0lDQjlLVHRjYmlBZ0lDQWdJSEpsYzI5c2RtVnljeTV6WlhRb2RtRnNkV1VzSUNoeVpYTnZiSFpsT21GdWVTa3BPMXh1SUNBZ0lDQWdZMjl1YzNRZ2RtRnNkV1ZYYVhSb1VtVnRiM1poYkRvZ1ZtRnNkV1ZYYVhSb1VtVnRiM1poYkR4VVBpQTlJSHQyWVd4MVpTd2djbVZ0YjNaaGJIMDdYRzRnSUNBZ0lDQnZZbk5sY25abGNpNXVaWGgwS0haaGJIVmxWMmwwYUZKbGJXOTJZV3dwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR1oxYm1OMGFXOXVJSEpsYlc5MlpXUkpkR1Z0S0haaGJIVmxPaUJVS1NCN1hHNGdJQ0FnSUNCamIyNXpkQ0J5WlhOdmJIWmxjaUE5SUhKbGMyOXNkbVZ5Y3k1blpYUW9kbUZzZFdVcE8xeHVJQ0FnSUNBZ2FXWWdLQ0Z5WlhOdmJIWmxjaWtnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RTWlhOdmJIWmxjaUJ1YjNRZ1ptOTFibVFnYVc0Z2JXRndJR1p2Y2lCMllXeDFaU2NwTzF4dUlDQWdJQ0FnY21WemIyeDJaWEp6TG1SbGJHVjBaU2gyWVd4MVpTazdYRzRnSUNBZ0lDQnlaWE52YkhabGNpZ3BPMXh1SUNBZ0lIMWNibHh1SUNBZ0lHTnZibk4wSUhOMVlpQTlJR3hwZG1WVFpYUXVjM1ZpYzJOeWFXSmxLSHRjYmlBZ0lDQWdJSE4wWVhKMEtITjFZaWtnZTF4dUlDQWdJQ0FnSUNCbWIzSWdLR3hsZENCMllXeDFaU0J2WmlCc2FYWmxVMlYwTG5aaGJIVmxjeWdwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0hOMVlpNWpiRzl6WldRcElHSnlaV0ZyTzF4dUlDQWdJQ0FnSUNBZ0lHRmtaR1ZrU1hSbGJTaDJZV3gxWlNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMHNYRzRnSUNBZ0lDQnVaWGgwS0dOb1lXNW5aWE1wSUh0Y2JpQWdJQ0FnSUNBZ1kyaGhibWRsY3k1bWIzSkZZV05vS0dOb1lXNW5aU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdhV1lnS0dOb1lXNW5aUzUwZVhCbElEMDlQU0FuWVdSa0p5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1lXUmtaV1JKZEdWdEtHTm9ZVzVuWlM1MllXeDFaU2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaGphR0Z1WjJVdWRIbHdaU0E5UFQwZ0ozSmxiVzkyWlNjcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGJXOTJaV1JKZEdWdEtHTm9ZVzVuWlM1MllXeDFaU2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlLVHRjYmlBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0JsY25KdmNpaGxjbklwSUh0Y2JpQWdJQ0FnSUNBZ2IySnpaWEoyWlhJdVpYSnliM0lvWlhKeUtUdGNiaUFnSUNBZ0lIMHNYRzRnSUNBZ0lDQmpiMjF3YkdWMFpTZ3BJSHRjYmlBZ0lDQWdJQ0FnYjJKelpYSjJaWEl1WTI5dGNHeGxkR1VvS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5S1R0Y2JseHVJQ0FnSUhKbGRIVnliaUFvS1NBOVBpQjdYRzRnSUNBZ0lDQnpkV0l1ZFc1emRXSnpZM0pwWW1Vb0tUdGNiaUFnSUNBZ0lISmxjMjlzZG1WeWN5NW1iM0pGWVdOb0tISmxjMjlzZG1WeUlEMCtJSHRjYmlBZ0lDQWdJQ0FnY21WemIyeDJaWElvS1R0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUgwN1hHNGdJSDBwTzF4dWZWeHVJbDE5IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdHJhbnNkdWNlO1xuXG52YXIgXyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi5cIikpO1xuXG52YXIgYXJyYXlYZiA9IHtcbiAgJ0BAdHJhbnNkdWNlci9pbml0JzogZnVuY3Rpb24gdHJhbnNkdWNlckluaXQoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICAnQEB0cmFuc2R1Y2VyL3N0ZXAnOiBmdW5jdGlvbiB0cmFuc2R1Y2VyU3RlcChyZXMsIGlucHV0KSB7XG4gICAgcmVzLnB1c2goaW5wdXQpO1xuICAgIHJldHVybiByZXM7XG4gIH0sXG4gICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gdHJhbnNkdWNlclJlc3VsdChpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxufTtcblxuZnVuY3Rpb24gdHJhbnNkdWNlKGxpdmVTZXQsIHRyYW5zZHVjZXIpIHtcbiAgZnVuY3Rpb24gc3RlcCh4Zm9ybSwgaW5wdXRWYWx1ZSkge1xuICAgIHZhciBhZGRzQ29tcGxldGUgPSBmYWxzZTtcbiAgICB2YXIgb3V0cHV0VmFsdWVzO1xuICAgIHZhciByZXQgPSB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShbXSwgaW5wdXRWYWx1ZSk7XG5cbiAgICBpZiAocmV0ICYmIHJldFsnQEB0cmFuc2R1Y2VyL3JlZHVjZWQnXSkge1xuICAgICAgb3V0cHV0VmFsdWVzID0gcmV0WydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgIGFkZHNDb21wbGV0ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dFZhbHVlcyA9IHJldDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgb3V0cHV0VmFsdWVzOiBvdXRwdXRWYWx1ZXMsXG4gICAgICBhZGRzQ29tcGxldGU6IGFkZHNDb21wbGV0ZVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB2YWx1ZXNBbmRDb250ZXh0KCkge1xuICAgIHZhciBpbnB1dFRvT3V0cHV0VmFsdWVzID0gbmV3IE1hcCgpO1xuICAgIHZhciB4Zm9ybSA9IHRyYW5zZHVjZXIoYXJyYXlYZik7XG4gICAgdmFyIGFkZHNDb21wbGV0ZSA9IGZhbHNlO1xuICAgIHZhciB2YWx1ZXMgPSBuZXcgU2V0KHhmb3JtWydAQHRyYW5zZHVjZXIvaW5pdCddKCkpO1xuICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gbGl2ZVNldC52YWx1ZXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgdmFyIF9zdGVwMiA9IHN0ZXAoeGZvcm0sIHZhbHVlKSxcbiAgICAgICAgICAgIG91dHB1dFZhbHVlcyA9IF9zdGVwMi5vdXRwdXRWYWx1ZXMsXG4gICAgICAgICAgICBfYWRkc0NvbXBsZXRlID0gX3N0ZXAyLmFkZHNDb21wbGV0ZTtcblxuICAgICAgICBpbnB1dFRvT3V0cHV0VmFsdWVzLnNldCh2YWx1ZSwgb3V0cHV0VmFsdWVzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gb3V0cHV0VmFsdWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFsdWVzLmFkZChvdXRwdXRWYWx1ZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF9hZGRzQ29tcGxldGUpIHtcbiAgICAgICAgICBhZGRzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgIHhmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10oW10pLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZXMuYWRkKHZhbHVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuICE9IG51bGwpIHtcbiAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlczogdmFsdWVzLFxuICAgICAgaW5wdXRUb091dHB1dFZhbHVlczogaW5wdXRUb091dHB1dFZhbHVlcyxcbiAgICAgIHhmb3JtOiB4Zm9ybSxcbiAgICAgIGFkZHNDb21wbGV0ZTogYWRkc0NvbXBsZXRlXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBuZXcgXy5kZWZhdWx0KHtcbiAgICBzY2hlZHVsZXI6IGxpdmVTZXQuZ2V0U2NoZWR1bGVyKCksXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgIHJldHVybiB2YWx1ZXNBbmRDb250ZXh0KCkudmFsdWVzO1xuICAgIH0sXG4gICAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oc2V0VmFsdWVzLCBjb250cm9sbGVyKSB7XG4gICAgICB2YXIgaW5wdXRUb091dHB1dFZhbHVlcywgeGZvcm0sIGFkZHNDb21wbGV0ZTtcbiAgICAgIHZhciBzdWIgPSBsaXZlU2V0LnN1YnNjcmliZSh7XG4gICAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICB2YXIgcmV0ID0gdmFsdWVzQW5kQ29udGV4dCgpO1xuICAgICAgICAgIHNldFZhbHVlcyhyZXQudmFsdWVzKTtcbiAgICAgICAgICBpbnB1dFRvT3V0cHV0VmFsdWVzID0gcmV0LmlucHV0VG9PdXRwdXRWYWx1ZXM7XG4gICAgICAgICAgeGZvcm0gPSByZXQueGZvcm07XG4gICAgICAgICAgYWRkc0NvbXBsZXRlID0gcmV0LmFkZHNDb21wbGV0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dChjaGFuZ2VzKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNoYW5nZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBjaGFuZ2VzW2ldO1xuXG4gICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgIGlmICghYWRkc0NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gY2hhbmdlLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9zdGVwMyA9IHN0ZXAoeGZvcm0sIHZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0VmFsdWVzID0gX3N0ZXAzLm91dHB1dFZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgX2FkZHNDb21wbGV0ZSA9IF9zdGVwMy5hZGRzQ29tcGxldGU7XG5cbiAgICAgICAgICAgICAgICBpbnB1dFRvT3V0cHV0VmFsdWVzLnNldCh2YWx1ZSwgb3V0cHV0VmFsdWVzKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2xlbiA9IG91dHB1dFZhbHVlcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGQob3V0cHV0VmFsdWVzW19pXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKF9hZGRzQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgIGFkZHNDb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChlbmRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFkZChlbmRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlLnR5cGUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgIHZhciBfdmFsdWUgPSBjaGFuZ2UudmFsdWU7XG4gICAgICAgICAgICAgIHZhciBsaXN0ID0gaW5wdXRUb091dHB1dFZhbHVlcy5nZXQoX3ZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKCFsaXN0KSB0aHJvdyBuZXcgRXJyb3IoJ3ZhbHVlIGhhZCBub3QgYmVlbiBhZGRlZCcpO1xuICAgICAgICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKHRyYW5zZm9ybWVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZSh0cmFuc2Zvcm1lZFZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlucHV0VG9PdXRwdXRWYWx1ZXMuZGVsZXRlKF92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgY29udHJvbGxlci5lcnJvcihlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3ViO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnlZeTkwY21GdWMyUjFZMlV1YW5NaVhTd2libUZ0WlhNaU9sc2lZWEp5WVhsWVppSXNJbkpsY3lJc0ltbHVjSFYwSWl3aWNIVnphQ0lzSW5SeVlXNXpaSFZqWlNJc0lteHBkbVZUWlhRaUxDSjBjbUZ1YzJSMVkyVnlJaXdpYzNSbGNDSXNJbmhtYjNKdElpd2lhVzV3ZFhSV1lXeDFaU0lzSW1Ga1pITkRiMjF3YkdWMFpTSXNJbTkxZEhCMWRGWmhiSFZsY3lJc0luSmxkQ0lzSW5aaGJIVmxjMEZ1WkVOdmJuUmxlSFFpTENKcGJuQjFkRlJ2VDNWMGNIVjBWbUZzZFdWeklpd2lUV0Z3SWl3aWRtRnNkV1Z6SWl3aVUyVjBJaXdpZG1Gc2RXVWlMQ0pmWVdSa2MwTnZiWEJzWlhSbElpd2ljMlYwSWl3aWFTSXNJbXhsYmlJc0lteGxibWQwYUNJc0ltRmtaQ0lzSW1admNrVmhZMmdpTENKTWFYWmxVMlYwSWl3aWMyTm9aV1IxYkdWeUlpd2laMlYwVTJOb1pXUjFiR1Z5SWl3aWNtVmhaQ0lzSW14cGMzUmxiaUlzSW5ObGRGWmhiSFZsY3lJc0ltTnZiblJ5YjJ4c1pYSWlMQ0p6ZFdJaUxDSnpkV0p6WTNKcFltVWlMQ0p6ZEdGeWRDSXNJbTVsZUhRaUxDSmphR0Z1WjJWeklpd2lZMmhoYm1kbElpd2lkSGx3WlNJc0ltVnVaRlpoYkhWbElpd2liR2x6ZENJc0ltZGxkQ0lzSWtWeWNtOXlJaXdpZEhKaGJuTm1iM0p0WldSV1lXeDFaU0lzSW5KbGJXOTJaU0lzSW1SbGJHVjBaU0lzSW1WeWNtOXlJaXdpWlhKeUlpd2lZMjl0Y0d4bGRHVWlMQ0psYm1RaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenRCUVVWQk96dEJRVVZCTEVsQlFVMUJMRTlCUVU4c1IwRkJSenRCUVVOa0xIRkNRVVJqTERSQ1FVTlJPMEZCUTNCQ0xGZEJRVThzUlVGQlVEdEJRVU5FTEVkQlNHRTdRVUZKWkN4eFFrRktZeXd3UWtGSlRVTXNSMEZLVGl4RlFVbFhReXhMUVVwWUxFVkJTV3RDTzBGQlF6bENSQ3hKUVVGQlFTeEhRVUZITEVOQlFVTkZMRWxCUVVvc1EwRkJVMFFzUzBGQlZEdEJRVU5CTEZkQlFVOUVMRWRCUVZBN1FVRkRSQ3hIUVZCaE8wRkJVV1FzZFVKQlVtTXNORUpCVVZGRExFdEJVbElzUlVGUlpUdEJRVU16UWl4WFFVRlBRU3hMUVVGUU8wRkJRMFE3UVVGV1lTeERRVUZvUWpzN1FVRmhaU3hUUVVGVFJTeFRRVUZVTEVOQlFXMUNReXhQUVVGdVFpeEZRVUV3UTBNc1ZVRkJNVU1zUlVGQk9FVTdRVUZETTBZc1YwRkJVME1zU1VGQlZDeERRVUZqUXl4TFFVRmtMRVZCUVRaQ1F5eFZRVUUzUWl4RlFVZEZPMEZCUTBFc1VVRkJTVU1zV1VGQldTeEhRVUZITEV0QlFXNUNPMEZCUTBFc1VVRkJTVU1zV1VGQlNqdEJRVU5CTEZGQlFVMURMRWRCUVVjc1IwRkJSMG9zUzBGQlN5eERRVUZETEcxQ1FVRkVMRU5CUVV3c1EwRkJNa0lzUlVGQk0wSXNSVUZCSzBKRExGVkJRUzlDTEVOQlFWbzdPMEZCUTBFc1VVRkJTVWNzUjBGQlJ5eEpRVUZKUVN4SFFVRkhMRU5CUVVNc2MwSkJRVVFzUTBGQlpDeEZRVUYzUXp0QlFVTjBRMFFzVFVGQlFVRXNXVUZCV1N4SFFVRkhReXhIUVVGSExFTkJRVU1zYjBKQlFVUXNRMEZCYkVJN1FVRkRRVVlzVFVGQlFVRXNXVUZCV1N4SFFVRkhMRWxCUVdZN1FVRkRSQ3hMUVVoRUxFMUJSMDg3UVVGRFRFTXNUVUZCUVVFc1dVRkJXU3hIUVVGSFF5eEhRVUZtTzBGQlEwUTdPMEZCUTBRc1YwRkJUenRCUVVOTVJDeE5RVUZCUVN4WlFVRlpMRVZCUVZwQkxGbEJSRXM3UVVGRlRFUXNUVUZCUVVFc1dVRkJXU3hGUVVGYVFUdEJRVVpMTEV0QlFWQTdRVUZKUkRzN1FVRlRSQ3hYUVVGVFJ5eG5Ra0ZCVkN4SFFVRTRRenRCUVVNMVF5eFJRVUZOUXl4dFFrRkJiVUlzUjBGQlJ5eEpRVUZKUXl4SFFVRktMRVZCUVRWQ08wRkJRMEVzVVVGQlRWQXNTMEZCU3l4SFFVRkhSaXhWUVVGVkxFTkJRVU5PTEU5QlFVUXNRMEZCZUVJN1FVRkRRU3hSUVVGSlZTeFpRVUZaTEVkQlFVY3NTMEZCYmtJN1FVRkRRU3hSUVVGTlRTeE5RVUZOTEVkQlFVY3NTVUZCU1VNc1IwRkJTaXhEUVVGUlZDeExRVUZMTEVOQlFVTXNiVUpCUVVRc1EwRkJUQ3hGUVVGU0xFTkJRV1k3UVVGS05FTTdRVUZCUVR0QlFVRkJPenRCUVVGQk8wRkJTelZETERKQ1FVRnJRa2dzVDBGQlR5eERRVUZEVnl4TlFVRlNMRVZCUVd4Q0xEaElRVUZ2UXp0QlFVRkJMRmxCUVROQ1JTeExRVUV5UWpzN1FVRkJRU3h4UWtGRGEwSllMRWxCUVVrc1EwRkJRME1zUzBGQlJDeEZRVUZSVlN4TFFVRlNMRU5CUkhSQ08wRkJRVUVzV1VGRE0wSlFMRmxCUkRKQ0xGVkJRek5DUVN4WlFVUXlRanRCUVVGQkxGbEJRME5STEdGQlJFUXNWVUZEWWxRc1dVRkVZVHM3UVVGRmJFTkpMRkZCUVVGQkxHMUNRVUZ0UWl4RFFVRkRUU3hIUVVGd1FpeERRVUYzUWtZc1MwRkJlRUlzUlVGQkswSlFMRmxCUVM5Q096dEJRVU5CTEdGQlFVc3NTVUZCU1ZVc1EwRkJReXhIUVVGRExFTkJRVTRzUlVGQlVVTXNSMEZCUnl4SFFVRkRXQ3haUVVGWkxFTkJRVU5aTEUxQlFUbENMRVZCUVhORFJpeERRVUZETEVkQlFVTkRMRWRCUVhoRExFVkJRVFpEUkN4RFFVRkRMRVZCUVRsRExFVkJRV3RFTzBGQlEyaEVUQ3hWUVVGQlFTeE5RVUZOTEVOQlFVTlJMRWRCUVZBc1EwRkJWMklzV1VGQldTeERRVUZEVlN4RFFVRkVMRU5CUVhaQ08wRkJRMFE3TzBGQlEwUXNXVUZCU1VZc1lVRkJTaXhGUVVGdFFqdEJRVU5xUWxRc1ZVRkJRVUVzV1VGQldTeEhRVUZITEVsQlFXWTdRVUZEUVVZc1ZVRkJRVUVzUzBGQlN5eERRVUZETEhGQ1FVRkVMRU5CUVV3c1EwRkJOa0lzUlVGQk4wSXNSVUZCYVVOcFFpeFBRVUZxUXl4RFFVRjVReXhWUVVGQlVDeExRVUZMTEVWQlFVazdRVUZEYUVSR0xGbEJRVUZCTEUxQlFVMHNRMEZCUTFFc1IwRkJVQ3hEUVVGWFRpeExRVUZZTzBGQlEwUXNWMEZHUkR0QlFVZEJPMEZCUTBRN1FVRkRSanRCUVd4Q01rTTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHM3UVVGdFFqVkRMRmRCUVU4N1FVRkRURVlzVFVGQlFVRXNUVUZCVFN4RlFVRk9RU3hOUVVSTE8wRkJSVXhHTEUxQlFVRkJMRzFDUVVGdFFpeEZRVUZ1UWtFc2JVSkJSa3M3UVVGSFRFNHNUVUZCUVVFc1MwRkJTeXhGUVVGTVFTeExRVWhMTzBGQlNVeEZMRTFCUVVGQkxGbEJRVmtzUlVGQldrRTdRVUZLU3l4TFFVRlFPMEZCVFVRN08wRkJSVVFzVTBGQlR5eEpRVUZKWjBJc1UwRkJTaXhEUVVGWk8wRkJRMnBDUXl4SlFVRkJRU3hUUVVGVExFVkJRVVYwUWl4UFFVRlBMRU5CUVVOMVFpeFpRVUZTTEVWQlJFMDdRVUZGYWtKRExFbEJRVUZCTEVsQlFVa3NSVUZCUlR0QlFVRkJMR0ZCUVUxb1FpeG5Ra0ZCWjBJc1IwRkJSMGNzVFVGQmVrSTdRVUZCUVN4TFFVWlhPMEZCUjJwQ1l5eEpRVUZCUVN4TlFVaHBRaXhyUWtGSFZrTXNVMEZJVlN4RlFVZERReXhWUVVoRUxFVkJSMkU3UVVGRE5VSXNWVUZCU1d4Q0xHMUNRVUZLTEVWQlFYbENUaXhMUVVGNlFpeEZRVUZuUTBVc1dVRkJhRU03UVVGRFFTeFZRVUZOZFVJc1IwRkJSeXhIUVVGSE5VSXNUMEZCVHl4RFFVRkROa0lzVTBGQlVpeERRVUZyUWp0QlFVTTFRa01zVVVGQlFVRXNTMEZFTkVJc2JVSkJRM0JDTzBGQlEwNHNZMEZCVFhaQ0xFZEJRVWNzUjBGQlIwTXNaMEpCUVdkQ0xFVkJRVFZDTzBGQlEwRnJRaXhWUVVGQlFTeFRRVUZUTEVOQlFVTnVRaXhIUVVGSExFTkJRVU5KTEUxQlFVd3NRMEZCVkR0QlFVTkJSaXhWUVVGQlFTeHRRa0ZCYlVJc1IwRkJSMFlzUjBGQlJ5eERRVUZEUlN4dFFrRkJNVUk3UVVGRFFVNHNWVUZCUVVFc1MwRkJTeXhIUVVGSFNTeEhRVUZITEVOQlFVTktMRXRCUVZvN1FVRkRRVVVzVlVGQlFVRXNXVUZCV1N4SFFVRkhSU3hIUVVGSExFTkJRVU5HTEZsQlFXNUNPMEZCUTBRc1UwRlFNa0k3UVVGUk5VSXdRaXhSUVVGQlFTeEpRVkkwUWl4blFrRlJka0pETEU5QlVuVkNMRVZCVVdRN1FVRkRXaXhsUVVGTExFbEJRVWxvUWl4RFFVRkRMRWRCUVVNc1EwRkJUaXhGUVVGUlF5eEhRVUZITEVkQlFVTmxMRTlCUVU4c1EwRkJRMlFzVFVGQmVrSXNSVUZCYVVOR0xFTkJRVU1zUjBGQlEwTXNSMEZCYmtNc1JVRkJkME5FTEVOQlFVTXNSVUZCZWtNc1JVRkJOa003UVVGRE0wTXNaMEpCUVUxcFFpeE5RVUZOTEVkQlFVZEVMRTlCUVU4c1EwRkJRMmhDTEVOQlFVUXNRMEZCZEVJN08wRkJRMEVzWjBKQlFVbHBRaXhOUVVGTkxFTkJRVU5ETEVsQlFWQXNTMEZCWjBJc1MwRkJjRUlzUlVGQk1rSTdRVUZEZWtJc2EwSkJRVWtzUTBGQlF6ZENMRmxCUVV3c1JVRkJiVUk3UVVGQlFTeHZRa0ZEVmxFc1MwRkVWU3hIUVVORWIwSXNUVUZFUXl4RFFVTldjRUlzUzBGRVZUczdRVUZCUVN3MlFrRkZiVU5ZTEVsQlFVa3NRMEZCUTBNc1MwRkJSQ3hGUVVGUlZTeExRVUZTTEVOQlJuWkRPMEZCUVVFc2IwSkJSVlpRTEZsQlJsVXNWVUZGVmtFc1dVRkdWVHRCUVVGQkxHOUNRVVZyUWxFc1lVRkdiRUlzVlVGRlNWUXNXVUZHU2pzN1FVRkhha0pKTEdkQ1FVRkJRU3h0UWtGQmJVSXNRMEZCUTAwc1IwRkJjRUlzUTBGQmQwSkdMRXRCUVhoQ0xFVkJRU3RDVUN4WlFVRXZRanM3UVVGRFFTeHhRa0ZCU3l4SlFVRkpWU3hGUVVGRExFZEJRVU1zUTBGQlRpeEZRVUZSUXl4SlFVRkhMRWRCUVVOWUxGbEJRVmtzUTBGQlExa3NUVUZCT1VJc1JVRkJjME5HTEVWQlFVTXNSMEZCUTBNc1NVRkJlRU1zUlVGQk5rTkVMRVZCUVVNc1JVRkJPVU1zUlVGQmEwUTdRVUZEYUVSWExHdENRVUZCUVN4VlFVRlZMRU5CUVVOU0xFZEJRVmdzUTBGQlpXSXNXVUZCV1N4RFFVRkRWU3hGUVVGRUxFTkJRVE5DTzBGQlEwUTdPMEZCUTBRc2IwSkJRVWxHTEdGQlFVb3NSVUZCYlVJN1FVRkRha0pVTEd0Q1FVRkJRU3haUVVGWkxFZEJRVWNzU1VGQlpqdEJRVU5CUml4clFrRkJRVUVzUzBGQlN5eERRVUZETEhGQ1FVRkVMRU5CUVV3c1EwRkJOa0lzUlVGQk4wSXNSVUZCYVVOcFFpeFBRVUZxUXl4RFFVRjVReXhWUVVGQlpTeFJRVUZSTEVWQlFVazdRVUZEYmtSU0xHOUNRVUZCUVN4VlFVRlZMRU5CUVVOU0xFZEJRVmdzUTBGQlpXZENMRkZCUVdZN1FVRkRSQ3h0UWtGR1JEdEJRVWRFTzBGQlEwWTdRVUZEUml4aFFXWkVMRTFCWlU4c1NVRkJTVVlzVFVGQlRTeERRVUZEUXl4SlFVRlFMRXRCUVdkQ0xGRkJRWEJDTEVWQlFUaENPMEZCUVVFc2EwSkJRelZDY2tJc1RVRkVORUlzUjBGRGJrSnZRaXhOUVVSdFFpeERRVU0xUW5CQ0xFdEJSRFJDTzBGQlJXNURMR3RDUVVGTmRVSXNTVUZCU1N4SFFVRkhNMElzYlVKQlFXMUNMRU5CUVVNMFFpeEhRVUZ3UWl4RFFVRjNRbmhDTEUxQlFYaENMRU5CUVdJN1FVRkRRU3hyUWtGQlNTeERRVUZEZFVJc1NVRkJUQ3hGUVVGWExFMUJRVTBzU1VGQlNVVXNTMEZCU2l4RFFVRlZMREJDUVVGV0xFTkJRVTQ3UVVGRFdFWXNZMEZCUVVFc1NVRkJTU3hEUVVGRGFFSXNUMEZCVEN4RFFVRmhMRlZCUVVGdFFpeG5Ra0ZCWjBJc1JVRkJTVHRCUVVNdlFsb3NaMEpCUVVGQkxGVkJRVlVzUTBGQlEyRXNUVUZCV0N4RFFVRnJRa1FzWjBKQlFXeENPMEZCUTBRc1pVRkdSRHRCUVVkQk9VSXNZMEZCUVVFc2JVSkJRVzFDTEVOQlFVTm5ReXhOUVVGd1FpeERRVUV5UWpWQ0xFMUJRVE5DTzBGQlEwUTdRVUZEUmp0QlFVTkdMRk5CY0VNeVFqdEJRWEZETlVJMlFpeFJRVUZCUVN4TFFYSkRORUlzYVVKQmNVTjBRa01zUjBGeVEzTkNMRVZCY1VOcVFqdEJRVU5VYUVJc1ZVRkJRVUVzVlVGQlZTeERRVUZEWlN4TFFVRllMRU5CUVdsQ1F5eEhRVUZxUWp0QlFVTkVMRk5CZGtNeVFqdEJRWGRETlVKRExGRkJRVUZCTEZGQmVFTTBRaXh6UWtGM1EycENPMEZCUTFScVFpeFZRVUZCUVN4VlFVRlZMRU5CUVVOclFpeEhRVUZZTzBGQlEwUTdRVUV4UXpKQ0xFOUJRV3hDTEVOQlFWbzdRVUUyUTBFc1lVRkJUMnBDTEVkQlFWQTdRVUZEUkR0QlFXNUVaMElzUjBGQldpeERRVUZRTzBGQmNVUkVJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHlvZ1FHWnNiM2NnS2k5Y2JseHVhVzF3YjNKMElFeHBkbVZUWlhRZ1puSnZiU0FuTGljN1hHNWNibU52Ym5OMElHRnljbUY1V0dZZ1BTQjdYRzRnSUNkQVFIUnlZVzV6WkhWalpYSXZhVzVwZENjb0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUZ0ZE8xeHVJQ0I5TEZ4dUlDQW5RRUIwY21GdWMyUjFZMlZ5TDNOMFpYQW5LSEpsY3l3Z2FXNXdkWFFwSUh0Y2JpQWdJQ0J5WlhNdWNIVnphQ2hwYm5CMWRDazdYRzRnSUNBZ2NtVjBkWEp1SUhKbGN6dGNiaUFnZlN4Y2JpQWdKMEJBZEhKaGJuTmtkV05sY2k5eVpYTjFiSFFuS0dsdWNIVjBLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHbHVjSFYwTzF4dUlDQjlYRzU5TzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlCMGNtRnVjMlIxWTJVb2JHbDJaVk5sZERvZ1RHbDJaVk5sZER4aGJuaytMQ0IwY21GdWMyUjFZMlZ5T2lCR2RXNWpkR2x2YmlrNklFeHBkbVZUWlhROFlXNTVQaUI3WEc0Z0lHWjFibU4wYVc5dUlITjBaWEFvZUdadmNtMDZJRTlpYW1WamRDd2dhVzV3ZFhSV1lXeDFaVG9nWVc1NUtUb2dlMXh1SUNBZ0lHOTFkSEIxZEZaaGJIVmxjem9nUVhKeVlYazhZVzU1UGp0Y2JpQWdJQ0JoWkdSelEyOXRjR3hsZEdVNklHSnZiMnhsWVc0N1hHNGdJSDBnZTF4dUlDQWdJR3hsZENCaFpHUnpRMjl0Y0d4bGRHVWdQU0JtWVd4elpUdGNiaUFnSUNCc1pYUWdiM1YwY0hWMFZtRnNkV1Z6TzF4dUlDQWdJR052Ym5OMElISmxkQ0E5SUhobWIzSnRXeWRBUUhSeVlXNXpaSFZqWlhJdmMzUmxjQ2RkS0Z0ZExDQnBibkIxZEZaaGJIVmxLVHRjYmlBZ0lDQnBaaUFvY21WMElDWW1JSEpsZEZzblFFQjBjbUZ1YzJSMVkyVnlMM0psWkhWalpXUW5YU2tnZTF4dUlDQWdJQ0FnYjNWMGNIVjBWbUZzZFdWeklEMGdjbVYwV3lkQVFIUnlZVzV6WkhWalpYSXZkbUZzZFdVblhUdGNiaUFnSUNBZ0lHRmtaSE5EYjIxd2JHVjBaU0E5SUhSeWRXVTdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUc5MWRIQjFkRlpoYkhWbGN5QTlJSEpsZER0Y2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lHOTFkSEIxZEZaaGJIVmxjeXhjYmlBZ0lDQWdJR0ZrWkhORGIyMXdiR1YwWlZ4dUlDQWdJSDA3WEc0Z0lIMWNibHh1SUNCMGVYQmxJRlpoYkhWbGMwRnVaRU52Ym5SbGVIUWdQU0I3WEc0Z0lDQWdkbUZzZFdWek9pQlRaWFE4WVc1NVBqdGNiaUFnSUNCcGJuQjFkRlJ2VDNWMGNIVjBWbUZzZFdWek9pQk5ZWEE4WVc1NUxDQkJjbkpoZVR4aGJuaytQanRjYmlBZ0lDQjRabTl5YlRvZ1QySnFaV04wTzF4dUlDQWdJR0ZrWkhORGIyMXdiR1YwWlRvZ1ltOXZiR1ZoYmp0Y2JpQWdmVHRjYmx4dUlDQm1kVzVqZEdsdmJpQjJZV3gxWlhOQmJtUkRiMjUwWlhoMEtDazZJRlpoYkhWbGMwRnVaRU52Ym5SbGVIUWdlMXh1SUNBZ0lHTnZibk4wSUdsdWNIVjBWRzlQZFhSd2RYUldZV3gxWlhNZ1BTQnVaWGNnVFdGd0tDazdYRzRnSUNBZ1kyOXVjM1FnZUdadmNtMGdQU0IwY21GdWMyUjFZMlZ5S0dGeWNtRjVXR1lwTzF4dUlDQWdJR3hsZENCaFpHUnpRMjl0Y0d4bGRHVWdQU0JtWVd4elpUdGNiaUFnSUNCamIyNXpkQ0IyWVd4MVpYTWdQU0J1WlhjZ1UyVjBLSGhtYjNKdFd5ZEFRSFJ5WVc1elpIVmpaWEl2YVc1cGRDZGRLQ2twTzF4dUlDQWdJR1p2Y2lBb2JHVjBJSFpoYkhWbElHOW1JR3hwZG1WVFpYUXVkbUZzZFdWektDa3BJSHRjYmlBZ0lDQWdJR052Ym5OMElIdHZkWFJ3ZFhSV1lXeDFaWE1zSUdGa1pITkRiMjF3YkdWMFpUb2dYMkZrWkhORGIyMXdiR1YwWlgwZ1BTQnpkR1Z3S0hobWIzSnRMQ0IyWVd4MVpTazdYRzRnSUNBZ0lDQnBibkIxZEZSdlQzVjBjSFYwVm1Gc2RXVnpMbk5sZENoMllXeDFaU3dnYjNWMGNIVjBWbUZzZFdWektUdGNiaUFnSUNBZ0lHWnZjaUFvYkdWMElHazlNQ3hzWlc0OWIzVjBjSFYwVm1Gc2RXVnpMbXhsYm1kMGFEc2dhVHhzWlc0N0lHa3JLeWtnZTF4dUlDQWdJQ0FnSUNCMllXeDFaWE11WVdSa0tHOTFkSEIxZEZaaGJIVmxjMXRwWFNrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCcFppQW9YMkZrWkhORGIyMXdiR1YwWlNrZ2UxeHVJQ0FnSUNBZ0lDQmhaR1J6UTI5dGNHeGxkR1VnUFNCMGNuVmxPMXh1SUNBZ0lDQWdJQ0I0Wm05eWJWc25RRUIwY21GdWMyUjFZMlZ5TDNKbGMzVnNkQ2RkS0Z0ZEtTNW1iM0pGWVdOb0tIWmhiSFZsSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0IyWVd4MVpYTXVZV1JrS0haaGJIVmxLVHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lHSnlaV0ZyTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ2RtRnNkV1Z6TEZ4dUlDQWdJQ0FnYVc1d2RYUlViMDkxZEhCMWRGWmhiSFZsY3l4Y2JpQWdJQ0FnSUhobWIzSnRMRnh1SUNBZ0lDQWdZV1JrYzBOdmJYQnNaWFJsWEc0Z0lDQWdmVHRjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJ1WlhjZ1RHbDJaVk5sZENoN1hHNGdJQ0FnYzJOb1pXUjFiR1Z5T2lCc2FYWmxVMlYwTG1kbGRGTmphR1ZrZFd4bGNpZ3BMRnh1SUNBZ0lISmxZV1E2SUNncElEMCtJSFpoYkhWbGMwRnVaRU52Ym5SbGVIUW9LUzUyWVd4MVpYTXNYRzRnSUNBZ2JHbHpkR1Z1S0hObGRGWmhiSFZsY3l3Z1kyOXVkSEp2Ykd4bGNpa2dlMXh1SUNBZ0lDQWdiR1YwSUdsdWNIVjBWRzlQZFhSd2RYUldZV3gxWlhNc0lIaG1iM0p0TENCaFpHUnpRMjl0Y0d4bGRHVTdYRzRnSUNBZ0lDQmpiMjV6ZENCemRXSWdQU0JzYVhabFUyVjBMbk4xWW5OamNtbGlaU2g3WEc0Z0lDQWdJQ0FnSUhOMFlYSjBLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lHTnZibk4wSUhKbGRDQTlJSFpoYkhWbGMwRnVaRU52Ym5SbGVIUW9LVHRjYmlBZ0lDQWdJQ0FnSUNCelpYUldZV3gxWlhNb2NtVjBMblpoYkhWbGN5azdYRzRnSUNBZ0lDQWdJQ0FnYVc1d2RYUlViMDkxZEhCMWRGWmhiSFZsY3lBOUlISmxkQzVwYm5CMWRGUnZUM1YwY0hWMFZtRnNkV1Z6TzF4dUlDQWdJQ0FnSUNBZ0lIaG1iM0p0SUQwZ2NtVjBMbmhtYjNKdE8xeHVJQ0FnSUNBZ0lDQWdJR0ZrWkhORGIyMXdiR1YwWlNBOUlISmxkQzVoWkdSelEyOXRjR3hsZEdVN1hHNGdJQ0FnSUNBZ0lIMHNYRzRnSUNBZ0lDQWdJRzVsZUhRb1kyaGhibWRsY3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJR2s5TUN4c1pXNDlZMmhoYm1kbGN5NXNaVzVuZEdnN0lHazhiR1Z1T3lCcEt5c3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUdOb1lXNW5aU0E5SUdOb1lXNW5aWE5iYVYwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kyaGhibWRsTG5SNWNHVWdQVDA5SUNkaFpHUW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaFlXUmtjME52YlhCc1pYUmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdlM1poYkhWbGZTQTlJR05vWVc1blpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCN2IzVjBjSFYwVm1Gc2RXVnpMQ0JoWkdSelEyOXRjR3hsZEdVNklGOWhaR1J6UTI5dGNHeGxkR1Y5SUQwZ2MzUmxjQ2g0Wm05eWJTd2dkbUZzZFdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbHVjSFYwVkc5UGRYUndkWFJXWVd4MVpYTXVjMlYwS0haaGJIVmxMQ0J2ZFhSd2RYUldZV3gxWlhNcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElHazlNQ3hzWlc0OWIzVjBjSFYwVm1Gc2RXVnpMbXhsYm1kMGFEc2dhVHhzWlc0N0lHa3JLeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNWhaR1FvYjNWMGNIVjBWbUZzZFdWelcybGRLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tGOWhaR1J6UTI5dGNHeGxkR1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHRmtaSE5EYjIxd2JHVjBaU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I0Wm05eWJWc25RRUIwY21GdWMyUjFZMlZ5TDNKbGMzVnNkQ2RkS0Z0ZEtTNW1iM0pGWVdOb0tHVnVaRlpoYkhWbElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNWhaR1FvWlc1a1ZtRnNkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tHTm9ZVzVuWlM1MGVYQmxJRDA5UFNBbmNtVnRiM1psSnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyNXpkQ0I3ZG1Gc2RXVjlJRDBnWTJoaGJtZGxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCc2FYTjBJRDBnYVc1d2RYUlViMDkxZEhCMWRGWmhiSFZsY3k1blpYUW9kbUZzZFdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JV3hwYzNRcElIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnbmRtRnNkV1VnYUdGa0lHNXZkQ0JpWldWdUlHRmtaR1ZrSnlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUd4cGMzUXVabTl5UldGamFDaDBjbUZ1YzJadmNtMWxaRlpoYkhWbElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1MGNtOXNiR1Z5TG5KbGJXOTJaU2gwY21GdWMyWnZjbTFsWkZaaGJIVmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR2x1Y0hWMFZHOVBkWFJ3ZFhSV1lXeDFaWE11WkdWc1pYUmxLSFpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUdWeWNtOXlLR1Z5Y2lrZ2UxeHVJQ0FnSUNBZ0lDQWdJR052Ym5SeWIyeHNaWEl1WlhKeWIzSW9aWEp5S1R0Y2JpQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdZMjl0Y0d4bGRHVW9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNWxibVFvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZTazdYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQnpkV0k3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibjFjYmlKZGZRPT0iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IG1hdGNoO1xudmFyIHByb3RvID0gZ2xvYmFsLkVsZW1lbnQgJiYgZ2xvYmFsLkVsZW1lbnQucHJvdG90eXBlO1xudmFyIHZlbmRvciA9IHByb3RvICYmIChwcm90by5tYXRjaGVzIHx8IHByb3RvLm1hdGNoZXNTZWxlY3RvciB8fCBwcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IHByb3RvLm9NYXRjaGVzU2VsZWN0b3IpO1xuXG5mdW5jdGlvbiBtYXRjaChlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKHZlbmRvcikgcmV0dXJuIHZlbmRvci5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gIHZhciBwYXJlbnROb2RlID0gZWwucGFyZW50Tm9kZTtcblxuICBpZiAocGFyZW50Tm9kZSAmJiB0eXBlb2YgcGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIG5vZGVzID0gcGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChub2Rlc1tpXSA9PT0gZWwpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlwYm1SbGVDNXFjeUpkTENKdVlXMWxjeUk2V3lKd2NtOTBieUlzSW1kc2IySmhiQ0lzSWtWc1pXMWxiblFpTENKd2NtOTBiM1I1Y0dVaUxDSjJaVzVrYjNJaUxDSnRZWFJqYUdWeklpd2liV0YwWTJobGMxTmxiR1ZqZEc5eUlpd2lkMlZpYTJsMFRXRjBZMmhsYzFObGJHVmpkRzl5SWl3aWJXOTZUV0YwWTJobGMxTmxiR1ZqZEc5eUlpd2liWE5OWVhSamFHVnpVMlZzWldOMGIzSWlMQ0p2VFdGMFkyaGxjMU5sYkdWamRHOXlJaXdpYldGMFkyZ2lMQ0psYkNJc0luTmxiR1ZqZEc5eUlpd2lZMkZzYkNJc0luQmhjbVZ1ZEU1dlpHVWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNJaXdpYm05a1pYTWlMQ0pwSWl3aWJHVnVaM1JvSWwwc0ltMWhjSEJwYm1keklqb2lPenM3TzBGQlJVRXNTVUZCVFVFc1MwRkJTeXhIUVVGSFF5eE5RVUZOTEVOQlFVTkRMRTlCUVZBc1NVRkJhMEpFTEUxQlFVMHNRMEZCUTBNc1QwRkJVQ3hEUVVGbFF5eFRRVUV2UXp0QlFVTkJMRWxCUVUxRExFMUJRVTBzUjBGQlIwb3NTMEZCU3l4TFFVRkxRU3hMUVVGTExFTkJRVU5MTEU5QlFVNHNTVUZEY0VKTUxFdEJRVXNzUTBGQlEwMHNaVUZFWXl4SlFVVndRazRzUzBGQlN5eERRVUZEVHl4eFFrRkdZeXhKUVVkd1FsQXNTMEZCU3l4RFFVRkRVU3hyUWtGSVl5eEpRVWx3UWxJc1MwRkJTeXhEUVVGRFV5eHBRa0ZLWXl4SlFVdHdRbFFzUzBGQlN5eERRVUZEVlN4blFrRk1VeXhEUVVGd1FqczdRVUZQWlN4VFFVRlRReXhMUVVGVUxFTkJRV1ZETEVWQlFXWXNSVUZCWjBORExGRkJRV2hETEVWQlFUSkVPMEZCUTNoRkxFMUJRVWxVTEUxQlFVb3NSVUZCV1N4UFFVRlBRU3hOUVVGTkxFTkJRVU5WTEVsQlFWQXNRMEZCV1VZc1JVRkJXaXhGUVVGblFrTXNVVUZCYUVJc1EwRkJVRHRCUVVRMFJDeE5RVVZxUlVVc1ZVRkdhVVVzUjBGRmJrUklMRVZCUm0xRUxFTkJSV3BGUnl4VlFVWnBSVHM3UVVGSGVFVXNUVUZCU1VFc1ZVRkJWU3hKUVVGSkxFOUJRVkZCTEZWQlFVUXNRMEZCYVVKRExHZENRVUY0UWl4TFFVRTJReXhWUVVFdlJDeEZRVUV5UlR0QlFVTjZSU3hSUVVGTlF5eExRVUZMTEVkQlFVbEdMRlZCUVVRc1EwRkJhVUpETEdkQ1FVRnFRaXhEUVVGclEwZ3NVVUZCYkVNc1EwRkJaRHM3UVVGRFFTeFRRVUZMTEVsQlFVbExMRU5CUVVNc1IwRkJSeXhEUVVGaUxFVkJRV2RDUVN4RFFVRkRMRWRCUVVkRUxFdEJRVXNzUTBGQlEwVXNUVUZCTVVJc1JVRkJhME5FTEVOQlFVTXNSVUZCYmtNc1JVRkJkVU03UVVGRGNrTXNWVUZCU1VRc1MwRkJTeXhEUVVGRFF5eERRVUZFTEVOQlFVd3NTMEZCWVU0c1JVRkJha0lzUlVGQmNVSXNUMEZCVHl4SlFVRlFPMEZCUTNSQ08wRkJRMFk3TzBGQlEwUXNVMEZCVHl4TFFVRlFPMEZCUTBRaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaUJBWm14dmR5QXFMMXh1WEc1amIyNXpkQ0J3Y205MGJ5QTlJR2RzYjJKaGJDNUZiR1Z0Wlc1MElDWW1JR2RzYjJKaGJDNUZiR1Z0Wlc1MExuQnliM1J2ZEhsd1pUdGNibU52Ym5OMElIWmxibVJ2Y2lBOUlIQnliM1J2SUNZbUlDaHdjbTkwYnk1dFlYUmphR1Z6WEc0Z0lIeDhJSEJ5YjNSdkxtMWhkR05vWlhOVFpXeGxZM1J2Y2x4dUlDQjhmQ0J3Y205MGJ5NTNaV0pyYVhSTllYUmphR1Z6VTJWc1pXTjBiM0pjYmlBZ2ZId2djSEp2ZEc4dWJXOTZUV0YwWTJobGMxTmxiR1ZqZEc5eVhHNGdJSHg4SUhCeWIzUnZMbTF6VFdGMFkyaGxjMU5sYkdWamRHOXlYRzRnSUh4OElIQnliM1J2TG05TllYUmphR1Z6VTJWc1pXTjBiM0lwTzF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCbWRXNWpkR2x2YmlCdFlYUmphQ2hsYkRvZ1NGUk5URVZzWlcxbGJuUXNJSE5sYkdWamRHOXlPaUJ6ZEhKcGJtY3BPaUJpYjI5c1pXRnVJSHRjYmlBZ2FXWWdLSFpsYm1SdmNpa2djbVYwZFhKdUlIWmxibVJ2Y2k1allXeHNLR1ZzTENCelpXeGxZM1J2Y2lrN1hHNGdJR052Ym5OMElIdHdZWEpsYm5ST2IyUmxmU0E5SUdWc08xeHVJQ0JwWmlBb2NHRnlaVzUwVG05a1pTQW1KaUIwZVhCbGIyWWdLSEJoY21WdWRFNXZaR1U2WVc1NUtTNXhkV1Z5ZVZObGJHVmpkRzl5UVd4c0lEMDlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnWTI5dWMzUWdibTlrWlhNZ1BTQW9jR0Z5Wlc1MFRtOWtaVHBoYm5rcExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b2MyVnNaV04wYjNJcE8xeHVJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2JtOWtaWE11YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHbG1JQ2h1YjJSbGMxdHBYU0E5UFQwZ1pXd3BJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJSDFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdabUZzYzJVN1hHNTlYRzRpWFgwPSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gY3JlYXRlQ3NzRm47XG5cbnZhciBfbWF0Y2hlc1NlbGVjdG9yTmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJtYXRjaGVzLXNlbGVjdG9yLW5nXCIpKTtcblxuZnVuY3Rpb24gY3JlYXRlQ3NzRm4oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChlbCkge1xuICAgIHJldHVybiAoMCwgX21hdGNoZXNTZWxlY3Rvck5nW1wiZGVmYXVsdFwiXSkoZWwsIHNlbGVjdG9yKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3JlYXRlQ3NzRm4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjcmVhdGVUcmFuc2Zvcm1lcjtcblxudmFyIF90cmFuc2R1Y2VycyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInRyYW5zZHVjZXJzLmpzXCIpKTtcblxudmFyIF90cmFuc2R1Y2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsaXZlLXNldC90cmFuc2R1Y2VcIikpO1xuXG52YXIgX2ZpbHRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImxpdmUtc2V0L2ZpbHRlclwiKSk7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsaXZlLXNldC9tZXJnZVwiKSk7XG5cbnZhciBfY3JlYXRlQ3NzRm4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2NyZWF0ZUNzc0ZuXCIpKTtcblxudmFyIF93YXRjaE11dGF0aW9ucyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vd2F0Y2hNdXRhdGlvbnNcIikpO1xuXG52YXIgX3dhdGNoRmlsdGVyZWRDaGlsZHJlbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vd2F0Y2hGaWx0ZXJlZENoaWxkcmVuXCIpKTtcblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNmb3JtZXIoc2NoZWR1bGVyLCBzZWxlY3RvcnMpIHtcbiAgdmFyIHRyYW5zZm9ybWVycyA9IHNlbGVjdG9ycy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgY29uZEZuID0gKDAsIF9jcmVhdGVDc3NGbltcImRlZmF1bHRcIl0pKGl0ZW0pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChsaXZlU2V0KSB7XG4gICAgICAgIHJldHVybiAoMCwgX3dhdGNoRmlsdGVyZWRDaGlsZHJlbltcImRlZmF1bHRcIl0pKGxpdmVTZXQsIGNvbmRGbik7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXRlbS4kb3IpIHtcbiAgICAgIHZhciBfdHJhbnNmb3JtZXJzID0gaXRlbS4kb3IubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVUcmFuc2Zvcm1lcihzY2hlZHVsZXIsIHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAobGl2ZVNldCkge1xuICAgICAgICByZXR1cm4gKDAsIF9tZXJnZVtcImRlZmF1bHRcIl0pKF90cmFuc2Zvcm1lcnMubWFwKGZ1bmN0aW9uICh0cmFuc2Zvcm1lcikge1xuICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1lcihsaXZlU2V0KTtcbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uJHdhdGNoKSB7XG4gICAgICB2YXIgX2l0ZW0kJHdhdGNoID0gaXRlbS4kd2F0Y2gsXG4gICAgICAgICAgYXR0cmlidXRlRmlsdGVyID0gX2l0ZW0kJHdhdGNoLmF0dHJpYnV0ZUZpbHRlcixcbiAgICAgICAgICBjb25kID0gX2l0ZW0kJHdhdGNoLmNvbmQ7XG5cbiAgICAgIHZhciBfY29uZEZuID0gdHlwZW9mIGNvbmQgPT09ICdmdW5jdGlvbicgPyBjb25kIDogKDAsIF9jcmVhdGVDc3NGbltcImRlZmF1bHRcIl0pKGNvbmQpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGxpdmVTZXQpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfd2F0Y2hNdXRhdGlvbnNbXCJkZWZhdWx0XCJdKShsaXZlU2V0LCBhdHRyaWJ1dGVGaWx0ZXIsIF9jb25kRm4pO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uJGxvZykge1xuICAgICAgdmFyICRsb2cgPSBpdGVtLiRsb2c7XG5cbiAgICAgIHZhciBmaWx0ZXJGbiA9IGZ1bmN0aW9uIGZpbHRlckZuKHZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCRsb2csIHZhbHVlLmVsKTsgLy9lc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAobGl2ZVNldCkge1xuICAgICAgICByZXR1cm4gKDAsIF9maWx0ZXJbXCJkZWZhdWx0XCJdKShsaXZlU2V0LCBmaWx0ZXJGbik7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoaXRlbS4kZmlsdGVyKSB7XG4gICAgICB2YXIgJGZpbHRlciA9IGl0ZW0uJGZpbHRlcjtcblxuICAgICAgdmFyIF9maWx0ZXJGbiA9IGZ1bmN0aW9uIF9maWx0ZXJGbihfcmVmKSB7XG4gICAgICAgIHZhciBlbCA9IF9yZWYuZWw7XG4gICAgICAgIHJldHVybiAkZmlsdGVyKGVsKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAobGl2ZVNldCkge1xuICAgICAgICByZXR1cm4gKDAsIF9maWx0ZXJbXCJkZWZhdWx0XCJdKShsaXZlU2V0LCBfZmlsdGVyRm4pO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uJG1hcCkge1xuICAgICAgdmFyICRtYXAgPSBpdGVtLiRtYXA7XG5cbiAgICAgIHZhciB0cmFuc2R1Y2VyID0gX3RyYW5zZHVjZXJzW1wiZGVmYXVsdFwiXS5jb21wb3NlKF90cmFuc2R1Y2Vyc1tcImRlZmF1bHRcIl0ubWFwKGZ1bmN0aW9uIChlYykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVsOiAkbWFwKGVjLmVsKSxcbiAgICAgICAgICBwYXJlbnRzOiBlYy5wYXJlbnRzXG4gICAgICAgIH07XG4gICAgICB9KSwgX3RyYW5zZHVjZXJzW1wiZGVmYXVsdFwiXS5maWx0ZXIoZnVuY3Rpb24gKGVjKSB7XG4gICAgICAgIHJldHVybiBlYy5lbCAhPSBudWxsO1xuICAgICAgfSkpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGxpdmVTZXQpIHtcbiAgICAgICAgcmV0dXJuICgwLCBfdHJhbnNkdWNlW1wiZGVmYXVsdFwiXSkobGl2ZVNldCwgdHJhbnNkdWNlcik7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2VsZWN0b3IgaXRlbTogXCIuY29uY2F0KEpTT04uc3RyaW5naWZ5KGl0ZW0pKSk7XG4gIH0pO1xuICByZXR1cm4gdHJhbnNmb3JtZXJzLnJlZHVjZShmdW5jdGlvbiAoY29tYmluZWQsIHRyYW5zZm9ybWVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChsaXZlU2V0KSB7XG4gICAgICByZXR1cm4gdHJhbnNmb3JtZXIoY29tYmluZWQobGl2ZVNldCkpO1xuICAgIH07XG4gIH0sIGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHRcIik7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHdhdGNoRmlsdGVyZWRDaGlsZHJlbjtcblxudmFyIF9saXZlU2V0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwibGl2ZS1zZXRcIikpO1xuXG5mdW5jdGlvbiB3YXRjaEZpbHRlcmVkQ2hpbGRyZW4oaW5wdXQsIGNvbmRGbikge1xuICByZXR1cm4gbmV3IF9saXZlU2V0W1wiZGVmYXVsdFwiXSh7XG4gICAgc2NoZWR1bGVyOiBpbnB1dC5nZXRTY2hlZHVsZXIoKSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgfSxcbiAgICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3RlbihzZXRWYWx1ZXMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIHNldFZhbHVlcyhuZXcgU2V0KCkpO1xuICAgICAgdmFyIGlucHV0RW50cmllcyA9IG5ldyBNYXAoKTtcbiAgICAgIHZhciBvdXRwdXRFY3MgPSBuZXcgTWFwKCk7XG5cbiAgICAgIGZ1bmN0aW9uIG5ld0VjKGVjKSB7XG4gICAgICAgIGZ1bmN0aW9uIGFkZGVkTm9kZShjaGlsZCkge1xuICAgICAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuO1xuICAgICAgICAgIC8qOjogaWYgKCEoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHRocm93IG5ldyBFcnJvcigpICovXG5cbiAgICAgICAgICBpZiAoY29uZEZuKGNoaWxkKSkge1xuICAgICAgICAgICAgdmFyIGNoaWxkRWMgPSB7XG4gICAgICAgICAgICAgIGVsOiBjaGlsZCxcbiAgICAgICAgICAgICAgcGFyZW50czogZWMucGFyZW50c1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG91dHB1dEVjcy5zZXQoY2hpbGQsIGNoaWxkRWMpO1xuICAgICAgICAgICAgY29udHJvbGxlci5hZGQoY2hpbGRFYyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlZE5vZGUoY2hpbGQpIHtcbiAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgIT09IDEpIHJldHVybjtcbiAgICAgICAgICAvKjo6IGlmICghKGNoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB0aHJvdyBuZXcgRXJyb3IoKSAqL1xuXG4gICAgICAgICAgdmFyIGNoaWxkRWMgPSBvdXRwdXRFY3MuZ2V0KGNoaWxkKTtcbiAgICAgICAgICBpZiAoIWNoaWxkRWMpIHJldHVybjtcbiAgICAgICAgICBvdXRwdXRFY3NbXCJkZWxldGVcIl0oY2hpbGQpO1xuICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKGNoaWxkRWMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlc0hhbmRsZXIobXV0YXRpb25zKSB7XG4gICAgICAgICAgaWYgKG11dGF0aW9ucy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBJZiBhbnkgcmVtb3ZhbHMgYXJlIGZvbGxvd2VkIGJ5IGEgcmUtYWRkLCB0aGVuIGRyb3AgdGhlIHBhaXIuXG4gICAgICAgICAgICB2YXIgcmVtb3ZlZEVscyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgIHZhciBhZGRlZEVscyA9IFtdO1xuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICAgICAgdmFyIGFkZGVkTm9kZXMgPSBfcmVmLmFkZGVkTm9kZXMsXG4gICAgICAgICAgICAgICAgICByZW1vdmVkTm9kZXMgPSBfcmVmLnJlbW92ZWROb2RlcztcblxuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcmVtb3ZlZE5vZGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9lbCA9IHJlbW92ZWROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoX2VsLm5vZGVUeXBlICE9PSAxKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICByZW1vdmVkRWxzLmFkZChyZW1vdmVkTm9kZXNbaV0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfbGVuID0gYWRkZWROb2Rlcy5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBfZWwyID0gYWRkZWROb2Rlc1tfaV07XG4gICAgICAgICAgICAgICAgaWYgKF9lbDIubm9kZVR5cGUgIT09IDEpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlbW92ZWRFbHMuaGFzKF9lbDIpKSB7XG4gICAgICAgICAgICAgICAgICByZW1vdmVkRWxzW1wiZGVsZXRlXCJdKF9lbDIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhZGRlZEVscy5wdXNoKF9lbDIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhZGRlZEVscy5mb3JFYWNoKGFkZGVkTm9kZSk7XG4gICAgICAgICAgICByZW1vdmVkRWxzLmZvckVhY2gocmVtb3ZlZE5vZGUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcbiAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChtdXRhdGlvbi5hZGRlZE5vZGVzLCBhZGRlZE5vZGUpO1xuICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG11dGF0aW9uLnJlbW92ZWROb2RlcywgcmVtb3ZlZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlYy5lbC5jaGlsZHJlbiwgYWRkZWROb2RlKTtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2hhbmdlc0hhbmRsZXIpO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGVjLmVsLCB7XG4gICAgICAgICAgY2hpbGRMaXN0OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBpbnB1dEVudHJpZXMuc2V0KGVjLCB7XG4gICAgICAgICAgb2JzZXJ2ZXI6IG9ic2VydmVyLFxuICAgICAgICAgIHJlbW92ZWROb2RlOiByZW1vdmVkTm9kZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVtb3ZlZEVjKGVjKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IGlucHV0RW50cmllcy5nZXQoZWMpO1xuICAgICAgICBpZiAoIWVudHJ5KSB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgaGFwcGVuOiBVbnNlZW4gRWxlbWVudENvbnRleHQgcmVtb3ZlZCcpO1xuICAgICAgICBlbnRyeS5vYnNlcnZlci50YWtlUmVjb3JkcygpLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChtdXRhdGlvbi5yZW1vdmVkTm9kZXMsIGVudHJ5LnJlbW92ZWROb2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVudHJ5Lm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlYy5lbC5jaGlsZHJlbiwgZW50cnkucmVtb3ZlZE5vZGUpO1xuICAgICAgICBpbnB1dEVudHJpZXNbXCJkZWxldGVcIl0oZWMpO1xuICAgICAgfVxuXG4gICAgICB2YXIgc3ViID0gaW5wdXQuc3Vic2NyaWJlKHtcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICAgIGlucHV0LnZhbHVlcygpLmZvckVhY2gobmV3RWMpO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KGNoYW5nZXMpIHtcbiAgICAgICAgICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS50eXBlID09PSAnYWRkJykge1xuICAgICAgICAgICAgICBuZXdFYyhjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgcmVtb3ZlZEVjKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIGlucHV0RW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gX3JlZjIub2JzZXJ2ZXI7XG4gICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHB1bGxDaGFuZ2VzOiBmdW5jdGlvbiBwdWxsQ2hhbmdlcygpIHtcbiAgICAgICAgICBzdWIucHVsbENoYW5nZXMoKTsgLy8gRG9uJ3QgYm90aGVyIGRvaW5nIG9ic2VydmVyLnRha2VSZWNvcmRzKCksIHdlIGRvbid0IG5lZWQgdGhhdCBpblxuICAgICAgICAgIC8vIFBhZ2VQYXJzZXJUcmVlIGZvciBob3cgd2UgdXNlIHB1bGxDaGFuZ2VzKCkuXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2F0Y2hGaWx0ZXJlZENoaWxkcmVuLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gd2F0Y2hNdXRhdGlvbnM7XG5cbnZhciBfbGl2ZVNldCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcImxpdmUtc2V0XCIpKTtcblxuZnVuY3Rpb24gd2F0Y2hNdXRhdGlvbnMoaW5wdXQsIGF0dHJpYnV0ZUZpbHRlciwgY29uZEZuKSB7XG4gIHJldHVybiBuZXcgX2xpdmVTZXRbXCJkZWZhdWx0XCJdKHtcbiAgICBzY2hlZHVsZXI6IGlucHV0LmdldFNjaGVkdWxlcigpLFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICB9LFxuICAgIGxpc3RlbjogZnVuY3Rpb24gbGlzdGVuKHNldFZhbHVlcywgY29udHJvbGxlcikge1xuICAgICAgc2V0VmFsdWVzKG5ldyBTZXQoKSk7XG4gICAgICB2YXIgZW50cmllcyA9IG5ldyBNYXAoKTtcblxuICAgICAgZnVuY3Rpb24gbmV3RWMoZWMpIHtcbiAgICAgICAgdmFyIG1vID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgICBpZiAoY2hhbmdlcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICAgIGlmIChjb25kRm4oZWMuZWwpKSB7XG4gICAgICAgICAgICBpZiAoIWVudHJ5LnBhc3NlZCkge1xuICAgICAgICAgICAgICBlbnRyeS5wYXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBjb250cm9sbGVyLmFkZChlYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlbnRyeS5wYXNzZWQpIHtcbiAgICAgICAgICAgICAgZW50cnkucGFzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKGVjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZW50cnkgPSB7XG4gICAgICAgICAgbW86IG1vLFxuICAgICAgICAgIHBhc3NlZDogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY29uZEZuKGVjLmVsKSkge1xuICAgICAgICAgIGVudHJ5LnBhc3NlZCA9IHRydWU7XG4gICAgICAgICAgY29udHJvbGxlci5hZGQoZWMpO1xuICAgICAgICB9XG5cbiAgICAgICAgbW8ub2JzZXJ2ZShlYy5lbCwge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBhdHRyaWJ1dGVGaWx0ZXJcbiAgICAgICAgfSk7XG4gICAgICAgIGVudHJpZXMuc2V0KGVjLCBlbnRyeSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlbW92ZWRFYyhlYykge1xuICAgICAgICB2YXIgZW50cnkgPSBlbnRyaWVzLmdldChlYyk7XG4gICAgICAgIGlmICghZW50cnkpIHRocm93IG5ldyBFcnJvcignU2hvdWxkIG5vdCBoYXBwZW46IFVuc2VlbiBFbGVtZW50Q29udGV4dCByZW1vdmVkJyk7XG4gICAgICAgIGVudHJ5Lm1vLmRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBpZiAoZW50cnkucGFzc2VkKSB7XG4gICAgICAgICAgY29udHJvbGxlci5yZW1vdmUoZWMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZW50cmllc1tcImRlbGV0ZVwiXShlYyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdWIgPSBpbnB1dC5zdWJzY3JpYmUoe1xuICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgaW5wdXQudmFsdWVzKCkuZm9yRWFjaChuZXdFYyk7XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoY2hhbmdlcykge1xuICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdhZGQnKSB7XG4gICAgICAgICAgICAgIG5ld0VjKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZS50eXBlID09PSAncmVtb3ZlJykge1xuICAgICAgICAgICAgICByZW1vdmVkRWMoY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB1bnN1YnNjcmliZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbW8gPSBfcmVmLm1vO1xuICAgICAgICAgICAgbW8uZGlzY29ubmVjdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBwdWxsQ2hhbmdlczogZnVuY3Rpb24gcHVsbENoYW5nZXMoKSB7XG4gICAgICAgICAgc3ViLnB1bGxDaGFuZ2VzKCk7IC8vIERvbid0IGJvdGhlciBkb2luZyBvYnNlcnZlci50YWtlUmVjb3JkcygpLCB3ZSBkb24ndCBuZWVkIHRoYXQgaW5cbiAgICAgICAgICAvLyBQYWdlUGFyc2VyVHJlZSBmb3IgaG93IHdlIHVzZSBwdWxsQ2hhbmdlcygpLlxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdhdGNoTXV0YXRpb25zLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG52YXIgX2xpdmVTZXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsaXZlLXNldFwiKSk7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsaXZlLXNldC9tZXJnZVwiKSk7XG5cbnZhciBfZmxhdE1hcFIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsaXZlLXNldC9mbGF0TWFwUlwiKSk7XG5cbnZhciBfU2NoZWR1bGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwibGl2ZS1zZXQvU2NoZWR1bGVyXCIpKTtcblxudmFyIF90YWdUcmVlID0gcmVxdWlyZShcInRhZy10cmVlXCIpO1xuXG52YXIgX3dhdGNoZXJGaW5kZXJNZXJnZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3dhdGNoZXJGaW5kZXJNZXJnZXJcIikpO1xuXG52YXIgX2NyZWF0ZVRyYW5zZm9ybWVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9jcmVhdGVUcmFuc2Zvcm1lclwiKSk7XG5cbmZ1bmN0aW9uIG1ha2VUYWdPcHRpb25zKG9wdGlvbnMpIHtcbiAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIGxpc3QgPSBbXTtcbiAgT2JqZWN0LmtleXMob3B0aW9ucy50YWdzKS5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcbiAgICB2YXIgdGFnT3B0aW9ucyA9IG9wdGlvbnMudGFnc1t0YWddO1xuICAgIHZhciBvd25lZEJ5ID0gdGFnT3B0aW9ucy5vd25lZEJ5O1xuICAgIGxpc3QucHVzaCh7XG4gICAgICB0YWc6IHRhZyxcbiAgICAgIG93bmVkQnk6IG93bmVkQnlcbiAgICB9KTtcbiAgICBtYXAuc2V0KHRhZywgdGFnT3B0aW9ucyk7XG4gIH0pO1xuICBPYmplY3Qua2V5cyhvcHRpb25zLmZpbmRlcnMpLmNvbmNhdChvcHRpb25zLndhdGNoZXJzLm1hcChmdW5jdGlvbiAodykge1xuICAgIHJldHVybiB3LnRhZztcbiAgfSkpLmZvckVhY2goZnVuY3Rpb24gKHRhZykge1xuICAgIGlmICghbWFwLmhhcyh0YWcpKSB7XG4gICAgICBtYXAuc2V0KHRhZywge1xuICAgICAgICBvd25lZEJ5OiBbXVxuICAgICAgfSk7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICB0YWc6IHRhZ1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHtcbiAgICBtYXA6IG1hcCxcbiAgICBsaXN0OiBsaXN0XG4gIH07XG59XG5cbnZhciBQYWdlUGFyc2VyVHJlZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFBhZ2VQYXJzZXJUcmVlKHJvb3QsIG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazJbXCJkZWZhdWx0XCJdKSh0aGlzLCBQYWdlUGFyc2VyVHJlZSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh0aGlzLCBcInRyZWVcIiwgdm9pZCAwKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHRoaXMsIFwiX3NjaGVkdWxlclwiLCBuZXcgX1NjaGVkdWxlcltcImRlZmF1bHRcIl0oKSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh0aGlzLCBcIl90cmVlQ29udHJvbGxlclwiLCB2b2lkIDApO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyW1wiZGVmYXVsdFwiXSkodGhpcywgXCJfcm9vdE1hdGNoZWRTZXRcIiwgdm9pZCAwKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHRoaXMsIFwiX2VjU291cmNlc1wiLCB2b2lkIDApO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyW1wiZGVmYXVsdFwiXSkodGhpcywgXCJfbG9nRXJyb3JcIiwgdm9pZCAwKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHRoaXMsIFwiX29wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHRoaXMsIFwiX3RhZ09wdGlvbnNcIiwgdm9pZCAwKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5MltcImRlZmF1bHRcIl0pKHRoaXMsIFwiX3RhZ3NMaXN0XCIsIHZvaWQgMCk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTJbXCJkZWZhdWx0XCJdKSh0aGlzLCBcIl9zdWJzY3JpcHRpb25zXCIsIFtdKTtcbiAgICB2YXIgcm9vdEVsO1xuXG4gICAgaWYgKHJvb3Qubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfTk9ERSkge1xuICAgICAgcm9vdEVsID0gcm9vdC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBpZiAoIXJvb3RFbCkgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGRvY3VtZW50RWxlbWVudCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb290RWwgPSByb290O1xuICAgIH1cblxuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgdGhpcy5fbG9nRXJyb3IgPSBvcHRpb25zLmxvZ0Vycm9yIHx8IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9LCAwKTtcbiAgICB9O1xuXG4gICAgdmFyIF9tYWtlVGFnT3B0aW9ucyA9IG1ha2VUYWdPcHRpb25zKHRoaXMuX29wdGlvbnMpLFxuICAgICAgICB0YWdPcHRpb25zTWFwID0gX21ha2VUYWdPcHRpb25zLm1hcCxcbiAgICAgICAgdGFncyA9IF9tYWtlVGFnT3B0aW9ucy5saXN0O1xuXG4gICAgdGhpcy5fdGFnT3B0aW9ucyA9IHRhZ09wdGlvbnNNYXA7XG4gICAgdGhpcy5fdGFnc0xpc3QgPSB0YWdzO1xuICAgIHRoaXMudHJlZSA9IG5ldyBfdGFnVHJlZS5UYWdUcmVlKHtcbiAgICAgIHJvb3Q6IHJvb3RFbCxcbiAgICAgIHRhZ3M6IHRhZ3MsXG4gICAgICBleGVjdXRvcjogZnVuY3Rpb24gZXhlY3V0b3IoY29udHJvbGxlcikge1xuICAgICAgICBfdGhpcy5fdHJlZUNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX3Jvb3RNYXRjaGVkU2V0ID0gX2xpdmVTZXRbXCJkZWZhdWx0XCJdLmNvbnN0YW50KG5ldyBTZXQoW3tcbiAgICAgIGVsOiB0aGlzLnRyZWUuZ2V0VmFsdWUoKSxcbiAgICAgIHBhcmVudHM6IFt7XG4gICAgICAgIHRhZzogbnVsbCxcbiAgICAgICAgbm9kZTogdGhpcy50cmVlXG4gICAgICB9XVxuICAgIH1dKSwge1xuICAgICAgc2NoZWR1bGVyOiB0aGlzLl9zY2hlZHVsZXJcbiAgICB9KTtcblxuICAgIHRoaXMuX3NldHVwV2F0Y2hlcnNBbmRGaW5kZXJzKCk7XG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMltcImRlZmF1bHRcIl0pKFBhZ2VQYXJzZXJUcmVlLCBbe1xuICAgIGtleTogXCJfc2V0dXBXYXRjaGVyc0FuZEZpbmRlcnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldHVwV2F0Y2hlcnNBbmRGaW5kZXJzKCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciB0YWdzV2l0aFdhdGNoZXJzID0gbmV3IFNldCgpO1xuXG4gICAgICB0aGlzLl9vcHRpb25zLndhdGNoZXJzLmZvckVhY2goZnVuY3Rpb24gKHdhdGNoZXIpIHtcbiAgICAgICAgdGFnc1dpdGhXYXRjaGVycy5hZGQod2F0Y2hlci50YWcpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VjU291cmNlcyA9IG5ldyBNYXAodGhpcy5fdGFnc0xpc3QubWFwKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciB0YWcgPSBfcmVmLnRhZztcblxuICAgICAgICB2YXIgdGFnT3B0aW9ucyA9IF90aGlzMi5fdGFnT3B0aW9ucy5nZXQodGFnKTtcblxuICAgICAgICBpZiAoIXRhZ09wdGlvbnMpIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICB2YXIgb3duZWRCeSA9IG5ldyBTZXQodGFnT3B0aW9ucy5vd25lZEJ5IHx8IFtdKTtcblxuICAgICAgICB2YXIgX0xpdmVTZXQkYWN0aXZlID0gX2xpdmVTZXRbXCJkZWZhdWx0XCJdLmFjdGl2ZShudWxsLCB7XG4gICAgICAgICAgc2NoZWR1bGVyOiBfdGhpczIuX3NjaGVkdWxlclxuICAgICAgICB9KSxcbiAgICAgICAgICAgIGxpdmVTZXQgPSBfTGl2ZVNldCRhY3RpdmUubGl2ZVNldCxcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBfTGl2ZVNldCRhY3RpdmUuY29udHJvbGxlcjtcblxuICAgICAgICB2YXIgY29tYmluZWRXYXRjaGVyU2V0ID0gdGFnc1dpdGhXYXRjaGVycy5oYXModGFnKSA/ICgwLCBfZmxhdE1hcFJbXCJkZWZhdWx0XCJdKShsaXZlU2V0LCBmdW5jdGlvbiAocykge1xuICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KSA6IG51bGw7XG4gICAgICAgIHZhciBmaW5kZXIgPSBfdGhpczIuX29wdGlvbnMuZmluZGVyc1t0YWddO1xuICAgICAgICB2YXIgZWNzVG9UYWcgPSBmaW5kZXIgPyAoMCwgX3dhdGNoZXJGaW5kZXJNZXJnZXJbXCJkZWZhdWx0XCJdKShfdGhpczIuX3NjaGVkdWxlciwgX3RoaXMyLnRyZWUsIHRhZywgdGFnT3B0aW9ucywgY29tYmluZWRXYXRjaGVyU2V0LCBmaW5kZXIsIF90aGlzMi5fbG9nRXJyb3IpIDogY29tYmluZWRXYXRjaGVyU2V0IHx8IF9saXZlU2V0W1wiZGVmYXVsdFwiXS5jb25zdGFudChuZXcgU2V0KCksIHtcbiAgICAgICAgICBzY2hlZHVsZXI6IF90aGlzMi5fc2NoZWR1bGVyXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZWxlbWVudHNUb05vZGVzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRQYXJlbnROb2RlKHRhZ2dlZFBhcmVudHMpIHtcbiAgICAgICAgICB2YXIgcGFyZW50Tm9kZTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSB0YWdnZWRQYXJlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAodGFnZ2VkUGFyZW50c1tpXS50YWcgPT0gbnVsbCB8fCBvd25lZEJ5Lmhhcyh0YWdnZWRQYXJlbnRzW2ldLnRhZykpIHtcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHRhZ2dlZFBhcmVudHNbaV0ubm9kZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwYXJlbnROb2RlKSB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICByZXR1cm4gcGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlY1NldCA9IG5ldyBfbGl2ZVNldFtcImRlZmF1bHRcIl0oe1xuICAgICAgICAgIHNjaGVkdWxlcjogX3RoaXMyLl9zY2hlZHVsZXIsXG4gICAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oc2V0VmFsdWVzLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgbSA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgdmFyIGNiID0gZnVuY3Rpb24gY2IoZWMpIHtcbiAgICAgICAgICAgICAgdmFyIGVsID0gZWMuZWwsXG4gICAgICAgICAgICAgICAgICBwYXJlbnRzID0gZWMucGFyZW50cztcbiAgICAgICAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBmaW5kUGFyZW50Tm9kZShwYXJlbnRzKTtcblxuICAgICAgICAgICAgICB2YXIgbm9kZSA9IF90aGlzMi5fdHJlZUNvbnRyb2xsZXIuYWRkVGFnZ2VkVmFsdWUocGFyZW50Tm9kZSwgdGFnLCBlbCk7XG5cbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzVG9Ob2Rlcy5oYXMoZWwpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMyLl9sb2dFcnJvcihuZXcgRXJyb3IoXCJQYWdlUGFyc2VyVHJlZShcIi5jb25jYXQodGFnLCBcIikgd2F0Y2hlciByZWNlaXZlZCBlbGVtZW50IHR3aWNlXCIpKSwgZWwpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZWxlbWVudHNUb05vZGVzLnNldChlbCwgbm9kZSk7XG4gICAgICAgICAgICAgIHZhciBuZXdQYXJlbnRzID0gZWMucGFyZW50cy5jb25jYXQoW3tcbiAgICAgICAgICAgICAgICB0YWc6IHRhZyxcbiAgICAgICAgICAgICAgICBub2RlOiBub2RlXG4gICAgICAgICAgICAgIH1dKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBlbDogZWwsXG4gICAgICAgICAgICAgICAgcGFyZW50czogbmV3UGFyZW50c1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGVjc1RvVGFnLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICAgICAgICBlY3NUb1RhZy52YWx1ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gY2IodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgbS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIHMuYWRkKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZXMocyk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoY2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHZhciBlY3NSZW1vdmVkSW5Ob3RpZmljYXRpb24gPSBuZXcgU2V0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLnR5cGUgPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZWNzUmVtb3ZlZEluTm90aWZpY2F0aW9uLmFkZChjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS50eXBlID09PSAnYWRkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBwcm9jZXNzIGFkZHMgb2YgZWxlbWVudHMgdGhhdCBhcmUgcmVtb3ZlZCBieSBhIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSBpbiB0aGlzIG5vdGlmaWNhdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVjc1JlbW92ZWRJbk5vdGlmaWNhdGlvbi5oYXMoY2hhbmdlLnZhbHVlKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBjYihjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtLnNldChjaGFuZ2UudmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hZGQobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9uZXdWYWx1ZSA9IG0uZ2V0KGNoYW5nZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfbmV3VmFsdWUpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgbVtcImRlbGV0ZVwiXShjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZShfbmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IGVsZW1lbnRzVG9Ob2Rlcy5nZXQoX25ld1ZhbHVlLmVsKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlKSB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgaGFwcGVuOiByZWNlaXZlZCByZW1vdmFsIG9mIHVuc2VlbiBlbGVtZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzVG9Ob2Rlc1tcImRlbGV0ZVwiXShfbmV3VmFsdWUuZWwpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZVBhcmVudCA9IG5vZGUuZ2V0UGFyZW50KCk7IC8vIFRoZSBub2RlIG1pZ2h0IGhhdmUgYWxyZWFkeSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgdHJlZSBpZiBpdFxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBvd25lZCBieSBhIG5vZGUgdGhhdCB3YXMganVzdCByZW1vdmVkLlxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlUGFyZW50ICYmIG5vZGVQYXJlbnQub3duc05vZGUobm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuX3RyZWVDb250cm9sbGVyLnJlbW92ZVRhZ2dlZE5vZGUobm9kZVBhcmVudCwgdGFnLCBub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lbmQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfdGhpczIuX3N1YnNjcmlwdGlvbnMucHVzaChlY1NldC5zdWJzY3JpYmUoe30pKTtcblxuICAgICAgICByZXR1cm4gW3RhZywge1xuICAgICAgICAgIGxpdmVTZXQ6IGxpdmVTZXQsXG4gICAgICAgICAgY29udHJvbGxlcjogY29udHJvbGxlcixcbiAgICAgICAgICBlY1NldDogZWNTZXRcbiAgICAgICAgfV07XG4gICAgICB9KSk7XG5cbiAgICAgIHRoaXMuX29wdGlvbnMud2F0Y2hlcnMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgICAgdmFyIHNvdXJjZXMgPSBfcmVmMi5zb3VyY2VzLFxuICAgICAgICAgICAgc2VsZWN0b3JzID0gX3JlZjIuc2VsZWN0b3JzLFxuICAgICAgICAgICAgdGFnID0gX3JlZjIudGFnO1xuICAgICAgICB2YXIgc291cmNlU2V0cyA9IHNvdXJjZXMubWFwKGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgICBpZiAoIXRhZykgcmV0dXJuIF90aGlzMi5fcm9vdE1hdGNoZWRTZXQ7XG5cbiAgICAgICAgICB2YXIgZW50cnkgPSBfdGhpczIuX2VjU291cmNlcy5nZXQodGFnKTtcblxuICAgICAgICAgIGlmICghZW50cnkpIHRocm93IG5ldyBFcnJvcignVW5rbm93biBzb3VyY2U6ICcgKyB0YWcpO1xuICAgICAgICAgIHJldHVybiBlbnRyeS5lY1NldDtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzb3VyY2VTZXQgPSBzb3VyY2VTZXRzLmxlbmd0aCA9PT0gMSA/IHNvdXJjZVNldHNbMF0gOiAoMCwgX21lcmdlW1wiZGVmYXVsdFwiXSkoc291cmNlU2V0cyk7XG4gICAgICAgIHZhciB0cmFuc2Zvcm1lciA9ICgwLCBfY3JlYXRlVHJhbnNmb3JtZXJbXCJkZWZhdWx0XCJdKShfdGhpczIuX3NjaGVkdWxlciwgc2VsZWN0b3JzKTtcblxuICAgICAgICB2YXIgZWNFbnRyeSA9IF90aGlzMi5fZWNTb3VyY2VzLmdldCh0YWcpO1xuXG4gICAgICAgIGlmICghZWNFbnRyeSkgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIGVjRW50cnkuY29udHJvbGxlci5hZGQodHJhbnNmb3JtZXIoc291cmNlU2V0KSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fc2NoZWR1bGVyLmZsdXNoKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9kdW1wV2l0aG91dEVuZFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZHVtcFdpdGhvdXRFbmQoKSB7XG4gICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChzdWIpIHtcbiAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5sZW5ndGggPSAwO1xuICAgICAgdGhpcy50cmVlLmdldE93bmVkKCkuZm9yRWFjaChmdW5jdGlvbiAobGl2ZVNldCwgdGFnKSB7XG4gICAgICAgIGxpdmVTZXQudmFsdWVzKCkuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgIF90aGlzMy5fdHJlZUNvbnRyb2xsZXIucmVtb3ZlVGFnZ2VkTm9kZShfdGhpczMudHJlZSwgdGFnLCBub2RlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZHVtcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkdW1wKCkge1xuICAgICAgdGhpcy5fZHVtcFdpdGhvdXRFbmQoKTtcblxuICAgICAgdGhpcy5fdHJlZUNvbnRyb2xsZXIuZW5kKCk7XG4gICAgfSAvLyBJbnRlbmRlZCBmb3IgdXNlIHdpdGggaG90IG1vZHVsZSByZXBsYWNlbWVudC5cblxuICB9LCB7XG4gICAga2V5OiBcInJlcGxhY2VPcHRpb25zXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlcGxhY2VPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIHZhciB0YWdFcnJTdHIgPSAncmVwbGFjZU9wdGlvbnMgZG9lcyBub3Qgc3VwcG9ydCB0YWcgY2hhbmdlcyc7XG5cbiAgICAgIHZhciBfbWFrZVRhZ09wdGlvbnMyID0gbWFrZVRhZ09wdGlvbnMob3B0aW9ucyksXG4gICAgICAgICAgdGFnT3B0aW9uc01hcCA9IF9tYWtlVGFnT3B0aW9uczIubWFwO1xuXG4gICAgICBpZiAodGhpcy5fdGFnT3B0aW9ucy5zaXplICE9PSB0YWdPcHRpb25zTWFwLnNpemUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRhZ0VyclN0cik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3RhZ09wdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAob2xkT3B0aW9ucywgdGFnKSB7XG4gICAgICAgIHZhciBuZXdPcHRpb25zID0gdGFnT3B0aW9uc01hcC5nZXQodGFnKTtcbiAgICAgICAgaWYgKCFuZXdPcHRpb25zKSB0aHJvdyBuZXcgRXJyb3IodGFnRXJyU3RyKTtcbiAgICAgICAgdmFyIG9sZE93bmVkQnkgPSBvbGRPcHRpb25zLm93bmVkQnkgfHwgW107XG4gICAgICAgIHZhciBuZXdPd25lZEJ5ID0gbmV3IFNldChuZXdPcHRpb25zLm93bmVkQnkgfHwgW10pO1xuICAgICAgICBpZiAob2xkT3duZWRCeS5sZW5ndGggIT09IG5ld093bmVkQnkuc2l6ZSkgdGhyb3cgbmV3IEVycm9yKHRhZ0VyclN0cik7XG4gICAgICAgIG9sZE93bmVkQnkuZm9yRWFjaChmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgICAgaWYgKCFuZXdPd25lZEJ5Lmhhcyh0YWcpKSB0aHJvdyBuZXcgRXJyb3IodGFnRXJyU3RyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZHVtcFdpdGhvdXRFbmQoKTtcblxuICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG5cbiAgICAgIHRoaXMuX3NldHVwV2F0Y2hlcnNBbmRGaW5kZXJzKCk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBQYWdlUGFyc2VyVHJlZTtcbn0oKTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBQYWdlUGFyc2VyVHJlZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gd2F0Y2hlckZpbmRlck1lcmdlcjtcblxudmFyIF90eXBlb2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2ZcIikpO1xuXG52YXIgX2xpdmVTZXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsaXZlLXNldFwiKSk7XG5cbmZ1bmN0aW9uIHdhdGNoZXJGaW5kZXJNZXJnZXIoc2NoZWR1bGVyLCB0YWdUcmVlLCB0YWcsIHRhZ09wdGlvbnMsIHdhdGNoZXJTZXQsIGZpbmRlciwgbG9nRXJyb3IpIHtcbiAgcmV0dXJuIG5ldyBfbGl2ZVNldFtcImRlZmF1bHRcIl0oe1xuICAgIHNjaGVkdWxlcjogc2NoZWR1bGVyLFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBub3QgaGFwcGVuJyk7XG4gICAgfSxcbiAgICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3RlbihzZXRWYWx1ZXMsIGNvbnRyb2xsZXIpIHtcbiAgICAgIHZhciBjdXJyZW50RWxlbWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICB2YXIgY3VycmVudEVsZW1lbnRDb250ZXh0cyA9IG5ldyBTZXQoKTtcbiAgICAgIHZhciB3YXRjaGVyRm91bmRFbGVtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgIHZhciB3YXRjaGVyRm91bmRFbGVtZW50c01pc3NlZEJ5RmluZGVyID0gbmV3IFNldCgpO1xuICAgICAgdmFyIHN1YiA9IG51bGw7XG5cbiAgICAgIGlmICh3YXRjaGVyU2V0KSB7XG4gICAgICAgIHN1YiA9IHdhdGNoZXJTZXQuc3Vic2NyaWJlKHtcbiAgICAgICAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICBpZiAoIXdhdGNoZXJTZXQpIHRocm93IG5ldyBFcnJvcigpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZXMgPSB3YXRjaGVyU2V0LnZhbHVlcygpO1xuICAgICAgICAgICAgc2V0VmFsdWVzKGN1cnJlbnRWYWx1ZXMpO1xuICAgICAgICAgICAgY3VycmVudFZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChlYykge1xuICAgICAgICAgICAgICB3YXRjaGVyRm91bmRFbGVtZW50cy5hZGQoZWMuZWwpO1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudHMuYWRkKGVjLmVsKTtcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnRDb250ZXh0cy5hZGQoZWMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGNoYW5nZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hhbmdlKSB7XG4gICAgICAgICAgICAgIGlmIChjaGFuZ2UudHlwZSA9PT0gJ2FkZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2VsID0gY2hhbmdlLnZhbHVlLmVsO1xuICAgICAgICAgICAgICAgIHdhdGNoZXJGb3VuZEVsZW1lbnRzLmFkZChfZWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50cy5oYXMoX2VsKSkge1xuICAgICAgICAgICAgICAgICAgbG9nRXJyb3IobmV3IEVycm9yKFwiUGFnZVBhcnNlclRyZWUoXCIuY29uY2F0KHRhZywgXCIpIHdhdGNoZXIgZm91bmQgZWxlbWVudCBhbHJlYWR5IGZvdW5kIGJ5IGZpbmRlclwiKSksIF9lbCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50cy5hZGQoX2VsKTtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dHMuYWRkKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFkZChjaGFuZ2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2UudHlwZSA9PT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2VsMiA9IGNoYW5nZS52YWx1ZS5lbDtcbiAgICAgICAgICAgICAgICB3YXRjaGVyRm91bmRFbGVtZW50c1tcImRlbGV0ZVwiXShfZWwyKTtcbiAgICAgICAgICAgICAgICB3YXRjaGVyRm91bmRFbGVtZW50c01pc3NlZEJ5RmluZGVyW1wiZGVsZXRlXCJdKF9lbDIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50Q29udGV4dHMuaGFzKGNoYW5nZS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50c1tcImRlbGV0ZVwiXShfZWwyKTtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dHNbXCJkZWxldGVcIl0oY2hhbmdlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKGNoYW5nZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSAvLyBlbHNlIHRoZSBlYyB3YXMgYWRkZWQgYnkgZmluZGVyIGFuZCBpdCB3aWxsIGRlYWwgd2l0aCB0aGlzXG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKGVycik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gY29tcGxldGUoKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLmVuZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRWYWx1ZXMobmV3IFNldCgpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZpbmRlclNjaGVkdWxlID0gbnVsbDtcblxuICAgICAgaWYgKGZpbmRlcikge1xuICAgICAgICB2YXIgZm4gPSBmaW5kZXIuZm4sXG4gICAgICAgICAgICBpbnRlcnZhbCA9IGZpbmRlci5pbnRlcnZhbDtcbiAgICAgICAgdmFyIG93bmVkQnkgPSB0YWdPcHRpb25zLm93bmVkQnkgfHwgW107XG5cbiAgICAgICAgdmFyIHJ1bkZpbmRlciA9IGZ1bmN0aW9uIHJ1bkZpbmRlcigpIHtcbiAgICAgICAgICB2YXIgZmluZGVyUnVuRm91bmRFbGVtZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgICAgICB2YXIgZm91bmQgPSBmbih0YWdUcmVlLmdldFZhbHVlKCkpO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZvdW5kLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgX2VsMyA9IGZvdW5kW2ldO1xuICAgICAgICAgICAgZmluZGVyUnVuRm91bmRFbGVtZW50cy5hZGQoX2VsMyk7XG5cbiAgICAgICAgICAgIGlmICghY3VycmVudEVsZW1lbnRzLmhhcyhfZWwzKSkge1xuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudHMuYWRkKF9lbDMpO1xuICAgICAgICAgICAgICB2YXIgZWMgPSBtYWtlRWxlbWVudENvbnRleHQoX2VsMywgdGFnVHJlZSwgb3duZWRCeSk7XG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50Q29udGV4dHMuYWRkKGVjKTtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5hZGQoZWMpO1xuXG4gICAgICAgICAgICAgIGlmICh3YXRjaGVyU2V0KSB7XG4gICAgICAgICAgICAgICAgbG9nRXJyb3IobmV3IEVycm9yKFwiUGFnZVBhcnNlclRyZWUoXCIuY29uY2F0KHRhZywgXCIpIGZpbmRlciBmb3VuZCBlbGVtZW50IG1pc3NlZCBieSB3YXRjaGVyXCIpKSwgX2VsMyk7XG4gICAgICAgICAgICAgICAgaWYgKHN1Yikgc3ViLnB1bGxDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50RWxlbWVudENvbnRleHRzLmZvckVhY2goZnVuY3Rpb24gKGVjKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBlYy5lbDtcblxuICAgICAgICAgICAgaWYgKCFmaW5kZXJSdW5Gb3VuZEVsZW1lbnRzLmhhcyhlbCkpIHtcbiAgICAgICAgICAgICAgaWYgKHdhdGNoZXJGb3VuZEVsZW1lbnRzLmhhcyhlbCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXdhdGNoZXJGb3VuZEVsZW1lbnRzTWlzc2VkQnlGaW5kZXIuaGFzKGVsKSkge1xuICAgICAgICAgICAgICAgICAgd2F0Y2hlckZvdW5kRWxlbWVudHNNaXNzZWRCeUZpbmRlci5hZGQoZWwpO1xuICAgICAgICAgICAgICAgICAgbG9nRXJyb3IobmV3IEVycm9yKFwiUGFnZVBhcnNlclRyZWUoXCIuY29uY2F0KHRhZywgXCIpIHdhdGNoZXIgZm91bmQgZWxlbWVudCBtaXNzZWQgYnkgZmluZGVyXCIpKSwgZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudENvbnRleHRzW1wiZGVsZXRlXCJdKGVjKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudHNbXCJkZWxldGVcIl0oZWwpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKGVjKTtcbiAgICAgICAgICAgICAgICBpZiAoc3ViKSBzdWIucHVsbENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNjaGVkdWxlci5mbHVzaCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZpbmRlclNjaGVkdWxlID0gc2NoZWR1bGVSZXBlYXRpbmdGaW5kZXIoaW50ZXJ2YWwsIGN1cnJlbnRFbGVtZW50cywgcnVuRmluZGVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdW5zdWJzY3JpYmU6IGZ1bmN0aW9uIHVuc3Vic2NyaWJlKCkge1xuICAgICAgICAgIGlmIChmaW5kZXJTY2hlZHVsZSAhPSBudWxsKSBmaW5kZXJTY2hlZHVsZS5kaXNwb3NlKCk7XG4gICAgICAgICAgaWYgKHN1Yikgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHB1bGxDaGFuZ2VzOiBmdW5jdGlvbiBwdWxsQ2hhbmdlcygpIHtcbiAgICAgICAgICBpZiAoc3ViKSBzdWIucHVsbENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzY2hlZHVsZVJlcGVhdGluZ0ZpbmRlcihpbnRlcnZhbCwgY3VycmVudEVsZW1lbnRzLCBydW5GaW5kZXIpIHtcbiAgdmFyIGZpbmRlclN0YXJ0ZWRUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICB2YXIgdGltZW91dEhhbmRsZSA9IG51bGw7XG4gIHZhciBpZGxlSGFuZGxlID0gbnVsbDtcblxuICB2YXIgc3RlcCA9IGZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgaWRsZUhhbmRsZSA9IG51bGw7XG4gICAgcnVuRmluZGVyKCk7XG4gICAgc2NoZWR1bGVOZXh0U3RlcCgpO1xuICB9O1xuXG4gIHZhciBzY2hlZHVsZU5leHRTdGVwID0gZnVuY3Rpb24gc2NoZWR1bGVOZXh0U3RlcCgpIHtcbiAgICB2YXIgdGltZTtcblxuICAgIGlmIChpbnRlcnZhbCA9PSBudWxsKSB7XG4gICAgICB0aW1lID0gNTAwMCArIE1hdGgucmFuZG9tKCkgKiAxMDAwO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGludGVydmFsID09PSAnbnVtYmVyJykge1xuICAgICAgdGltZSA9IGludGVydmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGludGVydmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aW1lID0gaW50ZXJ2YWwoY3VycmVudEVsZW1lbnRzLnNpemUsIERhdGUubm93KCkgLSBmaW5kZXJTdGFydGVkVGltZXN0YW1wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW50ZXJ2YWwgaGFzIHdyb25nIHR5cGU6IFwiLmNvbmNhdCgoMCwgX3R5cGVvZjJbXCJkZWZhdWx0XCJdKShpbnRlcnZhbCkpKTtcbiAgICB9IC8vIEFzc2VydCB0byBGbG93IHRoYXQgYWxsIHBhdGhzIHNob3VsZCBoYXZlIHNldCB0aW1lIHRvIGEgbnVtYmVyLlxuXG5cbiAgICB0aW1lO1xuXG4gICAgaWYgKHRpbWUgPT09IEluZmluaXR5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdGltZW91dEhhbmRsZSA9IG51bGw7XG5cbiAgICAgIGlmIChnbG9iYWwucmVxdWVzdElkbGVDYWxsYmFjayAmJiBnbG9iYWwuY2FuY2VsSWRsZUNhbGxiYWNrKSB7XG4gICAgICAgIC8vIFdhaXQgdXAgdG8gYHRpbWVgIG1pbGxpc2Vjb25kcyBhZ2FpbiB1bnRpbCB0aGVyZSdzIGFuIGlkbGUgbW9tZW50LlxuICAgICAgICBpZGxlSGFuZGxlID0gZ2xvYmFsLnJlcXVlc3RJZGxlQ2FsbGJhY2soc3RlcCwge1xuICAgICAgICAgIHRpbWVvdXQ6IHRpbWVcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGVwKCk7XG4gICAgICB9XG4gICAgfSwgdGltZSk7XG4gIH07XG5cbiAgc2NoZWR1bGVOZXh0U3RlcCgpO1xuICByZXR1cm4ge1xuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICBpZiAodGltZW91dEhhbmRsZSAhPSBudWxsKSBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICBpZiAoaWRsZUhhbmRsZSAhPSBudWxsKSBnbG9iYWwuY2FuY2VsSWRsZUNhbGxiYWNrKGlkbGVIYW5kbGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gbWFrZUVsZW1lbnRDb250ZXh0KGVsLCB0YWdUcmVlLCBvd25lZEJ5KSB7XG4gIC8vIERvbid0IGNvbXB1dGUgcGFyZW50cyB1bnRpbCBpdCdzIHJlYWQgZnJvbS5cbiAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgYmVjYXVzZSBub2RlcyBhcmVuJ3QgYWRkZWQgdG8gdGhlIHRhZyB0cmVlIHVudGlsXG4gIC8vIFBhZ2VQYXJzZXJUcmVlIGl0ZXJhdGVzIG92ZXIgdGhlIHJlc3VsdHMsIGFuZCBzb21lIG9mIHRoZXNlIG5vZGVzIG1heSBiZVxuICAvLyBvd25lZCBieSBlYWNoIG90aGVyLlxuICB2YXIgX2NhY2hlZFBhcmVudHMgPSBudWxsO1xuICByZXR1cm4ge1xuICAgIGVsOiBlbCxcblxuICAgIGdldCBwYXJlbnRzKCkge1xuICAgICAgaWYgKCFfY2FjaGVkUGFyZW50cykge1xuICAgICAgICB2YXIgcm9vdCA9IHRhZ1RyZWUuZ2V0VmFsdWUoKTtcbiAgICAgICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBlbC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICAgICAgdmFyIHRhZ1RyZWVOb2RlcyA9IHRhZ1RyZWUuZ2V0Tm9kZXNGb3JWYWx1ZShjdXJyZW50KTtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0YWdUcmVlTm9kZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gdGFnVHJlZU5vZGVzW2ldO1xuICAgICAgICAgICAgdmFyIHRhZyA9IG5vZGUuZ2V0VGFnKCk7XG5cbiAgICAgICAgICAgIGlmICh0YWcgPT0gbnVsbCB8fCBvd25lZEJ5LmluZGV4T2YodGFnKSA+PSAwKSB7XG4gICAgICAgICAgICAgIHBhcmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnOiB0YWcsXG4gICAgICAgICAgICAgICAgbm9kZTogbm9kZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGN1cnJlbnQgPT09IHJvb3QpIGJyZWFrO1xuICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJlbnRzLnJldmVyc2UoKTtcbiAgICAgICAgX2NhY2hlZFBhcmVudHMgPSBwYXJlbnRzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gX2NhY2hlZFBhcmVudHM7XG4gICAgfVxuXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdhdGNoZXJGaW5kZXJNZXJnZXIuanMubWFwIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuaW1wb3J0IHBvbnlmaWxsIGZyb20gJy4vcG9ueWZpbGwuanMnO1xuXG52YXIgcm9vdDtcblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gcG9ueWZpbGwocm9vdCk7XG5leHBvcnQgZGVmYXVsdCByZXN1bHQ7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1ib2xPYnNlcnZhYmxlUG9ueWZpbGwocm9vdCkge1xuXHR2YXIgcmVzdWx0O1xuXHR2YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoU3ltYm9sLm9ic2VydmFibGUpIHtcblx0XHRcdHJlc3VsdCA9IFN5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdFN5bWJvbC5vYnNlcnZhYmxlID0gcmVzdWx0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSAnQEBvYnNlcnZhYmxlJztcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIikpO1xuXG52YXIgX2NyZWF0ZUNsYXNzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIikpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuXCIpKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldFByb3RvdHlwZU9mXCIpKTtcblxudmFyIF9pbmhlcml0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzXCIpKTtcblxudmFyIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3NlcnRUaGlzSW5pdGlhbGl6ZWRcIikpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHlcIikpO1xuXG52YXIgX2xpdmVTZXQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJsaXZlLXNldFwiKSk7XG5cbnZhciBfVGFnVHJlZU5vZGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9UYWdUcmVlTm9kZVwiKSk7XG5cbnZhciBFTVBUWV9BUlJBWSA9IE9iamVjdC5mcmVlemUoW10pO1xuXG52YXIgVGFnVHJlZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX1RhZ1RyZWVOb2RlKSB7XG4gICgwLCBfaW5oZXJpdHMyLmRlZmF1bHQpKFRhZ1RyZWUsIF9UYWdUcmVlTm9kZSk7XG5cbiAgZnVuY3Rpb24gVGFnVHJlZShpbml0KSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazIuZGVmYXVsdCkodGhpcywgVGFnVHJlZSk7XG4gICAgdmFyIHJvb3ROb2RlQ29udHJvbGxlcjtcbiAgICBfdGhpcyA9ICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjIuZGVmYXVsdCkodGhpcywgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoVGFnVHJlZSkuY2FsbCh0aGlzLCB7XG4gICAgICB2YWx1ZTogaW5pdC5yb290LFxuICAgICAgcGFyZW50OiBudWxsLFxuICAgICAgb3duZWRUYWdzOiBuZXcgU2V0KGluaXQudGFncy5tYXAoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIHRhZyA9IF9yZWYudGFnO1xuICAgICAgICByZXR1cm4gdGFnO1xuICAgICAgfSkpLFxuICAgICAgZXhlY3V0b3I6IGZ1bmN0aW9uIGV4ZWN1dG9yKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgcm9vdE5vZGVDb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyLmRlZmF1bHQpKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMi5kZWZhdWx0KShfdGhpcykpLCBcIl9ub2RlQ29udHJvbGxlcnNcIiwgbmV3IE1hcCgpKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDIuZGVmYXVsdCkoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyLmRlZmF1bHQpKF90aGlzKSksIFwiX2xvb2t1cFRhYmxlXCIsIHZvaWQgMCk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyLmRlZmF1bHQpKCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMi5kZWZhdWx0KShfdGhpcykpLCBcIl9hbGxCeVRhZ1wiLCB2b2lkIDApO1xuICAgIGlmICghcm9vdE5vZGVDb250cm9sbGVyKSB0aHJvdyBuZXcgRXJyb3IoKTtcblxuICAgIF90aGlzLl9ub2RlQ29udHJvbGxlcnMuc2V0KCgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMi5kZWZhdWx0KSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDIuZGVmYXVsdCkoX3RoaXMpKSwgcm9vdE5vZGVDb250cm9sbGVyKTtcblxuICAgIF90aGlzLl9sb29rdXBUYWJsZSA9IG5ldyBNYXAoW1tpbml0LnJvb3QsIFsoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDIuZGVmYXVsdCkoKDAsIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQyLmRlZmF1bHQpKF90aGlzKSldXV0pO1xuICAgIF90aGlzLl9hbGxCeVRhZyA9IG5ldyBNYXAoKTtcbiAgICBpbml0LnRhZ3MuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciB0YWcgPSBfcmVmMi50YWc7XG5cbiAgICAgIHZhciBfTGl2ZVNldCRhY3RpdmUgPSBfbGl2ZVNldC5kZWZhdWx0LmFjdGl2ZSgpLFxuICAgICAgICAgIGxpdmVTZXQgPSBfTGl2ZVNldCRhY3RpdmUubGl2ZVNldCxcbiAgICAgICAgICBjb250cm9sbGVyID0gX0xpdmVTZXQkYWN0aXZlLmNvbnRyb2xsZXI7XG5cbiAgICAgIGlmIChfdGhpcy5fYWxsQnlUYWcuaGFzKHRhZykpIHRocm93IG5ldyBFcnJvcignVGFnIHNwZWNpZmllZCB0d2ljZTogJyArIHRhZyk7XG5cbiAgICAgIF90aGlzLl9hbGxCeVRhZy5zZXQodGFnLCB7XG4gICAgICAgIG93bmVkVGFnczogbmV3IFNldCgpLFxuICAgICAgICBsaXZlU2V0OiBsaXZlU2V0LFxuICAgICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpbml0LnRhZ3MuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjMpIHtcbiAgICAgIHZhciB0YWcgPSBfcmVmMy50YWcsXG4gICAgICAgICAgb3duZWRCeSA9IF9yZWYzLm93bmVkQnk7XG4gICAgICBpZiAoIW93bmVkQnkpIHJldHVybjtcbiAgICAgIG93bmVkQnkuZm9yRWFjaChmdW5jdGlvbiAob3duaW5nVGFnKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IF90aGlzLl9hbGxCeVRhZy5nZXQob3duaW5nVGFnKTtcblxuICAgICAgICBpZiAoIWVudHJ5KSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIG93bmVkQnkgdmFsdWUgZm9yIFwiLmNvbmNhdCh0YWcsIFwiOiBcIikuY29uY2F0KG93bmluZ1RhZykpO1xuICAgICAgICBlbnRyeS5vd25lZFRhZ3MuYWRkKHRhZyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgY29udHJvbGxlciA9IHtcbiAgICAgIHRyZWU6ICgwLCBfYXNzZXJ0VGhpc0luaXRpYWxpemVkMi5kZWZhdWx0KSgoMCwgX2Fzc2VydFRoaXNJbml0aWFsaXplZDIuZGVmYXVsdCkoX3RoaXMpKSxcbiAgICAgIGFkZFRhZ2dlZFZhbHVlOiBmdW5jdGlvbiBhZGRUYWdnZWRWYWx1ZShwYXJlbnQsIHRhZywgdmFsdWUpIHtcbiAgICAgICAgdmFyIHRhZ0VudHJ5ID0gX3RoaXMuX2FsbEJ5VGFnLmdldCh0YWcpO1xuXG4gICAgICAgIGlmICghdGFnRW50cnkpIHRocm93IG5ldyBFcnJvcihcInVua25vd24gdGFnOiBcIi5jb25jYXQodGFnKSk7XG4gICAgICAgIHZhciBjb250cm9sbGVyO1xuICAgICAgICB2YXIgbm9kZSA9IG5ldyBfVGFnVHJlZU5vZGUyLmRlZmF1bHQoe1xuICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBvd25lZFRhZ3M6IHRhZ0VudHJ5Lm93bmVkVGFncyxcbiAgICAgICAgICBleGVjdXRvcjogZnVuY3Rpb24gZXhlY3V0b3IoX2NvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBfY29udHJvbGxlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNvbnRyb2xsZXIpIHRocm93IG5ldyBFcnJvcigpO1xuXG4gICAgICAgIF90aGlzLl9ub2RlQ29udHJvbGxlcnMuc2V0KG5vZGUsIGNvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRhZ0VudHJ5LmNvbnRyb2xsZXIuYWRkKG5vZGUpO1xuXG4gICAgICAgIHZhciB2YWx1ZU5vZGVzID0gX3RoaXMuX2xvb2t1cFRhYmxlLmdldCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZhbHVlTm9kZXMpIHtcbiAgICAgICAgICB2YWx1ZU5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXMuX2xvb2t1cFRhYmxlLnNldCh2YWx1ZSwgW25vZGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwYXJlbnRDb250cm9sbGVyID0gX3RoaXMuX25vZGVDb250cm9sbGVycy5nZXQocGFyZW50KTtcblxuICAgICAgICBpZiAoIXBhcmVudENvbnRyb2xsZXIpIHRocm93IG5ldyBFcnJvcigncGFyZW50IGlzIG5vdCBwYXJ0IG9mIFRhZ1RyZWUnKTtcbiAgICAgICAgcGFyZW50Q29udHJvbGxlci5hZGRPd25lZE5vZGUodGFnLCBub2RlKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlVGFnZ2VkTm9kZTogZnVuY3Rpb24gcmVtb3ZlVGFnZ2VkTm9kZShwYXJlbnQsIHRhZywgbm9kZSkge1xuICAgICAgICB2YXIgdGFnRW50cnkgPSBfdGhpcy5fYWxsQnlUYWcuZ2V0KHRhZyk7XG5cbiAgICAgICAgaWYgKCF0YWdFbnRyeSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0YWc6IFwiLmNvbmNhdCh0YWcpKTtcblxuICAgICAgICB2YXIgcGFyZW50Q29udHJvbGxlciA9IF90aGlzLl9ub2RlQ29udHJvbGxlcnMuZ2V0KHBhcmVudCk7XG5cbiAgICAgICAgaWYgKCFwYXJlbnRDb250cm9sbGVyKSB0aHJvdyBuZXcgRXJyb3IoJ3BhcmVudCBpcyBub3QgcGFydCBvZiBUYWdUcmVlJyk7XG4gICAgICAgIHZhciB2YWx1ZSA9IG5vZGUuZ2V0VmFsdWUoKTtcblxuICAgICAgICB2YXIgbm9kZXMgPSBfdGhpcy5fbG9va3VwVGFibGUuZ2V0KHZhbHVlKTtcblxuICAgICAgICBpZiAoIW5vZGVzKSB0aHJvdyBuZXcgRXJyb3IoJ25vZGUgd2FzIG1pc3NpbmcgZnJvbSBsb29rdXAgdGFibGUgYmVmb3JlIHJlbW92YWwnKTtcblxuICAgICAgICBpZiAobm9kZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHZhciBpeCA9IG5vZGVzLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgaWYgKGl4IDwgMCkgdGhyb3cgbmV3IEVycm9yKCdub2RlIHdhcyBtaXNzaW5nIGZyb20gbGlzdCBpbiBsb29rdXAgdGFibGUgYmVmb3JlIHJlbW92YWwnKTtcbiAgICAgICAgICBub2Rlcy5zcGxpY2UoaXgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzLl9sb29rdXBUYWJsZS5kZWxldGUodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5nZXRPd25lZCgpLmZvckVhY2goZnVuY3Rpb24gKGxpdmVTZXQsIHRhZykge1xuICAgICAgICAgIGxpdmVTZXQudmFsdWVzKCkuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGROb2RlKSB7XG4gICAgICAgICAgICBjb250cm9sbGVyLnJlbW92ZVRhZ2dlZE5vZGUobm9kZSwgdGFnLCBjaGlsZE5vZGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGFnRW50cnkuY29udHJvbGxlci5yZW1vdmUobm9kZSk7XG4gICAgICAgIHBhcmVudENvbnRyb2xsZXIucmVtb3ZlT3duZWROb2RlKHRhZywgbm9kZSk7XG5cbiAgICAgICAgX3RoaXMuX25vZGVDb250cm9sbGVycy5kZWxldGUobm9kZSk7XG4gICAgICB9LFxuICAgICAgZW5kOiBmdW5jdGlvbiBlbmQoKSB7XG4gICAgICAgIF90aGlzLl9ub2RlQ29udHJvbGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udHJvbGxlcikge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZW5kKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF90aGlzLl9hbGxCeVRhZy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgICAgIHZhciBjb250cm9sbGVyID0gX3JlZjQuY29udHJvbGxlcjtcbiAgICAgICAgICBjb250cm9sbGVyLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGluaXQuZXhlY3V0b3IoY29udHJvbGxlcik7XG5cbiAgICBpbml0LmV4ZWN1dG9yID0gZnVuY3Rpb24gKCkge307IC8vIHJlbGVhc2UgcmVmZXJlbmNlXG5cblxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MyLmRlZmF1bHQpKFRhZ1RyZWUsIFt7XG4gICAga2V5OiBcImdldE5vZGVzRm9yVmFsdWVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Tm9kZXNGb3JWYWx1ZSh2YWx1ZSkge1xuICAgICAgdmFyIGwgPSB0aGlzLl9sb29rdXBUYWJsZS5nZXQodmFsdWUpO1xuXG4gICAgICByZXR1cm4gbCA/IE9iamVjdC5mcmVlemUobC5zbGljZSgpKSA6IEVNUFRZX0FSUkFZO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRBbGxCeVRhZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbGxCeVRhZyh0YWcpIHtcbiAgICAgIHZhciBlbnRyeSA9IHRoaXMuX2FsbEJ5VGFnLmdldCh0YWcpO1xuXG4gICAgICBpZiAoIWVudHJ5KSB0aHJvdyBuZXcgRXJyb3IoXCJ0YWcgZG9lcyBub3QgZXhpc3QgaW4gVGFnVHJlZTogXCIuY29uY2F0KHRhZykpO1xuICAgICAgcmV0dXJuIGVudHJ5LmxpdmVTZXQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldEFsbFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbGwoKSB7XG4gICAgICB2YXIgbSA9IG5ldyBNYXAoKTtcblxuICAgICAgdGhpcy5fYWxsQnlUYWcuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjUsIHRhZykge1xuICAgICAgICB2YXIgbGl2ZVNldCA9IF9yZWY1LmxpdmVTZXQ7XG4gICAgICAgIG0uc2V0KHRhZywgbGl2ZVNldCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG07XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUYWdUcmVlO1xufShfVGFnVHJlZU5vZGUyLmRlZmF1bHQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUYWdUcmVlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlVWVdkVWNtVmxMbXB6SWwwc0ltNWhiV1Z6SWpwYklrVk5VRlJaWDBGU1VrRlpJaXdpVDJKcVpXTjBJaXdpWm5KbFpYcGxJaXdpVkdGblZISmxaU0lzSW1sdWFYUWlMQ0p5YjI5MFRtOWtaVU52Ym5SeWIyeHNaWElpTENKMllXeDFaU0lzSW5KdmIzUWlMQ0p3WVhKbGJuUWlMQ0p2ZDI1bFpGUmhaM01pTENKVFpYUWlMQ0owWVdkeklpd2liV0Z3SWl3aWRHRm5JaXdpWlhobFkzVjBiM0lpTENKamIyNTBjbTlzYkdWeUlpd2lUV0Z3SWl3aVJYSnliM0lpTENKZmJtOWtaVU52Ym5SeWIyeHNaWEp6SWl3aWMyVjBJaXdpWDJ4dmIydDFjRlJoWW14bElpd2lYMkZzYkVKNVZHRm5JaXdpWm05eVJXRmphQ0lzSWt4cGRtVlRaWFFpTENKaFkzUnBkbVVpTENKc2FYWmxVMlYwSWl3aWFHRnpJaXdpYjNkdVpXUkNlU0lzSW05M2JtbHVaMVJoWnlJc0ltVnVkSEo1SWl3aVoyVjBJaXdpWVdSa0lpd2lkSEpsWlNJc0ltRmtaRlJoWjJkbFpGWmhiSFZsSWl3aWRHRm5SVzUwY25raUxDSnViMlJsSWl3aVZHRm5WSEpsWlU1dlpHVWlMQ0pmWTI5dWRISnZiR3hsY2lJc0luWmhiSFZsVG05a1pYTWlMQ0p3ZFhOb0lpd2ljR0Z5Wlc1MFEyOXVkSEp2Ykd4bGNpSXNJbUZrWkU5M2JtVmtUbTlrWlNJc0luSmxiVzkyWlZSaFoyZGxaRTV2WkdVaUxDSm5aWFJXWVd4MVpTSXNJbTV2WkdWeklpd2liR1Z1WjNSb0lpd2lhWGdpTENKcGJtUmxlRTltSWl3aWMzQnNhV05sSWl3aVpHVnNaWFJsSWl3aVoyVjBUM2R1WldRaUxDSjJZV3gxWlhNaUxDSmphR2xzWkU1dlpHVWlMQ0p5WlcxdmRtVWlMQ0p5WlcxdmRtVlBkMjVsWkU1dlpHVWlMQ0psYm1RaUxDSnNJaXdpYzJ4cFkyVWlMQ0p0SWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3p0QlFVVkJPenRCUVVkQk96dEJRV2RDUVN4SlFVRk5RU3hYUVVGclFpeEhRVUZIUXl4TlFVRk5MRU5CUVVORExFMUJRVkFzUTBGQll5eEZRVUZrTEVOQlFUTkNPenRKUVVWeFFrTXNUenM3T3pzN1FVRlRia0lzYlVKQlFWbERMRWxCUVZvc1JVRkJhME03UVVGQlFUczdRVUZCUVR0QlFVTm9ReXhSUVVGSlF5eHJRa0ZCU2p0QlFVTkJMRFpIUVVGTk8wRkJRMHBETEUxQlFVRkJMRXRCUVVzc1JVRkJSVVlzU1VGQlNTeERRVUZEUnl4SlFVUlNPMEZCUlVwRExFMUJRVUZCTEUxQlFVMHNSVUZCUlN4SlFVWktPMEZCUjBwRExFMUJRVUZCTEZOQlFWTXNSVUZCUlN4SlFVRkpReXhIUVVGS0xFTkJRVkZPTEVsQlFVa3NRMEZCUTA4c1NVRkJUQ3hEUVVGVlF5eEhRVUZXTEVOQlFXTTdRVUZCUVN4WlFVRkZReXhIUVVGR0xGRkJRVVZCTEVkQlFVWTdRVUZCUVN4bFFVRlhRU3hIUVVGWU8wRkJRVUVzVDBGQlpDeERRVUZTTEVOQlNGQTdRVUZKU2tNc1RVRkJRVUVzVVVGQlVTeEZRVUZGTEd0Q1FVRkRReXhWUVVGRUxFVkJRV2RDTzBGQlEzaENWaXhSUVVGQlFTeHJRa0ZCYTBJc1IwRkJSMVVzVlVGQmNrSTdRVUZEUkR0QlFVNUhMRXRCUVU0N1FVRkdaME1zZVVsQlVtZERMRWxCUVVsRExFZEJRVW9zUlVGUmFFTTdRVUZCUVR0QlFVRkJPMEZCVldoRExGRkJRVWtzUTBGQlExZ3NhMEpCUVV3c1JVRkJlVUlzVFVGQlRTeEpRVUZKV1N4TFFVRktMRVZCUVU0N08wRkJRM3BDTEZWQlFVdERMR2RDUVVGTUxFTkJRWE5DUXl4SFFVRjBRaXh2UmtGQlowTmtMR3RDUVVGb1F6czdRVUZGUVN4VlFVRkxaU3haUVVGTUxFZEJRVzlDTEVsQlFVbEtMRWRCUVVvc1EwRkJVU3hEUVVGRExFTkJRVU5hTEVsQlFVa3NRMEZCUTBjc1NVRkJUaXhGUVVGWkxHMUdRVUZhTEVOQlFVUXNRMEZCVWl4RFFVRndRanRCUVVWQkxGVkJRVXRqTEZOQlFVd3NSMEZCYVVJc1NVRkJTVXdzUjBGQlNpeEZRVUZxUWp0QlFVTkJXaXhKUVVGQlFTeEpRVUZKTEVOQlFVTlBMRWxCUVV3c1EwRkJWVmNzVDBGQlZpeERRVUZyUWl4cFFrRkJWenRCUVVGQkxGVkJRVlJVTEVkQlFWTXNVMEZCVkVFc1IwRkJVenM3UVVGQlFTdzBRa0ZEUjFVc2FVSkJRVkZETEUxQlFWSXNSVUZFU0R0QlFVRkJMRlZCUTNCQ1F5eFBRVVJ2UWl4dFFrRkRjRUpCTEU5QlJHOUNPMEZCUVVFc1ZVRkRXRllzVlVGRVZ5eHRRa0ZEV0VFc1ZVRkVWenM3UVVGRk0wSXNWVUZCU1N4TlFVRkxUU3hUUVVGTUxFTkJRV1ZMTEVkQlFXWXNRMEZCYlVKaUxFZEJRVzVDTEVOQlFVb3NSVUZCTmtJc1RVRkJUU3hKUVVGSlNTeExRVUZLTEVOQlFWVXNNRUpCUVhkQ1NpeEhRVUZzUXl4RFFVRk9PenRCUVVNM1FpeFpRVUZMVVN4VFFVRk1MRU5CUVdWR0xFZEJRV1lzUTBGQmJVSk9MRWRCUVc1Q0xFVkJRWGRDTzBGQlFVTktMRkZCUVVGQkxGTkJRVk1zUlVGQlJTeEpRVUZKUXl4SFFVRktMRVZCUVZvN1FVRkJkVUpsTEZGQlFVRkJMRTlCUVU4c1JVRkJVRUVzVDBGQmRrSTdRVUZCWjBOV0xGRkJRVUZCTEZWQlFWVXNSVUZCVmtFN1FVRkJhRU1zVDBGQmVFSTdRVUZEUkN4TFFVcEVPMEZCVFVGWUxFbEJRVUZCTEVsQlFVa3NRMEZCUTA4c1NVRkJUQ3hEUVVGVlZ5eFBRVUZXTEVOQlFXdENMR2xDUVVGdlFqdEJRVUZCTEZWQlFXeENWQ3hIUVVGclFpeFRRVUZzUWtFc1IwRkJhMEk3UVVGQlFTeFZRVUZpWXl4UFFVRmhMRk5CUVdKQkxFOUJRV0U3UVVGRGNFTXNWVUZCU1N4RFFVRkRRU3hQUVVGTUxFVkJRV003UVVGRFpFRXNUVUZCUVVFc1QwRkJUeXhEUVVGRFRDeFBRVUZTTEVOQlFXZENMRlZCUVVGTkxGTkJRVk1zUlVGQlNUdEJRVU16UWl4WlFVRk5ReXhMUVVGTExFZEJRVWNzVFVGQlMxSXNVMEZCVEN4RFFVRmxVeXhIUVVGbUxFTkJRVzFDUml4VFFVRnVRaXhEUVVGa096dEJRVU5CTEZsQlFVa3NRMEZCUTBNc1MwRkJUQ3hGUVVGWkxFMUJRVTBzU1VGQlNWb3NTMEZCU2l4eFEwRkJkVU5LTEVkQlFYWkRMR1ZCUVN0RFpTeFRRVUV2UXl4RlFVRk9PMEZCUTFwRExGRkJRVUZCTEV0QlFVc3NRMEZCUTNCQ0xGTkJRVTRzUTBGQlowSnpRaXhIUVVGb1FpeERRVUZ2UW14Q0xFZEJRWEJDTzBGQlEwUXNUMEZLUkR0QlFVdEVMRXRCVUVRN1FVRlRRU3hSUVVGTlJTeFZRVUZWTEVkQlFVYzdRVUZEYWtKcFFpeE5RVUZCUVN4SlFVRkpMRzFHUVVSaE8wRkJSV3BDUXl4TlFVRkJRU3hqUVVGakxFVkJRVVVzZDBKQlFVTjZRaXhOUVVGRUxFVkJRVk5MTEVkQlFWUXNSVUZCWTFBc1MwRkJaQ3hGUVVGM1FqdEJRVU4wUXl4WlFVRk5ORUlzVVVGQlVTeEhRVUZITEUxQlFVdGlMRk5CUVV3c1EwRkJaVk1zUjBGQlppeERRVUZ0UW1wQ0xFZEJRVzVDTEVOQlFXcENPenRCUVVOQkxGbEJRVWtzUTBGQlEzRkNMRkZCUVV3c1JVRkJaU3hOUVVGTkxFbEJRVWxxUWl4TFFVRktMSGRDUVVFd1Frb3NSMEZCTVVJc1JVRkJUanRCUVVWbUxGbEJRVWxGTEZWQlFVbzdRVUZEUVN4WlFVRk5iMElzU1VGQlNTeEhRVUZITEVsQlFVbERMSEZDUVVGS0xFTkJRV2RDTzBGQlF6TkNPVUlzVlVGQlFVRXNTMEZCU3l4RlFVRk1RU3hMUVVReVFqdEJRVVV6UWtVc1ZVRkJRVUVzVFVGQlRTeEZRVUZPUVN4TlFVWXlRanRCUVVjelFrTXNWVUZCUVVFc1UwRkJVeXhGUVVGRmVVSXNVVUZCVVN4RFFVRkRla0lzVTBGSVR6dEJRVWt6UWtzc1ZVRkJRVUVzVVVGQlVTeEZRVUZGTEd0Q1FVRkRkVUlzVjBGQlJDeEZRVUZwUWp0QlFVTjZRblJDTEZsQlFVRkJMRlZCUVZVc1IwRkJSM05DTEZkQlFXSTdRVUZEUkR0QlFVNHdRaXhUUVVGb1FpeERRVUZpTzBGQlVVRXNXVUZCU1N4RFFVRkRkRUlzVlVGQlRDeEZRVUZwUWl4TlFVRk5MRWxCUVVsRkxFdEJRVW9zUlVGQlRqczdRVUZEYWtJc1kwRkJTME1zWjBKQlFVd3NRMEZCYzBKRExFZEJRWFJDTEVOQlFUQkNaMElzU1VGQk1VSXNSVUZCWjBOd1FpeFZRVUZvUXpzN1FVRkZRVzFDTEZGQlFVRkJMRkZCUVZFc1EwRkJRMjVDTEZWQlFWUXNRMEZCYjBKblFpeEhRVUZ3UWl4RFFVRjNRa2tzU1VGQmVFSTdPMEZCUlVFc1dVRkJUVWNzVlVGQlZTeEhRVUZITEUxQlFVdHNRaXhaUVVGTUxFTkJRV3RDVlN4SFFVRnNRaXhEUVVGelFuaENMRXRCUVhSQ0xFTkJRVzVDT3p0QlFVTkJMRmxCUVVsblF5eFZRVUZLTEVWQlFXZENPMEZCUTJSQkxGVkJRVUZCTEZWQlFWVXNRMEZCUTBNc1NVRkJXQ3hEUVVGblFrb3NTVUZCYUVJN1FVRkRSQ3hUUVVaRUxFMUJSVTg3UVVGRFRDeG5Ra0ZCUzJZc1dVRkJUQ3hEUVVGclFrUXNSMEZCYkVJc1EwRkJjMEppTEV0QlFYUkNMRVZCUVRaQ0xFTkJRVU0yUWl4SlFVRkVMRU5CUVRkQ08wRkJRMFE3TzBGQlJVUXNXVUZCVFVzc1owSkJRV2RDTEVkQlFVY3NUVUZCUzNSQ0xHZENRVUZNTEVOQlFYTkNXU3hIUVVGMFFpeERRVUV3UW5SQ0xFMUJRVEZDTEVOQlFYcENPenRCUVVOQkxGbEJRVWtzUTBGQlEyZERMR2RDUVVGTUxFVkJRWFZDTEUxQlFVMHNTVUZCU1haQ0xFdEJRVW9zUTBGQlZTd3JRa0ZCVml4RFFVRk9PMEZCUTNaQ2RVSXNVVUZCUVVFc1owSkJRV2RDTEVOQlFVTkRMRmxCUVdwQ0xFTkJRVGhDTlVJc1IwRkJPVUlzUlVGQmJVTnpRaXhKUVVGdVF6dEJRVVZCTEdWQlFVOUJMRWxCUVZBN1FVRkRSQ3hQUVdoRFowSTdRVUZwUTJwQ1R5eE5RVUZCUVN4blFrRkJaMElzUlVGQlJTd3dRa0ZCUTJ4RExFMUJRVVFzUlVGQlUwc3NSMEZCVkN4RlFVRmpjMElzU1VGQlpDeEZRVUYxUWp0QlFVTjJReXhaUVVGTlJDeFJRVUZSTEVkQlFVY3NUVUZCUzJJc1UwRkJUQ3hEUVVGbFV5eEhRVUZtTEVOQlFXMUNha0lzUjBGQmJrSXNRMEZCYWtJN08wRkJRMEVzV1VGQlNTeERRVUZEY1VJc1VVRkJUQ3hGUVVGbExFMUJRVTBzU1VGQlNXcENMRXRCUVVvc2QwSkJRVEJDU2l4SFFVRXhRaXhGUVVGT096dEJRVVZtTEZsQlFVMHlRaXhuUWtGQlowSXNSMEZCUnl4TlFVRkxkRUlzWjBKQlFVd3NRMEZCYzBKWkxFZEJRWFJDTEVOQlFUQkNkRUlzVFVGQk1VSXNRMEZCZWtJN08wRkJRMEVzV1VGQlNTeERRVUZEWjBNc1owSkJRVXdzUlVGQmRVSXNUVUZCVFN4SlFVRkpka0lzUzBGQlNpeERRVUZWTEN0Q1FVRldMRU5CUVU0N1FVRkZka0lzV1VGQlRWZ3NTMEZCU3l4SFFVRkhOa0lzU1VGQlNTeERRVUZEVVN4UlFVRk1MRVZCUVdRN08wRkJRMEVzV1VGQlRVTXNTMEZCU3l4SFFVRkhMRTFCUVV0NFFpeFpRVUZNTEVOQlFXdENWU3hIUVVGc1FpeERRVUZ6UW5oQ0xFdEJRWFJDTEVOQlFXUTdPMEZCUTBFc1dVRkJTU3hEUVVGRGMwTXNTMEZCVEN4RlFVRlpMRTFCUVUwc1NVRkJTVE5DTEV0QlFVb3NRMEZCVlN4dFJFRkJWaXhEUVVGT096dEJRVU5hTEZsQlFVa3lRaXhMUVVGTExFTkJRVU5ETEUxQlFVNHNSMEZCWlN4RFFVRnVRaXhGUVVGelFqdEJRVU53UWl4alFVRk5ReXhGUVVGRkxFZEJRVWRHTEV0QlFVc3NRMEZCUTBjc1QwRkJUaXhEUVVGaldpeEpRVUZrTEVOQlFWZzdRVUZEUVN4alFVRkpWeXhGUVVGRkxFZEJRVWNzUTBGQlZDeEZRVUZaTEUxQlFVMHNTVUZCU1RkQ0xFdEJRVW9zUTBGQlZTd3lSRUZCVml4RFFVRk9PMEZCUTFveVFpeFZRVUZCUVN4TFFVRkxMRU5CUVVOSkxFMUJRVTRzUTBGQllVWXNSVUZCWWl4RlFVRnBRaXhEUVVGcVFqdEJRVU5FTEZOQlNrUXNUVUZKVHp0QlFVTk1MR2RDUVVGTE1VSXNXVUZCVEN4RFFVRnJRalpDTEUxQlFXeENMRU5CUVhsQ00wTXNTMEZCZWtJN1FVRkRSRHM3UVVGRlJEWkNMRkZCUVVGQkxFbEJRVWtzUTBGQlEyVXNVVUZCVEN4SFFVRm5RalZDTEU5QlFXaENMRU5CUVhkQ0xGVkJRVU5ITEU5QlFVUXNSVUZCVlZvc1IwRkJWaXhGUVVGclFqdEJRVU40UTFrc1ZVRkJRVUVzVDBGQlR5eERRVUZETUVJc1RVRkJVaXhIUVVGcFFqZENMRTlCUVdwQ0xFTkJRWGxDTEZWQlFVRTRRaXhUUVVGVExFVkJRVWs3UVVGRGNFTnlReXhaUVVGQlFTeFZRVUZWTEVOQlFVTXlRaXhuUWtGQldDeERRVUUwUWxBc1NVRkJOVUlzUlVGQmEwTjBRaXhIUVVGc1F5eEZRVUYxUTNWRExGTkJRWFpETzBGQlEwUXNWMEZHUkR0QlFVZEVMRk5CU2tRN1FVRk5RV3hDTEZGQlFVRkJMRkZCUVZFc1EwRkJRMjVDTEZWQlFWUXNRMEZCYjBKelF5eE5RVUZ3UWl4RFFVRXlRbXhDTEVsQlFUTkNPMEZCUTBGTExGRkJRVUZCTEdkQ1FVRm5RaXhEUVVGRFl5eGxRVUZxUWl4RFFVRnBRM3BETEVkQlFXcERMRVZCUVhORGMwSXNTVUZCZEVNN08wRkJRMEVzWTBGQlMycENMR2RDUVVGTUxFTkJRWE5DSzBJc1RVRkJkRUlzUTBGQk5rSmtMRWxCUVRkQ08wRkJRMFFzVDBFMVJHZENPMEZCTmtScVFtOUNMRTFCUVVGQkxFZEJRVWNzUlVGQlJTeGxRVUZOTzBGQlExUXNZMEZCUzNKRExHZENRVUZNTEVOQlFYTkNTU3hQUVVGMFFpeERRVUU0UWl4VlFVRkJVQ3hWUVVGVkxFVkJRVWs3UVVGRE1VTkJMRlZCUVVGQkxGVkJRVlVzUTBGQlEzZERMRWRCUVZnN1FVRkRSQ3hUUVVaRU96dEJRVWRCTEdOQlFVdHNReXhUUVVGTUxFTkJRV1ZETEU5QlFXWXNRMEZCZFVJc2FVSkJRV3RDTzBGQlFVRXNZMEZCYUVKUUxGVkJRV2RDTEZOQlFXaENRU3hWUVVGblFqdEJRVU4yUTBFc1ZVRkJRVUVzVlVGQlZTeERRVUZEZDBNc1IwRkJXRHRCUVVORUxGTkJSa1E3UVVGSFJEdEJRWEJGWjBJc1MwRkJia0k3UVVGelJVRnVSQ3hKUVVGQlFTeEpRVUZKTEVOQlFVTlZMRkZCUVV3c1EwRkJZME1zVlVGQlpEczdRVUZEUVZnc1NVRkJRVUVzU1VGQlNTeERRVUZEVlN4UlFVRk1MRWRCUVdkQ0xGbEJRVTBzUTBGQlJTeERRVUY0UWl4RFFYUkhaME1zUTBGelIwNDdPenRCUVhSSFRUdEJRWFZIYWtNN096czdjVU5CUldkQ1VpeExMRVZCUVRCRE8wRkJRM3BFTEZWQlFVMXJSQ3hEUVVGRExFZEJRVWNzUzBGQlMzQkRMRmxCUVV3c1EwRkJhMEpWTEVkQlFXeENMRU5CUVhOQ2VFSXNTMEZCZEVJc1EwRkJWanM3UVVGRFFTeGhRVUZQYTBRc1EwRkJReXhIUVVGSGRrUXNUVUZCVFN4RFFVRkRReXhOUVVGUUxFTkJRV056UkN4RFFVRkRMRU5CUVVORExFdEJRVVlzUlVGQlpDeERRVUZJTEVkQlFUaENla1FzVjBGQmRFTTdRVUZEUkRzN08yZERRVVZYWVN4SExFVkJRWE5ETzBGQlEyaEVMRlZCUVUxblFpeExRVUZMTEVkQlFVY3NTMEZCUzFJc1UwRkJUQ3hEUVVGbFV5eEhRVUZtTEVOQlFXMUNha0lzUjBGQmJrSXNRMEZCWkRzN1FVRkRRU3hWUVVGSkxFTkJRVU5uUWl4TFFVRk1MRVZCUVZrc1RVRkJUU3hKUVVGSldpeExRVUZLTERCRFFVRTBRMG9zUjBGQk5VTXNSVUZCVGp0QlFVTmFMR0ZCUVU5blFpeExRVUZMTEVOQlFVTktMRTlCUVdJN1FVRkRSRHM3T3paQ1FVVTRRenRCUVVNM1F5eFZRVUZOYVVNc1EwRkJReXhIUVVGSExFbEJRVWt4UXl4SFFVRktMRVZCUVZZN08wRkJRMEVzVjBGQlMwc3NVMEZCVEN4RFFVRmxReXhQUVVGbUxFTkJRWFZDTEdsQ1FVRlpWQ3hIUVVGYUxFVkJRVzlDTzBGQlFVRXNXVUZCYkVKWkxFOUJRV3RDTEZOQlFXeENRU3hQUVVGclFqdEJRVU42UTJsRExGRkJRVUZCTEVOQlFVTXNRMEZCUTNaRExFZEJRVVlzUTBGQlRVNHNSMEZCVGl4RlFVRlhXU3hQUVVGWU8wRkJRMFFzVDBGR1JEczdRVUZIUVN4aFFVRlBhVU1zUTBGQlVEdEJRVU5FT3pzN1JVRnVTWEZEZEVJc2NVSWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUl2S2lCQVpteHZkeUFxTDF4dVhHNXBiWEJ2Y25RZ1RHbDJaVk5sZENCbWNtOXRJQ2RzYVhabExYTmxkQ2M3WEc1cGJYQnZjblFnZEhsd1pTQjdUR2wyWlZObGRFTnZiblJ5YjJ4c1pYSjlJR1p5YjIwZ0oyeHBkbVV0YzJWMEp6dGNibHh1YVcxd2IzSjBJRlJoWjFSeVpXVk9iMlJsSUdaeWIyMGdKeTR2VkdGblZISmxaVTV2WkdVbk8xeHVhVzF3YjNKMElIUjVjR1VnZTFSaFoxUnlaV1ZPYjJSbFEyOXVkSEp2Ykd4bGNuMGdabkp2YlNBbkxpOVVZV2RVY21WbFRtOWtaU2M3WEc1Y2JtVjRjRzl5ZENCMGVYQmxJRlJoWjFSeVpXVkRiMjUwY205c2JHVnlQRlErSUQwZ2UxeHVJQ0IwY21WbE9pQlVZV2RVY21WbFBGUStPMXh1SUNCaFpHUlVZV2RuWldSV1lXeDFaU2h3WVhKbGJuUTZJRlJoWjFSeVpXVk9iMlJsUEZRK0xDQjBZV2M2SUhOMGNtbHVaeXdnZG1Gc2RXVTZJRlFwT2lCVVlXZFVjbVZsVG05a1pUeFVQanRjYmlBZ2NtVnRiM1psVkdGbloyVmtUbTlrWlNod1lYSmxiblE2SUZSaFoxUnlaV1ZPYjJSbFBGUStMQ0IwWVdjNklITjBjbWx1Wnl3Z2JtOWtaVG9nVkdGblZISmxaVTV2WkdVOFZENHBPaUIyYjJsa08xeHVJQ0JsYm1Rb0tUb2dkbTlwWkR0Y2JuMDdYRzVjYm1WNGNHOXlkQ0IwZVhCbElGUmhaMVJ5WldWSmJtbDBQRlErSUQwZ2UzeGNiaUFnY205dmREb2dWRHRjYmlBZ2RHRm5jem9nSkZKbFlXUlBibXg1UVhKeVlYazhlM3dnZEdGbk9pQnpkSEpwYm1jc0lHOTNibVZrUW5rL09pQS9KRkpsWVdSUGJteDVRWEp5WVhrOGMzUnlhVzVuUGlCOGZUNDdYRzRnSUdWNFpXTjFkRzl5T2lBb1kyOXVkSEp2Ykd4bGNqb2dWR0ZuVkhKbFpVTnZiblJ5YjJ4c1pYSThWRDRwSUQwK0lIWnZhV1E3WEc1OGZUdGNibHh1WTI5dWMzUWdSVTFRVkZsZlFWSlNRVms2SUdGdWVWdGRJRDBnVDJKcVpXTjBMbVp5WldWNlpTaGJYU2s3WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdOc1lYTnpJRlJoWjFSeVpXVThWRDRnWlhoMFpXNWtjeUJVWVdkVWNtVmxUbTlrWlR4VVBpQjdYRzRnSUY5dWIyUmxRMjl1ZEhKdmJHeGxjbk02SUUxaGNEeFVZV2RVY21WbFRtOWtaVHhVUGl3Z1ZHRm5WSEpsWlU1dlpHVkRiMjUwY205c2JHVnlQRlErUGlBOUlHNWxkeUJOWVhBb0tUdGNiaUFnWDJ4dmIydDFjRlJoWW14bE9pQk5ZWEE4VkN3Z1FYSnlZWGs4VkdGblZISmxaVTV2WkdVOFZENCtQanRjYmlBZ1gyRnNiRUo1VkdGbk9pQk5ZWEE4YzNSeWFXNW5MQ0I3WEc0Z0lDQWdiM2R1WldSVVlXZHpPaUJUWlhROGMzUnlhVzVuUGp0Y2JpQWdJQ0JzYVhabFUyVjBPaUJNYVhabFUyVjBQRlJoWjFSeVpXVk9iMlJsUEZRK1BqdGNiaUFnSUNCamIyNTBjbTlzYkdWeU9pQk1hWFpsVTJWMFEyOXVkSEp2Ykd4bGNqeFVZV2RVY21WbFRtOWtaVHhVUGo0N1hHNGdJSDArTzF4dVhHNGdJR052Ym5OMGNuVmpkRzl5S0dsdWFYUTZJRlJoWjFSeVpXVkpibWwwUEZRK0tTQjdYRzRnSUNBZ2JHVjBJSEp2YjNST2IyUmxRMjl1ZEhKdmJHeGxjanRjYmlBZ0lDQnpkWEJsY2loN1hHNGdJQ0FnSUNCMllXeDFaVG9nYVc1cGRDNXliMjkwTEZ4dUlDQWdJQ0FnY0dGeVpXNTBPaUJ1ZFd4c0xGeHVJQ0FnSUNBZ2IzZHVaV1JVWVdkek9pQnVaWGNnVTJWMEtHbHVhWFF1ZEdGbmN5NXRZWEFvS0h0MFlXZDlLU0E5UGlCMFlXY3BLU3hjYmlBZ0lDQWdJR1Y0WldOMWRHOXlPaUFvWTI5dWRISnZiR3hsY2lrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0J5YjI5MFRtOWtaVU52Ym5SeWIyeHNaWElnUFNCamIyNTBjbTlzYkdWeU8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVJQ0FnSUdsbUlDZ2hjbTl2ZEU1dlpHVkRiMjUwY205c2JHVnlLU0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9LVHRjYmlBZ0lDQjBhR2x6TGw5dWIyUmxRMjl1ZEhKdmJHeGxjbk11YzJWMEtIUm9hWE1zSUhKdmIzUk9iMlJsUTI5dWRISnZiR3hsY2lrN1hHNWNiaUFnSUNCMGFHbHpMbDlzYjI5cmRYQlVZV0pzWlNBOUlHNWxkeUJOWVhBb1cxdHBibWwwTG5KdmIzUXNJRnQwYUdselhWMWRLVHRjYmx4dUlDQWdJSFJvYVhNdVgyRnNiRUo1VkdGbklEMGdibVYzSUUxaGNDZ3BPMXh1SUNBZ0lHbHVhWFF1ZEdGbmN5NW1iM0pGWVdOb0tDaDdkR0ZuZlNrZ1BUNGdlMXh1SUNBZ0lDQWdZMjl1YzNRZ2UyeHBkbVZUWlhRc0lHTnZiblJ5YjJ4c1pYSjlJRDBnVEdsMlpWTmxkQzVoWTNScGRtVW9LVHRjYmlBZ0lDQWdJR2xtSUNoMGFHbHpMbDloYkd4Q2VWUmhaeTVvWVhNb2RHRm5LU2tnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RVWVdjZ2MzQmxZMmxtYVdWa0lIUjNhV05sT2lBbkszUmhaeWs3WEc0Z0lDQWdJQ0IwYUdsekxsOWhiR3hDZVZSaFp5NXpaWFFvZEdGbkxDQjdiM2R1WldSVVlXZHpPaUJ1WlhjZ1UyVjBLQ2tzSUd4cGRtVlRaWFFzSUdOdmJuUnliMnhzWlhKOUtUdGNiaUFnSUNCOUtUdGNibHh1SUNBZ0lHbHVhWFF1ZEdGbmN5NW1iM0pGWVdOb0tDaDdkR0ZuTENCdmQyNWxaRUo1ZlNrZ1BUNGdlMXh1SUNBZ0lDQWdhV1lnS0NGdmQyNWxaRUo1S1NCeVpYUjFjbTQ3WEc0Z0lDQWdJQ0J2ZDI1bFpFSjVMbVp2Y2tWaFkyZ29iM2R1YVc1blZHRm5JRDArSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnWlc1MGNua2dQU0IwYUdsekxsOWhiR3hDZVZSaFp5NW5aWFFvYjNkdWFXNW5WR0ZuS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0ZsYm5SeWVTa2dkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHQjFibXR1YjNkdUlHOTNibVZrUW5rZ2RtRnNkV1VnWm05eUlDUjdkR0ZuZlRvZ0pIdHZkMjVwYm1kVVlXZDlZQ2s3WEc0Z0lDQWdJQ0FnSUdWdWRISjVMbTkzYm1Wa1ZHRm5jeTVoWkdRb2RHRm5LVHRjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJSDBwTzF4dVhHNGdJQ0FnWTI5dWMzUWdZMjl1ZEhKdmJHeGxjaUE5SUh0Y2JpQWdJQ0FnSUhSeVpXVTZJSFJvYVhNc1hHNGdJQ0FnSUNCaFpHUlVZV2RuWldSV1lXeDFaVG9nS0hCaGNtVnVkQ3dnZEdGbkxDQjJZV3gxWlNrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQjBZV2RGYm5SeWVTQTlJSFJvYVhNdVgyRnNiRUo1VkdGbkxtZGxkQ2gwWVdjcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvSVhSaFowVnVkSEo1S1NCMGFISnZkeUJ1WlhjZ1JYSnliM0lvWUhWdWEyNXZkMjRnZEdGbk9pQWtlM1JoWjMxZ0tUdGNibHh1SUNBZ0lDQWdJQ0JzWlhRZ1kyOXVkSEp2Ykd4bGNqdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2JtOWtaU0E5SUc1bGR5QlVZV2RVY21WbFRtOWtaU2g3WEc0Z0lDQWdJQ0FnSUNBZ2RtRnNkV1VzWEc0Z0lDQWdJQ0FnSUNBZ2NHRnlaVzUwTEZ4dUlDQWdJQ0FnSUNBZ0lHOTNibVZrVkdGbmN6b2dkR0ZuUlc1MGNua3ViM2R1WldSVVlXZHpMRnh1SUNBZ0lDQWdJQ0FnSUdWNFpXTjFkRzl5T2lBb1gyTnZiblJ5YjJ4c1pYSXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5SeWIyeHNaWElnUFNCZlkyOXVkSEp2Ykd4bGNqdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ0lDQnBaaUFvSVdOdmJuUnliMnhzWlhJcElIUm9jbTkzSUc1bGR5QkZjbkp2Y2lncE8xeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5dWIyUmxRMjl1ZEhKdmJHeGxjbk11YzJWMEtHNXZaR1VzSUdOdmJuUnliMnhzWlhJcE8xeHVYRzRnSUNBZ0lDQWdJSFJoWjBWdWRISjVMbU52Ym5SeWIyeHNaWEl1WVdSa0tHNXZaR1VwTzF4dVhHNGdJQ0FnSUNBZ0lHTnZibk4wSUhaaGJIVmxUbTlrWlhNZ1BTQjBhR2x6TGw5c2IyOXJkWEJVWVdKc1pTNW5aWFFvZG1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RtRnNkV1ZPYjJSbGN5a2dlMXh1SUNBZ0lDQWdJQ0FnSUhaaGJIVmxUbTlrWlhNdWNIVnphQ2h1YjJSbEtUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxsOXNiMjlyZFhCVVlXSnNaUzV6WlhRb2RtRnNkV1VzSUZ0dWIyUmxYU2s3WEc0Z0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQmpiMjV6ZENCd1lYSmxiblJEYjI1MGNtOXNiR1Z5SUQwZ2RHaHBjeTVmYm05a1pVTnZiblJ5YjJ4c1pYSnpMbWRsZENod1lYSmxiblFwTzF4dUlDQWdJQ0FnSUNCcFppQW9JWEJoY21WdWRFTnZiblJ5YjJ4c1pYSXBJSFJvY205M0lHNWxkeUJGY25KdmNpZ25jR0Z5Wlc1MElHbHpJRzV2ZENCd1lYSjBJRzltSUZSaFoxUnlaV1VuS1R0Y2JpQWdJQ0FnSUNBZ2NHRnlaVzUwUTI5dWRISnZiR3hsY2k1aFpHUlBkMjVsWkU1dlpHVW9kR0ZuTENCdWIyUmxLVHRjYmx4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYm05a1pUdGNiaUFnSUNBZ0lIMHNYRzRnSUNBZ0lDQnlaVzF2ZG1WVVlXZG5aV1JPYjJSbE9pQW9jR0Z5Wlc1MExDQjBZV2NzSUc1dlpHVXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnZEdGblJXNTBjbmtnUFNCMGFHbHpMbDloYkd4Q2VWUmhaeTVuWlhRb2RHRm5LVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tDRjBZV2RGYm5SeWVTa2dkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHQjFibXR1YjNkdUlIUmhaem9nSkh0MFlXZDlZQ2s3WEc1Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnY0dGeVpXNTBRMjl1ZEhKdmJHeGxjaUE5SUhSb2FYTXVYMjV2WkdWRGIyNTBjbTlzYkdWeWN5NW5aWFFvY0dGeVpXNTBLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tDRndZWEpsYm5SRGIyNTBjbTlzYkdWeUtTQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0ozQmhjbVZ1ZENCcGN5QnViM1FnY0dGeWRDQnZaaUJVWVdkVWNtVmxKeWs3WEc1Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnZG1Gc2RXVWdQU0J1YjJSbExtZGxkRlpoYkhWbEtDazdYRzRnSUNBZ0lDQWdJR052Ym5OMElHNXZaR1Z6SUQwZ2RHaHBjeTVmYkc5dmEzVndWR0ZpYkdVdVoyVjBLSFpoYkhWbEtUdGNiaUFnSUNBZ0lDQWdhV1lnS0NGdWIyUmxjeWtnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R1YjJSbElIZGhjeUJ0YVhOemFXNW5JR1p5YjIwZ2JHOXZhM1Z3SUhSaFlteGxJR0psWm05eVpTQnlaVzF2ZG1Gc0p5azdYRzRnSUNBZ0lDQWdJR2xtSUNodWIyUmxjeTVzWlc1bmRHZ2dQaUF4S1NCN1hHNGdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2FYZ2dQU0J1YjJSbGN5NXBibVJsZUU5bUtHNXZaR1VwTzF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2hwZUNBOElEQXBJSFJvY205M0lHNWxkeUJGY25KdmNpZ25ibTlrWlNCM1lYTWdiV2x6YzJsdVp5Qm1jbTl0SUd4cGMzUWdhVzRnYkc5dmEzVndJSFJoWW14bElHSmxabTl5WlNCeVpXMXZkbUZzSnlrN1hHNGdJQ0FnSUNBZ0lDQWdibTlrWlhNdWMzQnNhV05sS0dsNExDQXhLVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbDlzYjI5cmRYQlVZV0pzWlM1a1pXeGxkR1VvZG1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ2JtOWtaUzVuWlhSUGQyNWxaQ2dwTG1admNrVmhZMmdvS0d4cGRtVlRaWFFzSUhSaFp5a2dQVDRnZTF4dUlDQWdJQ0FnSUNBZ0lHeHBkbVZUWlhRdWRtRnNkV1Z6S0NrdVptOXlSV0ZqYUNoamFHbHNaRTV2WkdVZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNXlaVzF2ZG1WVVlXZG5aV1JPYjJSbEtHNXZaR1VzSUhSaFp5d2dZMmhwYkdST2IyUmxLVHRjYmlBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdmU2s3WEc1Y2JpQWdJQ0FnSUNBZ2RHRm5SVzUwY25rdVkyOXVkSEp2Ykd4bGNpNXlaVzF2ZG1Vb2JtOWtaU2s3WEc0Z0lDQWdJQ0FnSUhCaGNtVnVkRU52Ym5SeWIyeHNaWEl1Y21WdGIzWmxUM2R1WldST2IyUmxLSFJoWnl3Z2JtOWtaU2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVYMjV2WkdWRGIyNTBjbTlzYkdWeWN5NWtaV3hsZEdVb2JtOWtaU2s3WEc0Z0lDQWdJQ0I5TEZ4dUlDQWdJQ0FnWlc1a09pQW9LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WDI1dlpHVkRiMjUwY205c2JHVnljeTVtYjNKRllXTm9LR052Ym5SeWIyeHNaWElnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJR052Ym5SeWIyeHNaWEl1Wlc1a0tDazdYRzRnSUNBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbDloYkd4Q2VWUmhaeTVtYjNKRllXTm9LQ2g3WTI5dWRISnZiR3hsY24wcElEMCtJSHRjYmlBZ0lDQWdJQ0FnSUNCamIyNTBjbTlzYkdWeUxtVnVaQ2dwTzF4dUlDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOU8xeHVJQ0FnSUdsdWFYUXVaWGhsWTNWMGIzSW9ZMjl1ZEhKdmJHeGxjaWs3WEc0Z0lDQWdhVzVwZEM1bGVHVmpkWFJ2Y2lBOUlDZ3BJRDArSUh0OU95QXZMeUJ5Wld4bFlYTmxJSEpsWm1WeVpXNWpaVnh1SUNCOVhHNWNiaUFnWjJWMFRtOWtaWE5HYjNKV1lXeDFaU2gyWVd4MVpUb2dWQ2s2SUNSU1pXRmtUMjVzZVVGeWNtRjVQRlJoWjFSeVpXVk9iMlJsUEZRK1BpQjdYRzRnSUNBZ1kyOXVjM1FnYkNBOUlIUm9hWE11WDJ4dmIydDFjRlJoWW14bExtZGxkQ2gyWVd4MVpTazdYRzRnSUNBZ2NtVjBkWEp1SUd3Z1B5QlBZbXBsWTNRdVpuSmxaWHBsS0d3dWMyeHBZMlVvS1NrZ09pQkZUVkJVV1Y5QlVsSkJXVHRjYmlBZ2ZWeHVYRzRnSUdkbGRFRnNiRUo1VkdGbktIUmhaem9nYzNSeWFXNW5LVG9nVEdsMlpWTmxkRHhVWVdkVWNtVmxUbTlrWlR4VVBqNGdlMXh1SUNBZ0lHTnZibk4wSUdWdWRISjVJRDBnZEdocGN5NWZZV3hzUW5sVVlXY3VaMlYwS0hSaFp5azdYRzRnSUNBZ2FXWWdLQ0ZsYm5SeWVTa2dkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHQjBZV2NnWkc5bGN5QnViM1FnWlhocGMzUWdhVzRnVkdGblZISmxaVG9nSkh0MFlXZDlZQ2s3WEc0Z0lDQWdjbVYwZFhKdUlHVnVkSEo1TG14cGRtVlRaWFE3WEc0Z0lIMWNibHh1SUNCblpYUkJiR3dvS1RvZ1RXRndQSE4wY21sdVp5d2dUR2wyWlZObGREeFVZV2RVY21WbFRtOWtaVHhVUGo0K0lIdGNiaUFnSUNCamIyNXpkQ0J0SUQwZ2JtVjNJRTFoY0NncE8xeHVJQ0FnSUhSb2FYTXVYMkZzYkVKNVZHRm5MbVp2Y2tWaFkyZ29LSHRzYVhabFUyVjBmU3dnZEdGbktTQTlQaUI3WEc0Z0lDQWdJQ0J0TG5ObGRDaDBZV2NzSUd4cGRtVlRaWFFwTzF4dUlDQWdJSDBwTzF4dUlDQWdJSEpsZEhWeWJpQnRPMXh1SUNCOVhHNTlYRzRpWFgwPSIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlRGVmYXVsdCA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlRGVmYXVsdFwiKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9jbGFzc0NhbGxDaGVjazIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5XCIpKTtcblxudmFyIF9saXZlU2V0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwibGl2ZS1zZXRcIikpO1xuXG52YXIgVGFnVHJlZU5vZGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBUYWdUcmVlTm9kZShpbml0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICgwLCBfY2xhc3NDYWxsQ2hlY2syLmRlZmF1bHQpKHRoaXMsIFRhZ1RyZWVOb2RlKTtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0aGlzLCBcIl9pbml0XCIsIHZvaWQgMCk7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGhpcywgXCJfb3duZWROb2Rlc1wiLCBuZXcgTWFwKCkpO1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRoaXMsIFwiX293bmVkQnlUYWdcIiwgbmV3IE1hcCgpKTtcbiAgICB0aGlzLl9pbml0ID0gaW5pdDtcblxuICAgIHRoaXMuX2luaXQuZXhlY3V0b3Ioe1xuICAgICAgbm9kZTogdGhpcyxcbiAgICAgIGFkZE93bmVkTm9kZTogZnVuY3Rpb24gYWRkT3duZWROb2RlKHRhZywgbm9kZSkge1xuICAgICAgICBfdGhpcy5fb3duZWROb2Rlcy5zZXQobm9kZSwgdGFnKTtcblxuICAgICAgICB2YXIgZW50cnkgPSBfdGhpcy5fb3duZWRCeVRhZy5nZXQodGFnKTtcblxuICAgICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgICAgZW50cnkgPSBfdGhpcy5fY3JlYXRlVGFnRW50cnkoKTtcblxuICAgICAgICAgIF90aGlzLl9vd25lZEJ5VGFnLnNldCh0YWcsIGVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfZW50cnkgPSBlbnRyeSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXIgPSBfZW50cnkuY29udHJvbGxlcjtcbiAgICAgICAgY29udHJvbGxlci5hZGQobm9kZSk7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlT3duZWROb2RlOiBmdW5jdGlvbiByZW1vdmVPd25lZE5vZGUodGFnLCBub2RlKSB7XG4gICAgICAgIF90aGlzLl9vd25lZE5vZGVzLmRlbGV0ZShub2RlKTtcblxuICAgICAgICB2YXIgZW50cnkgPSBfdGhpcy5fb3duZWRCeVRhZy5nZXQodGFnKTtcblxuICAgICAgICBpZiAoIWVudHJ5KSB0aHJvdyBuZXcgRXJyb3IoJ3RhZyBub3Qgb3duZWQnKTtcbiAgICAgICAgdmFyIGNvbnRyb2xsZXIgPSBlbnRyeS5jb250cm9sbGVyO1xuICAgICAgICBjb250cm9sbGVyLnJlbW92ZShub2RlKTtcbiAgICAgIH0sXG4gICAgICBlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcbiAgICAgICAgX3RoaXMuX293bmVkQnlUYWcuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICAgIHZhciBjb250cm9sbGVyID0gX3JlZi5jb250cm9sbGVyO1xuICAgICAgICAgIGNvbnRyb2xsZXIuZW5kKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5faW5pdC5leGVjdXRvciA9IGZ1bmN0aW9uICgpIHt9OyAvLyByZWxlYXNlIHJlZmVyZW5jZVxuXG4gIH1cblxuICAoMCwgX2NyZWF0ZUNsYXNzMi5kZWZhdWx0KShUYWdUcmVlTm9kZSwgW3tcbiAgICBrZXk6IFwiX2NyZWF0ZVRhZ0VudHJ5XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGVUYWdFbnRyeSgpIHtcbiAgICAgIHJldHVybiBfbGl2ZVNldC5kZWZhdWx0LmFjdGl2ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRWYWx1ZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRWYWx1ZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pbml0LnZhbHVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRQYXJlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UGFyZW50KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2luaXQucGFyZW50IHx8IG51bGw7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldE93bmVkQnlUYWdcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0T3duZWRCeVRhZyh0YWcpIHtcbiAgICAgIHZhciBlbnRyeSA9IHRoaXMuX293bmVkQnlUYWcuZ2V0KHRhZyk7XG5cbiAgICAgIGlmICghZW50cnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbml0Lm93bmVkVGFncy5oYXModGFnKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRhZyBub3Qgb3duZWQ6IFwiLmNvbmNhdCh0YWcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVudHJ5ID0gdGhpcy5fY3JlYXRlVGFnRW50cnkoKTtcblxuICAgICAgICB0aGlzLl9vd25lZEJ5VGFnLnNldCh0YWcsIGVudHJ5KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVudHJ5LmxpdmVTZXQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldE93bmVkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGdldE93bmVkKCkge1xuICAgICAgdmFyIG0gPSBuZXcgTWFwKCk7XG5cbiAgICAgIHRoaXMuX293bmVkQnlUYWcuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIsIHRhZykge1xuICAgICAgICB2YXIgbGl2ZVNldCA9IF9yZWYyLmxpdmVTZXQ7XG4gICAgICAgIG0uc2V0KHRhZywgbGl2ZVNldCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImdldFRhZ1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUYWcoKSB7XG4gICAgICB2YXIgcGFyZW50ID0gdGhpcy5faW5pdC5wYXJlbnQ7XG4gICAgICByZXR1cm4gcGFyZW50ID8gcGFyZW50LmdldFRhZ09mT3duZWROb2RlKHRoaXMpIDogbnVsbDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib3duc05vZGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb3duc05vZGUobm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX293bmVkTm9kZXMuaGFzKG5vZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJnZXRUYWdPZk93bmVkTm9kZVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRUYWdPZk93bmVkTm9kZShub2RlKSB7XG4gICAgICB2YXIgdGFnID0gdGhpcy5fb3duZWROb2Rlcy5nZXQobm9kZSk7XG5cbiAgICAgIGlmICh0YWcgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdub2RlIG5vdCBvd25lZCcpO1xuICAgICAgcmV0dXJuIHRhZztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIFRhZ1RyZWVOb2RlO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUYWdUcmVlTm9kZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklpNHVMM055WXk5VVlXZFVjbVZsVG05a1pTNXFjeUpkTENKdVlXMWxjeUk2V3lKVVlXZFVjbVZsVG05a1pTSXNJbWx1YVhRaUxDSk5ZWEFpTENKZmFXNXBkQ0lzSW1WNFpXTjFkRzl5SWl3aWJtOWtaU0lzSW1Ga1pFOTNibVZrVG05a1pTSXNJblJoWnlJc0lsOXZkMjVsWkU1dlpHVnpJaXdpYzJWMElpd2laVzUwY25raUxDSmZiM2R1WldSQ2VWUmhaeUlzSW1kbGRDSXNJbDlqY21WaGRHVlVZV2RGYm5SeWVTSXNJbU52Ym5SeWIyeHNaWElpTENKaFpHUWlMQ0p5WlcxdmRtVlBkMjVsWkU1dlpHVWlMQ0prWld4bGRHVWlMQ0pGY25KdmNpSXNJbkpsYlc5MlpTSXNJbVZ1WkNJc0ltWnZja1ZoWTJnaUxDSk1hWFpsVTJWMElpd2lZV04wYVhabElpd2lkbUZzZFdVaUxDSndZWEpsYm5RaUxDSnZkMjVsWkZSaFozTWlMQ0pvWVhNaUxDSnNhWFpsVTJWMElpd2liU0lzSW1kbGRGUmhaMDltVDNkdVpXUk9iMlJsSWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPenM3T3pzN1FVRkZRVHM3U1VGelFuRkNRU3hYT3pzN1FVRkxia0lzZFVKQlFWbERMRWxCUVZvc1JVRkJjME03UVVGQlFUczdRVUZCUVR0QlFVRkJPMEZCUVVFc2RVUkJTRXNzU1VGQlNVTXNSMEZCU2l4RlFVZE1PMEZCUVVFc2RVUkJSa1VzU1VGQlNVRXNSMEZCU2l4RlFVVkdPMEZCUTNCRExGTkJRVXRETEV0QlFVd3NSMEZCWVVZc1NVRkJZanM3UVVGRFFTeFRRVUZMUlN4TFFVRk1MRU5CUVZkRExGRkJRVmdzUTBGQmIwSTdRVUZEYkVKRExFMUJRVUZCTEVsQlFVa3NSVUZCUlN4SlFVUlpPMEZCUld4Q1F5eE5RVUZCUVN4WlFVRlpMRVZCUVVVc2MwSkJRVU5ETEVkQlFVUXNSVUZCVFVZc1NVRkJUaXhGUVVGbE8wRkJRek5DTEZGQlFVRXNTMEZCU1N4RFFVRkRSeXhYUVVGTUxFTkJRV2xDUXl4SFFVRnFRaXhEUVVGeFFrb3NTVUZCY2tJc1JVRkJNa0pGTEVkQlFUTkNPenRCUVVOQkxGbEJRVWxITEV0QlFVc3NSMEZCUnl4TFFVRkpMRU5CUVVORExGZEJRVXdzUTBGQmFVSkRMRWRCUVdwQ0xFTkJRWEZDVEN4SFFVRnlRaXhEUVVGYU96dEJRVU5CTEZsQlFVa3NRMEZCUTBjc1MwRkJUQ3hGUVVGWk8wRkJRMVpCTEZWQlFVRkJMRXRCUVVzc1IwRkJSeXhMUVVGSkxFTkJRVU5ITEdWQlFVd3NSVUZCVWpzN1FVRkRRU3hWUVVGQkxFdEJRVWtzUTBGQlEwWXNWMEZCVEN4RFFVRnBRa1lzUjBGQmFrSXNRMEZCY1VKR0xFZEJRWEpDTEVWQlFUQkNSeXhMUVVFeFFqdEJRVU5FT3p0QlFVNHdRaXh4UWtGUFRrRXNTMEZRVFR0QlFVRkJMRmxCVDNCQ1NTeFZRVkJ2UWl4VlFVOXdRa0VzVlVGUWIwSTdRVUZSTTBKQkxGRkJRVUZCTEZWQlFWVXNRMEZCUTBNc1IwRkJXQ3hEUVVGbFZpeEpRVUZtTzBGQlEwUXNUMEZZYVVJN1FVRlpiRUpYTEUxQlFVRkJMR1ZCUVdVc1JVRkJSU3g1UWtGQlExUXNSMEZCUkN4RlFVRk5SaXhKUVVGT0xFVkJRV1U3UVVGRE9VSXNVVUZCUVN4TFFVRkpMRU5CUVVOSExGZEJRVXdzUTBGQmFVSlRMRTFCUVdwQ0xFTkJRWGRDV2l4SlFVRjRRanM3UVVGRFFTeFpRVUZOU3l4TFFVRkxMRWRCUVVjc1MwRkJTU3hEUVVGRFF5eFhRVUZNTEVOQlFXbENReXhIUVVGcVFpeERRVUZ4UWt3c1IwRkJja0lzUTBGQlpEczdRVUZEUVN4WlFVRkpMRU5CUVVOSExFdEJRVXdzUlVGQldTeE5RVUZOTEVsQlFVbFJMRXRCUVVvc1EwRkJWU3hsUVVGV0xFTkJRVTQ3UVVGSWEwSXNXVUZKZGtKS0xGVkJTblZDTEVkQlNWUktMRXRCU2xNc1EwRkpka0pKTEZWQlNuVkNPMEZCU3psQ1FTeFJRVUZCUVN4VlFVRlZMRU5CUVVOTExFMUJRVmdzUTBGQmEwSmtMRWxCUVd4Q08wRkJRMFFzVDBGc1FtbENPMEZCYlVKc1FtVXNUVUZCUVVFc1IwRkJSeXhGUVVGRkxHVkJRVTA3UVVGRFZDeFJRVUZCTEV0QlFVa3NRMEZCUTFRc1YwRkJUQ3hEUVVGcFFsVXNUMEZCYWtJc1EwRkJlVUlzWjBKQlFXdENPMEZCUVVFc1kwRkJhRUpRTEZWQlFXZENMRkZCUVdoQ1FTeFZRVUZuUWp0QlFVTjZRMEVzVlVGQlFVRXNWVUZCVlN4RFFVRkRUU3hIUVVGWU8wRkJRMFFzVTBGR1JEdEJRVWRFTzBGQmRrSnBRaXhMUVVGd1FqczdRVUY1UWtFc1UwRkJTMnBDTEV0QlFVd3NRMEZCVjBNc1VVRkJXQ3hIUVVGelFpeFpRVUZOTEVOQlFVVXNRMEZCT1VJc1EwRXpRbTlETEVOQk1rSktPenRCUVVOcVF6czdPenR6UTBGRk9FSTdRVUZETjBJc1lVRkJUMnRDTEdsQ1FVRlJReXhOUVVGU0xFVkJRVkE3UVVGRFJEczdPeXRDUVVWaE8wRkJRMW9zWVVGQlR5eExRVUZMY0VJc1MwRkJUQ3hEUVVGWGNVSXNTMEZCYkVJN1FVRkRSRHM3TzJkRFFVVm5RenRCUVVNdlFpeGhRVUZQTEV0QlFVdHlRaXhMUVVGTUxFTkJRVmR6UWl4TlFVRllMRWxCUVhGQ0xFbEJRVFZDTzBGQlEwUTdPenRyUTBGRllXeENMRWNzUlVGQmMwTTdRVUZEYkVRc1ZVRkJTVWNzUzBGQlN5eEhRVUZITEV0QlFVdERMRmRCUVV3c1EwRkJhVUpETEVkQlFXcENMRU5CUVhGQ1RDeEhRVUZ5UWl4RFFVRmFPenRCUVVOQkxGVkJRVWtzUTBGQlEwY3NTMEZCVEN4RlFVRlpPMEZCUTFZc1dVRkJTU3hEUVVGRExFdEJRVXRRTEV0QlFVd3NRMEZCVjNWQ0xGTkJRVmdzUTBGQmNVSkRMRWRCUVhKQ0xFTkJRWGxDY0VJc1IwRkJla0lzUTBGQlRDeEZRVUZ2UXp0QlFVTnNReXhuUWtGQlRTeEpRVUZKVnl4TFFVRktMREJDUVVFMFFsZ3NSMEZCTlVJc1JVRkJUanRCUVVORU96dEJRVU5FUnl4UlFVRkJRU3hMUVVGTExFZEJRVWNzUzBGQlMwY3NaVUZCVEN4RlFVRlNPenRCUVVOQkxHRkJRVXRHTEZkQlFVd3NRMEZCYVVKR0xFZEJRV3BDTEVOQlFYRkNSaXhIUVVGeVFpeEZRVUV3UWtjc1MwRkJNVUk3UVVGRFJEczdRVUZEUkN4aFFVRlBRU3hMUVVGTExFTkJRVU5yUWl4UFFVRmlPMEZCUTBRN096c3JRa0ZGWjBRN1FVRkRMME1zVlVGQlRVTXNRMEZCUXl4SFFVRkhMRWxCUVVrelFpeEhRVUZLTEVWQlFWWTdPMEZCUTBFc1YwRkJTMU1zVjBGQlRDeERRVUZwUWxVc1QwRkJha0lzUTBGQmVVSXNhVUpCUVZsa0xFZEJRVm9zUlVGQmIwSTdRVUZCUVN4WlFVRnNRbkZDTEU5QlFXdENMRk5CUVd4Q1FTeFBRVUZyUWp0QlFVTXpRME1zVVVGQlFVRXNRMEZCUXl4RFFVRkRjRUlzUjBGQlJpeERRVUZOUml4SFFVRk9MRVZCUVZkeFFpeFBRVUZZTzBGQlEwUXNUMEZHUkRzN1FVRkhRU3hoUVVGUFF5eERRVUZRTzBGQlEwUTdPenMyUWtGRmNVSTdRVUZCUVN4VlFVTmlTaXhOUVVSaExFZEJRMGdzUzBGQlMzUkNMRXRCUkVZc1EwRkRZbk5DTEUxQlJHRTdRVUZGY0VJc1lVRkJUMEVzVFVGQlRTeEhRVUZIUVN4TlFVRk5MRU5CUVVOTExHbENRVUZRTEVOQlFYbENMRWxCUVhwQ0xFTkJRVWdzUjBGQmIwTXNTVUZCYWtRN1FVRkRSRHM3T3paQ1FVVlJla0lzU1N4RlFVRXJRanRCUVVOMFF5eGhRVUZQTEV0QlFVdEhMRmRCUVV3c1EwRkJhVUp0UWl4SFFVRnFRaXhEUVVGeFFuUkNMRWxCUVhKQ0xFTkJRVkE3UVVGRFJEczdPM05EUVVWcFFrRXNTU3hGUVVFNFFqdEJRVU01UXl4VlFVRk5SU3hIUVVGSExFZEJRVWNzUzBGQlMwTXNWMEZCVEN4RFFVRnBRa2tzUjBGQmFrSXNRMEZCY1VKUUxFbEJRWEpDTEVOQlFWbzdPMEZCUTBFc1ZVRkJTVVVzUjBGQlJ5eEpRVUZKTEVsQlFWZ3NSVUZCYVVJc1RVRkJUU3hKUVVGSlZ5eExRVUZLTEVOQlFWVXNaMEpCUVZZc1EwRkJUanRCUVVOcVFpeGhRVUZQV0N4SFFVRlFPMEZCUTBRaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SXZLaUJBWm14dmR5QXFMMXh1WEc1cGJYQnZjblFnVEdsMlpWTmxkQ0JtY205dElDZHNhWFpsTFhObGRDYzdYRzVwYlhCdmNuUWdkSGx3WlNCN1RHbDJaVk5sZEVOdmJuUnliMnhzWlhKOUlHWnliMjBnSjJ4cGRtVXRjMlYwSnp0Y2JseHVaWGh3YjNKMElIUjVjR1VnVkdGblZISmxaVTV2WkdWRGIyNTBjbTlzYkdWeVBGUStJRDBnZTF4dUlDQnViMlJsT2lCVVlXZFVjbVZsVG05a1pUeFVQanRjYmlBZ1lXUmtUM2R1WldST2IyUmxLSFJoWnpvZ2MzUnlhVzVuTENCdWIyUmxPaUJVWVdkVWNtVmxUbTlrWlR4VVBpazZJSFp2YVdRN1hHNGdJSEpsYlc5MlpVOTNibVZrVG05a1pTaDBZV2M2SUhOMGNtbHVaeXdnYm05a1pUb2dWR0ZuVkhKbFpVNXZaR1U4VkQ0cE9pQjJiMmxrTzF4dUlDQmxibVFvS1RvZ2RtOXBaRHRjYm4wN1hHNWNibVY0Y0c5eWRDQjBlWEJsSUZSaFoxUnlaV1ZPYjJSbFNXNXBkRHhVUGlBOUlIdDhYRzRnSUhaaGJIVmxPaUJVTzF4dUlDQndZWEpsYm5RNklEOVVZV2RVY21WbFRtOWtaVHhVUGp0Y2JpQWdiM2R1WldSVVlXZHpPaUJUWlhROGMzUnlhVzVuUGp0Y2JpQWdaWGhsWTNWMGIzSTZJQ2hqYjI1MGNtOXNiR1Z5T2lCVVlXZFVjbVZsVG05a1pVTnZiblJ5YjJ4c1pYSThWRDRwSUQwK0lIWnZhV1E3WEc1OGZUdGNibHh1ZEhsd1pTQlVZV2RGYm5SeWVUeFVQaUE5SUh0Y2JpQWdiR2wyWlZObGREb2dUR2wyWlZObGREeFVZV2RVY21WbFRtOWtaVHhVUGo0N1hHNGdJR052Ym5SeWIyeHNaWEk2SUV4cGRtVlRaWFJEYjI1MGNtOXNiR1Z5UEZSaFoxUnlaV1ZPYjJSbFBGUStQanRjYm4wN1hHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHTnNZWE56SUZSaFoxUnlaV1ZPYjJSbFBGUStJSHRjYmlBZ1gybHVhWFE2SUZSaFoxUnlaV1ZPYjJSbFNXNXBkRHhVUGp0Y2JpQWdYMjkzYm1Wa1RtOWtaWE02SUUxaGNEeFVZV2RVY21WbFRtOWtaVHhVUGl3Z2MzUnlhVzVuUGlBOUlHNWxkeUJOWVhBb0tUdGNiaUFnWDI5M2JtVmtRbmxVWVdjNklFMWhjRHh6ZEhKcGJtY3NJRlJoWjBWdWRISjVQRlErUGlBOUlHNWxkeUJOWVhBb0tUdGNibHh1SUNCamIyNXpkSEoxWTNSdmNpaHBibWwwT2lCVVlXZFVjbVZsVG05a1pVbHVhWFE4VkQ0cElIdGNiaUFnSUNCMGFHbHpMbDlwYm1sMElEMGdhVzVwZER0Y2JpQWdJQ0IwYUdsekxsOXBibWwwTG1WNFpXTjFkRzl5S0h0Y2JpQWdJQ0FnSUc1dlpHVTZJSFJvYVhNc1hHNGdJQ0FnSUNCaFpHUlBkMjVsWkU1dlpHVTZJQ2gwWVdjc0lHNXZaR1VwSUQwK0lIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1ZmIzZHVaV1JPYjJSbGN5NXpaWFFvYm05a1pTd2dkR0ZuS1R0Y2JpQWdJQ0FnSUNBZ2JHVjBJR1Z1ZEhKNUlEMGdkR2hwY3k1ZmIzZHVaV1JDZVZSaFp5NW5aWFFvZEdGbktUdGNiaUFnSUNBZ0lDQWdhV1lnS0NGbGJuUnllU2tnZTF4dUlDQWdJQ0FnSUNBZ0lHVnVkSEo1SUQwZ2RHaHBjeTVmWTNKbFlYUmxWR0ZuUlc1MGNua29LVHRjYmlBZ0lDQWdJQ0FnSUNCMGFHbHpMbDl2ZDI1bFpFSjVWR0ZuTG5ObGRDaDBZV2NzSUdWdWRISjVLVHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCamIyNXpkQ0I3WTI5dWRISnZiR3hsY24wZ1BTQmxiblJ5ZVR0Y2JpQWdJQ0FnSUNBZ1kyOXVkSEp2Ykd4bGNpNWhaR1FvYm05a1pTazdYRzRnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdjbVZ0YjNabFQzZHVaV1JPYjJSbE9pQW9kR0ZuTENCdWIyUmxLU0E5UGlCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WDI5M2JtVmtUbTlrWlhNdVpHVnNaWFJsS0c1dlpHVXBPMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQmxiblJ5ZVNBOUlIUm9hWE11WDI5M2JtVmtRbmxVWVdjdVoyVjBLSFJoWnlrN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doWlc1MGNua3BJSFJvY205M0lHNWxkeUJGY25KdmNpZ25kR0ZuSUc1dmRDQnZkMjVsWkNjcE8xeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCN1kyOXVkSEp2Ykd4bGNuMGdQU0JsYm5SeWVUdGNiaUFnSUNBZ0lDQWdZMjl1ZEhKdmJHeGxjaTV5WlcxdmRtVW9ibTlrWlNrN1hHNGdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ1pXNWtPaUFvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVgyOTNibVZrUW5sVVlXY3VabTl5UldGamFDZ29lMk52Ym5SeWIyeHNaWEo5S1NBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnWTI5dWRISnZiR3hsY2k1bGJtUW9LVHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNrN1hHNGdJQ0FnZEdocGN5NWZhVzVwZEM1bGVHVmpkWFJ2Y2lBOUlDZ3BJRDArSUh0OU95QXZMeUJ5Wld4bFlYTmxJSEpsWm1WeVpXNWpaVnh1SUNCOVhHNWNiaUFnWDJOeVpXRjBaVlJoWjBWdWRISjVLQ2s2SUZSaFowVnVkSEo1UEZRK0lIdGNiaUFnSUNCeVpYUjFjbTRnVEdsMlpWTmxkQzVoWTNScGRtVW9LVHRjYmlBZ2ZWeHVYRzRnSUdkbGRGWmhiSFZsS0NrNklGUWdlMXh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDlwYm1sMExuWmhiSFZsTzF4dUlDQjlYRzVjYmlBZ1oyVjBVR0Z5Wlc1MEtDazZJRzUxYkd4OFZHRm5WSEpsWlU1dlpHVThWRDRnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TGw5cGJtbDBMbkJoY21WdWRDQjhmQ0J1ZFd4c08xeHVJQ0I5WEc1Y2JpQWdaMlYwVDNkdVpXUkNlVlJoWnloMFlXYzZJSE4wY21sdVp5azZJRXhwZG1WVFpYUThWR0ZuVkhKbFpVNXZaR1U4VkQ0K0lIdGNiaUFnSUNCc1pYUWdaVzUwY25rZ1BTQjBhR2x6TGw5dmQyNWxaRUo1VkdGbkxtZGxkQ2gwWVdjcE8xeHVJQ0FnSUdsbUlDZ2haVzUwY25rcElIdGNiaUFnSUNBZ0lHbG1JQ2doZEdocGN5NWZhVzVwZEM1dmQyNWxaRlJoWjNNdWFHRnpLSFJoWnlrcElIdGNiaUFnSUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtHQjBZV2NnYm05MElHOTNibVZrT2lBa2UzUmhaMzFnS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUdWdWRISjVJRDBnZEdocGN5NWZZM0psWVhSbFZHRm5SVzUwY25rb0tUdGNiaUFnSUNBZ0lIUm9hWE11WDI5M2JtVmtRbmxVWVdjdWMyVjBLSFJoWnl3Z1pXNTBjbmtwTzF4dUlDQWdJSDFjYmlBZ0lDQnlaWFIxY200Z1pXNTBjbmt1YkdsMlpWTmxkRHRjYmlBZ2ZWeHVYRzRnSUdkbGRFOTNibVZrS0NrNklFMWhjRHh6ZEhKcGJtY3NJRXhwZG1WVFpYUThWR0ZuVkhKbFpVNXZaR1U4VkQ0K1BpQjdYRzRnSUNBZ1kyOXVjM1FnYlNBOUlHNWxkeUJOWVhBb0tUdGNiaUFnSUNCMGFHbHpMbDl2ZDI1bFpFSjVWR0ZuTG1admNrVmhZMmdvS0h0c2FYWmxVMlYwZlN3Z2RHRm5LU0E5UGlCN1hHNGdJQ0FnSUNCdExuTmxkQ2gwWVdjc0lHeHBkbVZUWlhRcE8xeHVJQ0FnSUgwcE8xeHVJQ0FnSUhKbGRIVnliaUJ0TzF4dUlDQjlYRzVjYmlBZ1oyVjBWR0ZuS0NrNklHNTFiR3g4YzNSeWFXNW5JSHRjYmlBZ0lDQmpiMjV6ZENCN2NHRnlaVzUwZlNBOUlIUm9hWE11WDJsdWFYUTdYRzRnSUNBZ2NtVjBkWEp1SUhCaGNtVnVkQ0EvSUhCaGNtVnVkQzVuWlhSVVlXZFBaazkzYm1Wa1RtOWtaU2gwYUdsektTQTZJRzUxYkd3N1hHNGdJSDFjYmx4dUlDQnZkMjV6VG05a1pTaHViMlJsT2lCVVlXZFVjbVZsVG05a1pUeFVQaWs2SUdKdmIyeGxZVzRnZTF4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TGw5dmQyNWxaRTV2WkdWekxtaGhjeWh1YjJSbEtUdGNiaUFnZlZ4dVhHNGdJR2RsZEZSaFowOW1UM2R1WldST2IyUmxLRzV2WkdVNklGUmhaMVJ5WldWT2IyUmxQRlErS1RvZ2MzUnlhVzVuSUh0Y2JpQWdJQ0JqYjI1emRDQjBZV2NnUFNCMGFHbHpMbDl2ZDI1bFpFNXZaR1Z6TG1kbGRDaHViMlJsS1R0Y2JpQWdJQ0JwWmlBb2RHRm5JRDA5SUc1MWJHd3BJSFJvY205M0lHNWxkeUJGY25KdmNpZ25ibTlrWlNCdWIzUWdiM2R1WldRbktUdGNiaUFnSUNCeVpYUjFjbTRnZEdGbk8xeHVJQ0I5WEc1OVhHNGlYWDA9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gcmVxdWlyZShcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0XCIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVGFnVHJlZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfVGFnVHJlZS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlRhZ1RyZWVOb2RlXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9UYWdUcmVlTm9kZS5kZWZhdWx0O1xuICB9XG59KTtcblxudmFyIF9UYWdUcmVlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9UYWdUcmVlXCIpKTtcblxudmFyIF9UYWdUcmVlTm9kZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vVGFnVHJlZU5vZGVcIikpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlwYm1SbGVDNXFjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPenM3T3pzN096czdPenRCUVVWQk96dEJRVWRCSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5b2dRR1pzYjNjZ0tpOWNibHh1Wlhod2IzSjBJSHRrWldaaGRXeDBJR0Z6SUZSaFoxUnlaV1Y5SUdaeWIyMGdKeTR2VkdGblZISmxaU2M3WEc1bGVIQnZjblFnZEhsd1pTQjdWR0ZuVkhKbFpVbHVhWFFzSUZSaFoxUnlaV1ZEYjI1MGNtOXNiR1Z5ZlNCbWNtOXRJQ2N1TDFSaFoxUnlaV1VuTzF4dVhHNWxlSEJ2Y25RZ2UyUmxabUYxYkhRZ1lYTWdWR0ZuVkhKbFpVNXZaR1Y5SUdaeWIyMGdKeTR2VkdGblZISmxaVTV2WkdVbk8xeHVJbDE5IiwiXG4vLyBiYXNpYyBwcm90b2NvbCBoZWxwZXJzXG5cbnZhciBzeW1ib2xFeGlzdHMgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJztcblxudmFyIHByb3RvY29scyA9IHtcbiAgaXRlcmF0b3I6IHN5bWJvbEV4aXN0cyA/IFN5bWJvbC5pdGVyYXRvciA6ICdAQGl0ZXJhdG9yJ1xufTtcblxuZnVuY3Rpb24gdGhyb3dQcm90b2NvbEVycm9yKG5hbWUsIGNvbGwpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiZG9uJ3Qga25vdyBob3cgdG8gXCIgKyBuYW1lICsgXCIgY29sbGVjdGlvbjogXCIgK1xuICAgICAgICAgICAgICAgICAgY29sbCk7XG59XG5cbmZ1bmN0aW9uIGZ1bGZpbGxzUHJvdG9jb2wob2JqLCBuYW1lKSB7XG4gIGlmKG5hbWUgPT09ICdpdGVyYXRvcicpIHtcbiAgICAvLyBBY2NlcHQgaWxsLWZvcm1lZCBpdGVyYXRvcnMgdGhhdCBkb24ndCBjb25mb3JtIHRvIHRoZVxuICAgIC8vIHByb3RvY29sIGJ5IGFjY2VwdGluZyBqdXN0IG5leHQoKVxuICAgIHJldHVybiBvYmpbcHJvdG9jb2xzLml0ZXJhdG9yXSB8fCBvYmoubmV4dDtcbiAgfVxuXG4gIHJldHVybiBvYmpbcHJvdG9jb2xzW25hbWVdXTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvdG9jb2xQcm9wZXJ0eShvYmosIG5hbWUpIHtcbiAgcmV0dXJuIG9ialtwcm90b2NvbHNbbmFtZV1dO1xufVxuXG5mdW5jdGlvbiBpdGVyYXRvcihjb2xsKSB7XG4gIHZhciBpdGVyID0gZ2V0UHJvdG9jb2xQcm9wZXJ0eShjb2xsLCAnaXRlcmF0b3InKTtcbiAgaWYoaXRlcikge1xuICAgIHJldHVybiBpdGVyLmNhbGwoY29sbCk7XG4gIH1cbiAgZWxzZSBpZihjb2xsLm5leHQpIHtcbiAgICAvLyBCYXNpYyBkdWNrIHR5cGluZyB0byBhY2NlcHQgYW4gaWxsLWZvcm1lZCBpdGVyYXRvciB0aGF0IGRvZXNuJ3RcbiAgICAvLyBjb25mb3JtIHRvIHRoZSBpdGVyYXRvciBwcm90b2NvbCAoYWxsIGl0ZXJhdG9ycyBzaG91bGQgaGF2ZSB0aGVcbiAgICAvLyBAQGl0ZXJhdG9yIG1ldGhvZCBhbmQgcmV0dXJuIHRoZW1zZWx2ZXMsIGJ1dCBzb21lIGVuZ2luZXMgZG9uJ3RcbiAgICAvLyBoYXZlIHRoYXQgb24gZ2VuZXJhdG9ycyBsaWtlIG9sZGVyIHY4KVxuICAgIHJldHVybiBjb2xsO1xuICB9XG4gIGVsc2UgaWYoaXNBcnJheShjb2xsKSkge1xuICAgIHJldHVybiBuZXcgQXJyYXlJdGVyYXRvcihjb2xsKTtcbiAgfVxuICBlbHNlIGlmKGlzT2JqZWN0KGNvbGwpKSB7XG4gICAgcmV0dXJuIG5ldyBPYmplY3RJdGVyYXRvcihjb2xsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBBcnJheUl0ZXJhdG9yKGFycikge1xuICB0aGlzLmFyciA9IGFycjtcbiAgdGhpcy5pbmRleCA9IDA7XG59XG5cbkFycmF5SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgaWYodGhpcy5pbmRleCA8IHRoaXMuYXJyLmxlbmd0aCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5hcnJbdGhpcy5pbmRleCsrXSxcbiAgICAgIGRvbmU6IGZhbHNlXG4gICAgfTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGRvbmU6IHRydWVcbiAgfVxufTtcblxuZnVuY3Rpb24gT2JqZWN0SXRlcmF0b3Iob2JqKSB7XG4gIHRoaXMub2JqID0gb2JqO1xuICB0aGlzLmtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICB0aGlzLmluZGV4ID0gMDtcbn1cblxuT2JqZWN0SXRlcmF0b3IucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgaWYodGhpcy5pbmRleCA8IHRoaXMua2V5cy5sZW5ndGgpIHtcbiAgICB2YXIgayA9IHRoaXMua2V5c1t0aGlzLmluZGV4KytdO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogW2ssIHRoaXMub2JqW2tdXSxcbiAgICAgIGRvbmU6IGZhbHNlXG4gICAgfTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGRvbmU6IHRydWVcbiAgfVxufTtcblxuLy8gaGVscGVyc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGlzQXJyYXkgPSB0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJyA/IEFycmF5LmlzQXJyYXkgOiBmdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoeCkge1xuICByZXR1cm4geCBpbnN0YW5jZW9mIE9iamVjdCAmJlxuICAgIE9iamVjdC5nZXRQcm90b3R5cGVPZih4KSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHt9KTtcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBSZWR1Y2VkKHZhbHVlKSB7XG4gIHRoaXNbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10gPSB0cnVlO1xuICB0aGlzWydAQHRyYW5zZHVjZXIvdmFsdWUnXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBpc1JlZHVjZWQoeCkge1xuICByZXR1cm4gKHggaW5zdGFuY2VvZiBSZWR1Y2VkKSB8fCAoeCAmJiB4WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKTtcbn1cblxuZnVuY3Rpb24gZGVyZWYoeCkge1xuICByZXR1cm4geFsnQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG59XG5cbi8qKlxuICogVGhpcyBpcyBmb3IgdHJhbnNmb3JtcyB0aGF0IG1heSBjYWxsIHRoZWlyIG5lc3RlZCB0cmFuc2Zvcm1zIGJlZm9yZVxuICogUmVkdWNlZC13cmFwcGluZyB0aGUgcmVzdWx0IChlLmcuIFwidGFrZVwiKSwgdG8gYXZvaWQgbmVzdGVkIFJlZHVjZWQuXG4gKi9cbmZ1bmN0aW9uIGVuc3VyZVJlZHVjZWQodmFsKSB7XG4gIGlmKGlzUmVkdWNlZCh2YWwpKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFJlZHVjZWQodmFsKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoaXMgaXMgZm9yIHRyYW5mb3JtcyB0aGF0IGNhbGwgdGhlaXIgbmVzdGVkIHRyYW5zZm9ybXMgd2hlblxuICogcGVyZm9ybWluZyBjb21wbGV0aW9uIChsaWtlIFwicGFydGl0aW9uXCIpLCB0byBhdm9pZCBzaWduYWxpbmdcbiAqIHRlcm1pbmF0aW9uIGFmdGVyIGFscmVhZHkgY29tcGxldGluZy5cbiAqL1xuZnVuY3Rpb24gZW5zdXJlVW5yZWR1Y2VkKHYpIHtcbiAgaWYoaXNSZWR1Y2VkKHYpKSB7XG4gICAgcmV0dXJuIGRlcmVmKHYpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlZHVjZShjb2xsLCB4Zm9ybSwgaW5pdCkge1xuICBpZihpc0FycmF5KGNvbGwpKSB7XG4gICAgdmFyIHJlc3VsdCA9IGluaXQ7XG4gICAgdmFyIGluZGV4ID0gLTE7XG4gICAgdmFyIGxlbiA9IGNvbGwubGVuZ3RoO1xuICAgIHdoaWxlKCsraW5kZXggPCBsZW4pIHtcbiAgICAgIHJlc3VsdCA9IHhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgY29sbFtpbmRleF0pO1xuICAgICAgaWYoaXNSZWR1Y2VkKHJlc3VsdCkpIHtcbiAgICAgICAgcmVzdWx0ID0gZGVyZWYocmVzdWx0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gIH1cbiAgZWxzZSBpZihpc09iamVjdChjb2xsKSB8fCBmdWxmaWxsc1Byb3RvY29sKGNvbGwsICdpdGVyYXRvcicpKSB7XG4gICAgdmFyIHJlc3VsdCA9IGluaXQ7XG4gICAgdmFyIGl0ZXIgPSBpdGVyYXRvcihjb2xsKTtcbiAgICB2YXIgdmFsID0gaXRlci5uZXh0KCk7XG4gICAgd2hpbGUoIXZhbC5kb25lKSB7XG4gICAgICByZXN1bHQgPSB4Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHZhbC52YWx1ZSk7XG4gICAgICBpZihpc1JlZHVjZWQocmVzdWx0KSkge1xuICAgICAgICByZXN1bHQgPSBkZXJlZihyZXN1bHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHZhbCA9IGl0ZXIubmV4dCgpO1xuICAgIH1cbiAgICByZXR1cm4geGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICB9XG4gIHRocm93UHJvdG9jb2xFcnJvcignaXRlcmF0ZScsIGNvbGwpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2R1Y2UoY29sbCwgeGZvcm0sIHJlZHVjZXIsIGluaXQpIHtcbiAgeGZvcm0gPSB4Zm9ybShyZWR1Y2VyKTtcbiAgaWYoaW5pdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaW5pdCA9IHhmb3JtWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG4gIH1cbiAgcmV0dXJuIHJlZHVjZShjb2xsLCB4Zm9ybSwgaW5pdCk7XG59XG5cbmZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIHZhciBmdW5jcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gIHJldHVybiBmdW5jdGlvbihyKSB7XG4gICAgdmFyIHZhbHVlID0gcjtcbiAgICBmb3IodmFyIGk9ZnVuY3MubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuICAgICAgdmFsdWUgPSBmdW5jc1tpXSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuXG4vLyB0cmFuc2Zvcm1hdGlvbnNcblxuZnVuY3Rpb24gdHJhbnNmb3JtZXIoZikge1xuICB2YXIgdCA9IHt9O1xuICB0WydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbml0IHZhbHVlIHVuYXZhaWxhYmxlJyk7XG4gIH07XG4gIHRbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfTtcbiAgdFsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGY7XG4gIHJldHVybiB0O1xufVxuXG5mdW5jdGlvbiBib3VuZChmLCBjdHgsIGNvdW50KSB7XG4gIGNvdW50ID0gY291bnQgIT0gbnVsbCA/IGNvdW50IDogMTtcblxuICBpZighY3R4KSB7XG4gICAgcmV0dXJuIGY7XG4gIH1cbiAgZWxzZSB7XG4gICAgc3dpdGNoKGNvdW50KSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIGYuY2FsbChjdHgsIHgpO1xuICAgICAgfVxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHJldHVybiBmLmNhbGwoY3R4LCB4LCB5KTtcbiAgICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGYuYmluZChjdHgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcnJheU1hcChhcnIsIGYsIGN0eCkge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgdmFyIGxlbmd0aCA9IGFyci5sZW5ndGg7XG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICBmID0gYm91bmQoZiwgY3R4LCAyKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBmKGFycltpbmRleF0sIGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBhcnJheUZpbHRlcihhcnIsIGYsIGN0eCkge1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmID0gYm91bmQoZiwgY3R4LCAyKTtcblxuICBmb3IodmFyIGk9MDsgaTxsZW47IGkrKykge1xuICAgIGlmKGYoYXJyW2ldLCBpKSkge1xuICAgICAgcmVzdWx0LnB1c2goYXJyW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gTWFwKGYsIHhmb3JtKSB7XG4gIHRoaXMueGZvcm0gPSB4Zm9ybTtcbiAgdGhpcy5mID0gZjtcbn1cblxuTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xufTtcblxuTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHYpO1xufTtcblxuTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlcywgaW5wdXQpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzLCB0aGlzLmYoaW5wdXQpKTtcbn07XG5cbmZ1bmN0aW9uIG1hcChjb2xsLCBmLCBjdHgpIHtcbiAgaWYoaXNGdW5jdGlvbihjb2xsKSkgeyBjdHggPSBmOyBmID0gY29sbDsgY29sbCA9IG51bGw7IH1cbiAgZiA9IGJvdW5kKGYsIGN0eCk7XG5cbiAgaWYoY29sbCkge1xuICAgIGlmKGlzQXJyYXkoY29sbCkpIHtcbiAgICAgIHJldHVybiBhcnJheU1hcChjb2xsLCBmLCBjdHgpO1xuICAgIH1cbiAgICByZXR1cm4gc2VxKGNvbGwsIG1hcChmKSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oeGZvcm0pIHtcbiAgICByZXR1cm4gbmV3IE1hcChmLCB4Zm9ybSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gRmlsdGVyKGYsIHhmb3JtKSB7XG4gIHRoaXMueGZvcm0gPSB4Zm9ybTtcbiAgdGhpcy5mID0gZjtcbn1cblxuRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xufTtcblxuRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHYpO1xufTtcblxuRmlsdGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlcywgaW5wdXQpIHtcbiAgaWYodGhpcy5mKGlucHV0KSkge1xuICAgIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlcywgaW5wdXQpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5mdW5jdGlvbiBmaWx0ZXIoY29sbCwgZiwgY3R4KSB7XG4gIGlmKGlzRnVuY3Rpb24oY29sbCkpIHsgY3R4ID0gZjsgZiA9IGNvbGw7IGNvbGwgPSBudWxsOyB9XG4gIGYgPSBib3VuZChmLCBjdHgpO1xuXG4gIGlmKGNvbGwpIHtcbiAgICBpZihpc0FycmF5KGNvbGwpKSB7XG4gICAgICByZXR1cm4gYXJyYXlGaWx0ZXIoY29sbCwgZiwgY3R4KTtcbiAgICB9XG4gICAgcmV0dXJuIHNlcShjb2xsLCBmaWx0ZXIoZikpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHhmb3JtKSB7XG4gICAgcmV0dXJuIG5ldyBGaWx0ZXIoZiwgeGZvcm0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZW1vdmUoY29sbCwgZiwgY3R4KSB7XG4gIGlmKGlzRnVuY3Rpb24oY29sbCkpIHsgY3R4ID0gZjsgZiA9IGNvbGw7IGNvbGwgPSBudWxsOyB9XG4gIGYgPSBib3VuZChmLCBjdHgpO1xuICByZXR1cm4gZmlsdGVyKGNvbGwsIGZ1bmN0aW9uKHgpIHsgcmV0dXJuICFmKHgpOyB9KTtcbn1cblxuZnVuY3Rpb24ga2VlcChjb2xsKSB7XG4gIHJldHVybiBmaWx0ZXIoY29sbCwgZnVuY3Rpb24oeCkgeyByZXR1cm4geCAhPSBudWxsIH0pO1xufVxuXG5mdW5jdGlvbiBEZWR1cGUoeGZvcm0pIHtcbiAgdGhpcy54Zm9ybSA9IHhmb3JtO1xuICB0aGlzLmxhc3QgPSB1bmRlZmluZWQ7XG59XG5cbkRlZHVwZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbn07XG5cbkRlZHVwZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh2KTtcbn07XG5cbkRlZHVwZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gIGlmKGlucHV0ICE9PSB0aGlzLmxhc3QpIHtcbiAgICB0aGlzLmxhc3QgPSBpbnB1dDtcbiAgICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZnVuY3Rpb24gZGVkdXBlKGNvbGwpIHtcbiAgaWYoY29sbCkge1xuICAgIHJldHVybiBzZXEoY29sbCwgZGVkdXBlKCkpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHhmb3JtKSB7XG4gICAgcmV0dXJuIG5ldyBEZWR1cGUoeGZvcm0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIFRha2VXaGlsZShmLCB4Zm9ybSkge1xuICB0aGlzLnhmb3JtID0geGZvcm07XG4gIHRoaXMuZiA9IGY7XG59XG5cblRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbn07XG5cblRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh2KTtcbn07XG5cblRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gIGlmKHRoaXMuZihpbnB1dCkpIHtcbiAgICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgfVxuICByZXR1cm4gbmV3IFJlZHVjZWQocmVzdWx0KTtcbn07XG5cbmZ1bmN0aW9uIHRha2VXaGlsZShjb2xsLCBmLCBjdHgpIHtcbiAgaWYoaXNGdW5jdGlvbihjb2xsKSkgeyBjdHggPSBmOyBmID0gY29sbDsgY29sbCA9IG51bGw7IH1cbiAgZiA9IGJvdW5kKGYsIGN0eCk7XG5cbiAgaWYoY29sbCkge1xuICAgIHJldHVybiBzZXEoY29sbCwgdGFrZVdoaWxlKGYpKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbih4Zm9ybSkge1xuICAgIHJldHVybiBuZXcgVGFrZVdoaWxlKGYsIHhmb3JtKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBUYWtlKG4sIHhmb3JtKSB7XG4gIHRoaXMubiA9IG47XG4gIHRoaXMuaSA9IDA7XG4gIHRoaXMueGZvcm0gPSB4Zm9ybTtcbn1cblxuVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbn07XG5cblRha2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odik7XG59O1xuXG5UYWtlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgaWYgKHRoaXMuaSA8IHRoaXMubikge1xuICAgIHJlc3VsdCA9IHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gICAgaWYodGhpcy5pICsgMSA+PSB0aGlzLm4pIHtcbiAgICAgIC8vIEZpbmlzaCByZWR1Y2luZyBvbiB0aGUgc2FtZSBzdGVwIGFzIHRoZSBmaW5hbCB2YWx1ZS4gVE9ETzpcbiAgICAgIC8vIGRvdWJsZS1jaGVjayB0aGF0IHRoaXMgZG9lc24ndCBicmVhayBhbnkgc2VtYW50aWNzXG4gICAgICByZXN1bHQgPSBlbnN1cmVSZWR1Y2VkKHJlc3VsdCk7XG4gICAgfVxuICB9XG4gIHRoaXMuaSsrO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZnVuY3Rpb24gdGFrZShjb2xsLCBuKSB7XG4gIGlmKGlzTnVtYmVyKGNvbGwpKSB7IG4gPSBjb2xsOyBjb2xsID0gbnVsbCB9XG5cbiAgaWYoY29sbCkge1xuICAgIHJldHVybiBzZXEoY29sbCwgdGFrZShuKSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oeGZvcm0pIHtcbiAgICByZXR1cm4gbmV3IFRha2UobiwgeGZvcm0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIERyb3AobiwgeGZvcm0pIHtcbiAgdGhpcy5uID0gbjtcbiAgdGhpcy5pID0gMDtcbiAgdGhpcy54Zm9ybSA9IHhmb3JtO1xufVxuXG5Ecm9wLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xufTtcblxuRHJvcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh2KTtcbn07XG5cbkRyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICBpZih0aGlzLmkrKyA8IHRoaXMubikge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG59O1xuXG5mdW5jdGlvbiBkcm9wKGNvbGwsIG4pIHtcbiAgaWYoaXNOdW1iZXIoY29sbCkpIHsgbiA9IGNvbGw7IGNvbGwgPSBudWxsIH1cblxuICBpZihjb2xsKSB7XG4gICAgcmV0dXJuIHNlcShjb2xsLCBkcm9wKG4pKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbih4Zm9ybSkge1xuICAgIHJldHVybiBuZXcgRHJvcChuLCB4Zm9ybSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gRHJvcFdoaWxlKGYsIHhmb3JtKSB7XG4gIHRoaXMueGZvcm0gPSB4Zm9ybTtcbiAgdGhpcy5mID0gZjtcbiAgdGhpcy5kcm9wcGluZyA9IHRydWU7XG59XG5cbkRyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbn07XG5cbkRyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh2KTtcbn07XG5cbkRyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gIGlmKHRoaXMuZHJvcHBpbmcpIHtcbiAgICBpZih0aGlzLmYoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcHBpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG59O1xuXG5mdW5jdGlvbiBkcm9wV2hpbGUoY29sbCwgZiwgY3R4KSB7XG4gIGlmKGlzRnVuY3Rpb24oY29sbCkpIHsgY3R4ID0gZjsgZiA9IGNvbGw7IGNvbGwgPSBudWxsOyB9XG4gIGYgPSBib3VuZChmLCBjdHgpO1xuXG4gIGlmKGNvbGwpIHtcbiAgICByZXR1cm4gc2VxKGNvbGwsIGRyb3BXaGlsZShmKSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oeGZvcm0pIHtcbiAgICByZXR1cm4gbmV3IERyb3BXaGlsZShmLCB4Zm9ybSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gUGFydGl0aW9uKG4sIHhmb3JtKSB7XG4gIHRoaXMubiA9IG47XG4gIHRoaXMuaSA9IDA7XG4gIHRoaXMueGZvcm0gPSB4Zm9ybTtcbiAgdGhpcy5wYXJ0ID0gbmV3IEFycmF5KG4pO1xufVxuXG5QYXJ0aXRpb24ucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG59O1xuXG5QYXJ0aXRpb24ucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbih2KSB7XG4gIGlmICh0aGlzLmkgPiAwKSB7XG4gICAgcmV0dXJuIGVuc3VyZVVucmVkdWNlZCh0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKHYsIHRoaXMucGFydC5zbGljZSgwLCB0aGlzLmkpKSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh2KTtcbn07XG5cblBhcnRpdGlvbi5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gIHRoaXMucGFydFt0aGlzLmldID0gaW5wdXQ7XG4gIHRoaXMuaSArPSAxO1xuICBpZiAodGhpcy5pID09PSB0aGlzLm4pIHtcbiAgICB2YXIgb3V0ID0gdGhpcy5wYXJ0LnNsaWNlKDAsIHRoaXMubik7XG4gICAgdGhpcy5wYXJ0ID0gbmV3IEFycmF5KHRoaXMubik7XG4gICAgdGhpcy5pID0gMDtcbiAgICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIG91dCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIHBhcnRpdGlvbihjb2xsLCBuKSB7XG4gIGlmIChpc051bWJlcihjb2xsKSkge1xuICAgIG4gPSBjb2xsOyBjb2xsID0gbnVsbDtcbiAgfVxuXG4gIGlmIChjb2xsKSB7XG4gICAgcmV0dXJuIHNlcShjb2xsLCBwYXJ0aXRpb24obikpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHhmb3JtKSB7XG4gICAgcmV0dXJuIG5ldyBQYXJ0aXRpb24obiwgeGZvcm0pO1xuICB9O1xufVxuXG52YXIgTk9USElORyA9IHt9O1xuXG5mdW5jdGlvbiBQYXJ0aXRpb25CeShmLCB4Zm9ybSkge1xuICAvLyBUT0RPOiB0YWtlIGFuIFwib3B0c1wiIG9iamVjdCB0aGF0IGFsbG93cyB0aGUgdXNlciB0byBzcGVjaWZ5XG4gIC8vIGVxdWFsaXR5XG4gIHRoaXMuZiA9IGY7XG4gIHRoaXMueGZvcm0gPSB4Zm9ybTtcbiAgdGhpcy5wYXJ0ID0gW107XG4gIHRoaXMubGFzdCA9IE5PVEhJTkc7XG59XG5cblBhcnRpdGlvbkJ5LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xufTtcblxuUGFydGl0aW9uQnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbih2KSB7XG4gIHZhciBsID0gdGhpcy5wYXJ0Lmxlbmd0aDtcbiAgaWYgKGwgPiAwKSB7XG4gICAgcmV0dXJuIGVuc3VyZVVucmVkdWNlZCh0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKHYsIHRoaXMucGFydC5zbGljZSgwLCBsKSkpO1xuICB9XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odik7XG59O1xuXG5QYXJ0aXRpb25CeS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gIHZhciBjdXJyZW50ID0gdGhpcy5mKGlucHV0KTtcbiAgaWYgKGN1cnJlbnQgPT09IHRoaXMubGFzdCB8fCB0aGlzLmxhc3QgPT09IE5PVEhJTkcpIHtcbiAgICB0aGlzLnBhcnQucHVzaChpbnB1dCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMucGFydCk7XG4gICAgdGhpcy5wYXJ0ID0gW2lucHV0XTtcbiAgfVxuICB0aGlzLmxhc3QgPSBjdXJyZW50O1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZnVuY3Rpb24gcGFydGl0aW9uQnkoY29sbCwgZiwgY3R4KSB7XG4gIGlmIChpc0Z1bmN0aW9uKGNvbGwpKSB7IGN0eCA9IGY7IGYgPSBjb2xsOyBjb2xsID0gbnVsbDsgfVxuICBmID0gYm91bmQoZiwgY3R4KTtcblxuICBpZiAoY29sbCkge1xuICAgIHJldHVybiBzZXEoY29sbCwgcGFydGl0aW9uQnkoZikpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHhmb3JtKSB7XG4gICAgcmV0dXJuIG5ldyBQYXJ0aXRpb25CeShmLCB4Zm9ybSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIEludGVycG9zZShzZXAsIHhmb3JtKSB7XG4gIHRoaXMuc2VwID0gc2VwO1xuICB0aGlzLnhmb3JtID0geGZvcm07XG4gIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xufVxuXG5JbnRlcnBvc2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG59O1xuXG5JbnRlcnBvc2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odik7XG59O1xuXG5JbnRlcnBvc2UucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICBpZiAodGhpcy5zdGFydGVkKSB7XG4gICAgdmFyIHdpdGhTZXAgPSB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5zZXApO1xuICAgIGlmIChpc1JlZHVjZWQod2l0aFNlcCkpIHtcbiAgICAgIHJldHVybiB3aXRoU2VwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSh3aXRoU2VwLCBpbnB1dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBpbnB1dCk7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBjb2xsZWN0aW9uIGNvbnRhaW5pbmcgZWxlbWVudHMgb2YgdGhlIGdpdmVuXG4gKiBjb2xsZWN0aW9uLCBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBzZXBhcmF0b3IuIFJldHVybnMgYVxuICogdHJhbnNkdWNlciBpZiBhIGNvbGxlY3Rpb24gaXMgbm90IHByb3ZpZGVkLlxuICovXG5mdW5jdGlvbiBpbnRlcnBvc2UoY29sbCwgc2VwYXJhdG9yKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgc2VwYXJhdG9yID0gY29sbDtcbiAgICByZXR1cm4gZnVuY3Rpb24oeGZvcm0pIHtcbiAgICAgIHJldHVybiBuZXcgSW50ZXJwb3NlKHNlcGFyYXRvciwgeGZvcm0pO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHNlcShjb2xsLCBpbnRlcnBvc2Uoc2VwYXJhdG9yKSk7XG59XG5cbmZ1bmN0aW9uIFJlcGVhdChuLCB4Zm9ybSkge1xuICB0aGlzLnhmb3JtID0geGZvcm07XG4gIHRoaXMubiA9IG47XG59XG5cblJlcGVhdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbn07XG5cblJlcGVhdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSh2KTtcbn07XG5cblJlcGVhdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gIHZhciBuID0gdGhpcy5uO1xuICB2YXIgciA9IHJlc3VsdDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICByID0gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyLCBpbnB1dCk7XG4gICAgaWYgKGlzUmVkdWNlZChyKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGNvbGxlY3Rpb24gY29udGFpbmluZyBlbGVtZW50cyBvZiB0aGUgZ2l2ZW5cbiAqIGNvbGxlY3Rpb24sIGVhY2ggcmVwZWF0ZWQgbiB0aW1lcy4gUmV0dXJucyBhIHRyYW5zZHVjZXIgaWYgYVxuICogY29sbGVjdGlvbiBpcyBub3QgcHJvdmlkZWQuXG4gKi9cbmZ1bmN0aW9uIHJlcGVhdChjb2xsLCBuKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgbiA9IGNvbGw7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHhmb3JtKSB7XG4gICAgICByZXR1cm4gbmV3IFJlcGVhdChuLCB4Zm9ybSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gc2VxKGNvbGwsIHJlcGVhdChuKSk7XG59XG5cbmZ1bmN0aW9uIFRha2VOdGgobiwgeGZvcm0pIHtcbiAgdGhpcy54Zm9ybSA9IHhmb3JtO1xuICB0aGlzLm4gPSBuO1xuICB0aGlzLmkgPSAtMTtcbn1cblxuVGFrZU50aC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMueGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbn07XG5cblRha2VOdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odik7XG59O1xuXG5UYWtlTnRoLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKHJlc3VsdCwgaW5wdXQpIHtcbiAgdGhpcy5pICs9IDE7XG4gIGlmICh0aGlzLmkgJSB0aGlzLm4gPT09IDApIHtcbiAgICByZXR1cm4gdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IGNvbGxlY3Rpb24gb2YgZXZlcnkgbnRoIGVsZW1lbnQgb2YgdGhlIGdpdmVuXG4gKiBjb2xsZWN0aW9uLiBSZXR1cm5zIGEgdHJhbnNkdWNlciBpZiBhIGNvbGxlY3Rpb24gaXMgbm90IHByb3ZpZGVkLlxuICovXG5mdW5jdGlvbiB0YWtlTnRoKGNvbGwsIG50aCkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIG50aCA9IGNvbGw7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHhmb3JtKSB7XG4gICAgICByZXR1cm4gbmV3IFRha2VOdGgobnRoLCB4Zm9ybSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gc2VxKGNvbGwsIHRha2VOdGgobnRoKSk7XG59XG5cbi8vIHB1cmUgdHJhbnNkdWNlcnMgKGNhbm5vdCB0YWtlIGNvbGxlY3Rpb25zKVxuXG5mdW5jdGlvbiBDYXQoeGZvcm0pIHtcbiAgdGhpcy54Zm9ybSA9IHhmb3JtO1xufVxuXG5DYXQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvaW5pdCddKCk7XG59O1xuXG5DYXQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odik7XG59O1xuXG5DYXQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24ocmVzdWx0LCBpbnB1dCkge1xuICB2YXIgeGZvcm0gPSB0aGlzLnhmb3JtO1xuICB2YXIgbmV3eGZvcm0gPSB7fTtcbiAgbmV3eGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geGZvcm1bJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbiAgfTtcbiAgbmV3eGZvcm1bJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfTtcbiAgbmV3eGZvcm1bJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihyZXN1bHQsIGlucHV0KSB7XG4gICAgdmFyIHZhbCA9IHhmb3JtWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICAgIHJldHVybiBpc1JlZHVjZWQodmFsKSA/IGRlcmVmKHZhbCkgOiB2YWw7XG4gIH07XG5cbiAgcmV0dXJuIHJlZHVjZShpbnB1dCwgbmV3eGZvcm0sIHJlc3VsdCk7XG59O1xuXG5mdW5jdGlvbiBjYXQoeGZvcm0pIHtcbiAgcmV0dXJuIG5ldyBDYXQoeGZvcm0pO1xufVxuXG5mdW5jdGlvbiBtYXBjYXQoZiwgY3R4KSB7XG4gIGYgPSBib3VuZChmLCBjdHgpO1xuICByZXR1cm4gY29tcG9zZShtYXAoZiksIGNhdCk7XG59XG5cbi8vIGNvbGxlY3Rpb24gaGVscGVyc1xuXG5mdW5jdGlvbiBwdXNoKGFyciwgeCkge1xuICBhcnIucHVzaCh4KTtcbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gbWVyZ2Uob2JqLCB4KSB7XG4gIGlmKGlzQXJyYXkoeCkgJiYgeC5sZW5ndGggPT09IDIpIHtcbiAgICBvYmpbeFswXV0gPSB4WzFdO1xuICB9XG4gIGVsc2Uge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoeCk7XG4gICAgdmFyIGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGZvcih2YXIgaT0wOyBpPGxlbjsgaSsrKSB7XG4gICAgICBvYmpba2V5c1tpXV0gPSB4W2tleXNbaV1dO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG52YXIgYXJyYXlSZWR1Y2VyID0ge307XG5hcnJheVJlZHVjZXJbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFtdO1xufTtcbmFycmF5UmVkdWNlclsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gdjtcbn07XG5hcnJheVJlZHVjZXJbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBwdXNoO1xuXG52YXIgb2JqUmVkdWNlciA9IHt9O1xub2JqUmVkdWNlclsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4ge307XG59O1xub2JqUmVkdWNlclsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gdjtcbn07XG5vYmpSZWR1Y2VyWydAQHRyYW5zZHVjZXIvc3RlcCddID0gbWVyZ2U7XG5cbi8vIGJ1aWxkaW5nIG5ldyBjb2xsZWN0aW9uc1xuXG5mdW5jdGlvbiB0b0FycmF5KGNvbGwsIHhmb3JtKSB7XG4gIGlmKCF4Zm9ybSkge1xuICAgIHJldHVybiByZWR1Y2UoY29sbCwgYXJyYXlSZWR1Y2VyLCBbXSk7XG4gIH1cbiAgcmV0dXJuIHRyYW5zZHVjZShjb2xsLCB4Zm9ybSwgYXJyYXlSZWR1Y2VyLCBbXSk7XG59XG5cbmZ1bmN0aW9uIHRvT2JqKGNvbGwsIHhmb3JtKSB7XG4gIGlmKCF4Zm9ybSkge1xuICAgIHJldHVybiByZWR1Y2UoY29sbCwgb2JqUmVkdWNlciwge30pO1xuICB9XG4gIHJldHVybiB0cmFuc2R1Y2UoY29sbCwgeGZvcm0sIG9ialJlZHVjZXIsIHt9KTtcbn1cblxuZnVuY3Rpb24gdG9JdGVyKGNvbGwsIHhmb3JtKSB7XG4gIGlmKCF4Zm9ybSkge1xuICAgIHJldHVybiBpdGVyYXRvcihjb2xsKTtcbiAgfVxuICByZXR1cm4gbmV3IExhenlUcmFuc2Zvcm1lcih4Zm9ybSwgY29sbCk7XG59XG5cbmZ1bmN0aW9uIHNlcShjb2xsLCB4Zm9ybSkge1xuICBpZihpc0FycmF5KGNvbGwpKSB7XG4gICAgcmV0dXJuIHRyYW5zZHVjZShjb2xsLCB4Zm9ybSwgYXJyYXlSZWR1Y2VyLCBbXSk7XG4gIH1cbiAgZWxzZSBpZihpc09iamVjdChjb2xsKSkge1xuICAgIHJldHVybiB0cmFuc2R1Y2UoY29sbCwgeGZvcm0sIG9ialJlZHVjZXIsIHt9KTtcbiAgfVxuICBlbHNlIGlmKGNvbGxbJ0BAdHJhbnNkdWNlci9zdGVwJ10pIHtcbiAgICB2YXIgaW5pdDtcbiAgICBpZihjb2xsWydAQHRyYW5zZHVjZXIvaW5pdCddKSB7XG4gICAgICBpbml0ID0gY29sbFsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGluaXQgPSBuZXcgY29sbC5jb25zdHJ1Y3RvcigpO1xuICAgIH1cblxuICAgIHJldHVybiB0cmFuc2R1Y2UoY29sbCwgeGZvcm0sIGNvbGwsIGluaXQpO1xuICB9XG4gIGVsc2UgaWYoZnVsZmlsbHNQcm90b2NvbChjb2xsLCAnaXRlcmF0b3InKSkge1xuICAgIHJldHVybiBuZXcgTGF6eVRyYW5zZm9ybWVyKHhmb3JtLCBjb2xsKTtcbiAgfVxuICB0aHJvd1Byb3RvY29sRXJyb3IoJ3NlcXVlbmNlJywgY29sbCk7XG59XG5cbmZ1bmN0aW9uIGludG8odG8sIHhmb3JtLCBmcm9tKSB7XG4gIGlmKGlzQXJyYXkodG8pKSB7XG4gICAgcmV0dXJuIHRyYW5zZHVjZShmcm9tLCB4Zm9ybSwgYXJyYXlSZWR1Y2VyLCB0byk7XG4gIH1cbiAgZWxzZSBpZihpc09iamVjdCh0bykpIHtcbiAgICByZXR1cm4gdHJhbnNkdWNlKGZyb20sIHhmb3JtLCBvYmpSZWR1Y2VyLCB0byk7XG4gIH1cbiAgZWxzZSBpZih0b1snQEB0cmFuc2R1Y2VyL3N0ZXAnXSkge1xuICAgIHJldHVybiB0cmFuc2R1Y2UoZnJvbSxcbiAgICAgICAgICAgICAgICAgICAgIHhmb3JtLFxuICAgICAgICAgICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICAgICAgICAgICB0byk7XG4gIH1cbiAgdGhyb3dQcm90b2NvbEVycm9yKCdpbnRvJywgdG8pO1xufVxuXG4vLyBsYXppbmVzc1xuXG52YXIgc3RlcHBlciA9IHt9O1xuc3RlcHBlclsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gaXNSZWR1Y2VkKHYpID8gZGVyZWYodikgOiB2O1xufTtcbnN0ZXBwZXJbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbihsdCwgeCkge1xuICBsdC5pdGVtcy5wdXNoKHgpO1xuICByZXR1cm4gbHQucmVzdDtcbn07XG5cbmZ1bmN0aW9uIFN0ZXBwZXIoeGZvcm0sIGl0ZXIpIHtcbiAgdGhpcy54Zm9ybSA9IHhmb3JtKHN0ZXBwZXIpO1xuICB0aGlzLml0ZXIgPSBpdGVyO1xufVxuXG5TdGVwcGVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKGx0KSB7XG4gIHZhciBsZW4gPSBsdC5pdGVtcy5sZW5ndGg7XG4gIHdoaWxlKGx0Lml0ZW1zLmxlbmd0aCA9PT0gbGVuKSB7XG4gICAgdmFyIG4gPSB0aGlzLml0ZXIubmV4dCgpO1xuICAgIGlmKG4uZG9uZSB8fCBpc1JlZHVjZWQobi52YWx1ZSkpIHtcbiAgICAgIC8vIGZpbmFsaXplXG4gICAgICB0aGlzLnhmb3JtWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odGhpcyk7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBzdGVwXG4gICAgdGhpcy54Zm9ybVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShsdCwgbi52YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gTGF6eVRyYW5zZm9ybWVyKHhmb3JtLCBjb2xsKSB7XG4gIHRoaXMuaXRlciA9IGl0ZXJhdG9yKGNvbGwpO1xuICB0aGlzLml0ZW1zID0gW107XG4gIHRoaXMuc3RlcHBlciA9IG5ldyBTdGVwcGVyKHhmb3JtLCBpdGVyYXRvcihjb2xsKSk7XG59XG5cbkxhenlUcmFuc2Zvcm1lci5wcm90b3R5cGVbcHJvdG9jb2xzLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcztcbn1cblxuTGF6eVRyYW5zZm9ybWVyLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXNbJ0BAdHJhbnNkdWNlci9zdGVwJ10oKTtcblxuICBpZih0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdGhpcy5pdGVtcy5wb3AoKSxcbiAgICAgIGRvbmU6IGZhbHNlXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiB7IGRvbmU6IHRydWUgfTtcbiAgfVxufTtcblxuTGF6eVRyYW5zZm9ybWVyLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uKCkge1xuICBpZighdGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICB0aGlzLnN0ZXBwZXJbJ0BAdHJhbnNkdWNlci9zdGVwJ10odGhpcyk7XG4gIH1cbn1cblxuLy8gdXRpbFxuXG5mdW5jdGlvbiByYW5nZShuKSB7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkobik7XG4gIGZvcih2YXIgaT0wOyBpPGFyci5sZW5ndGg7IGkrKykge1xuICAgIGFycltpXSA9IGk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlZHVjZTogcmVkdWNlLFxuICB0cmFuc2Zvcm1lcjogdHJhbnNmb3JtZXIsXG4gIFJlZHVjZWQ6IFJlZHVjZWQsXG4gIGlzUmVkdWNlZDogaXNSZWR1Y2VkLFxuICBpdGVyYXRvcjogaXRlcmF0b3IsXG4gIHB1c2g6IHB1c2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgdHJhbnNkdWNlOiB0cmFuc2R1Y2UsXG4gIHNlcTogc2VxLFxuICB0b0FycmF5OiB0b0FycmF5LFxuICB0b09iajogdG9PYmosXG4gIHRvSXRlcjogdG9JdGVyLFxuICBpbnRvOiBpbnRvLFxuICBjb21wb3NlOiBjb21wb3NlLFxuICBtYXA6IG1hcCxcbiAgZmlsdGVyOiBmaWx0ZXIsXG4gIHJlbW92ZTogcmVtb3ZlLFxuICBjYXQ6IGNhdCxcbiAgbWFwY2F0OiBtYXBjYXQsXG4gIGtlZXA6IGtlZXAsXG4gIGRlZHVwZTogZGVkdXBlLFxuICB0YWtlOiB0YWtlLFxuICB0YWtlV2hpbGU6IHRha2VXaGlsZSxcbiAgdGFrZU50aDogdGFrZU50aCxcbiAgZHJvcDogZHJvcCxcbiAgZHJvcFdoaWxlOiBkcm9wV2hpbGUsXG4gIHBhcnRpdGlvbjogcGFydGl0aW9uLFxuICBwYXJ0aXRpb25CeTogcGFydGl0aW9uQnksXG4gIGludGVycG9zZTogaW50ZXJwb3NlLFxuICByZXBlYXQ6IHJlcGVhdCxcbiAgcmFuZ2U6IHJhbmdlLFxuXG4gIExhenlUcmFuc2Zvcm1lcjogTGF6eVRyYW5zZm9ybWVyXG59O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvcmlnaW5hbE1vZHVsZSkge1xuXHRpZiAoIW9yaWdpbmFsTW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdHZhciBtb2R1bGUgPSBPYmplY3QuY3JlYXRlKG9yaWdpbmFsTW9kdWxlKTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJleHBvcnRzXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWVcblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvT2JzZXJ2YWJsZS5qcycpLk9ic2VydmFibGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuT2JzZXJ2YWJsZSA9IHZvaWQgMDtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG4vLyA9PT0gU3ltYm9sIFN1cHBvcnQgPT09XG52YXIgaGFzU3ltYm9scyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbic7XG59O1xuXG52YXIgaGFzU3ltYm9sID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIGhhc1N5bWJvbHMoKSAmJiBCb29sZWFuKFN5bWJvbFtuYW1lXSk7XG59O1xuXG52YXIgZ2V0U3ltYm9sID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIGhhc1N5bWJvbChuYW1lKSA/IFN5bWJvbFtuYW1lXSA6ICdAQCcgKyBuYW1lO1xufTtcblxuaWYgKGhhc1N5bWJvbHMoKSAmJiAhaGFzU3ltYm9sKCdvYnNlcnZhYmxlJykpIHtcbiAgU3ltYm9sLm9ic2VydmFibGUgPSBTeW1ib2woJ29ic2VydmFibGUnKTtcbn1cblxudmFyIFN5bWJvbEl0ZXJhdG9yID0gZ2V0U3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFN5bWJvbE9ic2VydmFibGUgPSBnZXRTeW1ib2woJ29ic2VydmFibGUnKTtcbnZhciBTeW1ib2xTcGVjaWVzID0gZ2V0U3ltYm9sKCdzcGVjaWVzJyk7IC8vID09PSBBYnN0cmFjdCBPcGVyYXRpb25zID09PVxuXG5mdW5jdGlvbiBnZXRNZXRob2Qob2JqLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdW5kZWZpbmVkO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKHZhbHVlICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldFNwZWNpZXMob2JqKSB7XG4gIHZhciBjdG9yID0gb2JqLmNvbnN0cnVjdG9yO1xuXG4gIGlmIChjdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICBjdG9yID0gY3RvcltTeW1ib2xTcGVjaWVzXTtcblxuICAgIGlmIChjdG9yID09PSBudWxsKSB7XG4gICAgICBjdG9yID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjdG9yICE9PSB1bmRlZmluZWQgPyBjdG9yIDogT2JzZXJ2YWJsZTtcbn1cblxuZnVuY3Rpb24gaXNPYnNlcnZhYmxlKHgpIHtcbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBPYnNlcnZhYmxlOyAvLyBTUEVDOiBCcmFuZCBjaGVja1xufVxuXG5mdW5jdGlvbiBob3N0UmVwb3J0RXJyb3IoZSkge1xuICBpZiAoaG9zdFJlcG9ydEVycm9yLmxvZykge1xuICAgIGhvc3RSZXBvcnRFcnJvci5sb2coZSk7XG4gIH0gZWxzZSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBlO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVucXVldWUoZm4pIHtcbiAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGZuKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaG9zdFJlcG9ydEVycm9yKGUpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNsZWFudXBTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKSB7XG4gIHZhciBjbGVhbnVwID0gc3Vic2NyaXB0aW9uLl9jbGVhbnVwO1xuICBpZiAoY2xlYW51cCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG4gIHN1YnNjcmlwdGlvbi5fY2xlYW51cCA9IHVuZGVmaW5lZDtcblxuICBpZiAoIWNsZWFudXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cnkge1xuICAgIGlmICh0eXBlb2YgY2xlYW51cCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2xlYW51cCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdW5zdWJzY3JpYmUgPSBnZXRNZXRob2QoY2xlYW51cCwgJ3Vuc3Vic2NyaWJlJyk7XG5cbiAgICAgIGlmICh1bnN1YnNjcmliZSkge1xuICAgICAgICB1bnN1YnNjcmliZS5jYWxsKGNsZWFudXApO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGhvc3RSZXBvcnRFcnJvcihlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgc3Vic2NyaXB0aW9uLl9vYnNlcnZlciA9IHVuZGVmaW5lZDtcbiAgc3Vic2NyaXB0aW9uLl9xdWV1ZSA9IHVuZGVmaW5lZDtcbiAgc3Vic2NyaXB0aW9uLl9zdGF0ZSA9ICdjbG9zZWQnO1xufVxuXG5mdW5jdGlvbiBmbHVzaFN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgdmFyIHF1ZXVlID0gc3Vic2NyaXB0aW9uLl9xdWV1ZTtcblxuICBpZiAoIXF1ZXVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3Vic2NyaXB0aW9uLl9xdWV1ZSA9IHVuZGVmaW5lZDtcbiAgc3Vic2NyaXB0aW9uLl9zdGF0ZSA9ICdyZWFkeSc7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgIG5vdGlmeVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIHF1ZXVlW2ldLnR5cGUsIHF1ZXVlW2ldLnZhbHVlKTtcbiAgICBpZiAoc3Vic2NyaXB0aW9uLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5vdGlmeVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24sIHR5cGUsIHZhbHVlKSB7XG4gIHN1YnNjcmlwdGlvbi5fc3RhdGUgPSAncnVubmluZyc7XG4gIHZhciBvYnNlcnZlciA9IHN1YnNjcmlwdGlvbi5fb2JzZXJ2ZXI7XG5cbiAgdHJ5IHtcbiAgICB2YXIgbSA9IGdldE1ldGhvZChvYnNlcnZlciwgdHlwZSk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICBpZiAobSkgbS5jYWxsKG9ic2VydmVyLCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIGNsb3NlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIGlmIChtKSBtLmNhbGwob2JzZXJ2ZXIsIHZhbHVlKTtlbHNlIHRocm93IHZhbHVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnY29tcGxldGUnOlxuICAgICAgICBjbG9zZVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pO1xuICAgICAgICBpZiAobSkgbS5jYWxsKG9ic2VydmVyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgaG9zdFJlcG9ydEVycm9yKGUpO1xuICB9XG5cbiAgaWYgKHN1YnNjcmlwdGlvbi5fc3RhdGUgPT09ICdjbG9zZWQnKSBjbGVhbnVwU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbik7ZWxzZSBpZiAoc3Vic2NyaXB0aW9uLl9zdGF0ZSA9PT0gJ3J1bm5pbmcnKSBzdWJzY3JpcHRpb24uX3N0YXRlID0gJ3JlYWR5Jztcbn1cblxuZnVuY3Rpb24gb25Ob3RpZnkoc3Vic2NyaXB0aW9uLCB0eXBlLCB2YWx1ZSkge1xuICBpZiAoc3Vic2NyaXB0aW9uLl9zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHJldHVybjtcblxuICBpZiAoc3Vic2NyaXB0aW9uLl9zdGF0ZSA9PT0gJ2J1ZmZlcmluZycpIHtcbiAgICBzdWJzY3JpcHRpb24uX3F1ZXVlLnB1c2goe1xuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHN1YnNjcmlwdGlvbi5fc3RhdGUgIT09ICdyZWFkeScpIHtcbiAgICBzdWJzY3JpcHRpb24uX3N0YXRlID0gJ2J1ZmZlcmluZyc7XG4gICAgc3Vic2NyaXB0aW9uLl9xdWV1ZSA9IFt7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfV07XG4gICAgZW5xdWV1ZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZmx1c2hTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBub3RpZnlTdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uLCB0eXBlLCB2YWx1ZSk7XG59XG5cbnZhciBTdWJzY3JpcHRpb24gPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdWJzY3JpcHRpb24ob2JzZXJ2ZXIsIHN1YnNjcmliZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3Vic2NyaXB0aW9uKTtcblxuICAgIC8vIEFTU0VSVDogb2JzZXJ2ZXIgaXMgYW4gb2JqZWN0XG4gICAgLy8gQVNTRVJUOiBzdWJzY3JpYmVyIGlzIGNhbGxhYmxlXG4gICAgdGhpcy5fY2xlYW51cCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9vYnNlcnZlciA9IG9ic2VydmVyO1xuICAgIHRoaXMuX3F1ZXVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N0YXRlID0gJ2luaXRpYWxpemluZyc7XG4gICAgdmFyIHN1YnNjcmlwdGlvbk9ic2VydmVyID0gbmV3IFN1YnNjcmlwdGlvbk9ic2VydmVyKHRoaXMpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuX2NsZWFudXAgPSBzdWJzY3JpYmVyLmNhbGwodW5kZWZpbmVkLCBzdWJzY3JpcHRpb25PYnNlcnZlcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgc3Vic2NyaXB0aW9uT2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSAnaW5pdGlhbGl6aW5nJykgdGhpcy5fc3RhdGUgPSAncmVhZHknO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFN1YnNjcmlwdGlvbiwgW3tcbiAgICBrZXk6IFwidW5zdWJzY3JpYmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAodGhpcy5fc3RhdGUgIT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGNsb3NlU3Vic2NyaXB0aW9uKHRoaXMpO1xuICAgICAgICBjbGVhbnVwU3Vic2NyaXB0aW9uKHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJjbG9zZWRcIixcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA9PT0gJ2Nsb3NlZCc7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFN1YnNjcmlwdGlvbjtcbn0oKTtcblxudmFyIFN1YnNjcmlwdGlvbk9ic2VydmVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uT2JzZXJ2ZXIoc3Vic2NyaXB0aW9uKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN1YnNjcmlwdGlvbk9ic2VydmVyKTtcblxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHN1YnNjcmlwdGlvbjtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdWJzY3JpcHRpb25PYnNlcnZlciwgW3tcbiAgICBrZXk6IFwibmV4dFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuZXh0KHZhbHVlKSB7XG4gICAgICBvbk5vdGlmeSh0aGlzLl9zdWJzY3JpcHRpb24sICduZXh0JywgdmFsdWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlcnJvclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlcnJvcih2YWx1ZSkge1xuICAgICAgb25Ob3RpZnkodGhpcy5fc3Vic2NyaXB0aW9uLCAnZXJyb3InLCB2YWx1ZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbXBsZXRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgb25Ob3RpZnkodGhpcy5fc3Vic2NyaXB0aW9uLCAnY29tcGxldGUnKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY2xvc2VkXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaXB0aW9uLl9zdGF0ZSA9PT0gJ2Nsb3NlZCc7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFN1YnNjcmlwdGlvbk9ic2VydmVyO1xufSgpO1xuXG52YXIgT2JzZXJ2YWJsZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlcikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBPYnNlcnZhYmxlKTtcblxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JzZXJ2YWJsZSBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24nKTtcbiAgICBpZiAodHlwZW9mIHN1YnNjcmliZXIgIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoJ09ic2VydmFibGUgaW5pdGlhbGl6ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgdGhpcy5fc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoT2JzZXJ2YWJsZSwgW3tcbiAgICBrZXk6IFwic3Vic2NyaWJlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcgfHwgb2JzZXJ2ZXIgPT09IG51bGwpIHtcbiAgICAgICAgb2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgbmV4dDogb2JzZXJ2ZXIsXG4gICAgICAgICAgZXJyb3I6IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICBjb21wbGV0ZTogYXJndW1lbnRzWzJdXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKG9ic2VydmVyLCB0aGlzLl9zdWJzY3JpYmVyKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZm9yRWFjaFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoZm4gKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IF90aGlzLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBmbih2YWx1ZSwgZG9uZSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogcmVqZWN0LFxuICAgICAgICAgIGNvbXBsZXRlOiByZXNvbHZlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm1hcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXAoZm4pIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgdmFyIEMgPSBnZXRTcGVjaWVzKHRoaXMpO1xuICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gX3RoaXMyLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IGZuKHZhbHVlKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpbHRlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaWx0ZXIoZm4pIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgICAgdmFyIEMgPSBnZXRTcGVjaWVzKHRoaXMpO1xuICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gX3RoaXMzLnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBpZiAoIWZuKHZhbHVlKSkgcmV0dXJuO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9ic2VydmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwicmVkdWNlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlZHVjZShmbikge1xuICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHRocm93IG5ldyBUeXBlRXJyb3IoZm4gKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gICAgICB2YXIgQyA9IGdldFNwZWNpZXModGhpcyk7XG4gICAgICB2YXIgaGFzU2VlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxO1xuICAgICAgdmFyIGhhc1ZhbHVlID0gZmFsc2U7XG4gICAgICB2YXIgc2VlZCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIHZhciBhY2MgPSBzZWVkO1xuICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gX3RoaXM0LnN1YnNjcmliZSh7XG4gICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgZmlyc3QgPSAhaGFzVmFsdWU7XG4gICAgICAgICAgICBoYXNWYWx1ZSA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmICghZmlyc3QgfHwgaGFzU2VlZCkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGFjYyA9IGZuKGFjYywgdmFsdWUpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhY2MgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFoYXNWYWx1ZSAmJiAhaGFzU2VlZCkgcmV0dXJuIG9ic2VydmVyLmVycm9yKG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCByZWR1Y2UgYW4gZW1wdHkgc2VxdWVuY2UnKSk7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGFjYyk7XG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiY29uY2F0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbmNhdCgpIHtcbiAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgc291cmNlcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgc291cmNlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIEMgPSBnZXRTcGVjaWVzKHRoaXMpO1xuICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICB2YXIgc3Vic2NyaXB0aW9uO1xuICAgICAgICB2YXIgaW5kZXggPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0TmV4dChuZXh0KSB7XG4gICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV4dC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IoZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBzb3VyY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXJ0TmV4dChDLmZyb20oc291cmNlc1tpbmRleCsrXSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydE5leHQoX3RoaXM1KTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmxhdE1hcFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmbGF0TWFwKGZuKSB7XG4gICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcihmbiArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgICAgIHZhciBDID0gZ2V0U3BlY2llcyh0aGlzKTtcbiAgICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBbXTtcblxuICAgICAgICB2YXIgb3V0ZXIgPSBfdGhpczYuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gZm4odmFsdWUpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpbm5lciA9IEMuZnJvbSh2YWx1ZSkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKGlubmVyKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA+PSAwKSBzdWJzY3JpcHRpb25zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZUlmRG9uZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMucHVzaChpbm5lcik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKGUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbXBsZXRlSWZEb25lKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZUlmRG9uZSgpIHtcbiAgICAgICAgICBpZiAob3V0ZXIuY2xvc2VkICYmIHN1YnNjcmlwdGlvbnMubGVuZ3RoID09PSAwKSBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBzdWJzY3JpcHRpb25zLmZvckVhY2goZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgb3V0ZXIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogU3ltYm9sT2JzZXJ2YWJsZSxcbiAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiZnJvbVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tKHgpIHtcbiAgICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT09ICdmdW5jdGlvbicgPyB0aGlzIDogT2JzZXJ2YWJsZTtcbiAgICAgIGlmICh4ID09IG51bGwpIHRocm93IG5ldyBUeXBlRXJyb3IoeCArICcgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgICAgdmFyIG1ldGhvZCA9IGdldE1ldGhvZCh4LCBTeW1ib2xPYnNlcnZhYmxlKTtcblxuICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IG1ldGhvZC5jYWxsKHgpO1xuICAgICAgICBpZiAoT2JqZWN0KG9ic2VydmFibGUpICE9PSBvYnNlcnZhYmxlKSB0aHJvdyBuZXcgVHlwZUVycm9yKG9ic2VydmFibGUgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZShvYnNlcnZhYmxlKSAmJiBvYnNlcnZhYmxlLmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzU3ltYm9sKCdpdGVyYXRvcicpKSB7XG4gICAgICAgIG1ldGhvZCA9IGdldE1ldGhvZCh4LCBTeW1ib2xJdGVyYXRvcik7XG5cbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgIHJldHVybiBuZXcgQyhmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIGVucXVldWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY2xvc2VkKSByZXR1cm47XG4gICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IG1ldGhvZC5jYWxsKHgpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9pdGVtID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KF9pdGVtKTtcbiAgICAgICAgICAgICAgICAgIGlmIChvYnNlcnZlci5jbG9zZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoeCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgIGVucXVldWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNsb3NlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHgubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh4W2ldKTtcbiAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLmNsb3NlZCkgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcih4ICsgJyBpcyBub3Qgb2JzZXJ2YWJsZScpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJvZlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgaXRlbXMgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgaXRlbXNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBPYnNlcnZhYmxlO1xuICAgICAgcmV0dXJuIG5ldyBDKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICBlbnF1ZXVlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIuY2xvc2VkKSByZXR1cm47XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGl0ZW1zW2ldKTtcbiAgICAgICAgICAgIGlmIChvYnNlcnZlci5jbG9zZWQpIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogU3ltYm9sU3BlY2llcyxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBPYnNlcnZhYmxlO1xufSgpO1xuXG5leHBvcnRzLk9ic2VydmFibGUgPSBPYnNlcnZhYmxlO1xuXG5pZiAoaGFzU3ltYm9scygpKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYnNlcnZhYmxlLCBTeW1ib2woJ2V4dGVuc2lvbnMnKSwge1xuICAgIHZhbHVlOiB7XG4gICAgICBzeW1ib2w6IFN5bWJvbE9ic2VydmFibGUsXG4gICAgICBob3N0UmVwb3J0RXJyb3I6IGhvc3RSZXBvcnRFcnJvclxuICAgIH0sXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufSJdLCJzb3VyY2VSb290IjoiIn0=