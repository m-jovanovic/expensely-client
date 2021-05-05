import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { concatMap, finalize, map } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { NotificationService } from '@expensely/shared/services';
import { NotificationSettings } from '@expensely/shared/constants';
import {
  ApiErrorResponse,
  AuthenticationFacade,
  CurrencyFacade,
  CurrencyResponse,
  RouterService,
  TimeZoneResponse,
  UserFacade
} from '@expensely/core';
import { TimeZoneFacade } from '@expensely/core/store/time-zone';

@Component({
  selector: 'exp-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  private requestSent = false;
  setupForm: FormGroup;
  submitted = false;
  currencies$: Observable<CurrencyResponse[]>;
  timeZones$: Observable<TimeZoneResponse[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private authenticationFacade: AuthenticationFacade,
    private userFacade: UserFacade,
    private currencyFacade: CurrencyFacade,
    private timeZoneFacade: TimeZoneFacade,
    private routerService: RouterService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private translationService: TranslocoService
  ) {}

  ngOnInit(): void {
    if (this.authenticationFacade.userIsSetupComplete) {
      this.redirectToDashboard();

      return;
    }

    this.setupForm = this.formBuilder.group({
      currency: ['', Validators.required],
      timeZone: ['', Validators.required]
    });

    this.currencies$ = this.currencyFacade.currencies$;
    this.timeZones$ = this.timeZoneFacade.timeZones$;
    this.isLoading$ = combineLatest([this.currencyFacade.isLoading$, this.timeZoneFacade.isLoading$]).pipe(
      map(([currencyIsLoading, timeZoneIsLoading]) => currencyIsLoading || timeZoneIsLoading)
    );

    this.currencyFacade.loadCurrencies();
    this.timeZoneFacade.loadTimeZones();
  }

  onSubmit(): void {
    if (this.requestSent) {
      return;
    }

    this.submitted = true;

    if (this.setupForm.invalid) {
      this.requestSent = false;

      return;
    }

    this.requestSent = true;
    this.setupForm.disable();

    this.userFacade
      .addUserCurrency(this.setupForm.value.currency)
      .pipe(
        concatMap(() => this.userFacade.changeUserTimeZone(this.setupForm.value.timeZone)),
        concatMap(() => this.authenticationFacade.refreshToken()),
        finalize(() => {
          this.submitted = false;
          this.requestSent = false;
          this.setupForm.enable();
        })
      )
      .subscribe(
        () => this.redirectToDashboard(),
        (error: ApiErrorResponse) => this.handleSetupError(error)
      );
  }

  handleSetupError(errorResponse: ApiErrorResponse): void {
    if (errorResponse.hasErrors()) {
      this.notificationService.notify(this.translationService.translate('setup.errors.serverError'), NotificationSettings.defaultTimeout);
    }
  }

  private redirectToDashboard(): void {
    this.routerService.navigateByUrl('/dashboard');
  }
}
