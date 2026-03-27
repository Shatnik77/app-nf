import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

export const initApp = (manifest: Record<string,string>) => {
  bootstrapApplication(App, appConfig(manifest)).catch((err) => console.error(err));
};


