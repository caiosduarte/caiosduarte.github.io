const loadGoogleMapsApi = require('load-google-maps-api');

class MapaGoogleApi {
    
    static loadGoogleMapsApi() {
        return loadGoogleMapsApi({ key: 'AIzaSyD21roOt3t92rTBywi3evpWw-gxLLlqoMg' });
    }

    

    static createMap(googleMaps, mapElement, coords = {lat: -19.85, lng: -43.8}, ...pontos) {
        this.map = new googleMaps.Map(mapElement, {
            center: coords,
            zoom: 17
        });
        this.marcadores = new Set();
        pontos.forEach(p => this.marcadores.add(this.getMarcador(p)));   
        return this.map;
    }
    

     constructor(map, ...pontos) {
        this.map = map;
        this.marcadores = new Set();
        pontos.forEach(p => this.marcadores.add(this.getMarcador(p)));       
    }

    static getMarcador(ponto) {
        return {
            position: this.getPosicao(ponto),
            title: ponto.getDescricao()
        };
    };

    static getPosicao(ponto) {
        return {
            lat: ponto.getLatitude(),
            lng: ponto.getLongitude()
        };
    };

    static marcaPonto(ponto) {
        let marcador = new google.maps.Marker(this.getMarcador(ponto));
        marcador.setMap(this.map);
        this.centralizaMapaNoPonto(ponto);                
    };

    static centralizaMapaNoPonto(ponto) {        
        this.map.setCenter(this.getPosicao(ponto));
    };
    
    static centralizaMapa(lat, long) {
        let pos = {
            lat: lat, lng: long
        };        
        this.map.setCenter(pos);
    }
};

export { MapaGoogleApi };


