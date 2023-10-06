import {
  IonBackButton,
  IonButtons,
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
import { Id } from '../../convex/_generated/dataModel';
import { HeaderInput } from '../components/HeaderInput';
import { extractQuantity } from '../utils/quantity';
import { ProductList } from '../components/ProductList';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const ShoppingDetail: React.FC<Props> = ({ match }) => {
  const id = match.params.id as Id<'shopping'>;
  const data = useQuery(api.shopping.get, { id });
  const create = useMutation(api.products.create);

  async function handleCreateProduct(value: string) {
    const productName = value.trim();
    const { name, quantity } = extractQuantity(productName, '1');
    await create({
      name,
      parent: id,
      quantity,
    });
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
        <ProductList canSwipe data={data?.products || []} />
      </IonContent>
    </IonPage>
  );
};
