import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientesService, IngredienteHistory } from '../../services/ingredientes.service';

@Component({
  standalone: true,
  selector: 'app-ingredientes-history',
  imports: [CommonModule],
  templateUrl: './ingredientes-history.html'
})
export class IngredientesHistoryComponent implements OnInit {
  historial: IngredienteHistory[] = [];

  constructor(private ingredientesService: IngredientesService) {}

  ngOnInit() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.ingredientesService.getHistorial().subscribe(data => {
      this.historial = data;
    });
  }
}