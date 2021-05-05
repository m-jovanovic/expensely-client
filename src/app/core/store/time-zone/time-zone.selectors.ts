import { Selector } from '@ngxs/store';

import { TimeZoneState } from './time-zone.state';
import { TimeZoneStateModel } from './time-zone-state.model';
import { TimeZoneResponse } from '../../contracts/time-zones/time-zone-response';

export class TimeZoneSelectors {
  @Selector([TimeZoneState])
  static getTimeZones(state: TimeZoneStateModel): TimeZoneResponse[] {
    return state.timeZones;
  }

  @Selector([TimeZoneState])
  static getIsLoading(state: TimeZoneStateModel): boolean {
    return state.isLoading;
  }
}
