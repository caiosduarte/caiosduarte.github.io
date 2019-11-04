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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon.png";

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ponto = __webpack_require__(5);

var _mapa = __webpack_require__(6);

var LAT_INICIAL = -19.85;
var LNG_INICIAL = -43.8;

window.initMap = function () {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: LAT_INICIAL,
            lng: LNG_INICIAL
        },
        zoom: 17
    });
    mapa = new _mapa.MapaGoogleApi(map);
};

if ("geolocation" in navigator) {
    var latitude;
    var longitude;
    // TODO: substituir por um Map do javascript
    var erros = [];
    var mapa;

    navigator.geolocation.getCurrentPosition(determinaLocalizacaoAproximada, trataErroLocalizacaoAproximada);

    var wpid = navigator.geolocation.watchPosition(determinaLocalizacaoPrecisa, trataErroLocalizacaoPrecisa, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    });
} else {
    $("#descricao").attr("disabled", true);
    $("#btn-marcar").attr("disabled", true);
    alert("API de geolocalização indisponível.");
    throw "API de geolocalização indisponível.";
}

/*
$("#btn-marcar").click(function(event) {
    event.preventDefault();
    adicionaPonto();
});
*/
document.querySelector("#btn-marcar").addEventListener("onclick", function (event) {
    event.preventDefault();
    adicionaPonto();
});

function determinaLocalizacaoAproximada(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //$("#lat-aproximada").val(latitude);
    document.querySelector("#lat-aproximada").value = latitude;
    //$("#lon-aproximada").val(longitude);
    document.querySelector("#lon-aproximada").value = longitude;
    mapa.centralizaMapa(latitude, longitude);
}

// TODO: Melhorar o tramento de erros
function trataErroLocalizacaoAproximada(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    erros.push("Erro na API GEO: " + PositionError.message);
}

function determinaLocalizacaoPrecisa(position) {
    if (!latitude) {
        centralizaMapa(position.coords.latitude, position.coords.longitude);
    }
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    navigator.geolocation.clearWatch(wpid);
    //$("#lat-precisa").val(latitude);
    //$("#lon-precisa").val(longitude);

    document.querySelector("#lat-precisa").value = latitude;
    document.querySelector("#lon-precisa").value = longitude;
}

// TODO: Melhorar o tramento de erros de precisão
function trataErroLocalizacaoPrecisa(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    erros.push("Erro na API GEO: " + PositionError.message);
}

function adicionaPonto() {
    //let campoDescricao =  $("#descricao");
    //let lista = $("#lista-pontos");
    //let pontoDaLista = $("<li>");
    var campoDescricao = document.querySelector("#descricao");
    var lista = document.querySelector("#lista-pontos");
    var pontoDalista = document.createElement("<li>");

    var ponto = new _ponto.Ponto(latitude, longitude, campoDescricao.val());

    mapa.marcaPonto(ponto);

    var scriptCentraliza = 'mapa.centralizaMapa(' + ponto.latitude + ',' + ponto.longitude + ')';
    //pontoDaLista.append($("<a>").append(ponto.descricao).attr("class", "pontos__link").attr("src", "#").attr("onclick", scriptCentraliza));
    //lista.prepend(pontoDaLista);
    //campoDescricao.val("");
    lista.innerHtml = '<li><a att="pontos__link" src="#" onclick="scriptCentraliza()">' + ponto.descricao + '</li>' + lista.innerHtml;
}

/***/ }),
/* 5 */
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

        this.latitude = latitude;
        this.longitude = longitude;
        if (descricao == undefined || descricao.length <= 0) {
            throw new Error("Descrição do ponto é obrigatorio");
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapaGoogleApi = function () {
    function MapaGoogleApi(map) {
        var _this = this;

        _classCallCheck(this, MapaGoogleApi);

        this.map = map;
        this.marcadores = new Set();

        for (var _len = arguments.length, pontos = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            pontos[_key - 1] = arguments[_key];
        }

        pontos.forEach(function (p) {
            return _this.marcadores.add(_this.getMarcador(p));
        });
    }

    _createClass(MapaGoogleApi, [{
        key: "getMarcador",
        value: function getMarcador(ponto) {
            return {
                position: this.getPosicao(ponto),
                title: ponto.getDescricao()
            };
        }
    }, {
        key: "getPosicao",
        value: function getPosicao(ponto) {
            return {
                lat: ponto.getLatitude(),
                lng: ponto.getLongitude()
            };
        }
    }, {
        key: "marcaPonto",
        value: function marcaPonto(ponto) {
            var marcador = new google.maps.Marker(this.getMarcador(ponto));
            marcador.setMap(this.map);
            this.centralizaMapaNoPonto(ponto);
        }
    }, {
        key: "centralizaMapaNoPonto",
        value: function centralizaMapaNoPonto(ponto) {
            this.map.setCenter(this.getPosicao(ponto));
        }
    }, {
        key: "centralizaMapa",
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

/***/ })
/******/ ]);