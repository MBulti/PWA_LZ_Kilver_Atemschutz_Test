if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
      .then(reg => alert('service worker registered', reg))
      .catch(err => alert('service worker not registered', err));
  }