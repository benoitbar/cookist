import {
  DocumentData,
  DocumentReference,
  UpdateData,
  updateDoc,
} from 'firebase/firestore';
import { Actions, useFlagsReducer } from './useFlagsReducer';

export function useUpdate<
  AppModelType = DocumentData,
  DbModelType extends DocumentData = DocumentData
>() {
  const [flasState, flagDispatch] = useFlagsReducer();

  async function update(
    ref: DocumentReference<AppModelType, DbModelType>,
    data: UpdateData<DbModelType>
  ) {
    flagDispatch({ type: Actions.START });

    try {
      await updateDoc(ref, data);
      flagDispatch({ type: Actions.SUCCESS });
    } catch (error) {
      flagDispatch({ type: Actions.FAILURE });
      throw error;
    }
  }

  return { ...flasState, update };
}
