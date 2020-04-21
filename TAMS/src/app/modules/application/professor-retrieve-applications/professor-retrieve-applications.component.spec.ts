import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorRetrieveApplicationsComponent } from './professor-retrieve-applications.component';

describe('ProfessorRetrieveApplicationsComponent', () => {
  let component: ProfessorRetrieveApplicationsComponent;
  let fixture: ComponentFixture<ProfessorRetrieveApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorRetrieveApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorRetrieveApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
