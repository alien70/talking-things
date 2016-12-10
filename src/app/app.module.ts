import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AlertComponent } from './alert/alert.component';

import { AuthGuard } from './auth.guard';

import { FakeBackendProvider } from './helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AuthenticationService } from './authentication.service';
import { AlertService } from './alert.service';
import { UserService } from './user.service';
import { TopmenuComponent } from './topmenu/topmenu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    AlertComponent,
    TopmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', redirectTo: 'home' },
      { path: 'register', component: RegistrationComponent },
      { path: '**', redirectTo: 'home' }
    ],
      { useHash: true })
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserService,

    FakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
