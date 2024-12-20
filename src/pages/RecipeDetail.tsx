import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
} from '@ionic/react';
import { useMutation, useQuery } from 'convex/react';
import { cart } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { HeaderInput } from '../components/HeaderInput';
import { List } from '../components/List';
import { ModalChooseList } from '../components/modals/ChooseList';
import { ProductItem } from '../components/ProductItem';
import { extractQuantity } from '../utils/quantity';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const RecipeDetail: React.FC<Props> = ({ history, match }) => {
  const id = match.params.id as Id<'recipes'>;
  const data = useQuery(api.recipes.get, { id });
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

  const [present, dismiss] = useIonModal(ModalChooseList, {
    dismiss: () => dismiss(),
    history,
    recipe: data,
  });

  function handleAddToList() {
    present({
      async canDismiss(data, role) {
        return role !== 'gesture';
      },
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/recipes" />
          </IonButtons>
          <IonTitle>{data?.name}</IonTitle>
          <IonNote className="ion-padding-horizontal" color="light">
            Pour {data?.unit} personnes
          </IonNote>
          <IonButtons slot="end">
            <IonButton onClick={handleAddToList}>
              <IonIcon slot="icon-only" icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <HeaderInput
          placeholder="Ajouter un ingredient"
          onAdd={handleCreateProduct}
        />
      </IonHeader>
      <IonContent fullscreen>
        <List data={data?.products || []} Item={ProductItem} />
      </IonContent>
    </IonPage>
  );
};
