import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useMutation, useQuery } from 'convex/react';
import { checkmarkDone } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { HeaderInput } from '../components/HeaderInput';
import { List } from '../components/List';
import { ProductItemCheckable } from '../components/ProductItemCheckable';
import { extractQuantity } from '../utils/quantity';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const ShoppingDetail: React.FC<Props> = ({ match }) => {
  const removeBulk = useMutation(api.products.removeBulk);

  const id = match.params.id as Id<'shopping'>;
  const data = useQuery(api.shopping.get, { id });
  const create = useMutation(api.products.create);
  const isChecked =
    !!data?.products.length && data?.products.some(product => product.checked);

  async function handleCreateProduct(value: string) {
    const productName = value.trim();
    const { name, quantity } = extractQuantity(productName, '1');
    await create({
      name,
      parent: id,
      quantity,
    });
  }

  async function handleClean() {
    if (data) {
      removeBulk({
        ids: data.products
          .filter(product => product.checked)
          .map(product => product._id),
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
          {isChecked && (
            <IonButtons slot="end">
              <IonButton onClick={handleClean} size="small">
                <IonIcon icon={checkmarkDone} slot="icon-only"></IonIcon>
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
        <HeaderInput
          placeholder="Ajouter un produit"
          onAdd={handleCreateProduct}
        />
      </IonHeader>
      <IonContent fullscreen>
        <List data={data?.products || []} Item={ProductItemCheckable} />
      </IonContent>
    </IonPage>
  );
};
