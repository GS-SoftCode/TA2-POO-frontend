import { TestBed } from '@angular/core/testing';

import { IngredientesService } from './ingredientes';

describe('Ingredientes', () => {
  let service: IngredientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
