import { IonItem, IonLabel, IonNote } from '@ionic/react';
import React from 'react';

import { Shopping } from '../modules/resources/shopping';

interface Props {
  item: Shopping;
}

export const ShoppingItem: React.FC<Props> = ({ item }) => {
  return (
    <IonItem lines="full" routerLink={`/shopping/${item.id}`}>
      <IonLabel>{item.name}</IonLabel>
      {/* <IonNote slot="end">{item.products.length}</IonNote> */}
    </IonItem>
  );
};
