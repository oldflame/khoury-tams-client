import { ProfessorRetrieveApplicationsComponent } from './professor-retrieve-applications/professor-retrieve-applications.component';
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
      },
      {
        path: "view",
        component: ProfessorRetrieveApplicationsComponent
      }
    ]
  }
];
