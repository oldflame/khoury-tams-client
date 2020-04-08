import { Component, OnInit, Input, EventEmitter, Output, ViewChild, SimpleChanges, AfterViewInit, OnChanges } from '@angular/core';
import { Course } from "src/app/models/course";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'professor-course-list',
  templateUrl: './professor-course-list.component.html',
  styleUrls: ['./professor-course-list.component.css']
})

export class ProfessorCourseList implements OnInit, AfterViewInit, OnChanges {

  @Input("coursesList") coursesList: Course[];
  @Output("viewDetails") viewDetails = new EventEmitter();

  displayedColumns: string[] = ["Title", "Course", "CRN", "Instructors"];
  dataSource: MatTableDataSource<Course>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  instructors = ["guneet", "tanveer", "anirudh"];
  editing = false;
  profSelected = new Object();

  constructor(private service: CourseService) {}

  ngOnInit(): void {
    this.service
      .getAllProfessors()
      .then(instructors => {
        this.instructors = instructors;
        console.log(this.instructors);

      });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.coursesList);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.coursesList && changes.coursesList.currentValue != null) {
      this.dataSource = new MatTableDataSource(
        changes.coursesList.currentValue
      );
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editClicked(element) {
    console.log("Hello, edit is clicked!");
    element.Instructors = '';

    console.log(element)
  }

  saveClicked(value) {
    this.editing = false;
    
    this.service.updateCourse

    console.log(this.profSelected);
    this.profSelected = '';
    console.log("Save was clicked!");
  }

  instructorChanged(value) {
    // this.profSelected = value;
    // console.log(value);
  }
}
