// service-worker.js
// 🌿 Agroverso | Service Worker regenerativo v2025.06

const CACHE_VERSION = 'v2025.06.01';
const CACHE_NAME = `agroverso-cache-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/style.css',
  '/manifest.json',
  '/scripts/carrossel.js',
  '/scripts/formulario.js',
  '/scripts/utils.js',
  '/assets/logo-192.png',
  '/assets/logo-512.png',
  '/assets/logo-monochrome.svg',
  '/assets/favicon.ico',
  '/assets/irrigacao-1.jpg',
  '/assets/irrigacao-2.jpg',
  '/assets/irrigacao-3.jpg',
  '/assets/hidroponia-1.jpg',
  '/assets/hidroponia-2.jpg',
  '/assets/hidroponia-3.jpg',
  '/assets/energia-1.jpg',
  '/assets/energia-2.jpg',
  '/assets/energia-3.jpg'
];

// 📦 Pré-carregamento e cache durante a instalação
self.addEventListener('install', event => {
  self.skipWaiting(); // Ativa imediatamente após instalação
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// 🔄 Ativação e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // Assume controle de todas as abas imediatamente
});

// 🌐 Intercepta requisições e responde com rede > cache > offline.html
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache opcionalmente atualizado aqui (futuro)
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached =>
          cached || caches.match(OFFLINE_URL)
        )
      )
  );
});
