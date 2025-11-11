import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DetailsModalComponent {
  @Input() selectedBook: any;

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }

  // Novo método para abrir o link do livro
  openBookLink(url: string) {
    if (url) {
      window.open(url, '_system'); // Abre o link em um navegador externo no Ionic
      // Ou window.open(url, '_blank'); para um novo tab no navegador web
    }
  }
}