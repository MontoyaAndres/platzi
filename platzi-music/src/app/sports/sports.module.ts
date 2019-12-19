import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Routes, RouterModule } from "@angular/router";
import { AgmCoreModule } from "@agm/core";

import { SportsPageRoutingModule } from "./sports-routing.module";

import { SportsPage } from "./sports.page";

const routes: Routes = [
  {
    path: "",
    component: SportsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportsPageRoutingModule,
    AgmCoreModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SportsPage]
})
export class SportsPageModule {}
