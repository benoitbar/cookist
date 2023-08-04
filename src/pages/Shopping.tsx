import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { EditableList } from '../components/editable-list/List';
import { HeaderInput } from '../components/HeaderInput';
import { ModalEditName } from '../components/modals/EditName';
import { ShoppingItem } from '../components/ShoppingItem';
import { shopping } from '../fixtures';

export const Shopping: React.FC = () => {
  async function handleCreateItem(value: string) {}
  async function handleUpdateItem(item: (typeof shopping)[number]) {}

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
          data={shopping}
          Item={ShoppingItem}
          Modal={ModalEditName}
          onContextMenu={handleUpdateItem}
        />
      </IonContent>
    </IonPage>
  );
};
