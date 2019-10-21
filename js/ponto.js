class Ponto {
    constructor(descricao, latitude, longitude) {
        this.descricao = descricao;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getLatitude() {
        return this.latitude;
    };

    getLongitude() {
        return this.longitude;
    };

    getDescricao() {
        return this.descricao;
    };
}

class MapaGoogleApi {
    constructor(map, pontos=[]) {
        this.map = map;
        // TODO: transformar em um set
        this.marcadores = pontos.forEach(p => this.marcadores.push(this.getMarcador(p)));       
    }

    getMarcador(ponto) {
        let marcador = {
            position: this.getPosicao(ponto),
            title: ponto.getDescricao()
        };
        return marcador;
    };

    getPosicao(ponto) {
        let posicao = {
            lat: ponto.getLatitude(),
            lng: ponto.getLongitude()
        };
        return posicao;        
    };

    marcaPonto(ponto) {
        let marcador = new google.maps.Marker({
            getMarcador(ponto);
        });

        this.marcadores.push(marcador);

        marcador.setMap(map);
        centralizaMapa(ponto);                
    };

    centralizaMapa(ponto) {        
        this.map.setCenter(this.getPosicao(ponto));
    };     

    iniciaMapa(ponto) {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 17
        });
        this.marcadores.forEach(m => {
            new google.maps.Marker({
                position: m,
                map: map
            });
        });
    }
}
