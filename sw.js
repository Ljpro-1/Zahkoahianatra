const CACHE_NAME = "zah-ianatra-v2";


const fichiers = [
  
  "./",
  "./index.html",
  
  "./page2.html",
  "./operation.html",
  "./problem.html",
  "./exercice.html",
  "./francais.html",
  "./problem-geo.html",
  
  
  "./style.css",
  "./page2.css",
  "./exercice.css",
  "./operation.css",
  "./problem.css",
  "./francais.css",
  "./geo.css",
  
  
  "./app.js",
  "./exercice.js",
  "./firebase-config.js",
  "./operation.js",
  "./page2.js",
  "./problem.js",
  "./protection.js",
  "./francais.js",
  "./geo.js",
  
  
  "./manifest.json",
  
  "./icon-192.png",
  "./icon-512.png"
  
];




// INSTALLATION
self.addEventListener("install", event => {
  
  event.waitUntil(
    
    caches.open(CACHE_NAME)
    
    .then(cache => {
      
      return Promise.all(
        
        fichiers.map(fichier => {
          
          return cache.add(fichier)
            .catch(() => {
              console.log("Fichier non trouvé :", fichier);
            });
          
        })
        
      );
      
    })
    
    .then(() => {
      
      return self.skipWaiting();
      
    })
    
  );
  
});





// ACTIVATION
self.addEventListener("activate", event => {
  
  event.waitUntil(
    
    caches.keys()
    
    .then(keys => {
      
      return Promise.all(
        
        keys.map(key => {
          
          if (key !== CACHE_NAME) {
            
            return caches.delete(key);
            
          }
          
        })
        
      );
      
    })
    
    .then(() => {
      
      return self.clients.claim();
      
    })
    
  );
  
});





// MODE OFFLINE
self.addEventListener("fetch", event => {
  
  
  event.respondWith(
    
    caches.match(event.request)
    
    .then(response => {
      
      
      // Si le fichier est dans le cache
      if (response) {
        
        return response;
        
      }
      
      
      // Sinon chercher en ligne
      return fetch(event.request)
        
        .catch(() => {
          
          
          // Retour page principale si navigation offline
          if (event.request.mode === "navigate") {
            
            return caches.match("./page2.html");
            
          }
          
          
        });
      
      
    })
    
  );
  
  
});
