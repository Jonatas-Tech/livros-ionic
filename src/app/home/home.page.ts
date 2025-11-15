// src/app/home/home.page.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonInfiniteScroll, ModalController, IonContent } from '@ionic/angular'; 
import { BookService } from '../services/book.service';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
// import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncatePipe,
  ]
})
export class HomePage implements OnInit {
  
  @ViewChild(IonContent) ionContent!: IonContent;

  // Variáveis para as seções da página inicial
  top10Books: any[] = [];
  romanceBooks: any[] = [];
  fantasyBooks: any[] = [];
  scifiBooks: any[] = []; 
  thrillerBooks: any[] = []; 
  
  // 🆕 VARIÁVEIS DE CONTROLE DE EXIBIÇÃO
  private readonly INITIAL_RESULTS = 10;
  private readonly MAX_INITIAL_RESULTS = 20; // Tenta carregar 20 para ter livros para "Ver Mais"
  private readonly LOAD_MORE_COUNT = 10;
  
  // Rastreia quantos livros estão visíveis (inicia com 10)
  romanceDisplayCount: number = this.INITIAL_RESULTS;
  fantasyDisplayCount: number = this.INITIAL_RESULTS;
  scifiDisplayCount: number = this.INITIAL_RESULTS;
  thrillerDisplayCount: number = this.INITIAL_RESULTS;

  // Status de carregamento para as seções
  loadingTop10 = false;
  loadingRomance = false;
  loadingFantasy = false; 
  loadingScifi = false;
  loadingThriller = false;
  
  error: string | null = null;
  // private readonly MAX_RESULTS = 10; // Variável substituída por INITIAL_RESULTS/MAX_INITIAL_RESULTS

  constructor(
    private bookService: BookService,
    private modalCtrl: ModalController,
    // private router: Router 
  ) {}

  ngOnInit() {
    this.loadTop10();
    this.loadRomance();
    this.loadFantasy();
    this.loadScifi(); 
    this.loadThriller(); 
  }
  
  // -------------------------------------------------------------------
  // --- FUNÇÕES DE CARREGAMENTO DE SEÇÕES ---
  // -------------------------------------------------------------------

  loadTop10() {
    this.loadingTop10 = true;
    this.error = null;
    
    // Usa o limite original de 10 para o TOP 10
    this.bookService.searchBooks('best-seller', this.INITIAL_RESULTS, 0).subscribe({
      next: (res: any) => {
        this.loadingTop10 = false;
        this.top10Books = res.items || [];
      },
      error: (err: any) => {
        this.loadingTop10 = false;
        this.error = 'Erro ao carregar o TOP 10.';
        console.error('Erro ao carregar TOP 10:', err);
      }
    });
  }
  
  // Função helper para carregamento (evita repetição)
  private loadCategory(
    query: string, 
    loadingVar: 'loadingRomance' | 'loadingFantasy' | 'loadingScifi' | 'loadingThriller',
    booksArray: 'romanceBooks' | 'fantasyBooks' | 'scifiBooks' | 'thrillerBooks',
  ) {
    // Carrega um número maior de resultados para permitir o "Ver Mais"
    (this as any)[loadingVar] = true;
    
    this.bookService.searchBooks(query, this.MAX_INITIAL_RESULTS, 0).subscribe({
      next: (res: any) => {
        (this as any)[loadingVar] = false;
        (this as any)[booksArray] = res.items || [];
      },
      error: (err: any) => {
        (this as any)[loadingVar] = false;
        console.error(`Erro ao carregar ${query}:`, err);
      }
    });
  }
  
  loadRomance() {
    this.loadCategory('subject:romance', 'loadingRomance', 'romanceBooks');
  }

  loadFantasy() {
    this.loadCategory('subject:fantasy', 'loadingFantasy', 'fantasyBooks');
  }

  loadScifi() {
    this.loadCategory('subject:"Science Fiction"', 'loadingScifi', 'scifiBooks');
  }
  
  loadThriller() {
    this.loadCategory('subject:thriller', 'loadingThriller', 'thrillerBooks');
  }

  // -------------------------------------------------------------------
  // --- FUNÇÕES DE INTERAÇÃO E NAVEGAÇÃO ---
  // -------------------------------------------------------------------

  /**
   * 🆕 Expande a lista de livros visíveis na mesma página.
   * @param category A chave da categoria a ser expandida.
   */
  loadMoreBooks(category: 'romance' | 'fantasy' | 'scifi' | 'thriller') {
    switch (category) {
      case 'romance':
        this.romanceDisplayCount += this.LOAD_MORE_COUNT;
        // Se a lista de livros já estiver completa na memória (MAX_INITIAL_RESULTS = 20),
        // o *ngFor exibirá até 20. Se não, você precisaria fazer outra chamada de API aqui.
        break;
      case 'fantasy':
        this.fantasyDisplayCount += this.LOAD_MORE_COUNT;
        break;
      case 'scifi':
        this.scifiDisplayCount += this.LOAD_MORE_COUNT;
        break;
      case 'thriller':
        this.thrillerDisplayCount += this.LOAD_MORE_COUNT;
        break;
    }
    console.log(`Exibindo agora até ${category}DisplayCount} livros em ${category}.`);
  }

  async openDetails(book: any) {
    const modal = await this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: {
        'selectedBook': book 
      }
    });
    await modal.present();
  }

  /**
   * Função que lida com o clique no botão "Ver Agora" do TOP 10.
   */

  trackByBook(index: number, book: any) {
    return book.id || index;
  }
}