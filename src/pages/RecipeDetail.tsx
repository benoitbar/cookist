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
import { cart } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { HeaderInput } from '../components/HeaderInput';
import { ModalChooseList } from '../components/modals/ChooseList';
import { useProductSet } from '../modules/resources/products';
import { useRecipeDetailSnapshot } from '../modules/resources/recipes';
import { extractQuantity } from '../utils/quantity';
import { ProductList } from '../components/ProductList';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const RecipeDetail: React.FC<Props> = ({ match }) => {
  const { data } = useRecipeDetailSnapshot(match.params.id);

  const { set } = useProductSet();

  async function handleCreateProduct(value: string) {
    if (data?.ref) {
      const productName = value.trim();
      const { name, quantity } = extractQuantity(productName, '1');
      await set({
        name,
        checked: false,
        parent: data.ref,
        quantity,
      });
    }
  }

  const [present, dismiss] = useIonModal(ModalChooseList, {
    recipe: data,
    onDismiss: () => dismiss(),
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
        {data?.ref ? <ProductList parent={data.ref} /> : null}
      </IonContent>
    </IonPage>
  );
};
