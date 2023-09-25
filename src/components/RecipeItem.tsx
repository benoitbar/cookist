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

import { ModalChooseList } from '../components/modals/ChooseList';
import { Recipe } from '../modules/resources/recipes';

interface Props {
  item: Recipe;
}

export const RecipeItem: React.FC<Props> = ({ item }) => {
  const [present, dismiss] = useIonModal(ModalChooseList, {
    recipe: item,
    onDismiss: () => dismiss(),
  });

  function handleAddToList(evt: React.MouseEvent<HTMLIonButtonElement>) {
    evt.preventDefault();
    evt.stopPropagation();
    present({
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
  }

  return (
    <IonItem routerLink={`/recipes/${item.id}`}>
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
