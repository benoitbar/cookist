import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  useIonModal,
} from '@ionic/react';
import { useMutation } from 'convex/react';
import { cart } from 'ionicons/icons';
import React from 'react';

import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { ModalChooseList } from '../components/modals/ChooseList';
import { ModalEditRecipe } from './modals/EditRecipe';

interface Props {
  item: Doc<'recipes'>;
}

export const RecipeItem: React.FC<Props> = ({ item }) => {
  const update = useMutation(api.recipes.update);
  const remove = useMutation(api.recipes.remove);

  const [presentEdit, dismissEdit] = useIonModal(ModalEditRecipe, {
    item,
    onDismiss: async (newItem: Doc<'recipes'>) => {
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

  const [presentChoose, dismissChoose] = useIonModal(ModalChooseList, {
    onDismiss: () => dismissChoose(),
    products: [],
    recipe: item,
  });

  function handleAddToList(evt: React.MouseEvent<HTMLIonButtonElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    presentChoose({
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
