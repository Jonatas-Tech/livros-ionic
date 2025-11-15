import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE = 'https://www.googleapis.com/books/v1';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiKey: string | null = null;

  constructor(private http: HttpClient) {}

  // ✅ CORRIGIDO: Agora aceita 3 argumentos (query, maxResults, startIndex)
  searchBooks(query: string, maxResults = 20, startIndex = 0): Observable<any> {
    let params = new HttpParams()
      .set('q', query)
      .set('maxResults', String(maxResults))
      .set('startIndex', String(startIndex)); // <--- Parâmetro de paginação adicionado
      
    if (this.apiKey) params = params.set('key', this.apiKey);
    
    return this.http.get(`${BASE}/volumes`, { params });
  }

  // pega detalhes por volumeId (GET)
  getBookById(volumeId: string): Observable<any> {
    let url = `${BASE}/volumes/${encodeURIComponent(volumeId)}`;
    if (this.apiKey) url += `?key=${this.apiKey}`;
    return this.http.get(url);
  }
}
