// src/app/home/home.module.ts

import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Não precisamos importar o HomePage aqui se ele for standalone e roteado pelo módulo abaixo
// import { HomePage } from './home.page'; 
import { HomePageRoutingModule } from './home-routing.module'; 

// Importações dos recursos STANDALONE que a página usa
import { TruncatePipe } from '../pipes/truncate.pipe'; 
import { HighlightDirective } from '../directives/highlight.directive'; 

@NgModule({
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    // O HomePageRoutingModule já deve estar roteando a HomePage (que é standalone)
    HomePageRoutingModule,
    
    // O Pipe e a Diretiva ainda precisam ser importados no módulo que os utiliza
    TruncatePipe,     
    HighlightDirective
  ],
  // ❌ REMOVA ESTA LINHA: O componente HomePage é standalone e não pode ser declarado.
  // declarations: [HomePage]
})
export class HomePageModule {}