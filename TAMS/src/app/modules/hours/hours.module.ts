import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoursRoutes } from './hours.routing';
import { MaterialModule } from 'src/app/material.modules';
import { ListsModule } from '../lists/lists.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DayCardComponent } from './day-card/day-card.component';
import { FillHoursComponent } from './fill-hours/fill-hours.component';



@NgModule({
  declarations: [DayCardComponent, FillHoursComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HoursRoutes),
    MaterialModule,
    ListsModule,
    DialogsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HoursModule { }
