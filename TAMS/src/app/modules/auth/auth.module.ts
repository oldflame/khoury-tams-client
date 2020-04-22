import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routing';
import { MaterialModule } from 'src/app/material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivacyComponent } from './privacy/privacy.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, PrivacyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
