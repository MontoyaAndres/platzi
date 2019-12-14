import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { LoginPageRoutingModule } from "./login-routing.module";

import { LoginPage } from "./login.page";

const routes: Routes = [
  {
    path: "",
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
