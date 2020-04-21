import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule } from "@angular/router";
import { ProfileRoutes } from "./profile.routing";
import { MaterialModule } from 'src/app/material.modules';
import { FormsModule } from '@angular/forms';
import { ListsModule } from '../lists/lists.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(ProfileRoutes), MaterialModule, FormsModule, ListsModule],
})
export class ProfileModule {}
