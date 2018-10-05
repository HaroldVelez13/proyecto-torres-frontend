import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsFormComponent } from './eps-form.component';

describe('EpsFormComponent', () => {
  let component: EpsFormComponent;
  let fixture: ComponentFixture<EpsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
