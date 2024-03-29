//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_alejandro_pwa'

// Ficheros a Cachear en la applicacion

var urlsToCache = [
	'./',
	'./css/style.css',
	'./img/favicon.png',
	'./img/1.png',
	'./img/2.png',
	'./img/3.png',
	'./img/4.png',
	'./img/5.png',
	'./img/6.png',
	'./img/facebook.png',
	'./img/instagram.png',
	'./img/twitter.png',
	'./img/favicon-1024.png',
	'./img/favicon-512.png',
	'./img/favicon-384.png',
	'./img/favicon-256.png',
	'./img/favicon-192.png',
	'./img/favicon-144.png',
	'./img/favicon-128.png',
	'./img/favicon-96.png',
	'./img/favicon-64.png',
	'./img/favicon-32.png',
	'./img/favicon-16.png'
];

// Evento Instal

//Instalacion del service worker y guardar en cache los recursos estaticos de la aplicacion

self.addEventListener('install', e => {
	e.waitUntil(
			caches.open(CACHE_NAME).then(cache => {
					return cache.addAll(urlsToCache)
						.then(()=> {
							self.skipWaiting();
						});
					
				}).catch(err => console.log("NO se ha registrado el cache", err))
		);

});

// Evento Activate
// Que la app funcione sin conexion
self.addEventListener('activate', e =>{
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
			caches.keys()
				.then(cacheNames => {
					return Promise.all(
						cacheNames.map(cacheName => {
							if(cacheWhitelist.indexOf(cacheName) == -1){
								//Borrar los elementos que no necesitamos
								return caches.delete(cacheName);
							}
						})
					);
				}).then(()=> {
					//Activa la cache en el dispositivo
					self.clients.claim()
				})
		);
});


// Evento Fetch

self.addEventListener('fetch', e=> {

	e.respondWith(
			caches.match(e.request)
				.then(res => {
					if(res){
						//Devuelvo datos desde cache
						return res;
					}

					return fetch(e.request);

				})
		);
});