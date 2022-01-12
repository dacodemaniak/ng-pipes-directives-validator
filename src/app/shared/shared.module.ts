import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './pipes/initials.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordDirective } from './directives/show-hide-password.directive';



@NgModule({
  declarations: [
    InitialsPipe,
    ShowHidePasswordDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    InitialsPipe,
    ShowHidePasswordDirective
  ]
})
export class SharedModule { }
