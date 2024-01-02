import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/bootstrap/config/app.config';
import { AppComponent } from './app/bootstrap/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
