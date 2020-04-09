import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseService } from "src/app/services/course.service";
import { Observable } from "rxjs";
import { Professor } from "src/app/models/professor";
import { FormsModule, Validators, FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import * as _ from 'lodash';

@Component({
  selector: "select-professor",
  templateUrl: "./select-professor.component.html",
  styleUrls: ["./select-professor.component.css"],
})
export class SelectProfessorComponent implements OnInit {
  professors: Professor[];
  professorControl = new FormControl("", [Validators.required]);
  filteredOptions: Observable<Professor[]>;

  constructor(
    private dialogRef: MatDialogRef<SelectProfessorComponent>,
    private coursesService: CourseService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {}

  ngOnInit(): void {
    this.coursesService.professors$.subscribe((professors: Professor[]) => {
      if (professors) {
        this.professors = _.uniqBy(professors, 'Instructors');
        this.initFilter();
      }
    });
    this.coursesService.getAllProfessors().subscribe();
  }

  initFilter() {
    this.filteredOptions = this.professorControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.Instructors)),
      map((filterText) =>
        filterText ? this._filter(filterText) : this.professors.slice()
      )
    );
  }

  displayFn(professor: Professor): string {
    return professor && professor.Instructors ? professor.Instructors : "";
  }

  private _filter(filterText: string): Professor[] {
    const filterValue = filterText.toLowerCase();
    return this.professors.filter(
      (prof: any) =>
        prof.Instructors &&
        prof.Instructors.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
