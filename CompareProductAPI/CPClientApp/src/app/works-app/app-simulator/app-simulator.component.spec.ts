import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSimulatorComponent } from './app-simulator.component';

describe('AppSimulatorComponent', () => {
  let component: AppSimulatorComponent;
  let fixture: ComponentFixture<AppSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
