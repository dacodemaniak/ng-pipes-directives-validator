import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Injectable({
  providedIn: 'root'
})
export class IntlService {

  private _language: string;
  private _translateService: TranslateService;

  constructor() { }

  public get language(): string {
    return this._language;
  }

  public set language(language: string) {
    this._language = language;
    // @Todo reload translations as language change
    this._loadTranslations();
  }

  public get translateService(): TranslateService {
    return this._translateService;
  }

  public init(
    translateService: TranslateService,
    injector: Injector
  ): Promise<void> {
    return new Promise((resolve: any) => {
      //1. wait for LOCALIZATION_INITIALIZED token is ready
      injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null)
      ).then(() => {
        // Once token is ready, get navigator language
        const _navigatorLanguage: string = window.navigator.language;
        // Extract only minor language part of navigator language (fr-FR)
        const _userLanguage: string = _navigatorLanguage.split('-')[0];

        // Sets the inner property _language, default to 'fr'
        this._language = /(fr|en)/gi.test(_userLanguage) ? _userLanguage : 'fr';

        // Keep TranslateService
        this._translateService = translateService;

        // Can load translations now
        this._loadTranslations();

        resolve(null);
      })
    });
  }

  /**
   * Helpers methods
   */
  public static HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(
      httpClient,
      './assets/i18n/',
      '.json'
    );
  }

  public static initializerFactory(
    translateService: TranslateService,
    me: IntlService,
    injector: Injector
  ): {(): Promise<void>} {
    return (): Promise<void> => {
      return me.init(translateService, injector);
    }
  }

  private _loadTranslations(): void {
    this._translateService
      .use(this._language)
      .subscribe(() => {
        console.log(`Translations was loaded from ${this._language}`);
      },
      (error) => {
        throw new Error(`Something went wrong while fetching translations for ${this._language} : ${error}`);
      });
  }
}

export const intlProvider = {
  provide: APP_INITIALIZER,
  useFactory: IntlService.initializerFactory,
  deps: [
    TranslateService,
    IntlService,
    Injector
  ],
  multi: true
}
