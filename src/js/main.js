var Ponto = require("./ponto.js");
var MapaGoogleApi = require("./mapa.js");

const LAT_INICIAL = -19.85;
const LNG_INICIAL = -43.8;

if ("geolocation" in navigator) {
    var latitude;      
    var longitude;
    // TODO: substituir por um Map do javascript
    var erros = [];    
    var mapa;

    function initMap() {     
        let map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: LAT_INICIAL,
                lng: LNG_INICIAL
            },
            zoom: 17
        });
        mapa = new MapaGoogleApi(map);
    };

    navigator.geolocation.getCurrentPosition(
        determinaLocalizacaoAproximada,
        trataErroLocalizacaoAproximada
    );

    var wpid = navigator.geolocation.watchPosition(
    determinaLocalizacaoPrecisa,
    trataErroLocalizacaoPrecisa,
    {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    }
    );
} else {
    $("#descricao").attr("disabled", true);
    $("#btn-marcar").attr("disabled", true);
    alert("API de geolocalização indisponível.");
    throw ("API de geolocalização indisponível.");
}

function determinaLocalizacaoAproximada(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    $("#lat-aproximada").val(latitude);
    $("#lon-aproximada").val(longitude);
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
    $("#lat-precisa").val(latitude);
    $("#lon-precisa").val(longitude);
}

// TODO: Melhorar o tramento de erros de precisão
function trataErroLocalizacaoPrecisa(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    erros.push("Erro na API GEO: " + PositionError.message);
}

$("#btn-marcar").click(function(event) {
    event.preventDefault();
    adicionaPonto();
});


function adicionaPonto() {
    let campoDescricao =  $("#descricao");
    let lista = $("#lista-pontos");
    let pontoDaLista = $("<li>");
    let ponto = new Ponto(latitude, longitude, campoDescricao.val());
    
    mapa.marcaPonto(ponto);

    let scriptCentraliza = 'mapa.centralizaMapa(' + ponto.latitude + ',' + ponto.longitude + ')';
    pontoDaLista.append($("<a>").append(ponto.descricao).attr("class", "pontos__link").attr("src", "#").attr("onclick", scriptCentraliza));
    lista.prepend(pontoDaLista);
    campoDescricao.val("");
}


