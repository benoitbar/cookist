import { IonItem, IonLabel, IonNote, useIonModal } from '@ionic/react';
import React from 'react';

import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { ModalEditShopping } from './modals/EditShopping';

interface Props {
  item: Doc<'shopping'>;
}

export const ShoppingItem: React.FC<Props> = ({ item }) => {
  const update = useMutation(api.shopping.update);
  const remove = useMutation(api.shopping.remove);

  const [presentEdit, dismissEdit] = useIonModal(ModalEditShopping, {
    item,
    onDismiss: async (newItem: Doc<'shopping'>) => {
      if (newItem) {
        const { _creationTime, ...data } = newItem;
        await update(data);
      } else {
        await remove({ _id: item._id });
      }
      dismissEdit();
    },
  });

  function handleContextMenu(evt: React.MouseEvent<HTMLIonItemElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    presentEdit({
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
  }

  return (
    <IonItem
      lines="full"
      onContextMenu={handleContextMenu}
      routerLink={`/shopping/${item._id}`}
    >
      <IonLabel>{item.name}</IonLabel>
      {/* <IonNote slot="end">{item.products.length}</IonNote> */}
    </IonItem>
  );
};
