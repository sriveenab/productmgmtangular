import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import {Observable} from 'rxjs/Observable';
import * as $ from 'jquery';
import { from } from 'rxjs/observable/from';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ServiceService } from './service/service.service';
import { AuthenticateService } from './service/authenticate.service';
import { AuthguardService } from './service/authguard.service';

const appRoutes: Routes = [
  { path : 'home', component : HomeComponent, canActivate : [AuthguardService]},
  { path : 'login', component : LoginComponent, canActivate : [AuthguardService] },
  { path : 'product/:id', component : ProductComponent, canActivate : [AuthguardService]},
  { path : '', redirectTo : '/login', pathMatch : 'full'},
  { path : '**', redirectTo : '/login', pathMatch : 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [ServiceService, AuthenticateService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
