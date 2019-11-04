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
    document.querySelector("#descricao").setAttribute("disabled", "disabled");
    document.querySelector("#btn-marcar").setAttribute("disabled", "disabled");
    alert("API de geolocalização indisponível.");
    throw ("API de geolocalização indisponível.");
}

document.querySelector("#btn-marcar").addEventListener("click", function(event) {
    event.preventDefault();
    adicionaPonto();
});

function determinaLocalizacaoAproximada(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    document.querySelector("#lat-aproximada").value = latitude;
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

    document.querySelector("#lat-precisa").value = latitude;    
    document.querySelector("#lon-precisa").value = longitude;
}

// TODO: Melhorar o tramento de erros de precisão
function trataErroLocalizacaoPrecisa(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    erros.push("Erro na API GEO: " + PositionError.message);
}


function adicionaPonto() {
    let campoDescricao = document.querySelector("#descricao");
    let lista = document.querySelector("#lista-pontos");

    let ponto = new Ponto(latitude, longitude, campoDescricao.value);

    mapa.marcaPonto(ponto);

    let scriptCentraliza = `centralizaMapa(${ponto.latitude}, ${ponto.longitude})`;
    lista.innerHTML += `<li><a class="pontos__link" src="#" onclick="${scriptCentraliza}">${ponto.descricao}</li>`;
    campoDescricao.value = "";    
}

function centralizaMapa(lat, lon) {
    mapa.centralizaMapa(lat, lon);
}


