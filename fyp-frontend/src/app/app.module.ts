import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpInterceptorService } from "./http-interceptor.service";
import { AuthGuard } from "./services/auth-guard.service";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from "ngx-bootstrap";
import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

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
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ActiveAuctionComponent } from './components/active-auction/active-auction.component';
import { PublicProductsComponent } from './components/public-products/public-products.component';
import { AuctionWinnersComponent } from './components/auction-winners/auction-winners.component'
import { UserBidsComponent } from './components/user-bids/user-bids.component';

import { ImagePreview } from './directives/image-preview.directive';
import { MessengerComponent } from './components/messenger/messenger.component';

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
      { path: 'active-auction', component: ActiveAuctionComponent },
      { path: 'items', component: ProductsComponent },
      { path: 'add-items', component: AddProductComponent },
      { path: 'user-bids', component: UserBidsComponent },
      { path: 'messenger', component: MessengerComponent },
    ]
  },
  { path: 'public-product', component: PublicProductsComponent },
  { path: 'auction-won', component: AuctionWinnersComponent },
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
    UserPageComponent,
    ProductsComponent,
    AddProductComponent,
    ActiveAuctionComponent,
    ImagePreview,
    PublicProductsComponent,
    AuctionWinnersComponent,
    UserBidsComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SnotifyModule,
    FileUploadModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    OwlDateTimeModule, OwlNativeDateTimeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    JwtHelperService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
