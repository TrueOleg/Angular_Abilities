import { Action } from '@ngrx/store';

export enum NumbersActionTypes {
  Add = '[Numbers Component] Add',
  Reset = '[Numbers Component] Reset',
}

export class Add implements Action {
  readonly type = NumbersActionTypes.Add;

  constructor(public payload: { number: string }) { }
}

export class Reset implements Action {
  readonly type = NumbersActionTypes.Reset;
}

export type NumberActions = Reset | Add;
