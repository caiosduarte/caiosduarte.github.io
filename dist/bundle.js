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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function () {
        console.log('service worker registrado');
    }).catch(function (err) {
        console.warn('service worker não registrado. erro:', err);
    });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon.png";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/favicon.ico";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ponto = __webpack_require__(6);

var _mapa = __webpack_require__(7);

var LAT_INICIAL = -19.85;
var LNG_INICIAL = -43.8;

document.addEventListener("DOMContentLoaded", function () {
    var mapElement = document.getElementById('map');

    _mapa.MapaGoogleApi.loadGoogleMapsApi().then(function (googleMaps) {
        var coords = {
            lat: LAT_INICIAL,
            lng: LNG_INICIAL
        };
        if (latitude) coords = { lat: latitude, lng: longitude };
        _mapa.MapaGoogleApi.createMap(googleMaps, mapElement, coords);
    });
});

if ("geolocation" in navigator) {
    var latitude;
    var longitude;
    // TODO: substituir por um Map do javascript
    var erros = [];

    try {
        navigator.geolocation.getCurrentPosition(determinaLocalizacaoAproximada, trataErroLocalizacaoAproximada);

        var wpid = navigator.geolocation.watchPosition(determinaLocalizacaoPrecisa, trataErroLocalizacaoPrecisa, {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        });
    } catch (e) {
        desabilitaForm();
    }
} else {
    desabilitaForm();
    throw new Error("API de geolocalização indisponível.");
}

window.centraliza = function (lat, lon) {
    _mapa.MapaGoogleApi.centralizaMapa(lat, lon);
};

window.centralizaComTecla = function () {
    // checa se o espaço ou enter foram pressionados
    if (event.keyCode === 32 || event.keyCode === 13) {
        event.preventDefault();
        centraliza(lat, lon);
    }
};

window.abreLateral = function () {
    document.getElementById("mySidenav").style.width = "315px";
};

window.fechaLateral = function () {
    document.getElementById("mySidenav").style.width = "0";
};

function desabilitaForm(habilita) {
    var form = document.querySelector("#form-ponto");

    if (habilita) {
        form.descricao.classList.add("ponto-form__campo--alerta");
    } else {
        form.descricao.classList.remove("ponto-form__campo--alerta");
    }
}

document.querySelector("#btn-marcar").addEventListener("click", function (event) {
    event.preventDefault();
    adicionaPonto();
});

function determinaLocalizacaoAproximada(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    document.querySelector("#lat-aproximada").value = latitude;
    document.querySelector("#lon-aproximada").value = longitude;
}

// TODO: Melhorar o tramento de erros
function trataErroLocalizacaoAproximada(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    erros.push("Erro na API GEO: " + PositionError.message);
    throw new Error(PositionError.message);
}

function determinaLocalizacaoPrecisa(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    navigator.geolocation.clearWatch(wpid);

    document.querySelector("#lat-precisa").value = latitude;
    document.querySelector("#lon-precisa").value = longitude;
}

// TODO: Melhorar o tramento de erros de precisão
function trataErroLocalizacaoPrecisa(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    erros.push("Erro na API GEO: " + PositionError.message);
}

function adicionaPonto() {
    var campoDescricao = document.querySelector("#descricao");
    var lista = document.querySelector("#lista-pontos");

    try {
        var ponto = new _ponto.Ponto(latitude, longitude, campoDescricao.value);
        _mapa.MapaGoogleApi.marcaPonto(ponto);

        // criado role button nos links PONTO para acessibilidade com mouse e teclas espaço e enter, atendendo o princípio WCAG, 2 - OPERÁVEL
        var param = '(' + ponto.latitude + ', ' + ponto.longitude + ')';
        lista.innerHTML += '<li class="pontos__item"><a class="pontos__link" role="button" aria-label=\'Centraliza ponto "' + ponto.descricao + '" no mapa\' onclick="centraliza' + param + '"\n        onKeyDown="centralizaComTecla' + param + '">' + ponto.descricao + '</li>';
        campoDescricao.value = "";
        campoDescricao.focus();
        desabilitaForm(false);
    } catch (e) {
        desabilitaForm(true);
    }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// exportação da classe Ponto para utilizar modules
var Ponto = function () {
    function Ponto(latitude, longitude) {
        var descricao = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

        _classCallCheck(this, Ponto);

        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            throw new Error("Latitude e longitude tem que serem numéricas");
        }
        this.latitude = latitude;
        this.longitude = longitude;
        if (descricao == undefined || descricao.length <= 0) {
            throw new Error("Descrição do ponto é obrigatória");
        }
        this.descricao = descricao;
    }

    _createClass(Ponto, [{
        key: "getDescricao",
        value: function getDescricao() {
            return this.descricao;
        }
    }, {
        key: "getLatitude",
        value: function getLatitude() {
            return this.latitude;
        }
    }, {
        key: "getLongitude",
        value: function getLongitude() {
            return this.longitude;
        }
    }]);

    return Ponto;
}();

