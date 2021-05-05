import { TimeZoneResponse } from '../../contracts/time-zones/time-zone-response';

export interface TimeZoneStateModel {
  timeZones: TimeZoneResponse[];
  isLoading: boolean;
}
