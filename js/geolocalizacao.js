class Geolocalizacao {
    constructor() {
        this.latitude = undefined;
        this.longitude = undefined;
        // TODO: substituir por um map
        this.erros = [];
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                determinaLocalizacaoAproximada,
                trataErroLocalizacaoAproximada);
        
            var wpid = navigator.geolocation.watchPosition(determinaLocalizacaoPrecisa, trataErroLocalizacaoPrecisa, {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
            });      
        } else {
            throw("Geolocalização não detectada");
        }
    }
    
    determinaLocalizacaoAproximada(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;       
    };
    
    trataErroLocalizacaoAproximada(PositionError) {
        console.log("Erro na API GEO: " + PositionError.message);
    };
    
    determinaLocalizacaoPrecisa(position) {
        if (!this.latitude) {
            console.log("pegou as coord precisas");
            centralizaMapa(position.coords.latitude,
                position.coords.longitude);
        }
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        navigator.geolocation.clearWatch(wpid);
    };
    
    trataErroLocalizacaoPrecisa(PositionError) {        
        console.log("Erro na API GEO: " + PositionError.message);
        this.erros.push();
    };

    getLocalizacao() {
        let coordenada = {
            latitude: this.latitude,
            longitude: this.longitude
        }        
        return [...coordenada, erros];
    };
}

