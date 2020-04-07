import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCoursesComponent } from './professor-course-list.component';

describe('AssignCoursesComponent', () => {
  let component: AssignCoursesComponent;
  let fixture: ComponentFixture<AssignCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
