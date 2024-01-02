import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from '../app.routes';
import { CultureResolver } from '../../main/core/services/helpers/culture/resolver/culture-resolver.service';

export const appConfig: ApplicationConfig = {
  providers: [
    CultureResolver,  
    provideRouter(
      routes, 
      withComponentInputBinding(), 
      withPreloading(PreloadAllModules),
    ), 
    provideClientHydration(), 
    provideHttpClient(withFetch())]
};
