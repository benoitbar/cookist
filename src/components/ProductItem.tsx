import { IonItem, IonLabel, IonNote } from '@ionic/react';
import React from 'react';

import { Product } from '../modules/resources/products';

interface Props {
  item: Product;
}

export const ProductItem: React.FC<Props> = ({ item }) => {
  return (
    <IonItem lines="full">
      <IonLabel>
        {item.name}
        <br />
        <IonNote color="medium">{item.note}</IonNote>
      </IonLabel>
      <IonNote slot="end">{item.quantity}</IonNote>
    </IonItem>
  );
};
