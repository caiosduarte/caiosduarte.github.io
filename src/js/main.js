import { Ponto } from './ponto';
import { MapaGoogleApi } from './mapa';

const LAT_INICIAL = -19.85;
const LNG_INICIAL = -43.8;

document.addEventListener("DOMContentLoaded", function() {
    let mapElement = document.getElementById('map');
    
    MapaGoogleApi.loadGoogleMapsApi().then(function(googleMaps) {
        let coords = {
            lat: LAT_INICIAL,
            lng: LNG_INICIAL
        };
        if (latitude) coords = {lat: latitude, lng:longitude}
        MapaGoogleApi.createMap(googleMaps, mapElement, coords);
    });
  });
  

if ("geolocation" in navigator) {
    var latitude;      
    var longitude;
    // TODO: substituir por um Map do javascript
    var erros = [];    

    try {
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
        
    } catch(e) {
        desabilitaForm();    
    }
} else {
    desabilitaForm();
    throw new Error("API de geolocalização indisponível.");
}

window.centraliza =  function (lat, lon) {
    MapaGoogleApi.centralizaMapa(lat, lon);
};

window.centralizaComTecla = function () {
  // checa se o espaço ou enter foram pressionados
  if (event.keyCode === 32 || event.keyCode === 13) {    
    event.preventDefault();
    centraliza(lat, lon);
  }    
};

window.abreLateral = function() {
    document.getElementById("mySidenav").style.width = "315px";
};

window.fechaLateral = function() {
    document.getElementById("mySidenav").style.width = "0";
}

function desabilitaForm(habilita) {        
    let form = document.querySelector("#form-ponto");

    if(habilita) {
        form.descricao.classList.add("ponto-form__campo--alerta");
    } else {
        form.descricao.classList.remove("ponto-form__campo--alerta");
    }    
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
}

// TODO: Melhorar o tramento de erros
function trataErroLocalizacaoAproximada (PositionError) {
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
    let campoDescricao = document.querySelector("#descricao");
    let lista = document.querySelector("#lista-pontos");

    try {
        var ponto = new Ponto(latitude, longitude, campoDescricao.value);
        MapaGoogleApi.marcaPonto(ponto);

        // criado role button nos links PONTO para acessibilidade com mouse e teclas espaço e enter, atendendo o princípio WCAG, 2 - OPERÁVEL
        let param = `(${ponto.latitude}, ${ponto.longitude})`;
        lista.innerHTML += `<li class="pontos__item"><a class="pontos__link" role="button" aria-label='Centraliza ponto "${ponto.descricao}" no mapa' onclick="centraliza${param}"
        onKeyDown="centralizaComTecla${param}">${ponto.descricao}</li>`;
        campoDescricao.value = "";    
        campoDescricao.focus();
        desabilitaForm(false);
    
    } catch(e) {
        desabilitaForm(true);
    }
}



