import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCourseList } from './professor-course-list.component';

describe('AssignCoursesComponent', () => {
  let component: ProfessorCourseList;
  let fixture: ComponentFixture<ProfessorCourseList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorCourseList ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorCourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
