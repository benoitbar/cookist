import { IonItem, IonLabel, IonNote, useIonModal } from '@ionic/react';
import { useMutation } from 'convex/react';
import React from 'react';

import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { ModalEditProduct } from './modals/EditProduct';

import './ProductItem.css';

interface Props {
  item: Doc<'products'>;
}

export const ProductItem: React.FC<Props> = ({ item }) => {
  const update = useMutation(api.products.update);
  const remove = useMutation(api.products.remove);

  const [present, dismiss] = useIonModal(ModalEditProduct, {
    item,
    onDismiss: async (newItem: Doc<'products'>) => {
      if (newItem) {
        const { _creationTime, parent, ...data } = newItem;
        await update(data);
      } else {
        await remove({ _id: item._id });
      }
      dismiss();
    },
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
