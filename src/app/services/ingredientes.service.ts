import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ingrediente {
  id?: number;
  nombre: string;
  precio: number;
  cantidad: number;
  unidad?: string;
}

export interface IngredienteHistory {
  id: number;
  ingredientId: number;
  action: string;
  before: any;
  after: any;
  fecha: string;
}

@Injectable({providedIn: 'root'})
export class IngredientesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/ingredients';

  getIngredientes(): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(this.apiUrl);
  }

  buscarIngredientes(search: string): Observable<Ingrediente[]> {
    return this.http.get<Ingrediente[]>(`${this.apiUrl}?search=${search}`);
  }

  getHistorial(): Observable<IngredienteHistory[]> {
    return this.http.get<IngredienteHistory[]>(`${this.apiUrl}/history`);
  }

  addIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.post<Ingrediente>(this.apiUrl, ingrediente);
  }

  updateIngrediente(ingrediente: Ingrediente): Observable<Ingrediente> {
    return this.http.put<Ingrediente>(`${this.apiUrl}/${ingrediente.id}`, ingrediente);
  }

  deleteIngrediente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}