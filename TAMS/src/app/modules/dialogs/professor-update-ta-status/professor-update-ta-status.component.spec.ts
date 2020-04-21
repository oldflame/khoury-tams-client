import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorUpdateTaStatusComponent } from './professor-update-ta-status.component';

describe('ProfessorUpdateTaStatusComponent', () => {
  let component: ProfessorUpdateTaStatusComponent;
  let fixture: ComponentFixture<ProfessorUpdateTaStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorUpdateTaStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorUpdateTaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
