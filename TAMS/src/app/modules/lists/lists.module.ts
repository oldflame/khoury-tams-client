import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { MaterialModule } from 'src/app/material.modules';



@NgModule({
  declarations: [CoursesListComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CoursesListComponent
  ]
})
export class ListsModule { }
