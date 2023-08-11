import { useReducer } from 'react';

export enum Actions {
  START = 'START',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

interface State {
  isFailure: boolean;
  isFetching: boolean;
  isLoaded: boolean;
}

const initialState = {
  isFailure: false,
  isFetching: false,
  isLoaded: false,
};

function reducer(state: State, action: { type: Actions }): State {
  switch (action.type) {
    case Actions.START:
      return {
        isFailure: false,
        isFetching: true,
        isLoaded: false,
      };
    case Actions.SUCCESS:
      return {
        isFailure: false,
        isFetching: false,
        isLoaded: true,
      };
    case Actions.FAILURE:
      return {
        isFailure: true,
        isFetching: false,
        isLoaded: false,
      };
    default:
      throw new Error('Unknown action');
  }
}

export function useFlagsReducer() {
  return useReducer(reducer, initialState);
}
