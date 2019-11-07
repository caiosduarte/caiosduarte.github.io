// exportação da classe Ponto para utilizar modules
class Storage {
    constructor() {     
        this.db;
        var request = indexedDB.open("DBPonto");
        // TODO tratar VER_ERR.
        request.onerror = function(event) {
            throw Error("Database error: " + event.target.errorCode);
        };
        request.onsuccess = function(event) {
            this.db = request.result;
        };
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

class LocalStorage {

    get() {
        let db = JSON.parse(localStorage.getItem("DBPontos"));
        if(!db) {
            db = [];            
        }
        return db;
    };
    set(ponto) {
        let db = get();
        db.push(ponto);
        localStorage.setItem("DBPontos", JSON.stringify(db));       
    };
};

export {LocalStorage};