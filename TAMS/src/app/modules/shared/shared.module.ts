import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { MaterialModule } from 'src/app/material.modules';



@NgModule({
  declarations: [NavbarComponent, MainNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    MainNavbarComponent
  ]
})
export class SharedModule { }
