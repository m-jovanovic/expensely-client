import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TimeZoneStateModel } from './time-zone-state.model';
import { LoadTimeZones } from './time-zone.actions';
import { TimeZoneService } from '../../services/time-zone/time-zone.service';
import { TimeZoneResponse } from '../../contracts';

@State<TimeZoneStateModel>({
  name: 'time_zone',
  defaults: {
    timeZones: [],
    isLoading: false
  }
})
@Injectable()
export class TimeZoneState {
  constructor(private timeZoneService: TimeZoneService) {}

  @Action(LoadTimeZones)
  loadTimeZones(context: StateContext<TimeZoneStateModel>, action: LoadTimeZones): Observable<any> {
    context.patchState({
      isLoading: true
    });

    return this.timeZoneService.getTimeZones().pipe(
      tap((response: TimeZoneResponse[]) => {
        context.patchState({
          timeZones: response,
          isLoading: false
        });
      })
    );
  }
}
