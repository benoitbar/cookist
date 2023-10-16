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
import { ModalEditShopping } from '../components/modals/EditShopping';
import { ShoppingItem } from '../components/ShoppingItem';

export const ShoppingList: React.FC = () => {
  const data = useQuery(api.shopping.getCollection);
  const create = useMutation(api.shopping.create);
  const update = useMutation(api.shopping.update);
  const remove = useMutation(api.shopping.remove);

  async function handleCreateItem(value: string) {
    const name = value.trim();
    await create({ name });
  }

  async function handleUpdateItem(
    oldItem: Doc<'shopping'>,
    newItem: Doc<'shopping'> | void
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
