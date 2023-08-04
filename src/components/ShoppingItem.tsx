import { IonItem, IonLabel, IonNote } from '@ionic/react';
import React from 'react';

import { shopping } from '../fixtures';

interface Props {
  item: (typeof shopping)[number];
}

export const ShoppingItem: React.FC<Props> = ({ item }) => {
  return (
    <IonItem lines="full" routerLink={`/shopping/${item.id}`}>
      <IonLabel>{item.name}</IonLabel>
      <IonNote slot="end">{item.products.length}</IonNote>
    </IonItem>
  );
};
