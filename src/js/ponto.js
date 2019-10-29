// exportação da classe Ponto para utilizar modules
export default class Ponto {
    constructor(latitude, longitude, descricao="") {        
        this.latitude = latitude;
        this.longitude = longitude;
        if(descricao == undefined || descricao.length <=0 ) {
            throw new Error("Descrição do ponto é obrigatorio");
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
}


