import { TestBed, inject } from '@angular/core/testing';

import { RealtimeDataService } from './realtime-data.service';

describe('RealtimeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealtimeDataService]
    });
  });

  it('should ...', inject([RealtimeDataService], (service: RealtimeDataService) => {
    expect(service).toBeTruthy();
  }));
});
