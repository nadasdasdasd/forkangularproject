import 'zone.js';  // This must be imported before Angular bootstrapping
import '@angular/compiler';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // if you created this file

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: APP_BASE_HREF, useValue: '/weather' }
  ]
}).catch(err => console.error(err));
