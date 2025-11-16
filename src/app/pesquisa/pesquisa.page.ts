import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonInfiniteScroll, ModalController, IonContent } from '@ionic/angular'; 
import { BookService } from '../services/book.service';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { HighlightDirective } from '../directives/highlight.directive'; 
import { DetailsModalComponent } from '../details-modal/details-modal.component'; 

@Component({
  selector: 'app-pesquisa',
  templateUrl: 'pesquisa.page.html',
  styleUrls: ['pesquisa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TruncatePipe,
    
  ]
})
export class PesquisaPage implements OnInit { 
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll; 
  @ViewChild(IonContent) ionContent!: IonContent; // 👈 para controlar o scroll do conteúdo

  query = '';
  books: any[] = [];
  loading = false;
  error: string | null = null;
  
  startIndex = 0;
  maxResults = 10; 
  
  constructor(
    private bookService: BookService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (this.books.length === 0) {
      this.search(); 
    }
  }
  
  search() {
    this.startIndex = 0;
    this.books = [];
    
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
    this.loadBooks(true);
  }

  async loadBooks(isNewSearch: boolean, event?: any) {
    if (this.loading || !this.query.trim()) {
      if (event) event.target.complete();
      return;
    }
    
    this.loading = true;
    if (isNewSearch) this.error = null;

    // 👇 Captura a posição atual do scroll
    const scrollElement = await this.ionContent.getScrollElement();
    const currentScroll = scrollElement.scrollTop;

    this.bookService.searchBooks(this.query, this.maxResults, this.startIndex).subscribe({
      next: async (res: any) => { 
        this.loading = false;
        
        const newItems = res.items || [];

        // 👇 Usa spread apenas quando for carregamento incremental
        this.books = isNewSearch ? newItems : [...this.books, ...newItems];
        
        this.startIndex += this.maxResults;

        if (event) event.target.complete(); 
        
        if (newItems.length < this.maxResults && this.infiniteScroll) {
          this.infiniteScroll.disabled = true;
        }

        // 👇 Restaura posição anterior para não “subir”
        setTimeout(async () => {
          const el = await this.ionContent.getScrollElement();
          el.scrollTo({ top: currentScroll, behavior: 'auto' });
        }, 100);
      },
      error: (err: any) => { 
        this.loading = false;
        this.error = 'Erro ao buscar livros. Tente novamente.';
        console.error(err);
        if (event) event.target.complete(); 
      }
    });
  }

  loadMore(event: any) {
    this.loadBooks(false, event);
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

  // 👇 Mantém o DOM dos livros estável
  trackByBook(index: number, book: any) {
    return book.id || index;
  }
}

