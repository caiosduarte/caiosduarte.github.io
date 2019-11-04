class MapaGoogleApi {
    constructor(map, ...pontos) {
        this.map = map;
        this.marcadores = new Set();
        pontos.forEach(p => this.marcadores.add(this.getMarcador(p)));       
    }

    getMarcador(ponto) {
        return {
            position: this.getPosicao(ponto),
            title: ponto.getDescricao()
        };
    };

    getPosicao(ponto) {
        return {
            lat: ponto.getLatitude(),
            lng: ponto.getLongitude()
        };
    };

    marcaPonto(ponto) {
        let marcador = new google.maps.Marker(this.getMarcador(ponto));
        marcador.setMap(this.map);
        this.centralizaMapaNoPonto(ponto);                
    };

    centralizaMapaNoPonto(ponto) {        
        this.map.setCenter(this.getPosicao(ponto));
    };
    
    centralizaMapa(lat, long) {
        let pos = {
            lat: lat, lng: long
        };        
        this.map.setCenter(pos);
    }
};

export { MapaGoogleApi };


