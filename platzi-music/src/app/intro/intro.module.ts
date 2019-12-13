import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";

import { IntroPageRoutingModule } from "./intro-routing.module";

import { IntroPage } from "./intro.page";

const routes: Routes = [
  {
    path: "",
    component: IntroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntroPage]
})
export class IntroPageModule {}
