import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { intlProvider, IntlService } from './services/intl.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: IntlService.HttpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    intlProvider
  ]
})
export class IntlModule { }
