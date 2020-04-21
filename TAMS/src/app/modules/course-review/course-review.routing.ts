import { Routes } from "@angular/router";
import { CourseReviewComponent } from './course-review.component';
export const CourseReviewRoutes: Routes = [
  {
    path: ":courseId",
    children: [
      {
        path: "",
        component: CourseReviewComponent
      }
    ]
  }
];
