import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignCourseComponent } from './assign-course.component';
import { MaterialModule } from 'src/app/material.modules';
import { ListsModule } from '../modules/lists/lists.module';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [AssignCourseComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ListsModule,
    MatTabsModule
  ]
})

export class AssignCourseModule { }
