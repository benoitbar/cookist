import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  PartialWithFieldValue,
  UpdateData,
  collection,
  doc,
  query,
  where,
} from 'firebase/firestore';

import { useCollectionSnapshot } from '../hooks/useCollectionSnapshot';
import { useDetailSnapshot } from '../hooks/useDetailSnapshot';
import { useFirestore } from '../hooks/useFirestore';
import { useRemove } from '../hooks/useRemove';
import { useSet } from '../hooks/useSet';
import { useUpdate } from '../hooks/useUpdate';
import { Recipe } from './recipes';
import { Shopping } from './shopping';

export interface Product extends DocumentData {
  id: string;
  checked: boolean;
  name: string;
  note?: string;
  parent: DocumentReference<Shopping | Recipe>;
  quantity: string;
}

export type ProductDb = Omit<Product, 'id'>;

const converter: FirestoreDataConverter<Product, ProductDb> = {
  toFirestore(product) {
    const data: DocumentData = {
      checked: product.checked || false,
      name: product.name,
      parent: product.parent,
      quantity: product.quantity || 1,
    };

    if (product.note) {
      data.note = product.note;
    }
    return data;
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const product: Product = {
      checked: data.checked,
      id: snapshot.id,
      name: data.name,
      parent: data.parent,
      quantity: data.quantity,
    };

    if (data.note) {
      product.note = data.note;
    }

    return product;
  },
};

const basePath = 'products';

export function useProductCollectionSnapshot(parent: DocumentReference) {
  const { db } = useFirestore();
  const ref = query(
    collection(db, basePath),
    where('parent', '==', parent)
  ).withConverter(converter);
  return useCollectionSnapshot(ref);
}

export function useProductDetailSnapshot(id: string) {
  const { db } = useFirestore();
  const ref = doc(db, basePath, id).withConverter(converter);
  return useDetailSnapshot(ref);
}

export function useProductSet() {
  const { db } = useFirestore();
  const { set: baseSet, ...extra } = useSet<Product, ProductDb>();

  function set(data: PartialWithFieldValue<Product>) {
    const ref = doc(collection(db, basePath)).withConverter(converter);
    return baseSet(ref, data);
  }

  return { set, ...extra };
}

export function useProductUpdate() {
  const { db } = useFirestore();
  const { update: baseUpdate, ...extra } = useUpdate<Product, ProductDb>();

  function update(id: string, data: UpdateData<Product>) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseUpdate(ref, data);
  }

  return { update, ...extra };
}

export function useProductRemove() {
  const { db } = useFirestore();
  const { remove: baseRemove, ...extra } = useRemove<Product, ProductDb>();

  function remove(id: string) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseRemove(ref);
  }

  return { remove, ...extra };
}
