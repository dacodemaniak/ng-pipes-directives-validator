import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialsPipe } from './pipes/initials.pipe';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    InitialsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HttpClientModule,
    InitialsPipe
  ]
})
export class SharedModule { }
