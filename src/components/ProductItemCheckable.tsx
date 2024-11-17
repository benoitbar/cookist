import {
  IonButton,
  IonButtons,
  IonCol,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  useIonModal,
} from '@ionic/react';
import { useMutation } from 'convex/react';
import { add, checkmark, chevronDown, ellipse } from 'ionicons/icons';
import React, { SyntheticEvent } from 'react';
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

  // use a state to avoid delay when checking an item and be optimistic
  const [isChecked, setIsChecked] = React.useState(item.checked);

  const [color, setColor] = React.useState(item.color);

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

  function handleCheck() {
    update({ _id: item._id, checked: !isChecked });
    setIsChecked(prev => {
      return !prev;
    });
  }

  function handleSetColor(evt: SyntheticEvent<HTMLIonFabButtonElement>) {
    const color = (evt.target as HTMLIonFabButtonElement).color;
    setColor(color || 'light')
    update({ _id: item._id, color });
  }

  React.useEffect(() => {
    setIsChecked(item.checked);
  }, [item.checked]);

  React.useEffect(() => {
    setColor(item.color);
  }, [item.color]);

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
      <IonNote slot="end">
        {item.quantity}
      </IonNote>
      <IonNote slot="end">
        <IonFab horizontal='end' vertical="center">
          <IonFabButton size="small" color={color || 'light'} />
          <IonFabList side="start">
            <IonFabButton color="danger" onClick={handleSetColor} />
            <IonFabButton color="primary" onClick={handleSetColor} />
            <IonFabButton color="success" onClick={handleSetColor} />
            <IonFabButton color="light" onClick={handleSetColor} />
          </IonFabList>
        </IonFab>
      </IonNote>
    </IonItem>
  );
}, isEqual);
