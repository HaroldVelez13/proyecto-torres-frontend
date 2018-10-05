import { SocialSecurityModule } from './social-security.module';

describe('SocialSecurityModule', () => {
  let socialSecurityModule: SocialSecurityModule;

  beforeEach(() => {
    socialSecurityModule = new SocialSecurityModule();
  });

  it('should create an instance', () => {
    expect(socialSecurityModule).toBeTruthy();
  });
});
