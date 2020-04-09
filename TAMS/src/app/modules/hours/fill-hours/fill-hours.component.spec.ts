import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillHoursComponent } from './fill-hours.component';

describe('FillHoursComponent', () => {
  let component: FillHoursComponent;
  let fixture: ComponentFixture<FillHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
