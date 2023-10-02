// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({3:[function(require,module,exports) {
var _this = this;

// Funktion för att spela spelet
var playGame = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(playerChoice) {
    var choices, computerChoice, winner;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            choices = ["sten", "sax", "påse"];
            computerChoice = choices[Math.floor(Math.random() * choices.length)];

            // Visa spelarens och datorns val

            choicesDisplay.innerText = playerName + ": " + playerChoice + " | Dator: " + computerChoice;

            // Avgör vinnaren
            winner = determineWinner(playerChoice, computerChoice);

            if (!(winner === "player")) {
              _context.next = 9;
              break;
            }

            playerScore++;
            // Visa poängen
            playerScoreDisplay.innerText = playerName + " po\xE4ng: " + playerScore;
            _context.next = 13;
            break;

          case 9:
            if (!(winner === "computer")) {
              _context.next = 13;
              break;
            }

            computerScore++;
            _context.next = 13;
            return postPlayerData(playerName, playerScore);

          case 13:

            // Kolla om datorn vann
            if (computerScore >= 1) {
              showWinner("Dator");
            }

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function playGame(_x) {
    return _ref.apply(this, arguments);
  };
}();

// Funktion för att visa vinnaren och starta om spelet efter 3 sekunder


// Anropa updateHighscore-funktionen när spelaren når hög poäng
var postPlayerData = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(playerName, playerScore) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = 'http://localhost:4000/newscore';
            _context2.prev = 1;
            _context2.next = 4;
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name: playerName, score: playerScore })
            });

          case 4:
            response = _context2.sent;


            if (response.ok) {
              console.log('Highscore uppdaterad');
              // Observera att vi inte använder highscoreArray här
              // eftersom vi inte har den uppdaterade listan när vi anropar denna funktion
            } else {
              console.error('Kunde inte uppdatera highscore');
            }
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            console.error('Något gick fel:', _context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 8]]);
  }));

  return function postPlayerData(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

// Ladda och visa highscore-listan när sidan laddas


var updateHighscoreList = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var highscores;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return getHighscores();

          case 3:
            highscores = _context3.sent;


            // Uppdatera highscore-listan på skärmen
            displayScoreList(highscores);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            console.error('Ett fel uppstod:', _context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 7]]);
  }));

  return function updateHighscoreList() {
    return _ref3.apply(this, arguments);
  };
}();

// Additional code for displaying highscore list


var getHighscores = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var response, highscores;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return fetch('http://localhost:4000/highscore');

          case 3:
            response = _context4.sent;

            if (!response.ok) {
              _context4.next = 11;
              break;
            }

            _context4.next = 7;
            return response.json();

          case 7:
            highscores = _context4.sent;
            return _context4.abrupt("return", highscores);

          case 11:
            console.error('Fel vid hämtning av highscore-lista');
            return _context4.abrupt("return", []);

          case 13:
            _context4.next = 19;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);

            console.error('Ett fel uppstod:', _context4.t0);
            return _context4.abrupt("return", []);

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 15]]);
  }));

  return function getHighscores() {
    return _ref4.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Grundläggande variabler vid omstart
var playerScore = 0;
var computerScore = 0;
var playerName = "";

// Hämta alla HTML-element
var playerNameInput = document.getElementById("player-name");
var rockButton = document.getElementById("rockBtn");
var scissorsButton = document.getElementById("scissorsBtn");
var paperButton = document.getElementById("paperBtn");
var playerScoreDisplay = document.getElementById("playerScore");
var computerWins = document.getElementById("computerWins");
var choicesDisplay = document.getElementById("choices");
var highscoreList = document.getElementById('highscore-list');

// Hantera namninput
playerNameInput.addEventListener("input", function (event) {
  playerName = event.target.value;
});

// Hantera knappklick
rockButton.addEventListener("click", function (event) {
  event.preventDefault();
  playGame("sten");
});
scissorsButton.addEventListener("click", function (event) {
  event.preventDefault();
  playGame("sax");
});
paperButton.addEventListener("click", function (event) {
  event.preventDefault();
  playGame("påse");
});

// Funktion för att avgöra vinnaren
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === "sten" && computerChoice === "sax" || playerChoice === "sax" && computerChoice === "påse" || playerChoice === "påse" && computerChoice === "sten") {
    return "player";
  } else if (playerChoice === "sax" && computerChoice === "sten" || playerChoice === "påse" && computerChoice === "sax" || playerChoice === "sten" && computerChoice === "påse") {
    return "computer";
  } else {
    return "tie";
  }
}function showWinner(winnerName) {
  computerWins.innerText = winnerName + " vann \uD83D\uDE22 f\xF6rs\xF6k igen";
  updateScoreboard();
  // Återställ spelet efter 3 sekunder
  setTimeout(function () {
    resetGame();
  }, 3000); // 3000 millisekunder = 3 sekunder
}

// Funktion för att återställa spelet
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  computerWins.innerText = "";
  playerScoreDisplay.innerText = playerName + " po\xE4ng: " + playerScore;
  choicesDisplay.innerText = "";
}

function displayScoreList(scoreArray) {
  highscoreList.innerHTML = ''; // Clear the existing list
  // Loop through each 'scores' object in 'scoreArray'
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = scoreArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var scores = _step.value;
      var name = scores.name,
          score = scores.score; // Destructure 'name' and 'score' from the current 'scores' object

      var li = document.createElement("li");
      li.innerText = name + ": " + score; // Set the text content of the 'li' element to display the player's name and score
      highscoreList.appendChild(li);
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
}

// Add an event listener to execute the following code when the page finishes loading
window.addEventListener('load', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
  var highscores;
  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return getHighscores();

        case 2:
          highscores = _context5.sent;

          displayScoreList(highscores);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee5, _this);
})));
},{}],7:[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '64150' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
        parents.push(+k);
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[7,3], null)
//# sourceMappingURL=/main.72f7f51f.map