import { Action } from '@ngrx/store';
import { NumberActions, NumbersActionTypes } from './numbers.actions';

export const initialState = { numbers: [] };

export function numbersReducer(state = initialState, action: NumberActions) {
  switch (action.type) {
    case NumbersActionTypes.Add:
      return { ...state, numbers: [...state.numbers, action.payload.number] };

    case NumbersActionTypes.Reset:
      return { ...state, numbers: [] };

    default:
      return state;
  }
}
