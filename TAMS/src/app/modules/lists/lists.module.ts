import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { MaterialModule } from 'src/app/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListComponent } from './users-list/users-list.component';



@NgModule({
  declarations: [CoursesListComponent, UsersListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CoursesListComponent,
    UsersListComponent
  ]
})
export class ListsModule { }
