import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';
import { ApiRoutes } from '../../constants/api-routes';
import { TimeZoneResponse } from '../../contracts/time-zones';

@Injectable({
  providedIn: 'root'
})
export class TimeZoneService extends ApiService {
  constructor(client: HttpClient) {
    super(client);
  }

  getTimeZones(): Observable<TimeZoneResponse[]> {
    return this.get(ApiRoutes.TimeZones.getTimeZones);
  }
}
