import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonInfiniteScroll, ModalController, IonContent } from '@ionic/angular'; 
import { BookService } from '../services/book.service';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { RippleEffectDirective } from '../directives/ripple-effect.directive';

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
    RippleEffectDirective,
    
  ]
})
export class HomePage implements OnInit {
  
  @ViewChild(IonContent) ionContent!: IonContent;

  // ============================
  //   ARRAYS DOS GÊNEROS
  // ============================
  top10Books: any[] = [];

  romanceBooks: any[] = [];
  fantasyBooks: any[] = [];
  scifiBooks: any[] = [];
  thrillerBooks: any[] = [];

  adventureBooks: any[] = [];
  horrorBooks: any[] = [];
  biographyBooks: any[] = [];
  poetryBooks: any[] = [];
  historyBooks: any[] = [];
  kidsBooks: any[] = [];

  mysteryBooks: any[] = [];
  dramaBooks: any[] = [];
  classicsBooks: any[] = [];
  selfhelpBooks: any[] = [];
  religionBooks: any[] = [];
  philosophyBooks: any[] = [];
  mangaBooks: any[] = [];
  comicsBooks: any[] = [];

  // ============================
  //   CONTADORES DE EXIBIÇÃO
  // ============================
  private readonly INITIAL_RESULTS = 10;
  private readonly MAX_INITIAL_RESULTS = 20;
  private readonly LOAD_MORE_COUNT = 10;

  romanceDisplayCount = this.INITIAL_RESULTS;
  fantasyDisplayCount = this.INITIAL_RESULTS;
  scifiDisplayCount = this.INITIAL_RESULTS;
  thrillerDisplayCount = this.INITIAL_RESULTS;

  adventureDisplayCount = this.INITIAL_RESULTS;
  horrorDisplayCount = this.INITIAL_RESULTS;
  biographyDisplayCount = this.INITIAL_RESULTS;
  poetryDisplayCount = this.INITIAL_RESULTS;
  historyDisplayCount = this.INITIAL_RESULTS;
  kidsDisplayCount = this.INITIAL_RESULTS;

  mysteryDisplayCount = this.INITIAL_RESULTS;
  dramaDisplayCount = this.INITIAL_RESULTS;
  classicsDisplayCount = this.INITIAL_RESULTS;
  selfhelpDisplayCount = this.INITIAL_RESULTS;
  religionDisplayCount = this.INITIAL_RESULTS;
  philosophyDisplayCount = this.INITIAL_RESULTS;
  mangaDisplayCount = this.INITIAL_RESULTS;
  comicsDisplayCount = this.INITIAL_RESULTS;

  // ============================
  //   LOADINGS
  // ============================
  loadingTop10 = false;

  loadingRomance = false;
  loadingFantasy = false;
  loadingScifi = false;
  loadingThriller = false;

  loadingAdventure = false;
  loadingHorror = false;
  loadingBiography = false;
  loadingPoetry = false;
  loadingHistory = false;
  loadingKids = false;

  loadingMystery = false;
  loadingDrama = false;
  loadingClassics = false;
  loadingSelfhelp = false;
  loadingReligion = false;
  loadingPhilosophy = false;
  loadingManga = false;
  loadingComics = false;

  error: string | null = null;

  constructor(
    private bookService: BookService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.loadTop10();

    this.loadRomance();
    this.loadFantasy();
    this.loadScifi();
    this.loadThriller();

    this.loadAdventure();
    this.loadHorror();
    this.loadBiography();
    this.loadPoetry();
    this.loadHistory();
    this.loadKids();

    this.loadMystery();
    this.loadDrama();
    this.loadClassics();
    this.loadSelfhelp();
    this.loadReligion();
    this.loadPhilosophy();
    this.loadManga();
    this.loadComics();
  }

  // ============================
  //   TOP 10
  // ============================
  loadTop10() {
    this.loadingTop10 = true;
    this.error = null;

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

  // ============================
  //   FUNÇÃO GENÉRICA
  // ============================
  private loadCategory(
    query: string,
    loadingVar: string,
    booksArray: string
  ) {
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

  // ============================
  //   CARREGADORES
  // ============================

  loadRomance() { this.loadCategory('subject:romance', 'loadingRomance', 'romanceBooks'); }
  loadFantasy() { this.loadCategory('subject:fantasy', 'loadingFantasy', 'fantasyBooks'); }
  loadScifi() { this.loadCategory('subject:"Science Fiction"', 'loadingScifi', 'scifiBooks'); }
  loadThriller() { this.loadCategory('subject:thriller', 'loadingThriller', 'thrillerBooks'); }

  loadAdventure() { this.loadCategory('subject:adventure', 'loadingAdventure', 'adventureBooks'); }
  loadHorror() { this.loadCategory('subject:horror', 'loadingHorror', 'horrorBooks'); }
  loadBiography() { this.loadCategory('subject:biography', 'loadingBiography', 'biographyBooks'); }
  loadPoetry() { this.loadCategory('subject:poetry', 'loadingPoetry', 'poetryBooks'); }
  loadHistory() { this.loadCategory('subject:history', 'loadingHistory', 'historyBooks'); }
  loadKids() { this.loadCategory('subject:children', 'loadingKids', 'kidsBooks'); }

  loadMystery() { this.loadCategory('subject:mystery', 'loadingMystery', 'mysteryBooks'); }
  loadDrama() { this.loadCategory('subject:drama', 'loadingDrama', 'dramaBooks'); }
  loadClassics() { this.loadCategory('subject:classics', 'loadingClassics', 'classicsBooks'); }
  loadSelfhelp() { this.loadCategory('subject:self-help', 'loadingSelfhelp', 'selfhelpBooks'); }
  loadReligion() { this.loadCategory('subject:religion', 'loadingReligion', 'religionBooks'); }
  loadPhilosophy() { this.loadCategory('subject:philosophy', 'loadingPhilosophy', 'philosophyBooks'); }
  loadManga() { this.loadCategory('subject:manga', 'loadingManga', 'mangaBooks'); }
  loadComics() { this.loadCategory('subject:comics', 'loadingComics', 'comicsBooks'); }

  // ============================
  //   LOAD MORE
  // ============================

  loadMoreBooks(category: string) {
    const property = category + 'DisplayCount';
    (this as any)[property] += this.LOAD_MORE_COUNT;
  }

  // ============================
  //   MODAL
  // ============================
  async openDetails(book: any) {
    const modal = await this.modalCtrl.create({
      component: DetailsModalComponent,
      componentProps: { selectedBook: book }
    });
    await modal.present();
  }

  trackByBook(index: number, book: any) {
    return book.id || index;
  }
}
