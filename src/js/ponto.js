class Ponto {
    constructor(latitude, longitude, descricao="") {        
        this.latitude = latitude;
        this.longitude = longitude;
        this.descricao = descricao;
    }

    getDescricao() {
        return this.descricao;
    };    

    getLatitude() {
        return this.latitude;
    };

    getLongitude() {
        return this.longitude;
    };
}

