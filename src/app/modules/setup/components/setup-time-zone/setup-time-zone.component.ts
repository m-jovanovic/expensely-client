import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TimeZoneResponse } from '@expensely/core';

@Component({
  selector: 'exp-setup-time-zone',
  templateUrl: './setup-time-zone.component.html',
  styleUrls: ['./setup-time-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetupTimeZoneComponent {
  @Input()
  parentFormGroup: FormGroup;

  @Input()
  timeZones: TimeZoneResponse[];

  @Input()
  submitted: boolean;

  constructor() {}
}
