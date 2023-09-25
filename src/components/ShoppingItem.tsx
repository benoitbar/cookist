import { IonItem, IonLabel, IonNote } from '@ionic/react';
import React from 'react';

import { Doc } from '../../convex/_generated/dataModel';

interface Props {
  item: Doc<'shopping'>;
}

export const ShoppingItem: React.FC<Props> = ({ item }) => {
  return (
    <IonItem lines="full" routerLink={`/shopping/${item._id}`}>
      <IonLabel>{item.name}</IonLabel>
      {/* <IonNote slot="end">{item.products.length}</IonNote> */}
    </IonItem>
  );
};
