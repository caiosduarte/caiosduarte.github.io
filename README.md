Projeto Front-end: Marcador de Pontos Georreferenciados

O objetivo do projeto é fazer um marcador de pontos georreferenciados. 

Etapa 1 (Exercício prático 01 - HTML5 APIs):

Estruturei o HTML5 de forma semântica e utilizei o CSS reset.css para limpar os estilos. 
Utilizei a API de geolocalização do HTML5 e integrei com um mapa do Google Maps através da MAPs Javascript API, apenas para exibição dos dados em um mapa. 
Ainda não me preocupei com a modelagem OO no javascript, fiz bastante procedural, pois estava focado em ver funcionando os métodos da API javascript. 
Pretendo utilizar a API indexed DB para armazenar a estrutura em grafo, a API Web Worker para processar em paralelo a localização mais precisa possível.

Etapa 2 (Exercício prático 02 - Pré-processadores e metodologias CSS):

Utilizei a metodologia BEM CSS para estilizar a página com o pré-processador SASS. 
A estilização foi feita visando mobile (mobile first) tendo como paradigma padrões do iPhone 5 e não preocupei com telas grandes. 

Etapa 3 (Exercício prático 03 - Novos recursos do JavaScript):

Foram criadas as classes Ponto (js/ponto.js) e MapaGoogleApi (js/mapa.js) no padrão ES6. O default parameter foi utilizado na classe Ponto e rest parameter na classe MapaGoogleApi, quem também utilizou arrow functions e classe SET. 

O arquivo main.js contém variáveis CONST e LET (também usado nas classes acima). 

Tentarei melhorar a parte OO do projeto depois, onde pretendo desacoplar a parte de geolocalização do javascript e criar uma estrutura em grafo em matriz encadeada. Acabei esbarrando em um problema de membros de classe "undefined" que comprometeu o resultado da entrega. 

A manipulação de erros é outra coisa a ser melhorada.  

Etapa 4

Etapa 5

Etapa 6

Trabalho Final - Progressive Web Apps

Requisitos a serem implementados:

1. Deve registrar um Service Worker (esse é obrigatório);
2. Resposta com status 200 mesmo estando offline (esse é obrigatório)
3. Deve exibir conteúdo quando o JavaScript estiver desabilitado;
4. Toda a comunicação deve usar HTTPS (esse é obrigatório);
    Para implementar HTTPS, o nome projeto no git foi alterado para usar o domínio: https://caiosduarte.github.io/dist
5. Todo conteúdo HTTP deve ser redirecionado para HTTPS;
6. Deve carregar rapidamente em conexões 3G;
7. O usuário deve ser questionado se deseja instalar a aplicação;
8. A aplicação deve ser configurada com uma splash screen personalizada;
9. Deve colorir a barra de endereço do navegador com as cores do site;
    Incluída a cor tema do site como whitesmoke (#f5f5f5): 
    <meta name="theme-color" content="#f5f5f5">
10. Implementa a metatag viewport;
    <meta name="viewport" content="width=device-width, initial-scale=1">
11. Deve redimensionar o conteúdo da página corretamente (ser responsivo);
12. Necessita ser cross-browser;
13. As transições entre páginas não devem ser sensíveis à velocidade de conexão;
14. Cada página deve ter uma URL (isso é, ser bookmarkable).








