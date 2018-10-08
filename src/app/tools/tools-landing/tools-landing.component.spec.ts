import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLandingComponent } from './tools-landing.component';

describe('ToolsLandingComponent', () => {
  let component: ToolsLandingComponent;
  let fixture: ComponentFixture<ToolsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
