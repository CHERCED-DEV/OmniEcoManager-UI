import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [  
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)), 
    provideClientHydration(), 
    provideHttpClient(withFetch())]
};
