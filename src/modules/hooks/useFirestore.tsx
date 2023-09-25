import { useContext } from 'react';

import { FirebaseContext } from '../contexts/FirebaseContext';

export function useFirestore() {
  const { db } = useContext(FirebaseContext);

  return { db };
}
