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
import { ModalChooseList } from '../components/modals/ChooseList';
import { extractQuantity } from '../utils/quantity';
import { ProductList } from '../components/ProductList';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const RecipeDetail: React.FC<Props> = ({ match }) => {
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
    onDismiss: () => dismiss(),
    recipe: data,
  });

  function handleAddToList() {
    present({
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
        <ProductList data={data?.products || []} />
      </IonContent>
    </IonPage>
  );
};
