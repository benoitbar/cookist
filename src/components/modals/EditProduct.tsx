import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonTextarea,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, trash } from 'ionicons/icons';
import React from 'react';

import { Product } from '../../modules/resources/products';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Product;
  onDismiss: any;
}

export const ModalEditProduct: React.FC<Props> = ({ item, onDismiss }) => {
  const [product, setProduct] = React.useState<Product>(item);

  function handleChange(evt: any) {
    const fieldName = evt.target.name as keyof Product;
    const value = evt.target.value;
    setProduct(prev => ({ ...prev, [fieldName]: value }));
  }

  function handleDelete() {
    onDismiss();
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      onDismiss(product);
    }
  }

  function handleClick() {
    onDismiss(product);
  }

  return (
    <div className="mid-block">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleClick}>
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonInput
          className="ion-margin-bottom"
          fill="outline"
          label="Nom"
          labelPlacement="stacked"
          name="name"
          onIonChange={handleChange}
          onKeyUp={handleKeyUp}
          required
          value={product.name}
        />
        <IonInput
          className="ion-margin-bottom"
          fill="outline"
          label="Quantité"
          labelPlacement="stacked"
          name="quantity"
          onIonChange={handleChange}
          onKeyUp={handleKeyUp}
          required
          value={product.quantity}
        />
        <IonInput
          className="ion-margin-bottom"
          fill="outline"
          label="Note"
          labelPlacement="stacked"
          name="note"
          onIonChange={handleChange}
          onKeyUp={handleKeyUp}
          placeholder="Ajouter une note"
          value={product.note}
        />
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="danger" onClick={handleDelete}>
              Supprimer
              <IonIcon icon={trash} slot="end"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </div>
  );
};
