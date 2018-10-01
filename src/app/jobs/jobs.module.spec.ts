import { JobsModule } from './jobs.module';

describe('JobsModule', () => {
  let jobsModule: JobsModule;

  beforeEach(() => {
    jobsModule = new JobsModule();
  });

  it('should create an instance', () => {
    expect(jobsModule).toBeTruthy();
  });
});
