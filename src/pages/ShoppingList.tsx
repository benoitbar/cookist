import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMutation, useQuery } from 'convex/react';

import { api } from '../../convex/_generated/api';
import { Doc } from '../../convex/_generated/dataModel';
import { HeaderInput } from '../components/HeaderInput';
import { List } from '../components/List';
import { ShoppingItem } from '../components/ShoppingItem';

export const ShoppingList: React.FC = () => {
  const data = useQuery(api.shopping.getCollection);
  const create = useMutation(api.shopping.create);

  async function handleCreateItem(value: string) {
    const name = value.trim();
    await create({ name });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mes listes</IonTitle>
        </IonToolbar>
        <HeaderInput placeholder="Ajouter une liste" onAdd={handleCreateItem} />
      </IonHeader>
      <IonContent fullscreen>
        <List data={data} Item={ShoppingItem} />
      </IonContent>
    </IonPage>
  );
};
