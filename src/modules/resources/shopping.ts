import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  PartialWithFieldValue,
  UpdateData,
  WithFieldValue,
  collection,
  doc,
} from 'firebase/firestore';

import { useCollectionSnapshot } from '../hooks/useCollectionSnapshot';
import { useDetailSnapshot } from '../hooks/useDetailSnapshot';
import { useFirestore } from '../hooks/useFirestore';
import { useRemove } from '../hooks/useRemove';
import { useSet } from '../hooks/useSet';
import { useUpdate } from '../hooks/useUpdate';

export interface Shopping extends DocumentData {
  id: string;
  name: string;
  ref: DocumentReference;
}

export type ShoppingDb = Omit<Shopping, 'id' | 'ref'>;

const converter: FirestoreDataConverter<Shopping, ShoppingDb> = {
  toFirestore(shopping) {
    return {
      name: shopping.name,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      ref: snapshot.ref,
    };
  },
};

const basePath = 'shopping';

export function useShoppingCollectionSnapshot() {
  const { db } = useFirestore();
  const ref = collection(db, basePath).withConverter(converter);
  return useCollectionSnapshot(ref);
}

export function useShoppingDetailSnapshot(id: string) {
  const { db } = useFirestore();
  const ref = doc(db, basePath, id).withConverter(converter);
  return useDetailSnapshot(ref);
}

export function useShoppingSet() {
  const { db } = useFirestore();
  const { set: baseSet, ...extra } = useSet<Shopping, ShoppingDb>();

  function set(id: string, data: PartialWithFieldValue<Shopping>) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseSet(ref, data);
  }

  return { set, ...extra };
}

export function useShoppingUpdate() {
  const { db } = useFirestore();
  const { update: baseUpdate, ...extra } = useUpdate<Shopping, ShoppingDb>();

  function update(id: string, data: UpdateData<Shopping>) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseUpdate(ref, data);
  }

  return { update, ...extra };
}

export function useShoppingRemove() {
  const { db } = useFirestore();
  const { remove: baseRemove, ...extra } = useRemove<Shopping, ShoppingDb>();

  function remove(id: string) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseRemove(ref);
  }

  return { remove, ...extra };
}
