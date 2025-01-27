import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ApplicationsComponent } from "./applications/applications.component";
import { TaAcceptPositionComponent } from "./ta-accept-position/ta-accept-position.component";
import { TaApplyPositionComponent } from "./ta-apply-position/ta-apply-position.component";
import { ApplicationRoutes } from './application.routing';
import { RouterModule } from "@angular/router";
import { MaterialModule } from 'src/app/material.modules';
import { ProfessorRetrieveApplicationsComponent } from './professor-retrieve-applications/professor-retrieve-applications.component';


@NgModule({
  declarations: [
    ApplicationsComponent,
    TaAcceptPositionComponent,
    TaApplyPositionComponent,
    ProfessorRetrieveApplicationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ApplicationRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class ApplicationModule {}
