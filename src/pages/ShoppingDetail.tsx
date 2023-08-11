import {
  IonBackButton,
  IonButtons,
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
import { ModalEditProduct } from '../components/modals/EditProduct';
import { ProductItem } from '../components/ProductItem';
import {
  useShoppingDetailSnapshot,
  useShoppingRemove,
  useShoppingUpdate,
} from '../modules/resources/shopping';
import { extractQuantity } from '../utils/quantity';
import {
  useProductCollectionSnapshot,
  useProductSet,
} from '../modules/resources/products';
import { ProductList } from '../components/ProductList';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const ShoppingDetail: React.FC<Props> = ({ match }) => {
  const { data } = useShoppingDetailSnapshot(match.params.id);

  const { set } = useProductSet();

  async function handleCreateProduct(value: string) {
    if (data?.ref) {
      const productName = value.trim();
      const { name, quantity } = extractQuantity(productName, '1');
      await set({
        name,
        checked: false,
        parent: data?.ref,
        quantity,
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopping" />
          </IonButtons>
          <IonTitle>{data?.name}</IonTitle>
        </IonToolbar>
        <HeaderInput
          placeholder="Ajouter un produit"
          onAdd={handleCreateProduct}
        />
      </IonHeader>
      <IonContent fullscreen>
        {data?.ref ? <ProductList canSwipe parent={data?.ref} /> : null}
      </IonContent>
    </IonPage>
  );
};
