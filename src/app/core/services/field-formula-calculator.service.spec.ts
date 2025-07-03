import { TestBed } from '@angular/core/testing';

import { FieldFormulaCalculatorService } from './field-formula-calculator.service';

describe('FieldFormulaCalculatorService', () => {
  let service: FieldFormulaCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldFormulaCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
