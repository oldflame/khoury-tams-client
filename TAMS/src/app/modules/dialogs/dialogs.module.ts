import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { SelectProfessorComponent } from "./select-professor/select-professor.component";
import { MaterialModule } from "src/app/material.modules";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course/add-course.component';

@NgModule({
  declarations: [CourseDetailsComponent, SelectProfessorComponent, AddCourseComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [CourseDetailsComponent, SelectProfessorComponent, AddCourseComponent],
  entryComponents: [CourseDetailsComponent, SelectProfessorComponent, AddCourseComponent],
})
export class DialogsModule {}
