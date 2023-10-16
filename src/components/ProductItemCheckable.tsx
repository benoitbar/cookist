import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  useIonModal,
} from '@ionic/react';
import { useMutation } from 'convex/react';
import { checkmark, ellipse } from 'ionicons/icons';
import React from 'react';
import isEqual from 'react-fast-compare';

import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { ModalEditProduct } from './modals/EditProduct';

import './ProductItem.css';

interface Props {
  item: Doc<'products'>;
}

// Use memo to not render all the list items when checking only one item
export const ProductItemCheckable: React.FC<Props> = React.memo(({ item }) => {
  const update = useMutation(api.products.update);
  const remove = useMutation(api.products.remove);

  // use a state to avoid delay when checking an item and be optimistic
  const [isChecked, setIsChecked] = React.useState(item.checked);

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

  function handleCheck() {
    update({ _id: item._id, checked: !isChecked });
    setIsChecked(prev => {
      return !prev;
    });
  }

  React.useEffect(() => {
    setIsChecked(item.checked);
  }, [item.checked]);

  return (
    <IonItem
      className="ion-no-padding"
      lines="full"
      onContextMenu={handleContextMenu}
    >
      <IonButtons className="product-item-buttons" slot="start">
        <IonButton
          color={isChecked ? 'success' : 'light'}
          onClick={handleCheck}
          size="small"
        >
          <IonIcon
            icon={isChecked ? checkmark : ellipse}
            slot="icon-only"
          ></IonIcon>
        </IonButton>
      </IonButtons>
      <IonLabel color={isChecked ? 'medium' : undefined}>
        {item.name}
        <br />
        <IonNote color="medium">{item.note}</IonNote>
      </IonLabel>
      <IonNote slot="end">{item.quantity}</IonNote>
    </IonItem>
  );
}, isEqual);
