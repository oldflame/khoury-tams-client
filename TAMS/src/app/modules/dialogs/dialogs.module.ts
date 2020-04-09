import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { SelectProfessorComponent } from "./select-professor/select-professor.component";
import { MaterialModule } from "src/app/material.modules";

@NgModule({
  declarations: [CourseDetailsComponent, SelectProfessorComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CourseDetailsComponent, SelectProfessorComponent],
  entryComponents: [CourseDetailsComponent, SelectProfessorComponent],
})
export class DialogsModule {}
