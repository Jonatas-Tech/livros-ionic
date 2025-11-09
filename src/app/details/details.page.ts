import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule
  ]
})
export class DetailsPage implements OnInit {
  
  book: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBookDetails();
  }

  loadBookDetails() {
    this.loading = true;
    
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      // ✅ CORRIGIDO: Método e tipagem explícita
      this.bookService.getBookById(bookId).subscribe({ 
        next: (res: any) => { // Tipagem explícita
          this.book = res;
          this.loading = false;
        },
        error: (err: any) => { // Tipagem explícita
          this.error = 'Erro ao carregar os detalhes do livro.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'ID do livro não encontrado na rota.';
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigateByUrl('/home');
  }
}