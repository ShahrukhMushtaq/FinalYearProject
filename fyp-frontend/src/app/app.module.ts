import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpInterceptorService } from "./http-interceptor.service";
import { AuthGuard } from "./services/auth-guard.service";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateAuctionComponent } from './components/create-auction/create-auction.component';
import { UserPageComponent } from './components/user-page/user-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'user', component: UserPageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent },
      { path: 'create-auction', component: CreateAuctionComponent },
    ]
  },
  { path: '**', redirectTo: '' }
]

function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    ContactUsComponent,
    ProfileComponent,
    CreateAuctionComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  providers: [
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
