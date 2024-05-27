(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.WRF = global.WRF || {}));
})(this, (function (exports) { 'use strict';

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var SidebarElevationData = /*#__PURE__*/_createClass(function SidebarElevationData(map, sidebar) {
    _classCallCheck(this, SidebarElevationData);
    var urls = [],
      sources = [],
      overlayCount = 0,
      container,
      containerOvelays;
    function addDownloadUrl(container, filename, url) {
      if (urls.includes(url)) {
        return;
      }
      urls.push(url);
      container.append('<div><a href="' + url + '" title="' + url + '" target="_blank">' + filename + '</a></div>');
      container.show();
    }
    this.addElevationDataOverlay = function (name, overlay) {
      var id = 'elevation-data-overlay-' + overlayCount,
        checkboxHtml,
        overlayContainer;
      sources.push({
        name: name,
        overlay: overlay
      });
      overlayCount++;
      checkboxHtml = '<div class="custom-control custom-checkbox">' + '<input type="checkbox" class="custom-control-input" id="' + id + '" data-overlay-name="' + name + '">' + '<label class="custom-control-label" for="' + id + '">' + name + '</label>' + '<div class="elevation-data-history" style="display:none;"></div>' + '</div>';
      overlayContainer = $(checkboxHtml);
      containerOvelays.append(overlayContainer);
      overlay.downloadHistory = $('div.elevation-data-history', overlayContainer);
      $('input#' + id, overlayContainer).on('click', {
        overlay: overlay,
        map: map
      }, function (e) {
        if (this.checked) {
          e.data.overlay.addTo(e.data.map);
        } else {
          e.data.overlay.remove();
        }
      });
      overlay.on('elevationDataDownload', function (e) {
        addDownloadUrl(e.source.downloadHistory, e.filename, e.downloadUrl);
      });
    },
    // initialize
    container = $('#elevation-data', sidebar.getContainer());
    containerOvelays = $('div.elevation-data-overlays', container);
    $('button', container).on('click', function (e) {
      $.each(sources, function () {
        this.overlay.clearDownloaded();
        this.overlay.downloadHistory.empty();
      });
    });
  });
  function sidebarElevationData(map, sidebar) {
    return new SidebarElevationData(map, sidebar);
  }

  var GeographicLines = L.LayerGroup.extend({
    _defaultOptions: {},
    _lineOptions: {
      stroke: true,
      color: 'purple',
      opacity: 1,
      weight: 2,
      dashArray: '4 6',
      interactive: false
    },
    _textOptions: {
      offset: -5,
      repeat: true
    },
    _map: null,
    _lines: null,
    initialize: function initialize(options) {
      var _this = this;
      this._lines = [this._createLine(this._arcticCirle, "Arctic Circle"), this._createLine(this._antarcticCirle, "Antarctic Circle"), this._createLine(this._primeMeridian, "Prime Meridian"), this._createLine(this._equator, "Equator"), this._createLine(this._tropicOfCancer, "Tropic of Cancer"), this._createLine(this._tropicOfCapricorn, "Tropic of Capricorn")];

      // add international date multi-line
      this._internationalDateLine.forEach(function (line) {
        _this._lines.push(_this._createLine(line.map(function (lonlat) {
          return [lonlat[1], lonlat[0]];
        }), "International Date Line"));
      });
      L.LayerGroup.prototype.initialize.call(this, this._lines, Object.assign({}, this._defaultOptions, options));
    },
    _arcticCirle: [[66.566667, -180], [66.566667, 0], [66.566667, 180]],
    // https://en.wikipedia.org/wiki/Antarctic_Circle
    _antarcticCirle: [[-66.563833, -180], [-66.563833, 0], [-66.563833, 180]],
    _primeMeridian: [[-90, 0], [0, 0], [90, 0]],
    _equator: [[0, -180], [0, 0], [0, 180]],
    // https://en.wikipedia.org/wiki/Tropic_of_Cancer
    _tropicOfCancer: [[23.43615, -180], [23.43615, 0], [23.43615, 180]],
    // https://en.wikipedia.org/wiki/Tropic_of_Capricorn
    _tropicOfCapricorn: [[-23.43615, -180], [-23.43615, 0], [-23.43615, 180]],
    // credit: https://github.com/martynafford/natural-earth-geojson
    _internationalDateLine: [[[180.001258097076857, -51.003774291230535], [180.003312913721913, -51.495516396930583], [180.0, -51.999999906277594], [180.0, -52.499999848411051], [180.0, -52.999999790544507], [180.0, -53.499999732678077], [180.0, -53.99999967481159], [180.0, -54.499999616945047], [180.0, -54.99999955907856], [180.0, -55.499999501212017], [180.0, -55.999999443345587], [180.0, -56.499999385479043], [180.0, -56.999999327612556], [180.0, -57.499999269746013], [180.0, -57.999999211879583], [180.0, -58.49999915401304], [180.0, -58.999999096146553], [180.0, -59.499999038280009], [180.0, -59.999998980413579], [180.0, -60.499998922547036], [180.0, -60.999998864680606], [180.0, -61.499998806814006], [180.0, -61.999998748947576], [180.0, -62.499998691081032], [180.0, -62.999998633214602], [180.0, -63.499998575348002], [180.0, -63.999998517481572], [180.0, -64.499998459615028], [180.0, -64.999998401748599], [180.0, -65.499998343882112], [180.0, -65.999998286015568], [180.0, -66.499998228149025], [180.0, -66.999998170282538], [180.0, -67.499998112415994], [180.0, -67.999998054549565], [180.0, -68.499997996683078], [180.0, -68.999997938816534], [180.0, -69.499997880950104], [180.0, -69.999997823083561], [180.0, -70.499997765217074], [180.0, -70.999997707350531], [180.0, -71.499997649483987], [180.0, -71.999997591617557], [180.0, -72.49999753375107], [180.0, -72.999997475884527], [180.0, -73.499997418018097], [180.0, -73.999997360151553], [180.0, -74.499997302285067], [180.0, -74.999997244418523], [180.0, -75.499997186552093], [180.0, -75.999997128685493], [180.0, -76.499997070819063], [180.0, -76.99999701295252], [180.0, -77.49999695508609], [180.0, -77.999996897219546], [180.0, -78.499996839353059], [180.0, -78.999996781486516], [180.0, -79.499996723620086], [180.0, -79.999996665753599], [180.0, -80.499996607887056], [180.0, -80.999996550020512], [180.0, -81.499996492154082], [180.0, -81.999996434287596], [180.0, -82.499996376421052], [180.0, -82.999996318554508], [180.0, -83.499996260688079], [180.0, -83.999996202821592], [180.0, -84.499996144955048], [180.0, -84.999996087088505], [180.0, -85.499996029222075], [180.0, -85.999995971355588], [180.0, -86.499995913489045], [180.0, -86.999995855622615], [180.0, -87.499995797756014], [180.0, -87.999995739889584], [180.0, -88.499995682023041], [180.0, -88.999995624156554], [180.0, -89.499995566290011], [180.0, -89.999995508423581]], [[-179.999971045153075, -2.509433512836307], [-179.522435878697166, -2.509433512608187], [-178.980796782997402, -2.509433512349445], [-178.506862574243968, -2.509433512123044], [-178.032928365506677, -2.509433511896645], [-177.525141713288178, -2.509433511654073], [-177.017355061053507, -2.509433511411502], [-176.509568408851152, -2.50943351116893], [-175.900224426188942, -2.509433510877845], [-175.426290217451651, -2.509433510651445], [-174.986208452163282, -2.509433510441216], [-174.512274243458364, -2.509433510214816], [-173.970635147742428, -2.509433509956073], [-173.462848495669476, -2.509433509713503], [-172.955061843370117, -2.509433509470931], [-172.514980078049376, -2.509433509260703], [-172.007193425830849, -2.509433509018131], [-171.465554330219732, -2.50943350898213], [-171.025472564953674, -2.509433509112815], [-170.517685912745208, -2.509433509263605], [-170.009899260516647, -2.509433509414395], [-169.535965051759234, -2.509433509555132], [-168.960473512608417, -2.509433509726027], [-168.45268686035979, -2.509433509876817], [-167.944900208171418, -2.509433510027607], [-167.356770598431893, -2.509433510202255], [-166.733442797169175, -2.509433510387356], [-166.226988958646785, -2.50943351053775], [-165.681577132580941, -2.509433510699712], [-165.126425809580041, -2.509433510864568], [-164.639450964846759, -2.509433511009178], [-164.074560144980239, -2.509433511176925], [-163.509669325067449, -2.509433511344672], [-162.964257498972671, -2.509433511506635], [-162.438324666690164, -2.509433511662813], [-161.89291284057802, -2.509433511824776], [-161.386459002078766, -2.50943351197517], [-160.880005163550635, -2.509433512125564], [-160.373551325034043, -2.509433512275959], [-159.906055474084098, -2.509433512414784], [-159.496996604518813, -2.509433512536256], [-159.048979747357947, -2.509433512669297], [-158.486571354637505, -2.509433512836307], [-158.486571354637448, -1.932251930971415], [-158.48657135463742, -1.445277086243941], [-158.486571354637363, -1.016739222883756], [-158.486571354637306, -0.62715934710176], [-158.486571354637277, -0.228073404634912], [-158.943274706068763, 0.138068983191904], [-159.330178697928375, 0.448252718422208], [-159.631626533550616, 0.689925633661372], [-159.9900114000082, 0.977245379300379], [-160.289107946839096, 1.217033249269297], [-160.639768712542008, 1.498160527335493], [-160.639768712612124, 1.983025820632832], [-160.639768712688124, 2.508958652946959], [-160.639768712758553, 2.995933497680071], [-160.639768712834552, 3.5218663299773], [-160.639768712913394, 4.067278156074896], [-160.639768712978167, 4.515295013226993], [-160.639768713039189, 4.937315428082729], [-160.003450443037508, 4.937315428082729], [-159.477517610731837, 4.937315428082729], [-158.990542766004353, 4.937315428082729], [-158.503567921276868, 4.937315428082729], [-157.997114082760305, 4.937315428082729], [-157.490660244243713, 4.937315428082728], [-156.98420640572715, 4.937315428082728], [-156.477752567210558, 4.937315428082728], [-156.019996213166735, 4.937315428082729], [-155.528633931166752, 4.937315428082729], [-155.343582440326855, 4.440358715492633], [-155.156611301030892, 3.93824677728544], [-154.948157800812254, 3.3784438504008], [-154.742076334492879, 2.825011032523971], [-154.562221296894535, 2.342009421340204], [-154.400730593629817, 1.908325322692539], [-154.228125713558825, 1.444794046139374], [-154.049150724480057, 0.964155809696339], [-153.890032055114517, 0.536841820056472], [-153.724263725747676, 0.068728874079682], [-153.551871368755371, -0.371290409830009], [-153.364900229459408, -0.873402348037196], [-153.173185022364976, -1.388254504260015], [-152.998208108394806, -1.858155889820966], [-152.823977187114451, -2.326053908248409], [-152.645748190725499, -2.804688777557893], [-152.445290840724056, -3.343018002678394], [-152.271059919443701, -3.81091602110582], [-152.119937400295356, -4.216756308981527], [-151.952822580712649, -4.665544000385537], [-151.806444129362774, -5.058644070245614], [-151.652069527795675, -5.473217841869862], [-151.474720579926242, -5.949489336438642], [-151.305233726444328, -6.404647136850451], [-151.131002805163973, -6.872545155277875], [-150.975748155077355, -7.289482301642839], [-150.815137500332128, -7.720803025549777], [-150.601939932315105, -8.293346170450048], [-150.384744289189456, -8.876626166232372], [-150.174664747761483, -9.440795834991272], [-150.000233160370584, -9.909232743271289], [-150.000168012188766, -10.50025628547553], [-150.000199261318357, -11.000177884848654], [-150.000233161201862, -11.645359271235485], [-150.624314933586248, -11.645359271235485], [-151.150247765891919, -11.645359271235485], [-151.598264623041217, -11.645359271235485], [-152.104718461557781, -11.645359271235485], [-152.611172300074372, -11.645359271235485], [-153.117626138590964, -11.645359271235485], [-153.643558970896635, -11.645359271235485], [-154.091575828045904, -11.645359271235485], [-154.566158655566056, -11.645359271235485], [-154.697371913443959, -11.142520356713785], [-154.816761103695853, -10.684993946633012], [-154.921873593445639, -10.282179085518584], [-155.037537351296578, -9.838929375939893], [-155.156718198514511, -9.38220138353979], [-155.266589588431657, -8.961149339436588], [-155.394254768217962, -8.471907463545627], [-155.509918526068873, -8.028657753966943], [-155.622065194552761, -7.598886327209675], [-155.740004230970385, -7.146917234976939], [-155.865394132189977, -6.666394741740031], [-155.976298989873527, -6.241382215150122], [-156.080438255174926, -5.842296970487039], [-156.538711660083607, -5.842296970543612], [-157.063321676592381, -5.842296970608372], [-157.712838839879737, -5.842296970688552], [-158.312393144467308, -5.842296970762565], [-158.911947449045698, -5.842296970836578], [-159.561464612348402, -5.842296970916758], [-160.210981775648065, -5.842296970996939], [-160.860498938941589, -5.842296971077118], [-161.485034672883671, -5.842296971154215], [-162.134551836180236, -5.842296971234395], [-162.734106140743165, -5.842296971308407], [-163.308679015982477, -5.842296971379337], [-163.93321474992149, -5.842296971456433], [-164.632694771926992, -5.84229697154278], [-165.332174793944887, -5.842296971629128], [-165.931729098517053, -5.84229697170314], [-166.556264832456122, -5.842296971780238], [-167.080874848958729, -5.842296971844998], [-167.680429153540103, -5.84229697191901], [-168.279983458127788, -5.842296971993024], [-168.879537762715387, -5.842296972067036], [-169.396078486595286, -5.842296972130801], [-169.625077852911772, -6.35660891369496], [-169.845898952455229, -6.852553205032295], [-170.07078561618377, -7.357628387180476], [-170.322504171479636, -7.922965579961256], [-170.549491238028111, -8.432758077575215], [-170.763062358792865, -8.912419569872858], [-170.992787894732515, -9.428362422975272], [-171.100196296817671, -10.009622299589058], [-171.181510712922716, -10.449669880174843], [-171.29378558833838, -11.057265552059103], [-171.249304116750181, -11.50294873519149], [-171.198512605619442, -12.011855512521727], [-171.151807419098191, -12.479819261344975], [-171.10374265244792, -12.961405356236922], [-171.057037465926697, -13.429369105060173], [-171.003287191258835, -13.967921285392412], [-171.236700825112365, -14.430983758804853], [-171.619750364963153, -14.603559135697955], [-172.017542495846556, -14.782776494734737], [-172.499982688035374, -15.000130359793022], [-172.499982688035715, -15.531222537643785], [-172.499982688035715, -16.062558858389629], [-172.499982688035715, -16.39438269732112], [-172.500008347625965, -16.850328319239779], [-172.499982688035715, -17.285565042578842], [-172.499982688035715, -17.656323677732257], [-172.499982688035715, -18.187497236548083], [-172.499982688035715, -18.718833557293937], [-172.499982688035715, -19.249925735144789], [-172.499982688035715, -19.781262055890661], [-172.499982688035715, -20.312598376636579], [-172.499982688035715, -20.663767886230215], [-172.499982688035715, -21.119721644269049], [-172.499982688035715, -21.596400573127831], [-172.500023378518335, -22.000602353495481], [-172.499982688035715, -22.437455373830048], [-172.499982688035715, -22.968873075540913], [-172.499982688035715, -23.499965253391768], [-172.499982688035715, -24.000051283562371], [-172.499982688035686, -24.466836731690499], [-172.499982688035715, -24.999979201008337], [-172.499982688035715, -25.440919760228013], [-172.499982688035715, -26.000151261349433], [-172.499982688035686, -26.373552447125629], [-172.499982688035715, -27.000079178795485], [-172.499982688035686, -27.389085817303034], [-172.499982688035715, -27.999925715276312], [-172.499982688035686, -28.425344358300386], [-172.499982688035715, -28.819122603879382], [-172.499982688035715, -29.236346717128459], [-172.499982688035715, -29.83465597405679], [-172.499982688035715, -30.35278524455547], [-172.499982688035715, -30.937534410323924], [-172.499982688035743, -31.316505687683012], [-172.499982688035715, -31.875043127584203], [-172.499982688035715, -32.290588716220519], [-172.499982688035715, -32.812470463879578], [-172.499982688035715, -33.285396915577977], [-172.499982688035715, -33.750060562104942], [-172.499982688035743, -34.218029602475596], [-172.499982688035715, -34.687569279365313], [-172.499982688035715, -35.192112631013103], [-172.499982688035715, -35.624915234695642], [-172.499982688035715, -36.207646001190511], [-172.499982688035715, -36.562505332920971], [-172.499982688035715, -37.181729029728025], [-172.499982688035715, -37.689495714816729], [-172.499982688035715, -38.166174643675511], [-172.499982688035715, -38.622128401714342], [-172.499982688035743, -39.140257672213018], [-172.499982688035715, -39.679112113531644], [-172.499982688035715, -40.114340700750532], [-172.499982688035715, -40.632469971249208], [-172.499982688035715, -41.249967538257749], [-172.499982688035715, -41.627278170606672], [-172.499982688035715, -42.187476255518057], [-172.499982688035715, -42.601361199144179], [-172.499982688035715, -43.125066353743549], [-172.499982688035715, -43.575444227681693], [-172.499982688035715, -44.062412309073721], [-172.499982688035715, -44.547170091351106], [-172.499982688035715, -45.000002407299114], [-172.866897000701329, -45.293814163530286], [-173.237851318283049, -45.59088902920324], [-173.57140289354831, -45.857940758489448], [-173.906245763926165, -46.125908058627019], [-174.374959432073894, -46.501318450356422], [-174.708187473889609, -46.768109133257866], [-175.16252364519994, -47.131906317693151], [-175.581118708420206, -47.46713012276399], [-176.057626494425278, -47.848654013192508], [-176.375865136148974, -48.103432531466339], [-176.718731225224872, -48.377963504177814], [-177.046318623364073, -48.640283684786894], [-177.453030574946467, -48.965973141467728], [-177.824020056105098, -49.262996912017073], [-178.229071115963933, -49.587228227563244], [-178.593748659745529, -49.879198166270044], [-178.936948520250667, -50.154079832475546], [-179.318148001906991, -50.459334656706289], [-179.694214425794343, -50.760448953054933], [-179.999971045153586, -51.005266579528019]], [[179.999673548913364, 59.50186446727048], [179.613927774623846, 59.26939974063383], [179.413567838695485, 59.14785726934673], [178.937977479002086, 58.858222414769365], [178.694648393532361, 58.709539391641464], [178.501449982527674, 58.59064180171805], [178.225568511042241, 58.420718346714573], [178.030579718806308, 58.299786232665213], [177.542944976286975, 57.996316614031286], [177.26934217182253, 57.825294515999637], [177.037569183388769, 57.67941913616562], [176.782358477023507, 57.518691730211664], [176.501431385705359, 57.340426726291696], [176.056765792727191, 57.057180277469996], [175.792114894417182, 56.887948560669479], [175.590778386908397, 56.758308683360781], [175.288855006610106, 56.563767486432788], [175.076043783030627, 56.42586744117262], [174.780468118005444, 56.233686292230722], [174.267116990533424, 55.897786359028146], [174.008651045566495, 55.727618761129627], [173.74896438612393, 55.555986305860444], [173.488057012205871, 55.382888993220519], [173.226173066707247, 55.20832682320971], [172.962987025767916, 55.032299795828159], [172.698661651318218, 54.854848601558615], [172.433359705287899, 54.675891859435765], [172.166999806712113, 54.495470259942223], [171.89966333655596, 54.313624493560518], [171.631106151923944, 54.130354560290371], [171.36157239571159, 53.94557907916716], [171.091062067918784, 53.759420121638165], [170.819737930475668, 53.571714925773627], [170.547355840486887, 53.382544872538098], [170.273997178917597, 53.191950652414484], [169.999661945767826, 52.999932265402755], [170.487378069252259, 52.765677157535215], [170.799880975005948, 52.615122372211289], [171.33943677322074, 52.353686022020398], [171.734459977524693, 52.161260730183407], [172.062750790495954, 52.000736776642043], [172.684013077610899, 51.696290586427722], [172.967056074019894, 51.557169826691833], [173.354429467610288, 51.365843177882915], [173.681255423210729, 51.204424033726205], [174.453560781439847, 50.820916235975325], [174.859733177954411, 50.618318323508362], [175.278438243084935, 50.408843719495408], [175.708943548146436, 50.192899328762024], [176.150435283488122, 49.970607222755241], [176.602343782355064, 49.742292925335654], [177.06409937799188, 49.508281960363192], [177.534725498817977, 49.268818470733081], [178.013815240008086, 49.024227980305476], [178.312827026460866, 48.870946938270251], [178.752614050284564, 48.644984309520197], [179.192032788441907, 48.418429622040364], [179.56044068606343, 48.219441921857879], [180.0, 48.000000296160749], [180.000000335276013, 48.000000128522572], [180.00000033188951, 47.505050632274958], [180.000000328502892, 47.010101136027174], [180.000000325116275, 46.51515163977956], [180.000000321729658, 46.020202143531719], [180.000000318343041, 45.525252647284105], [180.000000314956424, 45.030303151036492], [180.000000311569806, 44.535353654788707], [180.000000308183189, 44.040404158541094], [180.000000304796572, 43.545454662293309], [180.000000301409955, 43.050505166045639], [180.00000029802311, 42.555555669797855], [180.00000029463672, 42.060606173550241], [180.000000291249876, 41.565656677302457], [180.000000287863259, 41.070707181054843], [180.000000284476641, 40.575757684807002], [180.000000281090024, 40.080808188559388], [180.000000277703407, 39.585858692311604], [180.000000274316903, 39.09090919606399], [180.000000270930286, 38.595959699816206], [180.000000267543669, 38.101010203568592], [180.000000264157052, 37.606060707320751], [180.000000260770207, 37.111111211073137], [180.000000257383817, 36.616161714825523], [180.000000253996973, 36.121212218577739], [180.000000250610356, 35.626262722330125], [180.000000247223738, 35.131313226082284], [180.000000243837121, 34.63636372983467], [180.000000240450504, 34.141414233586886], [180.000000237063887, 33.646464737339272], [180.00000023367727, 33.151515241091488], [180.000000230290652, 32.656565744843874], [180.000000226904035, 32.161616248596033], [180.000000223517418, 31.666666752348419], [180.000000220130914, 31.171717256100806], [180.000000216744183, 30.676767759853021], [180.00000021335768, 30.181818263605408], [180.000000209970835, 29.686868767357566], [180.000000206584218, 29.191919271109953], [180.000000203197601, 28.696969774862168], [180.000000199810984, 28.202020278614555], [180.000000196424367, 27.70707078236677], [180.000000193037749, 27.212121286119157], [180.000000189651132, 26.717171789871315], [180.000000186264515, 26.222222293623702], [180.000000182877898, 25.727272797376088], [180.000000179491281, 25.232323301128304], [180.000000176104663, 24.737373804880519], [180.000000172718046, 24.242424308632849], [180.000000169331429, 23.747474812385065], [180.000000165944812, 23.252525316137451], [180.000000162558194, 22.757575819889837], [180.000000159171464, 22.262626323642053], [180.000000155784846, 21.767676827394439], [180.000000152398229, 21.272727331146598], [180.000000149011612, 20.777777834898984], [180.000000145624995, 20.2828283386512], [180.000000142238378, 19.787878842403586], [180.00000013885176, 19.292929346155802], [180.000000135465143, 18.797979849908131], [180.000000132078526, 18.303030353660347], [180.000000128691909, 17.808080857412733], [180.000000125305291, 17.313131361165119], [180.000000121918674, 16.818181864917335], [180.000000118532057, 16.323232368669721], [180.00000011514544, 15.82828287242188], [180.000000111758823, 15.333333376174267], [180.000000108372205, 14.838383879926482], [180.000000104985475, 14.343434383678868], [180.000000101598857, 13.848484887431084], [180.000000098212126, 13.353535391183414], [180.000000094825623, 12.858585894935629], [180.000000091438892, 12.363636398688016], [180.000000088052388, 11.868686902440402], [180.000000084665771, 11.373737406192618], [180.000000081279154, 10.878787909945004], [180.000000077892537, 10.383838413697163], [180.00000007450592, 9.888888917449549], [180.000000071119302, 9.393939421201765], [180.000000067732685, 8.898989924954151], [180.000000064346068, 8.404040428706367], [180.000000060959223, 7.909090932458696], [180.000000057572834, 7.414141436210912], [180.000000054185989, 6.919191939963298], [180.000000050799372, 6.424242443715684], [180.000000047412755, 5.9292929474679], [180.000000044026137, 5.434343451220059], [180.00000004063952, 4.939393954972445], [180.000000037252903, 4.444444458724831], [180.000000033866399, 3.949494962477047], [180.000000030479782, 3.454545466229433], [180.000000027093165, 2.959595969981649], [180.00000002370632, 2.464646473733978], [180.000000020319931, 1.969696977486194], [180.000000016933086, 1.47474748123858], [180.000000013546469, 0.979797984990796], [180.000000010159852, 0.484848488743182], [180.000000006773234, -0.010101007504545], [180.000000003386617, -0.505050503752273], [179.999995943622793, -1.016266633357443], [179.999991777283299, -1.540903051885967], [179.999988131736217, -1.999959918098426], [179.999984160348276, -2.500047518955152]], [[-180.0, 75.000000153668282], [-179.60938184939809, 74.751900816544151], [-179.126020861589382, 74.514658683499889], [-178.729492109431931, 74.291552767842859], [-178.324743879805993, 74.061203946297169], [-177.997633090827776, 73.873173226572391], [-177.648590131771499, 73.671063599895618], [-177.287340027958919, 73.460286900442199], [-176.698914960237659, 73.112993632134078], [-176.298805445618541, 72.874343952154604], [-175.917617005371369, 72.644971702189252], [-175.443491503048676, 72.356842395465364], [-175.001755624811693, 72.08543687705702], [-174.594850799611862, 71.832708290125396], [-174.132484846737498, 71.542422387827997], [-173.66035317805796, 71.242085936347863], [-173.070300491035823, 70.861182329478353], [-172.727157651944708, 70.636163961142913], [-172.259298483930081, 70.325329365172763], [-171.788753744069112, 70.007658768139123], [-171.473728028399393, 69.791917829818331], [-171.136729452168908, 69.558435841118623], [-170.889656842307517, 69.383914361590485], [-170.440433915287031, 69.06286645450777], [-170.130413128967177, 68.837278419416918], [-169.698483657017647, 68.516230512334474], [-169.389892545674201, 68.248113147380082], [-168.999999989755509, 68.000000147149024], [-168.999999989755509, 67.583333480094439], [-168.999999989755594, 67.166666813039683], [-168.999999989755594, 66.75000014598487], [-168.999999989755679, 66.333333478930285], [-168.999999989755679, 65.91666681187553], [-168.999999989755679, 65.500000144820717], [-169.417175409414057, 65.308653958994], [-169.834350829072434, 65.117307773167113], [-170.251711457359278, 64.882041447027362], [-170.633062659536563, 64.692912084274482], [-171.060272035513805, 64.477293217401154], [-171.532607156605792, 64.236080037022589], [-171.826148297504886, 64.084304537223176], [-172.331320637990501, 63.821362639178993], [-172.607324180923484, 63.676870735750512], [-173.178537174538661, 63.374255617249517], [-173.483390269578678, 63.210883329931676], [-173.785964697597336, 63.048487614194514], [-174.428426726105158, 62.699729488515835], [-174.760257611055664, 62.517314055378769], [-175.104824617034751, 62.32781847828312], [-175.466563006637301, 62.126604042221743], [-175.762179362145105, 61.962092421393635], [-176.171810449673586, 61.73190636177813], [-176.380267791623595, 61.614107414882788], [-176.745017276932714, 61.406789406443409], [-177.120875263969737, 61.192065730185469], [-177.382799899950953, 61.041836468721598], [-177.592722099271469, 60.920538140329526], [-177.952710798125793, 60.711918036449703], [-178.204869718302149, 60.565228846965184], [-178.627033474446904, 60.317952784691371], [-178.808879240828531, 60.210651982286045], [-179.056318065032599, 60.064776602451772], [-179.492642109094533, 59.805618919282232], [-179.999971045153586, 59.50186446727048]], [[180.000000335276013, 89.999995508423581], [180.000000324100256, 89.499995663265167], [180.000000312924271, 88.999995818106584], [180.000000301748514, 88.499995972947943], [180.00000029057253, 87.99999612778953], [180.000000279396772, 87.499996282631116], [180.000000268220788, 86.999996437472532], [180.000000257045031, 86.499996592314062], [180.000000245869046, 85.999996747155478], [180.000000234693175, 85.499996901997065], [180.000000223517418, 84.999997056838424], [180.000000212341433, 84.499997211680011], [180.000000201165676, 83.999997366521427], [180.000000189989692, 83.499997521362957], [180.000000178813934, 82.999997676204543], [180.00000016763795, 82.49999783104596], [180.000000156462079, 81.999997985887319], [180.000000145286322, 81.499998140728906], [180.000000134110337, 80.999998295570492], [180.00000012293458, 80.499998450411908], [180.000000111758595, 79.999998605253438], [180.000000100582838, 79.499998760094854], [180.000000089406853, 78.999998914936441], [180.000000078231096, 78.4999990697778], [180.000000067055112, 77.999999224619387], [180.000000055879241, 77.499999379460803], [180.000000044703484, 76.999999534302333], [180.000000033527499, 76.49999968914392], [180.000000022351742, 75.999999843985336], [180.000000011175757, 75.499999998826695], [180.0, 75.000000153668282]]],
    _createLine: function _createLine(latlngs, text, lineOptions, textOptions) {
      lineOptions = lineOptions || {};
      textOptions = textOptions || {};
      var line = L.polyline(latlngs, Object.assign({}, this._lineOptions, lineOptions));
      line.setText(text + ' '.repeat(text.length * 5), Object.assign({}, this._textOptions, textOptions));
      return line;
    }
  });

  // credit: https://github.com/FacilMap/Leaflet.AutoGraticule

  var AutoGraticule = L.LayerGroup.extend({
    options: {
      redraw: 'moveend',
      minDistance: 100,
      // Minimum distance between two lines in pixels
      verticalLabelOffset: 200
    },
    lineStyle: {
      stroke: true,
      color: '#111',
      opacity: 0.6,
      weight: 1,
      interactive: false
    },
    _bounds: null,
    initialize: function initialize(options) {
      L.LayerGroup.prototype.initialize.call(this, options);
      L.Util.setOptions(this, options);
    },
    onAdd: function onAdd(map) {
      this._map = map;
      this.redraw();
      this._map.on('viewreset ' + this.options.redraw, this.redraw, this);
      this.eachLayer(map.addLayer, map);
      return this;
    },
    onRemove: function onRemove(map) {
      map.off('viewreset ' + this.options.redraw, this.redraw, this);
      this.eachLayer(this.removeLayer, this);
      return this;
    },
    redraw: function redraw() {
      this._bounds = this._map.getBounds().pad(0.5);
      this.clearLayers();
      this.constructLines();
      return this;
    },
    constructLines: function constructLines() {
      var bounds = this._map.getBounds();
      var zoom = this._map.getZoom();

      // Fix drawing of lines outside of bounds
      this._bounds = AutoGraticule.bboxIntersect(bounds, [[-85, -180], [85, 180]]);

      // Fix drawing of labels outside of bounds
      var getBoundsBkp = this._map.getBounds;
      try {
        this._map.getBounds = function () {
          return AutoGraticule.bboxIntersect(getBoundsBkp.apply(this), [[-85, -180], [85, 180]]);
        };

        // Longitude: Draw vartical lines with a fixed distance between each other
        var center = this._map.project(bounds.getCenter(), zoom);
        var divisor = AutoGraticule.getGridDivisor(this._map.unproject(center.add([this.options.minDistance / 2, 0]), zoom).lng - this._map.unproject(center.subtract([this.options.minDistance / 2, 0]), zoom).lng, false);
        var west = Math.max(bounds.getWest(), -180);
        var east = Math.min(bounds.getEast(), 180);
        for (var lng = AutoGraticule.fixFloatingPoint(Math.ceil(west / divisor) * divisor); lng <= east; lng += divisor) {
          this.addLayer(this.buildXLine(lng));
          this.addLayer(this.buildLabel('gridlabel-horiz', AutoGraticule.fixFloatingPoint(lng)));
        }

        // Latitude: Draw horizontal lines with a variable distance between each other (as in Mercator projection, the distance
        // between latitudes gets bigger towards the poles). Calculate a divisor that all latitude line coordinates must be
        // dividable by, but then only draw those coordinates that keep the minimum distance to their neighbour lines.
        // Draw lines north of the equator separately from lines south of the equator (to keep the grid symmetical in
        // relation to the equator).
        if (bounds.getNorth() > 0) {
          var lat = Math.max(0, bounds.getSouth());
          var first = true;
          while (lat < bounds.getNorth() && lat < 85) {
            var point = this._map.project([lat, bounds.getCenter().lng], zoom);
            var point2LatLng = this._map.unproject(point.subtract([0, this.options.minDistance]), zoom);
            var _divisor = AutoGraticule.getGridDivisor(point2LatLng.lat - lat, true);
            lat = AutoGraticule.fixFloatingPoint(first ? Math.ceil(lat / _divisor) * _divisor : Math.ceil(point2LatLng.lat / _divisor) * _divisor);
            first = false;
            this.addLayer(this.buildYLine(lat));
            this.addLayer(this.buildLabel('gridlabel-vert', lat));
          }
        }
        if (bounds.getSouth() < 0) {
          var _lat = Math.min(0, bounds.getNorth());
          var _first = true;
          while (_lat > bounds.getSouth() && _lat > -85) {
            var _point = this._map.project([_lat, bounds.getCenter().lng], zoom);
            var _point2LatLng = this._map.unproject(_point.add([0, this.options.minDistance]), zoom);
            var _divisor2 = AutoGraticule.getGridDivisor(AutoGraticule.fixFloatingPoint(_lat - _point2LatLng.lat), true);
            _lat = AutoGraticule.fixFloatingPoint(_first ? Math.floor(_lat / _divisor2) * _divisor2 : Math.floor(_point2LatLng.lat / _divisor2) * _divisor2);
            _first = false;
            this.addLayer(this.buildYLine(_lat));
            this.addLayer(this.buildLabel('gridlabel-vert', _lat));
          }
        }
      } finally {
        this._map.getBounds = getBoundsBkp;
      }
    },
    buildXLine: function buildXLine(x) {
      var bottomLL = new L.LatLng(this._bounds.getSouth(), x);
      var topLL = new L.LatLng(this._bounds.getNorth(), x);
      return new L.Polyline([bottomLL, topLL], this.lineStyle);
    },
    buildYLine: function buildYLine(y) {
      var leftLL = new L.LatLng(y, this._bounds.getWest());
      var rightLL = new L.LatLng(y, this._bounds.getEast());
      return new L.Polyline([leftLL, rightLL], this.lineStyle);
    },
    buildLabel: function buildLabel(axis, val) {
      var bounds = this._map.getBounds().pad(-0.003);
      var latLng;
      var styles = [];
      if (axis == 'gridlabel-horiz') {
        latLng = new L.LatLng(bounds.getNorth(), val);
      } else {
        latLng = new L.LatLng(val, bounds.getWest());
        if (this.options.verticalLabelOffset != null) {
          var swPoint = this._map.latLngToContainerPoint(this._bounds.getSouthWest());
          var leftMargin = Math.max(0, this.options.verticalLabelOffset - swPoint.x);
          styles.push("margin-left: ".concat(leftMargin, "px"));
        }
      }
      var html = "<div class=\"".concat(axis, "\"");
      if (styles.length > 0) {
        html = html + " style=\"".concat(styles.join(';'), "\"");
      }
      html = html + '>' + val + '&#8239;°</div>';
      return L.marker(latLng, {
        interactive: false,
        icon: L.divIcon({
          iconSize: [0, 0],
          className: 'leaflet-grid-label',
          html: html
        })
      });
    }
  });

  /**
   * Rounds the given number to a fixed number of decimals in order to avoid floating point inaccuracies
   * (for example to make 0.1 + 0.2 = 0.3 instead of 0.30000000000000004).
   */
  AutoGraticule.fixFloatingPoint = function (number) {
    return AutoGraticule.round(number, 12);
  };

  /**
   * Rounds the given number to the given number of decimals.
   */
  AutoGraticule.round = function (number, digits) {
    var fac = Math.pow(10, digits);
    return Math.round(number * fac) / fac;
  };

  /**
   * Given the distance between two coordinates, floors this distance to 90, 60, 45, 30 or
   * 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01, ...
   * This will define the distance between two grid lines.
   * @param variableDistance This should be true when the distance between the grid lines will be variable, that is for the latitude
   *     lines (because in Meractor projection the distance between two latitutes gets larger towards the poles, but the distance
   *     between two longitudes is constant throughout the globe).
   *     For constant distance lines (longitude), a line should be shown for every coordinate dividable by the result of this
   *     function. For example, if the result is 45, a line should be shown for longitudes -180, -135, -90, -45, 0, 45, 90, 135, 180.
   *     For variable distance lines (latitude), a line should be shown for coordinates dividable by a result of this function, but
   *     not for every single coordinate but only those that have a minimum distance towards their neighbour coordinate line. For
   *     variable distance lines, the maximum number returned by this function is 5, meaning at low zoom levels, all latitude lines
   *     are dividable by 5 (but not every latitude dividable by 5 will get a line).
   */
  AutoGraticule.getGridDivisor = function (number, variableDistance) {
    if (number <= 0 || !isFinite(number)) throw new Error("Invalid number " + number);else {
      if (variableDistance && number >= 5) return 5;
      if (number <= 10) {
        var fac = 1;
        while (number > 1) {
          fac *= 10;
          number /= 10;
        }
        while (number <= 0.1) {
          fac /= 10;
          number *= 10;
        }

        // Dist is now some number between 0.1 and 1, so we can round it conveniently and then multiply it again by fac to get back to the original dist

        if (number == 0.1) return AutoGraticule.fixFloatingPoint(0.1 * fac);else if (number <= 0.2) return AutoGraticule.fixFloatingPoint(0.2 * fac);else if (number <= 0.5) return AutoGraticule.fixFloatingPoint(0.5 * fac);else return fac;
      } else if (number <= 30) return 30;else if (number <= 45) return 45;else if (number <= 60) return 60;else return 90;
    }
  };
  // Backwards compatibility
  AutoGraticule.niceRound = AutoGraticule.getGridDivisor;
  AutoGraticule.bboxIntersect = function (bbox1, bbox2) {
    var bounds1 = bbox1 instanceof L.LatLngBounds ? bbox1 : L.latLngBounds(bbox1);
    var bounds2 = bbox2 instanceof L.LatLngBounds ? bbox2 : L.latLngBounds(bbox2);
    return L.latLngBounds([[Math.max(bounds1.getSouth(), bounds2.getSouth()), Math.max(bounds1.getWest(), bounds2.getWest())], [Math.min(bounds1.getNorth(), bounds2.getNorth()), Math.min(bounds1.getEast(), bounds2.getEast())]]);
  };

  var SidebarSettings = L.Class.extend({
    _map: null,
    _container: null,
    _localStorageKey: '_wrf_domain_wizard_settings',
    _defaultOptions: {
      jsonBaseUrl: 'json'
    },
    _settings: {
      showGraticule: {
        id: 'showGraticule',
        value: false,
        dataType: 'boolean'
      },
      showGeographicLines: {
        id: 'showGeographicLines',
        value: true,
        dataType: 'boolean'
      }
    },
    _options: null,
    _controls: {},
    _graticule: null,
    _geographicLines: null,
    initialize: function initialize(map, sidebar, options) {
      this._options = Object.assign({}, this._defaultOptions, options);
      this._map = map;
      this._container = sidebar.getContainer().querySelector('#settings');
      this._graticule = new AutoGraticule({
        verticalLabelOffset: 480
      });
      this._geographicLines = new GeographicLines({});
      for (var key in this._settings) {
        var setting = this._settings[key];
        var value = localStorage.getItem(this._localStorageKey + "_".concat(setting.id));
        if (value) {
          switch (setting.dataType) {
            case 'boolean':
              setting.value = value === 'true';
              break;
            case 'int':
              setting.value = parseInt(value);
              break;
            case 'float':
              setting.value = parseFloat(value);
              break;
            default:
              setting.value = value;
              break;
          }
        }
        this._controls[key] = this._container.querySelector("#".concat(setting.id));
      }
      var self = this;
      this._settings['showGraticule'].value = false;
      this._controls['showGraticule'].addEventListener('click', function (e) {
        self.showGraticule(e.currentTarget.checked);
      });
      this.showGraticule(this._settings['showGraticule'].value);
      this._controls['showGeographicLines'].addEventListener('click', function (e) {
        self.showGeographicLines(e.currentTarget.checked);
      });
      this.showGeographicLines(this._settings['showGeographicLines'].value);
      for (var _key in this._controls) {
        var input = this._controls[_key];
        if (input.tagName !== "INPUT") {
          continue;
        }
        var _value = this._settings[_key].value;
        switch (input.type) {
          case 'checkbox':
            input.checked = _value === true;
            break;
          default:
            input.value = _value;
            break;
        }
      }
    },
    showGraticule: function showGraticule(show) {
      localStorage.setItem(this._localStorageKey + "_showGraticule", show);
      if (show === true) {
        this._graticule.addTo(this._map);
      } else {
        this._graticule.remove();
      }
    },
    showGeographicLines: function showGeographicLines(show) {
      localStorage.setItem(this._localStorageKey + "_showGeographicLines", show);
      if (show === true) {
        this._geographicLines.addTo(this._map);
      } else {
        this._geographicLines.remove();
      }
    }
  });
  function sidebarSettings(map, sidebar, options) {
    return new SidebarSettings(map, sidebar, options);
  }

  var MessageBoxDialog = /*#__PURE__*/function () {
    function MessageBoxDialog() {
      _classCallCheck(this, MessageBoxDialog);
      this.container = document.querySelector('div.modal#message-box-dialog');
      this.dialogBody = this.container.querySelector('div.modal-body');
      this.dialogTitle = this.container.querySelector('div.modal-header h5.modal-title');
      this.titleIcon = this.dialogTitle.querySelector('i');
      this.titleSpan = this.dialogTitle.querySelector('span');
    }
    return _createClass(MessageBoxDialog, [{
      key: "open",
      value: function open() {
        $(this.container).modal();
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        $(this.container).modal('hide');
        return this;
      }
    }, {
      key: "empty",
      value: function empty() {
        this.titleSpan.innerHTML = '';
        this.titleIcon.classList.remove('fa-exclamation-circle');
        this.titleIcon.classList.remove('fa-info-circle');
        this.titleIcon.classList.remove('fa-exclamation-triangle');
        this.dialogBody.innerHTML = '';
        return this;
      }
    }, {
      key: "title",
      value: function title(_title, icon) {
        if (icon === MessageBoxDialog.types.error) {
          this.titleIcon.classList.add('fa-exclamation-circle');
        }
        if (icon === MessageBoxDialog.types.info) {
          this.titleIcon.classList.add('fa-info-circle');
        }
        if (icon === MessageBoxDialog.types.warning) {
          this.titleIcon.classList.add('fa-exclamation-triangle');
        }
        this.titleSpan.innerText = _title;
        return this;
      }
    }, {
      key: "html",
      value: function html(_html) {
        this.dialogBody.innerHTML = _html;
        return this;
      }
    }, {
      key: "text",
      value: function text(message) {
        this.dialogBody.innerText = message;
        return this;
      }
    }]);
  }();
  _defineProperty(MessageBoxDialog, "types", {
    error: 0,
    info: 1,
    warning: 2
  });
  var messageBoxDialog = new MessageBoxDialog();
  function getTemplate(name) {
    return document.getElementById('message-box-dialog-templates').querySelector("div[template=\"".concat(name, "\"]"));
  }
  function errorMessageBox(title, message) {
    messageBoxDialog.empty().title(title, MessageBoxDialog.types.error).text(message).open();
  }
  function enableGlobalErrorHandler() {
    window.onerror = function (event, source, lineno, colno, error) {
      if (!event || !source || !error) {
        return;
      }
      if (!error.stack) {
        return;
      }
      if (source.toLowerCase().includes("/lib/")) {
        return;
      }
      var template = getTemplate('global-error');
      messageBoxDialog.empty().title('Unexpected Error', MessageBoxDialog.types.error).html(template.innerHTML);
      var errorDetails = '';
      errorDetails = errorDetails + "Error: ".concat(event, "\n");
      errorDetails = errorDetails + "Timestamp: ".concat(new Date().toISOString(), "\n");
      errorDetails = errorDetails + "Source: ".concat(source, "\n");
      errorDetails = errorDetails + "Line: ".concat(lineno, "\n");
      errorDetails = errorDetails + "Stack:\n";
      errorDetails = errorDetails + "".concat(error.stack);
      messageBoxDialog.dialogBody.querySelector('textarea').value = errorDetails;
      var title = 'Error: ' + event + ' @ ' + source + ":" + lineno;
      messageBoxDialog.dialogBody.querySelector('a#create-github-issue').href = "https://github.com/JiriRichter/WRFDomainWizard/issues/new?labels=bug&title=".concat(encodeURI(title), "&body=").concat(encodeURI(errorDetails));
      messageBoxDialog.open();
    };
  }

  var SidebarWaypoints = function SidebarWaypoints(map, sidebar) {
    var container,
      buttonAdd,
      buttonRemoveAll,
      inputFile,
      containerLayers,
      layers = {},
      layerCount = 0;
    container = $('#waypoints', sidebar.getContainer());
    buttonAdd = $('button#button-waypoints-add', container);
    buttonRemoveAll = $('button#button-waypoints-remove', container);
    inputFile = $('input#file-waypoints', container);
    containerLayers = $('#waypoints-layers', container);
    function addWaypoints(filename, data) {
      var id = 'waypoints-layer-' + layerCount,
        checkboxHtml;
      if (layers[filename] !== undefined) {
        errorMessageBox('File Open Error', 'File name ' + filename + ' already loaded');
        return;
      }
      try {
        layers[filename] = L.waypoints(L.Waypoints.parse(data)).addTo(map);
        map.fitBounds(layers[filename].getBounds());
      } catch (e) {
        errorMessageBox('File Open Error', 'Unable to parse file ' + filename + ': ' + e);
        return;
      }
      layerCount++;
      checkboxHtml = '<div class="custom-control custom-checkbox">' + '<input type="checkbox" class="custom-control-input" id="' + id + '" data-filename="' + filename + '" checked>' + '<label class="custom-control-label" for="' + id + '">' + filename + '</label>' + '</div>';
      containerLayers.append($(checkboxHtml));
      $('input#' + id, containerLayers).on('click', {
        layer: layers[filename],
        map: map
      }, function (e) {
        if (this.checked) {
          e.data.layer.addTo(e.data.map);
        } else {
          e.data.layer.remove();
        }
      });
    }
    buttonAdd.on('click', function (e) {
      inputFile.click();
    });
    buttonRemoveAll.on('click', function (e) {
      object.keys(layers).forEach(function (filename) {
        layers[filename].remove();
      });
      layers = {};
      containerLayers.empty();
    });
    inputFile.on('change', function (e) {
      var reader, filename;
      if (!e.target.files || e.target.files.length == 0) {
        return;
      }
      if (!e.target.files[0].name.endsWith('.wpt') && !e.target.files[0].name.endsWith('.cup') && !e.target.files[0].name.endsWith('.gpx')) {
        errorMessageBox('File Open Error', 'Only files with extensions .wpt, .cup and .gpx are allowed!');
        return;
      }
      reader = new FileReader();
      filename = e.target.files[0].name;
      reader.onerror = function (e) {
        errorMessageBox('File Open Error', 'Unable to read file!');
      };
      reader.onload = function (e) {
        addWaypoints(filename, e.target.result);
      };
      reader.readAsText(e.target.files[0]);
      inputFile.val(null);
    });
  };
  function sidebarWaypoints(map, sidebar) {
    return new SidebarWaypoints(map, sidebar);
  }

  /*
   * Tokenize namelist and return as JavaScript object
   * tokens { pos: position in namelist string
   *              name: category of item, i.e. group, object, value
   *              value: name of item
   *              index: index for array
   *             }
   */
  var Namelist = /*#__PURE__*/function () {
    function Namelist(data) {
      _classCallCheck(this, Namelist);
      if (!data) {
        throw new Error("Invalid data");
      }
      var tokens = Namelist._tokenize(data),
        current_group = null,
        current_prop = null,
        i,
        name,
        value;
      for (i = 0; i < tokens.length; i++) {
        name = tokens[i].name;
        value = tokens[i].value;
        if (name == "group") {
          if (!value.match(/^end$/i)) {
            current_group = this[value] = {};
          } else {
            current_group = null;
          }
        } else if (name == "object") {
          current_prop = value.toLowerCase();
        } else if (name == "character" || name == "integer" || name == "real" || name == "logical") {
          if (current_group[current_prop] == null) {
            current_group[current_prop] = value;
          } else {
            if (!Array.isArray(current_group[current_prop])) {
              current_group[current_prop] = [current_group[current_prop]];
            }
            current_group[current_prop].push(value);
          }
        }
      }
    }

    // parse namelist data to tokens
    return _createClass(Namelist, null, [{
      key: "_tokenize",
      value: function _tokenize(data) {
        var tokens = [];
        function addElement(pos, name, value) {
          var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          tokens.push({
            pos: pos,
            name: name,
            value: value,
            index: index
          });
        }
        var cur;
        var curstr;
        var prev = "initial";
        var str;
        var i = 0;
        while (i < data.length) {
          cur = data[i];
          curstr = data.substr(i);
          // [1] EXCLAMATION MARK
          // (1-1) a comment
          if (cur.match(/!/)) {
            // COMMENT
            str = Namelist._re_comment.exec(curstr);
            if (str && str.index == 0) {
              //console.log("found comment: " + str);
              //addElement(i, "comment", str);
              //console.log("found comment: " + str[1]);
              addElement(i, "comment", str[1]);
              i += str[0].length;
              prev = "comment";
            } else {
              //console.log("error at exclamation");
              break;
            }
          }

          // [2] SINGLE OR DOUBLE QUOTATION MARK
          // (2-1) a character constant
          else if (cur.match(/['"]/)) {
            // CHARACTER CONSTANT
            str = Namelist._re_string.exec(curstr);
            if (str && str.index == 0) {
              //console.log("found character: " + str[1]);
              addElement(i, "character", str[2]);
              i += str[0].length;
              prev = "character";
            } else {
              //console.log("error at quotation");
              break;
            }
          }

          // [3] SLASH
          // (3-1) the end of a group
          else if (cur.match(/\//)) {
            // GROUP END
            if (prev == "object") {
              //console.log("found null #1");
              addElement(i - 1, "null", "");
            }
            addElement(i, "group", "end");
            //console.log("found group: end");
            i++;
            prev = "group_end";
          }

          // [4] DOLLAR MARK OR AMPERSAND
          // (4-1) the start or the end of a group
          else if (cur.match(/[$&]/)) {
            // GROUP
            str = Namelist._re_group.exec(curstr);
            if (str && str.index == 0) {
              if (str[1].match(/^end$/i)) {
                if (prev == "object") {
                  //console.log("found null #2");
                  addElement(i - 1, "null", "");
                }
                prev = "group_end";
              } else {
                prev = "group_start";
              }
              //console.log("found group: " + str[1]);
              addElement(i, "group", str[1]);
              i += str[0].length;
            } else {
              //console.log("error at ampersand");
              break;
            }
          }

          // [5] PERIOD
          // (5-1) a logical constant
          // (5-2) a real constant
          else if (cur.match(/\./)) {
            // LOGICAL CONSTANT
            str = Namelist._re_logical_p.exec(curstr);
            if (str && str.index == 0) {
              //console.log("found logical: " + str[1]);
              addElement(i, "logical", str[1]);
              i += str[0].length;
              prev = "logical";
            } else {
              // REAL			
              str = Namelist._re_real.exec(curstr);
              if (str && str.index == 0) {
                //console.log("found real: " + str[1]);
                addElement(i, "real", parseFloat(str[1]));
                i += str[0].length;
                prev = "real";
              } else {
                //console.log("error at period");
                break;
              }
            }
          }

          // [6] ALPHABET OR UNDERSCORE
          // (6-1) an object
          // (6-2) an array
          // (6-3) a logical constant
          // (6-4) a nondelimited character constant
          else if (cur.match(/[[a-zA-Z_]/)) {
            if (prev == "group_end" || prev == "initial") {
              str = Namelist._re_orphan.exec(curstr);
              if (str && str.index == 0) {
                //console.log("found orphan: " + str[0]);
                addElement(i, "orphan", str[0]);
                i += str[0].length;
                prev = "orphan";
              }
            } else {
              // OBJECT
              str = Namelist._re_object.exec(curstr);
              if (str && str.index == 0) {
                if (prev == "object") {
                  addElement(i - 1, "null", "");
                  //console.log("found null #3");
                }
                //console.log("found object: " + str[1]);
                addElement(i, "object", str[1]);
                i += str[0].length;
                prev = "object";
              } else {
                // ARRAY
                str = Namelist._re_array.exec(curstr);
                if (str && str.index == 0) {
                  //console.log("found array: " + str[1] + " index: " + str[2]);
                  addElement(i, "array", str[1], str[2]);
                  i += str[0].length;
                  prev = "array";
                } else {
                  // LOGICAL CONSTANT
                  str = Namelist._re_logical_c.exec(curstr);
                  if (str && str.index == 0) {
                    //console.log("found logical: " + str[1]);
                    addElement(i, "logical", str[1]);
                    i += str[0].length;
                    prev = "logical";
                  } else {
                    // NONDELIMITED CHARACTER CONSTANT
                    str = Namelist._re_nondelimited_c.exec(curstr);
                    if (str && str.index == 0) {
                      //console.log("found nondelimited: " + str[1]);
                      addElement(i, "nondelimited", str[1]);
                      i += str[0].length;
                      prev = "nondelimited";
                    } else {
                      //console.log("found unknown");
                      addElement(i, "unknown", null);
                      i++;
                    }
                  }
                }
              }
            }
          }

          // [7] LEFT PARENTHESIS
          // (7-1) the start of a complex number
          else if (cur.match(/\(/)) {
            str = Namelist._re_complex_start.exec(curstr);
            if (str && str.index == 0) {
              // COMPLEX START
              //console.log("found complex start");
              addElement(i, "complex", "start");
              i += str[0].length;
              prev = "complex_start";
            } else {
              //console.log("error at complex start");
              break;
            }
          }

          // [8] RIGHT PARENTHESIS
          // (8-1) the end of a complex number
          else if (cur.match(/\)/)) {
            str = Namelist._re_complex_end.exec(curstr);
            if (str && str.index == 0) {
              // COMPLEX END
              //console.log("found complex end");
              addElement(i, "complex", "end");
              i += str[0].length;
              prev = "complex_end";
            } else {
              //console.log("error at complex end");
              break;
            }
          }

          // [9] PLUS OR MINUS SIGN
          // (9-1) a real constant
          // (9-2) an integer constant
          else if (cur.match(/[\+\-]/)) {
            str = Namelist._re_real.exec(curstr);
            if (str && str.index == 0) {
              // REAL
              //console.log("found real: " + str[1]);
              addElement(i, "real", parseFloat(str[1]));
              i += str[0].length;
              prev = "real";
            } else {
              str = Namelist._re_integer.exec(curstr);
              if (str && str.index == 0) {
                // INTEGER
                //console.log("found integer: " + str[1]);
                addElement(i, "integer", parseInt(str[1], 10));
                i += str[0].length;
                prev = "integer";
              } else {
                //console.log("error at +-.");
                break;
              }
            }
          }

          // [10] DECIMAL
          // (10-1) a nondelimited character constant
          // (10-2) a repetition
          // (10-3) a real constant
          // (10-4) an integer constant
          else if (cur.match(/[\d]/)) {
            str = Namelist._re_repeat.exec(curstr);
            if (str && str.index == 0) {
              // REPEAT
              //console.log("found repeat: " + str[1]);
              addElement(i, "repeat", str[1]);
              i += str[0].length;
              prev = "repeat";
            } else {
              str = Namelist._re_real.exec(curstr);
              if (str && str.index == 0) {
                // REAL
                //console.log("found real: " + str[1]);
                addElement(i, "real", parseFloat(str[1]));
                i += str[0].length;
                prev = "real";
              } else {
                str = Namelist._re_integer.exec(curstr);
                if (str && str.index == 0) {
                  // INTEGER
                  //console.log("found integer: " + str[1]);
                  addElement(i, "integer", parseInt(str[1], 10));
                  i += str[0].length;
                  prev = "integer";
                } else {
                  str = Namelist._re_nondelimited_d.exec(curstr);
                  if (str && str.index == 0) {
                    // NONDELIMITED CHARACTER CONSTANT
                    //console.log("found nondelimited: " + str[1]);
                    addElement(i, "nondelimited", str[1]);
                    i += str[0].length;
                    prev = "nondelimited";
                  } else {
                    //console.log("error at digit");
                    break;
                  }
                }
              }
            }
          }

          // [11] BLANK OR CONSECUTIVE COMMAS
          // (11-1) null
          else {
            // NULL
            str = Namelist._re_null.exec(curstr);
            if (str && str.index == 0) {
              //console.log("found null #4");
              addElement(i, "null", "");
              i += str[0].length;
              prev = "null";
            } else {
              i++;
            }
          }
        }
        return tokens;
      }
    }, {
      key: "isReal",
      value: function isReal(str) {
        var match = Namelist._re_real.exec(str);
        return match !== null && match.index == 0;
      }
    }, {
      key: "isInteger",
      value: function isInteger(str) {
        var match = Namelist._re_integer.exec(str);
        return match !== null && match.index == 0;
      }
    }, {
      key: "isLogical",
      value: function isLogical(str) {
        var match = Namelist._re_logical_p.exec(str);
        return match !== null && match.index == 0;
      }
    }, {
      key: "parseLogicalValue",
      value: function parseLogicalValue(str) {
        return str.toLowerCase() === '.true.';
      }
    }, {
      key: "parseValue",
      value: function parseValue(str) {
        if (Namelist.isLogical(str)) {
          return Namelist.parseLogicalValue(str);
        } else if (Namelist.isReal(str)) {
          return parseFloat(str);
        } else if (Namelist.isInteger(str)) {
          return parseInt(str);
        } else {
          return str;
        }
      }
    }, {
      key: "_formatValue",
      value: function _formatValue(val) {
        if (val == undefined) {
          throw new Error('Undefined value');
        } else if (Array.isArray(val)) {
          var strVal = Namelist._formatValue(val[0]);
          for (var i = 1; i < val.length; i++) {
            strVal += ', ' + Namelist._formatValue(val[i]);
          }
          return strVal;
        } else if (typeof val == "string") {
          return "'" + val + "'";
        } else if (typeof val == "boolean") {
          return val ? '.true.' : '.false.';
        } else if (!Namelist._isInteger(val)) {
          return val.toFixed(3);
        }
        return val.toString();
      }
    }, {
      key: "_isInteger",
      value: function _isInteger(val) {
        return typeof val === "number" && isFinite(val) && val > -9007199254740992 && val < 9007199254740992 && Math.floor(val) === val;
      }
    }, {
      key: "formatSection",
      value: function formatSection(section, properties, values) {
        var content = '&' + section + '\n';
        console.debug("format namelist section ".concat(section));
        for (var i = 0; i < properties.length; i++) {
          console.debug("   ".concat(properties[i], ": ").concat(values[i]));
          if (values[i] === null) {
            // property not set - continue
            continue;
          } else if (values[i] === undefined) {
            throw new Error("Property ".concat(properties[i], " is not defined"));
          } else {
            content += ' ' + properties[i].padEnd(20) + ' = ' + Namelist._formatValue(values[i]) + '\n';
          }
        }
        return content + '/\n\n';
      }
    }, {
      key: "convertToArray",
      value: function convertToArray(section, paramName) {
        if (section[paramName] != undefined && !Array.isArray(section[paramName])) {
          section[paramName] = [].concat(section[paramName]);
        }
      }
    }]);
  }();
  // regular expression for each item	
  _defineProperty(Namelist, "_re_comment", /(!.*)\n\s*/);
  _defineProperty(Namelist, "_re_group", /(?:&|\$)\s*([a-zA-Z_][\w]*)\s*/);
  _defineProperty(Namelist, "_re_array", /([a-zA-Z_][\w]*)\s*(\(\s*((\s*:\s*(\-|\+)?\d*){1,2}|((\-|\+)?\d+(\s*:\s*(\-|\+)?\d*){0,2}))(\s*,\s*(((\-|\+)?\d*(\s*:\s*(\-|\+)?\d*){0,2})))*\s*\)(\s*\(\s*(:\s*\d*|\d+(\s*:\s*\d*)?)\s*\))?)\s*=\s*/);
  _defineProperty(Namelist, "_re_object", /([a-zA-Z_][\w]*)\s*=\s*/);
  _defineProperty(Namelist, "_re_repeat", /([0-9]+)\s*\*\s*/);
  _defineProperty(Namelist, "_re_complex_start", /\(\s*/);
  _defineProperty(Namelist, "_re_complex_end", /\)\s*,?\s*/);
  _defineProperty(Namelist, "_re_string", /('((?:[^']+|'')*)'|"((?:[^"]+|"")*)")\s*,?\s*/);
  _defineProperty(Namelist, "_re_nondelimited_c", /([^'"\*\s,\/!&\$(=%\.][^\*\s,\/!&\$(=%\.]*)\s*,?\s*/);
  _defineProperty(Namelist, "_re_nondelimited_d", /(\d+[^\*\s\d,\/!&\$\(=%\.][^\s,\/!&\$\(=%\.]*)\s*,?\s*/);
  _defineProperty(Namelist, "_re_real", /(((\-|\+)?\d*\.\d*([eEdDqQ](\-|\+)?\d+)?)|((\-|\+)?\d+[eEdDqQ](\-|\+)?\d+))\s*,?\s*/);
  _defineProperty(Namelist, "_re_integer", /((\-|\+)?\d+)\b\s*,?\s*/);
  _defineProperty(Namelist, "_re_logical_c", /([tT][rR][uU][eE]|[tT]|[fF][aA][lL][sS][eE]|[fF])\s*,?\s*/);
  _defineProperty(Namelist, "_re_logical_p", /(\.(([tT][rR][uU][eE]|[[fF][aA][lL][sS][eE])\.?|[tTfF]\w*))\s*,?\s*/);
  _defineProperty(Namelist, "_re_null", /\s*\b|\s*,\s*/);
  _defineProperty(Namelist, "_re_orphan", /[^&]*/);

  var WPSNamelist = /*#__PURE__*/function () {
    function WPSNamelist(obj) {
      _classCallCheck(this, WPSNamelist);
      var ns;

      // https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/wps.html#wps-namelist-variables

      this.share = {
        wrf_core: 'ARW',
        // A character string set to either ARW or NMM that tells the WPS which dynamical core the input data are being prepared for
        max_dom: 1,
        // An integer specifying the total number of domains (nests), including the parent domain, in the simulation
        start_year: null,
        // A list of MAX_DOM 4-digit integers specifying the starting UTC year of the simulation for each nest
        start_month: null,
        //A list of MAX_DOM 2-digit integers specifying the starting UTC month of the simulation for each nest
        start_day: null,
        // A list of MAX_DOM 2-digit integers specifying the starting UTC day of the simulation for each nest
        start_hour: null,
        // A list of MAX_DOM 2-digit integers specifying the starting UTC hour of the simulation for each nest
        end_year: null,
        //A list of MAX_DOM 4-digit integers specifying the ending UTC year of the simulation for each nest
        end_month: null,
        //A list of MAX_DOM 2-digit integers specifying the ending UTC month of the simulation for each nest
        end_day: null,
        //A list of MAX_DOM 2-digit integers specifying the ending UTC day of the simulation for each nest
        end_hour: null,
        //A list of MAX_DOM 2-digit integers specifying the ending UTC hour of the simulation for each nest
        start_date: null,
        //A list of MAX_DOM character strings of the form 'YYYY-MM-DD_HH:mm:ss' specifying the starting UTC date of the simulation for each nest. The start_date variable is an alternate to specifying start_year, start_month, start_day, and start_hour, and if both methods are used for specifying the starting time, the start_date variable will take precedence
        end_date: null,
        //A list of MAX_DOM character strings of the form 'YYYY-MM-DD_HH:mm:ss' specifying the ending UTC date of the simulation for each nest. The end_date variable is an alternate to specifying end_year, end_month, end_day, and end_hour, and if both methods are used for specifying the ending time, the end_date variable will take precedence
        interval_seconds: null,
        //The integer number of seconds between time-varying meteorological input files
        active_grid: true,
        //A list of MAX_DOM logical values specifying, for each grid, whether that grid should be processed by geogrid and metgrid
        io_form_geogrid: 2,
        //(NetCDF) The WRF I/O API format that the domain files created by the geogrid program will be written in. Possible options are: 1 for binary; 2 for NetCDF; 3 for GRIB1. When option 1 is given, domain files will have a suffix of .int; when option 2 is given, domain files will have a suffix of .nc; when option 3 is given, domain files will have a suffix of .gr1
        output_from_geogrid: null,
        //A character string giving the path, either relative or absolute, to the location where output files from geogrid should be written to and read from. Default is the current working directory
        debug_level: 0 //An integer value indicating the extent to which different types of messages should be sent to standard output. When debug_level is set to 0, only generally useful messages and warning messages will be written to standard output. When debug_level is greater than 100, informational messages that provide further runtime details are also written to standard output. Debugging messages and messages specifically intended for log files are never written to standard output, but are always written to the log files
      };
      this.geogrid = {
        parent_id: 1,
        //A list of MAX_DOM integers specifying, for each nest, the domain number of the nest's parent; for the coarsest domain, this variable should be set to 1
        parent_grid_ratio: null,
        //A list of MAX_DOM integers specifying, for each nest, the nesting ratio relative to the domain's parent
        i_parent_start: null,
        //A list of MAX_DOM integers specifying, for each nest, the x-coordinate of the lower-left corner of the nest in the parent unstaggered grid. For the coarsest domain, a value of 1 should be specified            
        j_parent_start: null,
        //A list of MAX_DOM integers specifying, for each nest, the y-coordinate of the lower-left corner of the nest in the parent unstaggered grid. For the coarsest domain, a value of 1 should be specified
        s_we: 1,
        //A list of MAX_DOM integers which should all be set to 1
        e_we: null,
        //A list of MAX_DOM integers specifying, for each nest, the nest's full west-east dimension. For nested domains, e_we must be one greater than an integer multiple of the nest's parent_grid_ratio (i.e., e_we = n*parent_grid_ratio+1 for some positive integer n)
        s_sn: 1,
        //A list of MAX_DOM integers which should all be set to 1
        e_sn: null,
        //A list of MAX_DOM integers specifying, for each nest, the nest's full south-north dimension. For nested domains, e_sn must be one greater than an integer multiple of the nest's parent_grid_ratio (i.e., e_sn = n*parent_grid_ratio+1 for some positive integer n)
        geog_data_res: 'default',
        //A list of MAX_DOM character strings specifying, for each nest, a corresponding resolution or list of resolutions separated by + symbols of source data to be used when interpolating static terrestrial data to the nest's grid. For each nest, this string should contain a resolution matching a string preceding a colon in a rel_path or abs_path specification (see the description of GEOGRID.TBL options) in the GEOGRID.TBL file for each field. If a resolution in the string does not match any such string in a rel_path or abs_path specification for a field in GEOGRID.TBL, a default resolution of data for that field, if one is specified, will be used. If multiple resolutions match, the first resolution to match a string in a rel_path or abs_path specification in the GEOGRID.TBL file will be used
        dx: null,
        //A real value specifying the grid distance in the x-direction where the map scale factor is 1. For ARW, the grid distance is in meters for the 'polar', 'lambert', and 'mercator' projection, and in degrees longitude for the 'lat-lon' projection; for NMM, the grid distance is in degrees longitude. Grid distances for nests are determined recursively based on values specified for parent_grid_ratio and parent_id
        dy: null,
        //A real value specifying the nominal grid distance in the y-direction where the map scale factor is 1. For ARW, the grid distance is in meters for the 'polar', 'lambert', and 'mercator' projection, and in degrees latitude for the 'lat-lon' projection; for NMM, the grid distance is in degrees latitude. Grid distances for nests are determined recursively based on values specified for parent_grid_ratio and parent_id
        map_proj: 'lambert',
        //A character string specifying the projection of the simulation domain. For ARW, accepted projections are 'lambert', 'polar', 'mercator', and 'lat-lon'; for NMM, a projection of 'rotated_ll' must be specified
        ref_lat: null,
        //A real value specifying the latitude part of a (latitude, longitude) location whose (i,j) location in the simulation domain is known. For ARW, ref_lat gives the latitude of the center-point of the coarse domain by default (i.e., when ref_x and ref_y are not specified). For NMM, ref_lat always gives the latitude to which the origin is rotated
        ref_lon: null,
        //A real value specifying the longitude part of a (latitude, longitude) location whose (i, j) location in the simulation domain is known. For ARW, ref_lon gives the longitude of the center-point of the coarse domain by default (i.e., when ref_x and ref_y are not specified). For NMM, ref_lon always gives the longitude to which the origin is rotated. For both ARW and NMM, west longitudes are negative, and the value of ref_lon should be in the range [-180, 180]
        ref_x: null,
        // default: (((E_WE-1.)+1.)/2.) = (E_WE/2.), A real value specifying the i part of an (i, j) location whose (latitude, longitude) location in the simulation domain is known. The (i, j) location is always given with respect to the mass-staggered grid, whose dimensions are one less than the dimensions of the unstaggered grid
        ref_y: null,
        // default: (((E_SN-1.)+1.)/2.) = (E_SN/2.), A real value specifying the j part of an (i, j) location whose (latitude, longitude) location in the simulation domain is known. The (i, j) location is always given with respect to the mass-staggered grid, whose dimensions are one less than the dimensions of the unstaggered grid
        truelat1: null,
        // A real value specifying, for ARW, the first true latitude for the Lambert conformal projection, or the only true latitude for the Mercator and polar stereographic projections. For NMM, truelat1 is ignored
        truelat2: null,
        // A real value specifying, for ARW, the second true latitude for the Lambert conformal conic projection. For all other projections, truelat2 is ignored
        stand_lon: null,
        // A real value specifying, for ARW, the longitude that is parallel with the y-axis in the Lambert conformal and polar stereographic projections. For the regular latitude-longitude projection, this value gives the rotation about the earth's geographic poles. For NMM, stand_lon is ignored
        pole_lat: 90,
        //For the latitude-longitude projection for ARW, the latitude of the North Pole with respect to the computational latitude-longitude grid in which -90.0 degrees latitude is at the bottom of a global domain, 90.0 degrees latitude is at the top, and 180.0 degrees longitude is at the center
        pole_lon: 0,
        //For the latitude-longitude projection for ARW, the longitude of the North Pole with respect to the computational lat/lon grid in which -90.0 degrees latitude is at the bottom of a global domain, 90.0 degrees latitude is at the top, and 180.0 degrees longitude is at the center
        geog_data_path: null,
        //A character string giving the path, either relative or absolute, to the directory where the geographical data directories may be found. This path is the one to which rel_path specifications in the GEOGRID.TBL file are given in relation to
        opt_geogrid_tbl_path: './geogrid/' //A character string giving the path, either relative or absolute, to the GEOGRID.TBL file. The path should not contain the actual file name, as GEOGRID.TBL is assumed, but should only give the path where this file is located        
      };
      this.ungrib = {
        out_format: 'WPS',
        //A character string set either to 'WPS', 'SI', or 'MM5'. If set to 'MM5', ungrib will write output in the format of the MM5 pregrid program; if set to 'SI', ungrib will write output in the format of grib_prep.exe; if set to 'WPS', ungrib will write data in the WPS intermediate format
        prefix: 'FILE',
        //A character string that will be used as the prefix for intermediate-format files created by ungrib; here, prefix refers to the string PREFIX in the filename PREFIX:YYYY-MM-DD_HH of an intermediate file. The prefix may contain path information, either relative or absolute, in which case the intermediate files will be written in the directory specified. This option may be useful to avoid renaming intermediate files if ungrib is to be run on multiple sources of GRIB data
        add_lvls: false,
        //A logical that determines whether ungrib will attemp to vertically interpolate to an additional set of vertical levels specified using the NEW_PLVL and INTERP_TYPE namelist options
        interp_type: 0,
        //An integer value specifying the method that ungrib will use when vertically interpolating to new levels. A value of 0 causes ungrib to interpolate linearly in pressure, and a value of 1 causes ungrib to interpolate linearly in log pressure
        new_plvl: null,
        //An array of real values that specify the additional vertical levels, given in Pa, to which the ungrib program will attempt to interpolate when ADD_LVLS is true. The set of new levels can be specified explicitly, or, if the levels are evenly spaced in pressure, exactly three values can be specified: the starting pressure, the ending pressure, and the pressure increment. When a starting pressure, ending pressure, and increment are specified, the pressure increment must be a negative number to signal to the ungrib program that this value is not a target pressure level, but rather, an increment to be used between the first and second values
        pmin: 100 //A real value specifying the minimum pressure level, in Pa, to be processed from GRIB data. This option applies only to isobaric data sets            
      };
      this.metgrid = {
        fg_name: null,
        //A list of character strings specifying the path and prefix of ungribbed data files. The path may be relative or absolute, and the prefix should contain all characters of the filenames up to, but not including, the colon preceding the date. When more than one fg_name is specified, and the same field is found in two or more input sources, the data in the last encountered source will take priority over all preceding sources for that field
        constants_name: null,
        //A list of character strings specifying the path and full filename of ungribbed data files which are time-invariant. The path may be relative or absolute, and the filename should be the complete filename; since the data are assumed to be time-invariant, no date will be appended to the specified filename
        io_form_metgrid: 2,
        //The WRF I/O API format that the output created by the metgrid program will be written in. Possible options are: 1 for binary; 2 for NetCDF; 3 for GRIB1. When option 1 is given, output files will have a suffix of .int; when option 2 is given, output files will have a suffix of .nc; when option 3 is given, output files will have a suffix of .gr1
        opt_output_from_metgrid_path: null,
        //Default current working directory (i.e., ./ ), A character string giving the path, either relative or absolute, to the location where output files from metgrid should be written to
        opt_metgrid_tbl_path: './metgrid',
        //A character string giving the path, either relative or absolute, to the METGRID.TBL file; the path should not contain the actual file name, as METGRID.TBL is assumed, but should only give the path where this file is located
        process_only_bdy: 0 //An integer specifying the number of boundary rows and columns to be processed by metgrid for time periods after the initial time; for the initial time, metgrid will always interpolate to every grid point. Setting this option to the intended value of spec_bdy_width in the WRF namelist.input will speed up processing in metgrid, but it should not be set if interpolated data are needed in the domain interior. If this option is set to zero, metgrid will horizontally interpolate meteorological data to every grid point in the model domains. This option is only available for ARW            
      };
      if (typeof obj === 'string') {
        ns = new Namelist(obj);
        if ('hgridspec' in ns) {
          // Format used prior WRF version 3
          this._createWRFSI(ns);
        } else {
          this._create(ns);
        }
      }
    }
    return _createClass(WPSNamelist, [{
      key: "_create",
      value: function _create(ns) {
        if ('share' in ns) {
          Object.assign(this.share, ns['share']);
          Namelist.convertToArray(this.geogrid, 'start_year');
          Namelist.convertToArray(this.geogrid, 'start_month');
          Namelist.convertToArray(this.geogrid, 'start_day');
          Namelist.convertToArray(this.geogrid, 'start_hour');
          Namelist.convertToArray(this.geogrid, 'end_year');
          Namelist.convertToArray(this.geogrid, 'end_month');
          Namelist.convertToArray(this.geogrid, 'end_day');
          Namelist.convertToArray(this.geogrid, 'end_hour');
          Namelist.convertToArray(this.geogrid, 'start_date');
          Namelist.convertToArray(this.geogrid, 'end_date');
          Namelist.convertToArray(this.geogrid, 'active_grid');
        }
        if ('geogrid' in ns) {
          Object.assign(this.geogrid, ns['geogrid']);
          Namelist.convertToArray(this.geogrid, 'parent_id');
          Namelist.convertToArray(this.geogrid, 'parent_grid_ratio');
          Namelist.convertToArray(this.geogrid, 'i_parent_start');
          Namelist.convertToArray(this.geogrid, 'J_parent_start');
          Namelist.convertToArray(this.geogrid, 's_we');
          Namelist.convertToArray(this.geogrid, 'e_we');
          Namelist.convertToArray(this.geogrid, 's_sn');
          Namelist.convertToArray(this.geogrid, 'e_sn');
          Namelist.convertToArray(this.geogrid, 'geog_data_res');
        }
        if ('ungrib' in ns) {
          Object.assign(this.ungrib, ns['ungrib']);
        }
        if ('metgrid' in ns) {
          Object.assign(this.metgrid, ns['metgrid']);
        }
      }
    }, {
      key: "_createWRFSI",
      value: function _createWRFSI(ns) {
        this.share.wrf_core = 'ARW';
        this.share.max_dom = ns['hgridspec']['num_domains'];
        var now = new Date();
        var tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.share.start_date = [];
        this.share.end_date = [];
        for (var i = 0; i < this.share.max_dom; i++) {
          //2014-02-22_03: 00: 00
          this.share.start_date.push(now.getFullYear().toString() + '-' + now.getMonth().toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '_03:00:00');
          this.share.end_date.push(tomorrow.getFullYear().toString() + '-' + tomorrow.getMonth().toString().padStart(2, '0') + '-' + tomorrow.getDate().toString().padStart(2, '0') + '_03:00:00');
        }
        this.geogrid.parent_id = [];
        this.geogrid.parent_grid_ratio = [];
        this.geogrid.i_parent_start = [];
        this.geogrid.j_parent_start = [];
        this.geogrid.e_we = [];
        this.geogrid.e_sn = [];
        this.geogrid.geog_data_res = [];
        for (var i = 0; i < this.share.max_dom; i++) {
          this.geogrid.parent_id.push(ns['hgridspec']['parent_id'][i]);
          this.geogrid.parent_grid_ratio.push(ns['hgridspec']['ratio_to_parent'][i]);
          this.geogrid.i_parent_start.push(ns['hgridspec']['domain_origin_lli'][i]);
          this.geogrid.j_parent_start.push(ns['hgridspec']['domain_origin_llj'][i]);
          var e_we = (ns['hgridspec']['domain_origin_uri'][i] - ns['hgridspec']['domain_origin_lli'][i]) * ns['hgridspec']['ratio_to_parent'][i] + 1;
          var e_sn = (ns['hgridspec']['domain_origin_urj'][i] - ns['hgridspec']['domain_origin_llj'][i]) * ns['hgridspec']['ratio_to_parent'][i] + 1;
          this.geogrid.e_we.push(e_we);
          this.geogrid.e_sn.push(e_sn);
          this.geogrid.geog_data_res.push('default');
        }
        this.geogrid.dx = ns['hgridspec']['moad_delta_x'];
        this.geogrid.dy = ns['hgridspec']['moad_delta_y'];
        this.geogrid.map_proj = ns['hgridspec']['map_proj_name'];
        this.geogrid.ref_lat = ns['hgridspec']['moad_known_lat'];
        this.geogrid.ref_lon = ns['hgridspec']['moad_known_lon'];
        if (Array.isArray(ns['hgridspec']['moad_stand_lats'])) {
          this.geogrid.truelat1 = ns['hgridspec']['moad_stand_lats'][0];
          this.geogrid.truelat2 = ns['hgridspec']['moad_stand_lats'][1];
        } else {
          this.geogrid.truelat1 = ns['hgridspec']['moad_stand_lats'];
          this.geogrid.truelat2 = 0;
        }
        if (Array.isArray(ns['hgridspec']['moad_stand_lons'])) {
          this.geogrid.stand_lon = ns['hgridspec']['moad_stand_lons'][0];
        } else {
          this.geogrid.stand_lon = ns['hgridspec']['moad_stand_lons'];
        }
        this.geogrid.geog_data_path = '/home/wrf/geog';
        this.share.interval_seconds = 10800;
        this.share.io_form_geogrid = 2;
        this.ungrib.out_format = 'WPS';
        this.ungrib.prefix = 'UNGRIB';
        this.metgrid.fg_name = 'UNGRIB';
        this.metgrid.io_form_metgrid = 2;
        this.metgrid.opt_metgrid_tbl_path = '/home/wrf';
      }
    }, {
      key: "_setDefaults",
      value: function _setDefaults() {
        // set default values
        if (!this.share.start_date || !this.share.end_date) {
          var now = new Date();
          var start_date = WPSNamelist._formarDate(now) + '_03:00:00';
          var end_date = WPSNamelist._formarDate(now) + '_18:00:00';
          this.share.start_date = [];
          this.share.end_date = [];
          while (this.share.start_date.length < this.share.max_dom) {
            this.share.start_date.push(start_date);
            this.share.end_date.push(end_date);
          }
        }
        if (this.share.interval_seconds === null) {
          // 6 hours
          this.share.interval_seconds = 6 * 60 * 60;
        }
        if (this.share.debug_level === null) {
          this.share.debug_level = 0;
        }
        if (this.geogrid.geog_data_path === null) {
          this.geogrid.geog_data_path = 'geog';
        }
        if (this.geogrid.opt_geogrid_tbl_path === null) {
          this.geogrid.opt_geogrid_tbl_path = 'geogrid';
        }
        if (this.metgrid.fg_name === null) {
          this.metgrid.fg_name = 'FILE';
        }
      }
    }, {
      key: "toString",
      value: function toString() {
        this._setDefaults();
        var content = '';
        content += Namelist.formatSection('share', ['wrf_core', 'max_dom', 'start_date', 'end_date', 'interval_seconds', 'io_form_geogrid', 'debug_level'], [this.share.wrf_core, this.share.max_dom, this.share.start_date, this.share.end_date, this.share.interval_seconds, this.share.io_form_geogrid, this.share.debug_level]);
        content += Namelist.formatSection('geogrid', ['parent_id', 'parent_grid_ratio', 'i_parent_start', 'j_parent_start', 'e_we', 'e_sn', 'geog_data_res', 'dx', 'dy', 'map_proj', 'ref_lat', 'ref_lon', 'truelat1', 'truelat2', 'pole_lat', 'pole_lon', 'stand_lon', 'geog_data_path', 'opt_geogrid_tbl_path'], [this.geogrid.parent_id, this.geogrid.parent_grid_ratio, this.geogrid.i_parent_start, this.geogrid.j_parent_start, this.geogrid.e_we, this.geogrid.e_sn, this.geogrid.geog_data_res, this.geogrid.dx, this.geogrid.dy, this.geogrid.map_proj, this.geogrid.ref_lat, this.geogrid.ref_lon, this.geogrid.truelat1, this.geogrid.truelat2, this.geogrid.pole_lat, this.geogrid.pole_lon, this.geogrid.stand_lon, this.geogrid.geog_data_path, this.geogrid.opt_geogrid_tbl_path]);
        content += Namelist.formatSection('ungrib', ['out_format', 'prefix'], [this.ungrib.out_format, this.ungrib.prefix]);
        content += Namelist.formatSection('metgrid', ['fg_name', 'io_form_metgrid', 'opt_metgrid_tbl_path'], [this.metgrid.fg_name, this.metgrid.io_form_metgrid, this.metgrid.opt_metgrid_tbl_path]);
        return content;
      }
    }], [{
      key: "_formarDate",
      value: function _formarDate(d) {
        return d.getFullYear().toString() + '-' + d.getMonth().toString().padStart(2, '0') + '-' + d.getDay().toString().padStart(2, '0');
      }
    }]);
  }();

  var EarthRadius = 6370000;
  var WrfProjections = {
    lambert: 'lambert',
    mercator: 'mercator',
    polar: 'polar',
    latlon: 'lat-lon',
    rotatedlatlon: 'rotated_ll'
  };

  function nearestIntToZero(num) {
    return num < 0 ? Math.ceil(num) : Math.floor(num);
  }
  function degreesToMeters(d) {
    return d * EarthRadius * Math.PI * 2.0 / 360.0;
  }
  function distanceToMeters(map_proj, distance) {
    if (map_proj === undefined) {
      throw new Error("Invalid map_proj argument");
    }
    if (isNaN(distance)) {
      throw new Error("Invalid distance argument");
    }
    return map_proj === WrfProjections.latlon ? degreesToMeters(distance) : distance;
  }

  function globals(defs) {
    defs('EPSG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
    defs('EPSG:4269', "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
    defs('EPSG:3857', "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");

    defs.WGS84 = defs['EPSG:4326'];
    defs['EPSG:3785'] = defs['EPSG:3857']; // maintain backward compat, official code is 3857
    defs.GOOGLE = defs['EPSG:3857'];
    defs['EPSG:900913'] = defs['EPSG:3857'];
    defs['EPSG:102113'] = defs['EPSG:3857'];
  }

  var PJD_3PARAM = 1;
  var PJD_7PARAM = 2;
  var PJD_GRIDSHIFT = 3;
  var PJD_WGS84 = 4; // WGS84 or equivalent
  var PJD_NODATUM = 5; // WGS84 or equivalent
  var SRS_WGS84_SEMIMAJOR = 6378137.0;  // only used in grid shift transforms
  var SRS_WGS84_SEMIMINOR = 6356752.314;  // only used in grid shift transforms
  var SRS_WGS84_ESQUARED = 0.0066943799901413165; // only used in grid shift transforms
  var SEC_TO_RAD = 4.84813681109535993589914102357e-6;
  var HALF_PI = Math.PI/2;
  // ellipoid pj_set_ell.c
  var SIXTH = 0.1666666666666666667;
  /* 1/6 */
  var RA4 = 0.04722222222222222222;
  /* 17/360 */
  var RA6 = 0.02215608465608465608;
  var EPSLN = 1.0e-10;
  // you'd think you could use Number.EPSILON above but that makes
  // Mollweide get into an infinate loop.

  var D2R$1 = 0.01745329251994329577;
  var R2D = 57.29577951308232088;
  var FORTPI = Math.PI/4;
  var TWO_PI = Math.PI * 2;
  // SPI is slightly greater than Math.PI, so values that exceed the -180..180
  // degree range by a tiny amount don't get wrapped. This prevents points that
  // have drifted from their original location along the 180th meridian (due to
  // floating point error) from changing their sign.
  var SPI = 3.14159265359;

  var exports$3 = {};

  exports$3.greenwich = 0.0; //"0dE",
  exports$3.lisbon = -9.131906111111; //"9d07'54.862\"W",
  exports$3.paris = 2.337229166667; //"2d20'14.025\"E",
  exports$3.bogota = -74.080916666667; //"74d04'51.3\"W",
  exports$3.madrid = -3.687938888889; //"3d41'16.58\"W",
  exports$3.rome = 12.452333333333; //"12d27'8.4\"E",
  exports$3.bern = 7.439583333333; //"7d26'22.5\"E",
  exports$3.jakarta = 106.807719444444; //"106d48'27.79\"E",
  exports$3.ferro = -17.666666666667; //"17d40'W",
  exports$3.brussels = 4.367975; //"4d22'4.71\"E",
  exports$3.stockholm = 18.058277777778; //"18d3'29.8\"E",
  exports$3.athens = 23.7163375; //"23d42'58.815\"E",
  exports$3.oslo = 10.722916666667; //"10d43'22.5\"E"

  var units = {
    ft: {to_meter: 0.3048},
    'us-ft': {to_meter: 1200 / 3937}
  };

  var ignoredChar = /[\s_\-\/\(\)]/g;
  function match(obj, key) {
    if (obj[key]) {
      return obj[key];
    }
    var keys = Object.keys(obj);
    var lkey = key.toLowerCase().replace(ignoredChar, '');
    var i = -1;
    var testkey, processedKey;
    while (++i < keys.length) {
      testkey = keys[i];
      processedKey = testkey.toLowerCase().replace(ignoredChar, '');
      if (processedKey === lkey) {
        return obj[testkey];
      }
    }
  }

  function projStr(defData) {
    var self = {};
    var paramObj = defData.split('+').map(function(v) {
      return v.trim();
    }).filter(function(a) {
      return a;
    }).reduce(function(p, a) {
      var split = a.split('=');
      split.push(true);
      p[split[0].toLowerCase()] = split[1];
      return p;
    }, {});
    var paramName, paramVal, paramOutname;
    var params = {
      proj: 'projName',
      datum: 'datumCode',
      rf: function(v) {
        self.rf = parseFloat(v);
      },
      lat_0: function(v) {
        self.lat0 = v * D2R$1;
      },
      lat_1: function(v) {
        self.lat1 = v * D2R$1;
      },
      lat_2: function(v) {
        self.lat2 = v * D2R$1;
      },
      lat_ts: function(v) {
        self.lat_ts = v * D2R$1;
      },
      lon_0: function(v) {
        self.long0 = v * D2R$1;
      },
      lon_1: function(v) {
        self.long1 = v * D2R$1;
      },
      lon_2: function(v) {
        self.long2 = v * D2R$1;
      },
      alpha: function(v) {
        self.alpha = parseFloat(v) * D2R$1;
      },
      gamma: function(v) {
        self.rectified_grid_angle = parseFloat(v);
      },
      lonc: function(v) {
        self.longc = v * D2R$1;
      },
      x_0: function(v) {
        self.x0 = parseFloat(v);
      },
      y_0: function(v) {
        self.y0 = parseFloat(v);
      },
      k_0: function(v) {
        self.k0 = parseFloat(v);
      },
      k: function(v) {
        self.k0 = parseFloat(v);
      },
      a: function(v) {
        self.a = parseFloat(v);
      },
      b: function(v) {
        self.b = parseFloat(v);
      },
      r: function(v) {
        self.a = self.b = parseFloat(v);
      },
      r_a: function() {
        self.R_A = true;
      },
      zone: function(v) {
        self.zone = parseInt(v, 10);
      },
      south: function() {
        self.utmSouth = true;
      },
      towgs84: function(v) {
        self.datum_params = v.split(",").map(function(a) {
          return parseFloat(a);
        });
      },
      to_meter: function(v) {
        self.to_meter = parseFloat(v);
      },
      units: function(v) {
        self.units = v;
        var unit = match(units, v);
        if (unit) {
          self.to_meter = unit.to_meter;
        }
      },
      from_greenwich: function(v) {
        self.from_greenwich = v * D2R$1;
      },
      pm: function(v) {
        var pm = match(exports$3, v);
        self.from_greenwich = (pm ? pm : parseFloat(v)) * D2R$1;
      },
      nadgrids: function(v) {
        if (v === '@null') {
          self.datumCode = 'none';
        }
        else {
          self.nadgrids = v;
        }
      },
      axis: function(v) {
        var legalAxis = "ewnsud";
        if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
          self.axis = v;
        }
      },
      approx: function() {
        self.approx = true;
      }
    };
    for (paramName in paramObj) {
      paramVal = paramObj[paramName];
      if (paramName in params) {
        paramOutname = params[paramName];
        if (typeof paramOutname === 'function') {
          paramOutname(paramVal);
        }
        else {
          self[paramOutname] = paramVal;
        }
      }
      else {
        self[paramName] = paramVal;
      }
    }
    if(typeof self.datumCode === 'string' && self.datumCode !== "WGS84"){
      self.datumCode = self.datumCode.toLowerCase();
    }
    return self;
  }

  var NEUTRAL = 1;
  var KEYWORD = 2;
  var NUMBER = 3;
  var QUOTED = 4;
  var AFTERQUOTE = 5;
  var ENDED = -1;
  var whitespace = /\s/;
  var latin = /[A-Za-z]/;
  var keyword = /[A-Za-z84_]/;
  var endThings = /[,\]]/;
  var digets = /[\d\.E\-\+]/;
  // const ignoredChar = /[\s_\-\/\(\)]/g;
  function Parser(text) {
    if (typeof text !== 'string') {
      throw new Error('not a string');
    }
    this.text = text.trim();
    this.level = 0;
    this.place = 0;
    this.root = null;
    this.stack = [];
    this.currentObject = null;
    this.state = NEUTRAL;
  }
  Parser.prototype.readCharicter = function() {
    var char = this.text[this.place++];
    if (this.state !== QUOTED) {
      while (whitespace.test(char)) {
        if (this.place >= this.text.length) {
          return;
        }
        char = this.text[this.place++];
      }
    }
    switch (this.state) {
      case NEUTRAL:
        return this.neutral(char);
      case KEYWORD:
        return this.keyword(char)
      case QUOTED:
        return this.quoted(char);
      case AFTERQUOTE:
        return this.afterquote(char);
      case NUMBER:
        return this.number(char);
      case ENDED:
        return;
    }
  };
  Parser.prototype.afterquote = function(char) {
    if (char === '"') {
      this.word += '"';
      this.state = QUOTED;
      return;
    }
    if (endThings.test(char)) {
      this.word = this.word.trim();
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in afterquote yet, index ' + this.place);
  };
  Parser.prototype.afterItem = function(char) {
    if (char === ',') {
      if (this.word !== null) {
        this.currentObject.push(this.word);
      }
      this.word = null;
      this.state = NEUTRAL;
      return;
    }
    if (char === ']') {
      this.level--;
      if (this.word !== null) {
        this.currentObject.push(this.word);
        this.word = null;
      }
      this.state = NEUTRAL;
      this.currentObject = this.stack.pop();
      if (!this.currentObject) {
        this.state = ENDED;
      }

      return;
    }
  };
  Parser.prototype.number = function(char) {
    if (digets.test(char)) {
      this.word += char;
      return;
    }
    if (endThings.test(char)) {
      this.word = parseFloat(this.word);
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in number yet, index ' + this.place);
  };
  Parser.prototype.quoted = function(char) {
    if (char === '"') {
      this.state = AFTERQUOTE;
      return;
    }
    this.word += char;
    return;
  };
  Parser.prototype.keyword = function(char) {
    if (keyword.test(char)) {
      this.word += char;
      return;
    }
    if (char === '[') {
      var newObjects = [];
      newObjects.push(this.word);
      this.level++;
      if (this.root === null) {
        this.root = newObjects;
      } else {
        this.currentObject.push(newObjects);
      }
      this.stack.push(this.currentObject);
      this.currentObject = newObjects;
      this.state = NEUTRAL;
      return;
    }
    if (endThings.test(char)) {
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in keyword yet, index ' + this.place);
  };
  Parser.prototype.neutral = function(char) {
    if (latin.test(char)) {
      this.word = char;
      this.state = KEYWORD;
      return;
    }
    if (char === '"') {
      this.word = '';
      this.state = QUOTED;
      return;
    }
    if (digets.test(char)) {
      this.word = char;
      this.state = NUMBER;
      return;
    }
    if (endThings.test(char)) {
      this.afterItem(char);
      return;
    }
    throw new Error('havn\'t handled "' +char + '" in neutral yet, index ' + this.place);
  };
  Parser.prototype.output = function() {
    while (this.place < this.text.length) {
      this.readCharicter();
    }
    if (this.state === ENDED) {
      return this.root;
    }
    throw new Error('unable to parse string "' +this.text + '". State is ' + this.state);
  };

  function parseString(txt) {
    var parser = new Parser(txt);
    return parser.output();
  }

  function mapit(obj, key, value) {
    if (Array.isArray(key)) {
      value.unshift(key);
      key = null;
    }
    var thing = key ? {} : obj;

    var out = value.reduce(function(newObj, item) {
      sExpr(item, newObj);
      return newObj
    }, thing);
    if (key) {
      obj[key] = out;
    }
  }

  function sExpr(v, obj) {
    if (!Array.isArray(v)) {
      obj[v] = true;
      return;
    }
    var key = v.shift();
    if (key === 'PARAMETER') {
      key = v.shift();
    }
    if (v.length === 1) {
      if (Array.isArray(v[0])) {
        obj[key] = {};
        sExpr(v[0], obj[key]);
        return;
      }
      obj[key] = v[0];
      return;
    }
    if (!v.length) {
      obj[key] = true;
      return;
    }
    if (key === 'TOWGS84') {
      obj[key] = v;
      return;
    }
    if (key === 'AXIS') {
      if (!(key in obj)) {
        obj[key] = [];
      }
      obj[key].push(v);
      return;
    }
    if (!Array.isArray(key)) {
      obj[key] = {};
    }

    var i;
    switch (key) {
      case 'UNIT':
      case 'PRIMEM':
      case 'VERT_DATUM':
        obj[key] = {
          name: v[0].toLowerCase(),
          convert: v[1]
        };
        if (v.length === 3) {
          sExpr(v[2], obj[key]);
        }
        return;
      case 'SPHEROID':
      case 'ELLIPSOID':
        obj[key] = {
          name: v[0],
          a: v[1],
          rf: v[2]
        };
        if (v.length === 4) {
          sExpr(v[3], obj[key]);
        }
        return;
      case 'PROJECTEDCRS':
      case 'PROJCRS':
      case 'GEOGCS':
      case 'GEOCCS':
      case 'PROJCS':
      case 'LOCAL_CS':
      case 'GEODCRS':
      case 'GEODETICCRS':
      case 'GEODETICDATUM':
      case 'EDATUM':
      case 'ENGINEERINGDATUM':
      case 'VERT_CS':
      case 'VERTCRS':
      case 'VERTICALCRS':
      case 'COMPD_CS':
      case 'COMPOUNDCRS':
      case 'ENGINEERINGCRS':
      case 'ENGCRS':
      case 'FITTED_CS':
      case 'LOCAL_DATUM':
      case 'DATUM':
        v[0] = ['name', v[0]];
        mapit(obj, key, v);
        return;
      default:
        i = -1;
        while (++i < v.length) {
          if (!Array.isArray(v[i])) {
            return sExpr(v, obj[key]);
          }
        }
        return mapit(obj, key, v);
    }
  }

  var D2R = 0.01745329251994329577;



  function rename(obj, params) {
    var outName = params[0];
    var inName = params[1];
    if (!(outName in obj) && (inName in obj)) {
      obj[outName] = obj[inName];
      if (params.length === 3) {
        obj[outName] = params[2](obj[outName]);
      }
    }
  }

  function d2r(input) {
    return input * D2R;
  }

  function cleanWKT(wkt) {
    if (wkt.type === 'GEOGCS') {
      wkt.projName = 'longlat';
    } else if (wkt.type === 'LOCAL_CS') {
      wkt.projName = 'identity';
      wkt.local = true;
    } else {
      if (typeof wkt.PROJECTION === 'object') {
        wkt.projName = Object.keys(wkt.PROJECTION)[0];
      } else {
        wkt.projName = wkt.PROJECTION;
      }
    }
    if (wkt.AXIS) {
      var axisOrder = '';
      for (var i = 0, ii = wkt.AXIS.length; i < ii; ++i) {
        var axis = [wkt.AXIS[i][0].toLowerCase(), wkt.AXIS[i][1].toLowerCase()];
        if (axis[0].indexOf('north') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'north')) {
          axisOrder += 'n';
        } else if (axis[0].indexOf('south') !== -1 || ((axis[0] === 'y' || axis[0] === 'lat') && axis[1] === 'south')) {
          axisOrder += 's';
        } else if (axis[0].indexOf('east') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'east')) {
          axisOrder += 'e';
        } else if (axis[0].indexOf('west') !== -1 || ((axis[0] === 'x' || axis[0] === 'lon') && axis[1] === 'west')) {
          axisOrder += 'w';
        }
      }
      if (axisOrder.length === 2) {
        axisOrder += 'u';
      }
      if (axisOrder.length === 3) {
        wkt.axis = axisOrder;
      }
    }
    if (wkt.UNIT) {
      wkt.units = wkt.UNIT.name.toLowerCase();
      if (wkt.units === 'metre') {
        wkt.units = 'meter';
      }
      if (wkt.UNIT.convert) {
        if (wkt.type === 'GEOGCS') {
          if (wkt.DATUM && wkt.DATUM.SPHEROID) {
            wkt.to_meter = wkt.UNIT.convert*wkt.DATUM.SPHEROID.a;
          }
        } else {
          wkt.to_meter = wkt.UNIT.convert;
        }
      }
    }
    var geogcs = wkt.GEOGCS;
    if (wkt.type === 'GEOGCS') {
      geogcs = wkt;
    }
    if (geogcs) {
      //if(wkt.GEOGCS.PRIMEM&&wkt.GEOGCS.PRIMEM.convert){
      //  wkt.from_greenwich=wkt.GEOGCS.PRIMEM.convert*D2R;
      //}
      if (geogcs.DATUM) {
        wkt.datumCode = geogcs.DATUM.name.toLowerCase();
      } else {
        wkt.datumCode = geogcs.name.toLowerCase();
      }
      if (wkt.datumCode.slice(0, 2) === 'd_') {
        wkt.datumCode = wkt.datumCode.slice(2);
      }
      if (wkt.datumCode === 'new_zealand_geodetic_datum_1949' || wkt.datumCode === 'new_zealand_1949') {
        wkt.datumCode = 'nzgd49';
      }
      if (wkt.datumCode === 'wgs_1984' || wkt.datumCode === 'world_geodetic_system_1984') {
        if (wkt.PROJECTION === 'Mercator_Auxiliary_Sphere') {
          wkt.sphere = true;
        }
        wkt.datumCode = 'wgs84';
      }
      if (wkt.datumCode.slice(-6) === '_ferro') {
        wkt.datumCode = wkt.datumCode.slice(0, - 6);
      }
      if (wkt.datumCode.slice(-8) === '_jakarta') {
        wkt.datumCode = wkt.datumCode.slice(0, - 8);
      }
      if (~wkt.datumCode.indexOf('belge')) {
        wkt.datumCode = 'rnb72';
      }
      if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
        wkt.ellps = geogcs.DATUM.SPHEROID.name.replace('_19', '').replace(/[Cc]larke\_18/, 'clrk');
        if (wkt.ellps.toLowerCase().slice(0, 13) === 'international') {
          wkt.ellps = 'intl';
        }

        wkt.a = geogcs.DATUM.SPHEROID.a;
        wkt.rf = parseFloat(geogcs.DATUM.SPHEROID.rf, 10);
      }

      if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
        wkt.datum_params = geogcs.DATUM.TOWGS84;
      }
      if (~wkt.datumCode.indexOf('osgb_1936')) {
        wkt.datumCode = 'osgb36';
      }
      if (~wkt.datumCode.indexOf('osni_1952')) {
        wkt.datumCode = 'osni52';
      }
      if (~wkt.datumCode.indexOf('tm65')
        || ~wkt.datumCode.indexOf('geodetic_datum_of_1965')) {
        wkt.datumCode = 'ire65';
      }
      if (wkt.datumCode === 'ch1903+') {
        wkt.datumCode = 'ch1903';
      }
      if (~wkt.datumCode.indexOf('israel')) {
        wkt.datumCode = 'isr93';
      }
    }
    if (wkt.b && !isFinite(wkt.b)) {
      wkt.b = wkt.a;
    }

    function toMeter(input) {
      var ratio = wkt.to_meter || 1;
      return input * ratio;
    }
    var renamer = function(a) {
      return rename(wkt, a);
    };
    var list = [
      ['standard_parallel_1', 'Standard_Parallel_1'],
      ['standard_parallel_1', 'Latitude of 1st standard parallel'],
      ['standard_parallel_2', 'Standard_Parallel_2'],
      ['standard_parallel_2', 'Latitude of 2nd standard parallel'],
      ['false_easting', 'False_Easting'],
      ['false_easting', 'False easting'],
      ['false-easting', 'Easting at false origin'],
      ['false_northing', 'False_Northing'],
      ['false_northing', 'False northing'],
      ['false_northing', 'Northing at false origin'],
      ['central_meridian', 'Central_Meridian'],
      ['central_meridian', 'Longitude of natural origin'],
      ['central_meridian', 'Longitude of false origin'],
      ['latitude_of_origin', 'Latitude_Of_Origin'],
      ['latitude_of_origin', 'Central_Parallel'],
      ['latitude_of_origin', 'Latitude of natural origin'],
      ['latitude_of_origin', 'Latitude of false origin'],
      ['scale_factor', 'Scale_Factor'],
      ['k0', 'scale_factor'],
      ['latitude_of_center', 'Latitude_Of_Center'],
      ['latitude_of_center', 'Latitude_of_center'],
      ['lat0', 'latitude_of_center', d2r],
      ['longitude_of_center', 'Longitude_Of_Center'],
      ['longitude_of_center', 'Longitude_of_center'],
      ['longc', 'longitude_of_center', d2r],
      ['x0', 'false_easting', toMeter],
      ['y0', 'false_northing', toMeter],
      ['long0', 'central_meridian', d2r],
      ['lat0', 'latitude_of_origin', d2r],
      ['lat0', 'standard_parallel_1', d2r],
      ['lat1', 'standard_parallel_1', d2r],
      ['lat2', 'standard_parallel_2', d2r],
      ['azimuth', 'Azimuth'],
      ['alpha', 'azimuth', d2r],
      ['srsCode', 'name']
    ];
    list.forEach(renamer);
    if (!wkt.long0 && wkt.longc && (wkt.projName === 'Albers_Conic_Equal_Area' || wkt.projName === 'Lambert_Azimuthal_Equal_Area')) {
      wkt.long0 = wkt.longc;
    }
    if (!wkt.lat_ts && wkt.lat1 && (wkt.projName === 'Stereographic_South_Pole' || wkt.projName === 'Polar Stereographic (variant B)')) {
      wkt.lat0 = d2r(wkt.lat1 > 0 ? 90 : -90);
      wkt.lat_ts = wkt.lat1;
    } else if (!wkt.lat_ts && wkt.lat0 && wkt.projName === 'Polar_Stereographic') {
      wkt.lat_ts = wkt.lat0;
      wkt.lat0 = d2r(wkt.lat0 > 0 ? 90 : -90);
    }
  }
  function wkt(wkt) {
    var lisp = parseString(wkt);
    var type = lisp.shift();
    var name = lisp.shift();
    lisp.unshift(['name', name]);
    lisp.unshift(['type', type]);
    var obj = {};
    sExpr(lisp, obj);
    cleanWKT(obj);
    return obj;
  }

  function defs(name) {
    /*global console*/
    var that = this;
    if (arguments.length === 2) {
      var def = arguments[1];
      if (typeof def === 'string') {
        if (def.charAt(0) === '+') {
          defs[name] = projStr(arguments[1]);
        }
        else {
          defs[name] = wkt(arguments[1]);
        }
      } else {
        defs[name] = def;
      }
    }
    else if (arguments.length === 1) {
      if (Array.isArray(name)) {
        return name.map(function(v) {
          if (Array.isArray(v)) {
            defs.apply(that, v);
          }
          else {
            defs(v);
          }
        });
      }
      else if (typeof name === 'string') {
        if (name in defs) {
          return defs[name];
        }
      }
      else if ('EPSG' in name) {
        defs['EPSG:' + name.EPSG] = name;
      }
      else if ('ESRI' in name) {
        defs['ESRI:' + name.ESRI] = name;
      }
      else if ('IAU2000' in name) {
        defs['IAU2000:' + name.IAU2000] = name;
      }
      else {
        console.log(name);
      }
      return;
    }


  }
  globals(defs);

  function testObj(code){
    return typeof code === 'string';
  }
  function testDef(code){
    return code in defs;
  }
  var codeWords = ['PROJECTEDCRS', 'PROJCRS', 'GEOGCS','GEOCCS','PROJCS','LOCAL_CS', 'GEODCRS', 'GEODETICCRS', 'GEODETICDATUM', 'ENGCRS', 'ENGINEERINGCRS'];
  function testWKT(code){
    return codeWords.some(function (word) {
      return code.indexOf(word) > -1;
    });
  }
  var codes = ['3857', '900913', '3785', '102113'];
  function checkMercator(item) {
    var auth = match(item, 'authority');
    if (!auth) {
      return;
    }
    var code = match(auth, 'epsg');
    return code && codes.indexOf(code) > -1;
  }
  function checkProjStr(item) {
    var ext = match(item, 'extension');
    if (!ext) {
      return;
    }
    return match(ext, 'proj4');
  }
  function testProj(code){
    return code[0] === '+';
  }
  function parse(code){
    if (testObj(code)) {
      //check to see if this is a WKT string
      if (testDef(code)) {
        return defs[code];
      }
      if (testWKT(code)) {
        var out = wkt(code);
        // test of spetial case, due to this being a very common and often malformed
        if (checkMercator(out)) {
          return defs['EPSG:3857'];
        }
        var maybeProjStr = checkProjStr(out);
        if (maybeProjStr) {
          return projStr(maybeProjStr);
        }
        return out;
      }
      if (testProj(code)) {
        return projStr(code);
      }
    }else {
      return code;
    }
  }

  function extend(destination, source) {
    destination = destination || {};
    var value, property;
    if (!source) {
      return destination;
    }
    for (property in source) {
      value = source[property];
      if (value !== undefined) {
        destination[property] = value;
      }
    }
    return destination;
  }

  function msfnz(eccent, sinphi, cosphi) {
    var con = eccent * sinphi;
    return cosphi / (Math.sqrt(1 - con * con));
  }

  function sign(x) {
    return x<0 ? -1 : 1;
  }

  function adjust_lon(x) {
    return (Math.abs(x) <= SPI) ? x : (x - (sign(x) * TWO_PI));
  }

  function tsfnz(eccent, phi, sinphi) {
    var con = eccent * sinphi;
    var com = 0.5 * eccent;
    con = Math.pow(((1 - con) / (1 + con)), com);
    return (Math.tan(0.5 * (HALF_PI - phi)) / con);
  }

  function phi2z(eccent, ts) {
    var eccnth = 0.5 * eccent;
    var con, dphi;
    var phi = HALF_PI - 2 * Math.atan(ts);
    for (var i = 0; i <= 15; i++) {
      con = eccent * Math.sin(phi);
      dphi = HALF_PI - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
      phi += dphi;
      if (Math.abs(dphi) <= 0.0000000001) {
        return phi;
      }
    }
    //console.log("phi2z has NoConvergence");
    return -9999;
  }

  function init$w() {
    var con = this.b / this.a;
    this.es = 1 - con * con;
    if(!('x0' in this)){
      this.x0 = 0;
    }
    if(!('y0' in this)){
      this.y0 = 0;
    }
    this.e = Math.sqrt(this.es);
    if (this.lat_ts) {
      if (this.sphere) {
        this.k0 = Math.cos(this.lat_ts);
      }
      else {
        this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
      }
    }
    else {
      if (!this.k0) {
        if (this.k) {
          this.k0 = this.k;
        }
        else {
          this.k0 = 1;
        }
      }
    }
  }

  /* Mercator forward equations--mapping lat,long to x,y
    --------------------------------------------------*/

  function forward$v(p) {
    var lon = p.x;
    var lat = p.y;
    // convert to radians
    if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
      return null;
    }

    var x, y;
    if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
      return null;
    }
    else {
      if (this.sphere) {
        x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
        y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
      }
      else {
        var sinphi = Math.sin(lat);
        var ts = tsfnz(this.e, lat, sinphi);
        x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0);
        y = this.y0 - this.a * this.k0 * Math.log(ts);
      }
      p.x = x;
      p.y = y;
      return p;
    }
  }

  /* Mercator inverse equations--mapping x,y to lat/long
    --------------------------------------------------*/
  function inverse$v(p) {

    var x = p.x - this.x0;
    var y = p.y - this.y0;
    var lon, lat;

    if (this.sphere) {
      lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
    }
    else {
      var ts = Math.exp(-y / (this.a * this.k0));
      lat = phi2z(this.e, ts);
      if (lat === -9999) {
        return null;
      }
    }
    lon = adjust_lon(this.long0 + x / (this.a * this.k0));

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$x = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"];
  var merc = {
    init: init$w,
    forward: forward$v,
    inverse: inverse$v,
    names: names$x
  };

  function init$v() {
    //no-op for longlat
  }

  function identity(pt) {
    return pt;
  }
  var names$w = ["longlat", "identity"];
  var longlat = {
    init: init$v,
    forward: identity,
    inverse: identity,
    names: names$w
  };

  var projs = [merc, longlat];
  var names$v = {};
  var projStore = [];

  function add(proj, i) {
    var len = projStore.length;
    if (!proj.names) {
      console.log(i);
      return true;
    }
    projStore[len] = proj;
    proj.names.forEach(function(n) {
      names$v[n.toLowerCase()] = len;
    });
    return this;
  }

  function get(name) {
    if (!name) {
      return false;
    }
    var n = name.toLowerCase();
    if (typeof names$v[n] !== 'undefined' && projStore[names$v[n]]) {
      return projStore[names$v[n]];
    }
  }

  function start() {
    projs.forEach(add);
  }
  var projections = {
    start: start,
    add: add,
    get: get
  };

  var exports$2 = {};
  exports$2.MERIT = {
    a: 6378137.0,
    rf: 298.257,
    ellipseName: "MERIT 1983"
  };

  exports$2.SGS85 = {
    a: 6378136.0,
    rf: 298.257,
    ellipseName: "Soviet Geodetic System 85"
  };

  exports$2.GRS80 = {
    a: 6378137.0,
    rf: 298.257222101,
    ellipseName: "GRS 1980(IUGG, 1980)"
  };

  exports$2.IAU76 = {
    a: 6378140.0,
    rf: 298.257,
    ellipseName: "IAU 1976"
  };

  exports$2.airy = {
    a: 6377563.396,
    b: 6356256.910,
    ellipseName: "Airy 1830"
  };

  exports$2.APL4 = {
    a: 6378137,
    rf: 298.25,
    ellipseName: "Appl. Physics. 1965"
  };

  exports$2.NWL9D = {
    a: 6378145.0,
    rf: 298.25,
    ellipseName: "Naval Weapons Lab., 1965"
  };

  exports$2.mod_airy = {
    a: 6377340.189,
    b: 6356034.446,
    ellipseName: "Modified Airy"
  };

  exports$2.andrae = {
    a: 6377104.43,
    rf: 300.0,
    ellipseName: "Andrae 1876 (Den., Iclnd.)"
  };

  exports$2.aust_SA = {
    a: 6378160.0,
    rf: 298.25,
    ellipseName: "Australian Natl & S. Amer. 1969"
  };

  exports$2.GRS67 = {
    a: 6378160.0,
    rf: 298.2471674270,
    ellipseName: "GRS 67(IUGG 1967)"
  };

  exports$2.bessel = {
    a: 6377397.155,
    rf: 299.1528128,
    ellipseName: "Bessel 1841"
  };

  exports$2.bess_nam = {
    a: 6377483.865,
    rf: 299.1528128,
    ellipseName: "Bessel 1841 (Namibia)"
  };

  exports$2.clrk66 = {
    a: 6378206.4,
    b: 6356583.8,
    ellipseName: "Clarke 1866"
  };

  exports$2.clrk80 = {
    a: 6378249.145,
    rf: 293.4663,
    ellipseName: "Clarke 1880 mod."
  };

  exports$2.clrk80ign = {
    a: 6378249.2,
    b: 6356515,
    rf: 293.4660213,
    ellipseName: "Clarke 1880 (IGN)"
  };

  exports$2.clrk58 = {
    a: 6378293.645208759,
    rf: 294.2606763692654,
    ellipseName: "Clarke 1858"
  };

  exports$2.CPM = {
    a: 6375738.7,
    rf: 334.29,
    ellipseName: "Comm. des Poids et Mesures 1799"
  };

  exports$2.delmbr = {
    a: 6376428.0,
    rf: 311.5,
    ellipseName: "Delambre 1810 (Belgium)"
  };

  exports$2.engelis = {
    a: 6378136.05,
    rf: 298.2566,
    ellipseName: "Engelis 1985"
  };

  exports$2.evrst30 = {
    a: 6377276.345,
    rf: 300.8017,
    ellipseName: "Everest 1830"
  };

  exports$2.evrst48 = {
    a: 6377304.063,
    rf: 300.8017,
    ellipseName: "Everest 1948"
  };

  exports$2.evrst56 = {
    a: 6377301.243,
    rf: 300.8017,
    ellipseName: "Everest 1956"
  };

  exports$2.evrst69 = {
    a: 6377295.664,
    rf: 300.8017,
    ellipseName: "Everest 1969"
  };

  exports$2.evrstSS = {
    a: 6377298.556,
    rf: 300.8017,
    ellipseName: "Everest (Sabah & Sarawak)"
  };

  exports$2.fschr60 = {
    a: 6378166.0,
    rf: 298.3,
    ellipseName: "Fischer (Mercury Datum) 1960"
  };

  exports$2.fschr60m = {
    a: 6378155.0,
    rf: 298.3,
    ellipseName: "Fischer 1960"
  };

  exports$2.fschr68 = {
    a: 6378150.0,
    rf: 298.3,
    ellipseName: "Fischer 1968"
  };

  exports$2.helmert = {
    a: 6378200.0,
    rf: 298.3,
    ellipseName: "Helmert 1906"
  };

  exports$2.hough = {
    a: 6378270.0,
    rf: 297.0,
    ellipseName: "Hough"
  };

  exports$2.intl = {
    a: 6378388.0,
    rf: 297.0,
    ellipseName: "International 1909 (Hayford)"
  };

  exports$2.kaula = {
    a: 6378163.0,
    rf: 298.24,
    ellipseName: "Kaula 1961"
  };

  exports$2.lerch = {
    a: 6378139.0,
    rf: 298.257,
    ellipseName: "Lerch 1979"
  };

  exports$2.mprts = {
    a: 6397300.0,
    rf: 191.0,
    ellipseName: "Maupertius 1738"
  };

  exports$2.new_intl = {
    a: 6378157.5,
    b: 6356772.2,
    ellipseName: "New International 1967"
  };

  exports$2.plessis = {
    a: 6376523.0,
    rf: 6355863.0,
    ellipseName: "Plessis 1817 (France)"
  };

  exports$2.krass = {
    a: 6378245.0,
    rf: 298.3,
    ellipseName: "Krassovsky, 1942"
  };

  exports$2.SEasia = {
    a: 6378155.0,
    b: 6356773.3205,
    ellipseName: "Southeast Asia"
  };

  exports$2.walbeck = {
    a: 6376896.0,
    b: 6355834.8467,
    ellipseName: "Walbeck"
  };

  exports$2.WGS60 = {
    a: 6378165.0,
    rf: 298.3,
    ellipseName: "WGS 60"
  };

  exports$2.WGS66 = {
    a: 6378145.0,
    rf: 298.25,
    ellipseName: "WGS 66"
  };

  exports$2.WGS7 = {
    a: 6378135.0,
    rf: 298.26,
    ellipseName: "WGS 72"
  };

  var WGS84 = exports$2.WGS84 = {
    a: 6378137.0,
    rf: 298.257223563,
    ellipseName: "WGS 84"
  };

  exports$2.sphere = {
    a: 6370997.0,
    b: 6370997.0,
    ellipseName: "Normal Sphere (r=6370997)"
  };

  function eccentricity(a, b, rf, R_A) {
    var a2 = a * a; // used in geocentric
    var b2 = b * b; // used in geocentric
    var es = (a2 - b2) / a2; // e ^ 2
    var e = 0;
    if (R_A) {
      a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
      a2 = a * a;
      es = 0;
    } else {
      e = Math.sqrt(es); // eccentricity
    }
    var ep2 = (a2 - b2) / b2; // used in geocentric
    return {
      es: es,
      e: e,
      ep2: ep2
    };
  }
  function sphere(a, b, rf, ellps, sphere) {
    if (!a) { // do we have an ellipsoid?
      var ellipse = match(exports$2, ellps);
      if (!ellipse) {
        ellipse = WGS84;
      }
      a = ellipse.a;
      b = ellipse.b;
      rf = ellipse.rf;
    }

    if (rf && !b) {
      b = (1.0 - 1.0 / rf) * a;
    }
    if (rf === 0 || Math.abs(a - b) < EPSLN) {
      sphere = true;
      b = a;
    }
    return {
      a: a,
      b: b,
      rf: rf,
      sphere: sphere
    };
  }

  var exports$1 = {};
  exports$1.wgs84 = {
    towgs84: "0,0,0",
    ellipse: "WGS84",
    datumName: "WGS84"
  };

  exports$1.ch1903 = {
    towgs84: "674.374,15.056,405.346",
    ellipse: "bessel",
    datumName: "swiss"
  };

  exports$1.ggrs87 = {
    towgs84: "-199.87,74.79,246.62",
    ellipse: "GRS80",
    datumName: "Greek_Geodetic_Reference_System_1987"
  };

  exports$1.nad83 = {
    towgs84: "0,0,0",
    ellipse: "GRS80",
    datumName: "North_American_Datum_1983"
  };

  exports$1.nad27 = {
    nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
    ellipse: "clrk66",
    datumName: "North_American_Datum_1927"
  };

  exports$1.potsdam = {
    towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
    ellipse: "bessel",
    datumName: "Potsdam Rauenberg 1950 DHDN"
  };

  exports$1.carthage = {
    towgs84: "-263.0,6.0,431.0",
    ellipse: "clark80",
    datumName: "Carthage 1934 Tunisia"
  };

  exports$1.hermannskogel = {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Hermannskogel"
  };

  exports$1.militargeographische_institut = {
    towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
    ellipse: "bessel",
    datumName: "Militar-Geographische Institut"
  };

  exports$1.osni52 = {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "airy",
    datumName: "Irish National"
  };

  exports$1.ire65 = {
    towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
    ellipse: "mod_airy",
    datumName: "Ireland 1965"
  };

  exports$1.rassadiran = {
    towgs84: "-133.63,-157.5,-158.62",
    ellipse: "intl",
    datumName: "Rassadiran"
  };

  exports$1.nzgd49 = {
    towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
    ellipse: "intl",
    datumName: "New Zealand Geodetic Datum 1949"
  };

  exports$1.osgb36 = {
    towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
    ellipse: "airy",
    datumName: "Airy 1830"
  };

  exports$1.s_jtsk = {
    towgs84: "589,76,480",
    ellipse: 'bessel',
    datumName: 'S-JTSK (Ferro)'
  };

  exports$1.beduaram = {
    towgs84: '-106,-87,188',
    ellipse: 'clrk80',
    datumName: 'Beduaram'
  };

  exports$1.gunung_segara = {
    towgs84: '-403,684,41',
    ellipse: 'bessel',
    datumName: 'Gunung Segara Jakarta'
  };

  exports$1.rnb72 = {
    towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
    ellipse: "intl",
    datumName: "Reseau National Belge 1972"
  };

  function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
    var out = {};

    if (datumCode === undefined || datumCode === 'none') {
      out.datum_type = PJD_NODATUM;
    } else {
      out.datum_type = PJD_WGS84;
    }

    if (datum_params) {
      out.datum_params = datum_params.map(parseFloat);
      if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
        out.datum_type = PJD_3PARAM;
      }
      if (out.datum_params.length > 3) {
        if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
          out.datum_type = PJD_7PARAM;
          out.datum_params[3] *= SEC_TO_RAD;
          out.datum_params[4] *= SEC_TO_RAD;
          out.datum_params[5] *= SEC_TO_RAD;
          out.datum_params[6] = (out.datum_params[6] / 1000000.0) + 1.0;
        }
      }
    }

    if (nadgrids) {
      out.datum_type = PJD_GRIDSHIFT;
      out.grids = nadgrids;
    }
    out.a = a; //datum object also uses these values
    out.b = b;
    out.es = es;
    out.ep2 = ep2;
    return out;
  }

  /**
   * Resources for details of NTv2 file formats:
   * - https://web.archive.org/web/20140127204822if_/http://www.mgs.gov.on.ca:80/stdprodconsume/groups/content/@mgs/@iandit/documents/resourcelist/stel02_047447.pdf
   * - http://mimaka.com/help/gs/html/004_NTV2%20Data%20Format.htm
   */

  var loadedNadgrids = {};

  /**
   * Load a binary NTv2 file (.gsb) to a key that can be used in a proj string like +nadgrids=<key>. Pass the NTv2 file
   * as an ArrayBuffer.
   */
  function nadgrid(key, data) {
    var view = new DataView(data);
    var isLittleEndian = detectLittleEndian(view);
    var header = readHeader(view, isLittleEndian);
    var subgrids = readSubgrids(view, header, isLittleEndian);
    var nadgrid = {header: header, subgrids: subgrids};
    loadedNadgrids[key] = nadgrid;
    return nadgrid;
  }

  /**
   * Given a proj4 value for nadgrids, return an array of loaded grids
   */
  function getNadgrids(nadgrids) {
    // Format details: http://proj.maptools.org/gen_parms.html
    if (nadgrids === undefined) { return null; }
    var grids = nadgrids.split(',');
    return grids.map(parseNadgridString);
  }

  function parseNadgridString(value) {
    if (value.length === 0) {
      return null;
    }
    var optional = value[0] === '@';
    if (optional) {
      value = value.slice(1);
    }
    if (value === 'null') {
      return {name: 'null', mandatory: !optional, grid: null, isNull: true};
    }
    return {
      name: value,
      mandatory: !optional,
      grid: loadedNadgrids[value] || null,
      isNull: false
    };
  }

  function secondsToRadians(seconds) {
    return (seconds / 3600) * Math.PI / 180;
  }

  function detectLittleEndian(view) {
    var nFields = view.getInt32(8, false);
    if (nFields === 11) {
      return false;
    }
    nFields = view.getInt32(8, true);
    if (nFields !== 11) {
      console.warn('Failed to detect nadgrid endian-ness, defaulting to little-endian');
    }
    return true;
  }

  function readHeader(view, isLittleEndian) {
    return {
      nFields: view.getInt32(8, isLittleEndian),
      nSubgridFields: view.getInt32(24, isLittleEndian),
      nSubgrids: view.getInt32(40, isLittleEndian),
      shiftType: decodeString(view, 56, 56 + 8).trim(),
      fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
      fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
      toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
      toSemiMinorAxis: view.getFloat64(168, isLittleEndian),
    };
  }

  function decodeString(view, start, end) {
    return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start, end)));
  }

  function readSubgrids(view, header, isLittleEndian) {
    var gridOffset = 176;
    var grids = [];
    for (var i = 0; i < header.nSubgrids; i++) {
      var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
      var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian);
      var lngColumnCount = Math.round(
        1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval);
      var latColumnCount = Math.round(
        1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval);
      // Proj4 operates on radians whereas the coordinates are in seconds in the grid
      grids.push({
        ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
        del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
        lim: [lngColumnCount, latColumnCount],
        count: subHeader.gridNodeCount,
        cvs: mapNodes(nodes)
      });
      gridOffset += 176 + subHeader.gridNodeCount * 16;
    }
    return grids;
  }

  function mapNodes(nodes) {
    return nodes.map(function (r) {return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];});
  }

  function readGridHeader(view, offset, isLittleEndian) {
    return {
      name: decodeString(view, offset + 8, offset + 16).trim(),
      parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
      lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
      upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
      lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
      upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
      latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
      longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
      gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
    };
  }

  function readGridNodes(view, offset, gridHeader, isLittleEndian) {
    var nodesOffset = offset + 176;
    var gridRecordLength = 16;
    var gridShiftRecords = [];
    for (var i = 0; i < gridHeader.gridNodeCount; i++) {
      var record = {
        latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
        longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian),
        latitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian),
        longitudeAccuracy: view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian),
      };
      gridShiftRecords.push(record);
    }
    return gridShiftRecords;
  }

  function Projection(srsCode,callback) {
    if (!(this instanceof Projection)) {
      return new Projection(srsCode);
    }
    callback = callback || function(error){
      if(error){
        throw error;
      }
    };
    var json = parse(srsCode);
    if(typeof json !== 'object'){
      callback(srsCode);
      return;
    }
    var ourProj = Projection.projections.get(json.projName);
    if(!ourProj){
      callback(srsCode);
      return;
    }
    if (json.datumCode && json.datumCode !== 'none') {
      var datumDef = match(exports$1, json.datumCode);
      if (datumDef) {
        json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(',') : null);
        json.ellps = datumDef.ellipse;
        json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
      }
    }
    json.k0 = json.k0 || 1.0;
    json.axis = json.axis || 'enu';
    json.ellps = json.ellps || 'wgs84';
    json.lat1 = json.lat1 || json.lat0; // Lambert_Conformal_Conic_1SP, for example, needs this

    var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
    var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
    var nadgrids = getNadgrids(json.nadgrids);
    var datumObj = json.datum || datum(json.datumCode, json.datum_params, sphere_.a, sphere_.b, ecc.es, ecc.ep2,
      nadgrids);

    extend(this, json); // transfer everything over from the projection because we don't know what we'll need
    extend(this, ourProj); // transfer all the methods from the projection

    // copy the 4 things over we calculated in deriveConstants.sphere
    this.a = sphere_.a;
    this.b = sphere_.b;
    this.rf = sphere_.rf;
    this.sphere = sphere_.sphere;

    // copy the 3 things we calculated in deriveConstants.eccentricity
    this.es = ecc.es;
    this.e = ecc.e;
    this.ep2 = ecc.ep2;

    // add in the datum object
    this.datum = datumObj;

    // init the projection
    this.init();

    // legecy callback from back in the day when it went to spatialreference.org
    callback(null, this);

  }
  Projection.projections = projections;
  Projection.projections.start();

  function compareDatums(source, dest) {
    if (source.datum_type !== dest.datum_type) {
      return false; // false, datums are not equal
    } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 0.000000000050) {
      // the tolerance for es is to ensure that GRS80 and WGS84
      // are considered identical
      return false;
    } else if (source.datum_type === PJD_3PARAM) {
      return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2]);
    } else if (source.datum_type === PJD_7PARAM) {
      return (source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6]);
    } else {
      return true; // datums are equal
    }
  } // cs_compare_datums()

  /*
   * The function Convert_Geodetic_To_Geocentric converts geodetic coordinates
   * (latitude, longitude, and height) to geocentric coordinates (X, Y, Z),
   * according to the current ellipsoid parameters.
   *
   *    Latitude  : Geodetic latitude in radians                     (input)
   *    Longitude : Geodetic longitude in radians                    (input)
   *    Height    : Geodetic height, in meters                       (input)
   *    X         : Calculated Geocentric X coordinate, in meters    (output)
   *    Y         : Calculated Geocentric Y coordinate, in meters    (output)
   *    Z         : Calculated Geocentric Z coordinate, in meters    (output)
   *
   */
  function geodeticToGeocentric(p, es, a) {
    var Longitude = p.x;
    var Latitude = p.y;
    var Height = p.z ? p.z : 0; //Z value not always supplied

    var Rn; /*  Earth radius at location  */
    var Sin_Lat; /*  Math.sin(Latitude)  */
    var Sin2_Lat; /*  Square of Math.sin(Latitude)  */
    var Cos_Lat; /*  Math.cos(Latitude)  */

    /*
     ** Don't blow up if Latitude is just a little out of the value
     ** range as it may just be a rounding issue.  Also removed longitude
     ** test, it should be wrapped by Math.cos() and Math.sin().  NFW for PROJ.4, Sep/2001.
     */
    if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
      Latitude = -HALF_PI;
    } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
      Latitude = HALF_PI;
    } else if (Latitude < -HALF_PI) {
      /* Latitude out of range */
      //..reportError('geocent:lat out of range:' + Latitude);
      return { x: -Infinity, y: -Infinity, z: p.z };
    } else if (Latitude > HALF_PI) {
      /* Latitude out of range */
      return { x: Infinity, y: Infinity, z: p.z };
    }

    if (Longitude > Math.PI) {
      Longitude -= (2 * Math.PI);
    }
    Sin_Lat = Math.sin(Latitude);
    Cos_Lat = Math.cos(Latitude);
    Sin2_Lat = Sin_Lat * Sin_Lat;
    Rn = a / (Math.sqrt(1.0e0 - es * Sin2_Lat));
    return {
      x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
      y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
      z: ((Rn * (1 - es)) + Height) * Sin_Lat
    };
  } // cs_geodetic_to_geocentric()

  function geocentricToGeodetic(p, es, a, b) {
    /* local defintions and variables */
    /* end-criterium of loop, accuracy of sin(Latitude) */
    var genau = 1e-12;
    var genau2 = (genau * genau);
    var maxiter = 30;

    var P; /* distance between semi-minor axis and location */
    var RR; /* distance between center and location */
    var CT; /* sin of geocentric latitude */
    var ST; /* cos of geocentric latitude */
    var RX;
    var RK;
    var RN; /* Earth radius at location */
    var CPHI0; /* cos of start or old geodetic latitude in iterations */
    var SPHI0; /* sin of start or old geodetic latitude in iterations */
    var CPHI; /* cos of searched geodetic latitude */
    var SPHI; /* sin of searched geodetic latitude */
    var SDPHI; /* end-criterium: addition-theorem of sin(Latitude(iter)-Latitude(iter-1)) */
    var iter; /* # of continous iteration, max. 30 is always enough (s.a.) */

    var X = p.x;
    var Y = p.y;
    var Z = p.z ? p.z : 0.0; //Z value not always supplied
    var Longitude;
    var Latitude;
    var Height;

    P = Math.sqrt(X * X + Y * Y);
    RR = Math.sqrt(X * X + Y * Y + Z * Z);

    /*      special cases for latitude and longitude */
    if (P / a < genau) {

      /*  special case, if P=0. (X=0., Y=0.) */
      Longitude = 0.0;

      /*  if (X,Y,Z)=(0.,0.,0.) then Height becomes semi-minor axis
       *  of ellipsoid (=center of mass), Latitude becomes PI/2 */
      if (RR / a < genau) {
        Latitude = HALF_PI;
        Height = -b;
        return {
          x: p.x,
          y: p.y,
          z: p.z
        };
      }
    } else {
      /*  ellipsoidal (geodetic) longitude
       *  interval: -PI < Longitude <= +PI */
      Longitude = Math.atan2(Y, X);
    }

    /* --------------------------------------------------------------
     * Following iterative algorithm was developped by
     * "Institut for Erdmessung", University of Hannover, July 1988.
     * Internet: www.ife.uni-hannover.de
     * Iterative computation of CPHI,SPHI and Height.
     * Iteration of CPHI and SPHI to 10**-12 radian resp.
     * 2*10**-7 arcsec.
     * --------------------------------------------------------------
     */
    CT = Z / RR;
    ST = P / RR;
    RX = 1.0 / Math.sqrt(1.0 - es * (2.0 - es) * ST * ST);
    CPHI0 = ST * (1.0 - es) * RX;
    SPHI0 = CT * RX;
    iter = 0;

    /* loop to find sin(Latitude) resp. Latitude
     * until |sin(Latitude(iter)-Latitude(iter-1))| < genau */
    do {
      iter++;
      RN = a / Math.sqrt(1.0 - es * SPHI0 * SPHI0);

      /*  ellipsoidal (geodetic) height */
      Height = P * CPHI0 + Z * SPHI0 - RN * (1.0 - es * SPHI0 * SPHI0);

      RK = es * RN / (RN + Height);
      RX = 1.0 / Math.sqrt(1.0 - RK * (2.0 - RK) * ST * ST);
      CPHI = ST * (1.0 - RK) * RX;
      SPHI = CT * RX;
      SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
      CPHI0 = CPHI;
      SPHI0 = SPHI;
    }
    while (SDPHI * SDPHI > genau2 && iter < maxiter);

    /*      ellipsoidal (geodetic) latitude */
    Latitude = Math.atan(SPHI / Math.abs(CPHI));
    return {
      x: Longitude,
      y: Latitude,
      z: Height
    };
  } // cs_geocentric_to_geodetic()

  /****************************************************************/
  // pj_geocentic_to_wgs84( p )
  //  p = point to transform in geocentric coordinates (x,y,z)


  /** point object, nothing fancy, just allows values to be
      passed back and forth by reference rather than by value.
      Other point classes may be used as long as they have
      x and y properties, which will get modified in the transform method.
  */
  function geocentricToWgs84(p, datum_type, datum_params) {

    if (datum_type === PJD_3PARAM) {
      // if( x[io] === HUGE_VAL )
      //    continue;
      return {
        x: p.x + datum_params[0],
        y: p.y + datum_params[1],
        z: p.z + datum_params[2],
      };
    } else if (datum_type === PJD_7PARAM) {
      var Dx_BF = datum_params[0];
      var Dy_BF = datum_params[1];
      var Dz_BF = datum_params[2];
      var Rx_BF = datum_params[3];
      var Ry_BF = datum_params[4];
      var Rz_BF = datum_params[5];
      var M_BF = datum_params[6];
      // if( x[io] === HUGE_VAL )
      //    continue;
      return {
        x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
        y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
        z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
      };
    }
  } // cs_geocentric_to_wgs84

  /****************************************************************/
  // pj_geocentic_from_wgs84()
  //  coordinate system definition,
  //  point to transform in geocentric coordinates (x,y,z)
  function geocentricFromWgs84(p, datum_type, datum_params) {

    if (datum_type === PJD_3PARAM) {
      //if( x[io] === HUGE_VAL )
      //    continue;
      return {
        x: p.x - datum_params[0],
        y: p.y - datum_params[1],
        z: p.z - datum_params[2],
      };

    } else if (datum_type === PJD_7PARAM) {
      var Dx_BF = datum_params[0];
      var Dy_BF = datum_params[1];
      var Dz_BF = datum_params[2];
      var Rx_BF = datum_params[3];
      var Ry_BF = datum_params[4];
      var Rz_BF = datum_params[5];
      var M_BF = datum_params[6];
      var x_tmp = (p.x - Dx_BF) / M_BF;
      var y_tmp = (p.y - Dy_BF) / M_BF;
      var z_tmp = (p.z - Dz_BF) / M_BF;
      //if( x[io] === HUGE_VAL )
      //    continue;

      return {
        x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
        y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
        z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
      };
    } //cs_geocentric_from_wgs84()
  }

  function checkParams(type) {
    return (type === PJD_3PARAM || type === PJD_7PARAM);
  }

  function datum_transform(source, dest, point) {
    // Short cut if the datums are identical.
    if (compareDatums(source, dest)) {
      return point; // in this case, zero is sucess,
      // whereas cs_compare_datums returns 1 to indicate TRUE
      // confusing, should fix this
    }

    // Explicitly skip datum transform by setting 'datum=none' as parameter for either source or dest
    if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
      return point;
    }

    // If this datum requires grid shifts, then apply it to geodetic coordinates.
    var source_a = source.a;
    var source_es = source.es;
    if (source.datum_type === PJD_GRIDSHIFT) {
      var gridShiftCode = applyGridShift(source, false, point);
      if (gridShiftCode !== 0) {
        return undefined;
      }
      source_a = SRS_WGS84_SEMIMAJOR;
      source_es = SRS_WGS84_ESQUARED;
    }

    var dest_a = dest.a;
    var dest_b = dest.b;
    var dest_es = dest.es;
    if (dest.datum_type === PJD_GRIDSHIFT) {
      dest_a = SRS_WGS84_SEMIMAJOR;
      dest_b = SRS_WGS84_SEMIMINOR;
      dest_es = SRS_WGS84_ESQUARED;
    }

    // Do we need to go through geocentric coordinates?
    if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) &&  !checkParams(dest.datum_type)) {
      return point;
    }

    // Convert to geocentric coordinates.
    point = geodeticToGeocentric(point, source_es, source_a);
    // Convert between datums
    if (checkParams(source.datum_type)) {
      point = geocentricToWgs84(point, source.datum_type, source.datum_params);
    }
    if (checkParams(dest.datum_type)) {
      point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
    }
    point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);

    if (dest.datum_type === PJD_GRIDSHIFT) {
      var destGridShiftResult = applyGridShift(dest, true, point);
      if (destGridShiftResult !== 0) {
        return undefined;
      }
    }

    return point;
  }

  function applyGridShift(source, inverse, point) {
    if (source.grids === null || source.grids.length === 0) {
      console.log('Grid shift grids not found');
      return -1;
    }
    var input = {x: -point.x, y: point.y};
    var output = {x: Number.NaN, y: Number.NaN};
    var attemptedGrids = [];
    outer:
    for (var i = 0; i < source.grids.length; i++) {
      var grid = source.grids[i];
      attemptedGrids.push(grid.name);
      if (grid.isNull) {
        output = input;
        break;
      }
      grid.mandatory;
      if (grid.grid === null) {
        if (grid.mandatory) {
          console.log("Unable to find mandatory grid '" + grid.name + "'");
          return -1;
        }
        continue;
      }
      var subgrids = grid.grid.subgrids;
      for (var j = 0, jj = subgrids.length; j < jj; j++) {
        var subgrid = subgrids[j];
        // skip tables that don't match our point at all
        var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 10000.0;
        var minX = subgrid.ll[0] - epsilon;
        var minY = subgrid.ll[1] - epsilon;
        var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
        var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
        if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x ) {
          continue;
        }
        output = applySubgridShift(input, inverse, subgrid);
        if (!isNaN(output.x)) {
          break outer;
        }
      }
    }
    if (isNaN(output.x)) {
      console.log("Failed to find a grid shift table for location '"+
        -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
      return -1;
    }
    point.x = -output.x;
    point.y = output.y;
    return 0;
  }

  function applySubgridShift(pin, inverse, ct) {
    var val = {x: Number.NaN, y: Number.NaN};
    if (isNaN(pin.x)) { return val; }
    var tb = {x: pin.x, y: pin.y};
    tb.x -= ct.ll[0];
    tb.y -= ct.ll[1];
    tb.x = adjust_lon(tb.x - Math.PI) + Math.PI;
    var t = nadInterpolate(tb, ct);
    if (inverse) {
      if (isNaN(t.x)) {
        return val;
      }
      t.x = tb.x - t.x;
      t.y = tb.y - t.y;
      var i = 9, tol = 1e-12;
      var dif, del;
      do {
        del = nadInterpolate(t, ct);
        if (isNaN(del.x)) {
          console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
          break;
        }
        dif = {x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y)};
        t.x += dif.x;
        t.y += dif.y;
      } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
      if (i < 0) {
        console.log("Inverse grid shift iterator failed to converge.");
        return val;
      }
      val.x = adjust_lon(t.x + ct.ll[0]);
      val.y = t.y + ct.ll[1];
    } else {
      if (!isNaN(t.x)) {
        val.x = pin.x + t.x;
        val.y = pin.y + t.y;
      }
    }
    return val;
  }

  function nadInterpolate(pin, ct) {
    var t = {x: pin.x / ct.del[0], y: pin.y / ct.del[1]};
    var indx = {x: Math.floor(t.x), y: Math.floor(t.y)};
    var frct = {x: t.x - 1.0 * indx.x, y: t.y - 1.0 * indx.y};
    var val= {x: Number.NaN, y: Number.NaN};
    var inx;
    if (indx.x < 0 || indx.x >= ct.lim[0]) {
      return val;
    }
    if (indx.y < 0 || indx.y >= ct.lim[1]) {
      return val;
    }
    inx = (indx.y * ct.lim[0]) + indx.x;
    var f00 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
    inx++;
    var f10= {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
    inx += ct.lim[0];
    var f11 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
    inx--;
    var f01 = {x: ct.cvs[inx][0], y: ct.cvs[inx][1]};
    var m11 = frct.x * frct.y, m10 = frct.x * (1.0 - frct.y),
      m00 = (1.0 - frct.x) * (1.0 - frct.y), m01 = (1.0 - frct.x) * frct.y;
    val.x = (m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x);
    val.y = (m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y);
    return val;
  }

  function adjust_axis(crs, denorm, point) {
    var xin = point.x,
      yin = point.y,
      zin = point.z || 0.0;
    var v, t, i;
    var out = {};
    for (i = 0; i < 3; i++) {
      if (denorm && i === 2 && point.z === undefined) {
        continue;
      }
      if (i === 0) {
        v = xin;
        if ("ew".indexOf(crs.axis[i]) !== -1) {
          t = 'x';
        } else {
          t = 'y';
        }

      }
      else if (i === 1) {
        v = yin;
        if ("ns".indexOf(crs.axis[i]) !== -1) {
          t = 'y';
        } else {
          t = 'x';
        }
      }
      else {
        v = zin;
        t = 'z';
      }
      switch (crs.axis[i]) {
      case 'e':
        out[t] = v;
        break;
      case 'w':
        out[t] = -v;
        break;
      case 'n':
        out[t] = v;
        break;
      case 's':
        out[t] = -v;
        break;
      case 'u':
        if (point[t] !== undefined) {
          out.z = v;
        }
        break;
      case 'd':
        if (point[t] !== undefined) {
          out.z = -v;
        }
        break;
      default:
        //console.log("ERROR: unknow axis ("+crs.axis[i]+") - check definition of "+crs.projName);
        return null;
      }
    }
    return out;
  }

  function common (array){
    var out = {
      x: array[0],
      y: array[1]
    };
    if (array.length>2) {
      out.z = array[2];
    }
    if (array.length>3) {
      out.m = array[3];
    }
    return out;
  }

  function checkSanity (point) {
    checkCoord(point.x);
    checkCoord(point.y);
  }
  function checkCoord(num) {
    if (typeof Number.isFinite === 'function') {
      if (Number.isFinite(num)) {
        return;
      }
      throw new TypeError('coordinates must be finite numbers');
    }
    if (typeof num !== 'number' || num !== num || !isFinite(num)) {
      throw new TypeError('coordinates must be finite numbers');
    }
  }

  function checkNotWGS(source, dest) {
    return (
      (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== 'WGS84') ||
      ((dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== 'WGS84');
  }

  function transform(source, dest, point, enforceAxis) {
    var wgs84;
    if (Array.isArray(point)) {
      point = common(point);
    } else {
      // Clone the point object so inputs don't get modified
      point = {
        x: point.x,
        y: point.y,
        z: point.z,
        m: point.m
      };
    }
    var hasZ = point.z !== undefined;
    checkSanity(point);
    // Workaround for datum shifts towgs84, if either source or destination projection is not wgs84
    if (source.datum && dest.datum && checkNotWGS(source, dest)) {
      wgs84 = new Projection('WGS84');
      point = transform(source, wgs84, point, enforceAxis);
      source = wgs84;
    }
    // DGR, 2010/11/12
    if (enforceAxis && source.axis !== 'enu') {
      point = adjust_axis(source, false, point);
    }
    // Transform source points to long/lat, if they aren't already.
    if (source.projName === 'longlat') {
      point = {
        x: point.x * D2R$1,
        y: point.y * D2R$1,
        z: point.z || 0
      };
    } else {
      if (source.to_meter) {
        point = {
          x: point.x * source.to_meter,
          y: point.y * source.to_meter,
          z: point.z || 0
        };
      }
      point = source.inverse(point); // Convert Cartesian to longlat
      if (!point) {
        return;
      }
    }
    // Adjust for the prime meridian if necessary
    if (source.from_greenwich) {
      point.x += source.from_greenwich;
    }

    // Convert datums if needed, and if possible.
    point = datum_transform(source.datum, dest.datum, point);
    if (!point) {
      return;
    }

    // Adjust for the prime meridian if necessary
    if (dest.from_greenwich) {
      point = {
        x: point.x - dest.from_greenwich,
        y: point.y,
        z: point.z || 0
      };
    }

    if (dest.projName === 'longlat') {
      // convert radians to decimal degrees
      point = {
        x: point.x * R2D,
        y: point.y * R2D,
        z: point.z || 0
      };
    } else { // else project
      point = dest.forward(point);
      if (dest.to_meter) {
        point = {
          x: point.x / dest.to_meter,
          y: point.y / dest.to_meter,
          z: point.z || 0
        };
      }
    }

    // DGR, 2010/11/12
    if (enforceAxis && dest.axis !== 'enu') {
      return adjust_axis(dest, true, point);
    }

    if (point && !hasZ) {
      delete point.z;
    }
    return point;
  }

  var wgs84 = Projection('WGS84');

  function transformer(from, to, coords, enforceAxis) {
    var transformedArray, out, keys;
    if (Array.isArray(coords)) {
      transformedArray = transform(from, to, coords, enforceAxis) || {x: NaN, y: NaN};
      if (coords.length > 2) {
        if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
          if (typeof transformedArray.z === 'number') {
            return [transformedArray.x, transformedArray.y, transformedArray.z].concat(coords.splice(3));
          } else {
            return [transformedArray.x, transformedArray.y, coords[2]].concat(coords.splice(3));
          }
        } else {
          return [transformedArray.x, transformedArray.y].concat(coords.splice(2));
        }
      } else {
        return [transformedArray.x, transformedArray.y];
      }
    } else {
      out = transform(from, to, coords, enforceAxis);
      keys = Object.keys(coords);
      if (keys.length === 2) {
        return out;
      }
      keys.forEach(function (key) {
        if ((typeof from.name !== 'undefined' && from.name === 'geocent') || (typeof to.name !== 'undefined' && to.name === 'geocent')) {
          if (key === 'x' || key === 'y' || key === 'z') {
            return;
          }
        } else {
          if (key === 'x' || key === 'y') {
            return;
          }
        }
        out[key] = coords[key];
      });
      return out;
    }
  }

  function checkProj(item) {
    if (item instanceof Projection) {
      return item;
    }
    if (item.oProj) {
      return item.oProj;
    }
    return Projection(item);
  }

  function proj4(fromProj, toProj, coord) {
    fromProj = checkProj(fromProj);
    var single = false;
    var obj;
    if (typeof toProj === 'undefined') {
      toProj = fromProj;
      fromProj = wgs84;
      single = true;
    } else if (typeof toProj.x !== 'undefined' || Array.isArray(toProj)) {
      coord = toProj;
      toProj = fromProj;
      fromProj = wgs84;
      single = true;
    }
    toProj = checkProj(toProj);
    if (coord) {
      return transformer(fromProj, toProj, coord);
    } else {
      obj = {
        forward: function (coords, enforceAxis) {
          return transformer(fromProj, toProj, coords, enforceAxis);
        },
        inverse: function (coords, enforceAxis) {
          return transformer(toProj, fromProj, coords, enforceAxis);
        }
      };
      if (single) {
        obj.oProj = toProj;
      }
      return obj;
    }
  }

  /**
   * UTM zones are grouped, and assigned to one of a group of 6
   * sets.
   *
   * {int} @private
   */
  var NUM_100K_SETS = 6;

  /**
   * The column letters (for easting) of the lower left value, per
   * set.
   *
   * {string} @private
   */
  var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

  /**
   * The row letters (for northing) of the lower left value, per
   * set.
   *
   * {string} @private
   */
  var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

  var A = 65; // A
  var I = 73; // I
  var O = 79; // O
  var V = 86; // V
  var Z = 90; // Z
  var mgrs = {
    forward: forward$u,
    inverse: inverse$u,
    toPoint: toPoint
  };
  /**
   * Conversion of lat/lon to MGRS.
   *
   * @param {object} ll Object literal with lat and lon properties on a
   *     WGS84 ellipsoid.
   * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
   *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
   * @return {string} the MGRS string for the given location and accuracy.
   */
  function forward$u(ll, accuracy) {
    accuracy = accuracy || 5; // default accuracy 1m
    return encode(LLtoUTM({
      lat: ll[1],
      lon: ll[0]
    }), accuracy);
  }
  /**
   * Conversion of MGRS to lat/lon.
   *
   * @param {string} mgrs MGRS string.
   * @return {array} An array with left (longitude), bottom (latitude), right
   *     (longitude) and top (latitude) values in WGS84, representing the
   *     bounding box for the provided MGRS reference.
   */
  function inverse$u(mgrs) {
    var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
    if (bbox.lat && bbox.lon) {
      return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
    }
    return [bbox.left, bbox.bottom, bbox.right, bbox.top];
  }
  function toPoint(mgrs) {
    var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
    if (bbox.lat && bbox.lon) {
      return [bbox.lon, bbox.lat];
    }
    return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
  }/**
   * Conversion from degrees to radians.
   *
   * @private
   * @param {number} deg the angle in degrees.
   * @return {number} the angle in radians.
   */
  function degToRad(deg) {
    return (deg * (Math.PI / 180.0));
  }

  /**
   * Conversion from radians to degrees.
   *
   * @private
   * @param {number} rad the angle in radians.
   * @return {number} the angle in degrees.
   */
  function radToDeg(rad) {
    return (180.0 * (rad / Math.PI));
  }

  /**
   * Converts a set of Longitude and Latitude co-ordinates to UTM
   * using the WGS84 ellipsoid.
   *
   * @private
   * @param {object} ll Object literal with lat and lon properties
   *     representing the WGS84 coordinate to be converted.
   * @return {object} Object literal containing the UTM value with easting,
   *     northing, zoneNumber and zoneLetter properties, and an optional
   *     accuracy property in digits. Returns null if the conversion failed.
   */
  function LLtoUTM(ll) {
    var Lat = ll.lat;
    var Long = ll.lon;
    var a = 6378137.0; //ellip.radius;
    var eccSquared = 0.00669438; //ellip.eccsq;
    var k0 = 0.9996;
    var LongOrigin;
    var eccPrimeSquared;
    var N, T, C, A, M;
    var LatRad = degToRad(Lat);
    var LongRad = degToRad(Long);
    var LongOriginRad;
    var ZoneNumber;
    // (int)
    ZoneNumber = Math.floor((Long + 180) / 6) + 1;

    //Make sure the longitude 180.00 is in Zone 60
    if (Long === 180) {
      ZoneNumber = 60;
    }

    // Special zone for Norway
    if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
      ZoneNumber = 32;
    }

    // Special zones for Svalbard
    if (Lat >= 72.0 && Lat < 84.0) {
      if (Long >= 0.0 && Long < 9.0) {
        ZoneNumber = 31;
      }
      else if (Long >= 9.0 && Long < 21.0) {
        ZoneNumber = 33;
      }
      else if (Long >= 21.0 && Long < 33.0) {
        ZoneNumber = 35;
      }
      else if (Long >= 33.0 && Long < 42.0) {
        ZoneNumber = 37;
      }
    }

    LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
    // in middle of
    // zone
    LongOriginRad = degToRad(LongOrigin);

    eccPrimeSquared = (eccSquared) / (1 - eccSquared);

    N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
    T = Math.tan(LatRad) * Math.tan(LatRad);
    C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
    A = Math.cos(LatRad) * (LongRad - LongOriginRad);

    M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

    var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

    var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
    if (Lat < 0.0) {
      UTMNorthing += 10000000.0; //10000000 meter offset for
      // southern hemisphere
    }

    return {
      northing: Math.round(UTMNorthing),
      easting: Math.round(UTMEasting),
      zoneNumber: ZoneNumber,
      zoneLetter: getLetterDesignator(Lat)
    };
  }

  /**
   * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
   * class where the Zone can be specified as a single string eg."60N" which
   * is then broken down into the ZoneNumber and ZoneLetter.
   *
   * @private
   * @param {object} utm An object literal with northing, easting, zoneNumber
   *     and zoneLetter properties. If an optional accuracy property is
   *     provided (in meters), a bounding box will be returned instead of
   *     latitude and longitude.
   * @return {object} An object literal containing either lat and lon values
   *     (if no accuracy was provided), or top, right, bottom and left values
   *     for the bounding box calculated according to the provided accuracy.
   *     Returns null if the conversion failed.
   */
  function UTMtoLL(utm) {

    var UTMNorthing = utm.northing;
    var UTMEasting = utm.easting;
    var zoneLetter = utm.zoneLetter;
    var zoneNumber = utm.zoneNumber;
    // check the ZoneNummber is valid
    if (zoneNumber < 0 || zoneNumber > 60) {
      return null;
    }

    var k0 = 0.9996;
    var a = 6378137.0; //ellip.radius;
    var eccSquared = 0.00669438; //ellip.eccsq;
    var eccPrimeSquared;
    var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
    var N1, T1, C1, R1, D, M;
    var LongOrigin;
    var mu, phi1Rad;

    // remove 500,000 meter offset for longitude
    var x = UTMEasting - 500000.0;
    var y = UTMNorthing;

    // We must know somehow if we are in the Northern or Southern
    // hemisphere, this is the only time we use the letter So even
    // if the Zone letter isn't exactly correct it should indicate
    // the hemisphere correctly
    if (zoneLetter < 'N') {
      y -= 10000000.0; // remove 10,000,000 meter offset used
      // for southern hemisphere
    }

    // There are 60 zones with zone 1 being at West -180 to -174
    LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
    // in middle of
    // zone

    eccPrimeSquared = (eccSquared) / (1 - eccSquared);

    M = y / k0;
    mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

    phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
    // double phi1 = ProjMath.radToDeg(phi1Rad);

    N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
    T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
    C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
    R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
    D = x / (N1 * k0);

    var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
    lat = radToDeg(lat);

    var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
    lon = LongOrigin + radToDeg(lon);

    var result;
    if (utm.accuracy) {
      var topRight = UTMtoLL({
        northing: utm.northing + utm.accuracy,
        easting: utm.easting + utm.accuracy,
        zoneLetter: utm.zoneLetter,
        zoneNumber: utm.zoneNumber
      });
      result = {
        top: topRight.lat,
        right: topRight.lon,
        bottom: lat,
        left: lon
      };
    }
    else {
      result = {
        lat: lat,
        lon: lon
      };
    }
    return result;
  }

  /**
   * Calculates the MGRS letter designator for the given latitude.
   *
   * @private
   * @param {number} lat The latitude in WGS84 to get the letter designator
   *     for.
   * @return {char} The letter designator.
   */
  function getLetterDesignator(lat) {
    //This is here as an error flag to show that the Latitude is
    //outside MGRS limits
    var LetterDesignator = 'Z';

    if ((84 >= lat) && (lat >= 72)) {
      LetterDesignator = 'X';
    }
    else if ((72 > lat) && (lat >= 64)) {
      LetterDesignator = 'W';
    }
    else if ((64 > lat) && (lat >= 56)) {
      LetterDesignator = 'V';
    }
    else if ((56 > lat) && (lat >= 48)) {
      LetterDesignator = 'U';
    }
    else if ((48 > lat) && (lat >= 40)) {
      LetterDesignator = 'T';
    }
    else if ((40 > lat) && (lat >= 32)) {
      LetterDesignator = 'S';
    }
    else if ((32 > lat) && (lat >= 24)) {
      LetterDesignator = 'R';
    }
    else if ((24 > lat) && (lat >= 16)) {
      LetterDesignator = 'Q';
    }
    else if ((16 > lat) && (lat >= 8)) {
      LetterDesignator = 'P';
    }
    else if ((8 > lat) && (lat >= 0)) {
      LetterDesignator = 'N';
    }
    else if ((0 > lat) && (lat >= -8)) {
      LetterDesignator = 'M';
    }
    else if ((-8 > lat) && (lat >= -16)) {
      LetterDesignator = 'L';
    }
    else if ((-16 > lat) && (lat >= -24)) {
      LetterDesignator = 'K';
    }
    else if ((-24 > lat) && (lat >= -32)) {
      LetterDesignator = 'J';
    }
    else if ((-32 > lat) && (lat >= -40)) {
      LetterDesignator = 'H';
    }
    else if ((-40 > lat) && (lat >= -48)) {
      LetterDesignator = 'G';
    }
    else if ((-48 > lat) && (lat >= -56)) {
      LetterDesignator = 'F';
    }
    else if ((-56 > lat) && (lat >= -64)) {
      LetterDesignator = 'E';
    }
    else if ((-64 > lat) && (lat >= -72)) {
      LetterDesignator = 'D';
    }
    else if ((-72 > lat) && (lat >= -80)) {
      LetterDesignator = 'C';
    }
    return LetterDesignator;
  }

  /**
   * Encodes a UTM location as MGRS string.
   *
   * @private
   * @param {object} utm An object literal with easting, northing,
   *     zoneLetter, zoneNumber
   * @param {number} accuracy Accuracy in digits (1-5).
   * @return {string} MGRS string for the given UTM location.
   */
  function encode(utm, accuracy) {
    // prepend with leading zeroes
    var seasting = "00000" + utm.easting,
      snorthing = "00000" + utm.northing;

    return utm.zoneNumber + utm.zoneLetter + get100kID(utm.easting, utm.northing, utm.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
  }

  /**
   * Get the two letter 100k designator for a given UTM easting,
   * northing and zone number value.
   *
   * @private
   * @param {number} easting
   * @param {number} northing
   * @param {number} zoneNumber
   * @return the two letter 100k designator for the given UTM location.
   */
  function get100kID(easting, northing, zoneNumber) {
    var setParm = get100kSetForZone(zoneNumber);
    var setColumn = Math.floor(easting / 100000);
    var setRow = Math.floor(northing / 100000) % 20;
    return getLetter100kID(setColumn, setRow, setParm);
  }

  /**
   * Given a UTM zone number, figure out the MGRS 100K set it is in.
   *
   * @private
   * @param {number} i An UTM zone number.
   * @return {number} the 100k set the UTM zone is in.
   */
  function get100kSetForZone(i) {
    var setParm = i % NUM_100K_SETS;
    if (setParm === 0) {
      setParm = NUM_100K_SETS;
    }

    return setParm;
  }

  /**
   * Get the two-letter MGRS 100k designator given information
   * translated from the UTM northing, easting and zone number.
   *
   * @private
   * @param {number} column the column index as it relates to the MGRS
   *        100k set spreadsheet, created from the UTM easting.
   *        Values are 1-8.
   * @param {number} row the row index as it relates to the MGRS 100k set
   *        spreadsheet, created from the UTM northing value. Values
   *        are from 0-19.
   * @param {number} parm the set block, as it relates to the MGRS 100k set
   *        spreadsheet, created from the UTM zone. Values are from
   *        1-60.
   * @return two letter MGRS 100k code.
   */
  function getLetter100kID(column, row, parm) {
    // colOrigin and rowOrigin are the letters at the origin of the set
    var index = parm - 1;
    var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
    var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

    // colInt and rowInt are the letters to build to return
    var colInt = colOrigin + column - 1;
    var rowInt = rowOrigin + row;
    var rollover = false;

    if (colInt > Z) {
      colInt = colInt - Z + A - 1;
      rollover = true;
    }

    if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
      colInt++;
    }

    if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
      colInt++;

      if (colInt === I) {
        colInt++;
      }
    }

    if (colInt > Z) {
      colInt = colInt - Z + A - 1;
    }

    if (rowInt > V) {
      rowInt = rowInt - V + A - 1;
      rollover = true;
    }
    else {
      rollover = false;
    }

    if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
      rowInt++;
    }

    if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
      rowInt++;

      if (rowInt === I) {
        rowInt++;
      }
    }

    if (rowInt > V) {
      rowInt = rowInt - V + A - 1;
    }

    var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
    return twoLetter;
  }

  /**
   * Decode the UTM parameters from a MGRS string.
   *
   * @private
   * @param {string} mgrsString an UPPERCASE coordinate string is expected.
   * @return {object} An object literal with easting, northing, zoneLetter,
   *     zoneNumber and accuracy (in meters) properties.
   */
  function decode(mgrsString) {

    if (mgrsString && mgrsString.length === 0) {
      throw ("MGRSPoint coverting from nothing");
    }

    var length = mgrsString.length;

    var hunK = null;
    var sb = "";
    var testChar;
    var i = 0;

    // get Zone number
    while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
      if (i >= 2) {
        throw ("MGRSPoint bad conversion from: " + mgrsString);
      }
      sb += testChar;
      i++;
    }

    var zoneNumber = parseInt(sb, 10);

    if (i === 0 || i + 3 > length) {
      // A good MGRS string has to be 4-5 digits long,
      // ##AAA/#AAA at least.
      throw ("MGRSPoint bad conversion from: " + mgrsString);
    }

    var zoneLetter = mgrsString.charAt(i++);

    // Should we check the zone letter here? Why not.
    if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
      throw ("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
    }

    hunK = mgrsString.substring(i, i += 2);

    var set = get100kSetForZone(zoneNumber);

    var east100k = getEastingFromChar(hunK.charAt(0), set);
    var north100k = getNorthingFromChar(hunK.charAt(1), set);

    // We have a bug where the northing may be 2000000 too low.
    // How
    // do we know when to roll over?

    while (north100k < getMinNorthing(zoneLetter)) {
      north100k += 2000000;
    }

    // calculate the char index for easting/northing separator
    var remainder = length - i;

    if (remainder % 2 !== 0) {
      throw ("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
    }

    var sep = remainder / 2;

    var sepEasting = 0.0;
    var sepNorthing = 0.0;
    var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
    if (sep > 0) {
      accuracyBonus = 100000.0 / Math.pow(10, sep);
      sepEastingString = mgrsString.substring(i, i + sep);
      sepEasting = parseFloat(sepEastingString) * accuracyBonus;
      sepNorthingString = mgrsString.substring(i + sep);
      sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
    }

    easting = sepEasting + east100k;
    northing = sepNorthing + north100k;

    return {
      easting: easting,
      northing: northing,
      zoneLetter: zoneLetter,
      zoneNumber: zoneNumber,
      accuracy: accuracyBonus
    };
  }

  /**
   * Given the first letter from a two-letter MGRS 100k zone, and given the
   * MGRS table set for the zone number, figure out the easting value that
   * should be added to the other, secondary easting value.
   *
   * @private
   * @param {char} e The first letter from a two-letter MGRS 100´k zone.
   * @param {number} set The MGRS table set for the zone number.
   * @return {number} The easting value for the given letter and set.
   */
  function getEastingFromChar(e, set) {
    // colOrigin is the letter at the origin of the set for the
    // column
    var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
    var eastingValue = 100000.0;
    var rewindMarker = false;

    while (curCol !== e.charCodeAt(0)) {
      curCol++;
      if (curCol === I) {
        curCol++;
      }
      if (curCol === O) {
        curCol++;
      }
      if (curCol > Z) {
        if (rewindMarker) {
          throw ("Bad character: " + e);
        }
        curCol = A;
        rewindMarker = true;
      }
      eastingValue += 100000.0;
    }

    return eastingValue;
  }

  /**
   * Given the second letter from a two-letter MGRS 100k zone, and given the
   * MGRS table set for the zone number, figure out the northing value that
   * should be added to the other, secondary northing value. You have to
   * remember that Northings are determined from the equator, and the vertical
   * cycle of letters mean a 2000000 additional northing meters. This happens
   * approx. every 18 degrees of latitude. This method does *NOT* count any
   * additional northings. You have to figure out how many 2000000 meters need
   * to be added for the zone letter of the MGRS coordinate.
   *
   * @private
   * @param {char} n Second letter of the MGRS 100k zone
   * @param {number} set The MGRS table set number, which is dependent on the
   *     UTM zone number.
   * @return {number} The northing value for the given letter and set.
   */
  function getNorthingFromChar(n, set) {

    if (n > 'V') {
      throw ("MGRSPoint given invalid Northing " + n);
    }

    // rowOrigin is the letter at the origin of the set for the
    // column
    var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
    var northingValue = 0.0;
    var rewindMarker = false;

    while (curRow !== n.charCodeAt(0)) {
      curRow++;
      if (curRow === I) {
        curRow++;
      }
      if (curRow === O) {
        curRow++;
      }
      // fixing a bug making whole application hang in this loop
      // when 'n' is a wrong character
      if (curRow > V) {
        if (rewindMarker) { // making sure that this loop ends
          throw ("Bad character: " + n);
        }
        curRow = A;
        rewindMarker = true;
      }
      northingValue += 100000.0;
    }

    return northingValue;
  }

  /**
   * The function getMinNorthing returns the minimum northing value of a MGRS
   * zone.
   *
   * Ported from Geotrans' c Lattitude_Band_Value structure table.
   *
   * @private
   * @param {char} zoneLetter The MGRS zone to get the min northing for.
   * @return {number}
   */
  function getMinNorthing(zoneLetter) {
    var northing;
    switch (zoneLetter) {
    case 'C':
      northing = 1100000.0;
      break;
    case 'D':
      northing = 2000000.0;
      break;
    case 'E':
      northing = 2800000.0;
      break;
    case 'F':
      northing = 3700000.0;
      break;
    case 'G':
      northing = 4600000.0;
      break;
    case 'H':
      northing = 5500000.0;
      break;
    case 'J':
      northing = 6400000.0;
      break;
    case 'K':
      northing = 7300000.0;
      break;
    case 'L':
      northing = 8200000.0;
      break;
    case 'M':
      northing = 9100000.0;
      break;
    case 'N':
      northing = 0.0;
      break;
    case 'P':
      northing = 800000.0;
      break;
    case 'Q':
      northing = 1700000.0;
      break;
    case 'R':
      northing = 2600000.0;
      break;
    case 'S':
      northing = 3500000.0;
      break;
    case 'T':
      northing = 4400000.0;
      break;
    case 'U':
      northing = 5300000.0;
      break;
    case 'V':
      northing = 6200000.0;
      break;
    case 'W':
      northing = 7000000.0;
      break;
    case 'X':
      northing = 7900000.0;
      break;
    default:
      northing = -1.0;
    }
    if (northing >= 0.0) {
      return northing;
    }
    else {
      throw ("Invalid zone letter: " + zoneLetter);
    }

  }

  function Point(x, y, z) {
    if (!(this instanceof Point)) {
      return new Point(x, y, z);
    }
    if (Array.isArray(x)) {
      this.x = x[0];
      this.y = x[1];
      this.z = x[2] || 0.0;
    } else if(typeof x === 'object') {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z || 0.0;
    } else if (typeof x === 'string' && typeof y === 'undefined') {
      var coords = x.split(',');
      this.x = parseFloat(coords[0], 10);
      this.y = parseFloat(coords[1], 10);
      this.z = parseFloat(coords[2], 10) || 0.0;
    } else {
      this.x = x;
      this.y = y;
      this.z = z || 0.0;
    }
    console.warn('proj4.Point will be removed in version 3, use proj4.toPoint');
  }

  Point.fromMGRS = function(mgrsStr) {
    return new Point(toPoint(mgrsStr));
  };
  Point.prototype.toMGRS = function(accuracy) {
    return forward$u([this.x, this.y], accuracy);
  };

  var C00 = 1;
  var C02 = 0.25;
  var C04 = 0.046875;
  var C06 = 0.01953125;
  var C08 = 0.01068115234375;
  var C22 = 0.75;
  var C44 = 0.46875;
  var C46 = 0.01302083333333333333;
  var C48 = 0.00712076822916666666;
  var C66 = 0.36458333333333333333;
  var C68 = 0.00569661458333333333;
  var C88 = 0.3076171875;

  function pj_enfn(es) {
    var en = [];
    en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
    en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
    var t = es * es;
    en[2] = t * (C44 - es * (C46 + es * C48));
    t *= es;
    en[3] = t * (C66 - es * C68);
    en[4] = t * es * C88;
    return en;
  }

  function pj_mlfn(phi, sphi, cphi, en) {
    cphi *= sphi;
    sphi *= sphi;
    return (en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4]))));
  }

  var MAX_ITER$3 = 20;

  function pj_inv_mlfn(arg, es, en) {
    var k = 1 / (1 - es);
    var phi = arg;
    for (var i = MAX_ITER$3; i; --i) { /* rarely goes over 2 iterations */
      var s = Math.sin(phi);
      var t = 1 - es * s * s;
      //t = this.pj_mlfn(phi, s, Math.cos(phi), en) - arg;
      //phi -= t * (t * Math.sqrt(t)) * k;
      t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
      phi -= t;
      if (Math.abs(t) < EPSLN) {
        return phi;
      }
    }
    //..reportError("cass:pj_inv_mlfn: Convergence error");
    return phi;
  }

  // Heavily based on this tmerc projection implementation
  // https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/tmerc.js


  function init$u() {
    this.x0 = this.x0 !== undefined ? this.x0 : 0;
    this.y0 = this.y0 !== undefined ? this.y0 : 0;
    this.long0 = this.long0 !== undefined ? this.long0 : 0;
    this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

    if (this.es) {
      this.en = pj_enfn(this.es);
      this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
    }
  }

  /**
      Transverse Mercator Forward  - long/lat to x/y
      long/lat in radians
    */
  function forward$t(p) {
    var lon = p.x;
    var lat = p.y;

    var delta_lon = adjust_lon(lon - this.long0);
    var con;
    var x, y;
    var sin_phi = Math.sin(lat);
    var cos_phi = Math.cos(lat);

    if (!this.es) {
      var b = cos_phi * Math.sin(delta_lon);

      if ((Math.abs(Math.abs(b) - 1)) < EPSLN) {
        return (93);
      }
      else {
        x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
        y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
        b = Math.abs(y);

        if (b >= 1) {
          if ((b - 1) > EPSLN) {
            return (93);
          }
          else {
            y = 0;
          }
        }
        else {
          y = Math.acos(y);
        }

        if (lat < 0) {
          y = -y;
        }

        y = this.a * this.k0 * (y - this.lat0) + this.y0;
      }
    }
    else {
      var al = cos_phi * delta_lon;
      var als = Math.pow(al, 2);
      var c = this.ep2 * Math.pow(cos_phi, 2);
      var cs = Math.pow(c, 2);
      var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
      var t = Math.pow(tq, 2);
      var ts = Math.pow(t, 2);
      con = 1 - this.es * Math.pow(sin_phi, 2);
      al = al / Math.sqrt(con);
      var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en);

      x = this.a * (this.k0 * al * (1 +
        als / 6 * (1 - t + c +
        als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c +
        als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) +
        this.x0;

      y = this.a * (this.k0 * (ml - this.ml0 +
        sin_phi * delta_lon * al / 2 * (1 +
        als / 12 * (5 - t + 9 * c + 4 * cs +
        als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c +
        als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) +
        this.y0;
    }

    p.x = x;
    p.y = y;

    return p;
  }

  /**
      Transverse Mercator Inverse  -  x/y to long/lat
    */
  function inverse$t(p) {
    var con, phi;
    var lat, lon;
    var x = (p.x - this.x0) * (1 / this.a);
    var y = (p.y - this.y0) * (1 / this.a);

    if (!this.es) {
      var f = Math.exp(x / this.k0);
      var g = 0.5 * (f - 1 / f);
      var temp = this.lat0 + y / this.k0;
      var h = Math.cos(temp);
      con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
      lat = Math.asin(con);

      if (y < 0) {
        lat = -lat;
      }

      if ((g === 0) && (h === 0)) {
        lon = 0;
      }
      else {
        lon = adjust_lon(Math.atan2(g, h) + this.long0);
      }
    }
    else { // ellipsoidal form
      con = this.ml0 + y / this.k0;
      phi = pj_inv_mlfn(con, this.es, this.en);

      if (Math.abs(phi) < HALF_PI) {
        var sin_phi = Math.sin(phi);
        var cos_phi = Math.cos(phi);
        var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
        var c = this.ep2 * Math.pow(cos_phi, 2);
        var cs = Math.pow(c, 2);
        var t = Math.pow(tan_phi, 2);
        var ts = Math.pow(t, 2);
        con = 1 - this.es * Math.pow(sin_phi, 2);
        var d = x * Math.sqrt(con) / this.k0;
        var ds = Math.pow(d, 2);
        con = con * tan_phi;

        lat = phi - (con * ds / (1 - this.es)) * 0.5 * (1 -
          ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs -
          ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c -
          ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));

        lon = adjust_lon(this.long0 + (d * (1 -
          ds / 6 * (1 + 2 * t + c -
          ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c -
          ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi));
      }
      else {
        lat = HALF_PI * sign(y);
        lon = 0;
      }
    }

    p.x = lon;
    p.y = lat;

    return p;
  }

  var names$u = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
  var tmerc = {
    init: init$u,
    forward: forward$t,
    inverse: inverse$t,
    names: names$u
  };

  function sinh(x) {
    var r = Math.exp(x);
    r = (r - 1 / r) / 2;
    return r;
  }

  function hypot(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    var a = Math.max(x, y);
    var b = Math.min(x, y) / (a ? a : 1);

    return a * Math.sqrt(1 + Math.pow(b, 2));
  }

  function log1py(x) {
    var y = 1 + x;
    var z = y - 1;

    return z === 0 ? x : x * Math.log(y) / z;
  }

  function asinhy(x) {
    var y = Math.abs(x);
    y = log1py(y * (1 + y / (hypot(1, y) + 1)));

    return x < 0 ? -y : y;
  }

  function gatg(pp, B) {
    var cos_2B = 2 * Math.cos(2 * B);
    var i = pp.length - 1;
    var h1 = pp[i];
    var h2 = 0;
    var h;

    while (--i >= 0) {
      h = -h2 + cos_2B * h1 + pp[i];
      h2 = h1;
      h1 = h;
    }

    return (B + h * Math.sin(2 * B));
  }

  function clens(pp, arg_r) {
    var r = 2 * Math.cos(arg_r);
    var i = pp.length - 1;
    var hr1 = pp[i];
    var hr2 = 0;
    var hr;

    while (--i >= 0) {
      hr = -hr2 + r * hr1 + pp[i];
      hr2 = hr1;
      hr1 = hr;
    }

    return Math.sin(arg_r) * hr;
  }

  function cosh(x) {
    var r = Math.exp(x);
    r = (r + 1 / r) / 2;
    return r;
  }

  function clens_cmplx(pp, arg_r, arg_i) {
    var sin_arg_r = Math.sin(arg_r);
    var cos_arg_r = Math.cos(arg_r);
    var sinh_arg_i = sinh(arg_i);
    var cosh_arg_i = cosh(arg_i);
    var r = 2 * cos_arg_r * cosh_arg_i;
    var i = -2 * sin_arg_r * sinh_arg_i;
    var j = pp.length - 1;
    var hr = pp[j];
    var hi1 = 0;
    var hr1 = 0;
    var hi = 0;
    var hr2;
    var hi2;

    while (--j >= 0) {
      hr2 = hr1;
      hi2 = hi1;
      hr1 = hr;
      hi1 = hi;
      hr = -hr2 + r * hr1 - i * hi1 + pp[j];
      hi = -hi2 + i * hr1 + r * hi1;
    }

    r = sin_arg_r * cosh_arg_i;
    i = cos_arg_r * sinh_arg_i;

    return [r * hr - i * hi, r * hi + i * hr];
  }

  // Heavily based on this etmerc projection implementation
  // https://github.com/mbloch/mapshaper-proj/blob/master/src/projections/etmerc.js


  function init$t() {
    if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
      throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
    }
    if (this.approx) {
      // When '+approx' is set, use tmerc instead
      tmerc.init.apply(this);
      this.forward = tmerc.forward;
      this.inverse = tmerc.inverse;
    }

    this.x0 = this.x0 !== undefined ? this.x0 : 0;
    this.y0 = this.y0 !== undefined ? this.y0 : 0;
    this.long0 = this.long0 !== undefined ? this.long0 : 0;
    this.lat0 = this.lat0 !== undefined ? this.lat0 : 0;

    this.cgb = [];
    this.cbg = [];
    this.utg = [];
    this.gtu = [];

    var f = this.es / (1 + Math.sqrt(1 - this.es));
    var n = f / (2 - f);
    var np = n;

    this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675 ))))));
    this.cbg[0] = n * (-2 + n * ( 2 / 3 + n * ( 4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));

    np = np * n;
    this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
    this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * ( -13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));

    np = np * n;
    this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
    this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));

    np = np * n;
    this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
    this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * ( -24832 / 14175)));

    np = np * n;
    this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
    this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));

    np = np * n;
    this.cgb[5] = np * (601676 / 22275);
    this.cbg[5] = np * (444337 / 155925);

    np = Math.pow(n, 2);
    this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));

    this.utg[0] = n * (-0.5 + n * ( 2 / 3 + n * (-37 / 96 + n * ( 1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
    this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));

    this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
    this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));

    np = np * n;
    this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720 ))));
    this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));

    np = np * n;
    this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
    this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));

    np = np * n;
    this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
    this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));

    np = np * n;
    this.utg[5] = np * (-20648693 / 638668800);
    this.gtu[5] = np * (212378941 / 319334400);

    var Z = gatg(this.cbg, this.lat0);
    this.Zb = -this.Qn * (Z + clens(this.gtu, 2 * Z));
  }

  function forward$s(p) {
    var Ce = adjust_lon(p.x - this.long0);
    var Cn = p.y;

    Cn = gatg(this.cbg, Cn);
    var sin_Cn = Math.sin(Cn);
    var cos_Cn = Math.cos(Cn);
    var sin_Ce = Math.sin(Ce);
    var cos_Ce = Math.cos(Ce);

    Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
    Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce));
    Ce = asinhy(Math.tan(Ce));

    var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);

    Cn = Cn + tmp[0];
    Ce = Ce + tmp[1];

    var x;
    var y;

    if (Math.abs(Ce) <= 2.623395162778) {
      x = this.a * (this.Qn * Ce) + this.x0;
      y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
    }
    else {
      x = Infinity;
      y = Infinity;
    }

    p.x = x;
    p.y = y;

    return p;
  }

  function inverse$s(p) {
    var Ce = (p.x - this.x0) * (1 / this.a);
    var Cn = (p.y - this.y0) * (1 / this.a);

    Cn = (Cn - this.Zb) / this.Qn;
    Ce = Ce / this.Qn;

    var lon;
    var lat;

    if (Math.abs(Ce) <= 2.623395162778) {
      var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);

      Cn = Cn + tmp[0];
      Ce = Ce + tmp[1];
      Ce = Math.atan(sinh(Ce));

      var sin_Cn = Math.sin(Cn);
      var cos_Cn = Math.cos(Cn);
      var sin_Ce = Math.sin(Ce);
      var cos_Ce = Math.cos(Ce);

      Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn));
      Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);

      lon = adjust_lon(Ce + this.long0);
      lat = gatg(this.cgb, Cn);
    }
    else {
      lon = Infinity;
      lat = Infinity;
    }

    p.x = lon;
    p.y = lat;

    return p;
  }

  var names$t = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
  var etmerc = {
    init: init$t,
    forward: forward$s,
    inverse: inverse$s,
    names: names$t
  };

  function adjust_zone(zone, lon) {
    if (zone === undefined) {
      zone = Math.floor((adjust_lon(lon) + Math.PI) * 30 / Math.PI) + 1;

      if (zone < 0) {
        return 0;
      } else if (zone > 60) {
        return 60;
      }
    }
    return zone;
  }

  var dependsOn = 'etmerc';


  function init$s() {
    var zone = adjust_zone(this.zone, this.long0);
    if (zone === undefined) {
      throw new Error('unknown utm zone');
    }
    this.lat0 = 0;
    this.long0 =  ((6 * Math.abs(zone)) - 183) * D2R$1;
    this.x0 = 500000;
    this.y0 = this.utmSouth ? 10000000 : 0;
    this.k0 = 0.9996;

    etmerc.init.apply(this);
    this.forward = etmerc.forward;
    this.inverse = etmerc.inverse;
  }

  var names$s = ["Universal Transverse Mercator System", "utm"];
  var utm = {
    init: init$s,
    names: names$s,
    dependsOn: dependsOn
  };

  function srat(esinp, exp) {
    return (Math.pow((1 - esinp) / (1 + esinp), exp));
  }

  var MAX_ITER$2 = 20;

  function init$r() {
    var sphi = Math.sin(this.lat0);
    var cphi = Math.cos(this.lat0);
    cphi *= cphi;
    this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
    this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
    this.phic0 = Math.asin(sphi / this.C);
    this.ratexp = 0.5 * this.C * this.e;
    this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
  }

  function forward$r(p) {
    var lon = p.x;
    var lat = p.y;

    p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
    p.x = this.C * lon;
    return p;
  }

  function inverse$r(p) {
    var DEL_TOL = 1e-14;
    var lon = p.x / this.C;
    var lat = p.y;
    var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
    for (var i = MAX_ITER$2; i > 0; --i) {
      lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), - 0.5 * this.e)) - HALF_PI;
      if (Math.abs(lat - p.y) < DEL_TOL) {
        break;
      }
      p.y = lat;
    }
    /* convergence failed */
    if (!i) {
      return null;
    }
    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$r = ["gauss"];
  var gauss = {
    init: init$r,
    forward: forward$r,
    inverse: inverse$r,
    names: names$r
  };

  function init$q() {
    gauss.init.apply(this);
    if (!this.rc) {
      return;
    }
    this.sinc0 = Math.sin(this.phic0);
    this.cosc0 = Math.cos(this.phic0);
    this.R2 = 2 * this.rc;
    if (!this.title) {
      this.title = "Oblique Stereographic Alternative";
    }
  }

  function forward$q(p) {
    var sinc, cosc, cosl, k;
    p.x = adjust_lon(p.x - this.long0);
    gauss.forward.apply(this, [p]);
    sinc = Math.sin(p.y);
    cosc = Math.cos(p.y);
    cosl = Math.cos(p.x);
    k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
    p.x = k * cosc * Math.sin(p.x);
    p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
    p.x = this.a * p.x + this.x0;
    p.y = this.a * p.y + this.y0;
    return p;
  }

  function inverse$q(p) {
    var sinc, cosc, lon, lat, rho;
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    p.x /= this.k0;
    p.y /= this.k0;
    if ((rho = hypot(p.x, p.y))) {
      var c = 2 * Math.atan2(rho, this.R2);
      sinc = Math.sin(c);
      cosc = Math.cos(c);
      lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
      lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
    }
    else {
      lat = this.phic0;
      lon = 0;
    }

    p.x = lon;
    p.y = lat;
    gauss.inverse.apply(this, [p]);
    p.x = adjust_lon(p.x + this.long0);
    return p;
  }

  var names$q = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea","Oblique Stereographic Alternative","Double_Stereographic"];
  var sterea = {
    init: init$q,
    forward: forward$q,
    inverse: inverse$q,
    names: names$q
  };

  function ssfn_(phit, sinphi, eccen) {
    sinphi *= eccen;
    return (Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen));
  }

  function init$p() {

    // setting default parameters
    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.lat0 = this.lat0 || 0;
    this.long0 = this.long0 || 0;

    this.coslat0 = Math.cos(this.lat0);
    this.sinlat0 = Math.sin(this.lat0);
    if (this.sphere) {
      if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
        this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
      }
    }
    else {
      if (Math.abs(this.coslat0) <= EPSLN) {
        if (this.lat0 > 0) {
          //North pole
          //trace('stere:north pole');
          this.con = 1;
        }
        else {
          //South pole
          //trace('stere:south pole');
          this.con = -1;
        }
      }
      this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
      if (this.k0 === 1 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
        // When k0 is 1 (default value) and lat_ts is a vaild number and lat0 is at a pole and lat_ts is not at a pole
        // Recalculate k0 using formula 21-35 from p161 of Snyder, 1987
        this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
      }
      this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
      this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
      this.cosX0 = Math.cos(this.X0);
      this.sinX0 = Math.sin(this.X0);
    }
  }

  // Stereographic forward equations--mapping lat,long to x,y
  function forward$p(p) {
    var lon = p.x;
    var lat = p.y;
    var sinlat = Math.sin(lat);
    var coslat = Math.cos(lat);
    var A, X, sinX, cosX, ts, rh;
    var dlon = adjust_lon(lon - this.long0);

    if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
      //case of the origine point
      //trace('stere:this is the origin point');
      p.x = NaN;
      p.y = NaN;
      return p;
    }
    if (this.sphere) {
      //trace('stere:sphere case');
      A = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
      p.x = this.a * A * coslat * Math.sin(dlon) + this.x0;
      p.y = this.a * A * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
      return p;
    }
    else {
      X = 2 * Math.atan(this.ssfn_(lat, sinlat, this.e)) - HALF_PI;
      cosX = Math.cos(X);
      sinX = Math.sin(X);
      if (Math.abs(this.coslat0) <= EPSLN) {
        ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
        rh = 2 * this.a * this.k0 * ts / this.cons;
        p.x = this.x0 + rh * Math.sin(lon - this.long0);
        p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
        //trace(p.toString());
        return p;
      }
      else if (Math.abs(this.sinlat0) < EPSLN) {
        //Eq
        //trace('stere:equateur');
        A = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
        p.y = A * sinX;
      }
      else {
        //other case
        //trace('stere:normal case');
        A = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
        p.y = A * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
      }
      p.x = A * cosX * Math.sin(dlon) + this.x0;
    }
    //trace(p.toString());
    return p;
  }

  //* Stereographic inverse equations--mapping x,y to lat/long
  function inverse$p(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var lon, lat, ts, ce, Chi;
    var rh = Math.sqrt(p.x * p.x + p.y * p.y);
    if (this.sphere) {
      var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
      lon = this.long0;
      lat = this.lat0;
      if (rh <= EPSLN) {
        p.x = lon;
        p.y = lat;
        return p;
      }
      lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
      if (Math.abs(this.coslat0) < EPSLN) {
        if (this.lat0 > 0) {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
        }
        else {
          lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
        }
      }
      else {
        lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)));
      }
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      if (Math.abs(this.coslat0) <= EPSLN) {
        if (rh <= EPSLN) {
          lat = this.lat0;
          lon = this.long0;
          p.x = lon;
          p.y = lat;
          //trace(p.toString());
          return p;
        }
        p.x *= this.con;
        p.y *= this.con;
        ts = rh * this.cons / (2 * this.a * this.k0);
        lat = this.con * phi2z(this.e, ts);
        lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, - 1 * p.y));
      }
      else {
        ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
        lon = this.long0;
        if (rh <= EPSLN) {
          Chi = this.X0;
        }
        else {
          Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
          lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)));
        }
        lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
      }
    }
    p.x = lon;
    p.y = lat;

    //trace(p.toString());
    return p;

  }

  var names$p = ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)", "Polar_Stereographic"];
  var stere = {
    init: init$p,
    forward: forward$p,
    inverse: inverse$p,
    names: names$p,
    ssfn_: ssfn_
  };

  /*
    references:
      Formules et constantes pour le Calcul pour la
      projection cylindrique conforme à axe oblique et pour la transformation entre
      des systèmes de référence.
      http://www.swisstopo.admin.ch/internet/swisstopo/fr/home/topics/survey/sys/refsys/switzerland.parsysrelated1.31216.downloadList.77004.DownloadFile.tmp/swissprojectionfr.pdf
    */

  function init$o() {
    var phy0 = this.lat0;
    this.lambda0 = this.long0;
    var sinPhy0 = Math.sin(phy0);
    var semiMajorAxis = this.a;
    var invF = this.rf;
    var flattening = 1 / invF;
    var e2 = 2 * flattening - Math.pow(flattening, 2);
    var e = this.e = Math.sqrt(e2);
    this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
    this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
    this.b0 = Math.asin(sinPhy0 / this.alpha);
    var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
    var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
    var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
    this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
  }

  function forward$o(p) {
    var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
    var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
    var S = -this.alpha * (Sa1 + Sa2) + this.K;

    // spheric latitude
    var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);

    // spheric longitude
    var I = this.alpha * (p.x - this.lambda0);

    // psoeudo equatorial rotation
    var rotI = Math.atan(Math.sin(I) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I)));

    var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I));

    p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
    p.x = this.R * rotI + this.x0;
    return p;
  }

  function inverse$o(p) {
    var Y = p.x - this.x0;
    var X = p.y - this.y0;

    var rotI = Y / this.R;
    var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);

    var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
    var I = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));

    var lambda = this.lambda0 + I / this.alpha;

    var S = 0;
    var phy = b;
    var prevPhy = -1000;
    var iteration = 0;
    while (Math.abs(phy - prevPhy) > 0.0000001) {
      if (++iteration > 20) {
        //...reportError("omercFwdInfinity");
        return;
      }
      //S = Math.log(Math.tan(Math.PI / 4 + phy / 2));
      S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
      prevPhy = phy;
      phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
    }

    p.x = lambda;
    p.y = phy;
    return p;
  }

  var names$o = ["somerc"];
  var somerc = {
    init: init$o,
    forward: forward$o,
    inverse: inverse$o,
    names: names$o
  };

  var TOL = 1e-7;

  function isTypeA(P) {
    var typeAProjections = ['Hotine_Oblique_Mercator','Hotine_Oblique_Mercator_Azimuth_Natural_Origin'];
    var projectionName = typeof P.PROJECTION === "object" ? Object.keys(P.PROJECTION)[0] : P.PROJECTION;
    
    return 'no_uoff' in P || 'no_off' in P || typeAProjections.indexOf(projectionName) !== -1;
  }


  /* Initialize the Oblique Mercator  projection
      ------------------------------------------*/
  function init$n() {  
    var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0,
      gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
    
    // only Type A uses the no_off or no_uoff property
    // https://github.com/OSGeo/proj.4/issues/104
    this.no_off = isTypeA(this);
    this.no_rot = 'no_rot' in this;
    
    var alp = false;
    if ("alpha" in this) {
      alp = true;
    }

    var gam = false;
    if ("rectified_grid_angle" in this) {
      gam = true;
    }

    if (alp) {
      alpha_c = this.alpha;
    }
    
    if (gam) {
      gamma = (this.rectified_grid_angle * D2R$1);
    }
    
    if (alp || gam) {
      lamc = this.longc;
    } else {
      lam1 = this.long1;
      phi1 = this.lat1;
      lam2 = this.long2;
      phi2 = this.lat2;
      
      if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL ||
          Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL ||
          Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
        throw new Error();
      }
    }
    
    var one_es = 1.0 - this.es;
    com = Math.sqrt(one_es);
    
    if (Math.abs(this.lat0) > EPSLN) {
      sinph0 = Math.sin(this.lat0);
      cosph0 = Math.cos(this.lat0);
      con = 1 - this.es * sinph0 * sinph0;
      this.B = cosph0 * cosph0;
      this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
      this.A = this.B * this.k0 * com / con;
      D = this.B * com / (cosph0 * Math.sqrt(con));
      F = D * D -1;
      
      if (F <= 0) {
        F = 0;
      } else {
        F = Math.sqrt(F);
        if (this.lat0 < 0) {
          F = -F;
        }
      }
      
      this.E = F += D;
      this.E *= Math.pow(tsfnz(this.e, this.lat0, sinph0), this.B);
    } else {
      this.B = 1 / com;
      this.A = this.k0;
      this.E = D = F = 1;
    }
    
    if (alp || gam) {
      if (alp) {
        gamma0 = Math.asin(Math.sin(alpha_c) / D);
        if (!gam) {
          gamma = alpha_c;
        }
      } else {
        gamma0 = gamma;
        alpha_c = Math.asin(D * Math.sin(gamma0));
      }
      this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
    } else {
      H = Math.pow(tsfnz(this.e, phi1, Math.sin(phi1)), this.B);
      L = Math.pow(tsfnz(this.e, phi2, Math.sin(phi2)), this.B);
      F = this.E / H;
      p = (L - H) / (L + H);
      J = this.E * this.E;
      J = (J - L * H) / (J + L * H);
      con = lam1 - lam2;
      
      if (con < -Math.pi) {
        lam2 -=TWO_PI;
      } else if (con > Math.pi) {
        lam2 += TWO_PI;
      }
      
      this.lam0 = adjust_lon(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B);
      gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon(lam1 - this.lam0)) / (F - 1 / F));
      gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
    }
    
    this.singam = Math.sin(gamma0);
    this.cosgam = Math.cos(gamma0);
    this.sinrot = Math.sin(gamma);
    this.cosrot = Math.cos(gamma);
    
    this.rB = 1 / this.B;
    this.ArB = this.A * this.rB;
    this.BrA = 1 / this.ArB;
    this.A * this.B;
    
    if (this.no_off) {
      this.u_0 = 0;
    } else {
      this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
      
      if (this.lat0 < 0) {
        this.u_0 = - this.u_0;
      }  
    }
      
    F = 0.5 * gamma0;
    this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
    this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
  }


  /* Oblique Mercator forward equations--mapping lat,long to x,y
      ----------------------------------------------------------*/
  function forward$n(p) {
    var coords = {};
    var S, T, U, V, W, temp, u, v;
    p.x = p.x - this.lam0;
    
    if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
      W = this.E / Math.pow(tsfnz(this.e, p.y, Math.sin(p.y)), this.B);
      
      temp = 1 / W;
      S = 0.5 * (W - temp);
      T = 0.5 * (W + temp);
      V = Math.sin(this.B * p.x);
      U = (S * this.singam - V * this.cosgam) / T;
          
      if (Math.abs(Math.abs(U) - 1.0) < EPSLN) {
        throw new Error();
      }
      
      v = 0.5 * this.ArB * Math.log((1 - U)/(1 + U));
      temp = Math.cos(this.B * p.x);
      
      if (Math.abs(temp) < TOL) {
        u = this.A * p.x;
      } else {
        u = this.ArB * Math.atan2((S * this.cosgam + V * this.singam), temp);
      }    
    } else {
      v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
      u = this.ArB * p.y;
    }
       
    if (this.no_rot) {
      coords.x = u;
      coords.y = v;
    } else {
      u -= this.u_0;
      coords.x = v * this.cosrot + u * this.sinrot;
      coords.y = u * this.cosrot - v * this.sinrot;
    }
    
    coords.x = (this.a * coords.x + this.x0);
    coords.y = (this.a * coords.y + this.y0);
    
    return coords;
  }

  function inverse$n(p) {
    var u, v, Qp, Sp, Tp, Vp, Up;
    var coords = {};
    
    p.x = (p.x - this.x0) * (1.0 / this.a);
    p.y = (p.y - this.y0) * (1.0 / this.a);

    if (this.no_rot) {
      v = p.y;
      u = p.x;
    } else {
      v = p.x * this.cosrot - p.y * this.sinrot;
      u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
    }
    
    Qp = Math.exp(-this.BrA * v);
    Sp = 0.5 * (Qp - 1 / Qp);
    Tp = 0.5 * (Qp + 1 / Qp);
    Vp = Math.sin(this.BrA * u);
    Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
    
    if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
      coords.x = 0;
      coords.y = Up < 0 ? -HALF_PI : HALF_PI;
    } else {
      coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
      coords.y = phi2z(this.e, Math.pow(coords.y, 1 / this.B));
      
      if (coords.y === Infinity) {
        throw new Error();
      }
          
      coords.x = -this.rB * Math.atan2((Sp * this.cosgam - Vp * this.singam), Math.cos(this.BrA * u));
    }
    
    coords.x += this.lam0;
    
    return coords;
  }

  var names$n = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
  var omerc = {
    init: init$n,
    forward: forward$n,
    inverse: inverse$n,
    names: names$n
  };

  function init$m() {
    
    //double lat0;                    /* the reference latitude               */
    //double long0;                   /* the reference longitude              */
    //double lat1;                    /* first standard parallel              */
    //double lat2;                    /* second standard parallel             */
    //double r_maj;                   /* major axis                           */
    //double r_min;                   /* minor axis                           */
    //double false_east;              /* x offset in meters                   */
    //double false_north;             /* y offset in meters                   */
    
    //the above value can be set with proj4.defs
    //example: proj4.defs("EPSG:2154","+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

    if (!this.lat2) {
      this.lat2 = this.lat1;
    } //if lat2 is not defined
    if (!this.k0) {
      this.k0 = 1;
    }
    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    // Standard Parallels cannot be equal and on opposite sides of the equator
    if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
      return;
    }

    var temp = this.b / this.a;
    this.e = Math.sqrt(1 - temp * temp);

    var sin1 = Math.sin(this.lat1);
    var cos1 = Math.cos(this.lat1);
    var ms1 = msfnz(this.e, sin1, cos1);
    var ts1 = tsfnz(this.e, this.lat1, sin1);

    var sin2 = Math.sin(this.lat2);
    var cos2 = Math.cos(this.lat2);
    var ms2 = msfnz(this.e, sin2, cos2);
    var ts2 = tsfnz(this.e, this.lat2, sin2);

    var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));

    if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
      this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
    }
    else {
      this.ns = sin1;
    }
    if (isNaN(this.ns)) {
      this.ns = sin1;
    }
    this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
    this.rh = this.a * this.f0 * Math.pow(ts0, this.ns);
    if (!this.title) {
      this.title = "Lambert Conformal Conic";
    }
  }

  // Lambert Conformal conic forward equations--mapping lat,long to x,y
  // -----------------------------------------------------------------
  function forward$m(p) {

    var lon = p.x;
    var lat = p.y;

    // singular cases :
    if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
      lat = sign(lat) * (HALF_PI - 2 * EPSLN);
    }

    var con = Math.abs(Math.abs(lat) - HALF_PI);
    var ts, rh1;
    if (con > EPSLN) {
      ts = tsfnz(this.e, lat, Math.sin(lat));
      rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
    }
    else {
      con = lat * this.ns;
      if (con <= 0) {
        return null;
      }
      rh1 = 0;
    }
    var theta = this.ns * adjust_lon(lon - this.long0);
    p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
    p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;

    return p;
  }

  // Lambert Conformal Conic inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  function inverse$m(p) {

    var rh1, con, ts;
    var lat, lon;
    var x = (p.x - this.x0) / this.k0;
    var y = (this.rh - (p.y - this.y0) / this.k0);
    if (this.ns > 0) {
      rh1 = Math.sqrt(x * x + y * y);
      con = 1;
    }
    else {
      rh1 = -Math.sqrt(x * x + y * y);
      con = -1;
    }
    var theta = 0;
    if (rh1 !== 0) {
      theta = Math.atan2((con * x), (con * y));
    }
    if ((rh1 !== 0) || (this.ns > 0)) {
      con = 1 / this.ns;
      ts = Math.pow((rh1 / (this.a * this.f0)), con);
      lat = phi2z(this.e, ts);
      if (lat === -9999) {
        return null;
      }
    }
    else {
      lat = -HALF_PI;
    }
    lon = adjust_lon(theta / this.ns + this.long0);

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$m = [
    "Lambert Tangential Conformal Conic Projection",
    "Lambert_Conformal_Conic",
    "Lambert_Conformal_Conic_1SP",
    "Lambert_Conformal_Conic_2SP",
    "lcc",
    "Lambert Conic Conformal (1SP)",
    "Lambert Conic Conformal (2SP)"
  ];

  var lcc = {
    init: init$m,
    forward: forward$m,
    inverse: inverse$m,
    names: names$m
  };

  function init$l() {
    this.a = 6377397.155;
    this.es = 0.006674372230614;
    this.e = Math.sqrt(this.es);
    if (!this.lat0) {
      this.lat0 = 0.863937979737193;
    }
    if (!this.long0) {
      this.long0 = 0.7417649320975901 - 0.308341501185665;
    }
    /* if scale not set default to 0.9999 */
    if (!this.k0) {
      this.k0 = 0.9999;
    }
    this.s45 = 0.785398163397448; /* 45 */
    this.s90 = 2 * this.s45;
    this.fi0 = this.lat0;
    this.e2 = this.es;
    this.e = Math.sqrt(this.e2);
    this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2));
    this.uq = 1.04216856380474;
    this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
    this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
    this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
    this.k1 = this.k0;
    this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
    this.s0 = 1.37008346281555;
    this.n = Math.sin(this.s0);
    this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
    this.ad = this.s90 - this.uq;
  }

  /* ellipsoid */
  /* calculate xy from lat/lon */
  /* Constants, identical to inverse transform function */
  function forward$l(p) {
    var gfi, u, deltav, s, d, eps, ro;
    var lon = p.x;
    var lat = p.y;
    var delta_lon = adjust_lon(lon - this.long0);
    /* Transformation */
    gfi = Math.pow(((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat))), (this.alfa * this.e / 2));
    u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
    deltav = -delta_lon * this.alfa;
    s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
    d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
    eps = this.n * d;
    ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
    p.y = ro * Math.cos(eps) / 1;
    p.x = ro * Math.sin(eps) / 1;

    if (!this.czech) {
      p.y *= -1;
      p.x *= -1;
    }
    return (p);
  }

  /* calculate lat/lon from xy */
  function inverse$l(p) {
    var u, deltav, s, d, eps, ro, fi1;
    var ok;

    /* Transformation */
    /* revert y, x*/
    var tmp = p.x;
    p.x = p.y;
    p.y = tmp;
    if (!this.czech) {
      p.y *= -1;
      p.x *= -1;
    }
    ro = Math.sqrt(p.x * p.x + p.y * p.y);
    eps = Math.atan2(p.y, p.x);
    d = eps / Math.sin(this.s0);
    s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
    u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
    deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
    p.x = this.long0 - deltav / this.alfa;
    fi1 = u;
    ok = 0;
    var iter = 0;
    do {
      p.y = 2 * (Math.atan(Math.pow(this.k, - 1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
      if (Math.abs(fi1 - p.y) < 0.0000000001) {
        ok = 1;
      }
      fi1 = p.y;
      iter += 1;
    } while (ok === 0 && iter < 15);
    if (iter >= 15) {
      return null;
    }

    return (p);
  }

  var names$l = ["Krovak", "krovak"];
  var krovak = {
    init: init$l,
    forward: forward$l,
    inverse: inverse$l,
    names: names$l
  };

  function mlfn(e0, e1, e2, e3, phi) {
    return (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi));
  }

  function e0fn(x) {
    return (1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x)));
  }

  function e1fn(x) {
    return (0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x)));
  }

  function e2fn(x) {
    return (0.05859375 * x * x * (1 + 0.75 * x));
  }

  function e3fn(x) {
    return (x * x * x * (35 / 3072));
  }

  function gN(a, e, sinphi) {
    var temp = e * sinphi;
    return a / Math.sqrt(1 - temp * temp);
  }

  function adjust_lat(x) {
    return (Math.abs(x) < HALF_PI) ? x : (x - (sign(x) * Math.PI));
  }

  function imlfn(ml, e0, e1, e2, e3) {
    var phi;
    var dphi;

    phi = ml / e0;
    for (var i = 0; i < 15; i++) {
      dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
      phi += dphi;
      if (Math.abs(dphi) <= 0.0000000001) {
        return phi;
      }
    }

    //..reportError("IMLFN-CONV:Latitude failed to converge after 15 iterations");
    return NaN;
  }

  function init$k() {
    if (!this.sphere) {
      this.e0 = e0fn(this.es);
      this.e1 = e1fn(this.es);
      this.e2 = e2fn(this.es);
      this.e3 = e3fn(this.es);
      this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
    }
  }

  /* Cassini forward equations--mapping lat,long to x,y
    -----------------------------------------------------------------------*/
  function forward$k(p) {

    /* Forward equations
        -----------------*/
    var x, y;
    var lam = p.x;
    var phi = p.y;
    lam = adjust_lon(lam - this.long0);

    if (this.sphere) {
      x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
      y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
    }
    else {
      //ellipsoid
      var sinphi = Math.sin(phi);
      var cosphi = Math.cos(phi);
      var nl = gN(this.a, this.e, sinphi);
      var tl = Math.tan(phi) * Math.tan(phi);
      var al = lam * Math.cos(phi);
      var asq = al * al;
      var cl = this.es * cosphi * cosphi / (1 - this.es);
      var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);

      x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
      y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);


    }

    p.x = x + this.x0;
    p.y = y + this.y0;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$k(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var x = p.x / this.a;
    var y = p.y / this.a;
    var phi, lam;

    if (this.sphere) {
      var dd = y + this.lat0;
      phi = Math.asin(Math.sin(dd) * Math.cos(x));
      lam = Math.atan2(Math.tan(x), Math.cos(dd));
    }
    else {
      /* ellipsoid */
      var ml1 = this.ml0 / this.a + y;
      var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
      if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
        p.x = this.long0;
        p.y = HALF_PI;
        if (y < 0) {
          p.y *= -1;
        }
        return p;
      }
      var nl1 = gN(this.a, this.e, Math.sin(phi1));

      var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
      var tl1 = Math.pow(Math.tan(phi1), 2);
      var dl = x * this.a / nl1;
      var dsq = dl * dl;
      phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
      lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);

    }

    p.x = adjust_lon(lam + this.long0);
    p.y = adjust_lat(phi);
    return p;

  }

  var names$k = ["Cassini", "Cassini_Soldner", "cass"];
  var cass = {
    init: init$k,
    forward: forward$k,
    inverse: inverse$k,
    names: names$k
  };

  function qsfnz(eccent, sinphi) {
    var con;
    if (eccent > 1.0e-7) {
      con = eccent * sinphi;
      return ((1 - eccent * eccent) * (sinphi / (1 - con * con) - (0.5 / eccent) * Math.log((1 - con) / (1 + con))));
    }
    else {
      return (2 * sinphi);
    }
  }

  /*
    reference
      "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
      The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
    */

  var S_POLE = 1;

  var N_POLE = 2;
  var EQUIT = 3;
  var OBLIQ = 4;

  /* Initialize the Lambert Azimuthal Equal Area projection
    ------------------------------------------------------*/
  function init$j() {
    var t = Math.abs(this.lat0);
    if (Math.abs(t - HALF_PI) < EPSLN) {
      this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE;
    }
    else if (Math.abs(t) < EPSLN) {
      this.mode = this.EQUIT;
    }
    else {
      this.mode = this.OBLIQ;
    }
    if (this.es > 0) {
      var sinphi;

      this.qp = qsfnz(this.e, 1);
      this.mmf = 0.5 / (1 - this.es);
      this.apa = authset(this.es);
      switch (this.mode) {
      case this.N_POLE:
        this.dd = 1;
        break;
      case this.S_POLE:
        this.dd = 1;
        break;
      case this.EQUIT:
        this.rq = Math.sqrt(0.5 * this.qp);
        this.dd = 1 / this.rq;
        this.xmf = 1;
        this.ymf = 0.5 * this.qp;
        break;
      case this.OBLIQ:
        this.rq = Math.sqrt(0.5 * this.qp);
        sinphi = Math.sin(this.lat0);
        this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
        this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
        this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
        this.ymf = (this.xmf = this.rq) / this.dd;
        this.xmf *= this.dd;
        break;
      }
    }
    else {
      if (this.mode === this.OBLIQ) {
        this.sinph0 = Math.sin(this.lat0);
        this.cosph0 = Math.cos(this.lat0);
      }
    }
  }

  /* Lambert Azimuthal Equal Area forward equations--mapping lat,long to x,y
    -----------------------------------------------------------------------*/
  function forward$j(p) {

    /* Forward equations
        -----------------*/
    var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
    var lam = p.x;
    var phi = p.y;

    lam = adjust_lon(lam - this.long0);
    if (this.sphere) {
      sinphi = Math.sin(phi);
      cosphi = Math.cos(phi);
      coslam = Math.cos(lam);
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        y = (this.mode === this.EQUIT) ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
        if (y <= EPSLN) {
          return null;
        }
        y = Math.sqrt(2 / y);
        x = y * cosphi * Math.sin(lam);
        y *= (this.mode === this.EQUIT) ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
      }
      else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
        if (this.mode === this.N_POLE) {
          coslam = -coslam;
        }
        if (Math.abs(phi + this.lat0) < EPSLN) {
          return null;
        }
        y = FORTPI - phi * 0.5;
        y = 2 * ((this.mode === this.S_POLE) ? Math.cos(y) : Math.sin(y));
        x = y * Math.sin(lam);
        y *= coslam;
      }
    }
    else {
      sinb = 0;
      cosb = 0;
      b = 0;
      coslam = Math.cos(lam);
      sinlam = Math.sin(lam);
      sinphi = Math.sin(phi);
      q = qsfnz(this.e, sinphi);
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        sinb = q / this.qp;
        cosb = Math.sqrt(1 - sinb * sinb);
      }
      switch (this.mode) {
      case this.OBLIQ:
        b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
        break;
      case this.EQUIT:
        b = 1 + cosb * coslam;
        break;
      case this.N_POLE:
        b = HALF_PI + phi;
        q = this.qp - q;
        break;
      case this.S_POLE:
        b = phi - HALF_PI;
        q = this.qp + q;
        break;
      }
      if (Math.abs(b) < EPSLN) {
        return null;
      }
      switch (this.mode) {
      case this.OBLIQ:
      case this.EQUIT:
        b = Math.sqrt(2 / b);
        if (this.mode === this.OBLIQ) {
          y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
        }
        else {
          y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
        }
        x = this.xmf * b * cosb * sinlam;
        break;
      case this.N_POLE:
      case this.S_POLE:
        if (q >= 0) {
          x = (b = Math.sqrt(q)) * sinlam;
          y = coslam * ((this.mode === this.S_POLE) ? b : -b);
        }
        else {
          x = y = 0;
        }
        break;
      }
    }

    p.x = this.a * x + this.x0;
    p.y = this.a * y + this.y0;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$j(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var x = p.x / this.a;
    var y = p.y / this.a;
    var lam, phi, cCe, sCe, q, rho, ab;
    if (this.sphere) {
      var cosz = 0,
        rh, sinz = 0;

      rh = Math.sqrt(x * x + y * y);
      phi = rh * 0.5;
      if (phi > 1) {
        return null;
      }
      phi = 2 * Math.asin(phi);
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        sinz = Math.sin(phi);
        cosz = Math.cos(phi);
      }
      switch (this.mode) {
      case this.EQUIT:
        phi = (Math.abs(rh) <= EPSLN) ? 0 : Math.asin(y * sinz / rh);
        x *= sinz;
        y = cosz * rh;
        break;
      case this.OBLIQ:
        phi = (Math.abs(rh) <= EPSLN) ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
        x *= sinz * this.cosph0;
        y = (cosz - Math.sin(phi) * this.sinph0) * rh;
        break;
      case this.N_POLE:
        y = -y;
        phi = HALF_PI - phi;
        break;
      case this.S_POLE:
        phi -= HALF_PI;
        break;
      }
      lam = (y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ)) ? 0 : Math.atan2(x, y);
    }
    else {
      ab = 0;
      if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
        x /= this.dd;
        y *= this.dd;
        rho = Math.sqrt(x * x + y * y);
        if (rho < EPSLN) {
          p.x = this.long0;
          p.y = this.lat0;
          return p;
        }
        sCe = 2 * Math.asin(0.5 * rho / this.rq);
        cCe = Math.cos(sCe);
        x *= (sCe = Math.sin(sCe));
        if (this.mode === this.OBLIQ) {
          ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
          q = this.qp * ab;
          y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
        }
        else {
          ab = y * sCe / rho;
          q = this.qp * ab;
          y = rho * cCe;
        }
      }
      else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
        if (this.mode === this.N_POLE) {
          y = -y;
        }
        q = (x * x + y * y);
        if (!q) {
          p.x = this.long0;
          p.y = this.lat0;
          return p;
        }
        ab = 1 - q / this.qp;
        if (this.mode === this.S_POLE) {
          ab = -ab;
        }
      }
      lam = Math.atan2(x, y);
      phi = authlat(Math.asin(ab), this.apa);
    }

    p.x = adjust_lon(this.long0 + lam);
    p.y = phi;
    return p;
  }

  /* determine latitude from authalic latitude */
  var P00 = 0.33333333333333333333;

  var P01 = 0.17222222222222222222;
  var P02 = 0.10257936507936507936;
  var P10 = 0.06388888888888888888;
  var P11 = 0.06640211640211640211;
  var P20 = 0.01641501294219154443;

  function authset(es) {
    var t;
    var APA = [];
    APA[0] = es * P00;
    t = es * es;
    APA[0] += t * P01;
    APA[1] = t * P10;
    t *= es;
    APA[0] += t * P02;
    APA[1] += t * P11;
    APA[2] = t * P20;
    return APA;
  }

  function authlat(beta, APA) {
    var t = beta + beta;
    return (beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t));
  }

  var names$j = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
  var laea = {
    init: init$j,
    forward: forward$j,
    inverse: inverse$j,
    names: names$j,
    S_POLE: S_POLE,
    N_POLE: N_POLE,
    EQUIT: EQUIT,
    OBLIQ: OBLIQ
  };

  function asinz(x) {
    if (Math.abs(x) > 1) {
      x = (x > 1) ? 1 : -1;
    }
    return Math.asin(x);
  }

  function init$i() {

    if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
      return;
    }
    this.temp = this.b / this.a;
    this.es = 1 - Math.pow(this.temp, 2);
    this.e3 = Math.sqrt(this.es);

    this.sin_po = Math.sin(this.lat1);
    this.cos_po = Math.cos(this.lat1);
    this.t1 = this.sin_po;
    this.con = this.sin_po;
    this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
    this.qs1 = qsfnz(this.e3, this.sin_po);

    this.sin_po = Math.sin(this.lat2);
    this.cos_po = Math.cos(this.lat2);
    this.t2 = this.sin_po;
    this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
    this.qs2 = qsfnz(this.e3, this.sin_po);

    this.sin_po = Math.sin(this.lat0);
    this.cos_po = Math.cos(this.lat0);
    this.t3 = this.sin_po;
    this.qs0 = qsfnz(this.e3, this.sin_po);

    if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
      this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
    }
    else {
      this.ns0 = this.con;
    }
    this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
    this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
  }

  /* Albers Conical Equal Area forward equations--mapping lat,long to x,y
    -------------------------------------------------------------------*/
  function forward$i(p) {

    var lon = p.x;
    var lat = p.y;

    this.sin_phi = Math.sin(lat);
    this.cos_phi = Math.cos(lat);

    var qs = qsfnz(this.e3, this.sin_phi);
    var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
    var theta = this.ns0 * adjust_lon(lon - this.long0);
    var x = rh1 * Math.sin(theta) + this.x0;
    var y = this.rh - rh1 * Math.cos(theta) + this.y0;

    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$i(p) {
    var rh1, qs, con, theta, lon, lat;

    p.x -= this.x0;
    p.y = this.rh - p.y + this.y0;
    if (this.ns0 >= 0) {
      rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
      con = 1;
    }
    else {
      rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
      con = -1;
    }
    theta = 0;
    if (rh1 !== 0) {
      theta = Math.atan2(con * p.x, con * p.y);
    }
    con = rh1 * this.ns0 / this.a;
    if (this.sphere) {
      lat = Math.asin((this.c - con * con) / (2 * this.ns0));
    }
    else {
      qs = (this.c - con * con) / this.ns0;
      lat = this.phi1z(this.e3, qs);
    }

    lon = adjust_lon(theta / this.ns0 + this.long0);
    p.x = lon;
    p.y = lat;
    return p;
  }

  /* Function to compute phi1, the latitude for the inverse of the
     Albers Conical Equal-Area projection.
  -------------------------------------------*/
  function phi1z(eccent, qs) {
    var sinphi, cosphi, con, com, dphi;
    var phi = asinz(0.5 * qs);
    if (eccent < EPSLN) {
      return phi;
    }

    var eccnts = eccent * eccent;
    for (var i = 1; i <= 25; i++) {
      sinphi = Math.sin(phi);
      cosphi = Math.cos(phi);
      con = eccent * sinphi;
      com = 1 - con * con;
      dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
      phi = phi + dphi;
      if (Math.abs(dphi) <= 1e-7) {
        return phi;
      }
    }
    return null;
  }

  var names$i = ["Albers_Conic_Equal_Area", "Albers", "aea"];
  var aea = {
    init: init$i,
    forward: forward$i,
    inverse: inverse$i,
    names: names$i,
    phi1z: phi1z
  };

  /*
    reference:
      Wolfram Mathworld "Gnomonic Projection"
      http://mathworld.wolfram.com/GnomonicProjection.html
      Accessed: 12th November 2009
    */
  function init$h() {

    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    this.sin_p14 = Math.sin(this.lat0);
    this.cos_p14 = Math.cos(this.lat0);
    // Approximation for projecting points to the horizon (infinity)
    this.infinity_dist = 1000 * this.a;
    this.rc = 1;
  }

  /* Gnomonic forward equations--mapping lat,long to x,y
      ---------------------------------------------------*/
  function forward$h(p) {
    var sinphi, cosphi; /* sin and cos value        */
    var dlon; /* delta longitude value      */
    var coslon; /* cos of longitude        */
    var ksp; /* scale factor          */
    var g;
    var x, y;
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
        -----------------*/
    dlon = adjust_lon(lon - this.long0);

    sinphi = Math.sin(lat);
    cosphi = Math.cos(lat);

    coslon = Math.cos(dlon);
    g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
    ksp = 1;
    if ((g > 0) || (Math.abs(g) <= EPSLN)) {
      x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
      y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
    }
    else {

      // Point is in the opposing hemisphere and is unprojectable
      // We still need to return a reasonable point, so we project
      // to infinity, on a bearing
      // equivalent to the northern hemisphere equivalent
      // This is a reasonable approximation for short shapes and lines that
      // straddle the horizon.

      x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
      y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);

    }
    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$h(p) {
    var rh; /* Rho */
    var sinc, cosc;
    var c;
    var lon, lat;

    /* Inverse equations
        -----------------*/
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    p.x /= this.k0;
    p.y /= this.k0;

    if ((rh = Math.sqrt(p.x * p.x + p.y * p.y))) {
      c = Math.atan2(rh, this.rc);
      sinc = Math.sin(c);
      cosc = Math.cos(c);

      lat = asinz(cosc * this.sin_p14 + (p.y * sinc * this.cos_p14) / rh);
      lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
      lon = adjust_lon(this.long0 + lon);
    }
    else {
      lat = this.phic0;
      lon = 0;
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$h = ["gnom"];
  var gnom = {
    init: init$h,
    forward: forward$h,
    inverse: inverse$h,
    names: names$h
  };

  function iqsfnz(eccent, q) {
    var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
    if (Math.abs(Math.abs(q) - temp) < 1.0E-6) {
      if (q < 0) {
        return (-1 * HALF_PI);
      }
      else {
        return HALF_PI;
      }
    }
    //var phi = 0.5* q/(1-eccent*eccent);
    var phi = Math.asin(0.5 * q);
    var dphi;
    var sin_phi;
    var cos_phi;
    var con;
    for (var i = 0; i < 30; i++) {
      sin_phi = Math.sin(phi);
      cos_phi = Math.cos(phi);
      con = eccent * sin_phi;
      dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
      phi += dphi;
      if (Math.abs(dphi) <= 0.0000000001) {
        return phi;
      }
    }

    //console.log("IQSFN-CONV:Latitude failed to converge after 30 iterations");
    return NaN;
  }

  /*
    reference:
      "Cartographic Projection Procedures for the UNIX Environment-
      A User's Manual" by Gerald I. Evenden,
      USGS Open File Report 90-284and Release 4 Interim Reports (2003)
  */
  function init$g() {
    //no-op
    if (!this.sphere) {
      this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
    }
  }

  /* Cylindrical Equal Area forward equations--mapping lat,long to x,y
      ------------------------------------------------------------*/
  function forward$g(p) {
    var lon = p.x;
    var lat = p.y;
    var x, y;
    /* Forward equations
        -----------------*/
    var dlon = adjust_lon(lon - this.long0);
    if (this.sphere) {
      x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
      y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
    }
    else {
      var qs = qsfnz(this.e, Math.sin(lat));
      x = this.x0 + this.a * this.k0 * dlon;
      y = this.y0 + this.a * qs * 0.5 / this.k0;
    }

    p.x = x;
    p.y = y;
    return p;
  }

  /* Cylindrical Equal Area inverse equations--mapping x,y to lat/long
      ------------------------------------------------------------*/
  function inverse$g(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var lon, lat;

    if (this.sphere) {
      lon = adjust_lon(this.long0 + (p.x / this.a) / Math.cos(this.lat_ts));
      lat = Math.asin((p.y / this.a) * Math.cos(this.lat_ts));
    }
    else {
      lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
      lon = adjust_lon(this.long0 + p.x / (this.a * this.k0));
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$g = ["cea"];
  var cea = {
    init: init$g,
    forward: forward$g,
    inverse: inverse$g,
    names: names$g
  };

  function init$f() {

    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.lat0 = this.lat0 || 0;
    this.long0 = this.long0 || 0;
    this.lat_ts = this.lat_ts || 0;
    this.title = this.title || "Equidistant Cylindrical (Plate Carre)";

    this.rc = Math.cos(this.lat_ts);
  }

  // forward equations--mapping lat,long to x,y
  // -----------------------------------------------------------------
  function forward$f(p) {

    var lon = p.x;
    var lat = p.y;

    var dlon = adjust_lon(lon - this.long0);
    var dlat = adjust_lat(lat - this.lat0);
    p.x = this.x0 + (this.a * dlon * this.rc);
    p.y = this.y0 + (this.a * dlat);
    return p;
  }

  // inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  function inverse$f(p) {

    var x = p.x;
    var y = p.y;

    p.x = adjust_lon(this.long0 + ((x - this.x0) / (this.a * this.rc)));
    p.y = adjust_lat(this.lat0 + ((y - this.y0) / (this.a)));
    return p;
  }

  var names$f = ["Equirectangular", "Equidistant_Cylindrical", "eqc"];
  var eqc = {
    init: init$f,
    forward: forward$f,
    inverse: inverse$f,
    names: names$f
  };

  var MAX_ITER$1 = 20;

  function init$e() {
    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    this.temp = this.b / this.a;
    this.es = 1 - Math.pow(this.temp, 2); // devait etre dans tmerc.js mais n y est pas donc je commente sinon retour de valeurs nulles
    this.e = Math.sqrt(this.es);
    this.e0 = e0fn(this.es);
    this.e1 = e1fn(this.es);
    this.e2 = e2fn(this.es);
    this.e3 = e3fn(this.es);
    this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0); //si que des zeros le calcul ne se fait pas
  }

  /* Polyconic forward equations--mapping lat,long to x,y
      ---------------------------------------------------*/
  function forward$e(p) {
    var lon = p.x;
    var lat = p.y;
    var x, y, el;
    var dlon = adjust_lon(lon - this.long0);
    el = dlon * Math.sin(lat);
    if (this.sphere) {
      if (Math.abs(lat) <= EPSLN) {
        x = this.a * dlon;
        y = -1 * this.a * this.lat0;
      }
      else {
        x = this.a * Math.sin(el) / Math.tan(lat);
        y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
      }
    }
    else {
      if (Math.abs(lat) <= EPSLN) {
        x = this.a * dlon;
        y = -1 * this.ml0;
      }
      else {
        var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
        x = nl * Math.sin(el);
        y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
      }

    }
    p.x = x + this.x0;
    p.y = y + this.y0;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$e(p) {
    var lon, lat, x, y, i;
    var al, bl;
    var phi, dphi;
    x = p.x - this.x0;
    y = p.y - this.y0;

    if (this.sphere) {
      if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
        lon = adjust_lon(x / this.a + this.long0);
        lat = 0;
      }
      else {
        al = this.lat0 + y / this.a;
        bl = x * x / this.a / this.a + al * al;
        phi = al;
        var tanphi;
        for (i = MAX_ITER$1; i; --i) {
          tanphi = Math.tan(phi);
          dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
          phi += dphi;
          if (Math.abs(dphi) <= EPSLN) {
            lat = phi;
            break;
          }
        }
        lon = adjust_lon(this.long0 + (Math.asin(x * Math.tan(phi) / this.a)) / Math.sin(lat));
      }
    }
    else {
      if (Math.abs(y + this.ml0) <= EPSLN) {
        lat = 0;
        lon = adjust_lon(this.long0 + x / this.a);
      }
      else {

        al = (this.ml0 + y) / this.a;
        bl = x * x / this.a / this.a + al * al;
        phi = al;
        var cl, mln, mlnp, ma;
        var con;
        for (i = MAX_ITER$1; i; --i) {
          con = this.e * Math.sin(phi);
          cl = Math.sqrt(1 - con * con) * Math.tan(phi);
          mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
          mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
          ma = mln / this.a;
          dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
          phi -= dphi;
          if (Math.abs(dphi) <= EPSLN) {
            lat = phi;
            break;
          }
        }

        //lat=phi4z(this.e,this.e0,this.e1,this.e2,this.e3,al,bl,0,0);
        cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
        lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat));
      }
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$e = ["Polyconic", "poly"];
  var poly = {
    init: init$e,
    forward: forward$e,
    inverse: inverse$e,
    names: names$e
  };

  function init$d() {
    this.A = [];
    this.A[1] = 0.6399175073;
    this.A[2] = -0.1358797613;
    this.A[3] = 0.063294409;
    this.A[4] = -0.02526853;
    this.A[5] = 0.0117879;
    this.A[6] = -0.0055161;
    this.A[7] = 0.0026906;
    this.A[8] = -0.001333;
    this.A[9] = 0.00067;
    this.A[10] = -0.00034;

    this.B_re = [];
    this.B_im = [];
    this.B_re[1] = 0.7557853228;
    this.B_im[1] = 0;
    this.B_re[2] = 0.249204646;
    this.B_im[2] = 0.003371507;
    this.B_re[3] = -0.001541739;
    this.B_im[3] = 0.041058560;
    this.B_re[4] = -0.10162907;
    this.B_im[4] = 0.01727609;
    this.B_re[5] = -0.26623489;
    this.B_im[5] = -0.36249218;
    this.B_re[6] = -0.6870983;
    this.B_im[6] = -1.1651967;

    this.C_re = [];
    this.C_im = [];
    this.C_re[1] = 1.3231270439;
    this.C_im[1] = 0;
    this.C_re[2] = -0.577245789;
    this.C_im[2] = -0.007809598;
    this.C_re[3] = 0.508307513;
    this.C_im[3] = -0.112208952;
    this.C_re[4] = -0.15094762;
    this.C_im[4] = 0.18200602;
    this.C_re[5] = 1.01418179;
    this.C_im[5] = 1.64497696;
    this.C_re[6] = 1.9660549;
    this.C_im[6] = 2.5127645;

    this.D = [];
    this.D[1] = 1.5627014243;
    this.D[2] = 0.5185406398;
    this.D[3] = -0.03333098;
    this.D[4] = -0.1052906;
    this.D[5] = -0.0368594;
    this.D[6] = 0.007317;
    this.D[7] = 0.01220;
    this.D[8] = 0.00394;
    this.D[9] = -0.0013;
  }

  /**
      New Zealand Map Grid Forward  - long/lat to x/y
      long/lat in radians
    */
  function forward$d(p) {
    var n;
    var lon = p.x;
    var lat = p.y;

    var delta_lat = lat - this.lat0;
    var delta_lon = lon - this.long0;

    // 1. Calculate d_phi and d_psi    ...                          // and d_lambda
    // For this algorithm, delta_latitude is in seconds of arc x 10-5, so we need to scale to those units. Longitude is radians.
    var d_phi = delta_lat / SEC_TO_RAD * 1E-5;
    var d_lambda = delta_lon;
    var d_phi_n = 1; // d_phi^0

    var d_psi = 0;
    for (n = 1; n <= 10; n++) {
      d_phi_n = d_phi_n * d_phi;
      d_psi = d_psi + this.A[n] * d_phi_n;
    }

    // 2. Calculate theta
    var th_re = d_psi;
    var th_im = d_lambda;

    // 3. Calculate z
    var th_n_re = 1;
    var th_n_im = 0; // theta^0
    var th_n_re1;
    var th_n_im1;

    var z_re = 0;
    var z_im = 0;
    for (n = 1; n <= 6; n++) {
      th_n_re1 = th_n_re * th_re - th_n_im * th_im;
      th_n_im1 = th_n_im * th_re + th_n_re * th_im;
      th_n_re = th_n_re1;
      th_n_im = th_n_im1;
      z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
      z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
    }

    // 4. Calculate easting and northing
    p.x = (z_im * this.a) + this.x0;
    p.y = (z_re * this.a) + this.y0;

    return p;
  }

  /**
      New Zealand Map Grid Inverse  -  x/y to long/lat
    */
  function inverse$d(p) {
    var n;
    var x = p.x;
    var y = p.y;

    var delta_x = x - this.x0;
    var delta_y = y - this.y0;

    // 1. Calculate z
    var z_re = delta_y / this.a;
    var z_im = delta_x / this.a;

    // 2a. Calculate theta - first approximation gives km accuracy
    var z_n_re = 1;
    var z_n_im = 0; // z^0
    var z_n_re1;
    var z_n_im1;

    var th_re = 0;
    var th_im = 0;
    for (n = 1; n <= 6; n++) {
      z_n_re1 = z_n_re * z_re - z_n_im * z_im;
      z_n_im1 = z_n_im * z_re + z_n_re * z_im;
      z_n_re = z_n_re1;
      z_n_im = z_n_im1;
      th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
      th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
    }

    // 2b. Iterate to refine the accuracy of the calculation
    //        0 iterations gives km accuracy
    //        1 iteration gives m accuracy -- good enough for most mapping applications
    //        2 iterations bives mm accuracy
    for (var i = 0; i < this.iterations; i++) {
      var th_n_re = th_re;
      var th_n_im = th_im;
      var th_n_re1;
      var th_n_im1;

      var num_re = z_re;
      var num_im = z_im;
      for (n = 2; n <= 6; n++) {
        th_n_re1 = th_n_re * th_re - th_n_im * th_im;
        th_n_im1 = th_n_im * th_re + th_n_re * th_im;
        th_n_re = th_n_re1;
        th_n_im = th_n_im1;
        num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
        num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
      }

      th_n_re = 1;
      th_n_im = 0;
      var den_re = this.B_re[1];
      var den_im = this.B_im[1];
      for (n = 2; n <= 6; n++) {
        th_n_re1 = th_n_re * th_re - th_n_im * th_im;
        th_n_im1 = th_n_im * th_re + th_n_re * th_im;
        th_n_re = th_n_re1;
        th_n_im = th_n_im1;
        den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
        den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
      }

      // Complex division
      var den2 = den_re * den_re + den_im * den_im;
      th_re = (num_re * den_re + num_im * den_im) / den2;
      th_im = (num_im * den_re - num_re * den_im) / den2;
    }

    // 3. Calculate d_phi              ...                                    // and d_lambda
    var d_psi = th_re;
    var d_lambda = th_im;
    var d_psi_n = 1; // d_psi^0

    var d_phi = 0;
    for (n = 1; n <= 9; n++) {
      d_psi_n = d_psi_n * d_psi;
      d_phi = d_phi + this.D[n] * d_psi_n;
    }

    // 4. Calculate latitude and longitude
    // d_phi is calcuated in second of arc * 10^-5, so we need to scale back to radians. d_lambda is in radians.
    var lat = this.lat0 + (d_phi * SEC_TO_RAD * 1E5);
    var lon = this.long0 + d_lambda;

    p.x = lon;
    p.y = lat;

    return p;
  }

  var names$d = ["New_Zealand_Map_Grid", "nzmg"];
  var nzmg = {
    init: init$d,
    forward: forward$d,
    inverse: inverse$d,
    names: names$d
  };

  /*
    reference
      "New Equal-Area Map Projections for Noncircular Regions", John P. Snyder,
      The American Cartographer, Vol 15, No. 4, October 1988, pp. 341-355.
    */


  /* Initialize the Miller Cylindrical projection
    -------------------------------------------*/
  function init$c() {
    //no-op
  }

  /* Miller Cylindrical forward equations--mapping lat,long to x,y
      ------------------------------------------------------------*/
  function forward$c(p) {
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
        -----------------*/
    var dlon = adjust_lon(lon - this.long0);
    var x = this.x0 + this.a * dlon;
    var y = this.y0 + this.a * Math.log(Math.tan((Math.PI / 4) + (lat / 2.5))) * 1.25;

    p.x = x;
    p.y = y;
    return p;
  }

  /* Miller Cylindrical inverse equations--mapping x,y to lat/long
      ------------------------------------------------------------*/
  function inverse$c(p) {
    p.x -= this.x0;
    p.y -= this.y0;

    var lon = adjust_lon(this.long0 + p.x / this.a);
    var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$c = ["Miller_Cylindrical", "mill"];
  var mill = {
    init: init$c,
    forward: forward$c,
    inverse: inverse$c,
    names: names$c
  };

  var MAX_ITER = 20;


  function init$b() {
    /* Place parameters in static storage for common use
      -------------------------------------------------*/


    if (!this.sphere) {
      this.en = pj_enfn(this.es);
    }
    else {
      this.n = 1;
      this.m = 0;
      this.es = 0;
      this.C_y = Math.sqrt((this.m + 1) / this.n);
      this.C_x = this.C_y / (this.m + 1);
    }

  }

  /* Sinusoidal forward equations--mapping lat,long to x,y
    -----------------------------------------------------*/
  function forward$b(p) {
    var x, y;
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
      -----------------*/
    lon = adjust_lon(lon - this.long0);

    if (this.sphere) {
      if (!this.m) {
        lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
      }
      else {
        var k = this.n * Math.sin(lat);
        for (var i = MAX_ITER; i; --i) {
          var V = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
          lat -= V;
          if (Math.abs(V) < EPSLN) {
            break;
          }
        }
      }
      x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
      y = this.a * this.C_y * lat;

    }
    else {

      var s = Math.sin(lat);
      var c = Math.cos(lat);
      y = this.a * pj_mlfn(lat, s, c, this.en);
      x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
    }

    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$b(p) {
    var lat, temp, lon, s;

    p.x -= this.x0;
    lon = p.x / this.a;
    p.y -= this.y0;
    lat = p.y / this.a;

    if (this.sphere) {
      lat /= this.C_y;
      lon = lon / (this.C_x * (this.m + Math.cos(lat)));
      if (this.m) {
        lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
      }
      else if (this.n !== 1) {
        lat = asinz(Math.sin(lat) / this.n);
      }
      lon = adjust_lon(lon + this.long0);
      lat = adjust_lat(lat);
    }
    else {
      lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
      s = Math.abs(lat);
      if (s < HALF_PI) {
        s = Math.sin(lat);
        temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
        //temp = this.long0 + p.x / (this.a * Math.cos(lat));
        lon = adjust_lon(temp);
      }
      else if ((s - EPSLN) < HALF_PI) {
        lon = this.long0;
      }
    }
    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$b = ["Sinusoidal", "sinu"];
  var sinu = {
    init: init$b,
    forward: forward$b,
    inverse: inverse$b,
    names: names$b
  };

  function init$a() {}
  /* Mollweide forward equations--mapping lat,long to x,y
      ----------------------------------------------------*/
  function forward$a(p) {

    /* Forward equations
        -----------------*/
    var lon = p.x;
    var lat = p.y;

    var delta_lon = adjust_lon(lon - this.long0);
    var theta = lat;
    var con = Math.PI * Math.sin(lat);

    /* Iterate using the Newton-Raphson method to find theta
        -----------------------------------------------------*/
    while (true) {
      var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
      theta += delta_theta;
      if (Math.abs(delta_theta) < EPSLN) {
        break;
      }
    }
    theta /= 2;

    /* If the latitude is 90 deg, force the x coordinate to be "0 + false easting"
         this is done here because of precision problems with "cos(theta)"
         --------------------------------------------------------------------------*/
    if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
      delta_lon = 0;
    }
    var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
    var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;

    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$a(p) {
    var theta;
    var arg;

    /* Inverse equations
        -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    arg = p.y / (1.4142135623731 * this.a);

    /* Because of division by zero problems, 'arg' can not be 1.  Therefore
         a number very close to one is used instead.
         -------------------------------------------------------------------*/
    if (Math.abs(arg) > 0.999999999999) {
      arg = 0.999999999999;
    }
    theta = Math.asin(arg);
    var lon = adjust_lon(this.long0 + (p.x / (0.900316316158 * this.a * Math.cos(theta))));
    if (lon < (-Math.PI)) {
      lon = -Math.PI;
    }
    if (lon > Math.PI) {
      lon = Math.PI;
    }
    arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
    if (Math.abs(arg) > 1) {
      arg = 1;
    }
    var lat = Math.asin(arg);

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$a = ["Mollweide", "moll"];
  var moll = {
    init: init$a,
    forward: forward$a,
    inverse: inverse$a,
    names: names$a
  };

  function init$9() {

    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    // Standard Parallels cannot be equal and on opposite sides of the equator
    if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
      return;
    }
    this.lat2 = this.lat2 || this.lat1;
    this.temp = this.b / this.a;
    this.es = 1 - Math.pow(this.temp, 2);
    this.e = Math.sqrt(this.es);
    this.e0 = e0fn(this.es);
    this.e1 = e1fn(this.es);
    this.e2 = e2fn(this.es);
    this.e3 = e3fn(this.es);

    this.sinphi = Math.sin(this.lat1);
    this.cosphi = Math.cos(this.lat1);

    this.ms1 = msfnz(this.e, this.sinphi, this.cosphi);
    this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);

    if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
      this.ns = this.sinphi;
    }
    else {
      this.sinphi = Math.sin(this.lat2);
      this.cosphi = Math.cos(this.lat2);
      this.ms2 = msfnz(this.e, this.sinphi, this.cosphi);
      this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
      this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
    }
    this.g = this.ml1 + this.ms1 / this.ns;
    this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
    this.rh = this.a * (this.g - this.ml0);
  }

  /* Equidistant Conic forward equations--mapping lat,long to x,y
    -----------------------------------------------------------*/
  function forward$9(p) {
    var lon = p.x;
    var lat = p.y;
    var rh1;

    /* Forward equations
        -----------------*/
    if (this.sphere) {
      rh1 = this.a * (this.g - lat);
    }
    else {
      var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
      rh1 = this.a * (this.g - ml);
    }
    var theta = this.ns * adjust_lon(lon - this.long0);
    var x = this.x0 + rh1 * Math.sin(theta);
    var y = this.y0 + this.rh - rh1 * Math.cos(theta);
    p.x = x;
    p.y = y;
    return p;
  }

  /* Inverse equations
    -----------------*/
  function inverse$9(p) {
    p.x -= this.x0;
    p.y = this.rh - p.y + this.y0;
    var con, rh1, lat, lon;
    if (this.ns >= 0) {
      rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
      con = 1;
    }
    else {
      rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
      con = -1;
    }
    var theta = 0;
    if (rh1 !== 0) {
      theta = Math.atan2(con * p.x, con * p.y);
    }

    if (this.sphere) {
      lon = adjust_lon(this.long0 + theta / this.ns);
      lat = adjust_lat(this.g - rh1 / this.a);
      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      var ml = this.g - rh1 / this.a;
      lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
      lon = adjust_lon(this.long0 + theta / this.ns);
      p.x = lon;
      p.y = lat;
      return p;
    }

  }

  var names$9 = ["Equidistant_Conic", "eqdc"];
  var eqdc = {
    init: init$9,
    forward: forward$9,
    inverse: inverse$9,
    names: names$9
  };

  /* Initialize the Van Der Grinten projection
    ----------------------------------------*/
  function init$8() {
    //this.R = 6370997; //Radius of earth
    this.R = this.a;
  }

  function forward$8(p) {

    var lon = p.x;
    var lat = p.y;

    /* Forward equations
      -----------------*/
    var dlon = adjust_lon(lon - this.long0);
    var x, y;

    if (Math.abs(lat) <= EPSLN) {
      x = this.x0 + this.R * dlon;
      y = this.y0;
    }
    var theta = asinz(2 * Math.abs(lat / Math.PI));
    if ((Math.abs(dlon) <= EPSLN) || (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN)) {
      x = this.x0;
      if (lat >= 0) {
        y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
      }
      else {
        y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
      }
      //  return(OK);
    }
    var al = 0.5 * Math.abs((Math.PI / dlon) - (dlon / Math.PI));
    var asq = al * al;
    var sinth = Math.sin(theta);
    var costh = Math.cos(theta);

    var g = costh / (sinth + costh - 1);
    var gsq = g * g;
    var m = g * (2 / sinth - 1);
    var msq = m * m;
    var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
    if (dlon < 0) {
      con = -con;
    }
    x = this.x0 + con;
    //con = Math.abs(con / (Math.PI * this.R));
    var q = asq + g;
    con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
    if (lat >= 0) {
      //y = this.y0 + Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
      y = this.y0 + con;
    }
    else {
      //y = this.y0 - Math.PI * this.R * Math.sqrt(1 - con * con - 2 * al * con);
      y = this.y0 - con;
    }
    p.x = x;
    p.y = y;
    return p;
  }

  /* Van Der Grinten inverse equations--mapping x,y to lat/long
    ---------------------------------------------------------*/
  function inverse$8(p) {
    var lon, lat;
    var xx, yy, xys, c1, c2, c3;
    var a1;
    var m1;
    var con;
    var th1;
    var d;

    /* inverse equations
      -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    con = Math.PI * this.R;
    xx = p.x / con;
    yy = p.y / con;
    xys = xx * xx + yy * yy;
    c1 = -Math.abs(yy) * (1 + xys);
    c2 = c1 - 2 * yy * yy + xx * xx;
    c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
    d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
    a1 = (c1 - c2 * c2 / 3 / c3) / c3;
    m1 = 2 * Math.sqrt(-a1 / 3);
    con = ((3 * d) / a1) / m1;
    if (Math.abs(con) > 1) {
      if (con >= 0) {
        con = 1;
      }
      else {
        con = -1;
      }
    }
    th1 = Math.acos(con) / 3;
    if (p.y >= 0) {
      lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
    }
    else {
      lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
    }

    if (Math.abs(xx) < EPSLN) {
      lon = this.long0;
    }
    else {
      lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx);
    }

    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$8 = ["Van_der_Grinten_I", "VanDerGrinten", "vandg"];
  var vandg = {
    init: init$8,
    forward: forward$8,
    inverse: inverse$8,
    names: names$8
  };

  function init$7() {
    this.sin_p12 = Math.sin(this.lat0);
    this.cos_p12 = Math.cos(this.lat0);
  }

  function forward$7(p) {
    var lon = p.x;
    var lat = p.y;
    var sinphi = Math.sin(p.y);
    var cosphi = Math.cos(p.y);
    var dlon = adjust_lon(lon - this.long0);
    var e0, e1, e2, e3, Mlp, Ml, tanphi, Nl1, Nl, psi, Az, G, H, GH, Hs, c, kp, cos_c, s, s2, s3, s4, s5;
    if (this.sphere) {
      if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
        //North Pole case
        p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
        p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
        return p;
      }
      else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
        //South Pole case
        p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
        p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
        return p;
      }
      else {
        //default case
        cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
        c = Math.acos(cos_c);
        kp = c ? c / Math.sin(c) : 1;
        p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
        p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
        return p;
      }
    }
    else {
      e0 = e0fn(this.es);
      e1 = e1fn(this.es);
      e2 = e2fn(this.es);
      e3 = e3fn(this.es);
      if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
        //North Pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        Ml = this.a * mlfn(e0, e1, e2, e3, lat);
        p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
        p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
        return p;
      }
      else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
        //South Pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        Ml = this.a * mlfn(e0, e1, e2, e3, lat);
        p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
        p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
        return p;
      }
      else {
        //Default case
        tanphi = sinphi / cosphi;
        Nl1 = gN(this.a, this.e, this.sin_p12);
        Nl = gN(this.a, this.e, sinphi);
        psi = Math.atan((1 - this.es) * tanphi + this.es * Nl1 * this.sin_p12 / (Nl * cosphi));
        Az = Math.atan2(Math.sin(dlon), this.cos_p12 * Math.tan(psi) - this.sin_p12 * Math.cos(dlon));
        if (Az === 0) {
          s = Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
        }
        else if (Math.abs(Math.abs(Az) - Math.PI) <= EPSLN) {
          s = -Math.asin(this.cos_p12 * Math.sin(psi) - this.sin_p12 * Math.cos(psi));
        }
        else {
          s = Math.asin(Math.sin(dlon) * Math.cos(psi) / Math.sin(Az));
        }
        G = this.e * this.sin_p12 / Math.sqrt(1 - this.es);
        H = this.e * this.cos_p12 * Math.cos(Az) / Math.sqrt(1 - this.es);
        GH = G * H;
        Hs = H * H;
        s2 = s * s;
        s3 = s2 * s;
        s4 = s3 * s;
        s5 = s4 * s;
        c = Nl1 * s * (1 - s2 * Hs * (1 - Hs) / 6 + s3 / 8 * GH * (1 - 2 * Hs) + s4 / 120 * (Hs * (4 - 7 * Hs) - 3 * G * G * (1 - 7 * Hs)) - s5 / 48 * GH);
        p.x = this.x0 + c * Math.sin(Az);
        p.y = this.y0 + c * Math.cos(Az);
        return p;
      }
    }


  }

  function inverse$7(p) {
    p.x -= this.x0;
    p.y -= this.y0;
    var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M, N1, psi, Az, cosAz, tmp, A, B, D, Ee, F, sinpsi;
    if (this.sphere) {
      rh = Math.sqrt(p.x * p.x + p.y * p.y);
      if (rh > (2 * HALF_PI * this.a)) {
        return;
      }
      z = rh / this.a;

      sinz = Math.sin(z);
      cosz = Math.cos(z);

      lon = this.long0;
      if (Math.abs(rh) <= EPSLN) {
        lat = this.lat0;
      }
      else {
        lat = asinz(cosz * this.sin_p12 + (p.y * sinz * this.cos_p12) / rh);
        con = Math.abs(this.lat0) - HALF_PI;
        if (Math.abs(con) <= EPSLN) {
          if (this.lat0 >= 0) {
            lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
          }
          else {
            lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
          }
        }
        else {
          /*con = cosz - this.sin_p12 * Math.sin(lat);
          if ((Math.abs(con) < EPSLN) && (Math.abs(p.x) < EPSLN)) {
            //no-op, just keep the lon value as is
          } else {
            var temp = Math.atan2((p.x * sinz * this.cos_p12), (con * rh));
            lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz * this.cos_p12), (con * rh)));
          }*/
          lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz));
        }
      }

      p.x = lon;
      p.y = lat;
      return p;
    }
    else {
      e0 = e0fn(this.es);
      e1 = e1fn(this.es);
      e2 = e2fn(this.es);
      e3 = e3fn(this.es);
      if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
        //North pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        M = Mlp - rh;
        lat = imlfn(M / this.a, e0, e1, e2, e3);
        lon = adjust_lon(this.long0 + Math.atan2(p.x, - 1 * p.y));
        p.x = lon;
        p.y = lat;
        return p;
      }
      else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
        //South pole case
        Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        M = rh - Mlp;

        lat = imlfn(M / this.a, e0, e1, e2, e3);
        lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y));
        p.x = lon;
        p.y = lat;
        return p;
      }
      else {
        //default case
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        Az = Math.atan2(p.x, p.y);
        N1 = gN(this.a, this.e, this.sin_p12);
        cosAz = Math.cos(Az);
        tmp = this.e * this.cos_p12 * cosAz;
        A = -tmp * tmp / (1 - this.es);
        B = 3 * this.es * (1 - A) * this.sin_p12 * this.cos_p12 * cosAz / (1 - this.es);
        D = rh / N1;
        Ee = D - A * (1 + A) * Math.pow(D, 3) / 6 - B * (1 + 3 * A) * Math.pow(D, 4) / 24;
        F = 1 - A * Ee * Ee / 2 - D * Ee * Ee * Ee / 6;
        psi = Math.asin(this.sin_p12 * Math.cos(Ee) + this.cos_p12 * Math.sin(Ee) * cosAz);
        lon = adjust_lon(this.long0 + Math.asin(Math.sin(Az) * Math.sin(Ee) / Math.cos(psi)));
        sinpsi = Math.sin(psi);
        lat = Math.atan2((sinpsi - this.es * F * this.sin_p12) * Math.tan(psi), sinpsi * (1 - this.es));
        p.x = lon;
        p.y = lat;
        return p;
      }
    }

  }

  var names$7 = ["Azimuthal_Equidistant", "aeqd"];
  var aeqd = {
    init: init$7,
    forward: forward$7,
    inverse: inverse$7,
    names: names$7
  };

  function init$6() {
    //double temp;      /* temporary variable    */

    /* Place parameters in static storage for common use
        -------------------------------------------------*/
    this.sin_p14 = Math.sin(this.lat0);
    this.cos_p14 = Math.cos(this.lat0);
  }

  /* Orthographic forward equations--mapping lat,long to x,y
      ---------------------------------------------------*/
  function forward$6(p) {
    var sinphi, cosphi; /* sin and cos value        */
    var dlon; /* delta longitude value      */
    var coslon; /* cos of longitude        */
    var ksp; /* scale factor          */
    var g, x, y;
    var lon = p.x;
    var lat = p.y;
    /* Forward equations
        -----------------*/
    dlon = adjust_lon(lon - this.long0);

    sinphi = Math.sin(lat);
    cosphi = Math.cos(lat);

    coslon = Math.cos(dlon);
    g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
    ksp = 1;
    if ((g > 0) || (Math.abs(g) <= EPSLN)) {
      x = this.a * ksp * cosphi * Math.sin(dlon);
      y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
    }
    p.x = x;
    p.y = y;
    return p;
  }

  function inverse$6(p) {
    var rh; /* height above ellipsoid      */
    var z; /* angle          */
    var sinz, cosz; /* sin of z and cos of z      */
    var con;
    var lon, lat;
    /* Inverse equations
        -----------------*/
    p.x -= this.x0;
    p.y -= this.y0;
    rh = Math.sqrt(p.x * p.x + p.y * p.y);
    z = asinz(rh / this.a);

    sinz = Math.sin(z);
    cosz = Math.cos(z);

    lon = this.long0;
    if (Math.abs(rh) <= EPSLN) {
      lat = this.lat0;
      p.x = lon;
      p.y = lat;
      return p;
    }
    lat = asinz(cosz * this.sin_p14 + (p.y * sinz * this.cos_p14) / rh);
    con = Math.abs(this.lat0) - HALF_PI;
    if (Math.abs(con) <= EPSLN) {
      if (this.lat0 >= 0) {
        lon = adjust_lon(this.long0 + Math.atan2(p.x, - p.y));
      }
      else {
        lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y));
      }
      p.x = lon;
      p.y = lat;
      return p;
    }
    lon = adjust_lon(this.long0 + Math.atan2((p.x * sinz), rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz));
    p.x = lon;
    p.y = lat;
    return p;
  }

  var names$6 = ["ortho"];
  var ortho = {
    init: init$6,
    forward: forward$6,
    inverse: inverse$6,
    names: names$6
  };

  // QSC projection rewritten from the original PROJ4
  // https://github.com/OSGeo/proj.4/blob/master/src/PJ_qsc.c


  /* constants */
  var FACE_ENUM = {
      FRONT: 1,
      RIGHT: 2,
      BACK: 3,
      LEFT: 4,
      TOP: 5,
      BOTTOM: 6
  };

  var AREA_ENUM = {
      AREA_0: 1,
      AREA_1: 2,
      AREA_2: 3,
      AREA_3: 4
  };

  function init$5() {

    this.x0 = this.x0 || 0;
    this.y0 = this.y0 || 0;
    this.lat0 = this.lat0 || 0;
    this.long0 = this.long0 || 0;
    this.lat_ts = this.lat_ts || 0;
    this.title = this.title || "Quadrilateralized Spherical Cube";

    /* Determine the cube face from the center of projection. */
    if (this.lat0 >= HALF_PI - FORTPI / 2.0) {
      this.face = FACE_ENUM.TOP;
    } else if (this.lat0 <= -(HALF_PI - FORTPI / 2.0)) {
      this.face = FACE_ENUM.BOTTOM;
    } else if (Math.abs(this.long0) <= FORTPI) {
      this.face = FACE_ENUM.FRONT;
    } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
      this.face = this.long0 > 0.0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
    } else {
      this.face = FACE_ENUM.BACK;
    }

    /* Fill in useful values for the ellipsoid <-> sphere shift
     * described in [LK12]. */
    if (this.es !== 0) {
      this.one_minus_f = 1 - (this.a - this.b) / this.a;
      this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
    }
  }

  // QSC forward equations--mapping lat,long to x,y
  // -----------------------------------------------------------------
  function forward$5(p) {
    var xy = {x: 0, y: 0};
    var lat, lon;
    var theta, phi;
    var t, mu;
    /* nu; */
    var area = {value: 0};

    // move lon according to projection's lon
    p.x -= this.long0;

    /* Convert the geodetic latitude to a geocentric latitude.
     * This corresponds to the shift from the ellipsoid to the sphere
     * described in [LK12]. */
    if (this.es !== 0) {//if (P->es != 0) {
      lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
    } else {
      lat = p.y;
    }

    /* Convert the input lat, lon into theta, phi as used by QSC.
     * This depends on the cube face and the area on it.
     * For the top and bottom face, we can compute theta and phi
     * directly from phi, lam. For the other faces, we must use
     * unit sphere cartesian coordinates as an intermediate step. */
    lon = p.x; //lon = lp.lam;
    if (this.face === FACE_ENUM.TOP) {
      phi = HALF_PI - lat;
      if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
        area.value = AREA_ENUM.AREA_0;
        theta = lon - HALF_PI;
      } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
        area.value = AREA_ENUM.AREA_1;
        theta = (lon > 0.0 ? lon - SPI : lon + SPI);
      } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
        area.value = AREA_ENUM.AREA_2;
        theta = lon + HALF_PI;
      } else {
        area.value = AREA_ENUM.AREA_3;
        theta = lon;
      }
    } else if (this.face === FACE_ENUM.BOTTOM) {
      phi = HALF_PI + lat;
      if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
        area.value = AREA_ENUM.AREA_0;
        theta = -lon + HALF_PI;
      } else if (lon < FORTPI && lon >= -FORTPI) {
        area.value = AREA_ENUM.AREA_1;
        theta = -lon;
      } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
        area.value = AREA_ENUM.AREA_2;
        theta = -lon - HALF_PI;
      } else {
        area.value = AREA_ENUM.AREA_3;
        theta = (lon > 0.0 ? -lon + SPI : -lon - SPI);
      }
    } else {
      var q, r, s;
      var sinlat, coslat;
      var sinlon, coslon;

      if (this.face === FACE_ENUM.RIGHT) {
        lon = qsc_shift_lon_origin(lon, +HALF_PI);
      } else if (this.face === FACE_ENUM.BACK) {
        lon = qsc_shift_lon_origin(lon, +SPI);
      } else if (this.face === FACE_ENUM.LEFT) {
        lon = qsc_shift_lon_origin(lon, -HALF_PI);
      }
      sinlat = Math.sin(lat);
      coslat = Math.cos(lat);
      sinlon = Math.sin(lon);
      coslon = Math.cos(lon);
      q = coslat * coslon;
      r = coslat * sinlon;
      s = sinlat;

      if (this.face === FACE_ENUM.FRONT) {
        phi = Math.acos(q);
        theta = qsc_fwd_equat_face_theta(phi, s, r, area);
      } else if (this.face === FACE_ENUM.RIGHT) {
        phi = Math.acos(r);
        theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
      } else if (this.face === FACE_ENUM.BACK) {
        phi = Math.acos(-q);
        theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
      } else if (this.face === FACE_ENUM.LEFT) {
        phi = Math.acos(-r);
        theta = qsc_fwd_equat_face_theta(phi, s, q, area);
      } else {
        /* Impossible */
        phi = theta = 0;
        area.value = AREA_ENUM.AREA_0;
      }
    }

    /* Compute mu and nu for the area of definition.
     * For mu, see Eq. (3-21) in [OL76], but note the typos:
     * compare with Eq. (3-14). For nu, see Eq. (3-38). */
    mu = Math.atan((12 / SPI) * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
    t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));

    /* Apply the result to the real area. */
    if (area.value === AREA_ENUM.AREA_1) {
      mu += HALF_PI;
    } else if (area.value === AREA_ENUM.AREA_2) {
      mu += SPI;
    } else if (area.value === AREA_ENUM.AREA_3) {
      mu += 1.5 * SPI;
    }

    /* Now compute x, y from mu and nu */
    xy.x = t * Math.cos(mu);
    xy.y = t * Math.sin(mu);
    xy.x = xy.x * this.a + this.x0;
    xy.y = xy.y * this.a + this.y0;

    p.x = xy.x;
    p.y = xy.y;
    return p;
  }

  // QSC inverse equations--mapping x,y to lat/long
  // -----------------------------------------------------------------
  function inverse$5(p) {
    var lp = {lam: 0, phi: 0};
    var mu, nu, cosmu, tannu;
    var tantheta, theta, cosphi, phi;
    var t;
    var area = {value: 0};

    /* de-offset */
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    /* Convert the input x, y to the mu and nu angles as used by QSC.
     * This depends on the area of the cube face. */
    nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
    mu = Math.atan2(p.y, p.x);
    if (p.x >= 0.0 && p.x >= Math.abs(p.y)) {
      area.value = AREA_ENUM.AREA_0;
    } else if (p.y >= 0.0 && p.y >= Math.abs(p.x)) {
      area.value = AREA_ENUM.AREA_1;
      mu -= HALF_PI;
    } else if (p.x < 0.0 && -p.x >= Math.abs(p.y)) {
      area.value = AREA_ENUM.AREA_2;
      mu = (mu < 0.0 ? mu + SPI : mu - SPI);
    } else {
      area.value = AREA_ENUM.AREA_3;
      mu += HALF_PI;
    }

    /* Compute phi and theta for the area of definition.
     * The inverse projection is not described in the original paper, but some
     * good hints can be found here (as of 2011-12-14):
     * http://fits.gsfc.nasa.gov/fitsbits/saf.93/saf.9302
     * (search for "Message-Id: <9302181759.AA25477 at fits.cv.nrao.edu>") */
    t = (SPI / 12) * Math.tan(mu);
    tantheta = Math.sin(t) / (Math.cos(t) - (1 / Math.sqrt(2)));
    theta = Math.atan(tantheta);
    cosmu = Math.cos(mu);
    tannu = Math.tan(nu);
    cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
    if (cosphi < -1) {
      cosphi = -1;
    } else if (cosphi > +1) {
      cosphi = +1;
    }

    /* Apply the result to the real area on the cube face.
     * For the top and bottom face, we can compute phi and lam directly.
     * For the other faces, we must use unit sphere cartesian coordinates
     * as an intermediate step. */
    if (this.face === FACE_ENUM.TOP) {
      phi = Math.acos(cosphi);
      lp.phi = HALF_PI - phi;
      if (area.value === AREA_ENUM.AREA_0) {
        lp.lam = theta + HALF_PI;
      } else if (area.value === AREA_ENUM.AREA_1) {
        lp.lam = (theta < 0.0 ? theta + SPI : theta - SPI);
      } else if (area.value === AREA_ENUM.AREA_2) {
        lp.lam = theta - HALF_PI;
      } else /* area.value == AREA_ENUM.AREA_3 */ {
        lp.lam = theta;
      }
    } else if (this.face === FACE_ENUM.BOTTOM) {
      phi = Math.acos(cosphi);
      lp.phi = phi - HALF_PI;
      if (area.value === AREA_ENUM.AREA_0) {
        lp.lam = -theta + HALF_PI;
      } else if (area.value === AREA_ENUM.AREA_1) {
        lp.lam = -theta;
      } else if (area.value === AREA_ENUM.AREA_2) {
        lp.lam = -theta - HALF_PI;
      } else /* area.value == AREA_ENUM.AREA_3 */ {
        lp.lam = (theta < 0.0 ? -theta - SPI : -theta + SPI);
      }
    } else {
      /* Compute phi and lam via cartesian unit sphere coordinates. */
      var q, r, s;
      q = cosphi;
      t = q * q;
      if (t >= 1) {
        s = 0;
      } else {
        s = Math.sqrt(1 - t) * Math.sin(theta);
      }
      t += s * s;
      if (t >= 1) {
        r = 0;
      } else {
        r = Math.sqrt(1 - t);
      }
      /* Rotate q,r,s into the correct area. */
      if (area.value === AREA_ENUM.AREA_1) {
        t = r;
        r = -s;
        s = t;
      } else if (area.value === AREA_ENUM.AREA_2) {
        r = -r;
        s = -s;
      } else if (area.value === AREA_ENUM.AREA_3) {
        t = r;
        r = s;
        s = -t;
      }
      /* Rotate q,r,s into the correct cube face. */
      if (this.face === FACE_ENUM.RIGHT) {
        t = q;
        q = -r;
        r = t;
      } else if (this.face === FACE_ENUM.BACK) {
        q = -q;
        r = -r;
      } else if (this.face === FACE_ENUM.LEFT) {
        t = q;
        q = r;
        r = -t;
      }
      /* Now compute phi and lam from the unit sphere coordinates. */
      lp.phi = Math.acos(-s) - HALF_PI;
      lp.lam = Math.atan2(r, q);
      if (this.face === FACE_ENUM.RIGHT) {
        lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
      } else if (this.face === FACE_ENUM.BACK) {
        lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
      } else if (this.face === FACE_ENUM.LEFT) {
        lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
      }
    }

    /* Apply the shift from the sphere to the ellipsoid as described
     * in [LK12]. */
    if (this.es !== 0) {
      var invert_sign;
      var tanphi, xa;
      invert_sign = (lp.phi < 0 ? 1 : 0);
      tanphi = Math.tan(lp.phi);
      xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
      lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
      if (invert_sign) {
        lp.phi = -lp.phi;
      }
    }

    lp.lam += this.long0;
    p.x = lp.lam;
    p.y = lp.phi;
    return p;
  }

  /* Helper function for forward projection: compute the theta angle
   * and determine the area number. */
  function qsc_fwd_equat_face_theta(phi, y, x, area) {
    var theta;
    if (phi < EPSLN) {
      area.value = AREA_ENUM.AREA_0;
      theta = 0.0;
    } else {
      theta = Math.atan2(y, x);
      if (Math.abs(theta) <= FORTPI) {
        area.value = AREA_ENUM.AREA_0;
      } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
        area.value = AREA_ENUM.AREA_1;
        theta -= HALF_PI;
      } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
        area.value = AREA_ENUM.AREA_2;
        theta = (theta >= 0.0 ? theta - SPI : theta + SPI);
      } else {
        area.value = AREA_ENUM.AREA_3;
        theta += HALF_PI;
      }
    }
    return theta;
  }

  /* Helper function: shift the longitude. */
  function qsc_shift_lon_origin(lon, offset) {
    var slon = lon + offset;
    if (slon < -SPI) {
      slon += TWO_PI;
    } else if (slon > +SPI) {
      slon -= TWO_PI;
    }
    return slon;
  }

  var names$5 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
  var qsc = {
    init: init$5,
    forward: forward$5,
    inverse: inverse$5,
    names: names$5
  };

  // Robinson projection
  // Based on https://github.com/OSGeo/proj.4/blob/master/src/PJ_robin.c
  // Polynomial coeficients from http://article.gmane.org/gmane.comp.gis.proj-4.devel/6039


  var COEFS_X = [
      [1.0000, 2.2199e-17, -7.15515e-05, 3.1103e-06],
      [0.9986, -0.000482243, -2.4897e-05, -1.3309e-06],
      [0.9954, -0.00083103, -4.48605e-05, -9.86701e-07],
      [0.9900, -0.00135364, -5.9661e-05, 3.6777e-06],
      [0.9822, -0.00167442, -4.49547e-06, -5.72411e-06],
      [0.9730, -0.00214868, -9.03571e-05, 1.8736e-08],
      [0.9600, -0.00305085, -9.00761e-05, 1.64917e-06],
      [0.9427, -0.00382792, -6.53386e-05, -2.6154e-06],
      [0.9216, -0.00467746, -0.00010457, 4.81243e-06],
      [0.8962, -0.00536223, -3.23831e-05, -5.43432e-06],
      [0.8679, -0.00609363, -0.000113898, 3.32484e-06],
      [0.8350, -0.00698325, -6.40253e-05, 9.34959e-07],
      [0.7986, -0.00755338, -5.00009e-05, 9.35324e-07],
      [0.7597, -0.00798324, -3.5971e-05, -2.27626e-06],
      [0.7186, -0.00851367, -7.01149e-05, -8.6303e-06],
      [0.6732, -0.00986209, -0.000199569, 1.91974e-05],
      [0.6213, -0.010418, 8.83923e-05, 6.24051e-06],
      [0.5722, -0.00906601, 0.000182, 6.24051e-06],
      [0.5322, -0.00677797, 0.000275608, 6.24051e-06]
  ];

  var COEFS_Y = [
      [-5.20417e-18, 0.0124, 1.21431e-18, -8.45284e-11],
      [0.0620, 0.0124, -1.26793e-09, 4.22642e-10],
      [0.1240, 0.0124, 5.07171e-09, -1.60604e-09],
      [0.1860, 0.0123999, -1.90189e-08, 6.00152e-09],
      [0.2480, 0.0124002, 7.10039e-08, -2.24e-08],
      [0.3100, 0.0123992, -2.64997e-07, 8.35986e-08],
      [0.3720, 0.0124029, 9.88983e-07, -3.11994e-07],
      [0.4340, 0.0123893, -3.69093e-06, -4.35621e-07],
      [0.4958, 0.0123198, -1.02252e-05, -3.45523e-07],
      [0.5571, 0.0121916, -1.54081e-05, -5.82288e-07],
      [0.6176, 0.0119938, -2.41424e-05, -5.25327e-07],
      [0.6769, 0.011713, -3.20223e-05, -5.16405e-07],
      [0.7346, 0.0113541, -3.97684e-05, -6.09052e-07],
      [0.7903, 0.0109107, -4.89042e-05, -1.04739e-06],
      [0.8435, 0.0103431, -6.4615e-05, -1.40374e-09],
      [0.8936, 0.00969686, -6.4636e-05, -8.547e-06],
      [0.9394, 0.00840947, -0.000192841, -4.2106e-06],
      [0.9761, 0.00616527, -0.000256, -4.2106e-06],
      [1.0000, 0.00328947, -0.000319159, -4.2106e-06]
  ];

  var FXC = 0.8487;
  var FYC = 1.3523;
  var C1 = R2D/5; // rad to 5-degree interval
  var RC1 = 1/C1;
  var NODES = 18;

  var poly3_val = function(coefs, x) {
      return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
  };

  var poly3_der = function(coefs, x) {
      return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
  };

  function newton_rapshon(f_df, start, max_err, iters) {
      var x = start;
      for (; iters; --iters) {
          var upd = f_df(x);
          x -= upd;
          if (Math.abs(upd) < max_err) {
              break;
          }
      }
      return x;
  }

  function init$4() {
      this.x0 = this.x0 || 0;
      this.y0 = this.y0 || 0;
      this.long0 = this.long0 || 0;
      this.es = 0;
      this.title = this.title || "Robinson";
  }

  function forward$4(ll) {
      var lon = adjust_lon(ll.x - this.long0);

      var dphi = Math.abs(ll.y);
      var i = Math.floor(dphi * C1);
      if (i < 0) {
          i = 0;
      } else if (i >= NODES) {
          i = NODES - 1;
      }
      dphi = R2D * (dphi - RC1 * i);
      var xy = {
          x: poly3_val(COEFS_X[i], dphi) * lon,
          y: poly3_val(COEFS_Y[i], dphi)
      };
      if (ll.y < 0) {
          xy.y = -xy.y;
      }

      xy.x = xy.x * this.a * FXC + this.x0;
      xy.y = xy.y * this.a * FYC + this.y0;
      return xy;
  }

  function inverse$4(xy) {
      var ll = {
          x: (xy.x - this.x0) / (this.a * FXC),
          y: Math.abs(xy.y - this.y0) / (this.a * FYC)
      };

      if (ll.y >= 1) { // pathologic case
          ll.x /= COEFS_X[NODES][0];
          ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
      } else {
          // find table interval
          var i = Math.floor(ll.y * NODES);
          if (i < 0) {
              i = 0;
          } else if (i >= NODES) {
              i = NODES - 1;
          }
          for (;;) {
              if (COEFS_Y[i][0] > ll.y) {
                  --i;
              } else if (COEFS_Y[i+1][0] <= ll.y) {
                  ++i;
              } else {
                  break;
              }
          }
          // linear interpolation in 5 degree interval
          var coefs = COEFS_Y[i];
          var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i+1][0] - coefs[0]);
          // find t so that poly3_val(coefs, t) = ll.y
          t = newton_rapshon(function(x) {
              return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
          }, t, EPSLN, 100);

          ll.x /= poly3_val(COEFS_X[i], t);
          ll.y = (5 * i + t) * D2R$1;
          if (xy.y < 0) {
              ll.y = -ll.y;
          }
      }

      ll.x = adjust_lon(ll.x + this.long0);
      return ll;
  }

  var names$4 = ["Robinson", "robin"];
  var robin = {
    init: init$4,
    forward: forward$4,
    inverse: inverse$4,
    names: names$4
  };

  function init$3() {
      this.name = 'geocent';

  }

  function forward$3(p) {
      var point = geodeticToGeocentric(p, this.es, this.a);
      return point;
  }

  function inverse$3(p) {
      var point = geocentricToGeodetic(p, this.es, this.a, this.b);
      return point;
  }

  var names$3 = ["Geocentric", 'geocentric', "geocent", "Geocent"];
  var geocent = {
      init: init$3,
      forward: forward$3,
      inverse: inverse$3,
      names: names$3
  };

  var mode = {
    N_POLE: 0,
    S_POLE: 1,
    EQUIT: 2,
    OBLIQ: 3
  };

  var params = {
    h:     { def: 100000, num: true },           // default is Karman line, no default in PROJ.7
    azi:   { def: 0, num: true, degrees: true }, // default is North
    tilt:  { def: 0, num: true, degrees: true }, // default is Nadir
    long0: { def: 0, num: true },                // default is Greenwich, conversion to rad is automatic
    lat0:  { def: 0, num: true }                 // default is Equator, conversion to rad is automatic
  };

  function init$2() {
    Object.keys(params).forEach(function (p) {
      if (typeof this[p] === "undefined") {
        this[p] = params[p].def;
      } else if (params[p].num && isNaN(this[p])) {
        throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
      } else if (params[p].num) {
        this[p] = parseFloat(this[p]);
      }
      if (params[p].degrees) {
        this[p] = this[p] * D2R$1;
      }
    }.bind(this));

    if (Math.abs((Math.abs(this.lat0) - HALF_PI)) < EPSLN) {
      this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
    } else if (Math.abs(this.lat0) < EPSLN) {
      this.mode = mode.EQUIT;
    } else {
      this.mode = mode.OBLIQ;
      this.sinph0 = Math.sin(this.lat0);
      this.cosph0 = Math.cos(this.lat0);
    }

    this.pn1 = this.h / this.a;  // Normalize relative to the Earth's radius

    if (this.pn1 <= 0 || this.pn1 > 1e10) {
      throw new Error("Invalid height");
    }
    
    this.p = 1 + this.pn1;
    this.rp = 1 / this.p;
    this.h1 = 1 / this.pn1;
    this.pfact = (this.p + 1) * this.h1;
    this.es = 0;

    var omega = this.tilt;
    var gamma = this.azi;
    this.cg = Math.cos(gamma);
    this.sg = Math.sin(gamma);
    this.cw = Math.cos(omega);
    this.sw = Math.sin(omega);
  }

  function forward$2(p) {
    p.x -= this.long0;
    var sinphi = Math.sin(p.y);
    var cosphi = Math.cos(p.y);
    var coslam = Math.cos(p.x);
    var x, y;
    switch (this.mode) {
      case mode.OBLIQ:
        y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
        break;
      case mode.EQUIT:
        y = cosphi * coslam;
        break;
      case mode.S_POLE:
        y = -sinphi;
        break;
      case mode.N_POLE:
        y = sinphi;
        break;
    }
    y = this.pn1 / (this.p - y);
    x = y * cosphi * Math.sin(p.x);

    switch (this.mode) {
      case mode.OBLIQ:
        y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
        break;
      case mode.EQUIT:
        y *= sinphi;
        break;
      case mode.N_POLE:
        y *= -(cosphi * coslam);
        break;
      case mode.S_POLE:
        y *= cosphi * coslam;
        break;
    }

    // Tilt 
    var yt, ba;
    yt = y * this.cg + x * this.sg;
    ba = 1 / (yt * this.sw * this.h1 + this.cw);
    x = (x * this.cg - y * this.sg) * this.cw * ba;
    y = yt * ba;

    p.x = x * this.a;
    p.y = y * this.a;
    return p;
  }

  function inverse$2(p) {
    p.x /= this.a;
    p.y /= this.a;
    var r = { x: p.x, y: p.y };

    // Un-Tilt
    var bm, bq, yt;
    yt = 1 / (this.pn1 - p.y * this.sw);
    bm = this.pn1 * p.x * yt;
    bq = this.pn1 * p.y * this.cw * yt;
    p.x = bm * this.cg + bq * this.sg;
    p.y = bq * this.cg - bm * this.sg;

    var rh = hypot(p.x, p.y);
    if (Math.abs(rh) < EPSLN) {
      r.x = 0;
      r.y = p.y;
    } else {
      var cosz, sinz;
      sinz = 1 - rh * rh * this.pfact;
      sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
      cosz = Math.sqrt(1 - sinz * sinz);
      switch (this.mode) {
        case mode.OBLIQ:
          r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
          p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
          p.x *= sinz * this.cosph0;
          break;
        case mode.EQUIT:
          r.y = Math.asin(p.y * sinz / rh);
          p.y = cosz * rh;
          p.x *= sinz;
          break;
        case mode.N_POLE:
          r.y = Math.asin(cosz);
          p.y = -p.y;
          break;
        case mode.S_POLE:
          r.y = -Math.asin(cosz);
          break;
      }
      r.x = Math.atan2(p.x, p.y);
    }

    p.x = r.x + this.long0;
    p.y = r.y;
    return p;
  }

  var names$2 = ["Tilted_Perspective", "tpers"];
  var tpers = {
    init: init$2,
    forward: forward$2,
    inverse: inverse$2,
    names: names$2
  };

  function init$1() {
      this.flip_axis = (this.sweep === 'x' ? 1 : 0);
      this.h = Number(this.h);
      this.radius_g_1 = this.h / this.a;

      if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
          throw new Error();
      }

      this.radius_g = 1.0 + this.radius_g_1;
      this.C = this.radius_g * this.radius_g - 1.0;

      if (this.es !== 0.0) {
          var one_es = 1.0 - this.es;
          var rone_es = 1 / one_es;

          this.radius_p = Math.sqrt(one_es);
          this.radius_p2 = one_es;
          this.radius_p_inv2 = rone_es;

          this.shape = 'ellipse'; // Use as a condition in the forward and inverse functions.
      } else {
          this.radius_p = 1.0;
          this.radius_p2 = 1.0;
          this.radius_p_inv2 = 1.0;

          this.shape = 'sphere';  // Use as a condition in the forward and inverse functions.
      }

      if (!this.title) {
          this.title = "Geostationary Satellite View";
      }
  }

  function forward$1(p) {
      var lon = p.x;
      var lat = p.y;
      var tmp, v_x, v_y, v_z;
      lon = lon - this.long0;

      if (this.shape === 'ellipse') {
          lat = Math.atan(this.radius_p2 * Math.tan(lat));
          var r = this.radius_p / hypot(this.radius_p * Math.cos(lat), Math.sin(lat));

          v_x = r * Math.cos(lon) * Math.cos(lat);
          v_y = r * Math.sin(lon) * Math.cos(lat);
          v_z = r * Math.sin(lat);

          if (((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2) < 0.0) {
              p.x = Number.NaN;
              p.y = Number.NaN;
              return p;
          }

          tmp = this.radius_g - v_x;
          if (this.flip_axis) {
              p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
              p.y = this.radius_g_1 * Math.atan(v_z / tmp);
          } else {
              p.x = this.radius_g_1 * Math.atan(v_y / tmp);
              p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
          }
      } else if (this.shape === 'sphere') {
          tmp = Math.cos(lat);
          v_x = Math.cos(lon) * tmp;
          v_y = Math.sin(lon) * tmp;
          v_z = Math.sin(lat);
          tmp = this.radius_g - v_x;

          if (this.flip_axis) {
              p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
              p.y = this.radius_g_1 * Math.atan(v_z / tmp);
          } else {
              p.x = this.radius_g_1 * Math.atan(v_y / tmp);
              p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
          }
      }
      p.x = p.x * this.a;
      p.y = p.y * this.a;
      return p;
  }

  function inverse$1(p) {
      var v_x = -1.0;
      var v_y = 0.0;
      var v_z = 0.0;
      var a, b, det, k;

      p.x = p.x / this.a;
      p.y = p.y / this.a;

      if (this.shape === 'ellipse') {
          if (this.flip_axis) {
              v_z = Math.tan(p.y / this.radius_g_1);
              v_y = Math.tan(p.x / this.radius_g_1) * hypot(1.0, v_z);
          } else {
              v_y = Math.tan(p.x / this.radius_g_1);
              v_z = Math.tan(p.y / this.radius_g_1) * hypot(1.0, v_y);
          }

          var v_zp = v_z / this.radius_p;
          a = v_y * v_y + v_zp * v_zp + v_x * v_x;
          b = 2 * this.radius_g * v_x;
          det = (b * b) - 4 * a * this.C;

          if (det < 0.0) {
              p.x = Number.NaN;
              p.y = Number.NaN;
              return p;
          }

          k = (-b - Math.sqrt(det)) / (2.0 * a);
          v_x = this.radius_g + k * v_x;
          v_y *= k;
          v_z *= k;

          p.x = Math.atan2(v_y, v_x);
          p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
          p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
      } else if (this.shape === 'sphere') {
          if (this.flip_axis) {
              v_z = Math.tan(p.y / this.radius_g_1);
              v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1.0 + v_z * v_z);
          } else {
              v_y = Math.tan(p.x / this.radius_g_1);
              v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1.0 + v_y * v_y);
          }

          a = v_y * v_y + v_z * v_z + v_x * v_x;
          b = 2 * this.radius_g * v_x;
          det = (b * b) - 4 * a * this.C;
          if (det < 0.0) {
              p.x = Number.NaN;
              p.y = Number.NaN;
              return p;
          }

          k = (-b - Math.sqrt(det)) / (2.0 * a);
          v_x = this.radius_g + k * v_x;
          v_y *= k;
          v_z *= k;

          p.x = Math.atan2(v_y, v_x);
          p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
      }
      p.x = p.x + this.long0;
      return p;
  }

  var names$1 = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
  var geos = {
      init: init$1,
      forward: forward$1,
      inverse: inverse$1,
      names: names$1,
  };

  /**
   * Copyright 2018 Bernie Jenny, Monash University, Melbourne, Australia.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * Equal Earth is a projection inspired by the Robinson projection, but unlike
   * the Robinson projection retains the relative size of areas. The projection
   * was designed in 2018 by Bojan Savric, Tom Patterson and Bernhard Jenny.
   *
   * Publication:
   * Bojan Savric, Tom Patterson & Bernhard Jenny (2018). The Equal Earth map
   * projection, International Journal of Geographical Information Science,
   * DOI: 10.1080/13658816.2018.1504949
   *
   * Code released August 2018
   * Ported to JavaScript and adapted for mapshaper-proj by Matthew Bloch August 2018
   * Modified for proj4js by Andreas Hocevar by Andreas Hocevar March 2024
   */


  var A1 = 1.340264,
      A2 = -0.081106,
      A3 = 0.000893,
      A4 = 0.003796,
      M = Math.sqrt(3) / 2.0;

  function init() {
    this.es = 0;
    this.long0 = this.long0 !== undefined ? this.long0 : 0;
  }

  function forward(p) {
    var lam = adjust_lon(p.x - this.long0);
    var phi = p.y;
    var paramLat = Math.asin(M * Math.sin(phi)),
    paramLatSq = paramLat * paramLat,
    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
    p.x = lam * Math.cos(paramLat) /
    (M * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
    p.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));

    p.x = this.a * p.x + this.x0;
    p.y = this.a * p.y + this.y0;
    return p;
  }

  function inverse(p) {
    p.x = (p.x - this.x0) / this.a;
    p.y = (p.y - this.y0) / this.a;

    var EPS = 1e-9,
        NITER = 12,
        paramLat = p.y,
        paramLatSq, paramLatPow6, fy, fpy, dlat, i;

    for (i = 0; i < NITER; ++i) {
      paramLatSq = paramLat * paramLat;
      paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
      fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p.y;
      fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
      paramLat -= dlat = fy / fpy;
      if (Math.abs(dlat) < EPS) {
          break;
      }
    }
    paramLatSq = paramLat * paramLat;
    paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
    p.x = M * p.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) /
            Math.cos(paramLat);
    p.y = Math.asin(Math.sin(paramLat) / M);

    p.x = adjust_lon(p.x + this.long0);
    return p;
  }

  var names = ["eqearth", "Equal Earth", "Equal_Earth"];
  var eqearth = {
    init: init,
    forward: forward,
    inverse: inverse,
    names: names
  };

  function includedProjections(proj4){
    proj4.Proj.projections.add(tmerc);
    proj4.Proj.projections.add(etmerc);
    proj4.Proj.projections.add(utm);
    proj4.Proj.projections.add(sterea);
    proj4.Proj.projections.add(stere);
    proj4.Proj.projections.add(somerc);
    proj4.Proj.projections.add(omerc);
    proj4.Proj.projections.add(lcc);
    proj4.Proj.projections.add(krovak);
    proj4.Proj.projections.add(cass);
    proj4.Proj.projections.add(laea);
    proj4.Proj.projections.add(aea);
    proj4.Proj.projections.add(gnom);
    proj4.Proj.projections.add(cea);
    proj4.Proj.projections.add(eqc);
    proj4.Proj.projections.add(poly);
    proj4.Proj.projections.add(nzmg);
    proj4.Proj.projections.add(mill);
    proj4.Proj.projections.add(sinu);
    proj4.Proj.projections.add(moll);
    proj4.Proj.projections.add(eqdc);
    proj4.Proj.projections.add(vandg);
    proj4.Proj.projections.add(aeqd);
    proj4.Proj.projections.add(ortho);
    proj4.Proj.projections.add(qsc);
    proj4.Proj.projections.add(robin);
    proj4.Proj.projections.add(geocent);
    proj4.Proj.projections.add(tpers);
    proj4.Proj.projections.add(geos);
    proj4.Proj.projections.add(eqearth);
  }

  proj4.defaultDatum = 'WGS84'; //default datum
  proj4.Proj = Projection;
  proj4.WGS84 = new proj4.Proj('WGS84');
  proj4.Point = Point;
  proj4.toPoint = common;
  proj4.defs = defs;
  proj4.nadgrid = nadgrid;
  proj4.transform = transform;
  proj4.mgrs = mgrs;
  proj4.version = '__VERSION__';
  includedProjections(proj4);

  // PROJ4 strings based on https://github.com/NCAR/wrf-python/blob/develop/src/wrf/projection.py
  var WrfProjection = /*#__PURE__*/function () {
    function WrfProjection(params) {
      _classCallCheck(this, WrfProjection);
      this._params = Object.assign({
        map_proj: null,
        ref_lat: null,
        ref_lon: null,
        truelat1: null,
        truelat2: null,
        stand_lon: null,
        dx: null,
        dy: null,
        e_we: null,
        e_sn: null
      }, params);
      switch (this._params.map_proj) {
        // Lambert Conformal Conic
        case WrfProjections.lambert:
          this._proj4 = '+units=m' + ' +proj=lcc' + ' +lat_1=' + this._params.truelat1 + ' +lat_2=' + this._params.truelat2 + ' +lat_0=' + this._params.ref_lat + ' +lon_0=' + this._params.stand_lon + ' +a=' + EarthRadius + ' +b=' + EarthRadius + ' +towgs84=0,0,0' + ' +no_defs=True';
          break;

        // Mercator
        case WrfProjections.mercator:
          this._proj4 = '+units=m' + ' +proj=merc' + ' +lat_ts=' + this._params.truelat1 + ' +lon_0=' + this._getValue(this._params.stand_lon, 0) + ' +a=' + EarthRadius + ' +b=' + EarthRadius + ' +towgs84=0,0,0' + ' +no_defs=True' + ' +nadgrids=null';
          break;

        // Polar stereographic
        case WrfProjections.polar:
          {
            var hemi = this._params.truelat1 < 0 ? -90 : 90;
            var lat_ts = this._params.truelat1;
            this._proj4 = '+units=m' + ' +proj=stere' + ' +lat_0=' + hemi + ' +lon_0=' + this._params.stand_lon + ' +lat_ts=' + lat_ts + ' +a=' + EarthRadius + ' +b=' + EarthRadius;
            break;
          }

        // Regular latitude-longitude, or cylindrical equidistant
        case WrfProjections.latlon:
          {
            this._proj4 = '+units=m' + ' +proj=eqc' + ' +lon_0=' + this._params.stand_lon + ' +a=' + EarthRadius + ' +b=' + EarthRadius + ' +nadgrids=null' + ' +towgs84=0,0,0' + ' +no_defs=True';
            break;
          }
        default:
          throw "Unsupported projection " + this._wps.map_proj;
      }
    }
    return _createClass(WrfProjection, [{
      key: "_getValue",
      value: function _getValue(value, defaultValue) {
        if (isNaN(value) || value === null || value === undefined) {
          return defaultValue;
        }
        return value;
      }
    }, {
      key: "latlon_to_ij",
      value: function latlon_to_ij(lat, lon) {
        if (isNaN(lat) || isNaN(lon)) {
          throw new Error('Invalid lat-lon coordinates');
        }
        return proj4(WrfProjection._wrf_proj, this._proj4, [lon, lat]);
      }
    }, {
      key: "ij_to_latlon",
      value: function ij_to_latlon(i, j) {
        if (isNaN(i) || isNaN(j)) {
          throw new Error('Invalid IJ coordinates');
        }
        var lonlat = proj4(this._proj4, WrfProjection._wrf_proj, [i, j]);
        return [lonlat[1], lonlat[0]];
      }
    }]);
  }();
  // Spherical latlon used by WRF
  // see https://fabienmaussion.info/2018/01/06/wrf-projection/
  _defineProperty(WrfProjection, "_wrf_proj", '+units=m +proj=longlat +a=' + EarthRadius + ' +b=' + EarthRadius + '  +towgs84=0,0,0 +no_defs=True');

  var Geogrid = /*#__PURE__*/function () {
    function Geogrid(id, wps, parent) {
      _classCallCheck(this, Geogrid);
      this._wps = Object.assign({
        map_proj: null,
        ref_lat: null,
        ref_lon: null,
        truelat1: null,
        truelat2: null,
        stand_lon: null,
        pole_lat: null,
        pole_lon: null,
        ref_x: null,
        ref_y: null,
        dx: null,
        dy: null,
        s_we: 1,
        s_sn: 1,
        e_we: null,
        e_sn: null,
        parent_grid_ratio: null,
        i_parent_start: null,
        j_parent_start: null
      }, wps);
      if (parent) {
        this.parent = parent;
        if (this._wps.parent_grid_ratio === null) {
          throw new Error('parent_grid_ratio must be specified for nested grids');
        }
        if (this._wps.i_parent_start === null) {
          throw new Error('i_parent_start must be specified for nested grids');
        }
        if (this._wps.j_parent_start === null) {
          throw new Error('j_parent_start must be specified for nested grids');
        }
      } else {
        this.parent = null;
      }
      if (typeof id === 'Number') {
        this.id = "d".concat(id.toString().padStart('0', 2));
      } else {
        this.id = id.toString();
      }
      this._initialize();
    }
    return _createClass(Geogrid, [{
      key: "wps",
      get: function get() {
        return this._wps;
      }
    }, {
      key: "projection",
      get: function get() {
        return this._projection;
      }
    }, {
      key: "corners",
      get: function get() {
        return this._corners;
      }
    }, {
      key: "parent_grid_ratio",
      get: function get() {
        return this._wps.parent_grid_ratio;
      }
    }, {
      key: "i_parent_start",
      get: function get() {
        return this._wps.i_parent_start;
      }
    }, {
      key: "j_parent_start",
      get: function get() {
        return this._wps.j_parent_start;
      }
    }, {
      key: "e_we",
      get: function get() {
        return this._wps.e_we;
      }
    }, {
      key: "e_sn",
      get: function get() {
        return this._wps.e_sn;
      }
    }, {
      key: "polygonPath",
      get: function get() {
        if (!this._polygonPath) {
          this._polygonPath = this._initPolygonPath();
        }
        return this._polygonPath;
      }
    }, {
      key: "_initialize",
      value: function _initialize() {
        this._proj_ref_lat = this._wps.ref_lat;
        this._proj_ref_lon = this._wps.ref_lon;
        this._proj_truelat1 = this._wps.truelat1;
        this._proj_truelat2 = this._wps.truelat2;
        this._proj_stand_lon = this._wps.stand_lon;
        this._proj_dx = this._wps.dx;
        this._proj_dy = this._wps.dy;
        this._proj_e_we = this._wps.e_we;
        this._proj_e_sn = this._wps.e_sn;

        // i,j start on a grid with nets's DX,DY
        var i_moad_start = 0,
          j_moad_start = 0;
        var nest = this.parent !== null;
        console.debug("Initializing grid ".concat(this.id));
        console.debug(' WPS:');
        console.debug("  ref_lat: ".concat(this._wps.ref_lat));
        console.debug("  ref_lon: ".concat(this._wps.ref_lon));
        console.debug("  truelat1: ".concat(this._wps.truelat1));
        console.debug("  truelat2: ".concat(this._wps.truelat2));
        console.debug("  stand_lon: ".concat(this._wps.stand_lon));
        console.debug("  pole_lat: ".concat(this._wps.pole_lat));
        console.debug("  pole_lon: ".concat(this._wps.pole_lon));
        if (this._wps.map_proj === WrfProjections.latlon) {
          console.debug("  dx: ".concat(this._wps.dx, " deg"));
          console.debug("  dy: ".concat(this._wps.dy, " deg"));
        } else {
          console.debug("  dx: ".concat(this._proj_dx, "m"));
          console.debug("  dy: ".concat(this._proj_dy, "m"));
        }
        console.debug("  e_sn: ".concat(this._wps.e_sn));
        console.debug("  e_we: ".concat(this._wps.e_we));

        // conver DX,DY from degrees to meters
        if (this._wps.map_proj === WrfProjections.latlon) {
          // If no dx,dy specified, assume global grid
          if (isNaN(this._wps.dx) && isNaN(this._wps.dy)) {
            var dlondeg = 360 / (this._wps.e_we - this._wps.s_we);
            var dlatdeg = 180 / (this._wps.e_sn - this._wps.s_sn);
            this._proj_ref_lon = this._wps.stand_lon + dlondeg / 2;
            this._proj_ref_lat = -90. + dlatdeg / 2;
            this._proj_dx = EarthRadius * Math.PI * 2.0 / (this._wps.e_we - this._wps.s_we);
            this._proj_dy = EarthRadius * Math.PI / (this._wps.e_sn - this._wps.s_sn);
          } else {
            this._proj_dx = degreesToMeters(this._wps.dx);
            this._proj_dy = degreesToMeters(this._wps.dy);
            if (this._wps.ref_lat === null && this._wps.ref_lon === null) {
              throw new Error('For lat-lon projection, if dx/dy are specified, a regional domain is assumed, and a ref_lat,ref_lon must also be specified');
            }
          }
          console.debug("  dx: ".concat(this._proj_dx, "m"));
          console.debug("  dy: ".concat(this._proj_dy, "m"));
        }
        if (nest) {
          console.debug(' Nest:');
          console.debug("  parent_grid_ratio: ".concat(this.parent_grid_ratio));
          console.debug("  i_parent_start: ".concat(this.i_parent_start));
          console.debug("  j_parent_start: ".concat(this.j_parent_start));
          var
            // grid ratio to MOAD grid
            moad_grid_ratio = 1,
            // temp grid holder
            grid = this;

          // grid point to MOAD after existing the while loop
          while (grid.parent != null) {
            moad_grid_ratio *= grid.parent_grid_ratio;
            i_moad_start += (grid.i_parent_start - 1) * moad_grid_ratio;
            j_moad_start += (grid.j_parent_start - 1) * moad_grid_ratio;
            grid = grid.parent;
          }
          console.debug("  moad_grid_ratio: ".concat(moad_grid_ratio));
          console.debug("  i_moad_start: ".concat(i_moad_start));
          console.debug("  j_moad_start: ".concat(j_moad_start));

          // set projection to cover whole MOAD grid
          this._proj_dx = this._proj_dx / moad_grid_ratio;
          this._proj_dy = this._proj_dy / moad_grid_ratio;
          this._proj_e_we = (grid.e_we - 1) * moad_grid_ratio + 1;
          this._proj_e_sn = (grid.e_sn - 1) * moad_grid_ratio + 1;
          console.debug("  dx: ".concat(this._proj_dx, "m"));
          console.debug("  dy: ".concat(this._proj_dy, "m"));
          console.debug("  e_sn: ".concat(this._proj_e_sn));
          console.debug("  e_we: ".concat(this._proj_e_we));
        }
        this._projection = new WrfProjection({
          map_proj: this._wps.map_proj,
          ref_lat: this._proj_ref_lat,
          ref_lon: this._proj_ref_lon,
          truelat1: this._proj_truelat1,
          truelat2: this._proj_truelat2,
          stand_lon: this._proj_stand_lon,
          dx: this._proj_dx,
          dy: this._proj_dy,
          e_we: this._proj_e_we,
          e_sn: this._proj_e_sn
        });

        // mass grid starts from center of SW grid cell - point 0, 0
        var mass_grid_size_i = (this._proj_e_we - 2) * this._proj_dx;
        var mass_grid_size_j = (this._proj_e_sn - 2) * this._proj_dy;

        // corners grid starts from SW corner - point 0, 0
        var unstaggered_grid_size_i = (this._proj_e_we - 1) * this._proj_dx;
        var unstaggered_grid_size_j = (this._proj_e_sn - 1) * this._proj_dy;
        console.debug("  unstaggered_grid_size_i: ".concat(unstaggered_grid_size_i, "m"));
        console.debug("  unstaggered_grid_size_j: ".concat(unstaggered_grid_size_j, "m"));
        var grid_center_ij = this._projection.latlon_to_ij(this._proj_ref_lat, this._proj_ref_lon);
        console.debug("  grid_center_ij: [".concat(grid_center_ij[0], ", ").concat(grid_center_ij[1], "]"));
        this._mass_offset_i = grid_center_ij[0] - mass_grid_size_i * 0.5;
        this._mass_offset_j = grid_center_ij[1] - mass_grid_size_j * 0.5;
        this._unstaggered_offset_i = grid_center_ij[0] - unstaggered_grid_size_i * 0.5 + i_moad_start * this._proj_dx;
        this._unstaggered_offset_j = grid_center_ij[1] - unstaggered_grid_size_j * 0.5 + j_moad_start * this._proj_dy;
        console.debug("  unstaggered_offset_i: ".concat(this._unstaggered_offset_i, "m"));
        console.debug("  unstaggered_offset_j: ".concat(this._unstaggered_offset_j, "m"));
        this._corners = {
          sw: this.unstaggered_ij_to_latlon(0, 0),
          se: this.unstaggered_ij_to_latlon(this._wps.e_we - 1, 0),
          ne: this.unstaggered_ij_to_latlon(this._wps.e_we - 1, this._wps.e_sn - 1),
          nw: this.unstaggered_ij_to_latlon(0, this._wps.e_sn - 1)
        };
      }

      // function return grid polygon path
    }, {
      key: "_initPolygonPath",
      value: function _initPolygonPath() {
        var i,
          j,
          path = [],
          step = 5;
        path.push(this._corners.sw);
        for (i = step; i < this._wps.e_we - 1 - step; i += step) {
          path.push(this.unstaggered_ij_to_latlon(i, 0));
        }
        path.push(this._corners.se);
        for (j = step; j < this._wps.e_sn - 1 - step; j += step) {
          path.push(this.unstaggered_ij_to_latlon(this._wps.e_we - 1, j));
        }
        path.push(this._corners.ne);
        for (i = this._wps.e_we - 1 - step; i > step; i -= step) {
          path.push(this.unstaggered_ij_to_latlon(i, this._wps.e_sn - 1));
        }
        path.push(this._corners.nw);
        for (j = this._wps.e_sn - 1 - step; j > step; j -= step) {
          path.push(this.unstaggered_ij_to_latlon(0, j));
        }
        path.push(this._corners.sw);
        return path;
      }

      //Convert latitude and longitude into grid corners coordinates
    }, {
      key: "latlon_to_unstaggered_ij",
      value: function latlon_to_unstaggered_ij(lat, lon) {
        var ij = this._projection.latlon_to_ij(lat, lon);
        ij[0] = (ij[0] - this._unstaggered_offset_i) / this._proj_dx;
        ij[1] = (ij[1] - this._unstaggered_offset_j) / this._proj_dy;
        return ij;
      }

      // Convert grid corners coordinates to latitude and longitude
      // (0, 0) is the SW corner
      // NE corner is(e_we - 1, e_sn - 1)
    }, {
      key: "unstaggered_ij_to_latlon",
      value: function unstaggered_ij_to_latlon(i, j) {
        // transform coordinates to lat, lon
        return this._projection.ij_to_latlon(i * this._proj_dx + this._unstaggered_offset_i, j * this._proj_dy + this._unstaggered_offset_j);
      }
    }]);
  }();

  var WRFDomainGrid = L.Polygon.extend({
    statics: {
      // min grid points a nest domain should be
      // from parent edge
      minNestGridPoints: 5,
      // minimum grid size
      minGridSize: 10,
      // default parent grid ratio
      defaultGridRatio: 3,
      // minimum pixel per grid to show grid lines
      minPixelsPerGrid: 7,
      IAxisOpt: Object.freeze({
        I_PARENT_START: 0,
        E_WE: 1
      }),
      JAxisOpt: Object.freeze({
        J_PARENT_START: 0,
        E_SN: 1
      })
    },
    options: {
      showTooltip: true,
      showGridLines: false,
      editable: true,
      opacity: 0.8,
      weight: 2,
      color: '#FF0000',
      fillColor: '#FF0000',
      fillOpacity: 0.2,
      className: 'wrf-domain-grid'
    },
    // domain object containing grid
    domain: null,
    // parent grid object
    parent: null,
    // grid id
    id: null,
    // WPS grid parameters
    parent_grid_ratio: 1,
    i_parent_start: 1,
    j_parent_start: 1,
    e_we: 0,
    e_sn: 0,
    geog_data_res: 'default',
    // grid lines
    _gridLinesLayer: null,
    _iGridLines: null,
    _jGridLines: null,
    _enableGridLines: true,
    _createGridLinesPane: function _createGridLinesPane() {
      if (!this._map) {
        return null;
      }
      var pane = this._map.getPane('gridLinesPane');
      if (!pane) {
        pane = this._map.createPane('gridLinesPane');
      }
      return L.layerGroup(null, {
        'pane': 'gridLinesPane'
      });
    },
    // corner markers
    _cornerMarkers: null,
    _corners: null,
    // grid state
    _isSelected: false,
    nests: null,
    geogrid: null,
    _initGeogrid: function _initGeogrid() {
      var _this$parent;
      return new Geogrid(this.id, {
        map_proj: this.domain.map_proj,
        ref_lat: this.domain.ref_lat,
        ref_lon: this.domain.ref_lon,
        truelat1: this.domain.truelat1,
        truelat2: this.domain.truelat2,
        stand_lon: this.domain.stand_lon,
        dx: this.domain.dx,
        dy: this.domain.dy,
        e_we: this.e_we,
        e_sn: this.e_sn,
        parent_grid_ratio: this.parent_grid_ratio,
        i_parent_start: this.i_parent_start,
        j_parent_start: this.j_parent_start
      }, (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.geogrid);
    },
    _initCorners: function _initCorners() {
      return {
        sw: L.latLng(this.geogrid.corners.sw),
        se: L.latLng(this.geogrid.corners.se),
        ne: L.latLng(this.geogrid.corners.ne),
        nw: L.latLng(this.geogrid.corners.nw)
      };
    },
    // on map zoomeend handler
    _onMapViewChanged: function _onMapViewChanged() {
      // if grid is selected update grid lines when map moves or zoom changes
      if (this._isSelected) {
        this._updateGridLines();
      }
    },
    // function updates polygon tooltip content
    // used as polygon mousemove handler
    _getTooltipContent: function _getTooltipContent(latlng) {
      var content = '<table><thead><tr><th>' + this.name + '</th><th></th></tr></thead>';
      content += '<tbody>';
      var ij = this.geogrid.latlon_to_unstaggered_ij(latlng.lat, latlng.lng);
      content += '<tr><td>i,j</td><td>' + Math.ceil(ij[0]) + ', ' + Math.ceil(ij[1]) + '</td></tr>';
      content += '<tr><td>lat,lon</td><td>' + latlng.lat.toFixed(2) + ', ' + latlng.lng.toFixed(2) + '</td></tr>';
      content += '</tbody>';
      content += '</table>';
      return content;
    },
    _updateTooltip: function _updateTooltip(e) {
      var tooltip = this.getTooltip();
      if (tooltip) {
        var element = tooltip.getElement();
        if (element) {
          element.innerHTML = this._getTooltipContent(e.latlng);
        }
      }
    },
    // polygon on click handler
    // selects this grid
    _onPolygonClick: function _onPolygonClick(e) {
      if (e.originalEvent.ctrlKey) {
        this.unselect();
      } else {
        this.select();
      }
    },
    _bindTooltip: function _bindTooltip(e) {
      if (this.options.showTooltip) {
        this.on('mousemove', this._updateTooltip, this);
        L.Polygon.prototype.bindTooltip.call(this, e && e.latlng ? this._getTooltipContent(e.latlng) : '', {
          'sticky': true,
          'className': 'wrf-domain-grid-tooltip'
        });
      }
    },
    bindTooltip: function bindTooltip(e) {
      this._bindTooltip(e);
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].bindTooltip(e);
      }
    },
    _unbindTooltip: function _unbindTooltip() {
      L.Polygon.prototype.unbindTooltip.call(this);
      this.off('mousemove', this._updateTooltip, this);
    },
    unbindTooltip: function unbindTooltip() {
      if (this.getTooltip()) {
        this._unbindTooltip();
      }
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].unbindTooltip();
      }
    },
    // resize context object
    _resizeContext: null,
    // end resizing
    _resizeEnd: function _resizeEnd(e) {
      this.domain.grid.bindTooltip();
      this._map.dragging.enable();
      this._map.off('mousemove', this._resize, this);
      this._map.off('mouseup', this._resizeEnd, this);
      this._map.off('mouseout', this._resizeEnd, this);
      if (this._resizeContext.resizeStarted) {
        this.showGridLines();
        if (this.parent) {
          this.parent.hideGridLines();
        }
      }
      this._resizeContext = null;
    },
    _resizeStart: function _resizeStart(e, iAxisOpt, jAxisOpt) {
      var min_i_parent_start, min_j_parent_start, min_i_delta_end, min_j_delta_end, i;

      // set up event handlers
      this._map.once('mouseup', this._resizeEnd, this);
      this._map.once('mouseout', this._resizeEnd, this);
      // prevent map dragging
      this._map.dragging.disable();
      // prevent tooltips
      this.domain.grid.unbindTooltip();

      // find the smallest gap between the edge of this grid and all nests
      for (i = 0; i < this.nests.length; i++) {
        if (i == 0) {
          min_i_parent_start = this.nests[i].i_parent_start;
          min_j_parent_start = this.nests[i].j_parent_start;
          min_i_delta_end = this.nests[i].i_delta_end;
          min_j_delta_end = this.nests[i].j_delta_end;
        } else {
          min_i_parent_start = Math.min(min_i_parent_start, this.nests[i].i_parent_start);
          min_j_parent_start = Math.min(min_j_parent_start, this.nests[i].j_parent_start);
          min_i_delta_end = Math.min(min_i_delta_end, this.nests[i].i_delta_end);
          min_j_delta_end = Math.min(min_j_delta_end, this.nests[i].j_delta_end);
        }
      }
      this._resizeContext = {
        resizeStarted: false,
        // stand_lon, truelat1, truelat2 delta which must be preserved
        stand_lon_delta: this.domain.stand_lon - this.domain.ref_lon,
        truelat1_delta: this.domain.truelat1 - this.domain.ref_lat,
        truelat2_delta: this.domain.truelat2 - this.domain.ref_lat,
        // calculate min allowed absolute value for e_we, e_sn
        min_e_we: min_i_delta_end ? this.e_we - min_i_delta_end + WRFDomainGrid.minNestGridPoints : WRFDomainGrid.minGridSize,
        mine_sn: min_j_delta_end ? this.e_sn - min_j_delta_end + WRFDomainGrid.minNestGridPoints : WRFDomainGrid.minGridSize,
        // calculate max allowed absolute value for e_we, e_sn
        max_e_we: this.parent ? (this.i_delta_end - WRFDomainGrid.minNestGridPoints) * this.parent_grid_ratio + this.e_we : 0,
        maxe_sn: this.parent ? (this.j_delta_end - WRFDomainGrid.minNestGridPoints) * this.parent_grid_ratio + this.e_sn : 0,
        // calculate min allowed absolute value for i_parent_start, j_parent_start
        min_i_parent_start: this.parent ? WRFDomainGrid.minNestGridPoints - this.i_parent_start + 1 : 0,
        min_j_parent_start: this.parent ? WRFDomainGrid.minNestGridPoints - this.j_parent_start + 1 : 0,
        // calculate max allowed absolute value for i_parent_start, j_parent_start
        max_i_parent_start: min_i_parent_start ? Math.floor((min_i_parent_start - WRFDomainGrid.minNestGridPoints - 1) / this.parent_grid_ratio) : this.parent ? Math.floor((this.e_we - WRFDomainGrid.minGridSize) / this.parent_grid_ratio) : this.e_we - WRFDomainGrid.minGridSize,
        max_j_parent_start: min_j_parent_start ? Math.floor((min_j_parent_start - WRFDomainGrid.minNestGridPoints - 1) / this.parent_grid_ratio) : this.parent ? Math.floor((this.e_sn - WRFDomainGrid.minGridSize) / this.parent_grid_ratio) : this.e_sn - WRFDomainGrid.minGridSize,
        // holds modulo delta i and j when resizing a nest
        mod_delta_i: 0,
        mod_delta_j: 0,
        // indicates which value is being modified along i and j axis
        iAxisOpt: iAxisOpt,
        jAxisOpt: jAxisOpt,
        // start point coordinates
        startLatlng: e.latlng
      };
    },
    // resize event handler
    _resize: function _resize(e) {
      if (!this._resizeContext.resizeStarted) {
        this._resizeContext.resizeStarted = true;
        this._enableGridLines = false;
        if (this._iGridLines) {
          // remove all grid lines since the geometry changes when resizing
          this._removeGridLines();
        }
        if (this.parent) {
          // show parent's grid lines 
          this.parent.showGridLines();
        }
        return;
      }

      // get absolute change in ij coordinates
      var ij = this.geogrid.latlon_to_unstaggered_ij(e.latlng.lat, e.latlng.lng);
      var delta_i = nearestIntToZero(ij[0]);
      var delta_j = nearestIntToZero(ij[1]);

      // when resizing e_we or e_sn (moving end point along i or j axis) the delta must be recalculated
      if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
        delta_i -= this.e_we - 1;
      }
      if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
        delta_j -= this.e_sn - 1;
      }
      if (this.parent) {
        if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.I_PARENT_START) {
          delta_i += this._resizeContext.mod_delta_i;
          this._resizeContext.mod_delta_i = delta_i % this.parent_grid_ratio;
          var i_parent_start_delta = (delta_i - this._resizeContext.mod_delta_i) / this.parent_grid_ratio;
          if (i_parent_start_delta > this._resizeContext.max_i_parent_start) {
            i_parent_start_delta = this._resizeContext.max_i_parent_start;
            this._resizeContext.max_i_parent_start = 0;
          } else {
            this._resizeContext.max_i_parent_start -= i_parent_start_delta;
          }
          if (i_parent_start_delta < this._resizeContext.min_i_parent_start) {
            this._resizeContext.max_i_parent_start += i_parent_start_delta - this._resizeContext.min_i_parent_start;
            i_parent_start_delta = this._resizeContext.min_i_parent_start;
            this._resizeContext.min_i_parent_start = 0;
          } else {
            this._resizeContext.min_i_parent_start -= i_parent_start_delta;
          }
          this.e_we -= i_parent_start_delta * this.parent_grid_ratio;
          this.i_parent_start += i_parent_start_delta;
          for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].i_parent_start -= i_parent_start_delta * this.parent_grid_ratio;
          }
        } else if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
          var e_we = Math.max(this.e_we + delta_i, this._resizeContext.min_e_we);
          e_we = Math.min(e_we, this._resizeContext.max_e_we);
          this.e_we = e_we - (e_we - 1) % this.parent_grid_ratio;
        }
        if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.J_PARENT_START) {
          delta_j += this._resizeContext.mod_delta_j;
          this._resizeContext.mod_delta_j = delta_j % this.parent_grid_ratio;
          var j_parent_start_delta = (delta_j - this._resizeContext.mod_delta_j) / this.parent_grid_ratio;
          if (j_parent_start_delta > this._resizeContext.max_j_parent_start) {
            j_parent_start_delta = this._resizeContext.max_j_parent_start;
            this._resizeContext.max_j_parent_start = 0;
          } else {
            this._resizeContext.max_j_parent_start -= j_parent_start_delta;
          }
          if (j_parent_start_delta < this._resizeContext.min_j_parent_start) {
            this._resizeContext.max_j_parent_start += j_parent_start_delta - this._resizeContext.min_j_parent_start;
            j_parent_start_delta = this._resizeContext.min_j_parent_start;
            this._resizeContext.min_j_parent_start = 0;
          } else {
            this._resizeContext.min_j_parent_start -= j_parent_start_delta;
          }
          this.e_sn -= j_parent_start_delta * this.parent_grid_ratio;
          this.j_parent_start += j_parent_start_delta;
          for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].j_parent_start -= j_parent_start_delta * this.parent_grid_ratio;
          }
        } else if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
          var e_sn = Math.max(this.e_sn + delta_j, this._resizeContext.mine_sn);
          e_sn = Math.min(e_sn, this._resizeContext.maxe_sn);
          //bug
          this.e_sn = e_sn - (e_sn - 1) % this.parent_grid_ratio;
        }
        this.update();
      } else {
        var center, center_i, center_j, e_we, e_sn;
        if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.I_PARENT_START) {
          if (delta_i > this._resizeContext.max_i_parent_start) {
            delta_i = this._resizeContext.max_i_parent_start;
            this._resizeContext.max_i_parent_start = 0;
          } else {
            this._resizeContext.max_i_parent_start -= delta_i;
          }
          center_i = (this.e_we - 1 + delta_i) / 2;
        } else if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
          e_we = Math.max(this.e_we + delta_i, this._resizeContext.min_e_we);
          center_i = (e_we - 1) / 2;
        }
        if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.J_PARENT_START) {
          if (delta_j > this._resizeContext.max_j_parent_start) {
            delta_j = this._resizeContext.max_j_parent_start;
            this._resizeContext.max_j_parent_start = 0;
          } else {
            this._resizeContext.max_j_parent_start -= delta_j;
          }
          center_j = (this.e_sn - 1 + delta_j) / 2;
        } else if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
          e_sn = Math.max(this.e_sn + delta_j, this._resizeContext.mine_sn);
          center_j = (e_sn - 1) / 2;
        }
        center = this.geogrid.unstaggered_ij_to_latlon(center_i, center_j);
        this.domain.ref_lat = center[0];
        this.domain.ref_lon = center[1];
        //this.domain.stand_lon = this.domain.ref_lon + this._resizeContext.stand_lon_delta;
        //this.domain.truelat1 = this.domain.ref_lat + this._resizeContext.truelat1_delta;
        //this.domain.truelat2 = this.domain.ref_lat + this._resizeContext.truelat2_delta;

        if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.I_PARENT_START) {
          this.e_we -= delta_i;
          for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].i_parent_start -= delta_i;
          }
        } else if (this._resizeContext.iAxisOpt == WRFDomainGrid.IAxisOpt.E_WE) {
          this.e_we = e_we;
        }
        if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.J_PARENT_START) {
          this.e_sn -= delta_j;
          for (var i = 0; i < this.nests.length; i++) {
            this.nests[i].j_parent_start -= delta_j;
          }
        } else if (this._resizeContext.jAxisOpt == WRFDomainGrid.JAxisOpt.E_SN) {
          this.e_sn = e_sn;
        }
        this.domain.update();
      }
    },
    _log: function _log(header) {
      if (header) {
        console.log(header);
      }
      console.log('  ref_lat: ' + this.domain.ref_lat);
      console.log('  ref_lon: ' + this.domain.ref_lon);
      console.log('  stand_lon: ' + this.domain.stand_lon);
      console.log('  truelat1: ' + this.domain.truelat1);
      console.log('  truelat2: ' + this.domain.truelat2);
      console.log('  i_parent_start: ' + this.i_parent_start);
      console.log('  j_parent_start: ' + this.j_parent_start);
      console.log('  e_we: ' + this.e_we);
      console.log('  e_sn: ' + this.e_sn);
    },
    _dragContext: null,
    _dragEnd: function _dragEnd(e) {
      this.domain.grid.bindTooltip(e);
      this._map.dragging.enable();
      this._map.off('mousemove', this._drag, this);
      this._map.off('mouseup', this._dragEnd, this);
      this._map.off('mouseout', this._dragEnd, this);
      this._enableGridLines = true;
      if (this._dragContext.dragStarted) {
        this._drawGridLines();
        if (this.parent) {
          this.parent.hideGridLines();
        }
      }
      this._dragContext = null;
    },
    _dragStart: function _dragStart(e) {
      this._map.once('mouseup', this._dragEnd, this);
      this._map.once('mouseout', this._dragEnd, this);
      this._map.dragging.disable();
      this.domain.grid.unbindTooltip();

      // save start location
      this._dragContext = {
        dragStarted: false,
        ref_lat: this.domain.ref_lat,
        ref_lon: this.domain.ref_lon,
        stand_lon: this.domain.stand_lon,
        truelat1: this.domain.truelat1,
        truelat2: this.domain.truelat2,
        startLatLng: e.latlng,
        startIJ: this.geogrid.latlon_to_unstaggered_ij(e.latlng.lat, e.latlng.lng),
        delta_i: 0,
        delta_j: 0,
        max_delta_i: this.i_delta_end - WRFDomainGrid.minNestGridPoints,
        max_delta_j: this.j_delta_end - WRFDomainGrid.minNestGridPoints,
        min_delta_i: WRFDomainGrid.minNestGridPoints - this.i_parent_start + 1,
        min_delta_j: WRFDomainGrid.minNestGridPoints - this.j_parent_start + 1,
        i_parent_start: this.i_parent_start,
        j_parent_start: this.j_parent_start
      };
      this._map.on('mousemove', this._drag, this);
    },
    _drag: function _drag(e) {
      if (!this._dragContext.dragStarted) {
        this._dragContext.dragStarted = true;
        this._enableGridLines = false;
        if (this._iGridLines) {
          this._removeGridLines();
        }
        if (this.parent) {
          this.parent.showGridLines();
        }
      }
      if (this.parent == null) {
        // for MOAD move ref point by drag distance
        this.domain.ref_lat = e.latlng.lat - this._dragContext.startLatLng.lat + this.domain.ref_lat;
        this.domain.ref_lon = e.latlng.lng - this._dragContext.startLatLng.lng + this.domain.ref_lon;

        // adjust projection parameters
        this.domain.drag(this._dragContext);
        this._dragContext.startLatLng = e.latlng;
        this.domain.update();
      } else {
        var ij = this.geogrid.latlon_to_unstaggered_ij(e.latlng.lat, e.latlng.lng);
        this._dragContext.delta_i += (ij[0] - this._dragContext.startIJ[0]) / this.parent_grid_ratio;
        this._dragContext.delta_j += (ij[1] - this._dragContext.startIJ[1]) / this.parent_grid_ratio;
        var parent_delta_i = Math.min(nearestIntToZero(this._dragContext.delta_i), this._dragContext.max_delta_i);
        parent_delta_i = Math.max(parent_delta_i, this._dragContext.min_delta_i);
        var parent_delta_j = Math.min(nearestIntToZero(this._dragContext.delta_j), this._dragContext.max_delta_j);
        parent_delta_j = Math.max(parent_delta_j, this._dragContext.min_delta_j);
        this.i_parent_start = this._dragContext.i_parent_start + parent_delta_i;
        this.j_parent_start = this._dragContext.j_parent_start + parent_delta_j;
        this.update();
        this._dragContext.startIJ = this.geogrid.latlon_to_unstaggered_ij(e.latlng.lat, e.latlng.lng);
      }
    },
    // implements layer onAdd function
    onAdd: function onAdd(map) {
      this._gridLinesLayer = this._createGridLinesPane();
      L.Polygon.prototype.onAdd.call(this, map);
      this.geogrid = this._initGeogrid();
      this._corners = this._initCorners();
      this.setLatLngs(this.geogrid.polygonPath);

      // create grid corner markers
      // visible only when grid is selected
      this._cornerMarkers = {
        sw: L.marker(this._corners.sw, {
          icon: L.divIcon({
            className: this.options.editable ? 'wrf-domain-grid-corner cursor-nesw-resize' : 'wrf-domain-grid-corner'
          })
        }),
        se: L.marker(this._corners.se, {
          icon: L.divIcon({
            className: this.options.editable ? 'wrf-domain-grid-corner cursor-nwse-resize' : 'wrf-domain-grid-corner'
          })
        }),
        ne: L.marker(this._corners.ne, {
          icon: L.divIcon({
            className: this.options.editable ? 'wrf-domain-grid-corner cursor-nesw-resize' : 'wrf-domain-grid-corner'
          })
        }),
        nw: L.marker(this._corners.nw, {
          icon: L.divIcon({
            className: this.options.editable ? 'wrf-domain-grid-corner cursor-nwse-resize' : 'wrf-domain-grid-corner'
          })
        })
      };
      if (this.options.editable) {
        this._cornerMarkers.sw.on('mousedown', function (e) {
          this._resizeStart(e, WRFDomainGrid.IAxisOpt.I_PARENT_START, WRFDomainGrid.JAxisOpt.J_PARENT_START);
          this._map.on('mousemove', this._resize, this);
        }, this);
        this._cornerMarkers.se.on('mousedown', function (e) {
          this._resizeStart(e, WRFDomainGrid.IAxisOpt.E_WE, WRFDomainGrid.JAxisOpt.J_PARENT_START);
          this._map.on('mousemove', this._resize, this);
        }, this);
        this._cornerMarkers.ne.on('mousedown', function (e) {
          this._resizeStart(e, WRFDomainGrid.IAxisOpt.E_WE, WRFDomainGrid.JAxisOpt.E_SN);
          this._map.on('mousemove', this._resize, this);
        }, this);
        this._cornerMarkers.nw.on('mousedown', function (e) {
          this._resizeStart(e, WRFDomainGrid.IAxisOpt.I_PARENT_START, WRFDomainGrid.JAxisOpt.E_SN);
          this._map.on('mousemove', this._resize, this);
        }, this);
      }
      this._map.on('zoomend moveend', this._onMapViewChanged, this);
      this._bindTooltip();
      this.on('click', this._onPolygonClick, this);

      // add nests
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].addTo(map);
      }
    },
    getBounds: function getBounds() {
      if (!this._corners || !this._projection) {
        this.geogrid = this._initGeogrid();
        this._corners = this._initCorners();
        this.setLatLngs(this.geogrid.polygonPath);
      }
      return L.Polygon.prototype.getBounds.call(this);
    },
    // implements layer onRemove function
    onRemove: function onRemove(map) {
      this._map.off('viewreset', this._onMapViewChanged, this);
      if (this.options.showTooltip) {
        this._unbindTooltip();
      }
      this.off('click', this._onPolygonClick, this);
      if (this._isSelected) {
        this.unselect();
      }

      // add nests
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].remove();
      }
      L.Polygon.prototype.onRemove.call(this, map);
      this.fire('wps:remove');
    },
    /**
     * initializes grid object
     * 
     * @param {WRFDomain} domain
     * @param {WRFDomainGrid} parent
     * @param {number} id
     * @param {WPSNamelist} wpsNamelist
     * @param {object} options
     */
    initialize: function initialize(domain, parent, id, wpsNamelist, options) {
      // initialize layer options
      L.Util.setOptions(this, options);
      this.domain = domain;
      this.parent = parent;
      this.id = id;
      this.nests = [];

      // initialize grid parameters
      this.e_we = WRFDomainGrid.minGridSize;
      this.e_sn = WRFDomainGrid.minGridSize;
      if (wpsNamelist) {
        this.parent_grid_ratio = wpsNamelist.geogrid.parent_grid_ratio[id - 1];
        this.i_parent_start = wpsNamelist.geogrid.i_parent_start[id - 1];
        this.j_parent_start = wpsNamelist.geogrid.j_parent_start[id - 1];
        this.e_we = wpsNamelist.geogrid.e_we[id - 1];
        this.e_sn = wpsNamelist.geogrid.e_sn[id - 1];
        this.geog_data_res = wpsNamelist.geogrid.geog_data_res[id - 1];
        if (!this.geog_data_res) {
          this.geog_data_res = 'default';
        }
        if ((this.e_we - 1) % this.parent_grid_ratio != 0) {
          throw "invalid e_we value";
        }
        if ((this.e_sn - 1) % this.parent_grid_ratio != 0) {
          throw "invalid e_sn value";
        }
        for (var i = id; i < wpsNamelist.geogrid.parent_id.length; i++) {
          if (id === wpsNamelist.geogrid.parent_id[i]) {
            this.nests.push(new WRFDomainGrid(domain, this, i + 1, wpsNamelist, options));
          }
        }
      }
      L.Polygon.prototype.initialize.call(this, []);
    },
    // re-draw grid
    update: function update() {
      this.geogrid = this._initGeogrid();
      this._corners = this._initCorners();
      this.setLatLngs(this.geogrid.polygonPath);
      this._cornerMarkers.sw.setLatLng(this._corners.sw);
      this._cornerMarkers.se.setLatLng(this._corners.se);
      this._cornerMarkers.ne.setLatLng(this._corners.ne);
      this._cornerMarkers.nw.setLatLng(this._corners.nw);
      if (this._iGridLines) {
        this._removeGridLines();
      }
      if (this._isSelected) {
        this._drawGridLines();
      }
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].update();
      }
      this.fire('wps:change');
    },
    addToNamelist: function addToNamelist(wpsNamelist) {
      wpsNamelist.geogrid.parent_id.push(this.parent ? this.parent.id : 1);
      wpsNamelist.geogrid.parent_grid_ratio.push(this.parent_grid_ratio);
      wpsNamelist.geogrid.i_parent_start.push(this.i_parent_start);
      wpsNamelist.geogrid.j_parent_start.push(this.j_parent_start);
      wpsNamelist.geogrid.e_we.push(this.e_we);
      wpsNamelist.geogrid.e_sn.push(this.e_sn);
      wpsNamelist.geogrid.geog_data_res.push(this.geog_data_res);
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].addToNamelist(wpsNamelist);
      }
    },
    unselectAll: function unselectAll() {
      if (this._isSelected) {
        this.unselect();
        return;
      }
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].unselectAll();
      }
    },
    unselect: function unselect() {
      this._cornerMarkers.sw.remove();
      this._cornerMarkers.se.remove();
      this._cornerMarkers.ne.remove();
      this._cornerMarkers.nw.remove();
      this._isSelected = false;
      if (this._isSelected && this.options.editable) {
        this.off('mousedown', this._dragStart, this);
      }
      this.hideGridLines();
      this.fire('wps:unselect');
    },
    select: function select() {
      if (this._isSelected) {
        return;
      }
      this.domain.grid.unselectAll();
      this._isSelected = true;
      this._cornerMarkers.sw.addTo(this._map);
      this._cornerMarkers.se.addTo(this._map);
      this._cornerMarkers.ne.addTo(this._map);
      this._cornerMarkers.nw.addTo(this._map);
      if (this.options.editable) {
        this.on('mousedown', this._dragStart, this);
      }
      this.showGridLines();
      this.fire('wps:select');
      this.domain.setSelectedGrid(this);
    },
    updateId: function updateId(id) {
      if (this.id != id) {
        this.id = id;
        this.fire('wps:id-change');
      }
      for (var i = 0; i < this.nests.length; i++) {
        this.nests[i].updateId(this.id + 1);
      }
    },
    removeNest: function removeNest(nest) {
      nest.remove();
      var index = this.nests.indexOf(nest);
      if (index == -1) {
        throw "Cannot remove a nest which is not a nest of this grid";
      }
      this.nests.splice(index, 1);
      this.domain.grid.updateId(1);
      this.fire('wps:removenest');
    },
    createNest: function createNest() {
      var nest = new WRFDomainGrid(this.domain, this, this.domain.max_dom + 1, null, this.options);
      try {
        nest.parent_grid_ratio = WRFDomainGrid.defaultGridRatio;
        nest.i_parent_start = 1 + WRFDomainGrid.minNestGridPoints;
        nest.j_parent_start = 1 + WRFDomainGrid.minNestGridPoints;
        nest.e_we = Math.floor((nest.parent.e_we - WRFDomainGrid.minNestGridPoints - nest.i_parent_start) * nest.parent_grid_ratio + 1);
        nest.e_sn = Math.floor((nest.parent.e_sn - WRFDomainGrid.minNestGridPoints - nest.j_parent_start) * nest.parent_grid_ratio + 1);
      } catch (error) {
        throw "Unable to add a nest grid (" + error + ")";
      }
      this.nests.push(nest);
      this.fire('wps:addnest');
      if (this._map) {
        nest.addTo(this._map);
      }
      return nest;
    },
    findGrid: function findGrid(id) {
      var grid, i;
      if (this.id == id) {
        return this;
      } else if (this.nests && this.nests.length > 0) {
        for (i = 0; i < this.nests.length; i++) {
          grid = this.nests[i].findGrid(id);
          if (grid) {
            return grid;
          }
        }
      }
      return grid;
    }
  });
  Object.defineProperties(WRFDomainGrid.prototype, {
    'projection': {
      get: function get() {
        return this._projection;
      }
    },
    'name': {
      get: function get() {
        return 'd' + this.id.toString().padStart(2, '0');
      }
    },
    'selected': {
      get: function get() {
        return this._isSelected;
      }
    },
    'iPixels': {
      get: function get() {
        if (this.parent) {
          return this.parent.iPixels / this.parent_grid_ratio;
        } else {
          return Math.round(this.domain.dxPixelsMul * Math.pow(2, this._map.getZoom()));
        }
      }
    },
    'i_delta_end': {
      get: function get() {
        return this.parent ? this.parent.e_we - (this.e_we - 1) / this.parent_grid_ratio - this.i_parent_start : 0;
      }
    },
    'j_delta_end': {
      get: function get() {
        return this.parent ? this.parent.e_sn - (this.e_sn - 1) / this.parent_grid_ratio - this.j_parent_start : 0;
      }
    },
    'depth': {
      get: function get() {
        var depth = 0,
          parent = this.parent;
        while (parent) {
          parent = parent.parent;
        }
        return depth;
      }
    },
    'count': {
      get: function get() {
        var count = 1;
        for (var i = 0; i < this.nests.length; i++) {
          count += this.nests[i].count;
        }
        return count;
      }
    },
    'corners': {
      get: function get() {
        return this._corners;
      }
    }
  });

  // function returns the bounds in IJ coordinates of grid lines which are in view
  WRFDomainGrid.prototype._getGridLinesBounds = /** @this {WRFDomainGrid} */function () {
    var bounds = this._map.getBounds();
    var boundsSW = bounds.getSouthWest();
    var boundsNE = bounds.getNorthEast();
    var ijSW = this.geogrid.latlon_to_unstaggered_ij(boundsSW.lat, boundsSW.lng);
    var ijNE = this.geogrid.latlon_to_unstaggered_ij(boundsNE.lat, boundsNE.lng);
    var ijSE = this.geogrid.latlon_to_unstaggered_ij(boundsSW.lat, boundsNE.lng);
    var ijNW = this.geogrid.latlon_to_unstaggered_ij(boundsNE.lat, boundsSW.lng);
    return {
      iLinesStart: Math.max(0, Math.min(Math.floor(ijSW[0]), Math.floor(ijNW[0]), this.e_we - 1)),
      jLinesStart: Math.max(0, Math.min(Math.floor(ijSW[1]), Math.floor(ijSE[1]), this.e_sn - 1)),
      iLinesEnd: Math.min(this.e_we - 1, Math.max(Math.ceil(ijNE[0]), Math.ceil(ijSE[0]), 0)),
      jLinesEnd: Math.min(this.e_sn - 1, Math.max(Math.ceil(ijNE[1]), Math.ceil(ijNW[1]), 0))
    };
  };

  // function creates a grid line and add it to grid lines layer
  WRFDomainGrid.prototype._createGridLinePolyline = /** @this {WRFDomainGrid} */function (path) {
    var polyline = L.polyline(path, {
      'pane': 'gridLinesPane',
      'color': 'grey',
      'weight': 1,
      'opacity': 0.5
    });
    this._gridLinesLayer.addLayer(polyline);
    return polyline;
  };
  WRFDomainGrid.prototype._updateGridLines = /** @this {WRFDomainGrid} */function () {
    // check if any grid lines currently exist
    if (this._iGridLines) {
      // check if lines should be visible at current zoom level
      if (this.iPixels < WRFDomainGrid.minPixelsPerGrid) {
        // hide grid line layer
        this._gridLinesLayer.remove();
      } else {
        var i, j, gridLinesBounds, path, latLng, iGridLines, jGridLines, iPaths, jPaths;

        // add layer if not on map
        if (!this._map.hasLayer(this._gridLinesLayer)) {
          this._gridLinesLayer.addTo(this._map);
        }

        // get current grid line bounds
        gridLinesBounds = this._getGridLinesBounds();

        // if bounds do not overlap with existing line redraw all lines
        if (gridLinesBounds.iLinesEnd < this._gridLinesBounds.iLinesStart || gridLinesBounds.iLinesStart > this._gridLinesBounds.iLinesEnd || gridLinesBounds.jLinesEnd < this._gridLinesBounds.jLinesStart || gridLinesBounds.jLinesStart > this._gridLinesBounds.jLinesEnd) {
          this._removeGridLines();
          this._drawGridLines(gridLinesBounds);
        }

        // check if this bounds are bigger then previously drawn
        if (gridLinesBounds.iLinesStart < this._gridLinesBounds.iLinesStart) {
          // add iLines, extend jLines
          iGridLines = [];
          jPaths = new Array(this._gridLinesBounds.jLinesEnd - this._gridLinesBounds.jLinesStart + 1);
          for (i = gridLinesBounds.iLinesStart; i < this._gridLinesBounds.iLinesStart; i++) {
            path = [];
            for (j = this._gridLinesBounds.jLinesStart; j <= this._gridLinesBounds.jLinesEnd; j++) {
              latLng = this.geogrid.unstaggered_ij_to_latlon(i, j);
              path.push(latLng);
              if (i == gridLinesBounds.iLinesStart) {
                jPaths[j - this._gridLinesBounds.jLinesStart] = new Array();
              }
              jPaths[j - this._gridLinesBounds.jLinesStart].push(latLng);
              if (i == this._gridLinesBounds.iLinesStart - 1) {
                this._jGridLines[j - this._gridLinesBounds.jLinesStart].setLatLngs(jPaths[j - this._gridLinesBounds.jLinesStart].concat(this._jGridLines[j - this._gridLinesBounds.jLinesStart].getLatLngs()));
              }
            }
            iGridLines.push(this._createGridLinePolyline(path));
          }
          this._iGridLines = iGridLines.concat(this._iGridLines);
          this._gridLinesBounds.iLinesStart = gridLinesBounds.iLinesStart;
        }
        if (gridLinesBounds.jLinesStart < this._gridLinesBounds.jLinesStart) {
          // add jLines, extend iLines
          jGridLines = [];
          iPaths = new Array(this._gridLinesBounds.iLinesEnd - this._gridLinesBounds.iLinesStart + 1);
          for (j = gridLinesBounds.jLinesStart; j < this._gridLinesBounds.jLinesStart; j++) {
            path = [];
            for (i = this._gridLinesBounds.iLinesStart; i <= this._gridLinesBounds.iLinesEnd; i++) {
              latLng = this.geogrid.unstaggered_ij_to_latlon(i, j);
              path.push(latLng);
              if (j == gridLinesBounds.jLinesStart) {
                iPaths[i - this._gridLinesBounds.iLinesStart] = new Array();
              }
              iPaths[i - this._gridLinesBounds.iLinesStart].push(latLng);
              if (j == this._gridLinesBounds.jLinesStart - 1) {
                this._iGridLines[i - this._gridLinesBounds.iLinesStart].setLatLngs(iPaths[i - this._gridLinesBounds.iLinesStart].concat(this._iGridLines[i - this._gridLinesBounds.iLinesStart].getLatLngs()));
              }
            }
            jGridLines.push(this._createGridLinePolyline(path));
          }
          this._jGridLines = jGridLines.concat(this._jGridLines);
          this._gridLinesBounds.jLinesStart = gridLinesBounds.jLinesStart;
        }
        if (gridLinesBounds.iLinesEnd > this._gridLinesBounds.iLinesEnd) {
          // add iLines, extend jLines
          for (i = this._gridLinesBounds.iLinesEnd + 1; i <= gridLinesBounds.iLinesEnd; i++) {
            path = [];
            for (j = this._gridLinesBounds.jLinesStart; j <= this._gridLinesBounds.jLinesEnd; j++) {
              latLng = this.geogrid.unstaggered_ij_to_latlon(i, j);
              path.push(latLng);
              this._jGridLines[j - this._gridLinesBounds.jLinesStart].addLatLng(latLng);
            }
            this._iGridLines.push(this._createGridLinePolyline(path));
          }
          this._gridLinesBounds.iLinesEnd = gridLinesBounds.iLinesEnd;
        }
        if (gridLinesBounds.jLinesEnd > this._gridLinesBounds.jLinesEnd) {
          // add jLines, extend iLines
          for (j = this._gridLinesBounds.jLinesEnd + 1; j <= gridLinesBounds.jLinesEnd; j++) {
            path = [];
            for (i = this._gridLinesBounds.iLinesStart; i <= this._gridLinesBounds.iLinesEnd; i++) {
              latLng = this.geogrid.unstaggered_ij_to_latlon(i, j);
              path.push(latLng);
              this._iGridLines[i - this._gridLinesBounds.iLinesStart].addLatLng(latLng);
            }
            this._jGridLines.push(this._createGridLinePolyline(path));
          }
          this._gridLinesBounds.jLinesEnd = gridLinesBounds.jLinesEnd;
        }
      }
    } else {
      this._drawGridLines();
    }
  };
  WRFDomainGrid.prototype._drawGridLines = function (gridLinesBounds) {
    if (this.iPixels >= WRFDomainGrid.minPixelsPerGrid && this._enableGridLines) {
      var i, j, path, latLng, jGridLinePaths;
      this._gridLinesBounds = gridLinesBounds || this._getGridLinesBounds();
      this._iGridLines = [];
      this._jGridLines = [];

      // create array for j paths
      jGridLinePaths = new Array(this._gridLinesBounds.jLinesEnd - this._gridLinesBounds.jLinesStart + 1);
      for (i = this._gridLinesBounds.iLinesStart; i <= this._gridLinesBounds.iLinesEnd; i++) {
        // init path for i line
        path = [];
        for (j = this._gridLinesBounds.jLinesStart; j <= this._gridLinesBounds.jLinesEnd; j++) {
          latLng = this.geogrid.unstaggered_ij_to_latlon(i, j);
          path.push(latLng);
          if (i == this._gridLinesBounds.iLinesStart) {
            // init path for j line
            jGridLinePaths[j - this._gridLinesBounds.jLinesStart] = new Array(this._gridLinesBounds.iLinesEnd - this._gridLinesBounds.iLinesStart + 1);
          }
          jGridLinePaths[j - this._gridLinesBounds.jLinesStart][i - this._gridLinesBounds.iLinesStart] = latLng;
          if (i == this._gridLinesBounds.iLinesEnd) {
            // create j polyline
            this._jGridLines.push(this._createGridLinePolyline(jGridLinePaths[j - this._gridLinesBounds.jLinesStart]));
          }
        }

        // create i polyline
        this._iGridLines.push(this._createGridLinePolyline(path));
      }

      // add layer if not on map
      if (!this._map.hasLayer(this._gridLinesLayer)) {
        this._gridLinesLayer.addTo(this._map);
      }
    }
  };
  WRFDomainGrid.prototype._removeGridLines = function () {
    this._gridLinesLayer.clearLayers();
    this._iGridLines = null;
    this._jGridLines = null;
    this._gridLinesLayer.remove();
  };
  WRFDomainGrid.prototype.hideGridLines = function () {
    this._gridLinesLayer.remove();
    this._enableGridLines = false;
  };
  WRFDomainGrid.prototype.showGridLines = function () {
    this._enableGridLines = true;
    this._updateGridLines();
  };

  var GeogDataResDialog = /*#__PURE__*/_createClass(function GeogDataResDialog(options) {
    _classCallCheck(this, GeogDataResDialog);
    // defaul settings
    this.options = {
      jsonBaseUrl: 'json'
    };
    if (options) {
      this.options = Object.assign(this.options, options);
    }
    var self = this,
      jsonUrl = "".concat(this.options.jsonBaseUrl, "/geog.json"),
      json,
      versionData,
      container,
      dialogHeader,
      dialogBody,
      dialogFooter,
      table,
      selectVersion,
      inputGeogDataRes,
      buttonSave,
      buttonReset;
    container = $('div.modal#geog-data-res-dialog');
    dialogHeader = $('div.modal-header', container);
    dialogBody = $('div.modal-body', container);
    dialogFooter = $('div.modal-footer', container);
    table = $('table', dialogBody);
    table.header = $('thead', table);
    table.body = $('tbody', table);
    selectVersion = $('select', dialogHeader);
    inputGeogDataRes = $('input', dialogBody);
    buttonSave = $('button#button-geog-save', dialogFooter);
    buttonReset = $('button#button-geog-reset', dialogFooter);
    function initGeogCategories() {
      var geogDataResDict = {},
        i,
        j,
        tableRow,
        categoryData,
        selectCategoryOption,
        cellFilename,
        hasFilenameSet,
        categoryOptions,
        categoryIds,
        selected;
      self.geog_data_res.match(/(\w+)/g).forEach(function (match) {
        geogDataResDict[match] = match;
      });
      table.body.empty();
      for (i = 0; i < versionData['categories'].length; i++) {
        // create new row
        tableRow = $('<tr/>');

        //select category data
        categoryData = versionData['categories'][i];

        // append category name cell
        tableRow.append('<td>' + categoryData['name'] + '</td>');

        // create dropdown and add to row
        selectCategoryOption = $('<select class=""></select>');
        tableRow.append($('<td />').append(selectCategoryOption));

        // append category default value
        tableRow.append('<td>' + categoryData['default'] + '</td>');

        // append filename cell
        cellFilename = $('<td/>');
        tableRow.append(cellFilename);

        // append row to table
        table.body.append(tableRow);

        // create option elements for dropdowns
        categoryIds = [];
        categoryOptions = {};
        hasFilenameSet = false;
        for (j = 0; j < categoryData['options'].length; j++) {
          // skip default option
          if (categoryData['options'][j]['id'] !== 'default') {
            categoryIds.push(categoryData['options'][j]['id']);
          }
          // check if id is selected
          selected = geogDataResDict[categoryData['options'][j]['id']] != undefined;
          // add option element to dictionary
          categoryOptions[categoryData['options'][j]['id']] = $(new Option(categoryData['options'][j]['id'], categoryData['options'][j]['id'], selected, selected)).data('dirname', categoryData['options'][j]['dirname']);
          // set filename cell text from selected category option
          if (selected) {
            cellFilename.text(categoryData['options'][j]['dirname']);
            hasFilenameSet = true;
          }
        }
        // if non selected use filename for default
        if (!hasFilenameSet) {
          cellFilename.text(categoryOptions['default'].data('dirname'));
        }

        // sort and insert option elements to dropdowns
        selectCategoryOption.append(categoryOptions['default']);
        if (categoryIds.length > 0) {
          categoryIds.sort().forEach(function (optionId) {
            selectCategoryOption.append(categoryOptions[optionId]);
          });
        } else {
          selectCategoryOption.prop('disabled', true);
        }
        selectCategoryOption.on('change', {
          cellFilename: cellFilename,
          selectCategoryOption: selectCategoryOption
        }, function (e) {
          var selectedOption = e.data.selectCategoryOption.val(),
            allSelectedOptions = [],
            allSelectedOptionsDict = {},
            $select;

          // set filename cell text
          e.data.cellFilename.text($('option:selected', e.data.selectCategoryOption).data('dirname'));

          // change all other dropdowns with the same option name
          $('select option[value="' + selectedOption + '"]', table.body).parents().has('option[value="default"]:selected').each(function (index, element) {
            $select = $(element);
            $select.val(selectedOption);
            $('td:last-child', $select.closest('tr')).text($('option:selected', $select).data('dirname'));
          });

          // update geog_data_res value
          $('select', table.body).each(function (index, element) {
            $select = $(element);
            selectedOption = $select.val();
            if (selectedOption != 'default' && allSelectedOptionsDict[selectedOption] === undefined) {
              allSelectedOptionsDict[selectedOption] = selectedOption;
              allSelectedOptions.push(selectedOption);
            }
          });
          if (allSelectedOptions.length == 0) {
            inputGeogDataRes.val('default');
          } else {
            inputGeogDataRes.val(allSelectedOptions.join('+'));
          }
        });
      }
    }
    this.show = function (geog_data_res, saveHandler) {
      this.saveHandler = saveHandler;
      if (!geog_data_res) {
        geog_data_res = 'default';
      }
      this.geog_data_res = geog_data_res;
      inputGeogDataRes.val(geog_data_res);
      if (json === undefined) {
        init();
      } else {
        initGeogCategories();
      }
      container.modal();
    };
    function init() {
      $.getJSON(jsonUrl, function (data) {
        var i, j;
        json = data;
        for (i = 0; i < json['geog'].length; i++) {
          for (j = 0; j < json['geog'][i]['categories'].length; j++) {
            if (json['geog'][i]['categories'][j]['name'] == 'HGT_M') {
              json['geog'][i]['categories'][j]['options'].push({
                "id": "srtm_30m",
                "dirname": "srtm_30m"
              });
              json['geog'][i]['categories'][j]['options'].push({
                "id": "srtm_90m",
                "dirname": "srtm_90m"
              });
              break;
            }
          }
        }
        selectVersion.empty();
        for (i = 0; i < json['geog'].length; i++) {
          selectVersion.append('<option value="' + json['geog'][i]['version'] + '">' + json['geog'][i]['version'] + '</option>');
        }
        selectVersion.on('change', function (e) {
          for (i = 0; i < json['geog'].length; i++) {
            if (selectVersion.val() == json['geog'][i]['version']) {
              versionData = json['geog'][i];
              initGeogCategories();
              break;
            }
          }
        });

        //default selection
        versionData = json['geog'][0];
        selectVersion.val(versionData['version']);
        initGeogCategories();
      });
    }
    buttonReset.on('click', function () {
      inputGeogDataRes.val('default');
      $('select', table.body).each(function () {
        var select = $(this);
        select.val('default');
        $('td:last-child', select.closest('tr')).text(select.find(":selected").data('dirname'));
      });
    });
    buttonSave.on('click', function (e) {
      e.geog_data_res = inputGeogDataRes.val();
      if (typeof self.saveHandler === 'function') {
        self.saveHandler.call(this, e);
      }
    });
  });

  var SidebarDomainsPanelGrid = /*#__PURE__*/_createClass(function SidebarDomainsPanelGrid(container, grid, errorHandler, options) {
    var _this = this;
    _classCallCheck(this, SidebarDomainsPanelGrid);
    var self = this;
      grid.domain;
      var gridContainer,
      buttonRemoveNest,
      buttonAddNest,
      buttonGeogDataResEdit,
      labelGridName,
      inputParentGridRatio,
      inputIParentStart,
      inputJParentStart,
      inputEWE,
      inputESN,
      inputGeogDataRes,
      iSelected,
      tableCornerSW,
      tableCornerSE,
      tableCornerNE,
      tableCornerNW;

    // defaul settings
    this.options = {
      minGridDistanceMeters: 100,
      minGridDistanceDegrees: 0
    };
    if (options) {
      this.options = Object.assign(this.options, options);
    }
    if (SidebarDomainsPanelGrid._geogDataResDialog === null) {
      SidebarDomainsPanelGrid._geogDataResDialog = new GeogDataResDialog(options);
    }
    if (SidebarDomainsPanelGrid.Template == null) {
      SidebarDomainsPanelGrid.Template = $('#grid_template', container).html();
      $('#grid_template', container).remove();
    }
    gridContainer = $('<div class="container-grid"></div>').append(SidebarDomainsPanelGrid.Template);
    buttonRemoveNest = $('button[data-action="remove-nest"]', gridContainer);
    buttonAddNest = $('button[data-action="add-nest"]', gridContainer);
    buttonGeogDataResEdit = $('button[data-action="geog-data-res-edit"]', gridContainer);
    labelGridName = $('label.grid-label', gridContainer);
    inputParentGridRatio = $('input[name="parent_grid_ratio"]', gridContainer);
    inputIParentStart = $('input[name="i_parent_start"]', gridContainer);
    inputJParentStart = $('input[name="j_parent_start"]', gridContainer);
    inputEWE = $('input[name="e_we"]', gridContainer);
    inputESN = $('input[name="e_sn"]', gridContainer);
    inputGeogDataRes = $('span[data-name="geog_data_res"]', gridContainer);
    tableCornerNW = $('table tbody tr:nth-child(1) td:nth-child(2)', gridContainer);
    tableCornerNE = $('table tbody tr:nth-child(1) td:nth-child(3)', gridContainer);
    tableCornerSW = $('table tbody tr:nth-child(2) td:nth-child(2)', gridContainer);
    tableCornerSE = $('table tbody tr:nth-child(2) td:nth-child(3)', gridContainer);
    container.append(gridContainer);
    // enable tooltips
    $('[title]', gridContainer).tooltip();
    $('input[name]', gridContainer).on('change blur keyup', function (e) {
      self.validate();
    });
    buttonGeogDataResEdit.on('click', function (e) {
      SidebarDomainsPanelGrid._geogDataResDialog.show(grid.geog_data_res, function (e) {
        grid.geog_data_res = e.geog_data_res;
        inputGeogDataRes.text(e.geog_data_res);
        inputGeogDataRes.attr('title', e.geog_data_res);
      });
    });
    grid.on('wps:remove', function (e) {
      gridContainer.remove();
    });
    function markSelected() {
      iSelected = $('<i class="fas fa-vector-square mx-1"></i>');
      iSelected.insertBefore(labelGridName);
    }
    grid.on('wps:change', setFieldValues);
    grid.on('wps:id-change', setGridName);
    grid.on('wps:select', function () {
      if (!iSelected) {
        markSelected();
      }
    });
    grid.on('wps:unselect', function () {
      if (iSelected) {
        iSelected.remove();
        iSelected = null;
      }
    });

    // hide tooltip when button is clicked
    $('button[title]', gridContainer).on('click', function (e) {
      $(this).tooltip('hide');
    });

    // remove domain button click event handler
    buttonRemoveNest.on('click', function (e) {
      grid.parent.removeNest(grid);
    });
    function reportError(error) {
      if (typeof errorHandler === 'function') {
        errorHandler.call(this, {
          error: error
        });
      }
    }

    // remove domain button click event handler
    buttonAddNest.on('click', function (e) {
      var nest = null;
      if (location.hostname === 'localhost') {
        nest = grid.createNest();
        nest.gridPanel = new SidebarDomainsPanelGrid(container, nest, errorHandler);
      } else {
        try {
          nest = grid.createNest();
          nest.gridPanel = new SidebarDomainsPanelGrid(container, nest, errorHandler);
        } catch (error) {
          reportError(error);
        }
      }
    });
    if (grid.parent) {
      inputIParentStart.prop('min', WRFDomainGrid.minNestGridPoints);
      inputJParentStart.prop('min', WRFDomainGrid.minNestGridPoints);
    } else {
      buttonRemoveNest.remove();
      inputParentGridRatio.prop('disabled', true);
      inputParentGridRatio.removeAttr('required');
      inputIParentStart.prop('disabled', true);
      inputIParentStart.removeAttr('required');
      inputJParentStart.prop('disabled', true);
      inputJParentStart.removeAttr('required');
    }
    for (var i = 0; i < grid.nests.length; i++) {
      grid.nests[i].gridPanel = new SidebarDomainsPanelGrid(container, grid.nests[i], errorHandler);
    }
    function setGridName() {
      if (grid.parent) {
        labelGridName.text(grid.name + ' (parent: ' + 'd' + grid.parent.id.toString().padStart(2, '0') + ')');
      } else {
        labelGridName.text(grid.name);
      }
    }
    function setFieldValues() {
      inputParentGridRatio.val(grid.parent_grid_ratio);
      inputIParentStart.val(grid.i_parent_start);
      inputJParentStart.val(grid.j_parent_start);
      inputEWE.val(grid.e_we);
      inputESN.val(grid.e_sn);
      inputGeogDataRes.text(grid.geog_data_res);
      inputGeogDataRes.attr('title', grid.geog_data_res);
      inputGeogDataRes.tooltip();
      tableCornerSW.text(grid.corners.sw.lat.toFixed(3) + ', ' + grid.corners.sw.lng.toFixed(3));
      tableCornerSE.text(grid.corners.se.lat.toFixed(3) + ', ' + grid.corners.se.lng.toFixed(3));
      tableCornerNE.text(grid.corners.ne.lat.toFixed(3) + ', ' + grid.corners.ne.lng.toFixed(3));
      tableCornerNW.text(grid.corners.nw.lat.toFixed(3) + ', ' + grid.corners.nw.lng.toFixed(3));
      self.validate();
    }

    // the value of e_we and e_sn must be adjusted to comply with constrains
    inputParentGridRatio.on('change', function (e) {
      var parent_grid_ratio = parseInt(inputParentGridRatio.val());
      if (isNaN(parent_grid_ratio)) {
        // value is not a valid number
        return;
      }
      var n_we = (grid.e_we - 1) / grid.parent_grid_ratio;
      var n_sn = (grid.e_sn - 1) / grid.parent_grid_ratio;
      setFieldConstraints();
      inputEWE.val(n_we * parent_grid_ratio + 1);
      inputESN.val(n_sn * parent_grid_ratio + 1);
      _this.validate();
    });
    function setFieldConstraints() {
      if (grid.id > 1) {
        var parent_grid_ratio = parseInt(inputParentGridRatio.val(), 10);
        var i_parent_start = parseInt(inputIParentStart.val(), 10);
        var j_parent_start = parseInt(inputJParentStart.val(), 10);
        var min_e_we = WRFDomainGrid.minNestGridPoints * parent_grid_ratio + 1;
        var min_e_sn = WRFDomainGrid.minNestGridPoints * parent_grid_ratio + 1;
        var max_e_we = Math.floor((grid.parent.e_we - WRFDomainGrid.minNestGridPoints - i_parent_start) * parent_grid_ratio + 1);
        var max_e_sn = Math.floor((grid.parent.e_sn - WRFDomainGrid.minNestGridPoints - j_parent_start) * parent_grid_ratio + 1);
        inputEWE.prop('min', min_e_we);
        inputESN.prop('min', min_e_sn);
        inputEWE.prop('max', max_e_we);
        inputESN.prop('max', max_e_sn);
        inputEWE.prop('step', parent_grid_ratio);
        inputESN.prop('step', parent_grid_ratio);
        inputIParentStart.prop('min', WRFDomainGrid.minNestGridPoints + 1);
        inputJParentStart.prop('min', WRFDomainGrid.minNestGridPoints + 1);
        inputIParentStart.prop('max', grid.parent.e_we - 2 * WRFDomainGrid.minNestGridPoints);
        inputJParentStart.prop('max', grid.parent.e_sn - 2 * WRFDomainGrid.minNestGridPoints);
      }
    }
    function clearValidation() {
      $('.invalid-feedback', gridContainer).hide().empty();
      $('.is-invalid, .is-valid', gridContainer).removeClass('.is-invalid').removeClass('.is-valid');
    }
    function showError(input, error) {
      $('div[data-val-for="' + input.prop('name') + '"]', gridContainer).show().append('<p>' + error + '</p>');
      input.addClass('.is-invalid');
    }
    function checkValidity(input) {
      if (!input[0].checkValidity()) {
        showError(input, input[0].validationMessage.replace(/[v,V]alue|(this field)/, input.prop('name')));
        return false;
      }
      return true;
    }
    this.validate = function () {
      var valid = true;
      if (grid.parent != null) {
        clearValidation();
        setFieldConstraints();
        valid = checkValidity(inputParentGridRatio);
        valid = checkValidity(inputIParentStart) && valid;
        valid = checkValidity(inputJParentStart) && valid;
        valid = checkValidity(inputEWE) && valid;
        valid = checkValidity(inputESN) && valid;
        if (valid) {
          var parent_grid_ratio = parseInt(inputParentGridRatio.val(), 10),
            i_parent_start = parseInt(inputIParentStart.val(), 10),
            j_parent_start = parseInt(inputJParentStart.val(), 10),
            e_we = parseInt(inputEWE.val(), 10),
            e_sn = parseInt(inputESN.val(), 10),
            parent_e_we = grid.parent.e_we,
            parent_e_sn = grid.parent.e_sn;
          if (i_parent_start < WRFDomainGrid.minNestGridPoints) {
            showError(inputIParentStart, 'Min i_parent_start = ' + WRFDomainGrid.minNestGridPoints + '. ');
            valid = false;
          }
          if (j_parent_start < WRFDomainGrid.minNestGridPoints) {
            showError(inputJParentStart, 'Min j_parent_start = ' + WRFDomainGrid.minNestGridPoints + '. ');
            valid = false;
          }
          if (i_parent_start > parent_e_we - WRFDomainGrid.minNestGridPoints) {
            showError(inputIParentStart, 'Max i_parent_start = ' + (parent_e_we - WRFDomainGrid.minNestGridPoints) + '. ');
            valid = false;
          }
          if (j_parent_start > parent_e_sn - WRFDomainGrid.minNestGridPoints) {
            showError(inputJParentStart, 'Max j_parent_start = ' + (parent_e_sn - WRFDomainGrid.minNestGridPoints) + '. ');
            valid = false;
          }
          if ((e_we - 1) % parent_grid_ratio != 0) {
            showError(inputEWE, "e_we must be one greater than an integer multiple of the nest's parent_grid_ratio (e_we = n*parent_grid_ratio + 1).");
            valid = false;
          }
          if ((e_sn - 1) % parent_grid_ratio != 0) {
            showError(inputESN, "e_sn must be one greater than an integer multiple of the nest's parent_grid_ratio (e_sn = n*parent_grid_ratio + 1).");
            valid = false;
          }
          var max_e_we = Math.floor((parent_e_we - WRFDomainGrid.minNestGridPoints - i_parent_start) * parent_grid_ratio + 1);
          var max_e_sn = Math.floor((parent_e_sn - WRFDomainGrid.minNestGridPoints - j_parent_start) * parent_grid_ratio + 1);
          if (e_we > max_e_we || e_sn > max_e_sn) {
            showError(inputESN, 'Nest edge outside of parent. ');
            valid = false;
          }
          if (e_we > max_e_we) {
            max_e_we = Math.floor((parent_e_we - i_parent_start - WRFDomainGrid.minNestGridPoints) * parent_grid_ratio + 1);
            showError(inputEWE, 'Max e_we = ' + max_e_we + '. ');
            valid = false;
          }
          if (e_sn > max_e_sn) {
            max_e_sn = Math.floor((parent_e_sn - j_parent_start - WRFDomainGrid.minNestGridPoints) * parent_grid_ratio + 1);
            showError(inputESN, 'Max e_sn = ' + max_e_sn + '. ');
            valid = false;
          }
        }
      }
      for (var i = 0; i < grid.nests.length; i++) {
        valid = valid && grid.nests[i].gridPanel.validate();
      }
      return valid;
    };
    this.setGridValues = function () {
      grid.parent_grid_ratio = parseInt(inputParentGridRatio.val(), 10);
      grid.i_parent_start = parseInt(inputIParentStart.val(), 10);
      grid.j_parent_start = parseInt(inputJParentStart.val(), 10);
      grid.e_we = parseInt(inputEWE.val(), 10);
      grid.e_sn = parseInt(inputESN.val(), 10);
      grid.geog_data_res = inputGeogDataRes.val();
      for (var i = 0; i < grid.nests.length; i++) {
        grid.nests[i].gridPanel.setGridValues();
      }
    };
    setGridName();
    setFieldValues();
    if (grid.selected) {
      markSelected();
    }
  });
  _defineProperty(SidebarDomainsPanelGrid, "_geogDataResDialog", null);
  SidebarDomainsPanelGrid.Template = null;

  /**
  * @constructor
  */
  var WRFDomain = L.Layer.extend({
    options: {
      'editable': true,
      'showTooltip': true
    },
    _map: null,
    // main grid
    _mainGrid: null,
    _selectedGrid: null,
    setSelectedGrid: function setSelectedGrid(grid) {
      this._selectedGrid = grid;
    },
    // domain parameters
    map_proj: null,
    truelat1: null,
    truelat2: null,
    stand_lon: null,
    ref_lat: null,
    ref_lon: null,
    pole_lat: null,
    pole_lon: null,
    dx: null,
    dy: null,
    // domain center marker
    _centerMarker: null,
    // depth structure of all grids for grid sorting
    _gridsByDepth: null,
    _orderGrids: function _orderGrids(force) {
      if (!this._gridsByDepth || force) {
        this._gridsByDepth = [];
        this._walkGrids(this._mainGrid, function (grid) {
          if (this._gridsByDepth[grid.depth]) {
            this._gridsByDepth[grid.depth].push(grid);
          } else {
            this._gridsByDepth[grid.depth] = [grid];
          }
        }, this);
      }
      var i, j;
      for (i = 0; i < this._gridsByDepth.length; i++) {
        for (j = 0; j < this._gridsByDepth[i].length; j++) {
          this._gridsByDepth[i][j].bringToFront();
        }
      }
    },
    _walkGrids: function _walkGrids(grid, callback, context) {
      callback.call(context, grid);
      if (grid.nests && grid.nests.length > 0) {
        for (var i = 0; i < grid.nests.length; i++) {
          this._walkGrids(grid.nests[i], callback, context);
        }
      }
    },
    getGrid: function getGrid(id) {
      return this._mainGrid.findGrid(id);
    },
    _dragContext: null,
    _onCenterMarkerDrag: function _onCenterMarkerDrag(e) {
      this.ref_lat = e.latlng.lat;
      this.ref_lon = e.latlng.lng;
      this.drag(this._dragContext);
      this.update();
    },
    drag: function drag(dragContext) {
      switch (this.map_proj) {
        case WrfProjections.lambert:
          this.stand_lon = this.ref_lon + dragContext.stand_lon - dragContext.ref_lon;
          this.truelat1 = this.ref_lat + dragContext.truelat1 - dragContext.ref_lat;
          this.truelat2 = this.ref_lat + dragContext.truelat2 - dragContext.ref_lat;
          break;
        case WrfProjections.mercator:
          this.stand_lon = 0;
          this.truelat1 = this.ref_lat + dragContext.truelat1 - dragContext.ref_lat;
          break;
        case WrfProjections.polar:
          this.stand_lon = this.ref_lon + dragContext.stand_lon - dragContext.ref_lon;
          this.truelat1 = this.ref_lat + dragContext.truelat1 - dragContext.ref_lat;
          break;
        case WrfProjections.latlon:
          this._setDefaultProjValues();
          break;
      }
    },
    _onMapClick: function _onMapClick(e) {
      if (this._map.getContainer() == e.originalEvent.target && this._selectedGrid) {
        this._selectedGrid.unselect();
        this._selectedGrid = null;
      }
    },
    onAdd: function onAdd(map) {
      this._map = map;
      this._map.on('click', this._onMapClick, this);
      this._centerMarker = L.marker([this.ref_lat, this.ref_lon], {
        draggable: this.options['editable'],
        title: 'Domain Center'
      }).addTo(map);
      this._mainGrid.addTo(map);
      this._orderGrids();
      if (this.options['editable']) {
        this._centerMarker.on('dragstart', function (event) {
          this._dragContext = {
            ref_lat: this.ref_lat,
            ref_lon: this.ref_lon,
            truelat1: this.truelat1,
            truelat2: this.truelat2,
            stand_lon: this.stand_lon,
            pole_lat: this.pole_lat,
            pole_lon: this.pole_lon
          };
          this._mainGrid.unbindTooltip();
          if (this._selectedGrid) {
            this._selectedGrid.hideGridLines();
          }
        }, this);
        this._centerMarker.on('drag', this._onCenterMarkerDrag, this);
        this._centerMarker.on('dragend', function (e) {
          e.latlng = this._centerMarker.getLatLng();
          this._onCenterMarkerDrag(e);
          this._mainGrid.bindTooltip();
          if (this._selectedGrid) {
            this._selectedGrid.showGridLines();
          }
        }, this);
      }
    },
    onRemove: function onRemove(map) {
      if (this._centerMarker) {
        this._centerMarker.off();
        this._centerMarker.remove();
      }
      this._map.off('click', this._onMapClick, this);
      this._mainGrid.remove();
    },
    // re-draw domain
    update: function update() {
      this._centerMarker.setLatLng(L.latLng(this.ref_lat, this.ref_lon));
      this._mainGrid.update();
      this.fire('wps:change');
    },
    _setDefaultProjValues: function _setDefaultProjValues() {
      switch (this.map_proj) {
        case WrfProjections.lambert:
          this.truelat1 = this.ref_lat;
          this.truelat2 = this.ref_lat;
          this.stand_lon = this.ref_lon;
          break;
        case WrfProjections.mercator:
          this.truelat1 = this.ref_lat;
          this.stand_lon = 0;
          break;
        case WrfProjections.polar:
          this.truelat1 = this.ref_lat;
          this.stand_lon = this.ref_lon;
          break;
        case WrfProjections.latlon:
          // southern hemisphere
          if (this.ref_lat < 0) {
            this.pole_lat = 90.0 + this.ref_lat;
            this.pole_lon = 0;
            this.stand_lon = 180 - this.ref_lon;
          }
          // northern hemisphere
          else {
            this.pole_lat = 90.0 - this.ref_lat;
            this.pole_lon = 180;
            this.stand_lon = -this.ref_lon;
          }
          break;
      }
    },
    setDefaultValues: function setDefaultValues(ref_lat, ref_lon) {
      this.ref_lat = ref_lat;
      this.ref_lon = ref_lon;
      this._setDefaultProjValues();
    },
    /**
     * 
     * @param {WPSNamelist} wpsNamelist
     * @param {object} options
     */
    initialize: function initialize(wpsNamelist, options) {
      L.Util.setOptions(this, options);
      if (wpsNamelist !== undefined) {
        this.map_proj = wpsNamelist.geogrid.map_proj;
        this.truelat1 = wpsNamelist.geogrid.truelat1;
        this.truelat2 = wpsNamelist.geogrid.truelat2;
        this.stand_lon = wpsNamelist.geogrid.stand_lon;
        this.ref_lat = wpsNamelist.geogrid.ref_lat;
        this.ref_lon = wpsNamelist.geogrid.ref_lon;
        this.dx = wpsNamelist.geogrid.dx;
        this.dy = wpsNamelist.geogrid.dy;
        this.pole_lat = wpsNamelist.geogrid.pole_lat;
        this.pole_lon = wpsNamelist.geogrid.pole_lon;
        this.ref_x = wpsNamelist.geogrid.ref_x;
        this.ref_y = wpsNamelist.geogrid.ref_y;
        this._mainGrid = new WRFDomainGrid(this, null, 1, wpsNamelist, this.options);
      }
    },
    getWPSNamelist: function getWPSNamelist() {
      var wpsNamelist = new WPSNamelist();
      wpsNamelist.share.max_dom = this.max_dom;
      wpsNamelist.geogrid.map_proj = this.map_proj;
      wpsNamelist.geogrid.dx = this.dx;
      wpsNamelist.geogrid.dy = this.dy;
      wpsNamelist.geogrid.ref_lat = this.ref_lat;
      wpsNamelist.geogrid.ref_lon = this.ref_lon;

      //wpsNamelist.geogrid.ref_x = this.ref_x;
      //wpsNamelist.geogrid.ref_y = this.ref_y;

      switch (this.map_proj) {
        case WrfProjections.lambert:
          wpsNamelist.geogrid.truelat1 = this.truelat1;
          wpsNamelist.geogrid.truelat2 = this.truelat2;
          wpsNamelist.geogrid.stand_lon = this.stand_lon;
          break;
        case WrfProjections.mercator:
          wpsNamelist.geogrid.truelat1 = this.truelat1;
          break;
        case WrfProjections.polar:
          wpsNamelist.geogrid.truelat1 = this.truelat1;
          wpsNamelist.geogrid.stand_lon = this.stand_lon;
          break;
        case WrfProjections.latlon:
          wpsNamelist.geogrid.pole_lat = this.pole_lat;
          wpsNamelist.geogrid.pole_lon = this.pole_lon;
          wpsNamelist.geogrid.stand_lon = this.stand_lon;
          break;
      }
      wpsNamelist.geogrid.parent_id = [];
      wpsNamelist.geogrid.parent_grid_ratio = [];
      wpsNamelist.geogrid.i_parent_start = [];
      wpsNamelist.geogrid.j_parent_start = [];
      wpsNamelist.geogrid.e_we = [];
      wpsNamelist.geogrid.e_sn = [];
      wpsNamelist.geogrid.geog_data_res = [];
      this.grid.addToNamelist(wpsNamelist);
      return wpsNamelist;
    },
    createMainGrid: function createMainGrid() {
      if (this._mainGrid) {
        this._mainGrid.remove();
      }
      this._mainGrid = new WRFDomainGrid(this, null, 1);
      this._mainGrid.parent_grid_ratio = 1;
      this._mainGrid.i_parent_start = 1;
      this._mainGrid.j_parent_start = 1;
      this._mainGrid.e_we = WRFDomainGrid.minGridSize;
      this._mainGrid.e_sn = WRFDomainGrid.minGridSize;
    }
  });
  Object.defineProperties(WRFDomain.prototype, {
    'grid': {
      get: function get() {
        return this._mainGrid;
      }
    },
    'max_dom': {
      get: function get() {
        var count = this._mainGrid.count;
        return count;
      }
    },
    // multiplicator to calculate resolution (pixels per grid point)
    'dxPixelsMul': {
      get: function get() {
        return this.dxInMeters / 156543.03392 / Math.cos(this.ref_lat * Math.PI / 180);
      }
    },
    'dxInMeters': {
      get: function get() {
        return distanceToMeters(this.map_proj, this.dx);
      }
    },
    'dyInMeters': {
      get: function get() {
        return distanceToMeters(this.map_proj, this.dy);
      }
    }
  });
  WRFDomain.prototype.addMainGrid = /** @this {WRFDomainGrid} */function () {
    var moad, mod_e_we, mod_e_sn, stand_lon_delta, truelat1_delta, truelat2_delta, center;

    // create new grid
    moad = new WRFDomainGrid(this, null, 1);

    // change current moad parameters
    this._mainGrid.parent_grid_ratio = 3;
    this._mainGrid.i_parent_start = WRFDomainGrid.minNestGridPoints + 1;
    this._mainGrid.j_parent_start = WRFDomainGrid.minNestGridPoints + 1;
    mod_e_we = (this._mainGrid.e_we - 1) % this._mainGrid.parent_grid_ratio;
    if (mod_e_we != 0) {
      this._mainGrid.e_we += this._mainGrid.parent_grid_ratio - mod_e_we;
    }
    mod_e_sn = (this._mainGrid.e_sn - 1) % this._mainGrid.parent_grid_ratio;
    if (mod_e_sn != 0) {
      this._mainGrid.e_sn += this._mainGrid.parent_grid_ratio - mod_e_sn;
    }

    // if e_we or e_sn was modified - move the domain center
    if (mod_e_we != 0 || mod_e_sn != 0) {
      stand_lon_delta = this.stand_lon - this.ref_lon;
      truelat1_delta = this.truelat1 - this.ref_lat;
      truelat2_delta = this.truelat2 - this.ref_lat;
      center = this._mainGrid.projection.unstaggered_ij_to_latlon((this._mainGrid.e_we - 1) / 2, (this._mainGrid.e_sn - 1) / 2);
      this.ref_lat = center[0];
      this.ref_lon = center[1];
      this.stand_lon = this.ref_lon + stand_lon_delta;
      this.truelat1 = this.ref_lat + truelat1_delta;
      this.truelat2 = this.ref_lat + truelat2_delta;
    }

    // set domain dx/dy
    this.dx = this.dx * this._mainGrid.parent_grid_ratio;
    this.dy = this.dy * this._mainGrid.parent_grid_ratio;

    // init new moad
    moad.parent_grid_ratio = 1;
    moad.i_parent_start = 1;
    moad.j_parent_start = 1;
    moad.e_we = 2 * WRFDomainGrid.minNestGridPoints + (this._mainGrid.e_we - 1) / this._mainGrid.parent_grid_ratio + 1;
    moad.e_sn = 2 * WRFDomainGrid.minNestGridPoints + (this._mainGrid.e_sn - 1) / this._mainGrid.parent_grid_ratio + 1;
    this._mainGrid.parent = moad;
    moad.nests.push(this._mainGrid);
    this._mainGrid = moad;
    function idAddOne(grid) {
      grid.id++;
      for (var i = 0; i < grid.nests.length; i++) {
        idAddOne(grid.nests[i]);
      }
    }
    idAddOne(moad.nests[0]);
    moad.addTo(this._map);
    this._orderGrids(true);
    this.update();
  };
  WRFDomain.prototype.removeMainGrid = /** @this {WRFDomainGrid} */function () {
    if (this._mainGrid.nests.length > 1) {
      throw "Cannot remove top most grid with multiple nests";
    }
    if (this._mainGrid.nests.length == 0) {
      return;
    }
    var stand_lon_delta, truelat1_delta, truelat2_delta, center;
    stand_lon_delta = this._mainGrid.domain.stand_lon - this._mainGrid.domain.ref_lon;
    truelat1_delta = this._mainGrid.domain.truelat1 - this._mainGrid.domain.ref_lat;
    truelat2_delta = this._mainGrid.domain.truelat2 - this._mainGrid.domain.ref_lat;
    center = this._mainGrid.nests[0].projection.unstaggered_ij_to_latlon((this._mainGrid.nests[0].e_we - 1) / 2, (this._mainGrid.nests[0].e_sn - 1) / 2);
    this.ref_lat = center[0];
    this.ref_lon = center[1];
    this.stand_lon = this.ref_lon + stand_lon_delta;
    this.truelat1 = this.ref_lat + truelat1_delta;
    this.truelat2 = this.ref_lat + truelat2_delta;
    this.dx = this.dx / this._mainGrid.nests[0].parent_grid_ratio;
    this.dy = this.dy / this._mainGrid.nests[0].parent_grid_ratio;
    this._mainGrid.remove(true);
    this._mainGrid.nests[0].parent = null;
    this._mainGrid.nests[0].parent_grid_ratio = 1;
    this._mainGrid.nests[0].i_parent_start = 1;
    this._mainGrid.nests[0].j_parent_start = 1;
    this._mainGrid = this._mainGrid.nests[0];
    this._mainGrid.updateId(1);
    this._mainGrid.addTo(this._map);
  };

  var SidebarDomainsPanel = /*#__PURE__*/_createClass(function SidebarDomainsPanel(container, options) {
    _classCallCheck(this, SidebarDomainsPanel);
    // controls
    var self = this,
      initializedForDomain = false,
      domain,
      form,
      containerGrids,
      headerGrids,
      buttonUpdate,
      buttonStanLonMinus,
      buttonStanLonPlus,
      buttonRatioDivide2,
      buttonRatioDivide3,
      buttonRatioMultiply2,
      buttonRatioMultiply3,
      buttonAddMOAD,
      buttonRemoveMOAD,
      selectMapProj,
      inputRefLat,
      inputRefLon,
      inputTrueLat1,
      inputTrueLat2,
      inputStandLon,
      inputDX,
      inputDY,
      inputPoleLat,
      inputPoleLon,
      localStorageKey = 'wrf_domain_wizard_wps_panel';

    // defaul settings
    this.options = {
      minGridDistanceMeters: 100,
      minGridDistanceDegrees: 0
    };
    if (options) {
      this.options = Object.assign(this.options, options);
    }
    form = $('form', container);
    containerGrids = $('#grids', form);
    headerGrids = $('div#grids-header', form);
    buttonUpdate = $('#update-domain', container);
    buttonAddMOAD = $('button[data-action="add-moad"]', form);
    buttonRemoveMOAD = $('button[data-action="remove-moad"]', form);
    selectMapProj = $('select[name="map_proj"]', form);
    disableMapProjectionSelect();
    inputRefLat = $('input[name="ref_lat"]', form);
    inputRefLon = $('input[name="ref_lon"]', form);
    inputTrueLat1 = $('input[name="truelat1"]', form);
    inputTrueLat2 = $('input[name="truelat2"]', form);
    inputStandLon = $('input[name="stand_lon"]', form);
    inputDX = $('input[name="dx"]', form);
    inputDY = $('input[name="dy"]', form);
    inputPoleLat = $('input[name="pole_lat"]', form);
    inputPoleLon = $('input[name="pole_lon"]', form);
    buttonStanLonMinus = $('#stan-lon-minus', form);
    buttonStanLonPlus = $('#stan-lon-plus', form);
    buttonRatioDivide2 = $('#div-2', form);
    buttonRatioDivide3 = $('#div-3', form);
    buttonRatioMultiply2 = $('#mul-2', form);
    buttonRatioMultiply3 = $('#mul-3', form);
    buttonUpdate.off();
    selectMapProj.off();
    buttonStanLonMinus.off();
    buttonStanLonPlus.off();
    buttonRatioDivide2.off();
    buttonRatioDivide3.off();
    buttonRatioMultiply2.off();
    buttonRatioMultiply3.off();
    $('[title]', form).tooltip();

    // hide tooltip when button is clicked
    $('button[title]', form).on('click', function (e) {
      $(this).tooltip('hide');
    });
    function setGridsContainerHeight() {
      containerGrids.height(buttonUpdate.parent().offset().top - containerGrids.offset().top - 10);
    }
    $(window).on('resize', setGridsContainerHeight);
    function setGridValues() {
      domain.map_proj = selectMapProj.val();
      domain.ref_lat = parseFloat(inputRefLat.val());
      domain.ref_lon = parseFloat(inputRefLon.val());
      domain.truelat1 = parseFloat(inputTrueLat1.val());
      domain.truelat2 = parseFloat(inputTrueLat2.val());
      domain.stand_lon = parseFloat(inputStandLon.val());
      domain.pole_lat = parseFloat(inputPoleLat.val());
      domain.pole_lon = parseFloat(inputPoleLon.val());
      if (domain.map_proj === WrfProjections.latlon) {
        domain.dx = parseFloat(inputDX.val());
        domain.dy = parseFloat(inputDY.val());
      } else {
        domain.dx = parseInt(inputDX.val(), 10);
        domain.dy = parseInt(inputDY.val(), 10);
      }
      domain.grid.gridPanel.setGridValues();
      domain.update();
    }

    // make nest button click event handler
    buttonAddMOAD.on('click', function (e) {
      domain.addMainGrid();
      containerGrids.empty();
      initGridPanels();
    });

    // remove parent button click event handler
    // removes top most grid and makes it's nest the new top most grid
    buttonRemoveMOAD.on('click', function (e) {
      domain.removeMainGrid();
      containerGrids.empty();
      initGridPanels();
      domain.update();
    });

    // button Update click
    // validate domain and grid field values
    buttonUpdate.on('click', function (e) {
      var formValid, gridValid;

      // clear validation
      form.removeClass('was-validated');
      formValid = form[0].checkValidity();
      gridValid = domain.grid.gridPanel.validate();
      if (!formValid || !gridValid) {
        form.addClass('was-validated');
        return;
      }
      setGridValues();
    });
    function inputToMeters(input) {
      input.attr('min', self.options.minGridDistanceMeters);
      input.attr('step', 1);
    }
    function inputToDegrees(input) {
      input.attr('min', 0);
      input.attr('step', 0.001);
    }
    function showInputGroup(input, enabled) {
      var inputParent = input.parent();
      inputParent.show();
      inputParent.find('input').each(function (i, element) {
        if (enabled === true) {
          element.required = true;
          element.disabled = false;
        } else {
          element.required = false;
          element.disabled = true;
        }
      });
    }
    function hideInputGroup(input) {
      var inputParent = input.parent();
      inputParent.hide();
      inputParent.find('input').each(function (i, element) {
        element.required = false;
      });
    }
    function showStandLon(enabled) {
      showInputGroup(inputStandLon, enabled);
      if (enabled === true) {
        buttonStanLonPlus.prop('disabled', false);
        buttonStanLonMinus.prop('disabled', false);
      } else {
        buttonStanLonPlus.prop('disabled', true);
        buttonStanLonMinus.prop('disabled', true);
      }
    }
    function showPoleLatLon(enabled) {
      showInputGroup(inputPoleLat);
      if (enabled === true) {
        inputPoleLat[0].disabled = false;
        inputPoleLon[0].disabled = false;
      } else {
        inputPoleLat[0].disabled = true;
        inputPoleLon[0].disabled = true;
      }
    }

    // function enables/disables and sets default values for fields
    // for selected projection
    function configFieldsForProjection() {
      showInputGroup(inputRefLat, true);
      hideInputGroup(inputTrueLat1);
      hideInputGroup(inputTrueLat2);
      hideInputGroup(inputStandLon);
      hideInputGroup(inputPoleLat);
      switch (selectMapProj.val()) {
        case 'lambert':
          // true_lat1
          showInputGroup(inputTrueLat1, true);
          showInputGroup(inputTrueLat2, true);
          showStandLon(true);
          inputToMeters(inputDX);
          inputToMeters(inputDY);
          break;
        case 'mercator':
          showInputGroup(inputTrueLat1, true);
          showStandLon(false);
          inputToMeters(inputDX);
          inputToMeters(inputDY);
          break;
        case 'polar':
          showInputGroup(inputTrueLat1, true);
          showStandLon(true);
          inputToMeters(inputDX);
          inputToMeters(inputDY);
          break;
        case 'lat-lon':
          showStandLon(true, formatFloat(domain.stand_lon));
          showPoleLatLon(false);

          // dx, dy in degrees
          inputToDegrees(inputDX);
          inputToDegrees(inputDY);
          break;
      }
    }

    // updates the tooltip on the map projection field
    function updateSelectMapProjTitle() {
      var title = selectMapProj.find('option:selected').data('title');
      selectMapProj.attr('title', title);
      selectMapProj.tooltip('dispose');
      selectMapProj.tooltip();
    }

    // map projection dropdown change
    selectMapProj.on('change', function (e) {
      if (domain != null) {
        configFieldsForProjection();
        setGridValues();
      } else {
        initializeDxDyFields(selectMapProj.val());
      }
      updateSelectMapProjTitle();
    });

    // initialize map_proj select tooltip
    updateSelectMapProjTitle();

    // stan_lon buttons
    // rotate domain clockwise or counter-clockwise by 5 degrees
    function rotateDomain(clockwise) {
      var val = parseFloat(inputStandLon.val());
      var delta = domain.ref_lat > 0 ? 5 : -5;
      if (!clockwise) {
        delta = -delta;
      }
      if (val - delta > -180) {
        domain.stand_lon = val - delta;
      }
      domain.update();
    }
    buttonStanLonMinus.on('click', function (e) {
      rotateDomain(true);
    });
    buttonStanLonPlus.on('click', function (e) {
      rotateDomain(false);
    });
    var MulDivOp = Object.freeze({
      MUL: 0,
      DIV: 1
    });
    function mulDiv(num, op, factor) {
      if (op == MulDivOp.DIV) {
        return num / factor;
      } else if (op == MulDivOp.MUL) {
        return num * factor;
      }
    }
    function setDxDyFieldValues(map_proj, dx, dy) {
      if (map_proj === WrfProjections.latlon) {
        inputDX.val(formatFloat(dx));
        inputDY.val(formatFloat(dy));
      } else {
        inputDX.val(Math.round(dx));
        inputDY.val(Math.round(dy));
      }
    }

    // handles multiplication/division of DX and DY via a button
    function modifyDxDy(op, factor) {
      var map_proj = selectMapProj.val();
      var minDistance, newDx, newDy, currentDx, currentDy;
      if (map_proj === WrfProjections.latlon) {
        currentDx = parseFloat(inputDX.val());
        currentDy = parseFloat(inputDY.val());
        minDistance = Math.min(degreesToMeters(currentDx), degreesToMeters(currentDy));
      } else {
        currentDx = parseInt(inputDX.val());
        currentDy = parseInt(inputDY.val());
        minDistance = Math.min(currentDx, currentDy);
      }
      if (isNaN(currentDx) || isNaN(currentDy)) {
        return;
      }

      // DX or DY have reached allowed minimum
      if (op == MulDivOp.DIV && minDistance < 100) {
        return;
      }
      newDx = mulDiv(currentDx, op, factor);
      newDy = mulDiv(currentDy, op, factor);

      // when no domain is present on map, simply update DX/DY and exit
      if (domain == null) {
        setDxDyFieldValues(map_proj, newDx, newDy);
        return;
      }

      // reverse operation will be applied to e_we and e_sn to preserve the domain area
      var reverseOp = op == MulDivOp.DIV ? MulDivOp.MUL : MulDivOp.DIV;

      // set new settings
      function calculateGridValues(grid, tmpGrid) {
        var update = true;
        if (grid.id == 1) {
          tmpGrid.i_parent_start = 1;
          tmpGrid.j_parent_start = 1;
          tmpGrid.parent_grid_ratio = 1;
          tmpGrid.e_we = Math.floor(mulDiv(grid.e_we, reverseOp, factor));
          tmpGrid.e_sn = Math.floor(mulDiv(grid.e_sn, reverseOp, factor));
          if (tmpGrid.e_we < WRFDomainGrid.minGridSize || tmpGrid.e_sn < WRFDomainGrid.minGridSize) {
            return false;
          }
        } else {
          // new values with new dx/dy
          tmpGrid.parent_grid_ratio = grid.parent_grid_ratio;
          tmpGrid.i_parent_start = Math.max(Math.floor(mulDiv(grid.i_parent_start, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);
          tmpGrid.j_parent_start = Math.max(Math.floor(mulDiv(grid.j_parent_start, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);
          var new_i_delta_end = Math.max(Math.floor(mulDiv(grid.i_delta_end, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);
          var new_j_delta_end = Math.max(Math.floor(mulDiv(grid.j_delta_end, reverseOp, factor)), WRFDomainGrid.minNestGridPoints);
          tmpGrid.e_we = Math.floor((tmpGrid.parent.e_we - new_i_delta_end - tmpGrid.i_parent_start) * grid.parent_grid_ratio + 1);
          tmpGrid.e_sn = Math.floor((tmpGrid.parent.e_sn - new_j_delta_end - tmpGrid.j_parent_start) * grid.parent_grid_ratio + 1);
          if (tmpGrid.e_we < WRFDomainGrid.minGridSize || tmpGrid.e_sn < WRFDomainGrid.minGridSize) {
            return false;
          }
        }
        for (var i = 0; i < grid.nests.length; i++) {
          var tmpNestGrid = new WRFDomainGrid(tmpGrid.domain, tmpGrid, grid.nests[i].id);
          tmpGrid.nests.push(tmpNestGrid);
          update = update && calculateGridValues(grid.nests[i], tmpNestGrid);
        }
        return update;
      }
      var tmpDomain = createEmptyDomain();
      tmpDomain.createMainGrid();
      if (calculateGridValues(domain.grid, tmpDomain.grid)) {
        var copyGridValues = function copyGridValues(grid, tmpGrid) {
          grid.i_parent_start = tmpGrid.i_parent_start;
          grid.j_parent_start = tmpGrid.j_parent_start;
          grid.e_we = tmpGrid.e_we;
          grid.e_sn = tmpGrid.e_sn;
          for (var i = 0; i < grid.nests.length; i++) {
            copyGridValues(grid.nests[i], tmpGrid.nests[i]);
          }
        };
        domain.dx = newDx;
        domain.dy = newDy;
        setDxDyFieldValues(map_proj, newDx, newDy);
        copyGridValues(domain.grid, tmpDomain.grid);
        domain.update();
      }
    }

    // dx/dy buttons
    buttonRatioDivide2.on('click', function () {
      modifyDxDy(MulDivOp.DIV, 2);
    });
    buttonRatioDivide3.on('click', function () {
      modifyDxDy(MulDivOp.DIV, 3);
    });
    buttonRatioMultiply2.on('click', function () {
      modifyDxDy(MulDivOp.MUL, 2);
    });
    buttonRatioMultiply3.on('click', function () {
      modifyDxDy(MulDivOp.MUL, 3);
    });
    function formatFloat(value, decimals) {
      decimals = decimals || 3;
      return value.toFixed(decimals);
    }
    function setFloatFieldValue(input, value, decimals) {
      if (value != null) {
        input.val(formatFloat(value, decimals));
      } else {
        input.val(null);
      }
    }
    function setFieldValues() {
      selectMapProj.val(domain.map_proj);
      setFloatFieldValue(inputRefLat, domain.ref_lat);
      setFloatFieldValue(inputRefLon, domain.ref_lon);
      setFloatFieldValue(inputTrueLat1, domain.truelat1);
      setFloatFieldValue(inputTrueLat2, domain.truelat2);
      setFloatFieldValue(inputStandLon, domain.stand_lon);
      setDxDyFieldValues(domain.map_proj, domain.dx, domain.dy);
      setFloatFieldValue(inputPoleLat, domain.pole_lat);
      setFloatFieldValue(inputPoleLon, domain.pole_lon);
    }
    function setButtonRemoveMOADEnabled() {
      buttonRemoveMOAD.prop('disabled', domain.grid.nests.length != 1);
    }
    function initGridPanels() {
      domain.grid.gridPanel = new SidebarDomainsPanelGrid(containerGrids, domain.grid, function (e) {
        errorMessageBox('Error', e.error);
      }, self.options);
      domain.grid.on('wps:addnest', setButtonRemoveMOADEnabled);
      domain.grid.on('wps:removenest', setButtonRemoveMOADEnabled);
      setButtonRemoveMOADEnabled();
    }
    function initDomain() {
      initGridPanels();
      domain.on('wps:change', setFieldValues);
      domain.on('remove', function () {
        self.hide();
      });
      domain.on('add', function () {
        initGridPanels();
      });
      disableMapProjectionSelect();
      setFieldValues();
      configFieldsForProjection();
      initializedForDomain = true;
    }
    function enableMapProjectionSelect() {
      selectMapProj.removeAttr('disabled');
    }
    function disableMapProjectionSelect() {
      selectMapProj.attr('disabled', 'disabled');
    }

    // configures DX/DY for selected projection and sets the default value
    function initializeDxDyFields(map_proj) {
      if (map_proj === WrfProjections.latlon) {
        inputToDegrees(inputDX);
        inputToDegrees(inputDY);
        inputDX.val(localStorage.getItem(localStorageKey + 'dx.lat-lon') || 0.1);
        inputDY.val(localStorage.getItem(localStorageKey + 'dy.lat-lon') || 0.1);
      } else {
        inputToMeters(inputDX);
        inputToMeters(inputDY);
        inputDX.val(localStorage.getItem(localStorageKey + 'dx') || 12000);
        inputDY.val(localStorage.getItem(localStorageKey + 'dy') || 12000);
      }
    }
    function createEmptyDomain() {
      var newDomain = new WRFDomain();
      newDomain.map_proj = selectMapProj.val();
      return newDomain;
    }

    // hide all fields 
    // called when a user clicks New domain button
    this.showNewDomain = function () {
      domain = null;
      initializedForDomain = false;
      buttonUpdate.parent().hide();

      // hide all projection fields
      hideInputGroup(inputRefLat);
      hideInputGroup(inputStandLon);
      hideInputGroup(inputTrueLat1);
      hideInputGroup(inputTrueLat2);
      hideInputGroup(inputPoleLat);
      headerGrids.hide();

      // enable map proj
      enableMapProjectionSelect();
      var map_proj = localStorage.getItem(localStorageKey + 'map_proj') || 'lambert';
      selectMapProj.val(map_proj);
      initializeDxDyFields(map_proj);
      container.show();
      setGridsContainerHeight();
    };
    this.validateNewDomain = function () {
      return selectMapProj[0].checkValidity() && inputDX[0].checkValidity() && inputDY[0].checkValidity();
    };
    this.createNewDomain = function () {
      disableMapProjectionSelect();
      domain = createEmptyDomain();
      localStorage.setItem(localStorageKey + 'map_proj', domain.map_proj);
      if (domain.map_proj === WrfProjections.latlon) {
        domain.dx = parseFloat(inputDX.val());
        domain.dy = parseFloat(inputDY.val());
        localStorage.setItem(localStorageKey + 'dx.lat-lon', domain.dx);
        localStorage.setItem(localStorageKey + 'dy.lat-lon', domain.dy);
        domain.pole_lat = 90;
        domain.pole_lon = 0;
      } else {
        domain.dx = parseInt(inputDX.val(), 10);
        domain.dy = parseInt(inputDY.val(), 10);
        localStorage.setItem(localStorageKey + 'dx', domain.dx);
        localStorage.setItem(localStorageKey + 'dy', domain.dy);
      }
      domain.createMainGrid();
      return domain;
    };
    this.show = function (obj) {
      if (obj && obj != domain) {
        domain = obj;
        initializedForDomain = false;
      }
      if (!initializedForDomain) {
        initDomain();
      }
      buttonUpdate.parent().show();
      headerGrids.show();
      container.show();
      setGridsContainerHeight();
    };
    this.hide = function () {
      container.hide();
    };
  });

  var WPSSaveDialog = /*#__PURE__*/function () {
    function WPSSaveDialog() {
      var _this = this;
      _classCallCheck(this, WPSSaveDialog);
      this._container = $('div.modal#wps-save-dialog');
      var dialogBody = $('div.modal-body', this._container);
      var dialogFooter = $('div.modal-footer', this._container);
      var buttonCopy = $('button#button-copy', dialogFooter);
      var buttonDownload = $('button#button-download', dialogFooter);
      this._wpsContent = $('textarea', dialogBody);
      buttonCopy.on('click', function (e) {
        navigator.clipboard.writeText(_this._wpsContent.text());
      });
      buttonDownload.on('click', function (e) {
        var blob = new Blob([_this._wpsContent.val()], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "namelist.wps", {
          autoBom: true
        });
      });
    }
    return _createClass(WPSSaveDialog, [{
      key: "show",
      value: function show(domain) {
        this._wpsContent.text(domain.getWPSNamelist().toString());
        this._container.modal();
      }
    }]);
  }();

  // https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/wps.html#wps-output-fields

  var geogridOutput = {
    cornerIndex: {
      mass: {
        sw: 0,
        nw: 1,
        ne: 2,
        se: 3
      },
      u: {
        sw: 4,
        nw: 5,
        ne: 6,
        se: 7
      },
      v: {
        sw: 8,
        nw: 9,
        ne: 10,
        se: 11
      },
      unstaggered: {
        sw: 12,
        nw: 13,
        ne: 14,
        se: 15
      }
    }
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var FileSaver_min = {exports: {}};

  (function (module, exports) {
  	(function(a,b){b();})(commonjsGlobal,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(a,b,c){var d=new XMLHttpRequest;d.open("GET",a),d.responseType="blob",d.onload=function(){g(d.response,b,c);},d.onerror=function(){console.error("could not download file");},d.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),g=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype&&!a?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else {var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(b,d,e,g){if(g=g||open("","_blank"),g&&(g.document.title=g.document.body.innerText="downloading..."),"string"==typeof b)return c(b,d,e);var h="application/octet-stream"===b.type,i=/constructor/i.test(f.HTMLElement)||f.safari,j=/CriOS\/[\d]+/.test(navigator.userAgent);if((j||h&&i||a)&&"undefined"!=typeof FileReader){var k=new FileReader;k.onloadend=function(){var a=k.result;a=j?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),g?g.location.href=a:location=a,g=null;},k.readAsDataURL(b);}else {var l=f.URL||f.webkitURL,m=l.createObjectURL(b);g?g.location=m:location.href=m,g=null,setTimeout(function(){l.revokeObjectURL(m);},4E4);}});f.saveAs=g.saveAs=g,(module.exports=g);});

  	
  } (FileSaver_min));

  var FileSaver_minExports = FileSaver_min.exports;

  function htmlEncode(text) {
    if (!text) {
      return '';
    }
    return text.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
      return '&#' + i.charCodeAt(0) + ';';
    });
  }

  var NamelistInputEditor = /*#__PURE__*/function () {
    function NamelistInputEditor(container, options) {
      _classCallCheck(this, NamelistInputEditor);
      // defaul settings
      this.options = {
        jsonBaseUrl: 'json',
        change: null,
        floatDigits: 3
      };
      if (options) {
        this.options = Object.assign(this.options, options);
      }

      // editor container element
      this.container = container;

      // variable definitions
      this.variables = null;

      // read-only variable flags
      this.readOnly = {};

      // variable group user guide links
      this.userGuideLinks = {};

      // namelist object
      this.namelist = null;

      // initialize editor view state
      var value = localStorage.getItem("".concat(NamelistInputEditor._localStorageKey, "_view"));
      if (value) {
        this.view = JSON.parse(value);
      } else {
        this.view = {
          groups: {}
        };
      }
    }

    // current max_dom value
    return _createClass(NamelistInputEditor, [{
      key: "max_dom",
      get: function get() {
        var _this$namelist$domain, _this$namelist$domain2;
        return (_this$namelist$domain = (_this$namelist$domain2 = this.namelist.domains) === null || _this$namelist$domain2 === void 0 ? void 0 : _this$namelist$domain2.max_dom) !== null && _this$namelist$domain !== void 0 ? _this$namelist$domain : 1;
      }

      // initializes editor from namelist.wps object
    }, {
      key: "openNamelistWpsAsync",
      value: function () {
        var _openNamelistWpsAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(namelistWps) {
          var _this$namelist;
          var grid_id, i;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                // empty elements
                this._empty();
                this.namelist = (_this$namelist = this.namelist) !== null && _this$namelist !== void 0 ? _this$namelist : {};
                this._setReadOnlyNamelistValue('domains', 'max_dom', namelistWps.share.max_dom);
                this._setReadOnlyNamelistValue('domains', 'e_we', namelistWps.geogrid.e_we);
                this._setReadOnlyNamelistValue('domains', 'e_sn', namelistWps.geogrid.e_sn);
                this._setReadOnlyNamelistValue('domains', 'dx', distanceToMeters(namelistWps.geogrid.map_proj, namelistWps.geogrid.dx));
                this._setReadOnlyNamelistValue('domains', 'dy', distanceToMeters(namelistWps.geogrid.map_proj, namelistWps.geogrid.dy));
                grid_id = [];
                for (i = 1; i <= namelistWps.share.max_dom; i++) {
                  grid_id.push(i);
                }
                this._setReadOnlyNamelistValue('domains', 'grid_id', grid_id);
                this._setReadOnlyNamelistValue('domains', 'parent_id', namelistWps.geogrid.parent_id);
                this._setReadOnlyNamelistValue('domains', 'i_parent_start', namelistWps.geogrid.i_parent_start);
                this._setReadOnlyNamelistValue('domains', 'j_parent_start', namelistWps.geogrid.j_parent_start);
                this._setReadOnlyNamelistValue('domains', 'parent_grid_ratio', namelistWps.geogrid.parent_grid_ratio);

                // initialize variable definitions
                _context.next = 16;
                return this._initVariablesAsync();
              case 16:
                // empty elements
                this._empty();

                // initialize editor fields
                this._initEditorFields();
              case 18:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function openNamelistWpsAsync(_x) {
          return _openNamelistWpsAsync.apply(this, arguments);
        }
        return openNamelistWpsAsync;
      }() // open namelist object
    }, {
      key: "openNamelistInputAsync",
      value: function () {
        var _openNamelistInputAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
          var errors, namelist, max_dom, _i, _Object$keys, groupName, group, _i2, _Object$keys2, variableName, variable, _i3, _errors, error;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                errors = []; // empty elements
                this._empty();

                // initialize variable definitions
                _context2.next = 4;
                return this._initVariablesAsync();
              case 4:
                namelist = new Namelist(data);
                if (!(namelist.domains === undefined)) {
                  _context2.next = 8;
                  break;
                }
                result.errors.push("domains variable group not found in namelist");
                return _context2.abrupt("return");
              case 8:
                if (!(namelist.domains.max_dom === undefined)) {
                  _context2.next = 11;
                  break;
                }
                result.errors.push("variable 'max_dom' not found in namelist");
                return _context2.abrupt("return");
              case 11:
                max_dom = parseInt(namelist.domains.max_dom);
                if (!isNaN(max_dom)) {
                  _context2.next = 15;
                  break;
                }
                errors.push("variable 'max_dom' is not a valid integer");
                return _context2.abrupt("return");
              case 15:
                _i = 0, _Object$keys = Object.keys(namelist);
              case 16:
                if (!(_i < _Object$keys.length)) {
                  _context2.next = 45;
                  break;
                }
                groupName = _Object$keys[_i];
                group = this.variables[groupName];
                if (!(group === undefined)) {
                  _context2.next = 22;
                  break;
                }
                errors.push("Unknown variable group ".concat(groupName));
                return _context2.abrupt("continue", 42);
              case 22:
                _i2 = 0, _Object$keys2 = Object.keys(namelist[groupName]);
              case 23:
                if (!(_i2 < _Object$keys2.length)) {
                  _context2.next = 42;
                  break;
                }
                variableName = _Object$keys2[_i2];
                variable = group[variableName];
                if (!(variable === undefined)) {
                  _context2.next = 29;
                  break;
                }
                errors.push("Unknown variable ".concat(variableName, " in group ").concat(groupName));
                return _context2.abrupt("continue", 39);
              case 29:
                _context2.t0 = variable.entries;
                _context2.next = _context2.t0 === NamelistInputEditor.entries.maxDom ? 32 : _context2.t0 === NamelistInputEditor.entries.maxEta ? 35 : _context2.t0 === NamelistInputEditor.entries.single ? 37 : 39;
                break;
              case 32:
                Namelist.convertToArray(namelist[groupName], variableName);
                while (namelist[groupName][variableName].length < max_dom) {
                  namelist[groupName][variableName].push(namelist[groupName][variableName][0]);
                }
                return _context2.abrupt("break", 39);
              case 35:
                Namelist.convertToArray(namelist[groupName], variableName);
                return _context2.abrupt("break", 39);
              case 37:
                if (Array.isArray(namelist[groupName][variableName])) {
                  namelist[groupName][variableName] = namelist[groupName][variableName][0];
                }
                return _context2.abrupt("break", 39);
              case 39:
                _i2++;
                _context2.next = 23;
                break;
              case 42:
                _i++;
                _context2.next = 16;
                break;
              case 45:
                this.namelist = namelist;
                for (_i3 = 0, _errors = errors; _i3 < _errors.length; _i3++) {
                  error = _errors[_i3];
                  console.warn(error);
                }

                // initialize editor fields
                this._initEditorFields();
                return _context2.abrupt("return", {
                  errors: errors.length > 0 ? errors : null,
                  hasErrors: errors.length > 0
                });
              case 49:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function openNamelistInputAsync(_x2) {
          return _openNamelistInputAsync.apply(this, arguments);
        }
        return openNamelistInputAsync;
      }() // return raw text representation of namelist data
    }, {
      key: "toText",
      value: function toText() {
        var _this = this;
        var text = '';
        var _loop = function _loop() {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i4], 2),
            groupName = _Object$entries$_i[0],
            groupVariables = _Object$entries$_i[1];
          var variableNames = [];
          for (var _i5 = 0, _Object$keys3 = Object.keys(groupVariables); _i5 < _Object$keys3.length; _i5++) {
            var name = _Object$keys3[_i5];
            if (_this._isNamelistValueSet(groupName, name) === true) {
              variableNames.push(name);
            }
          }
          if (variableNames.length === 0) {
            return 1; // continue
          }
          var values = variableNames.map(function (name) {
            return _this.namelist[groupName][name];
          });
          var groupContent = Namelist.formatSection(groupName, variableNames, values);
          text = text + groupContent;
        };
        for (var _i4 = 0, _Object$entries = Object.entries(this.variables); _i4 < _Object$entries.length; _i4++) {
          if (_loop()) continue;
        }
        return text;
      }
    }, {
      key: "collapseGroups",
      value: function collapseGroups() {
        this._toggleGroupCollapse(NamelistInputEditor.collpaseCommands.hide);
      }
    }, {
      key: "expandGroups",
      value: function expandGroups(command) {
        this._toggleGroupCollapse(NamelistInputEditor.collpaseCommands.show);
      }
    }, {
      key: "hideUnsetVariables",
      value: function hideUnsetVariables() {
        this._toggleVariableHideUnset(true);
      }
    }, {
      key: "showUnsetVariables",
      value: function showUnsetVariables() {
        this._toggleVariableHideUnset(false);
      }
    }, {
      key: "hideUnsetGroups",
      value: function hideUnsetGroups() {
        this._toggleGroupHideUnset(true);
      }
    }, {
      key: "showUnsetGroups",
      value: function showUnsetGroups() {
        this._toggleGroupHideUnset(false);
      }
    }, {
      key: "_toggleGroupCollapse",
      value: function _toggleGroupCollapse(command) {
        this.container.querySelectorAll('div.namelist-input-variables.collapse').forEach(function (element) {
          $(element).collapse(command);
          var groupHeader = element.previousSibling;
          var icon = groupHeader.querySelector('button[data-toggle="collapse"] i');
          switch (command) {
            case NamelistInputEditor.collpaseCommands.hide:
              icon.classList.remove(NamelistInputEditor.iconClass.open);
              icon.classList.add(NamelistInputEditor.iconClass.collapsed);
              break;
            case NamelistInputEditor.collpaseCommands.show:
              icon.classList.remove(NamelistInputEditor.iconClass.collapsed);
              icon.classList.add(NamelistInputEditor.iconClass.open);
              break;
          }
        });
        for (var group in this.view.groups) {
          this.view.groups[group].collapse = command === NamelistInputEditor.collpaseCommands.hide;
        }
        this._storeView();
      }
    }, {
      key: "_toggleGroupHideUnset",
      value: function _toggleGroupHideUnset(hideUnset) {
        this.container.querySelectorAll('div.namelist-input-group').forEach(function (group) {
          if (hideUnset === true) {
            group.classList.add('namelist-input-hide-unset');
          } else {
            group.classList.remove('namelist-input-hide-unset');
          }
        });
      }
    }, {
      key: "_toggleVariableHideUnset",
      value: function _toggleVariableHideUnset(hideUnset) {
        this.container.querySelectorAll('div.namelist-input-group').forEach(function (group) {
          var variables = group.querySelector('.namelist-input-variables');
          if (hideUnset === true) {
            variables.classList.add('namelist-input-hide-unset');
          } else {
            variables.classList.remove('namelist-input-hide-unset');
          }
          var header = group.querySelector('.namelist-input-group-header');
          var hideUnset = header.querySelector('input[name="switch-hide-unset"]');
          hideUnset.checked = hideUnset;
        });
        for (var group in this.view.groups) {
          this.view.groups[group].hideUnset = hideUnset;
        }
      }

      // check whether variable namelist object value is set
    }, {
      key: "_isNamelistValueSet",
      value: function _isNamelistValueSet(group, variable) {
        return this.namelist[group] !== undefined && this.namelist[group][variable] !== undefined && this.namelist[group][variable] !== null;
      }

      // set variable namelist object value
    }, {
      key: "_setNamelistValue",
      value: function _setNamelistValue(group, variable, value) {
        var _this$namelist$group;
        this.namelist[group] = (_this$namelist$group = this.namelist[group]) !== null && _this$namelist$group !== void 0 ? _this$namelist$group : {};
        this.namelist[group][variable] = value;
      }

      // set namelist object value and flag variable as read-only
    }, {
      key: "_setReadOnlyNamelistValue",
      value: function _setReadOnlyNamelistValue(group, variable, value) {
        var _this$readOnly$group;
        this._setNamelistValue(group, variable, value);
        this.readOnly[group] = (_this$readOnly$group = this.readOnly[group]) !== null && _this$readOnly$group !== void 0 ? _this$readOnly$group : {};
        this.readOnly[group][variable] = true;
      }

      // returns true when when a variable is flagged as read-only
    }, {
      key: "_isReadOnly",
      value: function _isReadOnly(groupName, variableName) {
        return this.readOnly[groupName] !== undefined && this.readOnly[groupName][variableName] === true;
      }

      // clear editor
    }, {
      key: "_empty",
      value: function _empty() {
        while (this.container.firstChild && this.container.removeChild(this.container.firstChild));
      }

      // construct variable definition object
    }, {
      key: "_initVariablesAsync",
      value: function () {
        var _initVariablesAsync2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var selectValues, userGuide, registry, group, variable, description, hasUserGuideEntry, defaultValue, entries, groupName;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.variables === null)) {
                  _context3.next = 55;
                  break;
                }
                this.variables = {};

                // load variable JSON files
                _context3.next = 4;
                return this._loadJsonAsync('namelist.input.select.values.json');
              case 4:
                selectValues = _context3.sent;
                _context3.next = 7;
                return this._loadJsonAsync('namelist.input.users.guide.json');
              case 7:
                userGuide = _context3.sent;
                _context3.next = 10;
                return this._loadJsonAsync('namelist.input.registry.json');
              case 10:
                registry = _context3.sent;
                _context3.t0 = _regeneratorRuntime().keys(registry);
              case 12:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 53;
                  break;
                }
                group = _context3.t1.value;
                this.variables[group] = {};
                _context3.t2 = _regeneratorRuntime().keys(registry[group]);
              case 16:
                if ((_context3.t3 = _context3.t2()).done) {
                  _context3.next = 51;
                  break;
                }
                variable = _context3.t3.value;
                description = null;
                hasUserGuideEntry = userGuide[group] && userGuide[group][variable];
                if (hasUserGuideEntry && userGuide[group][variable].description) {
                  description = userGuide[group][variable].description;
                } else if (variable['comments'] && variable['comments'].length > 0) {
                  description = variable['comments'].join("; ");
                }
                defaultValue = registry[group][variable].defaultValue;
                entries = null;
                _context3.t4 = registry[group][variable].entries;
                _context3.next = _context3.t4 === "max_domains" ? 26 : _context3.t4 === NamelistInputEditor.entries.single ? 28 : _context3.t4 === NamelistInputEditor.entries.maxEta ? 28 : _context3.t4 === NamelistInputEditor.entries.maxDom ? 28 : 30;
                break;
              case 26:
                entries = NamelistInputEditor.entries.maxDom;
                return _context3.abrupt("break", 32);
              case 28:
                entries = registry[group][variable].entries;
                return _context3.abrupt("break", 32);
              case 30:
                console.warn("Unknown variable ".concat(variable, " number entries value ").concat(registry[group][variable].entries));
                return _context3.abrupt("continue", 16);
              case 32:
                if (!(hasUserGuideEntry && userGuide[group][variable].entries !== entries)) {
                  _context3.next = 47;
                  break;
                }
                _context3.t5 = variable;
                _context3.next = _context3.t5 === "dx" ? 36 : _context3.t5 === "dy" ? 36 : _context3.t5 === "eta_levels" ? 38 : _context3.t5 === "nssl_alphah" ? 40 : _context3.t5 === "nssl_alphahl" ? 40 : _context3.t5 === "nssl_cnoh" ? 40 : _context3.t5 === "nssl_cnohl" ? 40 : _context3.t5 === "nssl_cnor" ? 40 : _context3.t5 === "nssl_cnos" ? 40 : _context3.t5 === "nssl_rho_qh" ? 40 : _context3.t5 === "nssl_rho_qs" ? 40 : _context3.t5 === "topo_wind" ? 42 : _context3.t5 === "gph" ? 42 : _context3.t5 === "max_obs" ? 44 : 46;
                break;
              case 36:
                entries = NamelistInputEditor.entries.single;
                return _context3.abrupt("break", 47);
              case 38:
                entries = NamelistInputEditor.entries.maxEta;
                return _context3.abrupt("break", 47);
              case 40:
                entries = NamelistInputEditor.entries.single;
                return _context3.abrupt("break", 47);
              case 42:
                entries = NamelistInputEditor.entries.maxDom;
                return _context3.abrupt("break", 47);
              case 44:
                entries = NamelistInputEditor.entries.single;
                return _context3.abrupt("break", 47);
              case 46:
                console.warn("Variable ".concat(variable, " number of entries differ between registry ").concat(entries, " and users guide ").concat(userGuide[group][variable].entries));
              case 47:
                this.variables[group][variable] = {
                  type: registry[group][variable].type,
                  defaultValue: defaultValue,
                  description: description,
                  entries: entries
                };
                if (selectValues[variable] && selectValues[variable].values) {
                  this.variables[group][variable].type = NamelistInputEditor.variableTypes.selection;
                  this.variables[group][variable]['values'] = selectValues[variable].values;
                }
                _context3.next = 16;
                break;
              case 51:
                _context3.next = 12;
                break;
              case 53:
                // set default values for variables with missing or invalid default value in auto-generated JSON data

                // time_step default value not set in registry
                this._setDefaultValue("domains", "time_step", 60);
                for (groupName in userGuide) {
                  this.userGuideLinks[groupName] = "https://www2.mmm.ucar.edu/wrf/users/wrf_users_guide/build/html/namelist_variables.html#".concat(groupName.replace("_", "-"));
                }
              case 55:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this);
        }));
        function _initVariablesAsync() {
          return _initVariablesAsync2.apply(this, arguments);
        }
        return _initVariablesAsync;
      }() // load a JSON config file
    }, {
      key: "_loadJsonAsync",
      value: function () {
        var _loadJsonAsync2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(filename) {
          var jsonUrl, response;
          return _regeneratorRuntime().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                jsonUrl = "".concat(this.options.jsonBaseUrl, "/").concat(filename);
                _context4.next = 3;
                return fetch(jsonUrl);
              case 3:
                response = _context4.sent;
                _context4.next = 6;
                return response.json();
              case 6:
                return _context4.abrupt("return", _context4.sent);
              case 7:
              case "end":
                return _context4.stop();
            }
          }, _callee4, this);
        }));
        function _loadJsonAsync(_x3) {
          return _loadJsonAsync2.apply(this, arguments);
        }
        return _loadJsonAsync;
      }() // set variable definition default value
    }, {
      key: "_setDefaultValue",
      value: function _setDefaultValue(group, variable, defaultValue) {
        this.variables[group][variable].defaultValue = defaultValue;
      }

      // create editor HTML
    }, {
      key: "_initEditorFields",
      value: function _initEditorFields() {
        for (var _i6 = 0, _Object$entries2 = Object.entries(this.variables); _i6 < _Object$entries2.length; _i6++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i6], 2),
            groupName = _Object$entries2$_i[0],
            groupVariables = _Object$entries2$_i[1];
          if (Object.keys(groupVariables).length === 0) {
            continue;
          }
          this._initVariableGroup(groupName, groupVariables);
        }
        $(this.container).find('*[title]').tooltip();
        this._storeView();
        this._updateGroupView();
      }

      // collapse icons
    }, {
      key: "_initVariableGroup",
      value:
      // create group variables 
      function _initVariableGroup(groupName, groupVariables) {
        var _this$view$groups,
          _this$view$groups$gro,
          _this$view$groups$gro2,
          _this$view$groups$gro3,
          _this2 = this,
          _this$namelist$groupN;
        var groupDiv = this._append(this.container, 'div');
        groupDiv.classList.add('namelist-input-group');
        groupDiv.dataset['group'] = groupName;

        // initialize group view
        this.view.groups = (_this$view$groups = this.view.groups) !== null && _this$view$groups !== void 0 ? _this$view$groups : {};
        this.view.groups[groupName] = (_this$view$groups$gro = this.view.groups[groupName]) !== null && _this$view$groups$gro !== void 0 ? _this$view$groups$gro : {};
        this.view.groups[groupName].collapse = (_this$view$groups$gro2 = this.view.groups[groupName].collapse) !== null && _this$view$groups$gro2 !== void 0 ? _this$view$groups$gro2 : true;
        this.view.groups[groupName].hideUnset = (_this$view$groups$gro3 = this.view.groups[groupName].hideUnset) !== null && _this$view$groups$gro3 !== void 0 ? _this$view$groups$gro3 : false;
        var iconClass = this.view.groups[groupName].collapse === true ? NamelistInputEditor.iconClass.collapsed : NamelistInputEditor.iconClass.open;
        var headerDiv = this._append(groupDiv, 'div');
        headerDiv.classList.add('namelist-input-group-header');
        var headerDivHtml = '';

        // collapse toggle
        headerDivHtml = headerDivHtml + "<button class=\"btn btn-sm\" type=\"button\" data-toggle=\"collapse\" data-target=\"#".concat(groupName, "\" aria-expanded=\"false\" aria-controls=\"").concat(groupName, "\"><i class=\"fas ").concat(iconClass, "\"></i></button>");

        // group title
        headerDivHtml = headerDivHtml + "<h5>".concat(htmlEncode(groupName), "</h5>");

        // number of set variables
        headerDivHtml = headerDivHtml + '<span class="badge badge-pill badge-light namelist-input-set-variable-count" style="display: none;"></span>';

        // users guide link
        if (groupName in this.userGuideLinks) {
          headerDivHtml = headerDivHtml + "<a href=\"".concat(htmlEncode(this.userGuideLinks[groupName]), "\" target=\"_blank\" class=\"ml-3 text-muted\"><i class=\"fas fa-external-link-alt\"></i></a>");
        }

        // hide unset switch
        headerDivHtml = headerDivHtml + '<div class="namelist-input-group-header-switch">';
        headerDivHtml = headerDivHtml + '<label class="switch ml-2">';
        headerDivHtml = headerDivHtml + "<input type=\"checkbox\" name=\"switch-hide-unset\" id=\"switch-hide-unset-".concat(htmlEncode(groupName), "\"");
        if (this.view.groups[groupName].hideUnset === true) {
          headerDivHtml = headerDivHtml + ' checked';
        }
        headerDivHtml = headerDivHtml + '><span class="slider round"></span>';
        headerDivHtml = headerDivHtml + '</label>';
        headerDivHtml = headerDivHtml + '<span>Hide Unset</span>';
        headerDivHtml = headerDivHtml + '</div>';
        headerDiv.innerHTML = headerDivHtml;
        headerDiv.querySelector('button[data-toggle="collapse"]').addEventListener('click', function (e) {
          var icon = e.currentTarget.querySelector('i');
          var groupName = e.currentTarget.dataset['target'].replace('#', '');
          if (icon.classList.contains(NamelistInputEditor.iconClass.open)) {
            icon.classList.remove(NamelistInputEditor.iconClass.open);
            icon.classList.add(NamelistInputEditor.iconClass.collapsed);
            _this2.view.groups[groupName].collapse = true;
          } else {
            icon.classList.remove(NamelistInputEditor.iconClass.collapsed);
            icon.classList.add(NamelistInputEditor.iconClass.open);
            _this2.view.groups[groupName].collapse = false;
          }
          _this2._storeView();
        });
        headerDiv.querySelector("input#switch-hide-unset-".concat(groupName)).addEventListener('change', function (e) {
          var group = e.currentTarget.closest('.namelist-input-group');
          var groupName = group.dataset['group'];
          var variables = group.querySelector('div.namelist-input-variables');
          _this2.view.groups[groupName].hideUnset = e.currentTarget.checked;
          if (e.currentTarget.checked === true) {
            variables.classList.add('namelist-input-hide-unset');
          } else {
            variables.classList.remove('namelist-input-hide-unset');
          }
          _this2._storeView();
        });
        this.namelist[groupName] = (_this$namelist$groupN = this.namelist[groupName]) !== null && _this$namelist$groupN !== void 0 ? _this$namelist$groupN : {};
        this._appendGroupVariableFields(groupDiv, groupName, groupVariables);
      }
    }, {
      key: "_updateGroupView",
      value: function _updateGroupView() {
        this.container.querySelectorAll('div.namelist-input-group').forEach(function (group) {
          var count = group.querySelectorAll('div.namelist-input-variable:not(.namelist-input-variable-unset)').length;
          var badge = group.querySelector('div.namelist-input-group-header span.namelist-input-set-variable-count');
          if (count > 0) {
            badge.innerText = count;
            badge.style.display = null;
            group.classList.remove('namelist-input-group-unset');
          } else {
            badge.innerText = '0';
            badge.style.display = 'none';
            group.classList.add('namelist-input-group-unset');
          }
        });
      }

      // capture variable group collapse state
    }, {
      key: "_storeView",
      value: function _storeView() {
        localStorage.setItem("".concat(NamelistInputEditor._localStorageKey, "_view"), JSON.stringify(this.view));
      }

      // create and append group variables
    }, {
      key: "_appendGroupVariableFields",
      value: function _appendGroupVariableFields(groupDiv, groupName, groupVariables) {
        var variablesDiv = this._append(groupDiv, 'div');
        variablesDiv.classList.add('namelist-input-variables');
        variablesDiv.classList.add('collapse');
        if (this.view.groups[groupName].collapse === false) {
          variablesDiv.classList.add('show');
        }
        if (this.view.groups[groupName].hideUnset) {
          variablesDiv.classList.add('namelist-input-hide-unset');
        }
        variablesDiv.id = groupName;
        for (var _i7 = 0, _Object$entries3 = Object.entries(groupVariables); _i7 < _Object$entries3.length; _i7++) {
          var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i7], 2),
            variableName = _Object$entries3$_i[0],
            variable = _Object$entries3$_i[1];
          this._appendVariableField(variablesDiv, groupName, variableName, variable);
        }
      }

      // create and append variable input fields
    }, {
      key: "_appendVariableField",
      value: function _appendVariableField(variablesDiv, groupName, variableName, variable) {
        var _this3 = this;
        console.debug("Creating variable ".concat(variableName, " input"));
        var variableDiv = this._append(variablesDiv, 'div');
        variableDiv.classList.add('namelist-input-variable');
        variableDiv.dataset['default'] = variable.defaultValue;
        variableDiv.dataset['variable'] = variableName;
        var isSet = this._isNamelistValueSet(groupName, variableName);
        var readOnly = this._isReadOnly(groupName, variableName);
        var namelistGroup = this.namelist[groupName];
        if (isSet === false) {
          variableDiv.classList.add('namelist-input-variable-unset');
        }
        var html = '<div class="input-group input-group-sm">';
        html += '<div class="input-group-prepend">';

        // erase button HTML
        html += '<button class="btn btn-outline-secondary btn-namelist-input-erase" type="button"';
        if (readOnly === true) {
          variableDiv.classList.add('namelist-input-variable-readonly');
          html += ' disabled';
        }
        html += '><i class="fas fa-eraser"></i></button>';

        // variable name HTML
        html += '<span class="input-group-text" id="inputGroup-sizing-sm">';
        html += htmlEncode(variableName);
        html += '</span></div>';

        // variable input field(s) HTML
        switch (variable.entries) {
          case NamelistInputEditor.entries.maxDom:
            for (var i = 0; i < this.max_dom; i++) {
              html += this._getInputFieldHtml(variableName, variable, isSet ? namelistGroup[variableName][i] : variable.defaultValue, readOnly, i);
            }
            break;
          case NamelistInputEditor.entries.single:
            html += this._getInputFieldHtml(variableName, variable, isSet ? namelistGroup[variableName] : variable.defaultValue, readOnly, null);
            break;
          case NamelistInputEditor.entries.maxEta:
            break;
        }

        // variable description HTML
        if (variable.description) {
          html += '<div class="namelist-input-variable-description">';
          html += htmlEncode(variable.description);
          html += '</div>';
        }
        html += '</div>';
        variableDiv.innerHTML = html;
        if (readOnly === true) {
          return;
        }

        // configure erase button click event handler
        variableDiv.querySelector('button.btn-namelist-input-erase').addEventListener('click', function (e) {
          var variableDiv = e.currentTarget.closest('div.namelist-input-variable');
          var groupName = variableDiv.closest('div.namelist-input-group').dataset['group'];
          var variableName = variableDiv.dataset['variable'];
          variableDiv.classList.add('namelist-input-variable-unset');
          _this3.namelist[groupName][variableName] = null;
          _this3._setVariableFieldValue(groupName, variableName);
          _this3._fireChange(groupName, variableName);
        });

        // configure variable input fields event listeners
        switch (variable.type) {
          case NamelistInputEditor.variableTypes.selection:
            this._addVariableFieldListeners(variableDiv, 'select', variableName, 'change', function (select) {
              return parseInt(select.value);
            });
            break;
          case NamelistInputEditor.variableTypes.logical:
            this._addVariableFieldListeners(variableDiv, 'input', variableName, 'change', function (input) {
              return input.checked;
            });
            break;
          case NamelistInputEditor.variableTypes.integer:
            this._addVariableFieldListeners(variableDiv, 'input', variableName, 'change', function (input) {
              return parseInt(input.value);
            });
            break;
          case NamelistInputEditor.variableTypes.real:
            this._addVariableFieldListeners(variableDiv, 'input', variableName, 'change', function (input) {
              return parseFloat(input.value);
            });
            break;
          case NamelistInputEditor.variableTypes.character:
            this._addVariableFieldListeners(variableDiv, 'input', variableName, 'change', function (input) {
              return input.value;
            });
            break;
        }
      }

      // set variable input fields value from current namelist object
    }, {
      key: "_setVariableFieldValue",
      value: function _setVariableFieldValue(groupName, variableName) {
        var variable = this.variables[groupName][variableName];
        var isSet = this._isNamelistValueSet(groupName, variableName);
        switch (variable.entries) {
          case NamelistInputEditor.entries.maxDom:
            for (var i = 0; i < this.max_dom; i++) {
              this._setInputFieldValue(variableName, variable, isSet ? this.namelist[groupName][variableName][i] : variable.defaultValue, i);
            }
            break;
          case NamelistInputEditor.entries.single:
            this._setInputFieldValue(variableName, variable, isSet ? this.namelist[groupName][variableName] : variable.defaultValue, null);
            break;
          case NamelistInputEditor.entries.maxEta:
            break;
        }
      }

      // set variable input fields value
    }, {
      key: "_setInputFieldValue",
      value: function _setInputFieldValue(variableName, variable, value, index) {
        var fieldId = this._getInputFieldId(variableName, index);
        switch (variable.type) {
          case NamelistInputEditor.variableTypes.selection:
            document.querySelector("select#".concat(fieldId)).value = value;
            break;
          case NamelistInputEditor.variableTypes.logical:
            document.querySelector("input#".concat(fieldId)).checked = value;
            break;
          case NamelistInputEditor.variableTypes.integer:
          case NamelistInputEditor.variableTypes.real:
          case NamelistInputEditor.variableTypes.character:
            document.querySelector("input#".concat(fieldId)).value = value;
            break;
        }
      }

      // configure event listeners for variable input fields
    }, {
      key: "_addVariableFieldListeners",
      value: function _addVariableFieldListeners(variableDiv, fieldTag, variableName, eventType, getFieldValue) {
        var _this4 = this;
        variableDiv.querySelectorAll("".concat(fieldTag, "[name=\"").concat(variableName, "\"]")).forEach(function (field) {
          field.addEventListener(eventType, function (e) {
            var variableName = e.currentTarget.name;
            var variableDiv = document.querySelector("div.namelist-input-variable[data-variable=\"".concat(variableName, "\"]"));
            var groupName = variableDiv.closest('div.namelist-input-group').dataset['group'];
            variableDiv.classList.remove('namelist-input-variable-unset');
            switch (_this4.variables[groupName][variableName].entries) {
              case NamelistInputEditor.entries.single:
                _this4._setNamelistValue(groupName, variableName, getFieldValue.call(_this4, e.currentTarget));
                break;
              case NamelistInputEditor.entries.maxDom:
                _this4._setNamelistValue(groupName, variableName, _this4._listVariableFields(groupName, variableName, fieldTag).map(function (input) {
                  return getFieldValue.call(_this4, input);
                }));
                break;
            }
            _this4._fireChange(groupName, variableName);
          });
        });
      }

      // fire change event
    }, {
      key: "_fireChange",
      value: function _fireChange(groupName, variableName) {
        if (typeof this.options.change === 'function') {
          this.options.change.call(this, {
            group: groupName,
            variable: variableName
          });
        }
        this._updateGroupView();
      }

      // select variable input fields and return them as an array
    }, {
      key: "_listVariableFields",
      value: function _listVariableFields(groupName, variableName, fieldTag) {
        var inputFields = [];
        document.querySelectorAll("div.namelist-input-group[data-group=\"".concat(groupName, "\"] div.namelist-input-variable[data-variable=\"").concat(variableName, "\"] ").concat(fieldTag, "[name=").concat(variableName, "]")).forEach(function (input) {
          inputFields.push(input);
        });
        return inputFields;
      }

      // get variable input field ID
    }, {
      key: "_getInputFieldId",
      value: function _getInputFieldId(variableName, index) {
        if (index !== null) {
          return "".concat(variableName, "_").concat(index);
        }
        return variableName;
      }

      // generate variable input field HTML
    }, {
      key: "_getInputFieldHtml",
      value: function _getInputFieldHtml(variableName, variable, value, readOnly, index) {
        if (value === undefined || value === null) {
          throw new Error("Variable ".concat(variableName, " value is not defined"));
        }
        var html = '';
        var fieldId = htmlEncode(this._getInputFieldId(variableName, index));
        var fieldName = htmlEncode(variableName);
        switch (variable.type) {
          case NamelistInputEditor.variableTypes.selection:
            html = html + "<select class=\"form-control\" id=\"".concat(fieldId, "\" name=\"").concat(fieldName, "\"").concat(readOnly ? " readonly" : "", " required>");
            for (var _i8 = 0, _Object$entries4 = Object.entries(variable['values']); _i8 < _Object$entries4.length; _i8++) {
              var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i8], 2),
                key = _Object$entries4$_i[0],
                _value = _Object$entries4$_i[1];
              html = html + "<option value=\"".concat(key, "\"");
              if (_value !== null && key.toString() === _value.toString()) {
                html = html + ' selected';
              }
              html = html + ">".concat(key, ": ").concat(_value, "</option>");
            }
            html = html + '<select/>';
            break;
          case NamelistInputEditor.variableTypes.logical:
            html = html + '<div class="input-group-prepend input-group-checkbox"><div class="input-group-text">';
            html = html + "<input class=\"\" type=\"checkbox\" id=\"".concat(fieldId, "\" name=\"").concat(fieldName, "\"");
            if (readOnly === true) {
              html = html + ' readonly';
            }
            if (value === true) {
              html = html + ' checked';
            }
            html = html + '/>';
            html = html + '</div></div>';
            break;
          case NamelistInputEditor.variableTypes.integer:
            html = html + "<input type=\"number\" class=\"form-control\" id=\"".concat(fieldId, "\" name=\"").concat(fieldName, "\"");
            html = html + " value=\"".concat(parseInt(value), "\"");
            if (readOnly === true) {
              html = html + ' readonly';
            }
            html = html + ' step="1" required/>';
            break;
          case NamelistInputEditor.variableTypes.real:
            html = html + "<input type=\"number\" class=\"form-control\" id=\"".concat(fieldId, "\" name=\"").concat(fieldName, "\"");
            html = html + " value=\"".concat(value.toFixed(this.options.floatDigits), "\"");
            if (readOnly === true) {
              html = html + ' readonly';
            }
            html = html + ' step="0.001" required/>';
            break;
          case NamelistInputEditor.variableTypes.character:
            html = html + "<input type=\"text\" class=\"form-control form-control-sm\" id=\"".concat(fieldId, "\" name=\"").concat(fieldName, "\"");
            if (value !== null) {
              html = html + " value=\"".concat(htmlEncode(value), "\"");
            }
            if (readOnly === true) {
              html = html + ' readonly';
            }
            html = html + ' required />';
            break;
          default:
            throw new Error("Unknown variable data type ".concat(variable.type));
        }
        return html;
      }

      // creates and appends a new child HTML element to parent element
    }, {
      key: "_append",
      value: function _append(parent, tagName) {
        var element = document.createElement(tagName);
        parent.append(element);
        return element;
      }
    }]);
  }();
  _defineProperty(NamelistInputEditor, "entries", {
    maxDom: "max_dom",
    single: "1",
    maxEta: "max_eta"
  });
  _defineProperty(NamelistInputEditor, "variableTypes", {
    integer: "integer",
    logical: "logical",
    real: "real",
    character: "character",
    selection: "selection"
  });
  _defineProperty(NamelistInputEditor, "_localStorageKey", '_wrf_domain_wizard_namelist_input');
  _defineProperty(NamelistInputEditor, "collpaseCommands", {
    hide: 'hide',
    show: 'show'
  });
  _defineProperty(NamelistInputEditor, "iconClass", {
    collapsed: 'fa-chevron-right',
    open: 'fa-chevron-down'
  });

  var NamelistInputDialog = /*#__PURE__*/function () {
    function NamelistInputDialog(options) {
      var _this = this;
      _classCallCheck(this, NamelistInputDialog);
      this.modal = document.getElementById('namelist-input-dialog');
      this.header = this.modal.querySelector('div.modal-header');
      this.body = this.modal.querySelector('div.modal-body');
      this.footer = this.modal.querySelector('div.modal-footer');
      this.editor = new NamelistInputEditor(this.body.querySelector('div#namelist-input-container'), Object.assign({
        change: function change(e) {
          _this._updateText();
        }
      }, options));
      this.text = this.body.querySelector('div#pane-namelist-input-text textarea');
      this.original = this.body.querySelector('div#pane-namelist-input-original textarea');
      this.footer.querySelector('#button-copy').addEventListener('click', function (e) {
        navigator.clipboard.writeText(_this.editor.toText());
      });
      this.footer.querySelector('#button-save').addEventListener('click', function (e) {
        var blob = new Blob([_this.editor.toText()], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "namelist.input", {
          autoBom: true
        });
      });
      this.tabErrors = document.getElementById('tab-namelist-input-errors').parentNode;
      this.tabOriginal = document.getElementById('tab-namelist-input-original').parentNode;

      // view commands
      this.footer.querySelector('#view-group-collapse-all').addEventListener('click', function (e) {
        _this.editor.collapseGroups();
      });
      this.footer.querySelector('#view-group-expand-all').addEventListener('click', function (e) {
        _this.editor.expandGroups();
      });
      this.footer.querySelector('#view-variables-show-unset').addEventListener('click', function (e) {
        _this.editor.showUnsetVariables();
      });
      this.footer.querySelector('#view-variables-hide-unset').addEventListener('click', function (e) {
        _this.editor.hideUnsetVariables();
      });
      this.footer.querySelector('#view-group-show-unset').addEventListener('click', function (e) {
        _this.editor.showUnsetGroups();
      });
      this.footer.querySelector('#view-group-hide-unset').addEventListener('click', function (e) {
        _this.editor.hideUnsetGroups();
      });
    }
    return _createClass(NamelistInputDialog, [{
      key: "openNamelistWpsAsync",
      value: function () {
        var _openNamelistWpsAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(namelistWps) {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                this._resetView();
                _context.next = 3;
                return this.editor.openNamelistWpsAsync(namelistWps);
              case 3:
                $(this.modal).modal('show');
                this._updateText();
              case 5:
              case "end":
                return _context.stop();
            }
          }, _callee, this);
        }));
        function openNamelistWpsAsync(_x) {
          return _openNamelistWpsAsync.apply(this, arguments);
        }
        return openNamelistWpsAsync;
      }()
    }, {
      key: "openNamelistInputAsync",
      value: function () {
        var _openNamelistInputAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
          var result;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                this._resetView();
                this.original.value = data;
                this.tabOriginal.style['display'] = null;
                _context2.next = 5;
                return this.editor.openNamelistInputAsync(data);
              case 5:
                result = _context2.sent;
                $(this.modal).modal('show');
                this._updateText();
                if (result.hasErrors) {
                  this._showErrors(result.errors);
                }
              case 9:
              case "end":
                return _context2.stop();
            }
          }, _callee2, this);
        }));
        function openNamelistInputAsync(_x2) {
          return _openNamelistInputAsync.apply(this, arguments);
        }
        return openNamelistInputAsync;
      }()
    }, {
      key: "_resetView",
      value: function _resetView() {
        this.tabErrors.style['display'] = 'none';
        this.tabOriginal.style['display'] = 'none';
        $('#tab-namelist-input-editor').tab('show');
      }
    }, {
      key: "_updateText",
      value: function _updateText() {
        this.text.value = this.editor.toText();
      }
    }, {
      key: "_showErrors",
      value: function _showErrors(errors) {
        this.tabErrors.style['display'] = null;
        this.tabErrors.querySelector('button').innerHTML = "<span class=\"mr-1\">Errors</span><span class=\"badge rounded-pill bg-danger text-white\">".concat(errors.length, "</span>");
        var list = document.getElementById('pane-namelist-input-errors').querySelector('ul');
        list.innerHTML = '';
        errors.forEach(function (error) {
          var li = document.createElement('li');
          li.classList.add('list-group-item');
          li.innerHTML = "<i class=\"fas fa-exclamation-circle text-danger\"></i><span class=\"ml-1\">".concat(error, "</span>");
          list.append(li);
        });
      }
    }]);
  }();

  var SidebarDomains = /*#__PURE__*/function () {
    function SidebarDomains(map, sidebar, options) {
      var _this = this;
      _classCallCheck(this, SidebarDomains);
      this.map = map;
      var self = this;
      var container, wpsNamelist, domain, wpsPanel, newDomainContext;
      var buttonNew, buttonSave, buttonOpen, buttonReset, inputFile, captureImageDialog;

      // defaul settings
      this.options = {
        jsonBaseUrl: 'json',
        sampleBaseUrl: 'samples',
        allowAnyFilename: true,
        autoImageView: false
      };
      if (options) {
        this.options = Object.assign({}, this.options, options);
      }
      container = $('#domains', sidebar.getContainer());
      wpsPanel = new SidebarDomainsPanel($('#container-wps-form', container), this.options);
      buttonNew = $('button#button-wps-new', container);
      buttonSave = $('button#button-wps-save', container);
      buttonReset = $('button#reset-domain', container);
      buttonOpen = $('button#button-wps-open', container);
      var buttonSavePng = $('button#save-png', container);
      inputFile = $('input#file-open', container);
      captureImageDialog = $('#capture-image-dialog');

      // creates new WPS namelist object from existing data and
      // draws domains
      function createDomainFromNamelist(zoom) {
        removeDomain();
        domain = new WRFDomain(wpsNamelist);
        domain.addTo(map);
        wpsPanel.show(domain);
        domain.grid.select();
        if (zoom) {
          zoomToDomain();
        }
      }
      function getMapPadding() {
        var mapContainer = map.getContainer();
        return L.point(mapContainer.offsetWidth * 0.01, mapContainer.offsetHeight * 0.01);
      }
      function zoomToDomain() {
        var padding = getMapPadding();
        map.fitBounds(domain.grid.getBounds(), {
          paddingTopLeft: L.point(container.width() + container.offset().left, padding.x),
          paddingBottomRight: L.point(padding.x, padding.y)
        });
      }
      buttonReset.on('click', function (e) {
        createDomainFromNamelist(false);
      });
      buttonOpen.on('click', function (e) {
        endNewDomain();
        inputFile.click();
      });
      var wpsSaveDialog = new WPSSaveDialog();
      buttonSave.on('click', function (e) {
        wpsSaveDialog.show(domain);
      });
      inputFile.on('change', function (e) {
        var reader, filename;
        if (!e.target.files || e.target.files.length == 0) {
          return;
        }
        if (_this.options.allowAnyFilename !== true && e.target.files[0].name != 'namelist.wps' && e.target.files[0].name != 'wrfsi.nl') {
          errorMessageBox('File Open Error', 'Only files with the name "namelist.wps" or "wrfsi.nl" can be opened!');
          return;
        }
        reader = new FileReader();
        filename = e.target.files[0].name;
        reader.onerror = function (e) {
          errorMessageBox('File Open Error', 'Unable to read file!');
        };
        reader.onload = function (e) {
          if (filename == 'wrfsi.nl') {
            wpsNamelist = WPSNamelist.converFromWRFSIString(e.target.result);
          } else {
            wpsNamelist = new WPSNamelist(e.target.result);
          }
          createDomainFromNamelist(true);
        };
        reader.readAsText(e.target.files[0]);
        inputFile.val(null);
      });
      buttonSavePng.on('click', function (e) {
        if (domain === null) {
          return;
        }
        captureImageDialog.modal('show');
        var div = map.getContainer();
        var mapCenter = map.getCenter();
        var mapZoom = map.getZoom();

        // hide map controls
        var mapControls = div.getElementsByClassName('leaflet-control');
        var visibleControls = [];
        for (var i = 0; i < mapControls.length; i++) {
          if (mapControls[i].hidden === false) {
            visibleControls.push(mapControls[i]);
            mapControls[i].hidden = true;
          }
        }
        if (_this.options.autoImageView === true) {
          map.fitBounds(domain.grid.getBounds(), {
            padding: getMapPadding()
          });
        }
        htmlToImage.toBlob(div).then(function (blob) {
          FileSaver_minExports.saveAs(blob, "domains.png");
        }).catch(function (error) {
          errorMessageBox('Create Image', 'Error creating an image');
        }).finally(function () {
          visibleControls.forEach(function (x) {
            return x.hidden = false;
          });
          if (_this.options.autoImageView === true) {
            map.setView(mapCenter, mapZoom);
          }
          captureImageDialog.modal('hide');
        });
      });
      var buttonNamelistInput = container[0].querySelector('button#button-namelist-input');
      var dialogNamelistInput = new NamelistInputDialog({
        jsonBaseUrl: this.options.jsonBaseUrl
      });
      buttonNamelistInput.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return dialogNamelistInput.openNamelistWpsAsync(domain.getWPSNamelist());
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })));
      function removeDomain() {
        if (domain) {
          domain.remove();
          domain = null;
          newDomainContext = null;
          if (self._geogridCornerMarkerGroups.length > 0) {
            self._geogridCornerMarkerGroups.forEach(function (group) {
              group.remove();
            });
          }
        }
      }

      // setup panel and map to start drawinf a new domain
      // called when user click New button
      function initNewDomain() {
        removeDomain();
        buttonNew.prop('disabled', true);
        map.on('mousedown', startNewDomain, this);
        wpsPanel.showNewDomain();
      }

      // called when user starts drag operation to draw a new domain
      function startNewDomain(e) {
        if (!wpsPanel.validateNewDomain()) {
          return;
        }
        map.dragging.disable();
        map.on('mousemove', drawNewDomain, this);
        map.on('mouseup', endNewDomain, this);
        map.on('mouseout', endNewDomain, this);
        newDomainContext = {
          startLatlng: e.latlng,
          startMarker: L.marker(e.latlng, {
            icon: L.divIcon({
              className: 'grid-corner-icon'
            })
          }).addTo(map),
          endMarker: L.marker(e.latlng, {
            icon: L.divIcon({
              className: 'grid-corner-icon'
            })
          }).addTo(map),
          drawPolygon: null,
          domainOnMap: false
        };
        domain = wpsPanel.createNewDomain();
      }
      function drawNewDomain(e) {
        var bounds = L.latLngBounds(newDomainContext.startLatlng, e.latlng),
          center,
          e_we,
          e_sn;
        if (newDomainContext.drawPolygon == null) {
          newDomainContext.drawPolygon = L.polygon([bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()], {
            stroke: true,
            color: '#3388ff',
            weight: 1,
            opacity: 1.0,
            dashArray: '3',
            fill: false
          }).addTo(map);
        } else {
          newDomainContext.drawPolygon.setLatLngs([bounds.getSouthWest(), bounds.getSouthEast(), bounds.getNorthEast(), bounds.getNorthWest()]);
        }
        newDomainContext.endMarker.setLatLng(e.latlng);
        center = bounds.getCenter();
        domain.setDefaultValues(center.lat, center.lng);
        e_we = Math.round(map.distance(newDomainContext.startLatlng, [newDomainContext.startLatlng.lat, e.latlng.lng]) / domain.dxInMeters);
        e_sn = Math.round(map.distance(newDomainContext.startLatlng, [e.latlng.lat, newDomainContext.startLatlng.lng]) / domain.dyInMeters);
        if (e_we < WRFDomainGrid.minGridSize || e_sn < WRFDomainGrid.minGridSize) {
          domain.remove();
          wpsPanel.hide();
          newDomainContext.domainOnMap = false;
        } else {
          domain.grid.e_we = e_we;
          domain.grid.e_sn = e_sn;
          if (newDomainContext.domainOnMap) {
            domain.update();
          } else {
            domain.addTo(map);
            newDomainContext.domainOnMap = true;
            wpsPanel.show();
          }
        }
      }
      function endNewDomain(e) {
        map.dragging.enable();
        map.off('mousedown', startNewDomain, this);
        map.off('mousemove', drawNewDomain, this);
        map.off('mouseup', endNewDomain, this);
        map.off('mouseout', endNewDomain, this);
        buttonNew.prop('disabled', false);
        if (!newDomainContext) {
          wpsPanel.hide();
          return;
        }
        if (newDomainContext.drawPolygon != null) {
          newDomainContext.drawPolygon.remove();
        }
        newDomainContext.startMarker.remove();
        newDomainContext.endMarker.remove();
        if (newDomainContext.domainOnMap) {
          wpsNamelist = domain.getWPSNamelist();
        } else {
          wpsNamelist = null;
          domain = null;
        }
      }
      buttonNew.on('click', function (e) {
        initNewDomain();
      });

      // a list of leaflet feature groups containing markers for sample geogrid outpput files
      this._geogridCornerMarkerGroups = [];
      if (location.hash) {
        var sample = location.hash.substring(1),
          wpsNamelistUrl = "".concat(this.options.sampleBaseUrl, "/").concat(sample, "/namelist.wps");
        $.get(wpsNamelistUrl, function (data) {
          wpsNamelist = new WPSNamelist(data);
          sidebar.open('domains');
          createDomainFromNamelist(true);
          _this._addGeogridCorners(sample);
        }, 'text').fail(function () {
          errorMessageBox("File Load Error", "Unable to load " + wpsNamelistUrl);
        });
      }
    }
    return _createClass(SidebarDomains, [{
      key: "_addGeogridCorners",
      value: function _addGeogridCorners(sample) {
        this._addGeogridGridCorners(sample, 1);
      }
    }, {
      key: "_addGeogridGridCorners",
      value: function _addGeogridGridCorners(sample, grid) {
        var _this2 = this;
        var url = "".concat(this.options.sampleBaseUrl, "/").concat(sample, "/geo_em.d").concat(grid.toString().padStart(2, '0'), ".nc.json");
        var jsonFound = false;
        fetch(url).then(function (response) {
          if (response.ok === true) {
            return response.json();
          }
          throw new Error("Geogrid JSON file ".concat(url, " not found"));
        }).then(function (json) {
          jsonFound = true;
          var group = L.featureGroup([_this2._createGeogridCornerMarker(json, 'sw'), _this2._createGeogridCornerMarker(json, 'nw'), _this2._createGeogridCornerMarker(json, 'ne'), _this2._createGeogridCornerMarker(json, 'se')]);
          group.addTo(_this2.map);
          _this2._geogridCornerMarkerGroups.push(group);
        }).then(function () {
          _this2._addGeogridGridCorners(sample, grid + 1);
        }).catch(function (error) {
          if (jsonFound === true) {
            console.error(error);
          } else {
            console.debug(error);
          }
        });
        return jsonFound;
      }
    }, {
      key: "_createGeogridCornerMarker",
      value: function _createGeogridCornerMarker(json, location) {
        return L.marker(L.latLng(json.corner_lats[geogridOutput.cornerIndex.unstaggered[location]], json.corner_lons[geogridOutput.cornerIndex.unstaggered[location]]), {
          icon: L.divIcon({
            className: 'geogrid-corner-icon',
            iconSize: 8
          }),
          zIndexOffset: 100
        });
      }
    }]);
  }();
  function sidebarWPS(map, sidebar, options) {
    return new SidebarDomains(map, sidebar, options);
  }

  var PersistentLayers = L.Control.Layers.extend({
    _localStorageKey: '_leaflet_persistent_layers',
    _layers: null,
    _currentBaseLayer: null,
    _overlays: null,
    _map: null,
    getCurrentLayer: function getCurrentLayer() {
      if (this._currentBaseLayer) {
        return this._currentBaseLayer;
      }
      if (!this._layers) {
        return null;
      }
      var key = localStorage.getItem(this._localStorageKey + '_layer');
      if (key) {
        this._currentBaseLayer = this._layers[key];
      }
      if (!this._currentBaseLayer) {
        this._currentBaseLayer = this._getDefaultLayer();
      }
      return this._currentBaseLayer;
    },
    _getDefaultLayer: function _getDefaultLayer() {
      var key;
      for (key in this._layers) {
        if (this._layers.hasOwnProperty(key)) {
          return this._layers[key];
        }
      }
      return null;
    },
    _configZoom: function _configZoom() {
      if (!this._currentBaseLayer) {
        return;
      }
      var currentZoom = this._map.getZoom(),
        minZoom = this._currentBaseLayer.options.minZoom || 1,
        maxZoom = this._currentBaseLayer.options.maxZoom || 13;
      this._map.setMinZoom(minZoom);
      this._map.setMaxZoom(maxZoom);
      if (currentZoom < minZoom) {
        this._map.setZoom(minZoom);
      } else if (currentZoom > maxZoom) {
        this._map.setZoom(maxZoom);
      }
    },
    onAdd: function onAdd(map) {
      // remember selected tile provider
      var self = this;
      this._map = map;
      map.on('baselayerchange', function (e) {
        localStorage.setItem(self._localStorageKey + '_layer', e.name);
        self._currentBaseLayer = self._layers[e.name];
        self._configZoom();
      });
      this._configZoom();
      return L.Control.Layers.prototype.onAdd.call(this, map);
    },
    onRemove: function onRemove(map) {
      map.off('baselayerchange');
    },
    initialize: function initialize(layers, overlays, options) {
      this._layers = layers;
      this._overlays = overlays;
      this._currentBaseLayer = this.getCurrentLayer();
      L.Control.Layers.prototype.initialize.call(this, layers, overlays, options);
    }
  });
  function persistentLayers(layers, overlays, options) {
    return new PersistentLayers(layers, overlays, options);
  }

  var ElevationData = L.GeoJSON.extend({
    getFeatureFilename: function getFeatureFilename(feature) {
      return feature.properties.filename;
    },
    getDownloadUrl: function getDownloadUrl(feature, filename) {
      return filename;
    },
    data: null,
    _downloadedLayers: null,
    clearDownloaded: function clearDownloaded() {
      if (this._downloadedLayers != null) {
        $.each(this._downloadedLayers, function () {
          this.feature.downloaded = false;
          this.setStyle({
            'fillColor': null,
            'fillOpacity': ElevationData.FillOpacity
          });
        });
        this._downloadedLayers = null;
      }
    },
    onAdd: function onAdd(map) {
      if (map.spin == undefined) {
        this.addData(this.data);
      } else {
        map.spin(true);
        setTimeout(function (self, map) {
          return function () {
            self.addData(self.data);
            map.spin(false);
          };
        }(this, map), 1);
      }
    },
    onRemove: function onRemove(map) {
      this.clearLayers(this.data);
    },
    initialize: function initialize(jsonUrl, color) {
      var self = this;
      if (color == undefined) {
        if (ElevationData.CurrentColor >= ElevationData.Colors.length) {
          ElevationData.CurrentColor = 0;
        }
        color = ElevationData.Colors[ElevationData.CurrentColor];
        ElevationData.CurrentColor++;
      }
      L.setOptions(this, {
        'style': {
          'weight': ElevationData.Weight,
          'fillOpacity': ElevationData.FillOpacity,
          'color': color
        },
        'onEachFeature': function onEachFeature(feature, layer) {
          var popupContent, filename, downloadUrl;
          //feature.downloaded = false;

          layer.on('mouseover', function (e) {
            if (feature.downloaded) {
              layer.setStyle({
                'weight': ElevationData.Weight * 3
              });
            } else {
              layer.setStyle({
                'weight': ElevationData.Weight * 3,
                'fillOpacity': ElevationData.FillOpacity * 3
              });
            }
          });
          layer.on('mouseout', function (e) {
            if (feature.downloaded) {
              layer.setStyle({
                weight: ElevationData.Weight
              });
            } else {
              layer.setStyle({
                weight: ElevationData.Weight,
                fillOpacity: ElevationData.FillOpacity
              });
            }
          });
          if (feature.downloaded) {
            layer.setStyle({
              'fillColor': ElevationData.ColorDownloaded,
              'fillOpacity': ElevationData.FillOpacity * 3
            });
          }
          filename = self.getFeatureFilename(feature);
          if (filename) {
            downloadUrl = self.getDownloadUrl(feature, filename);
            layer.bindTooltip(filename, {
              'sticky': true,
              'className': 'tooltip-srtm'
            });
            popupContent = '<div class="popup-elevation-data"><table>';
            if (self.options['attribution'] != undefined) {
              popupContent += '<tr><td>Source:</td><td>' + self.options['attribution'] + '</td></tr>';
            }
            if (self.registrationUrl !== undefined) {
              popupContent += '<tr><td>Registration:</td><td><i class="fas fa-shield-alt text-danger"></i> <a href="' + self.registrationUrl + '" target="_blank">' + self.registrationUrl + '</a></td></tr>';
            }
            popupContent += '<tr><td>Filename:</td><td>' + filename + '</td></tr>';
            popupContent += '</table>' + '<a class="btn btn-outline-secondary btn-sm" role="button" href="' + downloadUrl + '" target="_blank">Download</a>' + '</div>';
            layer.bindPopup(popupContent);
            layer.on('popupopen', function (e) {
              $('div.popup-elevation-data a', e.popup.getElement()).on('click', {
                popup: e.popup,
                layer: e.sourceTarget,
                downloadUrl: downloadUrl,
                feature: feature
              }, function (e) {
                e.data.feature.downloaded = true;
                e.data.layer.setStyle({
                  'fillColor': ElevationData.ColorDownloaded,
                  'fillOpacity': ElevationData.FillOpacity * 3
                });
                if (self._downloadedLayers == null) {
                  self._downloadedLayers = [];
                }
                e.data.layer.feature = e.data.feature;
                self._downloadedLayers.push(e.data.layer);
                e.data.layer.closePopup();
                e.data.layer.fire('elevationDataDownload', {
                  downloadUrl: downloadUrl,
                  filename: filename,
                  feature: e.data.feature,
                  layer: e.data.layer,
                  source: self
                }, true);
              });
            });
          }
        }
      });
      L.GeoJSON.prototype.initialize.call(this, null, this.options);
      $.getJSON(jsonUrl, function (data) {
        self.data = data;
      });
    }
  });
  ElevationData.Colors = ['#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628'];
  ElevationData.ColorDownloaded = '#e41a1c';
  ElevationData.CurrentColor = 0;
  ElevationData.Weight = 1;
  ElevationData.FillOpacity = 0.1;

  var ElevationDataALOS = ElevationData.extend({
    attribution: 'Provided by Japan Aerospace Exploration Agency (JAXA), product <a href="https://www.eorc.jaxa.jp/ALOS/en/aw3d30/" target="_blank">aw3d30</a>.',
    downloadBaseUrl: "ftp://ftp.eorc.jaxa.jp/",
    registrationUrl: 'https://www.eorc.jaxa.jp/ALOS/en/aw3d30/registration.htm',
    getFeatureFilename: function getFeatureFilename(feature) {
      return feature.properties.filename;
    },
    getDownloadUrl: function getDownloadUrl(feature, filename) {
      return this.downloadBaseUrl + feature.properties.path + '/' + filename;
    },
    initialize: function initialize(jsonUrl, color) {
      L.setOptions(this, {
        'attribution': this.attribution
      });
      ElevationData.prototype.initialize.call(this, jsonUrl, color);
    }
  });
  function elevationDataALOS(jsonUrl, color) {
    return new ElevationDataALOS(jsonUrl, color);
  }

  var ElevationDataSRTMCSI = ElevationData.extend({
    attribution: 'Jarvis A., H.I. Reuter, A. Nelson, E. Guevara, 2008, Hole-filled seamless SRTM data V4, International Centre for Tropical Agriculture (CIAT), available from <a href="http://srtm.csi.cgiar.org" target="_blank">http://srtm.csi.cgiar.org</a>.',
    downloadBaseUrl: "http://srtm.csi.cgiar.org/wp-content/uploads/files/",
    downloadFolderByTileSize: {
      '5': 'srtm_5x5',
      '30': 'srtm_30x30'
    },
    downloadFolderByType: {
      'TIFF': "TIFF",
      'ASCII': "ASCII"
    },
    getFeatureFilename: function getFeatureFilename(feature) {
      if (feature.properties.SUFF_NAME && feature.properties.SUFF_NAME[0] == '_') {
        return feature.properties.SUFF_NAME.substring(1);
      }
      return feature.properties.SUFF_NAME;
    },
    getDownloadUrl: function getDownloadUrl(feature, filename) {
      return this.downloadBaseUrl + filename;
    },
    initialize: function initialize(jsonUrl, type, tileSize, color) {
      type = type.toUpperCase().trim();
      if (this.downloadFolderByTileSize[tileSize]) {
        this.downloadBaseUrl += this.downloadFolderByTileSize[tileSize] + '/';
      } else {
        throw "Invalid SRTM-CSI tile size";
      }
      if (this.downloadFolderByType[type]) {
        this.downloadBaseUrl += this.downloadFolderByType[type] + '/';
      } else {
        throw "Invalid SRTM-CSI type";
      }
      L.setOptions(this, {
        'attribution': this.attribution
      });
      ElevationData.prototype.initialize.call(this, jsonUrl, color);
    }
  });
  function elevationDataSRTMCSI(jsonUrl, type, tileSize, color) {
    return new ElevationDataSRTMCSI(jsonUrl, type, tileSize, color);
  }

  var ElevationDataSRTMNASAV3 = ElevationData.extend({
    downloadBaseUrl: 'https://e4ftl01.cr.usgs.gov/MEASURES/',
    registrationUrl: 'https://urs.earthdata.nasa.gov/',
    getDownloadUrl: function getDownloadUrl(feature, filename) {
      return this.downloadBaseUrl + filename;
    },
    initialize: function initialize(jsonUrl, dim, color) {
      var folderName;
      switch (dim) {
        case 1:
          folderName = 'SRTMGL1.003';
          L.setOptions(this, {
            'attribution': 'NASA JPL.NASA Shuttle Radar Topography Mission Global 1 arc second. 2013, distributed by NASA EOSDIS Land Processes DAAC, <a href="https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL1.003" target="_blank">https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL1.003</a>.'
          });
          break;
        case 3:
          folderName = 'SRTMGL3.003';
          L.setOptions(this, {
            'attribution': 'NASA JPL.NASA Shuttle Radar Topography Mission Global 3 arc second. 2013, distributed by NASA EOSDIS Land Processes DAAC, <a href="https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL3.003" target="_blank">https://doi.org/10.5067/MEaSUREs/SRTM/SRTMGL3.003</a>.'
          });
          break;
        default:
          throw "Invalid arc second dimension. Allowed values are 1 and 3";
      }
      this.downloadBaseUrl = this.downloadBaseUrl + folderName + '/2000.02.11/';
      ElevationData.prototype.initialize.call(this, jsonUrl, color);
    }
  });
  function elevationDataSRTMNASAV3(jsonUrl, dim, color) {
    return new ElevationDataSRTMNASAV3(jsonUrl, dim, color);
  }

  var MouseCoordinates = L.Control.extend({
    options: {
      position: 'bottomleft',
      precision: 4,
      contextMenu: false
    },
    initialize: function initialize(options) {
      L.Control.prototype.initialize.call(this, options);
    },
    onAdd: function onAdd(map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-touch leaflet-control leaflet-control-coordinates');
      this.latElement = L.DomUtil.create('div', null, container);
      this.lngElement = L.DomUtil.create('div', null, container);
      var self = this;
      map.on('mousemove', function (event) {
        self.setCoordinates(event.latlng);
      });
      if (this.options.contextMenu === true) {
        map.on('contextmenu', function (event) {
          if (self.popup && self.popup.isOpen()) {
            self.popup.remove();
          }
          self.popup = L.popup().setLatLng(event.latlng).setContent("lat/lon: " + event.latlng.lat.toFixed(self.options.precision) + ', ' + event.latlng.lng.toFixed(self.options.precision)).openOn(map);
        });
      }
      self.setCoordinates(map.getCenter());
      return container;
    },
    _addText: function _addText(container, context) {
      return container;
    },
    setCoordinates: function setCoordinates(latlng) {
      L.DomUtil.get(this.latElement).innerHTML = '<span>lat: </span>' + latlng.lat.toFixed(this.options.precision);
      L.DomUtil.get(this.lngElement).innerHTML = '<span>lon: </span>' + latlng.lng.toFixed(this.options.precision);
    }
  });

  //constructor registration
  function mouseCoordinates(options) {
    return new MouseCoordinates(options);
  }

  /**
   * @constructor
   */
  var DomainWizard = /*#__PURE__*/_createClass(function DomainWizard(options) {
    _classCallCheck(this, DomainWizard);
    // default options
    var defaults = {
      div: null,
      jsonBaseUrl: 'json'
    };

    // current settings
    var settings = Object.assign({}, defaults, options);
    if (!settings['div'] || !settings['div'].length || settings['div'].length != 1) {
      throw "invalid div option";
    }
    var tileLayerOptions = {
      noWrap: true,
      bounds: L.latLngBounds([-90, -180], [90, 180])
    };

    // create a list of base layer tile providers
    var persistentLayersControl = persistentLayers({
      "Esri World Topo": L.tileLayer.provider('Esri.WorldTopoMap', tileLayerOptions),
      "Esri World Street": L.tileLayer.provider('Esri.WorldStreetMap', tileLayerOptions),
      "Esri NatGeo": L.tileLayer.provider('Esri.NatGeoWorldMap', tileLayerOptions),
      "Esri World Imagery": L.tileLayer.provider('Esri.WorldImagery', tileLayerOptions),
      "Open Topo Map": L.tileLayer.provider('OpenTopoMap', tileLayerOptions),
      "Open Street Map": L.tileLayer.provider('OpenStreetMap', tileLayerOptions)
    }, null, {
      position: 'topright'
    });

    // initialize map object
    var map = L.map(settings['div'][0], {
      layers: [persistentLayersControl.getCurrentLayer()],
      center: [0, 0],
      zoomControl: false,
      zoom: Math.max(persistentLayersControl.getCurrentLayer().options.minZoom, 3)
    });

    // add layers control to map
    persistentLayersControl.addTo(map);

    // create sidebar control
    var sidebar = L.control.sidebar({
      autopan: false,
      closeButton: false,
      container: 'sidebar',
      position: 'left',
      open: true
    }).addTo(map);
    var sidebarTabs = $('ul[role="tablist"] li', sidebar.getContainer());

    // activate tooltips on tab icons
    sidebarTabs.tooltip();
    sidebar.on('content', function (e) {
      // close tooltips manually because when a tab panel is opened 
      // any displayed tooltip remains opened
      sidebarTabs.tooltip('hide');
    });

    // initialize sidebar pane controls
    sidebar['domains'] = sidebarWPS(map, sidebar, {
      jsonBaseUrl: settings.jsonBaseUrl,
      sampleBaseUrl: settings.sampleBaseUrl
    });
    sidebar['settings'] = sidebarSettings(map, sidebar, {
      jsonBaseUrl: settings.jsonBaseUrl
    });
    sidebar['waypoints'] = sidebarWaypoints(map, sidebar);
    sidebar['elevation'] = sidebarElevationData(map, sidebar);
    sidebar['elevation'].addElevationDataOverlay('SRTM-CSI 90m (5x5,TIFF)', elevationDataSRTMCSI("".concat(settings.jsonBaseUrl, "/srtm/csi/srtm30_5x5.json"), 'TIFF', 5));
    sidebar['elevation'].addElevationDataOverlay('SRTM-CSI 90m (30x30,TIFF)', elevationDataSRTMCSI("".concat(settings.jsonBaseUrl, "/srtm/csi/srtm30_30x30.json"), 'TIFF', 30));
    sidebar['elevation'].addElevationDataOverlay('SRTM NASA v3, 1 arc second (~30m)', elevationDataSRTMNASAV3("".concat(settings.jsonBaseUrl, "/srtm/nasa/SRTMGL1.003.json"), 1));
    sidebar['elevation'].addElevationDataOverlay('SRTM NASA v3, 3 arc second (~90m)', elevationDataSRTMNASAV3("".concat(settings.jsonBaseUrl, "/srtm/nasa/SRTMGL3.003.json"), 3));
    sidebar['elevation'].addElevationDataOverlay('ALOS World 3D - 30m (AW3D30)', elevationDataALOS("".concat(settings.jsonBaseUrl, "/srtm/alos/AW3D30.json")));

    // open default tab
    sidebar.open('domains');

    //add zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(map);
    L.control.scale({
      maxWidth: 240,
      metric: true,
      imperial: true,
      position: 'bottomright'
    }).addTo(map);
    mouseCoordinates({
      position: 'bottomright'
    }).addTo(map);
    L.DomUtil.addClass(map._container, 'cursor-crosshair');
  });

  var NamelistInputPage = /*#__PURE__*/function () {
    function NamelistInputPage(options) {
      var _this = this;
      _classCallCheck(this, NamelistInputPage);
      this.loader = document.getElementById('page-loader');
      this.dialog = new NamelistInputDialog(options);
      this.githubExampleList = document.getElementById('github-examples');
      this.buttonOpen = document.getElementById('button-open');
      this.buttonOpen.addEventListener('click', function (e) {
        _this.inputFile.value = null;
        _this.inputFile.click();
      });
      this.inputFile = document.getElementById('file-open');
      this.inputFile.addEventListener('change', function (e) {
        if (!e.target.files || e.target.files.length == 0) {
          return;
        }
        var reader = new FileReader();
        reader.onload = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return _this.dialog.openNamelistInputAsync(e.target.result);
                case 3:
                  _context.next = 8;
                  break;
                case 5:
                  _context.prev = 5;
                  _context.t0 = _context["catch"](0);
                  errorMessageBox("Error", "Error opening namelist.input file '".concat(e.target.files[0], "'."));
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[0, 5]]);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }();
        reader.readAsText(e.target.files[0]);
        _this.inputFile.value = null;
      });
    }
    return _createClass(NamelistInputPage, [{
      key: "loadGitHubExamplesAsync",
      value: function () {
        var _loadGitHubExamplesAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
          var _location$hash,
            _this2 = this;
          var url, response, gitTree, row, _iterator, _step, item, button, file, _button;
          return _regeneratorRuntime().wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                this.loader.style['display'] = 'block';
                this.githubExampleList.style['display'] = 'none';
                this.githubExampleList.querySelectorAll('button').forEach(function (button) {
                  return button.remove();
                });
                url = "https://api.github.com/repos/wrf-model/WRF/git/trees/master?recursive=1";
                _context3.next = 6;
                return fetch(url);
              case 6:
                response = _context3.sent;
                _context3.next = 9;
                return response.json();
              case 9:
                gitTree = _context3.sent;
                row = 0;
                _iterator = _createForOfIteratorHelper(gitTree["tree"]);
                _context3.prev = 12;
                _iterator.s();
              case 14:
                if ((_step = _iterator.n()).done) {
                  _context3.next = 32;
                  break;
                }
                item = _step.value;
                if (!(item["type"] === undefined || item["path"] === undefined || item["type"].toLowerCase() !== "blob" || !item["path"].toLowerCase().startsWith('test/em_real/namelist.input'))) {
                  _context3.next = 18;
                  break;
                }
                return _context3.abrupt("continue", 30);
              case 18:
                button = document.createElement('button');
                this.githubExampleList.append(button);
                button.type = "button";
                button.dataset['path'] = item['path'];
                button.dataset['file'] = item['path'].substring(item['path'].lastIndexOf('/') + 1).toLowerCase();
                button.dataset['url'] = item['url'];
                button.innerText = item['path'];
                button.classList.add("list-group-item");
                button.classList.add("list-group-item-action");
                if (row % 2 == 0) ; else {
                  button.classList.add('list-group-item-secondary');
                }
                row += 1;
                button.addEventListener('click', /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
                    var _e$currentTarget;
                    var button, content, _url, _response, blob;
                    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                      while (1) switch (_context2.prev = _context2.next) {
                        case 0:
                          button = (_e$currentTarget = e.currentTarget) !== null && _e$currentTarget !== void 0 ? _e$currentTarget : e.target;
                          content = button.dataset['content'];
                          if (!(content === undefined)) {
                            _context2.next = 12;
                            break;
                          }
                          _url = button.dataset['url'];
                          _context2.next = 6;
                          return fetch(_url);
                        case 6:
                          _response = _context2.sent;
                          _context2.next = 9;
                          return _response.json();
                        case 9:
                          blob = _context2.sent;
                          content = blob['content'];
                          button.dataset['content'] = content;
                        case 12:
                          _context2.prev = 12;
                          _context2.next = 15;
                          return _this2.dialog.openNamelistInputAsync(atob(content));
                        case 15:
                          _context2.next = 21;
                          break;
                        case 17:
                          _context2.prev = 17;
                          _context2.t0 = _context2["catch"](12);
                          console.error(_context2.t0);
                          errorMessageBox("Error", "Error opening example namelist.input file '".concat(button.dataset['path'], "'."));
                        case 21:
                        case "end":
                          return _context2.stop();
                      }
                    }, _callee2, null, [[12, 17]]);
                  }));
                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              case 30:
                _context3.next = 14;
                break;
              case 32:
                _context3.next = 37;
                break;
              case 34:
                _context3.prev = 34;
                _context3.t0 = _context3["catch"](12);
                _iterator.e(_context3.t0);
              case 37:
                _context3.prev = 37;
                _iterator.f();
                return _context3.finish(37);
              case 40:
                this.githubExampleList.style['display'] = 'block';
                this.loader.style['display'] = 'none';
                file = (_location$hash = location.hash) === null || _location$hash === void 0 ? void 0 : _location$hash.toLowerCase();
                if (file && file.startsWith("#namelist.")) {
                  _button = this.githubExampleList.querySelector("button[data-file=\"".concat(file.substring(1), "\"]"));
                  _button === null || _button === void 0 || _button.click();
                }
              case 44:
              case "end":
                return _context3.stop();
            }
          }, _callee3, this, [[12, 34, 37, 40]]);
        }));
        function loadGitHubExamplesAsync() {
          return _loadGitHubExamplesAsync.apply(this, arguments);
        }
        return loadGitHubExamplesAsync;
      }()
    }]);
  }();

  exports.DomainWizard = DomainWizard;
  exports.NamelistInputPage = NamelistInputPage;
  exports.enableGlobalErrorHandler = enableGlobalErrorHandler;
  exports.errorMessageBox = errorMessageBox;

}));
//# sourceMappingURL=wrf-domain-wizard.js.map
