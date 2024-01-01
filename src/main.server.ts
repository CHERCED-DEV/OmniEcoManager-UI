import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/bootstrap/app.component';
import { config } from './app/bootstrap/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
