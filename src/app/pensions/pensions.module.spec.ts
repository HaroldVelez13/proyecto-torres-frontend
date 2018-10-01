import { PensionsModule } from './pensions.module';

describe('PensionsModule', () => {
  let pensionsModule: PensionsModule;

  beforeEach(() => {
    pensionsModule = new PensionsModule();
  });

  it('should create an instance', () => {
    expect(pensionsModule).toBeTruthy();
  });
});
