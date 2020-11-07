import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDataFromExternalComponent } from './get-data-from-external.component';

describe('GetDataFromExternalComponent', () => {
  let component: GetDataFromExternalComponent;
  let fixture: ComponentFixture<GetDataFromExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDataFromExternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetDataFromExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
