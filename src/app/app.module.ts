import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import localeEsCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

import { TokenInterceptorService } from './_config/token/token-interceptor.service';
import { ErrorInterceptor } from './_config/http_error/error.interceptor';
import { Routing } from './app.routes';

//components
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselHomeComponent } from './carousel-home/carousel-home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AlertComponent } from './alert/alert.component';
import { DialogDeleteComponent } from './_helpers-components/dialog-delete/dialog-delete.component';
import { SlickModule } from 'ngx-slick';

//styles
import { 
  MAT_DATE_LOCALE,
  MatSnackBarModule,
  MatButtonModule, 
  MatIconModule, 
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatListModule
} from '@angular/material';


//Services
import { AuthGuard } from './_config/auth/auth.guard';
import { AuthService } from './_config/auth/auth.service';
import { CarouselService } from './carousels/carousel.service';
import { AlertService } from './alert/alert.service';
import { UserService } from './users/user.service';
import {EpsService} from './social-security/eps/eps.service';
import { PensionService } from './social-security/pensions/pension.service';
import { JobService } from './jobs/job.service';




registerLocaleData(localeEsCo, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarouselHomeComponent,
    SignInComponent,
    AlertComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    SlickModule.forRoot(),    
    
    MatSnackBarModule,
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule

  ],
  providers: [
    AuthGuard,
    AuthService,    
    CarouselService,
    AlertService,
    UserService,
    EpsService,
    PensionService,
    JobService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-CO' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogDeleteComponent,AlertComponent]
})
export class AppModule { }
