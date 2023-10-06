import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMutation, useQuery } from 'convex/react';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { EditableList } from '../components/editable-list/List';
import { HeaderInput } from '../components/HeaderInput';
import { ModalEditRecipe } from '../components/modals/EditRecipe';
import { RecipeItem } from '../components/RecipeItem';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const RecipeList: React.FC<Props> = () => {
  const data = useQuery(api.recipes.getCollection);
  const create = useMutation(api.recipes.create);
  const update = useMutation(api.recipes.update);
  const remove = useMutation(api.recipes.remove);

  async function handleCreateRecipe(value: string) {
    const name = value.trim();
    await create({ name: value, unit: 4 });
  }

  async function handleUpdateRecipe(
    oldItem: Doc<'recipes'>,
    newItem: Doc<'recipes'> | void
  ) {
    if (newItem) {
      const { _creationTime, ...data } = newItem;
      await update(data);
    } else {
      await remove({ _id: oldItem._id });
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
          data={data}
          Item={RecipeItem}
          Modal={ModalEditRecipe}
          onEdit={handleUpdateRecipe}
        />
      </IonContent>
    </IonPage>
  );
};
