import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CurrencyResponse } from '@expensely/core';

@Component({
  selector: 'exp-setup-primary-currency',
  templateUrl: './setup-primary-currency.component.html',
  styleUrls: ['./setup-primary-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupPrimaryCurrencyComponent {
  @Input()
  parentFormGroup: FormGroup;

  @Input()
  currencies: CurrencyResponse[];

  @Input()
  submitted: boolean;

  constructor() {}
}
