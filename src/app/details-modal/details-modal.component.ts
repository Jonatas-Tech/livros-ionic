import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetailsModalComponent {
  // Recebe o livro do componente pai (HomePage)
  @Input() selectedBook: any;

  constructor(private modalCtrl: ModalController) {}

  // Função para fechar o modal
  dismiss() {
    this.modalCtrl.dismiss();
  }
}