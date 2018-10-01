import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionFormComponent } from './pension-form.component';

describe('PensionFormComponent', () => {
  let component: PensionFormComponent;
  let fixture: ComponentFixture<PensionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
