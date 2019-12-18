import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from "@angular/router";

import { SongsModalPageRoutingModule } from './songs-modal-routing.module';

import { SongsModalPage } from './songs-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SongsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SongsModalPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SongsModalPage]
})
export class SongsModalPageModule {}
