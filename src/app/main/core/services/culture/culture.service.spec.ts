/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CultureService } from './culture.service';

describe('Service: Culture', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CultureService]
    });
  });

  it('should ...', inject([CultureService], (service: CultureService) => {
    expect(service).toBeTruthy();
  }));
});
