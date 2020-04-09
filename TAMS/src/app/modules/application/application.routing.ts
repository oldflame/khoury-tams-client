import { Routes } from "@angular/router";
import { ApplicationsComponent } from './applications/applications.component';
import { TaAcceptPositionComponent } from './ta-accept-position/ta-accept-position.component';

export const ApplicationRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: ApplicationsComponent
      },
      {
        path: "accept",
        component: TaAcceptPositionComponent
      }
    ]
  }
];
