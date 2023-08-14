import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { EditableList } from '../components/editable-list/List';
import { HeaderInput } from '../components/HeaderInput';
import { ModalEditRecipe } from '../components/modals/EditRecipe';
import { RecipeItem } from '../components/RecipeItem';
import {
  Recipe,
  useRecipeCollectionSnapshot,
  useRecipeRemove,
  useRecipeSet,
  useRecipeUpdate,
} from '../modules/resources/recipes';
import { slugify } from '../utils/slugify';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const RecipeList: React.FC<Props> = () => {
  const { data } = useRecipeCollectionSnapshot();
  const { set } = useRecipeSet();
  const { update } = useRecipeUpdate();
  const { remove } = useRecipeRemove();

  async function handleCreateRecipe(value: string) {
    const name = value.trim();
    const id = slugify(name);
    await set(id, { name: value });
  }

  async function handleUpdateRecipe(item: Recipe, data: Recipe | void) {
    if (data) {
      await update(item.id, data);
    } else {
      await remove(item.id);
    }
  }

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
          data={data || []}
          Item={RecipeItem}
          Modal={ModalEditRecipe}
          onEdit={handleUpdateRecipe}
        />
      </IonContent>
    </IonPage>
  );
};
