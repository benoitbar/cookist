import { IonItem, IonLabel, useIonModal } from '@ionic/react';
import React from 'react';

import { Doc } from '../../convex/_generated/dataModel';
import { ModalEditShopping } from './modals/EditShopping';

interface Props {
  item: Doc<'shopping'>;
}

export const ShoppingItem: React.FC<Props> = ({ item }) => {
  const [presentEdit, dismissEdit] = useIonModal(ModalEditShopping, {
    dismiss: () => dismissEdit(),
    item,
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
