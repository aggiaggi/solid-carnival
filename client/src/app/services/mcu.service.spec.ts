import { TestBed, inject } from '@angular/core/testing';

import { McuService } from './mcu.service';

describe('McuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [McuService]
    });
  });

  it('should ...', inject([McuService], (service: McuService) => {
    expect(service).toBeTruthy();
  }));
});
