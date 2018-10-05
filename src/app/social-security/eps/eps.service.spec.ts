import { TestBed, inject } from '@angular/core/testing';

import { EpsService } from './eps.service';

describe('EpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpsService]
    });
  });

  it('should be created', inject([EpsService], (service: EpsService) => {
    expect(service).toBeTruthy();
  }));
});
