// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/libs/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.getElement = function (selectorString) {
  return document.querySelector(selectorString);
};

exports.calculateAmountPerRow = function (unity, quantity) {
  return unity * quantity;
};

exports.calculateVat = function (vat, subtotal) {
  return subtotal * vat / 100;
};

exports.setVat = function (element, vat) {
  element.innerText = vat;
};

exports.calculateDiscount = function (discount, subtotal) {
  return discount / 100 * subtotal;
};

exports.calculateTotalAmount = function (selectorsArray, vat, discount) {
  var sum = 0; // Iterate over all amount and sum

  selectorsArray.forEach(function (element) {
    sum += parseFloat(element.nodeValue);
  });
  return sum + vat - discount + "\u20AC";
};

exports.validateField = function (value, elemContainer) {
  if (isNaN(value) || value === 0) {
    elemContainer.classList.add("error");
    return false;
  } else {
    elemContainer.classList.remove("error");
    return true;
  }
};
},{}],"src/components/ProductsTable.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../libs/utils");

var ProductsTable =
/** @class */
function () {
  function ProductsTable() {
    var _this = this;

    this.$selectBox = utils_1.getElement(".js-select");
    this.$quantityEl = utils_1.getElement(".js-input-quantity");
    this.$unityEl = utils_1.getElement(".js-input-unity");
    this.$amountEl = utils_1.getElement(".js-input-amount");

    this.isDataTableValid = function (id) {
      var isValid = false;
      var setId = id === 0 ? 0 : id;
      var $selectEl = utils_1.getElement("#js-select-product-" + setId);
      var $unityEl = utils_1.getElement("#js-unity-product-" + setId);
      var $amountEl = utils_1.getElement("#js-amount-product-" + setId);
      var $quantityEl = utils_1.getElement("#js-quantity-product-" + setId);
      isValid = utils_1.validateField(parseInt($selectEl.value), $selectEl);
      isValid = utils_1.validateField(parseInt($unityEl.value), $unityEl);
      isValid = utils_1.validateField(parseInt($quantityEl.value), $quantityEl);
      isValid = utils_1.validateField(parseInt($amountEl.value), $amountEl);
      return isValid;
    };

    this.onQuantityHandler = function (quantityField, unityField, amountField) {
      if (unityField.value === "") return;
      var amountPerRow = utils_1.calculateAmountPerRow(parseInt(quantityField.value), parseInt(unityField.value));
      amountField.value = String(amountPerRow);
    };

    this.$quantityEl.addEventListener("keyup", function () {
      _this.onQuantityHandler(_this.$quantityEl, _this.$unityEl, _this.$amountEl);
    });
  }
  /**
   * @param elementChildType
   * @param colClassAttr
   * @param nameAttr
   * @param placeholderAttr
   * @returns Col table with element in it
   */


  ProductsTable.prototype.createColTable = function (elementChildType, colClassAttr, elemClassAttr, idAttr, placeholderAttr) {
    var $td = document.createElement("td"),
        $elem = document.createElement(elementChildType),
        $euroSymbol = document.createElement("span");

    if (elementChildType === "select") {
      var items = {
        "0": "-- Select --",
        "1": "Service",
        "2": "Hours",
        "3": "Days",
        "4": "Product"
      };

      for (var key in items) {
        if (items.hasOwnProperty(key)) {
          var $option = document.createElement("option");
          $option.setAttribute("value", key);
          $option.innerHTML = items[key];
          $elem.appendChild($option);
        }
      }
    }

    $td.setAttribute("class", colClassAttr);
    $elem.setAttribute("class", elemClassAttr);
    $elem.setAttribute("id", idAttr);
    $elem.setAttribute("placeholder", placeholderAttr);

    if ($elem.classList.contains("js-input-amount")) {
      $euroSymbol.setAttribute("class", "amount-euro");
      $td.appendChild($euroSymbol);
    }

    $td.appendChild($elem);
    return $td;
  };

  ProductsTable.prototype.createRowTable = function (id) {
    var $row = document.createElement("tr"),
        $deleteRowBtn = document.createElement("i");
    $deleteRowBtn.setAttribute("class", "icon-minus");
    $deleteRowBtn.setAttribute("id", id);
    $row.classList.add("row");
    $row.appendChild(this.createColTable("select", "js-select-wrapper col small", "js-select", "js-select-product-" + id, "js-select-product-" + id //"-- Select --"
    ));
    $row.appendChild(this.createColTable("textarea", "col large", "js-input-description table-field", "js-description-product-" + id, ""));
    $row.appendChild(this.createColTable("input", "col small", "js-input-unity table-field", "js-unity-product-" + id, "0.00"));
    $row.appendChild(this.createColTable("input", "col small", "js-input-quantity table-field", "js-quantity-product-" + id, "0"));
    $row.appendChild(this.createColTable("input", "amount-col col small", "js-input-amount table-field", "js-amount-product-" + id, "0.00"));
    $row.appendChild($deleteRowBtn);
    $row.setAttribute("id", id);
    return $row;
  };

  ProductsTable.prototype.addProduct = function () {
    console.log("product added");
  };

  return ProductsTable;
}();

exports.default = ProductsTable;
},{"../libs/utils":"src/libs/utils.ts"}],"src/components/Image.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../libs/utils");

