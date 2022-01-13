import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './pipes/initials.pipe';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordDirective } from './directives/show-hide-password.directive';
import { IsRequiredDirective } from './directives/is-required.directive';
import { SortDirective } from './directives/sort.directive';



@NgModule({
  declarations: [
    InitialsPipe,
    ShowHidePasswordDirective,
    IsRequiredDirective,
    SortDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    InitialsPipe,
    ShowHidePasswordDirective,
    IsRequiredDirective,
    SortDirective
  ]
})
export class SharedModule { }
