import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseService } from "src/app/services/course.service";
import { Observable } from 'rxjs';
import { Professor } from 'src/app/models/professor';

@Component({
  selector: "select-professor",
  templateUrl: "./select-professor.component.html",
  styleUrls: ["./select-professor.component.css"],
})
export class SelectProfessorComponent implements OnInit {
  professors$: Observable<Professor[]>;

  constructor(
    private dialogRef: MatDialogRef<SelectProfessorComponent>,
    private coursesService: CourseService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {}

  ngOnInit(): void {
    this.professors$ = this.coursesService.professors$;
    this.coursesService.getAllProfessors().subscribe();
  }
}
