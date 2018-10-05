import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionListComponent } from './pension-list.component';

describe('PensionListComponent', () => {
  let component: PensionListComponent;
  let fixture: ComponentFixture<PensionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
