/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataCenterService } from './data-center.service';

describe('Service: DataCenter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCenterService]
    });
  });

  it('should ...', inject([DataCenterService], (service: DataCenterService) => {
    expect(service).toBeTruthy();
  }));
});
