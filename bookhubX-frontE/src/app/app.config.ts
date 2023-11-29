import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { BookEffects } from './store/effects/book.effects';
import { bookReducer } from './store/reducers/book.reducer';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
   
    provideRouter(routes), 
    provideStore({books:bookReducer}), 
    provideEffects([BookEffects]),
    // HttpClientModule,
    
  ]
};
