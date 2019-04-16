
import { createStore } from 'redux';
import reducer from './reducer';

export interface IState {
  authToken: string
}

export type Action =
  | {
    type: 'UPDATE_AUTH_TOKEN';
    payload: string;
  }
  | {
    type: 'DELETE_AUTH_TOKEN';
  };

export function makeStore() {
  return createStore(reducer, {
    authToken: ''
  });
}
