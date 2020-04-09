import { Routes } from "@angular/router";
import { FillHoursComponent } from './fill-hours/fill-hours.component';
export const HoursRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: FillHoursComponent
      }
    ]
  }
];
