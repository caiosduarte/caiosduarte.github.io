/* Erro nos atributos this.latitude e this.longitude = undefined
class Geolocalizacao {
  
  constructor() {
    this.latitude;
    this.longitude;
 
    // TODO: substituir por um Map do javascript
    this.erros = [];
  }

  inicia() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
        this.determinaLocalizacaoAproximada,
        this.trataErroLocalizacaoAproximada
        );
  
        var wpid = navigator.geolocation.watchPosition(
          this.determinaLocalizacaoPrecisa,
          this.trataErroLocalizacaoPrecisa,
          {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
          }
        );
      } else {
        throw "API de geolocalização indisponível.";
      }
  
  };

  determinaLocalizacaoAproximada(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  };

  trataErroLocalizacaoAproximada(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    this.erros.push("Erro na API GEO: " + PositionError.message);
  };

  determinaLocalizacaoPrecisa(position) {
    if (this.latitude) {
      console.log("pegou as coord precisas");
      centralizaMapa(position.coords.latitude, position.coords.longitude);
    }
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    navigator.geolocation.clearWatch(wpid);
  };

  trataErroLocalizacaoPrecisa(PositionError) {
    console.log("Erro na API GEO: " + PositionError.message);
    this.erros.push("Erro na API GEO: " + PositionError.message);
  };

  getLocalizacao() {
    let coordenada = {
      latitude: this.latitude,
      longitude: this.longitude
    };
    return [...coordenada, erros];
  };
}
*/