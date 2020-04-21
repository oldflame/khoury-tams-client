import { NgModule } from '@angular/core';
import { CommonModule, FormatWidth } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseReviewRoutes } from './course-review.routing';
import { MaterialModule } from 'src/app/material.modules';
import { FormsModule } from '@angular/forms';
import { CourseReviewComponent } from './course-review.component';



@NgModule({
  declarations: [CourseReviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CourseReviewRoutes),
    MaterialModule,
    FormsModule
  ]
})
export class CourseReviewModule { }
