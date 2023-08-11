import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { EditableList } from '../components/editable-list/List';
import { HeaderInput } from '../components/HeaderInput';
import { ModalEditShopping } from '../components/modals/EditShopping';
import { ShoppingItem } from '../components/ShoppingItem';
import {
  useShoppingCollectionSnapshot,
  useShoppingSet,
} from '../modules/resources/shopping';
import { slugify } from '../utils/slugify';

export const ShoppingList: React.FC = () => {
  const { data } = useShoppingCollectionSnapshot();
  const { set } = useShoppingSet();

  async function handleCreateItem(value: string) {
    const name = value.trim();
    const id = slugify(name);
    await set(id, { name });
  }

  async function handleUpdateItem(item: any) {}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mes listes</IonTitle>
        </IonToolbar>
        <HeaderInput placeholder="Ajouter une liste" onAdd={handleCreateItem} />
      </IonHeader>
      <IonContent fullscreen>
        <EditableList
          data={data || []}
          Item={ShoppingItem}
          Modal={ModalEditShopping}
          onEdit={handleUpdateItem}
        />
      </IonContent>
    </IonPage>
  );
};
