import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselsFormComponent } from './carousels-form.component';

describe('CarouselsFormComponent', () => {
  let component: CarouselsFormComponent;
  let fixture: ComponentFixture<CarouselsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
