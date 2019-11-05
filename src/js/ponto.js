// exportação da classe Ponto para utilizar modules
class Ponto {
    constructor(latitude, longitude, descricao="") {     
        if(isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            throw new Error("Latitude e longitude tem que serem numéricas");
        }   
        this.latitude = latitude;
        this.longitude = longitude;
        if(descricao == undefined || descricao.length <= 0 ) {
            throw new Error("Descrição do ponto é obrigatória");
        }
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
};

export {Ponto};


