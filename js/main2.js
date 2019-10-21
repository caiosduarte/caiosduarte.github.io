if ("geolocation" in navigator) {
    var latitude;
    var longitude;

    var map;
    var markers = new Array();

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 17
        });
        if (markers) {
            markers.forEach(pos => {
                new google.maps.Marker({
                    position: pos,
                    map: map
                });
            });
        }
    }

    navigator.geolocation.getCurrentPosition(
        aproximadaEncontrada,
        aproximadaErro);

    var wpid = navigator.geolocation.watchPosition(precisaEncontrada, precisaErro, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    });

    $("#btn-marcar").click(function(event) {
        event.preventDefault();        
        let descricaoCampo = $("#descricao");
        let descricao = descricaoCampo.val();

        let posicao = {
            lat: latitude,
            lng: longitude,
            title: descricao
        };

        var marker = new google.maps.Marker({
            position: posicao,
            title: descricao
        });

        markers.push(marker);

        marker.setMap(map);

        centralizaMapa(latitude, longitude);

        let lista = $("#lista-pontos");
        let pontoDaLista = $("<li>");
        let scriptCentraliza = 'centralizaMapa(' + latitude + ',' + longitude + ')';
        pontoDaLista.append($("<a>").append(descricao).attr("class", "pontos__link").attr("src", "#").attr("onclick", scriptCentraliza));
        lista.prepend(pontoDaLista);
        descricaoCampo.val("");
    });

} else {
    $("#descricao").attr("disabled", true);
    $("#btn-marcar").attr("disabled", true);
    console.log("API GEO desabilitada");
    alert("Não foi possível obter a localização");
}

function aproximadaEncontrada(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    $("#lat-aproximada").val(position.coords.latitude);
    $("#lon-aproximada").val(position.coords.longitude);

    if (latitude && longitude) {
        centralizaMapa(latitude, longitude);
    }
}

function aproximadaErro(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
}

function precisaEncontrada(position) {
    if (!latitude) {
        console.log("pegou as coord precisas");
        centralizaMapa(position.coords.latitude,
            position.coords.longitude);
    }
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    $("#lat-precisa").val(latitude);
    $("#lon-precisa").val(longitude);
}

function precisaErro(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
}

function centralizaMapa(lati, long) {
    var pos = {
        lat: lati,
        lng: long
    };
    map.setCenter(pos);
}