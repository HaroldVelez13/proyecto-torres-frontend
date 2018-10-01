import { CarouselsModule } from './carousels.module';

describe('CarouselsModule', () => {
  let carouselsModule: CarouselsModule;

  beforeEach(() => {
    carouselsModule = new CarouselsModule();
  });

  it('should create an instance', () => {
    expect(carouselsModule).toBeTruthy();
  });
});
