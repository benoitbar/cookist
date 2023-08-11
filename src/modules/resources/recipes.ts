import {
  DocumentData,
  DocumentReference,
  FirestoreDataConverter,
  PartialWithFieldValue,
  UpdateData,
  collection,
  doc,
} from 'firebase/firestore';

import { useCollectionSnapshot } from '../hooks/useCollectionSnapshot';
import { useDetailSnapshot } from '../hooks/useDetailSnapshot';
import { useFirestore } from '../hooks/useFirestore';
import { useRemove } from '../hooks/useRemove';
import { useSet } from '../hooks/useSet';
import { useUpdate } from '../hooks/useUpdate';

export interface Recipe extends DocumentData {
  id: string;
  name: string;
  unit: number;
  ref: DocumentReference;
}

export type RecipeDb = Omit<Recipe, 'id' | 'ref'>;

export const converter: FirestoreDataConverter<Recipe, RecipeDb> = {
  toFirestore(recipe) {
    return {
      name: recipe.name,
      unit: recipe.unit || 4,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      unit: data.unit,
      ref: snapshot.ref,
    };
  },
};

const basePath = 'recipes';

export function useRecipeCollectionSnapshot() {
  const { db } = useFirestore();
  const ref = collection(db, basePath).withConverter(converter);
  return useCollectionSnapshot(ref);
}

export function useRecipeDetailSnapshot(id: string) {
  const { db } = useFirestore();
  const ref = doc(db, basePath, id).withConverter(converter);
  return useDetailSnapshot(ref);
}

export function useRecipeSet() {
  const { db } = useFirestore();
  const { set: baseSet, ...extra } = useSet<Recipe, RecipeDb>();

  function set(id: string, data: PartialWithFieldValue<Recipe>) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseSet(ref, data);
  }

  return { set, ...extra };
}

export function useRecipeUpdate() {
  const { db } = useFirestore();
  const { update: baseUpdate, ...extra } = useUpdate<Recipe, RecipeDb>();

  function update(id: string, data: UpdateData<Recipe>) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseUpdate(ref, data);
  }

  return { update, ...extra };
}

export function useRecipeRemove() {
  const { db } = useFirestore();
  const { remove: baseRemove, ...extra } = useRemove<Recipe, RecipeDb>();

  function remove(id: string) {
    const ref = doc(db, basePath, id).withConverter(converter);
    return baseRemove(ref);
  }

  return { remove, ...extra };
}
