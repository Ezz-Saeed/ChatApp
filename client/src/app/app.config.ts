import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './Interceptors/error.interceptor';
import { authenticationInterceptor } from './Interceptors/authentication.interceptor';
import { loadingInterceptor } from './Interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withFetch(),withInterceptors([errorInterceptor,authenticationInterceptor,
      loadingInterceptor,
    ])),provideAnimations(),provideToastr({
      positionClass:'toast-bottom-right'
    }),
  ]
};
