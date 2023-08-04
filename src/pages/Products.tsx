import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';

import { EditableList } from '../components/editable-list/List';
import { HeaderInput } from '../components/HeaderInput';
import { ModalEditProduct } from '../components/modals/EditProduct';
import { shopping } from '../fixtures';
import { ProductItem } from '../components/ProductItem';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const Products: React.FC<Props> = ({ match }) => {
  const item = shopping[Number(match.params.id)];
  const products = item.products;
  products.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  function handleCreateProduct(value: string) {}
  function handleUpdateProduct(item: (typeof shopping)[number]) {}
  function handleDeleteProduct(item: (typeof shopping)[number]) {}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/shopping" />
          </IonButtons>
          <IonTitle>{item.name}</IonTitle>
        </IonToolbar>
        <HeaderInput
          placeholder="Ajouter un produit"
          onAdd={handleCreateProduct}
        />
      </IonHeader>
      <IonContent fullscreen>
        <EditableList
          data={products}
          Item={ProductItem}
          Modal={ModalEditProduct}
          onContextMenu={handleUpdateProduct}
          onSwipe={handleDeleteProduct}
        />
      </IonContent>
    </IonPage>
  );
};
