import { Ponto } from './ponto';
import { MapaGoogleApi } from './mapa';


const LAT_INICIAL = -19.85;
const LNG_INICIAL = -43.8;

window.initMap = function() {     
    let map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: LAT_INICIAL,
            lng: LNG_INICIAL
        },
        zoom: 17
    });
    mapa = new MapaGoogleApi(map);
};

if ("geolocation" in navigator) {
    var latitude;      
    var longitude;
    // TODO: substituir por um Map do javascript
    var erros = [];    
    var mapa;

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

/*
$("#btn-marcar").click(function(event) {
    event.preventDefault();
    adicionaPonto();
});
*/
document.querySelector("#btn-marcar").addEventListener("onclick", function(event) {
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
function trataErroLocalizacaoAproximada (PositionError) {
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
    let campoDescricao = document.querySelector("#descricao");
    let lista = document.querySelector("#lista-pontos");
    let pontoDalista = document.createElement("<li>");

    let ponto = new Ponto(latitude, longitude, campoDescricao.val());
    
    mapa.marcaPonto(ponto);

    let scriptCentraliza = 'mapa.centralizaMapa(' + ponto.latitude + ',' + ponto.longitude + ')';
    //pontoDaLista.append($("<a>").append(ponto.descricao).attr("class", "pontos__link").attr("src", "#").attr("onclick", scriptCentraliza));
    //lista.prepend(pontoDaLista);
    //campoDescricao.val("");
    lista.innerHtml = `<li><a att="pontos__link" src="#" onclick="${scriptCentraliza}">${ponto.descricao}</li>` + lista.innerHtml;
    
}


