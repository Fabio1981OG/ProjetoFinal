import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly baseUrl = 'http://localhost:8080/produto'

  constructor(private http: HttpClient) { }


  buscarPorcodigo(codigo: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/${codigo}`);
  }


  listarTodos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}`)
  }


  salvarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.baseUrl}`, produto)
  }


  atualizarProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${this.baseUrl}/${produto.codigo}`, produto)
  }


  deletarProduto(codigo: any): Observable<Produto> {
    return this.http.delete<Produto>(`${this.baseUrl}/${codigo}`)
  }

}
