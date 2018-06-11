/* eslint-disable */

/******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {},
            /******/
        }); // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__,
        ); // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true; // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter,
                /******/
            });
            /******/
        }
        /******/
    }; // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
        /******/ var getter =
            module && module.__esModule
                ? /******/ function getDefault() {
                      return module['default'];
                  }
                : /******/ function getModuleExports() {
                      return module;
                  };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 53));
    /******/
})(
    /************************************************************************/
    /******/ [
        /* 0 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            var INFOBOX_WIDTH = (exports.INFOBOX_WIDTH = 400);
            var INFOBOX_HEIGHT = (exports.INFOBOX_HEIGHT = 165);
            var INFOBOX_ARROW_SIZE = (exports.INFOBOX_ARROW_SIZE = 10);
            var INFOBOX_ARROW_SIZE_DOUBLE = (exports.INFOBOX_ARROW_SIZE_DOUBLE =
                INFOBOX_ARROW_SIZE * 2);
            var INFOBOX_ANIMATION_SPEED = (exports.INFOBOX_ANIMATION_SPEED = '150ms');
            var INFOBOX_BORDER_RADIUS = (exports.INFOBOX_BORDER_RADIUS = 5);
            var INFOBOX_BORDER_RADIUS_DOUBLE = (exports.INFOBOX_BORDER_RADIUS_DOUBLE =
                INFOBOX_BORDER_RADIUS * 2);
            var INFOBOX_BORDER_WIDTH = (exports.INFOBOX_BORDER_WIDTH = 1);
            var INFOBOX_MARGIN = (exports.INFOBOX_MARGIN = 24);
            var INFOBOX_PLACEMENT_GAP = (exports.INFOBOX_PLACEMENT_GAP = 8);

            // Colors
            var GREY_VERY_LIGHT = (exports.GREY_VERY_LIGHT = '#F2F2F2');
            var GREY_LIGHT = (exports.GREY_LIGHT = '#E1E1E1');
            var GREY_MEDIUM = (exports.GREY_MEDIUM = '#959595');
            var GREY_DARK = (exports.GREY_DARK = '#505050');

            /***/
        },
        /* 1 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            var INFOBOX_ARROW = (exports.INFOBOX_ARROW = '.___tour-guide-infobox-arrow');
            var INFOBOX_ARROW_BORDER = (exports.INFOBOX_ARROW_BORDER =
                '.___tour-guide-infobox-arrow-border');
            var INFOBOX_BUTTON_PRIMARY = (exports.INFOBOX_BUTTON_PRIMARY =
                '.___tour-guide-infobox-button-primary');
            var INFOBOX_BUTTON_SECONDARY = (exports.INFOBOX_BUTTON_SECONDARY =
                '.___tour-guide-infobox-button-secondary');
            var INFOBOX_CARD = (exports.INFOBOX_CARD = '.___tour-guide-infobox-card');
            var INFOBOX_DESCRIPTION = (exports.INFOBOX_DESCRIPTION =
                '.__tour-guide-infobox-description');
            var INFOBOX_FOOTER = (exports.INFOBOX_FOOTER = '.___tour-guide-infobox-footer');
            var INFOBOX_HEADER = (exports.INFOBOX_HEADER = '.___tour-guide-infobox-header');
            var INFOBOX_MORE_BUTTON = (exports.INFOBOX_MORE_BUTTON =
                '.___tour-guide-infobox-more-button');
            var INFOBOX_MORE_BUTTON_ACTIVE = (exports.INFOBOX_MORE_BUTTON_ACTIVE =
                '.___tour-guide-infobox-more-button-active');
            var INFOBOX_MORE_BUTTON_ICON = (exports.INFOBOX_MORE_BUTTON_ICON =
                '.___tour-guide-infobox-more-button-icons');
            var INFOBOX_STEPS = (exports.INFOBOX_STEPS = '.___tour-guide-infobox-steps');
            var INFOBOX_TITLE = (exports.INFOBOX_TITLE = '.___tour-guide-infobox-title');
            var INFOBOX_WRAPPER = (exports.INFOBOX_WRAPPER = '.___tour-guide-infobox-wrapper');
            var INFOBOX_MAIN = (exports.INFOBOX_MAIN = '.___tour-guide-infobox-main');
            var INFOBOX_MORE = (exports.INFOBOX_MORE = '.___tour-guide-infobox-more');
            var INFOBOX_MORE_ITEM = (exports.INFOBOX_MORE_ITEM =
                '.___tour-guide-infobox-more-item');
            var INFOBOX_MORE_ITEM_STATUS_WRAPPER = (exports.INFOBOX_MORE_ITEM_STATUS_WRAPPER =
                '.___tour-guide-infobox-more-item-status-wrapper');
            var INFOBOX_MORE_ITEM_STATUS = (exports.INFOBOX_MORE_ITEM_STATUS =
                '.___tour-guide-infobox-more-item-status');
            var INFOBOX_MORE_ITEM_TEXT = (exports.INFOBOX_MORE_ITEM_TEXT =
                '.___tour-guide-infobox-more-item-text');
            var INFOBOX_MORE_WRAPPER = (exports.INFOBOX_MORE_WRAPPER =
                '.___tour-guide-infobox-more-wrapper');
            var INFOBOX_IMAGE_WRAPPER = (exports.INFOBOX_IMAGE_WRAPPER =
                '.___tour-guide-infobox-image-wrapper');
            var INFOBOX_IMAGE = (exports.INFOBOX_IMAGE = '.___tour-guide-infobox-image');
            var INFOBOX_DIVIDER = (exports.INFOBOX_DIVIDER = '.___tour-guide-infobox-divider');

            var PULSE_WRAPPER = (exports.PULSE_WRAPPER = '.___tour-guide-pulse-wrapper');
            var PULSE_OUTER = (exports.PULSE_OUTER = '.___tour-guide-pulse-outer');
            var PULSE_INNER = (exports.PULSE_INNER = '.___tour-guide-pulse-inner');

            /***/
        },
        /* 2 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            var g;

            // This works in non-strict mode
            g = (function() {
                return this;
            })();

            try {
                // This works if eval is allowed (see CSP)
                g = g || Function('return this')() || (1, eval)('this');
            } catch (e) {
                // This works if the window reference is available
                if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object')
                    g = window;
            }

            // g can still be undefined, but nothing to do about it...
            // We return undefined, instead of nothing here, so it's
            // easier to handle this case. if(!global) { ...}

            module.exports = g;

            /***/
        },
        /* 3 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */ (function(setImmediate, global) {
                var _typeof =
                    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                        ? function(obj) {
                              return typeof obj;
                          }
                        : function(obj) {
                              return obj &&
                                  typeof Symbol === 'function' &&
                                  obj.constructor === Symbol &&
                                  obj !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof obj;
                          };

                (function() {
                    'use strict';

                    function Vnode(tag, key, attrs0, children, text, dom) {
                        return {
                            tag: tag,
                            key: key,
                            attrs: attrs0,
                            children: children,
                            text: text,
                            dom: dom,
                            domSize: undefined,
                            state: undefined,
                            _state: undefined,
                            events: undefined,
                            instance: undefined,
                            skip: false,
                        };
                    }
                    Vnode.normalize = function(node) {
                        if (Array.isArray(node))
                            return Vnode(
                                '[',
                                undefined,
                                undefined,
                                Vnode.normalizeChildren(node),
                                undefined,
                                undefined,
                            );
                        if (
                            node != null &&
                            (typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object'
                        )
                            return Vnode(
                                '#',
                                undefined,
                                undefined,
                                node === false ? '' : node,
                                undefined,
                                undefined,
                            );
                        return node;
                    };
                    Vnode.normalizeChildren = function normalizeChildren(children) {
                        for (var i = 0; i < children.length; i++) {
                            children[i] = Vnode.normalize(children[i]);
                        }
                        return children;
                    };
                    var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
                    var selectorCache = {};
                    var hasOwn = {}.hasOwnProperty;
                    function isEmpty(object) {
                        for (var key in object) {
                            if (hasOwn.call(object, key)) return false;
                        }
                        return true;
                    }
                    function compileSelector(selector) {
                        var match,
                            tag = 'div',
                            classes = [],
                            attrs = {};
                        while ((match = selectorParser.exec(selector))) {
                            var type = match[1],
                                value = match[2];
                            if (type === '' && value !== '') tag = value;
                            else if (type === '#') attrs.id = value;
                            else if (type === '.') classes.push(value);
                            else if (match[3][0] === '[') {
                                var attrValue = match[6];
                                if (attrValue)
                                    attrValue = attrValue
                                        .replace(/\\(["'])/g, '$1')
                                        .replace(/\\\\/g, '\\');
                                if (match[4] === 'class') classes.push(attrValue);
                                else
                                    attrs[match[4]] =
                                        attrValue === '' ? attrValue : attrValue || true;
                            }
                        }
                        if (classes.length > 0) attrs.className = classes.join(' ');
                        return (selectorCache[selector] = { tag: tag, attrs: attrs });
                    }
                    function execSelector(state, attrs, children) {
                        var hasAttrs = false,
                            childList,
                            text;
                        var className = attrs.className || attrs.class;
                        if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
                            var newAttrs = {};
                            for (var key in attrs) {
                                if (hasOwn.call(attrs, key)) {
                                    newAttrs[key] = attrs[key];
                                }
                            }
                            attrs = newAttrs;
                        }
                        for (var key in state.attrs) {
                            if (hasOwn.call(state.attrs, key)) {
                                attrs[key] = state.attrs[key];
                            }
                        }
                        if (className !== undefined) {
                            if (attrs.class !== undefined) {
                                attrs.class = undefined;
                                attrs.className = className;
                            }
                            if (state.attrs.className != null) {
                                attrs.className = state.attrs.className + ' ' + className;
                            }
                        }
                        for (var key in attrs) {
                            if (hasOwn.call(attrs, key) && key !== 'key') {
                                hasAttrs = true;
                                break;
                            }
                        }
                        if (
                            Array.isArray(children) &&
                            children.length === 1 &&
                            children[0] != null &&
                            children[0].tag === '#'
                        ) {
                            text = children[0].children;
                        } else {
                            childList = children;
                        }
                        return Vnode(
                            state.tag,
                            attrs.key,
                            hasAttrs ? attrs : undefined,
                            childList,
                            text,
                        );
                    }
                    function hyperscript(selector) {
                        // Because sloppy mode sucks
                        var attrs = arguments[1],
                            start = 2,
                            children;
                        if (
                            selector == null ||
                            (typeof selector !== 'string' &&
                                typeof selector !== 'function' &&
                                typeof selector.view !== 'function')
                        ) {
                            throw Error('The selector must be either a string or a component.');
                        }
                        if (typeof selector === 'string') {
                            var cached = selectorCache[selector] || compileSelector(selector);
                        }
                        if (attrs == null) {
                            attrs = {};
                        } else if (
                            (typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) !==
                                'object' ||
                            attrs.tag != null ||
                            Array.isArray(attrs)
                        ) {
                            attrs = {};
                            start = 1;
                        }
                        if (arguments.length === start + 1) {
                            children = arguments[start];
                            if (!Array.isArray(children)) children = [children];
                        } else {
                            children = [];
                            while (start < arguments.length) {
                                children.push(arguments[start++]);
                            }
                        }
                        var normalized = Vnode.normalizeChildren(children);
                        if (typeof selector === 'string') {
                            return execSelector(cached, attrs, normalized);
                        } else {
                            return Vnode(selector, attrs.key, attrs, normalized);
                        }
                    }
                    hyperscript.trust = function(html) {
                        if (html == null) html = '';
                        return Vnode('<', undefined, undefined, html, undefined, undefined);
                    };
                    hyperscript.fragment = function(attrs1, children) {
                        return Vnode(
                            '[',
                            attrs1.key,
                            attrs1,
                            Vnode.normalizeChildren(children),
                            undefined,
                            undefined,
                        );
                    };
                    var m = hyperscript;
                    /** @constructor */
                    var PromisePolyfill = function PromisePolyfill(executor) {
                        if (!(this instanceof PromisePolyfill))
                            throw new Error('Promise must be called with `new`');
                        if (typeof executor !== 'function')
                            throw new TypeError('executor must be a function');
                        var self = this,
                            resolvers = [],
                            rejectors = [],
                            resolveCurrent = handler(resolvers, true),
                            rejectCurrent = handler(rejectors, false);
                        var instance = (self._instance = {
                            resolvers: resolvers,
                            rejectors: rejectors,
                        });
                        var callAsync =
                            typeof setImmediate === 'function' ? setImmediate : setTimeout;
                        function handler(list, shouldAbsorb) {
                            return function execute(value) {
                                var then;
                                try {
                                    if (
                                        shouldAbsorb &&
                                        value != null &&
                                        ((typeof value === 'undefined'
                                            ? 'undefined'
                                            : _typeof(value)) === 'object' ||
                                            typeof value === 'function') &&
                                        typeof (then = value.then) === 'function'
                                    ) {
                                        if (value === self)
                                            throw new TypeError(
                                                "Promise can't be resolved w/ itself",
                                            );
                                        executeOnce(then.bind(value));
                                    } else {
                                        callAsync(function() {
                                            if (!shouldAbsorb && list.length === 0)
                                                console.error(
                                                    'Possible unhandled promise rejection:',
                                                    value,
                                                );
                                            for (var i = 0; i < list.length; i++) {
                                                list[i](value);
                                            }
                                            (resolvers.length = 0), (rejectors.length = 0);
                                            instance.state = shouldAbsorb;
                                            instance.retry = function() {
                                                execute(value);
                                            };
                                        });
                                    }
                                } catch (e) {
                                    rejectCurrent(e);
                                }
                            };
                        }
                        function executeOnce(then) {
                            var runs = 0;
                            function run(fn) {
                                return function(value) {
                                    if (runs++ > 0) return;
                                    fn(value);
                                };
                            }
                            var onerror = run(rejectCurrent);
                            try {
                                then(run(resolveCurrent), onerror);
                            } catch (e) {
                                onerror(e);
                            }
                        }
                        executeOnce(executor);
                    };
                    PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
                        var self = this,
                            instance = self._instance;
                        function handle(callback, list, next, state) {
                            list.push(function(value) {
                                if (typeof callback !== 'function') next(value);
                                else
                                    try {
                                        resolveNext(callback(value));
                                    } catch (e) {
                                        if (rejectNext) rejectNext(e);
                                    }
                            });
                            if (typeof instance.retry === 'function' && state === instance.state)
                                instance.retry();
                        }
                        var resolveNext, rejectNext;
                        var promise = new PromisePolyfill(function(resolve, reject) {
                            (resolveNext = resolve), (rejectNext = reject);
                        });
                        handle(onFulfilled, instance.resolvers, resolveNext, true),
                            handle(onRejection, instance.rejectors, rejectNext, false);
                        return promise;
                    };
                    PromisePolyfill.prototype.catch = function(onRejection) {
                        return this.then(null, onRejection);
                    };
                    PromisePolyfill.resolve = function(value) {
                        if (value instanceof PromisePolyfill) return value;
                        return new PromisePolyfill(function(resolve) {
                            resolve(value);
                        });
                    };
                    PromisePolyfill.reject = function(value) {
                        return new PromisePolyfill(function(resolve, reject) {
                            reject(value);
                        });
                    };
                    PromisePolyfill.all = function(list) {
                        return new PromisePolyfill(function(resolve, reject) {
                            var total = list.length,
                                count = 0,
                                values = [];
                            if (list.length === 0) resolve([]);
                            else
                                for (var i = 0; i < list.length; i++) {
                                    (function(i) {
                                        function consume(value) {
                                            count++;
                                            values[i] = value;
                                            if (count === total) resolve(values);
                                        }
                                        if (
                                            list[i] != null &&
                                            (_typeof(list[i]) === 'object' ||
                                                typeof list[i] === 'function') &&
                                            typeof list[i].then === 'function'
                                        ) {
                                            list[i].then(consume, reject);
                                        } else consume(list[i]);
                                    })(i);
                                }
                        });
                    };
                    PromisePolyfill.race = function(list) {
                        return new PromisePolyfill(function(resolve, reject) {
                            for (var i = 0; i < list.length; i++) {
                                list[i].then(resolve, reject);
                            }
                        });
                    };
                    if (typeof window !== 'undefined') {
                        if (typeof window.Promise === 'undefined') window.Promise = PromisePolyfill;
                        var PromisePolyfill = window.Promise;
                    } else if (typeof global !== 'undefined') {
                        if (typeof global.Promise === 'undefined') global.Promise = PromisePolyfill;
                        var PromisePolyfill = global.Promise;
                    } else {
                    }
                    var buildQueryString = function buildQueryString(object) {
                        if (Object.prototype.toString.call(object) !== '[object Object]') return '';
                        var args = [];
                        for (var key0 in object) {
                            destructure(key0, object[key0]);
                        }
                        return args.join('&');
                        function destructure(key0, value) {
                            if (Array.isArray(value)) {
                                for (var i = 0; i < value.length; i++) {
                                    destructure(key0 + '[' + i + ']', value[i]);
                                }
                            } else if (
                                Object.prototype.toString.call(value) === '[object Object]'
                            ) {
                                for (var i in value) {
                                    destructure(key0 + '[' + i + ']', value[i]);
                                }
                            } else
                                args.push(
                                    encodeURIComponent(key0) +
                                        (value != null && value !== ''
                                            ? '=' + encodeURIComponent(value)
                                            : ''),
                                );
                        }
                    };
                    var FILE_PROTOCOL_REGEX = new RegExp('^file://', 'i');
                    var _8 = function _8($window, Promise) {
                        var callbackCount = 0;
                        var oncompletion;
                        function setCompletionCallback(callback) {
                            oncompletion = callback;
                        }
                        function finalizer() {
                            var count = 0;
                            function complete() {
                                if (--count === 0 && typeof oncompletion === 'function')
                                    oncompletion();
                            }
                            return function finalize(promise0) {
                                var then0 = promise0.then;
                                promise0.then = function() {
                                    count++;
                                    var next = then0.apply(promise0, arguments);
                                    next.then(complete, function(e) {
                                        complete();
                                        if (count === 0) throw e;
                                    });
                                    return finalize(next);
                                };
                                return promise0;
                            };
                        }
                        function normalize(args, extra) {
                            if (typeof args === 'string') {
                                var url = args;
                                args = extra || {};
                                if (args.url == null) args.url = url;
                            }
                            return args;
                        }
                        function request(args, extra) {
                            var finalize = finalizer();
                            args = normalize(args, extra);
                            var promise0 = new Promise(function(resolve, reject) {
                                if (args.method == null) args.method = 'GET';
                                args.method = args.method.toUpperCase();
                                var useBody =
                                    args.method === 'GET' || args.method === 'TRACE'
                                        ? false
                                        : typeof args.useBody === 'boolean'
                                            ? args.useBody
                                            : true;
                                if (typeof args.serialize !== 'function')
                                    args.serialize =
                                        typeof FormData !== 'undefined' &&
                                        args.data instanceof FormData
                                            ? function(value) {
                                                  return value;
                                              }
                                            : JSON.stringify;
                                if (typeof args.deserialize !== 'function')
                                    args.deserialize = deserialize;
                                if (typeof args.extract !== 'function') args.extract = extract;
                                args.url = interpolate(args.url, args.data);
                                if (useBody) args.data = args.serialize(args.data);
                                else args.url = assemble(args.url, args.data);
                                var xhr = new $window.XMLHttpRequest(),
                                    aborted = false,
                                    _abort = xhr.abort;
                                xhr.abort = function abort() {
                                    aborted = true;
                                    _abort.call(xhr);
                                };
                                xhr.open(
                                    args.method,
                                    args.url,
                                    typeof args.async === 'boolean' ? args.async : true,
                                    typeof args.user === 'string' ? args.user : undefined,
                                    typeof args.password === 'string' ? args.password : undefined,
                                );
                                if (
                                    args.serialize === JSON.stringify &&
                                    useBody &&
                                    !(args.headers && args.headers.hasOwnProperty('Content-Type'))
                                ) {
                                    xhr.setRequestHeader(
                                        'Content-Type',
                                        'application/json; charset=utf-8',
                                    );
                                }
                                if (
                                    args.deserialize === deserialize &&
                                    !(args.headers && args.headers.hasOwnProperty('Accept'))
                                ) {
                                    xhr.setRequestHeader('Accept', 'application/json, text/*');
                                }
                                if (args.withCredentials)
                                    xhr.withCredentials = args.withCredentials;
                                for (var key in args.headers) {
                                    if ({}.hasOwnProperty.call(args.headers, key)) {
                                        xhr.setRequestHeader(key, args.headers[key]);
                                    }
                                }
                                if (typeof args.config === 'function')
                                    xhr = args.config(xhr, args) || xhr;
                                xhr.onreadystatechange = function() {
                                    // Don't throw errors on xhr.abort().
                                    if (aborted) return;
                                    if (xhr.readyState === 4) {
                                        try {
                                            var response =
                                                args.extract !== extract
                                                    ? args.extract(xhr, args)
                                                    : args.deserialize(args.extract(xhr, args));
                                            if (
                                                (xhr.status >= 200 && xhr.status < 300) ||
                                                xhr.status === 304 ||
                                                FILE_PROTOCOL_REGEX.test(args.url)
                                            ) {
                                                resolve(cast(args.type, response));
                                            } else {
                                                var error = new Error(xhr.responseText);
                                                for (var key in response) {
                                                    error[key] = response[key];
                                                }
                                                reject(error);
                                            }
                                        } catch (e) {
                                            reject(e);
                                        }
                                    }
                                };
                                if (useBody && args.data != null) xhr.send(args.data);
                                else xhr.send();
                            });
                            return args.background === true ? promise0 : finalize(promise0);
                        }
                        function jsonp(args, extra) {
                            var finalize = finalizer();
                            args = normalize(args, extra);
                            var promise0 = new Promise(function(resolve, reject) {
                                var callbackName =
                                    args.callbackName ||
                                    '_mithril_' +
                                        Math.round(Math.random() * 1e16) +
                                        '_' +
                                        callbackCount++;
                                var script = $window.document.createElement('script');
                                $window[callbackName] = function(data) {
                                    script.parentNode.removeChild(script);
                                    resolve(cast(args.type, data));
                                    delete $window[callbackName];
                                };
                                script.onerror = function() {
                                    script.parentNode.removeChild(script);
                                    reject(new Error('JSONP request failed'));
                                    delete $window[callbackName];
                                };
                                if (args.data == null) args.data = {};
                                args.url = interpolate(args.url, args.data);
                                args.data[args.callbackKey || 'callback'] = callbackName;
                                script.src = assemble(args.url, args.data);
                                $window.document.documentElement.appendChild(script);
                            });
                            return args.background === true ? promise0 : finalize(promise0);
                        }
                        function interpolate(url, data) {
                            if (data == null) return url;
                            var tokens = url.match(/:[^\/]+/gi) || [];
                            for (var i = 0; i < tokens.length; i++) {
                                var key = tokens[i].slice(1);
                                if (data[key] != null) {
                                    url = url.replace(tokens[i], data[key]);
                                }
                            }
                            return url;
                        }
                        function assemble(url, data) {
                            var querystring = buildQueryString(data);
                            if (querystring !== '') {
                                var prefix = url.indexOf('?') < 0 ? '?' : '&';
                                url += prefix + querystring;
                            }
                            return url;
                        }
                        function deserialize(data) {
                            try {
                                return data !== '' ? JSON.parse(data) : null;
                            } catch (e) {
                                throw new Error(data);
                            }
                        }
                        function extract(xhr) {
                            return xhr.responseText;
                        }
                        function cast(type0, data) {
                            if (typeof type0 === 'function') {
                                if (Array.isArray(data)) {
                                    for (var i = 0; i < data.length; i++) {
                                        data[i] = new type0(data[i]);
                                    }
                                } else return new type0(data);
                            }
                            return data;
                        }
                        return {
                            request: request,
                            jsonp: jsonp,
                            setCompletionCallback: setCompletionCallback,
                        };
                    };
                    var requestService = _8(window, PromisePolyfill);
                    var coreRenderer = function coreRenderer($window) {
                        var $doc = $window.document;
                        var $emptyFragment = $doc.createDocumentFragment();
                        var nameSpace = {
                            svg: 'http://www.w3.org/2000/svg',
                            math: 'http://www.w3.org/1998/Math/MathML',
                        };
                        var onevent;
                        function setEventCallback(callback) {
                            return (onevent = callback);
                        }
                        function getNameSpace(vnode) {
                            return (vnode.attrs && vnode.attrs.xmlns) || nameSpace[vnode.tag];
                        }
                        //create
                        function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
                            for (var i = start; i < end; i++) {
                                var vnode = vnodes[i];
                                if (vnode != null) {
                                    createNode(parent, vnode, hooks, ns, nextSibling);
                                }
                            }
                        }
                        function createNode(parent, vnode, hooks, ns, nextSibling) {
                            var tag = vnode.tag;
                            if (typeof tag === 'string') {
                                vnode.state = {};
                                if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
                                switch (tag) {
                                    case '#':
                                        return createText(parent, vnode, nextSibling);
                                    case '<':
                                        return createHTML(parent, vnode, nextSibling);
                                    case '[':
                                        return createFragment(
                                            parent,
                                            vnode,
                                            hooks,
                                            ns,
                                            nextSibling,
                                        );
                                    default:
                                        return createElement(parent, vnode, hooks, ns, nextSibling);
                                }
                            } else return createComponent(parent, vnode, hooks, ns, nextSibling);
                        }
                        function createText(parent, vnode, nextSibling) {
                            vnode.dom = $doc.createTextNode(vnode.children);
                            insertNode(parent, vnode.dom, nextSibling);
                            return vnode.dom;
                        }
                        function createHTML(parent, vnode, nextSibling) {
                            var match1 = vnode.children.match(/^\s*?<(\w+)/im) || [];
                            var parent1 =
                                {
                                    caption: 'table',
                                    thead: 'table',
                                    tbody: 'table',
                                    tfoot: 'table',
                                    tr: 'tbody',
                                    th: 'tr',
                                    td: 'tr',
                                    colgroup: 'table',
                                    col: 'colgroup',
                                }[match1[1]] || 'div';
                            var temp = $doc.createElement(parent1);
                            temp.innerHTML = vnode.children;
                            vnode.dom = temp.firstChild;
                            vnode.domSize = temp.childNodes.length;
                            var fragment = $doc.createDocumentFragment();
                            var child;
                            while ((child = temp.firstChild)) {
                                fragment.appendChild(child);
                            }
                            insertNode(parent, fragment, nextSibling);
                            return fragment;
                        }
                        function createFragment(parent, vnode, hooks, ns, nextSibling) {
                            var fragment = $doc.createDocumentFragment();
                            if (vnode.children != null) {
                                var children = vnode.children;
                                createNodes(
                                    fragment,
                                    children,
                                    0,
                                    children.length,
                                    hooks,
                                    null,
                                    ns,
                                );
                            }
                            vnode.dom = fragment.firstChild;
                            vnode.domSize = fragment.childNodes.length;
                            insertNode(parent, fragment, nextSibling);
                            return fragment;
                        }
                        function createElement(parent, vnode, hooks, ns, nextSibling) {
                            var tag = vnode.tag;
                            var attrs2 = vnode.attrs;
                            var is = attrs2 && attrs2.is;
                            ns = getNameSpace(vnode) || ns;
                            var element = ns
                                ? is
                                    ? $doc.createElementNS(ns, tag, { is: is })
                                    : $doc.createElementNS(ns, tag)
                                : is
                                    ? $doc.createElement(tag, { is: is })
                                    : $doc.createElement(tag);
                            vnode.dom = element;
                            if (attrs2 != null) {
                                setAttrs(vnode, attrs2, ns);
                            }
                            insertNode(parent, element, nextSibling);
                            if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
                                setContentEditable(vnode);
                            } else {
                                if (vnode.text != null) {
                                    if (vnode.text !== '') element.textContent = vnode.text;
                                    else
                                        vnode.children = [
                                            Vnode(
                                                '#',
                                                undefined,
                                                undefined,
                                                vnode.text,
                                                undefined,
                                                undefined,
                                            ),
                                        ];
                                }
                                if (vnode.children != null) {
                                    var children = vnode.children;
                                    createNodes(
                                        element,
                                        children,
                                        0,
                                        children.length,
                                        hooks,
                                        null,
                                        ns,
                                    );
                                    setLateAttrs(vnode);
                                }
                            }
                            return element;
                        }
                        function initComponent(vnode, hooks) {
                            var sentinel;
                            if (typeof vnode.tag.view === 'function') {
                                vnode.state = Object.create(vnode.tag);
                                sentinel = vnode.state.view;
                                if (sentinel.$$reentrantLock$$ != null) return $emptyFragment;
                                sentinel.$$reentrantLock$$ = true;
                            } else {
                                vnode.state = void 0;
                                sentinel = vnode.tag;
                                if (sentinel.$$reentrantLock$$ != null) return $emptyFragment;
                                sentinel.$$reentrantLock$$ = true;
                                vnode.state =
                                    vnode.tag.prototype != null &&
                                    typeof vnode.tag.prototype.view === 'function'
                                        ? new vnode.tag(vnode)
                                        : vnode.tag(vnode);
                            }
                            vnode._state = vnode.state;
                            if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks);
                            initLifecycle(vnode._state, vnode, hooks);
                            vnode.instance = Vnode.normalize(
                                vnode._state.view.call(vnode.state, vnode),
                            );
                            if (vnode.instance === vnode)
                                throw Error(
                                    'A view cannot return the vnode it received as argument',
                                );
                            sentinel.$$reentrantLock$$ = null;
                        }
                        function createComponent(parent, vnode, hooks, ns, nextSibling) {
                            initComponent(vnode, hooks);
                            if (vnode.instance != null) {
                                var element = createNode(
                                    parent,
                                    vnode.instance,
                                    hooks,
                                    ns,
                                    nextSibling,
                                );
                                vnode.dom = vnode.instance.dom;
                                vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0;
                                insertNode(parent, element, nextSibling);
                                return element;
                            } else {
                                vnode.domSize = 0;
                                return $emptyFragment;
                            }
                        }
                        //update
                        function updateNodes(
                            parent,
                            old,
                            vnodes,
                            recycling,
                            hooks,
                            nextSibling,
                            ns,
                        ) {
                            if (old === vnodes || (old == null && vnodes == null)) return;
                            else if (old == null)
                                createNodes(
                                    parent,
                                    vnodes,
                                    0,
                                    vnodes.length,
                                    hooks,
                                    nextSibling,
                                    ns,
                                );
                            else if (vnodes == null) removeNodes(old, 0, old.length, vnodes);
                            else {
                                if (old.length === vnodes.length) {
                                    var isUnkeyed = false;
                                    for (var i = 0; i < vnodes.length; i++) {
                                        if (vnodes[i] != null && old[i] != null) {
                                            isUnkeyed = vnodes[i].key == null && old[i].key == null;
                                            break;
                                        }
                                    }
                                    if (isUnkeyed) {
                                        for (var i = 0; i < old.length; i++) {
                                            if (old[i] === vnodes[i]) continue;
                                            else if (old[i] == null && vnodes[i] != null)
                                                createNode(
                                                    parent,
                                                    vnodes[i],
                                                    hooks,
                                                    ns,
                                                    getNextSibling(old, i + 1, nextSibling),
                                                );
                                            else if (vnodes[i] == null)
                                                removeNodes(old, i, i + 1, vnodes);
                                            else
                                                updateNode(
                                                    parent,
                                                    old[i],
                                                    vnodes[i],
                                                    hooks,
                                                    getNextSibling(old, i + 1, nextSibling),
                                                    recycling,
                                                    ns,
                                                );
                                        }
                                        return;
                                    }
                                }
                                recycling = recycling || isRecyclable(old, vnodes);
                                if (recycling) {
                                    var pool = old.pool;
                                    old = old.concat(old.pool);
                                }
                                var oldStart = 0,
                                    start = 0,
                                    oldEnd = old.length - 1,
                                    end = vnodes.length - 1,
                                    map;
                                while (oldEnd >= oldStart && end >= start) {
                                    var o = old[oldStart],
                                        v = vnodes[start];
                                    if (o === v && !recycling) oldStart++, start++;
                                    else if (o == null) oldStart++;
                                    else if (v == null) start++;
                                    else if (o.key === v.key) {
                                        var shouldRecycle =
                                            (pool != null &&
                                                oldStart >= old.length - pool.length) ||
                                            (pool == null && recycling);
                                        oldStart++, start++;
                                        updateNode(
                                            parent,
                                            o,
                                            v,
                                            hooks,
                                            getNextSibling(old, oldStart, nextSibling),
                                            shouldRecycle,
                                            ns,
                                        );
                                        if (recycling && o.tag === v.tag)
                                            insertNode(parent, toFragment(o), nextSibling);
                                    } else {
                                        var o = old[oldEnd];
                                        if (o === v && !recycling) oldEnd--, start++;
                                        else if (o == null) oldEnd--;
                                        else if (v == null) start++;
                                        else if (o.key === v.key) {
                                            var shouldRecycle =
                                                (pool != null &&
                                                    oldEnd >= old.length - pool.length) ||
                                                (pool == null && recycling);
                                            updateNode(
                                                parent,
                                                o,
                                                v,
                                                hooks,
                                                getNextSibling(old, oldEnd + 1, nextSibling),
                                                shouldRecycle,
                                                ns,
                                            );
                                            if (recycling || start < end)
                                                insertNode(
                                                    parent,
                                                    toFragment(o),
                                                    getNextSibling(old, oldStart, nextSibling),
                                                );
                                            oldEnd--, start++;
                                        } else break;
                                    }
                                }
                                while (oldEnd >= oldStart && end >= start) {
                                    var o = old[oldEnd],
                                        v = vnodes[end];
                                    if (o === v && !recycling) oldEnd--, end--;
                                    else if (o == null) oldEnd--;
                                    else if (v == null) end--;
                                    else if (o.key === v.key) {
                                        var shouldRecycle =
                                            (pool != null && oldEnd >= old.length - pool.length) ||
                                            (pool == null && recycling);
                                        updateNode(
                                            parent,
                                            o,
                                            v,
                                            hooks,
                                            getNextSibling(old, oldEnd + 1, nextSibling),
                                            shouldRecycle,
                                            ns,
                                        );
                                        if (recycling && o.tag === v.tag)
                                            insertNode(parent, toFragment(o), nextSibling);
                                        if (o.dom != null) nextSibling = o.dom;
                                        oldEnd--, end--;
                                    } else {
                                        if (!map) map = getKeyMap(old, oldEnd);
                                        if (v != null) {
                                            var oldIndex = map[v.key];
                                            if (oldIndex != null) {
                                                var movable = old[oldIndex];
                                                var shouldRecycle =
                                                    (pool != null &&
                                                        oldIndex >= old.length - pool.length) ||
                                                    (pool == null && recycling);
                                                updateNode(
                                                    parent,
                                                    movable,
                                                    v,
                                                    hooks,
                                                    getNextSibling(old, oldEnd + 1, nextSibling),
                                                    recycling,
                                                    ns,
                                                );
                                                insertNode(
                                                    parent,
                                                    toFragment(movable),
                                                    nextSibling,
                                                );
                                                old[oldIndex].skip = true;
                                                if (movable.dom != null) nextSibling = movable.dom;
                                            } else {
                                                var dom = createNode(
                                                    parent,
                                                    v,
                                                    hooks,
                                                    ns,
                                                    nextSibling,
                                                );
                                                nextSibling = dom;
                                            }
                                        }
                                        end--;
                                    }
                                    if (end < start) break;
                                }
                                createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                                removeNodes(old, oldStart, oldEnd + 1, vnodes);
                            }
                        }
                        function updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {
                            var oldTag = old.tag,
                                tag = vnode.tag;
                            if (oldTag === tag) {
                                vnode.state = old.state;
                                vnode._state = old._state;
                                vnode.events = old.events;
                                if (!recycling && shouldNotUpdate(vnode, old)) return;
                                if (typeof oldTag === 'string') {
                                    if (vnode.attrs != null) {
                                        if (recycling) {
                                            vnode.state = {};
                                            initLifecycle(vnode.attrs, vnode, hooks);
                                        } else updateLifecycle(vnode.attrs, vnode, hooks);
                                    }
                                    switch (oldTag) {
                                        case '#':
                                            updateText(old, vnode);
                                            break;
                                        case '<':
                                            updateHTML(parent, old, vnode, nextSibling);
                                            break;
                                        case '[':
                                            updateFragment(
                                                parent,
                                                old,
                                                vnode,
                                                recycling,
                                                hooks,
                                                nextSibling,
                                                ns,
                                            );
                                            break;
                                        default:
                                            updateElement(old, vnode, recycling, hooks, ns);
                                    }
                                } else
                                    updateComponent(
                                        parent,
                                        old,
                                        vnode,
                                        hooks,
                                        nextSibling,
                                        recycling,
                                        ns,
                                    );
                            } else {
                                removeNode(old, null);
                                createNode(parent, vnode, hooks, ns, nextSibling);
                            }
                        }
                        function updateText(old, vnode) {
                            if (old.children.toString() !== vnode.children.toString()) {
                                old.dom.nodeValue = vnode.children;
                            }
                            vnode.dom = old.dom;
                        }
                        function updateHTML(parent, old, vnode, nextSibling) {
                            if (old.children !== vnode.children) {
                                toFragment(old);
                                createHTML(parent, vnode, nextSibling);
                            } else (vnode.dom = old.dom), (vnode.domSize = old.domSize);
                        }
                        function updateFragment(
                            parent,
                            old,
                            vnode,
                            recycling,
                            hooks,
                            nextSibling,
                            ns,
                        ) {
                            updateNodes(
                                parent,
                                old.children,
                                vnode.children,
                                recycling,
                                hooks,
                                nextSibling,
                                ns,
                            );
                            var domSize = 0,
                                children = vnode.children;
                            vnode.dom = null;
                            if (children != null) {
                                for (var i = 0; i < children.length; i++) {
                                    var child = children[i];
                                    if (child != null && child.dom != null) {
                                        if (vnode.dom == null) vnode.dom = child.dom;
                                        domSize += child.domSize || 1;
                                    }
                                }
                                if (domSize !== 1) vnode.domSize = domSize;
                            }
                        }
                        function updateElement(old, vnode, recycling, hooks, ns) {
                            var element = (vnode.dom = old.dom);
                            ns = getNameSpace(vnode) || ns;
                            if (vnode.tag === 'textarea') {
                                if (vnode.attrs == null) vnode.attrs = {};
                                if (vnode.text != null) {
                                    vnode.attrs.value = vnode.text; //FIXME handle0 multiple children
                                    vnode.text = undefined;
                                }
                            }
                            updateAttrs(vnode, old.attrs, vnode.attrs, ns);
                            if (vnode.attrs != null && vnode.attrs.contenteditable != null) {
                                setContentEditable(vnode);
                            } else if (
                                old.text != null &&
                                vnode.text != null &&
                                vnode.text !== ''
                            ) {
                                if (old.text.toString() !== vnode.text.toString())
                                    old.dom.firstChild.nodeValue = vnode.text;
                            } else {
                                if (old.text != null)
                                    old.children = [
                                        Vnode(
                                            '#',
                                            undefined,
                                            undefined,
                                            old.text,
                                            undefined,
                                            old.dom.firstChild,
                                        ),
                                    ];
                                if (vnode.text != null)
                                    vnode.children = [
                                        Vnode(
                                            '#',
                                            undefined,
                                            undefined,
                                            vnode.text,
                                            undefined,
                                            undefined,
                                        ),
                                    ];
                                updateNodes(
                                    element,
                                    old.children,
                                    vnode.children,
                                    recycling,
                                    hooks,
                                    null,
                                    ns,
                                );
                            }
                        }
                        function updateComponent(
                            parent,
                            old,
                            vnode,
                            hooks,
                            nextSibling,
                            recycling,
                            ns,
                        ) {
                            if (recycling) {
                                initComponent(vnode, hooks);
                            } else {
                                vnode.instance = Vnode.normalize(
                                    vnode._state.view.call(vnode.state, vnode),
                                );
                                if (vnode.instance === vnode)
                                    throw Error(
                                        'A view cannot return the vnode it received as argument',
                                    );
                                if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks);
                                updateLifecycle(vnode._state, vnode, hooks);
                            }
                            if (vnode.instance != null) {
                                if (old.instance == null)
                                    createNode(parent, vnode.instance, hooks, ns, nextSibling);
                                else
                                    updateNode(
                                        parent,
                                        old.instance,
                                        vnode.instance,
                                        hooks,
                                        nextSibling,
                                        recycling,
                                        ns,
                                    );
                                vnode.dom = vnode.instance.dom;
                                vnode.domSize = vnode.instance.domSize;
                            } else if (old.instance != null) {
                                removeNode(old.instance, null);
                                vnode.dom = undefined;
                                vnode.domSize = 0;
                            } else {
                                vnode.dom = old.dom;
                                vnode.domSize = old.domSize;
                            }
                        }
                        function isRecyclable(old, vnodes) {
                            if (
                                old.pool != null &&
                                Math.abs(old.pool.length - vnodes.length) <=
                                    Math.abs(old.length - vnodes.length)
                            ) {
                                var oldChildrenLength =
                                    (old[0] && old[0].children && old[0].children.length) || 0;
                                var poolChildrenLength =
                                    (old.pool[0] &&
                                        old.pool[0].children &&
                                        old.pool[0].children.length) ||
                                    0;
                                var vnodesChildrenLength =
                                    (vnodes[0] &&
                                        vnodes[0].children &&
                                        vnodes[0].children.length) ||
                                    0;
                                if (
                                    Math.abs(poolChildrenLength - vnodesChildrenLength) <=
                                    Math.abs(oldChildrenLength - vnodesChildrenLength)
                                ) {
                                    return true;
                                }
                            }
                            return false;
                        }
                        function getKeyMap(vnodes, end) {
                            var map = {},
                                i = 0;
                            for (var i = 0; i < end; i++) {
                                var vnode = vnodes[i];
                                if (vnode != null) {
                                    var key2 = vnode.key;
                                    if (key2 != null) map[key2] = i;
                                }
                            }
                            return map;
                        }
                        function toFragment(vnode) {
                            var count0 = vnode.domSize;
                            if (count0 != null || vnode.dom == null) {
                                var fragment = $doc.createDocumentFragment();
                                if (count0 > 0) {
                                    var dom = vnode.dom;
                                    while (--count0) {
                                        fragment.appendChild(dom.nextSibling);
                                    }
                                    fragment.insertBefore(dom, fragment.firstChild);
                                }
                                return fragment;
                            } else return vnode.dom;
                        }
                        function getNextSibling(vnodes, i, nextSibling) {
                            for (; i < vnodes.length; i++) {
                                if (vnodes[i] != null && vnodes[i].dom != null)
                                    return vnodes[i].dom;
                            }
                            return nextSibling;
                        }
                        function insertNode(parent, dom, nextSibling) {
                            if (nextSibling && nextSibling.parentNode)
                                parent.insertBefore(dom, nextSibling);
                            else parent.appendChild(dom);
                        }
                        function setContentEditable(vnode) {
                            var children = vnode.children;
                            if (
                                children != null &&
                                children.length === 1 &&
                                children[0].tag === '<'
                            ) {
                                var content = children[0].children;
                                if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content;
                            } else if (
                                vnode.text != null ||
                                (children != null && children.length !== 0)
                            )
                                throw new Error('Child node of a contenteditable must be trusted');
                        }
                        //remove
                        function removeNodes(vnodes, start, end, context) {
                            for (var i = start; i < end; i++) {
                                var vnode = vnodes[i];
                                if (vnode != null) {
                                    if (vnode.skip) vnode.skip = false;
                                    else removeNode(vnode, context);
                                }
                            }
                        }
                        function removeNode(vnode, context) {
                            var expected = 1,
                                called = 0;
                            if (vnode.attrs && typeof vnode.attrs.onbeforeremove === 'function') {
                                var result = vnode.attrs.onbeforeremove.call(vnode.state, vnode);
                                if (result != null && typeof result.then === 'function') {
                                    expected++;
                                    result.then(continuation, continuation);
                                }
                            }
                            if (
                                typeof vnode.tag !== 'string' &&
                                typeof vnode._state.onbeforeremove === 'function'
                            ) {
                                var result = vnode._state.onbeforeremove.call(vnode.state, vnode);
                                if (result != null && typeof result.then === 'function') {
                                    expected++;
                                    result.then(continuation, continuation);
                                }
                            }
                            continuation();
                            function continuation() {
                                if (++called === expected) {
                                    onremove(vnode);
                                    if (vnode.dom) {
                                        var count0 = vnode.domSize || 1;
                                        if (count0 > 1) {
                                            var dom = vnode.dom;
                                            while (--count0) {
                                                removeNodeFromDOM(dom.nextSibling);
                                            }
                                        }
                                        removeNodeFromDOM(vnode.dom);
                                        if (
                                            context != null &&
                                            vnode.domSize == null &&
                                            !hasIntegrationMethods(vnode.attrs) &&
                                            typeof vnode.tag === 'string'
                                        ) {
                                            //TODO test custom elements
                                            if (!context.pool) context.pool = [vnode];
                                            else context.pool.push(vnode);
                                        }
                                    }
                                }
                            }
                        }
                        function removeNodeFromDOM(node) {
                            var parent = node.parentNode;
                            if (parent != null) parent.removeChild(node);
                        }
                        function onremove(vnode) {
                            if (vnode.attrs && typeof vnode.attrs.onremove === 'function')
                                vnode.attrs.onremove.call(vnode.state, vnode);
                            if (typeof vnode.tag !== 'string') {
                                if (typeof vnode._state.onremove === 'function')
                                    vnode._state.onremove.call(vnode.state, vnode);
                                if (vnode.instance != null) onremove(vnode.instance);
                            } else {
                                var children = vnode.children;
                                if (Array.isArray(children)) {
                                    for (var i = 0; i < children.length; i++) {
                                        var child = children[i];
                                        if (child != null) onremove(child);
                                    }
                                }
                            }
                        }
                        //attrs2
                        function setAttrs(vnode, attrs2, ns) {
                            for (var key2 in attrs2) {
                                setAttr(vnode, key2, null, attrs2[key2], ns);
                            }
                        }
                        function setAttr(vnode, key2, old, value, ns) {
                            var element = vnode.dom;
                            if (
                                key2 === 'key' ||
                                key2 === 'is' ||
                                (old === value &&
                                    !isFormAttribute(vnode, key2) &&
                                    (typeof value === 'undefined'
                                        ? 'undefined'
                                        : _typeof(value)) !== 'object') ||
                                typeof value === 'undefined' ||
                                isLifecycleMethod(key2)
                            )
                                return;
                            var nsLastIndex = key2.indexOf(':');
                            if (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === 'xlink') {
                                element.setAttributeNS(
                                    'http://www.w3.org/1999/xlink',
                                    key2.slice(nsLastIndex + 1),
                                    value,
                                );
                            } else if (
                                key2[0] === 'o' &&
                                key2[1] === 'n' &&
                                typeof value === 'function'
                            )
                                updateEvent(vnode, key2, value);
                            else if (key2 === 'style') updateStyle(element, old, value);
                            else if (
                                key2 in element &&
                                !isAttribute(key2) &&
                                ns === undefined &&
                                !isCustomElement(vnode)
                            ) {
                                if (key2 === 'value') {
                                    var normalized0 = '' + value; // eslint-disable-line no-implicit-coercion
                                    //setting input[value] to same value by typing on focused element moves cursor to end in Chrome
                                    if (
                                        (vnode.tag === 'input' || vnode.tag === 'textarea') &&
                                        vnode.dom.value === normalized0 &&
                                        vnode.dom === $doc.activeElement
                                    )
                                        return;
                                    //setting select[value] to same value while having select open blinks select dropdown in Chrome
                                    if (vnode.tag === 'select') {
                                        if (value === null) {
                                            if (
                                                vnode.dom.selectedIndex === -1 &&
                                                vnode.dom === $doc.activeElement
                                            )
                                                return;
                                        } else {
                                            if (
                                                old !== null &&
                                                vnode.dom.value === normalized0 &&
                                                vnode.dom === $doc.activeElement
                                            )
                                                return;
                                        }
                                    }
                                    //setting option[value] to same value while having select open blinks select dropdown in Chrome
                                    if (
                                        vnode.tag === 'option' &&
                                        old != null &&
                                        vnode.dom.value === normalized0
                                    )
                                        return;
                                }
                                // If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.
                                if (vnode.tag === 'input' && key2 === 'type') {
                                    element.setAttribute(key2, value);
                                    return;
                                }
                                element[key2] = value;
                            } else {
                                if (typeof value === 'boolean') {
                                    if (value) element.setAttribute(key2, '');
                                    else element.removeAttribute(key2);
                                } else
                                    element.setAttribute(
                                        key2 === 'className' ? 'class' : key2,
                                        value,
                                    );
                            }
                        }
                        function setLateAttrs(vnode) {
                            var attrs2 = vnode.attrs;
                            if (vnode.tag === 'select' && attrs2 != null) {
                                if ('value' in attrs2)
                                    setAttr(vnode, 'value', null, attrs2.value, undefined);
                                if ('selectedIndex' in attrs2)
                                    setAttr(
                                        vnode,
                                        'selectedIndex',
                                        null,
                                        attrs2.selectedIndex,
                                        undefined,
                                    );
                            }
                        }
                        function updateAttrs(vnode, old, attrs2, ns) {
                            if (attrs2 != null) {
                                for (var key2 in attrs2) {
                                    setAttr(vnode, key2, old && old[key2], attrs2[key2], ns);
                                }
                            }
                            if (old != null) {
                                for (var key2 in old) {
                                    if (attrs2 == null || !(key2 in attrs2)) {
                                        if (key2 === 'className') key2 = 'class';
                                        if (
                                            key2[0] === 'o' &&
                                            key2[1] === 'n' &&
                                            !isLifecycleMethod(key2)
                                        )
                                            updateEvent(vnode, key2, undefined);
                                        else if (key2 !== 'key') vnode.dom.removeAttribute(key2);
                                    }
                                }
                            }
                        }
                        function isFormAttribute(vnode, attr) {
                            return (
                                attr === 'value' ||
                                attr === 'checked' ||
                                attr === 'selectedIndex' ||
                                (attr === 'selected' && vnode.dom === $doc.activeElement)
                            );
                        }
                        function isLifecycleMethod(attr) {
                            return (
                                attr === 'oninit' ||
                                attr === 'oncreate' ||
                                attr === 'onupdate' ||
                                attr === 'onremove' ||
                                attr === 'onbeforeremove' ||
                                attr === 'onbeforeupdate'
                            );
                        }
                        function isAttribute(attr) {
                            return (
                                attr === 'href' ||
                                attr === 'list' ||
                                attr === 'form' ||
                                attr === 'width' ||
                                attr === 'height'
                            ); // || attr === "type"
                        }
                        function isCustomElement(vnode) {
                            return vnode.attrs.is || vnode.tag.indexOf('-') > -1;
                        }
                        function hasIntegrationMethods(source) {
                            return (
                                source != null &&
                                (source.oncreate ||
                                    source.onupdate ||
                                    source.onbeforeremove ||
                                    source.onremove)
                            );
                        }
                        //style
                        function updateStyle(element, old, style) {
                            if (old === style) (element.style.cssText = ''), (old = null);
                            if (style == null) element.style.cssText = '';
                            else if (typeof style === 'string') element.style.cssText = style;
                            else {
                                if (typeof old === 'string') element.style.cssText = '';
                                for (var key2 in style) {
                                    element.style[key2] = style[key2];
                                }
                                if (old != null && typeof old !== 'string') {
                                    for (var key2 in old) {
                                        if (!(key2 in style)) element.style[key2] = '';
                                    }
                                }
                            }
                        }
                        //event
                        function updateEvent(vnode, key2, value) {
                            var element = vnode.dom;
                            var callback =
                                typeof onevent !== 'function'
                                    ? value
                                    : function(e) {
                                          var result = value.call(element, e);
                                          onevent.call(element, e);
                                          return result;
                                      };
                            if (key2 in element)
                                element[key2] = typeof value === 'function' ? callback : null;
                            else {
                                var eventName = key2.slice(2);
                                if (vnode.events === undefined) vnode.events = {};
                                if (vnode.events[key2] === callback) return;
                                if (vnode.events[key2] != null)
                                    element.removeEventListener(
                                        eventName,
                                        vnode.events[key2],
                                        false,
                                    );
                                if (typeof value === 'function') {
                                    vnode.events[key2] = callback;
                                    element.addEventListener(eventName, vnode.events[key2], false);
                                }
                            }
                        }
                        //lifecycle
                        function initLifecycle(source, vnode, hooks) {
                            if (typeof source.oninit === 'function')
                                source.oninit.call(vnode.state, vnode);
                            if (typeof source.oncreate === 'function')
                                hooks.push(source.oncreate.bind(vnode.state, vnode));
                        }
                        function updateLifecycle(source, vnode, hooks) {
                            if (typeof source.onupdate === 'function')
                                hooks.push(source.onupdate.bind(vnode.state, vnode));
                        }
                        function shouldNotUpdate(vnode, old) {
                            var forceVnodeUpdate, forceComponentUpdate;
                            if (
                                vnode.attrs != null &&
                                typeof vnode.attrs.onbeforeupdate === 'function'
                            )
                                forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(
                                    vnode.state,
                                    vnode,
                                    old,
                                );
                            if (
                                typeof vnode.tag !== 'string' &&
                                typeof vnode._state.onbeforeupdate === 'function'
                            )
                                forceComponentUpdate = vnode._state.onbeforeupdate.call(
                                    vnode.state,
                                    vnode,
                                    old,
                                );
                            if (
                                !(
                                    forceVnodeUpdate === undefined &&
                                    forceComponentUpdate === undefined
                                ) &&
                                !forceVnodeUpdate &&
                                !forceComponentUpdate
                            ) {
                                vnode.dom = old.dom;
                                vnode.domSize = old.domSize;
                                vnode.instance = old.instance;
                                return true;
                            }
                            return false;
                        }
                        function render(dom, vnodes) {
                            if (!dom)
                                throw new Error(
                                    'Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.',
                                );
                            var hooks = [];
                            var active = $doc.activeElement;
                            var namespace = dom.namespaceURI;
                            // First time0 rendering into a node clears it out
                            if (dom.vnodes == null) dom.textContent = '';
                            if (!Array.isArray(vnodes)) vnodes = [vnodes];
                            updateNodes(
                                dom,
                                dom.vnodes,
                                Vnode.normalizeChildren(vnodes),
                                false,
                                hooks,
                                null,
                                namespace === 'http://www.w3.org/1999/xhtml'
                                    ? undefined
                                    : namespace,
                            );
                            dom.vnodes = vnodes;
                            // document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
                            if (active != null && $doc.activeElement !== active) active.focus();
                            for (var i = 0; i < hooks.length; i++) {
                                hooks[i]();
                            }
                        }
                        return { render: render, setEventCallback: setEventCallback };
                    };
                    function throttle(callback) {
                        //60fps translates to 16.6ms, round it down since setTimeout requires int
                        var time = 16;
                        var last = 0,
                            pending = null;
                        var timeout =
                            typeof requestAnimationFrame === 'function'
                                ? requestAnimationFrame
                                : setTimeout;
                        return function() {
                            var now = Date.now();
                            if (last === 0 || now - last >= time) {
                                last = now;
                                callback();
                            } else if (pending === null) {
                                pending = timeout(function() {
                                    pending = null;
                                    callback();
                                    last = Date.now();
                                }, time - (now - last));
                            }
                        };
                    }
                    var _11 = function _11($window) {
                        var renderService = coreRenderer($window);
                        renderService.setEventCallback(function(e) {
                            if (e.redraw === false) e.redraw = undefined;
                            else redraw();
                        });
                        var callbacks = [];
                        function subscribe(key1, callback) {
                            unsubscribe(key1);
                            callbacks.push(key1, throttle(callback));
                        }
                        function unsubscribe(key1) {
                            var index = callbacks.indexOf(key1);
                            if (index > -1) callbacks.splice(index, 2);
                        }
                        function redraw() {
                            for (var i = 1; i < callbacks.length; i += 2) {
                                callbacks[i]();
                            }
                        }
                        return {
                            subscribe: subscribe,
                            unsubscribe: unsubscribe,
                            redraw: redraw,
                            render: renderService.render,
                        };
                    };
                    var redrawService = _11(window);
                    requestService.setCompletionCallback(redrawService.redraw);
                    var _16 = function _16(redrawService0) {
                        return function(root, component) {
                            if (component === null) {
                                redrawService0.render(root, []);
                                redrawService0.unsubscribe(root);
                                return;
                            }

                            if (component.view == null && typeof component !== 'function')
                                throw new Error(
                                    'm.mount(element, component) expects a component, not a vnode',
                                );

                            var run0 = function run0() {
                                redrawService0.render(root, Vnode(component));
                            };
                            redrawService0.subscribe(root, run0);
                            redrawService0.redraw();
                        };
                    };
                    m.mount = _16(redrawService);
                    var Promise = PromisePolyfill;
                    var parseQueryString = function parseQueryString(string) {
                        if (string === '' || string == null) return {};
                        if (string.charAt(0) === '?') string = string.slice(1);
                        var entries = string.split('&'),
                            data0 = {},
                            counters = {};
                        for (var i = 0; i < entries.length; i++) {
                            var entry = entries[i].split('=');
                            var key5 = decodeURIComponent(entry[0]);
                            var value = entry.length === 2 ? decodeURIComponent(entry[1]) : '';
                            if (value === 'true') value = true;
                            else if (value === 'false') value = false;
                            var levels = key5.split(/\]\[?|\[/);
                            var cursor = data0;
                            if (key5.indexOf('[') > -1) levels.pop();
                            for (var j = 0; j < levels.length; j++) {
                                var level = levels[j],
                                    nextLevel = levels[j + 1];
                                var isNumber = nextLevel == '' || !isNaN(parseInt(nextLevel, 10));
                                var isValue = j === levels.length - 1;
                                if (level === '') {
                                    var key5 = levels.slice(0, j).join();
                                    if (counters[key5] == null) counters[key5] = 0;
                                    level = counters[key5]++;
                                }
                                if (cursor[level] == null) {
                                    cursor[level] = isValue ? value : isNumber ? [] : {};
                                }
                                cursor = cursor[level];
                            }
                        }
                        return data0;
                    };
                    var coreRouter = function coreRouter($window) {
                        var supportsPushState = typeof $window.history.pushState === 'function';
                        var callAsync0 =
                            typeof setImmediate === 'function' ? setImmediate : setTimeout;
                        function normalize1(fragment0) {
                            var data = $window.location[fragment0].replace(
                                /(?:%[a-f89][a-f0-9])+/gim,
                                decodeURIComponent,
                            );
                            if (fragment0 === 'pathname' && data[0] !== '/') data = '/' + data;
                            return data;
                        }
                        var asyncId;
                        function debounceAsync(callback0) {
                            return function() {
                                if (asyncId != null) return;
                                asyncId = callAsync0(function() {
                                    asyncId = null;
                                    callback0();
                                });
                            };
                        }
                        function parsePath(path, queryData, hashData) {
                            var queryIndex = path.indexOf('?');
                            var hashIndex = path.indexOf('#');
                            var pathEnd =
                                queryIndex > -1
                                    ? queryIndex
                                    : hashIndex > -1
                                        ? hashIndex
                                        : path.length;
                            if (queryIndex > -1) {
                                var queryEnd = hashIndex > -1 ? hashIndex : path.length;
                                var queryParams = parseQueryString(
                                    path.slice(queryIndex + 1, queryEnd),
                                );
                                for (var key4 in queryParams) {
                                    queryData[key4] = queryParams[key4];
                                }
                            }
                            if (hashIndex > -1) {
                                var hashParams = parseQueryString(path.slice(hashIndex + 1));
                                for (var key4 in hashParams) {
                                    hashData[key4] = hashParams[key4];
                                }
                            }
                            return path.slice(0, pathEnd);
                        }
                        var router = { prefix: '#!' };
                        router.getPath = function() {
                            var type2 = router.prefix.charAt(0);
                            switch (type2) {
                                case '#':
                                    return normalize1('hash').slice(router.prefix.length);
                                case '?':
                                    return (
                                        normalize1('search').slice(router.prefix.length) +
                                        normalize1('hash')
                                    );
                                default:
                                    return (
                                        normalize1('pathname').slice(router.prefix.length) +
                                        normalize1('search') +
                                        normalize1('hash')
                                    );
                            }
                        };
                        router.setPath = function(path, data, options) {
                            var queryData = {},
                                hashData = {};
                            path = parsePath(path, queryData, hashData);
                            if (data != null) {
                                for (var key4 in data) {
                                    queryData[key4] = data[key4];
                                }
                                path = path.replace(/:([^\/]+)/g, function(match2, token) {
                                    delete queryData[token];
                                    return data[token];
                                });
                            }
                            var query = buildQueryString(queryData);
                            if (query) path += '?' + query;
                            var hash = buildQueryString(hashData);
                            if (hash) path += '#' + hash;
                            if (supportsPushState) {
                                var state = options ? options.state : null;
                                var title = options ? options.title : null;
                                $window.onpopstate();
                                if (options && options.replace)
                                    $window.history.replaceState(
                                        state,
                                        title,
                                        router.prefix + path,
                                    );
                                else $window.history.pushState(state, title, router.prefix + path);
                            } else $window.location.href = router.prefix + path;
                        };
                        router.defineRoutes = function(routes, resolve, reject) {
                            function resolveRoute() {
                                var path = router.getPath();
                                var params = {};
                                var pathname = parsePath(path, params, params);
                                var state = $window.history.state;
                                if (state != null) {
                                    for (var k in state) {
                                        params[k] = state[k];
                                    }
                                }
                                for (var route0 in routes) {
                                    var matcher = new RegExp(
                                        '^' +
                                            route0
                                                .replace(/:[^\/]+?\.{3}/g, '(.*?)')
                                                .replace(/:[^\/]+/g, '([^\\/]+)') +
                                            '/?$',
                                    );
                                    if (matcher.test(pathname)) {
                                        pathname.replace(matcher, function() {
                                            var keys = route0.match(/:[^\/]+/g) || [];
                                            var values = [].slice.call(arguments, 1, -2);
                                            for (var i = 0; i < keys.length; i++) {
                                                params[
                                                    keys[i].replace(/:|\./g, '')
                                                ] = decodeURIComponent(values[i]);
                                            }
                                            resolve(routes[route0], params, path, route0);
                                        });
                                        return;
                                    }
                                }
                                reject(path, params);
                            }
                            if (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute);
                            else if (router.prefix.charAt(0) === '#')
                                $window.onhashchange = resolveRoute;
                            resolveRoute();
                        };
                        return router;
                    };
                    var _20 = function _20($window, redrawService0) {
                        var routeService = coreRouter($window);
                        var identity = function identity(v) {
                            return v;
                        };
                        var render1, component, attrs3, currentPath, _lastUpdate;
                        var route = function route(root, defaultRoute, routes) {
                            if (root == null)
                                throw new Error(
                                    'Ensure the DOM element that was passed to `m.route` is not undefined',
                                );
                            var run1 = function run1() {
                                if (render1 != null)
                                    redrawService0.render(
                                        root,
                                        render1(Vnode(component, attrs3.key, attrs3)),
                                    );
                            };
                            var bail = function bail(path) {
                                if (path !== defaultRoute)
                                    routeService.setPath(defaultRoute, null, { replace: true });
                                else
                                    throw new Error(
                                        'Could not resolve default route ' + defaultRoute,
                                    );
                            };
                            routeService.defineRoutes(
                                routes,
                                function(payload, params, path) {
                                    var update = (_lastUpdate = function lastUpdate(
                                        routeResolver,
                                        comp,
                                    ) {
                                        if (update !== _lastUpdate) return;
                                        component =
                                            comp != null &&
                                            (typeof comp.view === 'function' ||
                                                typeof comp === 'function')
                                                ? comp
                                                : 'div';
                                        (attrs3 = params),
                                            (currentPath = path),
                                            (_lastUpdate = null);
                                        render1 = (routeResolver.render || identity).bind(
                                            routeResolver,
                                        );
                                        run1();
                                    });
                                    if (payload.view || typeof payload === 'function')
                                        update({}, payload);
                                    else {
                                        if (payload.onmatch) {
                                            Promise.resolve(payload.onmatch(params, path)).then(
                                                function(resolved) {
                                                    update(payload, resolved);
                                                },
                                                bail,
                                            );
                                        } else update(payload, 'div');
                                    }
                                },
                                bail,
                            );
                            redrawService0.subscribe(root, run1);
                        };
                        route.set = function(path, data, options) {
                            if (_lastUpdate != null) {
                                options = options || {};
                                options.replace = true;
                            }
                            _lastUpdate = null;
                            routeService.setPath(path, data, options);
                        };
                        route.get = function() {
                            return currentPath;
                        };
                        route.prefix = function(prefix0) {
                            routeService.prefix = prefix0;
                        };
                        route.link = function(vnode1) {
                            vnode1.dom.setAttribute(
                                'href',
                                routeService.prefix + vnode1.attrs.href,
                            );
                            vnode1.dom.onclick = function(e) {
                                if (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return;
                                e.preventDefault();
                                e.redraw = false;
                                var href = this.getAttribute('href');
                                if (href.indexOf(routeService.prefix) === 0)
                                    href = href.slice(routeService.prefix.length);
                                route.set(href, undefined, undefined);
                            };
                        };
                        route.param = function(key3) {
                            if (typeof attrs3 !== 'undefined' && typeof key3 !== 'undefined')
                                return attrs3[key3];
                            return attrs3;
                        };
                        return route;
                    };
                    m.route = _20(window, redrawService);
                    m.withAttr = function(attrName, callback1, context) {
                        return function(e) {
                            callback1.call(
                                context || this,
                                attrName in e.currentTarget
                                    ? e.currentTarget[attrName]
                                    : e.currentTarget.getAttribute(attrName),
                            );
                        };
                    };
                    var _28 = coreRenderer(window);
                    m.render = _28.render;
                    m.redraw = redrawService.redraw;
                    m.request = requestService.request;
                    m.jsonp = requestService.jsonp;
                    m.parseQueryString = parseQueryString;
                    m.buildQueryString = buildQueryString;
                    m.version = '1.1.6';
                    m.vnode = Vnode;
                    if (true) module['exports'] = m;
                    else {
                    }
                })();
                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__(48).setImmediate, __webpack_require__(2)));

            /***/
        },
        /* 4 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            var isOffScreen = function isOffScreen(bounds) {
                var hMin = 0;
                var hMax = window.innerWidth;
                var vMin = 0;
                var vMax = window.innerHeight;

                if (bounds.left < hMin) {
                    return true;
                }
                if (bounds.left + bounds.width > hMax) {
                    return true;
                }
                if (bounds.top < vMin) {
                    return true;
                }
                if (bounds.top + bounds.height > vMax) {
                    return true;
                }

                return false;
            };

            exports.default = isOffScreen;

            /***/
        },
        /* 5 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.default = compose;
            /**
             * Composes single-argument functions from right to left. The rightmost
             * function can take multiple arguments as it provides the signature for
             * the resulting composite function.
             *
             * @param {...Function} funcs The functions to compose.
             * @returns {Function} A function obtained by composing the argument functions
             * from right to left. For example, compose(f, g, h) is identical to doing
             * (...args) => f(g(h(...args))).
             */

            function compose() {
                for (
                    var _len = arguments.length, funcs = Array(_len), _key = 0;
                    _key < _len;
                    _key++
                ) {
                    funcs[_key] = arguments[_key];
                }

                if (funcs.length === 0) {
                    return function(arg) {
                        return arg;
                    };
                }

                if (funcs.length === 1) {
                    return funcs[0];
                }

                return funcs.reduce(function(a, b) {
                    return function() {
                        return a(b.apply(undefined, arguments));
                    };
                });
            }

            /***/
        },
        /* 6 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.default = warning;
            /**
             * Prints a warning in the console if it exists.
             *
             * @param {String} message The warning message.
             * @returns {void}
             */
            function warning(message) {
                /* eslint-disable no-console */
                if (typeof console !== 'undefined' && typeof console.error === 'function') {
                    console.error(message);
                }
                /* eslint-enable no-console */
                try {
                    // This error was thrown as a convenience so that if you enable
                    // "break on all exceptions" in your console,
                    // it would pause the execution at this line.
                    throw new Error(message);
                    /* eslint-disable no-empty */
                } catch (e) {}
                /* eslint-enable no-empty */
            }

            /***/
        },
        /* 7 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _root = __webpack_require__(29);

            var _root2 = _interopRequireDefault(_root);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /** Built-in value references. */
            var _Symbol = _root2.default.Symbol;

            exports.default = _Symbol;

            /***/
        },
        /* 8 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _baseGetTag = __webpack_require__(30);

            var _baseGetTag2 = _interopRequireDefault(_baseGetTag);

            var _getPrototype = __webpack_require__(25);

            var _getPrototype2 = _interopRequireDefault(_getPrototype);

            var _isObjectLike = __webpack_require__(23);

            var _isObjectLike2 = _interopRequireDefault(_isObjectLike);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /** `Object#toString` result references. */
            var objectTag = '[object Object]';

            /** Used for built-in method references. */
            var funcProto = Function.prototype,
                objectProto = Object.prototype;

            /** Used to resolve the decompiled source of functions. */
            var funcToString = funcProto.toString;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /** Used to infer the `Object` constructor. */
            var objectCtorString = funcToString.call(Object);

            /**
             * Checks if `value` is a plain object, that is, an object created by the
             * `Object` constructor or one with a `[[Prototype]]` of `null`.
             *
             * @static
             * @memberOf _
             * @since 0.8.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
             * @example
             *
             * function Foo() {
             *   this.a = 1;
             * }
             *
             * _.isPlainObject(new Foo);
             * // => false
             *
             * _.isPlainObject([1, 2, 3]);
             * // => false
             *
             * _.isPlainObject({ 'x': 0, 'y': 0 });
             * // => true
             *
             * _.isPlainObject(Object.create(null));
             * // => true
             */
            function isPlainObject(value) {
                if (
                    !(0, _isObjectLike2.default)(value) ||
                    (0, _baseGetTag2.default)(value) != objectTag
                ) {
                    return false;
                }
                var proto = (0, _getPrototype2.default)(value);
                if (proto === null) {
                    return true;
                }
                var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
                return (
                    typeof Ctor == 'function' &&
                    Ctor instanceof Ctor &&
                    funcToString.call(Ctor) == objectCtorString
                );
            }

            exports.default = isPlainObject;

            /***/
        },
        /* 9 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.ActionTypes = undefined;

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            exports.default = createStore;

            var _isPlainObject = __webpack_require__(8);

            var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

            var _symbolObservable = __webpack_require__(22);

            var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /**
             * These are private action types reserved by Redux.
             * For any unknown actions, you must return the current state.
             * If the current state is undefined, you must return the initial state.
             * Do not reference these action types directly in your code.
             */
            var ActionTypes = (exports.ActionTypes = {
                INIT: '@@redux/INIT',

                /**
                 * Creates a Redux store that holds the state tree.
                 * The only way to change the data in the store is to call `dispatch()` on it.
                 *
                 * There should only be a single store in your app. To specify how different
                 * parts of the state tree respond to actions, you may combine several reducers
                 * into a single reducer function by using `combineReducers`.
                 *
                 * @param {Function} reducer A function that returns the next state tree, given
                 * the current state tree and the action to handle.
                 *
                 * @param {any} [preloadedState] The initial state. You may optionally specify it
                 * to hydrate the state from the server in universal apps, or to restore a
                 * previously serialized user session.
                 * If you use `combineReducers` to produce the root reducer function, this must be
                 * an object with the same shape as `combineReducers` keys.
                 *
                 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
                 * to enhance the store with third-party capabilities such as middleware,
                 * time travel, persistence, etc. The only store enhancer that ships with Redux
                 * is `applyMiddleware()`.
                 *
                 * @returns {Store} A Redux store that lets you read the state, dispatch actions
                 * and subscribe to changes.
                 */
            });
            function createStore(reducer, preloadedState, enhancer) {
                var _ref2;

                if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
                    enhancer = preloadedState;
                    preloadedState = undefined;
                }

                if (typeof enhancer !== 'undefined') {
                    if (typeof enhancer !== 'function') {
                        throw new Error('Expected the enhancer to be a function.');
                    }

                    return enhancer(createStore)(reducer, preloadedState);
                }

                if (typeof reducer !== 'function') {
                    throw new Error('Expected the reducer to be a function.');
                }

                var currentReducer = reducer;
                var currentState = preloadedState;
                var currentListeners = [];
                var nextListeners = currentListeners;
                var isDispatching = false;

                function ensureCanMutateNextListeners() {
                    if (nextListeners === currentListeners) {
                        nextListeners = currentListeners.slice();
                    }
                }

                /**
                 * Reads the state tree managed by the store.
                 *
                 * @returns {any} The current state tree of your application.
                 */
                function getState() {
                    return currentState;
                }

                /**
                 * Adds a change listener. It will be called any time an action is dispatched,
                 * and some part of the state tree may potentially have changed. You may then
                 * call `getState()` to read the current state tree inside the callback.
                 *
                 * You may call `dispatch()` from a change listener, with the following
                 * caveats:
                 *
                 * 1. The subscriptions are snapshotted just before every `dispatch()` call.
                 * If you subscribe or unsubscribe while the listeners are being invoked, this
                 * will not have any effect on the `dispatch()` that is currently in progress.
                 * However, the next `dispatch()` call, whether nested or not, will use a more
                 * recent snapshot of the subscription list.
                 *
                 * 2. The listener should not expect to see all state changes, as the state
                 * might have been updated multiple times during a nested `dispatch()` before
                 * the listener is called. It is, however, guaranteed that all subscribers
                 * registered before the `dispatch()` started will be called with the latest
                 * state by the time it exits.
                 *
                 * @param {Function} listener A callback to be invoked on every dispatch.
                 * @returns {Function} A function to remove this change listener.
                 */
                function subscribe(listener) {
                    if (typeof listener !== 'function') {
                        throw new Error('Expected listener to be a function.');
                    }

                    var isSubscribed = true;

                    ensureCanMutateNextListeners();
                    nextListeners.push(listener);

                    return function unsubscribe() {
                        if (!isSubscribed) {
                            return;
                        }

                        isSubscribed = false;

                        ensureCanMutateNextListeners();
                        var index = nextListeners.indexOf(listener);
                        nextListeners.splice(index, 1);
                    };
                }

                /**
                 * Dispatches an action. It is the only way to trigger a state change.
                 *
                 * The `reducer` function, used to create the store, will be called with the
                 * current state tree and the given `action`. Its return value will
                 * be considered the **next** state of the tree, and the change listeners
                 * will be notified.
                 *
                 * The base implementation only supports plain object actions. If you want to
                 * dispatch a Promise, an Observable, a thunk, or something else, you need to
                 * wrap your store creating function into the corresponding middleware. For
                 * example, see the documentation for the `redux-thunk` package. Even the
                 * middleware will eventually dispatch plain object actions using this method.
                 *
                 * @param {Object} action A plain object representing “what changed”. It is
                 * a good idea to keep actions serializable so you can record and replay user
                 * sessions, or use the time travelling `redux-devtools`. An action must have
                 * a `type` property which may not be `undefined`. It is a good idea to use
                 * string constants for action types.
                 *
                 * @returns {Object} For convenience, the same action object you dispatched.
                 *
                 * Note that, if you use a custom middleware, it may wrap `dispatch()` to
                 * return something else (for example, a Promise you can await).
                 */
                function dispatch(action) {
                    if (!(0, _isPlainObject2.default)(action)) {
                        throw new Error(
                            'Actions must be plain objects. ' +
                                'Use custom middleware for async actions.',
                        );
                    }

                    if (typeof action.type === 'undefined') {
                        throw new Error(
                            'Actions may not have an undefined "type" property. ' +
                                'Have you misspelled a constant?',
                        );
                    }

                    if (isDispatching) {
                        throw new Error('Reducers may not dispatch actions.');
                    }

                    try {
                        isDispatching = true;
                        currentState = currentReducer(currentState, action);
                    } finally {
                        isDispatching = false;
                    }

                    var listeners = (currentListeners = nextListeners);
                    for (var i = 0; i < listeners.length; i++) {
                        var listener = listeners[i];
                        listener();
                    }

                    return action;
                }

                /**
                 * Replaces the reducer currently used by the store to calculate the state.
                 *
                 * You might need this if your app implements code splitting and you want to
                 * load some of the reducers dynamically. You might also need this if you
                 * implement a hot reloading mechanism for Redux.
                 *
                 * @param {Function} nextReducer The reducer for the store to use instead.
                 * @returns {void}
                 */
                function replaceReducer(nextReducer) {
                    if (typeof nextReducer !== 'function') {
                        throw new Error('Expected the nextReducer to be a function.');
                    }

                    currentReducer = nextReducer;
                    dispatch({ type: ActionTypes.INIT });
                }

                /**
                 * Interoperability point for observable/reactive libraries.
                 * @returns {observable} A minimal observable of state changes.
                 * For more information, see the observable proposal:
                 * https://github.com/tc39/proposal-observable
                 */
                function observable() {
                    var _ref;

                    var outerSubscribe = subscribe;
                    return (
                        (_ref = {
                            /**
                             * The minimal observable subscription method.
                             * @param {Object} observer Any object that can be used as an observer.
                             * The observer object should have a `next` method.
                             * @returns {subscription} An object with an `unsubscribe` method that can
                             * be used to unsubscribe the observable from the store, and prevent further
                             * emission of values from the observable.
                             */
                            subscribe: function subscribe(observer) {
                                if (
                                    (typeof observer === 'undefined'
                                        ? 'undefined'
                                        : _typeof(observer)) !== 'object'
                                ) {
                                    throw new TypeError('Expected the observer to be an object.');
                                }

                                function observeState() {
                                    if (observer.next) {
                                        observer.next(getState());
                                    }
                                }

                                observeState();
                                var unsubscribe = outerSubscribe(observeState);
                                return { unsubscribe: unsubscribe };
                            },
                        }),
                        (_ref[_symbolObservable2.default] = function() {
                            return this;
                        }),
                        _ref
                    );
                }

                // When a store is created, an "INIT" action is dispatched so that every
                // reducer returns their initial state. This effectively populates
                // the initial state tree.
                dispatch({ type: ActionTypes.INIT });

                return (
                    (_ref2 = {
                        dispatch: dispatch,
                        subscribe: subscribe,
                        getState: getState,
                        replaceReducer: replaceReducer,
                    }),
                    (_ref2[_symbolObservable2.default] = observable),
                    _ref2
                );
            }

            /***/
        },
        /* 10 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            var PREV_COACHMARK = (exports.PREV_COACHMARK = 'PREV_COACHMARK');
            var NEXT_COACHMARK = (exports.NEXT_COACHMARK = 'NEXT_COACHMARK');
            var SET_CURRENT_COACHMARK = (exports.SET_CURRENT_COACHMARK = 'SET_CURRENT_COACHMARK');
            var PREV_TOUR = (exports.PREV_TOUR = 'PREV_TOUR');
            var NEXT_TOUR = (exports.NEXT_TOUR = 'NEXT_TOUR');
            var SET_CURRENT_TOUR = (exports.SET_CURRENT_TOUR = 'SET_CURRENT_TOUR');
            var SHOW_TOUR_GUIDE = (exports.SHOW_TOUR_GUIDE = 'SHOW_TOUR_GUIDE');
            var HIDE_TOUR_GUIDE = (exports.HIDE_TOUR_GUIDE = 'HIDE_TOUR_GUIDE');
            var SHOW_MORE = (exports.SHOW_MORE = 'SHOW_MORE');
            var HIDE_MORE = (exports.HIDE_MORE = 'HIDE_MORE');
            var MODIFY_COACHMARK_ATTRIBUTES = (exports.MODIFY_COACHMARK_ATTRIBUTES =
                'MODIFY_COACHMARK_ATTRIBUTES');
            var MODIFY_TOUR_ATTRIBUTES = (exports.MODIFY_TOUR_ATTRIBUTES =
                'MODIFY_TOUR_ATTRIBUTES');
            var REMOVE_COACHMARK_ATTRIBUTE = (exports.REMOVE_COACHMARK_ATTRIBUTE =
                'REMOVE_COACHMARK_ATTRIBUTE');
            var ADD_COACHMARK = (exports.ADD_COACHMARK = 'ADD_COACHMARK');
            var ADD_TOUR = (exports.ADD_TOUR = 'ADD_TOUR');
            var REMOVE_COACHMARK = (exports.REMOVE_COACHMARK = 'REMOVE_COACHMARK');
            var REMOVE_TOUR = (exports.REMOVE_TOUR = 'REMOVE_TOUR');
            var SET_STATE = (exports.SET_STATE = 'SET_STATE');

            /***/
        },
        /* 11 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.getCurrentCoachMark = exports.getCurrentCoachMarks = exports.getCurrentTour = undefined;

            var _extends =
                Object.assign ||
                function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

            var _actionTypes = __webpack_require__(10);

            function _toConsumableArray(arr) {
                if (Array.isArray(arr)) {
                    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                        arr2[i] = arr[i];
                    }
                    return arr2;
                } else {
                    return Array.from(arr);
                }
            }

            function _objectWithoutProperties(obj, keys) {
                var target = {};
                for (var i in obj) {
                    if (keys.indexOf(i) >= 0) continue;
                    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                    target[i] = obj[i];
                }
                return target;
            }

            var handleNavigationAction = function handleNavigationAction(
                state,
                currentTourIndex,
                currentCoachMarkIndex,
            ) {
                var oldTourIndex = state.currentTourIndex,
                    oldCoachMarkIndex = state.currentCoachMarkIndex;

                var newTours = state.tours.map(function(tour, i) {
                    return i === oldTourIndex
                        ? _extends({}, tour, {
                              coachMarks: tour.coachMarks.map(function(coachMark, j) {
                                  return j === oldCoachMarkIndex
                                      ? _extends({}, coachMark, {
                                            isComplete: true,
                                        })
                                      : coachMark;
                              }),
                          })
                        : tour;
                });

                return _extends({}, state, {
                    currentCoachMarkIndex: currentCoachMarkIndex,
                    currentTourIndex: currentTourIndex,
                    tours: newTours,
                });
            };

            var root = function root(state, action) {
                switch (action.type) {
                    case _actionTypes.NEXT_COACHMARK: {
                        var currentTourIndex = state.tours[state.currentTourIndex];
                        var currentCoachMarkIndex =
                            (state.currentCoachMarkIndex + 1) % currentTourIndex.coachMarks.length;

                        return handleNavigationAction(
                            state,
                            state.currentTourIndex,
                            currentCoachMarkIndex,
                        );
                    }
                    case _actionTypes.PREV_COACHMARK: {
                        var _currentTourIndex = state.tours[state.currentTourIndex];
                        var coachMarkLength = _currentTourIndex.coachMarks.length;
                        var _currentCoachMarkIndex =
                            (state.currentCoachMarkIndex - 1) % coachMarkLength;

                        _currentCoachMarkIndex =
                            _currentCoachMarkIndex < 0
                                ? _currentCoachMarkIndex + coachMarkLength
                                : _currentCoachMarkIndex;

                        return handleNavigationAction(
                            state,
                            state.currentTourIndex,
                            _currentCoachMarkIndex,
                        );
                    }
                    case _actionTypes.SET_CURRENT_COACHMARK: {
                        return handleNavigationAction(
                            state,
                            state.currentTourIndex,
                            action.payload,
                        );
                    }
                    case _actionTypes.MODIFY_COACHMARK_ATTRIBUTES: {
                        var coachMarkId = action.payload.coachMarkId || state.currentCoachMarkIndex;
                        var tourId = action.payload.tourId || state.currentTourIndex;
                        var newCoachMark = _extends(
                            {},
                            state.tours[tourId].coachMarks[coachMarkId],
                            action.payload.attributes,
                        );
                        var newTour = _extends({}, state.tours[tourId], {
                            coachMarks: state.tours[tourId].coachMarks.map(function(coachmark, id) {
                                return id === coachMarkId ? newCoachMark : coachmark;
                            }),
                        });
                        var newState = _extends({}, state, {
                            tours: state.tours.map(function(tour, id) {
                                return id === tourId ? newTour : tour;
                            }),
                        });

                        return newState;
                    }
                    case _actionTypes.MODIFY_TOUR_ATTRIBUTES: {
                        var _tourId = action.payload.tourId || state.currentTourIndex;
                        var _newTour = _extends(
                            {},
                            state.tours[_tourId],
                            action.payload.attributes,
                        );
                        var newTours = state.tours.map(function(tour, id) {
                            return id === _tourId ? _newTour : tour;
                        });
                        var _newState = _extends({}, state, {
                            tours: newTours,
                        });

                        return _newState;
                    }
                    case _actionTypes.REMOVE_COACHMARK_ATTRIBUTE: {
                        var _coachMarkId =
                            action.payload.coachMarkId || state.currentCoachMarkIndex;
                        var _tourId2 = action.payload.tourId || state.currentTourIndex;

                        var _state$tours$_tourId = state.tours[_tourId2].coachMarks[_coachMarkId],
                            removed = _state$tours$_tourId[action.payload.attribute],
                            _newCoachMark = _objectWithoutProperties(_state$tours$_tourId, [
                                action.payload.attribute,
                            ]);

                        var _newTour2 = _extends({}, state.tours[_tourId2], {
                            coachMarks: state.tours[_tourId2].coachMarks.map(function(
                                coachmark,
                                id,
                            ) {
                                return id === _coachMarkId ? _newCoachMark : coachmark;
                            }),
                        });
                        var _newState2 = _extends({}, state, {
                            tours: state.tours.map(function(tour, id) {
                                return id === _tourId2 ? _newTour2 : tour;
                            }),
                        });

                        return _newState2;
                    }
                    case _actionTypes.NEXT_TOUR: {
                        var _currentTourIndex2 = (state.currentTourIndex + 1) % state.tours.length;

                        return handleNavigationAction(state, _currentTourIndex2, 0);
                    }
                    case _actionTypes.PREV_TOUR: {
                        var tourLength = state.tours.length;
                        var _currentTourIndex3 = (state.currentTourIndex - 1) % tourLength;

                        _currentTourIndex3 =
                            _currentTourIndex3 < 0
                                ? _currentTourIndex3 + tourLength
                                : _currentTourIndex3;

                        return handleNavigationAction(state, _currentTourIndex3, 0);
                    }
                    case _actionTypes.REMOVE_COACHMARK: {
                        var _tourId3 = action.tourId ? action.tourId : state.currentTourIndex;
                        var _coachMarkId2 = action.coachMarkId
                            ? action.coachMarkId
                            : state.currentCoachMarkIndex;
                        var activeTour = state.tours[_tourId3];
                        var coachMarks = activeTour.coachMarks;

                        var _newTour3 = _extends({}, activeTour, {
                            coachMarks: coachMarks.filter(function(coachMark, id) {
                                return id !== _coachMarkId2;
                            }),
                        });
                        var _newState3 = _extends({}, state, {
                            tours: state.tours.map(function(tour, id) {
                                return id === _tourId3 ? _newTour3 : tour;
                            }),
                        });

                        return _newState3;
                    }
                    case _actionTypes.REMOVE_TOUR: {
                        var _tourId4 = action.payload.tourId || state.currentTourIndex;
                        var _newTours = state.tours.filter(function(tour, id) {
                            return id !== _tourId4;
                        });
                        var _newState4 = _extends({}, state, {
                            tours: _newTours,
                        });
                        return _newState4;
                    }
                    case _actionTypes.SET_CURRENT_TOUR: {
                        return handleNavigationAction(state, action.payload, 0);
                    }
                    case _actionTypes.SHOW_TOUR_GUIDE: {
                        return _extends({}, state, {
                            infoBoxIsVisible: true,
                        });
                    }
                    case _actionTypes.SHOW_MORE: {
                        return _extends({}, state, {
                            moreIsVisible: true,
                        });
                    }
                    case _actionTypes.HIDE_TOUR_GUIDE: {
                        return _extends({}, state, {
                            infoBoxIsVisible: false,
                        });
                    }
                    case _actionTypes.HIDE_MORE: {
                        return _extends({}, state, {
                            moreIsVisible: false,
                        });
                    }
                    case _actionTypes.ADD_COACHMARK: {
                        var _tourId5 = action.payload.tourId || state.currentTourIndex;
                        var tours = state.tours[_tourId5];
                        var _coachMarks = tours.coachMarks;

                        var _newCoachMark2 = {
                            id: null,
                            title: null,
                            description: null,
                            anchorPosition: 'bottom',
                            align: 'center',
                        };
                        var _newTour4 = _extends({}, state.tours[_tourId5], {
                            coachMarks: [].concat(_toConsumableArray(_coachMarks), [
                                _extends({}, _newCoachMark2, action.payload.attributes),
                            ]),
                        });
                        var _newState5 = _extends({}, state, {
                            tours: state.tours.map(function(tour, id) {
                                return id === _tourId5 ? _newTour4 : tour;
                            }),
                        });

                        return _newState5;
                    }
                    case _actionTypes.ADD_TOUR: {
                        var _newTours2 = [].concat(_toConsumableArray(state.tours), [
                            action.payload.attributes,
                        ]);
                        var _newState6 = _extends({}, state, {
                            tours: _newTours2,
                        });

                        return _newState6;
                    }
                    case _actionTypes.SET_STATE: {
                        return _extends({}, state, action.payload);
                    }
                    default: {
                        return state;
                    }
                }
            };

            var getCurrentTour = (exports.getCurrentTour = function getCurrentTour(state) {
                return state.tours[state.currentTourIndex];
            });
            var getCurrentCoachMarks = (exports.getCurrentCoachMarks = function getCurrentCoachMarks(
                state,
            ) {
                return getCurrentTour(state).coachMarks;
            });
            var getCurrentCoachMark = (exports.getCurrentCoachMark = function getCurrentCoachMark(
                state,
            ) {
                return getCurrentCoachMarks(state)[state.currentCoachMarkIndex];
            });

            exports.default = root;

            /***/
        },
        /* 12 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.CARD_BORDER_BACKGROUND = undefined;

            var _CSSConfig = __webpack_require__(0);

            var _CSSSelectors = __webpack_require__(1);

            var CARD_BORDER_BACKGROUND = (exports.CARD_BORDER_BACKGROUND =
                'border-radius: ' +
                _CSSConfig.INFOBOX_BORDER_RADIUS +
                'px;\n  background: white;\n  border: solid ' +
                _CSSConfig.INFOBOX_BORDER_WIDTH +
                'px lightgrey;\n');

            // TODO rename to TourGuideStaticStyles
            // TODO remove pulse css
            var InfoBoxStaticStyles = {
                view: function view() {
                    return (
                        '\n    ' +
                        _CSSSelectors.INFOBOX_CARD +
                        ' {\n      font-family: adobe-clean, Arial, Helvetica;\n      font-size: 16px;\n      color: #4b4b4b;\n      width: ' +
                        _CSSConfig.INFOBOX_WIDTH +
                        'px ;\n      overflow: visible;\n      ' +
                        CARD_BORDER_BACKGROUND +
                        '\n      transform: none;\n      text-transform: none;\n      text-align: none;\n      text-decoration: none;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_HEADER +
                        ' {\n      display: flex;\n      align-items: start;\n      margin: 16px 16px 0px 24px;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_BUTTON +
                        ' {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      outline: none;\n      cursor: pointer;\n      border-radius: ' +
                        _CSSConfig.INFOBOX_BORDER_RADIUS +
                        'px;\n      border-style: none;\n      background: transparent;\n      width: 100%;\n      height: 100%;\n      transition: background 125ms ease-out,\n          border-color 125ms ease-out,\n          color 125ms ease-out,\n          box-shadow 125ms ease-out;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_BUTTON_ACTIVE +
                        ' {\n      background: ' +
                        _CSSConfig.GREY_VERY_LIGHT +
                        ';\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_BUTTON +
                        ':hover {\n      background: ' +
                        _CSSConfig.GREY_LIGHT +
                        ';\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_BUTTON_ICON +
                        ' {\n      fill: ' +
                        _CSSConfig.GREY_MEDIUM +
                        ';\n      width: 18px;\n      height: 18px;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_CARD +
                        ' button {\n      text-decoration: none;\n      text-transform: none;\n      background: unset;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_BUTTON_PRIMARY +
                        '{\n      display: inline-block;\n      box-sizing: border-box;\n      border-width: 2px;\n      border-style: solid;\n      border-radius: 16px;\n      border-color: #4b4b4b;\n      background: white;\n      color: ' +
                        _CSSConfig.GREY_DARK +
                        ';\n      height: 32px;\n      padding: 0 14px 1px;\n      font-family: inherit;\n      line-height: 1.75rem;\n      font-weight: bold;\n      font-size: 15px;\n      text-decoration: none;\n      -webkit-font-smoothing: antialiased;\n      vertical-align: top;\n      cursor: pointer;\n      outline: none !important;\n      transition: background 125ms ease-out,\n          border-color 125ms ease-out,\n          color 125ms ease-out,\n          box-shadow 125ms ease-out;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_BUTTON_PRIMARY +
                        ':hover {\n      background-color: rgb(75, 75, 75);\n      border-color: rgb(75, 75, 75);\n      color: rgb(255, 255, 255);\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_BUTTON_SECONDARY +
                        '{\n      display: inline-block;\n      box-sizing: border-box;\n      border-style: none;\n      border-radius: 16px;\n      color: ' +
                        _CSSConfig.GREY_MEDIUM +
                        ';\n      height: 32px;\n      margin-right: 16px;\n      padding: 0 14px 1px;\n      font-family: inherit;\n      line-height: 1.75rem;\n      font-weight: bold;\n      font-size: 15px;\n      text-decoration: none;\n      -webkit-font-smoothing: antialiased;\n      vertical-align: top;\n      cursor: pointer;\n      outline: none;\n      transition: background 125ms ease-out,\n          border-color 125ms ease-out,\n          color 125ms ease-out,\n          box-shadow 125ms ease-out;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_BUTTON_SECONDARY +
                        ':hover {\n      background-color: ' +
                        _CSSConfig.GREY_LIGHT +
                        ';\n      color: ' +
                        _CSSConfig.GREY_DARK +
                        ';\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_TITLE +
                        ' {\n      font-weight: bold;\n      flex: 1 1 auto;\n      margin-top: 10px;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_DESCRIPTION +
                        ' {\n      margin: 16px 24px;\n      font-size: 14px;\n\n      line-height: 1.5em;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_FOOTER +
                        ' {\n      display: flex;\n      justify-content: flex-end;\n      align-items: center;\n      margin:\n        0px\n        ' +
                        _CSSConfig.INFOBOX_MARGIN +
                        'px\n        ' +
                        _CSSConfig.INFOBOX_MARGIN +
                        'px\n        ' +
                        _CSSConfig.INFOBOX_MARGIN +
                        'px;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_STEPS +
                        ' {\n      color: ' +
                        _CSSConfig.GREY_MEDIUM +
                        ';\n      display: flex;\n      font-size: 14px;\n      justify-content: flex-start;\n      align-items: center;\n      flex: 1 0 auto;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MAIN +
                        ' {\n      display: inline-block;\n      width: 100%;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_WRAPPER +
                        ' {\n      flex: 0 0 auto;\n      position: relative;\n      width: 40px;\n      height: 40px;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_ITEM +
                        ' {\n      margin: 12px;\n      cursor: pointer;\n      display: flex;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_ITEM_STATUS_WRAPPER +
                        ' {\n      flex: 0 0 12px;\n      margin-right: 8px;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_MORE_ITEM_TEXT +
                        ' {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_IMAGE +
                        ' {\n      width: 100%;\n      height: 100%;\n      border-radius: ' +
                        _CSSConfig.INFOBOX_BORDER_RADIUS +
                        'px ' +
                        _CSSConfig.INFOBOX_BORDER_RADIUS +
                        'px 0px 0px;\n    }\n\n    ' +
                        _CSSSelectors.INFOBOX_DIVIDER +
                        ' {\n      border: solid 1px ' +
                        _CSSConfig.GREY_LIGHT +
                        ';\n      margin: 0px 10px;\n    }\n\n    ' +
                        _CSSSelectors.PULSE_OUTER +
                        ' {\n      width: 12px;\n      height: 12px;\n      border-radius: 6px;\n      background: #378EF0;\n      position: absolute;\n      opacity: 0.5;\n      animation: outerPluse 3s ease-in-out infinite;\n    }\n\n    ' +
                        _CSSSelectors.PULSE_INNER +
                        ' {\n      width: 12px;\n      height: 12px;\n      border-radius: 6px;\n      background: #378EF0;\n      position: absolute;\n      opacity: 0.8;\n    }\n\n    @keyframes outerPluse {\n      0% {\n        transform: scale(1.0);\n        opacity: 0.8;\n      }\n\n      35% {\n        transform: scale(3.0);\n        opacity: 0.0;\n      }\n\n      100% {\n        transform: scale(3.0);\n        opacity: 0.0;\n      }\n    }\n\n    .___tourguide {\n      position: fixed;\n      left: 0px;\n      top: 0px;\n      width: 0px;\n      height: 0px;\n      z-index: 20000;\n      transform: none;\n      all: revert;\n    }\n'
                    );
                },
            };

            exports.default = InfoBoxStaticStyles;

            /***/
        },
        /* 13 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.setState = exports.modifyTourAttributes = exports.modifyCoachMarkAttributes = exports.removeCoachMarkAttribute = exports.showMore = exports.hideMore = exports.showTourGuide = exports.hideTourGuide = exports.removeTour = exports.removeCoachMark = exports.setCurrentTour = exports.prevTour = exports.nextTour = exports.setCurrentCoachMark = exports.prevCoachMark = exports.nextCoachMark = exports.addTour = exports.addCoachMark = undefined;

            var _actionTypes = __webpack_require__(10);

            /**
             * This action adds a new coach mark to the tour.
             * The new coach mark will be appeneded to the end of the tour.
             * @param {CoachMarkProperties} properties - An object that defines the coach mark properties.
             * @param {number=} tourId - An integer, the index of the tour that the coach mark will be added to.
             * @returns {Action} - The addCoachMark action that was just crated.
             */
            var addCoachMark = (exports.addCoachMark = function addCoachMark(attributes) {
                var tourId =
                    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                return {
                    type: _actionTypes.ADD_COACHMARK,
                    payload: {
                        attributes: attributes,
                        tourId: tourId,
                    },
                };
            });

            /**
             * This actions adds a to tour.
             * @param {*} attributes - The new tour's attributes.
             * @returns {Action}
             */
            /**
             * @module actions
             */

            /**
             * @typedef {Object} CoachMarkMedia
             * @property {string} src - The url to the coach mark's media file.
             * @property {number} width - The width of the media in pixels.
             * @property {number} height - The height of the media in pixels.
             */

            /**
             * A plain javaScript object that specificies the properties of a coach mark.
             * @typedef {Object} CoachMarkProperties
             * @property {string|undefined} targetSelector - A css selector for the page element
             * that the coach mark will target.
             * @property {string|undefined} title - The coach mark's title.
             * @property {string|undefined} description - The coach mark's description.
             * @property {string|undefined} anchorPosition - The coach mark's anchor position.
             * @property {string|undefined} align - The alignment of the coach mark.
             * @property {CoachMarkMedia|undefined} media - The coachmark's media.
             */

            /**
             * A flux standard action
             * @typedef {Object} Action
             * @property {string} type - The action's type.
             * @property {*} payload - The action's payload.
             */

            var addTour = (exports.addTour = function addTour(attributes) {
                return {
                    type: _actionTypes.ADD_TOUR,
                    payload: {
                        attributes: attributes,
                    },
                };
            });

            /**
             * This triggers the next coach mark.
             * If the current coach mark is the last coach mark in the tour,
             * the tour will proceed at the first coach mark.
             * @returns {Action}
             */
            var nextCoachMark = (exports.nextCoachMark = function nextCoachMark() {
                return {
                    type: _actionTypes.NEXT_COACHMARK,
                };
            });

            /**
             * This action triggers the previous coach mark.
             * If the current coach mark is the first coach mark in the tour,
             * the tour will proceed at the last coach mark.
             * @returns {Action}
             */
            var prevCoachMark = (exports.prevCoachMark = function prevCoachMark() {
                return {
                    type: _actionTypes.PREV_COACHMARK,
                };
            });

            /**
             * This action triggers the specified coach mark.
             * The provided coach mark id must be valid or an error will be thrown.
             * @param {number} id An integer specifying the index of the coach mark
             * that will be made current.
             * @returns {Action}
             */
            var setCurrentCoachMark = (exports.setCurrentCoachMark = function setCurrentCoachMark(
                id,
            ) {
                return {
                    payload: id,
                    type: _actionTypes.SET_CURRENT_COACHMARK,
                };
            });

            /**
             * This action triggers the next available tour.
             * The next tour will start at the first coach mark.
             * @returns {Action}
             */
            var nextTour = (exports.nextTour = function nextTour() {
                return {
                    type: _actionTypes.NEXT_TOUR,
                };
            });

            /**
             * This action triggers the previous tour.
             * The tour will start at the first coach mark.
             * @returns {Action}
             */
            var prevTour = (exports.prevTour = function prevTour() {
                return {
                    type: _actionTypes.PREV_TOUR,
                };
            });

            /**
             * This action activates the specified tour.
             * The tour will start at the first coach mark.
             * The provided tour id must be valid or an error will be thrown.
             * @param {number} id - An integer specifying the index of the tour that will be made active.
             * @returns {Action}
             */
            var setCurrentTour = (exports.setCurrentTour = function setCurrentTour(id) {
                return {
                    payload: id,
                    type: _actionTypes.SET_CURRENT_TOUR,
                };
            });

            /**
             * This action removes the specified coach mark from the specified tour.
             * @param {number} coachMarkId - An integer specifying the index of the coach mark to be removed.
             * If not provided, the current coach mark will be used.
             * @param {number} tourId - An integer specifying the index of the tour containing the coach
             * mark to be removed.  If not provided, the current tour will be used.
             * @returns {Action}
             */
            var removeCoachMark = (exports.removeCoachMark = function removeCoachMark() {
                var coachMarkId =
                    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var tourId =
                    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                return {
                    payload: {
                        coachMarkId: coachMarkId,
                        tourId: tourId,
                    },
                    type: _actionTypes.REMOVE_COACHMARK,
                };
            });

            /**
             * This action removes the specified tour.
             * @param {integer} tourId - The index of the tour to be removed.
             * If not provided, the current tour will be removed.
             * @returns {Action}
             */
            var removeTour = (exports.removeTour = function removeTour() {
                var tourId =
                    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                return {
                    payload: {
                        tourId: tourId,
                    },
                    type: _actionTypes.REMOVE_TOUR,
                };
            });

            /**
             * This action hides the tour guide UI.
             * If the UI is already hidden, nothing will happen.
             * @returns {Action}
             */
            var hideTourGuide = (exports.hideTourGuide = function hideTourGuide() {
                return {
                    type: _actionTypes.HIDE_TOUR_GUIDE,
                };
            });

            /**
             * This action shows the tour guide UI.
             * If the UI is already visible, nothing will happen.
             * @returns {Action}
             */
            var showTourGuide = (exports.showTourGuide = function showTourGuide() {
                return {
                    type: _actionTypes.SHOW_TOUR_GUIDE,
                };
            });

            /**
             * This action hides the tour guide navigation menu.
             * If the menu is already hidden, nothing wil happen.
             * @returns {Action}
             */
            var hideMore = (exports.hideMore = function hideMore() {
                return {
                    type: _actionTypes.HIDE_MORE,
                };
            });

            /**
             * This action shows the tour guide navigation menu.
             * If the menu is already visible, nothing will happen.
             * @returns {Action}
             */
            var showMore = (exports.showMore = function showMore() {
                return {
                    type: _actionTypes.SHOW_MORE,
                };
            });

            /**
             * This action removes an attribute from a coach mark.  If a required attribute is removed,
             * and error will be thrown.
             * @param {CoachMarkProperties} attributes - The attribute to be removed.
             * @param {number} coachmarkId - An integer specifying the index of the coachmark to be altered.
             * If not provided, the current coach mark will be used.
             * @param {number} tourId - An integer specifying the index of the tour containing the coach mark
             * that will be altered. If not provided, the current tour will be used.
             * @returns {Action}
             */
            var removeCoachMarkAttribute = (exports.removeCoachMarkAttribute = function removeCoachMarkAttribute(
                attribute,
            ) {
                var coachMarkId =
                    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var tourId =
                    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                return {
                    payload: {
                        attribute: attribute,
                        coachMarkId: coachMarkId,
                        tourId: tourId,
                    },
                    type: _actionTypes.REMOVE_COACHMARK_ATTRIBUTE,
                };
            });

            /**
             * This action modifies the attributes of an exisiting coach mark.
             * @param {CoachMarkProperties} attributes - An object containing the attributes to be altered.
             * @param {number} coachmarkId - An integer specifying the index of the coachmark to be altered.
             * If not provided, the current coach mark will be used.
             * @param {number} tourId - An integer specifying the index of the tour containing the coach mark
             * that will be altered. If not provided, the current tour will be used.
             * @returns {Action}
             */
            var modifyCoachMarkAttributes = (exports.modifyCoachMarkAttributes = function modifyCoachMarkAttributes(
                attributes,
            ) {
                var coachMarkId =
                    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var tourId =
                    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                return {
                    payload: {
                        attributes: attributes,
                        coachMarkId: coachMarkId,
                        tourId: tourId,
                    },
                    type: _actionTypes.MODIFY_COACHMARK_ATTRIBUTES,
                };
            });

            /**
             * This action modifies the attributes of an existing tour.
             * @param {*} attributes - An object containing the attributes to be altered.
             * @param {integer} tourId - An integer specifying the index of the tour to be altered.
             * @returns {Action}
             */
            var modifyTourAttributes = (exports.modifyTourAttributes = function modifyTourAttributes(
                attributes,
            ) {
                var tourId =
                    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                return {
                    payload: {
                        attributes: attributes,
                        tourId: tourId,
                    },
                    type: _actionTypes.MODIFY_TOUR_ATTRIBUTES,
                };
            });

            /**
             * This action is used to quickly replace large sections of app state.
             * For example it can be used to replace the old batch of tours with a new one.
             * The submitted state is a plain javascript with the same shape/schema at the app state.
             * The submitted state is shallowly merged with the old state.
             * @param {*} state - The apps state
             * @returns {Action}
             */
            var setState = (exports.setState = function setState(state) {
                return {
                    payload: state,
                    type: _actionTypes.SET_STATE,
                };
            });

            /***/
        },
        /* 14 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            var token = '%[a-f0-9]{2}';
            var singleMatcher = new RegExp(token, 'gi');
            var multiMatcher = new RegExp('(' + token + ')+', 'gi');

            function decodeComponents(components, split) {
                try {
                    // Try to decode the entire string first
                    return decodeURIComponent(components.join(''));
                } catch (err) {
                    // Do nothing
                }

                if (components.length === 1) {
                    return components;
                }

                split = split || 1;

                // Split the array in 2 parts
                var left = components.slice(0, split);
                var right = components.slice(split);

                return Array.prototype.concat.call(
                    [],
                    decodeComponents(left),
                    decodeComponents(right),
                );
            }

            function decode(input) {
                try {
                    return decodeURIComponent(input);
                } catch (err) {
                    var tokens = input.match(singleMatcher);

                    for (var i = 1; i < tokens.length; i++) {
                        input = decodeComponents(tokens, i).join('');

                        tokens = input.match(singleMatcher);
                    }

                    return input;
                }
            }

            function customDecodeURIComponent(input) {
                // Keep track of all the replacements and prefill the map with the `BOM`
                var replaceMap = {
                    '%FE%FF': '\uFFFD\uFFFD',
                    '%FF%FE': '\uFFFD\uFFFD',
                };

                var match = multiMatcher.exec(input);
                while (match) {
                    try {
                        // Decode as big chunks as possible
                        replaceMap[match[0]] = decodeURIComponent(match[0]);
                    } catch (err) {
                        var result = decode(match[0]);

                        if (result !== match[0]) {
                            replaceMap[match[0]] = result;
                        }
                    }

                    match = multiMatcher.exec(input);
                }

                // Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
                replaceMap['%C2'] = '\uFFFD';

                var entries = Object.keys(replaceMap);

                for (var i = 0; i < entries.length; i++) {
                    // Replace all decoded components
                    var key = entries[i];
                    input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
                }

                return input;
            }

            module.exports = function(encodedURI) {
                if (typeof encodedURI !== 'string') {
                    throw new TypeError(
                        'Expected `encodedURI` to be of type `string`, got `' +
                            (typeof encodedURI === 'undefined'
                                ? 'undefined'
                                : _typeof(encodedURI)) +
                            '`',
                    );
                }

                try {
                    encodedURI = encodedURI.replace(/\+/g, ' ');

                    // Try the built in decoder first
                    return decodeURIComponent(encodedURI);
                } catch (err) {
                    // Fallback to a more advanced decoder
                    return customDecodeURIComponent(encodedURI);
                }
            };

            /***/
        },
        /* 15 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            module.exports = function(str) {
                return encodeURIComponent(str).replace(/[!'()*]/g, function(x) {
                    return (
                        '%' +
                        x
                            .charCodeAt(0)
                            .toString(16)
                            .toUpperCase()
                    );
                });
            };

            /***/
        },
        /* 16 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var _slicedToArray = (function() {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = undefined;
                    try {
                        for (
                            var _i = arr[Symbol.iterator](), _s;
                            !(_n = (_s = _i.next()).done);
                            _n = true
                        ) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i['return']) _i['return']();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) {
                        return arr;
                    } else if (Symbol.iterator in Object(arr)) {
                        return sliceIterator(arr, i);
                    } else {
                        throw new TypeError('Invalid attempt to destructure non-iterable instance');
                    }
                };
            })();

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            var strictUriEncode = __webpack_require__(15);
            var decodeComponent = __webpack_require__(14);

            function encoderForArrayFormat(options) {
                switch (options.arrayFormat) {
                    case 'index':
                        return function(key, value, index) {
                            return value === null
                                ? [encode(key, options), '[', index, ']'].join('')
                                : [
                                      encode(key, options),
                                      '[',
                                      encode(index, options),
                                      ']=',
                                      encode(value, options),
                                  ].join('');
                        };
                    case 'bracket':
                        return function(key, value) {
                            return value === null
                                ? encode(key, options)
                                : [encode(key, options), '[]=', encode(value, options)].join('');
                        };
                    default:
                        return function(key, value) {
                            return value === null
                                ? encode(key, options)
                                : [encode(key, options), '=', encode(value, options)].join('');
                        };
                }
            }

            function parserForArrayFormat(options) {
                var result = void 0;

                switch (options.arrayFormat) {
                    case 'index':
                        return function(key, value, accumulator) {
                            result = /\[(\d*)\]$/.exec(key);

                            key = key.replace(/\[\d*\]$/, '');

                            if (!result) {
                                accumulator[key] = value;
                                return;
                            }

                            if (accumulator[key] === undefined) {
                                accumulator[key] = {};
                            }

                            accumulator[key][result[1]] = value;
                        };
                    case 'bracket':
                        return function(key, value, accumulator) {
                            result = /(\[\])$/.exec(key);
                            key = key.replace(/\[\]$/, '');

                            if (!result) {
                                accumulator[key] = value;
                                return;
                            }

                            if (accumulator[key] === undefined) {
                                accumulator[key] = [value];
                                return;
                            }

                            accumulator[key] = [].concat(accumulator[key], value);
                        };
                    default:
                        return function(key, value, accumulator) {
                            if (accumulator[key] === undefined) {
                                accumulator[key] = value;
                                return;
                            }

                            accumulator[key] = [].concat(accumulator[key], value);
                        };
                }
            }

            function encode(value, options) {
                if (options.encode) {
                    return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
                }

                return value;
            }

            function keysSorter(input) {
                if (Array.isArray(input)) {
                    return input.sort();
                }

                if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
                    return keysSorter(Object.keys(input))
                        .sort(function(a, b) {
                            return Number(a) - Number(b);
                        })
                        .map(function(key) {
                            return input[key];
                        });
                }

                return input;
            }

            function extract(input) {
                var queryStart = input.indexOf('?');
                if (queryStart === -1) {
                    return '';
                }
                return input.slice(queryStart + 1);
            }

            function parse(input, options) {
                options = Object.assign({ arrayFormat: 'none' }, options);

                var formatter = parserForArrayFormat(options);

                // Create an object with no prototype
                var ret = Object.create(null);

                if (typeof input !== 'string') {
                    return ret;
                }

                input = input.trim().replace(/^[?#&]/, '');

                if (!input) {
                    return ret;
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (
                        var _iterator = input.split('&')[Symbol.iterator](), _step;
                        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                        _iteratorNormalCompletion = true
                    ) {
                        var param = _step.value;

                        var _param$replace$split = param.replace(/\+/g, ' ').split('='),
                            _param$replace$split2 = _slicedToArray(_param$replace$split, 2),
                            key = _param$replace$split2[0],
                            value = _param$replace$split2[1];

                        // Missing `=` should be `null`:
                        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters

                        value = value === undefined ? null : decodeComponent(value);

                        formatter(decodeComponent(key), value, ret);
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

                return Object.keys(ret)
                    .sort()
                    .reduce(function(result, key) {
                        var value = ret[key];
                        if (
                            Boolean(value) &&
                            (typeof value === 'undefined' ? 'undefined' : _typeof(value)) ===
                                'object' &&
                            !Array.isArray(value)
                        ) {
                            // Sort object keys, not values
                            result[key] = keysSorter(value);
                        } else {
                            result[key] = value;
                        }

                        return result;
                    }, Object.create(null));
            }

            exports.extract = extract;
            exports.parse = parse;

            exports.stringify = function(obj, options) {
                var defaults = {
                    encode: true,
                    strict: true,
                    arrayFormat: 'none',
                };

                options = Object.assign(defaults, options);

                if (options.sort === false) {
                    options.sort = function() {};
                }

                var formatter = encoderForArrayFormat(options);

                return obj
                    ? Object.keys(obj)
                          .sort(options.sort)
                          .map(function(key) {
                              var value = obj[key];

                              if (value === undefined) {
                                  return '';
                              }

                              if (value === null) {
                                  return encode(key, options);
                              }

                              if (Array.isArray(value)) {
                                  var result = [];

                                  var _iteratorNormalCompletion2 = true;
                                  var _didIteratorError2 = false;
                                  var _iteratorError2 = undefined;

                                  try {
                                      for (
                                          var _iterator2 = value.slice()[Symbol.iterator](), _step2;
                                          !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next())
                                              .done);
                                          _iteratorNormalCompletion2 = true
                                      ) {
                                          var value2 = _step2.value;

                                          if (value2 === undefined) {
                                              continue;
                                          }

                                          result.push(formatter(key, value2, result.length));
                                      }
                                  } catch (err) {
                                      _didIteratorError2 = true;
                                      _iteratorError2 = err;
                                  } finally {
                                      try {
                                          if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                              _iterator2.return();
                                          }
                                      } finally {
                                          if (_didIteratorError2) {
                                              throw _iteratorError2;
                                          }
                                      }
                                  }

                                  return result.join('&');
                              }

                              return encode(key, options) + '=' + encode(value, options);
                          })
                          .filter(function(x) {
                              return x.length > 0;
                          })
                          .join('&')
                    : '';
            };

            exports.parseUrl = function(input, options) {
                return {
                    url: input.split('?')[0] || '',
                    query: parse(extract(input), options),
                };
            };

            /***/
        },
        /* 17 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.default = applyMiddleware;

            var _compose = __webpack_require__(5);

            var _compose2 = _interopRequireDefault(_compose);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var _extends =
                Object.assign ||
                function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

            /**
             * Creates a store enhancer that applies middleware to the dispatch method
             * of the Redux store. This is handy for a variety of tasks, such as expressing
             * asynchronous actions in a concise manner, or logging every action payload.
             *
             * See `redux-thunk` package as an example of the Redux middleware.
             *
             * Because middleware is potentially asynchronous, this should be the first
             * store enhancer in the composition chain.
             *
             * Note that each middleware will be given the `dispatch` and `getState` functions
             * as named arguments.
             *
             * @param {...Function} middlewares The middleware chain to be applied.
             * @returns {Function} A store enhancer applying the middleware.
             */
            function applyMiddleware() {
                for (
                    var _len = arguments.length, middlewares = Array(_len), _key = 0;
                    _key < _len;
                    _key++
                ) {
                    middlewares[_key] = arguments[_key];
                }

                return function(createStore) {
                    return function(reducer, preloadedState, enhancer) {
                        var store = createStore(reducer, preloadedState, enhancer);
                        var _dispatch = store.dispatch;
                        var chain = [];

                        var middlewareAPI = {
                            getState: store.getState,
                            dispatch: function dispatch(action) {
                                return _dispatch(action);
                            },
                        };
                        chain = middlewares.map(function(middleware) {
                            return middleware(middlewareAPI);
                        });
                        _dispatch = _compose2.default.apply(undefined, chain)(store.dispatch);

                        return _extends({}, store, {
                            dispatch: _dispatch,
                        });
                    };
                };
            }

            /***/
        },
        /* 18 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            exports.default = bindActionCreators;
            function bindActionCreator(actionCreator, dispatch) {
                return function() {
                    return dispatch(actionCreator.apply(undefined, arguments));
                };
            }

            /**
             * Turns an object whose values are action creators, into an object with the
             * same keys, but with every function wrapped into a `dispatch` call so they
             * may be invoked directly. This is just a convenience method, as you can call
             * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
             *
             * For convenience, you can also pass a single function as the first argument,
             * and get a function in return.
             *
             * @param {Function|Object} actionCreators An object whose values are action
             * creator functions. One handy way to obtain it is to use ES6 `import * as`
             * syntax. You may also pass a single function.
             *
             * @param {Function} dispatch The `dispatch` function available on your Redux
             * store.
             *
             * @returns {Function|Object} The object mimicking the original object, but with
             * every action creator wrapped into the `dispatch` call. If you passed a
             * function as `actionCreators`, the return value will also be a single
             * function.
             */
            function bindActionCreators(actionCreators, dispatch) {
                if (typeof actionCreators === 'function') {
                    return bindActionCreator(actionCreators, dispatch);
                }

                if (
                    (typeof actionCreators === 'undefined'
                        ? 'undefined'
                        : _typeof(actionCreators)) !== 'object' ||
                    actionCreators === null
                ) {
                    throw new Error(
                        'bindActionCreators expected an object or a function, instead received ' +
                            (actionCreators === null
                                ? 'null'
                                : typeof actionCreators === 'undefined'
                                    ? 'undefined'
                                    : _typeof(actionCreators)) +
                            '. ' +
                            'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?',
                    );
                }

                var keys = Object.keys(actionCreators);
                var boundActionCreators = {};
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var actionCreator = actionCreators[key];
                    if (typeof actionCreator === 'function') {
                        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
                    }
                }
                return boundActionCreators;
            }

            /***/
        },
        /* 19 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.default = combineReducers;

            var _createStore = __webpack_require__(9);

            var _isPlainObject = __webpack_require__(8);

            var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

            var _warning = __webpack_require__(6);

            var _warning2 = _interopRequireDefault(_warning);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            function getUndefinedStateErrorMessage(key, action) {
                var actionType = action && action.type;
                var actionName = (actionType && '"' + actionType.toString() + '"') || 'an action';

                return (
                    'Given action ' +
                    actionName +
                    ', reducer "' +
                    key +
                    '" returned undefined. ' +
                    'To ignore an action, you must explicitly return the previous state. ' +
                    'If you want this reducer to hold no value, you can return null instead of undefined.'
                );
            }

            function getUnexpectedStateShapeWarningMessage(
                inputState,
                reducers,
                action,
                unexpectedKeyCache,
            ) {
                var reducerKeys = Object.keys(reducers);
                var argumentName =
                    action && action.type === _createStore.ActionTypes.INIT
                        ? 'preloadedState argument passed to createStore'
                        : 'previous state received by the reducer';

                if (reducerKeys.length === 0) {
                    return (
                        'Store does not have a valid reducer. Make sure the argument passed ' +
                        'to combineReducers is an object whose values are reducers.'
                    );
                }

                if (!(0, _isPlainObject2.default)(inputState)) {
                    return (
                        'The ' +
                        argumentName +
                        ' has unexpected type of "' +
                        {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
                        '". Expected argument to be an object with the following ' +
                        ('keys: "' + reducerKeys.join('", "') + '"')
                    );
                }

                var unexpectedKeys = Object.keys(inputState).filter(function(key) {
                    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
                });

                unexpectedKeys.forEach(function(key) {
                    unexpectedKeyCache[key] = true;
                });

                if (unexpectedKeys.length > 0) {
                    return (
                        'Unexpected ' +
                        (unexpectedKeys.length > 1 ? 'keys' : 'key') +
                        ' ' +
                        ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') +
                        'Expected to find one of the known reducer keys instead: ' +
                        ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.')
                    );
                }
            }

            function assertReducerShape(reducers) {
                Object.keys(reducers).forEach(function(key) {
                    var reducer = reducers[key];
                    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

                    if (typeof initialState === 'undefined') {
                        throw new Error(
                            'Reducer "' +
                                key +
                                '" returned undefined during initialization. ' +
                                'If the state passed to the reducer is undefined, you must ' +
                                'explicitly return the initial state. The initial state may ' +
                                "not be undefined. If you don't want to set a value for this reducer, " +
                                'you can use null instead of undefined.',
                        );
                    }

                    var type =
                        '@@redux/PROBE_UNKNOWN_ACTION_' +
                        Math.random()
                            .toString(36)
                            .substring(7)
                            .split('')
                            .join('.');
                    if (typeof reducer(undefined, { type: type }) === 'undefined') {
                        throw new Error(
                            'Reducer "' +
                                key +
                                '" returned undefined when probed with a random type. ' +
                                ("Don't try to handle " +
                                    _createStore.ActionTypes.INIT +
                                    ' or other actions in "redux/*" ') +
                                'namespace. They are considered private. Instead, you must return the ' +
                                'current state for any unknown actions, unless it is undefined, ' +
                                'in which case you must return the initial state, regardless of the ' +
                                'action type. The initial state may not be undefined, but can be null.',
                        );
                    }
                });
            }

            /**
             * Turns an object whose values are different reducer functions, into a single
             * reducer function. It will call every child reducer, and gather their results
             * into a single state object, whose keys correspond to the keys of the passed
             * reducer functions.
             *
             * @param {Object} reducers An object whose values correspond to different
             * reducer functions that need to be combined into one. One handy way to obtain
             * it is to use ES6 `import * as reducers` syntax. The reducers may never return
             * undefined for any action. Instead, they should return their initial state
             * if the state passed to them was undefined, and the current state for any
             * unrecognized action.
             *
             * @returns {Function} A reducer function that invokes every reducer inside the
             * passed object, and builds a state object with the same shape.
             */
            function combineReducers(reducers) {
                var reducerKeys = Object.keys(reducers);
                var finalReducers = {};
                for (var i = 0; i < reducerKeys.length; i++) {
                    var key = reducerKeys[i];

                    if (false) {
                    }

                    if (typeof reducers[key] === 'function') {
                        finalReducers[key] = reducers[key];
                    }
                }
                var finalReducerKeys = Object.keys(finalReducers);

                var unexpectedKeyCache = void 0;
                if (false) {
                }

                var shapeAssertionError = void 0;
                try {
                    assertReducerShape(finalReducers);
                } catch (e) {
                    shapeAssertionError = e;
                }

                return function combination() {
                    var state =
                        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                    var action = arguments[1];

                    if (shapeAssertionError) {
                        throw shapeAssertionError;
                    }

                    if (false) {
                        var warningMessage;
                    }

                    var hasChanged = false;
                    var nextState = {};
                    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
                        var _key = finalReducerKeys[_i];
                        var reducer = finalReducers[_key];
                        var previousStateForKey = state[_key];
                        var nextStateForKey = reducer(previousStateForKey, action);
                        if (typeof nextStateForKey === 'undefined') {
                            var errorMessage = getUndefinedStateErrorMessage(_key, action);
                            throw new Error(errorMessage);
                        }
                        nextState[_key] = nextStateForKey;
                        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
                    }
                    return hasChanged ? nextState : state;
                };
            }

            /***/
        },
        /* 20 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.default = symbolObservablePonyfill;
            function symbolObservablePonyfill(root) {
                var result;
                var _Symbol = root.Symbol;

                if (typeof _Symbol === 'function') {
                    if (_Symbol.observable) {
                        result = _Symbol.observable;
                    } else {
                        result = _Symbol('observable');
                        _Symbol.observable = result;
                    }
                } else {
                    result = '@@observable';
                }

                return result;
            }

            /***/
        },
        /* 21 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            module.exports = function(module) {
                if (!module.webpackPolyfill) {
                    module.deprecate = function() {};
                    module.paths = [];
                    // module.parent = undefined by default
                    if (!module.children) module.children = [];
                    Object.defineProperty(module, 'loaded', {
                        enumerable: true,
                        get: function get() {
                            return module.l;
                        },
                    });
                    Object.defineProperty(module, 'id', {
                        enumerable: true,
                        get: function get() {
                            return module.i;
                        },
                    });
                    module.webpackPolyfill = 1;
                }
                return module;
            };

            /***/
        },
        /* 22 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */ (function(global, module) {
                Object.defineProperty(exports, '__esModule', {
                    value: true,
                });

                var _ponyfill = __webpack_require__(20);

                var _ponyfill2 = _interopRequireDefault(_ponyfill);

                function _interopRequireDefault(obj) {
                    return obj && obj.__esModule ? obj : { default: obj };
                }

                var root; /* global window */

                if (typeof self !== 'undefined') {
                    root = self;
                } else if (typeof window !== 'undefined') {
                    root = window;
                } else if (typeof global !== 'undefined') {
                    root = global;
                } else if (true) {
                    root = module;
                } else {
                }

                var result = (0, _ponyfill2.default)(root);
                exports.default = result;
                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__(2), __webpack_require__(21)(module)));

            /***/
        },
        /* 23 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            /**
             * Checks if `value` is object-like. A value is object-like if it's not `null`
             * and has a `typeof` result of "object".
             *
             * @static
             * @memberOf _
             * @since 4.0.0
             * @category Lang
             * @param {*} value The value to check.
             * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
             * @example
             *
             * _.isObjectLike({});
             * // => true
             *
             * _.isObjectLike([1, 2, 3]);
             * // => true
             *
             * _.isObjectLike(_.noop);
             * // => false
             *
             * _.isObjectLike(null);
             * // => false
             */
            function isObjectLike(value) {
                return (
                    value != null &&
                    (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object'
                );
            }

            exports.default = isObjectLike;

            /***/
        },
        /* 24 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            /**
             * Creates a unary function that invokes `func` with its argument transformed.
             *
             * @private
             * @param {Function} func The function to wrap.
             * @param {Function} transform The argument transform.
             * @returns {Function} Returns the new function.
             */
            function overArg(func, transform) {
                return function(arg) {
                    return func(transform(arg));
                };
            }

            exports.default = overArg;

            /***/
        },
        /* 25 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _overArg = __webpack_require__(24);

            var _overArg2 = _interopRequireDefault(_overArg);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /** Built-in value references. */
            var getPrototype = (0, _overArg2.default)(Object.getPrototypeOf, Object);

            exports.default = getPrototype;

            /***/
        },
        /* 26 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            /** Used for built-in method references. */
            var objectProto = Object.prototype;

            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
             * of values.
             */
            var nativeObjectToString = objectProto.toString;

            /**
             * Converts `value` to a string using `Object.prototype.toString`.
             *
             * @private
             * @param {*} value The value to convert.
             * @returns {string} Returns the converted string.
             */
            function objectToString(value) {
                return nativeObjectToString.call(value);
            }

            exports.default = objectToString;

            /***/
        },
        /* 27 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _Symbol2 = __webpack_require__(7);

            var _Symbol3 = _interopRequireDefault(_Symbol2);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /** Used for built-in method references. */
            var objectProto = Object.prototype;

            /** Used to check objects for own properties. */
            var hasOwnProperty = objectProto.hasOwnProperty;

            /**
             * Used to resolve the
             * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
             * of values.
             */
            var nativeObjectToString = objectProto.toString;

            /** Built-in value references. */
            var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

            /**
             * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
             *
             * @private
             * @param {*} value The value to query.
             * @returns {string} Returns the raw `toStringTag`.
             */
            function getRawTag(value) {
                var isOwn = hasOwnProperty.call(value, symToStringTag),
                    tag = value[symToStringTag];

                try {
                    value[symToStringTag] = undefined;
                    var unmasked = true;
                } catch (e) {}

                var result = nativeObjectToString.call(value);
                if (unmasked) {
                    if (isOwn) {
                        value[symToStringTag] = tag;
                    } else {
                        delete value[symToStringTag];
                    }
                }
                return result;
            }

            exports.default = getRawTag;

            /***/
        },
        /* 28 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */ (function(global) {
                Object.defineProperty(exports, '__esModule', {
                    value: true,
                });

                var _typeof =
                    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                        ? function(obj) {
                              return typeof obj;
                          }
                        : function(obj) {
                              return obj &&
                                  typeof Symbol === 'function' &&
                                  obj.constructor === Symbol &&
                                  obj !== Symbol.prototype
                                  ? 'symbol'
                                  : typeof obj;
                          };

                /** Detect free variable `global` from Node.js. */
                var freeGlobal =
                    (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' &&
                    global &&
                    global.Object === Object &&
                    global;

                exports.default = freeGlobal;
                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__(2)));

            /***/
        },
        /* 29 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            var _freeGlobal = __webpack_require__(28);

            var _freeGlobal2 = _interopRequireDefault(_freeGlobal);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /** Detect free variable `self`. */
            var freeSelf =
                (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' &&
                self &&
                self.Object === Object &&
                self;

            /** Used as a reference to the global object. */
            var root = _freeGlobal2.default || freeSelf || Function('return this')();

            exports.default = root;

            /***/
        },
        /* 30 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _Symbol2 = __webpack_require__(7);

            var _Symbol3 = _interopRequireDefault(_Symbol2);

            var _getRawTag = __webpack_require__(27);

            var _getRawTag2 = _interopRequireDefault(_getRawTag);

            var _objectToString = __webpack_require__(26);

            var _objectToString2 = _interopRequireDefault(_objectToString);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /** `Object#toString` result references. */
            var nullTag = '[object Null]',
                undefinedTag = '[object Undefined]';

            /** Built-in value references. */
            var symToStringTag = _Symbol3.default ? _Symbol3.default.toStringTag : undefined;

            /**
             * The base implementation of `getTag` without fallbacks for buggy environments.
             *
             * @private
             * @param {*} value The value to query.
             * @returns {string} Returns the `toStringTag`.
             */
            function baseGetTag(value) {
                if (value == null) {
                    return value === undefined ? undefinedTag : nullTag;
                }
                return symToStringTag && symToStringTag in Object(value)
                    ? (0, _getRawTag2.default)(value)
                    : (0, _objectToString2.default)(value);
            }

            exports.default = baseGetTag;

            /***/
        },
        /* 31 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

            var _createStore = __webpack_require__(9);

            var _createStore2 = _interopRequireDefault(_createStore);

            var _combineReducers = __webpack_require__(19);

            var _combineReducers2 = _interopRequireDefault(_combineReducers);

            var _bindActionCreators = __webpack_require__(18);

            var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

            var _applyMiddleware = __webpack_require__(17);

            var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

            var _compose = __webpack_require__(5);

            var _compose2 = _interopRequireDefault(_compose);

            var _warning = __webpack_require__(6);

            var _warning2 = _interopRequireDefault(_warning);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
            function isCrushed() {}

            if (false) {
            }

            exports.createStore = _createStore2.default;
            exports.combineReducers = _combineReducers2.default;
            exports.bindActionCreators = _bindActionCreators2.default;
            exports.applyMiddleware = _applyMiddleware2.default;
            exports.compose = _compose2.default;

            /***/
        },
        /* 32 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _extends =
                Object.assign ||
                function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

            var _redux = __webpack_require__(31);

            var _queryString = __webpack_require__(16);

            var _queryString2 = _interopRequireDefault(_queryString);

            var _actions = __webpack_require__(13);

            var actionCreators = _interopRequireWildcard(_actions);

            var _reducer = __webpack_require__(11);

            var _reducer2 = _interopRequireDefault(_reducer);

            function _interopRequireWildcard(obj) {
                if (obj && obj.__esModule) {
                    return obj;
                } else {
                    var newObj = {};
                    if (obj != null) {
                        for (var key in obj) {
                            if (Object.prototype.hasOwnProperty.call(obj, key))
                                newObj[key] = obj[key];
                        }
                    }
                    newObj.default = obj;
                    return newObj;
                }
            }

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true,
                    });
                } else {
                    obj[key] = value;
                }
                return obj;
            } /* eslint no-underscore-dangle: 0 */

            var defaultState = {
                currentCoachMarkIndex: 0,
                currentTourIndex: 0,
                infoBoxIsVisible: false,
                moreIsVisble: false,
                tours: [
                    {
                        title: null,
                        coachMarks: [],
                    },
                ],
            };

            var store = null;

            var stateFromQueryString = function stateFromQueryString() {
                var _queryString$parse = _queryString2.default.parse(window.location.search),
                    showTour = _queryString$parse.showTour,
                    showCoachMark = _queryString$parse.showCoachMark;

                var queryState = {};

                if (showTour) {
                    var value = parseInt(showTour, 10);

                    if (!isNaN(value)) {
                        queryState.currentTourIndex = value;
                        queryState.infoBoxIsVisible = true;
                    }
                }

                if (showCoachMark) {
                    var _value = parseInt(showCoachMark, 10);

                    if (!isNaN(_value)) {
                        queryState.currentCoachMarkIndex = _value;
                        queryState.infoBoxIsVisible = true;
                    }
                }

                return queryState;
            };

            // wraps action creators in a dispatch call
            var wrapDispatch = function wrapDispatch(actions, dispatch) {
                return Object.keys(actions)
                    .map(function(key) {
                        return _defineProperty({}, key, function() {
                            for (
                                var _len = arguments.length, params = Array(_len), _key = 0;
                                _key < _len;
                                _key++
                            ) {
                                params[_key] = arguments[_key];
                            }

                            return dispatch(actions[key].apply(null, params));
                        });
                    })
                    .reduce(function(prev, current) {
                        return _extends({}, prev, current);
                    }, {});
            };

            /**
             * This function determines what the app's initial state will be.
             * The apps's initial state can come from state passed from the init() function and URL parameters.
             * It then returns an instance of the redux store with an 'actions' parameter.
             * The 'actions' parameter contains all the action creators wrapped in a dispatch statement.
             * This makes passing action dispatcher to the view components easier.
             * @param {*} stateFromConfig - The initial application state.
             * @returns {*} - An instance of a redux store with an 'actions' parameter
             */
            var getStore = function getStore() {
                var stateFromConfig =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : defaultState;

                if (!store) {
                    var initialState = _extends(
                        {},
                        defaultState,
                        stateFromConfig,
                        stateFromQueryString(),
                    );
                    store = (0, _redux.createStore)(
                        _reducer2.default,
                        initialState,
                        window.__REDUX_DEVTOOLS_EXTENSION__ &&
                            window.__REDUX_DEVTOOLS_EXTENSION__(),
                    );

                    var _store = store,
                        dispatch = _store.dispatch;

                    var wrappedActions = wrapDispatch(actionCreators, dispatch);

                    store.actions = wrappedActions;
                }

                return store;
            };

            exports.default = getStore;

            /***/
        },
        /* 33 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            /**
             * A helper function for selecting page elements.
             * Wraps document.querySelector in a try catch so taht an error doesn't
             * get thrown if the selector passed to document.querySelector is invalid.
             * @param {string} selector - A CSS selector.
             */
            var getElement = function getElement(selector) {
                try {
                    return document.querySelector(selector);
                } catch (err) {
                    return null;
                }
            };

            exports.default = getElement;

            /***/
        },
        /* 34 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _CSSConfig = __webpack_require__(0);

            var calcHorizontalOffset = function calcHorizontalOffset(infoBoxBounds, arrowPosition) {
                var min = _CSSConfig.INFOBOX_BORDER_RADIUS_DOUBLE;
                var max =
                    infoBoxBounds.width -
                    _CSSConfig.INFOBOX_ARROW_SIZE * 2 -
                    _CSSConfig.INFOBOX_BORDER_RADIUS_DOUBLE;
                var offset = 0;

                if (arrowPosition.left < min) {
                    offset = min - arrowPosition.left;
                }
                if (arrowPosition.left > max) {
                    offset = max - arrowPosition.left;
                }

                return offset;
            };

            var calcVerticalOffset = function calcVerticalOffset(infoBoxBounds, arrowPosition) {
                var min = _CSSConfig.INFOBOX_BORDER_RADIUS_DOUBLE;
                var max =
                    infoBoxBounds.height -
                    _CSSConfig.INFOBOX_ARROW_SIZE * 2 -
                    _CSSConfig.INFOBOX_BORDER_RADIUS_DOUBLE;
                var offset = 0;

                if (arrowPosition.top < min) {
                    offset = min - arrowPosition.top;
                }
                if (arrowPosition.top > max) {
                    offset = max - arrowPosition.top;
                }

                return offset;
            };

            var calcPositionOffset = function calcPositionOffset(data, position, arrowPosition) {
                var infoBoxBounds = data.infoBoxBounds,
                    anchorPosition = data.anchorPosition;

                if (anchorPosition === 'top' || anchorPosition === 'bottom') {
                    var _offset = calcHorizontalOffset(infoBoxBounds, arrowPosition);

                    return {
                        left: _offset,
                        top: 0,
                    };
                }

                var offset = calcVerticalOffset(infoBoxBounds, arrowPosition);

                return {
                    left: 0,
                    top: offset,
                };
            };

            exports.default = calcPositionOffset;

            /***/
        },
        /* 35 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _CSSConfig = __webpack_require__(0);

            var calcAlignedHorizontalPosition = function calcAlignedHorizontalPosition(_ref) {
                var targetBounds = _ref.targetBounds,
                    infoBoxBounds = _ref.infoBoxBounds,
                    align = _ref.align;

                switch (align) {
                    case 'end': {
                        return targetBounds.right - infoBoxBounds.width;
                    }
                    case 'center': {
                        return (
                            targetBounds.right -
                            targetBounds.width * 0.5 -
                            infoBoxBounds.width * 0.5
                        );
                    }
                    default: {
                        return targetBounds.left;
                    }
                }
            };

            var calcAlignedVerticalPosition = function calcAlignedVerticalPosition(_ref2) {
                var targetBounds = _ref2.targetBounds,
                    infoBoxBounds = _ref2.infoBoxBounds,
                    align = _ref2.align;

                switch (align) {
                    case 'end': {
                        return targetBounds.bottom - infoBoxBounds.height;
                    }
                    case 'center': {
                        return (
                            targetBounds.bottom -
                            targetBounds.height * 0.5 -
                            infoBoxBounds.height * 0.5
                        );
                    }
                    default: {
                        return targetBounds.top;
                    }
                }
            };

            var calcInfoBoxPosition = function calcInfoBoxPosition(data) {
                var targetBounds = data.targetBounds,
                    infoBoxBounds = data.infoBoxBounds,
                    anchorPosition = data.anchorPosition;

                switch (anchorPosition) {
                    case 'left': {
                        return {
                            height: infoBoxBounds.height,
                            left:
                                targetBounds.left -
                                infoBoxBounds.width -
                                _CSSConfig.INFOBOX_ARROW_SIZE -
                                _CSSConfig.INFOBOX_PLACEMENT_GAP,
                            top: calcAlignedVerticalPosition(data),
                            width: infoBoxBounds.width,
                        };
                    }
                    case 'top': {
                        return {
                            height: infoBoxBounds.height,
                            left: calcAlignedHorizontalPosition(data),
                            top:
                                targetBounds.top -
                                infoBoxBounds.height -
                                _CSSConfig.INFOBOX_ARROW_SIZE -
                                _CSSConfig.INFOBOX_PLACEMENT_GAP,
                            width: infoBoxBounds.width,
                        };
                    }
                    case 'right': {
                        return {
                            height: infoBoxBounds.height,
                            left:
                                targetBounds.right +
                                _CSSConfig.INFOBOX_ARROW_SIZE +
                                _CSSConfig.INFOBOX_PLACEMENT_GAP,
                            top: calcAlignedVerticalPosition(data),
                            width: infoBoxBounds.width,
                        };
                    }
                    default: {
                        return {
                            height: infoBoxBounds.height,
                            left: calcAlignedHorizontalPosition(data),
                            top:
                                targetBounds.bottom +
                                _CSSConfig.INFOBOX_ARROW_SIZE +
                                _CSSConfig.INFOBOX_PLACEMENT_GAP,
                            width: infoBoxBounds.width,
                        };
                    }
                }
            };

            exports.default = calcInfoBoxPosition;

            /***/
        },
        /* 36 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _CSSConfig = __webpack_require__(0);

            var calcHorizontalPosition = function calcHorizontalPosition(_ref) {
                var targetBounds = _ref.targetBounds,
                    infoBoxBounds = _ref.infoBoxBounds,
                    align = _ref.align;

                switch (align) {
                    case 'end': {
                        return (
                            infoBoxBounds.width -
                            _CSSConfig.INFOBOX_ARROW_SIZE -
                            targetBounds.width * 0.5
                        );
                    }
                    case 'center': {
                        return infoBoxBounds.width * 0.5 - _CSSConfig.INFOBOX_ARROW_SIZE;
                    }
                    default: {
                        return -_CSSConfig.INFOBOX_ARROW_SIZE + targetBounds.width * 0.5;
                    }
                }
            };

            var calcVerticalPosition = function calcVerticalPosition(_ref2) {
                var targetBounds = _ref2.targetBounds,
                    infoBoxBounds = _ref2.infoBoxBounds,
                    align = _ref2.align;

                switch (align) {
                    case 'end': {
                        return (
                            infoBoxBounds.height -
                            _CSSConfig.INFOBOX_ARROW_SIZE -
                            targetBounds.height * 0.5
                        );
                    }
                    case 'center': {
                        return infoBoxBounds.height * 0.5 - _CSSConfig.INFOBOX_ARROW_SIZE;
                    }
                    default: {
                        return -_CSSConfig.INFOBOX_ARROW_SIZE + targetBounds.height * 0.5;
                    }
                }
            };

            var calcInfoBoxArrowPosition = function calcInfoBoxArrowPosition(data) {
                var anchorPosition = data.anchorPosition,
                    infoBoxBounds = data.infoBoxBounds;

                switch (anchorPosition) {
                    case 'left': {
                        return {
                            height: _CSSConfig.INFOBOX_ARROW_SIZE_DOUBLE,
                            left: infoBoxBounds.width - 1,
                            top: calcVerticalPosition(data),
                            width: _CSSConfig.INFOBOX_ARROW_SIZE,
                        };
                    }
                    case 'top': {
                        return {
                            height: _CSSConfig.INFOBOX_ARROW_SIZE,
                            left: calcHorizontalPosition(data),
                            top: infoBoxBounds.height - 1,
                            width: _CSSConfig.INFOBOX_ARROW_SIZE_DOUBLE,
                        };
                    }
                    case 'right': {
                        return {
                            height: _CSSConfig.INFOBOX_ARROW_SIZE_DOUBLE,
                            left: -_CSSConfig.INFOBOX_ARROW_SIZE + 1,
                            top: calcVerticalPosition(data),
                            width: _CSSConfig.INFOBOX_ARROW_SIZE,
                        };
                    }
                    default: {
                        return {
                            height: _CSSConfig.INFOBOX_ARROW_SIZE,
                            left: calcHorizontalPosition(data),
                            top: -_CSSConfig.INFOBOX_ARROW_SIZE + 1,
                            width: _CSSConfig.INFOBOX_ARROW_SIZE_DOUBLE,
                        };
                    }
                }
            };

            exports.default = calcInfoBoxArrowPosition;

            /***/
        },
        /* 37 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _extends =
                Object.assign ||
                function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

            var _calcInfoBoxArrowPosition = __webpack_require__(36);

            var _calcInfoBoxArrowPosition2 = _interopRequireDefault(_calcInfoBoxArrowPosition);

            var _calcInfoBoxPosition = __webpack_require__(35);

            var _calcInfoBoxPosition2 = _interopRequireDefault(_calcInfoBoxPosition);

            var _calcPositionOffset = __webpack_require__(34);

            var _calcPositionOffset2 = _interopRequireDefault(_calcPositionOffset);

            var _isOffscreen = __webpack_require__(4);

            var _isOffscreen2 = _interopRequireDefault(_isOffscreen);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var anchorPositions = ['top', 'right', 'bottom', 'left'];
            var alignments = ['start', 'center', 'end'];

            var calcPositions = function calcPositions(data) {
                var retryCount =
                    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

                var arrowPosition = (0, _calcInfoBoxArrowPosition2.default)(data);
                var infoBoxPosition = (0, _calcInfoBoxPosition2.default)(data);
                var offset = (0, _calcPositionOffset2.default)(
                    data,
                    infoBoxPosition,
                    arrowPosition,
                );
                var willRetry = (0, _isOffscreen2.default)(infoBoxPosition);
                var positions = {
                    anchorPosition: data.anchorPosition,
                    arrowPosition: _extends({}, arrowPosition, {
                        left: arrowPosition.left + offset.left,
                        top: arrowPosition.top + offset.top,
                    }),
                    infoBoxPosition: _extends({}, infoBoxPosition, {
                        left: infoBoxPosition.left - offset.left,
                        top: infoBoxPosition.top - offset.top,
                    }),
                };

                if (retryCount < 12 && willRetry) {
                    var anchorIndex = anchorPositions.indexOf(data.anchorPosition);
                    var alignmentIndex = alignments.indexOf(data.align);
                    var newAnchorPosition =
                        anchorPositions[(anchorIndex + 1) % anchorPositions.length];
                    var newAlignment =
                        retryCount % 4 === 3
                            ? alignments[(alignmentIndex + 1) % alignments.length]
                            : data.align;
                    var newData = _extends({}, data, {
                        align: newAlignment,
                        anchorPosition: newAnchorPosition,
                    });

                    positions = calcPositions(newData, retryCount + 1);
                }

                return positions;
            };

            exports.default = calcPositions;

            /***/
        },
        /* 38 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _extends =
                Object.assign ||
                function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

            var _CSSConfig = __webpack_require__(0);

            var _CSSSelectors = __webpack_require__(1);

            var _calcPositions2 = __webpack_require__(37);

            var _calcPositions3 = _interopRequireDefault(_calcPositions2);

            var _isOffscreen = __webpack_require__(4);

            var _isOffscreen2 = _interopRequireDefault(_isOffscreen);

            var _TourGuideStaticStyles = __webpack_require__(12);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var arrowStyles = function arrowStyles(anchorPosition) {
                switch (anchorPosition) {
                    case 'left':
                        return (
                            '\n      border-width:\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        0\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px;\n      border-color:\n        transparent\n        transparent\n        transparent\n        white;'
                        );
                    case 'top':
                        return (
                            '\n      border-width:\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        0\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px;\n      border-color:\n        white\n        transparent\n        transparent\n        transparent;'
                        );
                    case 'right':
                        return (
                            '\n      border-width:\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        0;\n      border-color:\n        transparent\n        white\n        transparent\n        transparent;'
                        );
                    default:
                        return (
                            '\n      border-width:\n        0\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px\n        ' +
                            _CSSConfig.INFOBOX_ARROW_SIZE +
                            'px;\n      border-color:\n        transparent\n        transparent\n        white\n        transparent;'
                        );
                }
            };

            var arrowBorderStyles = function arrowBorderStyles(anchorPosition) {
                switch (anchorPosition) {
                    case 'left':
                        return (
                            '\n      border-width:\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        0\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px;\n      border-color:\n        transparent\n        transparent\n        transparent\n        lightgray;\n      transform: translateX(2px);'
                        );
                    case 'top':
                        return (
                            '\n      border-width:\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        0\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px;\n      border-color:\n      lightgray\n        transparent\n        transparent\n        transparent;\n      transform: translateY(2px);'
                        );
                    case 'right':
                        return (
                            '\n      border-width:\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        0;\n      border-color:\n        transparent\n        lightgray\n        transparent\n        transparent;'
                        );
                    default:
                        return (
                            '\n      border-width:\n        0\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px\n        ' +
                            (_CSSConfig.INFOBOX_ARROW_SIZE + 2) +
                            'px;\n      border-color:\n        transparent\n        transparent\n        lightgray\n        transparent;'
                        );
                }
            };

            var TourGuideStyles = {
                view: function view(node) {
                    var infoBoxElement = document.querySelector(_CSSSelectors.INFOBOX_MAIN);
                    var _node$attrs = node.attrs,
                        coachMark = _node$attrs.coachMark,
                        targetElement = _node$attrs.targetElement,
                        coachMarkCount = _node$attrs.coachMarkCount,
                        currentCoachMarkIndex = _node$attrs.currentCoachMarkIndex,
                        willAnimate = _node$attrs.willAnimate;

                    if (!infoBoxElement || !targetElement) {
                        return null;
                    }
                    var media = coachMark.media;

                    var infoBoxBounds = infoBoxElement.getBoundingClientRect();

                    infoBoxBounds.height += media ? media.height : 0;
                    infoBoxBounds.height += _CSSConfig.INFOBOX_BORDER_WIDTH * 2;
                    infoBoxBounds.width += _CSSConfig.INFOBOX_BORDER_WIDTH * 2;

                    var targetBounds = targetElement.getBoundingClientRect();
                    var targetCenter = {
                        left: targetBounds.left + targetBounds.width * 0.5,
                        top: targetBounds.top + targetBounds.height * 0.5,
                    };
                    var data = _extends({}, coachMark, {
                        count: coachMarkCount,
                        currentId: currentCoachMarkIndex,
                        infoBoxBounds: infoBoxBounds,
                        targetBounds: targetBounds,
                    });

                    var _calcPositions = (0, _calcPositions3.default)(data),
                        arrowPosition = _calcPositions.arrowPosition,
                        infoBoxPosition = _calcPositions.infoBoxPosition,
                        anchorPosition = _calcPositions.anchorPosition;

                    var animationSpeed = willAnimate ? _CSSConfig.INFOBOX_ANIMATION_SPEED : 0;

                    // calculate values for navigation/more menu styles
                    var navigationMenuElment = document.querySelector(_CSSSelectors.INFOBOX_MORE);
                    var navigationMenuTopPosition = 0;

                    if (navigationMenuElment) {
                        var navigationMenuTopString = window
                            .getComputedStyle(navigationMenuElment)
                            .getPropertyValue('top');
                        var navigationMenuTop = parseInt(navigationMenuTopString, 10);
                        var navigationMenuBounds = navigationMenuElment.getBoundingClientRect();
                        var adjustedBounds = {
                            left: navigationMenuBounds.left,
                            top: navigationMenuBounds.top - navigationMenuTop,
                            width: navigationMenuBounds.width,
                            height: navigationMenuBounds.height,
                        };
                        var navigationMenuIsOffscreen = (0, _isOffscreen2.default)(adjustedBounds);

                        navigationMenuTopPosition = navigationMenuIsOffscreen
                            ? -navigationMenuBounds.height + 40
                            : 0;
                    }

                    return (
                        '\n      ' +
                        _CSSSelectors.PULSE_WRAPPER +
                        ' {\n        position: absolute;\n        margin: -6px;\n        left: ' +
                        targetCenter.left +
                        'px;\n        top: ' +
                        targetCenter.top +
                        'px;\n        z-index: 10000;\n        pointer-events: none;\n      }\n\n      ' +
                        _CSSSelectors.INFOBOX_WRAPPER +
                        ' {\n        position: fixed;\n        left: ' +
                        infoBoxPosition.left +
                        'px;\n        top: ' +
                        infoBoxPosition.top +
                        'px;\n        filter: drop-shadow(0 1px 4px rgba(0,0,0,0.1));\n        transition:\n          left ' +
                        animationSpeed +
                        ',\n          top ' +
                        animationSpeed +
                        ';\n      }\n\n      ' +
                        _CSSSelectors.INFOBOX_IMAGE_WRAPPER +
                        ' {\n        width: ' +
                        (media ? media.width : 0) +
                        'px;\n        height: ' +
                        (media ? media.height : 0) +
                        'px;\n        transition:\n          width ' +
                        animationSpeed +
                        ',\n          height ' +
                        animationSpeed +
                        ';\n      }\n\n      ' +
                        _CSSSelectors.INFOBOX_ARROW_BORDER +
                        ' {\n        background: transparent;\n        position: absolute;\n        left: ' +
                        (arrowPosition.left - 2) +
                        'px;\n        top: ' +
                        (arrowPosition.top - 2) +
                        'px;\n        width: 0;\n        height: 0;\n        border-style: solid;\n        ' +
                        arrowBorderStyles(anchorPosition) +
                        '\n      }\n\n      ' +
                        _CSSSelectors.INFOBOX_ARROW +
                        ' {\n        background: transparent;\n        position: absolute;\n        left: ' +
                        arrowPosition.left +
                        'px;\n        top: ' +
                        arrowPosition.top +
                        'px;\n        width: 0;\n        height: 0;\n        border-style: solid;\n        ' +
                        arrowStyles(anchorPosition) +
                        '\n      }\n\n      ' +
                        _CSSSelectors.INFOBOX_MORE +
                        ' {\n        color: ' +
                        _CSSConfig.GREY_DARK +
                        ';\n        position: absolute;\n        right: 48px;\n        width: 300px;\n        background: white;\n        font-size: 16px;\n        z-index: 20;\n        top: ' +
                        navigationMenuTopPosition +
                        ';\n        ' +
                        _TourGuideStaticStyles.CARD_BORDER_BACKGROUND +
                        '\n        transition: top ' +
                        _CSSConfig.INFOBOX_ANIMATION_SPEED +
                        '\n      }'
                    );
                },
            };

            exports.default = TourGuideStyles;

            /***/
        },
        /* 39 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });
            var validateTargetElement = function validateTargetElement(targetElement) {
                if (!targetElement) return false;

                var bounds = targetElement.getBoundingClientRect();
                var targetArea = bounds.width * bounds.height;

                if (targetArea > 0) return true;

                return false;
            };

            exports.default = validateTargetElement;

            /***/
        },
        /* 40 */
        /***/ function(module, exports) {
            module.exports =
                '<svg xmlns="http://www.w3.org/2000/svg" data-name="S_More_18_N@1x" id="S_More_18_N_1x" viewBox="0 0 18 18"><rect id="ToDelete" fill="#ff13dc" opacity="0" width="18" height="18"></rect><circle class="fill" cx="9" cy="9" r="2.05"></circle><circle class="fill" cx="15" cy="9" r="2.05"></circle><circle class="fill" cx="3" cy="9" r="2.05"></circle></svg>';

            /***/
        },
        /* 41 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _mithril = __webpack_require__(3);

            var _mithril2 = _interopRequireDefault(_mithril);

            var _CSSSelectors = __webpack_require__(1);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var NavigationButtons = {
                view: function view(node) {
                    var _node$attrs = node.attrs,
                        navButtons = _node$attrs.navButtons,
                        actions = _node$attrs.actions;
                    var nextCoachMark = actions.nextCoachMark,
                        prevCoachMark = actions.prevCoachMark,
                        hideTourGuide = actions.hideTourGuide;

                    var verifiedNavButtons = navButtons || ['back', 'next'];

                    return verifiedNavButtons.map(function(buttonType, index) {
                        var lastIndex = verifiedNavButtons.length - 1;
                        var buttonStyle =
                            index === lastIndex
                                ? _CSSSelectors.INFOBOX_BUTTON_PRIMARY
                                : _CSSSelectors.INFOBOX_BUTTON_SECONDARY;

                        switch (buttonType) {
                            case 'back': {
                                return (0,
                                _mithril2.default)('button.' + buttonStyle, { onclick: prevCoachMark }, 'Back');
                            }
                            case 'next': {
                                return (0,
                                _mithril2.default)('button.' + buttonStyle, { onclick: nextCoachMark }, 'Next');
                            }
                            case 'close': {
                                return (0,
                                _mithril2.default)('button.' + buttonStyle, { onclick: hideTourGuide }, 'Close');
                            }
                            default: {
                                return null;
                            }
                        }
                    });
                },
            };

            exports.default = NavigationButtons;

            /***/
        },
        /* 42 */
        /***/ function(module, exports) {
            module.exports =
                '<svg xmlns="http://www.w3.org/2000/svg" data-name="S_Checkmark_24_N@1x" id="S_Checkmark_24_N_1x" viewBox="0 0 24 24"><rect id="ToDelete" fill="#ff13dc" opacity="0" width="24" height="24"></rect><path class="fill" d="M20.651,4.917,19.165,3.76a.5.5,0,0,0-.7.087L9.617,15.212,5.31,10.906a.5.5,0,0,0-.707,0L3.256,12.253a.5.5,0,0,0,0,.707l6.216,6.224a.5.5,0,0,0,.748-.046L20.739,5.619A.5.5,0,0,0,20.651,4.917Z"></path></svg>';

            /***/
        },
        /* 43 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _mithril = __webpack_require__(3);

            var _mithril2 = _interopRequireDefault(_mithril);

            var _CSSSelectors = __webpack_require__(1);

            var _checkmark = __webpack_require__(42);

            var _checkmark2 = _interopRequireDefault(_checkmark);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var NavigationMenu = {
                view: function view(node) {
                    var coachMarks = node.attrs.coachMarks;
                    var _node$attrs$actions = node.attrs.actions,
                        hideTourGuide = _node$attrs$actions.hideTourGuide,
                        setCurrentCoachMark = _node$attrs$actions.setCurrentCoachMark;

                    return (0, _mithril2.default)(_CSSSelectors.INFOBOX_MORE, [
                        coachMarks.map(function(coachMark, i) {
                            return (0, _mithril2.default)(
                                _CSSSelectors.INFOBOX_MORE_ITEM,
                                {
                                    onclick: function onclick() {
                                        setCurrentCoachMark(i);
                                    },
                                },
                                [
                                    (0, _mithril2.default)(
                                        _CSSSelectors.INFOBOX_MORE_ITEM_STATUS_WRAPPER,
                                        coachMark.isComplete
                                            ? _mithril2.default.trust(_checkmark2.default)
                                            : null,
                                    ),
                                    (0, _mithril2.default)(
                                        _CSSSelectors.INFOBOX_MORE_ITEM_TEXT,
                                        coachMark.title,
                                    ),
                                ],
                            );
                        }),
                        (0, _mithril2.default)(_CSSSelectors.INFOBOX_DIVIDER),
                        (0, _mithril2.default)(
                            _CSSSelectors.INFOBOX_MORE_ITEM,
                            {
                                onclick: function onclick() {
                                    hideTourGuide();
                                },
                            },
                            'Close Tour',
                        ),
                    ]);
                },
            };

            exports.default = NavigationMenu;

            /***/
        },
        /* 44 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _mithril = __webpack_require__(3);

            var _mithril2 = _interopRequireDefault(_mithril);

            var _CSSSelectors = __webpack_require__(1);

            var _NavigationMenu = __webpack_require__(43);

            var _NavigationMenu2 = _interopRequireDefault(_NavigationMenu);

            var _NavigationButtons = __webpack_require__(41);

            var _NavigationButtons2 = _interopRequireDefault(_NavigationButtons);

            var _more = __webpack_require__(40);

            var _more2 = _interopRequireDefault(_more);

            var _validateTargetElement = __webpack_require__(39);

            var _validateTargetElement2 = _interopRequireDefault(_validateTargetElement);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var InfoBox = {
                view: function view(node) {
                    var _node$attrs = node.attrs,
                        coachMark = _node$attrs.coachMark,
                        coachMarkCount = _node$attrs.coachMarkCount,
                        currentCoachMarkIndex = _node$attrs.currentCoachMarkIndex,
                        infoBoxIsVisible = _node$attrs.infoBoxIsVisible,
                        moreIsVisible = _node$attrs.moreIsVisible,
                        targetElement = _node$attrs.targetElement,
                        actions = _node$attrs.actions;
                    var title = coachMark.title,
                        description = coachMark.description,
                        media = coachMark.media,
                        navButtons = coachMark.navButtons;
                    var hideMore = actions.hideMore,
                        showMore = actions.showMore;

                    var isTargetElementValid = (0, _validateTargetElement2.default)(targetElement);

                    if (!infoBoxIsVisible || !isTargetElementValid) {
                        return null;
                    }

                    return (0, _mithril2.default)(_CSSSelectors.INFOBOX_WRAPPER, [
                        (0, _mithril2.default)(_CSSSelectors.INFOBOX_CARD, [
                            (0, _mithril2.default)(
                                _CSSSelectors.INFOBOX_IMAGE_WRAPPER,
                                media && !media.error
                                    ? (0, _mithril2.default)('img' + _CSSSelectors.INFOBOX_IMAGE, {
                                          src: media.src,
                                      })
                                    : null,
                            ),
                            (0, _mithril2.default)(_CSSSelectors.INFOBOX_MAIN, [
                                (0, _mithril2.default)(_CSSSelectors.INFOBOX_HEADER, [
                                    (0, _mithril2.default)(_CSSSelectors.INFOBOX_TITLE, title),
                                    (0, _mithril2.default)(_CSSSelectors.INFOBOX_MORE_WRAPPER, [
                                        (0, _mithril2.default)(
                                            'button' +
                                                _CSSSelectors.INFOBOX_MORE_BUTTON +
                                                (moreIsVisible
                                                    ? _CSSSelectors.INFOBOX_MORE_BUTTON_ACTIVE
                                                    : ''),
                                            {
                                                onclick: function onclick(evt) {
                                                    var hideAndClean = function hideAndClean() {
                                                        hideMore();
                                                        window.removeEventListener(
                                                            'click',
                                                            windowClickHandler,
                                                        );
                                                    };
                                                    var windowClickHandler = function windowClickHandler() {
                                                        hideAndClean();
                                                    };

                                                    if (moreIsVisible) {
                                                        hideAndClean();
                                                    } else {
                                                        showMore();
                                                        window.addEventListener(
                                                            'click',
                                                            windowClickHandler,
                                                        );
                                                    }

                                                    evt.stopPropagation();
                                                },
                                            },
                                            (0, _mithril2.default)(
                                                _CSSSelectors.INFOBOX_MORE_BUTTON_ICON,
                                                _mithril2.default.trust(_more2.default),
                                            ),
                                        ),
                                        moreIsVisible
                                            ? (0, _mithril2.default)(
                                                  _NavigationMenu2.default,
                                                  node.attrs,
                                              )
                                            : null,
                                    ]),
                                ]),
                                (0, _mithril2.default)(
                                    _CSSSelectors.INFOBOX_DESCRIPTION,
                                    description,
                                ),
                                (0, _mithril2.default)(_CSSSelectors.INFOBOX_FOOTER, [
                                    (0, _mithril2.default)(
                                        _CSSSelectors.INFOBOX_STEPS,
                                        currentCoachMarkIndex + 1 + ' of ' + coachMarkCount,
                                    ),
                                    (0, _mithril2.default)(_NavigationButtons2.default, {
                                        navButtons: navButtons,
                                        actions: actions,
                                    }),
                                ]),
                            ]),
                        ]),
                        (0, _mithril2.default)(_CSSSelectors.INFOBOX_ARROW_BORDER),
                        (0, _mithril2.default)(_CSSSelectors.INFOBOX_ARROW),
                    ]);
                },
            };

            exports.default = InfoBox;

            /***/
        },
        /* 45 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _mithril = __webpack_require__(3);

            var _mithril2 = _interopRequireDefault(_mithril);

            var _InfoBox = __webpack_require__(44);

            var _InfoBox2 = _interopRequireDefault(_InfoBox);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            /**
             * The root component for Tour Guide.
             */
            var TourGuide = {
                view: function view(node) {
                    return (0, _mithril2.default)('div', [
                        // m(Pulse, node.attrs),
                        (0, _mithril2.default)(_InfoBox2.default, node.attrs),
                    ]);
                },
            };
            // import Pulse from './Pulse'
            exports.default = TourGuide;

            /***/
        },
        /* 46 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            // shim for using process in browser
            var process = (module.exports = {});

            // cached from whatever global is present so that test runners that stub it
            // don't break things.  But we need to wrap it in a try catch in case it is
            // wrapped in strict mode code which doesn't define any globals.  It's inside a
            // function because try/catches deoptimize in certain engines.

            var cachedSetTimeout;
            var cachedClearTimeout;

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout() {
                throw new Error('clearTimeout has not been defined');
            }
            (function() {
                try {
                    if (typeof setTimeout === 'function') {
                        cachedSetTimeout = setTimeout;
                    } else {
                        cachedSetTimeout = defaultSetTimout;
                    }
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    if (typeof clearTimeout === 'function') {
                        cachedClearTimeout = clearTimeout;
                    } else {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            })();
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }
            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if (
                    (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
                    clearTimeout
                ) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e) {
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e) {
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }
            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while (len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }

            process.nextTick = function(fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            };

            // v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function() {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = ''; // empty string to avoid regexp issues
            process.versions = {};

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;

            process.listeners = function(name) {
                return [];
            };

            process.binding = function(name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function() {
                return '/';
            };
            process.chdir = function(dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function() {
                return 0;
            };

            /***/
        },
        /* 47 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */ (function(global, process) {
                (function(global, undefined) {
                    'use strict';

                    if (global.setImmediate) {
                        return;
                    }

                    var nextHandle = 1; // Spec says greater than zero
                    var tasksByHandle = {};
                    var currentlyRunningATask = false;
                    var doc = global.document;
                    var registerImmediate;

                    function setImmediate(callback) {
                        // Callback can either be a function or a string
                        if (typeof callback !== 'function') {
                            callback = new Function('' + callback);
                        }
                        // Copy function arguments
                        var args = new Array(arguments.length - 1);
                        for (var i = 0; i < args.length; i++) {
                            args[i] = arguments[i + 1];
                        }
                        // Store and register the task
                        var task = { callback: callback, args: args };
                        tasksByHandle[nextHandle] = task;
                        registerImmediate(nextHandle);
                        return nextHandle++;
                    }

                    function clearImmediate(handle) {
                        delete tasksByHandle[handle];
                    }

                    function run(task) {
                        var callback = task.callback;
                        var args = task.args;
                        switch (args.length) {
                            case 0:
                                callback();
                                break;
                            case 1:
                                callback(args[0]);
                                break;
                            case 2:
                                callback(args[0], args[1]);
                                break;
                            case 3:
                                callback(args[0], args[1], args[2]);
                                break;
                            default:
                                callback.apply(undefined, args);
                                break;
                        }
                    }

                    function runIfPresent(handle) {
                        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                        // So if we're currently running a task, we'll need to delay this invocation.
                        if (currentlyRunningATask) {
                            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                            // "too much recursion" error.
                            setTimeout(runIfPresent, 0, handle);
                        } else {
                            var task = tasksByHandle[handle];
                            if (task) {
                                currentlyRunningATask = true;
                                try {
                                    run(task);
                                } finally {
                                    clearImmediate(handle);
                                    currentlyRunningATask = false;
                                }
                            }
                        }
                    }

                    function installNextTickImplementation() {
                        registerImmediate = function registerImmediate(handle) {
                            process.nextTick(function() {
                                runIfPresent(handle);
                            });
                        };
                    }

                    function canUsePostMessage() {
                        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
                        // where `global.postMessage` means something completely different and can't be used for this purpose.
                        if (global.postMessage && !global.importScripts) {
                            var postMessageIsAsynchronous = true;
                            var oldOnMessage = global.onmessage;
                            global.onmessage = function() {
                                postMessageIsAsynchronous = false;
                            };
                            global.postMessage('', '*');
                            global.onmessage = oldOnMessage;
                            return postMessageIsAsynchronous;
                        }
                    }

                    function installPostMessageImplementation() {
                        // Installs an event handler on `global` for the `message` event: see
                        // * https://developer.mozilla.org/en/DOM/window.postMessage
                        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

                        var messagePrefix = 'setImmediate$' + Math.random() + '$';
                        var onGlobalMessage = function onGlobalMessage(event) {
                            if (
                                event.source === global &&
                                typeof event.data === 'string' &&
                                event.data.indexOf(messagePrefix) === 0
                            ) {
                                runIfPresent(+event.data.slice(messagePrefix.length));
                            }
                        };

                        if (global.addEventListener) {
                            global.addEventListener('message', onGlobalMessage, false);
                        } else {
                            global.attachEvent('onmessage', onGlobalMessage);
                        }

                        registerImmediate = function registerImmediate(handle) {
                            global.postMessage(messagePrefix + handle, '*');
                        };
                    }

                    function installMessageChannelImplementation() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = function(event) {
                            var handle = event.data;
                            runIfPresent(handle);
                        };

                        registerImmediate = function registerImmediate(handle) {
                            channel.port2.postMessage(handle);
                        };
                    }

                    function installReadyStateChangeImplementation() {
                        var html = doc.documentElement;
                        registerImmediate = function registerImmediate(handle) {
                            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                            var script = doc.createElement('script');
                            script.onreadystatechange = function() {
                                runIfPresent(handle);
                                script.onreadystatechange = null;
                                html.removeChild(script);
                                script = null;
                            };
                            html.appendChild(script);
                        };
                    }

                    function installSetTimeoutImplementation() {
                        registerImmediate = function registerImmediate(handle) {
                            setTimeout(runIfPresent, 0, handle);
                        };
                    }

                    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
                    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
                    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

                    // Don't get fooled by e.g. browserify environments.
                    if ({}.toString.call(global.process) === '[object process]') {
                        // For Node.js before 0.9
                        installNextTickImplementation();
                    } else if (canUsePostMessage()) {
                        // For non-IE10 modern browsers
                        installPostMessageImplementation();
                    } else if (global.MessageChannel) {
                        // For web workers, where supported
                        installMessageChannelImplementation();
                    } else if (doc && 'onreadystatechange' in doc.createElement('script')) {
                        // For IE 6–8
                        installReadyStateChangeImplementation();
                    } else {
                        // For older browsers
                        installSetTimeoutImplementation();
                    }

                    attachTo.setImmediate = setImmediate;
                    attachTo.clearImmediate = clearImmediate;
                })(
                    typeof self === 'undefined'
                        ? typeof global === 'undefined'
                            ? undefined
                            : global
                        : self,
                );
                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__(2), __webpack_require__(46)));

            /***/
        },
        /* 48 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */ (function(global) {
                var apply = Function.prototype.apply;

                // DOM APIs, for completeness

                exports.setTimeout = function() {
                    return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
                };
                exports.setInterval = function() {
                    return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
                };
                exports.clearTimeout = exports.clearInterval = function(timeout) {
                    if (timeout) {
                        timeout.close();
                    }
                };

                function Timeout(id, clearFn) {
                    this._id = id;
                    this._clearFn = clearFn;
                }
                Timeout.prototype.unref = Timeout.prototype.ref = function() {};
                Timeout.prototype.close = function() {
                    this._clearFn.call(window, this._id);
                };

                // Does not start the time, just sets up the members needed.
                exports.enroll = function(item, msecs) {
                    clearTimeout(item._idleTimeoutId);
                    item._idleTimeout = msecs;
                };

                exports.unenroll = function(item) {
                    clearTimeout(item._idleTimeoutId);
                    item._idleTimeout = -1;
                };

                exports._unrefActive = exports.active = function(item) {
                    clearTimeout(item._idleTimeoutId);

                    var msecs = item._idleTimeout;
                    if (msecs >= 0) {
                        item._idleTimeoutId = setTimeout(function onTimeout() {
                            if (item._onTimeout) item._onTimeout();
                        }, msecs);
                    }
                };

                // setimmediate attaches itself to the global object
                __webpack_require__(47);
                // On some exotic environments, it's not clear which object `setimmeidate` was
                // able to install onto.  Search each possibility in the same order as the
                // `setimmediate` library.
                exports.setImmediate =
                    (typeof self !== 'undefined' && self.setImmediate) ||
                    (typeof global !== 'undefined' && global.setImmediate) ||
                    (undefined && undefined.setImmediate);
                exports.clearImmediate =
                    (typeof self !== 'undefined' && self.clearImmediate) ||
                    (typeof global !== 'undefined' && global.clearImmediate) ||
                    (undefined && undefined.clearImmediate);
                /* WEBPACK VAR INJECTION */
            }.call(this, __webpack_require__(2)));

            /***/
        },
        /* 49 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _createClass = (function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ('value' in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            })();

            var _mithril = __webpack_require__(3);

            var _mithril2 = _interopRequireDefault(_mithril);

            var _isOffscreen = __webpack_require__(4);

            var _isOffscreen2 = _interopRequireDefault(_isOffscreen);

            var _TourGuide = __webpack_require__(45);

            var _TourGuide2 = _interopRequireDefault(_TourGuide);

            var _TourGuideStaticStyles = __webpack_require__(12);

            var _TourGuideStaticStyles2 = _interopRequireDefault(_TourGuideStaticStyles);

            var _TourGuideStyles = __webpack_require__(38);

            var _TourGuideStyles2 = _interopRequireDefault(_TourGuideStyles);

            var _reducer = __webpack_require__(11);

            var _getElement = __webpack_require__(33);

            var _getElement2 = _interopRequireDefault(_getElement);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }

            var Renderer = (function() {
                function Renderer(_ref) {
                    var subscribe = _ref.subscribe,
                        getState = _ref.getState,
                        dispatch = _ref.dispatch,
                        actions = _ref.actions;

                    _classCallCheck(this, Renderer);

                    // Bind methods to class scope.
                    this.render = this.render.bind(this);

                    // Assign store methods to class.
                    this.getState = getState;
                    this.dispatch = dispatch;
                    this.actions = actions;
                    this.state = getState();
                    this.hasMounted = false;
                    this.targetElement = null;
                    this.isScrolling = false;
                    this.willRender = null;

                    this.createTourGuideElements();
                    this.createDomEventListeners();

                    subscribe(this.render);
                    this.render();
                }

                _createClass(Renderer, [
                    {
                        key: 'createTourGuideElements',
                        value: function createTourGuideElements() {
                            // Create tour guide elements and mount mithril components
                            this.tourGuideElement = document.createElement('div');
                            this.tourGuideStyles = document.createElement('style');
                            this.tourGuideStaticStyles = document.createElement('style');

                            this.tourGuideElement.className = '___tourguide';
                            this.tourGuideStyles.id = '___tourguide-dynamic-styles';
                            this.tourGuideStaticStyles.id = '___tourguide-static-styles';
                            document.body.insertAdjacentElement('beforeend', this.tourGuideElement);
                            document.head.insertAdjacentElement(
                                'beforeend',
                                this.tourGuideStaticStyles,
                            );
                            document.head.insertAdjacentElement('beforeend', this.tourGuideStyles);

                            _mithril2.default.render(
                                this.tourGuideStaticStyles,
                                (0, _mithril2.default)(_TourGuideStaticStyles2.default),
                            );
                        },
                    },
                    {
                        key: 'createDomEventListeners',
                        value: function createDomEventListeners() {
                            var _this = this;

                            window.addEventListener(
                                'scroll',
                                function() {
                                    return _this.render(false);
                                },
                                true,
                            );
                            window.addEventListener(
                                'resize',
                                function() {
                                    return _this.render();
                                },
                                true,
                            );

                            // Mutation observers monitor the DOM for changes.
                            // If there are changes a render is triggered.
                            var mutationConfig = {
                                attributes: true,
                                childList: true,
                                subtree: true,
                                attributeFilter: ['style', 'class', 'id'],
                            };
                            var mutationTarget = document.getRootNode();
                            var mutationCallback = function mutationCallback() {
                                if (_this.willRender) {
                                    clearTimeout(_this.willRender);
                                }

                                _this.willRender = setTimeout(function() {
                                    _this.render();
                                    _this.willRender = null;
                                }, 10);
                                // this.render()
                            };
                            var mutationObserver = new MutationObserver(mutationCallback);

                            mutationObserver.observe(mutationTarget, mutationConfig);
                        },

                        /**
                         * The render function triggers a render of the Tour Guide DOM elemets.
                         * This is a three step process.
                         * First the applicaton state is retrived from the store.
                         * Second a reference to the target DOM element is retrieved.
                         * Then target's bounds are established.
                         * Third an attributes object is created.
                         * This is used to pass the state and target variables to the view components.
                         * Fourth the new attributes are passed to the view components.
                         * The mithril render function is called.
                         * @param {boolean} willAnimate - Determines if coach mark transitions will be animated or not.
                         */
                    },
                    {
                        key: 'render',
                        value: function render() {
                            var willAnimate =
                                arguments.length > 0 && arguments[0] !== undefined
                                    ? arguments[0]
                                    : true;

                            // remove old event handlers before the new state get propigated to the new views
                            var nextCoachMark = this.actions.nextCoachMark;

                            if (this.tourGuideElement) {
                                this.tourGuideElement.removeEventListener(
                                    'transitionend',
                                    this.render,
                                );
                            }

                            var oldCoachMark = (0, _reducer.getCurrentCoachMark)(this.state);
                            var oldProgressOnDomEvent = oldCoachMark.progressOnDomEvent;

                            if (oldProgressOnDomEvent) {
                                var eventTarget = (0, _getElement2.default)(
                                    oldProgressOnDomEvent.targetSelector,
                                );

                                if (eventTarget) {
                                    eventTarget.removeEventListener(
                                        oldProgressOnDomEvent.event,
                                        nextCoachMark,
                                    );
                                }
                            }

                            // Retrieves and normailizes the state.
                            var newState = this.getState();

                            var isNewCoachMark =
                                !this.hasMounted ||
                                newState.currentCoachMarkIndex !== this.state.currentCoachMarkIndex;

                            this.state = newState;

                            var _state = this.state,
                                currentTourIndex = _state.currentTourIndex,
                                currentCoachMarkIndex = _state.currentCoachMarkIndex,
                                moreIsVisible = _state.moreIsVisible,
                                infoBoxIsVisible = _state.infoBoxIsVisible;

                            var coachMarks = (0, _reducer.getCurrentCoachMarks)(this.state);
                            var coachMark = (0, _reducer.getCurrentCoachMark)(this.state);
                            this.targetElement = (0, _getElement2.default)(
                                coachMark.targetSelector,
                            );

                            // if coachMark or this.targetElement is undefined abort the render process
                            if (!coachMark || !this.targetElement) {
                                _mithril2.default.render(this.tourGuideElement, null);
                                return;
                            }

                            var progressOnDomEvent = coachMark.progressOnDomEvent;

                            if (progressOnDomEvent) {
                                var _eventTarget = (0, _getElement2.default)(
                                    progressOnDomEvent.targetSelector,
                                );

                                if (_eventTarget) {
                                    _eventTarget.addEventListener(
                                        progressOnDomEvent.event,
                                        nextCoachMark,
                                    );
                                }
                            }

                            var targetBounds = this.targetElement.getBoundingClientRect();
                            var attrs = {
                                actions: this.actions,
                                coachMark: coachMark,
                                coachMarkCount: coachMarks.length,
                                coachMarks: coachMarks,
                                currentCoachMarkIndex: currentCoachMarkIndex,
                                infoBoxIsVisible: infoBoxIsVisible,
                                moreIsVisible: moreIsVisible,
                                targetElement: this.targetElement,
                                targetBounds: targetBounds,
                                willAnimate: willAnimate,
                            };
                            var isTargetOffscreen = (0, _isOffscreen2.default)(targetBounds);

                            // scroll target element into view if needed
                            if (isTargetOffscreen && infoBoxIsVisible && !this.isScrolling) {
                                // const scrollTarget = targetBounds.top - window.scrollY

                                // console.log('scroll target: ', scrollTarget)
                                this.targetElement.scrollIntoView({ behavior: 'smooth' });
                                this.isScrolling = true;
                            }

                            if (this.isScrolling && !isTargetOffscreen) {
                                this.isScrolling = false;
                            }

                            // dispatch a custom dom event if the current coach mark has changed
                            // this is useful for monitoring coach mark changes
                            // it was implemented to make it easy to impliment analyitics
                            if (infoBoxIsVisible && this.targetElement && isNewCoachMark) {
                                this.tourGuideElement.dispatchEvent(
                                    new CustomEvent('CoachMarkDisplayed', {
                                        detail: {
                                            coachMarkIndex: attrs.currentCoachMarkIndex,
                                            tourIndex: currentTourIndex,
                                        },
                                    }),
                                );
                                this.hasMounted = true;
                            }

                            // add event listenders to the current targetElement
                            this.targetElement.addEventListener('transitionend', this.render);

                            // perform the render/rerender
                            _mithril2.default.render(
                                this.tourGuideElement,
                                (0, _mithril2.default)(_TourGuide2.default, attrs),
                            );
                            _mithril2.default.render(
                                this.tourGuideStyles,
                                (0, _mithril2.default)(_TourGuideStyles2.default, attrs),
                            );
                        },
                    },
                ]);

                return Renderer;
            })();

            exports.default = Renderer;

            /***/
        },
        /* 50 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _renderer = __webpack_require__(49);

            var _renderer2 = _interopRequireDefault(_renderer);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            var rendererRef = null;

            var getRenderer = function getRenderer(store) {
                rendererRef = rendererRef || new _renderer2.default(store);

                return rendererRef;
            };

            exports.default = getRenderer;

            /***/
        },
        /* 51 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _getRenderer = __webpack_require__(50);

            var _getRenderer2 = _interopRequireDefault(_getRenderer);

            var _getStore = __webpack_require__(32);

            var _getStore2 = _interopRequireDefault(_getStore);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            exports.default = {
                getRenderer: _getRenderer2.default,
                getStore: _getStore2.default,
            };

            /***/
        },
        /* 52 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var _typeof =
                typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
                    ? function(obj) {
                          return typeof obj;
                      }
                    : function(obj) {
                          return obj &&
                              typeof Symbol === 'function' &&
                              obj.constructor === Symbol &&
                              obj !== Symbol.prototype
                              ? 'symbol'
                              : typeof obj;
                      };

            /* smoothscroll v0.4.0 - 2018 - Dustan Kasten, Jeremias Menichelli - MIT License */
            (function() {
                'use strict';

                // polyfill

                function polyfill() {
                    // aliases
                    var w = window;
                    var d = document;

                    // return if scroll behavior is supported and polyfill is not forced
                    if (
                        'scrollBehavior' in d.documentElement.style &&
                        w.__forceSmoothScrollPolyfill__ !== true
                    ) {
                        return;
                    }

                    // globals
                    var Element = w.HTMLElement || w.Element;
                    var SCROLL_TIME = 468;

                    // object gathering original scroll methods
                    var original = {
                        scroll: w.scroll || w.scrollTo,
                        scrollBy: w.scrollBy,
                        elementScroll: Element.prototype.scroll || scrollElement,
                        scrollIntoView: Element.prototype.scrollIntoView,
                    };

                    // define timing method
                    var now =
                        w.performance && w.performance.now
                            ? w.performance.now.bind(w.performance)
                            : Date.now;

                    /**
                     * indicates if a the current browser is made by Microsoft
                     * @method isMicrosoftBrowser
                     * @param {String} userAgent
                     * @returns {Boolean}
                     */
                    function isMicrosoftBrowser(userAgent) {
                        var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

                        return new RegExp(userAgentPatterns.join('|')).test(userAgent);
                    }

                    /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
                    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

                    /**
                     * changes scroll position inside an element
                     * @method scrollElement
                     * @param {Number} x
                     * @param {Number} y
                     * @returns {undefined}
                     */
                    function scrollElement(x, y) {
                        this.scrollLeft = x;
                        this.scrollTop = y;
                    }

                    /**
                     * returns result of applying ease math function to a number
                     * @method ease
                     * @param {Number} k
                     * @returns {Number}
                     */
                    function ease(k) {
                        return 0.5 * (1 - Math.cos(Math.PI * k));
                    }

                    /**
                     * indicates if a smooth behavior should be applied
                     * @method shouldBailOut
                     * @param {Number|Object} firstArg
                     * @returns {Boolean}
                     */
                    function shouldBailOut(firstArg) {
                        if (
                            firstArg === null ||
                            (typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) !==
                                'object' ||
                            firstArg.behavior === undefined ||
                            firstArg.behavior === 'auto' ||
                            firstArg.behavior === 'instant'
                        ) {
                            // first argument is not an object/null
                            // or behavior is auto, instant or undefined
                            return true;
                        }

                        if (
                            (typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) ===
                                'object' &&
                            firstArg.behavior === 'smooth'
                        ) {
                            // first argument is an object and behavior is smooth
                            return false;
                        }

                        // throw error when behavior is not supported
                        throw new TypeError(
                            'behavior member of ScrollOptions ' +
                                firstArg.behavior +
                                ' is not a valid value for enumeration ScrollBehavior.',
                        );
                    }

                    /**
                     * indicates if an element has scrollable space in the provided axis
                     * @method hasScrollableSpace
                     * @param {Node} el
                     * @param {String} axis
                     * @returns {Boolean}
                     */
                    function hasScrollableSpace(el, axis) {
                        if (axis === 'Y') {
                            return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
                        }

                        if (axis === 'X') {
                            return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
                        }
                    }

                    /**
                     * indicates if an element has a scrollable overflow property in the axis
                     * @method canOverflow
                     * @param {Node} el
                     * @param {String} axis
                     * @returns {Boolean}
                     */
                    function canOverflow(el, axis) {
                        var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

                        return overflowValue === 'auto' || overflowValue === 'scroll';
                    }

                    /**
                     * indicates if an element can be scrolled in either axis
                     * @method isScrollable
                     * @param {Node} el
                     * @param {String} axis
                     * @returns {Boolean}
                     */
                    function isScrollable(el) {
                        var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
                        var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

                        return isScrollableY || isScrollableX;
                    }

                    /**
                     * finds scrollable parent of an element
                     * @method findScrollableParent
                     * @param {Node} el
                     * @returns {Node} el
                     */
                    function findScrollableParent(el) {
                        var isBody;

                        do {
                            el = el.parentNode;

                            isBody = el === d.body;
                        } while (isBody === false && isScrollable(el) === false);

                        isBody = null;

                        return el;
                    }

                    /**
                     * self invoked function that, given a context, steps through scrolling
                     * @method step
                     * @param {Object} context
                     * @returns {undefined}
                     */
                    function step(context) {
                        var time = now();
                        var value;
                        var currentX;
                        var currentY;
                        var elapsed = (time - context.startTime) / SCROLL_TIME;

                        // avoid elapsed times higher than one
                        elapsed = elapsed > 1 ? 1 : elapsed;

                        // apply easing to elapsed time
                        value = ease(elapsed);

                        currentX = context.startX + (context.x - context.startX) * value;
                        currentY = context.startY + (context.y - context.startY) * value;

                        context.method.call(context.scrollable, currentX, currentY);

                        // scroll more if we have not reached our destination
                        if (currentX !== context.x || currentY !== context.y) {
                            w.requestAnimationFrame(step.bind(w, context));
                        }
                    }

                    /**
                     * scrolls window or element with a smooth behavior
                     * @method smoothScroll
                     * @param {Object|Node} el
                     * @param {Number} x
                     * @param {Number} y
                     * @returns {undefined}
                     */
                    function smoothScroll(el, x, y) {
                        var scrollable;
                        var startX;
                        var startY;
                        var method;
                        var startTime = now();

                        // define scroll context
                        if (el === d.body) {
                            scrollable = w;
                            startX = w.scrollX || w.pageXOffset;
                            startY = w.scrollY || w.pageYOffset;
                            method = original.scroll;
                        } else {
                            scrollable = el;
                            startX = el.scrollLeft;
                            startY = el.scrollTop;
                            method = scrollElement;
                        }

                        // scroll looping over a frame
                        step({
                            scrollable: scrollable,
                            method: method,
                            startTime: startTime,
                            startX: startX,
                            startY: startY,
                            x: x,
                            y: y,
                        });
                    }

                    // ORIGINAL METHODS OVERRIDES
                    // w.scroll and w.scrollTo
                    w.scroll = w.scrollTo = function() {
                        // avoid action when no arguments are passed
                        if (arguments[0] === undefined) {
                            return;
                        }

                        // avoid smooth behavior if not required
                        if (shouldBailOut(arguments[0]) === true) {
                            original.scroll.call(
                                w,
                                arguments[0].left !== undefined
                                    ? arguments[0].left
                                    : _typeof(arguments[0]) !== 'object'
                                        ? arguments[0]
                                        : w.scrollX || w.pageXOffset,
                                // use top prop, second argument if present or fallback to scrollY
                                arguments[0].top !== undefined
                                    ? arguments[0].top
                                    : arguments[1] !== undefined
                                        ? arguments[1]
                                        : w.scrollY || w.pageYOffset,
                            );

                            return;
                        }

                        // LET THE SMOOTHNESS BEGIN!
                        smoothScroll.call(
                            w,
                            d.body,
                            arguments[0].left !== undefined
                                ? ~~arguments[0].left
                                : w.scrollX || w.pageXOffset,
                            arguments[0].top !== undefined
                                ? ~~arguments[0].top
                                : w.scrollY || w.pageYOffset,
                        );
                    };

                    // w.scrollBy
                    w.scrollBy = function() {
                        // avoid action when no arguments are passed
                        if (arguments[0] === undefined) {
                            return;
                        }

                        // avoid smooth behavior if not required
                        if (shouldBailOut(arguments[0])) {
                            original.scrollBy.call(
                                w,
                                arguments[0].left !== undefined
                                    ? arguments[0].left
                                    : _typeof(arguments[0]) !== 'object'
                                        ? arguments[0]
                                        : 0,
                                arguments[0].top !== undefined
                                    ? arguments[0].top
                                    : arguments[1] !== undefined
                                        ? arguments[1]
                                        : 0,
                            );

                            return;
                        }

                        // LET THE SMOOTHNESS BEGIN!
                        smoothScroll.call(
                            w,
                            d.body,
                            ~~arguments[0].left + (w.scrollX || w.pageXOffset),
                            ~~arguments[0].top + (w.scrollY || w.pageYOffset),
                        );
                    };

                    // Element.prototype.scroll and Element.prototype.scrollTo
                    Element.prototype.scroll = Element.prototype.scrollTo = function() {
                        // avoid action when no arguments are passed
                        if (arguments[0] === undefined) {
                            return;
                        }

                        // avoid smooth behavior if not required
                        if (shouldBailOut(arguments[0]) === true) {
                            // if one number is passed, throw error to match Firefox implementation
                            if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
                                throw new SyntaxError('Value could not be converted');
                            }

                            original.elementScroll.call(
                                this,
                                // use left prop, first number argument or fallback to scrollLeft
                                arguments[0].left !== undefined
                                    ? ~~arguments[0].left
                                    : _typeof(arguments[0]) !== 'object'
                                        ? ~~arguments[0]
                                        : this.scrollLeft,
                                // use top prop, second argument or fallback to scrollTop
                                arguments[0].top !== undefined
                                    ? ~~arguments[0].top
                                    : arguments[1] !== undefined
                                        ? ~~arguments[1]
                                        : this.scrollTop,
                            );

                            return;
                        }

                        var left = arguments[0].left;
                        var top = arguments[0].top;

                        // LET THE SMOOTHNESS BEGIN!
                        smoothScroll.call(
                            this,
                            this,
                            typeof left === 'undefined' ? this.scrollLeft : ~~left,
                            typeof top === 'undefined' ? this.scrollTop : ~~top,
                        );
                    };

                    // Element.prototype.scrollBy
                    Element.prototype.scrollBy = function() {
                        // avoid action when no arguments are passed
                        if (arguments[0] === undefined) {
                            return;
                        }

                        // avoid smooth behavior if not required
                        if (shouldBailOut(arguments[0]) === true) {
                            original.elementScroll.call(
                                this,
                                arguments[0].left !== undefined
                                    ? ~~arguments[0].left + this.scrollLeft
                                    : ~~arguments[0] + this.scrollLeft,
                                arguments[0].top !== undefined
                                    ? ~~arguments[0].top + this.scrollTop
                                    : ~~arguments[1] + this.scrollTop,
                            );

                            return;
                        }

                        this.scroll({
                            left: ~~arguments[0].left + this.scrollLeft,
                            top: ~~arguments[0].top + this.scrollTop,
                            behavior: arguments[0].behavior,
                        });
                    };

                    // Element.prototype.scrollIntoView
                    Element.prototype.scrollIntoView = function() {
                        // avoid smooth behavior if not required
                        if (shouldBailOut(arguments[0]) === true) {
                            original.scrollIntoView.call(
                                this,
                                arguments[0] === undefined ? true : arguments[0],
                            );

                            return;
                        }

                        // LET THE SMOOTHNESS BEGIN!
                        var scrollableParent = findScrollableParent(this);
                        var parentRects = scrollableParent.getBoundingClientRect();
                        var clientRects = this.getBoundingClientRect();

                        if (scrollableParent !== d.body) {
                            // reveal element inside parent
                            smoothScroll.call(
                                this,
                                scrollableParent,
                                scrollableParent.scrollLeft + clientRects.left - parentRects.left,
                                scrollableParent.scrollTop + clientRects.top - parentRects.top,
                            );

                            // reveal parent in viewport unless is fixed
                            if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
                                w.scrollBy({
                                    left: parentRects.left,
                                    top: parentRects.top,
                                    behavior: 'smooth',
                                });
                            }
                        } else {
                            // reveal element in viewport
                            w.scrollBy({
                                left: clientRects.left,
                                top: clientRects.top,
                                behavior: 'smooth',
                            });
                        }
                    };
                }

                if (
                    (false ? undefined : _typeof(exports)) === 'object' &&
                    typeof module !== 'undefined'
                ) {
                    // commonjs
                    module.exports = { polyfill: polyfill };
                } else {
                    // global
                    polyfill();
                }
            })();

            /***/
        },
        /* 53 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', {
                value: true,
            });

            var _extends =
                Object.assign ||
                function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                    return target;
                };

            var _smoothscrollPolyfill = __webpack_require__(52);

            var _smoothscrollPolyfill2 = _interopRequireDefault(_smoothscrollPolyfill);

            var _defaultOptions = __webpack_require__(51);

            var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

            function _interopRequireDefault(obj) {
                return obj && obj.__esModule ? obj : { default: obj };
            }

            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError('Cannot call a class as a function');
                }
            }

            // poly fills for smooth scroll functionality
            _smoothscrollPolyfill2.default.polyfill();

            var TourGuide = function TourGuide() {
                var _this = this;

                var initialState =
                    arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var options =
                    arguments.length > 1 && arguments[1] !== undefined
                        ? arguments[1]
                        : _defaultOptions2.default;

                _classCallCheck(this, TourGuide);

                var appOptions = _extends({}, _defaultOptions2.default, options);
                var getRenderer = appOptions.getRenderer,
                    getStore = appOptions.getStore;

                this.store = getStore(initialState);
                this.renderer = getRenderer(this.store);

                Object.keys(this.store.actions).forEach(function(key) {
                    _this[key] = _this.store.actions[key];
                });
            };

            window.TourGuide = TourGuide;

            exports.default = TourGuide;

            /***/
        },
        /******/
    ],
);
