import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input('coursesList') coursesList: Course[];
  displayedColumns: string[] = ["Title", "Course", "CRN", "stream", "Instructors"];

  constructor() { }

  ngOnInit(): void {
  }



}
