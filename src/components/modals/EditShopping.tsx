import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, trash } from 'ionicons/icons';
import React from 'react';

import { Shopping } from '../../modules/resources/shopping';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: Shopping;
  onDismiss: any;
}

export const ModalEditShopping: React.FC<Props> = ({ item, onDismiss }) => {
  const [shopping, setShopping] = React.useState<Shopping>(item);

  function save() {
    onDismiss(shopping);
  }

  function handleChange(evt: any) {
    const fieldName = evt.target.name as keyof Shopping;
    const value = evt.target.value;
    setShopping(prev => ({ ...prev, [fieldName]: value }));
  }

  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      save();
    }
  }

  function handleClick() {
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
          value={shopping.name}
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
