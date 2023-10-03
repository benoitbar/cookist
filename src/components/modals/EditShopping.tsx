import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, checkmark, trash } from 'ionicons/icons';
import React from 'react';

import { Doc, Id } from '../../../convex/_generated/dataModel';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Doc<'shopping'>;
  onDismiss: (data: { _id: Id<'shopping'>; name: string } | void) => void;
}

export const ModalEditShopping: React.FC<Props> = ({ item, onDismiss }) => {
  const [shopping, setShopping] = React.useState<Doc<'shopping'>>(item);

  function save() {
    onDismiss(shopping);
  }

  function handleChange(evt: any) {
    const fieldName = evt.target.name as keyof Doc<'shopping'>;
    const value = evt.target.value;
    setShopping(prev => ({ ...prev, [fieldName]: value }));
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
          value={shopping.name}
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
