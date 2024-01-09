/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BusEventService } from './bus-event.service';

describe('Service: BusEvent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusEventService]
    });
  });

  it('should ...', inject([BusEventService], (service: BusEventService) => {
    expect(service).toBeTruthy();
  }));
});
