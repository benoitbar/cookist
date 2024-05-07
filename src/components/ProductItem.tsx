import { IonItem, IonLabel, IonNote, useIonModal } from '@ionic/react';
import React from 'react';

import { Doc } from '../../convex/_generated/dataModel';
import { ModalEditProduct } from './modals/EditProduct';

import './ProductItem.css';

interface Props {
  item: Doc<'products'>;
}

export const ProductItem: React.FC<Props> = ({ item }) => {
  const [present, dismiss] = useIonModal(ModalEditProduct, {
    dismiss: () => dismiss(),
    item,
  });

  function handleContextMenu(evt: React.MouseEvent<HTMLIonItemElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    present({
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
  }

  return (
    <IonItem lines="full" onContextMenu={handleContextMenu}>
      <IonLabel>
        {item.name}
        <br />
        <IonNote color="medium">{item.note}</IonNote>
      </IonLabel>
      <IonNote slot="end">{item.quantity}</IonNote>
    </IonItem>
  );
};
