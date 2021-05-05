import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { LoadTimeZones } from './time-zone.actions';
import { TimeZoneSelectors } from './time-zone.selectors';
import { TimeZoneResponse } from '../../contracts/time-zones/time-zone-response';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneFacade {
  @Select(TimeZoneSelectors.getTimeZones)
  timeZones$: Observable<TimeZoneResponse[]>;

  @Select(TimeZoneSelectors.getIsLoading)
  isLoading$: Observable<boolean>;

  constructor(private store: Store) {}

  loadTimeZones(): Observable<any> {
    return this.store.dispatch(new LoadTimeZones());
  }
}
