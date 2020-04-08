import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.css']
})
export class AssignCourseComponent implements OnInit {

  courses$: Observable<Course[]>;
  dialogRef;

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.courses$;
    // this.getAllCoursesNames();
    this.getCoursesByStream("1");
  }

  getAllCoursesNames() {
    this.courseService.getAllCourseNames()
    .subscribe();
  }

  getCoursesByStream(stream: string) {
    this.courseService.getCourseByStream(stream).subscribe();
  }

  tabChanged(eventArgs: MatTabChangeEvent) {
    // this.getAllCoursesNames();
    this.getCoursesByStream(eventArgs.index + 1 + "");
  }

  showCourseDetails(eventArgs: any) {
    console.log("Viewing Details", eventArgs);
  }
  
}
