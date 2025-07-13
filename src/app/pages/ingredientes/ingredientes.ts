import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientesService, Ingrediente } from '../../services/ingredientes.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientesHistoryComponent } from '../ingredientes-history/ingredientes-history';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ingredientes',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule, IngredientesHistoryComponent],
  templateUrl: './ingredientes.html'
})
export class IngredientesComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  form: FormGroup;
  idEditando: number | null = null;
  searchTerm: string = '';

  constructor(
    private ingredientesService: IngredientesService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      unidad: ['']
    });
  }

  ngOnInit(): void {
    this.cargarIngredientes();
  }

  cargarIngredientes() {
    this.ingredientesService.getIngredientes().subscribe(data => {
      this.ingredientes = data;
    });
  }

  buscarIngredientes() {
    if (this.searchTerm.trim()) {
      this.ingredientesService.buscarIngredientes(this.searchTerm).subscribe(data => {
        this.ingredientes = data;
      });
    } else {
      this.cargarIngredientes();
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const ingrediente: Ingrediente = {
      id: this.idEditando ?? undefined,
      ...this.form.value
    };

    const request$ = this.idEditando
      ? this.ingredientesService.updateIngrediente(ingrediente)
      : this.ingredientesService.addIngrediente(ingrediente);

    request$.subscribe(() => {
      this.cancelarEdicion();
      this.cargarIngredientes();
    });
  }

  editar(ingrediente: Ingrediente) {
    this.idEditando = ingrediente.id!;
    this.form.setValue({
      nombre: ingrediente.nombre,
      precio: ingrediente.precio,
      unidad: ingrediente.unidad
    });
  }

  cancelarEdicion() {
    this.idEditando = null;
    this.form.reset({ nombre: '', precio: 0, unidad: '' });
  }

  eliminar(id: number) {
    this.ingredientesService.deleteIngrediente(id).subscribe(() => {
      this.ingredientes = this.ingredientes.filter(i => i.id !== id);
    });
  }
}