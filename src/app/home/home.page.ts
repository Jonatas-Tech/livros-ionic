import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonInfiniteScroll, ModalController } from '@ionic/angular'; 
import { BookService } from '../services/book.service';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { HighlightDirective } from '../directives/highlight.directive'; 
import { DetailsModalComponent } from '../details-modal/details-modal.component'; 

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
    HighlightDirective,
    DetailsModalComponent
  ]
})
export class HomePage implements OnInit { 
  // Acessa o componente de scroll infinito no template
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll; 

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
    // ✅ CORREÇÃO FINAL: A busca inicial só é chamada se a lista estiver VAZIA.
    // Isso impede o reset em carregamentos subsequentes do componente.
    if (this.books.length === 0) {
        this.search(); 
    }
  }
  
  // Função para iniciar uma NOVA busca (reseta a lista)
  search() {
    this.startIndex = 0;
    this.books = []; // Zera a lista (correto apenas para nova busca manual)
    
    // Reabilita o scroll infinito
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
    this.loadBooks(true);
  }

  loadBooks(isNewSearch: boolean, event?: any) {
    // Evita chamadas se já estiver carregando ou a query for vazia
    if (this.loading || !this.query.trim()) {
      if (event) event.target.complete();
      return;
    }
    
    this.loading = true;
    if (isNewSearch) this.error = null;

    this.bookService.searchBooks(this.query, this.maxResults, this.startIndex).subscribe({
      next: (res: any) => { 
        this.loading = false;
        
        const newItems = res.items || [];

        // LÓGICA DE APPEND/REPLACE:
        // Se isNewSearch for TRUE (nova busca): substitui.
        // Se isNewSearch for FALSE (rolagem): ADICIONA.
        this.books = isNewSearch ? newItems : [...this.books, ...newItems];
        
        this.startIndex += this.maxResults;

        if (event) event.target.complete(); 
        
        // Desabilita o scroll infinito se não houver mais dados a carregar
        if (newItems.length < this.maxResults && this.infiniteScroll) {
             this.infiniteScroll.disabled = true;
        }
      },
      error: (err: any) => { 
        this.loading = false;
        this.error = 'Erro ao buscar livros. Tente novamente.';
        console.error(err);
        if (event) event.target.complete(); 
      }
    });
  }

  // Função para carregar mais dados (chamada pelo <ion-infinite-scroll>)
  loadMore(event: any) {
    // CRÍTICO: Passa 'false' para garantir que os dados sejam APENDIDOS.
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
  
}
