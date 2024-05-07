import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  useIonModal,
} from '@ionic/react';
import { cart } from 'ionicons/icons';
import React from 'react';

import { Doc } from '../../convex/_generated/dataModel';
import { ModalChooseList } from '../components/modals/ChooseList';
import { ModalEditRecipe } from './modals/EditRecipe';

interface Props {
  item: Doc<'recipes'>;
}

export const RecipeItem: React.FC<Props> = ({ item }) => {
  const [presentEdit, dismissEdit] = useIonModal(ModalEditRecipe, {
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

  const [presentChoose, dismissChoose] = useIonModal(ModalChooseList, {
    dismiss: () => dismissChoose(),
    products: [],
    recipe: item,
  });

  function handleAddToList(evt: React.MouseEvent<HTMLIonButtonElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    presentChoose({
      async canDismiss(data, role) {
        return role !== 'gesture';
      },
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
  }

  return (
    <IonItem
      onContextMenu={handleContextMenu}
      routerLink={`/recipes/${item._id}`}
    >
      <IonLabel>
        {item.name} {}
      </IonLabel>
      <IonButtons slot="end">
        <IonButton color="primary" onClick={handleAddToList}>
          <IonIcon slot="icon-only" icon={cart} />
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};
