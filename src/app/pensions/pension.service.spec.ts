import { TestBed, inject } from '@angular/core/testing';

import { PensionService } from './pension.service';

describe('PensionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PensionService]
    });
  });

  it('should be created', inject([PensionService], (service: PensionService) => {
    expect(service).toBeTruthy();
  }));
});
