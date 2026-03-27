import { initFederation } from '@angular-architects/native-federation';

fetch('federation.manifest.json')
  .then(response=>response.json() as unknown as Record<string,string>)
  .then(manifest=>
    initFederation(manifest)
      .then(()=>import('./bootstrap'))
      .then(({ initApp })=>initApp(manifest)))
  .catch(err => console.error(err));
  
