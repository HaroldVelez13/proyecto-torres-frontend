import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTotalComponent } from './tool-total.component';

describe('ToolTotalComponent', () => {
  let component: ToolTotalComponent;
  let fixture: ComponentFixture<ToolTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
