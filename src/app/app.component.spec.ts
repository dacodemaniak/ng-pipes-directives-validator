import { inject, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IntlModule } from './intl/intl.module';
import { IntlService } from './intl/services/intl.service';
import { SharedModule } from './shared/shared.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let service: IntlService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        SharedModule,
        IntlModule
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('');
  });
});
