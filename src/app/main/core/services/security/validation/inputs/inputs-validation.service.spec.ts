import { TestBed } from '@angular/core/testing';

import { InputsValidationService } from './inputs-validation.service';

describe('InputsValidationService', () => {
  let service: InputsValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputsValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
