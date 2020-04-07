import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorCourseList } from './professor-course-list.component';
import { MaterialModule } from 'src/app/material.modules';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ProfessorCourseList],
  imports: [
    CommonModule,
    MaterialModule,
    MatTableModule
  ]
})

export class ProfessorCourseListModule { }
