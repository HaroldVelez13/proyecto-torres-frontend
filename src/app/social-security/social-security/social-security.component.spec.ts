import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSecurityComponent } from './social-security.component';

describe('SocialSecurityComponent', () => {
  let component: SocialSecurityComponent;
  let fixture: ComponentFixture<SocialSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
