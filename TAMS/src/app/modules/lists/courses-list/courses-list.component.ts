import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import { Course } from "src/app/models/course";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormControl } from "@angular/forms";

@Component({
  selector: "courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent implements OnInit, OnChanges {
  @Input("coursesList") coursesList: Course[];
  @Input("enableShowAction") enableShowAction: boolean;
  @Input("showReviewButton") showReviewButton: boolean;
  @Output("viewDetails") viewDetails = new EventEmitter();
  @Output("assignProfessor") assignProfessor = new EventEmitter();

  displayedColumns: string[] = [
    "Title",
    "Course",
    "CRN",
    "Instructors",
    "Review",
  ];
  dataSource: MatTableDataSource<Course>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  showActionsControl = new FormControl(false);

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.coursesList);
    this.dataSource.paginator = this.paginator;
    this.showActionsControl.valueChanges.subscribe((value: boolean) => {
      if (value) {
        this.displayedColumns.push("actions");
      } else {
        this.displayedColumns.pop();
      }
    });
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

  onCourseRowClicked(CRN: string) {
    this.viewDetails.emit({ CRN });
  }

  assignProfessorClicked(event: any, course: Course) {
    this.assignProfessor.emit({
      course,
    });
    event.stopPropagation();
  }
}
