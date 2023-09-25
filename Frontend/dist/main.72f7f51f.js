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
})({6:[function(require,module,exports) {


// Funktion för att posta highscore till servern
var postHighscore = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(playerName, playerScore) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "http://localhost:4000/highscore";
            _context.next = 3;
            return fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ playerName: playerName, score: playerScore }) // Skicka spelarens namn och poäng till servern
            });

          case 3:
            response = _context.sent;


            if (response.status === 200) {
              console.log("Highscore uppdaterad");
            } else {
              console.error("Något gick fel när highscore skulle uppdateras");
            }

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function postHighscore(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Funktion som anropas när spelet är över och resultatet ska sparas i highscore-listan


var restartGame = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return postHighscore(playerName, playerScore);

          case 2:

            playerScore = 0;
            computerScore = 0;
            computerWins.innerText = ""; // Rensa meddelandet "Datorn vann"
            playerScoreDisplay.innerText = playerName + " po\xE4ng: " + playerScore;
            document.getElementById("choices").innerText = "";

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function restartGame() {
    return _ref2.apply(this, arguments);
  };
}();

// Funktion för att hämta och visa highscore-listan


var getHighscore = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var url, response, highscoreArray, noHighscoreItem;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = "http://localhost:4000/highscore";
            _context3.next = 3;
            return fetch(url);

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.json();

          case 6:
            highscoreArray = _context3.sent;


            // Rensa highscore-listans container innan du fyller den med nya resultat
            highscoreListContainer.innerHTML = "";

            // Kolla om det finns några highscores att visa
            if (highscoreArray && highscoreArray.length > 0) {
              highscoreArray.forEach(function (highscore, index) {
                var name = highscore.name,
                    score = highscore.score;

                // Skapa ett li-element för varje highscore

                var listItem = document.createElement("li");
                listItem.innerText = index + 1 + ". " + name + ": " + score;
                highscoreListContainer.appendChild(listItem);
              });
            } else {
              // Om det inte finns några highscores, visa ett meddelande
              noHighscoreItem = document.createElement("li");

              noHighscoreItem.innerText = "Inga high scores tillgängliga.";
              highscoreListContainer.appendChild(noHighscoreItem);
            }

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getHighscore() {
    return _ref3.apply(this, arguments);
  };
}();

// Hämta highscore-listan när sidan laddas


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Grundvärden vid omstart
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
var highscoreListContainer = document.getElementById("highscore-list"); // Lägg till referens till highscore-listans container

// Namninput event
playerNameInput.addEventListener("input", function (event) {
  playerName = event.target.value;
});

// Knappklick event
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

// Regler
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === "sten" && computerChoice === "sax" || playerChoice === "sax" && computerChoice === "påse" || playerChoice === "påse" && computerChoice === "sten") {
    return "player";
  } else if (playerChoice === "sax" && computerChoice === "sten" || playerChoice === "påse" && computerChoice === "sax" || playerChoice === "sten" && computerChoice === "påse") {
    return "computer";
  } else {
    return "tie";
  }
}

function playGame(playerChoice) {
  var choices = ["sten", "sax", "påse"];
  var computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Visa spelarens och datorns val
  document.getElementById("choices").innerText = playerName + ": " + playerChoice + " | Dator: " + computerChoice;

  // Uppdatera poängen baserat på vinnare
  var winner = determineWinner(playerChoice, computerChoice);
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }

  // Visa poängen
  playerScoreDisplay.innerText = playerName + " po\xE4ng: " + playerScore;

  // Kolla om datorn har vunnit
  if (computerScore >= 1) {
    showWinner("Dator");
  }
}

// Visa vinnaren
function showWinner(winnerName) {
  computerWins.innerText = winnerName + " vann \uD83D\uDE22 f\xF6rs\xF6k igen";

  // Anropa funktionen för att hämta och visa highscore-listan
  getHighscore();
}getHighscore();
},{}],13:[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55499' + '/');
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
},{}]},{},[13,6], null)
//# sourceMappingURL=/main.72f7f51f.map