import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonModal,
} from '@ionic/react';
import { cart } from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { EditableList } from '../components/editable-list/List';
import { HeaderInput } from '../components/HeaderInput';
import { ModalChooseList } from '../components/modals/ChooseList';
import { ModalEditProduct } from '../components/modals/EditProduct';
import { recipes } from '../fixtures';
import { ProductItem } from '../components/ProductItem';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const Recipe: React.FC<Props> = ({ history, match }) => {
  const recipe = recipes[Number(match.params.id)];

  const [present, dismiss] = useIonModal(ModalChooseList, {
    history,
    recipe,
    onDismiss: () => dismiss(),
  });

  function handleAddToList() {
    present({
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
    });
  }

  async function handleAddIngredient(value: string) {}
  async function handleUpdateIngredient(
    ingredient: (typeof recipes)[number]['products'][number]
  ) {}
  async function handleDeleteIngredient(
    ingredient: (typeof recipes)[number]['products'][number]
  ) {}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/recipes" />
          </IonButtons>
          <IonTitle>{recipe.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleAddToList}>
              <IonIcon slot="icon-only" icon={cart} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <HeaderInput
          placeholder="Ajouter un ingredient"
          onAdd={handleAddIngredient}
        />
      </IonHeader>
      <IonContent fullscreen>
        <EditableList
          data={recipe.products}
          Item={ProductItem}
          Modal={ModalEditProduct}
          onDeleteItem={handleDeleteIngredient}
          onUpdateItem={handleUpdateIngredient}
        />
      </IonContent>
    </IonPage>
  );
};
