import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule } from "@angular/router";
import { ProfileRoutes } from "./profile.routing";
import { MaterialModule } from 'src/app/material.modules';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, RouterModule.forChild(ProfileRoutes), MaterialModule, FormsModule],
})
export class ProfileModule {}
