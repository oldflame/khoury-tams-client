import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CourseDetailsComponent } from "./course-details/course-details.component";
import { SelectProfessorComponent } from './select-professor/select-professor.component';

@NgModule({
  declarations: [CourseDetailsComponent, SelectProfessorComponent],
  imports: [CommonModule],
  exports: [CourseDetailsComponent],
  entryComponents: [CourseDetailsComponent]
})
export class DialogsModule {}
