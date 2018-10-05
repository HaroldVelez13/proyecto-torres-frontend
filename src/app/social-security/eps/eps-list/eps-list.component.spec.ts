import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpsListComponent } from './eps-list.component';

describe('EpsListComponent', () => {
  let component: EpsListComponent;
  let fixture: ComponentFixture<EpsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
