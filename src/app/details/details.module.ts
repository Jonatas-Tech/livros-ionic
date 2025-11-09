// src/app/details/details.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

// ❌ REMOVA ESTA LINHA: Não precisa mais importar o componente standalone.
// import { DetailsPage } from './details.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule
  ],
  // ❌ REMOVA ESTE ARRAY: O componente é standalone.
  // declarations: [DetailsPage]
})
export class DetailsPageModule {}