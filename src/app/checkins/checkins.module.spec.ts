import { CheckinsModule } from './checkins.module';

describe('CheckinsModule', () => {
  let checkinsModule: CheckinsModule;

  beforeEach(() => {
    checkinsModule = new CheckinsModule();
  });

  it('should create an instance', () => {
    expect(checkinsModule).toBeTruthy();
  });
});