;

exports.Ponto = Ponto;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _loadGoogleMapsApi = __webpack_require__(8);

var MapaGoogleApi = function () {
    _createClass(MapaGoogleApi, null, [{
        key: 'loadGoogleMapsApi',
        value: function loadGoogleMapsApi() {
            return _loadGoogleMapsApi({ key: 'AIzaSyD21roOt3t92rTBywi3evpWw-gxLLlqoMg' });
        }
    }, {
        key: 'createMap',
        value: function createMap(googleMaps, mapElement) {
            var _this = this;

            var coords = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { lat: -19.85, lng: -43.8 };

            this.map = new googleMaps.Map(mapElement, {
                center: coords,
                zoom: 17
            });
            this.marcadores = new Set();

            for (var _len = arguments.length, pontos = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
                pontos[_key - 3] = arguments[_key];
            }

            pontos.forEach(function (p) {
                return _this.marcadores.add(_this.getMarcador(p));
            });
            return this.map;
        }
    }]);

    function MapaGoogleApi(map) {
        var _this2 = this;

        _classCallCheck(this, MapaGoogleApi);

        this.map = map;
        this.marcadores = new Set();

        for (var _len2 = arguments.length, pontos = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            pontos[_key2 - 1] = arguments[_key2];
        }

        pontos.forEach(function (p) {
            return _this2.marcadores.add(_this2.getMarcador(p));
        });
    }

    _createClass(MapaGoogleApi, null, [{
        key: 'getMarcador',
        value: function getMarcador(ponto) {
            return {
                position: this.getPosicao(ponto),
                title: ponto.getDescricao()
            };
        }
    }, {
        key: 'getPosicao',
        value: function getPosicao(ponto) {
            return {
                lat: ponto.getLatitude(),
                lng: ponto.getLongitude()
            };
        }
    }, {
        key: 'marcaPonto',
        value: function marcaPonto(ponto) {
            var marcador = new google.maps.Marker(this.getMarcador(ponto));
            marcador.setMap(this.map);
            this.centralizaMapaNoPonto(ponto);
        }
    }, {
        key: 'centralizaMapaNoPonto',
        value: function centralizaMapaNoPonto(ponto) {
            this.map.setCenter(this.getPosicao(ponto));
        }
    }, {
        key: 'centralizaMapa',
        value: function centralizaMapa(lat, long) {
            var pos = {
                lat: lat, lng: long
            };
            this.map.setCenter(pos);
        }
    }]);

    return MapaGoogleApi;
}();

;

exports.MapaGoogleApi = MapaGoogleApi;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

const API_URL = 'https://maps.googleapis.com/maps/api/js'
const CALLBACK_NAME = '__googleMapsApiOnLoadCallback'

const optionsKeys = ['channel', 'client', 'key', 'language', 'region', 'v']

let promise = null

module.exports = function (options = {}) {
  promise =
    promise ||
    new Promise(function (resolve, reject) {
      // Reject the promise after a timeout
      const timeoutId = setTimeout(function () {
        window[CALLBACK_NAME] = function () {} // Set the on load callback to a no-op
        reject(new Error('Could not load the Google Maps API'))
      }, options.timeout || 10000)

      // Hook up the on load callback
      window[CALLBACK_NAME] = function () {
        if (timeoutId !== null) {
          clearTimeout(timeoutId)
        }
        resolve(window.google.maps)
        delete window[CALLBACK_NAME]
      }

      // Prepare the `script` tag to be inserted into the page
      const scriptElement = document.createElement('script')
      const params = [`callback=${CALLBACK_NAME}`]
      optionsKeys.forEach(function (key) {
        if (options[key]) {
          params.push(`${key}=${options[key]}`)
        }
      })
      if (options.libraries && options.libraries.length) {
        params.push(`libraries=${options.libraries.join(',')}`)
      }
      scriptElement.src = `${options.apiUrl || API_URL}?${params.join('&')}`

      // Insert the `script` tag
      document.body.appendChild(scriptElement)
    })
  return promise
}


/***/ })
/******/ ]);