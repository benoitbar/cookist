import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItemGroup,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowBack, trash } from 'ionicons/icons';

import { shopping } from '../../fixtures';
import { KEYS } from '../../utils/keys';

import './modal.css';

interface Props {
  item: (typeof shopping)[number];
  onDismiss: any;
}

export const ModalEditName: React.FC<Props> = ({ item, onDismiss }) => {
  function handleKeyUp(evt: React.KeyboardEvent<HTMLIonInputElement>) {
    if (evt.key === KEYS.ENTER) {
      onDismiss(evt);
    }
  }

  return (
    <div className="mid-block">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onDismiss}>
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
          onKeyUp={handleKeyUp}
          required
          value={item.name}
        />
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton color="danger">
              Supprimer
              <IonIcon icon={trash} slot="end"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonContent>
    </div>
  );
};
