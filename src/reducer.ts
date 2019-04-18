import { Action, IState } from './store';

export default function reducer(
  state: IState | null | undefined,
  action: Action,
) {
  if (!state) {
    return null;
  }

  switch (action.type) {
    case 'UPDATE_AUTH_TOKEN': {
      return {
        ...state,
        authToken: action.payload
      };
    }

    case 'DELETE_AUTH_TOKEN': {
      return { ...state, authToken: '' };
    }

    default:
      return state;
  }
}
