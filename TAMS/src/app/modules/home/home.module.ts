import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { MaterialModule } from 'src/app/material.modules';
import { ListsModule } from '../lists/lists.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesFilterPipe } from 'src/app/pipes/courses-filter.pipe';



@NgModule({
  declarations: [HomeComponent, CoursesFilterPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MaterialModule,
    ListsModule,
    DialogsModule,
    SharedModule
  ]
})
export class HomeModule { }
