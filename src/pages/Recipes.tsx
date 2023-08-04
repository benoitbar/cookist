import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { EditableList } from '../components/editable-list/List';
import { HeaderInput } from '../components/HeaderInput';
import { ModalEditName } from '../components/modals/EditName';
import { RecipeItem } from '../components/RecipeItem';
import { recipes } from '../fixtures';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const Recipes: React.FC<Props> = ({ history }) => {
  async function handleCreateRecipe(value: string) {}
  function handleUpdateRecipe(item: (typeof recipes)[number]) {}
  function handleDeleteRecipe(item: (typeof recipes)[number]) {}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mes Recettes</IonTitle>
        </IonToolbar>
        <HeaderInput
          placeholder="Ajouter une recette"
          onAdd={handleCreateRecipe}
        />
      </IonHeader>
      <IonContent fullscreen>
        <EditableList
          data={recipes}
          Item={RecipeItem}
          Modal={ModalEditName}
          onContextMenu={handleUpdateRecipe}
        />
      </IonContent>
    </IonPage>
  );
};
