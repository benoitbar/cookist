import { IonItem, IonLabel, IonNote } from '@ionic/react';
import React from 'react';

import { recipes, shopping } from '../fixtures';

interface Props {
  item: (typeof shopping | typeof recipes)[number]['products'][number];
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
