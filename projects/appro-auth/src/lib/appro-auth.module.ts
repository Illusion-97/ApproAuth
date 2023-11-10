import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { RegisterComponent } from './components/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { BannerComponent } from './components/banner/banner.component';
import {NavDropdownComponent} from "./components/nav-dropdown/nav-dropdown.component";

const route : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    BannerComponent,
    NavDropdownComponent
  ],
  exports: [BannerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(route)
  ],
  providers: [
    // Je fournis à mon contexte un intercepteur par sa classe en lui permettant de travailler sur plusieurs requêtes
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ]
})
export class ApproAuthModule { }
