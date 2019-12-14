import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { RegisterPageRoutingModule } from "./register-routing.module";

import { RegisterPage } from "./register.page";

const routes: Routes = [
  {
    path: "",
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
