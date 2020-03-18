import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { MaterialModule } from 'src/app/material.modules';
import { ListsModule } from '../lists/lists.module';
import { DialogsModule } from '../dialogs/dialogs.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MaterialModule,
    ListsModule,
    DialogsModule
  ]
})
export class HomeModule { }
