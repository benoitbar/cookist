import { DocumentData, DocumentReference, deleteDoc } from 'firebase/firestore';
import { Actions, useFlagsReducer } from './useFlagsReducer';

export function useRemove<
  AppModelType = DocumentData,
  DbModelType extends DocumentData = DocumentData
>() {
  const [flasState, flagDispatch] = useFlagsReducer();

  async function remove(ref: DocumentReference<AppModelType, DbModelType>) {
    flagDispatch({ type: Actions.START });

    try {
      await deleteDoc(ref);
      flagDispatch({ type: Actions.SUCCESS });
    } catch (error) {
      flagDispatch({ type: Actions.FAILURE });
      throw error;
    }
  }

  return { ...flasState, remove };
}
