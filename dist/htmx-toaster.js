"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var ToasterComponent = /*#__PURE__*/function (_HTMLElement) {
  function ToasterComponent() {
    var _this;
    _classCallCheck(this, ToasterComponent);
    _this = _callSuper(this, ToasterComponent);
    _this.attachShadow({
      mode: "open"
    });
    _this.toasts = [];
    _this.touchStartX = 0;
    _this.touchEndX = 0;
    _this.currentToast = null;
    _this.isDragging = false;
    _this.dragThreshold = 10;
    _this.initializeEventListener();
    _this.initializeContainer();
    return _this;
  }
  _inherits(ToasterComponent, _HTMLElement);
  return _createClass(ToasterComponent, [{
    key: "initializeContainer",
    value: function initializeContainer() {
      var container = document.createElement("div");
      container.classList.add("toaster");
      this.shadowRoot.appendChild(container);
    }
  }, {
    key: "generateTheme",
    value: function generateTheme() {
      var _document$querySelect;
      var colors = ((_document$querySelect = document.querySelector("script[data-htmxt-colors]")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute("data-htmxt-colors")) || null;
      if (!colors) return;
      var colorArray = colors.split(";");
      var defaults = ["#f2f2f2", "#000", "#00a96f", "#00b3f0", "#ff6f70"];
      var _colorArray$map = colorArray.map(function (color, index) {
          return color || defaults[index];
        }),
        _colorArray$map2 = _slicedToArray(_colorArray$map, 5),
        bg = _colorArray$map2[0],
        txt = _colorArray$map2[1],
        sc = _colorArray$map2[2],
        inf = _colorArray$map2[3],
        err = _colorArray$map2[4];
      return ".toaster {--bg:".concat(bg, ";--txt:").concat(txt, ";--sc:").concat(sc, ";--in:").concat(inf, ";--er:").concat(err, ";}");
    }
  }, {
    key: "initializeEventListener",
    value: function initializeEventListener() {
      var _this2 = this;
      document.body.addEventListener("htmx:afterRequest", function (event) {
        var body = event.detail.xhr.getResponseHeader("HXToaster-Body");
        var type = event.detail.xhr.getResponseHeader("HXToaster-Type") || "default";
        if (body) {
          _this2.addToast({
            body: body,
            type: type
          });
        }
      });
    }
  }, {
    key: "addToast",
    value: function addToast(_ref) {
      var body = _ref.body,
        type = _ref.type;
      var id = Math.random().toString(36).substr(2, 9);
      if (this.toasts.length == 3) {
        console.log("removing toast", this.toasts[this.toasts.length - 1].id, this.toasts.length);
        this.removeToast(this.toasts[this.toasts.length - 1].id);
      }
      this.toasts.unshift({
        id: id,
        body: body,
        type: type
      });
      this.renderToast(id);
    }
  }, {
    key: "removeToast",
    value: function removeToast(id) {
      var _this3 = this;
      var index = this.toasts.findIndex(function (toast) {
        return toast.id === id;
      });
      if (index == -1) return;
      this.toasts.splice(index, 1);
      var toastElement = this.shadowRoot.querySelector("#toast-".concat(id));
      if (toastElement) {
        toastElement.classList.add("fade-out");
        toastElement.addEventListener("animationend", function () {
          _this3.shadowRoot.querySelector(".toaster").removeChild(toastElement);
          console.log("Toast removed from DOM:", id);
        });
      }
    }
  }, {
    key: "closeButton",
    value: function closeButton(id) {
      return "<button class=\"close-btn\" style=\"padding:4px;transition:opacity 0.3s;position:absolute;top:2px;right:2px;\" type=\"button\" class=\"close\" onclick=\"document.querySelector('htmx-toaster-component').removeToast('".concat(id, "')\"> <svg width=\"15\" height=\"15\" viewBox=\"0 0 15 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"h-4 w-4\"><path d=\"M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z\" fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path></svg></button>");
    }
  }, {
    key: "renderToast",
    value: function renderToast(id) {
      var _this4 = this;
      var _this$toasts$find = this.toasts.find(function (toast) {
          return toast.id === id;
        }),
        body = _this$toasts$find.body,
        type = _this$toasts$find.type;
      var toastElement = document.createElement("div");
      toastElement.id = "toast-".concat(id);
      toastElement.className = "toast ".concat(type);
      toastElement.innerHTML = "\n        <p>".concat(body, "</p>\n        ").concat(this.closeButton(id), "\n      ");
      this.shadowRoot.querySelector(".toaster").appendChild(toastElement);
      toastElement.addEventListener("touchstart", function (event) {
        return _this4.handleTouchStart(event, toastElement);
      }, {
        passive: true
      });
      toastElement.addEventListener("touchmove", function (event) {
        return _this4.handleTouchMove(event);
      }, {
        passive: true
      });
      toastElement.addEventListener("touchend", function (event) {
        return _this4.handleTouchEnd(event, id);
      }, {
        passive: true
      });
      setTimeout(function () {
        return _this4.removeToast(id);
      }, 5000000); // Auto-remove after 5 seconds
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var style = document.createElement("style");
      style.textContent = "\n     ".concat(this.generateTheme(), "\n        .toaster * { margin: 0; text-decoration: none; box-sizing: border-box; font-family: ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;}\n        .toaster {display: flex;flex-direction: column;align-items: flex-end;gap: 10px;position: fixed;z-index: 2147483647;inset: 2rem;user-select: none;pointer-events: none;}\n        .toast a { color: inherit; }\n        .toast {position: relative;width: 100%;align-items: start;padding: 12px;padding-right: 16px;background-color: #fff;backdrop-filter: blur(8px);-webkit-backdrop-filter: blur(8px);border: 1px solid rgb(228, 228, 231);box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);border-radius: 10px;font-size: 1rem;line-height: 1.5rem;z-index: 50;color: var(--txt,#000);text-align: left;animation: slideIn 0.3s ease-in-out;user-select: auto;pointer-events: auto;transition: transform 0.3s ease;}\n        .default { background-color:var(--bg,#f2f2f2) }\n        .success { background-color:var(--sc, #00a96f); }\n        .info { background-color:var(--in, #00b3f0); }\n        .error { background-color: var(--er,#ff6f70); }\n        @media (min-width: 640px) {.toaster { inset: 3rem; }.toast { max-width: 350px; }}\n        .fade-out {animation: fadeOut 0.3s ease;}\n        .toaster img {width: 64px;height: 64px;aspect-ratio: 1/1;object-fit: cover;border-radius: 4px;overflow: hidden;object-position: center;}\n        .toast button{background-color:transparent;border:none;cursor:pointer;text-align:inherit}\n        @keyframes slideIn { from { transform: translateX(10%); } to { transform: translateX(0); } }\n        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }");
      this.shadowRoot.appendChild(style);
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(event, toastElement) {
      this.touchStartX = event.changedTouches[0].screenX;
      this.currentToast = toastElement;
      this.isDragging = false; // Reset dragging flag on touch start
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(event) {
      if (!this.currentToast) return;
      this.touchEndX = event.changedTouches[0].screenX;
      var touchMoveX = this.touchEndX - this.touchStartX;
      if (Math.abs(touchMoveX) > this.dragThreshold) {
        this.isDragging = true; // Set dragging flag if movement exceeds threshold
        this.currentToast.style.transform = "translateX(".concat(touchMoveX, "px)");
      }
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(event, id) {
      var _this5 = this;
      if (!this.currentToast) return;
      var touchMoveX = this.touchEndX - this.touchStartX;
      var swipeThreshold = 100; // Swipe threshold in pixels

      if (this.isDragging && Math.abs(touchMoveX) > swipeThreshold) {
        this.removeToast(id);
      } else {
        this.currentToast.style.transform = "";
        this.currentToast.style.transition = "transform 0.3s ease";
        setTimeout(function () {
          if (_this5.currentToast) {
            _this5.currentToast.style.transition = "";
          }
        }, 300);
      }
      this.currentToast = null;
      this.touchStartX = 0;
      this.touchEndX = 0;
      this.isDragging = false; // Reset dragging flag on touch end
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
customElements.define("htmx-toaster-component", ToasterComponent);
window.addEventListener("DOMContentLoaded", function () {
  var toasterElement = document.createElement("htmx-toaster-component");
  document.body.appendChild(toasterElement);
});