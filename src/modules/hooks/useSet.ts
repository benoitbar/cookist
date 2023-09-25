import {
  DocumentData,
  DocumentReference,
  PartialWithFieldValue,
  SetOptions,
  setDoc,
} from 'firebase/firestore';
import { Actions, useFlagsReducer } from './useFlagsReducer';

export function useSet<
  AppModelType = DocumentData,
  DbModelType extends DocumentData = DocumentData
>() {
  const [flasState, flagDispatch] = useFlagsReducer();

  async function set(
    ref: DocumentReference<AppModelType, DbModelType>,
    data: PartialWithFieldValue<AppModelType>,
    options: SetOptions = {}
  ) {
    flagDispatch({ type: Actions.START });

    try {
      await setDoc(ref, data, options);
      flagDispatch({ type: Actions.SUCCESS });
    } catch (error) {
      flagDispatch({ type: Actions.FAILURE });
      throw error;
    }
  }

  return { ...flasState, set };
}
