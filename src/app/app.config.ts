import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-9db49","appId":"1:332321548843:web:356818b857af82d65c986e","storageBucket":"simple-crm-9db49.appspot.com","apiKey":"AIzaSyBtzpQ-29pxwIMvsMwYa0JYR-HQx-Cxqnc","authDomain":"simple-crm-9db49.firebaseapp.com","messagingSenderId":"332321548843"}))), importProvidersFrom(provideFirestore(() => getFirestore())), provideAnimationsAsync()]
};
