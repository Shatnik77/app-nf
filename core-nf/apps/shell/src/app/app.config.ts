import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { appRoutes } from './app.routes';
import { loadRemoteModule  } from '@angular-architects/native-federation';
import { provideHttpClient } from '@angular/common/http';

export const appConfig = (manifest: Record<string,string>): ApplicationConfig => {
  const remoteRoutes = mapToRoutes(manifest) 
  return {
    providers: [provideBrowserGlobalErrorListeners(), provideRouter(mergeRoutes(appRoutes, remoteRoutes)),provideHttpClient()],
  }
};


function mapToRoutes(manifest: Record<string,string>) {
  return Object.keys(manifest).map(key => ({
    path: key,
    loadComponent: () => loadRemoteModule(key, './Component')
  }));
}

function mergeRoutes(internalRoutes: Route[], remoteRoutes: Route[]) {   
  return [...internalRoutes, ...remoteRoutes]
}


