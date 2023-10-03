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
import { arrowBack, checkmark, trash } from 'ionicons/icons';
import React from 'react';

import { Doc, Id } from '../../../convex/_generated/dataModel';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Doc<'products'>;
  onDismiss: (
    data: {
      _id: Id<'products'>;
      name: string;
      note?: string;
      quantity: string;
    } | void
  ) => void;
}

export const ModalEditProduct: React.FC<Props> = ({ item, onDismiss }) => {
  const [product, setProduct] = React.useState<Doc<'products'>>(item);

  function save() {
    onDismiss(product);
  }

  function handleChange(evt: any) {
    const fieldName = evt.target.name as keyof Doc<'products'>;
    const value = evt.target.value;
    setProduct(prev => ({ ...prev, [fieldName]: value }));
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      save();
    }
  }

  function handleUpdate() {
    save();
  }

  function handleDelete() {
    onDismiss();
  }

  return (
    <div className="mid-block">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleUpdate}>
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
          <IonButtons slot="start">
            <IonButton color="danger" onClick={handleDelete}>
              Supprimer
              <IonIcon icon={trash} slot="end"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton color="success" onClick={handleUpdate}>
              Valider
              <IonIcon icon={checkmark} slot="end"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </div>
  );
};
