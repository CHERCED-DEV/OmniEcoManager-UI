import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [  
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      withPreloading(PreloadAllModules),
    ), 
    provideClientHydration(), 
    provideHttpClient(withFetch())]
};
