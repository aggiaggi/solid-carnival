import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMotorComponent } from './view-motor.component';

describe('ViewMotorComponent', () => {
  let component: ViewMotorComponent;
  let fixture: ComponentFixture<ViewMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
