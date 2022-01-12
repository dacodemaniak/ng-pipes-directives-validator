import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './pipes/initials.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordDirective } from './directives/show-hide-password.directive';
import { IsRequiredDirective } from './directives/is-required.directive';



@NgModule({
  declarations: [
    InitialsPipe,
    ShowHidePasswordDirective,
    IsRequiredDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    InitialsPipe,
    ShowHidePasswordDirective,
    IsRequiredDirective
  ]
})
export class SharedModule { }
