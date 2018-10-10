import { TestBed, inject } from '@angular/core/testing';

import { CheckinService } from './checkin.service';

describe('CheckinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckinService]
    });
  });

  it('should be created', inject([CheckinService], (service: CheckinService) => {
    expect(service).toBeTruthy();
  }));
});
