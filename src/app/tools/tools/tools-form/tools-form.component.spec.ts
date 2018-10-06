import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsFormComponent } from './tools-form.component';

describe('ToolsFormComponent', () => {
  let component: ToolsFormComponent;
  let fixture: ComponentFixture<ToolsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
