import './img/icon.png'
import './img/favicon.ico'
import './css/reset.css'
import './css/main.css'
import './js/main.js'

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
        console.log('service worker registrado');
    })
    .catch(function (err) {
        console.warn('service worker não registrado. erro:', err);
    });
}