var ImageUploader =
/** @class */
function () {
  function ImageUploader() {
    var _this = this;

    this.$imgBlank = utils_1.getElement("#js-image-blank");
    this.$logoImageField = utils_1.getElement("#js-logo-image");
    this.isLogoUploaded = false;

    this.changeImageHandler = function (e) {
      var imgData = _this.getBase64Image(e);

      localStorage.setItem("imgData", String(imgData));
      _this.isLogoUploaded = true;
    };

    this.getBase64Image = function (e) {
      /**
       * Thanks to: https://stackoverflow.com/questions/33024630/html5-canvas-conversion-of-image-file-to-dataurl-throws-uncaught-typeerror
       *
       * This converts an image into base 64 format
       * and then is possible to retrieve via local storage
       */
      var logo = _this.$imgBlank;
      var ctx = logo.getContext("2d"),
          img = new Image();

      img.onload = function () {
        logo.height = img.height > 150 ? 80 : img.height;
        logo.width = img.width;
        ctx.drawImage(img, 0, 0);
      };

      img.src = URL.createObjectURL(e.target.files[0]);
      logo.classList.remove("hidden");
      return img;
    };

    this.getImageFromStorage = function () {
      return localStorage.getItem("imgData");
    };

    this.setImage = function () {
      _this.$imgBlank.src = "data:image/png;base64," + _this.getImageFromStorage();
    };

    this.isImageUploaded = function () {
      return _this.isLogoUploaded;
    };

    this.$logoImageField.addEventListener("change", function (e) {
      _this.changeImageHandler(e);
    });
    this.setImage();
  }

  return ImageUploader;
}();

exports.default = ImageUploader;
},{"../libs/utils":"src/libs/utils.ts"}],"src/components/ActionBar.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("../libs/utils");

var ProductsTable_1 = __importDefault(require("./ProductsTable"));

var Image_1 = __importDefault(require("./Image"));

var ActionBar =
/** @class */
function () {
  function ActionBar() {
    var _this = this;

    this.$addProductBtn = utils_1.getElement("#js-add-btn");
    this.$printBtn = utils_1.getElement("#js-print-btn");
    this.$previewBtn = utils_1.getElement("#js-preview-btn");
    var table = new ProductsTable_1.default();
    var image = new Image_1.default();
    this.$addProductBtn.addEventListener("click", function () {
      table.addProduct();
    });
    this.$printBtn.addEventListener("click", function () {
      _this.printHandler(image);
    });
    this.$previewBtn.addEventListener("click", function () {
      _this.previewHandler(image);
    });
  }

  ActionBar.prototype.previewHandler = function (instance) {
    if (instance.isImageUploaded()) {
      utils_1.getElement("body").classList.toggle("x-preview");
    } else {
      utils_1.getElement(".x-logo-error").classList.remove("hidden");
      this.scrollToError();
    }
  };

  ActionBar.prototype.printHandler = function (instance) {
    if (instance.isImageUploaded()) {
      window.print();
    } else {
      utils_1.getElement(".x-logo-error").classList.remove("hidden");
      this.scrollToError();
    }
  };

  ActionBar.prototype.scrollToError = function () {
    return window.scroll(0, ".x-logo-error");
  };

  return ActionBar;
}();

exports.default = ActionBar;
},{"../libs/utils":"src/libs/utils.ts","./ProductsTable":"src/components/ProductsTable.ts","./Image":"src/components/Image.ts"}],"src/index.ts":[function(require,module,exports) {
/**
 * @Author: Ivan Lori
 * @Description: An online estimate of costs
 *
 * My experiment with new features from ES6 and the new grid system
 * for responsive purposes
 *
 * The code style which I adopted is from AirBnb
 * references to: https://github.com/airbnb/javascript
 *
 * Application entry point
 */
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // Load application styles

require("./styles/main.scss");

var utils_1 = require("./libs/utils");

var ProductsTable_1 = __importDefault(require("./components/ProductsTable"));

var ActionBar_1 = __importDefault(require("./components/ActionBar"));

var Image_1 = __importDefault(require("./components/Image"));

(function () {
  var $datepicker = utils_1.getElement(".js-datepicker");
  var $vat = utils_1.getElement(".js-vat");
  var $displayVatEl = utils_1.getElement(".js-vat-display");
  var $addressInputField = utils_1.getElement(".js-company-address");
  var $discount = utils_1.getElement(".js-discount");
  var $estimateSubtotal = utils_1.getElement(".js-estimate-subtotal");
  var $estimateTotal = utils_1.getElement(".js-estimate-total");
  $addressInputField.addEventListener("focusin", function (e) {
    e.target.classList.add("expand");
  });
  $discount.addEventListener("keyup", function (e) {
    utils_1.calculateDiscount(e.target.value, 1300);
  });
  $vat.addEventListener("keyup", function (e) {
    utils_1.setVat($displayVatEl, e.target.value);
  }); // Thanks to -> https://github.com/chmln/flatpickr

  /*flatpickr($datepicker, {
      dateFormat: "d-m-Y"
  });*/

  new Image_1.default();
  new ProductsTable_1.default();
  new ActionBar_1.default();
})();
},{"./styles/main.scss":"src/styles/main.scss","./libs/utils":"src/libs/utils.ts","./components/ProductsTable":"src/components/ProductsTable.ts","./components/ActionBar":"src/components/ActionBar.ts","./components/Image":"src/components/Image.ts"}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49804" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map