import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseSiteComponent } from './parse-site.component';

describe('ParseSiteComponent', () => {
  let component: ParseSiteComponent;
  let fixture: ComponentFixture<ParseSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParseSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
