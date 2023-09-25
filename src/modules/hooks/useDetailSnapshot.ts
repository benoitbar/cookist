import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
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

export function useDetailSnapshot<
  AppModelType = DocumentData,
  DbModelType extends DocumentData = DocumentData
>(ref: DocumentReference<AppModelType, DbModelType>) {
  const [state, dispatch] = useReducer<
    Reducer<State<AppModelType>, Action<AppModelType>>
  >(reducer, initialState);
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
