import {
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
} from 'firebase/firestore';
import { Reducer, useEffect, useReducer } from 'react';

import { Actions, useFlagsReducer } from './useFlagsReducer';

interface State<T> {
  data: T | void;
}

type Action<T> = {
  type: Actions.SUCCESS;
  snapshot: DocumentSnapshot<T>;
};

const initialState = {
  data: undefined,
};

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case Actions.SUCCESS:
      return {
        data: action.snapshot.data(),
      };
    default:
      throw new Error('Unknown action');
  }
}

export function useDetailSnapshot<T>(ref: DocumentReference<T>) {
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(
    reducer,
    initialState
  );
  const [flasState, flagDispatch] = useFlagsReducer();

  useEffect(() => {
    flagDispatch({ type: Actions.START });

    const unsub = onSnapshot(
      ref,
      snapshot => {
        flagDispatch({ type: Actions.SUCCESS });
        dispatch({ type: Actions.SUCCESS, snapshot });
      },
      error => {
        flagDispatch({ type: Actions.FAILURE });
        throw error;
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return { ...state, ...flasState };
}
