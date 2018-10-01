import { EpsModule } from './eps.module';

describe('EpsModule', () => {
  let epsModule: EpsModule;

  beforeEach(() => {
    epsModule = new EpsModule();
  });

  it('should create an instance', () => {
    expect(epsModule).toBeTruthy();
  });
});
