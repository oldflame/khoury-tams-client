import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed.component';
import { FeedRoutes } from './feed.routing';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';



@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FeedRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ]
})
export class FeedModule { }
