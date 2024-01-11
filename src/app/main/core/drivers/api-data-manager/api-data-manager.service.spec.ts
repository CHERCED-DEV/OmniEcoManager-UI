/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiDataManagerService } from './api-data-manager.service';

describe('Service: ApiDataManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiDataManagerService]
    });
  });

  it('should ...', inject([ApiDataManagerService], (service: ApiDataManagerService) => {
    expect(service).toBeTruthy();
  }));
});
