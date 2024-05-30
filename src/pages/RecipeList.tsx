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
import { HeaderInput } from '../components/HeaderInput';
import { List } from '../components/List';
import { RecipeItem } from '../components/RecipeItem';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const RecipeList: React.FC<Props> = () => {
  const data = useQuery(api.recipes.getCollection);
  const create = useMutation(api.recipes.create);

  async function handleCreateRecipe(value: string) {
    const name = value.trim();
    await create({ name, unit: 4 });
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
        <List data={data} Item={RecipeItem} />
      </IonContent>
    </IonPage>
  );
};
