if('serviceWorker' in navigator){
    console.log("service worker is supported");
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('service worker registered', reg))
      .catch(err => console.log('service worker not registered', err));
  }