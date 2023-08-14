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
  Shopping,
  useShoppingCollectionSnapshot,
  useShoppingRemove,
  useShoppingSet,
  useShoppingUpdate,
} from '../modules/resources/shopping';
import { slugify } from '../utils/slugify';

export const ShoppingList: React.FC = () => {
  const { data } = useShoppingCollectionSnapshot();
  const { set } = useShoppingSet();
  const { update } = useShoppingUpdate();
  const { remove } = useShoppingRemove();

  async function handleCreateItem(value: string) {
    const name = value.trim();
    const id = slugify(name);
    await set(id, { name });
  }

  async function handleUpdateItem(item: Shopping, data: Shopping | void) {
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
