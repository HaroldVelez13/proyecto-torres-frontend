import { TestBed, inject } from '@angular/core/testing';

import { CarouselHomeService } from './carousel-home.service';

describe('CarouselHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarouselHomeService]
    });
  });

  it('should be created', inject([CarouselHomeService], (service: CarouselHomeService) => {
    expect(service).toBeTruthy();
  }));
});
