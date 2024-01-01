/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CultureResolverService } from './culture-resolver.service';

describe('Service: CultureResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CultureResolverService]
    });
  });

  it('should ...', inject([CultureResolverService], (service: CultureResolverService) => {
    expect(service).toBeTruthy();
  }));
});
