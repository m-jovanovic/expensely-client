import { Injectable } from '@angular/core';
import { State, StateContext, Action } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { initialState, UserStateModel } from './user-state.model';
import { LoadUserCurrencies, AddUserCurrency, ChangeUserPrimaryCurrency, ChangeUserTimeZone, SetupUser } from './user.actions';
import { UserService } from '../../../core/services';
import { ApiErrorResponse, SetupUserRequest, UserCurrencyResponse } from '../../contracts';

@State<UserStateModel>({
  name: 'user',
  defaults: initialState
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Action(LoadUserCurrencies)
  loadUserCurrencies(context: StateContext<UserStateModel>, action: LoadUserCurrencies): Observable<any> {
    context.patchState({
      isLoading: true
    });

    return this.userService.getUserCurrencies(action.userId).pipe(
      tap((response: UserCurrencyResponse[]) => {
        context.patchState({
          currencies: response,
          isLoading: false
        });
      }),
      catchError((error: ApiErrorResponse) => {
        context.patchState({
          isLoading: false,
          error: true
        });

        return throwError(error);
      })
    );
  }

  @Action(AddUserCurrency)
  addUserCurrency(context: StateContext<UserStateModel>, action: AddUserCurrency): Observable<any> {
    context.patchState({
      isLoading: true
    });

    return this.userService.addUserCurrency(action.userId, action.currency).pipe(
      tap(() => {
        context.patchState({
          isLoading: false
        });
      }),
      catchError((error: ApiErrorResponse) => {
        context.patchState({
          isLoading: false,
          error: true
        });

        return throwError(error);
      })
    );
  }

  @Action(ChangeUserPrimaryCurrency)
  changeUserPrimaryCurrency(context: StateContext<UserStateModel>, action: ChangeUserPrimaryCurrency): Observable<any> {
    context.patchState({
      isLoading: true
    });

    return this.userService.changeUserPrimaryCurrency(action.userId, action.currency).pipe(
      tap(() => {
        context.patchState({
          isLoading: false
        });
      }),
      catchError((error: ApiErrorResponse) => {
        context.patchState({
          isLoading: false,
          error: true
        });

        return throwError(error);
      })
    );
  }

  @Action(ChangeUserTimeZone)
  changeUserTimeZone(context: StateContext<UserStateModel>, action: ChangeUserTimeZone): Observable<any> {
    context.patchState({
      isLoading: true
    });

    return this.userService.changeUserTimeZone(action.userId, action.timeZoneId).pipe(
      tap(() => {
        context.patchState({
          isLoading: false
        });
      }),
      catchError((error: ApiErrorResponse) => {
        context.patchState({
          isLoading: false,
          error: true
        });

        return throwError(error);
      })
    );
  }

  @Action(SetupUser)
  setupUser(context: StateContext<UserStateModel>, action: SetupUser): Observable<any> {
    context.patchState({
      isLoading: true
    });

    return this.userService.setupUser(action.userId, new SetupUserRequest(action.currency, action.timeZoneId)).pipe(
      tap(() => {
        context.patchState({
          isLoading: false
        });
      }),
      catchError((error: ApiErrorResponse) => {
        context.patchState({
          isLoading: false,
          error: true
        });

        return throwError(error);
      })
    );
  }
}
