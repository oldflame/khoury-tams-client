import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routing';
import { MaterialModule } from 'src/app/material.modules';
import { ListsModule } from '../lists/lists.module';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UsersRoutes),
    MaterialModule,
    ListsModule
  ]
})
export class UsersModule { }
