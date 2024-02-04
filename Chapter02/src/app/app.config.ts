import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterLink, RouterLinkActive, provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ]
};
